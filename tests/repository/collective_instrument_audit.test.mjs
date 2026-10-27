import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { auditCollectivePopulation } from "../../tooling/search/collective_instrument_audit.mjs";

const policy = JSON.parse(readFileSync(new URL("../../tooling/search/collective_instrument_policy_v1.json", import.meta.url), "utf8"));
const hash = value => value.toString(16).padStart(64, "0").slice(-64);

test("collective audit distinguishes replayable engineering volume from mature independent use", () => {
  const episodes = Array.from({ length: 30 }, (_, index) => ({
    episodeId: `ep_${index.toString(16).padStart(16, "0")}`,
    revision: 1,
    headSha256: hash(index + 1),
    objective: `objective-${index % 12}`,
    corpusContentSha256: hash(999),
    frozen: index < 2,
    turns: [{ plan: { adaptive: { sources: [{ path: `corpus/source-${index % 10}.md` }] } } }],
    proposals: [],
    replays: index < 12 ? [{}] : [],
    timeline: [{}],
    metrics: { turns: 1, answers: 1, approvedUpdates: 1, rejectedUpdates: 0, rollbacks: index < 2 ? 1 : 0 },
    authority: { changesTruthStatus: false, corpusPromotion: false, modelWeightTraining: false },
  }));
  const contributions = Array.from({ length: 12 }, (_, index) => ({
    contributionId: `contrib_${index.toString(16).padStart(16, "0")}`,
    revision: 1,
    headSha256: hash(index + 100),
    disposition: "pending",
    claim: null,
    impacts: [],
    proposed: { contributor: `agent-${index % 4}` },
    timeline: [{}],
    authority: { changesTruthStatus: false, corpusPromotion: false, modelWeightTraining: false, admissionEffect: false },
  }));
  const report = auditCollectivePopulation({ episodes, contributions, policy });
  assert.equal(report.gates.enoughEpisodes, true);
  assert.equal(report.gates.enoughUniqueObjectives, true);
  assert.equal(report.gates.allChainsReplayable, true);
  assert.equal(report.gates.authorityBoundariesPreserved, true);
  assert.equal(report.gates.independentEvidenceObserved, false);
  assert.equal(report.gates.negativeEpisodeGovernanceObserved, false);
  assert.equal(report.gates.positiveContributionGovernanceObserved, false);
  assert.equal(report.mature, false);
  assert.ok(report.missingGates.includes("independentEvidenceObserved"));
});
