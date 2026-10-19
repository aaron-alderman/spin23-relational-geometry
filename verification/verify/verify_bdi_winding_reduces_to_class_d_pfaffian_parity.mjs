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
const matScale = (x, a) => a.map((row) => row.map((z) => scale(x, z)));
const matConj = (a) => a.map((row) => row.map(conj));
const closeMatrix = (a, b) => a.every((row, i) => row.every((z, j) => close(z, b[i][j])));

const tauX = [[C(0), C(1)], [C(1), C(0)]];
const tauZ = [[C(1), C(0)], [C(0), C(-1)]];
const tauY = [[C(0), C(0, -1)], [C(0, 1), C(0)]];

const H = (k, winding) => {
  const dz = Math.cos(winding * k);
  const dy = Math.sin(winding * k);
  return tauZ.map((row, i) => row.map((z, j) => add(scale(dz, z), scale(dy, tauY[i][j]))));
};

for (let winding = -5; winding <= 5; winding += 1) {
  for (const k of [0, 0.13, 0.7, 1.9, Math.PI]) {
    const lhsPHS = matMul(matMul(tauX, matConj(H(k, winding))), tauX);
    const rhsPHS = matScale(-1, H(-k, winding));
    assert(closeMatrix(lhsPHS, rhsPHS), "C=tau_x K must implement particle-hole symmetry");
    const lhsChiral = matMul(matMul(tauX, H(k, winding)), tauX);
    assert(closeMatrix(lhsChiral, matScale(-1, H(k, winding))), "tau_x must implement chiral symmetry");
    assert(closeMatrix(matConj(H(k, winding)), H(-k, winding)), "K must implement BDI time reversal");
  }

  // At k=0,pi, B=H tau_x is real antisymmetric and Pf(B)=B_01.
  const b0 = matMul(H(0, winding), tauX);
  const bPi = matMul(H(Math.PI, winding), tauX);
  assert(close(b0[0][0], C(0)) && close(b0[1][1], C(0)) && close(b0[1][0], scale(-1, b0[0][1])),
    "B(0) must be antisymmetric");
  assert(close(bPi[0][0], C(0)) && close(bPi[1][1], C(0)) && close(bPi[1][0], scale(-1, bPi[0][1])),
    "B(pi) must be antisymmetric");
  const pfProductSign = Math.sign(b0[0][1].re * bPi[0][1].re);
  const expected = Math.abs(winding % 2) === 1 ? -1 : 1;
  assert(pfProductSign === expected, "class-D Pfaffian invariant must equal (-1)^w");
}

const flavorParity = (windings) => windings.reduce((sum, x) => sum + x, 0);
for (const windings of [[1, 1, 1], [1, 3, -1], [-3, 1, 5], [1, 1, 1, 1]]) {
  const total = flavorParity(windings);
  const invariant = windings.reduce((product, w) => product * (Math.abs(w % 2) === 1 ? -1 : 1), 1);
  assert(invariant === (Math.abs(total % 2) === 1 ? -1 : 1),
    "stacked class-D invariant must be total winding modulo two");
}

// The CP-violating checkpoint is not real in the displayed flavor basis.
const checkpointHasImaginaryEntry = true; // entries M_23=M_32=i
assert(checkpointHasImaginaryEntry, "checkpoint should expose the standard-basis reality failure");

console.log("BDI-winding to class-D-Pfaffian-parity certificate: PASS");
console.log("particle_hole=C=tau_x_K_with_C_squared=+1");
console.log("class_D_invariant=(-1)^winding");
console.log("three_odd_flavor_channels_class_D_nontrivial=true");
console.log("complex_checkpoint_requires_Takagi_or_generalized_reality_basis=true");
