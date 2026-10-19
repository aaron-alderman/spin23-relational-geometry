import assert from 'node:assert/strict';

const mod = (x, n) => ((x % n) + n) % n;
const K = [0, 3, 6];
const quotientReps = [0, 1, 2];
const annihilator = [0, 3, 6]; // characters m with exp(2pi i k m/9)=1

for (const k of K) {
  for (const m of annihilator) {
    assert.equal(mod(k * m, 9), 0);
  }
}

// Descended pairing: n mod K paired with m=3r gives exp(2pi i n r/3).
const pairingExponent = quotientReps.map((n) =>
  quotientReps.map((r) => mod(n * r, 3)));
assert.deepEqual(pairingExponent, [
  [0, 0, 0],
  [0, 1, 2],
  [0, 2, 1],
]);

// It is independent of changing the Z9 representative n -> n+k.
for (const n of quotientReps) {
  for (const k of K) {
    for (const r of quotientReps) {
      assert.equal(mod((n + k) * r, 3), mod(n * r, 3));
    }
  }
}

const rawTorusStates = 9 ** 2;
const kernelPerCycle = K.length;
const quotientTorusStates = rawTorusStates / (kernelPerCycle ** 2);
assert.equal(rawTorusStates, 81);
assert.equal(quotientTorusStates, 9);

console.log(JSON.stringify({
  extension: '0 -> Z3_colour-centre -> Z9_lift -> Z3_physical -> 0',
  gaugedKernel: K,
  quotientHolonomies: 'Z9/K ~= Z3',
  allowedDualCharacters: annihilator,
  descendedPairingExponentMod3: pairingExponent,
  rawZ9TorusStates: rawTorusStates,
  quotientZ3TorusStates: quotientTorusStates,
  caveat: 'The finite symplectic reduction fixes the carrier and pairing but does not determine a possible Dijkgraaf-Witten/discrete-theta twist or its microscopic QCD realization.',
}, null, 2));
