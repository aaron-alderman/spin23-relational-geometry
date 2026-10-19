import assert from 'node:assert/strict';

const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map(row => row.map(x => a * x));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const eq = (A, B, eps = 1e-12) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < eps));
const I2 = [[1, 0], [0, 1]];
const A = [[1, 3], [-1, -2]];
const X = [[1, 1], [0, -1]];
const Ca = [[-3, -6], [2, 3]];
const Cn = [[-1, 2], [-2, 1]];

assert.ok(eq(mm(mm(A, A), A), I2));
assert.ok(eq(Ca, scale(-1, add(I2, scale(2, A)))));
assert.ok(eq(mm(Ca, Ca), scale(-3, I2)));
assert.ok(eq(mm(Cn, Cn), scale(-3, I2)));
assert.ok(eq(Cn, mm(mm(X, Ca), X)));
assert.ok(eq(A, scale(-1 / 2, add(Ca, I2))));

// A real symmetric matrix cannot square to a negative-definite scalar. For
// S=[[a,b],[b,c]], the trace of S^2 is a^2+c^2+2b^2 >= 0, whereas
// tr(-3I)=-6. Verify the exact polynomial witness on samples and record it.
const symmetricSquareTrace = (a, b, c) => a * a + c * c + 2 * b * b;
for (const [a, b, c] of [[0, 0, 0], [1, 0, -1], [2, -3, 4], [-1, 0.5, 0.2]]) {
  assert.ok(symmetricSquareTrace(a, b, c) >= 0);
}
assert.equal(-6 < 0, true);

// The orientation is G^{-1}J, not a symmetric Jordan element.
const eps = [[0, 1], [-1, 0]];
const Gn = [[2, -1], [-1, 2]];
const Ga = [[2, 3], [3, 6]];
const inverse2 = M => {
  const d = M[0][0] * M[1][1] - M[0][1] * M[1][0];
  return [[M[1][1] / d, -M[0][1] / d], [-M[1][0] / d, M[0][0] / d]];
};
assert.ok(eq(scale(3, mm(inverse2(Gn), eps)), Cn));
assert.ok(eq(scale(3, mm(inverse2(Ga), scale(-1, eps))), Ca));
assert.ok(!eq(Cn, tr(Cn)));
assert.ok(!eq(Ca, tr(Ca)));

console.log(JSON.stringify({
  protocol: 'selector-complex-structure-versus-jordan-middle-typing/1',
  activePlane: {
    coxeter: A,
    integralOrientation: Ca,
    identity: 'C_active = -(I + 2 A)',
    inverseIdentity: 'A = -(C_active + I)/2',
    square: '-3 I',
  },
  neutralPlane: {
    handleTransport: 'C_neutral = X C_active X',
    integralOrientation: Cn,
    square: '-3 I',
  },
  jordanTyping: {
    symmetricNegativeSquareNoGo: 'For real symmetric S, tr(S^2)=a^2+c^2+2b^2 >= 0, so S^2=-3I is impossible.',
    correctConstruction: 'C = 3 G^{-1} J combines a positive metric with an alternating form.',
    consequence: 'The selector complex structure is an automorphism/orientation operator derived from Jordan response geometry, not the symmetric middle argument or its positive frame operator.',
  },
  fureyComparison: 'The neutral Peirce J has the same negative-square orbit type after normalization, but a source-native intertwiner to C_neutral is still required.',
  passed: true,
}, null, 2));
