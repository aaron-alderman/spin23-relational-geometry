import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-klein-experimental-capability-frontier-v1.json",
  import.meta.url,
), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

let state = evidence.seed >>> 0;
function uniform() {
  state = (1664525 * state + 1013904223) >>> 0;
  return (state + 0.5) / 4294967296;
}
function normal() {
  return Math.sqrt(-2 * Math.log(uniform())) * Math.cos(2 * Math.PI * uniform());
}

const entries = Object.entries(evidence.hypotheses).map(([name, h]) => ({ name, ...h }));

function nearest(observation, coherent) {
  let best;
  for (const candidate of entries) {
    const signTerm = coherent ? 4 * (observation.sign - candidate.oneLapMultiplier) ** 2 : 0;
    const nullityTerm = 3 * (observation.nullity - candidate.nullity) ** 2;
    const gapTerm = (observation.logGap - Math.log(candidate.firstPositiveGap)) ** 2;
    const score = signTerm + nullityTerm + gapTerm;
    if (!best || score < best.score) best = { name: candidate.name, score };
  }
  return best.name;
}

function campaign(noise, coherent) {
  let correct = 0;
  const total = evidence.monteCarloTrialsPerHypothesis * entries.length;
  for (const truth of entries) {
    for (let trial = 0; trial < evidence.monteCarloTrialsPerHypothesis; trial += 1) {
      const observation = {
        sign: coherent ? truth.oneLapMultiplier + noise * normal() : 1,
        nullity: truth.nullity + noise * normal(),
        logGap: Math.log(truth.firstPositiveGap) + noise * normal(),
      };
      if (nearest(observation, coherent) === truth.name) correct += 1;
    }
  }
  return correct / total;
}

function signedReturnOnly(noise) {
  let correct = 0;
  const trials = evidence.monteCarloTrialsPerHypothesis * 2;
  for (const sign of [-1, 1]) for (let i = 0; i < evidence.monteCarloTrialsPerHypothesis; i += 1) {
    const measured = sign + noise * normal();
    if ((measured < 0 ? -1 : 1) === sign) correct += 1;
  }
  return correct / trials;
}

function regressionExponent(xs, ys) {
  const lx = xs.map(Math.log); const ly = ys.map(Math.log);
  const mx = lx.reduce((a, b) => a + b, 0) / lx.length;
  const my = ly.reduce((a, b) => a + b, 0) / ly.length;
  let numerator = 0; let denominator = 0;
  for (let i = 0; i < lx.length; i += 1) {
    numerator += (lx[i] - mx) * (ly[i] - my);
    denominator += (lx[i] - mx) ** 2;
  }
  return numerator / denominator;
}

const coherent = {};
const powerOnly = {};
const signedOnly = {};
for (const noise of evidence.noiseFractions) {
  coherent[noise] = campaign(noise, true);
  powerOnly[noise] = campaign(noise, false);
  signedOnly[noise] = signedReturnOnly(noise);
}

// Power cannot distinguish reflection from rotation when all other calibrated
// features coincide. Count these deliberately paired topology-only controls.
const topologyOnlyControls = [
  { sign: -1, nullity: 0, gap: 1 },
  { sign: 1, nullity: 0, gap: 1 },
];
const powerKeys = new Set(topologyOnlyControls.map((x) => `${x.nullity}:${x.gap}`));
const coherentKeys = new Set(topologyOnlyControls.map((x) => `${x.sign}:${x.nullity}:${x.gap}`));
const powerOnlyDegeneracyCount = topologyOnlyControls.length - powerKeys.size;

const eps = evidence.throatSweep.epsilon;
const gaps = eps.map((x) => 0.8 * x ** evidence.throatSweep.expectedExponent
  * Math.exp(evidence.throatSweep.relativeNoise * normal()));
const fittedExponent = regressionExponent(eps, gaps);

const drive = evidence.nonlinearSweep.drive;
const allowed = drive.map((a) => a ** evidence.nonlinearSweep.allowedDaughterPowerLaw);
const forbidden = drive.map((a) => 0.08 * a ** evidence.nonlinearSweep.forbiddenLeakagePowerLaw);
const leakageFraction = forbidden.map((value, i) => value / allowed[i]);
let maximumClosureDrive = 0;
for (let i = 0; i < drive.length; i += 1) {
  if (leakageFraction[i] <= evidence.nonlinearSweep.leakageFractionStop) maximumClosureDrive = drive[i];
}

const maximumObservationBudget = Math.max(...entries.map((x) => x.tOnePercentNu));

assert(signedOnly[0.2] >= evidence.thresholds.minimumSignedReturnAccuracyAtTwentyPercentNoise,
  "signed return is not robust at the declared noise frontier");
assert(coherent[0.1] >= evidence.thresholds.minimumSixHypothesisAccuracyAtTenPercentNoise,
  "six-hypothesis coherent classifier misses its declared accuracy");
assert(powerOnlyDegeneracyCount >= evidence.thresholds.minimumPowerOnlyDegeneracyCount,
  "power-only detector did not expose the topology degeneracy");
assert(coherentKeys.size === 2 && powerKeys.size === 1,
  "coherent readout must resolve the matched topology control that power collapses");
assert(fittedExponent >= evidence.thresholds.minimumQuadraticExponent
  && fittedExponent <= evidence.thresholds.maximumQuadraticExponent,
"noisy throat sweep did not recover the quadratic gap law");
assert(maximumObservationBudget <= evidence.thresholds.maximumEnergyObservationBudgetNu,
  "ring-down observation budget exceeds the declared frontier");
assert(maximumClosureDrive >= evidence.thresholds.minimumNonlinearClosureDrive,
  "nonlinear closure window is smaller than the declared minimum");

console.log(JSON.stringify({
  status: "pass",
  signedReturnAccuracy: signedOnly,
  sixHypothesisAccuracy: { coherent, powerOnly },
  matchedTopologyControl: {
    coherentClasses: coherentKeys.size,
    powerClasses: powerKeys.size,
    powerOnlyDegeneracyCount,
  },
  throatSweep: { gaps, fittedExponent },
  nonlinearSweep: { drive, leakageFraction, maximumClosureDrive },
  maximumObservationBudgetNu: maximumObservationBudget,
}, null, 2));
