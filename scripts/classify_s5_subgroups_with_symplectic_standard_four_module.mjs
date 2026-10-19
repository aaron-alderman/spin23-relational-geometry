import assert from 'node:assert/strict';

const N = 5;
const id = [0, 1, 2, 3, 4];
const key = p => p.join('');
const compose = (p, q) => q.map(i => p[i]); // p after q
const inverse = p => {
  const r = Array(N);
  p.forEach((x, i) => { r[x] = i; });
  return r;
};

function permutations(a) {
  if (a.length <= 1) return [a];
  const out = [];
  for (let i = 0; i < a.length; i++) {
    const rest = [...a.slice(0, i), ...a.slice(i + 1)];
    for (const tail of permutations(rest)) out.push([a[i], ...tail]);
  }
  return out;
}
const S5 = permutations(id);
const byKey = new Map(S5.map(p => [key(p), p]));

function generated(elements) {
  const gens = [...elements, ...elements.map(inverse)];
  const seen = new Map([[key(id), id]]);
  const queue = [id];
  while (queue.length) {
    const x = queue.shift();
    for (const g of gens) {
      const y = compose(g, x);
      if (!seen.has(key(y))) { seen.set(key(y), y); queue.push(y); }
    }
  }
  return [...seen.values()].sort((a, b) => key(a).localeCompare(key(b)));
}

function subgroupKey(H) { return H.map(key).sort().join('|'); }
const subgroupMap = new Map();
const queue = [];
const trivial = [id];
subgroupMap.set(subgroupKey(trivial), trivial);
queue.push(trivial);
while (queue.length) {
  const H = queue.shift();
  const Hkeys = new Set(H.map(key));
  for (const g of S5) if (!Hkeys.has(key(g))) {
    const K = generated([...H, g]);
    const k = subgroupKey(K);
    if (!subgroupMap.has(k)) { subgroupMap.set(k, K); queue.push(K); }
  }
}
const subgroups = [...subgroupMap.values()];
assert.equal(subgroups.length, 156);

function conjugateGroup(H, s) {
  const si = inverse(s);
  return H.map(h => compose(compose(s, h), si)).sort((a, b) => key(a).localeCompare(key(b)));
}
function classKey(H) {
  return S5.map(s => subgroupKey(conjugateGroup(H, s))).sort()[0];
}
const classes = new Map();
for (const H of subgroups) {
  const ck = classKey(H);
  if (!classes.has(ck)) classes.set(ck, []);
  classes.get(ck).push(H);
}
assert.equal(classes.size, 19);

function standardRep(p) {
  // Image of b_i=e_i-e_5; coordinates are the first four components.
  return Array.from({ length: 4 }, (_, r) =>
    Array.from({ length: 4 }, (_, c) => (p[c] === r ? 1 : 0) - (p[4] === r ? 1 : 0)));
}
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const subtract = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));

const skewBasis = [];
for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
  const E = Array.from({ length: 4 }, () => Array(4).fill(0));
  E[i][j] = 1; E[j][i] = -1; skewBasis.push(E);
}

function rrefNullspace(A, tol = 1e-10) {
  const M = A.map(r => r.map(Number));
  const pivots = [];
  let row = 0;
  for (let col = 0; col < (M[0]?.length ?? 0) && row < M.length; col++) {
    let p = row;
    while (p < M.length && Math.abs(M[p][col]) < tol) p++;
    if (p === M.length) continue;
    [M[row], M[p]] = [M[p], M[row]];
    const d = M[row][col];
    for (let j = col; j < M[row].length; j++) M[row][j] /= d;
    for (let i = 0; i < M.length; i++) if (i !== row) {
      const f = M[i][col];
      for (let j = col; j < M[i].length; j++) M[i][j] -= f * M[row][j];
    }
    pivots.push(col); row++;
  }
  const free = Array.from({ length: M[0]?.length ?? 0 }, (_, i) => i).filter(i => !pivots.includes(i));
  return free.map(f => {
    const v = Array(M[0].length).fill(0); v[f] = 1;
    pivots.forEach((p, i) => { v[p] = -M[i][f]; });
    return v;
  });
}

function invariantSkewBasis(H) {
  const rows = [];
  for (const h of H) {
    const R = standardRep(h);
    const ds = skewBasis.map(E => subtract(multiply(multiply(transpose(R), E), R), E));
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) rows.push(ds.map(D => D[i][j]));
  }
  return rrefNullspace(rows);
}

function formFromCoeffs(v) {
  return skewBasis[0].map((row, i) => row.map((_, j) => v.reduce((s, c, k) => s + c * skewBasis[k][i][j], 0)));
}
function pfaffian4(A) { return A[0][1] * A[2][3] - A[0][2] * A[1][3] + A[0][3] * A[1][2]; }
function hasNondegenerateCombination(ns) {
  if (!ns.length) return false;
  const forms = ns.map(formFromCoeffs);
  for (const A of forms) if (Math.abs(pfaffian4(A)) > 1e-9) return true;
  for (let i = 0; i < forms.length; i++) for (let j = i + 1; j < forms.length; j++) {
    const S = forms[i].map((row, r) => row.map((x, c) => x + forms[j][r][c]));
    if (Math.abs(pfaffian4(S)) > 1e-9) return true;
  }
  return false;
}

function cycleType(p) {
  const seen = new Set(); const lens = [];
  for (let i = 0; i < N; i++) if (!seen.has(i)) {
    let x = i, l = 0;
    while (!seen.has(x)) { seen.add(x); x = p[x]; l++; }
    if (l > 1) lens.push(l);
  }
  return lens.sort((a, b) => b - a).join('') || '1';
}
function orbits(H) {
  const unseen = new Set(id); const sizes = [];
  while (unseen.size) {
    const seed = unseen.values().next().value;
    const orb = new Set(H.map(h => h[seed]));
    for (const x of orb) unseen.delete(x);
    sizes.push(orb.size);
  }
  return sizes.sort((a, b) => b - a);
}
function elementOrder(p) {
  let x = id, o = 0;
  do { x = compose(p, x); o++; } while (key(x) !== key(id));
  return o;
}

const table = [...classes.values()].map(members => {
  const H = members[0];
  const ns = invariantSkewBasis(H);
  const orders = [...new Set(H.map(elementOrder))].sort((a, b) => a - b);
  const types = [...new Set(H.map(cycleType))].sort();
  return {
    order: H.length,
    conjugates: members.length,
    pointOrbits: orbits(H),
    elementOrders: orders,
    cycleTypes: types,
    invariantAlternatingDimension: ns.length,
    hasNondegenerateInvariantAlternatingForm: hasNondegenerateCombination(ns),
  };
}).sort((a, b) => a.order - b.order || a.pointOrbits.join('').localeCompare(b.pointOrbits.join('')) || a.cycleTypes.join(',').localeCompare(b.cycleTypes.join(',')));

const colorWeak = generated([
  [1, 0, 2, 3, 4], // S3 on first three
  [1, 2, 0, 3, 4],
  [0, 1, 2, 4, 3], // S2 on last two
]);
assert.equal(colorWeak.length, 12);
const colorWeakNull = invariantSkewBasis(colorWeak);

const symplecticClasses = table.filter(x => x.hasNondegenerateInvariantAlternatingForm);
const output = {
  protocol: 's5-subgroups-symplectic-standard-four/1',
  subgroupCount: subgroups.length,
  conjugacyClassCount: classes.size,
  classTable: table,
  symplecticClassCount: symplecticClasses.length,
  symplecticClasses,
  colorWeakStabilizer: {
    description: 'S3 x S2 preserving the 3+2 color/weak coordinate partition',
    order: colorWeak.length,
    pointOrbits: orbits(colorWeak),
    invariantAlternatingDimension: colorWeakNull.length,
    hasNondegenerateInvariantAlternatingForm: hasNondegenerateCombination(colorWeakNull),
  },
  interpretation: 'Some proper subgroups permit a symplectic form, but the physically natural S3 x S2 color/weak stabilizer does not. Symmetry reduction alone is insufficient unless the actual retained subgroup is one of the certified symplectic classes and dynamics selects a particular form.',
  passed: true,
};
console.log(JSON.stringify(output, null, 2));
