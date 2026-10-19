import assert from "node:assert/strict";

const n = 3;
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((r) => r.map((x) => c * x));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const jordan = (A, B) => scale(0.5, add(mul(A, B), mul(B, A)));
const E = (i, j) => Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => Number(r === i && c === j)));
const sym = (i, j) => add(E(i, j), E(j, i));
const eye = () => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const flattenSym = (A) => [A[0][0], A[1][1], A[2][2], A[0][1], A[0][2], A[1][2]];

const rank = (vectors, tolerance = 1e-10) => {
  const M = vectors.map((v) => [...v]);
  let r = 0;
  for (let c = 0; c < (M[0]?.length ?? 0) && r < M.length; c += 1) {
    const pivot = M.findIndex((row, i) => i >= r && Math.abs(row[c]) > tolerance);
    if (pivot < 0) continue;
    [M[r], M[pivot]] = [M[pivot], M[r]];
    const p = M[r][c];
    M[r] = M[r].map((x) => x / p);
    for (let i = 0; i < M.length; i += 1) {
      if (i === r) continue;
      const q = M[i][c];
      M[i] = M[i].map((x, j) => x - q * M[r][j]);
    }
    r += 1;
  }
  return r;
};

const I3 = eye();
const X_PI = sym(0, 1);
const X_PN = sym(0, 2);
const X_IN = sym(1, 2);
const D_PI = jordan(X_PI, X_PI); // diag(1,1,0)
const D_PN = jordan(X_PN, X_PN); // diag(1,0,1)
const induced = scale(2, jordan(X_PI, X_PN));

assert.deepEqual(induced, X_IN);

const generatedBasis = [I3, X_PI, X_PN, D_PI, D_PN, X_IN];
assert.equal(rank(generatedBasis.map(flattenSym)), 6);

const cornerPI = [add(E(0, 0), E(1, 1)), E(0, 0), X_PI];
const cornerPN = [add(E(0, 0), E(2, 2)), E(0, 0), X_PN];
assert.equal(rank(cornerPI.map(flattenSym)), 3);
assert.equal(rank(cornerPN.map(flattenSym)), 3);

const result = {
  protocol: "overlapping-H2R-null-mask-wheels-generate-H3R/1",
  generators: {
    diracImageRelation: "X_PI=E_PI+E_IP",
    majoranaNullRelation: "X_PN=E_PN+E_NP",
  },
  individualCorners: {
    PI: { jordanAlgebra: "H_2(R)", dimension: 3, conformalAlgebra: "sp(4,R) = spin(2,3)" },
    PN: { jordanAlgebra: "H_2(R)", dimension: 3, conformalAlgebra: "sp(4,R) = spin(2,3)" },
  },
  mixedClosure: {
    inducedThirdRelation: "2*(X_PI o X_PN)=X_IN",
    diagonalElements: ["X_PI o X_PI=E_PP+E_II", "X_PN o X_PN=E_PP+E_NN"],
    generatedDimension: 6,
    jordanAlgebra: "H_3(R)=Sym_3(R)",
    conformalAlgebra: "sp(6,R)",
  },
  theorem: "Two H_2(R) principal corners sharing P generate H_3(R) under unrestricted Jordan closure; Spin(2,3) is the conformal algebra of each local wheel, not of their full combined closure.",
  boundary: "Retaining a single Spin(2,3) requires a Peirce projection, conditional expectation, sector separation, or dynamical constraint that prevents the induced I-N relation from becoming an independent physical channel.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
