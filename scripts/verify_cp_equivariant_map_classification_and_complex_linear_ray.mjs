const C = [[1, 0], [0, -1]];
const J = [[0, -1], [1, 0]];
const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const norm = (A) => Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0));

const gE = 1.7;
const gI = -0.4;
const generalCpMap = [[gE, 0], [0, gI]];
const common = 0.63;
const complexLinearMap = [[common, 0], [0, common]];
const antiCommon = -0.28;
const antiComplexLinearMap = [[antiCommon, 0], [0, -antiCommon]];

const result = {
  protocol: "cp-equivariant-map-classification-complex-linear-ray/1",
  sourceAndTargetCp: C,
  sourceAndTargetComplexStructure: J,
  realCpEquivariantHomDimension: 2,
  realCpEquivariantNormalForm: "diag(g_E,g_I)",
  generalCpCommutationError: norm(sub(mm(C, generalCpMap), mm(generalCpMap, C))),
  generalComplexLinearityFailure: norm(sub(mm(J, generalCpMap), mm(generalCpMap, J))),
  cpAndComplexLinearHomDimension: 1,
  complexLinearNormalForm: "g I_2, so g_E=g_I",
  complexLinearCpError: norm(sub(mm(C, complexLinearMap), mm(complexLinearMap, C))),
  complexLinearityError: norm(sub(mm(J, complexLinearMap), mm(complexLinearMap, J))),
  cpAndAntiComplexLinearHomDimension: 1,
  antiComplexLinearNormalForm: "g diag(1,-1), so g_E=-g_I",
  antiComplexLinearityError: norm(add(mm(J, antiComplexLinearMap), mm(antiComplexLinearMap, J))),
  realDimensionAfterBothComplexAndAntiComplexAreAllowed: 2,
  normalizedCliffordGram: [[1, 0], [0, 1]],
  consequence: "CP alone gives two real coefficients. Preserving the chosen complex structure selects the common-coefficient ray; reversing it selects the opposite-coefficient ray.",
};
result.passed =
  result.generalCpCommutationError < 1e-12 &&
  result.generalComplexLinearityFailure > 1e-6 &&
  result.complexLinearCpError < 1e-12 &&
  result.complexLinearityError < 1e-12 &&
  result.antiComplexLinearityError < 1e-12;

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
