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
  const hasFullStyles = report.qhDesign.fullStyleImportFiles.length > 0;
  const hasThemeStyles = report.qhDesign.themeStyleImportFiles.length > 0;
  const hasAggregateComponentStyles =
    report.qhDesign.aggregateComponentStyleImportFiles.length > 0;
  const hasComponentStyles =
    report.qhDesign.componentStyleImportFiles.length > 0;
  const hasOnDemandStyles =
    hasThemeStyles && (hasAggregateComponentStyles || hasComponentStyles);

  if (!hasFullStyles && !hasOnDemandStyles) {
    warnings.push(
      "QH styles are incomplete; import @qhkg/react/styles.css or combine @qhkg/react/theme.css with the required component CSS entries",
    );
  }
  if (
    hasFullStyles &&
    (hasThemeStyles || hasAggregateComponentStyles || hasComponentStyles)
  ) {
    warnings.push(
      "Full and on-demand QH style entries are both imported; choose one strategy to avoid duplicate CSS",
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
