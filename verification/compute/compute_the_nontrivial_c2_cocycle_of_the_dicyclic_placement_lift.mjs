import assert from 'node:assert/strict';

const mod3 = (n) => ((n % 3) + 3) % 3;
const elements = [
  { name: '1', p: 0, j: 0 }, { name: 'A', p: 0, j: 1 }, { name: 'A2', p: 0, j: 2 },
  { name: 'F', p: 1, j: 0 }, { name: 'FA', p: 1, j: 1 }, { name: 'FA2', p: 1, j: 2 },
];
const byPair = new Map(elements.map((g) => [`${g.p},${g.j}`, g]));
const multiply = (g, h) => {
  if (g.p === 0 && h.p === 0) return byPair.get(`0,${mod3(g.j + h.j)}`);
  if (g.p === 0 && h.p === 1) return byPair.get(`1,${mod3(h.j - g.j)}`);
  if (g.p === 1 && h.p === 0) return byPair.get(`1,${mod3(g.j + h.j)}`);
  return byPair.get(`0,${mod3(h.j - g.j)}`);
};
const cocycle = (g, h) => g.p * h.p; // exponent of central Z=-I

// Verify normalized C2-valued two-cocycle identity.
const identity = elements[0];
for (const g of elements) {
  assert.equal(cocycle(identity, g), 0);
  assert.equal(cocycle(g, identity), 0);
  for (const h of elements) for (const k of elements) {
    const lhs = (cocycle(g, h) + cocycle(multiply(g, h), k)) % 2;
    const rhs = (cocycle(h, k) + cocycle(g, multiply(h, k))) % 2;
    assert.equal(lhs, rhs);
  }
}

const table = elements.map((g) => elements.map((h) => cocycle(g, h)));
assert.deepEqual(table.slice(0, 3), Array.from({ length: 3 }, () => [0, 0, 0, 0, 0, 0]));
assert.deepEqual(table.slice(3), Array.from({ length: 3 }, () => [0, 0, 0, 1, 1, 1]));

// No one-cochain b:S3->C2 has delta b = cocycle.
let coboundarySolutions = 0;
for (let mask = 0; mask < 64; mask++) {
  const b = elements.map((_, i) => (mask >> i) & 1);
  if (b[0] !== 0) continue;
  let ok = true;
  for (let i = 0; i < elements.length && ok; i++) for (let j = 0; j < elements.length; j++) {
    const gh = multiply(elements[i], elements[j]);
    const k = elements.indexOf(gh);
    const delta = (b[i] + b[j] + b[k]) % 2;
    if (delta !== cocycle(elements[i], elements[j])) { ok = false; break; }
  }
  if (ok) coboundarySolutions++;
}
assert.equal(coboundarySolutions, 0);

// Canonical two-reflection path carries Z; reversing exactly one lift cancels it.
const F = elements[3], FA = elements[4];
assert.equal(multiply(F, FA).name, 'A');
assert.equal(cocycle(F, FA), 1);
const canonicalCentralExponent = cocycle(F, FA);
const oneFaceReversedExponent = (1 + canonicalCentralExponent) % 2;
const bothFacesReversedExponent = (1 + 1 + canonicalCentralExponent) % 2;
assert.equal(oneFaceReversedExponent, 0);
assert.equal(bothFacesReversedExponent, 1);

console.log(JSON.stringify({
  protocol: 'nontrivial-c2-cocycle-of-dicyclic-placement-lift/1',
  section: 's(A^j)=A^j, s(F A^j)=X A^j with X^2=Z=-I',
  cocycleRule: 'c(g,h)=parity(g) parity(h) mod 2',
  labels: elements.map((g) => g.name),
  cocycleTable: table,
  normalized: true,
  cocycleIdentity: true,
  coboundarySolutions,
  extensionClass: 'nontrivial; the extension does not split',
  selectedPath: { base: 'F(FA)=A', canonicalLift: 'Z A', reverseExactlyOneFace: 'A', reverseBothFaces: 'Z A' },
  theorem: 'The dicyclic lift is governed by the parity-square C2 cocycle. A local one-face sideband reversal cancels it on one selected Coxeter path, but no global rephasing trivializes the coherent placement extension.',
  boundary: 'This is a finite cohomological obstruction. It does not select which physical face reverses or derive the antiunitary interface.',
  passed: true,
}, null, 2));
