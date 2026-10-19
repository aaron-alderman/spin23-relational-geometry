import assert from "node:assert/strict";

const n = 3;
const E = (i, j) => Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => Number(r === i && c === j)));
const diag = xs => xs.map((x, i) => xs.map((_, j) => i === j ? x : 0));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const flat = A => A.flat();
const rank = vectors => {
  if (vectors.length === 0) return 0;
  const A = vectors.map(v => [...v]);
  let r = 0;
  for (let c = 0; c < A[0].length && r < A.length; c++) {
    let p = r;
    while (p < A.length && Math.abs(A[p][c]) < 1e-12) p++;
    if (p === A.length) continue;
    [A[r], A[p]] = [A[p], A[r]];
    const q = A[r][c];
    for (let j = c; j < A[0].length; j++) A[r][j] /= q;
    for (let i = 0; i < A.length; i++) if (i !== r) {
      const f = A[i][c];
      for (let j = c; j < A[0].length; j++) A[i][j] -= f * A[r][j];
    }
    r++;
  }
  return r;
};

// Fixed data for all three countermodels:
// A=C^3_L + C^3_R, H=C^3_L + C^3_R, and diagonal representation.
// Only the unresolved finite Dirac block M_r changes.  The coarse incidence
// graph records merely that the L--R block is nonzero, so it is identical.
const algebraBasis = [];
for (const side of ["L", "R"]) for (let i = 0; i < n; i++) {
  const z = [0, 0, 0]; z[i] = 1;
  algebraBasis.push({ side, values: z });
}

const lrCommutator = (M, b) => {
  const bL = diag(b.side === "L" ? b.values : [0, 0, 0]);
  const bR = diag(b.side === "R" ? b.values : [0, 0, 0]);
  return sub(mm(M, bR), mm(bL, M));
};

const representedOneFormLRBasis = M => {
  const candidates = [];
  // pi(a)[D,pi(b)] in the LR block.  Basis elements and linearity suffice.
  for (const a of algebraBasis) for (const b of algebraBasis) {
    const aL = diag(a.side === "L" ? a.values : [0, 0, 0]);
    candidates.push(mm(aL, lrCommutator(M, b)));
  }
  const independent = [];
  let oldRank = 0;
  for (const C of candidates) {
    const newRank = rank([...independent, flat(C)]);
    if (newRank > oldRank) {
      independent.push(flat(C));
      oldRank = newRank;
    }
  }
  return { dimension: oldRank, basisVectors: independent };
};

const models = [];
for (let r = 1; r <= 3; r++) {
  const M = diag(Array.from({ length: n }, (_, i) => Number(i < r)));
  const forms = representedOneFormLRBasis(M);
  assert.equal(forms.dimension, r);
  assert(M.some(row => row.some(x => x !== 0)));
  const expected = Array.from({ length: r }, (_, i) => flat(E(i, i)));
  assert.equal(rank([...forms.basisVectors, ...expected]), r);
  models.push({
    label: `rank-${r}-Dirac-block`,
    algebra: "C^3_L direct-sum C^3_R",
    hilbertSpace: "C^3_L direct-sum C^3_R",
    representation: "diagonal on each endpoint",
    coarseIncidence: "one nonzero L--R edge",
    diracLR: M,
    representedOneFormLRDimension: forms.dimension,
    externalGaugeTyping: "tensor every basis vector with the same external gauge intertwiner V_R -> V_L",
  });
}

assert.deepEqual(models.map(x => x.coarseIncidence), Array(3).fill("one nonzero L--R edge"));
assert.deepEqual(models.map(x => x.representedOneFormLRDimension), [1, 2, 3]);

// Once an r-dimensional isotypic sector exists, incidence also does not fix
// its positive kinetic/inverse-mass metric.  Two nonproportional witnesses
// already suffice.
const metricWitnesses = {
  identity: [[1, 0], [0, 1]],
  mixed: [[2, 1], [1, 3]],
};
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
assert(det2(metricWitnesses.identity) > 0);
assert(det2(metricWitnesses.mixed) > 0);
assert.notDeepEqual(metricWitnesses.identity, metricWitnesses.mixed);

console.log(JSON.stringify({
  protocol: "coarse-incidence-versus-represented-one-form-multiplicity/1",
  fixedAcrossCountermodels: {
    algebra: "C^3_L direct-sum C^3_R",
    hilbertSpace: "C^3_L direct-sum C^3_R",
    representation: "diagonal endpoint representation",
    coarseSupport: "one nonzero L--R arrow",
  },
  models,
  exactConclusion: "The same algebra, Hilbert space, representation and coarse nonzero incidence admit represented LR one-form dimensions 1, 2 and 3 when the unresolved finite Dirac block is changed.",
  gaugeIsotypicLift: "Tensoring the multiplicity construction with one fixed external gauge intertwiner makes all r basis forms copies of the same gauge representation.",
  kineticMetricWitnesses: metricWitnesses,
  dataRequiredForDetermination: [
    "finite *-algebra A_F",
    "represented Hilbert bimodule (H_F,pi)",
    "full finite Dirac operator D_F including multiplicity blocks",
    "grading, real structure and first-order/reality constraints",
    "represented universal one-forms and junk quotient",
    "gauge-isotypic decomposition",
    "positive kinetic/inner-product functional and mass operator",
  ],
  boundary: "These are countermodels to inference from coarse incidence, not proposed completions of the full Furey finite geometry.",
  stopEverything: "No claim that the doubled Furey arrows supply one, two or any particular number of propagating S1 copies is licensed until the missing spectral-triple and kinetic data are specified.",
  passed: true,
}, null, 2));
