import assert from "node:assert/strict";

// Linear form a*q+b*h, stored as [a,b].  q=X(Q), h=X(H).
const add = (...xs) => xs.reduce((u, v) => [u[0] + v[0], u[1] + v[1]], [0, 0]);
const neg = x => [-x[0], -x[1]];
const scale = (c, x) => [c * x[0], c * x[1]];
const zero = x => x[0] === 0 && x[1] === 0;
const q = [1, 0], h = [0, 1];

// Requiring all four Dirac Yukawas and cancelling SU(2)^2 U(1)_X in the
// family-universal SM+nu^c spectrum gives the general solution below.
const X = {
  Q: q,
  H: h,
  L: scale(-3, q),
  uc: neg(add(q, h)),
  dc: add(neg(q), h),
  ec: add(scale(3, q), h),
  nuc: add(scale(3, q), neg(h)),
};

// Check Yukawa neutrality in left-handed Weyl notation.
const yukawa = {
  Q_H_uc: add(X.Q, X.H, X.uc),
  Q_Hdag_dc: add(X.Q, neg(X.H), X.dc),
  L_Hdag_ec: add(X.L, neg(X.H), X.ec),
  L_H_nuc: add(X.L, X.H, X.nuc),
};
assert(Object.values(yukawa).every(zero));

// Non-Abelian and gravitational anomalies.
const anomalies = {
  SU3sqX: add(scale(2, X.Q), X.uc, X.dc),
  SU2sqX: add(scale(3, X.Q), X.L),
  gravitySqX: add(scale(6, X.Q), scale(3, X.uc), scale(3, X.dc), scale(2, X.L), X.ec, X.nuc),
};
assert(Object.values(anomalies).every(zero));

// Polynomial helpers for the Abelian anomalies.
const poly = new Map();
const key = (i, j) => `${i},${j}`;
const addCoeff = (P, i, j, c) => P.set(key(i, j), (P.get(key(i, j)) ?? 0) + c);
const powerLinear = ([a, b], p) => {
  const P = new Map();
  if (p === 1) { addCoeff(P, 1, 0, a); addCoeff(P, 0, 1, b); }
  if (p === 2) { addCoeff(P, 2, 0, a*a); addCoeff(P, 1, 1, 2*a*b); addCoeff(P, 0, 2, b*b); }
  if (p === 3) { addCoeff(P, 3, 0, a**3); addCoeff(P, 2, 1, 3*a*a*b); addCoeff(P, 1, 2, 3*a*b*b); addCoeff(P, 0, 3, b**3); }
  return P;
};
const sumTerms = terms => {
  const P = new Map();
  for (const [c, form, p] of terms) for (const [k, v] of powerLinear(form, p)) P.set(k, (P.get(k) ?? 0) + c*v);
  for (const [k, v] of [...P]) if (v === 0) P.delete(k);
  return P;
};

// Integer hypercharge Y6=6Y and Weyl multiplicities.
const fields = [
  [6, 1, X.Q], [3, -4, X.uc], [3, 2, X.dc],
  [2, -3, X.L], [1, 6, X.ec], [1, 0, X.nuc],
];
const cubic = sumTerms(fields.map(([m, , x]) => [m, x, 3]));
const Y2X = sumTerms(fields.map(([m, y, x]) => [m*y*y, x, 1]));
const YX2 = sumTerms(fields.map(([m, y, x]) => [m*y, x, 2]));
assert.equal(cubic.size, 0);
assert.equal(Y2X.size, 0);
assert.equal(YX2.size, 0);

// The solution is X=alpha Y + beta(B-L), with alpha=2h and beta=3q-h.
const alpha = scale(2, h);
const beta = add(scale(3, q), neg(h));

// Let S have SM quantum numbers (bar3,1,+1/3) and couple to QL.
// X(S)=-(X(Q)+X(L))=2q.  Its conjugate couples to right-conjugate currents.
const S = neg(add(X.Q, X.L));
assert(zero(add(S, neg(scale(2, q)))));
const vertices = {
  desired_S_Q_L: add(S, X.Q, X.L),
  desired_Sdag_uc_ec: add(neg(S), X.uc, X.ec),
  desired_Sdag_dc_nuc: add(neg(S), X.dc, X.nuc),
  dangerous_Sdag_Q_Q: add(neg(S), X.Q, X.Q),
  dangerous_S_uc_dc: add(S, X.uc, X.dc),
};
assert(Object.values(vertices).every(zero));

console.log(JSON.stringify({
  protocol: "minimal-family-universal-anomaly-free-U1-safe-S1-mask-no-go/1",
  assumptions: [
    "three identical SM families plus one nu^c per family",
    "family-universal U(1)_X charges",
    "no additional chiral anomaly-cancelling fermions",
    "all four Dirac Yukawa structures are allowed",
    "one S1 orientation couples QL and its conjugate couples u^c e^c and d^c nu^c",
  ],
  generalChargeSolution: X,
  basisStatement: { alphaY: "alpha=2h", betaBminusL: "beta=3q-h", formula: "X=alpha Y+beta(B-L)" },
  anomalyChecks: {
    nonAbelianAndGravity: anomalies,
    cubicPolynomialCoefficients: Object.fromEntries(cubic),
    Y6SquaredXPolynomialCoefficients: Object.fromEntries(Y2X),
    Y6XSquaredPolynomialCoefficients: Object.fromEntries(YX2),
  },
  scalarCharge: { S, meaning: "X(S)=2q" },
  vertexCharges: vertices,
  theorem: "Every minimal family-universal anomaly-free continuous U(1)_X compatible with the four Dirac Yukawas and the three desired S1 vertices also permits both QQ and u^c d^c diquark vertices.",
  corollary: "Any discrete symmetry obtained solely as a remnant of this same minimal continuous U(1) class also fails; intrinsically discrete symmetries or extra chiral matter require a separate anomaly analysis.",
  openExits: ["family-dependent charges", "additional chiral anomaly-cancelling matter", "intrinsically discrete gauge symmetry", "finite-geometry/one-form source selection", "multi-mediator interference"],
  passed: true,
}, null, 2));
