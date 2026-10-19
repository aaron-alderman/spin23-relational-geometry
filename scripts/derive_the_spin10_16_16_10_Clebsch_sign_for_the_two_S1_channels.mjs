import assert from "node:assert/strict";

// Exact phases are represented by exponents k with value i^k.
const phaseName = ["+1", "+i", "-1", "-i"];
const mod4 = (n) => ((n % 4) + 4) % 4;
const popcount = (n) => {
  let count = 0;
  for (let value = n; value; value >>>= 1) count += value & 1;
  return count;
};

// A monomial operator maps every Fock basis vector |mask> to i^phase |to>.
const identity = () => ({
  to: Array.from({ length: 32 }, (_, mask) => mask),
  phase: Array(32).fill(0),
});
const compose = (left, right) => ({
  to: right.to.map((middle) => left.to[middle]),
  phase: right.to.map((middle, mask) => mod4(right.phase[mask] + left.phase[middle])),
});
const gammaX = (mode) => ({
  to: Array.from({ length: 32 }, (_, mask) => mask ^ (1 << mode)),
  phase: Array.from({ length: 32 }, (_, mask) => popcount(mask & ((1 << mode) - 1)) % 2 ? 2 : 0),
});
const gammaY = (mode) => ({
  to: Array.from({ length: 32 }, (_, mask) => mask ^ (1 << mode)),
  phase: Array.from({ length: 32 }, (_, mask) => {
    const jordanWigner = popcount(mask & ((1 << mode) - 1)) % 2 ? 2 : 0;
    const creationOrAnnihilation = (mask >> mode) & 1 ? 3 : 1;
    return mod4(jordanWigner + creationOrAnnihilation);
  }),
});

const gammas = [];
for (let mode = 0; mode < 5; mode += 1) gammas.push(gammaX(mode), gammaY(mode));

const sameOperator = (left, right, phaseShift = 0) => left.to.every((target, mask) =>
  target === right.to[mask] && left.phase[mask] === mod4(right.phase[mask] + phaseShift));
for (let a = 0; a < 10; a += 1) {
  assert(sameOperator(compose(gammas[a], gammas[a]), identity()));
  for (let b = a + 1; b < 10; b += 1) {
    assert(sameOperator(compose(gammas[a], gammas[b]), compose(gammas[b], gammas[a]), 2));
  }
}

// C = gamma_2 gamma_4 ... gamma_10 in one-based indexing.
let C = identity();
for (const index of [1, 3, 5, 7, 9]) C = compose(C, gammas[index]);
const bilinears = gammas.map((gamma) => compose(C, gamma));

const matrixEntry = (operator, row, column) => operator.to[column] === row ? operator.phase[column] : null;
const transposeCharacter = (operator) => {
  let shift = null;
  for (let column = 0; column < 32; column += 1) {
    const row = operator.to[column];
    const reverse = matrixEntry(operator, column, row);
    assert.notEqual(reverse, null);
    const candidate = mod4(operator.phase[column] - reverse);
    if (shift === null) shift = candidate;
    else assert.equal(candidate, shift);
  }
  return shift;
};

// In ten Euclidean dimensions C gamma_A is symmetric, as required by
// Sym^2(16_+) containing the vector 10.
assert(bilinears.every((operator) => transposeCharacter(operator) === 0));

const evenMasks = Array.from({ length: 32 }, (_, mask) => mask).filter((mask) => popcount(mask) % 2 === 0);
assert.equal(evenMasks.length, 16);
const signs = (mask) => Array.from({ length: 5 }, (_, mode) => (mask >> mode) & 1 ? -1 : 1);
const maskByWeight = new Map(evenMasks.map((mask) => [signs(mask).join(","), mask]));
const mask = ({ minus = [], plusOnly = null }) => {
  const vector = plusOnly === null
    ? Array.from({ length: 5 }, (_, i) => minus.includes(i + 1) ? -1 : 1)
    : Array.from({ length: 5 }, (_, i) => plusOnly === i + 1 ? 1 : -1);
  const result = maskByWeight.get(vector.join(","));
  assert.notEqual(result, undefined);
  return result;
};

const fields = new Map();
for (let i = 1; i <= 3; i += 1) {
  fields.set(`d_${i}`, mask({ minus: [i, 4] }));
  fields.set(`u_${i}`, mask({ minus: [i, 5] }));
  fields.set(`u^c_${i}`, mask({ minus: [1, 2, 3].filter((j) => j !== i) }));
  fields.set(`d^c_${i}`, mask({ plusOnly: i }));
}
fields.set("nu", mask({ plusOnly: 4 }));
fields.set("e", mask({ plusOnly: 5 }));
fields.set("e^c", mask({ minus: [4, 5] }));
fields.set("nu^c", mask({ minus: [] }));

const coefficient = (leftField, rightField, gammaIndex) => {
  const entry = matrixEntry(bilinears[gammaIndex], fields.get(leftField), fields.get(rightField));
  return entry === null ? null : phaseName[entry];
};
const phaseExponent = (name) => phaseName.indexOf(name);
const ratio = (numerator, denominator) => phaseName[mod4(phaseExponent(numerator) - phaseExponent(denominator))];

// Convert the two real vector directions for mode i into isotropic components.
// Exactly one of B_X +/- i B_Y couples a pair whose weights sum to +2e_i.
const isotropicCoefficient = (leftField, rightField, mode, branch) => {
  const x = matrixEntry(bilinears[2 * mode], fields.get(leftField), fields.get(rightField));
  const y = matrixEntry(bilinears[2 * mode + 1], fields.get(leftField), fields.get(rightField));
  if (x === null && y === null) return null;
  assert.notEqual(x, null);
  assert.notEqual(y, null);
  // B_X + branch*i B_Y, branch=+1 or -1.
  const shiftedY = mod4(y + (branch === 1 ? 1 : 3));
  if (shiftedY === x) return { phase: phaseName[x], multiplicity: 2 };
  if (shiftedY === mod4(x + 2)) return { phase: "0", multiplicity: 0 };
  throw new Error("unexpected isotropic combination");
};

const results = [];
for (let i = 1; i <= 3; i += 1) {
  const mode = i - 1;
  const pairs = {
    leftUp: [`u_${i}`, "e"],
    leftDown: [`d_${i}`, "nu"],
    rightUp: [`u^c_${i}`, "e^c"],
    rightDown: [`d^c_${i}`, "nu^c"],
  };
  const entries = {};
  for (const [name, [a, b]] of Object.entries(pairs)) {
    entries[name] = {
      plus: isotropicCoefficient(a, b, mode, 1),
      minus: isotropicCoefficient(a, b, mode, -1),
    };
  }
  results.push({ color: i, entries });
}

for (const { entries } of results) {
  const nonzero = (entry) => [entry.plus, entry.minus].filter((value) => value?.multiplicity === 2);
  assert.equal(nonzero(entries.leftUp).length, 1);
  assert.equal(nonzero(entries.leftDown).length, 1);
  assert.equal(nonzero(entries.rightUp).length, 1);
  assert.equal(nonzero(entries.rightDown).length, 1);
  const rightUp = nonzero(entries.rightUp)[0].phase;
  const rightDown = nonzero(entries.rightDown)[0].phase;
  assert.equal(ratio(rightDown, rightUp), "-1");
  const leftUp = nonzero(entries.leftUp)[0].phase;
  const leftDown = nonzero(entries.leftDown)[0].phase;
  assert.equal(ratio(leftDown, leftUp), "-1");
}

console.log(JSON.stringify({
  protocol: "Spin10-five-mode-16x16-to-10-Clebsch-S1-channel-sign/1",
  CliffordConvention: {
    gamma2jMinus1: "a_j + a_j^dagger",
    gamma2j: "i(a_j^dagger-a_j)",
    chargeConjugation: "C=gamma_2 gamma_4 gamma_6 gamma_8 gamma_10",
    bilinear: "psi^T C gamma_A chi",
  },
  representationCheck: "all ten C gamma_A matrices are symmetric; their even-even restriction realizes Sym^2(16_+) -> 10",
  CliffordCheck: "all ten gamma_A square to +1 and every distinct pair anticommutes exactly",
  colorResults: results,
  invariantSigns: {
    rightIsospin: "coefficient(d^c_i,nu^c) / coefficient(u^c_i,e^c) = -1",
    leftIsospin: "coefficient(d_i,nu) / coefficient(u_i,e) = -1",
  },
  consequence: "the unique Spin(10) vector bilinear supplies the relative minus between u^c e^c and d^c nu^c required by the two S1 Wilson arms, up to one common rephasing of the vector component",
  boundary: "this fixes the Clebsch orientation in the declared Clifford convention; a viable low-energy action must still control mediator mixing, puncture breaking, diquark partners and proton decay",
  passed: true,
}, null, 2));
