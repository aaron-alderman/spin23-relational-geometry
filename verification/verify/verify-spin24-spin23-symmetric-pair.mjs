#!/usr/bin/env node

// Exact integer certificate for the symmetric-pair decomposition
// so(2,4) = so(2,3) + m_5 obtained by stabilizing one positive-norm vector.

const add = (a, b) => a.map((row, i) => row.map((x, j) => x + b[i][j]));
const sub = (a, b) => a.map((row, i) => row.map((x, j) => x - b[i][j]));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mul = (a, b) =>
  a.map((row) =>
    b[0].map((_, j) => row.reduce((sum, x, k) => sum + x * b[k][j], 0)),
  );
const comm = (a, b) => sub(mul(a, b), mul(b, a));
const equal = (a, b) => a.every((row, i) => row.every((x, j) => x === b[i][j]));
const zero = (n, m = n) => Array.from({ length: n }, () => Array(m).fill(0));
const flat = (a) => a.flat();

const rank = (rows) => {
  if (rows.length === 0) return 0;
  const a = rows.map((row) => row.map((x) => BigInt(x)));
  let r = 0;
  for (let c = 0; c < a[0].length && r < a.length; c += 1) {
    const pivot = a.findIndex((row, i) => i >= r && row[c] !== 0n);
    if (pivot < 0) continue;
    [a[r], a[pivot]] = [a[pivot], a[r]];
    for (let i = 0; i < a.length; i += 1) {
      if (i === r || a[i][c] === 0n) continue;
      const p = a[r][c];
      const q = a[i][c];
      a[i] = a[i].map((x, j) => p * x - q * a[r][j]);
    }
    r += 1;
  }
  return r;
};

const metricSigns = [-1, -1, 1, 1, 1, 1];
const eta = metricSigns.map((sign, i) =>
  metricSigns.map((_, j) => (i === j ? sign : 0)),
);

// M_ab has (a,b)=eta_b and (b,a)=-eta_a, so M^T eta + eta M=0.
const generator = (a, b) => {
  const m = zero(6);
  m[a][b] = metricSigns[b];
  m[b][a] = -metricSigns[a];
  return m;
};

const hBasis = [];
for (let a = 0; a < 5; a += 1) {
  for (let b = a + 1; b < 5; b += 1) hBasis.push(generator(a, b));
}

const mBasis = [];
for (let a = 0; a < 5; a += 1) mBasis.push(generator(a, 5));

const fullBasis = [...hBasis, ...mBasis];
const orthogonalCondition = (x) =>
  equal(add(mul(transpose(x), eta), mul(eta, x)), zero(6));

const inSpan = (x, basis) => {
  const before = rank(basis.map(flat));
  const after = rank([...basis.map(flat), flat(x)]);
  return before === after;
};

const bracketChecks = (left, right, target) => {
  const checks = [];
  for (const x of left) {
    for (const y of right) checks.push(inSpan(comm(x, y), target));
  }
  return checks;
};

const hh = bracketChecks(hBasis, hBasis, hBasis);
const hm = bracketChecks(hBasis, mBasis, mBasis);
const mm = bracketChecks(mBasis, mBasis, hBasis);

// The invariant metric on the complement is proportional to the restriction
// diag(-1,-1,+1,+1,+1), since the selected sixth direction has positive norm.
const complementMetric = metricSigns.slice(0, 5);

const report = {
  protocol: "spin24-spin23-symmetric-pair-certificate/1",
  ambientMetricSignature: { negative: 2, positive: 4 },
  selectedVectorNormSign: metricSigns[5],
  stabilizerMetricSignature: { negative: 2, positive: 3 },
  dimensions: {
    so24: fullBasis.length,
    so23: hBasis.length,
    complement: mBasis.length,
  },
  ranks: {
    full: rank(fullBasis.map(flat)),
    stabilizer: rank(hBasis.map(flat)),
    complement: rank(mBasis.map(flat)),
  },
  orthogonalCondition: {
    checked: fullBasis.length,
    passed: fullBasis.every(orthogonalCondition),
  },
  symmetricPairBrackets: {
    hhToH: { checked: hh.length, passed: hh.every(Boolean) },
    hmToM: { checked: hm.length, passed: hm.every(Boolean) },
    mmToH: { checked: mm.length, passed: mm.every(Boolean) },
  },
  complementMetricDiagonal: complementMetric,
  complementMetricSignature: { negative: 2, positive: 3 },
  warning: "The natural invariant coset metric is indefinite; five broken directions are not automatically five healthy scalar Goldstones.",
};

report.passed =
  report.dimensions.so24 === 15 &&
  report.dimensions.so23 === 10 &&
  report.dimensions.complement === 5 &&
  report.ranks.full === 15 &&
  report.ranks.stabilizer === 10 &&
  report.ranks.complement === 5 &&
  report.orthogonalCondition.passed &&
  report.symmetricPairBrackets.hhToH.passed &&
  report.symmetricPairBrackets.hmToM.passed &&
  report.symmetricPairBrackets.mmToH.passed;

console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
