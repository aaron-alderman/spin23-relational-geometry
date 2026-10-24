import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const running = JSON.parse(await readFile(resolve(root, "evidence/data/five-coordinate-running-window-v1.json"), "utf8"));
const outputPath = resolve(root, "evidence/data/five-coordinate-observable-resolution-gate-v1.json");
const ratios = running.rows.map(row => ({ muGeV: row.muGeV, secondToFirst: row.relativeSpectrum[1] }));
const minimumRatio = Math.min(...ratios.map(row => row.secondToFirst));
const maximumRatio = Math.max(...ratios.map(row => row.secondToFirst));
const significanceTargets = [1, 3, 5].map(sigma => ({
  sigma,
  maximumCombinedRelativeOneSigmaForDetectionAcrossWindow: minimumRatio / sigma,
  maximumCombinedPpmForDetectionAcrossWindow: 1e6 * minimumRatio / sigma,
  equalTheoryAndDetectorBudgetPpmEach: 1e6 * minimumRatio / (sigma * Math.sqrt(2)),
}));
const rankOneTolerance = 1e-2;
const rankOneThreeSigmaBudget = (rankOneTolerance - maximumRatio) / 3;
const leakageAngles = [1, 0.1, 1 / 3].map(maximumLeakageRelativeToSecondMode => ({
  maximumLeakageRelativeToSecondMode,
  angleRangeDegrees: [minimumRatio, maximumRatio].map(ratio => 180 * Math.atan(Math.sqrt(maximumLeakageRelativeToSecondMode * ratio)) / Math.PI),
}));

const incidence = { v_u: 10, v_d: 6, a_2: 16 };
const nodes = Object.keys(incidence);
const edges = [["v_u", "v_d"], ["v_u", "a_2"], ["v_d", "a_2"]].map(([left, right]) => {
  const a = incidence[left], b = incidence[right];
  return { left, right, normalizedSignedContrast: 2 * a * b / (a ** 2 + b ** 2) };
});
const signIncidenceRank = selectedEdges => {
  // Fixing one global sign leaves two relative sign bits.  Edge rows are the
  // oriented incidence matrix with the reference-node column removed.
  const reference = nodes[0];
  const rows = selectedEdges.map(({ left, right }) => nodes.slice(1).map(node => Number(node === left) - Number(node === right)));
  if (!rows.length) return 0;
  if (rows.length === 1) return rows[0].some(Boolean) ? 1 : 0;
  return Math.abs(rows[0][0] * rows[1][1] - rows[0][1] * rows[1][0]) > 1e-12 ? 2 : 1;
};
const pairs = edges.flatMap((edge, i) => edges.slice(i + 1).map(other => [edge, other]));
const interferenceGate = {
  amplitudes: nodes,
  independentRelativeSignsAfterGlobalConvention: 2,
  singleEdgeRanks: edges.map(edge => ({ edge: [edge.left, edge.right], rank: signIncidenceRank([edge]) })),
  spanningTrees: pairs.filter(pair => signIncidenceRank(pair) === 2).map(pair => pair.map(edge => [edge.left, edge.right])),
  edgeContrastsAtDeduplicatedIncidencePoint: edges,
  conclusion: "Rates leave two independent relative sign bits. One interference edge fixes only one. A connected two-edge spanning tree is the minimum independent phase record for the signed relation a_2=v_u+v_d.",
};

// Linear error propagation for two idealized visible-coordinate designs at
// one-percent independent amplitude precision.  These are design diagnostics,
// not forecasts for any named experiment.
const relativeAmplitudeError = 1e-2;
const directResidualSigma = Math.hypot(
  incidence.v_u * relativeAmplitudeError,
  incidence.v_d * relativeAmplitudeError,
  incidence.a_2 * relativeAmplitudeError,
);
// With P=48 vu+12 vd+36 ve-18 a2, R=a2-vu-vd
// becomes (30 vu-6 vd+36 ve-P)/18.
const ve = 2;
const P = 48 * incidence.v_u + 12 * incidence.v_d + 36 * ve - 18 * incidence.a_2;
const matchedResidualSigma = Math.hypot(
  30 * incidence.v_u * relativeAmplitudeError,
  6 * incidence.v_d * relativeAmplitudeError,
  36 * ve * relativeAmplitudeError,
  P * relativeAmplitudeError,
) / 18;

const result = {
  protocol: "five-coordinate-observable-resolution-gate/1",
  date: "2026-10-25",
  targets: ["OT-047", "OT-048"],
  parent: "AZ-070",
  sourceWindow: { protocol: running.protocol, ratios, minimumRatio, maximumRatio },
  significanceTargets,
  rankOneCertification: {
    tolerance: rankOneTolerance,
    maximumCombinedRelativeOneSigmaForThreeSigmaCertificationAcrossWindow: rankOneThreeSigmaBudget,
    maximumCombinedPpm: 1e6 * rankOneThreeSigmaBudget,
  },
  modeAlignment: {
    model: "leading-mode leakage into a nominal second-mode power measurement obeys leakage/second=tan(theta)^2/(lambda_2/lambda_1)",
    leakageAngles,
  },
  interferenceGate,
  idealizedOnePercentAmplitudeDesigns: {
    directRows: { rows: ["T", "B", "L", "W"], incidenceResidualOneSigma: directResidualSigma },
    sourceMatchedRows: { rows: ["T", "B", "L", "P"], photonMatchingAmplitudeAtPoint: P, incidenceResidualOneSigma: matchedResidualSigma },
    firewall: "Independent Gaussian amplitude errors are assumed. Real process maps, theory errors and shared detector covariance can only be supplied by a source-native likelihood.",
  },
  conclusions: {
    secondModeDetection: "A one-per-mille total uncertainty is insufficient for a three-sigma detection throughout the running window; the combined one-sigma floor must be below about 440 ppm.",
    percentRankOneCertification: "The weaker statement that the response is below one-percent operational rank needs a combined one-sigma budget below about 0.279 percent for a three-sigma window-wide certificate.",
    signedRelation: interferenceGate.conclusion,
    physicalFirewall: "This packet designs the information and precision boundary. It does not identify a real process that realizes the external source rows or supply electroweak matching.",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, significanceTargets, rankOneThreeSigmaBudget, leakageAngles, interferenceGate }, null, 2));
