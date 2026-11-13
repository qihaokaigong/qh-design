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

test("soft actions and control states retain accessible contrast", async () => {
  const css = await readFile(path.join(packageRoot, "src/theme.css"), "utf8");
  const tokens = new Map(
    [...css.matchAll(/(--qh-[\w-]+):\s*([^;]+);/g)].map((match) => [
      match[1],
      match[2].trim(),
    ]),
  );
  const luminance = (name) => {
    let value = tokens.get(name);
    while (value.startsWith("var(")) value = tokens.get(value.slice(4, -1));
    assert.match(value, /^#[\da-f]{6}$/i);
    const channels = [1, 3, 5]
      .map((index) => parseInt(value.slice(index, index + 2), 16) / 255)
      .map((channel) =>
        channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4,
      );
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  for (const [foreground, background, minimum] of [
    ["--qh-color-on-action-soft", "--qh-color-action-soft", 4.5],
    ["--qh-color-on-action-soft-hover", "--qh-color-action-soft", 4.5],
    ["--qh-color-on-action", "--qh-color-action-pressed", 4.5],
    ["--qh-color-border-control-hover", "--qh-color-surface", 3],
    ["--qh-color-border-control-pressed", "--qh-color-surface", 3],
  ]) {
    const [light, dark] = [luminance(foreground), luminance(background)].sort(
      (a, b) => b - a,
    );
    assert.ok(
      (light + 0.05) / (dark + 0.05) >= minimum,
      `${foreground} on ${background}`,
    );
  }
});
