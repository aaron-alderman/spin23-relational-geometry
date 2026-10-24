import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/five-coordinate-source-quotient-v1.json");

const V = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];
const D = [6, 3, 3, 2, 1, 1, 1];
const A2 = [3, 0, 0, 1, 0, 0, 0];
const hypercharge6 = [1, -4, 2, -3, 6, 0, 3];
const bl3 = [1, -1, -1, -3, 3, 3, 0];
const lambdaDeduplicated = [5, 5, 1, 1, 1, 0, 0];
const lambdaMultiplicity = [5, 5, 1, 1, 3, 0, 0];

const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const matVec = (A, x) => A.map(row => dot(row, x));
const rank = input => {
  const A = input.map(row => row.map(Number));
  let r = 0;
  for (let c = 0; c < A[0].length && r < A.length; c += 1) {
    let p = r;
    while (p < A.length && Math.abs(A[p][c]) < 1e-10) p += 1;
    if (p === A.length) continue;
    [A[r], A[p]] = [A[p], A[r]];
    const pivot = A[r][c];
    for (let j = c; j < A[0].length; j += 1) A[r][j] /= pivot;
    for (let i = 0; i < A.length; i += 1) if (i !== r) {
      const f = A[i][c];
      for (let j = c; j < A[0].length; j += 1) A[i][j] -= f * A[r][j];
    }
    r += 1;
  }
  return r;
};
const M = V.map(rowI => V.map(rowJ => rowI.reduce((sum, x, k) => sum + x * rowJ[k] / D[k], 0)));
const eigenvalues = [2 / 3, 2, (8 - Math.sqrt(37)) / 3, (8 + Math.sqrt(37)) / 3].sort((a, b) => a - b);
const image = x => [...matVec(V, x), dot(A2, x)];
const dedupImage = image(lambdaDeduplicated);
const multiplicityImage = image(lambdaMultiplicity);

const result = {
  protocol: "five-coordinate-source-quotient/1",
  date: "2026-10-25",
  target: "OT-047",
  basis: ["Q", "u^c", "d^c", "L", "e^c", "nu^c", "H"],
  yukawaMap: V,
  freeSeparatedPointMetricDiagonal: D,
  yukawaChannelMetric: M,
  yukawaChannelEigenvalues: eigenvalues,
  independentAnomalyRow: A2,
  combinedRank: rank([...V, A2]),
  nullRepresentatives: { hypercharge6, bl3, yukawaOnHypercharge: matVec(V, hypercharge6), yukawaOnBL: matVec(V, bl3), anomalyOnHypercharge: dot(A2, hypercharge6), anomalyOnBL: dot(A2, bl3) },
  incidence: {
    deduplicated: { source: lambdaDeduplicated, image: dedupImage },
    multiplicity: { source: lambdaMultiplicity, image: multiplicityImage },
    commonRelation: "A2=A3=v_u+v_d=16 in the declared normalization",
    eigenrayTest: "fails: neither four-component Yukawa image is an eigenvector of M",
  },
  quotient: {
    coordinates: ["v_u", "v_d", "v_e", "v_nu", "a_2"],
    dimensionAfterHyperchargeQuotient: 5,
    uniqueNullAxisAfterHyperchargeQuotient: "3(B-L)",
    contactEomInsensitive: true,
  },
  verdict: {
    exactTwoCurrentClosure: "killed_at_leading_noncontact_yukawa_block",
    operationalReopening: "requires a measured hierarchy, threshold window or external projection yielding one stable broken singular direction plus B-L",
    nextCalculation: "five-by-five absorptive response with top, bottom, charged-lepton, neutrino and weak-anomaly cuts, followed by singular-spectrum and KMS-limit tests",
    physicalFirewall: "The exact quotient and leading block do not supply the full diagrammatic counterterms, threshold-matched response or finite-temperature rank.",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, combinedRank: result.combinedRank, eigenvalues, incidence: result.incidence, verdict: result.verdict }, null, 2));
