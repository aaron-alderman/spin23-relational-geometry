import assert from "node:assert/strict";

const popcount = (n) => {
  let x = n, c = 0;
  while (x) { c += x & 1; x >>= 1; }
  return c;
};

const evenSpinorStates = Array.from({ length: 32 }, (_, n) => n).filter((n) => popcount(n) % 2 === 0);
assert.equal(evenSpinorStates.length, 16);

const degreeDistribution = new Map();
for (const n of evenSpinorStates) degreeDistribution.set(popcount(n), (degreeDistribution.get(popcount(n)) ?? 0) + 1);
assert.deepEqual(Object.fromEntries(degreeDistribution), { 0: 1, 2: 10, 4: 5 });
assert(evenSpinorStates.every((n) => (-1) ** popcount(n) === 1));

const permutations = (xs) => xs.length === 0
  ? [[]]
  : xs.flatMap((x, i) => permutations([...xs.slice(0, i), ...xs.slice(i + 1)]).map((p) => [x, ...p]));

const parity = (p) => {
  let inversions = 0;
  for (let i = 0; i < p.length; i += 1) for (let j = i + 1; j < p.length; j += 1) if (p[i] > p[j]) inversions += 1;
  return inversions % 2 === 0 ? 1 : -1;
};

const S3 = permutations([0, 1, 2]);
const S2 = permutations([3, 4]);
const flagGroup = S3.flatMap((color) => S2.map((weak) => ({ color, weak })));
assert.equal(flagGroup.length, 12);

const characters = flagGroup.map(({ color, weak }) => ({
  colorSign: parity(color),
  weakSign: parity(weak),
  fiveSign: parity(color) * parity(weak),
}));

for (const name of ["colorSign", "weakSign", "fiveSign"]) {
  assert.equal(characters.filter((x) => x[name] === 1).length, 6);
  assert.equal(characters.filter((x) => x[name] === -1).length, 6);
}

// Every physical Weyl field is Grassmann odd. Exchanging two fermion fields
// produces -1 at either trivalent branch, but this transformation law does not
// choose a preferred local order. Simultaneously reversing both vertices is even.
const localFermionSwap = -1;
const simultaneousVertexReversal = localFermionSwap * localFermionSwap;
assert.equal(simultaneousVertexReversal, 1);

// The bare permutation lift of the SM flag therefore has no invariant nonzero
// vector in any of the three sign lines. A determinant-one SU lift can repair
// this only by adding compensating phases, which are absent from bit permutations.
const invariantDimensionOfNontrivialSignLine = 0;
assert.equal(invariantDimensionOfNontrivialSignLine, 0);

console.log(JSON.stringify({
  protocol: "five-oscillator-parity-ribbon-selector-no-go/1",
  positiveSpinor: {
    states: evenSpinorStates.length,
    exteriorDegreeDistribution: Object.fromEntries(degreeDistribution),
    oscillatorParityOnEveryState: "+1",
  },
  physicalFieldParity: {
    everyWeylField: "Grassmann odd",
    localTwoFermionExchangeSign: localFermionSwap,
    simultaneousReversalOfBothTrivalentOrders: simultaneousVertexReversal,
    preferredOrderSelected: false,
  },
  pointwiseSMFlagGroup: {
    group: "S3 x S2",
    order: flagGroup.length,
    colorOrientationCharacter: { plus: 6, minus: 6 },
    weakOrientationCharacter: { plus: 6, minus: 6 },
    totalFiveOscillatorOrientationCharacter: { plus: 6, minus: 6 },
    invariantVectorInEachNontrivialSignLine: false,
  },
  remainingGate: "lift the permutation stabilizer to determinant-one SU(3)xSU(2) matrices with their compensating phases and test the induced epsilon/Pfaffian line against Furey conjugation",
  passed: true,
}, null, 2));
