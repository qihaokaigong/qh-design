#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
import {
  doctorProject,
  formatDoctorReport,
  initProject,
  syncProject,
} from "../src/index.mjs";

const HELP = `QH Design project onboarding

Usage:
  create-qh-design [init] [directory] [--package-manager <name>]
  create-qh-design sync [directory]
  create-qh-design doctor [directory]

Commands:
  init    Install QH packages, configure the @qh Registry, and install the AI Skill
  sync    Refresh Registry configuration and the AI Skill from installed @qhkg/react
  doctor  Check deterministic QH installation state without changing the project

This command never detects a framework or edits application source files.
`;

function parseArguments(argv) {
  const args = [...argv];
  let command = "init";
  if (["init", "sync", "doctor"].includes(args[0])) command = args.shift();

  let directory = ".";
  let packageManager;

  while (args.length > 0) {
    const argument = args.shift();
    if (argument === "--help" || argument === "-h") {
      return { help: true };
    }
    if (argument === "--package-manager") {
      packageManager = args.shift();
      if (!packageManager)
        throw new Error("--package-manager requires a value");
      continue;
    }
    if (argument.startsWith("-")) {
      throw new Error(`Unknown option: ${argument}`);
    }
    if (directory !== ".")
      throw new Error("Only one project directory is allowed");
    directory = argument;
  }

  return {
    command,
    packageManager,
    projectRoot: path.resolve(directory),
  };
}

async function main() {
  const parsed = parseArguments(process.argv.slice(2));
  if (parsed.help) {
    console.log(HELP);
    return;
  }

  if (parsed.command === "doctor") {
    const report = await doctorProject(parsed.projectRoot);
    console.log(formatDoctorReport(report));
    if (report.errors.length > 0) process.exitCode = 1;
    return;
  }

  const result =
    parsed.command === "sync"
      ? await syncProject({ projectRoot: parsed.projectRoot })
      : await initProject({
          projectRoot: parsed.projectRoot,
          packageManager: parsed.packageManager,
        });

  console.log(`QH Design ${parsed.command} completed in ${result.projectRoot}`);
  console.log(`- @qh Registry: ${result.registryFile}`);
  console.log(`- AI Skill: ${result.skillDirectory}`);
  console.log(`- Component context: @qhkg/react@${result.componentVersion}`);
  console.log("");
  console.log(
    "Application source was not changed. Ask your AI agent to use $qh-design to inspect this project and complete the project-specific integration.",
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
