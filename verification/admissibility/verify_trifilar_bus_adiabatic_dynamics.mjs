import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-trifilar-bus-adiabatic-dynamics-v1.json",
  import.meta.url,
), "utf8"));

const c = evidence.latitudeCosine;
const s = Math.sqrt(1 - c * c);
const ratios = evidence.dynamicalSamples.map(({ gapToLoopRate }) => gapToLoopRate);
const integrationSteps = evidence.integrationSteps;
const period = 2 * Math.PI;
const tolerance = 2e-9;
function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const dot = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);
const transpose = (A) => A[0].map((_, column) => A.map((row) => row[column]));
const multiply = (A, B) => A.map((row) => B[0].map((_, column) =>
  row.reduce((sum, value, index) => sum + value * B[index][column], 0)));
const outer = (a, b) => a.map((left) => b.map((right) => left * right));
const scale = (factor, A) => A.map((row) => row.map((value) => factor * value));
const add = (...matrices) => matrices[0].map((row, i) => row.map((_, j) =>
  matrices.reduce((sum, matrix) => sum + matrix[i][j], 0)));
const frame = (phi) => [
  [-Math.sin(phi), c * Math.cos(phi)],
  [Math.cos(phi), c * Math.sin(phi)],
  [0, -s],
];
const normal = (phi) => [s * Math.cos(phi), s * Math.sin(phi), c];
const zero = () => Array.from({ length: 3 }, () => Array(2).fill(0));
const stateAdd = (...states) => ({
  re: add(...states.map((state) => state.re)),
  im: add(...states.map((state) => state.im)),
});
const stateScale = (factor, state) => ({ re: scale(factor, state.re), im: scale(factor, state.im) });

function derivative(time, state, gap) {
  const H = scale(gap, outer(normal(time), normal(time)));
  return {
    re: multiply(H, state.im),
    im: scale(-1, multiply(H, state.re)),
  };
}

function evolve(gap) {
  const dt = period / integrationSteps;
  let state = { re: frame(0), im: zero() };
  for (let step = 0; step < integrationSteps; step += 1) {
    const time = step * dt;
    const k1 = derivative(time, state, gap);
    const k2 = derivative(time + dt / 2, stateAdd(state, stateScale(dt / 2, k1)), gap);
    const k3 = derivative(time + dt / 2, stateAdd(state, stateScale(dt / 2, k2)), gap);
    const k4 = derivative(time + dt, stateAdd(state, stateScale(dt, k3)), gap);
    state = stateAdd(state, stateScale(dt / 6, stateAdd(k1, stateScale(2, k2), stateScale(2, k3), k4)));
  }
  return state;
}

function returnMetrics(state) {
  const q0t = transpose(frame(0));
  const re = multiply(q0t, state.re);
  const im = multiply(q0t, state.im);
  const bright = normal(0);
  const brightRe = Array.from({ length: 2 }, (_, column) =>
    dot(bright, state.re.map((row) => row[column])));
  const brightIm = Array.from({ length: 2 }, (_, column) =>
    dot(bright, state.im.map((row) => row[column])));
  const meanLeakage = brightRe.reduce((sum, value, index) =>
    sum + value * value + brightIm[index] * brightIm[index], 0) / 2;
  const target = [[0, 1], [-1, 0]];
  const overlapRe = target.flatMap((row, i) => row.map((value, j) => value * re[i][j]))
    .reduce((sum, value) => sum + value, 0) / 2;
  const overlapIm = target.flatMap((row, i) => row.map((value, j) => value * im[i][j]))
    .reduce((sum, value) => sum + value, 0) / 2;
  const processOverlap = Math.hypot(overlapRe, overlapIm);
  const phase = Math.atan2(overlapIm, overlapRe);
  const correctedRe = re.map((row, i) => row.map((value, j) =>
    value * Math.cos(phase) + im[i][j] * Math.sin(phase)));
  const angleDegrees = Math.atan2(
    correctedRe[1][0] - correctedRe[0][1],
    correctedRe[0][0] + correctedRe[1][1],
  ) * 180 / Math.PI;
  return { meanLeakage, processOverlap, phase, angleDegrees, re, im };
}

const results = ratios.map((ratio) => {
  const metrics = returnMetrics(evolve(ratio));
  return {
    gapToLoopRate: ratio,
    localAdiabaticRatio: s / ratio,
    meanBrightLeakage: metrics.meanLeakage,
    targetProcessOverlap: metrics.processOverlap,
    correctedAngleDegrees: metrics.angleDegrees,
    commonPhaseRadians: metrics.phase,
  };
});

results.forEach((actual, index) => {
  const expected = evidence.dynamicalSamples[index];
  for (const field of ["meanBrightLeakage", "targetProcessOverlap", "correctedAngleDegrees"]) {
    assert(Math.abs(actual[field] - expected[field]) < tolerance,
      field + " mismatch at gap/loop-rate " + actual.gapToLoopRate);
  }
});
assert(results.every((result, index) => index === 0
  || result.meanBrightLeakage < results[index - 1].meanBrightLeakage),
"bright leakage must decrease along the sampled adiabatic ladder");
assert(results.every((result, index) => index === 0
  || result.targetProcessOverlap > results[index - 1].targetProcessOverlap),
"target overlap must increase along the sampled adiabatic ladder");

const fixture = evidence.componentFixture;
const detuning = fixture.busDetuningPerSecond;
const coupling = fixture.couplingNormPerSecond;
const discriminant = Math.sqrt(detuning * detuning + 4 * coupling * coupling);
const primaryLikeBrightEigenvalue = (detuning + discriminant) / 2;
const exactGap = Math.abs(primaryLikeBrightEigenvalue);
const eliminatedGap = coupling * coupling / Math.abs(detuning);
const eliminationRelativeError = Math.abs(eliminatedGap - exactGap) / exactGap;
const busToPrimaryAmplitudeRatio = Math.abs(primaryLikeBrightEigenvalue / coupling);
const busParticipation = busToPrimaryAmplitudeRatio ** 2
  / (1 + busToPrimaryAmplitudeRatio ** 2);
const lossRequirements = [8, 32].map((ratio) => {
  const loopRate = exactGap / ratio;
  const loopDurationSeconds = 2 * Math.PI / loopRate;
  const minimumQByAmplitude = Object.fromEntries(
    fixture.amplitudeSurvivalTargets.map((survival) => [
      survival,
      fixture.primaryAngularFrequencyPerSecond * loopDurationSeconds / (-2 * Math.log(survival)),
    ]),
  );
  return { gapToLoopRate: ratio, loopDurationSeconds, minimumQByAmplitude };
});
assert(evidence.mechanismBoundary.projectionProductEquivalent === false,
  "projection and Hamiltonian evolution must remain distinct");
assert(evidence.mechanismBoundary.timeVaryingControlPortRequired === true,
  "time-varying coupling vector must retain its controller port");

console.log(JSON.stringify({
  status: "PASS",
  c,
  s,
  integrationSteps,
  dynamicalResults: results,
  componentFixture: {
    exactGap,
    eliminatedGap,
    eliminationRelativeError,
    busParticipation,
    lossRequirements,
  },
  verdict: "A detuned fourth mode supplies the rank-one bright generator and converges rapidly to the quarter-turn, but the human-scale passive fixture is loss-limited unless its Q is exceptionally high.",
}, null, 2));
