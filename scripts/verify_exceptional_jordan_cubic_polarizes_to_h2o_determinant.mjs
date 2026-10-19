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
    const cyc = [[a, b, c], [b, c, a], [c, a, b]];
    if (cyc.some(([x, y]) => x === i && y === j)) {
      const hit = cyc.find(([x, y]) => x === i && y === j);
      return { sign: 1, k: hit[2] };
    }
    if (cyc.some(([x, y]) => x === j && y === i)) {
      const hit = cyc.find(([x, y]) => x === j && y === i);
      return { sign: -1, k: hit[2] };
    }
  }
  throw new Error("missing Fano product");
};
const oct = (...xs) => Array.from({ length: 8 }, (_, i) => xs[i] ?? 0);
const add = (x, y) => x.map((v, i) => v + y[i]);
const scale = (x, s) => x.map((v) => s * v);
const mul = (x, y) => {
  const out = Array(8).fill(0);
  for (let i = 0; i < 8; i += 1) for (let j = 0; j < 8; j += 1) {
    const p = basisProduct(i, j);
    out[p.k] += p.sign * x[i] * y[j];
  }
  return out;
};
const conj = (x) => x.map((v, i) => i === 0 ? v : -v);
const norm2 = (x) => x.reduce((s, v) => s + v * v, 0);
const real = (x) => x[0];
const maxAbs = (x) => Math.max(...x.map(Math.abs));
const near = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;

const x = oct(0.4, 0.2, -0.3, 0.1, 0.5, -0.2, 0.7, -0.1);
const y = oct(-0.2, 0.6, 0.1, -0.4, 0.2, 0.3, -0.5, 0.8);
const z = oct(0.3, -0.1, 0.5, 0.7, -0.2, 0.4, 0.1, -0.6);
assert(near(norm2(mul(x, y)), norm2(x) * norm2(y), 1e-9));
const associator = add(mul(mul(x, y), z), scale(mul(x, mul(y, z)), -1));
assert(maxAbs(associator) > 1e-3); // genuinely nonassociative example
assert(Math.abs(real(associator)) < 1e-10); // real triple product is bracket independent
assert(near(real(mul(mul(x, y), z)), real(mul(mul(y, z), x))));

const exceptionalNorm = (a, b, c, x0, y0, z0) =>
  a * b * c - a * norm2(x0) - b * norm2(y0) - c * norm2(z0)
  + 2 * real(mul(mul(x0, y0), z0));
const h2oDet = (a, b, z0) => a * b - norm2(z0);

const a = 2.1, b = 1.7;
const detA = h2oDet(a, b, z);
const linkForm = a * norm2(x) + b * norm2(y) - 2 * real(mul(mul(x, y), z));
for (const c of [0.5, 2, 7]) {
  assert(near(exceptionalNorm(a, b, c, x, y, z), c * detA - linkForm));
}

// Polarization along e_33 on the rank-two Peirce corner.
const zeroO = oct();
for (const t of [0.2, 1.3, 4.1]) {
  const derivative = (exceptionalNorm(a, b, t, zeroO, zeroO, z) - exceptionalNorm(a, b, 0, zeroO, zeroO, z)) / t;
  assert(near(derivative, detA));
}

// Heavy-face normalized exceptional cubic.
const convergence = [5, 10, 20, 40, 80].map((Delta) => {
  const normalized = exceptionalNorm(a, b, Delta, x, y, z) / Delta;
  const defect = normalized - detA;
  assert(near(defect, -linkForm / Delta));
  return { Delta, normalized, defect, scaledDefect: Delta * defect };
});

// Associative complex-subalgebra check against an ordinary 3x3 complex determinant.
const cc = (re, im = 0) => ({ re, im });
const cadd = (u, v) => cc(u.re + v.re, u.im + v.im);
const csub = (u, v) => cc(u.re - v.re, u.im - v.im);
const cmul = (u, v) => cc(u.re * v.re - u.im * v.im, u.re * v.im + u.im * v.re);
const cconj = (u) => cc(u.re, -u.im);
const cdet3 = (A) => {
  const p = (i, j, k) => cmul(A[0][i], cmul(A[1][j], A[2][k]));
  let out = cc(0);
  out = cadd(out, p(0, 1, 2)); out = cadd(out, p(1, 2, 0)); out = cadd(out, p(2, 0, 1));
  out = csub(out, p(2, 1, 0)); out = csub(out, p(1, 0, 2)); out = csub(out, p(0, 2, 1));
  return out;
};
const xo = oct(0.4, -0.2), yo = oct(-0.3, 0.6), zo = oct(0.7, 0.1);
const xc = cc(0.4, -0.2), yc = cc(-0.3, 0.6), zc = cc(0.7, 0.1);
const c0 = 2.8;
const complexMatrix = [
  [cc(a), zc, cconj(yc)],
  [cconj(zc), cc(b), xc],
  [yc, cconj(xc), cc(c0)]
];
const ordinary = cdet3(complexMatrix);
const exceptionalRestricted = exceptionalNorm(a, b, c0, xo, yo, zo);
assert(near(ordinary.re, exceptionalRestricted));
assert(Math.abs(ordinary.im) < 1e-10);

console.log(JSON.stringify({
  protocol: "exceptional-jordan-cubic-polarizes-to-h2o-determinant/1",
  exceptionalNorm: "N=abc-a|x|^2-b|y|^2-c|z|^2+2 Re((xy)z)",
  blockIdentity: "N=c det_H2O(A)-Q_A(x,y)",
  polarizedResidue: "D_{e33} N on the rank-two corner equals det_H2O(A)=ab-|z|^2",
  nonassociativeCheck: { associatorNormMax: maxAbs(associator), realAssociator: real(associator) },
  associativeRestriction: "restriction to a chosen C subset O equals the ordinary H3(C) determinant",
  heavyFaceConvergence: convergence,
  h2oSignature: "(1,9)",
  g2FixedSlice: "Fix_{G2}(O)=R, so the entrywise G2-fixed rank-two corner is H2(R) with signature (1,2)",
  boundary: "exceptional polarization alone selects H2(O), not Spin(2,3); a real/fixed-subalgebra selector is still required",
  passed: true
}, null, 2));
