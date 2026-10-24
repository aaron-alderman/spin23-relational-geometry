import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/yukawa-threshold-singular-spectrum-v1.json");

// Exact quotient metric M = V D^{-1} V^T from AZ-068.  If W(s) is the
// diagonal matrix of mutually exclusive absorptive channel weights, the
// nonzero generalized response eigenvalues are those of sqrt(W) M sqrt(W).
const M = [
  [3 / 2, -5 / 6, -1, 1],
  [-5 / 6, 3 / 2, 1, -1],
  [-1, 1, 5 / 2, -1 / 2],
  [1, -1, -1 / 2, 5 / 2],
];

const V = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];
const A2 = [3, 0, 0, 1, 0, 0, 0];
const D = [6, 3, 3, 2, 1, 1, 1];

const channels = [
  { name: "top", coordinate: "v_u", massGeV: 172.5, multiplicity: 3 },
  { name: "bottom", coordinate: "v_d", massGeV: 4.18, multiplicity: 3 },
  { name: "tau", coordinate: "v_e", massGeV: 1.77686, multiplicity: 1 },
  { name: "Dirac-neutrino", coordinate: "v_nu", massGeV: 5e-11, multiplicity: 1 },
];

const energiesGeV = [4, 10, 100, 170, 300, 400, 1000];
const relativeTolerances = [1e-2, 1e-3, 1e-4, 1e-6, 1e-12];

const weight = (channel, rootS) => {
  const m = channel.massGeV;
  if (rootS <= 2 * m) return 0;
  return channel.multiplicity * m ** 2 * Math.sqrt(1 - (4 * m ** 2) / (rootS ** 2));
};

// Jacobi diagonalization is sufficient for this real symmetric 4x4 block.
const eigensystem = input => {
  const A = input.map(row => row.slice());
  const n = A.length;
  const Q = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
  for (let iteration = 0; iteration < 100; iteration += 1) {
    let p = 0;
    let q = 1;
    let largest = 0;
    for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) {
      if (Math.abs(A[i][j]) > largest) [largest, p, q] = [Math.abs(A[i][j]), i, j];
    }
    if (largest < 1e-12) break;
    const phi = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
    const c = Math.cos(phi);
    const s = Math.sin(phi);
    for (let k = 0; k < n; k += 1) {
      const apk = A[p][k];
      const aqk = A[q][k];
      A[p][k] = c * apk - s * aqk;
      A[q][k] = s * apk + c * aqk;
    }
    for (let k = 0; k < n; k += 1) {
      const akp = A[k][p];
      const akq = A[k][q];
      A[k][p] = c * akp - s * akq;
      A[k][q] = s * akp + c * akq;
      const qkp = Q[k][p];
      const qkq = Q[k][q];
      Q[k][p] = c * qkp - s * qkq;
      Q[k][q] = s * qkp + c * qkq;
    }
  }
  return A.map((row, i) => ({ value: Math.max(0, row[i]), vector: Q.map(qrow => qrow[i]) }))
    .sort((a, b) => b.value - a.value);
};

const spectrumAt = rootS => {
  const weights = channels.map(channel => weight(channel, rootS));
  const S = M.map((row, i) => row.map((entry, j) => Math.sqrt(weights[i]) * entry * Math.sqrt(weights[j])));
  const modes = eigensystem(S);
  const leading = modes[0].value;
  const effectiveRanks = Object.fromEntries(relativeTolerances.map(tolerance => [String(tolerance), modes.filter(mode => mode.value > tolerance * leading).length]));
  const leadingVector = modes[0].vector;
  const norm = Math.hypot(...leadingVector) || 1;
  return {
    rootSGeV: rootS,
    openChannels: channels.filter((_, i) => weights[i] > 0).map(channel => channel.name),
    weights: Object.fromEntries(channels.map((channel, i) => [channel.name, weights[i]])),
    exactYukawaRank: weights.filter(x => x > 0).length,
    generalizedEigenvaluesDescending: modes.map(mode => mode.value),
    relativeSpectrum: modes.map(mode => leading ? mode.value / leading : 0),
    effectiveRanks,
    leadingChannelVector: Object.fromEntries(channels.map((channel, i) => [channel.coordinate, leadingVector[i] / norm])),
  };
};

const spectra = energiesGeV.map(spectrumAt);
const T = [...V, A2];
const fiveCoordinateMetric = T.map(rowI => T.map(rowJ => rowI.reduce((sum, x, k) => sum + x * rowJ[k] / D[k], 0)));
const highEnergyInputs = {
  regime: "illustrative weakly coupled unbroken phase",
  yukawaWeights: { v_u: 3, v_d: 0.0018, v_e: 0.0001, v_nu: 1e-24 },
  weakGaugeCoupling: 0.65,
  primaryNormalization: "chi=(g_2^2/(64 pi^2)) epsilon W W; rho_chi/s^2=d_A c_chi^2 g_2^4/pi at T=0 with d_A=3",
};
const anomalyWeightInYukawaUnits = (9 / (64 * Math.PI ** 2)) * highEnergyInputs.weakGaugeCoupling ** 4;
const highEnergyWeights = [...Object.values(highEnergyInputs.yukawaWeights), anomalyWeightInYukawaUnits];
const highEnergyS = fiveCoordinateMetric.map((row, i) => row.map((entry, j) => Math.sqrt(highEnergyWeights[i]) * entry * Math.sqrt(highEnergyWeights[j])));
const highEnergyModes = eigensystem(highEnergyS);
const highEnergyLeading = highEnergyModes[0].value;
const highEnergyBenchmark = {
  inputs: highEnergyInputs,
  anomalyWeightInCommonYukawaUnits: anomalyWeightInYukawaUnits,
  coordinateMetric: fiveCoordinateMetric,
  generalizedEigenvaluesDescending: highEnergyModes.map(mode => mode.value),
  relativeSpectrum: highEnergyModes.map(mode => mode.value / highEnergyLeading),
  effectiveRanks: Object.fromEntries(relativeTolerances.map(tolerance => [String(tolerance), highEnergyModes.filter(mode => mode.value > tolerance * highEnergyLeading).length])),
  interpretation: "The weak-anomaly atom is loop suppressed but comparable to the illustrative bottom weight. The top mode is unique at percent resolution but a second mode is resolved at 0.1% in this benchmark; this is an unbroken-phase normalization check, not a threshold-matched Standard-Model prediction.",
  primaryReference: "https://arxiv.org/abs/2209.13804, eqs. (2.1) and (A.42 footnote continuum result)",
};
const result = {
  protocol: "yukawa-threshold-singular-spectrum/1",
  date: "2026-10-25",
  target: "OT-047",
  parent: "AZ-068",
  coordinateOrder: channels.map(channel => channel.coordinate),
  quotientMetric: M,
  thresholdModel: {
    formula: "w_f(E)=n_f m_f^2 sqrt(1-4m_f^2/E^2) Theta(E-2m_f)",
    status: "leading broken-phase free-fermion diagnostic",
    massesAndMultiplicities: channels,
    limitations: [
      "The bottom and low-energy quark regions need hadronic spectral data rather than free-quark thresholds.",
      "Running masses, radiative mixing, detector response and uncertainty bands are not included.",
      "The independent weak-anomaly coordinate a_2 is not assigned a weight because its matched normalization and cuts are a separate calculation.",
    ],
  },
  generalizedProblem: "The nonzero eigenvalues of V^T W V x = r D x equal the eigenvalues of sqrt(W) M sqrt(W).",
  relativeTolerances,
  spectra,
  highEnergyFiveCoordinateBenchmark: highEnergyBenchmark,
  conclusions: {
    exactRankOneWindow: "absent above the tau threshold on the nonzero-Dirac-neutrino branch; every newly open exclusive cut adds a positive direction",
    effectiveRankOneWindows: "present in this leading Yukawa-only diagnostic at 4 GeV and again above the top threshold for percent-to-per-mille tolerances",
    bottomWindow: "not rank one at percent resolution in the sampled 10-300 GeV range because the tau direction remains visible",
    anomalyFirewall: "The leading unbroken-phase weak-anomaly normalization can be included: it leaves the illustrative top mode isolated at 1% but not 0.1%; no broken-phase five-coordinate verdict is permitted until electroweak threshold matching is supplied.",
    operationalMeaning: "A rank-two full-current description can only mean protected B-L plus one experimentally unresolved broken mode over a declared finite window; it is never an exact microscopic closure here.",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, spectra: result.spectra, conclusions: result.conclusions }, null, 2));
