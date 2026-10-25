import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const source = JSON.parse(readFileSync(new URL("corpus/programmes/frontier/wave-7/claimipedia_relationship_operator_source_v1.json", root), "utf8"));
const evidence = JSON.parse(readFileSync(new URL("evidence/data/claimipedia-source-native-clifford-rail-closure-v1.json", root), "utf8"));

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map(row => row.map(x => a * x));
const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const eq = (A, B) => JSON.stringify(A) === JSON.stringify(B);
const eye = [[1, 0], [0, 1]];
const zero = [[0, 0], [0, 0]];
const G = [[-1, 0], [0, 1]];
const J = [[0, 1], [1, 0]];
const I = mul(G, J);
const Nplus = scale(0.5, add(J, I));
const Nminus = scale(0.5, add(J, scale(-1, I)));

assert(eq(mul(G, G), eye));
assert(eq(mul(J, J), eye));
assert(eq(mul(I, I), scale(-1, eye)));
assert(eq(add(mul(G, J), mul(J, G)), zero));
assert(eq(add(mul(I, J), mul(J, I)), zero));
assert(eq(mul(Nplus, Nplus), zero));
assert(eq(mul(Nminus, Nminus), zero));
assert(eq(add(mul(Nplus, Nminus), mul(Nminus, Nplus)), eye));
assert(eq(add(mul(Nplus, Nminus), scale(-1, mul(Nminus, Nplus))), G));

// One generic authored edge d=-S_u+T_v is enough to certify the rail action;
// node and relation-type coordinates are spectators under every operator.
const applyRail = (A, vector) => [
  A[0][0] * vector[0] + A[0][1] * vector[1],
  A[1][0] * vector[0] + A[1][1] * vector[1]
].map(value => value === 0 ? 0 : value);
assert.deepEqual(applyRail(I, [-1, 0]), [0, -1]); // -S_u -> -T_u
assert.deepEqual(applyRail(I, [0, 1]), [-1, 0]);  // +T_v -> -S_v
assert.deepEqual(applyRail(Nplus, [-1, 0]), [0, -1]);
assert.deepEqual(applyRail(Nplus, [0, 1]), [0, 0]);
assert.deepEqual(applyRail(Nminus, [-1, 0]), [0, 0]);
assert.deepEqual(applyRail(Nminus, [0, 1]), [1, 0]);

// Rail identification C=[1,1] has anti-diagonal kernel. I sends that kernel
// to the diagonal, so the quarter-turn cannot descend to the scalar quotient.
const antiDiagonal = [1, -1];
const rotated = applyRail(I, antiDiagonal);
assert.equal(antiDiagonal[0] + antiDiagonal[1], 0);
assert.notEqual(rotated[0] + rotated[1], 0);

const nodes = new Set(source.edges.flatMap(([u, v]) => [u, v]));
const relationTypes = new Set(source.edges.map(edge => edge[2]));
const fibres = nodes.size * relationTypes.size;
const dimension = fibres * 2;
assert.equal(source.sourceHash, "82d9c5a47f4957ddbd302927baed0acb05522773762966a4c9ffc34ed86f94c3");
assert.equal(fibres, evidence.carrier.fibres);
assert.equal(dimension, evidence.carrier.dimension);
assert.equal(evidence.decision.sourceNativeNegativeSquareOperatorDerived, true);
assert.equal(evidence.decision.originalPositiveKernelInvariantUnderQuarterTurn, false);
assert.equal(evidence.decision.ot026ClosureConditionMet, false);

console.log(JSON.stringify({
  result: "pass",
  packet: evidence.packet,
  fibres,
  dimension,
  localAlgebra: evidence.relations.generatedAlgebraPerFibre,
  sourceNativeQuarterTurn: true,
  originalKernelInvariant: false,
  quarterTurnDescendsToScalarQuotient: false,
  nextGate: evidence.nextGate
}, null, 2));
