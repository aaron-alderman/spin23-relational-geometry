import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(
  fs.readFileSync(path.join(root, "evidence/data/admissibility-selector-thermodynamic-cost-gate-v1.json"), "utf8"),
);
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const near = (actual, expected, tolerance, message) => assert(Math.abs(actual - expected) <= tolerance, `${message}: ${actual} versus ${expected}`);

const { towardSelected: kp, awayFromSelected: km } = evidence.witness.rates;
const p0 = evidence.witness.initialSelectedProbability;
const tau = evidence.witness.observationTime;
const lambda = kp + km;
const pStar = kp / lambda;
const p = (t, scale = 1) => pStar + (p0 - pStar) * Math.exp(-scale * lambda * t);
const kl = (q, r) => q * Math.log(q / r) + (1 - q) * Math.log((1 - q) / (1 - r));
const sigma = (t, scale = 1) => {
  const q = p(t, scale);
  const forward = scale * kp * (1 - q);
  const backward = scale * km * q;
  if (Math.abs(forward - backward) < 1e-15) return 0;
  return (forward - backward) * Math.log(forward / backward);
};
function simpson(fn, a, b, steps = 20000) {
  if (steps % 2) steps++;
  const h = (b - a) / steps;
  let sum = fn(a) + fn(b);
  for (let i = 1; i < steps; i++) sum += (i % 2 ? 4 : 2) * fn(a + i * h);
  return sum * h / 3;
}

const r = Math.exp(-lambda * tau);
const pTau = p(tau);
const entropyProduced = simpson((t) => sigma(t), 0, tau);
const relativeEntropyDrop = kl(p0, pStar) - kl(pTau, pStar);
const scale = 10;
const fastTau = tau / scale;
const fastEntropyProduced = simpson((t) => sigma(t, scale), 0, fastTau);

near(pStar, evidence.witness.stationarySelectedProbability, 1e-15, "stationary state changed");
near(r, evidence.witness.contractionMultiplier, 1e-15, "contraction multiplier changed");
near(pTau, pStar + r * (p0 - pStar), 1e-15, "affine return map failed");
near(sigma(100), 0, 1e-12, "stationary entropy production must vanish");
near(entropyProduced, relativeEntropyDrop, 1e-10, "relaxation entropy balance failed");
near(p(fastTau, scale), pTau, 1e-15, "scaled-rate trajectory endpoint changed");
near(fastEntropyProduced, entropyProduced, 1e-10, "scaled-rate total entropy changed");
assert(r > 0 && r < 1, "return map must be contractive");
assert(entropyProduced > 0, "nonequilibrium relaxation must produce positive entropy");
assert(evidence.measurementPacket.length === 8, "trajectory measurement packet incomplete");
assert(evidence.admissionVerdict === "CONTRACTION_DOES_NOT_DETERMINE_THERMODYNAMIC_COST_TRAJECTORY_ACCOUNTING_REQUIRED", "admission firewall changed");

console.log("PASS selector thermodynamic-cost gate");
console.log(`  fixed point: ${pStar}`);
console.log(`  contraction multiplier: ${r}`);
console.log(`  transient entropy production: ${entropyProduced}`);
console.log(`  stationary entropy production: ${sigma(100)}`);
console.log(`  tenfold speedup entropy over matched path: ${fastEntropyProduced}`);
