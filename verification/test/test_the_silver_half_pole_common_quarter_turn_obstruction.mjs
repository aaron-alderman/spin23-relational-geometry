import assert from 'node:assert/strict';

const lambda = 3 + 2 * Math.SQRT2;
assert.ok(Math.abs(lambda * lambda - 6 * lambda + 1) < 1e-13);

// A common positive duration T would require
// b1 T=(q pi)/2 and b2 T=(p pi)/2 with p,q odd, hence lambda=p/q.
// The exact ratio is irrational, so no such integers exist.
const expectedRecords = [
  [5, 1, -4],
  [17, 3, -8],
  [29, 5, -4],
  [99, 17, -8],
  [169, 29, -4],
  [577, 99, -8],
  [985, 169, -4],
  [3363, 577, -8],
  [5741, 985, -4],
  [19601, 3363, -8],
  [33461, 5741, -4],
];

let best = Number.POSITIVE_INFINITY;
const records = [];
for (let q = 1; q <= 5741; q += 2) {
  let p = Math.round(lambda * q);
  if (p % 2 === 0) {
    const lower = p - 1;
    const upper = p + 1;
    p = Math.abs(lower - lambda * q) < Math.abs(upper - lambda * q) ? lower : upper;
  }
  const linearError = Math.abs(lambda * q - p);
  if (linearError < best) {
    best = linearError;
    records.push({
      p,
      q,
      pellResidual: p * p - 6 * p * q + q * q,
      phaseMismatch: (Math.PI / 2) * linearError,
    });
  }
}

assert.deepEqual(
  records.map(({ p, q, pellResidual }) => [p, q, pellResidual]),
  expectedRecords,
);
assert.ok(records.every(({ p, q }) => p % 2 === 1 && q % 2 === 1));
assert.ok(records.every((r, i) => i === 0 || r.phaseMismatch < records[i - 1].phaseMismatch));

console.log(JSON.stringify({
  protocol: 'silver-half-pole-common-quarter-turn-obstruction/1',
  halfPoleRatio: 'b2/b1=3+2 sqrt(2)',
  simultaneousCondition: 'b1 T=(q pi)/2, b2 T=(p pi)/2 with p,q odd',
  exactCommonDurationExists: false,
  proof: 'the simultaneous condition makes b2/b1=p/q rational, contradicting sqrt(2) irrational',
  leastPositiveQuarterTurnForBothExists: false,
  approximateOddOddRecords: records,
  interpretation: 'near recurrences require increasingly long multi-turn actions and do not select one edge duration',
  passed: true,
}, null, 2));
