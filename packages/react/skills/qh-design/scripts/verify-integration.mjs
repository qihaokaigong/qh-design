#!/usr/bin/env node

import path from "node:path";
import { inspectProject } from "./inspect-project.mjs";

function parseCwd(argv) {
  const index = argv.indexOf("--cwd");
  if (index === -1) return process.cwd();
  if (!argv[index + 1]) throw new Error("--cwd requires a directory");
  return path.resolve(argv[index + 1]);
}

try {
  const report = await inspectProject(parseCwd(process.argv));
  const errors = [];
  const warnings = [];

  if (!report.qhDesign.declaredReactVersion) {
    errors.push("@qhkg/react is not declared in this project");
  }
  if (!report.qhDesign.installedReactVersion) {
    errors.push("@qhkg/react is not installed in node_modules");
  }
  if (
    report.qhDesign.installedReactVersion &&
    report.qhDesign.installedReactVersion !==
      report.qhDesign.skillContextVersion
  ) {
    errors.push(
      `Skill context ${report.qhDesign.skillContextVersion} does not match installed @qhkg/react ${report.qhDesign.installedReactVersion}`,
    );
  }
  if (report.qhDesign.styleImportFiles.length === 0) {
    warnings.push(
      "@qhkg/react/styles.css is not imported; ask the project developer to choose the global style entry",
    );
  }
  if (!report.qhDesign.registryConfigured) {
    warnings.push("The @qh Registry namespace is not configured");
  }

  console.log(
    JSON.stringify(
      {
        ok: errors.length === 0,
        errors,
        warnings,
        report,
      },
      null,
      2,
    ),
  );
  if (errors.length > 0) process.exitCode = 1;
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
