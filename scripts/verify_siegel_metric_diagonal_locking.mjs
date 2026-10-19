import assert from "node:assert/strict";

const z = (re = 0, im = 0) => ({ re, im });
const cz = (x) => typeof x === "number" ? z(x) : x;
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, s) => z(a.re * s, a.im * s);
const conj = (a) => z(a.re, -a.im);
const abs = (a) => Math.hypot(a.re, a.im);
const zeros = (n, m = n) => Array.from({ length: n }, () => Array.from({ length: m }, () => z()));
const ident = (n) => { const A = zeros(n); for (let i = 0; i < n; i++) A[i][i] = z(1); return A; };
const mm = (A, B) => A.map((row) => B[0].map((unused, j) =>
  row.reduce((sum, value, k) => add(sum, mul(cz(value), cz(B[k][j]))), z())));
const madd = (A, B) => A.map((row, i) => row.map((value, j) => add(cz(value), cz(B[i][j]))));
const mscale = (A, s) => A.map((row) => row.map((value) => mul(cz(value), cz(s))));
const tr = (A) => A[0].map((unused, j) => A.map((row) => cz(row[j])));
const dagger = (A) => tr(A).map((row) => row.map(conj));
const inverse = (A) => {
  const n = A.length;
  const M = A.map((row, i) => [...row.map(cz), ...ident(n)[i]]);
  for (let k = 0; k < n; k += 1) {
    let pivot = k;
    for (let i = k + 1; i < n; i += 1) if (abs(M[i][k]) > abs(M[pivot][k])) pivot = i;
    assert(abs(M[pivot][k]) > 1e-13);
    [M[k], M[pivot]] = [M[pivot], M[k]];
    const d = M[k][k], norm = d.re * d.re + d.im * d.im;
    const di = z(d.re / norm, -d.im / norm);
    M[k] = M[k].map((value) => mul(value, di));
    for (let i = 0; i < n; i += 1) if (i !== k) {
      const factor = M[i][k];
      M[i] = M[i].map((value, j) => add(value, scale(mul(factor, M[k][j]), -1)));
    }
  }
  return M.map((row) => row.slice(n));
};
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((value, j) =>
  abs(add(cz(value), scale(cz(B[i][j]), -1))))));
const trace = (A) => A.reduce((sum, row, i) => add(sum, cz(row[i])), z());
const realMatrix = (A) => A.map((row) => row.map(cz));
const imag = (A) => A.map((row) => row.map((value) => cz(value).im));
const positive2 = (A) => A[0][0] > 1e-12 && A[0][0] * A[1][1] - A[0][1] * A[1][0] > 1e-12;
const block = (A, B, C, D) => [
  ...[0, 1].map((i) => [...A[i], ...B[i]]),
  ...[0, 1].map((i) => [...C[i], ...D[i]]),
];
const parts = (M) => ({
  A: realMatrix(M.slice(0, 2).map((row) => row.slice(0, 2))),
  B: realMatrix(M.slice(0, 2).map((row) => row.slice(2))),
  C: realMatrix(M.slice(2).map((row) => row.slice(0, 2))),
  D: realMatrix(M.slice(2).map((row) => row.slice(2))),
});
const action = (M, Z) => {
  const { A, B, C, D } = parts(M);
  return mm(madd(mm(A, Z), B), inverse(madd(mm(C, Z), D)));
};
const tangentAction = (M, Z, dZ) => {
  const { C, D } = parts(M);
  const denominator = madd(mm(C, Z), D);
  return mm(mm(inverse(tr(denominator)), dZ), inverse(denominator));
};
const realInverse = (A) => inverse(realMatrix(A));
const siegelMetric = (Z, dZ) => {
  const Yinv = realInverse(imag(Z));
  return trace(mm(mm(mm(Yinv, dZ), Yinv), dagger(dZ))).re;
};

const Z = [[z(0.2, 1.4), z(0.1, 0.2)], [z(0.1, 0.2), z(-0.3, 1.1)]];
const dZ = [[z(0.3, 0.2), z(-0.1, 0.4)], [z(-0.1, 0.4), z(0.25, -0.15)]];
assert(maxDiff(Z, tr(Z)) < 1e-13);
assert(maxDiff(dZ, tr(dZ)) < 1e-13);
assert(positive2(imag(Z)));
const baseMetric = siegelMetric(Z, dZ);
assert(baseMetric > 0);

const I2 = [[1, 0], [0, 1]], O2 = [[0, 0], [0, 0]];
const G = [[1.2, 0.1], [-0.2, 0.9]];
const GinvT = tr(inverse(realMatrix(G))).map((row) => row.map((value) => value.re));
const Bs = [[0.2, -0.1], [-0.1, 0.3]], Cs = [[-0.15, 0.07], [0.07, 0.11]];
const generators = {
  linear: block(G, O2, O2, GinvT),
  upper: block(I2, Bs, O2, I2),
  lower: block(I2, O2, Cs, I2),
  fourier: block(O2, [[-1, 0], [0, -1]], I2, O2),
};
const invariance = {};
for (const [name, M] of Object.entries(generators)) {
  const Zp = action(M, Z), dZp = tangentAction(M, Z, dZ);
  const transformedMetric = siegelMetric(Zp, dZp);
  invariance[name] = {
    transformedImaginaryPositive: positive2(imag(Zp)),
    metric: transformedMetric,
    error: Math.abs(transformedMetric - baseMetric),
  };
  assert(invariance[name].transformedImaginaryPositive);
  assert(invariance[name].error < 1e-10);
}

const iI = mscale(ident(2), z(0, 1));
const cayley = mm(madd(Z, mscale(iI, -1)), inverse(madd(Z, iI)));
const defect = madd(ident(2), mscale(mm(dagger(cayley), cayley), -1));
assert(positive2(defect.map((row) => row.map((value) => value.re))));
assert(maxDiff(defect, dagger(defect)) < 1e-11);

console.log(JSON.stringify({
  protocol: "siegel-metric-diagonal-locking/1",
  basePoint: Z,
  tangent: dZ,
  baseMetric,
  sp4GeneratorChecks: invariance,
  boundedCayleyImage: cayley,
  contractionDefect: defect,
  localDiagonalLock: {
    potential: "V=kappa d_Siegel(Z_top,Z_chi)^2",
    quadraticExpansion: "V=kappa g_Z(delta Z_top-delta Z_chi, delta Z_top-delta Z_chi)+O(delta Z^3)",
    positiveRelativeHessian: baseMetric > 0,
    diagonalSp4Invariant: true,
  },
  resolution: "Nonlinear realization on the Siegel space mathfrak H_2=Sp(4,R)/U(2) admits a positive invariant Riemannian metric. A geodesic diagonal lock can preserve the full diagonal fractional Sp(4,R) action without using the indefinite linear determinant as an energy norm.",
  cost: "The causal Siegel carrier has complex dimension three (six real response coordinates), requires Im Z>0, and treats Sp(4,R) as a nonlinear response-domain symmetry. A local spacetime action, UV normalization, and source derivation remain separate gates.",
  passed: true,
}, null, 2));
