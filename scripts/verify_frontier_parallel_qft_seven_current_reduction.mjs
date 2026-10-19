import assert from 'node:assert/strict';

const abs = x => x < 0n ? -x : x;
const gcd = (a, b) => { a = abs(a); b = abs(b); while (b) [a, b] = [b, a % b]; return a || 1n; };
const Q = (n, d = 1n) => {
  n = BigInt(n); d = BigInt(d);
  if (d < 0n) { n = -n; d = -d; }
  const g = gcd(n, d);
  return [n / g, d / g];
};
const add = (a, b) => Q(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const neg = a => [-a[0], a[1]];
const sub = (a, b) => add(a, neg(b));
const mul = (a, b) => Q(a[0] * b[0], a[1] * b[1]);
const div = (a, b) => Q(a[0] * b[1], a[1] * b[0]);
const zero = a => a[0] === 0n;
const str = a => a[1] === 1n ? `${a[0]}` : `${a[0]}/${a[1]}`;
const qmat = A => A.map(r => r.map(x => Array.isArray(x) ? x : Q(x)));
const T = A => A[0].map((_, j) => A.map(r => r[j]));
const MM = (A, B) => A.map(r => T(B).map(c => r.reduce((s, x, i) => add(s, mul(x, c[i])), Q(0))));
const MV = (A, x) => A.map(r => r.reduce((s, a, i) => add(s, mul(a, x[i])), Q(0)));
const diag = x => x.map((v, i) => x.map((_, j) => i === j ? v : Q(0)));
const cols = xs => T(xs);

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

function det(A) {
  A = A.map(r => r.map(x => [...x]));
  let out = Q(1);
  for (let j = 0; j < A.length; j++) {
    const p = A.findIndex((r, i) => i >= j && !zero(r[j]));
    if (p < 0) return Q(0);
    if (p !== j) { [A[j], A[p]] = [A[p], A[j]]; out = neg(out); }
    const pivot = A[j][j]; out = mul(out, pivot);
    for (let i = j + 1; i < A.length; i++) {
      const f = div(A[i][j], pivot);
      A[i] = A[i].map((x, k) => sub(x, mul(f, A[j][k])));
    }
  }
  return out;
}

const V = qmat([
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
]);
const Dinv = [Q(1, 6), Q(1, 3), Q(1, 3), Q(1, 2), Q(1), Q(1), Q(1)];
const Y = qmat([[1, -4, 2, -3, 6, 0, 3]])[0];
const B = qmat([[1, -1, -1, 0, 0, 0, 0]])[0];
const L = qmat([[0, 0, 0, 1, -1, -1, 0]])[0];
const qBL = qmat([[1, -1, -1, -3, 3, 3, 0]])[0];
const lambdaD = qmat([[5, 5, 1, 1, 1, 0, 0]])[0];
const lambdaM = qmat([[5, 5, 1, 1, 3, 0, 0]])[0];

assert.equal(rank(V), 4);
for (const x of [Y, B, L]) assert(MV(V, x).every(zero));
assert.equal(rank(cols([Y, B, L])), 3);

const R = MM(MM(V, diag(Dinv)), T(V));
const expectedR = qmat([
  [Q(3, 2), Q(-5, 6), -1, 1],
  [Q(-5, 6), Q(3, 2), 1, -1],
  [-1, 1, Q(5, 2), Q(-1, 2)],
  [1, -1, Q(-1, 2), Q(5, 2)],
]);
assert.deepEqual(R, expectedR);
const principalMinors = [1, 2, 3, 4].map(n => det(R.slice(0, n).map(r => r.slice(0, n))));
assert(principalMinors.every(x => x[0] > 0n));

const gamma = weights => MM(MM(diag(Dinv), T(V)), MM(diag(weights), V));

// Every threshold stratum has rank equal to its number of open Yukawa channels.
for (let mask = 0; mask < 16; mask++) {
  const w = Array.from({ length: 4 }, (_, i) => Q((mask >> i) & 1));
  assert.equal(rank(gamma(w)), w.filter(x => !zero(x)).length);
}

// Test whether Gamma lambda = alpha lambda + beta q can hold for a nonzero
// vector of channel weights.  The seven equations are linear in
// (w_u,w_d,w_e,w_n,alpha,beta).  Full column rank means only the zero solution.
function invarianceConstraintRank(lambda) {
  const images = Array.from({ length: 4 }, (_, a) => {
    const w = Array.from({ length: 4 }, (_, i) => Q(i === a ? 1 : 0));
    return MV(gamma(w), lambda);
  });
  return rank(cols([...images, lambda.map(neg), qBL.map(neg)]));
}
assert.equal(invarianceConstraintRank(lambdaD), 6);
assert.equal(invarianceConstraintRank(lambdaM), 6);

// A single exact positive-weight point proves that maximal cyclic rank is
// generic (the nonzero minor is a polynomial condition).
const G = gamma(qmat([[1, 2, 3, 5]])[0]);
function krylov(lambda) {
  const out = [qBL, lambda];
  let x = lambda;
  for (let k = 0; k < 4; k++) { x = MV(G, x); out.push(x); }
  return cols(out);
}
const krylovRankD = rank(krylov(lambdaD));
const krylovRankM = rank(krylov(lambdaM));
const quotientRankD = rank(cols([...T(krylov(lambdaD)), Y])) - 1;
const quotientRankM = rank(cols([...T(krylov(lambdaM)), Y])) - 1;
assert.equal(krylovRankD, 6);
assert.equal(krylovRankM, 6);
assert.equal(quotientRankD, 6);
assert.equal(quotientRankM, 6);

console.log(JSON.stringify({
  basis: ['Q', 'u^c', 'd^c', 'L', 'e^c', 'nu^c', 'H'],
  yukawa_channels: ['up', 'down', 'charged-lepton', 'neutrino'],
  protected_kernel: ['Y', 'B', 'L'],
  exact_broken_block_R: R.map(r => r.map(str)),
  sylvester_principal_minors: principalMinors.map(str),
  threshold_rank_rule_verified_for_all_16_masks: true,
  incidence_bl_plane_invariant_nontrivially: { deduplicated: false, multiplicity: false },
  exact_constraint_rank_of_7_by_6_system: { deduplicated: 6, multiplicity: 6 },
  generic_positive_weight_krylov_rank_with_bl: { deduplicated: krylovRankD, multiplicity: krylovRankM },
  generic_krylov_rank_after_hypercharge_quotient: { deduplicated: quotientRankD, multiplicity: quotientRankM },
  interpretation: 'after quotienting hypercharge, generic closure of incidence with B-L fills the entire six-dimensional external-source quotient'
}, null, 2));
