const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map((r) => r.map((x) => a * x));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const norm = (A) => Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0));
const comm = (A, B) => sub(mm(A, B), mm(B, A));

// Ordered vector basis: (d, 1, u).
const JcarrierEven = [
  [0, -1, 0],
  [1, 0, 0],
  [0, 0, 0],
];
const Jselector = [
  [0, 0, 0],
  [0, 0, -1],
  [0, 1, 0],
];
const Jdu = [
  [0, 0, -1],
  [0, 0, 0],
  [1, 0, 0],
];
const K = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, -1],
];

const bracket = comm(JcarrierEven, Jselector);
const bracketMatches = Math.min(norm(sub(bracket, Jdu)), norm(add(bracket, Jdu)));
const kCarrier = mm(mm(K, JcarrierEven), K);
const kSelector = mm(mm(K, Jselector), K);

const result = {
  protocol: "carrier-spin2-versus-embedding-selector-spin2/1",
  basis: ["Peirce direction d", "even link 1", "odd link u"],
  carrierGenerator: JcarrierEven,
  selectorGenerator: Jselector,
  generatorDifferenceNorm: norm(sub(JcarrierEven, Jselector)),
  commutator: bracket,
  commutatorMatchesThirdSo3GeneratorUpToSign: bracketMatches,
  conjugation: K,
  conjugationCarrierCommutationError: norm(sub(kCarrier, JcarrierEven)),
  conjugationSelectorReflectionError: norm(add(kSelector, Jselector)),
  fixedCarrierStatement: "J_d1 preserves span{d,1}; J_1u sends 1 outside it to u and changes the embedded H2(R).",
  consequence: "Gauging the automorphism Spin(2) of one fixed carrier does not by itself gauge the embedding-selector Spin(2). The zero-map theorem applies only to the latter action on the response-line plane.",
};
result.passed =
  result.generatorDifferenceNorm > 0 &&
  result.commutatorMatchesThirdSo3GeneratorUpToSign < 1e-12 &&
  result.conjugationCarrierCommutationError < 1e-12 &&
  result.conjugationSelectorReflectionError < 1e-12;

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
