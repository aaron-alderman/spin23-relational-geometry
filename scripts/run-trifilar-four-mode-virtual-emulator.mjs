import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(root, "evidence", "data", "admissibility-trifilar-virtual-emulator-config-v1.json");

const dot = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);
const transpose = (A) => A[0].map((_, column) => A.map((row) => row[column]));
const multiply = (A, B) => A.map((row) => B[0].map((_, column) =>
  row.reduce((sum, value, index) => sum + value * B[index][column], 0)));
const scale = (factor, A) => A.map((row) => row.map((value) => factor * value));
const add = (...matrices) => matrices[0].map((row, i) => row.map((_, j) =>
  matrices.reduce((sum, matrix) => sum + matrix[i][j], 0)));
const zero = (rows, columns) => Array.from({ length: rows }, () => Array(columns).fill(0));
const stateAdd = (...states) => ({
  re: add(...states.map((state) => state.re)),
  im: add(...states.map((state) => state.im)),
});
const stateScale = (factor, state) => ({
  re: scale(factor, state.re),
  im: scale(factor, state.im),
});

function normal(phi, c, s) {
  return [s * Math.cos(phi), s * Math.sin(phi), c];
}

function darkFrame(phi, c, s) {
  return [
    [-Math.sin(phi), c * Math.cos(phi)],
    [Math.cos(phi), c * Math.sin(phi)],
    [0, -s],
  ];
}

function fullHamiltonian(phi, config, scenario) {
  const c = config.latitudeCosine;
  const s = Math.sqrt(1 - c * c);
  const n = normal(phi, c, s);
  const H = zero(4, 4);
  for (let i = 0; i < 3; i += 1) {
    H[i][i] = scenario.primaryDetuningPerSecond[i];
    for (let j = 0; j < 3; j += 1) H[i][j] += scenario.directPrimaryCouplingPerSecond[i][j];
    H[i][3] = config.couplingNormPerSecond * n[i];
    H[3][i] = H[i][3];
  }
  H[3][3] = config.busDetuningPerSecond;
  return H;
}

function fullHamiltonianDerivative(phi, phaseRate, config) {
  const c = config.latitudeCosine;
  const s = Math.sqrt(1 - c * c);
  const nDerivative = [
    -s * Math.sin(phi) * phaseRate,
    s * Math.cos(phi) * phaseRate,
    0,
  ];
  const hDot = zero(4, 4);
  for (let i = 0; i < 3; i += 1) {
    hDot[i][3] = config.couplingNormPerSecond * nDerivative[i];
    hDot[3][i] = hDot[i][3];
  }
  return hDot;
}

function derivative(time, state, context) {
  const phi = context.direction * context.loopRate * time;
  const H = fullHamiltonian(phi, context.config, context.scenario);
  const damping = context.scenario.amplitudeDampingPerSecond;
  const re = multiply(H, state.im);
  const im = scale(-1, multiply(H, state.re));
  for (let row = 0; row < 4; row += 1) {
    for (let column = 0; column < 2; column += 1) {
      re[row][column] -= damping[row] * state.re[row][column] / 2;
      im[row][column] -= damping[row] * state.im[row][column] / 2;
    }
  }
  return { re, im };
}

function quadraticExpectation(state, matrix) {
  let total = 0;
  for (let column = 0; column < 2; column += 1) {
    const re = state.re.map((row) => row[column]);
    const im = state.im.map((row) => row[column]);
    total += dot(re, matrix.map((row) => dot(row, re)));
    total += dot(im, matrix.map((row) => dot(row, im)));
  }
  return total / 2;
}

function stateNorm(state) {
  return state.re.reduce((sum, row, i) => sum + row.reduce((inner, value, j) =>
    inner + value * value + state.im[i][j] * state.im[i][j], 0), 0) / 2;
}

function exactGap(config) {
  const detuning = config.busDetuningPerSecond;
  const coupling = config.couplingNormPerSecond;
  return Math.abs((detuning + Math.sqrt(detuning ** 2 + 4 * coupling ** 2)) / 2);
}

function evolve(config, scenario, ratio, direction) {
  const gap = exactGap(config);
  const loopRate = gap / ratio;
  const duration = 2 * Math.PI / loopRate;
  const steps = Math.ceil(duration / config.maximumIntegratorStepSeconds);
  const dt = duration / steps;
  const c = config.latitudeCosine;
  const s = Math.sqrt(1 - c * c);
  const q0 = darkFrame(0, c, s);
  let state = {
    re: [...q0.map((row) => [...row]), [0, 0]],
    im: zero(4, 2),
  };
  const context = { config, scenario, loopRate, direction };
  let controllerWork = 0;
  for (let step = 0; step < steps; step += 1) {
    const time = step * dt;
    const midpoint = time + dt / 2;
    const phiMidpoint = direction * loopRate * midpoint;
    const hDot = fullHamiltonianDerivative(phiMidpoint, direction * loopRate, config);
    const k1 = derivative(time, state, context);
    const k2 = derivative(midpoint, stateAdd(state, stateScale(dt / 2, k1)), context);
    const midpointState = stateAdd(state, stateScale(dt / 2, k2));
    const k3 = derivative(midpoint, midpointState, context);
    const k4 = derivative(time + dt, stateAdd(state, stateScale(dt, k3)), context);
    controllerWork += quadraticExpectation(midpointState, hDot) * dt;
    state = stateAdd(state, stateScale(dt / 6,
      stateAdd(k1, stateScale(2, k2), stateScale(2, k3), k4)));
  }
  return { state, gap, loopRate, duration, steps, controllerWork };
}

function complexReturnMetrics(evolution, config, direction) {
  const c = config.latitudeCosine;
  const s = Math.sqrt(1 - c * c);
  const q0 = darkFrame(0, c, s);
  const primaryRe = evolution.state.re.slice(0, 3);
  const primaryIm = evolution.state.im.slice(0, 3);
  const returnRe = multiply(transpose(q0), primaryRe);
  const returnIm = multiply(transpose(q0), primaryIm);
  const n0 = normal(0, c, s);
  const primaryPopulation = primaryRe.reduce((sum, row, i) => sum + row.reduce((inner, value, j) =>
    inner + value ** 2 + primaryIm[i][j] ** 2, 0), 0) / 2;
  const busPopulation = evolution.state.re[3].reduce((sum, value, index) =>
    sum + value ** 2 + evolution.state.im[3][index] ** 2, 0) / 2;
  const brightPopulation = Array.from({ length: 2 }, (_, column) => {
    const re = dot(n0, primaryRe.map((row) => row[column]));
    const im = dot(n0, primaryIm.map((row) => row[column]));
    return re ** 2 + im ** 2;
  }).reduce((sum, value) => sum + value, 0) / 2;
  const darkPopulation = primaryPopulation - brightPopulation;
  const totalPopulation = stateNorm(evolution.state);
  const dissipatedNorm = Math.max(0, 1 - totalPopulation);

  const target = direction > 0
    ? [[0, 1], [-1, 0]]
    : direction < 0
      ? [[0, -1], [1, 0]]
      : [[1, 0], [0, 1]];
  let overlapRe = 0;
  let overlapIm = 0;
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
    overlapRe += target[i][j] * returnRe[i][j] / 2;
    overlapIm += target[i][j] * returnIm[i][j] / 2;
  }
  const rawTargetOverlap = Math.hypot(overlapRe, overlapIm);
  const conditionalTargetOverlap = rawTargetOverlap / Math.sqrt(Math.max(totalPopulation, 1e-30));
  const phase = Math.atan2(overlapIm, overlapRe);
  const correctedRe = returnRe.map((row, i) => row.map((value, j) =>
    value * Math.cos(phase) + returnIm[i][j] * Math.sin(phase)));
  const returnedAngleDegrees = Math.atan2(
    correctedRe[1][0] - correctedRe[0][1],
    correctedRe[0][0] + correctedRe[1][1],
  ) * 180 / Math.PI;

  const gram00 = returnRe[0][0] ** 2 + returnIm[0][0] ** 2
    + returnRe[1][0] ** 2 + returnIm[1][0] ** 2;
  const gram11 = returnRe[0][1] ** 2 + returnIm[0][1] ** 2
    + returnRe[1][1] ** 2 + returnIm[1][1] ** 2;
  const offRe = returnRe[0][0] * returnRe[0][1] + returnIm[0][0] * returnIm[0][1]
    + returnRe[1][0] * returnRe[1][1] + returnIm[1][0] * returnIm[1][1];
  const offIm = returnRe[0][0] * returnIm[0][1] - returnIm[0][0] * returnRe[0][1]
    + returnRe[1][0] * returnIm[1][1] - returnIm[1][0] * returnRe[1][1];
  const trace = gram00 + gram11;
  const determinant = gram00 * gram11 - offRe ** 2 - offIm ** 2;
  const discriminant = Math.sqrt(Math.max(0, trace ** 2 - 4 * determinant));
  const singularValues = [
    Math.sqrt(Math.max(0, (trace + discriminant) / 2)),
    Math.sqrt(Math.max(0, (trace - discriminant) / 2)),
  ];

  return {
    finalState: {
      real: evolution.state.re,
      imaginary: evolution.state.im,
    },
    returnMatrix: { real: returnRe, imaginary: returnIm },
    singularValues,
    singularValueRatio: singularValues[0] / Math.max(singularValues[1], 1e-30),
    rawTargetOverlap,
    conditionalTargetOverlap,
    commonPhaseRadians: phase,
    returnedAngleDegrees,
    populations: {
      dark: darkPopulation,
      bright: brightPopulation,
      bus: busPopulation,
      dissipatedNorm,
      total: totalPopulation,
      ledgerResidual: Math.abs(darkPopulation + brightPopulation + busPopulation + dissipatedNorm - 1),
    },
    controllerWorkRotatingFrame: evolution.controllerWork,
  };
}

export function runVirtualExperiment(config) {
  const runs = [];
  for (const [scenarioName, scenario] of Object.entries(config.scenarios)) {
    for (const ratio of config.gapToLoopRateRatios) {
      for (const control of config.controls) {
        const evolution = evolve(config, scenario, ratio, control.direction);
        runs.push({
          scenario: scenarioName,
          control: control.name,
          direction: control.direction,
          gapToLoopRate: ratio,
          loopRatePerSecond: evolution.loopRate,
          durationSeconds: evolution.duration,
          integrationSteps: evolution.steps,
          ...complexReturnMetrics(evolution, config, control.direction),
        });
      }
    }
  }
  const configText = JSON.stringify(config);
  return {
    schemaVersion: "admissibility-trifilar-virtual-emulator-result-v1",
    configDate: config.date,
    configSha256: createHash("sha256").update(configText).digest("hex"),
    engine: {
      runtime: "Node.js built-ins only",
      equations: "four complex coupled modes with real symmetric Hamiltonian and diagonal amplitude damping",
      integrator: "fixed-step fourth-order Runge-Kutta",
      exactBrightDarkGapPerSecond: exactGap(config),
    },
    config,
    runs,
  };
}

function isMain() {
  return process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
}

if (isMain()) {
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const result = runVirtualExperiment(config);
  if (process.argv.includes("--write")) {
    const outputPath = path.join(root, config.writeTarget);
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2) + "\n");
    console.log(JSON.stringify({ status: "WROTE", outputPath, runs: result.runs.length }, null, 2));
  } else {
    console.log(JSON.stringify(result, null, 2));
  }
}
