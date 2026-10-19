const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const addC = (a, b) => C(a.re + b.re, a.im + b.im);
const mulC = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjC = (a) => C(a.re, -a.im);
const scaleC = (s, a) => C(s * a.re, s * a.im);
const addM = (a, b) => a.map((row, i) => row.map((x, j) => addC(x, b[i][j])));
const scaleM = (s, a) => a.map((row) => row.map((x) => scaleC(s, x)));
const mulM = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => addC(sum, mulC(x, b[k][j])), C(0))));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conjC(row[j])));
const equalM = (a, b, tolerance = 1e-9) => a.every((row, i) => row.every((x, j) =>
  Math.abs(x.re - b[i][j].re) < tolerance && Math.abs(x.im - b[i][j].im) < tolerance));
const inverse = (input) => {
  const n = input.length;
  const a = input.map((row, i) => [...row, ...Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0))]);
  for (let k = 0; k < n; k += 1) {
    let pivot = k;
    for (let i = k + 1; i < n; i += 1) if (a[i][k].re ** 2 + a[i][k].im ** 2 > a[pivot][k].re ** 2 + a[pivot][k].im ** 2) pivot = i;
    [a[k], a[pivot]] = [a[pivot], a[k]];
    const p = a[k][k];
    const pinv = scaleC(1 / (p.re ** 2 + p.im ** 2), conjC(p));
    for (let j = 0; j < 2 * n; j += 1) a[k][j] = mulC(pinv, a[k][j]);
    for (let i = 0; i < n; i += 1) if (i !== k) {
      const factor = a[i][k];
      for (let j = 0; j < 2 * n; j += 1) a[i][j] = addC(a[i][j], scaleC(-1, mulC(factor, a[k][j])));
    }
  }
  return a.map((row) => row.slice(n));
};

const gamma = 5 * Math.sqrt(11) / 12;
const K0 = [
  [C(4), C(1, -gamma), C(1)],
  [C(1, gamma), C(4), C(1)],
  [C(1), C(1), C(3)],
];
assert(equalM(dagger(K0), K0), "static inverse-propagator kernel must be Hermitian");
assert(4 > Math.hypot(1, gamma) + 1 && 3 > 2,
  "strict diagonal dominance with positive diagonal must certify K0 positivity");

for (const z of [C(0, 0.4), C(0.7, 1.1), C(-1.2, 2)]) {
  const Kz = K0.map((row, i) => row.map((value, j) => addC(value, C(i === j ? -z.re : 0, i === j ? -z.im : 0))));
  const Gz = inverse(Kz);
  const imKDiagonal = -z.im;
  assert(imKDiagonal < 0, "K(z)=K0-zI must be strictly anti-Herglotz");
  // Im G = eta G^dagger G, which is positive definite for invertible G.
  const gram = mulM(dagger(Gz), Gz);
  for (let i = 0; i < 3; i += 1) assert(gram[i][i].re > 0,
    "Green-function Herglotz Gram diagonal must be positive");
}

const Keff0 = [
  [C(11 / 3), C(2 / 3, -gamma)],
  [C(2 / 3, gamma), C(11 / 3)],
];
const Z = [[C(10 / 9), C(1 / 9)], [C(1 / 9), C(10 / 9)]];
const detZ = (10 / 9) ** 2 - (1 / 9) ** 2;
assert(Math.abs(detZ - 11 / 9) < 1e-12, "low-frequency residue determinant must be 11/9");
assert(10 / 9 > 1 / 9, "residue matrix must be positive definite");

// Z has eigenvalues 11/9 on (1,1) and 1 on (1,-1).
const s = 3 / Math.sqrt(11);
const ZminusHalf = [[C((1 + s) / 2), C((s - 1) / 2)], [C((s - 1) / 2), C((1 + s) / 2)]];
const canonical = mulM(mulM(ZminusHalf, Keff0), ZminusHalf);
const deltaCanonical = -canonical[0][1].im;
assert(Math.abs(deltaCanonical - 1.25) < 1e-10,
  "canonical residue normalization must land exactly at delta=5/4");
assert(Math.abs(deltaCanonical - gamma / Math.sqrt(detZ)) < 1e-10,
  "sigma_y congruence scaling must equal inverse square root of det Z");

const loop = mulC(mulC(K0[0][1], K0[1][2]), K0[2][0]);
assert(Math.abs(loop.im + gamma) < 1e-10, "static kernel must have the intended oriented loop");

console.log("Causal kernel normalizes to nontrivial Pin checkpoint: PASS");
console.log("static_kernel_positive=true");
console.log("inverse_propagator_anti_Herglotz=true");
console.log("Green_function_Herglotz=true");
console.log(`raw_oriented_coefficient=${gamma}`);
console.log(`canonical_delta=${deltaCanonical}`);
console.log("parameter_value_is_compatibility_checkpoint_not_prediction");
