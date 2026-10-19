// Deterministic numerical search over the complete ordinary-cubic,
// all-nonzero, rank-one two-component texture described in document 179.
// This is an exploratory search, not an exact no-go certificate.

const z = (re, im = 0) => [re, im];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const conj = a => [a[0], -a[1]];
const scale = (a, s) => [a[0] * s, a[1] * s];
const abs2 = a => a[0] * a[0] + a[1] * a[1];
const zeroM = () => [[z(0), z(0)], [z(0), z(0)]];
const addM = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const scaleM = (A, s) => A.map(row => row.map(x => mul(x, s)));
const dagger = A => A[0].map((_, i) => A.map(row => conj(row[i])));
const mulM = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), z(0))));
const norm2M = A => A.flat().reduce((s, x) => s + abs2(x), 0);
const identity = [[z(1), z(0)], [z(0), z(1)]];

const determinant3 = R =>
  R[0][0] * (R[1][1] * R[2][2] - R[1][2] * R[2][1])
  - R[0][1] * (R[1][0] * R[2][2] - R[1][2] * R[2][0])
  + R[0][2] * (R[1][0] * R[2][1] - R[1][1] * R[2][0]);
const permutations = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
const rotations = [];
for (const p of permutations) for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
  const signs = [sx, sy, sz];
  const R = Array.from({ length: 3 }, () => [0, 0, 0]);
  for (let i = 0; i < 3; i++) R[i][p[i]] = signs[i];
  if (determinant3(R) === 1) rotations.push(R);
}

const mv = (R, v) => R.map(row => row.reduce((s, x, j) => s + x * v[j], 0));
const key = e => e.join(',');
const e0 = [1, 2, 2];
const mixedRotations = new Map(rotations.map(R => [key(mv(R, e0)), R]));
if (rotations.length !== 24 || mixedRotations.size !== 24) throw new Error('cubic orbit construction failed');

const axis = [
  [3, 0, 0], [-3, 0, 0], [0, 3, 0], [0, -3, 0], [0, 0, 3], [0, 0, -3],
];
const mixed = [...mixedRotations.keys()].map(s => s.split(',').map(Number));
const shell = [...axis, ...mixed];
const shellIndex = new Map(shell.map((e, i) => [key(e), i]));
const differences = new Map();
for (let i = 0; i < shell.length; i++) for (let j = 0; j < shell.length; j++) {
  const r = shell[j].map((x, q) => x - shell[i][q]);
  const k = key(r);
  const pairs = differences.get(k) ?? [];
  pairs.push([i, j]);
  differences.set(k, pairs);
}

const spinor = n => {
  if (n[2] < -0.999999999) return [z(0), z(1)];
  const first = Math.sqrt((1 + n[2]) / 2);
  const denom = Math.sqrt(2 * (1 + n[2]));
  return [z(first), z(n[0] / denom, n[1] / denom)];
};
const outer = (r, d) => r.map(x => d.map(y => mul(x, conj(y))));
const pauliCoefficients = A => ({
  a: scale(add(A[0][0], A[1][1]), 0.5),
  v: [
    scale(add(A[0][1], A[1][0]), 0.5),
    mul(z(0, -0.5), sub(A[1][0], A[0][1])),
    scale(sub(A[0][0], A[1][1]), 0.5),
  ],
});
const fromPauli = ({ a, v }) => [
  [add(a, v[2]), sub(v[0], mul(z(0, 1), v[1]))],
  [add(v[0], mul(z(0, 1), v[1])), sub(a, v[2])],
];
const rotateMatrix = (A, R) => {
  const q = pauliCoefficients(A);
  const v = R.map(row => row.reduce((s, x, j) => add(s, scale(q.v[j], x)), z(0)));
  return fromPauli({ a: q.a, v });
};
const projector = n => outer(spinor(n), spinor(n));

const amplitudes = params => {
  const [gamma, phi, thetaR, thetaD] = params;
  const alpha = Math.cos(gamma) / Math.sqrt(3);
  const beta = scale(z(Math.cos(phi), Math.sin(phi)), Math.sin(gamma) / Math.sqrt(12));
  const planeVector = theta => [Math.cos(theta), Math.sin(theta) / Math.sqrt(2), Math.sin(theta) / Math.sqrt(2)];
  const A0 = scaleM(outer(spinor(planeVector(thetaR)), spinor(planeVector(thetaD))), beta);
  const result = [];
  for (const e of axis) result.push(scaleM(projector(e.map(x => x / 3)), z(alpha)));
  for (const e of mixed) result.push(rotateMatrix(A0, mixedRotations.get(key(e))));
  return result;
};

const objective = params => {
  const A = amplitudes(params);
  let residual = 0;
  for (const [r, pairs] of differences) {
    let left = zeroM();
    let right = zeroM();
    for (const [i, j] of pairs) {
      left = addM(left, mulM(dagger(A[i]), A[j]));
      right = addM(right, mulM(A[i], dagger(A[j])));
    }
    if (r === '0,0,0') {
      left = left.map((row, i) => row.map((x, j) => sub(x, identity[i][j])));
      right = right.map((row, i) => row.map((x, j) => sub(x, identity[i][j])));
    }
    residual += norm2M(left) + norm2M(right);
  }
  return residual;
};

const residualBreakdown = params => {
  const A = amplitudes(params);
  const rows = [];
  for (const [r, pairs] of differences) {
    let left = zeroM();
    let right = zeroM();
    for (const [i, j] of pairs) {
      left = addM(left, mulM(dagger(A[i]), A[j]));
      right = addM(right, mulM(A[i], dagger(A[j])));
    }
    if (r === '0,0,0') {
      left = left.map((row, i) => row.map((x, j) => sub(x, identity[i][j])));
      right = right.map((row, i) => row.map((x, j) => sub(x, identity[i][j])));
    }
    rows.push({ r, multiplicity: pairs.length, residual: norm2M(left) + norm2M(right) });
  }
  return rows.sort((a, b) => b.residual - a.residual);
};

const wrap = p => [
  Math.max(0, Math.min(Math.PI / 2, p[0])),
  Math.atan2(Math.sin(p[1]), Math.cos(p[1])),
  Math.atan2(Math.sin(p[2]), Math.cos(p[2])),
  Math.atan2(Math.sin(p[3]), Math.cos(p[3])),
];

// Deterministic Nelder-Mead in four variables, restarted from a fixed lattice.
const nelderMead = start => {
  const n = start.length;
  let simplex = [wrap(start), ...start.map((_, i) => wrap(start.map((x, j) => x + (i === j ? 0.31 : 0))))];
  let values = simplex.map(objective);
  for (let iteration = 0; iteration < 900; iteration++) {
    const order = values.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
    simplex = order.map(i => simplex[i]); values = order.map(i => values[i]);
    const centroid = Array(n).fill(0);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) centroid[j] += simplex[i][j] / n;
    const trial = factor => wrap(centroid.map((x, j) => x + factor * (x - simplex[n][j])));
    const reflected = trial(1); const fr = objective(reflected);
    if (fr < values[0]) {
      const expanded = trial(2); const fe = objective(expanded);
      if (fe < fr) { simplex[n] = expanded; values[n] = fe; } else { simplex[n] = reflected; values[n] = fr; }
    } else if (fr < values[n - 1]) {
      simplex[n] = reflected; values[n] = fr;
    } else {
      const contracted = trial(-0.5); const fc = objective(contracted);
      if (fc < values[n]) { simplex[n] = contracted; values[n] = fc; }
      else {
        for (let i = 1; i <= n; i++) {
          simplex[i] = wrap(simplex[0].map((x, j) => x + 0.5 * (simplex[i][j] - x)));
          values[i] = objective(simplex[i]);
        }
      }
    }
  }
  const order = values.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
  return { value: order[0][0], params: simplex[order[0][1]] };
};

let best = { value: Infinity, params: null };
const restartValues = [];
for (const gamma of [0.2, 0.55, 0.9, 1.25]) for (const phi of [0, 1.1, 2.2]) {
  const result = nelderMead([gamma, phi, 0.4 + phi / 3, -0.7 + gamma]);
  restartValues.push(result.value);
  if (result.value < best.value) best = result;
}

console.log(JSON.stringify({
  bestResidual: best.value,
  params: best.params,
  restartRange: [Math.min(...restartValues), Math.max(...restartValues)],
  topResiduals: residualBreakdown(best.params).slice(0, 12),
  rotations: rotations.length,
  differences: differences.size,
}, null, 2));
