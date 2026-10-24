import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const outputPath = resolve(import.meta.dirname, "../evidence/data/alp-source-complete-fcnc-kernel-gate-v1.json");

// Bauer et al., arXiv:2012.12272v2, Eq. (74), for Lambda=4 pi f,
// f=1 TeV and mu_w=m_t:
//   kD_ij = kD_ij(Lambda) + 0.019 V_ti^* V_tj
//     [ ctt - 0.0032 ctilde_GG - 0.0057 ctilde_WW ].
// The corpus convention is ctilde_WW = cWW - A2/2.
const loopPrefactor = 0.019;
const gluonCoefficient = -0.0032;
const weakCoefficient = -0.0057;
const weakRow = [-0.5, 1]; // (A2,cWW) -> ctilde_WW
const fullFlavorRow = weakRow.map(value => loopPrefactor * weakCoefficient * value);
const determinant = weakRow[0] * fullFlavorRow[1] - weakRow[1] * fullFlavorRow[0];
const proportionality = fullFlavorRow[1] / weakRow[1];
const residual = fullFlavorRow.map((value, index) => value - proportionality * weakRow[index]);

const isolated = JSON.parse(await (await import("node:fs/promises")).readFile(
  resolve(import.meta.dirname, "../evidence/data/alp-fcnc-sixth-coordinate-gate-v1.json"),
  "utf8",
));
const isolatedFlavorRow = isolated.rankCertificate.fcncDirectRow;
const isolatedDeterminant = weakRow[0] * isolatedFlavorRow[1] - weakRow[1] * isolatedFlavorRow[0];

const result = {
  protocol: "alp-source-complete-fcnc-kernel-gate/1",
  date: "2026-10-25",
  targets: ["OT-048"],
  parent: "AZ-080",
  correctionOf: "AZ-079",
  sourceConvention: {
    reference: "Bauer et al., arXiv:2012.12272v2, Eqs. (70)-(74)",
    declaredApproximation: "minimal flavor violation; Lambda=4 pi f with f=1 TeV; mu_w=m_t; published numerical forward expression Eq. (74)",
    equation: "kD_ij(mt)=kD_ij(Lambda)+0.019 V_ti^* V_tj [ctt(Lambda)-0.0032 ctilde_GG(Lambda)-0.0057 ctilde_WW(Lambda)]",
    identity: "ctilde_WW=cWW-A2/2",
  },
  isolatedTermAudit: {
    weakRow,
    isolatedDirectMatchingRow: isolatedFlavorRow,
    isolatedDeterminant,
    conclusion: "The cWW term isolated from weak-scale matching is linearly independent, but it is not the source-complete flavor forward kernel.",
  },
  sourceCompleteKernel: {
    coordinates: ["A2", "cWW", "ctt", "ctilde_GG", "kD_UV_over_CKM"],
    weakRecordRow: [...weakRow, 0, 0, 0],
    flavorRecordRow: [
      ...fullFlavorRow,
      loopPrefactor,
      loopPrefactor * gluonCoefficient,
      1,
    ],
    flavorA2CwwBlock: fullFlavorRow,
    proportionalityToWeakRow: proportionality,
    proportionalityResidual: residual,
    determinantOnA2Cww: determinant,
    rankOnA2Cww: Math.abs(determinant) < 1e-15 ? 1 : 2,
    oldBlindDirection: [2, 1],
    flavorImageOfOldBlindDirection: 2 * fullFlavorRow[0] + fullFlavorRow[1],
    nuisanceDirections: ["ctt", "ctilde_GG", "UV flavor source kD(Lambda)"],
  },
  boundary: {
    closed: "In the cited MFV numerical forward kernel, the B/K flavor coefficient depends on A2 and cWW only through ctilde_WW. Its (A2,cWW) row is exactly parallel to the weak row, so the two-record determinant vanishes.",
    correction: "AZ-079 proved independence only for an isolated finite matching term. That term cannot be promoted to detector-level identifiability before RG evolution, matching and basis conversion are recombined into the source-complete forward expression.",
    scope: "This no-go is limited to the published Eq. (74) approximation and its declared MFV, scale and parameter assumptions. It does not prove that every gauge-complete W-associated differential amplitude or non-MFV flavor observable is blind.",
    detectorValue: "Belle/Belle II remains a real constraint and validation arm for ctilde_WW, ctt, ctilde_GG and UV flavor sources, but not an independent sixth-coordinate row in this scope.",
    nextAction: "Return the sixth-coordinate question to a gauge-complete differential amplitude in which direct bosonic emission and current emission remain separately intervenable, or exhibit a different source-complete observable whose (A2,cWW) row is not proportional to (-1/2,1).",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, ...result }, null, 2));
