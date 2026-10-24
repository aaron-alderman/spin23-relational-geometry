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

test("accretive control ledgers announce that they are not standalone syntheses", () => {
  for (const path of [
    "corpus/claims/0000-0099/00_research_document_map.md",
    "corpus/claims/0000-0099/30_research_frontier.md",
    "corpus/claims/0000-0099/40_grand_synthesis_spin23_pole.md",
    "corpus/claims/0000-0099/49_multi_branch_research_registry.md",
    "corpus/claims/0000-0099/91_multi_branch_active_goal_log.md",
  ]) assert.match(read(path), /preserves an accretive argument history and is not a standalone synthesis/u, path);
});
