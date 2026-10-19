import assert from "node:assert/strict";

const triples = [
  [1, 2, 3], [1, 4, 5], [1, 7, 6], [2, 4, 6],
  [2, 5, 7], [3, 4, 7], [3, 6, 5]
];
const basisProduct = (i, j) => {
  if (i === 0) return { sign: 1, k: j };
  if (j === 0) return { sign: 1, k: i };
  if (i === j) return { sign: -1, k: 0 };
  for (const [a, b, c] of triples) {
    for (const [x, y, z] of [[a, b, c], [b, c, a], [c, a, b]]) {
      if (i === x && j === y) return { sign: 1, k: z };
      if (i === y && j === x) return { sign: -1, k: z };
    }
  }
  throw new Error("missing product");
};
const zero = (r, c = r) => Array.from({ length: r }, () => Array(c).fill(0));
const identity = (n) => Array.from({ length: n }, (_, i) =>
  Array.from({ length: n }, (_, j) => Number(i === j)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (s, A) => A.map((row) => row.map((x) => s * x));
const multiply = (A, B) => A.map((row) => B[0].map((_, j) =>
  row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const commutator = (A, B) => add(multiply(A, B), scale(-1, multiply(B, A)));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const maxDiff = (A, B) => maxAbs(add(A, scale(-1, B)));
const flatten = (A) => A.flat();
const unflatten = (v, rows, cols) =>
  Array.from({ length: rows }, (_, i) => v.slice(i * cols, (i + 1) * cols));
const apply = (A, x) => A.map((row) => row.reduce((sum, v, j) => sum + v * x[j], 0));

const left = (i) => {
  const L = zero(8);
  for (let j = 0; j < 8; j += 1) {
    const p = basisProduct(i, j); L[p.k][j] = p.sign;
  }
  return L;
};
const right = (i) => {
  const R = zero(8);
  for (let j = 0; j < 8; j += 1) {
    const p = basisProduct(j, i); R[p.k][j] = p.sign;
  }
  return R;
};
const L = Array.from({ length: 8 }, (_, i) => left(i));
const R = Array.from({ length: 8 }, (_, i) => right(i));

// Standard octonion derivations D_ab=[L_a,L_b]+[L_a,R_b]+[R_a,R_b].
const derivations = [];
for (let a = 1; a < 8; a += 1) for (let b = a + 1; b < 8; b += 1) {
  derivations.push(add(add(commutator(L[a], L[b]), commutator(L[a], R[b])), commutator(R[a], R[b])));
}

const rref = (input, eps = 1e-10) => {
  const A = input.map((row) => [...row]);
  const pivots = [];
  let row = 0;
  for (let col = 0; col < A[0].length && row < A.length; col += 1) {
    let pivot = row;
    for (let r = row + 1; r < A.length; r += 1) if (Math.abs(A[r][col]) > Math.abs(A[pivot][col])) pivot = r;
    if (Math.abs(A[pivot][col]) < eps) continue;
    [A[row], A[pivot]] = [A[pivot], A[row]];
    const d = A[row][col];
    A[row] = A[row].map((x) => x / d);
    for (let r = 0; r < A.length; r += 1) if (r !== row) {
      const f = A[r][col];
      A[r] = A[r].map((x, c) => x - f * A[row][c]);
    }
    pivots.push(col); row += 1;
  }
  return { matrix: A, pivots };
};
const rank = (vectors) => vectors.length === 0 ? 0 : rref(vectors).pivots.length;
const independentBasis = (matrices) => {
  const basis = [];
  let oldRank = 0;
  for (const M of matrices) {
    const nextRank = rank([...basis, flatten(M)]);
    if (nextRank > oldRank) {
      basis.push(flatten(M)); oldRank = nextRank;
    }
  }
  return basis.map((v) => unflatten(v, 8, 8));
};
const nullspace = (A) => {
  const { matrix: Rm, pivots } = rref(A);
  const n = A[0].length;
  const free = Array.from({ length: n }, (_, i) => i).filter((i) => !pivots.includes(i));
  return free.map((f) => {
    const x = Array(n).fill(0); x[f] = 1;
    for (let r = pivots.length - 1; r >= 0; r -= 1) {
      const p = pivots[r];
      x[p] = -Rm[r].reduce((sum, v, c) => sum + (c === p ? 0 : v * x[c]), 0);
    }
    return x;
  });
};

const g2 = independentBasis(derivations);
assert.equal(g2.length, 14);
for (const D of g2) {
  assert(maxDiff(D, scale(-1, transpose(D))) < 1e-10);
  assert(maxAbs(apply(D, [1, 0, 0, 0, 0, 0, 0, 0]).map((x) => [x])) < 1e-10);
}

// Stabilizer of the chosen imaginary complex unit u=e1.
const u = [0, 1, 0, 0, 0, 0, 0, 0];
const constraint = Array.from({ length: 8 }, (_, component) =>
  g2.map((D) => apply(D, u)[component]));
const stabilizerCoefficients = nullspace(constraint);
assert.equal(stabilizerCoefficients.length, 8); // su(3)
const su3 = stabilizerCoefficients.map((coeffs) => {
  let H = zero(8);
  for (let k = 0; k < coeffs.length; k += 1) H = add(H, scale(coeffs[k], g2[k]));
  return H;
});

// Common fixed space of the stabilizer on O.
const stacked = su3.flatMap((H) => H);
const fixed = nullspace(stacked);
assert.equal(fixed.length, 2);
const one = [1, 0, 0, 0, 0, 0, 0, 0];
for (const H of su3) {
  assert(maxAbs(apply(H, one).map((x) => [x])) < 1e-10);
  assert(maxAbs(apply(H, u).map((x) => [x])) < 1e-10);
}
assert.equal(rank([one, u, ...fixed]), 2);

// Any unit q(theta)=cos(theta)1+sin(theta)u is SU(3)-fixed and gives a
// valid link Clifford generator.  Complex conjugation relative to u
// preserves its real line only on the even and odd axes.
const theta = 0.37;
const q = one.map((x, i) => Math.cos(theta) * x + Math.sin(theta) * u[i]);
for (const H of su3) assert(maxAbs(apply(H, q).map((x) => [x])) < 1e-10);
const conjugateQ = q.map((x, i) => i === 1 ? -x : x);
const lineInvariantGeneric = rank([q, conjugateQ]) === 1;
assert.equal(lineInvariantGeneric, false);
assert.equal(rank([one, one]), 1);
assert.equal(rank([u, u.map((x) => -x)]), 1); // odd axis is invariant as a line

// Normalizer dimensions in Spin(9)/SO(9).
const dimSO9 = 9 * 8 / 2;
const dimPointwiseTwoFrame = 7 * 6 / 2; // so(7)
const dimOrientedPlaneStabilizer = 1 + dimPointwiseTwoFrame; // so(2)+so(7)
assert.equal(dimSO9, 36);
assert.equal(dimPointwiseTwoFrame, 21);
assert.equal(dimOrientedPlaneStabilizer, 22);
assert.equal(dimSO9 - dimOrientedPlaneStabilizer, 14);

console.log(JSON.stringify({
  protocol: "furey-su3-clifford-link-line-degeneracy/1",
  g2Dimension: g2.length,
  chosenComplexUnit: "u=e1",
  stabilizerDimension: su3.length,
  stabilizerIdentification: "su(3)",
  commonFixedSpaceOnOctonions: "span_R{1,u}",
  commonFixedSpaceDimension: fixed.length,
  invariantUnitLinkFamily: "q(theta)=cos(theta)1+sin(theta)u, a circle before quotienting q~-q",
  conjugationSelection: "u-conjugation-invariant link lines are the even axis R1 and odd axis Ru",
  spin9PointwiseTwoFrameStabilizer: "Spin(7), Lie dimension 21",
  spin9OrientedPlaneNormalizerIdentityComponent: "(Spin(2) x Spin(7))/Z2, Lie dimension 22",
  orientedTwoPlaneOrbitDimension: dimSO9 - dimOrientedPlaneStabilizer,
  consequence: "Furey's SU(3) stabilizer is compatible with but does not uniquely select the Clifford response line",
  passed: true
}, null, 2));
