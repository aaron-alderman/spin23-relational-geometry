import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const record = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/dynatology/golden_ratio_bridge_v1.json"), "utf8"));
const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

assert.equal(record.schema, "dynatology-golden-ratio-bridge/1");
assert.equal(record.status, "exact_mathematical_bridge_source_specific_metric_test_open");

const sqrt5 = Math.sqrt(5);
const phi = (1 + sqrt5) / 2;
const conjugate = (1 - sqrt5) / 2;
assert.ok(near(phi ** 2, phi + 1));
assert.ok(near(phi * conjugate, -1));
assert.ok(near(2 * Math.cos(Math.PI / 5), phi));

const lambdaPlus = (3 + sqrt5) / 2;
const lambdaMinus = (3 - sqrt5) / 2;
assert.ok(near(lambdaPlus, phi ** 2));
assert.ok(near(lambdaMinus, phi ** -2));
assert.ok(near(lambdaPlus * lambdaMinus, 1));
assert.ok(near(lambdaPlus + lambdaMinus, 3));

assert.equal(record.dynamicCorpusContact.claim, 772);
assert.equal(record.dynamicCorpusContact.determinant, 1);
assert.equal(record.topkapiContact.currentStatus, "fivefold_incidence_documented_exact_metric_ratio_not_yet_measured");
assert.ok(record.topkapiContact.requiredMeasurements.includes("pentagon_diagonal_to_side_ratio"));
assert.match(record.globalLocalSeparation.fieldRelation, /not_a_quadratic_subfield/);
assert.match(record.exceptionalSignpost.boundary, /no_map_from_topkapi/i);

console.log("Dynatology golden-ratio bridge: PASS");
console.log(JSON.stringify({
  phi,
  phiSquared: phi ** 2,
  pentagonRatioResidual: Math.abs(2 * Math.cos(Math.PI / 5) - phi),
  transferProduct: lambdaPlus * lambdaMinus,
  sourceMetricStatus: record.topkapiContact.currentStatus
}));
