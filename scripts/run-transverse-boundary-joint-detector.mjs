#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const outputPath = path.join(root, "evidence/data/admissibility-transverse-boundary-joint-detector-v1.json");

const C = (re = 0, im = 0) => ({re, im});
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, x) => C(a.re * x, a.im * x);
const abs = (a) => Math.hypot(a.re, a.im);
const abs2 = (a) => a.re * a.re + a.im * a.im;
const div = (a, b) => {
  const d = abs2(b);
  return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
};
const cis = (phase) => C(Math.cos(phase), Math.sin(phase));

function csqrt(z) {
  const r = abs(z);
  return C(Math.sqrt(Math.max(0, (r + z.re) / 2)), Math.sign(z.im || 1) * Math.sqrt(Math.max(0, (r - z.re) / 2)));
}

function inverse(input) {
  const n = input.length;
  const a = input.map((row, i) => [...row.map((z) => C(z.re, z.im)), ...Array.from({length: n}, (_, j) => C(i === j ? 1 : 0))]);
  for (let k = 0; k < n; k += 1) {
    let pivot = k;
    for (let i = k + 1; i < n; i += 1) if (abs(a[i][k]) > abs(a[pivot][k])) pivot = i;
    if (abs(a[pivot][k]) < 1e-13) throw new Error("singular matrix");
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

function solveReal(input, rhs) {
  const n = input.length;
  const a = input.map((row, i) => [...row, rhs[i]]);
  for (let k = 0; k < n; k += 1) {
    let pivot = k;
    for (let i = k + 1; i < n; i += 1) if (Math.abs(a[i][k]) > Math.abs(a[pivot][k])) pivot = i;
    [a[k], a[pivot]] = [a[pivot], a[k]];
    const p = a[k][k];
    if (Math.abs(p) < 1e-13) throw new Error("singular real system");
    for (let j = k; j <= n; j += 1) a[k][j] /= p;
    for (let i = 0; i < n; i += 1) {
      if (i === k) continue;
      const f = a[i][k];
      for (let j = k; j <= n; j += 1) a[i][j] -= f * a[k][j];
    }
  }
  return a.map((row) => row[n]);
}

function surfaceGreen(z) {
  let root = csqrt(sub(mul(z, z), C(4, 0)));
  if (abs(sub(root, z)) > abs(add(root, z))) root = scale(root, -1);
  return scale(sub(z, root), 0.5);
}

const edgeNames = ["t01", "t12", "b34", "b45", "v03", "v14", "v25"];
const edgeSites = [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3], [1, 4], [2, 5]];
const contacts = {L: [0, 3], R: [2, 5], T: [1], B: [4]};
const leadNames = Object.keys(contacts);
const strong = 1;
const weak = 0.45;
const leadCoupling = 0.58;
const flux = 0.42;

function makeHamiltonian(word, phi) {
  const h = Array.from({length: 6}, () => Array.from({length: 6}, () => C()));
  for (let edge = 0; edge < edgeSites.length; edge += 1) {
    const [i, j] = edgeSites[edge];
    const magnitude = word[edge] === "S" ? strong : weak;
    let phase = 0;
    if (edge === 0 || edge === 1) phase = phi / 2;
    if (edge === 2 || edge === 3) phase = -phi / 2;
    h[i][j] = scale(cis(phase), magnitude);
    h[j][i] = conj(h[i][j]);
  }
  return h;
}

function green(z, h, withLeads = true) {
  const m = Array.from({length: 6}, (_, i) => Array.from({length: 6}, (_, j) => sub(C(i === j ? z.re : 0, i === j ? z.im : 0), h[i][j])));
  if (withLeads) {
    const sigma = scale(surfaceGreen(z), leadCoupling ** 2);
    for (const sites of Object.values(contacts)) for (const site of sites) m[site][site] = sub(m[site][site], sigma);
  }
  return inverse(m);
}

function transmissions(energy, h) {
  const z = C(energy, 1e-9);
  const sigma = scale(surfaceGreen(z), leadCoupling ** 2);
  const gamma = Math.max(0, -2 * sigma.im);
  const g = green(z, h, true);
  const out = Array.from({length: 4}, () => Array(4).fill(0));
  for (let p = 0; p < 4; p += 1) for (let q = 0; q < 4; q += 1) {
    if (p === q) continue;
    for (const i of contacts[leadNames[p]]) for (const j of contacts[leadNames[q]]) out[p][q] += gamma * gamma * abs2(g[i][j]);
  }
  return out;
}

function transportMoments(word, phi, mu = 0.31, temperature = 0.09, steps = 1800) {
  const h = makeHamiltonian(word, phi);
  const l0 = Array.from({length: 4}, () => Array(4).fill(0));
  const l1 = Array.from({length: 4}, () => Array(4).fill(0));
  const lo = -1.999;
  const hi = 1.999;
  const dE = (hi - lo) / steps;
  for (let step = 0; step <= steps; step += 1) {
    const energy = lo + step * dE;
    const x = (energy - mu) / (2 * temperature);
    const fprime = Math.abs(x) > 25 ? 0 : 1 / (4 * temperature * Math.cosh(x) ** 2);
    const weight = (step === 0 || step === steps ? 0.5 : 1) * dE * fprime;
    const t = transmissions(energy, h);
    for (let p = 0; p < 4; p += 1) for (let q = 0; q < 4; q += 1) {
      l0[p][q] += weight * t[p][q];
      l1[p][q] += weight * (energy - mu) * t[p][q];
    }
  }
  return {l0, l1, temperature};
}

function voltageResponse(moments) {
  const {l0, l1, temperature} = moments;
  const a = Array.from({length: 4}, () => Array(4).fill(0));
  const b = Array.from({length: 4}, () => Array(4).fill(0));
  for (let p = 0; p < 4; p += 1) for (let q = 0; q < 4; q += 1) {
    if (p === q) continue;
    a[p][p] += l0[q][p];
    a[p][q] -= l0[p][q];
    b[p][p] += l1[q][p] / temperature;
    b[p][q] -= l1[p][q] / temperature;
  }
  const theta = [0.5, -0.5, 0, 0];
  const unknown = [0, 2, 3];
  const rhs = unknown.map((p) => -b[p].reduce((sum, value, q) => sum + value * theta[q], 0));
  const reduced = unknown.map((p) => unknown.map((q) => a[p][q]));
  const solved = solveReal(reduced, rhs);
  const voltage = [solved[0], 0, solved[1], solved[2]];
  return {longitudinal: voltage[0] - voltage[1], transverse: voltage[2] - voltage[3], voltage};
}

function boundaryProxy(word, phi, steps = 900) {
  const h = makeHamiltonian(word, phi);
  const maxXi = 12;
  let integral = 0;
  for (let step = 0; step <= steps; step += 1) {
    const xi = maxXi * step / steps;
    const g = green(C(0, xi + 1e-7), h, false);
    const susceptibility = add(g[0][0], g[3][3]);
    const u = scale(susceptibility, 0.52 ** 2);
    const root = csqrt(add(C(1, 0), scale(mul(C(0, xi), C(0, xi)), -0.25)));
    const reflection = div(u, sub(mul(C(0, 2), root), u));
    const decay = Math.exp(-4 * Math.asinh(xi / 2));
    const term = sub(C(1, 0), scale(reflection, -0.75 * decay));
    integral += (step === 0 || step === steps ? 0.5 : 1) * Math.log(Math.max(1e-14, abs(term)));
  }
  return integral * (maxXi / steps) / (2 * Math.PI);
}

function combinations(length, count, start = 0, prefix = [], out = []) {
  if (prefix.length === count) {
    const selected = new Set(prefix);
    out.push(Array.from({length}, (_, index) => selected.has(index) ? "S" : "W").join(""));
    return out;
  }
  for (let i = start; i <= length - (count - prefix.length); i += 1) {
    prefix.push(i);
    combinations(length, count, i + 1, prefix, out);
    prefix.pop();
  }
  return out;
}

function quantizedClasses(values, tolerance = 1e-7) {
  const classes = [];
  for (const value of values) if (!classes.some((seen) => Math.abs(seen - value) <= tolerance)) classes.push(value);
  return classes.length;
}

function vectorClasses(vectors, tolerance = 1e-7) {
  const representatives = [];
  for (const vector of vectors) {
    if (!representatives.some((seen) => seen.every((value, index) => Math.abs(value - vector[index]) <= tolerance))) representatives.push(vector);
  }
  return representatives.length;
}

function topBottomReflection(word) {
  const permutation = [2, 3, 0, 1, 4, 5, 6];
  return permutation.map((index) => word[index]).join("");
}

function onsagerAudit(word) {
  let maximumError = 0;
  for (const energy of [-1.4, -0.7, 0, 0.6, 1.3]) {
    const plus = transmissions(energy, makeHamiltonian(word, flux));
    const minus = transmissions(energy, makeHamiltonian(word, -flux));
    for (let p = 0; p < 4; p += 1) for (let q = 0; q < 4; q += 1) maximumError = Math.max(maximumError, Math.abs(plus[p][q] - minus[q][p]));
  }
  return maximumError;
}

const words = combinations(7, 4);
const members = [];
for (const word of words) {
  const plus = voltageResponse(transportMoments(word, flux));
  const minus = voltageResponse(transportMoments(word, -flux));
  members.push({
    word,
    longitudinalEven: (plus.longitudinal + minus.longitudinal) / 2,
    longitudinalOdd: (plus.longitudinal - minus.longitudinal) / 2,
    transverseEven: (plus.transverse + minus.transverse) / 2,
    transverseOddNernst: (plus.transverse - minus.transverse) / 2,
    boundaryProxy: boundaryProxy(word, flux),
  });
}

const longitudinalClasses = quantizedClasses(members.map((member) => member.longitudinalEven));
const nernstClasses = quantizedClasses(members.map((member) => member.transverseOddNernst));
const boundaryClasses = quantizedClasses(members.map((member) => member.boundaryProxy));
const jointLongitudinalNernstClasses = vectorClasses(members.map((member) => [member.longitudinalEven, member.transverseOddNernst]));
const jointAllClasses = vectorClasses(members.map((member) => [member.longitudinalEven, member.transverseOddNernst, member.boundaryProxy]));
const byWord = new Map(members.map((member) => [member.word, member]));
const reflectionPairs = members.map((member) => [member, byWord.get(topBottomReflection(member.word))]);
const reflectionOrbits = new Set(members.map((member) => [member.word, topBottomReflection(member.word)].sort().join("|")));
const topBottomAudit = {
  orbitCount: reflectionOrbits.size,
  maximumLongitudinalDifference: Math.max(...reflectionPairs.map(([a, b]) => Math.abs(a.longitudinalEven - b.longitudinalEven))),
  maximumNernstDifference: Math.max(...reflectionPairs.map(([a, b]) => Math.abs(a.transverseOddNernst - b.transverseOddNernst))),
  maximumBoundaryDifference: Math.max(...reflectionPairs.map(([a, b]) => Math.abs(a.boundaryProxy - b.boundaryProxy))),
};

const output = {
  schema: "admissibility.transverse-boundary-joint-detector/1",
  id: "AZ-054",
  generatedAt: new Date().toISOString(),
  model: {
    lattice: "two_by_three_six_site_rectangle",
    edges: edgeNames,
    inventory: {strongBonds: 4, weakBonds: 3, strong, weak},
    leads: contacts,
    leadCoupling,
    plaquetteFlux: flux,
    chemicalPotential: 0.31,
    temperature: 0.09,
  },
  fibre: {
    placements: members.length,
    longitudinalEvenClasses: longitudinalClasses,
    transverseOddNernstClasses: nernstClasses,
    boundaryClasses,
    jointLongitudinalNernstClasses,
    jointAllClasses,
    negativeNernst: members.filter((member) => member.transverseOddNernst < -1e-8).length,
    positiveNernst: members.filter((member) => member.transverseOddNernst > 1e-8).length,
    members,
    topBottomReflection: topBottomAudit,
  },
  reciprocity: {
    maximumTransmissionOnsagerError: Math.max(...words.map(onsagerAudit)),
    condition: "T_pq(E,+phi)=T_qp(E,-phi)",
  },
  admission: {
    transverseTimeReversalOddChannelRepresented: true,
    completePlacementFibreEnumerated: members.length === 35,
    jointDetectorInjectiveAtDeclaredTolerance: jointAllClasses === members.length,
    jointDetectorSaturatesTopBottomOrbitBound: jointAllClasses === topBottomAudit.orbitCount,
    universalInvariantEstablished: false,
    electromagneticCasimirPredictionEstablished: false,
    materialPredictionEstablished: false,
  },
  stopRule: "advance_only_if_reciprocity_closes_and_joint_detectors_resolve_more_of_the_fixed_inventory_fibre_than_each_scalar_channel; otherwise_record_the_detector_partition_without_new_physics_language",
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`wrote ${path.relative(root, outputPath)}`);
console.log(JSON.stringify({fibre: {...output.fibre, members: undefined}, reciprocity: output.reciprocity, admission: output.admission}, null, 2));
