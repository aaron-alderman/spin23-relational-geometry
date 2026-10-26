#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const vizierUrl = "https://vizier.cds.unistra.fr/viz-bin/asu-tsv?-source=J/A%2bA/627/A4&-out.all=1";
const gaiaTapUrl = "https://gea.esac.esa.int/tap-server/tap/sync";
const radians = degrees => degrees * Math.PI / 180;
const finite = value => Number.isFinite(value);

const median = values => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : 0.5 * (sorted[middle - 1] + sorted[middle]);
};

const solve3 = (matrix, vector) => {
  const augmented = matrix.map((row, index) => [...row, vector[index]]);
  for (let column = 0; column < 3; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < 3; row += 1) {
      if (Math.abs(augmented[row][column]) > Math.abs(augmented[pivot][column])) pivot = row;
    }
    [augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]];
    assert.ok(Math.abs(augmented[column][column]) > 1e-12, "singular normal matrix");
    const scale = augmented[column][column];
    for (let entry = column; entry < 4; entry += 1) augmented[column][entry] /= scale;
    for (let row = 0; row < 3; row += 1) {
      if (row === column) continue;
      const factor = augmented[row][column];
      for (let entry = column; entry < 4; entry += 1) augmented[row][entry] -= factor * augmented[column][entry];
    }
  }
  return augmented.map(row => row[3]);
};

const basisAt = (raDeg, decDeg) => {
  const ra = radians(raDeg);
  const dec = radians(decDeg);
  return {
    radial: [Math.cos(dec) * Math.cos(ra), Math.cos(dec) * Math.sin(ra), Math.sin(dec)],
    east: [-Math.sin(ra), Math.cos(ra), 0],
    north: [-Math.sin(dec) * Math.cos(ra), -Math.sin(dec) * Math.sin(ra), Math.cos(dec)]
  };
};

const dot = (left, right) => left.reduce((sum, value, index) => sum + value * right[index], 0);

const principalAxis = rows => {
  const meanRa = rows.reduce((sum, row) => sum + row.ra, 0) / rows.length;
  const meanDec = rows.reduce((sum, row) => sum + row.dec, 0) / rows.length;
  const cosDec = Math.cos(radians(meanDec));
  let xx = 0;
  let xy = 0;
  let yy = 0;
  for (const row of rows) {
    const x = (row.ra - meanRa) * cosDec;
    const y = row.dec - meanDec;
    xx += x * x;
    xy += x * y;
    yy += y * y;
  }
  xx /= rows.length;
  xy /= rows.length;
  yy /= rows.length;
  const eastAngle = 0.5 * Math.atan2(2 * xy, xx - yy);
  const vx = Math.cos(eastAngle);
  const vy = Math.sin(eastAngle);
  const positionAngle = ((Math.atan2(vx, vy) * 180 / Math.PI) % 180 + 180) % 180;
  return {
    meanRa,
    meanDec,
    cosDec,
    vx,
    vy,
    positionAngle
  };
};

const parseVizier = text => text.split(/\r?\n/u)
  .filter(line => /^\s*\d+\t/u.test(line))
  .map(line => {
    const fields = line.split("\t");
    return {
      dr2SourceId: fields[1].trim(),
      ra: Number(fields[2]),
      dec: Number(fields[3]),
      gmag: Number(fields[4]),
      dvpar: Number(fields[5]),
      vpero: Number(fields[6]),
      pcont: Number(fields[7])
    };
  });

const parseCsv = text => {
  const lines = text.trim().split(/\r?\n/u);
  const headers = lines.shift().split(",");
  return lines.filter(Boolean).map(line => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
};

const fetchGaia = async sourceIds => {
  const best = new Map();
  for (let offset = 0; offset < sourceIds.length; offset += 200) {
    const ids = sourceIds.slice(offset, offset + 200);
    const query = "SELECT n.dr2_source_id,n.dr3_source_id,n.angular_distance,n.magnitude_difference," +
      "g.ra,g.dec,g.parallax,g.pmra,g.pmdec,g.radial_velocity,g.radial_velocity_error " +
      "FROM gaiadr3.dr2_neighbourhood AS n " +
      "JOIN gaiadr3.gaia_source AS g ON n.dr3_source_id=g.source_id " +
      "WHERE n.dr2_source_id IN (" + ids.join(",") + ") " +
      "ORDER BY n.dr2_source_id,n.angular_distance";
    const body = new URLSearchParams({ REQUEST: "doQuery", LANG: "ADQL", FORMAT: "csv", QUERY: query });
    const response = await fetch(gaiaTapUrl, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body
    });
    assert.equal(response.ok, true, "Gaia TAP request failed: " + response.status);
    for (const row of parseCsv(await response.text())) {
      const key = row.dr2_source_id;
      const distance = Number(row.angular_distance);
      if (!best.has(key) || distance < best.get(key).angularDistance) {
        best.set(key, {
          dr2SourceId: key,
          dr3SourceId: row.dr3_source_id,
          angularDistance: distance,
          ra: Number(row.ra),
          dec: Number(row.dec),
          parallax: Number(row.parallax),
          pmra: Number(row.pmra),
          pmdec: Number(row.pmdec),
          radialVelocity: row.radial_velocity === "" ? null : Number(row.radial_velocity),
          radialVelocityError: row.radial_velocity_error === "" ? null : Number(row.radial_velocity_error)
        });
      }
    }
  }
  return best;
};

const fitSpaceVelocity = rows => {
  const normal = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const right = [0, 0, 0];
  const factor = 4.74047;
  for (const row of rows) {
    const basis = basisAt(row.ra, row.dec);
    const observations = [
      [basis.east, factor * row.pmra / row.parallax],
      [basis.north, factor * row.pmdec / row.parallax]
    ];
    for (const [design, value] of observations) {
      for (let i = 0; i < 3; i += 1) {
        right[i] += design[i] * value;
        for (let j = 0; j < 3; j += 1) normal[i][j] += design[i] * design[j];
      }
    }
  }
  return solve3(normal, right);
};

const designCondition = rows => {
  const matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (const row of rows) {
    const basis = basisAt(row.ra, row.dec);
    for (const design of [basis.east, basis.north]) {
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) matrix[i][j] += design[i] * design[j];
      }
    }
  }
  const diagonalized = matrix.map(row => [...row]);
  for (let iteration = 0; iteration < 30; iteration += 1) {
    let p = 0;
    let q = 1;
    for (const [left, right] of [[0, 1], [0, 2], [1, 2]]) {
      if (Math.abs(diagonalized[left][right]) > Math.abs(diagonalized[p][q])) [p, q] = [left, right];
    }
    if (Math.abs(diagonalized[p][q]) < 1e-12) break;
    const angle = 0.5 * Math.atan2(2 * diagonalized[p][q], diagonalized[q][q] - diagonalized[p][p]);
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const app = diagonalized[p][p];
    const aqq = diagonalized[q][q];
    const apq = diagonalized[p][q];
    diagonalized[p][p] = cosine * cosine * app - 2 * sine * cosine * apq + sine * sine * aqq;
    diagonalized[q][q] = sine * sine * app + 2 * sine * cosine * apq + cosine * cosine * aqq;
    diagonalized[p][q] = 0;
    diagonalized[q][p] = 0;
    for (let index = 0; index < 3; index += 1) {
      if (index === p || index === q) continue;
      const aip = diagonalized[index][p];
      const aiq = diagonalized[index][q];
      diagonalized[index][p] = cosine * aip - sine * aiq;
      diagonalized[p][index] = diagonalized[index][p];
      diagonalized[index][q] = sine * aip + cosine * aiq;
      diagonalized[q][index] = diagonalized[index][q];
    }
  }
  const eigenvalues = diagonalized.map((row, index) => row[index]).sort((a, b) => a - b);
  return { eigenvalues, conditionNumber: eigenvalues[2] / eigenvalues[0] };
};

const makeVelocityFit = rows => ({
  memberCount: rows.length,
  velocity: fitSpaceVelocity(rows),
  design: designCondition(rows)
});

const linearSummary = rows => {
  const meanX = rows.reduce((sum, row) => sum + row.tailCoordinate, 0) / rows.length;
  const meanY = rows.reduce((sum, row) => sum + row.residual, 0) / rows.length;
  let xx = 0;
  let xy = 0;
  let yy = 0;
  for (const row of rows) {
    const x = row.tailCoordinate - meanX;
    const y = row.residual - meanY;
    xx += x * x;
    xy += x * y;
    yy += y * y;
  }
  const slope = xy / xx;
  const intercept = meanY - slope * meanX;
  const sse = rows.reduce((sum, row) => {
    const error = row.residual - (intercept + slope * row.tailCoordinate);
    return sum + error * error;
  }, 0);
  const slopeStandardError = Math.sqrt((sse / (rows.length - 2)) / xx);
  return {
    count: rows.length,
    slopeKmPerSecPerDeg: slope,
    slopeStandardErrorKmPerSecPerDeg: slopeStandardError,
    slopeTStatistic: slope / slopeStandardError,
    correlation: xy / Math.sqrt(xx * yy),
    meanResidual: meanY
  };
};

const tailMagnitudeSummary = rows => {
  const usable = rows.filter(row => finite(row.gmag));
  const meanTail = usable.reduce((sum, row) => sum + row.tailCoordinate, 0) / usable.length;
  const meanMagnitude = usable.reduce((sum, row) => sum + row.gmag, 0) / usable.length;
  const meanResidual = usable.reduce((sum, row) => sum + row.residual, 0) / usable.length;
  const normal = [[usable.length, 0, 0], [0, 0, 0], [0, 0, 0]];
  const right = [usable.length * meanResidual, 0, 0];
  let tailMagnitudeCross = 0;
  let tailSquared = 0;
  let magnitudeSquared = 0;
  for (const row of usable) {
    const tail = row.tailCoordinate - meanTail;
    const magnitude = row.gmag - meanMagnitude;
    normal[1][1] += tail * tail;
    normal[1][2] += tail * magnitude;
    normal[2][1] += tail * magnitude;
    normal[2][2] += magnitude * magnitude;
    right[1] += tail * row.residual;
    right[2] += magnitude * row.residual;
    tailMagnitudeCross += tail * magnitude;
    tailSquared += tail * tail;
    magnitudeSquared += magnitude * magnitude;
  }
  const coefficients = solve3(normal, right);
  return {
    count: usable.length,
    tailSlopeControllingGmagKmPerSecPerDeg: coefficients[1],
    gmagSlopeControllingTailKmPerSecPerMag: coefficients[2],
    tailGmagCorrelation: tailMagnitudeCross / Math.sqrt(tailSquared * magnitudeSquared)
  };
};

const weightedLinearSummary = rows => {
  const weighted = rows.map(row => ({ ...row, weight: 1 / (row.radialVelocityError ** 2 + 0.5 ** 2) }));
  const totalWeight = weighted.reduce((sum, row) => sum + row.weight, 0);
  const meanX = weighted.reduce((sum, row) => sum + row.weight * row.tailCoordinate, 0) / totalWeight;
  const meanY = weighted.reduce((sum, row) => sum + row.weight * row.residual, 0) / totalWeight;
  const xx = weighted.reduce((sum, row) => sum + row.weight * (row.tailCoordinate - meanX) ** 2, 0);
  const xy = weighted.reduce((sum, row) => sum + row.weight * (row.tailCoordinate - meanX) * (row.residual - meanY), 0);
  return {
    errorFloorKmPerSec: 0.5,
    slopeKmPerSecPerDeg: xy / xx,
    meanResidualKmPerSec: meanY
  };
};

const seededGenerator = seed => {
  let state = seed >>> 0;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
};

const permutationCheck = (rows, iterations = 2000) => {
  const observedSlope = Math.abs(linearSummary(rows).slopeKmPerSecPerDeg);
  const residuals = rows.map(row => row.residual);
  const random = seededGenerator(0x4d343454);
  let atLeastObserved = 0;
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const shuffled = [...residuals];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(random() * (index + 1));
      [shuffled[index], shuffled[swap]] = [shuffled[swap], shuffled[index]];
    }
    const permuted = rows.map((row, index) => ({ ...row, residual: shuffled[index] }));
    if (Math.abs(linearSummary(permuted).slopeKmPerSecPerDeg) >= observedSlope) atLeastObserved += 1;
  }
  return {
    iterations,
    seedHex: "0x4d343454",
    twoSidedPValue: (atLeastObserved + 1) / (iterations + 1)
  };
};

const summarizeResiduals = rows => {
  const residualMedian = median(rows.map(row => row.residual));
  const residualMad = median(rows.map(row => Math.abs(row.residual - residualMedian)));
  const robustSigma = 1.4826 * residualMad;
  const inliers = rows.filter(row => Math.abs(row.residual - residualMedian) <= 3 * Math.max(robustSigma, 0.5));
  return {
    inliers,
    summary: {
      medianKmPerSec: residualMedian,
      madKmPerSec: residualMad,
      robustSigmaKmPerSec: robustSigma,
      ordinaryLeastSquares: linearSummary(inliers),
      inverseVarianceWeighted: weightedLinearSummary(inliers),
      magnitudeAdjusted: tailMagnitudeSummary(inliers),
      leadingBranch: linearSummary(inliers.filter(row => row.tailCoordinate >= 0)),
      trailingBranch: linearSummary(inliers.filter(row => row.tailCoordinate < 0)),
      permutation: permutationCheck(inliers)
    }
  };
};

const vizierResponse = await fetch(vizierUrl);
assert.equal(vizierResponse.ok, true);
const catalog = parseVizier(await vizierResponse.text());
const selected = catalog.filter(row => row.pcont <= 0.01);
const gaia = await fetchGaia(selected.map(row => row.dr2SourceId));
const joined = selected.map(row => ({ ...row, ...gaia.get(row.dr2SourceId) }))
  .filter(row => finite(row.parallax) && row.parallax > 0 && finite(row.pmra) && finite(row.pmdec));

const axis = principalAxis(selected);
const medianRa = median(selected.map(row => row.ra));
const medianDec = median(selected.map(row => row.dec));
const centreCosDec = Math.cos(radians(medianDec));
const angularRadius = row => Math.hypot((row.ra - medianRa) * centreCosDec, row.dec - medianDec);
const core = joined.filter(row => angularRadius(row) <= 3.3);
const innerCore = joined.filter(row => angularRadius(row) <= 1.5);
const velocityFits = {
  allSelectedMembers: makeVelocityFit(joined),
  tidalRadiusCore3Point3Deg: makeVelocityFit(core),
  innerCore1Point5Deg: makeVelocityFit(innerCore)
};
const tailCoordinate = row => ((row.ra - medianRa) * axis.cosDec) * axis.vx +
  (row.dec - medianDec) * axis.vy;
const withRadialVelocity = joined
  .filter(row => finite(row.radialVelocity) && finite(row.radialVelocityError) && row.radialVelocityError <= 5)
  .map(row => ({
    ...row,
    tailCoordinate: tailCoordinate(row),
    astrometricRadialVelocity: dot(basisAt(row.ra, row.dec).radial, velocityFits.allSelectedMembers.velocity)
  }));

const analyses = Object.fromEntries(Object.entries(velocityFits).map(([name, fit]) => {
  const rows = withRadialVelocity.map(row => ({
    ...row,
    astrometricRadialVelocity: dot(basisAt(row.ra, row.dec).radial, fit.velocity),
    residual: row.radialVelocity - dot(basisAt(row.ra, row.dec).radial, fit.velocity)
  }));
  const result = summarizeResiduals(rows);
  return [name, {
    fittedCommonSpaceVelocityIcrsKmPerSec: fit.velocity,
    tangentialDesignEigenvalues: fit.design.eigenvalues,
    tangentialDesignConditionNumber: fit.design.conditionNumber,
    ...result.summary
  }];
}));
const centre = basisAt(medianRa, medianDec).radial;
const gaiaJoinedDataSha256 = createHash("sha256").update(JSON.stringify(joined.map(row => ({
  dr2SourceId: row.dr2SourceId,
  dr3SourceId: row.dr3SourceId,
  ra: row.ra,
  dec: row.dec,
  parallax: row.parallax,
  pmra: row.pmra,
  pmdec: row.pmdec,
  radialVelocity: row.radialVelocity,
  radialVelocityError: row.radialVelocityError
})))).digest("hex");

assert.equal(catalog.length, 1393);
assert.equal(selected.length, 1247);
assert.ok(joined.length > 1200);
assert.ok(withRadialVelocity.length > 350);
assert.ok(core.length > 500);

console.log(JSON.stringify({
  authority: {
    membershipSource: "Roeser and Schilbach 2019 VizieR J/A+A/627/A4",
    astrometryAndSpectroscopySource: "Gaia DR3",
    interpretation: "exploratory cross-channel diagnostic; membership was preselected with convergent-point kinematics"
  },
  gaiaJoinedDataSha256,
  counts: {
    catalogue: catalog.length,
    selectedLowContamination: selected.length,
    gaiaDr3MatchedWithAstrometry: joined.length,
    tidalRadiusCore3Point3Deg: core.length,
    innerCore1Point5Deg: innerCore.length,
    radialVelocityErrorAtMost5KmPerSec: withRadialVelocity.length,
    robustRadialVelocityInliersAllMemberFit: analyses.allSelectedMembers.ordinaryLeastSquares.count
  },
  skyPlaneControl: {
    positionAngleEastOfNorthDeg: axis.positionAngle
  },
  robustCentre: { medianRaDeg: medianRa, medianDecDeg: medianDec },
  astrometricRadialVelocityAtRobustCentreKmPerSec: Object.fromEntries(
    Object.entries(velocityFits).map(([name, fit]) => [name, dot(centre, fit.velocity)])
  ),
  fits: analyses,
  falsifierBoundary: {
    independentDiscovery: false,
    constantOffsetIdentifiesT1: false,
    tailGradientCouldInformSpecifiedT1Model: true
  }
}, null, 2));
