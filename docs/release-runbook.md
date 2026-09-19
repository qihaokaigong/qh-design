# QH Design System 发布手册

日期：2026-09-18  
状态：Ready for external configuration

本手册描述公共 npm 包和 Storybook 的发布边界。仓库已经具备本地检查和 GitHub Actions 工作流；首次发布前仍需在 GitHub、npm 和托管平台完成外部配置。

## 自动化范围

- `.github/workflows/ci.yml` 在 Pull Request 和 `main` 更新时运行完整质量检查、发布包契约检查，以及 Chromium、Firefox、WebKit 端到端测试。
- `.github/workflows/release.yml` 在 `main` 更新时判断当前处于版本 PR、npm 发布或无需动作三种状态。
- Changesets 生成版本 PR；合并版本 PR 后，通过 npm Trusted Publishing 发布公共包、创建 Git tag 和 GitHub Release。
- `version-packages` 会同步 Registry 中的 `@qh-design/react` 依赖范围，避免 npm 与 Registry 版本错位。
- Storybook 构建产物位于 `apps/storybook/storybook-static`，但本工作流暂不选择或调用托管供应商。

## 首次启用清单

### GitHub

1. 将仓库设为公开仓库，并确认默认分支为 `main`。
2. 在 Actions 设置中允许 GitHub Actions 创建 Pull Request。
3. 创建名为 `npm` 的 Environment，并为发布配置必要的审批人。
4. 将 `CI / Quality and package contracts` 与三个 `Browser` 检查设为 `main` 的必需检查。
5. 保持工作流默认 Token 权限受限；发布任务只在自己的 Job 中取得 `contents: write` 与 `id-token: write`。
6. 完成 GitHub、npm 与审批配置后，创建 Repository variable `NPM_RELEASE_ENABLED=true`。未设置该变量时，Release 工作流会保持关闭，避免首次推送意外触发发布。

### npm

为 `@qh-design/react` 和 `@qh-design/tokens` 配置 Trusted Publisher：

- Provider：GitHub Actions
- GitHub repository：实际公开仓库
- Workflow：`.github/workflows/release.yml`
- Environment：`npm`
- Allowed action：允许本工作流使用的 Changesets publish action

Trusted Publishing 使用 OIDC 短期凭证，不在仓库中保存长期 `NPM_TOKEN`。公共仓库发布公共包时，npm 会自动生成 provenance。

### Storybook 与域名

1. 将 `apps/storybook/storybook-static` 部署到选定的静态托管平台。
2. 确认以下路径均返回 200：
   - `/`
   - `/r/registry.json`
   - `/llms.txt`
   - `/llms-full.txt`
   - `/qh-components.json`
3. 将 `design.qihao.dev` 指向托管平台。
4. 在公开地址重新运行 Registry 安装、MCP、移动端和缓存策略验收。

托管平台确定前，不应创建携带未知账户、项目 ID 或密钥名称的部署工作流。

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
