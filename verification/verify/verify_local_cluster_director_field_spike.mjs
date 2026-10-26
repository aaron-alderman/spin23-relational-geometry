import assert from "node:assert/strict";
import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL("../../evidence/data/local-cluster-director-field-spike-v1.json", import.meta.url), "utf8"));
assert.equal(evidence.frozenSelection.clusterNames.length, 8);
assert.match(evidence.frozenSelection.selectionTiming, /before any director estimates/u);
assert.equal(evidence.clusterDiagnostics.length, 8);
assert.ok(evidence.clusterDiagnostics.every(row => row.robustRvRows >= 20));
assert.ok(evidence.m44CrossCatalogueAcuteAngleDeg > 25);
const scores = evidence.leaveOneClusterOut;
assert.ok(scores.flat.meanProjectorComponentSquaredError < scores.smoothAffine.meanProjectorComponentSquaredError);
assert.ok(scores.smoothAffine.meanProjectorComponentSquaredError < scores.crease.meanProjectorComponentSquaredError);
assert.equal(evidence.result.preferredModel, "flat");
assert.equal(evidence.result.smoothBendingDetected, false);
assert.equal(evidence.result.creaseDetected, false);
assert.equal(evidence.result.curlOrFrobeniusTestAdmitted, false);
assert.match(evidence.result.reason, /no source-derived lift/u);
console.log(JSON.stringify({clusters: 8, preferredModel: "flat", smoothBendingDetected: false, creaseDetected: false, m44CrossCatalogueAcuteAngleDeg: evidence.m44CrossCatalogueAcuteAngleDeg}, null, 2));
console.log("PASS verify_local_cluster_director_field_spike");
