#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const outputPath = path.join(root, "evidence", "data", "admissibility-boundary-compiler-v1.json");

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, x) => C(a.re * x, a.im * x);
const div = (a, b) => {
  const d = b.re * b.re + b.im * b.im;
  return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
};
const abs2 = (a) => a.re * a.re + a.im * a.im;
const abs = (a) => Math.hypot(a.re, a.im);

function csqrt(z) {
  const r = abs(z);
  return C(
    Math.sqrt(Math.max(0, (r + z.re) / 2)),
    Math.sign(z.im || 1) * Math.sqrt(Math.max(0, (r - z.re) / 2)),
  );
}

function zeros(n) {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => C()));
}

function inverse(input) {
  const n = input.length;
  const a = input.map((row, i) => [
    ...row.map((z) => C(z.re, z.im)),
    ...Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0)),
  ]);
  for (let k = 0; k < n; k += 1) {
    let pivot = k;
    for (let i = k + 1; i < n; i += 1) if (abs(a[i][k]) > abs(a[pivot][k])) pivot = i;
    if (abs(a[pivot][k]) < 1e-14) throw new Error("singular matrix");
    [a[k], a[pivot]] = [a[pivot], a[k]];
    const p = a[k][k];
    for (let j = 0; j < 2 * n; j += 1) a[k][j] = div(a[k][j], p);
    for (let i = 0; i < n; i += 1) {
      if (i === k) continue;
      const f = a[i][k];
      for (let j = 0; j < 2 * n; j += 1) a[i][j] = sub(a[i][j], mul(f, a[k][j]));
    }
  }
  return a.map((row) => row.slice(n));
}

function physicalSurfaceGreen(z, hopping = 1) {
  let root = csqrt(sub(mul(z, z), C(4 * hopping * hopping, 0)));
  if (abs(sub(root, z)) > abs(add(root, z))) root = scale(root, -1);
  return scale(sub(z, root), 1 / (2 * hopping * hopping));
}

function makeChain(bonds) {
  const n = bonds.length + 1;
  const h = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < bonds.length; i += 1) h[i][i + 1] = h[i + 1][i] = bonds[i];
  return h;
}

function green(z, h, leadCoupling = 0, twoLeads = false) {
  const n = h.length;
  const m = zeros(n);
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
    m[i][j] = C((i === j ? z.re : 0) - h[i][j], i === j ? z.im : 0);
  }
  if (leadCoupling) {
    const sigma = scale(physicalSurfaceGreen(z), leadCoupling * leadCoupling);
    m[0][0] = sub(m[0][0], sigma);
    if (twoLeads) m[n - 1][n - 1] = sub(m[n - 1][n - 1], sigma);
  }
  return inverse(m);
}

function transmission(energy, h, leadCoupling) {
  const z = C(energy, 1e-9);
  const sigma = scale(physicalSurfaceGreen(z), leadCoupling * leadCoupling);
  const gamma = Math.max(0, -2 * sigma.im);
  const g = green(z, h, leadCoupling, true);
  return gamma * gamma * abs2(g[0][h.length - 1]);
}

function thermoelectric(h, leadCoupling, mu = 0.37, temperature = 0.08, steps = 12000) {
  const lo = -1.999;
  const hi = 1.999;
  const dE = (hi - lo) / steps;
  let l0 = 0;
  let l1 = 0;
  for (let i = 0; i <= steps; i += 1) {
    const energy = lo + i * dE;
    const x = (energy - mu) / (2 * temperature);
    const minusFermiDerivative = x > 25 || x < -25 ? 0 : 1 / (4 * temperature * Math.cosh(x) ** 2);
    const weight = i === 0 || i === steps ? 0.5 : 1;
    const kernel = weight * transmission(energy, h, leadCoupling) * minusFermiDerivative;
    l0 += kernel;
    l1 += kernel * (energy - mu);
  }
  l0 *= dE;
  l1 *= dE;
  const step = 1e-4;
  const derivativeLogTransmission = (
    Math.log(Math.max(1e-16, transmission(mu + step, h, leadCoupling)))
    - Math.log(Math.max(1e-16, transmission(mu - step, h, leadCoupling)))
  ) / (2 * step);
  return {
    units: "kB=e=hbar=1",
    chemicalPotential: mu,
    temperature,
    conductanceMomentL0: l0,
    heatMomentL1: l1,
    seebeck: -l1 / (temperature * l0),
    mottApproximation: -(Math.PI ** 2 * temperature / 3) * derivativeLogTransmission,
    transmissionAtChemicalPotential: transmission(mu, h, leadCoupling),
  };
}

function casimirProxy(h, contact = 0.52, separation = 2, secondReflector = -0.75, steps = 4000) {
  const maxXi = 12;
  let integral = 0;
  for (let i = 0; i <= steps; i += 1) {
    const xi = maxXi * i / steps;
    const z = C(0, xi + 1e-7);
    const u = scale(green(z, h)[0][0], contact * contact);
    const root = csqrt(add(C(1, 0), scale(mul(z, z), -0.25)));
    const a = mul(C(0, 2), root);
    const r1 = div(u, sub(a, u));
    const decay = Math.exp(-2 * separation * Math.asinh(xi / 2));
    const roundTrip = scale(r1, secondReflector * decay);
    const logTerm = Math.log(Math.max(1e-14, abs(sub(C(1, 0), roundTrip))));
    integral += (i === 0 || i === steps ? 0.5 : 1) * logTerm;
  }
  return integral * (maxXi / steps) / (2 * Math.PI);
}

function tracePower(h, power) {
  let a = h.map((row) => [...row]);
  const multiply = (x, y) => x.map((row, i) => y[0].map((_, j) => row.reduce((sum, value, k) => sum + value * y[k][j], 0)));
  let out = Array.from({ length: h.length }, (_, i) => Array.from({ length: h.length }, (_, j) => i === j ? 1 : 0));
  for (let p = 0; p < power; p += 1) out = multiply(out, a);
  return out.reduce((sum, row, i) => sum + row[i], 0);
}

const strong = 1;
const weak = 0.45;
const placements = {
  alternating: [strong, weak, strong, weak, strong, weak, strong],
  clustered: [strong, strong, weak, strong, weak, weak, strong],
};
const leadCoupling = 0.68;
const runs = {};
for (const [name, bonds] of Object.entries(placements)) {
  const h = makeChain(bonds);
  runs[name] = {
    bonds,
    traceH2: tracePower(h, 2),
    traceH4: tracePower(h, 4),
    thermoelectric: thermoelectric(h, leadCoupling),
    casimirProxy: casimirProxy(h),
  };
}

function chooseStrongPositions(length, count, start = 0, prefix = [], out = []) {
  if (prefix.length === count) {
    out.push([...prefix]);
    return out;
  }
  for (let index = start; index <= length - (count - prefix.length); index += 1) {
    prefix.push(index);
    chooseStrongPositions(length, count, index + 1, prefix, out);
    prefix.pop();
  }
  return out;
}

const fibre = chooseStrongPositions(7, 4).map((positions) => {
  const strongSet = new Set(positions);
  const bonds = Array.from({length: 7}, (_, index) => strongSet.has(index) ? strong : weak);
  const h = makeChain(bonds);
  const thermo = thermoelectric(h, leadCoupling, 0.37, 0.08, 3000);
  return {
    word: bonds.map((bond) => bond === strong ? "S" : "W").join(""),
    traceH4: tracePower(h, 4),
    seebeck: thermo.seebeck,
    transmissionAtChemicalPotential: thermo.transmissionAtChemicalPotential,
    casimirProxy: casimirProxy(h, 0.52, 2, -0.75, 1200),
  };
});

function range(field) {
  const ordered = [...fibre].sort((a, b) => a[field] - b[field]);
  return {
    minimum: {word: ordered[0].word, value: ordered[0][field]},
    maximum: {word: ordered.at(-1).word, value: ordered.at(-1)[field]},
    distinctAt1e9: new Set(ordered.map((entry) => Math.round(entry[field] * 1e9))).size,
  };
}

function pearson(fieldA, fieldB) {
  const meanA = fibre.reduce((sum, entry) => sum + entry[fieldA], 0) / fibre.length;
  const meanB = fibre.reduce((sum, entry) => sum + entry[fieldB], 0) / fibre.length;
  let covariance = 0;
  let varianceA = 0;
  let varianceB = 0;
  for (const entry of fibre) {
    const da = entry[fieldA] - meanA;
    const db = entry[fieldB] - meanB;
    covariance += da * db;
    varianceA += da * da;
    varianceB += db * db;
  }
  return covariance / Math.sqrt(varianceA * varianceB);
}

function reversalAudit() {
  const byWord = new Map(fibre.map((entry) => [entry.word, entry]));
  const seen = new Set();
  const orbits = [];
  let maximumSeebeckDifference = 0;
  let maximumCasimirDifference = 0;
  for (const entry of fibre) {
    const reversedWord = [...entry.word].reverse().join("");
    const partner = byWord.get(reversedWord);
    maximumSeebeckDifference = Math.max(maximumSeebeckDifference, Math.abs(entry.seebeck - partner.seebeck));
    maximumCasimirDifference = Math.max(maximumCasimirDifference, Math.abs(entry.casimirProxy - partner.casimirProxy));
    const key = [entry.word, reversedWord].sort().join("|");
    if (!seen.has(key)) {
      seen.add(key);
      orbits.push({word: entry.word, reversedWord, palindromic: entry.word === reversedWord});
    }
  }
  return {
    orbitCount: orbits.length,
    palindromicOrbitCount: orbits.filter((orbit) => orbit.palindromic).length,
    maximumSeebeckDifference,
    maximumCasimirDifference,
    thermoelectricResponseIsReversalBlind: maximumSeebeckDifference < 1e-10,
    oneSidedCasimirProxyIsReversalSensitive: maximumCasimirDifference > 1e-4,
  };
}

const difference = {
  traceH2: runs.clustered.traceH2 - runs.alternating.traceH2,
  traceH4: runs.clustered.traceH4 - runs.alternating.traceH4,
  seebeck: runs.clustered.thermoelectric.seebeck - runs.alternating.thermoelectric.seebeck,
  casimirProxy: runs.clustered.casimirProxy - runs.alternating.casimirProxy,
};

const output = {
  schema: "admissibility.boundary-compiler/1",
  id: "AZ-053",
  generatedAt: new Date().toISOString(),
  theorem: {
    statement: "A detector D on realizations factors through a coarse map C iff D is constant on every fibre of C.",
    witnessCriterion: "C(x)=C(y) and D(x)!=D(y) proves that no function dBar can satisfy D=dBar_after_C.",
  },
  model: {
    description: "eight-site scalar tight-binding conductor with identical leads",
    coarseInventory: {sites: 8, onsiteZeros: 8, strongBonds: 4, weakBonds: 3, strong, weak, leadCoupling},
    placementA: "alternating",
    placementB: "clustered",
    sameInventory: true,
    sameTraceH2: Math.abs(difference.traceH2) < 1e-12,
  },
  runs,
  difference,
  completePlacementFibre: {
    size: fibre.length,
    expectedBinomialSize: 35,
    seebeckRange: range("seebeck"),
    casimirProxyRange: range("casimirProxy"),
    traceH4Range: range("traceH4"),
    seebeckSigns: {
      negative: fibre.filter((entry) => entry.seebeck < -1e-8).length,
      nearZero: fibre.filter((entry) => Math.abs(entry.seebeck) <= 1e-8).length,
      positive: fibre.filter((entry) => entry.seebeck > 1e-8).length,
    },
    seebeckCasimirPearsonCorrelation: pearson("seebeck", "casimirProxy"),
    reversalAudit: reversalAudit(),
    members: fibre,
  },
  factorizationTests: {
    traceH2FactorsThroughInventoryForThisPair: Math.abs(difference.traceH2) < 1e-12,
    traceH4FactorsThroughInventoryForThisPair: Math.abs(difference.traceH4) < 1e-10,
    seebeckFactorsThroughInventoryForThisPair: Math.abs(difference.seebeck) < 1e-6,
    casimirProxyFactorsThroughInventoryForThisPair: Math.abs(difference.casimirProxy) < 1e-7,
  },
  absentChannels: {
    anomalousNernst: "not_represented_scalar_1d_model_has_no_transverse_time_reversal_odd_block",
    physicalCasimirForce: "not_claimed_proxy_is_a_declared_scalar_imaginary_frequency_round_trip_functional",
  },
  admission: {
    sameInventoryDifferentResponseWitness: true,
    generalNoFactorizationTheoremInstantiated: true,
    commonCasimirSeebeckInvariantEstablished: false,
    nernstBridgeEstablished: false,
    materialPredictionEstablished: false,
  },
};

fs.mkdirSync(path.dirname(outputPath), {recursive: true});
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`wrote ${path.relative(root, outputPath)}`);
console.log(JSON.stringify({difference, factorizationTests: output.factorizationTests}, null, 2));
