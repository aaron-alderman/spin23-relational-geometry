const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

// Sparse exterior algebra on twelve independent Grassmann generators:
// six nu_{a,alpha} followed by six independent barred generators.
const zero = () => new Map();
const monomial = (indices, coefficient = 1) => {
  let mask = 0;
  let sign = coefficient;
  for (const index of indices) {
    if ((mask & (1 << index)) !== 0) return zero();
    let crossings = 0;
    for (let j = index + 1; j < 12; j += 1) {
      if ((mask & (1 << j)) !== 0) crossings += 1;
    }
    if (crossings % 2 === 1) sign *= -1;
    mask |= 1 << index;
  }
  return new Map([[mask, sign]]);
};
const add = (...terms) => {
  const result = zero();
  for (const term of terms) {
    for (const [mask, coefficient] of term) {
      result.set(mask, (result.get(mask) || 0) + coefficient);
      if (result.get(mask) === 0) result.delete(mask);
    }
  }
  return result;
};
const scale = (factor, term) => new Map([...term].map(([mask, coefficient]) => [mask, factor * coefficient]));
const wedge = (left, right) => {
  const result = zero();
  for (const [leftMask, leftCoefficient] of left) {
    for (const [rightMask, rightCoefficient] of right) {
      if ((leftMask & rightMask) !== 0) continue;
      let crossings = 0;
      for (let i = 0; i < 12; i += 1) {
        if ((leftMask & (1 << i)) === 0) continue;
        for (let j = 0; j < i; j += 1) {
          if ((rightMask & (1 << j)) !== 0) crossings += 1;
        }
      }
      const sign = crossings % 2 === 0 ? 1 : -1;
      const mask = leftMask | rightMask;
      result.set(mask, (result.get(mask) || 0) + sign * leftCoefficient * rightCoefficient);
      if (result.get(mask) === 0) result.delete(mask);
    }
  }
  return result;
};
const equal = (left, right) => {
  const difference = add(left, scale(-1, right));
  return difference.size === 0;
};
const nu = (flavor, spin) => monomial([2 * flavor + spin]);
const barNu = (flavor, spin) => monomial([6 + 2 * flavor + spin]);

// epsilon contraction B_ab = nu_a^0 nu_b^1 - nu_a^1 nu_b^0.
const pair = (field, a, b) => add(
  wedge(field(a, 0), field(b, 1)),
  scale(-1, wedge(field(a, 1), field(b, 0))),
);

const pairs = [];
for (let a = 0; a < 3; a += 1) {
  for (let b = a; b < 3; b += 1) {
    const Bab = pair(nu, a, b);
    assert(Bab.size > 0, `B_${a}${b} must be nonzero`);
    assert(equal(Bab, pair(nu, b, a)), `B_${a}${b} must be flavor symmetric`);
    pairs.push({ a, b, Bab, Bbar: pair(barNu, a, b) });
  }
}
assert(pairs.length === 6, "three flavors must supply six symmetric pair components");

// Linear independence: Gaussian rank of the six pair polynomials in the
// degree-two exterior-monomial basis.
const masks = [...new Set(pairs.flatMap(({ Bab }) => [...Bab.keys()]))];
const matrix = pairs.map(({ Bab }) => masks.map((mask) => Bab.get(mask) || 0));
const rank = (input) => {
  const a = input.map((row) => row.slice());
  let r = 0;
  for (let column = 0; column < a[0].length && r < a.length; column += 1) {
    const pivot = a.findIndex((row, index) => index >= r && Math.abs(row[column]) > 1e-12);
    if (pivot < 0) continue;
    [a[r], a[pivot]] = [a[pivot], a[r]];
    const divisor = a[r][column];
    for (let j = column; j < a[r].length; j += 1) a[r][j] /= divisor;
    for (let i = 0; i < a.length; i += 1) {
      if (i === r) continue;
      const factor = a[i][column];
      for (let j = column; j < a[i].length; j += 1) a[i][j] -= factor * a[r][j];
    }
    r += 1;
  }
  return r;
};
assert(rank(matrix) === 6, "the six B_ab must be linearly independent");

const B00 = pair(nu, 0, 0);
const Bbar00 = pair(barNu, 0, 0);
assert(wedge(B00, B00).size === 0, "the one-flavor holomorphic square B_00^2 must vanish");
assert(wedge(Bbar00, B00).size > 0,
  "the Hermitian norm B_00^dagger B_00 must survive because barred variables are independent");

let invariantNorm = zero();
for (const { Bab, Bbar } of pairs) invariantNorm = add(invariantNorm, wedge(Bbar, Bab));
assert(invariantNorm.size > 0, "the U(3)-invariant sterile-pair norm must be nonzero");

// Hubbard--Stratonovich completion of the square:
// -|Sigma|^2/G + Sigma^* B + B^* Sigma, with Sigma=G B, returns G B^*B.
const G = 7;
const sigmaCoefficient = G;
const eliminatedCoefficient = -(sigmaCoefficient ** 2) / G + 2 * sigmaCoefficient;
assert(eliminatedCoefficient === G, "eliminating the auxiliary field must recover G B^dagger B");

const chargeNu = 1;
const chargeB = 2 * chargeNu;
const chargeBdagger = -chargeB;
const chargeSigma = -chargeB;
assert(chargeBdagger + chargeB === 0, "B^dagger B must preserve B-L");
assert(chargeSigma + chargeB === 0, "Sigma B must preserve B-L");

console.log("Three-flavor sterile-pairing certificate: PASS");
console.log("symmetric_pair_components=6");
console.log("pair_polynomial_rank=6");
console.log("one_flavor_holomorphic_square_zero=true");
console.log("one_flavor_hermitian_norm_nonzero=true");
console.log("three_flavor_U3_norm_channel_nonzero=true");
console.log("B-L(B)=+2; B-L(Sigma)=-2; B-L(Bdagger_B)=0");
console.log("attractive_sign_and_supercritical_dynamics_not_derived=true");
