import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const determinant2 = ([[a, b], [c, d]]) => a * d - b * c;
const maxError = (left, right) => Math.max(...left.flatMap((row, i) => row.map((value, j) => Math.abs(value - right[i][j]))));

// In the free, symmetric, conformally improved four-real-scalar Higgs rung,
// the separated-point trace identity is O_g = 2 m^2 O_H modulo EOM/contact terms.
const massSquared = 2.25;
const traceCoefficient = 2 * massSquared;
const thresholds = [9.25, 10, 12, 18, 36];
const scalarDensity = (s) => s <= 4 * massSquared ? 0 : Math.sqrt(1 - (4 * massSquared) / s);
const freeSamples = thresholds.map((s) => {
  const rhoH = scalarDensity(s);
  const rho = [
    [traceCoefficient ** 2 * rhoH, traceCoefficient * rhoH],
    [traceCoefficient * rhoH, rhoH]
  ];
  const determinant = determinant2(rho);
  const innovation = rhoH === 0 ? 0 : rho[0][0] - (rho[0][1] * rho[1][0]) / rho[1][1];
  return { s, rhoH, rho, determinant, innovation, rank: rhoH > 0 ? 1 : 0 };
});
assert.ok(freeSamples.every(({ determinant, innovation }) => Math.abs(determinant) < 1e-12 && Math.abs(innovation) < 1e-12));

// Source-shear invariance: O_g -> O_g + c O_H has determinant-one change of basis.
const shear = (rho, c) => {
  const [a, b] = rho[0];
  const d = rho[1][1];
  return [[a + 2 * c * b + c ** 2 * d, b + c * d], [b + c * d, d]];
};
const basePositive = [[5, 1.4], [1.4, 2]];
const shearSamples = [-4, -1, 0.5, 3].map((c) => {
  const transformed = shear(basePositive, c);
  const innovation = transformed[0][0] - transformed[0][1] ** 2 / transformed[1][1];
  return { c, transformed, determinant: determinant2(transformed), innovation };
});
assert.ok(shearSamples.every(({ determinant }) => Math.abs(determinant - determinant2(basePositive)) < 1e-12));
assert.ok(shearSamples.every(({ innovation }) => Math.abs(innovation - determinant2(basePositive) / basePositive[1][1]) < 1e-12));

// General Gram theorem. h is the Higgs excitation vector; x is an interaction/anomaly direction.
// For g=a h+b x, det Gram(g,h)=b^2 ||h||^2 ||x_perp||^2.
const dot = (left, right) => left.reduce((sum, value, index) => sum + value * right[index], 0);
const h = [1, 2, -1];
const x = [2, -1, 3];
const a = traceCoefficient;
const b = 0.35;
const g = h.map((value, index) => a * value + b * x[index]);
const interactingGram = [[dot(g, g), dot(g, h)], [dot(h, g), dot(h, h)]];
const hNormSquared = dot(h, h);
const projectionCoefficient = dot(x, h) / hNormSquared;
const xPerp = x.map((value, index) => value - projectionCoefficient * h[index]);
const gramDeterminantFormula = b ** 2 * hNormSquared * dot(xPerp, xPerp);
assert.ok(Math.abs(determinant2(interactingGram) - gramDeterminantFormula) < 1e-10);
const innovation = interactingGram[0][0] - interactingGram[0][1] ** 2 / interactingGram[1][1];
assert.ok(Math.abs(innovation - b ** 2 * dot(xPerp, xPerp)) < 1e-10);
assert.ok(innovation > 0);

// Three independent spectral samples are needed to span all of H2(R), not merely rank two at one s.
const vectorize = ([[a11, a12], [, a22]]) => [a11, a22, Math.SQRT2 * a12];
const family = [
  [[1, 0], [0, 0]],
  [[0, 0], [0, 1]],
  [[1, 1], [1, 1]]
];
const coordinateMatrix = family.map(vectorize);
const determinant3 = ([r1, r2, r3]) => r1[0] * (r2[1] * r3[2] - r2[2] * r3[1]) - r1[1] * (r2[0] * r3[2] - r2[2] * r3[0]) + r1[2] * (r2[0] * r3[1] - r2[1] * r3[0]);
assert.ok(Math.abs(determinant3(coordinateMatrix)) > 1);

const result = {
  protocol: "claimipedia-d03-free-metric-higgs-strike/1",
  strikeId: "d03-free-improved-higgs-spectral-ray-v1",
  theoremCandidate: {
    freeTraceIdentity: "For a free four-real-scalar Higgs multiplet with conformal improvement in four dimensions, the separated-point on-shell trace is O_g=2 m^2 O_H, modulo EOM and contact terms.",
    spectralConsequence: "rho_ab(s)=rho_H(s) (2m^2,1)_a (2m^2,1)_b, so the metric-Higgs spectral matrix has rank one and zero determinant at every s above the two-particle threshold.",
    innovationTheorem: "For positive rho with rho_HH>0, Delta=rho_gg-rho_gH rho_HH^-1 rho_Hg=det(rho)/rho_HH is nonnegative and invariant under O_g -> O_g+c O_H.",
    gramMeaning: "If the metric excitation vector is g=a h+b x, Delta=b^2 ||x_perp||^2. It measures spectral information not already present in the Higgs source.",
    fullCarrierGate: "Positive determinant at one spectral point gives two independent source directions, not a three-dimensional spectral family. Full H2 requires three linearly independent matrices or a rank-three controlled-state Jacobian."
  },
  freeFixture: { massSquared, traceCoefficient, threshold: 4 * massSquared, densityNormalization: "arbitrary positive common convention; rank and normalized innovation are convention independent", samples: freeSamples },
  sourceShearFixture: { basePositive, samples: shearSamples },
  interactionWitness: { h, x, a, b, g, interactingGram, determinant: determinant2(interactingGram), gramDeterminantFormula, innovation, xPerp },
  fullCarrierWitness: { family, coordinateMatrix, coordinateDeterminant: determinant3(coordinateMatrix) },
  dispositions: {
    freeHiggsProducesFullH2Carrier: false,
    freeHiggsProducesSpectralRay: true,
    improvementOrContactTermsCreateAbsorptiveRank: false,
    interactionOrAnomalyDirectionRequired: true,
    positiveDeterminantAtOnePointProvesSpin23Symmetry: false,
    innovationIsSourceShearInvariant: true
  },
  nextGate: "Compute the anomaly/interacting remainder X=T^mu_mu-2m_H^2 H^dagger H in the Abelian-Higgs rung and test whether its spectral vector has a component orthogonal to H^dagger H.",
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d03-free-metric-higgs-strike-receipt/1",
  checks: {
    freeTraceCollinearityEncoded: true,
    freeSpectralRankOneVerified: freeSamples.every(({ rank }) => rank === 1),
    innovationVanishesInFreeRung: freeSamples.every(({ innovation: value }) => Math.abs(value) < 1e-12),
    sourceShearInvarianceVerified: true,
    gramInnovationFormulaVerified: true,
    interactingOrthogonalDirectionDetected: innovation > 0,
    fixedPointRankSeparatedFromFamilySpan: true,
    authorityBoundaryPreserved: result.authority.automaticCorpusAdmission === false
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};
assert.ok(Object.values(receipt.checks).every(Boolean));

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d03-free-metric-higgs-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d03-free-metric-higgs-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
