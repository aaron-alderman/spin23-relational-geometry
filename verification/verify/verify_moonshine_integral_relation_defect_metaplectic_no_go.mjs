import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const gate = load("../../evidence/data/moonshine-integral-relation-defect-metaplectic-no-go-v1.json");

const I = [[1n, 0n], [0n, 1n]];
const minusI = [[-1n, 0n], [0n, -1n]];
const parseMatrix = (matrix) => matrix.map((row) => row.map(BigInt));
const multiply = (a, b) => a.map((row, i) => row.map((_, j) => row.reduce(
  (sum, __, k) => sum + a[i][k] * b[k][j],
  0n,
)));
const determinant = (a) => a[0][0] * a[1][1] - a[0][1] * a[1][0];
const inverse = (a) => [[a[1][1], -a[0][1]], [-a[1][0], a[0][0]]];
const power = (a, exponent) => {
  let result = I;
  let base = a;
  let n = exponent;
  while (n > 0) {
    if (n % 2 === 1) result = multiply(result, base);
    base = multiply(base, base);
    n = Math.floor(n / 2);
  }
  return result;
};
const modulo = (value, modulus) => Number(((value % modulus) + modulus) % modulus);
const reduceMatrix = (a, modulus) => a.map((row) => row.map((value) => modulo(value, modulus)));

const R = parseMatrix(gate.generators.R);
const S = parseMatrix(gate.generators.S);
const R11 = parseMatrix(gate.relationDefect.R11);
const K = parseMatrix(gate.relationDefect.K);

assert.equal(determinant(R), 1n);
assert.equal(determinant(S), 1n);
assert.deepEqual(reduceMatrix(R, 23n), gate.generators.reductionsModulo23.R);
assert.deepEqual(reduceMatrix(S, 23n), gate.generators.reductionsModulo23.S);
assert.deepEqual(multiply(S, S), minusI);
assert.deepEqual(multiply(multiply(S, R), inverse(S)), inverse(R));

assert.deepEqual(power(R, 11), R11);
assert.deepEqual(reduceMatrix(R11, 23n), [[22, 0], [0, 22]]);
assert.deepEqual(multiply(minusI, power(inverse(R), 11)), K);
assert.deepEqual(reduceMatrix(K, 23n), gate.relationDefect.KModulo23);
assert.deepEqual(power(K, 2), power(inverse(R), 22));

const Rmod = gate.generators.reductionsModulo23.R.map((row) => row.map(BigInt));
const Smod = gate.generators.reductionsModulo23.S.map((row) => row.map(BigInt));
const identityNormalForms = [];
for (let j = 0; j < 4; j += 1) {
  for (let n = 0; n < 22; n += 1) {
    const word = reduceMatrix(multiply(power(Rmod, n), power(Smod, j)), 23n);
    if (JSON.stringify(word) === JSON.stringify([[1, 0], [0, 1]])) identityNormalForms.push({n, j});
  }
}
assert.deepEqual(identityNormalForms, [{n: 0, j: 0}, {n: 11, j: 2}]);

const genuineExponents = Array.from({length: 8}, (_, k) => k).filter((k) => (4 * k) % 8 === 4);
assert.deepEqual(genuineExponents, gate.metaplecticNoGo.allowedQuarterTurnExponentsModulo8);
assert.equal(genuineExponents.includes(gate.metaplecticNoGo.proposedQuarterTurnExponentForI), false);
assert.deepEqual(
  genuineExponents.map((k) => (2 * k) % 8).filter((value, index, values) => values.indexOf(value) === index),
  [2, 6],
);
assert.equal(gate.metaplecticNoGo.proposedC4CharacterGenuine, false);
assert.equal(gate.metaplecticNoGo.simultaneousIAndGenuineCenterPossible, false);

console.log(JSON.stringify({
  integralLift: {R: gate.generators.R, S: gate.generators.S},
  exactConjugationRelation: true,
  selectedKernel: gate.relationDefect.selectedSubgroupKernel,
  congruenceDefectGenerator: gate.relationDefect.KDefinition,
  genuineQuarterTurnExponentsModulo8: genuineExponents,
  scalarC4MetaplecticRoute: "ruled out",
  next: gate.outcome.next,
}, null, 2));
console.log("PASS verify_moonshine_integral_relation_defect_metaplectic_no_go");
