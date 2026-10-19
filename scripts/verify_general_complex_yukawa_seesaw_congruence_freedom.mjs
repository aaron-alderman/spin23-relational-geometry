const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const sub = (x, y) => C(x.re - y.re, x.im - y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const div = (x, y) => {
  const d = y.re * y.re + y.im * y.im;
  const n = mul(x, conj(y));
  return C(n.re / d, n.im / d);
};
const abs = (x) => Math.hypot(x.re, x.im);
const scale = (a, x) => C(a * x.re, a * x.im);

const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C(0))));
const matScale = (a, A) => A.map((row) => row.map((x) => scale(a, x)));
const identity = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0)));
const closeMatrix = (A, B, tol = 1e-10) => A.every((row, i) => row.every((x, j) => abs(sub(x, B[i][j])) < tol));

const inverse = (A) => {
  const n = A.length;
  const aug = A.map((row, i) => [...row.map((x) => C(x.re, x.im)), ...identity(n)[i]]);
  for (let col = 0; col < n; col += 1) {
    let pivot = col;
    for (let i = col + 1; i < n; i += 1) if (abs(aug[i][col]) > abs(aug[pivot][col])) pivot = i;
    assert(abs(aug[pivot][col]) > 1e-12, "matrix must be invertible");
    [aug[col], aug[pivot]] = [aug[pivot], aug[col]];
    const p = aug[col][col];
    aug[col] = aug[col].map((x) => div(x, p));
    for (let i = 0; i < n; i += 1) {
      if (i === col) continue;
      const q = aug[i][col];
      aug[i] = aug[i].map((x, j) => sub(x, mul(q, aug[col][j])));
    }
  }
  return aug.map((row) => row.slice(n));
};

const triangle = (M) => mul(
  mul(mul(M[0][1], M[1][2]), M[2][0]),
  mul(mul(conj(M[0][0]), conj(M[1][1])), conj(M[2][2])),
).im;

const R = [
  [C(1), C(1, 1), C(0)],
  [C(0), C(1), C(1, 2)],
  [C(1), C(0), C(2)],
];
const Rt = transpose(R);
const heavy = matMul(R, Rt);
assert(Math.abs(triangle(heavy) + 300) < 1e-10, "factorized heavy checkpoint must carry CP");

// Erasure: Y=R^T sends M_R=RR^T to the identity light congruence.
const erasedCongruence = matMul(matMul(Rt, inverse(heavy)), R);
assert(closeMatrix(erasedCongruence, identity(3)), "general Yukawa must be able to erase the heavy phase");
const erasedLight = matScale(-1, erasedCongruence);
assert(Math.abs(triangle(erasedLight)) < 1e-12, "erased light triangle must vanish");

// Manufacture: a real trivial heavy sector and Y=R produce the same complex symmetric target.
const manufacturedCongruence = matMul(matMul(R, identity(3)), Rt);
const manufacturedLight = matScale(-1, manufacturedCongruence);
assert(closeMatrix(manufacturedCongruence, heavy), "trivial heavy sector must reach chosen complex target");
assert(Math.abs(triangle(manufacturedLight) + 300) < 1e-10, "complex Yukawa must manufacture light CP from a real heavy sector");

// General factorized target N=LL^T from factorized heavy M=RR^T via Y=LR^T.
const L = [
  [C(2), C(0, 1), C(1)],
  [C(1, -1), C(1), C(0)],
  [C(0), C(2), C(1, 1)],
];
const target = matMul(L, transpose(L));
const Y = matMul(L, Rt);
const reached = matMul(matMul(Y, inverse(heavy)), transpose(Y));
assert(closeMatrix(reached, target), "seesaw congruence must be surjective onto factorized symmetric targets");

console.log("General complex-Yukawa seesaw congruence certificate: PASS");
console.log("heavy_triangle=-300_can_be_erased_to_zero=true");
console.log("real_identity_heavy_can_manufacture_light_triangle=-300=true");
console.log("factorized_symmetric_target_surjectivity=true");
