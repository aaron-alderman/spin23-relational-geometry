import assert from 'node:assert/strict';

const highOperator = {
  fermions: 6,
  scalars: 0,
  dimension: 6 * 3 / 2,
  coefficientDimension: -5,
  y6: 2 * (1 + 0) + (-4 + 2),
  B3: 2 * (1 + 0) + (-1 - 1),
  L: 2 * (0 - 1) + 0,
};
assert.deepEqual(highOperator, {
  fermions: 6, scalars: 0, dimension: 9, coefficientDimension: -5,
  y6: 0, B3: 0, L: -2,
});

const lowOperator = {
  fermions: 6,
  scalars: 2,
  dimension: 6 * 3 / 2 + 2,
  coefficientDimension: -5 - 2,
  y6: 2 * (1 - 3 + 3) + (-4 + 2),
  B3: 2 * 1 + (-1 - 1),
  L: 2,
};
assert.deepEqual(lowOperator, {
  fermions: 6, scalars: 2, dimension: 11, coefficientDimension: -7,
  y6: 0, B3: 0, L: 2,
});
assert.equal(lowOperator.dimension + lowOperator.coefficientDimension, 4);

// Rephasing weights under N -> exp(i alpha) N.
const weights = { C: -2, y: -1, M: -2 };
const effectiveWeight = weights.C + 2 * weights.y - 2 * weights.M;
assert.equal(effectiveWeight, 0);

// Numerical complex check of C*y^2/M^2 and the broken-phase seesaw identity.
const polar = (r, phase) => ({ re: r * Math.cos(phase), im: r * Math.sin(phase) });
const mul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const div = (a, b) => {
  const n = b.re * b.re + b.im * b.im;
  return { re: (a.re * b.re + a.im * b.im) / n, im: (a.im * b.re - a.re * b.im) / n };
};
const scale = (a, x) => ({ re: a.re * x, im: a.im * x });
const close = (a, b, eps = 1e-10) => Math.hypot(a.re - b.re, a.im - b.im) < eps;

const C = polar(0.8, 0.7);
const y = polar(0.3, -0.4);
const M = polar(5.2, 0.9);
const v = 1.7;
const effective = div(mul(C, mul(y, y)), mul(M, M));
const mnu = scale(div(mul(y, y), M), -v * v);
const brokenFromHigh = scale(effective, v * v);
const brokenFromMass = scale(div(mul(C, mnu), M), -1);
assert(close(brokenFromHigh, brokenFromMass));

// Explicit sterile basis rephasing leaves the effective coefficient invariant.
const alpha = 0.53;
const Cp = mul(C, polar(1, weights.C * alpha));
const yp = mul(y, polar(1, weights.y * alpha));
const Mp = mul(M, polar(1, weights.M * alpha));
const effectivePrime = div(mul(Cp, mul(yp, yp)), mul(Mp, Mp));
assert(close(effectivePrime, effective));

console.log('Composite determinant seesaw-matching certificate: PASS');
console.log(`high_dim=${highOperator.dimension}; low_dim=${lowOperator.dimension}; DeltaL=${lowOperator.L}; rephasing_weight=${effectiveWeight}`);
