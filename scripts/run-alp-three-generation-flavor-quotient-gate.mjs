import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const outputPath = resolve(import.meta.dirname, "../evidence/data/alp-three-generation-flavor-quotient-gate-v1.json");
const close = (a, b, tolerance = 1e-11) => Math.abs(a - b) <= tolerance;
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const scale = (s, A) => A.map(row => row.map(x => s * x));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const trace = A => A.reduce((sum, row, i) => sum + row[i], 0);
const frobenius2 = A => A.reduce((sum, row) => sum + row.reduce((inner, x) => inner + x * x, 0), 0);
const maxAbs = A => Math.max(...A.flat().map(Math.abs));
const matrixClose = (A, B) => maxAbs(sub(A, B)) < 1e-11;
const identity = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

// An exact rational orthogonal stand-in for a nontrivial CKM rotation.  The
// identities certified below use only V^T V=I and therefore extend directly
// to complex unitary CKM matrices with transpose replaced by adjoint.
const R12 = [[3 / 5, 4 / 5, 0], [-4 / 5, 3 / 5, 0], [0, 0, 1]];
const R23 = [[1, 0, 0], [0, 5 / 13, 12 / 13], [0, -12 / 13, 5 / 13]];
const V = multiply(R23, R12);

const cQ = [[2, 0.3, -0.2], [0.3, -1, 0.4], [-0.2, 0.4, 3]];
const cu = [[1, -0.1, 0.2], [-0.1, 4, 0.1], [0.2, 0.1, -2]];
const cd = [[-1, 0.2, 0.1], [0.2, 2, -0.3], [0.1, -0.3, 1]];
const cL = [[0.5, 0.1, 0], [0.1, -0.5, 0.2], [0, 0.2, 1]];
const ce = [[1.5, -0.2, 0.1], [-0.2, 0.5, 0], [0.1, 0, -1]];
const cWW = 7;

const massRecords = ({ Q, u, d, L, e }) => {
  const kD = multiply(transpose(V), multiply(Q, V));
  return {
    Cu: sub(u, Q),
    Cd: sub(d, kD),
    Ce: sub(e, L),
    kD,
    A2: 3 * trace(Q) + trace(L),
  };
};

const raw = { Q: cQ, u: cu, d: cd, L: cL, e: ce };
const base = massRecords(raw);
const bMinusLShift = 2.75;
const shifted = massRecords({
  Q: add(cQ, scale(bMinusLShift, identity)),
  u: add(cu, scale(bMinusLShift, identity)),
  d: add(cd, scale(bMinusLShift, identity)),
  L: add(cL, scale(-3 * bMinusLShift, identity)),
  e: add(ce, scale(-3 * bMinusLShift, identity)),
});

const tracelessFlavorDirection = [[1, 0.2, 0], [0.2, -1, 0.3], [0, 0.3, 0]];
const flavorShifted = massRecords({ ...raw, Q: add(cQ, tracelessFlavorDirection) });
const ctildeWW = cWW - base.A2 / 2;
const ctildeWWFlavorShifted = cWW - flavorShifted.A2 / 2;

const q = 2;
const ell = -1;
const familyUniversalA2 = 3 * trace(scale(q, identity)) + trace(scale(ell, identity));
const perFamilyA2 = 3 * q + ell;

const result = {
  protocol: "alp-three-generation-flavor-quotient-gate/1",
  date: "2026-10-25",
  targets: ["OT-047", "OT-048"],
  parent: "AZ-077",
  sourceConvention: {
    reference: "Bauer et al., arXiv:2012.12272v2, Eqs. (10), (11), and (41)-(43)",
    matrices: ["c_Q", "c_u", "c_d", "c_L", "c_e"],
    equations: [
      "k_D=V^dagger c_Q V",
      "C_u=c_u-c_Q",
      "C_d=c_d-k_D",
      "C_e=c_e-c_L",
      "A_2=Tr(3 c_Q+c_L)",
      "ctilde_WW=c_WW-A_2/2",
    ],
  },
  ckmTransportCertificate: {
    V,
    unitarityResidual: maxAbs(sub(multiply(transpose(V), V), identity)),
    traceBefore: trace(cQ),
    traceAfter: trace(base.kD),
    frobenius2Before: frobenius2(cQ),
    frobenius2After: frobenius2(base.kD),
    invariantsPreserved: close(trace(cQ), trace(base.kD)) && close(frobenius2(cQ), frobenius2(base.kD)),
    entriesChanged: !matrixClose(cQ, base.kD),
  },
  quotientCertificate: {
    correctedNullName: "completed B-L-type vector current, not baryon number alone",
    uniformMatrixShift: [1, 1, 1, -3, -3],
    shiftAmount: bMinusLShift,
    A2Before: base.A2,
    A2After: shifted.A2,
    massRecordsInvariant: matrixClose(base.Cu, shifted.Cu) && matrixClose(base.Cd, shifted.Cd) && matrixClose(base.Ce, shifted.Ce),
    weakAnomalyInvariant: close(base.A2, shifted.A2),
  },
  singletFlavorSplit: {
    realDimensionOfFiveHermitianThreeByThreeMatrices: 45,
    familySingletDimensions: 5,
    tracelessFlavorDimensions: 40,
    weakAnomalyRankOnCurrentMatrices: 1,
    weakAnomalyKernelDimension: 44,
    tracelessDirectionTrace: trace(tracelessFlavorDirection),
    A2Before: base.A2,
    A2AfterTracelessShift: flavorShifted.A2,
    ctildeWWBefore: ctildeWW,
    ctildeWWAfterTracelessShift: ctildeWWFlavorShifted,
    weakRecordBlind: close(ctildeWW, ctildeWWFlavorShifted),
    fermionRecordsChange: !matrixClose(base.Cu, flavorShifted.Cu) && !matrixClose(base.Cd, flavorShifted.Cd),
  },
  normalizationCertificate: {
    universalQCoefficient: q,
    universalLCoefficient: ell,
    perFamilyA2,
    threeFamilyTraceA2: familyUniversalA2,
    multiplicityRatio: familyUniversalA2 / perFamilyA2,
  },
  boundary: {
    closed: "The three-generation tree-level map splits exactly into five family-singlet coordinates and forty traceless flavor coordinates. CKM rotation transports the left-handed quark matrix without adding a coordinate, while the weak anomaly sees only Tr(3 c_Q+c_L).",
    correction: "The AZ-076 null vector (1,1,1,-3) is B-L-type, not baryon number. Baryon number alone is weak-anomalous and is not a null direction at fixed c_WW.",
    scope: "The corpus five-coordinate source quotient is a family-universal gauge-typed slice, not the complete 45-real-dimensional flavor-matrix current space. Its anomaly normalization must declare whether it is per-family or generation-summed; the latter is three times the former on a universal three-family source.",
    open: "Full gauge/Yukawa RG evolution, finite weak matching, covariance, and physical amplitudes remain necessary. Traceless flavor directions cannot be inferred from a bosonic weak record and require flavor-sensitive records.",
    nextCalculation: "Use the finite flavor-changing down-sector matching term as a candidate second record for c_WW, while profiling c_tt, k_U, ctilde_GG, CKM and hadronic uncertainties.",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, ...result }, null, 2));
