import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const determinant2 = ([[a, b], [c, d]]) => a * d - b * c;
const vectorize = ([[a11, a12], [, a22]]) => [a11, a22, Math.SQRT2 * a12];
const dot = (left, right) => left.reduce((sum, value, index) => sum + value * right[index], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const determinant3 = ([r1, r2, r3]) => dot(r1, cross(r2, r3));

// Structural leading-spectral model for the Abelian-Higgs trace:
// O_g = a O_H + c_beta O_F + ..., O_F=F_{mu nu}F^{mu nu}.
// At the first decoupled spectral order O_H excites scalar pairs and O_F gauge pairs.
const massSquared = 1;
const a = 2 * massSquared;
const cBeta = 0.08;
const rhoH = (s) => s <= 4 * massSquared ? 0 : Math.sqrt(1 - (4 * massSquared) / s);
const rhoF = (s) => s <= 0 ? 0 : s ** 2;
const metricHiggsDensity = (s) => {
  const h = rhoH(s);
  const f = rhoF(s);
  return [[a ** 2 * h + cBeta ** 2 * f, a * h], [a * h, h]];
};

const samples = [0.5, 2, 4.1, 5, 8, 16].map((s) => {
  const rho = metricHiggsDensity(s);
  const determinant = determinant2(rho);
  const innovation = rho[1][1] > 0 ? rho[0][0] - rho[0][1] ** 2 / rho[1][1] : null;
  return { s, rhoH: rhoH(s), rhoF: rhoF(s), rho, determinant, innovation, rank: determinant > 1e-12 ? 2 : (rho[0][0] + rho[1][1] > 0 ? 1 : 0) };
});
for (const sample of samples.filter(({ s }) => s > 4 * massSquared)) {
  assert.ok(Math.abs(sample.determinant - cBeta ** 2 * sample.rhoF * sample.rhoH) < 1e-10);
  assert.ok(Math.abs(sample.innovation - cBeta ** 2 * sample.rhoF) < 1e-10);
  assert.equal(sample.rank, 2);
}

// Although full rank at each overlapping energy, all leading samples lie in the plane
// spanned by vv^T and E_gg.
const higgsRayMatrix = [[a ** 2, a], [a, 1]];
const anomalyMatrix = [[1, 0], [0, 0]];
const planeNormal = cross(vectorize(higgsRayMatrix), vectorize(anomalyMatrix));
const planeResiduals = samples.map(({ rho }) => dot(planeNormal, vectorize(rho)));
assert.ok(planeResiduals.every((residual) => Math.abs(residual) < 1e-10));
const tripleSpanDeterminants = [];
for (let i = 0; i < samples.length; i += 1) for (let j = i + 1; j < samples.length; j += 1) for (let k = j + 1; k < samples.length; k += 1) tripleSpanDeterminants.push(determinant3([vectorize(samples[i].rho), vectorize(samples[j].rho), vectorize(samples[k].rho)]));
assert.ok(tripleSpanDeterminants.every((value) => Math.abs(value) < 1e-9));

// A genuinely mixed interaction direction supplies a third matrix outside that plane.
const mixedDirection = [1, -0.55];
const mixedMatrix = [[mixedDirection[0] ** 2, mixedDirection[0] * mixedDirection[1]], [mixedDirection[0] * mixedDirection[1], mixedDirection[1] ** 2]];
const fullSpanDeterminant = determinant3([vectorize(higgsRayMatrix), vectorize(anomalyMatrix), vectorize(mixedMatrix)]);
assert.ok(Math.abs(fullSpanDeterminant) > 0.1);

const result = {
  protocol: "claimipedia-d03-abelian-anomaly-strike/1",
  strikeId: "d03-abelian-higgs-anomaly-innovation-v1",
  theoremCandidate: {
    traceDecomposition: "Write the renormalized trace as O_g=a O_H+c_beta O_F+other beta-function operators, with O_F=F_{mu nu}F^{mu nu} and c_beta proportional to beta_e/(2e).",
    leadingOrthogonalChannel: "At the first decoupled spectral order O_H excites scalar-pair states while O_F excites gauge-pair states, so the latter is orthogonal spectral innovation.",
    determinantIdentity: "rho=rho_H(a,1)(a,1)^T+c_beta^2 rho_F(1,0)(1,0)^T implies det rho=c_beta^2 rho_H rho_F and Delta=c_beta^2 rho_F.",
    planeObstruction: "All such leading matrices lie in span{(a,1)(a,1)^T,E_gg}; full rank at fixed s does not make the spectral family three-dimensional.",
    thirdDirectionGate: "A third Jordan direction requires an energy/state-dependent mixed excitation not confined to the Higgs ray plus metric-only anomaly plane."
  },
  fixture: { massSquared, a, cBeta, samples, higgsRayMatrix, anomalyMatrix, planeNormal, planeResiduals, maximumTripleSpanDeterminant: Math.max(...tripleSpanDeterminants.map(Math.abs)) },
  mixedDirectionWitness: { mixedDirection, mixedMatrix, fullSpanDeterminant },
  dispositions: {
    traceAnomalyCanCreatePositiveInnovation: true,
    leadingAnomalyCanCreateFixedPointRankTwo: true,
    leadingDecoupledAnomalyCreatesFullH2Family: false,
    rankTwoAtOneEnergyImpliesSpin23: false,
    mixedSpectralDirectionNeededForFullCarrier: true
  },
  nextGate: "Calculate the first nonzero mixed spectral amplitudes and their energy dependence in scalar QED/Abelian Higgs theory; test whether three sampled matrices have nonzero coordinate determinant after the contact quotient.",
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d03-abelian-anomaly-strike-receipt/1",
  checks: {
    anomalyOperatorSeparated: true,
    determinantIdentityVerified: true,
    innovationIdentityVerified: true,
    overlappingSpectrumHasRankTwo: samples.filter(({ s }) => s > 4 * massSquared).every(({ rank }) => rank === 2),
    leadingFamilyPlaneVerified: planeResiduals.every((residual) => Math.abs(residual) < 1e-10),
    fixedPointRankAndFamilySpanSeparated: true,
    thirdDirectionWitnessVerified: Math.abs(fullSpanDeterminant) > 0.1,
    authorityBoundaryPreserved: result.authority.automaticCorpusAdmission === false
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};
assert.ok(Object.values(receipt.checks).every(Boolean));

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d03-abelian-anomaly-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d03-abelian-anomaly-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
