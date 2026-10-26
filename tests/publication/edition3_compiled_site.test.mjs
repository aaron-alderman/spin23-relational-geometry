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

test("every deployed HTML page carries the Google site-verification token", () => {
  const htmlFiles = filesBelow(artifactRoot).filter(path => path.endsWith(".html"));
  assert.ok(htmlFiles.length > 100, "expected the complete generated publication");
  const missing = htmlFiles
    .filter(path => !readFileSync(path, "utf8").includes('<meta name="google-site-verification" content="9WwsoUYrUkaJiln-l2ByjjyKOs7jVuMGIJp3rrdjFPA">'))
    .map(path => relative(artifactRoot, path));
  assert.deepEqual(missing, []);

  const homepage = readFileSync(join(artifactRoot, "index.html"), "utf8");
  assert.match(homepage, /url=edition-3\/index\.html/u);
});

test("the public entry points expose a large, absolute social card", () => {
  const expectedImage = "https://aaron-alderman.github.io/spin23-relational-geometry/edition-3/assets/relational-geometry-hero.png";
  const expectedCanonical = "https://aaron-alderman.github.io/spin23-relational-geometry/edition-3/";
  for (const path of [join(artifactRoot, "index.html"), join(siteRoot, "index.html")]) {
    const html = readFileSync(path, "utf8");
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/u);
    assert.match(html, /<meta name="twitter:title" content="[^"]+">/u);
    assert.match(html, /<meta name="twitter:description" content="[^"]+">/u);
    assert.ok(html.includes(`<meta name="twitter:image" content="${expectedImage}">`));
    assert.ok(html.includes(`<meta property="og:image" content="${expectedImage}">`));
    assert.ok(html.includes(`<meta property="og:url" content="${expectedCanonical}">`));
    assert.ok(html.includes(`<link rel="canonical" href="${expectedCanonical}">`));
  }

  const chapter = readFileSync(join(siteRoot, "03-projective-loop.html"), "utf8");
  assert.match(chapter, /<meta property="og:url" content="https:\/\/aaron-alderman\.github\.io\/spin23-relational-geometry\/edition-3\/03-projective-loop\.html">/u);
  assert.match(chapter, /<link rel="canonical" href="https:\/\/aaron-alderman\.github\.io\/spin23-relational-geometry\/edition-3\/03-projective-loop\.html">/u);
});

test("short articles are discoverable, shareable and machine-readable without duplicating their chapter URLs", () => {
  const articleSlugs = [
    "01-the-revised-spine",
    "02-one-carrier-two-faces-three-relations",
    "03-projective-loop",
    "04-furey-interface",
    "05-standard-model-seam",
    "06-proton-safety",
    "07-exceptional-horizon",
  ];
  const standaloneArticles = [
    ["monster-distributed-search", /parallelize the searches, but serialize the promotions/u, /Canonical research source →/u],
    ["typed-object-signatures", /The dimensional firewall/u, /Complete circulation paper →/u],
    ["conversational-contact", /Why this is the correct starting point/u, /Canonical research source →/u],
    ["pagerank-selection-finesse", /The exact mechanism/u, /Canonical research source →/u],
    ["measurement-creates-branches", /trajectory collapse/u, /Canonical research source →/u],
    ["local-information-global-identification", /globally two-to-one/u, /Canonical research source →/u],
    ["two-mode-phase", /three-mode loop/u, /Canonical research source →/u],
    ["lithium-niobate-relational-workbench", /Phase matching is an admissibility condition/u, /Canonical research source →/u],
  ];
  const index = readFileSync(join(siteRoot, "articles", "index.html"), "utf8");
  assert.match(index, /<h1>Articles<\/h1>/u);
  assert.match(index, /Short, shareable routes into the corpus/u);
  assert.equal([...index.matchAll(/<article class="article-card">/gu)].length, articleSlugs.length + standaloneArticles.length);
  assert.match(index, /Post on X/u);

  const monsterArticle = readFileSync(join(siteRoot, "articles", "monster-distributed-search.html"), "utf8");
  const monsterCard = "https://aaron-alderman.github.io/spin23-relational-geometry/edition-3/assets/monster-distributed-search-social.jpg";
  assert.ok(monsterArticle.includes(`<meta property="og:image" content="${monsterCard}">`));
  assert.ok(monsterArticle.includes(`<meta property="og:image:secure_url" content="${monsterCard}">`));
  assert.ok(monsterArticle.includes('<meta property="og:image:type" content="image/jpeg">'));
  assert.ok(monsterArticle.includes('<meta property="og:image:width" content="1200">'));
  assert.ok(monsterArticle.includes('<meta property="og:image:height" content="630">'));
  assert.ok(monsterArticle.includes(`<meta name="twitter:image" content="${monsterCard}">`));
  assert.ok(monsterArticle.includes(`"image":["${monsterCard}"]`));
  assert.ok(monsterArticle.includes('A luminous geometric ladder rises from physical hardware'));
  assert.match(monsterArticle, /Enter the Halloween Monster Hunt/u);
  assert.match(monsterArticle, /href="https:\/\/aaron-alderman\.github\.io\/halloween-monster-hunt\/"/u);
  assert.match(monsterArticle, /Open the dedicated site →/u);
  assert.match(index, /Bluesky/u);
  assert.match(index, /href="typed-object-signatures\.html"/u);
  for (const [slug] of standaloneArticles) assert.match(index, new RegExp(`href="${slug}\\.html"`, "u"), slug);

  for (const slug of articleSlugs) {
    assert.ok(index.includes(`href="../${slug}.html"`), slug);
    const html = readFileSync(join(siteRoot, `${slug}.html`), "utf8");
    assert.match(html, /<meta property="og:type" content="article">/u, slug);
    assert.match(html, /<script type="application\/ld\+json">/u, slug);
    assert.match(html, /"@type":"Article"/u, slug);
    assert.match(html, new RegExp(`"url":"https://aaron-alderman.github.io/spin23-relational-geometry/edition-3/${slug}\\.html"`, "u"), slug);
    assert.match(html, /Share this article/u, slug);
    assert.match(html, /twitter\.com\/intent\/tweet/u, slug);
    assert.match(html, /bsky\.app\/intent\/compose/u, slug);
  }

  const frontMatter = readFileSync(join(siteRoot, "00-front-matter.html"), "utf8");
  assert.match(frontMatter, /<meta property="og:type" content="website">/u);
  assert.doesNotMatch(frontMatter, /Share this article/u);

  const signatureSource = readFileSync(join(root, "docs", "papers", "typed_object_signatures_physics_epistemics_programming_article.md"), "utf8");
  const signatureWords = signatureSource.trim().split(/\s+/u).length;
  assert.ok(signatureWords >= 900 && signatureWords <= 1_800, `expected a light article, received ${signatureWords} words`);
  const signatureArticle = readFileSync(join(siteRoot, "articles", "typed-object-signatures.html"), "utf8");
  assert.match(signatureArticle, /What Physics, Knowledge, and Programs Share/u);
  assert.match(signatureArticle, /<meta property="og:type" content="article">/u);
  assert.match(signatureArticle, /"@type":"Article"/u);
  assert.match(signatureArticle, /Share this article/u);
  assert.match(signatureArticle, /The dimensional firewall/u);
  assert.match(signatureArticle, /Complete circulation paper →/u);

  for (const [slug, bodyPattern, sourcePattern] of standaloneArticles) {
    const html = readFileSync(join(siteRoot, "articles", `${slug}.html`), "utf8");
    assert.match(html, /<meta property="og:type" content="article">/u, slug);
    assert.match(html, /<script type="application\/ld\+json">/u, slug);
    assert.match(html, /"@type":"Article"/u, slug);
    assert.match(html, new RegExp(`"url":"https://aaron-alderman.github.io/spin23-relational-geometry/edition-3/articles/${slug}\\.html"`, "u"), slug);
    assert.match(html, /Share this article/u, slug);
    assert.match(html, /twitter\.com\/intent\/tweet/u, slug);
    assert.match(html, /bsky\.app\/intent\/compose/u, slug);
    assert.match(html, bodyPattern, slug);
    assert.match(html, sourcePattern, slug);
  }

  const monsterHunt = readFileSync(join(siteRoot, "articles", "monster-distributed-search.html"), "utf8");
  assert.match(monsterHunt, /\\\(8\\times 10\^\{53\}\\\)/u, "Monster order must retain inline-math delimiters");
  assert.match(monsterHunt, /\\\(V\^\\natural\\\)/u, "Moonshine module notation must retain inline-math delimiters");
  assert.match(monsterHunt, /\\\(E_8\^3\\\)/u, "rank-24 lattice notation must retain inline-math delimiters");
  assert.match(monsterHunt, /\\\(J\(q\)\\\)/u, "modular-function notation must retain inline-math delimiters");
  assert.match(monsterHunt, /Moonshine module V♮/u, "the preformatted proof ladder must use a readable non-TeX fallback");
  assert.doesNotMatch(monsterHunt, /Moonshine module V\^natural/u, "preformatted code must not expose raw TeX-like notation");
  assert.doesNotMatch(monsterHunt, /(?<!\\)\((?:8\\times|V\^\\natural|E_8|J\(q\))/u, "known article mathematics must not fall back to prose parentheses");
  assert.doesNotMatch(monsterHunt, /E<em>8\^3/u, "underscores in unrendered E8 notation must not become Markdown emphasis");

  const lithium = readFileSync(join(siteRoot, "articles", "lithium-niobate-relational-workbench.html"), "utf8");
  const experiment = /<h2 id="a-practical-experiment-for-the-corpus">[\s\S]*?<h2 id="what-the-material-changes">/u.exec(lithium)?.[0] || "";
  assert.equal([...experiment.matchAll(/<ol(?:\s[^>]*)?>/gu)].length, 1, "the six-step experiment must be one ordered list");
  assert.equal([...experiment.matchAll(/<li>/gu)].length, 6, "the experiment must retain all six list items");
  assert.match(experiment, /<li>Fabricate or select[\s\S]*?optical or synthetic-frequency modes\.<\/li>/u);
  assert.match(experiment, /<li>Retain a coherent reference[\s\S]*?not intensity alone\.<\/li>/u);

  const signatures = readFileSync(join(siteRoot, "articles", "typed-object-signatures.html"), "utf8");
  assert.match(signatures, /<li>whether the object is an observation, claim, objection, inference, or recommendation;<\/li>/u, "wrapped unordered items must remain inside one list item");
  assert.match(signatures, /<li>physics without epistemic typing can overstate what a mathematical isomorphism establishes;<\/li>/u, "wrapped unordered article prose must not become a detached paragraph");
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
  assert.match(frontier, /<code>parallel\/<\/code>/u);
  assert.match(frontier, /Directory · 1 document</u);
  assert.match(frontier, /Open directory →/u);
  assert.doesNotMatch(frontier, /<code>corpus\/programmes\/frontier\/parallel\/<\/code>/u);
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

test("wrapped, loose and task lists retain their semantic structure", () => {
  const readingContract = readFileSync(join(siteRoot, "library", "corpus", "READING_CONTRACT.html"), "utf8");
  const vocabulary = /<ol><li><strong>Jordan asks what can coexist\.[\s\S]*?<p>The canonical development/u.exec(readingContract)?.[0] || "";
  assert.equal([...vocabulary.matchAll(/<ol(?:\s[^>]*)?>/gu)].length, 1, "blank lines must not restart one numbered vocabulary list");
  assert.equal([...vocabulary.matchAll(/<li>/gu)].length, 11, "the vocabulary list must preserve all eleven entries");
  assert.match(vocabulary, /<li><strong>Carrier, selector and detector are different jobs\.<\/strong>/u);

  const acceptance = readFileSync(join(siteRoot, "library", "corpus", "programmes", "document-acceptance", "spin23_foundational_document_acceptance_20261021.html"), "utf8");
  assert.match(acceptance, /<ul class="task-list">/u);
  assert.match(acceptance, /<input type="checkbox" disabled checked aria-label="Completed">/u);
  assert.match(acceptance, /<input type="checkbox" disabled aria-label="Incomplete">/u);
  assert.doesNotMatch(acceptance, /<li>\[[ xX]\]/u);

  const nested = readFileSync(join(siteRoot, "library", "corpus", "claims", "1000-1099", "1033_odd_frequency_car_pairing_reopens_the_single_doublet_and_limits_the_doubled_car_minimality_to_the_static_even_frequency_branch.html"), "utf8");
  const fork = /<p>The anomalous programme now forks:<\/p>([\s\S]*?)<p>Neither dominates yet\./u.exec(nested)?.[1] || "";
  assert.equal([...fork.matchAll(/<ol(?:\s[^>]*)?>/gu)].length, 1, "the two top-level branches must remain one ordered list");
  assert.equal([...fork.matchAll(/<ul(?:\s[^>]*)?>/gu)].length, 2, "each branch must retain its nested evidence list");
  assert.match(fork, /<li><strong>Single-doublet odd-frequency branch<\/strong><ul><li>common two-real internal plane;<\/li>/u);
});

test("parenthesized link destinations and emphasized labels survive compilation", () => {
  const nonlinear = readFileSync(join(siteRoot, "library", "corpus", "claims", "1700-1799", "1787_nonlinear_lorentz_realization_restores_a_positive_metric_but_produces_a_massive_vector_triplet.html"), "utf8");
  assert.match(nonlinear, /href="https:\/\/doi\.org\/10\.1016\/0370-2693\(80\)90739-X"/u);
  assert.match(nonlinear, /<a href="https:\/\/doi\.org\/10\.1016\/0370-2693\(80\)90739-X"><em>Nonlinear realizations of compact and noncompact gauge groups<\/em><\/a>/u);
  assert.doesNotMatch(nonlinear, /href="https:\/\/doi\.org\/10\.1016\/0370-2693\(80"/u);

  const measurement = readFileSync(join(siteRoot, "articles", "measurement-creates-branches.html"), "utf8");
  assert.match(measurement, /<a href="https:\/\/www\.nature\.com\/articles\/s42005-025-02443-0"><em>Postselection-free experimental observation/u);
  assert.doesNotMatch(measurement, /<a [^>]*>\*[^<]+\*<\/a>/u);
});

test("tilde-fenced corpus commands render as code and programme articles remain navigable", () => {
  const programme = readFileSync(join(siteRoot, "library", "corpus", "programmes", "programme-algebra", "README.html"), "utf8");
  assert.match(programme, /<h2 id="articles">Articles<\/h2>/u);
  assert.match(programme, /href="generated\/PROGRAMME_ALGEBRA_JOURNEYS\.html"/u);
  assert.match(programme, /href="generated\/PROGRAMME_ALGEBRA_RETRIEVAL_BENCHMARK\.html"/u);
  assert.match(programme, /<pre><code class="language-powershell">node tooling\/programme-algebra\/compile_programme_algebra\.mjs --write/u);
  assert.doesNotMatch(programme, /<p>~~~powershell/u);
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
