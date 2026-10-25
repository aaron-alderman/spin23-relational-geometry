import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL("../../evidence/data/moonshine-program-lattice-bridge-v1.json", import.meta.url);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));

// The diagonal integral plane in H_2(R) has the hyperbolic Gram matrix U.
const U = [[0, 1], [1, 0]];
assert.deepEqual(evidence.exactJordanEmbedding.gramMatrix, U);
assert.equal(U[0][0] * U[1][1] - U[0][1] * U[1][0], -1);
const q = ([m, n]) => m * n;
const polar = (x, y) => q([x[0] + y[0], x[1] + y[1]]) - q(x) - q(y);
for (const x of [[1, 0], [0, 1], [2, -3], [5, 7]]) {
  for (const y of [[1, 0], [0, 1], [-4, 2], [3, 6]]) {
    assert.equal(polar(x, y), x[0] * y[1] + x[1] * y[0]);
  }
  assert.equal(q([x[1], x[0]]), q(x));
}

// Reconstruct the cyclic binary Golay code and its Rule-60 image.
const length = 23;
const mask = (1 << length) - 1;
const generator = (1 << 11) | (1 << 9) | (1 << 7) | (1 << 6) | (1 << 5) | (1 << 1) | 1;
const shift = (word) => ((word << 1) & mask) | (word >>> 22);
const rule60 = (word) => (word ^ shift(word)) & mask;
const iterate = (f, word, exponent) => {
  let out = word;
  for (let i = 0; i < exponent; i += 1) out = f(out);
  return out;
};

const code = [];
for (let message = 0; message < 1 << 12; message += 1) {
  let word = 0;
  for (let bit = 0; bit < 12; bit += 1) {
    if ((message >>> bit) & 1) word ^= generator << bit;
  }
  code.push(word & mask);
}
const image = [...new Set(code.map(rule60))];
assert.equal(new Set(code).size, 4096);
assert.equal(image.length, 2048);
assert.deepEqual(code.filter((word) => rule60(word) === 0).sort((a, b) => a - b), [0, mask]);

// The order-23 primary component of T is exactly a shift symmetry.
for (const word of image) {
  assert.equal(iterate(rule60, word, 89), iterate(shift, word, 2));
}
const witness = image.find((word) => word !== 0);
assert.equal(iterate(rule60, witness, 2047), witness);
assert.notEqual(iterate(rule60, witness, 2047 / 23), witness);
assert.notEqual(iterate(rule60, witness, 2047 / 89), witness);

// Polynomial arithmetic over F_2 verifies the stated complement and translated
// minimal polynomial m_T(y)=h(y+1).
const degree = (p) => 31 - Math.clz32(p);
const gcd = (a0, b0) => {
  let a = Math.abs(a0);
  let b = Math.abs(b0);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
};
const multiply = (a0, b0) => {
  let a = a0;
  let b = b0;
  let out = 0;
  while (b !== 0) {
    if (b & 1) out ^= a;
    b >>>= 1;
    a <<= 1;
  }
  return out >>> 0;
};
const divide = (a0, b) => {
  let a = a0;
  let quotient = 0;
  const divisorDegree = degree(b);
  while (a !== 0 && degree(a) >= divisorDegree) {
    const offset = degree(a) - divisorDegree;
    quotient ^= 1 << offset;
    a ^= b << offset;
  }
  return [quotient >>> 0, a >>> 0];
};
const substituteXPlusOne = (p) => {
  let out = 0;
  for (let i = 0; i <= degree(p); i += 1) {
    if ((p >>> i) & 1) {
      let term = 1;
      for (let j = 0; j < i; j += 1) term = multiply(term, 0b11);
      out ^= term;
    }
  }
  return out >>> 0;
};
const complement = (1 << 11) | (1 << 10) | (1 << 6) | (1 << 5) | (1 << 4) | (1 << 2) | 1;
const rule60Minimal = (1 << 11) | (1 << 9) | (1 << 6) | (1 << 5) | (1 << 4) | (1 << 3) | 1;
const [computedComplement, remainder] = divide((1 << 23) | 1, multiply(0b11, generator));
assert.equal(remainder, 0);
assert.equal(computedComplement, complement);
assert.equal(substituteXPlusOne(complement), rule60Minimal);

const reciprocal = (p) => {
  const d = degree(p);
  let out = 0;
  for (let i = 0; i <= d; i += 1) if ((p >>> i) & 1) out |= 1 << (d - i);
  return out >>> 0;
};
assert.equal(reciprocal(generator), complement);

const orbit = (seed) => {
  const out = [];
  let value = seed;
  do {
    out.push(value);
    value = (2 * value) % 23;
  } while (value !== seed);
  return out;
};
const orbitOne = orbit(1);
const orbitFive = orbit(5);
assert.equal(orbitOne.length, 11);
assert.equal(orbitFive.length, 11);
assert.equal(new Set([...orbitOne, ...orbitFive]).size, 22);
const quadraticResidues23 = [...new Set(Array.from({length: 22}, (_, i) => ((i + 1) ** 2) % 23))].sort((a, b) => a - b);
assert.deepEqual([...orbitOne].sort((a, b) => a - b), quadraticResidues23);
assert(orbitOne.every((value) => orbitFive.includes((5 * value) % 23)));
assert.equal((5n ** 11n) % 23n, 22n);
assert(!quadraticResidues23.includes(22)); // -1 is a nonresidue, so inversion exchanges the rails

// The two Fourier periods on the residue and nonresidue rails generate the
// quadratic subfield of Q(zeta_23).  In Z[x]/Phi_23(x), their sum is -1 and
// their product is 6, hence each satisfies X^2+X+6 and the discriminant is -23.
const periodProduct = Array(23).fill(0);
for (const i of orbitOne) for (const j of orbitFive) periodProduct[(i + j) % 23] += 1;
const reducedPeriodProduct = periodProduct.slice(0, 22).map((coefficient) => coefficient - periodProduct[22]);
assert.deepEqual(reducedPeriodProduct, [6, ...Array(21).fill(0)]);
const periodSum = Array(23).fill(0);
for (const i of [...orbitOne, ...orbitFive]) periodSum[i] += 1;
const reducedPeriodSum = periodSum.slice(0, 22).map((coefficient) => coefficient - periodSum[22]);
assert.deepEqual(reducedPeriodSum, [-1, ...Array(21).fill(0)]);

// The two degree-11 factors are the two primes over 2 in Q(zeta_23).  Reduce
// the QR Gaussian period alpha on each factor.  The residues 0 and 1 prove
// that their contractions to Q(sqrt(-23)) are (2,alpha) and (2,alpha+1).
const multiplyModPolynomial = (a, b, modulusPolynomial) => divide(multiply(a, b), modulusPolynomial)[1];
const powerModPolynomial = (base, exponent, modulusPolynomial) => {
  let out = 1;
  let x = base;
  let n = exponent;
  while (n > 0) {
    if (n & 1) out = multiplyModPolynomial(out, x, modulusPolynomial);
    x = multiplyModPolynomial(x, x, modulusPolynomial);
    n >>>= 1;
  }
  return out;
};
const gaussianPeriodResidue = (factor) => orbitOne.reduce(
  (sum, exponent) => sum ^ powerModPolynomial(0b10, exponent, factor),
  0,
);
assert.equal(gaussianPeriodResidue(generator), 0);
assert.equal(gaussianPeriodResidue(complement), 1);

// Expand the published eta-product expression for the common 23A/23B
// McKay-Thompson series:
//   F = eta(tau)eta(23tau)/(eta(2tau)eta(46tau)),
//   T_23 = (F+1)(F^2+4)/F^2 = F+1+4/F+4/F^2.
const maxQ = 100;
const multiplySeries = (left, right, minExponent = -2, maxExponent = maxQ) => {
  const out = new Map();
  for (const [i, a] of left) for (const [j, b] of right) {
    const exponent = i + j;
    if (exponent >= minExponent && exponent <= maxExponent) {
      out.set(exponent, (out.get(exponent) ?? 0n) + a * b);
    }
  }
  return out;
};
let inversePlusProduct = new Map([[0, 1n]]);
for (const scale of [1, 23]) {
  for (let n = 1; scale * n <= maxQ + 1; n += 1) {
    const factor = new Map();
    for (let r = 0; scale * n * r <= maxQ + 1; r += 1) {
      factor.set(scale * n * r, r % 2 === 0 ? 1n : -1n);
    }
    inversePlusProduct = multiplySeries(inversePlusProduct, factor, 0, maxQ + 1);
  }
}
const F = new Map([...inversePlusProduct].map(([exponent, coefficient]) => [exponent - 1, coefficient]));
let plusProduct = new Map([[0, 1n]]);
for (const scale of [1, 23]) {
  for (let n = 1; scale * n <= maxQ; n += 1) {
    plusProduct = multiplySeries(plusProduct, new Map([[0, 1n], [scale * n, 1n]]), 0, maxQ);
  }
}
const inverseF = new Map([...plusProduct].map(([exponent, coefficient]) => [exponent + 1, coefficient]));
const inverseFSquared = multiplySeries(inverseF, inverseF, 0, maxQ);
const T23 = new Map(F);
T23.set(0, (T23.get(0) ?? 0n) + 1n);
for (const [exponent, coefficient] of inverseF) T23.set(exponent, (T23.get(exponent) ?? 0n) + 4n * coefficient);
for (const [exponent, coefficient] of inverseFSquared) T23.set(exponent, (T23.get(exponent) ?? 0n) + 4n * coefficient);
assert.deepEqual(
  [-1, 0, 1, 2, 3, 4, 5, 6].map((exponent) => T23.get(exponent) ?? 0n),
  [1n, 0n, 4n, 7n, 13n, 19n, 33n, 47n],
);

// An order-23 coordinate cycle in M_24 fixes the rank-two Leech lattice
// with Gram matrix [[4,1],[1,6]].  Its theta series has exponent
// Q(a,b)=(v,v)/2=2a^2+ab+3b^2.  The oscillator frame shape 1^1 23^1
// supplies eta(tau)eta(23tau), so the standard lattice-VOA trace is
// theta_Lfix/(eta(tau)eta(23tau)).  It agrees with the normalized Monster
// 23A/23B Hauptmodul after removing the one invariant weight-one state.
const fixedGram = [[4, 1], [1, 6]];
assert.equal(fixedGram[0][0] * fixedGram[1][1] - fixedGram[0][1] ** 2, 23);
const reducedMinus23 = [];
for (let a = 1; a <= 10; a += 1) {
  for (let b = -a; b <= a; b += 1) {
    const numerator = b * b + 23;
    if (numerator % (4 * a) !== 0) continue;
    const c = numerator / (4 * a);
    if (a > c) continue;
    if ((Math.abs(b) === a || a === c) && b < 0) continue;
    if (gcd(gcd(a, Math.abs(b)), c) !== 1) continue;
    reducedMinus23.push([a, b, c]);
  }
}
assert.deepEqual(reducedMinus23, [[1, 1, 6], [2, -1, 3], [2, 1, 3]]);
for (let a = -10; a <= 10; a += 1) {
  for (let b = -10; b <= 10; b += 1) {
    // N(2a-b*alpha)/N((2,alpha)), with alpha+alphaBar=-1,
    // alpha*alphaBar=6 and ideal norm 2.
    const normalizedIdealNorm = (4 * a * a + 2 * a * b + 6 * b * b) / 2;
    assert.equal(normalizedIdealNorm, 2 * a * a + a * b + 3 * b * b);
  }
}
const fixedTheta = new Map();
const conjugateFixedTheta = new Map();
const principalTheta = new Map();
for (let a = -20; a <= 20; a += 1) {
  for (let b = -20; b <= 20; b += 1) {
    const exponent = 2 * a * a + a * b + 3 * b * b;
    const conjugateExponent = 2 * a * a - a * b + 3 * b * b;
    const principalExponent = a * a + a * b + 6 * b * b;
    if (exponent <= maxQ + 1) {
      fixedTheta.set(exponent, (fixedTheta.get(exponent) ?? 0n) + 1n);
    }
    if (conjugateExponent <= maxQ + 1) {
      conjugateFixedTheta.set(conjugateExponent, (conjugateFixedTheta.get(conjugateExponent) ?? 0n) + 1n);
    }
    if (principalExponent <= maxQ + 1) {
      principalTheta.set(principalExponent, (principalTheta.get(principalExponent) ?? 0n) + 1n);
    }
  }
}
assert.deepEqual(fixedTheta, conjugateFixedTheta);
assert.deepEqual(
  [0, 1, 2, 3, 4, 5, 6].map((exponent) => fixedTheta.get(exponent) ?? 0n),
  [1n, 0n, 2n, 2n, 2n, 0n, 2n],
);
let inverseEtaProduct = new Map([[0, 1n]]);
for (const scale of [1, 23]) {
  for (let n = 1; scale * n <= maxQ + 1; n += 1) {
    const factor = new Map();
    for (let r = 0; scale * n * r <= maxQ + 1; r += 1) {
      factor.set(scale * n * r, 1n);
    }
    inverseEtaProduct = multiplySeries(inverseEtaProduct, factor, 0, maxQ + 1);
  }
}
const leech23Trace = new Map(
  [...multiplySeries(fixedTheta, inverseEtaProduct, 0, maxQ + 1)]
    .map(([exponent, coefficient]) => [exponent - 1, coefficient]),
);
for (let exponent = -1; exponent <= 30; exponent += 1) {
  const expected = (T23.get(exponent) ?? 0n) + (exponent === 0 ? 1n : 0n);
  assert.equal(leech23Trace.get(exponent) ?? 0n, expected);
}

// The exceptional discriminant -23 eta identity resolves the principal and
// inverse nonprincipal form classes.  It is the arithmetic source of the
// constant shift above: Theta_[1,1,6] - Theta_[2,1,3] = 2 eta eta_23.
let eta23CuspUnshifted = new Map([[0, 1n]]);
for (const scale of [1, 23]) {
  for (let n = 1; scale * n <= maxQ; n += 1) {
    eta23CuspUnshifted = multiplySeries(
      eta23CuspUnshifted,
      new Map([[0, 1n], [scale * n, -1n]]),
      0,
      maxQ,
    );
  }
}
const eta23Cusp = new Map(
  [...eta23CuspUnshifted].map(([exponent, coefficient]) => [exponent + 1, coefficient]),
);
for (let exponent = 0; exponent <= maxQ; exponent += 1) {
  assert.equal(
    (principalTheta.get(exponent) ?? 0n) - (fixedTheta.get(exponent) ?? 0n),
    2n * (eta23Cusp.get(exponent) ?? 0n),
  );
}

// The second replication identity is a finite coefficient check of
// P_2(T_23)=T_23(q^2)+T_23(q^(1/2))+T_23(-q^(1/2)).
// Since squaring to q^k uses the coefficient at q^(k+1), and the right side
// uses q^(2k), the expansion above is sufficient through q^15.
const T23Squared = multiplySeries(T23, T23, -2, maxQ - 1);
const faber2 = new Map(T23Squared);
faber2.set(0, (faber2.get(0) ?? 0n) - 2n * T23.get(1));
for (let exponent = -2; exponent <= 15; exponent += 1) {
  const fromQSquared = exponent % 2 === 0 ? (T23.get(exponent / 2) ?? 0n) : 0n;
  const fromHalfArguments = 2n * (T23.get(2 * exponent) ?? 0n);
  assert.equal(faber2.get(exponent) ?? 0n, fromQSquared + fromHalfArguments);
}

// A Monster group element cannot have order divisible by 89.
const monsterPrimeExponents = new Map([[2n, 46n], [3n, 20n], [5n, 9n], [7n, 6n], [11n, 2n], [13n, 3n], [17n, 1n], [19n, 1n], [23n, 1n], [29n, 1n], [31n, 1n], [41n, 1n], [47n, 1n], [59n, 1n], [71n, 1n]]);
let monsterOrder = 1n;
for (const [prime, exponent] of monsterPrimeExponents) monsterOrder *= prime ** exponent;
assert.equal(monsterOrder.toString(), "808017424794512875886459904961710757005754368000000000");
assert.notEqual(monsterOrder % 89n, 0n);
assert.equal(monsterOrder % 89n, 66n);

// The non-anomalous Fricke order-23 self-orbifold has 23^2 simple modules
// V_{a,b}.  Their conformal quadratic form q(a,b)=ab/23 mod 1 is precisely
// the discriminant form of the scaled hyperbolic lattice U(23).  Modular S
// is the finite quarter-turn (a,b)->(b,-a), while the duality-defect
// involution swaps the electric and magnetic rails.
const modulus = 23;
const mod = (x) => ((x % modulus) + modulus) % modulus;
const finiteLabels = Array.from({length: modulus}, (_, a) =>
  Array.from({length: modulus}, (_, b) => [a, b])).flat();
assert.equal(finiteLabels.length, 23 ** 2);
const modularS = ([a, b]) => [b, mod(-a)];
const defectSwap = ([a, b]) => [b, a];
for (const label of finiteLabels) {
  let transformed = label;
  for (let i = 0; i < 4; i += 1) transformed = modularS(transformed);
  assert.deepEqual(transformed, label);
  assert.deepEqual(modularS(modularS(label)), [mod(-label[0]), mod(-label[1])]);
  assert.deepEqual(defectSwap(defectSwap(label)), label);
  assert.equal(mod(defectSwap(label)[0] * defectSwap(label)[1]), mod(label[0] * label[1]));
}
const inverseFive = 14; // 5*14=70=1 mod 23
const orientationExchange = ([a, b]) => [mod(5 * a), mod(inverseFive * b)];
const applyPower = (map, value, exponent) => {
  let out = value;
  for (let i = 0; i < exponent; i += 1) out = map(out);
  return out;
};
for (const label of finiteLabels) {
  assert.equal(mod(orientationExchange(label)[0] * orientationExchange(label)[1]), mod(label[0] * label[1]));
  assert.deepEqual(applyPower(orientationExchange, label, 22), label);
  assert.deepEqual(modularS(modularS(label)), applyPower(orientationExchange, label, 11));
  // S D S^-1 = D^-1, written pointwise without matrix libraries.
  const sInverse = ([a, b]) => [mod(-b), a];
  const lhs = modularS(orientationExchange(sInverse(label)));
  const rhs = applyPower(orientationExchange, label, 21);
  assert.deepEqual(lhs, rhs);
}
// Enumerate normal forms D^k and S D^k and confirm that the generated
// dicyclic transition skeleton has 44 distinct transformations.
const transformationFingerprint = (map) => finiteLabels.map(map).map(([a, b]) => `${a},${b}`).join(";");
const finiteSkeleton = new Set();
for (let k = 0; k < 22; k += 1) {
  finiteSkeleton.add(transformationFingerprint((label) => applyPower(orientationExchange, label, k)));
  finiteSkeleton.add(transformationFingerprint((label) => modularS(applyPower(orientationExchange, label, k))));
}
assert.equal(finiteSkeleton.size, 44);

// Quotienting nonzero labels by common scalar multiplication gives the 24
// directions of P^1(F_23). The central -I then disappears, so Dic_11
// descends to D_11. Its action separates the two coordinate axes from the
// 22 mixed directions.
const inverseMod = (value) => {
  for (let candidate = 1; candidate < modulus; candidate += 1) {
    if (mod(value * candidate) === 1) return candidate;
  }
  throw new Error(`no inverse for ${value}`);
};
const canonicalDirection = ([a, b]) => a === 0
  ? "0,1"
  : `1,${mod(b * inverseMod(a))}`;
const projectiveDirections = ["0,1", ...Array.from({length: modulus}, (_, r) => `1,${r}`)];
assert.equal(new Set(projectiveDirections).size, 24);
const parseDirection = (direction) => direction.split(",").map(Number);
const projectiveFingerprint = (map) => projectiveDirections
  .map((direction) => canonicalDirection(map(parseDirection(direction))))
  .join(";");
const projectiveSkeleton = new Set();
const projectiveMaps = [];
for (let k = 0; k < 22; k += 1) {
  for (const map of [
    (label) => applyPower(orientationExchange, label, k),
    (label) => modularS(applyPower(orientationExchange, label, k)),
  ]) {
    projectiveSkeleton.add(projectiveFingerprint(map));
    projectiveMaps.push(map);
  }
}
assert.equal(projectiveSkeleton.size, 22);
const directionOrbit = (seed) => new Set(projectiveMaps.map((map) =>
  canonicalDirection(map(parseDirection(seed)))));
const axisOrbit = directionOrbit("1,0");
const mixedOrbit = directionOrbit("1,1");
assert.deepEqual([...axisOrbit].sort(), ["0,1", "1,0"]);
assert.equal(mixedOrbit.size, 22);
assert.equal([...mixedOrbit].every((direction) => direction !== "0,1" && direction !== "1,0"), true);

// The 22 nonidentity powers of a chosen C_23 generator give 11 inverse
// pairs. Fifth power is transitive on those pairs. This is a typed reason
// that 1+11 appears nearby; it is not yet a bijection to defect objects.
const inversePairRepresentative = (value) => Math.min(value, modulus - value);
const generatorPairs = new Set(Array.from({length: 22}, (_, i) => inversePairRepresentative(i + 1)));
assert.equal(generatorPairs.size, 11);
const fifthPowerPairOrbit = new Set();
let pairValue = 1;
for (let i = 0; i < 11; i += 1) {
  fifthPowerPairOrbit.add(inversePairRepresentative(pairValue));
  pairValue = mod(5 * pairValue);
}
assert.equal(fifthPowerPairOrbit.size, 11);
// Exact discrete-Fourier orthogonality, expressed without floating point.
for (let a = 0; a < modulus; a += 1) {
  for (let c = 0; c < modulus; c += 1) {
    const counts = Array(modulus).fill(0);
    for (let k = 0; k < modulus; k += 1) counts[mod((a - c) * k)] += 1;
    if (a === c) assert.deepEqual(counts, [23, ...Array(22).fill(0)]);
    else assert.deepEqual(counts, Array(23).fill(1));
  }
}
assert.equal(gcd(24, 23), 1); // an order-24 anomaly restricts trivially to C_23

// The modular reconstruction problem is smaller than 529 independent
// functions. Reduction of SL_2(Z) modulo 23 is onto SL_2(F_23). The exact
// stabilizer of the row label (0,1) has order 23, whereas its projective
// stabilizer has order 23*22. Thus the nonzero labels form one 528-element
// orbit, while a scalar Gamma_0(23)-invariant trace has only 24 modular
// images, one for each direction in P^1(F_23). Each image is used by 22
// scalar multiples.
const sl2Mod23 = [];
for (let a = 0; a < modulus; a += 1) {
  for (let b = 0; b < modulus; b += 1) {
    for (let c = 0; c < modulus; c += 1) {
      for (let d = 0; d < modulus; d += 1) {
        if (mod(a * d - b * c) === 1) sl2Mod23.push([a, b, c, d]);
      }
    }
  }
}
assert.equal(sl2Mod23.length, modulus * (modulus ** 2 - 1));
const exactVectorStabilizer = sl2Mod23.filter(([, , c, d]) => c === 0 && d === 1);
const projectiveVectorStabilizer = sl2Mod23.filter(([, , c]) => c === 0);
assert.equal(exactVectorStabilizer.length, modulus);
assert.equal(projectiveVectorStabilizer.length, modulus * (modulus - 1));
assert.equal(sl2Mod23.length / exactVectorStabilizer.length, modulus ** 2 - 1);
assert.equal(sl2Mod23.length / projectiveVectorStabilizer.length, modulus + 1);
const modularOrbitOf01 = new Set(sl2Mod23.map(([, , c, d]) => `${c},${d}`));
assert.equal(modularOrbitOf01.size, modulus ** 2 - 1);
const modularProjectiveOrbit = new Set(sl2Mod23.map(([, , c, d]) => canonicalDirection([c, d])));
assert.equal(modularProjectiveOrbit.size, modulus + 1);
const projectiveMultiplicity = new Map();
for (const [a, b] of finiteLabels.filter(([x, y]) => x !== 0 || y !== 0)) {
  const direction = canonicalDirection([a, b]);
  projectiveMultiplicity.set(direction, (projectiveMultiplicity.get(direction) ?? 0) + 1);
}
assert.equal(projectiveMultiplicity.size, 24);
assert.equal([...projectiveMultiplicity.values()].every((count) => count === 22), true);
assert.equal(evidence.modularTransportReconstruction.nonzeroLabelOrbit, 528);
assert.equal(evidence.modularTransportReconstruction.scalarModularImages, 24);

// Because T_23A=T_23B and every nonidentity power of an order-23 generator
// lies in one of those two classes, the untwisted discrete Fourier projection
// has only a neutral and a universal nonzero-charge character.
const sigma3 = (n) => {
  let total = 0n;
  for (let divisor = 1; divisor <= n; divisor += 1) {
    if (n % divisor === 0) total += BigInt(divisor) ** 3n;
  }
  return total;
};
const binomialBigInt = (n, k) => {
  let out = 1n;
  for (let i = 1; i <= k; i += 1) out = out * BigInt(n - k + i) / BigInt(i);
  return out;
};
const E4 = new Map([[0, 1n]]);
for (let exponent = 1; exponent <= maxQ + 1; exponent += 1) E4.set(exponent, 240n * sigma3(exponent));
const E4Cubed = multiplySeries(multiplySeries(E4, E4, 0, maxQ + 1), E4, 0, maxQ + 1);
let inverseDeltaUnshifted = new Map([[0, 1n]]);
for (let n = 1; n <= maxQ + 1; n += 1) {
  const factor = new Map();
  for (let multiplicity = 0; n * multiplicity <= maxQ + 1; multiplicity += 1) {
    factor.set(n * multiplicity, binomialBigInt(23 + multiplicity, 23));
  }
  inverseDeltaUnshifted = multiplySeries(inverseDeltaUnshifted, factor, 0, maxQ + 1);
}
const inverseDelta = new Map([...inverseDeltaUnshifted].map(([exponent, coefficient]) => [exponent - 1, coefficient]));
const Jfirst = multiplySeries(E4Cubed, inverseDelta, -1, maxQ);
Jfirst.set(0, (Jfirst.get(0) ?? 0n) - 744n);
assert.deepEqual(
  [-1, 0, 1, 2].map((exponent) => Jfirst.get(exponent) ?? 0n),
  [1n, 0n, 196884n, 21493760n],
);
const neutralCharge = new Map();
const nonzeroCharge = new Map();
for (let exponent = -1; exponent <= maxQ; exponent += 1) {
  neutralCharge.set(exponent, ((Jfirst.get(exponent) ?? 0n) + 22n * (T23.get(exponent) ?? 0n)) / 23n);
  nonzeroCharge.set(exponent, ((Jfirst.get(exponent) ?? 0n) - (T23.get(exponent) ?? 0n)) / 23n);
}
assert.deepEqual([-1, 0, 1, 2].map((e) => neutralCharge.get(e)), [1n, 0n, 8564n, 934518n]);
assert.deepEqual([-1, 0, 1, 2].map((e) => nonzeroCharge.get(e)), [0n, 0n, 8560n, 934511n]);
for (let charge = 1; charge < modulus; charge += 1) {
  // sum_{k=1}^{22} zeta^(-charge*k)=-1, encoded by residue counts.
  const residues = Array(modulus).fill(0);
  for (let k = 1; k < modulus; k += 1) residues[mod(-charge * k)] += 1;
  assert.deepEqual(residues, [0, ...Array(22).fill(1)]);
}

// Fricke invariance makes the 24 modular branches explicit. For a!=0 and
// r=b/a mod 23, a matrix with bottom row (1,r) sends tau to -1/(tau+r),
// and T_23(-1/(tau+r))=T_23((tau+r)/23). Fourier projection over r then
// filters the T_23 coefficients by their exponent modulo 23:
//   ch V_{a,b} = sum_{n == ab (23)} c(n) q^(n/23).
// This supplies every scalar V_{a,b} character from one known q-series.
const twistedCharacter = (a, b) => {
  const aa = mod(a);
  const bb = mod(b);
  if (aa === 0) return bb === 0 ? new Map(neutralCharge) : new Map(nonzeroCharge);
  const residue = mod(aa * bb);
  return new Map([...T23].filter(([exponent]) => mod(exponent) === residue));
};
const twistedCharacterFingerprint = (a, b) => {
  if (mod(a) === 0) return mod(b) === 0 ? "untwisted-neutral" : "untwisted-charged";
  return `twisted-product-${mod(a * b)}`;
};
const moduleCharacterFingerprints = new Set(finiteLabels.map(([a, b]) => twistedCharacterFingerprint(a, b)));
assert.equal(moduleCharacterFingerprints.size, 25);
for (let a = 1; a < modulus; a += 1) {
  for (let b = 0; b < modulus; b += 1) {
    const character = twistedCharacter(a, b);
    for (const exponent of character.keys()) assert.equal(mod(exponent), mod(a * b));
  }
}
// The unique twisted ground state sits in product class -1, agreeing with
// Volpato's V_{1,-1} convention.
assert.equal(twistedCharacter(1, -1).get(-1), 1n);
assert.equal(twistedCharacter(1, 0).has(-1), false);
assert.equal(evidence.modularTransportReconstruction.moduleCharacterTypes, 25);

// Execute Volpato's equation (2.33) for the twelve even-l, t=0 commutant
// characters. Exponents are stored exactly in units of 1/13800, the lcm of
// the parafermion shift denominator 8*23*25, the twisted 1/23 grading and
// eta's 1/24 shift. The available T_23 coefficients through q^100 suffice for
// the first three integral-grade terms of every series.
const exponentDenominator = 13800;
const partitionNumbers = Array(21).fill(0n);
partitionNumbers[0] = 1n;
for (let part = 1; part < partitionNumbers.length; part += 1) {
  for (let total = part; total < partitionNumbers.length; total += 1) {
    partitionNumbers[total] += partitionNumbers[total - part];
  }
}
const moduleCharacterInUnits = (a, b) => {
  const aa = mod(a);
  const bb = mod(b);
  if (aa === 0) {
    const source = bb === 0 ? neutralCharge : nonzeroCharge;
    return new Map([...source].map(([exponent, coefficient]) => [exponent * exponentDenominator, coefficient]));
  }
  const source = twistedCharacter(aa, bb);
  return new Map([...source].map(([exponent, coefficient]) => [exponent * 600, coefficient]));
};
const firstCommutantTerms = new Map();
for (let ell = 0; ell <= 22; ell += 2) {
  const series = new Map();
  for (let n = -30; n <= 30; n += 1) {
    const shiftBase = 2 * n * (modulus + 2) - modulus * (ell + 1);
    const parafermionShiftUnits = 3 * shiftBase * shiftBase;
    const sign = ((ell / 2 - n) & 1) === 0 ? 1n : -1n;
    for (const [sourceExponentUnits, sourceCoefficient] of moduleCharacterInUnits(n, -n)) {
      for (let etaGrade = 0; etaGrade < partitionNumbers.length; etaGrade += 1) {
        const exponentUnits = parafermionShiftUnits + sourceExponentUnits - 575 + etaGrade * exponentDenominator;
        const coefficient = sign * sourceCoefficient * partitionNumbers[etaGrade];
        series.set(exponentUnits, (series.get(exponentUnits) ?? 0n) + coefficient);
      }
    }
  }
  const firstThree = [...series]
    .filter(([, coefficient]) => coefficient !== 0n)
    .sort(([left], [right]) => left - right)
    .slice(0, 3);
  assert.equal(firstThree.length, 3);
  assert.equal(
    firstThree.every(([, coefficient]) => coefficient > 0n),
    true,
    `negative commutant coefficient for ell=${ell}: ${JSON.stringify(firstThree.map(([u, c]) => [u, c.toString()]))}`,
  );
  const gradeGaps = firstThree.slice(1).map(([units]) => (units - firstThree[0][0]) / exponentDenominator);
  assert.equal(gradeGaps.every((gap) => Number.isInteger(gap) && gap > 0), true);
  firstCommutantTerms.set(ell, firstThree);
}
assert.equal(firstCommutantTerms.size, 12);
const rationalExponent = (units) => {
  const divisor = gcd(Math.abs(units), exponentDenominator);
  return `${units / divisor}/${exponentDenominator / divisor}`;
};
const commutantCharacterCertificate = Object.fromEntries(
  [...firstCommutantTerms].map(([ell, terms]) => [
    `f_[${ell},0]`,
    terms.map(([units, coefficient]) => [rationalExponent(units), coefficient.toString()]),
  ]),
);
assert.equal(evidence.parafermionRefinementBoundary.evenLCommutantCharacters, 12);
assert.deepEqual(evidence.parafermionRefinementBoundary.evenLCommutantFirstTerms, commutantCharacterCertificate);

// Assemble Volpato's equation (2.52)--(2.54) directly. Dividing the duality
// defect trace by sqrt(23) gives eta(2tau)/eta(tau)^2 times the theta-weighted
// module-character sum. Gaussian-integer bookkeeping keeps every quarter-turn
// phase exact.
const defectMaxExponent = 4;
const gaussianAdd = ([ar, ai], [br, bi]) => [ar + br, ai + bi];
const gaussianScale = ([ar, ai], scalar) => [ar * scalar, ai * scalar];
const iPower = (power) => {
  const residue = ((power % 4) + 4) % 4;
  return [[1n, 0n], [0n, 1n], [-1n, 0n], [0n, -1n]][residue];
};
const defectCore = new Map();
for (let n = 0; n < modulus; n += 1) {
  const moduleCharacter = moduleCharacterInUnits(n, -n);
  for (let winding = -4; winding <= 4; winding += 1) {
    const charge = n + modulus * winding;
    const thetaUnits = charge * charge;
    const phase = iPower(charge);
    for (const [sourceUnits13800, coefficient] of moduleCharacter) {
      const sourceUnits23 = sourceUnits13800 / 600;
      assert.equal(Number.isInteger(sourceUnits23), true);
      const exponentUnits23 = thetaUnits + sourceUnits23;
      if (exponentUnits23 > defectMaxExponent * modulus) continue;
      const previous = defectCore.get(exponentUnits23) ?? [0n, 0n];
      defectCore.set(exponentUnits23, gaussianAdd(previous, gaussianScale(phase, coefficient)));
    }
  }
}
// eta(2tau)/eta(tau)^2 = product_m (1+q^m)/(1-q^m).
let etaDefectRatio = new Map([[0, 1n]]);
for (let m = 1; m <= defectMaxExponent + 1; m += 1) {
  const factor = new Map([[0, 1n]]);
  for (let multiple = 1; m * multiple <= defectMaxExponent + 1; multiple += 1) {
    factor.set(m * multiple, 2n);
  }
  etaDefectRatio = multiplySeries(etaDefectRatio, factor, 0, defectMaxExponent + 1);
}
const normalizedDualityDefect = new Map();
for (const [coreUnits, coreCoefficient] of defectCore) {
  for (const [grade, ratioCoefficient] of etaDefectRatio) {
    const exponentUnits = coreUnits + grade * modulus;
    if (exponentUnits > defectMaxExponent * modulus) continue;
    const previous = normalizedDualityDefect.get(exponentUnits) ?? [0n, 0n];
    normalizedDualityDefect.set(
      exponentUnits,
      gaussianAdd(previous, gaussianScale(coreCoefficient, ratioCoefficient)),
    );
  }
}
const normalizedDefectTerms = [...normalizedDualityDefect]
  .filter(([, [real, imaginary]]) => real !== 0n || imaginary !== 0n)
  .sort(([left], [right]) => left - right);
assert.equal(normalizedDefectTerms.every(([, [, imaginary]]) => imaginary === 0n), true);
const normalizedDefectIntegerTerms = normalizedDefectTerms.map(([units, [real]]) => {
  assert.equal(Math.abs(units % modulus), 0);
  return [units / modulus, real];
});
assert.deepEqual(normalizedDefectIntegerTerms[0], [-1, 1n]);
const normalizedDefectCertificate = normalizedDefectIntegerTerms.map(([exponent, coefficient]) => [
  exponent,
  coefficient.toString(),
]);
assert.deepEqual(normalizedDefectCertificate, [
  [-1, "1"], [0, "2"], [1, "2446"], [2, "115834"], [3, "2446684"], [4, "33295322"],
]);
// D_5 preserves ab and merely changes the chosen generator coordinates.
// Therefore the scalar module characters, the even-l inversion and the
// assembled unrefined defect trace are fifth-power/orientation invariant.
for (const [a, b] of finiteLabels) {
  const [aa, bb] = orientationExchange([a, b]);
  assert.equal(twistedCharacterFingerprint(a, b), twistedCharacterFingerprint(aa, bb));
}
assert.equal(evidence.parafermionRefinementBoundary.normalizedDualityDefectTrace, "sqrt(23)*(q^-1 + 2 + 2446q + 115834q^2 + 2446684q^3 + 33295322q^4 + ...)");

// Exact rational invariants of the p=23 parafermionic refinement.
const parafermionCentralCharge = {numerator: 2 * (modulus - 1), denominator: modulus + 2};
const commutantCentralCharge = {
  numerator: 24 * parafermionCentralCharge.denominator - parafermionCentralCharge.numerator,
  denominator: parafermionCentralCharge.denominator,
};
assert.deepEqual(parafermionCentralCharge, {numerator: 44, denominator: 25});
assert.deepEqual(commutantCentralCharge, {numerator: 556, denominator: 25});
assert.equal((modulus + 1) / 2, 12); // rank Rep(so(3)_23)
assert.equal(evidence.parafermionRefinementBoundary.conditionalDefectInvarianceGroup, "Gamma_1(25)");
// For N=25, [PSL_2(Z):bar Gamma_1(N)]=300, there are 28 cusps and
// no elliptic points. Riemann--Hurwitz gives g=1+300/12-28/2=12.
const gamma1Index = 300;
const gamma1Cusps = 28;
const gamma1Genus = 1 + gamma1Index / 12 - gamma1Cusps / 2;
assert.equal(gamma1Genus, 12);
assert.equal(evidence.parafermionRefinementBoundary.modularCurveGenus, gamma1Genus);
assert.equal((modulus + 1) / 2, gamma1Genus); // exact coincidence, not an identification
assert.equal(evidence.order23OrientationConvention.status, "23A versus 23B is an oriented-generator convention, not an invariant of the underlying cyclic subgroup");

// Survey the same rank/genus comparison over every odd prime divisor of the
// Monster order. For odd N>=5, Gamma_1(N) has no elliptic points,
// index N^2 prod_{l|N}(1-l^-2)/2 in PSL_2(Z), and
// (1/2) sum_{d|N} phi(d)phi(N/d) cusps.
const eulerPhi = (n0) => {
  let n = n0;
  let out = n0;
  for (let prime = 2; prime * prime <= n; prime += 1) {
    if (n % prime !== 0) continue;
    while (n % prime === 0) n /= prime;
    out = (out / prime) * (prime - 1);
  }
  if (n > 1) out = (out / n) * (n - 1);
  return out;
};
const primeDivisors = (n0) => {
  let n = n0;
  const out = [];
  for (let prime = 2; prime * prime <= n; prime += 1) {
    if (n % prime !== 0) continue;
    out.push(prime);
    while (n % prime === 0) n /= prime;
  }
  if (n > 1) out.push(n);
  return out;
};
const gamma1OddGenus = (level) => {
  const slIndex = primeDivisors(level).reduce(
    (value, prime) => value * (prime * prime - 1) / (prime * prime),
    level * level,
  );
  const pslIndex = slIndex / 2;
  let cuspTwice = 0;
  for (let divisor = 1; divisor <= level; divisor += 1) {
    if (level % divisor === 0) cuspTwice += eulerPhi(divisor) * eulerPhi(level / divisor);
  }
  const cusps = cuspTwice / 2;
  return 1 + pslIndex / 12 - cusps / 2;
};
const oddMonsterPrimes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 41, 47, 59, 71];
const rankGenusSurvey = oddMonsterPrimes.map((prime) => [
  prime,
  gamma1OddGenus(prime + 2),
  (prime + 1) / 2,
]);
assert.deepEqual(rankGenusSurvey, evidence.rankGenusSurvey.values);
assert.deepEqual(rankGenusSurvey.filter(([, genus, rank]) => genus === rank), [[23, 12, 12]]);

assert.equal(evidence.rule60GolayDecomposition.primaryIdentity, "T^89 = sigma^2 on im(T)");
assert.equal(evidence.routeVerdicts.find((x) => x.route === "Rule 60 equals a Monster element").status, "ruled_out");
assert.equal(
  evidence.routeVerdicts.find((x) => x.route === "unrefined order-23 duality-defect trace as an orientation detector").status,
  "ruled_out",
);

console.log(JSON.stringify({
  diagonalPlane: "II_1,1 embedded in H_2(R) by (m,n) -> diag(m,n)",
  rule60ImageDimension: 11,
  rule60Order: 2047,
  exactPrimaryIdentity: "T^89 = sigma^2",
  cyclotomicOrbits: [orbitOne, orbitFive],
  fifthPowerExchangesOrbits: true,
  gaussianPeriods: {
    sum: -1,
    product: 6,
    minimalPolynomial: "x^2+x+6",
    discriminant: -23,
    residuesAtPrimesAboveTwo: [0, 1],
  },
  T23FirstTerms: [-1, 0, 1, 2, 3, 4, 5, 6].map((exponent) => [exponent, (T23.get(exponent) ?? 0n).toString()]),
  order23FixedLatticeGram: fixedGram,
  order23FixedLatticeDeterminant: 23,
  fixedLatticeIdealNorm: "N(2a-b*alpha)/2 for alpha^2+alpha+6=0",
  discriminantMinus23ReducedForms: reducedMinus23,
  orientedNonprincipalThetaDegeneracy: true,
  classThetaEtaIdentityCheckedThroughQPower: maxQ,
  leechTraceIdentityCheckedThroughQPower: 30,
  leechTraceIdentity: "theta_Lambda^sigma/(eta(tau)eta(23tau)) = T_23 + 1",
  secondReplicationCheckedThroughQPower: 15,
  order23FinitePhaseSpace: {
    labels: 529,
    quadraticForm: "q(a,b)=ab/23 mod 1",
    latticeModel: "discriminant form of U(23)",
    modularS: "(a,b)->(b,-a), S^2=-1, S^4=1",
    defectSwap: "(a,b)->(b,a)",
    anomalyRestriction: "trivial because gcd(24,23)=1",
    finiteTransitionSkeleton: "Dic_11 of order 44 generated by D_5 and S",
  },
  projectiveTransitionQuotient: {
    directions: projectiveDirections.length,
    group: "D_11 of order 22",
    orbitSizes: [axisOrbit.size, mixedOrbit.size],
    inversePairedGeneratorOrientations: generatorPairs.size,
    twelveCountIdentificationEstablished: false,
  },
  genusOneChargeProjection: {
    neutral: Object.fromEntries([-1, 0, 1, 2].map((k) => [k, neutralCharge.get(k).toString()])),
    eachNonzeroCharge: Object.fromEntries([-1, 0, 1, 2].map((k) => [k, nonzeroCharge.get(k).toString()])),
    orientationRecovered: false,
  },
  modularTransportReconstruction: {
    sl2Mod23Order: sl2Mod23.length,
    exactLabelStabilizerOrder: exactVectorStabilizer.length,
    exactLabelOrbit: modularOrbitOf01.size,
    projectiveStabilizerOrder: projectiveVectorStabilizer.length,
    scalarModularImages: modularProjectiveOrbit.size,
    labelsPerScalarImage: [...new Set(projectiveMultiplicity.values())][0],
    moduleCharacterTypesAfterFourierProjection: moduleCharacterFingerprints.size,
    characterRule: "ch(V_ab)=sum_{n congruent ab mod 23} c(n) q^(n/23) for a nonzero",
    independent529FunctionInputRequired: false,
    twistedModuleCharacterTransformComplete: true,
    parafermionInversionFirstTermsComplete: true,
    evenLCommutantCharacters: commutantCharacterCertificate,
    normalizedDualityDefectTrace: normalizedDefectCertificate,
  },
  parafermionRefinement: {
    centralCharge: "44/25",
    commutantCentralCharge: "556/25",
    repSo3Rank: 12,
    conditionalInvarianceGroup: "Gamma_1(25)",
    modularCurveGenus: gamma1Genus,
    rankEqualsGenus: true,
    rankGenusIdentificationEstablished: false,
    uniqueRankGenusEqualityAmongOddMonsterPrimes: 23,
  },
  monsterPrime89: false,
  conclusion: "the order-23 shift is the viable symmetry bridge; Rule 60 is a derived group-algebra update with an order-89 residue",
}, null, 2));
console.log("PASS verify_moonshine_program_lattice_bridge");
