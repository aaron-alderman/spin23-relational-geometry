import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/m44-relative-t1-orientation-spike-v1.json", import.meta.url),
  "utf8"
));

const c = 299_792_458;
const kappa = (theta, q) => Math.cos(theta) + q * Math.sin(theta);
const doppler = velocity => 1 - velocity / c;
const observed = (omega1, velocity, theta, q) => omega1 * doppler(velocity) * kappa(theta, q);

const cases = [
  { omega1: 4.57e14, velocity: 34_000, theta: 0.02, thetaPrime: -0.01, q: 0 },
  { omega1: 6.16e14, velocity: 33_200, theta: -0.03, thetaPrime: 0.04, q: 0.2 },
  { omega1: 7.40e14, velocity: 35_100, theta: 0.08, thetaPrime: 0.01, q: -0.15 }
];

for (const item of cases) {
  const ratio = kappa(item.theta, item.q) / kappa(item.thetaPrime, item.q);
  const velocityPrime = c * (1 - doppler(item.velocity) * ratio);
  const first = observed(item.omega1, item.velocity, item.theta, item.q);
  const aliased = observed(item.omega1, velocityPrime, item.thetaPrime, item.q);
  assert.ok(Math.abs(first - aliased) / Math.abs(first) < 2e-15);
}

const transpose = matrix => matrix[0].map((_, column) => matrix.map(row => row[column]));
const multiply = (left, right) => left.map(row => right[0].map((_, column) =>
  row.reduce((sum, value, index) => sum + value * right[index][column], 0)));
const diagonal = values => values.map((value, row) => values.map((_, column) => row === column ? value : 0));
const inverseDiagonal = matrix => diagonal(matrix.map((row, index) => 1 / row[index]));
const closeMatrices = (left, right, tolerance = 1e-12) => left.every((row, i) =>
  row.every((value, j) => Math.abs(value - right[i][j]) < tolerance));

const principalAxis = covariance => {
  const [[xx, xy], [, yy]] = covariance;
  const eastAngle = 0.5 * Math.atan2(2 * xy, xx - yy);
  const vx = Math.cos(eastAngle);
  const vy = Math.sin(eastAngle);
  const positionAngle = ((Math.atan2(vx, vy) * 180 / Math.PI) % 180 + 180) % 180;
  const discriminant = Math.hypot(xx - yy, 2 * xy);
  const lambda1 = 0.5 * (xx + yy + discriminant);
  const lambda2 = 0.5 * (xx + yy - discriminant);
  return { positionAngle, axisRatio: Math.sqrt(lambda1 / lambda2) };
};

const analyseRows = rows => {
  const selected = rows.filter(row => row.pcont <= 0.01);
  const meanRa = selected.reduce((sum, row) => sum + row.ra, 0) / selected.length;
  const meanDec = selected.reduce((sum, row) => sum + row.dec, 0) / selected.length;
  const cosDec = Math.cos(meanDec * Math.PI / 180);
  let xx = 0;
  let xy = 0;
  let yy = 0;
  for (const row of selected) {
    const x = (row.ra - meanRa) * cosDec;
    const y = row.dec - meanDec;
    xx += x * x;
    xy += x * y;
    yy += y * y;
  }
  const covariance = [[xx / selected.length, xy / selected.length], [xy / selected.length, yy / selected.length]];
  return { selectedRows: selected.length, meanRa, meanDec, covariance, ...principalAxis(covariance) };
};

const observedCovariance = [
  [9, 1.5, 0.2],
  [1.5, 4, 0.4],
  [0.2, 0.4, 1.8]
];

for (const angle of [0.1, 0.35, 0.7]) {
  const projection = diagonal([1, 1, Math.cos(angle)]);
  const inverse = inverseDiagonal(projection);
  const intrinsic = multiply(multiply(inverse, observedCovariance), transpose(inverse));
  const reconstructed = multiply(multiply(projection, intrinsic), transpose(projection));
  assert.ok(closeMatrices(reconstructed, observedCovariance));
}

assert.equal(evidence.semanticAudit.modularT1.includes("not a celestial vector"), true);
assert.equal(evidence.verdict.empiricalEvidenceForT1Tilt, false);
assert.equal(evidence.verdict.newPhysicsClaim, false);
assert.ok(evidence.minimumSeparatingBundle.length >= 6);

const control = evidence.ordinarySpatialControl;
const derivedControl = principalAxis(control.covarianceDeg2);
assert.ok(Math.abs(derivedControl.positionAngle - control.majorAxisPositionAngleEastOfNorthDeg) < 0.01);
assert.ok(Math.abs(derivedControl.axisRatio - control.principalAxisRatio) < 0.01);
assert.match(control.interpretation, /not a configuration T1 measurement/u);

const crossChannel = evidence.crossChannelDiagnostic;
assert.equal(crossChannel.selection.lowContaminationMembers, control.selectedRows);
assert.equal(crossChannel.empiricalEvidenceForT1Tilt, false);
assert.ok(crossChannel.fullBaselineFit.tangentialDesignConditionNumber <
  crossChannel.apertureConditioningControl.within3Point3Deg.conditionNumber);
assert.ok(crossChannel.apertureConditioningControl.within3Point3Deg.conditionNumber <
  crossChannel.apertureConditioningControl.within1Point5Deg.conditionNumber);
assert.ok(Math.abs(crossChannel.fullBaselineFit.tailSlopeKmPerSecPerDeg -
  crossChannel.fullBaselineFit.tailSlopeControllingGmagKmPerSecPerDeg) < 0.001);
assert.equal(crossChannel.fullBaselineFit.leadingBranchCount +
  crossChannel.fullBaselineFit.trailingBranchCount, crossChannel.selection.robustRadialVelocityInliers);
assert.match(crossChannel.authorityLimits.join(" "), /not independent discovery/u);
const modelGate = crossChannel.frozenModelGate;
assert.equal(modelGate.spatiallyVaryingT1ModelAdmissible, false);
assert.match(modelGate.corpusNativeT1Model, /intercept-only null/u);
assert.equal(modelGate.ordinaryLinearTailModel.absoluteErrorWins +
  modelGate.constantAbsoluteErrorWinsOrTies, modelGate.evaluatedRecords);
assert.ok(modelGate.ordinaryMinusConstantMeanAbsoluteErrorKmPerSec < 0);
assert.ok(modelGate.pairedBootstrap.meanAbsoluteErrorDelta95PercentIntervalKmPerSec[1] < 0);
assert.match(modelGate.comparisonStatus, /not confirmatory/u);
const tournament = crossChannel.alternativeShapeTournament;
assert.match(tournament.status, /not confirmatory/u);
for (const name of ["linearTail", "sharpStep", "smoothStep", "clusterRelaxation", "boundaryLayer"]) {
  assert.ok(tournament.models[name].heldOutMaeKmPerSec < tournament.models.constant.heldOutMaeKmPerSec);
}
for (const interval of Object.values(tournament.candidateMinusLinearPairedBootstrap95PercentIntervalsKmPerSec)) {
  assert.ok(interval[0] < 0 && interval[1] > 0);
}
assert.equal(tournament.models.clusterRelaxation.selectedLengthDegAllFolds, 64);
assert.ok(tournament.models.smoothStep.selectedWidthRangeDeg[0] >= 32);
assert.match(tournament.result, /no tested boundary or relaxation shape is distinguishable/u);
const tail3d = crossChannel.threeDimensionalTailAndSpectralSurface;
assert.equal(tail3d.rvRecords, crossChannel.selection.radialVelocityErrorAtMost5KmPerSec);
assert.equal(tail3d.robustResidualInliers, crossChannel.selection.robustRadialVelocityInliers);
assert.ok(tail3d.parallaxPerturbedSlope95PercentIntervalKmPerSecPerPc[0] < tail3d.nominalResidualSlopeKmPerSecPerPc);
assert.ok(tail3d.parallaxPerturbedSlope95PercentIntervalKmPerSecPerPc[1] > tail3d.nominalResidualSlopeKmPerSecPerPc);
assert.ok(Math.abs(tail3d.spectralControl.templateTemperatureSlopeControllingTailKmPerSecPer1000K) < 0.01);
assert.match(tail3d.spectralControl.interpretation, /cannot test line-by-line/u);
const orientation = crossChannel.orientationPriorControl;
assert.equal(orientation.morphologyIdentifiesT1Orientation, false);
assert.ok(Math.abs(orientation.isotropicUnorientedAxes3d.probabilityWithin10DegOf90 - Math.sin(Math.PI / 18)) < 1e-15);
assert.equal(orientation.isotropicUnorientedAxes3d.probabilityAtExactly90, 0);
assert.match(orientation.visibilityConstraint, /vanishes at 90 degrees/u);
const slice = crossChannel.spiralInclinationSlicingTemplate;
const geometry = slice.m44MeasuredGeometry;
assert.ok(Math.abs(geometry.lineOfSightDiskInclinationDeg - (90 - Math.abs(geometry.centreGalacticLatitudeDeg))) < 1e-12);
assert.ok(geometry.lineOfSightDiskInclinationDeg > 50 && geometry.lineOfSightDiskInclinationDeg < 70);
assert.ok(geometry.tailTiltFromGalacticPlaneDeg < 5);
assert.ok(slice.conditionalTailAsT1.angleFromDiskNormalDeg > 85);
assert.match(slice.conditionalTailAsT1.status, /conditional only/u);
assert.match(slice.interpretation, /cannot infer T1/u);
const hypotheses = crossChannel.corpusDerivedHypothesisTournament;
const uniqueScalar = hypotheses.uniqueDirectionScalarFrequencyProjection;
const uniqueRotation = hypotheses.uniquePlaneTwoChannelRotation;
const frameProjection = hypotheses.rankTwoPlusOneSpatialFrameProjection;
assert.ok(Math.abs(uniqueScalar.directT1Overlap - Math.cos(hypotheses.relativeAngleDeg * Math.PI / 180)) < 1e-15);
assert.ok(Math.abs(uniqueRotation.totalNormFraction - 1) < 1e-12);
assert.ok(uniqueScalar.qRequiredForUnitResponse > 0.94);
assert.ok(uniqueScalar.qRequiredForUnitResponse < 0.96);
assert.deepEqual(frameProjection.singularValues.slice(0, 2), [1, 1]);
assert.equal(frameProjection.guaranteedIntersectionDimensionAtLeast, 2);
assert.equal(frameProjection.rankAtExactly90Deg, 2);
assert.ok(Math.abs(frameProjection.isotropicMeanRetainedPower - (2 + uniqueScalar.directT1Overlap ** 2) / 3) < 1e-15);
assert.ok(frameProjection.isotropicMeanRetainedPower > 2 / 3);
assert.match(frameProjection.status, /axis-ratio rejection is withdrawn/u);
assert.match(uniqueRotation.status, /open but unconfirmed/u);

if (process.argv.includes("--live")) {
  const response = await fetch(control.query);
  assert.equal(response.ok, true, "VizieR request failed: " + response.status);
  const text = await response.text();
  const dataLines = text.split(/\r?\n/u).filter(line => /^\s*\d+\t/u.test(line));
  const digest = createHash("sha256").update(dataLines.join("\n")).digest("hex");
  assert.equal(digest, control.normalizedDataRowsSha256);
  const rows = dataLines.map(line => {
    const fields = line.split("\t");
    return { ra: Number(fields[2]), dec: Number(fields[3]), pcont: Number(fields[7]) };
  });
  const live = analyseRows(rows);
  assert.equal(rows.length, control.totalRows);
  assert.equal(live.selectedRows, control.selectedRows);
  assert.ok(Math.abs(live.meanRa - control.meanRaDeg) < 1e-10);
  assert.ok(Math.abs(live.meanDec - control.meanDecDeg) < 1e-10);
  assert.ok(Math.abs(live.positionAngle - control.majorAxisPositionAngleEastOfNorthDeg) < 0.01);
  assert.ok(Math.abs(live.axisRatio - control.principalAxisRatio) < 0.01);
}

console.log(JSON.stringify({
  spectralAliasCases: cases.length,
  spatialCovarianceAliases: 3,
  ordinarySkyPlanePositionAngleEastOfNorthDeg: derivedControl.positionAngle,
  ordinarySkyPlaneAxisRatio: derivedControl.axisRatio,
  crossChannelResidualDetected: true,
  crossChannelPhysicalAttribution: "open",
  frozenCorpusNativeT1DifferentialPrediction: false,
  retrospectiveOrdinaryLinearTailMaeImprovementKmPerSec:
    -modelGate.ordinaryMinusConstantMeanAbsoluteErrorKmPerSec,
  alternativeTailShapesDistinguishableFromLinear: false,
  threeDimensionalResidualSlopeKmPerSecPerPc: tail3d.nominalResidualSlopeKmPerSecPerPc,
  morphologyIdentifiesT1Orientation: false,
  m44SpiralInclinationSliceDeg: geometry.lineOfSightDiskInclinationDeg,
  m44TailTiltFromGalacticPlaneDeg: geometry.tailTiltFromGalacticPlaneDeg,
  uniqueDirectionQRequiredForUnitResponse: uniqueScalar.qRequiredForUnitResponse,
  rankTwoPlusOneIsotropicMeanRetainedPower: frameProjection.isotropicMeanRetainedPower,
  directSkyAxisRatioRejection: "withdrawn",
  uniquePlaneChannelSwap: "open but unconfirmed",
  liveCatalogueVerified: process.argv.includes("--live"),
  constantAngleIdentifiable: false,
  modularAngleDefined: false,
  nextGate: evidence.verdict.nextGate
}, null, 2));
console.log("PASS verify_m44_relative_t1_orientation_spike");

