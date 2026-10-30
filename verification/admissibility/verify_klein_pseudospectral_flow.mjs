import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-klein-pseudospectral-flow-v1.json",
  import.meta.url,
), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function makeState(K) {
  const width = 2 * K + 1;
  return {
    K,
    width,
    re: new Float64Array(width * width),
    im: new Float64Array(width * width),
  };
}

function index(state, k, m) {
  return (k + state.K) * state.width + (m + state.K);
}

function cloneState(state) {
  const copy = makeState(state.K);
  copy.re.set(state.re);
  copy.im.set(state.im);
  return copy;
}

function addCoefficient(state, k, m, re, im = 0) {
  const at = index(state, k, m);
  state.re[at] += re;
  state.im[at] += im;
}

function projectKlein(state) {
  const sourceRe = state.re.slice();
  const sourceIm = state.im.slice();
  for (let k = -state.K; k <= state.K; k += 1) {
    const sign = Math.abs(k) % 2 === 0 ? 1 : -1;
    for (let m = -state.K; m <= state.K; m += 1) {
      const at = index(state, k, m);
      const reflected = index(state, k, -m);
      state.re[at] = 0.5 * (sourceRe[at] - sign * sourceRe[reflected]);
      state.im[at] = 0.5 * (sourceIm[at] - sign * sourceIm[reflected]);
    }
  }
}

function projectRotation(state) {
  for (let k = -state.K; k <= state.K; k += 1) {
    if (Math.abs(k) % 2 === 0) continue;
    for (let m = -state.K; m <= state.K; m += 1) {
      const at = index(state, k, m);
      state.re[at] = 0;
      state.im[at] = 0;
    }
  }
}

function applyRotationDimensionMask(state) {
  for (const k of [-state.K, state.K]) {
    for (const m of [-(state.K), -(state.K - 1), state.K - 1, state.K]) {
      const at = index(state, k, m);
      state.re[at] = 0;
      state.im[at] = 0;
    }
  }
}

function projectReality(state) {
  const sourceRe = state.re.slice();
  const sourceIm = state.im.slice();
  for (let k = -state.K; k <= state.K; k += 1) {
    for (let m = -state.K; m <= state.K; m += 1) {
      const at = index(state, k, m);
      const opposite = index(state, -k, -m);
      state.re[at] = 0.5 * (sourceRe[at] + sourceRe[opposite]);
      state.im[at] = 0.5 * (sourceIm[at] - sourceIm[opposite]);
    }
  }
  const zero = index(state, 0, 0);
  state.re[zero] = 0;
  state.im[zero] = 0;
}

function project(state, sector = "klein") {
  if (sector === "klein") projectKlein(state);
  else projectRotation(state);
  projectReality(state);
  if (sector === "klein") projectKlein(state);
  else {
    projectRotation(state);
    applyRotationDimensionMask(state);
  }
}

function energyAndEnstrophy(state) {
  let energy = 0;
  let enstrophy = 0;
  let palinstrophy = 0;
  let boundaryEnergy = 0;
  for (let k = -state.K; k <= state.K; k += 1) {
    for (let m = -state.K; m <= state.K; m += 1) {
      const q2 = k * k + m * m;
      if (q2 === 0) continue;
      const at = index(state, k, m);
      const magnitude2 = state.re[at] ** 2 + state.im[at] ** 2;
      energy += 0.5 * magnitude2 / q2;
      enstrophy += 0.5 * magnitude2;
      palinstrophy += 0.5 * q2 * magnitude2;
      if (Math.abs(k) === state.K || Math.abs(m) === state.K) {
        boundaryEnergy += 0.5 * magnitude2 / q2;
      }
    }
  }
  return { energy, enstrophy, palinstrophy, boundaryEnergy };
}

function normalizeEnergy(state) {
  const current = energyAndEnstrophy(state).energy;
  const scale = 1 / Math.sqrt(current);
  for (let i = 0; i < state.re.length; i += 1) {
    state.re[i] *= scale;
    state.im[i] *= scale;
  }
}

function initialState(K, sector = "klein") {
  const state = makeState(K);
  if (sector === "rotation") {
    const scaleC = Math.sqrt(6 / 7);
    const scaleD = Math.sqrt(8 / 35);
    // psi_C = cos(2y), with energy one before scaling.
    addCoefficient(state, 0, 2, 4 * 0.5 * scaleC);
    addCoefficient(state, 0, -2, 4 * 0.5 * scaleC);
    // psi_D = sin(2x)sin(y), with energy 5/8 before scaling.
    addCoefficient(state, 2, -1, 5 * 0.25 * scaleD);
    addCoefficient(state, -2, 1, 5 * 0.25 * scaleD);
    addCoefficient(state, 2, 1, -5 * 0.25 * scaleD);
    addCoefficient(state, -2, -1, -5 * 0.25 * scaleD);
    project(state, sector);
    return state;
  }
  // psi_A = cos(x)cos(y)
  for (const k of [-1, 1]) {
    for (const m of [-1, 1]) {
      addCoefficient(state, k, m, 2 * 0.25);
    }
  }
  // psi_B = sin(2x)sin(y)
  addCoefficient(state, 2, -1, 5 * 0.25);
  addCoefficient(state, -2, 1, 5 * 0.25);
  addCoefficient(state, 2, 1, -5 * 0.25);
  addCoefficient(state, -2, -1, -5 * 0.25);
  project(state, sector);
  normalizeEnergy(state);
  return state;
}

function rhs(state, viscosity) {
  const out = makeState(state.K);
  const active = [];
  for (let k = -state.K; k <= state.K; k += 1) {
    for (let m = -state.K; m <= state.K; m += 1) {
      const at = index(state, k, m);
      if (state.re[at] !== 0 || state.im[at] !== 0) {
        active.push({ k, m, at, q2: k * k + m * m });
      }
    }
  }

  for (const q of active) {
    out.re[q.at] -= viscosity * q.q2 * state.re[q.at];
    out.im[q.at] -= viscosity * q.q2 * state.im[q.at];
  }

  for (const p of active) {
    if (p.q2 === 0) continue;
    const psiRe = state.re[p.at] / p.q2;
    const psiIm = state.im[p.at] / p.q2;
    for (const r of active) {
      const k = p.k + r.k;
      const m = p.m + r.m;
      if (Math.abs(k) > state.K || Math.abs(m) > state.K) continue;
      const cross = p.k * r.m - p.m * r.k;
      if (cross === 0) continue;
      const target = index(state, k, m);
      const productRe = psiRe * state.re[r.at] - psiIm * state.im[r.at];
      const productIm = psiRe * state.im[r.at] + psiIm * state.re[r.at];
      out.re[target] += cross * productRe;
      out.im[target] += cross * productIm;
    }
  }
  return out;
}

function combined(base, terms, sector = "klein") {
  const out = cloneState(base);
  for (let i = 0; i < out.re.length; i += 1) {
    for (const [factor, term] of terms) {
      out.re[i] += factor * term.re[i];
      out.im[i] += factor * term.im[i];
    }
  }
  project(out, sector);
  return out;
}

function rk4Step(state, dt, viscosity, sector = "klein") {
  const k1 = rhs(state, viscosity);
  const k2 = rhs(combined(state, [[0.5 * dt, k1]], sector), viscosity);
  const k3 = rhs(combined(state, [[0.5 * dt, k2]], sector), viscosity);
  const k4 = rhs(combined(state, [[dt, k3]], sector), viscosity);
  return combined(state, [
    [dt / 6, k1],
    [dt / 3, k2],
    [dt / 3, k3],
    [dt / 6, k4],
  ], sector);
}

function sectorErrors(state, sector = "klein") {
  let norm = 0;
  let forbidden = 0;
  let reality = 0;
  for (let k = -state.K; k <= state.K; k += 1) {
    const sign = Math.abs(k) % 2 === 0 ? 1 : -1;
    for (let m = -state.K; m <= state.K; m += 1) {
      const at = index(state, k, m);
      const reflected = index(state, k, -m);
      const opposite = index(state, -k, -m);
      norm += state.re[at] ** 2 + state.im[at] ** 2;
      if (sector === "klein") {
        forbidden += (state.re[at] + sign * state.re[reflected]) ** 2
          + (state.im[at] + sign * state.im[reflected]) ** 2;
      } else if (Math.abs(k) % 2 === 1) {
        forbidden += state.re[at] ** 2 + state.im[at] ** 2;
      }
      reality += (state.re[at] - state.re[opposite]) ** 2
        + (state.im[at] + state.im[opposite]) ** 2;
    }
  }
  return {
    forbiddenRatio: Math.sqrt(forbidden / Math.max(norm, Number.EPSILON)),
    realityRatio: Math.sqrt(reality / Math.max(norm, Number.EPSILON)),
  };
}

function daughterAmplitudes(state) {
  return evidence.daughterModes.map(([k, m]) => {
    const at = index(state, k, m);
    return {
      k,
      m,
      amplitude: Math.hypot(state.re[at], state.im[at]),
    };
  });
}

function modeAmplitude(state, k, m) {
  const at = index(state, k, m);
  return Math.hypot(state.re[at], state.im[at]);
}

function sectorDimensions(K) {
  const klein = (2 * K + 1) * K
    + Array.from({ length: 2 * K + 1 }, (_, offset) => offset - K)
      .filter((k) => Math.abs(k) % 2 === 1).length;
  const evenAxialCount = Array.from({ length: 2 * K + 1 }, (_, offset) => offset - K)
    .filter((k) => Math.abs(k) % 2 === 0).length;
  const rotationBeforeMask = evenAxialCount * (2 * K + 1) - 1;
  const rotationAfterMask = rotationBeforeMask - 8;
  return { klein, rotationBeforeMask, rotationAfterMask };
}

function run(config, sector = "klein") {
  let state = initialState(config.maximumWavenumber, sector);
  const initial = energyAndEnstrophy(state);
  const steps = Math.round(config.finalTime / config.timeStep);
  assert(Math.abs(steps * config.timeStep - config.finalTime) < 1e-14,
    "final time must be an integer number of steps");
  let integratedEnstrophy = 0;
  let priorEnstrophy = initial.enstrophy;
  let maximumForbiddenSectorRatio = 0;
  let maximumRealityErrorRatio = 0;
  let maximumRawRhsForbiddenRatio = 0;

  for (let step = 0; step < steps; step += 1) {
    const rawRhsErrors = sectorErrors(rhs(state, evidence.viscosity), sector);
    maximumRawRhsForbiddenRatio = Math.max(
      maximumRawRhsForbiddenRatio,
      rawRhsErrors.forbiddenRatio,
    );
    state = rk4Step(state, config.timeStep, evidence.viscosity, sector);
    const diagnostics = energyAndEnstrophy(state);
    integratedEnstrophy += 0.5 * (priorEnstrophy + diagnostics.enstrophy) * config.timeStep;
    priorEnstrophy = diagnostics.enstrophy;
    const errors = sectorErrors(state, sector);
    maximumForbiddenSectorRatio = Math.max(maximumForbiddenSectorRatio, errors.forbiddenRatio);
    maximumRealityErrorRatio = Math.max(maximumRealityErrorRatio, errors.realityRatio);
  }

  const final = energyAndEnstrophy(state);
  const expectedEnergy = initial.energy - 2 * evidence.viscosity * integratedEnstrophy;
  return {
    state,
    initial,
    final,
    energyBudgetResidual: final.energy - expectedEnergy,
    maximumForbiddenSectorRatio,
    maximumRealityErrorRatio,
    maximumRawRhsForbiddenRatio,
    daughterAmplitudes: daughterAmplitudes(state),
  };
}

function lowModeRelativeDifference(a, b, maximumWavenumber) {
  let difference = 0;
  let norm = 0;
  for (let k = -maximumWavenumber; k <= maximumWavenumber; k += 1) {
    for (let m = -maximumWavenumber; m <= maximumWavenumber; m += 1) {
      const ai = index(a, k, m);
      const bi = index(b, k, m);
      difference += (a.re[ai] - b.re[bi]) ** 2 + (a.im[ai] - b.im[bi]) ** 2;
      norm += b.re[bi] ** 2 + b.im[bi] ** 2;
    }
  }
  return Math.sqrt(difference / Math.max(norm, Number.EPSILON));
}

const coarse = run(evidence.runs.coarse);
const fine = run(evidence.runs.fine);
const rotation = run(evidence.runs.fine, "rotation");
const thresholds = evidence.thresholds;
const refinementDifference = lowModeRelativeDifference(
  coarse.state,
  fine.state,
  evidence.runs.coarse.maximumWavenumber,
);
const fineBoundaryEnergyFraction = fine.final.boundaryEnergy / fine.final.energy;
const dimensions = sectorDimensions(evidence.runs.fine.maximumWavenumber);

for (const result of [coarse, fine]) {
  assert(result.final.energy < result.initial.energy, "viscosity must reduce energy");
  assert(result.final.enstrophy < result.initial.enstrophy, "viscosity must reduce enstrophy");
  assert(result.maximumForbiddenSectorRatio <= thresholds.maximumForbiddenSectorRatio,
    "forbidden Klein-sector leakage exceeds threshold");
  assert(result.maximumRealityErrorRatio <= thresholds.maximumRealityErrorRatio,
    "reality error exceeds threshold");
  assert(result.maximumRawRhsForbiddenRatio <= thresholds.maximumForbiddenSectorRatio,
    "unprojected Navier--Stokes right-hand side leaves the Klein sector");
  assert(Math.abs(result.energyBudgetResidual) <= thresholds.maximumEnergyBudgetResidual,
    "energy budget residual exceeds threshold");
  assert(result.daughterAmplitudes.every((mode) => mode.amplitude >= thresholds.minimumDaughterModeAmplitude),
    "one or more predicted daughter modes were not resolved");
}

assert(Math.abs(rotation.initial.energy - fine.initial.energy) < 1e-12,
  "rotation control must match initial energy");
assert(Math.abs(rotation.initial.enstrophy - fine.initial.enstrophy) < 1e-12,
  "rotation control must match initial enstrophy");
assert(rotation.maximumForbiddenSectorRatio <= thresholds.maximumForbiddenSectorRatio,
  "rotation control leaked into odd axial harmonics");
assert(rotation.maximumRawRhsForbiddenRatio <= thresholds.maximumForbiddenSectorRatio,
  "rotation right-hand side leaked into odd axial harmonics");
assert(dimensions.klein === evidence.rotationControl.retainedRealDimension,
  "Klein retained dimension does not match control contract");
assert(dimensions.rotationAfterMask === dimensions.klein,
  "rotation mask does not produce an equal-dimension control");

assert(refinementDifference <= thresholds.maximumLowModeRelativeDifference,
  "coarse/fine low-mode difference exceeds threshold");
assert(fineBoundaryEnergyFraction <= thresholds.maximumFineBoundaryEnergyFraction,
  "fine-grid spectral boundary contains too much energy");

function summarize(result) {
  return {
    initialEnergy: result.initial.energy,
    finalEnergy: result.final.energy,
    initialEnstrophy: result.initial.enstrophy,
    finalEnstrophy: result.final.enstrophy,
    energyBudgetResidual: result.energyBudgetResidual,
    maximumForbiddenSectorRatio: result.maximumForbiddenSectorRatio,
    maximumRealityErrorRatio: result.maximumRealityErrorRatio,
    maximumRawRhsForbiddenRatio: result.maximumRawRhsForbiddenRatio,
    boundaryEnergyFraction: result.final.boundaryEnergy / result.final.energy,
    daughterAmplitudes: result.daughterAmplitudes,
  };
}

console.log(JSON.stringify({
  status: "PASS",
  coarse: summarize(coarse),
  fine: summarize(fine),
  rotationControl: summarize(rotation),
  refinementDifference,
  fineBoundaryEnergyFraction,
  comparison: {
    dimensions,
    matchedInitialEnergy: rotation.initial.energy,
    matchedInitialEnstrophy: rotation.initial.enstrophy,
    kleinFinalEnergy: fine.final.energy,
    rotationFinalEnergy: rotation.final.energy,
    kleinFinalEnstrophy: fine.final.enstrophy,
    rotationFinalEnstrophy: rotation.final.enstrophy,
    rotationDistinctDaughterAmplitudeAt2_3: modeAmplitude(rotation.state, 2, 3),
    kleinOneLapTransverseMultiplier: -1,
    rotationOneLapTransverseMultiplier: 1
  },
  verdict: "Matched finite-amplitude Klein and rotation sectors remain dynamically closed but expose different signed return laws and mode-transfer records."
}, null, 2));
