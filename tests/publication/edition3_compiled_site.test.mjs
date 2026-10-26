import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import test from "node:test";

const root = resolve(process.cwd());
const siteRoot = resolve(process.env.EDITION3_SITE_ROOT || ".build/pages/edition-3");
const artifactRoot = dirname(siteRoot);

const filesBelow = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? filesBelow(path) : [path];
});

test("every cited Markdown source has a provenance-stamped compiled reader", () => {
  const manifest = JSON.parse(readFileSync(join(siteRoot, "sources", "manifest.json"), "utf8"));
  assert.equal(manifest.schema, "spin23-edition3-source-readers/v1");
  assert.equal(manifest.sources.length, JSON.parse(readFileSync(join(root, "book", "edition-3", "book.json"), "utf8")).citationCount);
  assert.match(manifest.citationDigest, /^[a-f0-9]{64}$/u);
  for (const item of manifest.sources) {
    assert.equal(existsSync(join(root, item.source)), true, item.source);
    assert.equal(existsSync(join(siteRoot, item.output)), true, item.output);
    assert.match(item.sha256, /^[a-f0-9]{64}$/u);
  }
});

test("the reported kenotic-governance source resolves inside the compiled edition", () => {
  const detail = readFileSync(join(siteRoot, "details", "12-optional-endpoints-and-readings-theology-under-a-declared-assumption-claim-3.html"), "utf8");
  const target = "../sources/corpus/syntheses/kenotic_governance_tri_omni_theism_and_a_lawful_world.html";
  assert.match(detail, new RegExp(`href="${target}"`, "u"));
  const reader = readFileSync(resolve(siteRoot, "details", target), "utf8");
  assert.match(reader, /Compiled corpus reading projection/u);
  assert.match(reader, /This page is generated from canonical Markdown/u);
  assert.match(reader, /corpus\/syntheses\/kenotic_governance_tri_omni_theism_and_a_lawful_world\.md/u);
});

test("all local links in the compiled Edition 3 HTML resolve inside the deployment artifact", () => {
  const failures = [];
  for (const file of filesBelow(siteRoot).filter(path => path.endsWith(".html"))) {
    const html = readFileSync(file, "utf8");
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/gu)) {
      const href = match[1];
      if (/^(?:[a-z]+:|#)/iu.test(href)) continue;
      const target = decodeURI(href.split(/[?#]/u, 1)[0]);
      if (!target) continue;
      const resolved = resolve(dirname(file), target);
      if (!resolved.startsWith(artifactRoot) || !existsSync(resolved)) failures.push(`${relative(siteRoot, file)} -> ${href}`);
    }
  }
  assert.deepEqual(failures, []);
});
