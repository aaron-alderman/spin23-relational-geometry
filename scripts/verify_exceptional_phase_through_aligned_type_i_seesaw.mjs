const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const scale = (a, x) => C(a * x.re, a * x.im);
const div = (x, y) => scale(1 / (y.re * y.re + y.im * y.im), mul(x, conj(y)));
const abs2 = (x) => x.re * x.re + x.im * x.im;

const triangle = (M) => mul(
  mul(mul(M[0][1], M[1][2]), M[2][0]),
  mul(mul(conj(M[0][0]), conj(M[1][1])), conj(M[2][2])),
).im;

const build = ({ S, T, O, r, a, b, kappa = 1, y = [1, 1, 1] }) => {
  const det = C(S * T * O + S * b * b - T * a * a - O * r * r, 2 * r * a * b);
  const adj = [
    [C(T * O + b * b), C(-r * O, a * b), C(-a * T, r * b)],
    [C(-r * O, a * b), C(S * O - a * a), C(a * r, -S * b)],
    [C(-a * T, r * b), C(a * r, -S * b), C(S * T - r * r)],
  ];
  const light = adj.map((row, i) => row.map((x, j) => scale(-kappa * y[i] * y[j], div(x, det))));
  const heavy = [
    [C(S), C(r), C(a)],
    [C(r), C(T), C(0, b)],
    [C(a), C(0, b), C(O)],
  ];
  const cofactorProduct = (T * O + b * b) * (S * O - a * a) * (S * T - r * r);
  const cofactorOrientation = a * r * b * (S * b * b - r * r * O - S * T * O - a * a * T);
  const predicted = Math.pow(kappa, 6) * Math.pow(y[0] * y[1] * y[2], 4)
    * cofactorProduct * cofactorOrientation / Math.pow(abs2(det), 3);
  return { det, light, heavy, predicted, cofactorOrientation };
};

const checkpoint = build({ S: 5, T: 7, O: 11, r: 2, a: 1, b: 1 });
assert(Math.abs(triangle(checkpoint.heavy) - 770) < 1e-12, "heavy triangle checkpoint mismatch");
assert(Math.abs(checkpoint.cofactorOrientation + 862) < 1e-12, "inverse-cofactor orientation mismatch");
assert(Math.abs(triangle(checkpoint.light) - checkpoint.predicted) < 1e-18, "light seesaw triangle formula mismatch");
assert(Math.abs(triangle(checkpoint.light)) > 1e-12, "checkpoint light triangle must remain nonzero");

// Real diagonal Yukawas change only the positive overall scale.
const dressed = build({ S: 5, T: 7, O: 11, r: 2, a: 1, b: 1, y: [2, 3, 5] });
assert(Math.abs(triangle(dressed.light) / triangle(checkpoint.light) - Math.pow(30, 4)) < 1e-6, "aligned Yukawa scaling mismatch");

// Exact transmission-zero hypersurface with a nonzero heavy triangle and nonzero diagonal cofactors.
const cancellation = build({ S: 2, T: 3, O: 5, r: 1, a: 1, b: Math.sqrt(19) });
assert(Math.abs(triangle(cancellation.heavy) - 30 * Math.sqrt(19)) < 1e-10, "heavy phase must remain nonzero on cancellation surface");
assert(Math.abs(cancellation.cofactorOrientation) < 1e-10, "cofactor orientation must cancel exactly");
assert(Math.abs(triangle(cancellation.light)) < 1e-14, "light triangle must vanish on transmission-zero surface");

console.log("Aligned type-I seesaw phase-transmission certificate: PASS");
console.log("heavy_checkpoint_triangle=770; inverse_cofactor_orientation=-862");
console.log("real_diagonal_Yukawas_rescale_by=(y1*y2*y3)^4");
console.log("heavy_CP_nonzero_light_triangle_zero_hypersurface=true");
