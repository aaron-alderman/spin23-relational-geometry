// Empirical duration accounting. Resolution envelopes are not confidence
// intervals and are not rigorous enclosures of the continuous flow.
export function horizonLabel(runs, horizon) {
  if (runs.some(r => r.numericalStatus !== 'accepted')) return null;
  const labels = runs.map(r => r.event !== null && r.completedCycles <= horizon ? 1 : 0);
  return labels.every(y => y === labels[0]) ? labels[0] : null;
}

export function durationRecord(runs, horizon) {
  if (runs.some(r => r.numericalStatus !== 'accepted')) return {
    status: 'numerically_unresolved', lowerObservedCycles: 0, upperObservedCycles: null,
    restrictedLowerCycles: 0, restrictedUpperCycles: horizon,
    reciprocalDurationRange: {lower: 0, upper: null}};
  const observed = runs.map(r => Math.min(r.completedCycles, horizon));
  const censored = runs.some(r => r.event === null || r.completedCycles > horizon);
  const allCensored = runs.every(r => r.event === null || r.completedCycles > horizon);
  const lower = Math.min(...observed), upper = censored ? null : Math.max(...observed);
  return {status: allCensored ? 'administratively_right_censored' : censored ? 'resolution_disagreement_with_censoring' : 'observed_exit_range',
    lowerObservedCycles: lower, upperObservedCycles: upper,
    restrictedLowerCycles: lower, restrictedUpperCycles: Math.max(...observed),
    reciprocalDurationRange: {lower: upper === null ? 0 : 1 / upper, upper: lower === 0 ? null : 1 / lower},
    interpretation: 'Range across accepted numerical resolutions; not a certified physical enclosure or hazard rate'};
}

export function durationSummary(rows, horizon, runKey = 'runs') {
  const records = rows.map(r => durationRecord(r[runKey], horizon));
  const mean = key => records.reduce((sum, r) => sum + r[key], 0) / records.length;
  const quantile = (values, p) => [...values].sort((a, b) => a - b)[Math.max(0, Math.ceil(values.length * p) - 1)];
  const times = [...new Set([0, horizon, ...rows.flatMap(r => r[runKey].filter(run => run.event !== null)
    .map(run => run.completedCycles).filter(t => t <= horizon))])].sort((a, b) => a - b);
  const curve = times.map(cycles => {
    const labels = rows.map(r => horizonLabel(r[runKey], cycles));
    const survived = labels.filter(y => y === 0).length, exited = labels.filter(y => y === 1).length;
    const unresolved = rows.length - survived - exited;
    return {cycles, survived, exited, unresolved, denominator: rows.length,
      survivalLower: survived / rows.length, survivalUpper: (survived + unresolved) / rows.length};
  });
  return {sampleSize: rows.length, monitoringHorizon: horizon,
    counts: Object.fromEntries(['administratively_right_censored', 'observed_exit_range',
      'resolution_disagreement_with_censoring', 'numerically_unresolved'].map(status => [status, records.filter(r => r.status === status).length])),
    restrictedMeanDuration: {lower: mean('restrictedLowerCycles'), upper: mean('restrictedUpperCycles'),
      interpretation: 'Average min(exit duration, monitoring horizon), with numerical ambiguity retained; no tail extrapolation'},
    quantiles: [.05, .5, .95].map(p => {
      const lower = quantile(records.map(r => r.restrictedLowerCycles), p);
      const upper = quantile(records.map(r => r.restrictedUpperCycles), p);
      return {p, restrictedLowerCycles: lower, restrictedUpperCycles: upper,
        unrestrictedUpperIdentified: upper < horizon, atMonitoringCeiling: lower === horizon && upper === horizon};
    }), curve};
}

const sigmoid = z => z >= 0 ? 1 / (1 + Math.exp(-z)) : Math.exp(z) / (1 + Math.exp(z));
const softplus = z => Math.max(0, z) + Math.log1p(Math.exp(-Math.abs(z)));
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
function solve(matrix, vector) {
  const n = vector.length, rows = matrix.map((r, i) => [...r, vector[i]]);
  for (let k = 0; k < n; k++) {
    let pivot = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(rows[i][k]) > Math.abs(rows[pivot][k])) pivot = i;
    [rows[k], rows[pivot]] = [rows[pivot], rows[k]];
    if (Math.abs(rows[k][k]) < 1e-14) throw new Error('Singular logistic fit');
    const scale = rows[k][k]; for (let j = k; j <= n; j++) rows[k][j] /= scale;
    for (let i = 0; i < n; i++) if (i !== k) {
      const scale = rows[i][k]; for (let j = k; j <= n; j++) rows[i][j] -= scale * rows[k][j];
    }
  }
  return rows.map(r => r[n]);
}

export function fitLogistic(training, featureNames, penalty = 1) {
  if (!training.length) return null;
  const means = featureNames.map(name => training.reduce((sum, r) => sum + r.features[name], 0) / training.length);
  const scales = featureNames.map((name, j) => Math.sqrt(training.reduce((sum, r) =>
    sum + (r.features[name] - means[j]) ** 2, 0) / training.length) || 1);
  const design = training.map(r => [1, ...featureNames.map((name, j) => (r.features[name] - means[j]) / scales[j])]);
  const d = featureNames.length + 1, beta = Array(d).fill(0);
  beta[0] = Math.log((training.filter(r => r.label === 1).length + .5) / (training.filter(r => r.label === 0).length + .5));
  function loss(b) {
    return design.reduce((sum, x, i) => sum + softplus(dot(x, b)) - training[i].label * dot(x, b), 0)
      + .5 * penalty * b.slice(1).reduce((sum, v) => sum + v * v, 0)
      + .5 * (softplus(b[0]) + softplus(-b[0]));
  }
  for (let iteration = 0; iteration < 60; iteration++) {
    const gradient = Array(d).fill(0), hessian = Array.from({length: d}, () => Array(d).fill(0));
    for (let i = 0; i < design.length; i++) {
      const x = design[i], probability = sigmoid(dot(x, beta)), weight = probability * (1 - probability);
      for (let j = 0; j < d; j++) {
        gradient[j] += (probability - training[i].label) * x[j];
        for (let k = 0; k < d; k++) hessian[j][k] += weight * x[j] * x[k];
      }
    }
    for (let j = 1; j < d; j++) { gradient[j] += penalty * beta[j]; hessian[j][j] += penalty; }
    const p0 = sigmoid(beta[0]); gradient[0] += p0 - .5; hessian[0][0] += p0 * (1 - p0);
    const update = solve(hessian, gradient), previous = loss(beta);
    let fraction = 1;
    while (fraction > 1e-8 && loss(beta.map((v, i) => v - fraction * update[i])) > previous) fraction /= 2;
    for (let j = 0; j < d; j++) beta[j] -= fraction * update[j];
    if (Math.max(...update.map(v => Math.abs(fraction * v))) < 1e-9) break;
  }
  return {featureNames, means, scales, beta, penalty, trainingRows: training.length,
    trainingExits: training.filter(r => r.label === 1).length,
    standardization: 'training rows with resolved horizon labels only',
    interceptPrior: 'Beta(0.5,0.5) penalty on intercept probability; no test tuning'};
}
export function predict(model, features) {
  if (model === null) return null;
  return sigmoid(dot(model.beta, [1, ...model.featureNames.map((name, j) => (features[name] - model.means[j]) / model.scales[j])]));
}

export function brierEnvelope(predictions) {
  const rows = predictions.filter(r => r.probability !== null);
  const resolved = rows.filter(r => r.label !== null);
  const sum = (key) => rows.reduce((total, r) => {
    const errors = r.label === null ? [r.probability ** 2, (1 - r.probability) ** 2] : [(r.probability - r.label) ** 2];
    return total + (key === 'lower' ? Math.min(...errors) : Math.max(...errors));
  }, 0) / rows.length;
  return {total: rows.length, resolved: resolved.length, unresolved: rows.length - resolved.length,
    scoreOnResolved: resolved.length ? resolved.reduce((s, r) => s + (r.probability - r.label) ** 2, 0) / resolved.length : null,
    scoreLower: rows.length ? sum('lower') : null, scoreUpper: rows.length ? sum('upper') : null,
    interpretation: 'Best/worst numerical label assignments on the fixed test design, not a sampling confidence interval'};
}
