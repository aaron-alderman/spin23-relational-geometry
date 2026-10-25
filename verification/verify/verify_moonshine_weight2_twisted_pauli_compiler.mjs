import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL("../../evidence/data/moonshine-weight2-twisted-pauli-compiler-v1.json", import.meta.url);
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));
assert.equal(evidence.schemaVersion, "moonshine-weight2-twisted-pauli-compiler-v1");
const {channelDimension, qubits, groundDimension, totalDimension} = evidence.space;
assert.equal(2 ** qubits, groundDimension);
assert.equal(channelDimension * groundDimension, totalDimension);
assert.equal(totalDimension, 98304);

const parity = (x) => {
  let p = 0;
  while (x) { p ^= Number(x & 1n); x >>= 1n; }
  return p;
};
const dot = (a, b) => parity(a & b);
const mask = (1n << BigInt(qubits)) - 1n;
const pauliProduct = (u, v, up, vp) => ({
  sign: dot(v, up) ? -1 : 1,
  u: (u ^ up) & mask,
  v: (v ^ vp) & mask
});
const trace = (u, v, centralSign = 1) => u === 0n && v === 0n ? centralSign * groundDimension : 0;

const generators = [];
for (let i = 0; i < qubits; i += 1) {
  generators.push({name: `X${i}`, u: 1n << BigInt(i), v: 0n});
  generators.push({name: `Z${i}`, u: 0n, v: 1n << BigInt(i)});
}
for (let i = 0; i < generators.length; i += 1) {
  for (let j = 0; j < generators.length; j += 1) {
    const a = generators[i];
    const b = generators[j];
    const ab = pauliProduct(a.u, a.v, b.u, b.v);
    const ba = pauliProduct(b.u, b.v, a.u, a.v);
    const expectedAnticommute = a.name.slice(1) === b.name.slice(1) && a.name[0] !== b.name[0];
    assert.equal(ab.sign !== ba.sign, expectedAnticommute);
  }
}

assert.equal(trace(0n, 0n) * channelDimension, evidence.extraspecialAction.identityTraceOnWeight2Twisted);
assert.equal(trace(0n, 0n, -1) * channelDimension, evidence.extraspecialAction.centralMinusTraceOnWeight2Twisted);
for (const generator of generators) assert.equal(trace(generator.u, generator.v) * channelDimension, 0);
assert.equal(2 ** (1 + 2 * qubits), evidence.extraspecialAction.groupOrder);

console.log(JSON.stringify({
  status: "PASS",
  channelDimension,
  qubits,
  twistedGroundDimension: groundDimension,
  compiledWeightTwoDimension: totalDimension,
  generatorCommutatorsChecked: generators.length ** 2,
  traceFingerprint: {
    identity: totalDimension,
    centralMinus: -totalDimension,
    noncentralGenerator: 0
  },
  next: evidence.monsterJoin.openLayer
}));
