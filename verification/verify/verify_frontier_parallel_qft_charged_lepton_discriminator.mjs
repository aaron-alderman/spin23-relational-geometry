import assert from 'node:assert/strict';

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const V = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];
const lambdaD = [5, 5, 1, 1, 1, 0, 0];
const lambdaM = [5, 5, 1, 1, 3, 0, 0];
const hypercharge = [1, -4, 2, -3, 6, 0, 3];
const baryon = [1, -1, -1, 0, 0, 0, 0];
const lepton = [0, 0, 0, 1, -1, -1, 0];
// Programme normalization: quark entries are 3B, so 3(B-L)=3B-3L.
const bl = baryon.map((x, i) => x - 3 * lepton[i]);

const coordinates = x => V.map(v => dot(v, x));
const add = (...xs) => xs[0].map((_, i) => xs.reduce((s, x) => s + x[i], 0));
const scale = (a, x) => x.map(y => a * y);
const reducedRateRatio = (x, numerator = 2, denominator = 0) => {
  const c = coordinates(x);
  return (c[numerator] * c[numerator]) / (c[denominator] * c[denominator]);
};

assert.deepEqual(coordinates(lambdaD), [10, 6, 2, 1]);
assert.deepEqual(coordinates(lambdaM), [10, 6, 4, 1]);
assert.equal(reducedRateRatio(lambdaD), 1 / 25);
assert.equal(reducedRateRatio(lambdaM), 4 / 25);
assert.equal(reducedRateRatio(lambdaM) / reducedRateRatio(lambdaD), 4);
assert.equal(reducedRateRatio(lambdaD, 2, 1), 1 / 9);
assert.equal(reducedRateRatio(lambdaM, 2, 1), 4 / 9);

// The entire protected subspace is annihilated by V.
for (const k of [hypercharge, baryon, lepton, bl]) {
  assert.deepEqual(coordinates(k), [0, 0, 0, 0]);
}

// Exact representative/calibration invariance: x -> g x + k.
const protectedShift = add(scale(7, hypercharge), scale(-5, baryon), scale(11, lepton));
for (const x of [lambdaD, lambdaM]) {
  assert.equal(reducedRateRatio(add(scale(13, x), protectedShift)), reducedRateRatio(x));
}

// A broken-source change is physical, not a harmless frame shear.
const ec = [0, 0, 0, 0, 1, 0, 0];
assert.notEqual(reducedRateRatio(add(lambdaD, ec)), reducedRateRatio(lambdaD));

// Homogeneity certificate for a production-times-lifetime observable.
// P = p c_u^2/f^2 and Gamma = (k_e c_e^2 + k_0)/f^2 imply Xi=P/Gamma.
const xi = ({ f, cu, ce, p, ke, k0 }) => (p * cu ** 2 / f ** 2) / ((ke * ce ** 2 + k0) / f ** 2);
const benchmark = { cu: 10, ce: 2, p: 3, ke: 5, k0: 7 };
assert.equal(xi({ ...benchmark, f: 1e3 }), xi({ ...benchmark, f: 1e9 }));
// In the exactly lepton-dominated limit, doubling c_e shortens Xi by four.
const xiD = xi({ f: 1e6, cu: 10, ce: 2, p: 3, ke: 5, k0: 0 });
const xiM = xi({ f: 1e6, cu: 10, ce: 4, p: 3, ke: 5, k0: 0 });
assert.equal(xiD / xiM, 4);

console.log(JSON.stringify({
  incidence_channel_coordinates: {
    deduplicated: coordinates(lambdaD),
    multiplicity_preserving: coordinates(lambdaM),
  },
  reduced_rate_ratios: {
    electron_over_up: { deduplicated: '1/25', multiplicity_preserving: '4/25', separation_factor: 4 },
    electron_over_down: { deduplicated: '1/9', multiplicity_preserving: '4/9', separation_factor: 4 },
  },
  invariance: {
    common_source_scale: true,
    kernel_V_shifts: ['hypercharge', 'baryon', 'lepton', 'B-L'],
    arbitrary_broken_source_redefinition: false,
  },
  physical_boundary: {
    standard_model_alone_selects_incidence_source: false,
    minimal_realization: 'one derivative ALP source plus two channel measurements',
    low_mass_analogue: 'production times lifetime',
  },
}, null, 2));
