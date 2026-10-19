import assert from "node:assert/strict";

const pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const zeroMatrix = (r, c) => Array.from({ length: r }, () => Array(c).fill(0));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((v, j) => v + B[i][j]));
const scale = (a, A) => A.map(row => row.map(v => a * v));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));

const J = [
  [0, 1, 0, 0],
  [-1, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 0, -1, 0]
];
const omega = [1, 0, 0, 0, 0, 1];

function wedgePair(a, b) {
  return a[0] * b[5] + a[5] * b[0]
    - a[1] * b[4] - a[4] * b[1]
    + a[2] * b[3] + a[3] * b[2];
}

function formMatrix(v) {
  const A = zeroMatrix(4, 4);
  pairs.forEach(([i, j], k) => {
    A[i][j] = v[k];
    A[j][i] = -v[k];
  });
  return A;
}

function formVector(A) {
  return pairs.map(([i, j]) => A[i][j]);
}

function actOnForm(X, v) {
  const A = formMatrix(v);
  return formVector(add(multiply(transpose(X), A), multiply(A, X)));
}

const primitiveBasis = [
  [0, 1, 0, 0, -1, 0],
  [0, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 0, -1],
  [0, 1, 0, 0, 1, 0],
  [0, 0, 1, -1, 0, 0]
];
const gram = primitiveBasis.map(a => primitiveBasis.map(b => wedgePair(a, b)));
const signature = { positive: 2, negative: 3, zero: 0 };

for (const p of primitiveBasis) assert.ok(Math.abs(wedgePair(p, omega)) < 1e-12);
assert.deepEqual(gram, [
  [2, 0, 0, 0, 0],
  [0, 2, 0, 0, 0],
  [0, 0, -2, 0, 0],
  [0, 0, 0, -2, 0],
  [0, 0, 0, 0, -2]
]);
assert.equal(wedgePair(omega, omega), 2);

const symmetricBasis = [];
for (let i = 0; i < 4; i += 1) {
  for (let j = i; j < 4; j += 1) {
    const S = zeroMatrix(4, 4);
    S[i][j] = 1;
    S[j][i] = 1;
    symmetricBasis.push(S);
  }
}
const sp4Generators = symmetricBasis.map(S => scale(-1, multiply(J, S)));

function coordinatesInPrimitive(v) {
  return primitiveBasis.map((p, i) => wedgePair(p, v) / gram[i][i]);
}

function reconstruct(coeffs) {
  return Array(6).fill(0).map((_, k) => coeffs.reduce((s, c, i) => s + c * primitiveBasis[i][k], 0));
}

const representation = sp4Generators.map(X => {
  assert.ok(maxAbs(add(multiply(transpose(X), J), multiply(J, X))) < 1e-12);
  const R = zeroMatrix(5, 5);
  primitiveBasis.forEach((p, col) => {
    const out = actOnForm(X, p);
    assert.ok(Math.abs(wedgePair(out, omega)) < 1e-12);
    const coeffs = coordinatesInPrimitive(out);
    const rebuilt = reconstruct(coeffs);
    assert.ok(Math.max(...out.map((v, i) => Math.abs(v - rebuilt[i]))) < 1e-12);
    coeffs.forEach((v, row) => { R[row][col] = v; });
  });
  assert.ok(maxAbs(add(multiply(transpose(R), gram), multiply(gram, R))) < 1e-12);
  return R;
});

function rank(rows, tolerance = 1e-10) {
  const A = rows.map(row => [...row]);
  let r = 0;
  for (let col = 0; col < A[0].length && r < A.length; col += 1) {
    let pivot = r;
    for (let i = r + 1; i < A.length; i += 1) if (Math.abs(A[i][col]) > Math.abs(A[pivot][col])) pivot = i;
    if (Math.abs(A[pivot][col]) < tolerance) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const d = A[r][col];
    for (let j = col; j < A[0].length; j += 1) A[r][j] /= d;
    for (let i = 0; i < A.length; i += 1) {
      if (i === r) continue;
      const factor = A[i][col];
      for (let j = col; j < A[0].length; j += 1) A[i][j] -= factor * A[r][j];
    }
    r += 1;
  }
  return r;
}

const representationRank = rank(representation.map(R => R.flat()));
assert.equal(sp4Generators.length, 10);
assert.equal(representationRank, 10);

console.log(JSON.stringify({
  protocol: "primitive-two-forms-sp4-spin23/1",
  symplecticForm: "omega=e1^e2+e3^e4",
  ambientTwoFormSignature: [3, 3],
  omegaNorm: wedgePair(omega, omega),
  primitiveBasis,
  primitiveGram: gram,
  primitiveSignature: signature,
  sp4GeneratorCount: sp4Generators.length,
  inducedRepresentationRank: representationRank,
  invarianceChecks: "All ten induced generators satisfy R^T G+G R=0 and preserve the primitive subspace.",
  kernelStatement: "At group level, -I in Sp(4,R) acts trivially on two-forms, yielding the double cover Sp(4,R)=Spin_0(2,3) -> SO_0(2,3).",
  programmeBoundary: "This constructs the correct five-dimensional module; it does not yet identify any Jordan-triple recursion variables with its five primitive-form coordinates.",
  passed: true
}, null, 2));
