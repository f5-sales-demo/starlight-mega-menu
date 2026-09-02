import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { extname, normalize, relative, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const manifest = JSON.parse(
  readFileSync(resolve(root, "package.json"), "utf8"),
);
const pack = JSON.parse(
  execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
    cwd: root,
    encoding: "utf8",
  }),
)[0];
const packed = new Set(pack.files.map(({ path }) => normalize(path)));

function exportedPaths(value) {
  if (typeof value === "string") return [value];
  if (!value || typeof value !== "object") return [];
  return Object.values(value).flatMap(exportedPaths);
}

function resolvePackedImport(source, specifier) {
  const base = normalize(
    relative(root, resolve(root, source, "..", specifier)),
  );
  if (extname(base)) return packed.has(base) ? base : null;
  for (const suffix of [
    ".ts",
    ".tsx",
    ".astro",
    ".js",
    ".mjs",
    "/index.ts",
    "/index.tsx",
  ]) {
    if (packed.has(`${base}${suffix}`)) return `${base}${suffix}`;
  }
  return null;
}

test("every exported path is included in the npm package", () => {
  for (const target of exportedPaths(manifest.exports)) {
    assert.equal(
      packed.has(normalize(target.replace(/^\.\//, ""))),
      true,
      `missing exported package file: ${target}`,
    );
  }
});

test("every relative source import resolves inside the npm package", () => {
  const sourceFiles = [...packed].filter((path) =>
    /\.(?:astro|m?[jt]sx?)$/.test(path),
  );
  const importPattern = /(?:from\s+|import\s*)["'](\.{1,2}\/[^"']+)["']/g;
  for (const source of sourceFiles) {
    const content = readFileSync(resolve(root, source), "utf8");
    for (const match of content.matchAll(importPattern)) {
      assert.ok(
        resolvePackedImport(source, match[1]),
        `${source} imports ${match[1]}, which is absent from the npm package`,
      );
    }
  }
});
