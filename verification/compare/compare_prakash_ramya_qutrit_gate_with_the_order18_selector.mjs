import assert from 'node:assert/strict';

// Monomial qutrit transformations: |j> -> zeta_9^{phase[j]} |perm[j]>.
const key = g => `${g.perm.join('')}:${g.phase.join(',')}`;
const compose = (g, h) => ({
  perm: h.perm.map(j => g.perm[j]),
  phase: h.perm.map((j, source) => (h.phase[source] + g.phase[j]) % 9).map(x => (x + 9) % 9),
});
const id = { perm: [0, 1, 2], phase: [0, 0, 0] };
const U = { perm: [0, 1, 2], phase: [0, 1, 8] };
const X = { perm: [0, 2, 1], phase: [0, 0, 0] };
const pow = (g, n) => { let z = id; for (let i = 0; i < n; i++) z = compose(g, z); return z; };
const closure = generators => {
  const seen = new Map([[key(id), id]]), queue = [id];
  while (queue.length) {
    const g = queue.shift();
    for (const h of generators) {
      const z = compose(h, g), k = key(z);
      if (!seen.has(k)) { seen.set(k, z); queue.push(z); }
    }
  }
  return [...seen.values()];
};
const order = g => { let z = id; for (let n = 1; n <= 100; n++) { z = compose(g, z); if (key(z) === key(id)) return n; } throw new Error('order bound'); };
const commute = (g, h) => key(compose(g, h)) === key(compose(h, g));

const D9 = closure([U, X]);
const A = pow(U, 3);
const S3shadow = closure([A, X]);
assert.equal(D9.length, 18);
assert.equal(S3shadow.length, 6);
assert.equal(order(U), 9);
assert.equal(order(A), 3);
assert.equal(order(X), 2);
assert.equal(key(compose(compose(X, U), X)), key(pow(U, 8)));
assert.equal(key(compose(compose(X, A), X)), key(pow(A, 2)));
const d9Center = D9.filter(g => D9.every(h => commute(g, h)));
assert.equal(d9Center.length, 1);

// Abstract C3 x S3 selector invariants.  S3 elements are permutations of 3 labels.
const permutations = S3shadow.map(g => g.perm).filter((p, i, xs) => xs.findIndex(q => q.join() === p.join()) === i);
assert.equal(permutations.length, 2); // This qutrit reflection subgroup only permutes 1<->2.
// Enumerate S3 independently.
const permCompose = (p, q) => q.map(j => p[j]);
const permClosure = gens => {
  const seen = new Map([['012', [0, 1, 2]]]), queue = [[0, 1, 2]];
  while (queue.length) {
    const g = queue.shift();
    for (const h of gens) {
      const z = permCompose(h, g), k = z.join('');
      if (!seen.has(k)) { seen.set(k, z); queue.push(z); }
    }
  }
  return [...seen.values()];
};
const S3 = permClosure([[1, 2, 0], [0, 2, 1]]);
const selector = [0, 1, 2].flatMap(c => S3.map(p => ({ c, p })));
const selectorCompose = (g, h) => ({ c: (g.c + h.c) % 3, p: permCompose(g.p, h.p) });
const selectorKey = g => `${g.c}:${g.p.join('')}`;
const selectorOrder = g => { let z = { c: 0, p: [0, 1, 2] }; for (let n = 1; n <= 20; n++) { z = selectorCompose(g, z); if (selectorKey(z) === '0:012') return n; } throw new Error('selector order bound'); };
const selectorCenter = selector.filter(g => selector.every(h => selectorKey(selectorCompose(g, h)) === selectorKey(selectorCompose(h, g))));
assert.equal(selector.length, 18);
assert.equal(selectorCenter.length, 3);
assert.ok(!selector.some(g => selectorOrder(g) === 9));

const spectrum = group => [...new Set(group.map(order))].sort((a, b) => a - b);
const selectorSpectrum = [...new Set(selector.map(selectorOrder))].sort((a, b) => a - b);

console.log(JSON.stringify({
  protocol: 'prakash-ramya-qutrit-gate-versus-spin23-selector/1',
  qutritGate: { U: 'diag(1,zeta_9,zeta_9^-1)', order: order(U), cube: 'diag(1,omega,omega^-1)', cubeOrder: order(A) },
  anomalyGateWithReflection: { group: 'D_9', order: D9.length, elementOrders: spectrum(D9), centerOrder: d9Center.length },
  cubeWithReflection: { group: 'D_3 ~= S_3', order: S3shadow.length, relation: 'X U^3 X = U^-3' },
  establishedSelector: { group: 'C_3 x S_3', order: selector.length, elementOrders: selectorSpectrum, centerOrder: selectorCenter.length },
  nonIsomorphismWitnesses: ['D_9 contains order-nine elements; C_3 x S_3 does not', 'center orders are 1 and 3'],
  frontier: 'A typed map from the protected logical U^3 phase to the active response C3 would quantize the selector angle, but the paper does not provide that map.',
  passed: true,
}, null, 2));
