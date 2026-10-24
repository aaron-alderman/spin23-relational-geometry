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
  assert.equal(metadata.edition, "3.2 admissibility preview");
  assert.equal(metadata.chapters.length, 14);
  assert.equal(metadata.findings.length, 26);
  assert.equal(metadata.frontiers.length, 10);
  assert.equal(metadata.publicationAuthority.role, "canonical-publication-source");
  assert.equal(metadata.publicationAuthority.sourcePath, "book/edition-3/book.json");
  assert.ok(metadata.publicationAuthority.authoritativeFields.includes("findings"));
  assert.ok(metadata.publicationAuthority.authoritativeFields.includes("frontiers"));
  assert.match(metadata.citationDigest, /^[a-f0-9]{64}$/u);
  for (const chapter of metadata.chapters) {
    assert.equal(existsSync(new URL(`book/edition-3/chapters/${chapter.slug}.md`, root)), true, chapter.slug);
    assert.equal(existsSync(new URL(`docs/edition-3/${chapter.slug}.html`, root)), true, chapter.slug);
  }
});

test("the expanded narrative chapters are substantial rather than chapter stubs", () => {
  for (const chapter of metadata.chapters.slice(0, 8)) {
    const markdown = readFileSync(new URL(`book/edition-3/chapters/${chapter.slug}.md`, root), "utf8");
    assert.ok(markdown.length >= 2800, `${chapter.slug} is still too light`);
    assert.match(markdown, /## Chapter sources/u, `${chapter.slug} has no audit trail`);
  }
  const admissibility = readFileSync(new URL("book/edition-3/chapters/08-admissibility-frontier.md", root), "utf8");
  assert.ok(admissibility.length >= 5000, "the admissibility chapter is still too light");
  assert.match(admissibility, /The shift/u);
  assert.match(admissibility, /new physics may begin not with higher energy but with greater finesse/iu);
  assert.match(admissibility, /Why Jordan and Lie must be balanced/u);
  assert.match(admissibility, /The finesse technology pathway/u);
  assert.match(admissibility, /Hot off the press — the oriented seam becomes an experiment/u);
  assert.match(admissibility, /Hot off the press — the mixed interface has an exact shape/u);
  assert.match(admissibility, /Provisional integration note — 24 October 2026/u);
});

test("the expanded edition distributes its archetype grammar and visual layer", () => {
  const frontMatter = readFileSync(new URL("docs/edition-3/00-front-matter.html", root), "utf8");
  const spine = readFileSync(new URL("docs/edition-3/01-the-revised-spine.html", root), "utf8");
  const frontier = readFileSync(new URL("docs/edition-3/09-research-frontier.html", root), "utf8");
  for (const name of ["Scout", "Cartographer", "Auditor", "Builder", "Witness", "Steward", "Translator", "Integrator"]) assert.match(frontMatter, new RegExp(`\\b${name}\\b`, "u"));
  assert.match(spine, /archetype-badge role-integrator/u);
  assert.match(spine, /archetype-badge role-auditor/u);
  assert.match(frontier, /archetype-badge role-builder/u);
  assert.match(frontier, /archetype-badge role-witness/u);
  assert.equal(metadata.chapters.some(chapter => chapter.slug === "08-archetypal-research-modes"), false);
  assert.equal(existsSync(new URL("docs/edition-3/08-archetypal-research-modes.html", root)), false);
  assert.equal(metadata.archetypes.length, 8);
  assert.ok(metadata.chapters.every(chapter => typeof chapter.archetype === "string"));
  assert.ok(metadata.findings.every(finding => typeof finding.archetype === "string"));
  assert.ok(metadata.frontiers.every(frontierItem => typeof frontierItem.archetype === "string"));
  for (const asset of [
    "relational-geometry-hero.png",
    "research-archetypes-workshop.png",
    "spin23-spine.svg",
    "one-two-three.svg",
    "projective-lift.svg",
    "mobius-return.svg",
    "central-sign-orientation.svg",
    "topology-defect-reader.svg",
    "standard-model-seam.svg",
    "terminal-gates.svg",
  ]) assert.equal(existsSync(new URL(`docs/edition-3/assets/${asset}`, root)), true, asset);
});

test("projective-loop diagrams appear beside the claims they explain", () => {
  const html = readFileSync(new URL("docs/edition-3/03-projective-loop.html", root), "utf8");
  const placements = [
    ["The exact result", "projective-lift.svg"],
    ["A familiar twisted-loop picture", "mobius-return.svg"],
    ["Central sign versus handedness", "central-sign-orientation.svg"],
    ["From topology to a defect", "topology-defect-reader.svg"],
  ];
  for (const [heading, asset] of placements) {
    const headingAt = html.indexOf(heading);
    const assetAt = html.indexOf(asset);
    assert.ok(headingAt >= 0, heading);
    assert.ok(assetAt > headingAt, `${asset} is not placed after ${heading}`);
  }
  assert.match(html, /det\(−I₂\)=\+1/u);
  assert.match(html, /Memory, wall and reader are three different jobs/u);
});

test("Furey claims link at the point of assertion to inspectable proof pages", () => {
  const chapterHtml = readFileSync(new URL("docs/edition-3/04-furey-interface.html", root), "utf8");
  const chapterMarkdown = readFileSync(new URL("book/edition-3/chapters/04-furey-interface.md", root), "utf8");
  const participationClaim = readFileSync(new URL("docs/edition-3/details/04-furey-interface-the-exact-participation-result-claim-1.html", root), "utf8");
  const selectorClaim = readFileSync(new URL("docs/edition-3/details/04-furey-interface-the-selector-problem-claim-1.html", root), "utf8");
  const participationHtml = readFileSync(new URL("docs/edition-3/details/furey-participation-proof.html", root), "utf8");
  const selectorHtml = readFileSync(new URL("docs/edition-3/details/furey-selector-obstruction.html", root), "utf8");
  assert.match(chapterHtml, /id="the-exact-participation-result"[\s\S]*?details\/04-furey-interface-the-exact-participation-result-claim-1\.html/u);
  assert.match(chapterHtml, /id="the-selector-problem"[\s\S]*?details\/04-furey-interface-the-selector-problem-claim-1\.html/u);
  assert.match(chapterMarkdown, /The exact participation result[\s\S]*?\.\.\/details\/04-furey-interface-the-exact-participation-result-claim-1\.md/u);
  assert.match(participationClaim, /furey-participation-proof\.html/u);
  assert.match(selectorClaim, /furey-selector-obstruction\.html/u);
  assert.match(participationHtml, /\\mathcal A=J\\otimes e_-/u);
  assert.match(participationHtml, /\\dim\\mathfrak\{sp\}\(4,\\mathbb R\)=10/u);
  assert.match(participationHtml, /generate_full_sp4_from_turn_split_dilation_and_channel_rotation\.mjs/u);
  assert.match(participationHtml, /1059_the_linear_furey_product/u);
  assert.match(participationHtml, /It does not derive the source product from a local microscopic action/u);
  assert.match(selectorHtml, /R_2\\mapsto e\^\{-2i\\alpha\}R_2/u);
  assert.match(selectorHtml, /katex\.min\.js/u);
  assert.match(selectorHtml, /verify_a5_phase_reference_exhaustion\.mjs/u);
  assert.match(selectorHtml, /a5-phase-reference-exhaustion\.json/u);
  assert.equal(metadata.proofDetails.length, 2);
  for (const detail of metadata.proofDetails) {
    assert.equal(existsSync(new URL(`book/edition-3/details/${detail.slug}.md`, root)), true, detail.slug);
    assert.equal(existsSync(new URL(`docs/edition-3/details/${detail.slug}.html`, root)), true, detail.slug);
    for (const certificate of detail.certificates) assert.equal(existsSync(new URL(certificate, root)), true, certificate);
  }
});

test("every narrative assertion has its own expanded claim page", () => {
  assert.equal(metadata.claimDetails.length, 105);
  assert.equal(new Set(metadata.claimDetails.map(detail => detail.slug)).size, metadata.claimDetails.length);
  for (const detail of metadata.claimDetails) {
    const chapterHtml = readFileSync(new URL(`docs/edition-3/${detail.chapter}.html`, root), "utf8");
    const claimHtml = readFileSync(new URL(`docs/edition-3/details/${detail.slug}.html`, root), "utf8");
    assert.equal(existsSync(new URL(`book/edition-3/details/${detail.slug}.md`, root)), true, detail.slug);
    assert.match(chapterHtml, new RegExp(`details/${detail.slug}\\.html`, "u"), `${detail.slug} has no chapter link`);
    assert.match(claimHtml, /Exact assertion/u);
    assert.match(claimHtml, /What this commits us to/u);
    assert.match(claimHtml, /Logical anatomy/u);
    assert.match(claimHtml, /Verification route/u);
    assert.match(claimHtml, /What would move or defeat this claim/u);
    assert.match(claimHtml, /Controlling documents/u);
    assert.ok(detail.sources.length > 0, `${detail.slug} has no controlling documents`);
    for (const source of detail.sources) assert.equal(existsSync(new URL(source, root)), true, source);
  }
  assert.equal(existsSync(new URL("docs/edition-3/details/02-one-carrier-two-faces-three-relations-evidence.html", root)), false);
});

test("the icon taxonomy remains textual, complete and mapped into the book", () => {
  const frontMatterMarkdown = readFileSync(new URL("book/edition-3/chapters/00-front-matter.md", root), "utf8");
  const frontMatterHtml = readFileSync(new URL("docs/edition-3/00-front-matter.html", root), "utf8");
  const ledgerHtml = readFileSync(new URL("docs/edition-3/08-result-ledger.html", root), "utf8");
  const frontierHtml = readFileSync(new URL("docs/edition-3/09-research-frontier.html", root), "utf8");
  const expected = {
    established: ["✓", "Established"],
    conditional: ["◇", "Conditional"],
    external: ["↗", "Externally open"],
    exhausted: ["■", "Internally exhausted"],
    obstruction: ["⊘", "Obstruction / no-go"],
    experiment: ["⌁", "Experiment / protocol"],
    interpretive: ["◎", "Interpretive map"],
    governance: ["▦", "Ledger / governance"],
  };
  assert.deepEqual(Object.keys(metadata.taxonomy), Object.keys(expected));
  for (const [key, [icon, label]] of Object.entries(expected)) {
    assert.equal(metadata.taxonomy[key].icon, icon);
    assert.equal(metadata.taxonomy[key].label, label);
    assert.match(frontMatterMarkdown, new RegExp(label.replace("/", "\\/"), "u"));
    assert.match(frontMatterHtml, new RegExp(`tax-${key}`, "u"));
  }
  assert.match(frontMatterHtml, /colour and symbol are never the only carriers of meaning/iu);
  assert.match(ledgerHtml, /Detailed: established-in-model/u);
  assert.match(ledgerHtml, /tax-obstruction/u);
  assert.match(ledgerHtml, /tax-experiment/u);
  assert.match(frontierHtml, /tax-exhausted/u);
  assert.match(frontierHtml, /tax-conditional/u);
  assert.match(frontierHtml, /tax-external/u);
  assert.ok(metadata.chapters.every(chapter => chapter.taxonomy in expected));
  assert.ok(metadata.findings.every(finding => finding.taxonomy in expected));
  assert.ok(metadata.frontiers.every(frontier => frontier.taxonomy in expected));
});

test("status and research-move badges link to dedicated index pages", () => {
  const readingKeyHtml = readFileSync(new URL("docs/edition-3/reading-key.html", root), "utf8");
  const readingKeyMarkdown = readFileSync(new URL("book/edition-3/reading-key.md", root), "utf8");
  const frontMatter = readFileSync(new URL("docs/edition-3/00-front-matter.html", root), "utf8");
  const proofPage = readFileSync(new URL("docs/edition-3/details/furey-participation-proof.html", root), "utf8");
  assert.match(frontMatter, /class="taxonomy-badge tax-governance" href="reading-key\/status-governance\.html"/u);
  assert.match(frontMatter, /class="archetype-badge role-steward" href="reading-key\/move-steward\.html"/u);
  assert.match(proofPage, /href="\.\.\/reading-key\/status-established\.html"/u);
  assert.match(proofPage, /href="\.\.\/reading-key\/move-auditor\.html"/u);
  for (const key of Object.keys(metadata.taxonomy)) {
    assert.match(readingKeyHtml, new RegExp(`href="reading-key/status-${key}\\.html"`, "u"));
    assert.match(readingKeyMarkdown, new RegExp(`reading-key/status-${key}\\.md`, "u"));
    const detailHtml = readFileSync(new URL(`docs/edition-3/reading-key/status-${key}.html`, root), "utf8");
    assert.match(detailHtml, /Every current use/u);
    assert.match(detailHtml, /\.\.\/reading-key\.html/u);
  }
  for (const move of metadata.archetypes) {
    assert.match(readingKeyHtml, new RegExp(`href="reading-key/move-${move.key}\\.html"`, "u"));
    assert.match(readingKeyMarkdown, new RegExp(`reading-key/move-${move.key}\\.md`, "u"));
    const detailHtml = readFileSync(new URL(`docs/edition-3/reading-key/move-${move.key}.html`, root), "utf8");
    assert.match(detailHtml, /Every current use/u);
    assert.match(detailHtml, /\.\.\/reading-key\.html/u);
  }
  const establishedPage = readFileSync(new URL("docs/edition-3/reading-key/status-established.html", root), "utf8");
  const auditorPage = readFileSync(new URL("docs/edition-3/reading-key/move-auditor.html", root), "utf8");
  assert.match(establishedPage, /\.\.\/04-furey-interface\.html#the-exact-participation-result/u);
  assert.match(auditorPage, /\.\.\/details\/furey-participation-proof\.html/u);
});

test("reader-facing mathematics uses mathematical typography rather than identifier notation", () => {
  const spineMarkdown = readFileSync(new URL("book/edition-3/chapters/01-the-revised-spine.md", root), "utf8");
  const exceptionalHtml = readFileSync(new URL("docs/edition-3/07-exceptional-horizon.html", root), "utf8");
  const spineSvg = readFileSync(new URL("docs/edition-3/assets/spin23-spine.svg", root), "utf8");
  assert.match(spineMarkdown, /H₂\(ℝ\)/u);
  assert.match(spineMarkdown, /𝔰𝔭\(4,ℝ\)/u);
  assert.match(spineMarkdown, /Spin₀\(2,3\)/u);
  for (const notation of [String.raw`J_3(\mathbb O)`, String.raw`E_6`, String.raw`E_7`, String.raw`E_8`]) assert.ok(exceptionalHtml.includes(notation), notation);
  assert.match(exceptionalHtml, /vendor\/katex\/katex\.min\.css/u);
  assert.match(exceptionalHtml, /vendor\/katex\/katex\.min\.js/u);
  assert.equal(existsSync(new URL("docs/edition-3/vendor/katex/fonts/KaTeX_Main-Regular.woff2", root)), true);
  assert.match(spineSvg, /H₂\(ℝ\)/u);
  assert.match(spineSvg, /𝔰𝔭\(4,ℝ\) ≅ 𝔰𝔭𝔦𝔫\(2,3\)/u);
  assert.doesNotMatch(exceptionalHtml, />H2\(R\)</u);
  assert.doesNotMatch(exceptionalHtml, />J3\(O\)</u);
});

test("the book preserves the authority boundary and physical firewall", () => {
  assert.match(coverMarkdown, /not empirical confirmation, peer review or a derivation of the Standard Model/iu);
  assert.match(coverMarkdown, /admissibility is ontologically prior to physics remains a research proposal/iu);
  assert.match(coverHtml, /its stronger ontological status remains open/iu);
  assert.doesNotMatch(coverMarkdown, /successor|current continuation/iu);
  assert.ok(metadata.findings.some(finding => finding.status === "closed-identification"));
  assert.ok(metadata.findings.some(finding => finding.status === "established-obstruction"));
  assert.ok(metadata.findings.some(finding => finding.status === "open-physical"));
  assert.equal(metadata.frontiers.filter(frontier => frontier.priority === "stop-everything").length, 2);
  assert.ok(metadata.findings.some(finding => finding.status === "internally-exhausted"));
  assert.ok(metadata.findings.some(finding => finding.status === "simulation-ready"));
  assert.ok(metadata.frontiers.some(frontier => frontier.id === "A11"));
  assert.ok(metadata.findings.some(finding => finding.sources.some(source => source.includes("1788_all_finite_escapes"))));
  assert.ok(metadata.chapters.every(chapter => typeof chapter.archetype === "string"));
});

test("every citation resolves inside the repository", () => {
  const sources = new Set([
    ...metadata.chapters.flatMap(chapter => chapter.sources),
    ...metadata.proofDetails.flatMap(detail => detail.sources),
    ...metadata.claimDetails.flatMap(detail => detail.sources),
    ...metadata.findings.flatMap(finding => finding.sources),
    ...metadata.frontiers.flatMap(frontier => frontier.sources),
  ]);
  assert.equal(sources.size, metadata.citationCount);
  for (const source of sources) assert.equal(existsSync(new URL(source, root)), true, source);
});

test("the repository front door advertises both reading surfaces", () => {
  assert.match(repositoryReadme, /book\/edition-3\/README\.md/u);
  assert.match(repositoryReadme, /docs\/edition-3\/index\.html/u);
  assert.match(coverHtml, /Fourteen substantial reader chapters \+ interactive atlas/u);
  assert.match(coverHtml, /08-admissibility-frontier\.html/u);
  assert.match(coverHtml, /09-research-frontier\.html/u);
  assert.match(coverHtml, /10-provenance-and-reading-map\.html/u);
  assert.match(coverHtml, /11-concept-atlas\.html/u);
});
