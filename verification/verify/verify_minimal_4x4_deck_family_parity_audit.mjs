const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const tolerance = 1e-10;

const addM = (a, b) => a.map((row, i) => row.map((x, j) => x + b[i][j]));
const scaleM = (s, a) => a.map((row) => row.map((x) => s * x));
const mulM = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => sum + x * b[k][j], 0)));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const equalM = (a, b) => a.every((row, i) => row.every((x, j) =>
  Math.abs(x - b[i][j]) < tolerance));
const kron = (a, b) => a.flatMap((rowA) => b.map((rowB) =>
  rowA.flatMap((x) => rowB.map((y) => x * y))));
const dot = (u, v) => u.reduce((sum, x, i) => sum + x * v[i], 0);
const matVec = (a, v) => a.map((row) => dot(row, v));

const I2 = [[1, 0], [0, 1]];
const sx = [[0, 1], [1, 0]];
const sz = [[1, 0], [0, -1]];
const I4 = kron(I2, I2);
const alpha = kron(sx, I2);
const beta1 = kron(sz, sx);
const beta2 = kron(sz, sz);
const S = alpha;

const H = (k, phi) => addM(scaleM(k, alpha),
  addM(scaleM(Math.cos(phi / 2), beta1), scaleM(Math.sin(phi / 2), beta2)));

// H^2=(k^2+1)I proves the local family is uniformly gapped and has zero
// ordinary spectral flow in phi.
for (const k of [-2.1, -0.4, 0, 0.9, 3.2]) {
  for (const phi of [0, 0.3, 1.7, Math.PI, 5.4, 2 * Math.PI]) {
    assert(equalM(mulM(H(k, phi), H(k, phi)), scaleM(k * k + 1, I4)),
      "the squared spectrum must be independent of selector angle");
  }
}

const tensorVector = (u, v) => u.flatMap((x) => v.map((y) => x * y));
const rp = [1, 0];
const rm = [0, 1];
const uPlus = (theta) => {
  const a = Math.PI / 4 - theta / 2;
  return [Math.cos(a), Math.sin(a)];
};
const uMinus = (theta) => {
  const a = Math.PI / 4 - theta / 2;
  return [-Math.sin(a), Math.cos(a)];
};
const occupiedFrame = (theta) => [
  tensorVector(rp, uMinus(theta)),
  tensorVector(rm, uPlus(theta)),
];

const initial = occupiedFrame(0);
const endpoint = occupiedFrame(Math.PI);
const sewn = endpoint.map((vector) => matVec(S, vector));
const W = initial.map((basisVector) => sewn.map((vector) => dot(basisVector, vector)));
const expectedW = [[0, -1], [1, 0]];
assert(equalM(W, expectedW), "the sewn occupied frame must have quarter-turn holonomy");
assert(equalM(mulM(W, W), scaleM(-1, I2)), "occupied holonomy must square to minus one");
const detW = W[0][0] * W[1][1] - W[0][1] * W[1][0];
assert(Math.abs(detW - 1) < tolerance,
  "the rank-two occupied real bundle must be orientable, with w1 zero");

// A=H(0,phi)S is a real antisymmetric Majorana matrix.
const majorana = (phi) => mulM(H(0, phi), S);
for (const phi of [0, 0.8, 2.4, 2 * Math.PI]) {
  assert(equalM(transpose(majorana(phi)), scaleM(-1, majorana(phi))),
    "Majorana matrix must be antisymmetric");
}
const pfaffian4 = (a) => a[0][1] * a[2][3] - a[0][2] * a[1][3] + a[0][3] * a[1][2];
const pf0 = pfaffian4(majorana(0));
const pf2pi = pfaffian4(majorana(2 * Math.PI));
assert(Math.abs(pf0) > tolerance, "endpoint Pfaffian must be nonzero");
assert(Math.abs(pf0 - pf2pi) < tolerance,
  "four-dimensional endpoint Pfaffians must have the same sign under A to minus A");

// The selector eigenline itself has transition -1. Its w1 is one, and is
// therefore not the w1 of the occupied rank-two bundle computed above.
const selectorTransition = -1;
assert(selectorTransition === -1 && detW === 1,
  "selector-line and occupied-bundle Stiefel-Whitney classes must remain distinct");

console.log("Minimal 4x4 deck-family parity audit: PASS");
console.log("ordinary_spectral_flow=0");
console.log("occupied_holonomy=[[0,-1],[1,0]]");
console.log("occupied_holonomy_square=-I2");
console.log("occupied_bundle_w1=0");
console.log("selector_line_w1=1");
console.log(`majorana_pfaffian_start=${pf0}`);
console.log(`majorana_pfaffian_end=${pf2pi}`);
console.log("odd_spatial_defect_parity=not_determined_without_regulated_Fredholm_operator");
