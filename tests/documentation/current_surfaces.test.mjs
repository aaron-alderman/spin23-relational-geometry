import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");
const json = path => JSON.parse(read(path));

test("reader-facing frontier counts come from the maintained registers", () => {
  const readme = read("README.md");
  const targets = json("corpus/programmes/frontier-physics-targets/frontier_physics_target_register_v1.json");
  const detectors = json("corpus/programmes/frontier-physics-targets/detector_frontier_register_v1.json");
  const experiments = json("corpus/programmes/frontier-physics-targets/frontier_experiment_atlas_v1.json");
  const topics = json("corpus/programmes/frontier-physics-targets/open_topics_register_v1.json");
  assert.match(readme, new RegExp(`${targets.coreTargets.length} physics targets`, "u"));
  assert.match(readme, new RegExp(`${detectors.frontierAreas.length} frontier areas`, "u"));
  assert.match(readme, new RegExp(`${detectors.detectors.length} detector bundles`, "u"));
  assert.match(readme, new RegExp(`${experiments.experiments.length} experiments`, "u"));
  assert.match(readme, new RegExp(`${topics.topics.length} maintained topics`, "u"));
});

test("the synthesis and book stand on their arguments rather than corpus chronology", () => {
  const synthesis = read("corpus/syntheses/the_admissibility_frontier_current_synthesis.md");
  const cover = read("book/edition-3/README.md");
  const frontMatter = read("book/edition-3/chapters/00-front-matter.md");
  for (const surface of [synthesis, cover, frontMatter]) {
    assert.doesNotMatch(surface, /successor,? not replacement|current continuation|later corpus|predates the corpus|historical layer/iu);
  }
  assert.match(synthesis, /The strong ontological thesis[\s\S]*remains open/iu);
  assert.match(cover, /Authority boundary/iu);
  assert.match(frontMatter, /Scope and method/u);
});

test("reader entrances preserve the Jordan-to-admissibility-to-Lie explanatory order", () => {
  const contract = read("corpus/READING_CONTRACT.md");
  const readme = read("README.md");
  const corpusReadme = read("corpus/README.md");
  const synthesis = read("corpus/syntheses/the_admissibility_frontier_current_synthesis.md");
  for (const [name, surface] of Object.entries({ contract, readme, corpusReadme, synthesis })) {
    assert.match(surface, /Jordan admission and composition/iu, name);
    assert.match(surface, /typed admissibility region/iu, name);
    assert.match(surface, /Lie transformation and transport/iu, name);
  }
  assert.match(contract, /not the starting premise, the centre of interpretation/iu);
  assert.match(synthesis, /not the starting claim/iu);
  assert.match(readme, /not the prior container/iu);
});

test("the book presents admissibility before its Spin completion", () => {
  const metadata = json("book/edition-3/book.json");
  const cover = read("book/edition-3/README.md");
  assert.equal(metadata.chapters[1].slug, "08-admissibility-frontier");
  assert.equal(metadata.chapters[2].slug, "01-the-revised-spine");
  assert.match(cover, /^# The admissibility frontier/mu);
  assert.match(cover, /Spin₀\(2,3\).*not the premise or centre/iu);
});

test("LLM retrieval has a canonical interpretation surface", () => {
  const llms = read("llms.txt");
  assert.match(llms, /Canonical interpretation: corpus\/READING_CONTRACT\.md/u);
  assert.match(llms, /Jordan admission and composition[\s\S]*typed admissibility region[\s\S]*Lie transformation and transport/u);
  assert.match(llms, /Before naming a Lie group/u);
  assert.match(llms, /it has reversed the corpus's explanatory order/u);
  assert.match(llms, /Required bridge grammar/u);
  assert.match(llms, /optional menu, not prerequisites/u);
});

test("the explanatory standard makes reasons, differences and optional readings explicit", () => {
  const standard = read("corpus/EXPLANATORY_STANDARD.md");
  for (const phrase of [
    "Begin with things before abstractions",
    "Every connection must carry a reason",
    "Open and closed are two-dimensional",
    "State implications and non-implications together",
    "Pictures and speculative readings form a menu",
    "Deletion test",
    "Substitution test",
    "practical hope before optional arcs",
  ]) assert.match(standard, new RegExp(phrase, "iu"), phrase);
});

test("hope ends in useful work before the optional speculative and theological arcs", () => {
  const synthesis = read("corpus/syntheses/the_admissibility_frontier_current_synthesis.md");
  const optional = read("corpus/syntheses/admissibility_optional_endpoints_mythic_and_theological_readings.md");
  const metadata = json("book/edition-3/book.json");
  assert.match(synthesis, /Why there is hope: this is where to look/u);
  assert.match(synthesis, /theoretical or engineering improvement/iu);
  assert.match(synthesis, /route to new physics/iu);
  assert.equal(metadata.chapters.at(-1).slug, "12-optional-endpoints-and-readings");
  assert.match(optional, /These are not promises of anomalies/iu);
  assert.match(optional, /T0 — God exists/u);
  assert.match(optional, /does not run backward/iu);
  assert.match(optional, /mythic picture must remain unchanged|scientific claim must remain unchanged/iu);
});

test("accretive control ledgers announce that they are not standalone syntheses", () => {
  for (const path of [
    "corpus/claims/0000-0099/00_research_document_map.md",
    "corpus/claims/0000-0099/30_research_frontier.md",
    "corpus/claims/0000-0099/40_grand_synthesis_spin23_pole.md",
    "corpus/claims/0000-0099/49_multi_branch_research_registry.md",
    "corpus/claims/0000-0099/91_multi_branch_active_goal_log.md",
  ]) {
    const ledger = read(path);
    assert.match(ledger, /preserves an accretive argument history and is not a standalone synthesis/u, path);
    assert.match(ledger, /canonical reading contract/u, path);
    assert.match(ledger, /not the programme's prior container/u, path);
  }
});
