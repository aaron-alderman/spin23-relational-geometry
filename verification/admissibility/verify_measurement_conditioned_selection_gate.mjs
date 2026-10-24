import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(
  fs.readFileSync(path.join(root, "evidence/data/admissibility-measurement-conditioned-selection-gate-v1.json"), "utf8"),
);
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const near = (actual, expected, tolerance, message) => assert(Math.abs(actual - expected) <= tolerance, `${message}: ${actual} versus ${expected}`);

const epsilon = evidence.weakMeasurement.strength;
const gamma = evidence.secondDatum.strength;
const rho = { p0: 0.3, p1: 0.7, coherence: 0.2 };
const outcomes = [+1, -1].map((s) => {
  const a0 = (1 + s * epsilon) / 2;
  const a1 = (1 - s * epsilon) / 2;
  const probability = a0 * rho.p0 + a1 * rho.p1;
  return {
    s,
    probability,
    p0: a0 * rho.p0 / probability,
    p1: a1 * rho.p1 / probability,
    coherence: Math.sqrt(a0 * a1) * rho.coherence / probability,
  };
});

const unconditional = outcomes.reduce((sum, outcome) => ({
  p0: sum.p0 + outcome.probability * outcome.p0,
  p1: sum.p1 + outcome.probability * outcome.p1,
  coherence: sum.coherence + outcome.probability * outcome.coherence,
}), { p0: 0, p1: 0, coherence: 0 });
const expectedCoherenceFactor = Math.sqrt(1 - epsilon ** 2);

near(outcomes.reduce((sum, outcome) => sum + outcome.probability, 0), 1, 1e-15, "outcome probabilities do not normalize");
near(unconditional.p0, rho.p0, 1e-15, "measurement changed unconditional p0");
near(unconditional.p1, rho.p1, 1e-15, "measurement changed unconditional p1");
near(unconditional.coherence, expectedCoherenceFactor * rho.coherence, 1e-15, "dephasing factor changed");
assert(outcomes[0].p0 > rho.p0 && outcomes[1].p0 < rho.p0, "conditioned outcomes do not branch toward opposite poles");

for (const p0 of [0.1, 0.25, 0.5, 0.9]) {
  const fixed = { p0, p1: 1 - p0, coherence: 0 };
  const after = { ...fixed, coherence: expectedCoherenceFactor * fixed.coherence };
  near(after.p0, fixed.p0, 0, "diagonal fixed manifold failed");
  near(after.p1, fixed.p1, 0, "diagonal fixed manifold failed");
}

const dampedExcited = (1 - gamma) * rho.p1;
near(dampedExcited, 0.525, 1e-15, "amplitude-damping contraction changed");
assert(dampedExcited < rho.p1, "second datum did not contract excited population");
let repeated = rho.p1;
for (let i = 0; i < 100; i++) repeated *= 1 - gamma;
assert(repeated < 1e-12, "amplitude damping did not produce its unique fixed point");

assert(evidence.requiredSeparations.length === 5, "measurement typing incomplete");
assert(evidence.experiment.length === 7, "experiment packet incomplete");
assert(evidence.admissionVerdict === "MEASUREMENT_CREATES_RECORD_BRANCHES_BUT_NOT_UNIQUE_UNCONDITIONAL_SELECTION", "admission firewall changed");

console.log("PASS measurement-conditioned selection gate");
console.log(`  outcome probabilities: ${outcomes.map(({ probability }) => probability).join(", ")}`);
console.log(`  conditioned p0 values: ${outcomes.map(({ p0 }) => p0).join(", ")}`);
console.log(`  unconditional p0: ${unconditional.p0}`);
console.log(`  coherence multiplier: ${expectedCoherenceFactor}`);
console.log(`  damping fixed-point residual after 100 steps: ${repeated}`);
