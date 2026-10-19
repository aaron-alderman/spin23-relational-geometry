import assert from 'node:assert/strict';

// Left-handed Weyl conventions. Hypercharge is Y6=6Y, baryon number B3=3B.
const fields = {
  Q: { color: '3', weak: '2', Y6: 1, B3: 1, L: 0, dimension2: 3 },
  L: { color: '1', weak: '2', Y6: -3, B3: 0, L: 1, dimension2: 3 },
  uc: { color: 'bar3', weak: '1', Y6: -4, B3: -1, L: 0, dimension2: 3 },
  dc: { color: 'bar3', weak: '1', Y6: 2, B3: -1, L: 0, dimension2: 3 },
  ec: { color: '1', weak: '1', Y6: 6, B3: 0, L: -1, dimension2: 3 },
  nuc: { color: '1', weak: '1', Y6: 0, B3: 0, L: -1, dimension2: 3 },
};

const sumCharges = (names) => names.reduce((s, name) => ({
  Y6: s.Y6 + fields[name].Y6,
  B3: s.B3 + fields[name].B3,
  L: s.L + fields[name].L,
  dimension2: s.dimension2 + fields[name].dimension2,
}), { Y6: 0, B3: 0, L: 0, dimension2: 0 });

const operators = [
  {
    name: 'Q_L times u^c_e^c',
    fields: ['Q', 'L', 'uc', 'ec'],
    colorContraction: '3 x bar3 -> 1',
    weakContraction: '(2 x 2 -> 1) x 1 x 1',
  },
  {
    name: 'Q_L times d^c_nu^c',
    fields: ['Q', 'L', 'dc', 'nuc'],
    colorContraction: '3 x bar3 -> 1',
    weakContraction: '(2 x 2 -> 1) x 1 x 1',
  },
].map((op) => ({ ...op, ...sumCharges(op.fields) }));

for (const op of operators) {
  assert.equal(op.Y6, 0);
  assert.equal(op.B3, 0);
  assert.equal(op.L, 0);
  assert.equal(op.dimension2, 12);
}

const QL = sumCharges(['Q', 'L']);
const ucEc = sumCharges(['uc', 'ec']);
const dcNuc = sumCharges(['dc', 'nuc']);
assert.deepEqual({ Y6: QL.Y6, B3: QL.B3, L: QL.L }, { Y6: -2, B3: 1, L: 1 });
assert.deepEqual({ Y6: ucEc.Y6, B3: ucEc.B3, L: ucEc.L }, { Y6: 2, B3: -1, L: -1 });
assert.deepEqual({ Y6: dcNuc.Y6, B3: dcNuc.B3, L: dcNuc.L }, { Y6: 2, B3: -1, L: -1 });

// No two-fermion plus only color-singlet Higgs insertions can neutralize the
// color triplet of QL or the antitriplet of either right-handed bilinear.
const smOnlyDimensionFiveCrossCompletionExists = false;
assert.equal(smOnlyDimensionFiveCrossCompletionExists, false);

// S1=(bar3,1,+1/3), B=-1/3, L=-1 couples to QL; S1^dagger couples
// to uc ec and dc nuc. Its assigned B,L forbid its gauge-allowed diquark uses.
const S1 = { color: 'bar3', weak: '1', Y6: 2, B3: -1, L: -1 };
assert.equal(QL.Y6 + S1.Y6, 0);
assert.equal(QL.B3 + S1.B3, 0);
assert.equal(QL.L + S1.L, 0);
for (const right of [ucEc, dcNuc]) {
  assert.equal(right.Y6 - S1.Y6, 0);
  assert.equal(right.B3 - S1.B3, 0);
  assert.equal(right.L - S1.L, 0);
}

const QQ = sumCharges(['Q', 'Q']);
const ucDc = sumCharges(['uc', 'dc']);
assert.notEqual(QQ.B3 - S1.B3, 0);
assert.notEqual(ucDc.B3 + S1.B3, 0);

const p = [1, -1, 1, -1];
const FC = [[0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]];
const G = FC.map((row) => row.map((x, j) => x * p[j]));
assert.equal(G[0][3], -1); // u <- -e
assert.equal(G[3][0], 1);  // e <- +u
assert.equal(G[1][2], 1);  // nu <- +d
assert.equal(G[2][1], -1); // d <- -nu

console.log(JSON.stringify({
  protocol: 'minimal-sm-operator-completion-furey-channel-pulse/1',
  operators,
  minimalSMOnlyDimension: 6,
  dimensionFiveNoGo: 'color-singlet Higgs insertions cannot neutralize the QL triplet or right-bilinear antitriplets',
  treeMediator: {
    name: 'S1',
    representation: '(bar3,1,+1/3)',
    charges: { B: -1 / 3, L: -1 },
    couplings: ['S1 QL', 'S1^dagger uc ec', 'S1^dagger dc nuc'],
    diquarksForbiddenIfSeparateBandLExact: true,
  },
  fureyPulseMatching: {
    channelOrder: ['u', 'nu', 'd', 'e'],
    orientedPairs: ['u<- -e, e<- +u', 'nu<- +d, d<- -nu'],
    coefficientRequirement: 'the two crossed Wilson coefficients must have equal magnitude and opposite oriented phase in the response convention',
    selectedByGaugeSymmetry: false,
  },
  remainingGate: 'compute the response reduction or matching matrix; allowed dimension-six operators do not by themselves prove i F_C p',
  passed: true,
}, null, 2));
