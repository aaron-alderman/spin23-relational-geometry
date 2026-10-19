const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const sub = (x, y) => C(x.re - y.re, x.im - y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const scale = (a, x) => C(a * x.re, a * x.im);
const div = (x, y) => scale(1 / (y.re * y.re + y.im * y.im), mul(x, conj(y)));
const abs2 = (x) => x.re * x.re + x.im * x.im;

const outer = (v) => v.map((vi) => v.map((vj) => mul(vi, conj(vj))));
const matrixAdd = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const matrixScale = (z, A) => A.map((row) => row.map((x) => mul(z, x)));
const identity = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0)));

const a = [C(1), C(1), C(1)];
const b = [C(1), C(0, 1), C(2, 1)];
const A = outer(a);
const B = outer(b);

// Every rank-one Hermitian residue has a real nonnegative edge loop.
const rankOneLoop = mul(mul(A[0][1], A[1][2]), A[2][0]);
assert(Math.abs(rankOneLoop.im) < 1e-12 && rankOneLoop.re >= 0, "rank-one loop must be real and nonnegative");

// Two nondegenerate positive spectral modes plus a port-local positive completion.
const eps = 1;
const G = (z) => {
  const poleA = div(C(1), sub(C(2), z));
  const poleB = div(C(1), sub(C(3), z));
  const poleI = div(C(eps), sub(C(5), z));
  return matrixAdd(matrixAdd(matrixScale(poleA, A), matrixScale(poleB, B)), matrixScale(poleI, identity(3)));
};

const G0 = G(C(0));
const loop = mul(mul(G0[0][1], G0[1][2]), G0[2][0]);
assert(Math.abs(loop.re - 157 / 216) < 1e-12, "two-mode loop real part mismatch");
assert(Math.abs(loop.im - 5 / 18) < 1e-12, "two-mode loop imaginary part mismatch");

// Strict positivity at z=0 follows from the positive identity residue; verify all
// Hermitian principal minors explicitly.
const det2 = (i, j) => G0[i][i].re * G0[j][j].re - abs2(G0[i][j]);
assert(G0.every((row, i) => Math.abs(row[i].im) < 1e-12 && row[i].re > 0), "positive diagonals required");
assert(det2(0, 1) > 0 && det2(1, 2) > 0 && det2(2, 0) > 0, "positive two-port minors required");
const det3 =
  G0[0][0].re * G0[1][1].re * G0[2][2].re
  + 2 * loop.re
  - G0[0][0].re * abs2(G0[1][2])
  - G0[1][1].re * abs2(G0[2][0])
  - G0[2][2].re * abs2(G0[0][1]);
assert(det3 > 0, "strictly positive three-port response required");

// Herglotz passivity: Im G(z) is a positive weighted sum of A, B and I.
// Check the weights and representative quadratic forms at several upper-half-plane points.
const testVectors = [
  [C(1), C(0), C(0)],
  [C(1), C(-2, 1), C(0.5, -0.7)],
  [C(0, 1), C(2), C(-1, 3)],
];
for (const z of [C(-1, 0.4), C(1.2, 0.7), C(4, 2)]) {
  for (const s of [2, 3, 5]) {
    const weight = div(C(1), sub(C(s), z)).im;
    assert(weight > 0, "upper-half-plane pole weight must be positive");
  }
  const M = G(z);
  for (const x of testVectors) {
    let q = C(0);
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) q = add(q, mul(conj(x[i]), mul(M[i][j], x[j])));
    }
    assert(q.im > 0, "strict Herglotz quadratic form required");
  }
}

// Local realification remains possible edge by edge, while the loop forbids one global real gauge.
for (const edge of [G0[0][1], G0[1][2], G0[2][0]]) {
  const phi = Math.atan2(edge.im, edge.re);
  const rotated = mul(C(Math.cos(-phi), Math.sin(-phi)), edge);
  assert(Math.abs(rotated.im) < 1e-12, "each edge must be locally realifiable");
}
assert(Math.abs(loop.im) > 1e-6, "two-mode loop must obstruct global realification");

console.log("Two-mode Herglotz holonomy certificate: PASS");
console.log("rank_one_loop_real_nonnegative=true; rank_two_orientation_nonzero=true");
console.log("G0_loop=157/216+(5/18)i; strict_positive_completion=true");
console.log("upper_half_plane_Herglotz_passivity=true; local_H2R_global_H3C=true");
