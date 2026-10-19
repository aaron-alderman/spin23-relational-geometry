import assert from 'node:assert/strict';

const abs = x => x < 0n ? -x : x;
const gcd = (a, b) => { a = abs(a); b = abs(b); while (b) [a, b] = [b, a % b]; return a || 1n; };
const Q = (n, d = 1n) => { n = BigInt(n); d = BigInt(d); if (d < 0n) [n, d] = [-n, -d]; const g = gcd(n, d); return [n / g, d / g]; };
const add = (a, b) => Q(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const sub = (a, b) => add(a, [-b[0], b[1]]);
const mul = (a, b) => Q(a[0] * b[0], a[1] * b[1]);
const div = (a, b) => Q(a[0] * b[1], a[1] * b[0]);
const zero = a => a[0] === 0n;
const qv = x => x.map(v => Q(v));
const T = A => A[0].map((_, j) => A.map(r => r[j]));
const cols = xs => T(xs);
const MV = (A, x) => A.map(r => r.reduce((s, a, i) => add(s, mul(a, x[i])), Q(0)));

function rank(A) {
  A = A.map(r => r.map(x => [...x]));
  let row = 0;
  for (let col = 0; col < A[0].length && row < A.length; col++) {
    const p = A.findIndex((r, i) => i >= row && !zero(r[col]));
    if (p < 0) continue;
    [A[row], A[p]] = [A[p], A[row]];
    const pivot = A[row][col];
    A[row] = A[row].map(x => div(x, pivot));
    for (let i = 0; i < A.length; i++) if (i !== row && !zero(A[i][col])) {
      const f = A[i][col];
      A[i] = A[i].map((x, j) => sub(x, mul(f, A[row][j])));
    }
    row++;
  }
  return row;
}

const V = [
  qv([1, 1, 0, 0, 0, 0, 1]),
  qv([1, 0, 1, 0, 0, 0, -1]),
  qv([0, 0, 0, 1, 1, 0, -1]),
  qv([0, 0, 0, 1, 0, 1, 1]),
];
const names = ['up', 'down', 'charged-lepton', 'neutrino'];
const Dinv = [Q(1, 6), Q(1, 3), Q(1, 3), Q(1, 2), Q(1), Q(1), Q(1)];
const dual = V.map(row => row.map((x, i) => mul(Dinv[i], x)));
const Y = qv([1, -4, 2, -3, 6, 0, 3]);
const qBL = qv([1, -1, -1, -3, 3, 3, 0]);
const lambdaD = qv([5, 5, 1, 1, 1, 0, 0]);
const lambdaM = qv([5, 5, 1, 1, 3, 0, 0]);

const dot = (a, b) => a.reduce((s, x, i) => add(s, mul(x, b[i])), Q(0));
const violation = lambda => V.map(row => dot(row, lambda)[0]);
assert.deepEqual(violation(lambdaD), [10n, 6n, 2n, 1n]);
assert.deepEqual(violation(lambdaM), [10n, 6n, 4n, 1n]);

// Rank-one up module: Gamma x = w r_u (v_u . x), Gamma^2=(3w/2)Gamma.
const upNorm = dot(V[0], dual[0]);
assert.deepEqual(upNorm, Q(3, 2));
for (const lambda of [lambdaD, lambdaM]) {
  assert.equal(rank(cols([qBL, lambda, dual[0]])), 3);
  const protectedResidue = lambda.map((x, i) => sub(x, mul(Q(20, 3), dual[0][i])));
  assert(zero(dot(V[0], protectedResidue)));
}

// For each sequential active set, the smallest subspace common to every
// independent nonnegative channel weighting and containing {lambda,q} is
// span{q,lambda,r_a : a active}.  Exact ranks grow 3,4,5,6.
const stages = [];
for (let k = 1; k <= 4; k++) {
  const active = dual.slice(0, k);
  const stage = { active: names.slice(0, k) };
  for (const [label, lambda] of [['deduplicated', lambdaD], ['multiplicity', lambdaM]]) {
    const family = [qBL, lambda, ...active];
    const ambientRank = rank(cols(family));
    const quotientRank = rank(cols([...family, Y])) - 1;
    assert.equal(ambientRank, k + 2);
    assert.equal(quotientRank, k + 2);
    stage[label] = { ambientRank, hyperchargeQuotientRank: quotientRank };
  }
  stages.push(stage);
}

// With all channels available there is no proper common invariant subsystem
// in the six-dimensional external-source quotient.
for (const lambda of [lambdaD, lambdaM]) {
  assert.equal(rank(cols([qBL, lambda, ...dual, Y])), 7);
}

// Channel-resolved divergence data cannot see protected shifts.
assert(V.map(row => dot(row, qBL)).every(zero));

console.log(JSON.stringify({
  dual_channel_rays: Object.fromEntries(names.map((name, i) => [name, dual[i].map(([n, d]) => d === 1n ? `${n}` : `${n}/${d}`)])),
  rank_one_up: {
    eigenvalue_per_weight: '3/2',
    minimal_common_orbit_dimension_with_incidence_and_bl: 3,
    identity: 'Gamma_up^2=(3 w_up/2) Gamma_up'
  },
  incidence_channel_coordinates: {
    deduplicated: violation(lambdaD).map(String),
    multiplicity: violation(lambdaM).map(String)
  },
  sequential_common_invariant_dimensions: stages,
  full_family_after_hypercharge_quotient: 6,
  protected_bl_is_invisible_to_all_four_divergence_channels: true
}, null, 2));
