import assert from "node:assert/strict";

// Scalar-diagonal slice Z=z I_2 of the genus-two Siegel domain.
// The trace metric is two copies of the upper-half-plane metric, so
// d_{H_2}(z_1 I,z_2 I)=sqrt(2) d_H(z_1,z_2).
const acosh = Math.acosh;
const h1Distance = (x1, y1, x2, y2) => {
  assert(y1 > 0 && y2 > 0);
  return acosh(1 + ((x1 - x2) ** 2 + (y1 - y2) ** 2) / (2 * y1 * y2));
};
const scalarH2Distance = (x1, y1, x2, y2) => Math.sqrt(2) * h1Distance(x1, y1, x2, y2);
const close = (a, b, eps = 1e-12) => assert(Math.abs(a - b) < eps, `${a} != ${b}`);

const base = { xTop: 0, yTop: 1, xChi: 0, yChi: 1 };
const lockedDistance = scalarH2Distance(base.xTop, base.yTop, base.xChi, base.yChi);
close(lockedDistance, 0);

// A common contact translation is a diagonal Sp(4,R) isometry.
const commonQ = 7;
const commonShiftDistance = scalarH2Distance(
  base.xTop + commonQ,
  base.yTop,
  base.xChi + commonQ,
  base.yChi,
);
close(commonShiftDistance, lockedDistance);

// An independent finite counterterm changes only Re Z_chi.  The spectral
// imaginary data stay identical, but the proposed locking distance changes.
const relativeQ = 3;
const independentShiftDistance = scalarH2Distance(
  base.xTop,
  base.yTop,
  base.xChi + relativeQ,
  base.yChi,
);
const analyticIndependentDistance = Math.sqrt(2) * acosh(1 + relativeQ ** 2 / 2);
close(independentShiftDistance, analyticIndependentDistance);
assert(independentShiftDistance > 0);

// The ambiguity is not bounded if arbitrary independent real contact terms
// are permitted.
const largerShiftDistance = scalarH2Distance(0, 1, 30, 1);
assert(largerShiftDistance > independentShiftDistance);

// A derivative with respect to the spectral parameter removes constant
// contact terms; this records the natural scheme-independent alternative.
const derivativeOfLinearResponse = (_q, m) => m;
assert.equal(derivativeOfLinearResponse(0, 2), derivativeOfLinearResponse(91, 2));

console.log(JSON.stringify({
  protocol: "contact-scheme-dependence-of-siegel-lock/1",
  slice: "Z_a=z_a I_2 in H_2, with ds^2=Tr(Y^-1 dZ Y^-1 dZbar)",
  exactFormula: "d_H2(i I_2,(q+i)I_2)=sqrt(2) arcosh(1+q^2/2)",
  checks: {
    initiallyCoincidentDistance: lockedDistance,
    commonContactShiftQ: commonQ,
    distanceAfterCommonShift: commonShiftDistance,
    independentRelativeContactShiftQ: relativeQ,
    distanceAfterIndependentShift: independentShiftDistance,
    distanceForRelativeShift30: largerShiftDistance,
    imaginaryPartsBeforeAndAfter: [1, 1],
    constantContactRemovedBySpectralDerivative: true,
  },
  conclusion: "The full-point Siegel geodesic lock is invariant under a common contact translation but not under independent finite counterterms. It is not a scheme-independent spectral observable unless a shared renormalization condition fixes the relative contact term.",
  alternatives: [
    "derive a common microscopic subtraction condition",
    "fix the relative contact term operationally",
    "replace the full-point distance by an invariant built from spectral imaginary parts or contact-insensitive derivatives",
  ],
  passed: true,
}, null, 2));
