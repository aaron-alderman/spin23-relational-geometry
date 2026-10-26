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

test("every corpus Markdown source has a provenance-stamped compiled library page", () => {
  const manifest = JSON.parse(readFileSync(join(siteRoot, "library", "manifest.json"), "utf8"));
  const corpusMarkdownCount = filesBelow(join(root, "corpus")).filter(path => path.endsWith(".md")).length;
  const corpusDirectoryCount = new Set(filesBelow(join(root, "corpus")).filter(path => path.endsWith(".md")).flatMap(path => {
    const directories = [];
    let directory = dirname(path);
    while (directory.startsWith(join(root, "corpus"))) { directories.push(directory); directory = dirname(directory); }
    return directories;
  })).size;
  const citationCount = JSON.parse(readFileSync(join(root, "book", "edition-3", "book.json"), "utf8")).citationCount;
  assert.equal(manifest.schema, "spin23-edition3-corpus-library/v1");
  assert.equal(manifest.documentCount, corpusMarkdownCount);
  assert.equal(manifest.documents.length, corpusMarkdownCount);
  assert.equal(manifest.directoryCount, corpusDirectoryCount);
  assert.equal(manifest.directories.length, corpusDirectoryCount);
  assert.equal(manifest.editionCitationCount, citationCount);
  assert.equal(manifest.documents.filter(item => item.editionCited).length, citationCount);
  assert.match(manifest.citationDigest, /^[a-f0-9]{64}$/u);
  for (const item of manifest.documents) {
    assert.equal(existsSync(join(root, item.source)), true, item.source);
    assert.equal(existsSync(join(siteRoot, item.output)), true, item.output);
    assert.match(item.sha256, /^[a-f0-9]{64}$/u);
  }
});

test("the reported kenotic-governance source resolves inside the compiled edition", () => {
  const detail = readFileSync(join(siteRoot, "details", "12-optional-endpoints-and-readings-theology-under-a-declared-assumption-claim-3.html"), "utf8");
  const target = "../library/corpus/syntheses/kenotic_governance_tri_omni_theism_and_a_lawful_world.html";
  assert.match(detail, new RegExp(`href="${target}"`, "u"));
  const reader = readFileSync(resolve(siteRoot, "details", target), "utf8");
  assert.match(reader, /Compiled corpus reading projection/u);
  assert.match(reader, /This page is generated from canonical Markdown/u);
  assert.match(reader, /corpus\/syntheses\/kenotic_governance_tri_omni_theism_and_a_lawful_world\.md/u);
});

test("deep frontier pages join the HTML journey with graph context", () => {
  const target = join(siteRoot, "library", "corpus", "programmes", "frontier", "wave-7", "frontier_wave7_228_typed_self_description_and_monster_reconstruction_gate.html");
  const html = readFileSync(target, "utf8");
  assert.match(html, /Wider corpus/u);
  assert.match(html, /Route into this page/u);
  assert.match(html, /href="\.\.\/\.\.\/\.\.\/index\.html">Corpus<\/a>/u);
  assert.match(html, /href="\.\.\/\.\.\/index\.html">Programmes<\/a>/u);
  assert.match(html, /href="\.\.\/index\.html">Frontier<\/a>/u);
  assert.match(html, /href="index\.html">Wave 7<\/a>/u);
  assert.match(html, /Moonshine as program, lattice formula and constrained carrier/u);
  assert.doesNotMatch(html, />README<\/a>/u);
  assert.match(html, /Inbound corpus links/u);
  assert.match(html, /literature-review\.md/u);
  assert.match(html, /frontier_wave7_137_/u);
  assert.match(html, /frontier_wave7_150_/u);
  assert.match(html, /frontier_wave7_229_/u);
  assert.equal(existsSync(join(siteRoot, "library", "index.html")), true);
  const search = JSON.parse(readFileSync(join(siteRoot, "library", "search-index.json"), "utf8"));
  assert.equal(search.documents.some(item => item.source.endsWith("frontier_wave7_228_typed_self_description_and_monster_reconstruction_gate.md")), true);
  assert.equal(search.documents.some(item => item.kind === "directory" && item.source === "corpus/programmes/frontier/wave-7/"), true);
});

test("corpus hierarchy nodes are navigable index pages", () => {
  const expected = [
    ["corpus", "Corpus"],
    [join("corpus", "programmes"), "Programmes"],
    [join("corpus", "programmes", "frontier"), "Frontier"],
    [join("corpus", "programmes", "frontier", "wave-7"), "Wave 7"],
  ];
  for (const [directory, title] of expected) {
    const html = readFileSync(join(siteRoot, "library", directory, "index.html"), "utf8");
    assert.match(html, new RegExp(`<h1>${title}</h1>`, "u"));
    assert.match(html, /generated navigation index/u);
  }
  const frontier = readFileSync(join(siteRoot, "library", "corpus", "programmes", "frontier", "index.html"), "utf8");
  assert.match(frontier, /href="wave-7\/index\.html">Wave 7<\/a>/u);
});

test("GitHub-style corpus tables render as semantic HTML tables", () => {
  const moonshine = readFileSync(join(siteRoot, "library", "corpus", "programmes", "moonshine-program-lattice", "README.html"), "utf8");
  const section = moonshine.slice(moonshine.indexOf("Four non-equivalent meanings of program"), moonshine.indexOf("Generalized moonshine is the closest established transition language"));
  assert.match(section, /<table><thead><tr><th>meaning<\/th><th>mathematical object<\/th><th>present status<\/th><\/tr><\/thead>/u);
  assert.match(section, /<td>update program<\/td>/u);
  assert.match(section, /<td>generative verifier<\/td>/u);
  assert.doesNotMatch(section, /\|---\|---\|---\|/u);

  const manifest = JSON.parse(readFileSync(join(siteRoot, "library", "manifest.json"), "utf8"));
  for (const item of manifest.documents) {
    const markdown = readFileSync(join(root, item.source), "utf8");
    const html = readFileSync(join(siteRoot, item.output), "utf8");
    const markdownTables = [...markdown.matchAll(/^\s*\|?\s*:?-{3,}:?\s*\|/gmu)].length;
    const renderedTables = [...html.matchAll(/<table>/gu)].length;
    assert.equal(renderedTables, markdownTables, item.source);
  }
});

test("old cited-source URLs redirect to canonical corpus-library pages", () => {
  const alias = readFileSync(join(siteRoot, "sources", "corpus", "syntheses", "kenotic_governance_tri_omni_theism_and_a_lawful_world.html"), "utf8");
  assert.match(alias, /http-equiv="refresh"/u);
  assert.match(alias, /library\/corpus\/syntheses\/kenotic_governance/u);
});

test("source-reader math survives Markdown rendering and page titles remain plain text", () => {
  const manifest = JSON.parse(readFileSync(join(siteRoot, "library", "manifest.json"), "utf8"));
  for (const item of manifest.documents) {
    const html = readFileSync(join(siteRoot, item.output), "utf8");
    const title = /<title>([^<]*)<\/title>/u.exec(html)?.[1] || "";
    assert.doesNotMatch(title, /\\|\b(?:mathbb|mathfrak|mathcal|operatorname)\b/u, item.source);
    for (const math of html.matchAll(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/gu)) {
      assert.doesNotMatch(math[0], /<\/?em>/u, item.source);
    }
  }

  const globalGroup = readFileSync(join(siteRoot, "library", "corpus", "claims", "0000-0099", "47_global_group_isomorphism_sp4r_spin023.html"), "utf8");
  assert.match(globalGroup, /<div class="display-math">\\\[\n\\boxed\{/u);
  assert.doesNotMatch(globalGroup, /<div class="display-math">[\s\S]*?<em>/u);

  const majorana = readFileSync(join(siteRoot, "library", "corpus", "claims", "1000-1099", "1094_the_Majorana_vacuum_stabilizer_is_the_Z6_quotiented_standard_model_times_a_split_baryon_triality_with_the_Z9_lift_cubing_to_colour_centre.html"), "utf8");
  assert.doesNotMatch(majorana, /\\mathbb Z<em>/u);
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
