#!/usr/bin/env node

// Exact polynomial counterexample: three conserved symmetric stress-derived
// currents map into Sym_2(R), but their Jordan triple is not conserved.

// Polynomial in (t,x), stored as Map "tPower,xPower" -> integer coefficient.
const poly = (...terms) => new Map(terms.filter(([, c]) => c !== 0));
const key = (i, j) => `${i},${j}`;
const addPoly = (a, b) => {
  const out = new Map(a);
  for (const [k, c] of b) out.set(k, (out.get(k) ?? 0) + c);
  for (const [k, c] of out) if (c === 0) out.delete(k);
  return out;
};
const scalePoly = (c, a) => poly(...[...a].map(([k, v]) => [k, c * v]));
const mulPoly = (a, b) => {
  const out = new Map();
  for (const [ka, ca] of a) {
    const [ia, ja] = ka.split(",").map(Number);
    for (const [kb, cb] of b) {
      const [ib, jb] = kb.split(",").map(Number);
      const k = key(ia + ib, ja + jb);
      out.set(k, (out.get(k) ?? 0) + ca * cb);
    }
  }
  for (const [k, c] of out) if (c === 0) out.delete(k);
  return out;
};
const deriv = (a, variable) => {
  const out = new Map();
  for (const [k, c] of a) {
    const [i, j] = k.split(",").map(Number);
    if (variable === "t" && i > 0) out.set(key(i - 1, j), c * i);
    if (variable === "x" && j > 0) out.set(key(i, j - 1), c * j);
  }
  return out;
};
const equalPoly = (a, b) => {
  const d = addPoly(a, scalePoly(-1, b));
  return d.size === 0;
};
const showPoly = (a) => {
  if (a.size === 0) return "0";
  return [...a]
    .sort(([ka], [kb]) => ka.localeCompare(kb))
    .map(([k, c]) => {
      const [i, j] = k.split(",").map(Number);
      const monomial = `${i ? `t^${i}` : ""}${j ? `x^${j}` : ""}` || "1";
      return `${c}*${monomial}`;
    })
    .join(" + ");
};

const Z = poly();
const O = poly([key(0, 0), 1]);
const T = poly([key(1, 0), 1]);
const X = poly([key(0, 1), 1]);

const matrixAdd = (a, b) => a.map((row, i) => row.map((v, j) => addPoly(v, b[i][j])));
const matrixMul = (a, b) =>
  a.map((row) =>
    b[0].map((_, j) =>
      row.reduce((sum, v, k) => addPoly(sum, mulPoly(v, b[k][j])), Z),
    ),
  );
const matrixScale = (c, a) => a.map((row) => row.map((v) => scalePoly(c, v)));
const triple = (a, x, b) => matrixAdd(matrixMul(matrixMul(a, x), b), matrixMul(matrixMul(b, x), a));

// Pauli_R(v): [[j0+j1,j2],[j2,j0-j1]]. Here j2=0.
const A = [[T, Z], [Z, scalePoly(-1, T)]]; // j_A=(0,t,0)
const Mid = [[X, Z], [Z, X]];              // j_X=(x,0,0)
const B = [[O, Z], [Z, O]];                // j_B=(1,0,0)

const currentFromMatrix = (m) => ({
  j0: scalePoly(0.5, addPoly(m[0][0], m[1][1])),
  j1: scalePoly(0.5, addPoly(m[0][0], scalePoly(-1, m[1][1]))),
  j2: m[0][1],
});
const divergence = (j) => addPoly(deriv(j.j0, "t"), deriv(j.j1, "x"));

// Symmetric contravariant stress tensors in (t,x,y), with u=(1,0,0).
// Their first columns are the respective currents and every column is divergence-free.
const stressA = [
  [Z, T, Z],
  [T, scalePoly(-1, X), Z],
  [Z, Z, Z],
];
const stressMid = [
  [X, Z, Z],
  [Z, Z, Z],
  [Z, Z, Z],
];
const stressB = [
  [O, Z, Z],
  [Z, Z, Z],
  [Z, Z, Z],
];

const stressDivergences = (s) => [0, 1, 2].map((b) =>
  addPoly(addPoly(deriv(s[0][b], "t"), deriv(s[1][b], "x")), Z),
);

const out = triple(A, Mid, B);
const currents = [A, Mid, B].map(currentFromMatrix);
const inputDivergences = currents.map(divergence);
const outputCurrent = currentFromMatrix(out);
const outputDivergence = divergence(outputCurrent);
const allStressDivergences = [stressA, stressMid, stressB].map(stressDivergences);

const report = {
  protocol: "stress-jordan-local-closure-counterexample/1",
  inputs: {
    A: "Pauli_R(0,t,0)",
    X: "Pauli_R(x,0,0)",
    B: "Pauli_R(1,0,0)",
  },
  symmetricStressTensorsConserved: allStressDivergences.every((ds) => ds.every((d) => d.size === 0)),
  inputCurrentDivergences: inputDivergences.map(showPoly),
  jordanTripleOutput: out.map((row) => row.map(showPoly)),
  outputCurrent: Object.fromEntries(Object.entries(outputCurrent).map(([k, v]) => [k, showPoly(v)])),
  outputDivergence: showPoly(outputDivergence),
  expectedOutputDivergence: "2*t^1",
  conclusion: "Local stress conservation is not closed under the pointwise Jordan triple.",
};

report.passed =
  report.symmetricStressTensorsConserved &&
  inputDivergences.every((d) => d.size === 0) &&
  equalPoly(outputDivergence, scalePoly(2, T));

console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
