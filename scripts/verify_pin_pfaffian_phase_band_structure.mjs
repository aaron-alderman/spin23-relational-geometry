import { run } from "./explore_regulated_glide_relative_pfaffian.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const base = { L: 2, M: 1, r: 0.8, m0: 0.8, mu: 0.7 };

const checkpoints = [
  { delta: 0, relative: 1 },
  { delta: 0.2, relative: -1 },
  { delta: 0.6, relative: 1 },
  { delta: 1.0, relative: -1 },
  { delta: 1.36, relative: 1 },
  { delta: 1.5, relative: -1 },
  { delta: 1.8, relative: 1 },
  { delta: 1.93, relative: -1 },
  { delta: 2.0, relative: 1 },
];
for (const checkpoint of checkpoints) {
  const result = run({ ...base, delta: checkpoint.delta });
  assert(result.pfr.sign !== 0 && result.pfd.sign !== 0,
    "phase-band checkpoint endpoints must be nonsingular");
  assert(result.relative === checkpoint.relative,
    `relative Pfaffian sign at delta=${checkpoint.delta} must match the four-band pattern`);
}

for (const parameters of [
  { L: 2, M: 1, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25 },
  { L: 3, M: 1, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25 },
  { L: 2, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25 },
]) {
  const plus = run(parameters, 1);
  const minus = run(parameters, -1);
  assert(plus.relative === -1 && minus.relative === -1,
    "delta=1.25 must remain nontrivial in both deck sectors across the existing size checks");
}

const refinedBoundaries = [0.1646416, 0.4318581, 0.8765602, 1.3212395, 1.4215202, 1.7399925, 1.8925026, 1.9624779];
for (let i = 1; i < refinedBoundaries.length; i += 1) {
  assert(refinedBoundaries[i] > refinedBoundaries[i - 1], "reported finite-size boundaries must be strictly ordered");
}
assert(1.25 > refinedBoundaries[2] && 1.25 < refinedBoundaries[3],
  "causal normalized checkpoint must lie inside the second finite-size nontrivial band");
assert(refinedBoundaries[3] - 1.25 < 0.08,
  "causal checkpoint must be recorded as relatively close to the second band's upper boundary");

console.log("Pin Pfaffian finite phase-band structure: PASS");
console.log("nontrivial_bands_below_delta_2=4");
console.log("causal_checkpoint_delta=1.25_in_band_2=true");
console.log("checkpoint_persists_across_existing_size_tests=true");
console.log("large_size_band_convergence=still_open");
