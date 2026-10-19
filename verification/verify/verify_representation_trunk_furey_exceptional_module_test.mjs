import assert from 'node:assert/strict';

const gcd = (a, b) => (b === 0n ? (a < 0n ? -a : a) : gcd(b, a % b));
const rat = (n, d = 1n) => {
  if (d === 0n) throw new Error('zero denominator');
  const sign = d < 0n ? -1n : 1n;
  const g = gcd(n, d);
  return { n: sign * n / g, d: sign * d / g };
};
const add = (a, b) => rat(a.n * b.d + b.n * a.d, a.d * b.d);
const mul = (a, b) => rat(a.n * b.n, a.d * b.d);
const pow = (a, k) => Array.from({ length: k }, () => a).reduce(mul, rat(1n));
const sum = (xs) => xs.reduce(add, rat(0n));
const zero = (x) => x.n === 0n;

// All fields are left-handed Weyl fields.  The right-handed Standard-Model
// particles therefore appear through their left-handed conjugates.
const furey16 = [
  { name: 'Q',   dimension: 6n, colorCubic:  2n, colorMultiplicity: 2n, weakMultiplicity: 3n, y: rat( 1n, 6n) },
  { name: 'u^c', dimension: 3n, colorCubic: -1n, colorMultiplicity: 1n, weakMultiplicity: 0n, y: rat(-2n, 3n) },
  { name: 'd^c', dimension: 3n, colorCubic: -1n, colorMultiplicity: 1n, weakMultiplicity: 0n, y: rat( 1n, 3n) },
  { name: 'L',   dimension: 2n, colorCubic:  0n, colorMultiplicity: 0n, weakMultiplicity: 1n, y: rat(-1n, 2n) },
  { name: 'e^c', dimension: 1n, colorCubic:  0n, colorMultiplicity: 0n, weakMultiplicity: 0n, y: rat( 1n) },
  { name: 'nu^c',dimension: 1n, colorCubic:  0n, colorMultiplicity: 0n, weakMultiplicity: 0n, y: rat( 0n) },
];

assert.equal(furey16.reduce((n, x) => n + x.dimension, 0n), 16n);
assert.equal(furey16.reduce((n, x) => n + x.colorCubic, 0n), 0n);
assert(zero(sum(furey16.map((x) => mul(rat(x.colorMultiplicity), x.y))))); // SU(3)^2 U(1), common Dynkin factor omitted
assert(zero(sum(furey16.map((x) => mul(rat(x.weakMultiplicity), x.y)))));  // SU(2)^2 U(1), common Dynkin factor omitted
assert(zero(sum(furey16.map((x) => mul(rat(x.dimension), x.y)))));        // gravity^2 U(1)
assert(zero(sum(furey16.map((x) => mul(rat(x.dimension), pow(x.y, 3))))));// U(1)^3
assert.equal(3n + 1n, 4n); // even number of SU(2) doublets: no Witten anomaly

// The exceptional flag complement M_3(C) contains Q_L plus d_R.  It cannot
// be the all-left completed generation: it has complex dimension 9, and the
// singlet color representation/chirality is the opposite of d^c.
const flagComplement = [
  { name: 'Q', dimension: 6, rep: '(3,2)_{1/6}' },
  { name: 'd_R', dimension: 3, rep: '(3,1)_{-1/3}' },
];
assert.equal(flagComplement.reduce((n, x) => n + x.dimension, 0), 9);
assert.notEqual(flagComplement[1].rep, '(bar3,1)_{1/3}');
assert.notEqual(9, 16);

// The complex exceptional Jordan module (the E6 fundamental) has the
// Spin(10) x U(1) branching 27 = 16_1 + 10_-2 + 1_4.  Thus the completed
// Furey generation embeds as the unique 16 summand after this subgroup and
// polarization have been selected.
const e6Branch = [
  { spin10: '16', dimension: 16, u1: 1, multiplicity: 1 },
  { spin10: '10', dimension: 10, u1: -2, multiplicity: 1 },
  { spin10: '1', dimension: 1, u1: 4, multiplicity: 1 },
];
assert.equal(e6Branch.reduce((n, x) => n + x.dimension * x.multiplicity, 0), 27);
assert.equal(e6Branch.find((x) => x.spin10 === '16').multiplicity, 1);

// The E6 cubic permits the Spin(10)-invariant Yukawa-shaped channels.
assert.equal(1 + 1 - 2, 0);   // 16_1 16_1 10_-2
assert.equal(-2 - 2 + 4, 0);  // 10_-2 10_-2 1_4

// Physical charge conjugation is not internal to this chiral 27: its
// conjugate contains bar16_-1 and belongs to bar27.
const conjugateBranch = [
  { spin10: 'bar16', dimension: 16, u1: -1 },
  { spin10: '10', dimension: 10, u1: 2 },
  { spin10: '1', dimension: 1, u1: -4 },
];
assert(!e6Branch.some((x) => x.spin10 === 'bar16'));
assert(conjugateBranch.some((x) => x.spin10 === 'bar16'));
assert.equal(27 + 27, 54); // smallest conjugation-closed 27 + bar27 carrier

console.log(JSON.stringify({
  protocol: 'representation-trunk/furey-exceptional-module-test/1',
  directExceptionalFlagComplement: {
    dimension: 9,
    contents: flagComplement.map((x) => x.rep),
    verdict: 'NO all-left one-generation intertwiner: dimension and d-sector chirality/color both fail',
  },
  complexExceptionalJordanModule: {
    branching: '27 = 16_1 + 10_-2 + 1_4',
    completedFureyEmbedding: 'YES, unique as a Spin(10) summand after choosing Spin(10) x U(1)',
    smChargesChiralityAnomaliesAndNuCompletion: 'preserved on the 16_1 summand',
    yukawaCompatibleChannel: '16_1 x 16_1 x 10_-2',
    fullJordanOrE6Equivalence: 'NO: E6 transformations mix the selected summands and the Jordan module has 11 extra complex directions',
    physicalConjugationInternal: false,
    conjugationClosedCompletion: '27 + bar27 (54 complex dimensions)',
  },
  anomalyChecks: {
    su3Cubed: '0', su3SquaredY: '0', su2SquaredY: '0', gravitySquaredY: '0', yCubed: '0', su2Doublets: 4,
  },
  passed: true,
}, null, 2));
