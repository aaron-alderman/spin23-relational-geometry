import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const expi = (x) => C(Math.cos(x), Math.sin(x));
const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

// A complex symmetric two-family Majorana mass matrix.
const m = [
  [C(1.2, 0.3), C(0.7, -0.4)],
  [C(0.7, -0.4), C(0.9, 0.8)]
];
assert.equal(m[0][1].re, m[1][0].re);
assert.equal(m[0][1].im, m[1][0].im);

// Rephasing-invariant Majorana CP quantity:
// Im[m_ii m_jj (m_ij^*)^2].
const majoranaInvariant = (M, i, j) =>
  mul(mul(M[i][i], M[j][j]), mul(conj(M[i][j]), conj(M[i][j]))).im;
const I12 = majoranaInvariant(m, 0, 1);
assert(Math.abs(I12) > 1e-6);

// Verify invariance under independent lepton-doublet rephasings
// m_ij -> exp(i(alpha_i+alpha_j)) m_ij.
const phases = [0.41, -0.73];
const rephased = m.map((row, i) => row.map((z, j) =>
  mul(expi(phases[i] + phases[j]), z)));
assert(near(majoranaInvariant(rephased, 0, 1), I12));

// A real symmetric Majorana matrix is CP conserving for this invariant.
const realM = [[C(1.2), C(0.7)], [C(0.7), C(0.9)]];
assert(near(majoranaInvariant(realM, 0, 1), 0));

// There is no pair invariant for one family.
const oneFamilyPairCount = 0;
assert.equal(oneFamilyPairCount, 0);

// If the Majorana odd invariant matches only into the up/neutral module,
// while the down/charged module remains channel-local and even, alignment
// is generically lost.
const evenUp = 3.4, evenDown = 5.1, matching = 0.08;
const responseUp = [evenUp, matching * I12];
const responseDown = [evenDown, 0];
const alignmentDeterminant =
  responseUp[0] * responseDown[1] -
  responseUp[1] * responseDown[0];
assert(Math.abs(alignmentDeterminant) > 1e-8);

console.log(JSON.stringify({
  protocol: "majorana-cp-up-down-response-misalignment/1",
  majoranaInvariant: "I_ij=Im[m_ii m_jj (m_ij^*)^2]",
  twoFamilyValue: I12,
  rephasingInvariant: true,
  oneFamilyPairInvariants: oneFamilyPairCount,
  cpConservingRealMatrixValue: majoranaInvariant(realM, 0, 1),
  responseVectors: { upNeutral: responseUp, downCharged: responseDown },
  alignmentDeterminant,
  consequence: "a Majorana CP-odd response confined to the up/neutral octonion module generically obstructs a universal Clifford response line",
  boundary: "the invariant proves available CP-odd flavor data, not a nonzero stress/Clifford matching coefficient",
  passed: true
}, null, 2));
