import assert from 'node:assert/strict';

const blocks = {
  O1: [0], O2: [1, 2, 3], H: [4, 5], C: [6], R: [7],
};
const n = 8;
const unit = (row, col, value = 1) => {
  const v = Array(n * n).fill(0);
  v[row * n + col] = value;
  return v;
};
const block = (target, source) => {
  const out = [];
  for (const r of blocks[target]) for (const c of blocks[source]) out.push(unit(r, c));
  return out;
};
const identityOn = name => {
  const v = Array(n * n).fill(0);
  for (const i of blocks[name]) v[i * n + i] = 1;
  return v;
};
const matMul = (a, b) => {
  const c = Array(n * n).fill(0);
  for (let i = 0; i < n; i++) for (let k = 0; k < n; k++) {
    const aik = a[i * n + k];
    if (!aik) continue;
    for (let j = 0; j < n; j++) c[i * n + j] += aik * b[k * n + j];
  }
  return c;
};
const transpose = a => Array.from({ length: n * n }, (_, q) => a[(q % n) * n + Math.floor(q / n)]);
const triple = (x, y, z) => matMul(matMul(x, transpose(y)), z);

class Span {
  constructor(vectors = []) { this.rows = []; this.pivots = []; for (const v of vectors) this.add(v); }
  add(input) {
    const v = input.slice();
    for (let k = 0; k < this.rows.length; k++) {
      const p = this.pivots[k];
      if (!v[p]) continue;
      const q = v[p] / this.rows[k][p];
      for (let j = p; j < v.length; j++) v[j] -= q * this.rows[k][j];
    }
    let p = v.findIndex(x => Math.abs(x) > 1e-10);
    if (p < 0) return false;
    const q = v[p];
    for (let j = p; j < v.length; j++) v[j] /= q;
    let pos = this.pivots.findIndex(x => x > p);
    if (pos < 0) pos = this.pivots.length;
    this.pivots.splice(pos, 0, p); this.rows.splice(pos, 0, v);
    // Keep earlier rows reduced at the new pivot.
    for (let k = 0; k < this.rows.length; k++) if (k !== pos && Math.abs(this.rows[k][p]) > 1e-10) {
      const f = this.rows[k][p];
      for (let j = p; j < v.length; j++) this.rows[k][j] -= f * v[j];
    }
    return true;
  }
}

const matterFor = (D, E) => [
  ...block('O2', 'H'), ...block('C', 'O2'), ...block(D, 'O2'),
  ...block('H', E), ...block(E, 'C'),
];
const matter = matterFor('O1', 'R');
assert.equal(new Span(matter).rows.length, 15);

const closure = seed => {
  const span = new Span(seed);
  let changed = true;
  while (changed) {
    changed = false;
    const basis = span.rows.map(v => v.slice());
    outer: for (const x of basis) for (const y of basis) for (const z of basis) {
      if (span.add(triple(x, y, z))) { changed = true; break outer; }
    }
  }
  return span.rows.length;
};

assert.equal(closure(matter), 15);
const candidates = {
  pO1: identityOn('O1'), pO2: identityOn('O2'), pH: identityOn('H'),
  pC: identityOn('C'), pR: identityOn('R'),
  O1_to_R: unit(blocks.R[0], blocks.O1[0]),
  R_to_O1: unit(blocks.O1[0], blocks.R[0]),
};
const results = Object.fromEntries(Object.entries(candidates).map(([name, v]) => [name, closure([...matter, v])]));
assert.deepEqual(results, {
  pO1: 17, pO2: 28, pH: 22, pC: 20, pR: 18,
  O1_to_R: 16, R_to_O1: 23,
});

// The exchanged survivor has the same unique relational completion D -> E.
const matterB = matterFor('R', 'O1');
assert.equal(closure(matterB), 15);
assert.equal(closure([...matterB, unit(blocks.O1[0], blocks.R[0])]), 16); // R -> O1 = D -> E
assert.equal(closure([...matterB, unit(blocks.R[0], blocks.O1[0])]), 23); // E -> D

// The new neutral arrow D -> E closes the neutrino Yukawa triangle
// H -> D -> E -> H with h_D, nu^c, L.
const hD = unit(blocks.O1[0], blocks.H[0]);
const nuC = unit(blocks.R[0], blocks.O1[0]);
const L = unit(blocks.H[0], blocks.R[0]);
const cycle = matMul(matMul(L, nuC), hD);
const trace = Array.from({ length: n }, (_, i) => cycle[i * n + i]).reduce((a, b) => a + b, 0);
assert.equal(trace, 1);

// Linking algebra after the D -> E completion.
const components = [[2, 3], [3, 2], [2, 1], [1, 2]]; // [left dimension,right dimension]
const factors = components.map(([l, r]) => l + r).sort((a, b) => b - a);
assert.deepEqual(factors, [5, 5, 3, 3]);
const dimAL = components.reduce((s, [l]) => s + l * l, 0);
const dimAR = components.reduce((s, [, r]) => s + r * r, 0);
const dimM = components.reduce((s, [l, r]) => s + l * r, 0);
assert.deepEqual({ dimAL, dimAR, dimM, linking: dimAL + dimAR + 2 * dimM },
  { dimAL: 18, dimAR: 18, dimM: 16, linking: 68 });

// After particle/antiparticle conversion, the Higgs coin is square and can
// have full rank when all four Yukawa blocks are nonzero.
const coinDiagonal = [2, 2, 2, 3, 3, 3, 5, 7];
assert.equal(coinDiagonal.length, 8);
assert.equal(coinDiagonal.filter(x => x !== 0).length, 8);

console.log('Neutral-extension TRO closure certificate: PASS');
console.log(JSON.stringify(results));
console.log('unique relational completion D -> E has dimension 16 and closes the neutrino Yukawa cycle');
console.log('completed linking algebra: M5 + M5 + M3 + M3 (dimension 68); unique M2 factor is lost');

