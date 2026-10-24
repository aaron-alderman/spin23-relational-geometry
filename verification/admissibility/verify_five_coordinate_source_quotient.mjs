import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const data = JSON.parse(readFileSync(resolve(root, "evidence/data/five-coordinate-source-quotient-v1.json"), "utf8"));
const fail = message => { throw new Error(message); };
const close = (a, b, label) => { if (Math.abs(a - b) > 1e-12) fail(`${label}: ${a} != ${b}`); };
const det = input => {
  const A = input.map(row => [...row]);
  let value = 1;
  for (let c = 0; c < A.length; c += 1) {
    let p = c;
    while (p < A.length && Math.abs(A[p][c]) < 1e-10) p += 1;
    if (p === A.length) return 0;
    if (p !== c) { [A[c], A[p]] = [A[p], A[c]]; value *= -1; }
    value *= A[c][c];
    const pivot = A[c][c];
    for (let i = c + 1; i < A.length; i += 1) {
      const f = A[i][c] / pivot;
      for (let j = c; j < A.length; j += 1) A[i][j] -= f * A[c][j];
    }
  }
  return value;
};

if (data.protocol !== "five-coordinate-source-quotient/1" || data.target !== "OT-047") fail("protocol or owner mismatch");
if (data.combinedRank !== 5 || data.quotient.dimensionAfterHyperchargeQuotient !== 5) fail("physical quotient must have five coordinates");
if (data.nullRepresentatives.yukawaOnHypercharge.some(Boolean) || data.nullRepresentatives.yukawaOnBL.some(Boolean)) fail("declared null representative violates a Yukawa row");
if (data.nullRepresentatives.anomalyOnHypercharge !== 0 || data.nullRepresentatives.anomalyOnBL !== 0) fail("declared null representative violates the independent anomaly row");
const expected = [2 / 3, (8 - Math.sqrt(37)) / 3, 2, (8 + Math.sqrt(37)) / 3].sort((a, b) => a - b);
data.yukawaChannelEigenvalues.forEach((value, i) => close(value, expected[i], `eigenvalue ${i}`));
for (const value of expected) close(det(data.yukawaChannelMetric.map((row, i) => row.map((x, j) => x - (i === j ? value : 0)))), 0, `characteristic root ${value}`);
if (data.incidence.deduplicated.image.join(",") !== "10,6,2,1,16") fail("deduplicated incidence image changed");
if (data.incidence.multiplicity.image.join(",") !== "10,6,4,1,16") fail("multiplicity incidence image changed");
for (const record of [data.incidence.deduplicated, data.incidence.multiplicity]) {
  const v = record.image.slice(0, 4);
  const mv = data.yukawaChannelMetric.map(row => row.reduce((sum, x, i) => sum + x * v[i], 0));
  const ratios = mv.map((x, i) => x / v[i]);
  if (Math.max(...ratios) - Math.min(...ratios) < 1e-10) fail("incidence unexpectedly became a Yukawa-channel eigenray");
}
if (data.verdict.exactTwoCurrentClosure !== "killed_at_leading_noncontact_yukawa_block") fail("two-current no-go missing");
if (!data.verdict.operationalReopening.includes("measured hierarchy")) fail("operational reopening gate missing");

console.log(JSON.stringify({ result: "pass", quotientCoordinates: data.quotient.coordinates, combinedRank: data.combinedRank, eigenvalues: data.yukawaChannelEigenvalues, incidenceImages: [data.incidence.deduplicated.image, data.incidence.multiplicity.image], verdict: data.verdict }, null, 2));
