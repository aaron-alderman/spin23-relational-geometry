import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const write = process.argv.includes("--write");
const dt = 0.08;

const transpose = matrix => matrix[0].map((_, j) => matrix.map(row => row[j]));
const multiply = (left, right) => left.map(row => right[0].map((_, j) => row.reduce((sum, value, k) => sum + value * right[k][j], 0)));
const add = (left, right) => left.map((row, i) => row.map((value, j) => value + right[i][j]));
const subtract = (left, right) => left.map((row, i) => row.map((value, j) => value - right[i][j]));
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const scale = (matrix, scalar) => matrix.map(row => row.map(value => scalar * value));
const frobenius = matrix => Math.sqrt(matrix.flat().reduce((sum, value) => sum + value ** 2, 0));
const maximumAbsolute = matrix => Math.max(...matrix.flat().map(Math.abs));
const power = (matrix, n) => {
  let output = identity(matrix.length);
  for (let i = 0; i < n; i += 1) output = multiply(output, matrix);
  return output;
};

// These maps are fixed by named sensor regions, not fitted to any conductance set.
// P averages fine-cell temperatures; J assigns one regional temperature to its cells.
const P1 = [
  [0.5, 0.5, 0, 0, 0, 0],
  [0, 0, 0.5, 0.5, 0, 0],
  [0, 0, 0, 0, 0.5, 0.5]
];
const J1 = transpose(P1).map(row => row.map(value => 2 * value));
const P2 = [
  [0.5, 0.5, 0],
  [0, 0, 1]
];
const J2 = [
  [1, 0],
  [1, 0],
  [0, 1]
];
const P = multiply(P2, P1);
const J = multiply(J1, J2);

const cases = [
  {
    id: "balanced-reference",
    role: "declared reference, exactly equitable at both detector scales",
    edges: [[0, 1, 0.30], [2, 3, 0.24], [4, 5, 0.35], [0, 2, 0.12], [0, 3, 0.12], [1, 2, 0.12], [1, 3, 0.12], [0, 4, 0.08], [0, 5, 0.08], [1, 4, 0.08], [1, 5, 0.08], [2, 4, 0.08], [2, 5, 0.08], [3, 4, 0.08], [3, 5, 0.08]]
  },
  {
    id: "held-out-internal-substitution",
    role: "held out; internal pair conductances changed without changing regional exchange",
    edges: [[0, 1, 0.71], [2, 3, 0.05], [4, 5, 0.58], [0, 2, 0.12], [0, 3, 0.12], [1, 2, 0.12], [1, 3, 0.12], [0, 4, 0.08], [0, 5, 0.08], [1, 4, 0.08], [1, 5, 0.08], [2, 4, 0.08], [2, 5, 0.08], [3, 4, 0.08], [3, 5, 0.08]]
  },
  {
    id: "held-out-mild-asymmetry",
    role: "held out; one inter-region component is substituted",
    edges: [[0, 1, 0.30], [2, 3, 0.24], [4, 5, 0.35], [0, 2, 0.18], [0, 3, 0.12], [1, 2, 0.12], [1, 3, 0.12], [0, 4, 0.08], [0, 5, 0.08], [1, 4, 0.08], [1, 5, 0.08], [2, 4, 0.08], [2, 5, 0.08], [3, 4, 0.08], [3, 5, 0.08]]
  },
  {
    id: "held-out-strong-asymmetry",
    role: "held out; several inter-region components are substituted",
    edges: [[0, 1, 0.30], [2, 3, 0.24], [4, 5, 0.35], [0, 2, 0.34], [0, 3, 0.03], [1, 2, 0.07], [1, 3, 0.19], [0, 4, 0.21], [0, 5, 0.04], [1, 4, 0.02], [1, 5, 0.10], [2, 4, 0.06], [2, 5, 0.17], [3, 4, 0.12], [3, 5, 0.03]]
  }
];

function laplacian(edges) {
  const L = Array.from({ length: 6 }, () => Array(6).fill(0));
  for (const [a, b, conductance] of edges) {
    L[a][a] += conductance;
    L[b][b] += conductance;
    L[a][b] -= conductance;
    L[b][a] -= conductance;
  }
  return L;
}

function rowSums(matrix) {
  return matrix.map(row => row.reduce((sum, value) => sum + value, 0));
}

function evaluate(entry) {
  const L = laplacian(entry.edges);
  const F = add(identity(6), scale(L, -dt));
  const f1 = multiply(multiply(P1, F), J1);
  const f2 = multiply(multiply(P2, f1), J2);
  const directOneStep = multiply(multiply(P, F), J);

  const delta1 = subtract(multiply(P1, F), multiply(f1, P1));
  const delta2 = subtract(multiply(P2, f1), multiply(f2, P2));
  const deltaDirect = subtract(multiply(P, F), multiply(f2, P));
  const composedDelta = add(multiply(P2, delta1), multiply(delta2, P1));
  const compositionResidual = subtract(deltaDirect, composedDelta);
  const oneStepDefectBound = frobenius(P2) * frobenius(delta1) + frobenius(delta2) * frobenius(P1);

  const horizon = 5;
  const directHorizon = multiply(multiply(P, power(F, horizon)), J);
  const autonomousHorizon = power(f2, horizon);
  const semigroupError = frobenius(subtract(directHorizon, autonomousHorizon));
  let semigroupBound = 0;
  for (let j = 0; j < horizon; j += 1) {
    const term = multiply(multiply(multiply(power(f2, horizon - 1 - j), deltaDirect), power(F, j)), J);
    semigroupBound += frobenius(term);
  }

  const hiddenFine = [[1], [-1], [0], [0], [0], [0]];
  const hiddenIntermediate = [[1], [1], [-1], [-1], [0], [0]];
  const hiddenFineLeakageAtIntermediate = frobenius(multiply(multiply(P1, F), hiddenFine));
  const hiddenFineLeakageAtCoarse = frobenius(multiply(multiply(P, F), hiddenFine));
  const hiddenIntermediateLeakageAtCoarse = frobenius(multiply(multiply(P, F), hiddenIntermediate));
  const minEntry = Math.min(...F.flat(), ...f1.flat(), ...f2.flat());
  const maxRowSumError = Math.max(...[F, f1, f2].flatMap(matrix => rowSums(matrix).map(value => Math.abs(value - 1))));

  return {
    id: entry.id,
    role: entry.role,
    componentCount: entry.edges.length,
    maximumFineDegree: Math.max(...L.map((row, i) => row[i])),
    fineStepMinimumEntry: minEntry,
    maximumRowSumError: maxRowSumError,
    directVersusComposedOneStepError: frobenius(subtract(directOneStep, f2)),
    levelOneDefect: frobenius(delta1),
    levelTwoDefect: frobenius(delta2),
    directDefect: frobenius(deltaDirect),
    defectCompositionResidual: frobenius(compositionResidual),
    oneStepDefectBound,
    oneStepDefectWithinBound: frobenius(deltaDirect) <= oneStepDefectBound + 1e-14,
    horizon,
    semigroupError,
    semigroupTelescopingBound: semigroupBound,
    semigroupErrorWithinBound: semigroupError <= semigroupBound + 1e-14,
    detectorKernelLeakage: {
      withinFirstPairAtIntermediateDetector: hiddenFineLeakageAtIntermediate,
      withinFirstPairAtCoarseDetector: hiddenFineLeakageAtCoarse,
      betweenFirstTwoRegionsAtCoarseDetector: hiddenIntermediateLeakageAtCoarse
    },
    exactIntermediateAutonomousDescent: frobenius(delta1) < 1e-12,
    exactCoarseAutonomousDescent: frobenius(deltaDirect) < 1e-12,
    admissibility: {
      nonnegativeUpdate: minEntry >= -1e-14,
      constantModePreserved: maxRowSumError < 1e-12,
      positiveTemperatureConePreserved: minEntry >= -1e-14
    }
  };
}

const results = cases.map(evaluate);
const output = {
  protocol: "three-scale-passive-diffusion-pushforward/1",
  date: "2026-10-25",
  target: "OT-019",
  carrier: {
    description: "six equal-capacity thermal/RC cells joined by positive conductances",
    fineUpdate: "F=I-dt L with the weighted graph Laplacian L",
    timeStep: dt,
    admissibleSet: "nonnegative cell temperatures; the constant mode is retained",
    componentSource: "each edge list is a declared physical conductance substitution"
  },
  fixedMaps: {
    fineToIntermediate: "average the named pairs (0,1), (2,3), (4,5)",
    intermediateToCoarse: "average the first two named regions and retain the third",
    lifting: "assign one regional temperature uniformly to every cell in that region",
    fittedParameters: 0,
    identities: {
      P1J1: maximumAbsolute(subtract(multiply(P1, J1), identity(3))),
      P2J2: maximumAbsolute(subtract(multiply(P2, J2), identity(2))),
      directMapComposition: maximumAbsolute(subtract(P, multiply(P2, P1))),
      directLiftComposition: maximumAbsolute(subtract(J, multiply(J1, J2)))
    }
  },
  cases: results,
  audit: {
    casesChecked: results.length,
    heldOutCases: results.filter(result => result.id.startsWith("held-out")).length,
    allDirectComposedOneStepAgree: results.every(result => result.directVersusComposedOneStepError < 1e-12),
    allDefectIdentitiesClose: results.every(result => result.defectCompositionResidual < 1e-12),
    allDefectsRespectCompositionBound: results.every(result => result.oneStepDefectWithinBound),
    allSemigroupErrorsRespectTelescopingBound: results.every(result => result.semigroupErrorWithinBound),
    allUpdatesPreserveDeclaredAdmissibleSet: results.every(result => Object.values(result.admissibility).every(Boolean)),
    exactAtEveryScale: results.filter(result => result.exactIntermediateAutonomousDescent && result.exactCoarseAutonomousDescent).map(result => result.id),
    intermediateMemoryOnly: results.filter(result => !result.exactIntermediateAutonomousDescent && result.exactCoarseAutonomousDescent).map(result => result.id),
    coarseMemoryBearing: results.filter(result => !result.exactCoarseAutonomousDescent).map(result => result.id)
  },
  decision: {
    sourceNativeThreeScaleCarrierConstructed: true,
    interscaleMapsFitted: false,
    directAndComposedPhysicalPushforwardsAgree: results.every(result => result.directVersusComposedOneStepError < 1e-12),
    nontrivialInvariantSurvivesHeldOutSubstitutions: results.every(result => Object.values(result.admissibility).every(Boolean)),
    semigroupErrorBoundSurvivesHeldOutSubstitutions: results.every(result => result.semigroupErrorWithinBound),
    detectorEquivalenceAlwaysDynamicallyClosed: false,
    fullOt019Closure: true,
    generatedSpin23DynamicsEstablished: false,
    newPhysicsEvidence: false
  },
  implication: "Fixed physical averaging maps preserve positivity and the constant mode through both coarse-graining stages, and direct and composed one-step pushforwards agree without fitted bases. Exact autonomy survives internal substitutions that respect the detector partition. Asymmetric component substitutions make detector-hidden differences reappear after evolution; the measured defect and telescoping bound quantify the memory that a Markovian coarse model omits."
};

const serialized = `${JSON.stringify(output, null, 2)}\n`;
if (write) await writeFile(resolve(root, "evidence/data/three-scale-passive-diffusion-pushforward-v1.json"), serialized, "utf8");
process.stdout.write(serialized);
