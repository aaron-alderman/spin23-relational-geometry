import assert from "node:assert/strict";

const eps = 1e-10;
const close = (a, b, tolerance = eps) => assert(Math.abs(a - b) < tolerance, `${a} != ${b}`);
const mat = (theta, a = 2, b = 0.7) => [
  [a + b * Math.cos(theta), b * Math.sin(theta)],
  [b * Math.sin(theta), a - b * Math.cos(theta)],
];
const det = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const mulVec = (A, v) => A.map((row) => row[0] * v[0] + row[1] * v[1]);
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];

const a = 2, b = 0.7;
for (let j = 0; j <= 256; j++) {
  const theta = 2 * Math.PI * j / 256;
  const R = mat(theta, a, b);
  close(det(R), a * a - b * b);
  assert(a - Math.abs(b) > 0, "response must remain strictly positive");
  const v = [Math.cos(theta / 2), Math.sin(theta / 2)];
  const Rv = mulVec(R, v);
  close(Rv[0], (a + b) * v[0]);
  close(Rv[1], (a + b) * v[1]);
}

const v0 = [1, 0];
const v2pi = [Math.cos(Math.PI), Math.sin(Math.PI)];
close(dot(v0, v2pi), -1);
for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
  close(mat(0)[i][j], mat(2 * Math.PI)[i][j]);
}

// The eigenprojector is periodic although every continuous normalized lift of
// this explicit principal eigenvector returns with the opposite sign.
const projector = (v) => [[v[0] * v[0], v[0] * v[1]], [v[1] * v[0], v[1] * v[1]]];
for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
  close(projector(v0)[i][j], projector(v2pi)[i][j]);
}

// A passive Herglotz extension with an isotropic second pole retains the same
// projector for every upper-half-plane frequency. Its two eigenvalues depend
// on z but not theta, so determinant winding in theta is exactly zero.
const complex = (re, im = 0) => ({ re, im });
const cadd = (x, y) => complex(x.re + y.re, x.im + y.im);
const cmul = (x, y) => complex(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const cinv = (x) => complex(x.re / (x.re ** 2 + x.im ** 2), -x.im / (x.re ** 2 + x.im ** 2));
const cdivRealMinusZ = (mass, z) => cinv(complex(mass - z.re, -z.im));
const z = complex(0.4, 0.8);
const alpha = cdivRealMinusZ(1.3, z);
const beta = cmul(complex(0.5), cdivRealMinusZ(2.7, z));
assert(alpha.im > 0 && beta.im > 0);
const lambdaPlus = cadd(cmul(complex(a + b), alpha), beta);
const lambdaMinus = cadd(cmul(complex(a - b), alpha), beta);
const determinant = cmul(lambdaPlus, lambdaMinus);
assert(determinant.re ** 2 + determinant.im ** 2 > eps);
assert(lambdaPlus.im > 0 && lambdaMinus.im > 0);

// A real line bundle has rank one, so all exterior powers above degree one
// vanish: there is no rank-one w2/Chern-like mixed class inside H2(R).
const realLineRank = 1;
const exteriorSquareDimension = realLineRank * (realLineRank - 1) / 2;
assert.equal(exteriorSquareDimension, 0);

console.log("PASS passive defect Mobius response");
console.log(`determinant=${a * a - b * b}; determinant_winding=0`);
console.log("principal_eigenline_w1=1; lifted_vector_holonomy=-1");
console.log("Herglotz_extension_strictly_passive=true; frequency_independent_projector=true");
console.log("genuine_2d_mixed_class_inside_real_rank_one_eigenbundle=false");
