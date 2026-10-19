import assert from "node:assert/strict";

const G = (a = 0, b = 0) => ({ a, b });
const add = (z, w) => G(z.a + w.a, z.b + w.b);
const neg = (z) => G(-z.a, -z.b);
const mul = (z, w) => G(z.a * w.a - z.b * w.b, z.a * w.b + z.b * w.a);
const conj = (z) => G(z.a, -z.b);
const pi = G(1, 1);
const pi2 = mul(pi, pi);
const pi3 = mul(pi2, pi);
const one = G(1, 0);
const gaussianI = G(0, 1);

const divisible = (z, p) => {
  const norm = p.a * p.a + p.b * p.b;
  const numerator = mul(z, conj(p));
  return numerator.a % norm === 0 && numerator.b % norm === 0;
};
const equivalent = (z, w) => divisible(add(z, neg(w)), pi3);
const residue = (z) => ((z.a + z.b) % 2 + 2) % 2;

const reps = [];
for (let a = 0; a < 4; a += 1) for (let b = 0; b < 4; b += 1) {
  const z = G(a, b);
  if (!reps.some((r) => equivalent(z, r))) reps.push(z);
}
assert.equal(reps.length, 8);

const representative = (z) => reps.find((r) => equivalent(z, r));
const units = reps.filter((z) => residue(z) === 1);
assert.equal(units.length, 4);

const pow = (z, n) => {
  let out = one;
  for (let k = 0; k < n; k += 1) out = representative(mul(out, z));
  return out;
};
const order = (z) => {
  for (let n = 1; n <= 8; n += 1) if (equivalent(pow(z, n), one)) return n;
  throw new Error("unit order not found");
};

assert.equal(order(gaussianI), 4);
assert(equivalent(pow(gaussianI, 2), G(-1, 0)));
assert.deepEqual(units.map(order).sort((a, b) => a - b), [1, 2, 4, 4]);

// Three named C4 extensions use exponent notation k mod 4:
// weak: W^2=-I; Pauli centre: (iI)^2=-I; Gaussian units: i^2=-1.
const c4 = [0, 1, 2, 3];
const add4 = (a, b) => (a + b) % 4;
for (const a of c4) for (const b of c4) assert.equal(add4(a, b), add4(b, a));

// A map fixing the central square 2 may send a chosen order-four generator to
// exponent 1 or 3. These are the two automorphisms of C4.
const centralSquarePreservingMaps = [1, 3].map((imageOfGenerator) => ({
  imageOfGenerator,
  map: c4.map((k) => (imageOfGenerator * k) % 4),
}));
assert.equal(centralSquarePreservingMaps.length, 2);
for (const phi of centralSquarePreservingMaps) {
  assert.equal(phi.map[2], 2);
  assert.deepEqual([...phi.map].sort(), c4);
}

// In the H1 basis (u,e1,e0,e4), the two Gaussian arrow candidates have masks
// e0=0100 and e0+u+e1=0111 (integer masks 4 and 7). Their difference 0011 is
// the exact kernel of universal arrow evaluation, so every construction that
// factors only through that evaluation necessarily identifies them.
const candidateA = 4;
const candidateB = 7;
const invisibleKernel = candidateA ^ candidateB;
assert.equal(invisibleKernel, 3);
const universalArrowEvaluation = (mask) => ((mask >> 2) & 1) ? "E12" : "0";
assert.equal(universalArrowEvaluation(candidateA), "E12");
assert.equal(universalArrowEvaluation(candidateB), "E12");

for (const phi of centralSquarePreservingMaps) {
  const compareViaEvaluatedArrow = (mask) => `${universalArrowEvaluation(mask)}|c4:${phi.imageOfGenerator}`;
  assert.equal(compareViaEvaluatedArrow(candidateA), compareViaEvaluatedArrow(candidateB));
}

console.log(JSON.stringify({
  protocol: "weak-pauli-gaussian-c4-comparison/1",
  centralExtensions: {
    weakWeylLift: "<W | W^4=1, W^2=-I>",
    pauliCentre: "<iI | (iI)^4=1, (iI)^2=-I>",
    gaussianUnits: {
      ring: "Z[i]/(1+i)^3",
      unitGroupOrder: units.length,
      unitOrders: units.map(order).sort((a, b) => a - b),
      presentation: "<i | i^4=1, i^2=-1> ~= C4",
    },
  },
  generatorMapsPreservingCentralSquare: centralSquarePreservingMaps.map((x) => x.imageOfGenerator === 1 ? "+i" : "-i"),
  gaussianArrowCandidates: {
    masks: [candidateA, candidateB],
    differenceKernelMask: invisibleKernel,
    universalEvaluation: [universalArrowEvaluation(candidateA), universalArrowEvaluation(candidateB)],
    distinguishedByCentralComparisonFactoringThroughEvaluation: false,
  },
  remainingGate: "construct a nonsplit action on the full H1 extension that is nontrivial on k=u+e1, or include the global gauge/Pfaffian data that fixes one generator lift",
  passed: true,
}, null, 2));
