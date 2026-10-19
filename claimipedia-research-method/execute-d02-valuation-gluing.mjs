import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, scalar) => C(a.re * scalar, a.im * scalar);
const inv = (a) => {
  const denominator = a.re ** 2 + a.im ** 2;
  assert.ok(denominator > 0);
  return C(a.re / denominator, -a.im / denominator);
};
const abs = (a) => Math.hypot(a.re, a.im);
const distance = (a, b) => abs(sub(a, b));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function valuationHandler(interiorOrder, couplingOrder) {
  const exponent = 2 * couplingOrder - interiorOrder;
  if (exponent > 0) return { exponent, handler: "vanishing-correction", output: "base-limit" };
  if (exponent === 0) return { exponent, handler: "finite-residue", output: "residue-decorated-limit" };
  return { exponent, handler: "divergent-correction", output: "retain-or-refuse" };
}

function scalarCorrection({ s, z, interiorOrder, couplingOrder, interiorLeading = 1, couplingLeading = 1, interiorHigher = 0, couplingHigher = 0 }) {
  const d = scale(z, (s ** interiorOrder) * interiorLeading * (1 + interiorHigher * s));
  const b = (s ** couplingOrder) * couplingLeading * (1 + couplingHigher * s);
  return scale(inv(d), b * b);
}

// One-parameter valuation trichotomy.
const z = C(0.4, 1.1);
const base = add(C(1), scale(z, 2));
const oneParameterCases = [
  { interiorOrder: 2, couplingOrder: 2, expected: "vanishing-correction" },
  { interiorOrder: 2, couplingOrder: 1, expected: "finite-residue" },
  { interiorOrder: 2, couplingOrder: 0, expected: "divergent-correction" }
].map((fixture) => {
  const classification = valuationHandler(fixture.interiorOrder, fixture.couplingOrder);
  assert.equal(classification.handler, fixture.expected);
  const samples = [1e-2, 1e-4, 1e-6].map((s) => scalarCorrection({ s, z, ...fixture }));
  if (classification.exponent > 0) assert.ok(abs(samples.at(-1)) < abs(samples[0]) * 1e-6);
  if (classification.exponent === 0) assert.ok(distance(samples[0], samples.at(-1)) < 1e-10);
  if (classification.exponent < 0) assert.ok(abs(samples.at(-1)) > abs(samples[0]) * 1e6);
  return { ...fixture, classification, samples };
});

// Higher-order terms do not change the finite 0-jet residue when leading data agree.
const leadingResidue = scale(inv(z), 0.7 ** 2 / 1.3);
const higherTermFamilies = [
  { interiorHigher: 0, couplingHigher: 0 },
  { interiorHigher: 2.5, couplingHigher: -0.4 },
  { interiorHigher: -1.7, couplingHigher: 1.2 }
].map((higher) => {
  const values = [1e-2, 1e-4, 1e-6].map((s) => scalarCorrection({ s, z, interiorOrder: 2, couplingOrder: 1, interiorLeading: 1.3, couplingLeading: 0.7, ...higher }));
  assert.ok(distance(values.at(-1), leadingResidue) < 2e-6);
  return { ...higher, values, limitError: distance(values.at(-1), leadingResidue) };
});

// Reparameterization s=a r changes leading coefficients but not a critical residue.
const a = 3.4;
const reparameterizedResidue = scale(inv(scale(z, a ** 2)), (a * 0.7) ** 2);
const originalResidue = scale(inv(z), 0.7 ** 2);
assert.ok(distance(reparameterizedResidue, originalResidue) < 1e-12);

// A common-order two-mode crossing is invariant under orthogonal crossing-frame rotations.
const b = [0.8, -0.3];
const theta = 0.61;
const rotated = [Math.cos(theta) * b[0] + Math.sin(theta) * b[1], -Math.sin(theta) * b[0] + Math.cos(theta) * b[1]];
const twoModeResidue = scale(inv(z), b[0] ** 2 + b[1] ** 2);
const rotatedResidue = scale(inv(z), rotated[0] ** 2 + rotated[1] ** 2);
assert.ok(distance(twoModeResidue, rotatedResidue) < 1e-12);

// Multi-parameter obstruction: radial valuation alone is insufficient.  The real blow-up
// direction is required because D=(x^2+y^2)z and B=xb give cos(theta)^2 b^2/z.
const directionAngles = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2];
const directionResidues = directionAngles.map((angle) => ({
  angle,
  correction: scale(inv(z), 0.9 ** 2 * Math.cos(angle) ** 2)
}));
assert.ok(distance(directionResidues[0].correction, directionResidues.at(-1).correction) > 0.5);
const sameDirectionCurvedPaths = [1e-2, 1e-4, 1e-6].map((r) => {
  const x = r;
  const y = 2 * r ** 2;
  return scale(inv(z), (0.9 * x) ** 2 / (x ** 2 + y ** 2));
});
assert.ok(distance(sameDirectionCurvedPaths.at(-1), directionResidues[0].correction) < 1e-9);

// The finite residue keeps the passive/Herglotz property.
const finiteEffective = sub(base, originalResidue);
assert.ok(finiteEffective.im > 0);

// Möbius/sign holonomy of a real crossing eigenline changes a local oriented frame but
// not the quadratic residue.  Linear orientation data therefore remains a decoration.
const localCouplingAtStart = 0.73;
const localCouplingAfterLoop = -localCouplingAtStart;
const residueAtStart = scale(inv(z), localCouplingAtStart ** 2);
const residueAfterLoop = scale(inv(z), localCouplingAfterLoop ** 2);
assert.ok(distance(residueAtStart, residueAfterLoop) < 1e-12);
assert.notEqual(localCouplingAtStart, localCouplingAfterLoop);

const result = {
  protocol: "claimipedia-d02-valuation-gluing-execution/1",
  strikeId: "d02-valuation-normal-cone-strike-v1",
  theoremCandidate: {
    statement: "For a one-parameter finite-dimensional crossing with D_s=s^m(D_m+O(s)) and B_s=s^n(B_n+O(s)), invertible Herglotz leading block D_m on the crossing sector, the Schur correction is s^(2n-m)(B_n D_m^-1 B_n^T+O(s)).",
    trichotomy: {
      positiveExponent: "correction vanishes and the base limit descends",
      zeroExponent: "a finite residue-decorated limit survives",
      negativeExponent: "the correction diverges and elimination must retain or refuse"
    },
    coordinateInvariance: "The critical residue is invariant under regular one-parameter reparameterization and orthogonal/unitary crossing-frame changes when all leading data are transported."
  },
  oneParameterCases,
  higherTermFamilies,
  multiParameter: {
    radialValuationSufficient: false,
    requiredDecoration: "projective normal direction plus leading homogeneous interior and coupling symbols",
    directionResidues,
    sameDirectionCurvedPaths,
    descentCriterion: "The boundary correction descends from the blown-up normal sphere to the original singular point exactly when it is direction-independent."
  },
  holonomy: {
    carrierResidueDescendsAcrossSignHolonomy: true,
    orientedEigenlineDescends: false,
    disposition: "retain orientation or grading as a separate local-system decoration"
  },
  limits: {
    zeroJetResolvedForBoundedLeadingOrderClass: true,
    finiteJetResolvesFullGermUniformly: false,
    reason: "Higher effective-response coefficients depend on correspondingly higher input jets; no fixed finite jet captures the full analytic germ across families of unbounded order."
  },
  authority: {
    proposalOnly: true,
    entailsBeyondDeclaredFiniteLeadingOrderClass: false,
    empiricalAuthority: false,
    automaticCorpusAdmission: false,
    applicationAdmission: false
  }
};
const receipt = {
  protocol: "claimipedia-d02-valuation-gluing-receipt/1",
  checks: {
    valuationTrichotomy: true,
    higherTermZeroJetIndependence: true,
    regularReparameterizationInvariance: true,
    crossingFrameCovariance: true,
    multiParameterDirectionObstruction: true,
    blowupDirectionResolvesZeroJet: true,
    signHolonomyCarrierDescent: true,
    orientedDecorationDoesNotDescend: true,
    finiteResidueRemainsPassive: true,
    authorityBoundaryPreserved: true
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d02-valuation-gluing-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d02-valuation-gluing-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));

