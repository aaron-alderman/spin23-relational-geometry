import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/monster-z23-ty-recoupling-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "monster-z23-ty-recoupling-v1");

const N = evidence.groupOrder;
const mod = (x) => ((x % N) + N) % N;
const add = (x, y) => ({ re: x.re + y.re, im: x.im + y.im });
const mul = (x, y) => ({ re: x.re * y.re - x.im * y.im, im: x.re * y.im + x.im * y.re });
const conj = (x) => ({ re: x.re, im: -x.im });
const scale = (s, x) => ({ re: s * x.re, im: s * x.im });
const abs = (x) => Math.hypot(x.re, x.im);
const phase = (turns) => ({ re: Math.cos(2 * Math.PI * turns), im: Math.sin(2 * Math.PI * turns) });
const near = (x, y, tolerance = 2e-12) => abs(add(x, scale(-1, y))) < tolerance;
const zero = { re: 0, im: 0 };
const one = { re: 1, im: 0 };

const matrix = (epsilon, s = 1) => Array.from({ length: N }, (_, a) =>
  Array.from({ length: N }, (_, b) => scale(epsilon / Math.sqrt(N), phase((-s * a * b) / N))),
);
const multiplyMatrices = (left, right) => Array.from({ length: N }, (_, a) =>
  Array.from({ length: N }, (_, b) => {
    let total = zero;
    for (let k = 0; k < N; k += 1) total = add(total, mul(left[a][k], right[k][b]));
    return total;
  }),
);
const adjoint = (input) => Array.from({ length: N }, (_, a) =>
  Array.from({ length: N }, (_, b) => conj(input[b][a])),
);
const assertMatrix = (actual, expected, label) => {
  for (let a = 0; a < N; a += 1) for (let b = 0; b < N; b += 1) {
    assert.ok(near(actual[a][b], expected[a][b]), `${label} failed at ${a},${b}`);
  }
};

const identity = Array.from({ length: N }, (_, a) =>
  Array.from({ length: N }, (_, b) => (a === b ? one : zero)),
);
const chargeConjugation = Array.from({ length: N }, (_, a) =>
  Array.from({ length: N }, (_, b) => (b === mod(-a) ? one : zero)),
);

for (const epsilon of [-1, 1]) {
  const fCandidate = matrix(epsilon);
  for (const row of fCandidate) for (const entry of row) {
    assert.ok(Math.abs(abs(entry) - 1 / Math.sqrt(N)) < 1e-14);
  }
  assertMatrix(multiplyMatrices(fCandidate, adjoint(fCandidate)), identity, `unitarity epsilon=${epsilon}`);
  const f2 = multiplyMatrices(fCandidate, fCandidate);
  assertMatrix(f2, chargeConjugation, `F^2=C epsilon=${epsilon}`);
  assertMatrix(multiplyMatrices(f2, f2), identity, `F^4=1 epsilon=${epsilon}`);
}

const f = matrix(1);
for (let a = 0; a < N - 1; a += 1) for (let b = 0; b < N - 1; b += 1) {
  const numerator = mul(f[a][b], f[a + 1][b + 1]);
  const denominator = mul(f[a][b + 1], f[a + 1][b]);
  const ratioTimesDenominatorNormInverse = scale(N ** 2, mul(numerator, conj(denominator)));
  assert.ok(near(ratioTimesDenominatorNormInverse, phase(-1 / N)), `plaquette failed at ${a},${b}`);
}

assert.equal(mod(5 * 5), 2);
const fMarked = matrix(1, 2);
for (let a = 0; a < N; a += 1) for (let b = 0; b < N; b += 1) {
  assert.ok(near(fMarked[a][b], f[mod(5 * a)][mod(5 * b)]));
}

const legendre = (s) => {
  if (mod(s) === 0) return 0;
  const residues = new Set(Array.from({ length: (N - 1) / 2 }, (_, j) => mod((j + 1) ** 2)));
  return residues.has(mod(s)) ? 1 : -1;
};
assert.equal(legendre(1), 1);
assert.equal(legendre(2), 1);

const normalizedGaussSum = (s) => {
  let total = zero;
  for (let a = 0; a < N; a += 1) total = add(total, phase((s * a * a) / N));
  return scale(1 / Math.sqrt(N), total);
};
assert.ok(near(normalizedGaussSum(1), { re: 0, im: 1 }));
assert.ok(near(normalizedGaussSum(2), { re: 0, im: 1 }));
assert.ok(near(normalizedGaussSum(5), { re: 0, im: -1 }));

const candidates = [-1, 1].map((epsilon) => ({ epsilon, nu2: epsilon }));
assert.notEqual(candidates[0].nu2, candidates[1].nu2);

console.log(JSON.stringify({
  status: "PASS",
  groupOrder: N,
  matricesChecked: 2,
  entriesPerMatrix: N ** 2,
  adjacentPlaquettesChecked: (N - 1) ** 2,
  entryMagnitude: 1 / Math.sqrt(N),
  matrixSquare: "charge conjugation",
  matrixFourthPower: "identity",
  fifthPowerKernelMap: "s -> 2s",
  fifthPowerAbstractCategoryChange: false,
  normalizedGaussSums: { s1: "+i", s2: "+i", nonresidueS5: "-i" },
  fsIndicatorCandidates: candidates,
  verdict: evidence.verdict
}));
