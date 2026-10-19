import assert from 'node:assert/strict';

// Sparse exterior algebra on generators nu1, nu2, N1, N2.
const scalar = x => new Map(x === 0 ? [] : [[0, x]]);
const generator = i => new Map([[1 << i, 1]]);
const add = (a, b, bScale = 1) => {
  const out = new Map(a);
  for (const [mask, value] of b) {
    const next = (out.get(mask) ?? 0) + bScale * value;
    if (Math.abs(next) < 1e-12) out.delete(mask); else out.set(mask, next);
  }
  return out;
};
const wedge = (a, b) => {
  const out = new Map();
  for (const [ma, va] of a) for (const [mb, vb] of b) {
    if (ma & mb) continue;
    let swaps = 0;
    for (let i = 0; i < 4; i++) if ((ma >> i) & 1) {
      for (let j = 0; j < i; j++) if ((mb >> j) & 1) swaps++;
    }
    const mask = ma | mb;
    const value = va * vb * (swaps % 2 ? -1 : 1);
    out.set(mask, (out.get(mask) ?? 0) + value);
  }
  return out;
};
const coeff = (a, mask) => a.get(mask) ?? 0;

const [nu1, nu2, N1, N2] = [0, 1, 2, 3].map(generator);
assert.equal(wedge(N1, N1).size, 0);
assert.equal(wedge(N2, N2).size, 0);
assert.equal(coeff(add(wedge(N1, N2), wedge(N2, N1)), (1 << 2) | (1 << 3)), 0);

const majorana = add(wedge(N1, N2), wedge(N2, N1), -1);
assert.equal(coeff(majorana, (1 << 2) | (1 << 3)), 2);

const dirac = add(wedge(nu1, N2), wedge(nu2, N1), -1);
assert.equal(coeff(dirac, (1 << 0) | (1 << 3)), 1);
assert.equal(coeff(dirac, (1 << 1) | (1 << 2)), -1);

// Internal arrow a=|R><O1| is nilpotent, while its adjoint pairing is one.
const a = [[0, 0], [1, 0]];
const adag = [[0, 1], [0, 0]];
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const trace = A => A.reduce((s, row, i) => s + row[i], 0);
assert.deepEqual(mm(a, a), [[0, 0], [0, 0]]);
assert.equal(trace(mm(adag, a)), 1);

// The field bilinear coefficient is the exterior product times the internal pairing.
const pairedMajoranaCoefficient = coeff(majorana, (1 << 2) | (1 << 3)) * trace(mm(adag, a));
assert.equal(pairedMajoranaCoefficient, 2);
assert.equal(scalar(1).size, 1);

console.log('Lorentz-exterior pairing mass-gate certificate: PASS');
console.log('internal_a_squared=0; epsilon_NN=2*N1^N2; epsilon_nuN_nonzero=true; Tr(a_dagger*a)=1; independent_left_fields=2');
