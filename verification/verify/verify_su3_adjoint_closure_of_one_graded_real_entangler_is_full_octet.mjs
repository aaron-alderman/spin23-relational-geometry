import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (s, a) => C(s * a.re, s * a.im);
const conj = (a) => C(a.re, -a.im);
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => add(sum, mul(value, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((value, j) => add(value, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((value) => scale(s, value)));
const comm = (a, b) => madd(mmul(a, b), mscale(-1, mmul(b, a)));
const trace = (a) => a.reduce((sum, row, i) => add(sum, row[i]), C(0));
const iTimes = (a) => a.map((row) => row.map((z) => C(-z.im, z.re)));

const z = C(0), o = C(1), mi = C(0, -1), pi = C(0, 1);
const r3 = Math.sqrt(3);
const g = [
  [[z,o,z],[o,z,z],[z,z,z]],
  [[z,mi,z],[pi,z,z],[z,z,z]],
  [[o,z,z],[z,C(-1),z],[z,z,z]],
  [[z,z,o],[z,z,z],[o,z,z]],
  [[z,z,mi],[z,z,z],[pi,z,z]],
  [[z,z,z],[z,z,o],[z,o,z]],
  [[z,z,z],[z,z,mi],[z,pi,z]],
  [[C(1/r3),z,z],[z,C(1/r3),z],[z,z,C(-2/r3)]],
];

const coordinates = (x) => g.map((basis) => trace(mmul(basis, x)).re / 2);
const rank = (rows, tolerance = 1e-9) => {
  const a = rows.map((row) => [...row]);
  let r = 0;
  for (let column = 0; column < (a[0]?.length ?? 0) && r < a.length; column += 1) {
    let pivot = r;
    for (let i = r + 1; i < a.length; i += 1) if (Math.abs(a[i][column]) > Math.abs(a[pivot][column])) pivot = i;
    if (Math.abs(a[pivot][column]) < tolerance) continue;
    [a[r], a[pivot]] = [a[pivot], a[r]];
    const p = a[r][column];
    for (let j = column; j < a[r].length; j += 1) a[r][j] /= p;
    for (let i = 0; i < a.length; i += 1) if (i !== r) {
      const factor = a[i][column];
      for (let j = column; j < a[i].length; j += 1) a[i][j] -= factor * a[r][j];
    }
    r += 1;
  }
  return r;
};

const vectors = [g[1]]; // lambda_2: one imaginary-antisymmetric, graded-real direction.
let currentRank = 1;
for (let round = 0; round < 8 && currentRank < 8; round += 1) {
  const candidates = [];
  for (const generator of g) for (const vector of vectors) candidates.push(iTimes(comm(generator, vector)));
  for (const candidate of candidates) {
    const trial = [...vectors, candidate];
    const trialRank = rank(trial.map(coordinates));
    if (trialRank > currentRank) {
      vectors.push(candidate);
      currentRank = trialRank;
      if (currentRank === 8) break;
    }
  }
}

assert.equal(currentRank, 8);

// The odd three-plane closes under its own so(3), but a symmetric generator leaks immediately.
const oddIndices = [1, 4, 6]; // lambda_2, lambda_5, lambda_7.
for (const a of oddIndices) for (const b of oddIndices) {
  const coeff = coordinates(iTimes(comm(g[a], g[b])));
  assert(coeff.every((value, index) => oddIndices.includes(index) || Math.abs(value) < 1e-9));
}
const leaked = coordinates(iTimes(comm(g[0], g[1]))); // i[lambda_1,lambda_2] proportional lambda_3.
assert(Math.abs(leaked[2]) > 1e-9);
assert(leaked.every((value, index) => index === 2 || Math.abs(value) < 1e-9));

console.log("SU(3) adjoint closure of a graded-real entangler: PASS");
console.log("seed=lambda_2_imaginary_antisymmetric");
console.log("full_SU3_orbit_linear_span_dimension=8");
console.log("odd_three_plane_closes_only_under_its_SO3_subalgebra");
console.log("lambda_1_action_leaks_lambda_2_into_lambda_3_symmetric_sector");
console.log("consequence=full_flavor_covariance_forces_complete_octet_or_symmetry_reduction");
