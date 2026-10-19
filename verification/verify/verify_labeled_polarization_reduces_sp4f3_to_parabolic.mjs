import assert from "node:assert/strict";

const q = 3;
const mod = (x) => ((x % q) + q) % q;

const I = [
  [1, 0],
  [0, 1],
];
const O = [
  [0, 0],
  [0, 0],
];

function block(a, b, c, d) {
  return [
    [...a[0], ...b[0]],
    [...a[1], ...b[1]],
    [...c[0], ...d[0]],
    [...c[1], ...d[1]],
  ].map((row) => row.map(mod));
}

function matVec(m, v) {
  return m.map((row) =>
    mod(row.reduce((sum, value, index) => sum + value * v[index], 0)),
  );
}

function liesInSourceLagrangian(v) {
  return mod(v[2]) === 0 && mod(v[3]) === 0;
}

const sourceBasis = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
];

const symmetricShear = [
  [1, 2],
  [2, 0],
];
const parabolicShear = block(I, symmetricShear, O, I);
const fourier = block(O, I.map((row) => row.map((x) => -x)), I, O);

assert(sourceBasis.every((v) => liesInSourceLagrangian(matVec(parabolicShear, v))));
assert(sourceBasis.every((v) => !liesInSourceLagrangian(matVec(fourier, v))));

const numberOfLagrangians = (q + 1) * (q ** 2 + 1);
const sp4Order = q ** 4 * (q ** 2 - 1) * (q ** 4 - 1);
const gl2Order = (q ** 2 - 1) * (q ** 2 - q);
const symmetricBlockCount = q ** 3;
const parabolicOrder = gl2Order * symmetricBlockCount;
const pointwiseBasisStabilizerOrder = symmetricBlockCount;

assert.equal(numberOfLagrangians, 40);
assert.equal(sp4Order, 51840);
assert.equal(gl2Order, 48);
assert.equal(symmetricBlockCount, 27);
assert.equal(parabolicOrder, 1296);
assert.equal(sp4Order / numberOfLagrangians, parabolicOrder);

console.log(
  JSON.stringify(
    {
      protocol: "labeled-polarization-reduces-sp4f3-to-parabolic/1",
      fieldOrder: q,
      fullGroup: {
        name: "Sp(4,F3)",
        order: sp4Order,
      },
      lagrangianPolarizations: numberOfLagrangians,
      selectedPolarizationStabilizer: {
        structure: "Sym_2(F3) semidirect GL(2,F3)",
        order: parabolicOrder,
      },
      orderedBasisPointwiseStabilizer: {
        structure: "Sym_2(F3) additive shears",
        order: pointwiseBasisStabilizerOrder,
      },
      tests: {
        symmetricShearPreservesSourceLagrangian: true,
        fourierMovesSourceLagrangian: true,
      },
      conclusion:
        "A selected source polarization reduces full Sp(4,F3) to its Siegel parabolic; fixing its ordered basis reduces it further to the symmetric shear group.",
    },
    null,
    2,
  ),
);
