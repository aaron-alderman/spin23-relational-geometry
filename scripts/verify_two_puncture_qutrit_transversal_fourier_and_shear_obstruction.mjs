import assert from "node:assert/strict";

const p = 3;
const mod = (x) => ((x % p) + p) % p;
const dot = (a, b) => mod(a.reduce((sum, x, i) => sum + x * b[i], 0));
const add = (a, b) => a.map((x, i) => mod(x + b[i]));
const scale = (c, a) => a.map((x) => mod(c * x));
const combine = (coefficients, vectors) => vectors[0].map((_, i) => mod(coefficients.reduce((sum, c, j) => sum + c * vectors[j][i], 0)));
const rrefData = (matrix) => {
  const a = matrix.map((row) => row.map(mod));
  const pivots = [];
  let r = 0;
  for (let c = 0; c < (a[0]?.length ?? 0) && r < a.length; c += 1) {
    let pivot = r;
    while (pivot < a.length && a[pivot][c] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[r], a[pivot]] = [a[pivot], a[r]];
    const inverse = a[r][c] === 1 ? 1 : 2;
    a[r] = a[r].map((x) => mod(inverse * x));
    for (let i = 0; i < a.length; i += 1) if (i !== r && a[i][c] !== 0) {
      const factor = a[i][c];
      a[i] = a[i].map((x, j) => mod(x - factor * a[r][j]));
    }
    pivots.push(c);
    r += 1;
  }
  return { a, pivots, rank: r };
};
const rank = (matrix) => rrefData(matrix).rank;
const nullspace = (matrix) => {
  const { a, pivots } = rrefData(matrix);
  const free = Array.from({ length: a[0].length }, (_, i) => i).filter((i) => !pivots.includes(i));
  return free.map((f) => {
    const v = Array(a[0].length).fill(0);
    v[f] = 1;
    pivots.forEach((column, i) => { v[column] = mod(-a[i][f]); });
    return v;
  });
};
const solve = (matrix, rhs) => {
  const augmented = matrix.map((row, i) => [...row, rhs[i]]);
  const { a, pivots, rank: r } = rrefData(augmented);
  const x = Array(matrix[0].length).fill(0);
  for (let i = 0; i < r; i += 1) if (pivots[i] < matrix[0].length) x[pivots[i]] = a[i].at(-1);
  return x;
};
const span = (basis, length) => {
  let result = [Array(length).fill(0)];
  for (const vector of basis) result = result.flatMap((current) => [0,1,2].map((c) => add(current, scale(c, vector))));
  return result;
};

const weights = [];
for (let mask = 0; mask < 32; mask += 1) {
  const q = Array.from({ length: 5 }, (_, i) => (mask >> i) & 1 ? -1 : 1);
  if (q.filter((x) => x < 0).length % 2 === 0) weights.push(q);
}
const qN = [1,1,1,1,1], qE = [1,1,1,-1,-1];
const kept = weights.filter((q) => ![qN,qE].some((r) => q.every((x, i) => x === r[i])));
const n = kept.length;
const G = Array.from({ length: 5 }, (_, i) => kept.map((q) => mod(q[i])));
const E = [qN.map(mod), qE.map(mod)];
const aParams = nullspace(E);
const logicalParams = [solve(E, [1,0]), solve(E, [0,1])];
const A = aParams.map((t) => combine(t, G));
const LX = logicalParams.map((t) => combine(t, G));
const B = nullspace(G);
assert.deepEqual([n, rank(A), rank(B)], [14,3,9]);

const zero = Array(n).fill(0);
const S = [...A.map((x) => [...x, ...zero]), ...B.map((z) => [...zero, ...z])];
assert.equal(rank(S), 12);

const fourierMasks = [];
for (let mask = 0; mask < 2 ** n; mask += 1) {
  const transformed = S.map((v) => {
    const x = v.slice(0, n), z = v.slice(n);
    const xp = [...x], zp = [...z];
    for (let i = 0; i < n; i += 1) if ((mask >> i) & 1) {
      xp[i] = mod(-z[i]);
      zp[i] = x[i];
    }
    return [...xp, ...zp];
  });
  if (rank([...S, ...transformed]) === 12) fourierMasks.push(mask);
}

const phaseConstraints = [];
for (const h of G) for (const a of A) phaseConstraints.push(h.map((x, i) => mod(x * a[i])));
const phaseBasis = nullspace(phaseConstraints);
const phaseProfiles = span(phaseBasis, n);
assert.equal(rank([...phaseBasis, ...G]), 5);
const shearKeys = new Set();
for (const c of phaseProfiles) {
  const K = LX.map((x) => LX.map((y) => dot(x, y.map((value, i) => mod(c[i] * value)))));
  assert.equal(K[0][1], K[1][0]);
  shearKeys.add(K.flat().join(""));
}
const uniform = Array(n).fill(1);
const uniformAllowed = phaseConstraints.every((row) => dot(row, uniform) === 0);

assert.deepEqual(fourierMasks, [0]);
assert.equal(phaseBasis.length, 5);
assert.equal(phaseProfiles.length, 243);
assert.deepEqual([...shearKeys].sort(), ["0000","0001","0002","1000","1001","1002","2000","2001","2002"]);
assert.equal(uniformAllowed, false);

console.log("Two-puncture qutrit transversal Fourier/shear audit: PASS");
console.log("code_preserving_partial_Fourier_masks=identity_only");
console.log("allowed_diagonal_Clifford_profiles=punctured_charge_word_space_dimension_5");
console.log("logical_shear_image=all_9_diagonal_2_by_2_matrices_no_off_diagonal_mixing");
console.log("kernel_dimension=3_equals_X_stabilizer_parameter_space");
console.log("uniform_Clifford_phase_profile=not_allowed");
