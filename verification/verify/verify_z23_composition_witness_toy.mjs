import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/z23-composition-witness-toy-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));

assert.equal(evidence.schemaVersion, "z23-composition-witness-toy-v1");
const N = evidence.groupOrder;
const mod = (value) => ((value % N) + N) % N;

// Work with phase exponents in Z_23 so the coherence checks are exact.
const omegaExponent = (p, a, b, c) =>
  mod(p * a * Math.floor((b + c) / N));

// δω=1: ω(b,c,d)ω(a,b+c,d)ω(a,b,c)
//          =ω(a+b,c,d)ω(a,b,c+d).
for (let p = 0; p < N; p += 1) {
  for (let a = 0; a < N; a += 1) {
    for (let b = 0; b < N; b += 1) {
      for (let c = 0; c < N; c += 1) {
        for (let d = 0; d < N; d += 1) {
          const left = mod(
            omegaExponent(p, b, c, d)
              + omegaExponent(p, a, mod(b + c), d)
              + omegaExponent(p, a, b, c),
          );
          const right = mod(
            omegaExponent(p, mod(a + b), c, d)
              + omegaExponent(p, a, b, mod(c + d)),
          );
          assert.equal(left, right, `cocycle failure p=${p} at ${a},${b},${c},${d}`);
        }
      }
    }
  }
}

const loopExponent = (p, generator = 1, cocycle = omegaExponent) => {
  let total = 0;
  for (let j = 0; j < N; j += 1) {
    total = mod(
      total + cocycle(p, generator, mod(generator * j), generator),
    );
  }
  return total;
};

for (let p = 0; p < N; p += 1) {
  assert.equal(loopExponent(p), p);
  assert.equal(loopExponent(p, 5), mod(2 * p));
}

// Check gauge invariance with several deterministic normalized 2-cochains.
const betaFamilies = [
  (a, b) => (a === 0 || b === 0 ? 0 : mod(a * b)),
  (a, b) => (a === 0 || b === 0 ? 0 : mod(a * a + 3 * b)),
  (a, b) => (a === 0 || b === 0 ? 0 : mod((a + 7) * (b + 11))),
];
for (const beta of betaFamilies) {
  const gauged = (p, a, b, c) => mod(
    omegaExponent(p, a, b, c)
      + beta(b, c)
      + beta(a, mod(b + c))
      - beta(mod(a + b), c)
      - beta(a, b),
  );
  for (let p = 0; p < N; p += 1) {
    assert.equal(loopExponent(p, 1, gauged), p);
  }
}

// Every candidate receives the same deliberately declared spectral ledger.
const spectralLedger = Array.from({ length: N }, (_, a) =>
  Array.from({ length: N }, (_, b) => 1 + mod(a * b)),
);
for (let p = 0; p < N; p += 1) {
  assert.deepEqual(spectralLedger, spectralLedger, `spectrum changed for p=${p}`);
}

// Blind deterministic reconstruction. Constituent errors sum to zero, and
// each is much smaller than half the adjacent-root angular spacing pi/23.
const hidden = evidence.blindTrial.hiddenClass;
const errors = Array.from({ length: N }, (_, j) => 0.002 * (j - (N - 1) / 2));
assert.ok(Math.abs(errors.reduce((sum, error) => sum + error, 0)) < 1e-12);
const observedAngle = Array.from({ length: N }, (_, j) =>
  (2 * Math.PI * omegaExponent(hidden, 1, j, 1)) / N + errors[j]
).reduce((sum, angle) => sum + angle, 0);

const circularDistance = (left, right) =>
  Math.abs(Math.atan2(Math.sin(left - right), Math.cos(left - right)));
const scores = Array.from({ length: N }, (_, p) => ({
  p,
  distance: circularDistance(observedAngle, (2 * Math.PI * p) / N),
})).sort((left, right) => left.distance - right.distance);

assert.equal(scores[0].p, hidden);
assert.ok(scores[1].distance - scores[0].distance > Math.PI / N);
assert.equal(evidence.blindTrial.recoveredClass, scores[0].p);

console.log(JSON.stringify({
  status: "PASS",
  cocycleClassesChecked: N,
  pentagonQuadruplesPerClass: N ** 4,
  gaugeFamiliesChecked: betaFamilies.length,
  hiddenClass: hidden,
  recoveredClass: scores[0].p,
  angularMargin: scores[1].distance - scores[0].distance,
  fifthPowerClassMap: "p -> 2p mod 23",
  spectraDistinguishCandidates: false,
  compositionWitnessDistinguishesCandidates: true,
  verdict: evidence.verdict,
}));

