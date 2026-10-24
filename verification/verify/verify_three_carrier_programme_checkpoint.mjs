import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const checkpoint = JSON.parse(readFileSync(new URL(
  "corpus/programmes/frontier/wave-7/three_carrier_programme_checkpoint_v1.json",
  root,
), "utf8"));
const taxonomy = JSON.parse(readFileSync(new URL(
  "corpus/registers/three_carrier_admissibility_taxonomy_v1.json",
  root,
), "utf8"));
const mixed = JSON.parse(readFileSync(new URL(
  "corpus/programmes/frontier/wave-7/mixed_admissibility_interface_v1.json",
  root,
), "utf8"));
const instruments = JSON.parse(readFileSync(new URL(
  "corpus/programmes/frontier/wave-7/science_admissibility_instrumentation_v1.json",
  root,
), "utf8"));

assert.equal(checkpoint.schema, "three-carrier-programme-checkpoint/v1");
assert.equal(checkpoint.verdict, "finite architecture exhausted; physical execution open");
assert.deepEqual(
  checkpoint.closedLayers.map(layer => layer.id),
  ["taxonomy", "mixed-interface", "vertical-slices", "instrumentation", "sourcery-algebra", "refinement"],
);
for (const layer of checkpoint.closedLayers) {
  assert.equal(existsSync(new URL(layer.certificate, root)), true, layer.certificate);
}

const science = taxonomy.carriers.scienceProgramme;
assert.equal(science.constructiveTwelve.length, 12);
assert.equal(science.guardrailFifteen.length, 15);
assert.equal(science.qrOrderedFundamentalBasis.returnLabels.length, 12);
assert.equal(mixed.integralInterface.latticeType, "A8");
assert.equal(mixed.integralInterface.rank, 8);
assert.equal(mixed.integralInterface.determinant, 9);
assert.equal(mixed.integralInterface.rootCount, 72);
assert.equal(instruments.counts.total, 39);

assert.equal(checkpoint.shortestUsefulRoute.id, "F05");
assert.deepEqual(checkpoint.shortestUsefulRoute.steps, [
  "wall-localizes-response",
  "integrate-positive-fluctuation",
  "gradient-return-step",
]);
assert.equal(checkpoint.openGates.length, 5);
assert.ok(checkpoint.firewalls.some(item => item.includes("not a claim that spacetime or matter is A8")));

console.log(JSON.stringify({
  status: "PASS",
  verdict: checkpoint.verdict,
  closedLayers: checkpoint.closedLayers.length,
  openGates: checkpoint.openGates.length,
  shortestUsefulRoute: checkpoint.shortestUsefulRoute.id,
  counts: { K: 12, G: 15, F: 12, total: instruments.counts.total },
  interface: { lattice: mixed.integralInterface.latticeType, rank: mixed.integralInterface.rank },
}));
