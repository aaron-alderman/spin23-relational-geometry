import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/five-coordinate-phase-edge-extraction-gate-v1.json");

const signs = [-1, 1];
const parameters = {
  baseline: 100,
  linearI: 2,
  linearJ: -1,
  diagonalI: 9,
  diagonalJ: 4,
  interference: -3,
};
const response = (ci, cj) => parameters.baseline
  + parameters.linearI * ci
  + parameters.linearJ * cj
  + parameters.diagonalI * ci ** 2
  + 2 * parameters.interference * ci * cj
  + parameters.diagonalJ * cj ** 2;

const samples = {};
for (const ci of [-1, 0, 1]) {
  for (const cj of [-1, 0, 1]) samples[`${ci},${cj}`] = response(ci, cj);
}
const get = (ci, cj) => samples[`${ci},${cj}`];
const corners = signs.flatMap(ci => signs.map(cj => ({ ci, cj, value: get(ci, cj) })));
const extracted = {
  baseline: get(0, 0),
  linearI: (get(1, 0) - get(-1, 0)) / 2,
  linearJ: (get(0, 1) - get(0, -1)) / 2,
  diagonalI: (get(1, 0) + get(-1, 0)) / 2 - get(0, 0),
  diagonalJ: (get(0, 1) + get(0, -1)) / 2 - get(0, 0),
  interference: corners.reduce((sum, row) => sum + row.ci * row.cj * row.value, 0) / 8,
};
const closureResiduals = {
  evenCorner: corners.reduce((sum, row) => sum + row.value, 0) / 4
    - (extracted.baseline + extracted.diagonalI + extracted.diagonalJ),
  linearI: corners.reduce((sum, row) => sum + row.ci * row.value, 0) / 4 - extracted.linearI,
  linearJ: corners.reduce((sum, row) => sum + row.cj * row.value, 0) / 4 - extracted.linearJ,
};
const rho = extracted.interference / Math.sqrt(extracted.diagonalI * extracted.diagonalJ);

const edgeSigns = { "v_u:v_d": -1, "v_u:a_2": 1, "v_d:a_2": -1 };
const cycleProduct = values => values["v_u:v_d"] * values["v_u:a_2"] * values["v_d:a_2"];
const rephasingAudit = [];
for (const su of signs) for (const sd of signs) for (const sa of signs) {
  const transformed = {
    "v_u:v_d": su * sd * edgeSigns["v_u:v_d"],
    "v_u:a_2": su * sa * edgeSigns["v_u:a_2"],
    "v_d:a_2": sd * sa * edgeSigns["v_d:a_2"],
  };
  rephasingAudit.push({ nodeSigns: { v_u: su, v_d: sd, a_2: sa }, cycleProduct: cycleProduct(transformed) });
}

const result = {
  protocol: "five-coordinate-phase-edge-extraction-gate/1",
  date: "2026-10-25",
  targets: ["OT-047", "OT-048"],
  parent: "AZ-072",
  quadraticModel: "y(ci,cj)=B+Li ci+Lj cj+Fii ci^2+2Fij ci cj+Fjj cj^2",
  signSafeDesign: {
    grid: "ci,cj in {-1,0,+1}",
    samplesRequired: 9,
    coefficientsRecovered: ["B", "Li", "Lj", "Fii", "Fij", "Fjj"],
    independentClosureResiduals: 3,
    formulas: {
      interference: "Fij=[y(+,+)-y(+,-)-y(-,+)+y(-,-)]/8",
      diagonalI: "Fii=[y(+,0)+y(-,0)]/2-y(0,0)",
      diagonalJ: "Fjj=[y(0,+)+y(0,-)]/2-y(0,0)",
      linearI: "Li=[y(+,0)-y(-,0)]/2",
      linearJ: "Lj=[y(0,+)-y(0,-)]/2"
    },
    equalIndependentSampleNoise: {
      interferenceOneSigmaFactor: 0.25,
      statement: "If every corner has independent one-sigma noise s, sigma(Fij)=s/4. Correlated common-random-number generation must use the full signed covariance rather than this shortcut."
    },
    pureQuadraticShortcut: {
      condition: "B is subtracted and Li=Lj=0 is established for the signal definition",
      additionalMixedSamplesAfterBaselineAndAxes: 2,
      samples: ["(+,+)", "(+,-)"],
      formula: "Fij=[y(+,+)-y(+,-)]/4"
    }
  },
  syntheticCertificate: {
    declaredParameters: parameters,
    samples,
    extracted,
    closureResiduals,
    normalizedInterference: rho,
    positivityBound: "|Fij|<=sqrt(Fii Fjj)",
    positivityPass: Math.abs(rho) <= 1
  },
  paperConventionMap: {
    heavyMesonEquation13: "Gamma=cQ^2 GammaQ/fa^2+cq^2 Gammaq/fa^2+cQ cq GammaQq/fa^2",
    canonicalMap: "FQQ=GammaQ, Fqq=Gammaq, FQq=GammaQq/2",
    sourceNativeStatus: "The paper supplies the polynomial form and reports sizeable negative quark interference in its illustrated B channel, but does not publish the B_c differential coefficient table or its covariance."
  },
  processActions: [
    {
      edge: ["v_u", "v_d"],
      process: "B_c -> l nu a",
      minimumAction: "Evaluate the two constituent-line amplitudes on the same phase-space points and publish Fcc, Fbb and Fcb=Gamma_cb/2 bin by bin with form-factor covariance.",
      admission: "Fcb is nonzero after acceptance, obeys the positive-semidefinite bound in every declared bin or covariance block, and resolves a relative-sign branch in a joint fit."
    },
    {
      edge: ["v_u", "a_2"],
      process: "pp -> t W a",
      minimumAction: "Retain the existing one-coefficient samples, add both mixed-sign samples for the pure quadratic shortcut, and use the full nine-point design if linear or baseline terms are not proved absent.",
      admission: "The extracted top/weak Fij is nonzero after cuts, is not nuisance-collinear, and reproduces held-out coupling points."
    }
  ],
  graphAudit: {
    spanningTree: {
      edgesRequired: 2,
      identifies: "two relative coefficient-sign bits after process-template signs and one global node convention are fixed",
      cannotDo: "provide an internal convention-independent check of the cross-scale transport"
    },
    cycle: {
      edgesRequired: 3,
      invariant: "sign(F_ud F_ua F_da)",
      declaredEdgeSigns: edgeSigns,
      cycleProduct: cycleProduct(edgeSigns),
      nodeRephasingsChecked: rephasingAudit.length,
      invariantUnderAllNodeRephasings: rephasingAudit.every(row => row.cycleProduct === cycleProduct(edgeSigns)),
      purpose: "A third process edge is a validation channel: its cycle product is unchanged by independent sign redefinitions of v_u, v_d and a_2 and can therefore expose a mismatched transport convention."
    }
  },
  scaleTransportContract: {
    coefficientMap: "c_low=M c_high",
    quadraticKernelMap: "F_high=M^T F_low M",
    covarianceMap: "C_low=J C_high J^T, with threshold and nuisance blocks retained",
    requiredLedger: [
      "operator definitions and signs at both endpoints",
      "renormalization scheme and scale",
      "RG evolution matrix",
      "electroweak threshold matching matrix",
      "hadronic matching and form-factor convention",
      "Jacobian and full covariance, including shared nuisances"
    ]
  },
  verdict: {
    closed: "The finite signed-sample design, extraction formulas, positivity test, quadratic closure residuals and tree-versus-cycle distinction are exact.",
    open: "No source-native B_c coefficient table, tW top/weak cross term, third validation edge or phase-preserving threshold matrix has yet been computed.",
    nextCalculation: "Run the signed design first for tW+a and the common-phase-space amplitude decomposition for B_c; publish the kernels before attempting the joined likelihood."
  }
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, extracted, closureResiduals, rho, graphAudit: result.graphAudit }, null, 2));
