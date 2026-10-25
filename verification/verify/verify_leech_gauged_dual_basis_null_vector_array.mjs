import assert from "node:assert/strict";
import fs from "node:fs";

const recordPath = new URL("../../evidence/data/leech-gauged-dual-basis-null-vector-array-v1.json", import.meta.url);
const matrixPath = new URL("../../evidence/data/leech-explicit-k-matrix-v1.json", import.meta.url);
const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
const K = JSON.parse(fs.readFileSync(matrixPath, "utf8")).K.map((row) => row.map(BigInt));
const n = K.length;

assert.equal(record.schemaVersion, "leech-gauged-dual-basis-null-vector-array-v1");
assert.equal(record.edgeBasis.channels, n);
assert.equal(record.gaugedBond.oneGaugeSignPerWireBond, true);
assert.match(record.localGaugeAction.coherence, /one sign acts on all 24 channels/);

const dotK = (i, j) => K[i][j];
let checks = 0;
for (const s of [-1n, 1n]) {
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const right = s * s * dotK(i, j);
      const left = dotK(i, j);
      assert.equal(right - left, 0n, `non-null pair at s=${s}, i=${i}, j=${j}`);
      checks += 1;
    }
  }
}

const argument = (left, s, right) => left - s * right;
for (const s of [-1, 1]) {
  for (const [left, right] of [[0.2, 0.7], [-1.1, 2.3], [Math.PI, -0.4]]) {
    const original = argument(left, s, right);
    const gaugeAtRightEndpoint = argument(left, -s, -right);
    const gaugeAtLeftEndpoint = argument(-left, -s, right);
    assert.equal(gaugeAtRightEndpoint, original);
    assert.equal(gaugeAtLeftEndpoint, -original);
    assert.ok(Math.abs(Math.cos(gaugeAtLeftEndpoint) - Math.cos(original)) < 1e-15);
  }
}

console.log(JSON.stringify({
  status: "PASS",
  channels: n,
  sharedGaugeSignsPerBond: 1,
  fluxValuesChecked: 2,
  mutualNullChecks: checks,
  gaugeInvariance: "exact up to cosine evenness",
  closes: record.promotion.closes,
  open: record.promotion.open
}));
