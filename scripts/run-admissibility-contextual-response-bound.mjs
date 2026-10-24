import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/admissibility-contextual-response-bound-v1.json");

const realDeterminant = r => 1 + 2 * r ** 3 - 3 * r ** 2;
const phaseDeterminant = (rho, phase) => 1 - 3 * rho ** 2 + 2 * rho ** 3 * Math.cos(phase);
const rho = 0.6;
const saturationCosine = (3 * rho ** 2 - 1) / (2 * rho ** 3);
const saturationPhase = Math.acos(saturationCosine);
const phaseRows = Array.from({ length: 17 }, (_, i) => {
  const phase = Math.PI * i / 16;
  const determinant = phaseDeterminant(rho, phase);
  return { phase, phaseOverPi: phase / Math.PI, pairwiseMinor: 1 - rho ** 2, determinant, globallyPositiveSemidefinite: determinant >= -1e-12 };
});
const realRows = [-0.75, -0.5, -0.25, 0, 0.5, 1].map(r => ({ r, pairwiseMinor: 1 - r ** 2, determinant: realDeterminant(r), globallyPositiveSemidefinite: r >= -0.5 && r <= 1 }));

const result = {
  protocol: "admissibility-contextual-response-bound/1",
  date: "2026-10-25",
  target: "OT-018",
  family: {
    matrix: "R=[[1,a,b*],[a*,1,c],[b,c*,1]]",
    assumptions: ["Hermitian normalized three-port response", "each two-port principal block passive/positive", "one joint response matrix represents all three contexts"],
    pairwiseEnvelope: "|a|<=1, |b|<=1, |c|<=1",
    globalTriangleInequality: "det(R)=1-|a|^2-|b|^2-|c|^2+2 Re(a c b*) >= 0",
    gaugeInvariantContextPhase: "Phi=arg(a c b*)",
  },
  realEqualCorrelation: {
    formula: "det(R)=(1-r)^2(1+2r)",
    pairwiseAllowed: "-1<=r<=1",
    globallyAllowed: "-1/2<=r<=1",
    counterexample: { r: -0.75, pairwiseMinor: 1 - 0.75 ** 2, determinant: realDeterminant(-0.75) },
    saturation: { r: -0.5, determinant: realDeterminant(-0.5), nullVector: [1, 1, 1] },
    rows: realRows,
  },
  equalMagnitudePhaseFamily: {
    magnitude: rho,
    determinant: "1-3 rho^2+2 rho^3 cos(Phi)",
    pairwiseMinor: 1 - rho ** 2,
    positivityRequires: `cos(Phi)>=${saturationCosine}`,
    saturationPhase,
    saturationPhaseOverPi: saturationPhase / Math.PI,
    admittedPrincipalWindow: `|Phi|<=${saturationPhase} modulo 2 pi`,
    rows: phaseRows,
  },
  audit: {
    apparentAdvance: "Joint contextual composition is strictly stronger than checking all pairwise two-port responses.",
    reduction: "For a 3x3 Hermitian matrix, nonnegative diagonal entries, nonnegative 2x2 principal minors and the displayed determinant inequality are exactly the principal-minor criterion for positive semidefiniteness.",
    basisIndependence: "The determinant and loop phase a c b* are invariant under independent rephasing of the three ports.",
    noveltyVerdict: "The triangle bound is not stronger than standard positivity/passivity of the full response; it is the missing 3x3 positivity condition written in contextual coordinates.",
  },
  nextSearch: {
    requirement: "A successful OT-018 inequality must exclude at least one full positive causal response, not merely a collection of pairwise-positive blocks that fails to assemble into one positive matrix.",
    candidateDirections: ["cross-frequency joint realizability", "shared-environment complete positivity across interventions", "composition across independently calibrated detector contexts", "uniform continuum or relaxation bounds not implied pointwise"],
  },
  verdict: {
    pairwiseToGlobalGap: "exact_and_saturating",
    contextualTriangleCandidate: "closed_as_standard_full_matrix_positivity",
    topicStatus: "open_with_natural_candidate_killed",
    physicalFirewall: "The calculation supplies a useful global consistency test but no new law of physics and no inequality beyond standard positivity.",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, realCounterexample: result.realEqualCorrelation.counterexample, phaseSaturation: { cosine: saturationCosine, phase: saturationPhase, phaseOverPi: saturationPhase / Math.PI }, verdict: result.verdict }, null, 2));
