import assert from "node:assert/strict";

// Values quoted by the post/preprint and current 2022 CODATA adjustment.
const postedAlpha = 0.007300225192;
const codataAlpha = 7.2973525643e-3;
const codataAlphaStd = 1.1e-12;
const chainAlpha = 1 / 137.03599918956616;

const postedCmb = 2.726655515;
const measuredCmb = 2.72548;
const measuredCmbStd = 0.00057;

const compare = (candidate, reference, sigma) => ({
  candidate,
  reference,
  absoluteDifference: candidate - reference,
  relativeDifference: (candidate - reference) / reference,
  ppm: 1e6 * (candidate - reference) / reference,
  standardUncertainties: (candidate - reference) / sigma,
});

const postedAlphaAudit = compare(postedAlpha, codataAlpha, codataAlphaStd);
const chainAlphaAudit = compare(chainAlpha, codataAlpha, codataAlphaStd);
const cmbAudit = compare(postedCmb, measuredCmb, measuredCmbStd);

assert.ok(Math.abs(postedAlphaAudit.ppm - 393.6534071) < 1e-6);
assert.ok(Math.abs(postedAlphaAudit.standardUncertainties) > 2.6e6);
assert.ok(Math.abs(chainAlphaAudit.standardUncertainties) < 1);
assert.ok(Math.abs(cmbAudit.standardUncertainties) > 2);

console.log(JSON.stringify({
  status: "PASS",
  postedZetaAlpha: {
    ...postedAlphaAudit,
    inverseCandidate: 1 / postedAlpha,
  },
  chainAlpha: {
    ...chainAlphaAudit,
    inverseCandidate: 1 / chainAlpha,
  },
  postedZetaCmb: cmbAudit,
  logicalClassification: {
    rigorousSteinitzFockLemma:
      "commuting prime-power divisibility projections have the Fock vacuum as their common range",
    rhCriticalLineStatement:
      "a reformulation/equivalence, not a derivation of RH",
    missingPhysicalMap:
      "no gauge-fixed sphaleron fluctuation operator or renormalized determinant is proved to equal the completed-zeta object",
  },
  verdict:
    "retain the vacuum projector lemma; reject the posted alpha value as a precision prediction; require an operator-level zeta-sphaleron determinant identity before physical promotion",
}));
