import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const sub = (A, B) => add(A, B.map((row) => row.map((x) => -x)));
const scale = (a, A) => A.map((row) => row.map((x) => a * x));
const mm = (A, B) =>
  A.map((row) =>
    B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)),
  );
const tr = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const trace = (A) => A.reduce((sum, row, i) => sum + row[i], 0);
const eye = (n) =>
  Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => Number(i === j)),
  );
const eq = (A, B, eps = 1e-10) =>
  A.every((row, i) =>
    row.every((x, j) => Math.abs(x - B[i][j]) < eps),
  );

// A nontrivial real weak-basis rotation.
const c = Math.cos(0.37);
const s = Math.sin(0.37);
const R12 = [
  [c, -s, 0],
  [s, c, 0],
  [0, 0, 1],
];
const c2 = Math.cos(-0.21);
const s2 = Math.sin(-0.21);
const R23 = [
  [1, 0, 0],
  [0, c2, -s2],
  [0, s2, c2],
];
const W = mm(R12, R23);
assert.ok(eq(mm(tr(W), W), eye(3)));

const eigenvalues = [1, 4, 9];
const diagonalH = eigenvalues.map((x, i) =>
  eigenvalues.map((_, j) => (i === j ? x : 0)),
);
const H = mm(mm(W, diagonalH), tr(W));

const lagrangeProjector = (alpha) => {
  let P = eye(3);
  for (let beta = 0; beta < 3; beta += 1) {
    if (beta === alpha) continue;
    P = scale(
      1 / (eigenvalues[alpha] - eigenvalues[beta]),
      mm(P, sub(H, scale(eigenvalues[beta], eye(3)))),
    );
  }
  return P;
};

const projectors = [0, 1, 2].map(lagrangeProjector);
for (let i = 0; i < 3; i += 1) {
  assert.ok(eq(mm(projectors[i], projectors[i]), projectors[i]));
  assert.ok(eq(tr(projectors[i]), projectors[i]));
  assert.ok(eq(mm(H, projectors[i]), scale(eigenvalues[i], projectors[i])));
  assert.ok(Math.abs(trace(projectors[i]) - 1) < 1e-10);
  for (let j = 0; j < 3; j += 1) {
    if (i !== j) assert.ok(eq(mm(projectors[i], projectors[j]), scale(0, eye(3))));
  }
}
assert.ok(eq(projectors.reduce(add), eye(3)));

const deltas = projectors.map((P) => sub(eye(3), scale(3, P)));
assert.ok(eq(deltas.reduce(add), scale(0, eye(3))));
const gram = deltas.map((A) => deltas.map((B) => trace(mm(A, B))));
assert.ok(
  eq(gram, [
    [6, -3, -3],
    [-3, 6, -3],
    [-3, -3, 6],
  ]),
);

// Operator-charge sectors for the exceptional first family.
const qL = [-2, 1, 1];
const qEc = [1, -2, -2];
const qNuc = [3, 0, 0];
const h = -1;
const diracCharge = qL.map((q, i) =>
  qEc.map((r) => q + r - h),
);
assert.deepEqual(diracCharge, [
  [0, -3, -3],
  [3, 0, 0],
  [3, 0, 0],
]);
const neutrinoDiracCharge = qL.map((q) =>
  qNuc.map((r) => q + r + h),
);
assert.deepEqual(neutrinoDiracCharge, diracCharge);
const majoranaCharge = qNuc.map((q) => qNuc.map((r) => q + r));
assert.deepEqual(majoranaCharge, [
  [6, 3, 3],
  [3, 0, 0],
  [3, 0, 0],
]);

const sectors = [...new Set([...diracCharge.flat(), ...majoranaCharge.flat()])].sort(
  (a, b) => a - b,
);
assert.deepEqual(sectors, [-3, 0, 3, 6]);

const result = {
  protocol: "charged-lepton-projector-labeling-and-flavon-boundary/1",
  eigenvalues,
  projectorsAreCanonicalForSimpleSpectrum: true,
  augmentationFormula: "Delta_alpha = I - 3 P_alpha(H_e)",
  augmentationGram: gram,
  candidates: ["B-3L_e", "B-3L_mu", "B-3L_tau"],
  selectionResult:
    "H_e canonically labels all three projectors but supplies no present action principle choosing one gauged vertex.",
  diracOperatorChargeMatrix: diracCharge,
  majoranaBilinearChargeMatrix: majoranaCharge,
  chargeSectors: sectors,
  flavonOrders: {
    diracCrossBlocks: 1,
    exceptionalMajoranaDiagonal: 2,
  },
  oneFormBoundary:
    "Under the unchanged generation-blind represented algebra, family matrix coefficients in D_F do not acquire a new charge-three gauge representation.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
