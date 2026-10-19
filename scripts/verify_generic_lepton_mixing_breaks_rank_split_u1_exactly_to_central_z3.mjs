import assert from 'node:assert/strict';

const charges = [-2, 1, 1];
const twoPi = 2 * Math.PI;
const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;

// exp(i t X) commutes with a fully connected family matrix iff every phase
// difference is one.  The only nontrivial difference is 3t.
const allowed = [];
for (let k = 0; k < 6; k += 1) {
  const t = k * twoPi / 6;
  const phases = charges.map((q) => ({ re: Math.cos(q * t), im: Math.sin(q * t) }));
  const equal = phases.every((z) => close(z.re, phases[0].re) && close(z.im, phases[0].im));
  if (equal) allowed.push(k);
}
assert.deepEqual(allowed, [0, 2, 4]);

// These are t = 0, 2pi/3, 4pi/3 and the action is scalar.
for (const m of [0, 1, 2]) {
  const t = m * twoPi / 3;
  const phase = { re: Math.cos(t), im: Math.sin(t) };
  for (const q of charges) {
    assert(close(Math.cos(q * t), phase.re));
    assert(close(Math.sin(q * t), phase.im));
  }
}

// A connected support graph equates all diagonal commutant phases.
const edges = [[0, 1], [0, 2], [1, 2]];
const components = [new Set([0, 1, 2])];
assert.equal(components.length, 1);
assert(edges.every(([i, j]) => charges[i] - charges[j] === 0 || Math.abs(charges[i] - charges[j]) === 3));

// Cross-block Yukawa charges are +/-3 and are repaired by one flavon;
// the exceptional Majorana entry has charge 6 and needs two.
const diracCharge = charges.map((qi) => charges.map((qj) => qi - qj));
assert.deepEqual(diracCharge, [
  [0, -3, -3],
  [3, 0, 0],
  [3, 0, 0],
]);

console.log(JSON.stringify({
  generator: 'X = diag(-2,1,1)',
  genericConnectedYukawaCommutant: 'scalar U(1)',
  determinantOneFamilyStabilizer: 'Z_3',
  survivingParameters: ['0', '2pi/3', '4pi/3'],
  survivingAction: 'exp(it X) = exp(it) I_3',
  diracChargeMatrix: diracCharge,
  interpretation: 'Generic mixing breaks the rank-split U(1) exactly to its central Z3; flavon covariance restores the ultraviolet U(1) before condensation.',
}, null, 2));
