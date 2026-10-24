import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/five-coordinate-three-edge-factorial-gate-v1.json");
const values = [-1, 0, 1];
const signs = [-1, 1];
const labels = ["v_u", "v_d", "a_2"];
const parameters = {
  baseline: 100,
  linear: [2, -1, 0.5],
  kernel: [
    [9, -3, 6],
    [-3, 4, -4],
    [6, -4, 16]
  ]
};

const response = c => parameters.baseline
  + parameters.linear.reduce((sum, coefficient, i) => sum + coefficient * c[i], 0)
  + c.reduce((sum, ci, i) => sum + c.reduce((inner, cj, j) => inner + ci * parameters.kernel[i][j] * cj, 0), 0);
const key = c => c.join(",");
const grid = {};
for (const cu of values) for (const cd of values) for (const ca of values) {
  const c = [cu, cd, ca];
  grid[key(c)] = response(c);
}
const get = c => grid[key(c)];
const zero = [0, 0, 0];
const axis = (i, sign) => zero.map((_, j) => j === i ? sign : 0);
const pair = (i, j, si, sj) => zero.map((_, k) => k === i ? si : k === j ? sj : 0);

const extracted = {
  baseline: get(zero),
  linear: labels.map((_, i) => (get(axis(i, 1)) - get(axis(i, -1))) / 2),
  kernel: Array.from({ length: 3 }, () => Array(3).fill(0))
};
for (let i = 0; i < 3; i++) {
  extracted.kernel[i][i] = (get(axis(i, 1)) + get(axis(i, -1))) / 2 - extracted.baseline;
}
const pairResiduals = {};
for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
  const corners = signs.flatMap(si => signs.map(sj => ({ si, sj, value: get(pair(i, j, si, sj)) })));
  const fij = corners.reduce((sum, row) => sum + row.si * row.sj * row.value, 0) / 8;
  extracted.kernel[i][j] = fij;
  extracted.kernel[j][i] = fij;
  pairResiduals[`${labels[i]}:${labels[j]}`] = {
    evenCorner: corners.reduce((sum, row) => sum + row.value, 0) / 4
      - (extracted.baseline + extracted.kernel[i][i] + extracted.kernel[j][j]),
    linearFirst: corners.reduce((sum, row) => sum + row.si * row.value, 0) / 4 - extracted.linear[i],
    linearSecond: corners.reduce((sum, row) => sum + row.sj * row.value, 0) / 4 - extracted.linear[j]
  };
}

const determinant3 = matrix => matrix[0][0] * matrix[1][1] * matrix[2][2]
  + 2 * matrix[0][1] * matrix[0][2] * matrix[1][2]
  - matrix[0][0] * matrix[1][2] ** 2
  - matrix[1][1] * matrix[0][2] ** 2
  - matrix[2][2] * matrix[0][1] ** 2;
const pairMinor = (i, j) => extracted.kernel[i][i] * extracted.kernel[j][j] - extracted.kernel[i][j] ** 2;
const normalizedEdges = {
  "v_u:v_d": extracted.kernel[0][1] / Math.sqrt(extracted.kernel[0][0] * extracted.kernel[1][1]),
  "v_u:a_2": extracted.kernel[0][2] / Math.sqrt(extracted.kernel[0][0] * extracted.kernel[2][2]),
  "v_d:a_2": extracted.kernel[1][2] / Math.sqrt(extracted.kernel[1][1] * extracted.kernel[2][2])
};
const cycleProduct = extracted.kernel[0][1] * extracted.kernel[0][2] * extracted.kernel[1][2];

const fittedKeys = Object.keys(grid).filter(sample => sample.split(",").some(value => value === "0"));
const heldOutKeys = Object.keys(grid).filter(sample => sample.split(",").every(value => value !== "0"));
const prediction = c => extracted.baseline
  + extracted.linear.reduce((sum, coefficient, i) => sum + coefficient * c[i], 0)
  + c.reduce((sum, ci, i) => sum + c.reduce((inner, cj, j) => inner + ci * extracted.kernel[i][j] * cj, 0), 0);
const heldOutResiduals = Object.fromEntries(heldOutKeys.map(sample => {
  const c = sample.split(",").map(Number);
  return [sample, get(c) - prediction(c)];
}));

const rephasingAudit = [];
for (const su of signs) for (const sd of signs) for (const sa of signs) {
  const s = [su, sd, sa];
  const transformed = extracted.kernel.map((row, i) => row.map((entry, j) => s[i] * entry * s[j]));
  rephasingAudit.push({
    nodeSigns: { v_u: su, v_d: sd, a_2: sa },
    determinant: determinant3(transformed),
    edgeCycleProduct: transformed[0][1] * transformed[0][2] * transformed[1][2]
  });
}

const result = {
  protocol: "five-coordinate-three-edge-factorial-gate/1",
  date: "2026-10-25",
  targets: ["OT-047", "OT-048"],
  parent: "AZ-073",
  responseModel: "y(c)=B+sum_i L_i c_i+c^T F c, for c=(v_u,v_d,a_2)",
  factorialDesign: {
    fullGrid: "c_i in {-1,0,+1}",
    totalSamples: 27,
    fitSamples: fittedKeys.length,
    heldOutSamples: heldOutKeys.length,
    recoveredCoefficients: 10,
    pairPlaneClosureResiduals: 9,
    explanation: "The union of the three coordinate planes contains 19 settings: one origin, six signed axes and twelve signed pair corners. It identifies B, three linear terms and the six independent entries of symmetric F. The eight all-nonzero corners are held out to test the quadratic/no-three-way model.",
    pairFormula: "Fij=[y(+,+,0)-y(+,-,0)-y(-,+,0)+y(-,-,0)]/8, with the unused coordinate set to zero"
  },
  syntheticCertificate: {
    declaredParameters: parameters,
    extracted,
    pairResiduals,
    heldOutResiduals,
    normalizedEdges,
    positivity: {
      diagonalEntries: extracted.kernel.map((row, i) => row[i]),
      pairPrincipalMinors: {
        "v_u:v_d": pairMinor(0, 1),
        "v_u:a_2": pairMinor(0, 2),
        "v_d:a_2": pairMinor(1, 2)
      },
      determinant: determinant3(extracted.kernel),
      determinantFormula: "Fuu Fdd Faa+2 Fud Fua Fda-Fuu Fda^2-Fdd Fua^2-Faa Fud^2",
      positiveSemidefinitePass: extracted.kernel.every((row, i) => row[i] >= 0)
        && pairMinor(0, 1) >= 0 && pairMinor(0, 2) >= 0 && pairMinor(1, 2) >= 0
        && determinant3(extracted.kernel) >= 0
    },
    signedCycle: {
      edgeProduct: cycleProduct,
      sign: Math.sign(cycleProduct),
      nodeRephasingsChecked: rephasingAudit.length,
      determinantInvariant: rephasingAudit.every(row => row.determinant === determinant3(extracted.kernel)),
      cycleInvariant: rephasingAudit.every(row => row.edgeCycleProduct === cycleProduct)
    }
  },
  sourceNativeEvidence: {
    fermionEdge: {
      source: "Arias-Aragon et al., Production of Thermal Axions across the ElectroWeak Phase Transition, arXiv:2012.04736",
      url: "https://arxiv.org/abs/2012.04736",
      admittedStatement: "The published broken-phase analytic cross sections for t anti-b -> W+ a and crossed t W- -> b a / b W+ -> t a retain independent c_t and c_b dependence, including mixed c_t c_b terms.",
      limit: "The paper uses the amplitudes for thermal production and switches on operator families separately in its cosmological presentation; it is not a collider likelihood or a three-source response table."
    },
    topWeakTopology: {
      source: "Hosseini and Mohammadi Najafabadi, Exploring Axion-Like Particle Couplings through Single Top tW-Channel and Top Pair Production at the LHC, arXiv:2408.11588",
      url: "https://arxiv.org/abs/2408.11588",
      admittedStatement: "Associated t W a production contains top-like and W-emission topologies in one final-state family.",
      limit: "The published analysis does not provide the signed bottom/top/W three-coefficient kernel; topology alone does not establish surviving pairwise interference."
    }
  },
  oneFamilyCandidate: {
    amplitudeFamily: ["t anti-b -> W+ a", "t W- -> b a", "b W+ -> t a", "t -> b W+ a (crossed, where kinematically open)"],
    exactStatus: "The c_t-c_b edge is source-native in the fermionic broken-phase calculation. A joint c_t-c_b-c_W amplitude and all three interference entries have not been published or computed here.",
    requiredCalculation: "Implement one gauge-consistent broken-phase model with independent signed c_t, c_b and c_W definitions; evaluate the 27 settings on common phase-space points; fit the 19 coordinate-plane settings and predict the eight all-nonzero settings before detector profiling.",
    killTests: [
      "any nominal edge vanishes after helicity, colour, CP and phase-space integration",
      "gauge completion removes the apparent separation of the three coefficients",
      "the 19-point fit fails any of the nine pair-plane closure residuals",
      "the eight held-out corners reveal higher-order or implementation dependence",
      "the fitted symmetric kernel violates a principal-minor or determinant positivity condition",
      "detector and nuisance folding erase an edge needed for the triangle"
    ]
  },
  interpretation: {
    jordanJob: "The completed symmetric response kernel asks whether all three self- and cross-responses can coexist inside one positive cone; its determinant is a global condition not supplied by the pairwise bounds alone.",
    lieJob: "Signed basis changes transport the three source directions by F -> S F S without changing the determinant or the cycle product.",
    middle: "One process family would make admission and transport refer to the same event record. It would reduce the cross-scale bridge from an identification necessity to an external validation route.",
    nonClaim: "This ordinary 3x3 positive response matrix is not evidence for a magical J3 algebra, E8, or a fundamental three-source law."
  },
  verdict: {
    closed: "A finite 27-setting protocol now extracts the full signed three-source quadratic kernel with 19 fit settings, nine internal pair-plane residuals and eight held-out three-source predictions. The determinant and cycle product are invariant under all eight node sign conventions.",
    newlyLocated: "The published W-associated broken-phase axion amplitudes supply a source-native top-bottom interference edge in the same broad electroweak process family as the top/W topology.",
    open: "No source-native c_t-c_b-c_W kernel, surviving bottom-W edge, detector-level triangle or signed map to the corpus five-coordinate basis has been computed.",
    nextCalculation: "Generate the gauge-complete W-associated three-source amplitude and run the 27 settings. Only then decide whether the triangle exists; retain B_c decay as a low-energy validation arm rather than a necessary sign-identification bridge."
  }
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, design: result.factorialDesign, certificate: result.syntheticCertificate }, null, 2));
