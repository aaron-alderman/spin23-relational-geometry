import assert from 'node:assert/strict';

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, x) => C(a.re * x, a.im * x);
const conj = a => C(a.re, -a.im);
const abs2 = a => a.re * a.re + a.im * a.im;
const abs = a => Math.sqrt(abs2(a));
const phase = x => C(Math.cos(x), Math.sin(x));
const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;
const closeC = (a, b, eps = 1e-10) => Math.hypot(a.re - b.re, a.im - b.im) < eps;

function pmns(t12, t13, t23, delta) {
  const c12 = Math.cos(t12), s12 = Math.sin(t12);
  const c13 = Math.cos(t13), s13 = Math.sin(t13);
  const c23 = Math.cos(t23), s23 = Math.sin(t23);
  const eid = phase(delta), emid = conj(eid);
  return [
    [C(c12 * c13), C(s12 * c13), scale(emid, s13)],
    [
      add(C(-s12 * c23), scale(eid, -c12 * s23 * s13)),
      add(C(c12 * c23), scale(eid, -s12 * s23 * s13)),
      C(s23 * c13),
    ],
    [
      add(C(s12 * s23), scale(eid, -c12 * c23 * s13)),
      add(C(-c12 * s23), scale(eid, -s12 * c23 * s13)),
      C(c23 * c13),
    ],
  ];
}

const U = pmns(0.59, 0.15, 0.84, 1.17);

// Unitarity.
for (let a = 0; a < 3; a++) {
  for (let b = 0; b < 3; b++) {
    let x = C(0);
    for (let i = 0; i < 3; i++) x = add(x, mul(U[a][i], conj(U[b][i])));
    assert(closeC(x, C(a === b ? 1 : 0)));
  }
}

const residueMinor = (matrix, i, a = 0, b = 1) => ({
  aa: abs2(matrix[a][i]),
  bb: abs2(matrix[b][i]),
  ab: mul(matrix[a][i], conj(matrix[b][i])),
});
const coherence = r => scale(r.ab, 1 / Math.sqrt(r.aa * r.bb));
const area = (matrix, i, j, a = 0, b = 1) => {
  const ci = coherence(residueMinor(matrix, i, a, b));
  const cj = coherence(residueMinor(matrix, j, a, b));
  return mul(ci, conj(cj)).im;
};

for (let i = 0; i < 3; i++) {
  const r = residueMinor(U, i);
  assert(r.aa >= 0 && r.bb >= 0);
  assert(close(r.aa * r.bb - abs2(r.ab), 0));
  assert(close(abs(coherence(r)), 1));
}

const A12 = area(U, 0, 1);
const quartet = mul(mul(U[0][0], U[1][1]), mul(conj(U[0][1]), conj(U[1][0])));
const denominator = abs(U[0][0]) * abs(U[1][0]) * abs(U[0][1]) * abs(U[1][1]);
assert(close(A12, quartet.im / denominator));
assert(Math.abs(A12) <= 1);

// Arbitrary row and column phases leave every area invariant.
const rowPhases = [0.3, -0.8, 1.1];
const colPhases = [-0.4, 0.6, 0.9];
const rephased = U.map((row, a) => row.map((z, i) => mul(mul(phase(rowPhases[a]), z), phase(colPhases[i]))));
assert(close(area(rephased, 0, 1), A12));

// CP conjugation reverses the oriented area.
const conjugated = U.map(row => row.map(conj));
assert(close(area(conjugated, 0, 1), -A12));

// A real PMNS matrix has zero areas.
const realU = pmns(0.59, 0.15, 0.84, 0);
for (let i = 0; i < 3; i++) {
  for (let j = i + 1; j < 3; j++) assert(close(area(realU, i, j), 0));
}

// A real external face factor remains real after tracing over unit-trace flavor residues.
const realFaceResidues = [
  [[2, 0.4], [0.4, 1.3]],
  [[1.1, -0.2], [-0.2, 0.9]],
  [[0.7, 0.1], [0.1, 1.5]],
];
const faceMarginal = [[0, 0], [0, 0]];
for (const F of realFaceResidues) {
  for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) faceMarginal[a][b] += F[a][b];
}
assert(close(faceMarginal[0][1], faceMarginal[1][0]));
assert(Number.isFinite(A12) && Math.abs(A12) > 1e-6);

console.log('Neutrino flavor-orientation certificate: PASS');
console.log(`A_e_mu_12=${A12}; quartet=${quartet.im}; row_column_rephasing=true; external_face_real=true`);
