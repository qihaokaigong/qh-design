# `@qhkg/create-qh-design`

Connect QH Design to a new or existing React + TypeScript project after that
project has a `package.json`:

```bash
npx @qhkg/create-qh-design@latest
```

The command performs only deterministic setup:

- installs `@qhkg/react` and `@qhkg/tokens` with the project's package manager;
- configures the public `@qh` Registry namespace;
- installs the matching QH Design Agent Skill at
  `.agents/skills/qh-design`.

It does not detect the framework, choose an application entry point, or edit
application source. After setup, ask the AI agent to use `$qh-design`; the Skill
will read the project's own instructions and help the developer complete the
project-specific integration.

## Commands

```bash
npx @qhkg/create-qh-design@latest init
npx @qhkg/create-qh-design@latest sync
npx @qhkg/create-qh-design@latest doctor
```

`sync` refreshes the local Skill from the installed version of `@qhkg/react`
without changing dependency versions. `doctor` checks the deterministic setup
without modifying files.
