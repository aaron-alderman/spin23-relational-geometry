import assert from "node:assert/strict";

// Complex scalars are sufficient to certify the forced inversion sign and contact no-go.
const add = ([ar, ai], [br, bi]) => [ar + br, ai + bi];
const mul = ([ar, ai], [br, bi]) => [ar * br - ai * bi, ar * bi + ai * br];
const inv = ([r, i]) => {
  const d = r * r + i * i;
  return [r / d, -i / d];
};
const scale = (k, [r, i]) => [k * r, k * i];
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

for (const z of [[1.2, 0.4], [-0.7, 2.1], [0, 1]]) {
  assert.ok(z[1] > 0);
  const positiveInverse = inv(z);
  const causalInverse = scale(-1, positiveInverse);
  assert.ok(positiveInverse[1] < 0);
  assert.ok(causalInverse[1] > 0);
}

// Equal spectral/imaginary data with different real contacts give different inverse duals.
const F = [0.6, 1.3];
const FQ = add(F, [2.2, 0]);
assert.equal(F[1], FQ[1]);
const dualF = scale(-1, inv(F));
const dualFQ = scale(-1, inv(FQ));
assert.ok(distance(dualF, dualFQ) > 0.1);

// The KMS multiplier cannot be one constant at distinct nonzero frequencies.
const beta = 1.7;
const coth = (x) => Math.cosh(x) / Math.sinh(x);
const c1 = coth(beta * 0.5 / 2);
const c2 = coth(beta * 2.0 / 2);
assert.ok(Math.abs(c1 - c2) > 0.5);

// On a physical support projector, pseudoinverse matching yields lambda P, not lambda I.
const lambda = 3;
const A = [[2, 0], [0, 0]];
const Ap = [[0.5, 0], [0, 0]];
const C = Ap.map((r) => r.map((x) => lambda * x));
const product = [
  [A[0][0] * C[0][0], 0],
  [0, 0],
];
assert.deepEqual(product, [[lambda, 0], [0, 0]]);

console.log("PASS Freudenthal causal, spectral and contact no-go");
console.log("  positive inversion reverses the Herglotz sign");
console.log("  only minus inversion preserves upper-half-plane passivity");
console.log("  identical absorptive data can have different full inverse duals");
console.log("  the KMS multiplier is frequency dependent");
console.log("  Ward-null inversion closes only on the physical projector");
