import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/admissibility-seam-channel-collapse-separation-v1.json", root), "utf8"));
const document = readFileSync(new URL("corpus/programmes/admissibility/admissibility_135_a_seam_changes_continuations_but_does_not_by_itself_trigger_decay.md", root), "utf8");

const one = [[1, 0], [0, 1]];
const I = [[0, -1], [1, 0]];
const J = [[0, 1], [1, 0]];
const add = (A, B) => A.map((row, i) => row.map((value, j) => value + B[i][j]));
const scale = (s, A) => A.map(row => row.map(value => s * value));
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const maxError = (A, B) => Math.max(...A.flatMap((row, i) => row.map((value, j) => Math.abs(value - B[i][j]))));

for (const [a, b] of [[1, 0], [0, 1], [1, 1], [2, 0.5], [0.25, 1.5]]) {
  const G = add(scale(a, I), scale(b, J));
  assert.ok(maxError(multiply(G, G), scale(b * b - a * a, one)) < 1e-12);
}

assert.equal(evidence.packet, "AZ-135");
assert.equal(evidence.localGenerator.finiteFlowInvertible, true);
for (const value of Object.values(evidence.separations)) assert.equal(value, false);
assert.equal(evidence.coupledSectorModel.widthRequiresCouplingAndOnShellContinuation, true);
assert.equal(evidence.wzConjecture.status, "conditional_not_derived");
assert.equal(evidence.wzConjecture.spin23EmbeddingDerived, false);
assert.equal(evidence.wzConjecture.additionalChannelDerived, false);
assert.ok(evidence.continuationsBeforeCollapse.length >= 5);

for (const required of [
  "does not by itself trigger decay",
  "Local no-return is not global noninvertibility",
  "The seam is a branching boundary",
  "The exit point is not automatically a centroid",
  "Conditional W/Z reading",
  "Claim 2 does not prove claim 3",
  "Minimal coupled-sector model",
  "Collapse gate",
  "a total-width fit alone is insufficient"
]) assert.ok(document.includes(required), `missing required boundary text: ${required}`);

console.log(JSON.stringify({
  result: "pass",
  packet: evidence.packet,
  exactMatrixIdentity: "G^2=(b^2-a^2)1",
  prohibitedImplications: Object.keys(evidence.separations).length,
  unresolvedPhysicalBridges: ["Spin(2,3) embedding", "additional W/Z channel", "separating detector record"],
  nextGate: evidence.nextGate
}, null, 2));
