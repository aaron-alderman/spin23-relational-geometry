import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const outputPath = resolve(import.meta.dirname, "../evidence/data/five-coordinate-running-window-v1.json");
const pi16 = 16 * Math.PI ** 2;
const D = [6, 3, 3, 2, 1, 1, 1];
const T = [
  [1, 1, 0, 0, 0, 0, 1], [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1], [0, 0, 0, 1, 0, 1, 1],
  [3, 0, 0, 1, 0, 0, 0],
];
const N = T.map(a => T.map(b => a.reduce((s, x, i) => s + x * b[i] / D[i], 0)));
const startGeV = 173;
const initial = { g1: 0.358, g2: 0.648, g3: 1.1666, yt: 0.9369, yb: 0.0164, ytau: 0.0102, ynu: 5.75e-13 };
const sampleGeV = [400, 1000, 3000, 10000, 100000];

const beta = x => {
  const { g1, g2, g3, yt, yb, ytau, ynu } = x;
  const trace = 3 * yt ** 2 + 3 * yb ** 2 + ytau ** 2 + ynu ** 2;
  return {
    g1: (41 / 6) * g1 ** 3 / pi16,
    g2: (-19 / 6) * g2 ** 3 / pi16,
    g3: -7 * g3 ** 3 / pi16,
    yt: yt * (1.5 * (yt ** 2 - yb ** 2) + trace - 17 * g1 ** 2 / 12 - 9 * g2 ** 2 / 4 - 8 * g3 ** 2) / pi16,
    yb: yb * (1.5 * (yb ** 2 - yt ** 2) + trace - 5 * g1 ** 2 / 12 - 9 * g2 ** 2 / 4 - 8 * g3 ** 2) / pi16,
    ytau: ytau * (1.5 * (ytau ** 2 - ynu ** 2) + trace - 15 * g1 ** 2 / 4 - 9 * g2 ** 2 / 4) / pi16,
    ynu: ynu * (1.5 * (ynu ** 2 - ytau ** 2) + trace - 3 * g1 ** 2 / 4 - 9 * g2 ** 2 / 4) / pi16,
  };
};
const add = (x, k, h) => Object.fromEntries(Object.keys(x).map(key => [key, x[key] + h * k[key]]));
const rk4 = (x, h) => {
  const k1 = beta(x), k2 = beta(add(x, k1, h / 2)), k3 = beta(add(x, k2, h / 2)), k4 = beta(add(x, k3, h));
  return Object.fromEntries(Object.keys(x).map(key => [key, x[key] + h * (k1[key] + 2 * k2[key] + 2 * k3[key] + k4[key]) / 6]));
};
const runTo = target => {
  const total = Math.log(target / startGeV);
  const steps = Math.max(100, Math.ceil(total / 0.002));
  let x = { ...initial };
  for (let i = 0; i < steps; i += 1) x = rk4(x, total / steps);
  return x;
};
const eigensystem = input => {
  const A = input.map(r => r.slice());
  const n = A.length;
  const Q = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
  for (let z = 0; z < 200; z += 1) {
    let p = 0, q = 1, best = 0;
    for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) if (Math.abs(A[i][j]) > best) [best, p, q] = [Math.abs(A[i][j]), i, j];
    if (best < 1e-14) break;
    const phi = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
    const c = Math.cos(phi), s = Math.sin(phi);
    for (let k = 0; k < n; k += 1) { const x = A[p][k], y = A[q][k]; A[p][k] = c * x - s * y; A[q][k] = s * x + c * y; }
    for (let k = 0; k < n; k += 1) {
      const x = A[k][p], y = A[k][q]; A[k][p] = c * x - s * y; A[k][q] = s * x + c * y;
      const u = Q[k][p], v = Q[k][q]; Q[k][p] = c * u - s * v; Q[k][q] = s * u + c * v;
    }
  }
  return A.map((r, i) => ({ value: Math.max(0, r[i]), vector: Q.map(row => row[i]) })).sort((a, b) => b.value - a.value);
};
const rows = sampleGeV.map(mu => {
  const c = runTo(mu);
  const weights = [3 * c.yt ** 2, 3 * c.yb ** 2, c.ytau ** 2, c.ynu ** 2, 9 * c.g2 ** 4 / (64 * Math.PI ** 2)];
  const S = N.map((row, i) => row.map((entry, j) => Math.sqrt(weights[i]) * entry * Math.sqrt(weights[j])));
  const modes = eigensystem(S);
  return { muGeV: mu, couplings: c, weights, relativeSpectrum: modes.map(m => m.value / modes[0].value), leadingVector: modes[0].vector };
});
const dot = (a, b) => Math.abs(a.reduce((s, x, i) => s + x * b[i], 0));
const reference = rows[0].leadingVector;
for (const row of rows) row.leadingOverlapWith400GeV = dot(reference, row.leadingVector);
const secondRatios = rows.map(row => row.relativeSpectrum[1]);
const result = {
  protocol: "five-coordinate-running-window/1", date: "2026-10-25", target: "OT-047", parent: "AZ-069",
  approximation: "one-loop, third-family, unbroken-phase MS-like diagnostic; rounded boundary inputs at 173 GeV",
  betaFunctionReference: "https://arxiv.org/abs/1212.6829",
  startGeV, initial, sampleGeV, coordinateMetric: N, rows,
  gates: {
    percentRankOneAcrossWindow: rows.every(row => row.relativeSpectrum[1] < 1e-2),
    perMilleRankOneAcrossWindow: rows.every(row => row.relativeSpectrum[1] < 1e-3),
    leadingDirectionStableAt1eMinus5: rows.every(row => row.leadingOverlapWith400GeV > 1 - 1e-5),
    secondRatioRange: [Math.min(...secondRatios), Math.max(...secondRatios)],
  },
  firewall: "This running check does not include electroweak threshold matching, two-loop uncertainties, hadronic data, interference or detector covariance.",
};
if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, gates: result.gates, rows: rows.map(r => ({ muGeV: r.muGeV, second: r.relativeSpectrum[1], overlap: r.leadingOverlapWith400GeV })) }, null, 2));
