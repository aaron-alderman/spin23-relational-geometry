import assert from "node:assert/strict";

const pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const zeroMatrix = (r, c) => Array.from({ length: r }, () => Array(c).fill(0));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((v, j) => v + B[i][j]));
const scale = (a, A) => A.map(row => row.map(v => a * v));
const comm = (A, B) => add(multiply(A, B), scale(-1, multiply(B, A)));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));

function rank(rows, tolerance = 1e-10) {
  if (rows.length === 0) return 0;
  const A = rows.map(row => [...row]); let r = 0;
  for (let col = 0; col < A[0].length && r < A.length; col += 1) {
    let pivot = r;
    for (let i = r + 1; i < A.length; i += 1) if (Math.abs(A[i][col]) > Math.abs(A[pivot][col])) pivot = i;
    if (Math.abs(A[pivot][col]) < tolerance) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const d = A[r][col]; for (let j = col; j < A[0].length; j += 1) A[r][j] /= d;
    for (let i = 0; i < A.length; i += 1) if (i !== r) {
      const f = A[i][col]; for (let j = col; j < A[0].length; j += 1) A[i][j] -= f * A[r][j];
    }
    r += 1;
  }
  return r;
}

function independentSpan(matrices) {
  const out = [];
  for (const X of matrices) if (rank([...out, X].map(Y => Y.flat())) > out.length) out.push(X);
  return out;
}

function derivedDimensions(basis) {
  const dims = [rank(basis.map(X => X.flat()))];
  let current = independentSpan(basis);
  while (current.length > 0) {
    const next = independentSpan(current.flatMap(X => current.map(Y => comm(X, Y))));
    dims.push(next.length);
    if (next.length === 0) break;
    current = next;
  }
  return dims;
}

function nullspace(A, tolerance = 1e-10) {
  const M = A.map(row => [...row]); let r = 0; const pivots = [];
  for (let col = 0; col < M[0].length && r < M.length; col += 1) {
    let pivot = r;
    for (let i = r + 1; i < M.length; i += 1) if (Math.abs(M[i][col]) > Math.abs(M[pivot][col])) pivot = i;
    if (Math.abs(M[pivot][col]) < tolerance) continue;
    [M[r], M[pivot]] = [M[pivot], M[r]];
    const d = M[r][col]; for (let j = col; j < M[0].length; j += 1) M[r][j] /= d;
    for (let i = 0; i < M.length; i += 1) if (i !== r) {
      const f = M[i][col]; for (let j = col; j < M[0].length; j += 1) M[i][j] -= f * M[r][j];
    }
    pivots.push(col); r += 1;
  }
  const free = Array.from({ length: M[0].length }, (_, i) => i).filter(i => !pivots.includes(i));
  return free.map(f => {
    const v = Array(M[0].length).fill(0); v[f] = 1;
    pivots.forEach((p, row) => { v[p] = -M[row][f]; }); return v;
  });
}

const J = [[0, 1, 0, 0], [-1, 0, 0, 0], [0, 0, 0, 1], [0, 0, -1, 0]];
const permutation = [0, 2, 1, 3];
const Q = zeroMatrix(4, 4); permutation.forEach((oldIndex, newIndex) => { Q[oldIndex][newIndex] = 1; });
const z2 = zeroMatrix(2, 2);
const block = (A, B) => [
  [A[0][0], A[0][1], B[0][0], B[0][1]], [A[1][0], A[1][1], B[1][0], B[1][1]],
  [0, 0, -A[0][0], -A[1][0]], [0, 0, -A[0][1], -A[1][1]]
];
const toJConvention = X => multiply(multiply(transpose(Q), X), Q);
const primitiveBasis = [
  [0, 1, 0, 0, -1, 0], [0, 0, 1, 1, 0, 0], [1, 0, 0, 0, 0, -1],
  [0, 1, 0, 0, 1, 0], [0, 0, 1, -1, 0, 0]
];
function wedgePair(a, b) {
  return a[0] * b[5] + a[5] * b[0] - a[1] * b[4] - a[4] * b[1] + a[2] * b[3] + a[3] * b[2];
}
const gram = primitiveBasis.map(a => primitiveBasis.map(b => wedgePair(a, b)));
function formMatrix(v) {
  const A = zeroMatrix(4, 4); pairs.forEach(([i, j], k) => { A[i][j] = v[k]; A[j][i] = -v[k]; }); return A;
}
const formVector = A => pairs.map(([i, j]) => A[i][j]);
const act = (X, v) => formVector(add(multiply(transpose(X), formMatrix(v)), multiply(formMatrix(v), X)));
const coordinates = v => primitiveBasis.map((p, i) => wedgePair(p, v) / gram[i][i]);
function induce(oldGenerators) {
  return oldGenerators.map(oldX => {
    const X = toJConvention(oldX);
    assert.ok(maxAbs(add(multiply(transpose(X), J), multiply(J, X))) < 1e-12);
    const R = zeroMatrix(5, 5);
    primitiveBasis.forEach((p, col) => coordinates(act(X, p)).forEach((v, row) => { R[row][col] = v; }));
    assert.ok(maxAbs(add(multiply(transpose(R), gram), multiply(gram, R))) < 1e-12);
    return R;
  });
}

const B11 = [[1, 0], [0, 0]];
const B12 = [[0, 1], [1, 0]];
const T0 = [[1, 0], [0, 1]];
const T1 = [[1, 0], [0, -1]];
const Arot = [[0, -1], [1, 0]];
const wardUvOld = [block(z2, B11), block(z2, B12)];
const majoranaOld = [block(Arot, z2), block(z2, T0), block(z2, T1), block(z2, B12)];
const wardUv = induce(wardUvOld);
const majorana = induce(majoranaOld);

function nullGeometry(translationGenerators, fullGenerators) {
  const kernel = nullspace(translationGenerators.flatMap(R => R));
  const restrictedGram = kernel.map(v => kernel.map(w => v.reduce((s, x, i) => s + x * gram[i][i] * w[i], 0)));
  for (const R of fullGenerators) for (const v of kernel) {
    const image = R.map(row => row.reduce((s, x, j) => s + x * v[j], 0));
    assert.ok(rank([...kernel, image]) <= kernel.length);
  }
  return { kernel, restrictedGram };
}
const wardGeometry = nullGeometry(wardUv, wardUv);
const majoranaGeometry = nullGeometry(majorana.slice(1), majorana);

assert.equal(rank(wardUv.map(R => R.flat())), 2);
assert.equal(rank(majorana.map(R => R.flat())), 4);
assert.equal(wardGeometry.kernel.length, 2);
assert.ok(maxAbs(wardGeometry.restrictedGram) < 1e-12);
assert.equal(majoranaGeometry.kernel.length, 1);
assert.ok(maxAbs(majoranaGeometry.restrictedGram) < 1e-12);
assert.deepEqual(derivedDimensions(wardUv), [2, 0]);
assert.deepEqual(derivedDimensions(majorana), [4, 2, 0]);

console.log(JSON.stringify({
  protocol: "ward-uv-versus-majorana-fixed-uv-in-spin23/1",
  primitiveMetric: gram,
  wardPlusUv: {
    tkkGrades: { upperTranslation: 2, middleStructure: 0, lowerSpecialConformal: 0 },
    inducedRank: 2,
    derivedSeriesDimensions: derivedDimensions(wardUv),
    invariantNullGeometry: wardGeometry,
    classification: "Two-dimensional abelian contact-translation algebra preserving a maximal null two-plane; fixed contacts reduce it to zero."
  },
  majoranaBrokenFixedUv: {
    tkkGrades: { upperTranslation: 3, middleStructure: 1, lowerSpecialConformal: 0 },
    inducedRank: 4,
    derivedSeriesDimensions: derivedDimensions(majorana),
    invariantNullGeometry: majoranaGeometry,
    classification: "One compact spatial rotation semidirect three translations, isomorphic to R(time translation) plus e(2); it preserves one projective null point at infinity."
  },
  comparison: "Removing continuous B-L protection enlarges the null-plane contact algebra to a null-line affine Euclidean subgroup, but does not restore dilation, Lorentz boosts or the lower special-conformal wing.",
  fixedContactBoundary: "With contacts fixed, the Ward+UV algebra vanishes, while the Majorana-broken one-UV algebra retains only the compact rotation; two generic UV slopes remove that as well.",
  physicalBoundary: "The Majorana order-parameter and broken-current operators may enlarge the response carrier, so the two-source classification remains conditional on closed projection.",
  passed: true
}, null, 2));
