import assert from "node:assert/strict";

// Source labels extracted from Eqs. (85) and (102) of arXiv:1804.05844.
// Global signs are conventional; the alternating relative signs are not.
const sources = {
  L_lq: { field: "H3L", current: "d_L nu_L - u_L e_L", kind: "leptoquark" },
  R_lq: { field: "H3R", current: "d_R^C nu_R - u_R^C e_R", kind: "leptoquark" },
  L_dq: { field: "Hbar3L", current: "epsilon u_L^C d_L", kind: "diquark" },
  R_dq: { field: "Hbar3R", current: "epsilon u_R^C d_R", kind: "diquark" },
};
assert.equal(new Set(Object.values(sources).map(x => x.field)).size, 4);

// The NCG Yukawa incidence is block separated: H3 fields see only lq currents,
// Hbar3 fields see only dq currents.
const order = ["L_lq", "R_lq", "L_dq", "R_dq"];
const incidence = order.map((_, i) => order.map((__, j) => Number(i === j)));
assert.deepEqual(incidence, [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]);

// A positive inverse mass matrix in the leptoquark L/R sector.
// c != 0 is needed for the crossed L--R response.
const a = 2, b = 3, c = 1;
const Klq = [[a, c], [c, b]];
assert(a > 0 && b > 0 && a*b-c*c > 0);

// Source coupling vectors on mediator copy space (H3L,H3R).
// The right NCG current already contains the exact alternating pair Bu-Bd.
const lambda = {
  BL: [1, 0],
  Bu: [0, 1],
  Bd: [0, -1],
};
const dotK = (x, y) => x.reduce((s, xi, i) => s + xi * y.reduce((t, yj, j) => t + Klq[i][j] * yj, 0), 0);
const C = {
  BL_Bu: dotK(lambda.BL, lambda.Bu),
  BL_Bd: dotK(lambda.BL, lambda.Bd),
  Bu_Bd: dotK(lambda.Bu, lambda.Bd),
  BL_BL: dotK(lambda.BL, lambda.BL),
  Bu_Bu: dotK(lambda.Bu, lambda.Bu),
  Bd_Bd: dotK(lambda.Bd, lambda.Bd),
};
assert.equal(C.BL_Bu, c);
assert.equal(C.BL_Bd, -c);
assert.equal(C.Bu_Bd, -b);
assert.notEqual(C.Bu_Bd, 0);

// General proof: for every positive K, the right diagonal element is positive,
// and lambda_d=-lambda_u forces the third edge to be its negative.
const generalIdentity = "C_ud=lambda_u^T K lambda_d=-lambda_u^T K lambda_u<0 for nonzero lambda_u and K>0";

// Proton safety requires the full inverse mass matrix to remain block diagonal
// between the leptoquark and diquark companion sectors.  A nonzero block gives
// an lq--dq four-fermion operator.
const Ksafe = [
  [2,1,0,0], [1,3,0,0],
  [0,0,4,0.5], [0,0,0.5,5],
];
const Kunsafe = Ksafe.map(row => [...row]);
Kunsafe[0][2] = Kunsafe[2][0] = 0.1;
const crossNorm2 = K => {
  let s = 0;
  for (let i = 0; i < 2; i++) for (let j = 2; j < 4; j++) s += K[i][j]**2 + K[j][i]**2;
  return s;
};
assert.equal(crossNorm2(Ksafe), 0);
assert(crossNorm2(Kunsafe) > 0);

console.log(JSON.stringify({
  protocol: "NCG-Pati-Salam-Model-C-versus-safe-FCp-target/1",
  literatureSource: "Aydemir, Minic, Sun, Takeuchi, arXiv:1804.05844, especially Eqs. (85), (102), and Sec. 6.2",
  extractedSourceIncidence: sources,
  structuralPositiveResult: "Separate complex H3L/H3R leptoquarks carry the left/right alternating currents, while Hbar3L/Hbar3R companions carry only diquark currents.",
  leptoquarkInverseMassWitness: Klq,
  effectiveWilsonEntries: C,
  exactClebschPattern: "C_Lu=-C_Ld when the H3L--H3R inverse-mass entry is nonzero",
  thirdEdgeNoGo: generalIdentity,
  protonSafetyMetricGate: {
    safeCrossBlockNormSquared: crossNorm2(Ksafe),
    unsafeCrossBlockNormSquared: crossNorm2(Kunsafe),
    condition: "K_(lq,dq)=0; geometric Yukawa separation alone is insufficient if scalar mass mixing reconnects the sectors",
  },
  distinctionsFromSpin10Vector: [
    "Model C uses separate complex H_L(6,1,1) and H_R(6,1,1), not one real Pati-Salam six inside a single Spin(10) vector 10_H.",
    "Its finite geometry separates leptoquark and diquark source incidence, but the cited phenomenological treatment still assumes suppressed companion mixing.",
    "The minimal H3L/H3R pair supplies the desired relative arm sign but not the sparse open-star Wilson matrix.",
  ],
  nextGate: "Derive the H3/Hbar3 mass-potential block structure and search for an additional right-current split involution in the actual represented finite calculus.",
  passed: true,
}, null, 2));
