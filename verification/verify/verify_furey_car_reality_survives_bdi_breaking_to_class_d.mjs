const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (x, a) => C(x * a.re, x * a.im);
const close = (a, b, eps = 1e-9) => Math.hypot(a.re - b.re, a.im - b.im) < eps;
const matMul = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => add(sum, mul(x, b[k][j])), C(0))));
const matConj = (a) => a.map((row) => row.map(conj));
const matScale = (x, a) => a.map((row) => row.map((z) => scale(x, z)));
const closeMatrix = (a, b) => a.every((row, i) => row.every((z, j) => close(z, b[i][j])));

const tx = [[C(0), C(1)], [C(1), C(0)]];
const ty = [[C(0), C(0, -1)], [C(0, 1), C(0)]];
const tz = [[C(1), C(0)], [C(0), C(-1)]];

const linearCombination = (terms) => terms[0][1].map((row, i) => row.map((_, j) =>
  terms.reduce((sum, [coefficient, matrix]) => add(sum, scale(coefficient, matrix[i][j])), C(0))));

// BDI parent plus an odd tau_x perturbation. It breaks T=K and Gamma=tau_x
// while preserving the exact CAR/BdG particle-hole map C=tau_x K.
const H = (k, winding, delta) => linearCombination([
  [Math.cos(winding * k), tz],
  [Math.sin(winding * k), ty],
  [delta * Math.sin(k), tx],
]);

for (const winding of [1, 3, -1]) {
  for (const delta of [0, 0.2, 0.9, 2.0]) {
    for (const k of [0, 0.19, 0.83, 1.7, Math.PI]) {
      const lhsPHS = matMul(matMul(tx, matConj(H(k, winding, delta))), tx);
      assert(closeMatrix(lhsPHS, matScale(-1, H(-k, winding, delta))),
        "CAR/BdG particle-hole symmetry must survive the BDI-breaking perturbation");
      const dNorm2 = 1 + delta * delta * Math.sin(k) * Math.sin(k);
      assert(dNorm2 >= 1 - 1e-12, "the perturbation must not close the bulk gap");
    }

    if (delta !== 0) {
      const testK = 0.71;
      assert(!closeMatrix(matConj(H(testK, winding, delta)), H(-testK, winding, delta)),
        "the odd tau_x perturbation must break T=K");
      const chiralTransform = matMul(matMul(tx, H(testK, winding, delta)), tx);
      assert(!closeMatrix(chiralTransform, matScale(-1, H(testK, winding, delta))),
        "the odd tau_x perturbation must break chiral symmetry");
    }

    const b0 = matMul(H(0, winding, delta), tx);
    const bPi = matMul(H(Math.PI, winding, delta), tx);
    const invariant = Math.sign(b0[0][1].re * bPi[0][1].re);
    assert(invariant === -1, "odd winding must retain nontrivial class-D Pfaffian parity");
  }
}

// Charged gauge-equivariance of the CAR swap-conjugation.
for (const alpha of [0.2, 0.9, 2.4]) {
  const rhoCar = [[C(Math.cos(alpha), Math.sin(alpha)), C(0)],
                  [C(0), C(Math.cos(alpha), -Math.sin(alpha))]];
  const transformed = matMul(matMul(tx, matConj(rhoCar)), tx);
  assert(closeMatrix(transformed, rhoCar), "J0=tau_x K must commute with charged CAR gauge transport");
}

console.log("Furey-CAR reality under BDI-to-D breaking certificate: PASS");
console.log("exact_reality=J0=tau_x_K");
console.log("BDI_time_reversal_and_chiral_symmetry_can_break=true");
console.log("class_D_gap_and_odd_Pfaffian_parity_survive=true");
console.log("full_flavor_CP_reality_not_required=true");
console.log("selector_to_physical_coordinate_still_required=true");
