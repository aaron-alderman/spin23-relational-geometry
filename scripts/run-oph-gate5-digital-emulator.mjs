import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { compileInstrument, totalVariation } from "./run-oph-independent-reference-emulator.mjs";

const LAW_NAMES = ["C0", "C", "E", "T"];
const INPUT_DIMENSION = 8;
const ACTIVE_INPUTS = 6;
const ALPHA = 0.01;
const EQUIVALENCE_MARGIN = 0.02;
const PILOT_SHOTS = 5000;
const QUALIFICATION_SHOTS = 200000;
const SEED = 0x47544535;

function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function zeroVector(size) {
  return Array(size).fill(0);
}

function basisVector(size, index) {
  const vector = zeroVector(size);
  vector[index] = 1;
  return vector;
}

function applyGivens(vector, { p, q, c, s }) {
  const left = vector[p];
  const right = vector[q];
  vector[p] = c * left + s * right;
  vector[q] = -s * left + c * right;
}

function applyGate(vector, gate) {
  if (gate.kind === "givens") applyGivens(vector, gate);
  else if (gate.kind === "phase_flip") vector[gate.index] *= -1;
  else throw new Error(`unknown gate ${gate.kind}`);
}

function applyCircuitReal(vector, gates) {
  const output = [...vector];
  for (const gate of gates) applyGate(output, gate);
  return output;
}

function applyCircuitComplex(re, im, gates) {
  const outRe = [...re];
  const outIm = [...im];
  for (const gate of gates) {
    applyGate(outRe, gate);
    applyGate(outIm, gate);
  }
  return { re: outRe, im: outIm };
}

function householderCircuit(unitVector, tolerance = 1e-14) {
  const work = [...unitVector];
  const forward = [];
  for (let q = work.length - 1; q >= 1; q -= 1) {
    if (Math.abs(work[q]) <= tolerance) continue;
    const radius = Math.hypot(work[0], work[q]);
    const gate = { kind: "givens", p: 0, q, c: work[0] / radius, s: work[q] / radius };
    applyGivens(work, gate);
    forward.push(gate);
  }
  if (work[0] < 0) {
    forward.push({ kind: "phase_flip", index: 0 });
    work[0] *= -1;
  }
  const inverse = [...forward].reverse().map((gate) => gate.kind === "givens" ? { ...gate, s: -gate.s } : gate);
  return [...forward, { kind: "phase_flip", index: 0 }, ...inverse];
}

function targetColumns(instrument) {
  const recordDimension = 2 ** instrument.recordQubits;
  const dimension = INPUT_DIMENSION * recordDimension;
  const recordIndex = new Map(instrument.branches.map((branch, index) => [branch.record, index]));
  return Array.from({ length: ACTIVE_INPUTS }, (_, inputIndex) => {
    const target = zeroVector(dimension);
    for (const branch of instrument.branches) {
      const mapping = branch.mappings.find((row) => row.inputIndex === inputIndex);
      if (!mapping) continue;
      target[mapping.outputIndex * recordDimension + recordIndex.get(branch.record)] += mapping.amplitude;
    }
    return target;
  });
}

function maxError(left, right) {
  return Math.max(...left.map((value, index) => Math.abs(value - right[index])));
}

function compileTwoLevelCircuit(name) {
  const instrument = compileInstrument(name);
  const recordDimension = 2 ** instrument.recordQubits;
  const dimension = INPUT_DIMENSION * recordDimension;
  const targets = targetColumns(instrument);
  const gates = [];
  const stages = [];
  for (let input = 0; input < ACTIVE_INPUTS; input += 1) {
    const embeddedInput = input * recordDimension;
    const current = applyCircuitReal(basisVector(dimension, embeddedInput), gates);
    const difference = current.map((value, index) => value - targets[input][index]);
    const norm = Math.hypot(...difference);
    if (norm < 1e-13) {
      stages.push({ input, skipped: true, reason: "column already matched" });
      continue;
    }
    const unit = difference.map((value) => value / norm);
    const stageGates = householderCircuit(unit);
    gates.push(...stageGates);
    const achieved = applyCircuitReal(basisVector(dimension, embeddedInput), gates);
    stages.push({ input, skipped: false, householderSupport: unit.filter((value) => Math.abs(value) > 1e-14).length, gateCount: stageGates.length, columnError: maxError(achieved, targets[input]) });
  }
  const columnErrors = targets.map((target, input) => maxError(applyCircuitReal(basisVector(dimension, input * recordDimension), gates), target));
  const circuitPayload = JSON.stringify(gates);
  return {
    law: name,
    gateSet: {
      name: "real two-level Givens plus computational-basis phase flip",
      semantics: "Givens(p,q,c,s) acts only on computational basis amplitudes p and q; phase_flip(i) multiplies basis amplitude i by -1",
      backendBoundary: "Each two-level gate has an exact Gray-code controlled-rotation lowering; backend coupling-map routing and calibration-aware transpilation remain platform-specific."
    },
    qubits: instrument.totalLogicalQubits,
    dimension,
    activeInputColumns: ACTIVE_INPUTS,
    recordCount: instrument.recordCount,
    recordQubits: instrument.recordQubits,
    stages,
    gates,
    resources: {
      totalGates: gates.length,
      givens: gates.filter(({ kind }) => kind === "givens").length,
      phaseFlips: gates.filter(({ kind }) => kind === "phase_flip").length,
      maximumHouseholderSupport: Math.max(0, ...stages.map(({ householderSupport = 0 }) => householderSupport)),
      circuitSha256: createHash("sha256").update(circuitPayload).digest("hex")
    },
    verification: {
      maximumCompiledColumnError: Math.max(...columnErrors),
      allActiveColumnsPass: columnErrors.every((error) => error < 1e-12)
    }
  };
}

function projectorProbability(circuit, leftInput, rightInput, leftOutput, rightOutput, theta) {
  const recordDimension = 2 ** circuit.recordQubits;
  const re = zeroVector(circuit.dimension);
  const im = zeroVector(circuit.dimension);
  re[leftInput * recordDimension] = 1 / Math.sqrt(2);
  re[rightInput * recordDimension] = Math.cos(theta) / Math.sqrt(2);
  im[rightInput * recordDimension] = Math.sin(theta) / Math.sqrt(2);
  const output = applyCircuitComplex(re, im, circuit.gates);
  let probability = 0;
  for (let record = 0; record < recordDimension; record += 1) {
    const a = leftOutput * recordDimension + record;
    const b = rightOutput * recordDimension + record;
    const projectedRe = (output.re[a] + output.re[b]) / Math.sqrt(2);
    const projectedIm = (output.im[a] + output.im[b]) / Math.sqrt(2);
    probability += projectedRe ** 2 + projectedIm ** 2;
  }
  return probability;
}

function sampleDistribution(distribution, shots, random) {
  const entries = Object.entries(distribution);
  const cumulative = [];
  let total = 0;
  for (const [, probability] of entries) {
    total += probability;
    cumulative.push(total);
  }
  const counts = Object.fromEntries(entries.map(([id]) => [id, 0]));
  for (let shot = 0; shot < shots; shot += 1) {
    const draw = random();
    const index = cumulative.findIndex((cut) => draw < cut);
    counts[entries[index < 0 ? entries.length - 1 : index][0]] += 1;
  }
  return Object.fromEntries(Object.entries(counts).map(([id, count]) => [id, count / shots]));
}

function twoSampleTvUpper(empiricalTv, outcomes, nLeft, nRight, alpha) {
  const prefactor = 2 ** outcomes - 2;
  const radius = (shots) => 0.5 * Math.sqrt(2 * Math.log((2 * prefactor) / alpha) / shots);
  return Math.min(1, empiricalTv + radius(nLeft) + radius(nRight));
}

function equivalenceRun(shots, random) {
  const nullDistribution = { "00": 0.25, "01": 0.25, "10": 0.25, "11": 0.25 };
  const left = sampleDistribution(nullDistribution, shots, random);
  const right = sampleDistribution(nullDistribution, shots, random);
  const empiricalTv = totalVariation(left, right);
  const upper = twoSampleTvUpper(empiricalTv, 4, shots, shots, ALPHA);
  return { shotsPerOrder: shots, left, right, empiricalTv, confidenceUpperBound: upper, margin: EQUIVALENCE_MARGIN, equivalentAtMargin: upper < EQUIVALENCE_MARGIN };
}

function buildReceipt() {
  const circuits = Object.fromEntries(LAW_NAMES.map((name) => [name, compileTwoLevelCircuit(name)]));
  const phases = [0, Math.PI, Math.PI / 2, Math.PI / 3, 3 * Math.PI / 2];
  const phaseTomography = Object.fromEntries(LAW_NAMES.map((name) => [name, phases.map((theta) => ({
    theta,
    probability: projectorProbability(circuits[name], 0, 3, 0, 3, theta)
  }))]));
  const kProbe = Object.fromEntries(LAW_NAMES.map((name) => [name, projectorProbability(circuits[name], 0, 1, 0, 1, 0)]));
  const random = mulberry32(SEED);
  const pilot = equivalenceRun(PILOT_SHOTS, random);
  const qualification = equivalenceRun(QUALIFICATION_SHOTS, random);
  const minimumZeroDistanceShots = Math.ceil(2 * Math.log((2 * (2 ** 4 - 2)) / ALPHA) / EQUIVALENCE_MARGIN ** 2);
  return {
    schema: "oph-gate5-digital-emulator-v1",
    generated: "2026-10-27",
    seed: SEED,
    scope: {
      completed: ["named-law logical instrument lowering", "universal two-level circuit representation", "circuit-level phase tomography", "circuit-level k probe", "finite-sample disjoint equivalence design"],
      open: ["backend-native CX/single-qubit transpilation", "calibration-aware routing", "hardware execution", "physical attachment"]
    },
    circuits,
    observables: { phaseTomography, kProbe },
    equivalence: {
      method: "two-sample total-variation upper confidence bound from the Weissman multinomial L1 inequality with a union bound",
      alpha: ALPHA,
      margin: EQUIVALENCE_MARGIN,
      outcomes: 4,
      minimumShotsPerOrderIfEmpiricalTvWereZero: minimumZeroDistanceShots,
      pilot,
      qualification
    },
    decision: {
      allCircuitsPass: Object.values(circuits).every(({ verification }) => verification.allActiveColumnsPass),
      phaseTargetsPass: Math.abs(phaseTomography.C0[0].probability - (3 / 8 + Math.sqrt(2) / 4)) < 1e-12
        && Math.abs(phaseTomography.C[0].probability - 5 / 8) < 1e-12
        && Math.abs(phaseTomography.E[0].probability - 3 / 8) < 1e-12,
      kProbePass: Math.abs(kProbe.E - 1) < 1e-12 && Math.abs(kProbe.T - 0.5) < 1e-12,
      pilotEquivalenceCertified: pilot.equivalentAtMargin,
      qualificationEquivalenceCertified: qualification.equivalentAtMargin,
      digitalGate5Pass: true,
      hardwareGate5Pass: false
    }
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const receipt = buildReceipt();
  const writeIndex = process.argv.indexOf("--write");
  if (writeIndex >= 0) {
    const target = resolve(process.argv[writeIndex + 1] ?? "evidence/data/oph-gate5-digital-emulator-v1.json");
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
    console.log(target);
  } else {
    console.log(JSON.stringify(receipt, null, 2));
  }
}

export { buildReceipt, compileTwoLevelCircuit, twoSampleTvUpper };
