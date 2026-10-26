import assert from "node:assert/strict";
import fs from "node:fs";

const load = name => JSON.parse(fs.readFileSync(new URL(`../../evidence/data/${name}`, import.meta.url), "utf8"));
const arm = load("translation-free-exceptional-topology-arm-v1.json");
const leechRecord = load("leech-explicit-k-matrix-v1.json");
const e8Wire = load("translation-free-e8-coupled-wire-tomography-v1.json");
const e8Clock = load("translation-free-e8-few-body-clock-gap-v1.json");
const e8Rotor = load("translation-free-e8-clock-to-rotor-convergence-v1.json");
const e8Metric = load("translation-free-e8-constitutive-metric-gate-v1.json");
const e8Shell = load("translation-free-e8-adaptive-shell-solver-plan-v1.json");
const e8Recon = load("translation-free-e8-joined-rotor-cutoff-recon-v1.json");
const e8Davidson = load("translation-free-e8-restarted-davidson-v1.json");
const e8Operator = load("translation-free-e8-operator-completeness-gate-v1.json");
const e8Shell10 = load("translation-free-e8-cartan-shell10-spectroscopy-v1.json");
const e8CompactGap = load("translation-free-e8-cartan-compact-gap-v1.json");
const e8RatioSpine = load("translation-free-e8-cartan-ratio-spine-v1.json");
const e8AmplitudePerturbation = load("translation-free-e8-channel-amplitude-perturbation-v1.json");
const e8AmplitudeStencil = load("translation-free-e8-channel-amplitude-stencil-v1.json");
const e8MetricPerturbation = load("translation-free-e8-kinetic-metric-perturbation-v1.json");
const e8MixedCorner = load("translation-free-e8-mixed-perturbation-corner-v1.json");
const e8TwoCell = load("translation-free-e8-two-cell-projected-coupling-v1.json");
const e8TwoCellRoots = load("translation-free-e8-two-cell-root-count-audit-v1.json");
const e8ChainGrid = load("translation-free-e8-projected-chain-width-root-grid-v1.json");
const e8BoundaryComparison = load("translation-free-e8-projected-chain-boundary-comparison-v1.json");
const e8Dictionary = load("translation-free-e8-local-operator-dictionary-r8-v1.json");
const quasicrystal = load("translation-free-e8-quasicrystal-backplane-bridge-v1.json");

const E8 = [
  [2,-1,0,0,0,0,0,0],
  [-1,2,-1,0,0,0,0,0],
  [0,-1,2,-1,0,0,0,-1],
  [0,0,-1,2,-1,0,0,0],
  [0,0,0,-1,2,-1,0,0],
  [0,0,0,0,-1,2,-1,0],
  [0,0,0,0,0,-1,2,0],
  [0,0,-1,0,0,0,0,2]
];

const detBareiss = matrix => {
  const a = matrix.map(row => row.map(BigInt));
  let sign = 1n;
  let previous = 1n;
  for (let k = 0; k < a.length - 1; k++) {
    if (a[k][k] === 0n) {
      const pivot = a.findIndex((row, i) => i > k && row[k] !== 0n);
      assert.notEqual(pivot, -1, "singular matrix");
      [a[k], a[pivot]] = [a[pivot], a[k]];
      sign *= -1n;
    }
    const current = a[k][k];
    for (let i = k + 1; i < a.length; i++) {
      for (let j = k + 1; j < a.length; j++) {
        a[i][j] = (a[i][j] * current - a[i][k] * a[k][j]) / previous;
      }
    }
    previous = current;
  }
  return sign * a.at(-1).at(-1);
};

const leadingMinor = (matrix, n) => matrix.slice(0,n).map(row => row.slice(0,n));
const assertPositiveDefiniteIntegralForm = matrix => {
  assert.ok(matrix.every((row,i) => row.length === matrix.length && row.every((x,j) => Number.isInteger(x) && x === matrix[j][i])));
  for (let n = 1; n <= matrix.length; n++) assert.ok(detBareiss(leadingMinor(matrix,n)) > 0n, `leading minor ${n}`);
};

const blockDiagonal = (matrix, copies) => {
  const n = matrix.length;
  return Array.from({length:n*copies}, (_,i) => Array.from({length:n*copies}, (_,j) => {
    if (Math.floor(i/n) !== Math.floor(j/n)) return 0;
    return matrix[i%n][j%n];
  }));
};

assert.equal(arm.schemaVersion, "translation-free-exceptional-topology-arm-v1");
assertPositiveDefiniteIntegralForm(E8);
assert.equal(detBareiss(E8), 1n);
assert.ok(E8.every((row,i) => row[i] % 2 === 0));

const E8cubed = blockDiagonal(E8, 3);
assertPositiveDefiniteIntegralForm(E8cubed);
assert.equal(E8cubed.length, 24);
assert.equal(detBareiss(E8cubed), 1n);

const leech = leechRecord.K;
assertPositiveDefiniteIntegralForm(leech);
assert.equal(leech.length, 24);
assert.equal(detBareiss(leech), 1n);
assert.ok(leech.every((row,i) => row[i] % 2 === 0));

const e8Summary = arm.certifiedSeed.E8Cubed;
const leechSummary = arm.certifiedSeed.Leech;
for (const field of ["rank", "determinant", "positiveSignature", "chiralCentralCharge"]) {
  assert.equal(e8Summary[field], leechSummary[field], `coarse detector must collide on ${field}`);
}
assert.equal(e8Summary.normTwoRootCount, 720);
assert.equal(leechSummary.normTwoRootCount, 0);
assert.notEqual(e8Summary.normTwoRootCount, leechSummary.normTwoRootCount);
assert.match(arm.certifiedSeed.verdict, /collides/);
assert.deepEqual(arm.computationalSeed.bottIndices, [1,1,1,1]);
assert.ok(arm.computationalSeed.spectralGaps.every(gap => gap > 1));
assert.deepEqual(arm.structuralDisorderSeed.bottIndices, [1,1,1,1]);
assert.deepEqual(arm.structuralDisorderSeed.spectralLocalizerIndices, [-1,-1,-1,-1]);
assert.ok(arm.structuralDisorderSeed.periodicSpectralGaps.every(gap => gap > 1.5));
assert.ok(arm.structuralDisorderSeed.localizerGaps.every(gap => gap > 0.7));
assert.equal(arm.e8CoupledWireSeed.evidence, "translation-free-e8-coupled-wire-tomography-v1.json");
assert.equal(e8Wire.carrier.interactions, 8 * (e8Wire.carrier.wires - 1));
assert.equal(e8Wire.boundary.totalUngappedModes, 16);
assert.equal(e8Wire.tomography.heldOutPredictions.normTwoCurrents, 240);
assert.equal(e8Wire.claimBoundary.microscopicFewBodyHardwareClosed, false);
assert.equal(arm.e8FewBodyClockSeed.evidence, "translation-free-e8-few-body-clock-gap-v1.json");
assert.equal(e8Clock.hardware.localTermBodyCount, 2);
assert.equal(e8Clock.hardware.bulkInteractionGraphDegree, 1);
assert.equal(e8Clock.sweep.certifiedUniformLowerBound, 0.75);
assert.equal(e8Clock.claimBoundary.continuumE8AnomalyCertified, false);
assert.equal(arm.e8ClockToRotorSeed.evidence, "translation-free-e8-clock-to-rotor-convergence-v1.json");
assert.equal(e8Rotor.clockLadder.at(-1).q, 129);
assert.ok(e8Rotor.convergence.q129RelativeGapError < 1.2e-4);
assert.ok(e8Rotor.claimBoundary.open.includes("the full eight-channel K_E8^-1 charging metric"));
assert.equal(arm.e8ConstitutiveMetricGate.evidence, "translation-free-e8-constitutive-metric-gate-v1.json");
assert.equal(e8Metric.coxeterCertificate.coxeterNumber, 30);
assert.deepEqual(e8Metric.coxeterCertificate.exponents, [1,7,11,13,17,19,23,29]);
assert.equal(e8Metric.conditionalRotorCell.branches.length, 3);
assert.ok(e8Metric.topologicalInput.notFixedByE8.includes("charging kernel"));
assert.equal(arm.e8AdaptiveShellSolver.evidence, "translation-free-e8-adaptive-shell-solver-plan-v1.json");
assert.equal(e8Shell.thetaSeries.shells.at(-1).cumulativeStates, 3721681);
assert.equal(e8Shell.solverPlan.maximumNeighborsPerState, 16);
assert.equal(arm.e8JoinedRotorRecon.evidence, "translation-free-e8-joined-rotor-cutoff-recon-v1.json");
assert.equal(Math.max(...e8Recon.records.map(item=>item.basisStates)),117361);
assert.equal(e8Recon.cutoffAssessment.cartanKernelPromoted,false);
assert.equal(e8Recon.cutoffAssessment.inverseKernelPromoted,false);
assert.equal(arm.e8RestartedDavidson.evidence,"translation-free-e8-restarted-davidson-v1.json");
assert.ok(e8Davidson.cutoff8.every(item=>item.basisStates===340321));
assert.equal(e8Davidson.cutoffAssessment.cartanKernelPromoted,false);
assert.equal(e8Davidson.cutoffAssessment.inverseKernelPromoted,false);
assert.equal(arm.e8OperatorCompletenessGate.evidence,"translation-free-e8-operator-completeness-gate-v1.json");
assert.equal(e8Operator.stepAudit.inverseKernel.firstCompleteCutoff,15);
assert.equal(e8Operator.inverseBranchCompleteness.at(-1).basisStates,3721681);
assert.equal(arm.e8CartanShell10Spectroscopy.evidence,"translation-free-e8-cartan-shell10-spectroscopy-v1.json");
assert.equal(e8Shell10.model.basisStates,794161);
assert.ok(e8Shell10.cutoffDiagnostics.relativeGapDrift8to10<0.01);
assert.equal(e8Shell10.cutoffDiagnostics.gapPromoted,false);
assert.equal(arm.e8CartanCompactGap.evidence,"translation-free-e8-cartan-compact-gap-v1.json");
assert.equal(e8CompactGap.convergence.successivePassingIncrements,2);
assert.match(e8CompactGap.boundary,/not a rigorous lower bound/u);
assert.deepEqual(e8RatioSpine.promotedPoints.map(p=>p.ratio),[0.25,0.375,0.5,0.75,1]);
assert.match(e8RatioSpine.boundary,/not a proof for every r/u);
assert.equal(arm.e8ChannelAmplitudePerturbation.evidence,"translation-free-e8-channel-amplitude-perturbation-v1.json");
assert.equal(e8AmplitudePerturbation.perturbation.maximumFractionalDeviationFromMean,0.1);
assert.ok(e8AmplitudePerturbation.cutoffLadder.at(-1).gap>0.2);
assert.equal(arm.e8ChannelAmplitudePerturbation.openPerturbationBallCertified,false);
assert.equal(arm.e8ChannelAmplitudeStencil.evidence,"translation-free-e8-channel-amplitude-stencil-v1.json");
assert.equal(e8AmplitudeStencil.directions.length,2);
assert.ok(Math.abs(e8AmplitudeStencil.directionCosine)<0.99);
assert.equal(arm.e8ChannelAmplitudeStencil.openPerturbationBallCertified,false);
assert.equal(arm.e8KineticMetricPerturbation.evidence,"translation-free-e8-kinetic-metric-perturbation-v1.json");
assert.ok(e8MetricPerturbation.gaps.at(-1)>0.2);
assert.equal(arm.e8KineticMetricPerturbation.openStabilityTubeCertified,false);
assert.equal(arm.e8MixedPerturbationCorner.evidence,"translation-free-e8-mixed-perturbation-corner-v1.json");
assert.equal(e8MixedCorner.promoted,true);
assert.equal(arm.e8MixedPerturbationCorner.intercellGapCertified,false);
assert.equal(arm.e8TwoCellProjectedCoupling.evidence,"translation-free-e8-two-cell-projected-coupling-v1.json");assert.equal(e8TwoCell.projectedDimension,16);assert.equal(e8TwoCell.projectedTwoCellGapPromoted,true);assert.equal(arm.e8TwoCellProjectedCoupling.fullTwoCellGapCertified,false);
assert.equal(arm.e8TwoCellRootCountAudit.evidence,"translation-free-e8-two-cell-root-count-audit-v1.json");assert.equal(e8TwoCellRoots.gapRootCountPromoted,true);assert.equal(e8TwoCellRoots.splittingPromotedThroughJ,0.05);assert.equal(e8TwoCellRoots.splittingCoefficientPromotedAtJ01,false);
assert.equal(arm.e8ProjectedChainWidthRootGrid.evidence,"translation-free-e8-projected-chain-width-root-grid-v1.json");assert.equal(e8ChainGrid.finiteWidthRootGridPromoted,true);assert.equal(e8ChainGrid.thermodynamicGapCertified,false);
assert.equal(arm.e8ProjectedChainBoundaryComparison.evidence,"translation-free-e8-projected-chain-boundary-comparison-v1.json");assert.equal(e8BoundaryComparison.periodicFiniteWidthPlateauPromoted,true);assert.equal(e8BoundaryComparison.thermodynamicGapCertified,false);
assert.equal(arm.e8LocalOperatorDictionary.evidence,"translation-free-e8-local-operator-dictionary-r8-v1.json");assert.equal(e8Dictionary.settings.roots,8);assert.equal(arm.e8LocalOperatorDictionary.reusableDictionaryCertified,true);
assert.equal(arm.quasicrystalBackplaneBridge.evidence, "translation-free-e8-quasicrystal-backplane-bridge-v1.json");
assert.deepEqual(quasicrystal.factorialDesign.backplanes, ["periodic","quasicrystal","amorphous"]);
assert.deepEqual(quasicrystal.factorialDesign.relationPrograms, ["identity","E8"]);
assert.equal(quasicrystal.factorialDesign.totalPrimaryDevices, 48);
assert.ok(quasicrystal.hardFirewalls.some(rule => /diffraction is not evidence of E8/u.test(rule)));

console.log(JSON.stringify({
  status: "PASS",
  arm: "translation-free exceptional topology",
  coarseBulkCollision: {rank:24, determinant:1, signature:24, chiralCentralCharge:24},
  boundarySeparation: {E8CubedNormTwoRoots:720, LeechNormTwoRoots:0},
  translationFreeSeed: {disorderStrengths:arm.computationalSeed.onsiteDisorderStrengths, bottIndices:arm.computationalSeed.bottIndices},
  structuralSeed: {jitterStrengths:arm.structuralDisorderSeed.jitterStrengths, bottIndices:arm.structuralDisorderSeed.bottIndices, localizerIndices:arm.structuralDisorderSeed.spectralLocalizerIndices},
  e8CoupledWireSeed: {wires:e8Wire.carrier.wires, nullInteractions:e8Wire.carrier.interactions, heldOutRoots:e8Wire.tomography.heldOutPredictions.normTwoCurrents},
  e8FewBodyClockSeed: {bodyCount:e8Clock.hardware.localTermBodyCount, maximumWidth:Math.max(...e8Clock.sweep.wireCounts), uniformGap:e8Clock.sweep.certifiedUniformLowerBound},
  e8ClockToRotorSeed: {maximumQ:e8Rotor.clockLadder.at(-1).q, relativeGapError:e8Rotor.convergence.q129RelativeGapError},
  e8ConstitutiveMetricGate: {branches:e8Metric.conditionalRotorCell.branches.length, coxeterNumber:e8Metric.coxeterCertificate.coxeterNumber},
  e8AdaptiveShellSolver: {maximumBasis:e8Shell.thetaSeries.shells.at(-1).cumulativeStates, maximumNeighbors:e8Shell.solverPlan.maximumNeighborsPerState},
  e8JoinedRotorRecon: {largestBasis:Math.max(...e8Recon.records.map(item=>item.basisStates)), continuumGapPromoted:false},
  e8RestartedDavidson: {largestBasis:340321, continuumGapPromoted:false},
  e8OperatorCompletenessGate: {inverseFirstCompleteCutoff:15, inverseFirstCompleteBasis:3721681},
  e8CartanShell10Spectroscopy: {basisStates:794161, provisionalGap:e8Shell10.cutoffDiagnostics.gapAtCutoff10, gapPromoted:false},
  e8ChannelAmplitudePerturbation: {maximumFractionalDeviation:e8AmplitudePerturbation.perturbation.maximumFractionalDeviationFromMean, gap:e8AmplitudePerturbation.cutoffLadder.at(-1).gap, openPerturbationBallCertified:false},
  e8ChannelAmplitudeStencil: {directions:e8AmplitudeStencil.directions.length, maximumFractionalDeviation:Math.max(...e8AmplitudeStencil.directions.map(d=>d.maximumFractionalDeviation)), minimumGap:Math.min(...e8AmplitudeStencil.directions.map(d=>d.finalGap??d.gaps.at(-1))), openPerturbationBallCertified:false},
  e8KineticMetricPerturbation: {maximumScaleDeviation:e8MetricPerturbation.maximumFractionalScaleDeviation, gap:e8MetricPerturbation.gaps.at(-1), openStabilityTubeCertified:false},
  e8MixedPerturbationCorner: {gap:e8MixedCorner.gaps.at(-1), compactCellStencilClosed:true, continuousTubeCertified:false, intercellGapCertified:false},
  e8TwoCellProjectedCoupling: {localRoots:e8TwoCell.localRoots, maximumJ:e8TwoCell.couplingSweep.at(-1).J, minimumProjectedGap:Math.min(...e8TwoCell.couplingSweep.map(x=>x.gaps.at(-1))), fullTwoCellGapCertified:false, widthGapCertified:false},
  e8TwoCellRootCountAudit: {localRootCounts:e8TwoCellRoots.localRootCounts, gapRootCountPromoted:true, splittingPromotedThroughJ:e8TwoCellRoots.splittingPromotedThroughJ, splittingCoefficientPromotedAtJ01:false},
  e8ProjectedChainWidthRootGrid: {widths:e8ChainGrid.widths, localRootCounts:e8ChainGrid.localRootCounts, minimumGridGap:Math.min(...Object.values(e8ChainGrid.gapsByRootCount).flat()), thermodynamicGapCertified:false},
  e8ProjectedChainBoundaryComparison: {widths:e8BoundaryComparison.widths, periodicGapAtWidthFive:e8BoundaryComparison.periodicGaps.at(-1), openPeriodicDifferenceAtWidthFive:e8BoundaryComparison.openPeriodicRelativeDifferences.at(-1), thermodynamicGapCertified:false},
  e8LocalOperatorDictionary: {cutoff:e8Dictionary.settings.cutoff, localRoots:e8Dictionary.settings.roots, basisStates:e8Dictionary.settings.basisStates, reusableDictionaryCertified:true},
  quasicrystalBridge: {materialClasses:quasicrystal.factorialDesign.backplanes.length, relationPrograms:quasicrystal.factorialDesign.relationPrograms.length, devices:quasicrystal.factorialDesign.totalPrimaryDevices},
  nextGate: "larger projected widths from frozen dictionary -> controlled thermodynamic lower bound -> blinded backplane interaction -> rank-24 detector ladder -> orbifold witness"
}));
