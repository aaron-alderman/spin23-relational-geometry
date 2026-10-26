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

const icrsToGalacticMatrix = [
  [-0.0548755604, -0.8734370902, -0.4838350155],
  [0.4941094279, -0.4448296300, 0.7469822445],
  [-0.8676661490, -0.1980763734, 0.4559837762]
];
const icrsToGalactic = vector => icrsToGalacticMatrix.map(row => dot(row, vector));
const degrees = angle => angle * 180 / Math.PI;
const acuteAxisAngleDeg = (left, right) => degrees(Math.acos(Math.min(1, Math.abs(dot(left, right)))));

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
  const discriminant = Math.sqrt((xx - yy) ** 2 + 4 * xy ** 2);
  const lambdaMax = 0.5 * (xx + yy + discriminant);
  const lambdaMin = 0.5 * (xx + yy - discriminant);
  return {
    meanRa,
    meanDec,
    cosDec,
    vx,
    vy,
    positionAngle,
    covarianceEigenvaluesDeg2: [lambdaMin, lambdaMax],
    axisRatio: Math.sqrt(lambdaMax / lambdaMin)
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
      "g.ra,g.dec,g.parallax,g.parallax_error,g.pmra,g.pmdec," +
      "g.radial_velocity,g.radial_velocity_error,g.grvs_mag,g.rv_template_teff,g.rv_nb_transits " +
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
          parallaxError: row.parallax_error === "" ? null : Number(row.parallax_error),
          pmra: Number(row.pmra),
          pmdec: Number(row.pmdec),
          radialVelocity: row.radial_velocity === "" ? null : Number(row.radial_velocity),
          radialVelocityError: row.radial_velocity_error === "" ? null : Number(row.radial_velocity_error),
          grvsMag: row.grvs_mag === "" ? null : Number(row.grvs_mag),
          rvTemplateTeff: row.rv_template_teff === "" ? null : Number(row.rv_template_teff),
          rvNbTransits: row.rv_nb_transits === "" ? null : Number(row.rv_nb_transits)
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

const theilSenLine = rows => {
  const slopes = [];
  for (let left = 0; left < rows.length; left += 1) {
    for (let right = left + 1; right < rows.length; right += 1) {
      const difference = rows[right].tailCoordinate - rows[left].tailCoordinate;
      if (Math.abs(difference) > 1e-12) slopes.push((rows[right].residual - rows[left].residual) / difference);
    }
  }
  const slope = median(slopes);
  const intercept = median(rows.map(row => row.residual - slope * row.tailCoordinate));
  return { intercept, slope };
};

const errorSummary = errors => ({
  count: errors.length,
  meanAbsoluteErrorKmPerSec: errors.reduce((sum, value) => sum + Math.abs(value), 0) / errors.length,
  medianAbsoluteErrorKmPerSec: median(errors.map(Math.abs)),
  rootMeanSquareErrorKmPerSec: Math.sqrt(errors.reduce((sum, value) => sum + value * value, 0) / errors.length)
});

const crossValidatedComparison = (rows, foldCount = 5) => {
  const prepared = rows.map(row => ({
    ...row,
    fold: Number.parseInt(createHash("sha256").update(row.dr3SourceId).digest("hex").slice(0, 8), 16) % foldCount
  }));
  const constantErrors = [];
  const linearErrors = [];
  const foldFits = [];
  let linearWins = 0;
  for (let fold = 0; fold < foldCount; fold += 1) {
    const train = prepared.filter(row => row.fold !== fold);
    const test = prepared.filter(row => row.fold === fold);
    const constant = median(train.map(row => row.residual));
    const line = theilSenLine(train);
    foldFits.push({ fold, train: train.length, test: test.length, constantKmPerSec: constant,
      linearInterceptKmPerSec: line.intercept, linearSlopeKmPerSecPerDeg: line.slope });
    for (const row of test) {
      const constantError = row.residual - constant;
      const linearError = row.residual - (line.intercept + line.slope * row.tailCoordinate);
      constantErrors.push(constantError);
      linearErrors.push(linearError);
      if (Math.abs(linearError) < Math.abs(constantError)) linearWins += 1;
    }
  }
  const constant = errorSummary(constantErrors);
  const linear = errorSummary(linearErrors);
  const pairedAbsoluteErrorDeltas = linearErrors.map((value, index) =>
    Math.abs(value) - Math.abs(constantErrors[index]));
  const bootstrapRandom = seededGenerator(0x484f4c44);
  const bootstrapMeans = [];
  for (let iteration = 0; iteration < 5000; iteration += 1) {
    let sum = 0;
    for (let draw = 0; draw < pairedAbsoluteErrorDeltas.length; draw += 1) {
      sum += pairedAbsoluteErrorDeltas[Math.floor(bootstrapRandom() * pairedAbsoluteErrorDeltas.length)];
    }
    bootstrapMeans.push(sum / pairedAbsoluteErrorDeltas.length);
  }
  bootstrapMeans.sort((left, right) => left - right);
  return {
    status: "retrospective rehearsal, not confirmatory: the aggregate gradient was inspected before this split was frozen",
    split: "five folds from sha256(dr3SourceId) modulo 5",
    constantProjectionT1Model: constant,
    ordinaryLinearTailModel: linear,
    deltaMeanAbsoluteErrorOrdinaryMinusConstantKmPerSec:
      linear.meanAbsoluteErrorKmPerSec - constant.meanAbsoluteErrorKmPerSec,
    pairedBootstrap: {
      iterations: 5000,
      seedHex: "0x484f4c44",
      meanAbsoluteErrorDelta95PercentIntervalKmPerSec: [
        bootstrapMeans[Math.floor(0.025 * bootstrapMeans.length)],
        bootstrapMeans[Math.floor(0.975 * bootstrapMeans.length)]
      ]
    },
    ordinaryLinearAbsoluteErrorWins: linearWins,
    constantAbsoluteErrorWinsOrTies: rows.length - linearWins,
    foldFits
  };
};

const quantile = (values, probability) => {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.floor(probability * (sorted.length - 1))];
};

const fitFeature = (rows, feature) => {
  const transformed = rows.map(row => ({ ...row, tailCoordinate: feature(row.tailCoordinate) }));
  const line = theilSenLine(transformed);
  const predict = row => line.intercept + line.slope * feature(row.tailCoordinate);
  const meanAbsoluteError = rows.reduce((sum, row) => sum + Math.abs(row.residual - predict(row)), 0) / rows.length;
  return { ...line, predict, meanAbsoluteError };
};

const pairedBootstrapInterval = (candidateErrors, constantErrors, seed) => {
  const deltas = candidateErrors.map((value, index) => Math.abs(value) - Math.abs(constantErrors[index]));
  const random = seededGenerator(seed);
  const means = [];
  for (let iteration = 0; iteration < 3000; iteration += 1) {
    let sum = 0;
    for (let draw = 0; draw < deltas.length; draw += 1) sum += deltas[Math.floor(random() * deltas.length)];
    means.push(sum / deltas.length);
  }
  means.sort((left, right) => left - right);
  return [means[Math.floor(0.025 * means.length)], means[Math.floor(0.975 * means.length)]];
};

const crossValidatedShapeTournament = (rows, foldCount = 5) => {
  const prepared = rows.map(row => ({
    ...row,
    fold: Number.parseInt(createHash("sha256").update(row.dr3SourceId).digest("hex").slice(0, 8), 16) % foldCount
  }));
  const names = ["linearTail", "sharpStep", "smoothStep", "clusterRelaxation", "boundaryLayer"];
  const errors = Object.fromEntries(["constant", ...names].map(name => [name, []]));
  const selections = [];
  for (let fold = 0; fold < foldCount; fold += 1) {
    const train = prepared.filter(row => row.fold !== fold);
    const test = prepared.filter(row => row.fold === fold);
    const centreCandidates = Array.from({ length: 9 }, (_, index) =>
      quantile(train.map(row => row.tailCoordinate), 0.1 * (index + 1)));
    const widths = [0.25, 0.5, 1, 2, 4, 8, 16, 32, 64];
    const constant = median(train.map(row => row.residual));
    const families = {
      linearTail: [{ parameters: {}, feature: value => value }],
      sharpStep: centreCandidates.map(centre => ({
        parameters: { centreDeg: centre }, feature: value => value < centre ? -1 : 1
      })),
      smoothStep: centreCandidates.flatMap(centre => widths.map(width => ({
        parameters: { centreDeg: centre, widthDeg: width },
        feature: value => Math.tanh((value - centre) / width)
      }))),
      clusterRelaxation: widths.map(length => ({
        parameters: { lengthDeg: length }, feature: value => Math.exp(-Math.abs(value) / length)
      })),
      boundaryLayer: centreCandidates.flatMap(centre => widths.map(width => ({
        parameters: { centreDeg: centre, widthDeg: width },
        feature: value => 1 / Math.cosh((value - centre) / width) ** 2
      })))
    };
    const selected = {};
    for (const name of names) {
      let best = null;
      for (const candidate of families[name]) {
        const fit = fitFeature(train, candidate.feature);
        if (best === null || fit.meanAbsoluteError < best.fit.meanAbsoluteError) best = { candidate, fit };
      }
      selected[name] = {
        ...best.candidate.parameters,
        interceptKmPerSec: best.fit.intercept,
        amplitudeKmPerSec: best.fit.slope,
        trainingMeanAbsoluteErrorKmPerSec: best.fit.meanAbsoluteError
      };
      for (const row of test) errors[name].push(row.residual - best.fit.predict(row));
    }
    for (const row of test) errors.constant.push(row.residual - constant);
    selections.push({ fold, train: train.length, test: test.length, selected });
  }
  const constantSummary = errorSummary(errors.constant);
  const summary = { constant: constantSummary };
  names.forEach((name, index) => {
    const candidate = errorSummary(errors[name]);
    summary[name] = {
      ...candidate,
      deltaMeanAbsoluteErrorVersusConstantKmPerSec:
        candidate.meanAbsoluteErrorKmPerSec - constantSummary.meanAbsoluteErrorKmPerSec,
      pairedBootstrapDelta95PercentIntervalKmPerSec:
        pairedBootstrapInterval(errors[name], errors.constant, 0x4d343400 + index)
    };
  });
  const pairwiseAgainstLinear = Object.fromEntries(names.filter(name => name !== "linearTail").map((name, index) => {
    const candidate = summary[name];
    const linear = summary.linearTail;
    return [name, {
      deltaMeanAbsoluteErrorCandidateMinusLinearKmPerSec:
        candidate.meanAbsoluteErrorKmPerSec - linear.meanAbsoluteErrorKmPerSec,
      pairedBootstrapDelta95PercentIntervalKmPerSec:
        pairedBootstrapInterval(errors[name], errors.linearTail, 0x4c494e00 + index)
    }];
  }));
  return {
    status: "retrospective nested-cross-validation shape tournament; hypothesis discovery only",
    coordinate: "signed angular coordinate along the published-catalogue sky-plane principal axis",
    folds: "sha256(dr3SourceId) modulo 5",
    trainingSelection: "candidate boundary centres are training-fold deciles; widths/lengths are frozen at 0.25, 0.5, 1, 2, 4, 8, 16, 32 and 64 degrees; Theil-Sen amplitude and intercept minimize candidate training MAE",
    models: {
      constant: "a",
      linearTail: "a+b*s",
      sharpStep: "a+b*sign(s-s0)",
      smoothStep: "a+b*tanh((s-s0)/w)",
      clusterRelaxation: "a+b*exp(-abs(s)/ell)",
      boundaryLayer: "a+b*sech^2((s-s0)/w)"
    },
    heldOut: summary,
    pairwiseAgainstLinear,
    selections
  };
};

const positionFromAstrometry = row => {
  const distancePc = 1000 / row.parallax;
  return basisAt(row.ra, row.dec).radial.map(component => component * distancePc);
};

const principalAxis3d = rows => {
  const positioned = rows.map(row => ({ row, position: positionFromAstrometry(row) }));
  const centre = [0, 1, 2].map(index => median(positioned.map(item => item.position[index])));
  const covariance = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (const item of positioned) {
    const delta = item.position.map((value, index) => value - centre[index]);
    for (let left = 0; left < 3; left += 1) {
      for (let right = 0; right < 3; right += 1) covariance[left][right] += delta[left] * delta[right];
    }
  }
  let vector = [1, 1, 1].map(value => value / Math.sqrt(3));
  for (let iteration = 0; iteration < 100; iteration += 1) {
    const next = covariance.map(row => dot(row, vector));
    const norm = Math.hypot(...next);
    vector = next.map(value => value / norm);
  }
  const coordinate = row => dot(positionFromAstrometry(row).map((value, index) => value - centre[index]), vector);
  return { centre, vector, coordinate };
};

const gaussianGenerator = seed => {
  const uniform = seededGenerator(seed);
  let spare = null;
  return () => {
    if (spare !== null) {
      const value = spare;
      spare = null;
      return value;
    }
    const radius = Math.sqrt(-2 * Math.log(Math.max(uniform(), Number.EPSILON)));
    const angle = 2 * Math.PI * uniform();
    spare = radius * Math.sin(angle);
    return radius * Math.cos(angle);
  };
};

const summarize3dTail = rows => {
  const usable = rows.filter(row => finite(row.tailCoordinate3dPc) && finite(row.tailCoordinate3dSigmaPc));
  const residualMedian = median(usable.map(row => row.residual));
  const residualMad = median(usable.map(row => Math.abs(row.residual - residualMedian)));
  const robustSigma = 1.4826 * residualMad;
  const inliers = usable.filter(row => Math.abs(row.residual - residualMedian) <= 3 * Math.max(robustSigma, 0.5));
  const nominal = linearSummary(inliers.map(row => ({ ...row, tailCoordinate: row.tailCoordinate3dPc })));
  const gaussian = gaussianGenerator(0x33445441);
  const slopes = [];
  for (let iteration = 0; iteration < 2000; iteration += 1) {
    const perturbed = inliers.map(row => ({
      ...row,
      tailCoordinate: row.tailCoordinate3dPc + gaussian() * row.tailCoordinate3dSigmaPc
    }));
    slopes.push(linearSummary(perturbed).slopeKmPerSecPerDeg);
  }
  slopes.sort((left, right) => left - right);
  const ordered = [...inliers].sort((left, right) => left.tailCoordinate3dPc - right.tailCoordinate3dPc);
  const bins = [];
  const binCount = 12;
  for (let index = 0; index < binCount; index += 1) {
    const slice = ordered.slice(Math.floor(index * ordered.length / binCount), Math.floor((index + 1) * ordered.length / binCount));
    bins.push({
      count: slice.length,
      tailCoordinatePc: median(slice.map(row => row.tailCoordinate3dPc)),
      tailCoordinateSigmaPc: median(slice.map(row => row.tailCoordinate3dSigmaPc)),
      residualKmPerSec: median(slice.map(row => row.residual)),
      residualErrorKmPerSec: median(slice.map(row => row.radialVelocityError)),
      spectralShiftPartsPerMillion: median(slice.map(row => row.residual / 299792.458 * 1e6))
    });
  }
  const spectral = inliers.filter(row => finite(row.rvTemplateTeff));
  const meanTail = spectral.reduce((sum, row) => sum + row.tailCoordinate3dPc, 0) / spectral.length;
  const meanTemperature = spectral.reduce((sum, row) => sum + row.rvTemplateTeff, 0) / spectral.length;
  const meanResidual = spectral.reduce((sum, row) => sum + row.residual, 0) / spectral.length;
  const normal = [[spectral.length, 0, 0], [0, 0, 0], [0, 0, 0]];
  const right = [spectral.length * meanResidual, 0, 0];
  for (const row of spectral) {
    const tail = row.tailCoordinate3dPc - meanTail;
    const temperature = (row.rvTemplateTeff - meanTemperature) / 1000;
    normal[1][1] += tail * tail;
    normal[1][2] += tail * temperature;
    normal[2][1] += tail * temperature;
    normal[2][2] += temperature * temperature;
    right[1] += tail * row.residual;
    right[2] += temperature * row.residual;
  }
  const spectralCoefficients = solve3(normal, right);
  const surfaceCells = [];
  const tailCuts = Array.from({ length: 7 }, (_, index) => quantile(spectral.map(row => row.tailCoordinate3dPc), index / 6));
  const temperatureCuts = [3000, 4000, 5000, 6000, 7500, 10000];
  for (let tailIndex = 0; tailIndex < tailCuts.length - 1; tailIndex += 1) {
    for (let temperatureIndex = 0; temperatureIndex < temperatureCuts.length - 1; temperatureIndex += 1) {
      const cell = spectral.filter(row => row.tailCoordinate3dPc >= tailCuts[tailIndex] &&
        (tailIndex === tailCuts.length - 2 ? row.tailCoordinate3dPc <= tailCuts[tailIndex + 1] : row.tailCoordinate3dPc < tailCuts[tailIndex + 1]) &&
        row.rvTemplateTeff >= temperatureCuts[temperatureIndex] && row.rvTemplateTeff < temperatureCuts[temperatureIndex + 1]);
      if (cell.length >= 3) surfaceCells.push({
        count: cell.length,
        tailCoordinatePc: median(cell.map(row => row.tailCoordinate3dPc)),
        templateTeffK: median(cell.map(row => row.rvTemplateTeff)),
        residualKmPerSec: median(cell.map(row => row.residual)),
        spectralShiftPartsPerMillion: median(cell.map(row => row.residual / 299792.458 * 1e6))
      });
    }
  }
  return {
    usable: usable.length,
    robustInliers: inliers.length,
    nominalSlopeKmPerSecPerPc: nominal.slopeKmPerSecPerDeg,
    parallaxPerturbedSlope95PercentIntervalKmPerSecPerPc: [slopes[50], slopes[1950]],
    parallaxPerturbation: "2000 deterministic Gaussian draws of the along-axis coordinate only; membership and common-velocity fit held fixed",
    bins,
    spectralControl: {
      recordsWithRvTemplateTemperature: spectral.length,
      tailSlopeControllingTemplateTemperatureKmPerSecPerPc: spectralCoefficients[1],
      templateTemperatureSlopeControllingTailKmPerSecPer1000K: spectralCoefficients[2],
      surfaceCells
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
const tail3d = principalAxis3d(joined);
const axisAlignment = joined.reduce((sum, row) => sum + tailCoordinate(row) * tail3d.coordinate(row), 0);
if (axisAlignment < 0) tail3d.vector.forEach((value, index) => { tail3d.vector[index] = -value; });
const withRadialVelocity = joined
  .filter(row => finite(row.radialVelocity) && finite(row.radialVelocityError) && row.radialVelocityError <= 5)
  .map(row => ({
    ...row,
    tailCoordinate: tailCoordinate(row),
    tailCoordinate3dPc: tail3d.coordinate(row),
    tailCoordinate3dSigmaPc: finite(row.parallaxError)
      ? Math.abs(dot(basisAt(row.ra, row.dec).radial, tail3d.vector)) * 1000 * row.parallaxError / row.parallax ** 2
      : null,
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
const fullBaselineResidualRows = withRadialVelocity.map(row => ({
  ...row,
  residual: row.radialVelocity - dot(basisAt(row.ra, row.dec).radial, velocityFits.allSelectedMembers.velocity)
}));
const heldOutRehearsal = crossValidatedComparison(fullBaselineResidualRows);
const shapeTournament = process.argv.includes("--quick")
  ? { status: "omitted by --quick" }
  : crossValidatedShapeTournament(fullBaselineResidualRows);
const threeDimensionalTail = summarize3dTail(fullBaselineResidualRows);
const centre = basisAt(medianRa, medianDec).radial;
const centreGalacticPc = icrsToGalactic(tail3d.centre);
const tailAxisGalactic = icrsToGalactic(tail3d.vector);
const centreDistancePc = Math.hypot(...centreGalacticPc);
const centreDirectionGalactic = centreGalacticPc.map(value => value / centreDistancePc);
const centreGalacticLongitudeDeg = ((degrees(Math.atan2(centreGalacticPc[1], centreGalacticPc[0])) % 360) + 360) % 360;
const centreGalacticLatitudeDeg = degrees(Math.asin(centreDirectionGalactic[2]));
const lineOfSightDiskInclinationDeg = 90 - Math.abs(centreGalacticLatitudeDeg);
const tailTiltFromGalacticPlaneDeg = degrees(Math.asin(Math.abs(tailAxisGalactic[2])));
const conditionalTailAsT1AngleFromDiskNormalDeg = 90 - tailTiltFromGalacticPlaneDeg;
const tailLineOfSightAcuteAngleDeg = acuteAxisAngleDeg(tailAxisGalactic, centreDirectionGalactic);
const radiansLineOfSightInclination = radians(lineOfSightDiskInclinationDeg);
const radiansConditionalT1Angle = radians(conditionalTailAsT1AngleFromDiskNormalDeg);
const azimuthAveragedDirectOverlapRms = Math.sqrt(
  Math.cos(radiansLineOfSightInclination) ** 2 * Math.cos(radiansConditionalT1Angle) ** 2 +
  0.5 * Math.sin(radiansLineOfSightInclination) ** 2 * Math.sin(radiansConditionalT1Angle) ** 2
);
const solarGalactocentricRadiusKpc = 8.15;
const centreGalactocentricRadiusKpc = Math.hypot(
  solarGalactocentricRadiusKpc - centreGalacticPc[0] / 1000,
  centreGalacticPc[1] / 1000
);
const conditionalAngleRad = radians(conditionalTailAsT1AngleFromDiskNormalDeg);
const directT1Overlap = Math.abs(Math.cos(conditionalAngleRad));
const crossT2Overlap = Math.abs(Math.sin(conditionalAngleRad));
const meanResidualFractionOfC = analyses.allSelectedMembers.ordinaryLeastSquares.meanResidual / 299792.458;
const qForUnitResponse = (1 - directT1Overlap) / crossT2Overlap;
const qForMeanResidualResponse = (1 + meanResidualFractionOfC - directT1Overlap) / crossT2Overlap;
const isotropicMeanRetainedPower = (2 + directT1Overlap ** 2) / 3;
const isotropicRmsRetainedAmplitude = Math.sqrt(isotropicMeanRetainedPower);
const gaiaJoinedDataSha256 = createHash("sha256").update(JSON.stringify(joined.map(row => ({
  dr2SourceId: row.dr2SourceId,
  dr3SourceId: row.dr3SourceId,
  ra: row.ra,
  dec: row.dec,
  parallax: row.parallax,
  parallaxError: row.parallaxError,
  pmra: row.pmra,
  pmdec: row.pmdec,
  radialVelocity: row.radialVelocity,
  radialVelocityError: row.radialVelocityError,
  grvsMag: row.grvsMag,
  rvTemplateTeff: row.rvTemplateTeff,
  rvNbTransits: row.rvNbTransits
})))).digest("hex");

assert.equal(catalog.length, 1393);
assert.equal(selected.length, 1247);
assert.ok(joined.length > 1200);
assert.ok(withRadialVelocity.length > 350);
assert.ok(core.length > 500);

if (process.argv.includes("--hash-only")) {
  console.log(gaiaJoinedDataSha256);
  process.exit(0);
}

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
    positionAngleEastOfNorthDeg: axis.positionAngle,
    covarianceEigenvaluesDeg2: axis.covarianceEigenvaluesDeg2,
    axisRatio: axis.axisRatio
  },
  robustCentre: { medianRaDeg: medianRa, medianDecDeg: medianDec },
  astrometricRadialVelocityAtRobustCentreKmPerSec: Object.fromEntries(
    Object.entries(velocityFits).map(([name, fit]) => [name, dot(centre, fit.velocity)])
  ),
  fits: analyses,
  heldOutRehearsal,
  shapeTournament,
  threeDimensionalTail: {
    axisIcrs: tail3d.vector,
    centreIcrsPc: tail3d.centre,
    ...threeDimensionalTail
  },
  spiralInclinationSlice: {
    centreGalacticCartesianPc: centreGalacticPc,
    centreGalacticLongitudeDeg,
    centreGalacticLatitudeDeg,
    centreDistancePc,
    adoptedSolarGalactocentricRadiusKpc: solarGalactocentricRadiusKpc,
    centreGalactocentricRadiusKpc,
    lineOfSightDiskInclinationDeg,
    tailAxisGalactic,
    tailTiltFromGalacticPlaneDeg,
    tailLineOfSightAcuteAngleDeg,
    conditionalTailAsT1: {
      angleFromDiskNormalDeg: conditionalTailAsT1AngleFromDiskNormalDeg,
      actualDirectOverlapAbsCos: Math.abs(dot(tailAxisGalactic, centreDirectionGalactic)),
      azimuthAveragedDirectOverlapRms
    },
    convention: "external-galaxy inclination i=0 is face-on and i=90 is edge-on; the tail-as-T1 values are a geometric conditional, not an identification"
  },
  corpusDerivedHypothesisTournament: {
    angleStatus: "conditional tail-as-M44-T1 and Galactic-normal-as-local-T1 hypothesis",
    relativeAngleDeg: conditionalTailAsT1AngleFromDiskNormalDeg,
    uniqueDirectionScalarFrequencyProjection: {
      directT1Overlap,
      crossT2Overlap,
      directIntensityFraction: directT1Overlap ** 2,
      crossIntensityFraction: crossT2Overlap ** 2,
      qRequiredForUnitResponse: qForUnitResponse,
      qRequiredForObservedMeanResidualResponse: qForMeanResidualResponse,
      observedMeanResidualFractionOfC: meanResidualFractionOfC,
      result: "for a carrier known to occupy the unique rotated direction, a near-quarter-turn cannot produce only a ppm-scale shift through the scalar kernel unless q is about 0.95 or an independent normalization cancels the order-one projection",
      scope: "this is not a whole-object brightness law; two spatial directions are shared in the rank-two-plus-one frame model"
    },
    uniquePlaneTwoChannelRotation: {
      totalNormFraction: directT1Overlap ** 2 + crossT2Overlap ** 2,
      observedDirectChannelFraction: directT1Overlap ** 2,
      hiddenOrCrossChannelFraction: crossT2Overlap ** 2,
      result: "within the unique rotated two-plane, a unitary channel rotation preserves norm but predicts an almost complete channel swap; total brightness alone cannot distinguish it"
    },
    rankTwoPlusOneSpatialFrameProjection: {
      ambientDimension: 4,
      sourceAndObserverSubspaceDimension: 3,
      guaranteedIntersectionDimensionAtLeast: 2,
      singularValues: [1, 1, directT1Overlap],
      rankAtExactly90Deg: 2,
      uniqueDirectionAmplitudeFraction: directT1Overlap,
      uniqueDirectionPowerFraction: directT1Overlap ** 2,
      isotropicMeanRetainedPower,
      isotropicRmsRetainedAmplitude,
      isotropicMeanLostPower: 1 - isotropicMeanRetainedPower,
      volumeCompressionAbsDeterminant: directT1Overlap,
      conditionNumber: 1 / directT1Overlap,
      observedCatalogueSkyPlaneAxisRatio: axis.axisRatio,
      result: "two directions transmit unchanged and one is compressed; the two-dimensional sky axis ratio cannot be compared directly with the three-dimensional condition number without the intrinsic covariance and viewing map",
      status: "non-identifying with present data; the earlier direct axis-ratio rejection is withdrawn"
    }
  },
  falsifierBoundary: {
    independentDiscovery: false,
    constantOffsetIdentifiesT1: false,
    frozenCorpusNativeT1Model: "constant projection factor; predictively identical to intercept-only null",
    spatiallyVaryingT1LawAvailable: false,
    tailGradientCouldInformSpecifiedT1Model: true
  }
}, null, 2));
