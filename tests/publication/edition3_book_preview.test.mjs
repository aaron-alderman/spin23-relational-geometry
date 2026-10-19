import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const metadata = JSON.parse(readFileSync(new URL("book/edition-3/book.json", root), "utf8"));
const coverMarkdown = readFileSync(new URL("book/edition-3/README.md", root), "utf8");
const coverHtml = readFileSync(new URL("docs/edition-3/index.html", root), "utf8");
const repositoryReadme = readFileSync(new URL("README.md", root), "utf8");

test("Edition 3 exposes matching Markdown and HTML books", () => {
  assert.equal(metadata.schema, "spin23-edition3-book/v1");
  assert.equal(metadata.edition, "3.0 preview");
  assert.equal(metadata.chapters.length, 11);
  assert.equal(metadata.findings.length, 12);
  assert.equal(metadata.frontiers.length, 8);
  assert.match(metadata.citationDigest, /^[a-f0-9]{64}$/u);
  for (const chapter of metadata.chapters) {
    assert.equal(existsSync(new URL(`book/edition-3/chapters/${chapter.slug}.md`, root)), true, chapter.slug);
    assert.equal(existsSync(new URL(`docs/edition-3/${chapter.slug}.html`, root)), true, chapter.slug);
  }
});

test("the book preserves the authority boundary and physical firewall", () => {
  assert.match(coverMarkdown, /successor to “Exact hinge, exceptional programme\.”/iu);
  assert.match(coverMarkdown, /not empirical confirmation, peer review or a derivation of the Standard Model/iu);
  assert.match(coverHtml, /successor, not replacement/iu);
  assert.ok(metadata.findings.some(finding => finding.status === "closed-identification"));
  assert.ok(metadata.findings.some(finding => finding.status === "established-obstruction"));
  assert.ok(metadata.findings.some(finding => finding.status === "open-physical"));
  assert.equal(metadata.frontiers.filter(frontier => frontier.priority === "stop-everything").length, 2);
});

test("every citation resolves inside the repository", () => {
  const sources = new Set([
    ...metadata.findings.flatMap(finding => finding.sources),
    ...metadata.frontiers.flatMap(frontier => frontier.sources),
  ]);
  assert.equal(sources.size, metadata.citationCount);
  for (const source of sources) assert.equal(existsSync(new URL(source, root)), true, source);
});

test("the repository front door advertises both reading surfaces", () => {
  assert.match(repositoryReadme, /book\/edition-3\/README\.md/u);
  assert.match(repositoryReadme, /docs\/edition-3\/index\.html/u);
  assert.match(coverHtml, /Eleven reader pages/u);
  assert.match(coverHtml, /09-research-frontier\.html/u);
  assert.match(coverHtml, /10-provenance-and-reading-map\.html/u);
});
