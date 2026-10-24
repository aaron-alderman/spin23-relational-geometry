import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const outputPath = resolve(import.meta.dirname, "../evidence/data/alp-fcnc-sixth-coordinate-gate-v1.json");
const alpha = 1 / 127.95;
const sin2ThetaW = 0.23122;
const mtGeV = 172.69;
const mWGeV = 80.377;
const higgsVevGeV = 246.22;
const yTop = Math.SQRT2 * mtGeV / higgsVevGeV;
const xTop = (mtGeV / mWGeV) ** 2;
const loopFunction = (1 - xTop + xTop * Math.log(xTop)) / (1 - xTop) ** 2;
const directWeakBracketCoefficient = -3 * alpha * loopFunction / (2 * Math.PI * sin2ThetaW);
const directWeakMatchingCoefficient = yTop ** 2 * directWeakBracketCoefficient / (16 * Math.PI ** 2);

// Rows act on (A_2,c_WW).  The first is the bosonic tilde coefficient.
// The second isolates the explicit direct-c_WW term in the finite FCNC
// down-sector matching of Bauer et al. Eq. (60), after its other terms are
// treated as separately constrained nuisance coordinates.
const weakRow = [-0.5, 1];
const fcncDirectRow = [0, directWeakMatchingCoefficient];
const blindDirection = [2, 1];
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const determinant = weakRow[0] * fcncDirectRow[1] - weakRow[1] * fcncDirectRow[0];

const result = {
  protocol: "alp-fcnc-sixth-coordinate-gate/1",
  date: "2026-10-25",
  targets: ["OT-048"],
  parent: "AZ-078",
  sourceConvention: {
    primaryReference: "Bauer et al., arXiv:2012.12272v2, Eqs. (60), (68), and (70)-(74)",
    experimentalReference: "Belle and Belle II Collaborations, arXiv:2507.01249",
    physicalInputs: { alpha, sin2ThetaW, mtGeV, mWGeV, higgsVevGeV, yTop },
    xTop,
    loopFunction,
    directWeakBracketCoefficient,
    directWeakMatchingCoefficient,
    equation: "Delta k_D contains K_W c_WW V_ti^* V_tj with K_W=[y_t^2/(16 pi^2)][-3 alpha F(x_t)/(2 pi s_w^2)]",
  },
  rankCertificate: {
    coordinates: ["A_2", "c_WW"],
    weakBosonicRow: weakRow,
    fcncDirectRow,
    determinant,
    fullRank: Math.abs(determinant) > 1e-12,
    oldBlindDirection: blindDirection,
    weakImageOfBlindDirection: dot(weakRow, blindDirection),
    fcncImageOfBlindDirection: dot(fcncDirectRow, blindDirection),
    blindDirectionBroken: Math.abs(dot(fcncDirectRow, blindDirection)) > 1e-12,
    inverseSensitivityAmplification: 1 / Math.abs(directWeakMatchingCoefficient),
  },
  nuisanceFirewall: {
    otherSourceCoordinates: ["c_tt", "k_U", "ctilde_GG", "CKM"],
    detectorAndHadronicCoordinates: ["B-to-K form factors", "ALP decay branching fraction", "lifetime and acceptance", "mass resolution", "background model"],
    publishedLimitScope: "The Belle B->K(*)a(a->gamma gamma) result reports a one-coupling g_aW interpretation. It is evidence that the detector record exists, not a ready-made two-coordinate likelihood.",
    admissionRule: "Promote the pair to an identified (A_2,c_WW) measurement only after the nuisance-profiled Fisher/Jacobian retains rank two with the full experimental covariance.",
  },
  boundary: {
    closed: "The published finite weak matching supplies a mathematically independent row: its flavor-changing down-sector term is proportional to the unprimed direct c_WW, whereas the weak bosonic record sees c_WW-A_2/2. The two idealized rows have nonzero determinant.",
    notClosed: "No existing published single-coupling limit performs the required joint fit, and the direct matching coefficient is loop suppressed. Existing B-decay data therefore nominate a realistic detector arm but do not yet resolve the sixth coordinate.",
    implication: "The scale-sweep no-go has a concrete exit. Add a different process family—flavor-changing B or K decay—not another energy point of the same W-associated coefficient.",
    nextCalculation: "Construct a joint likelihood using one W-associated high-energy kernel and B->K(*)a bins (visible and/or missing-energy), profile the listed current, CKM, form-factor, decay and detector nuisances, and test the smallest singular value against the preregistered resolution threshold.",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, ...result }, null, 2));
