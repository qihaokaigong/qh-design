# QH Design System 发布手册

日期：2026-09-19
状态：Storybook、Registry、AI 文档与 MCP 已上线；`@qhkg/react@0.1.0` 与 `@qhkg/tokens@0.1.0` 已公开发布；Trusted Publisher 待启用

本手册描述公共 npm 包、Storybook 与 MCP 的发布边界。公开仓库、Cloudflare Pages、自定义域名、MCP Worker 与 npm 首发包均已启用；后续自动发布仍需完成 Trusted Publisher 配置。

## 自动化范围

- `.github/workflows/ci.yml` 在 Pull Request 和 `main` 更新时运行完整质量检查、发布包契约检查，以及 Chromium、Firefox、WebKit 端到端测试。
- `.github/workflows/release.yml` 在 `main` 更新时判断当前处于版本 PR、npm 发布或无需动作三种状态。
- Changesets 生成版本 PR；合并版本 PR 后，通过 npm Trusted Publishing 发布公共包、创建 Git tag 和 GitHub Release。
- `version-packages` 会同步 Registry 中的 `@qhkg/react` 依赖范围，避免 npm 与 Registry 版本错位。
- `.github/workflows/deploy-storybook.yml` 构建 Storybook、部署 Cloudflare Pages，并更新 `design.qihao.dev/mcp` 对应的 MCP Worker。该工作流默认关闭，只有配置部署密钥并设置 `CLOUDFLARE_PAGES_ENABLED=true` 后才会运行。

## 首次启用清单

### GitHub

1. 将仓库设为公开仓库，并确认默认分支为 `main`。
2. 在 Actions 设置中允许 GitHub Actions 创建 Pull Request。
3. 创建名为 `npm` 的 Environment，并为发布配置必要的审批人。
4. 将 `CI / Quality and package contracts` 与三个 `Browser` 检查设为 `main` 的必需检查。
5. 保持工作流默认 Token 权限受限；发布任务只在自己的 Job 中取得 `contents: write` 与 `id-token: write`。
6. 完成 GitHub、npm 与审批配置后，创建 Repository variable `NPM_RELEASE_ENABLED=true`。未设置该变量时，Release 工作流会保持关闭，避免首次推送意外触发发布。

### npm

为 `@qhkg/react` 和 `@qhkg/tokens` 配置 Trusted Publisher：

- Provider：GitHub Actions
- GitHub repository：实际公开仓库
- Workflow：`.github/workflows/release.yml`
- Environment：`npm`
- Allowed action：启用 `Allow npm publish`，供 Changesets 发布流程直接发布

Trusted Publishing 使用 OIDC 短期凭证，不在仓库中保存长期 `NPM_TOKEN`。公共仓库发布公共包时，npm 会自动生成 provenance。
发布 Job 显式安装 `npm@11.19.1`，满足 Trusted Publishing 对 npm CLI 11.5.1 及以上版本的要求，避免依赖 GitHub Runner 预装版本。

### Storybook、域名与 MCP

当前生产配置：

- Cloudflare Pages 项目：`qh-design`
- Pages 回退地址：`https://qh-design.pages.dev`
- 生产域名：`https://design.qihao.dev`
- MCP Worker：`qh-design-mcp`
- MCP 路由：`https://design.qihao.dev/mcp`

部署后确认以下入口可用：

- `/`
- `/r/registry.json`
- `/llms.txt`
- `/llms-full.txt`
- `/qh-components.json`
- `/mcp`

本地人工部署：

```bash
pnpm deploy:storybook
pnpm mcp:deploy
```

启用 GitHub 自动部署：

1. 创建最小权限的 Cloudflare API Token，并保存为 GitHub Actions secret `CLOUDFLARE_API_TOKEN`。
2. 创建 Repository variable `CLOUDFLARE_ACCOUNT_ID`。
3. 创建 Repository variable `CLOUDFLARE_PAGES_ENABLED=true`。

不要把 Cloudflare API Token 写入仓库、Wrangler 配置或普通变量。

## 本地发布前检查

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test:e2e
pnpm release:verify
```

`release:verify` 会检查：

- npm 包的公开访问与 provenance 配置。
- 每个 exports 目标都存在并进入 tarball。
- tarball 不包含测试和 Story 源文件。
- React 构建产物可以在 Node 环境导入。
- Registry 依赖版本与 React 包版本一致。
- Storybook 静态产物包含 Registry 和 AI 文档入口。
- MCP Worker 可被 Wrangler 成功打包，且只接管 `design.qihao.dev/mcp*`。

## 日常发布流程

1. 功能 Pull Request 包含对应 Changeset。
2. 合并到 `main` 后，Release 工作流创建或更新版本 Pull Request。
3. 审核版本号、CHANGELOG、Registry 依赖范围和 Storybook 预览。
4. 合并版本 Pull Request。
5. `npm` Environment 审批后，工作流通过 OIDC 发布包并创建 Release 与 Git tag。
6. 部署同一提交的 Storybook 静态产物。
7. 验证 npm、Registry、AI 索引和 `design.qihao.dev` 指向同一版本。

## 失败处理

- 质量检查失败：不合并，先修复根因。
- OIDC 出现 404：检查 npm Trusted Publisher 中的仓库、工作流文件名和 Environment 是否与运行身份完全一致。
- npm 已发布但 Storybook 部署失败：不要重发相同版本；恢复文档部署后再验收。
- 已发布版本存在缺陷：发布修复版本；除非涉及安全或法律问题，不使用 npm unpublish。
- Registry 与 npm 版本不一致：停止部署，运行 `pnpm registry:sync-version`、重新构建并补充 Changeset。

## 依据

- [Changesets Action](https://github.com/changesets/action)
- [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/)
- [GitHub 发布 Node.js 包](https://docs.github.com/en/actions/tutorials/publish-packages/publish-nodejs-packages)
- [Playwright CI](https://playwright.dev/docs/ci)
- [Cloudflare Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
- [Storybook MCP 共享](https://storybook.js.org/docs/ai/mcp/sharing)
