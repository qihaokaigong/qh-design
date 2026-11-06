import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

test("theme exposes the required semantic action tokens", async () => {
  const css = await readFile(path.join(packageRoot, "src/theme.css"), "utf8");

  assert.match(css, /--qh-color-action:/);
  assert.match(css, /--qh-color-on-action:/);
  assert.match(css, /--qh-color-focus:/);
});

test("theme does not define an automatic dark mode", async () => {
  const css = await readFile(path.join(packageRoot, "src/theme.css"), "utf8");

  assert.doesNotMatch(css, /prefers-color-scheme:\s*dark/);
  assert.doesNotMatch(css, /\.dark\b/);
});

test("semantic colors resolve to defined tokens without alias cycles", async () => {
  const css = await readFile(path.join(packageRoot, "src/theme.css"), "utf8");
  const tokens = new Map(
    [...css.matchAll(/(--qh-[\w-]+):\s*([^;]+);/g)].map((match) => [
      match[1],
      match[2],
    ]),
  );
  function resolve(name, ancestors = []) {
    assert.ok(tokens.has(name), `Missing token ${name}`);
    assert.ok(
      !ancestors.includes(name),
      `Alias cycle: ${[...ancestors, name].join(" -> ")}`,
    );
    for (const [, dependency] of tokens
      .get(name)
      .matchAll(/var\((--qh-[\w-]+)\)/g)) {
      resolve(dependency, [...ancestors, name]);
    }
  }
  for (const name of tokens.keys())
    if (name.startsWith("--qh-color-")) resolve(name);
});
