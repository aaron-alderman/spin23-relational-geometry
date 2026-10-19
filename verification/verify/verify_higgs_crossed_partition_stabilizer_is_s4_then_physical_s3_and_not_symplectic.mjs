import assert from 'node:assert/strict';

const id = [0, 1, 2, 3, 4];
function perms(a) {
  if (a.length <= 1) return [a];
  const out = [];
  for (let i = 0; i < a.length; i++) for (const tail of perms([...a.slice(0, i), ...a.slice(i + 1)])) out.push([a[i], ...tail]);
  return out;
}
const S5 = perms(id);
const act = (p, q) => p.map(i => q[i]);
const parity = bits => bits.reduce((a, b) => a + b, 0) % 2;
const weights = [];
for (let m = 0; m < 32; m++) {
  const bits = id.map(i => (m >> i) & 1);
  if (parity(bits) === 0) weights.push(bits.map(b => b ? -1 : 1));
}
assert.equal(weights.length, 16);

// Index 3 is q_4 in the paper's one-based convention.
const channel = q => q[3];
const partitionStabilizer = S5.filter(p => weights.every(q => channel(act(p, q)) === channel(q)));
assert.equal(partitionStabilizer.length, 24);
assert.ok(partitionStabilizer.every(p => p[3] === 3));

const preservesColorWeakBlocks = p => {
  const color = new Set([0, 1, 2]);
  const weak = new Set([3, 4]);
  return [0, 1, 2].every(i => color.has(p[i])) && [3, 4].every(i => weak.has(p[i]));
};
const physicalIntersection = partitionStabilizer.filter(preservesColorWeakBlocks);
assert.equal(physicalIntersection.length, 6);
assert.ok(physicalIntersection.every(p => p[3] === 3 && p[4] === 4));

function standardRep(p) {
  return Array.from({ length: 4 }, (_, r) =>
    Array.from({ length: 4 }, (_, c) => (p[c] === r ? 1 : 0) - (p[4] === r ? 1 : 0)));
}
const tr = A => A[0].map((_, j) => A.map(r => r[j]));
const mul = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const skew = [];
for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
  const E = Array.from({ length: 4 }, () => Array(4).fill(0)); E[i][j] = 1; E[j][i] = -1; skew.push(E);
}
function rank(A, tol = 1e-10) {
  const M = A.map(r => [...r]); let row = 0;
  for (let col = 0; col < (M[0]?.length ?? 0) && row < M.length; col++) {
    let p = row; while (p < M.length && Math.abs(M[p][col]) < tol) p++;
    if (p === M.length) continue;
    [M[row], M[p]] = [M[p], M[row]];
    const d = M[row][col]; for (let j = col; j < M[row].length; j++) M[row][j] /= d;
    for (let i = 0; i < M.length; i++) if (i !== row) {
      const f = M[i][col]; for (let j = col; j < M[i].length; j++) M[i][j] -= f * M[row][j];
    }
    row++;
  }
  return row;
}
function nullspace(A, tol = 1e-10) {
  const M = A.map(r => [...r]); const pivots = []; let row = 0;
  for (let col = 0; col < (M[0]?.length ?? 0) && row < M.length; col++) {
    let p = row; while (p < M.length && Math.abs(M[p][col]) < tol) p++;
    if (p === M.length) continue;
    [M[row], M[p]] = [M[p], M[row]];
    const d = M[row][col]; for (let j = col; j < M[row].length; j++) M[row][j] /= d;
    for (let i = 0; i < M.length; i++) if (i !== row) {
      const f = M[i][col]; for (let j = col; j < M[i].length; j++) M[i][j] -= f * M[row][j];
    }
    pivots.push(col); row++;
  }
  const free = Array.from({ length: M[0].length }, (_, i) => i).filter(i => !pivots.includes(i));
  return free.map(f => {
    const v = Array(M[0].length).fill(0); v[f] = 1;
    pivots.forEach((p, i) => { v[p] = -M[i][f]; });
    return v;
  });
}
const pfaffian4 = A => A[0][1] * A[2][3] - A[0][2] * A[1][3] + A[0][3] * A[1][2];
function invariantAltData(H) {
  const rows = [];
  for (const h of H) {
    const R = standardRep(h);
    const ds = skew.map(E => sub(mul(mul(tr(R), E), R), E));
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) rows.push(ds.map(D => D[i][j]));
  }
  const ns = nullspace(rows);
  const forms = ns.map(v => skew[0].map((row, i) => row.map((_, j) => v.reduce((s, c, k) => s + c * skew[k][i][j], 0))));
  let nondegenerate = forms.some(A => Math.abs(pfaffian4(A)) > 1e-9);
  for (let i = 0; !nondegenerate && i < forms.length; i++) for (let j = i + 1; j < forms.length; j++) {
    const A = forms[i].map((row, r) => row.map((x, c) => x + forms[j][r][c]));
    if (Math.abs(pfaffian4(A)) > 1e-9) nondegenerate = true;
  }
  return { dimension: ns.length, nondegenerate };
}
const s4Alt = invariantAltData(partitionStabilizer);
const s3Alt = invariantAltData(physicalIntersection);
assert.deepEqual(s4Alt, { dimension: 0, nondegenerate: false });
assert.deepEqual(s3Alt, { dimension: 1, nondegenerate: false });

console.log(JSON.stringify({
  protocol: 'higgs-crossed-partition-stabilizer/1',
  fiveBitChannelRule: 'up/neutral iff q4=+1; down/charged iff q4=-1',
  fullPermutationStabilizer: {
    order: partitionStabilizer.length,
    description: 'S4 fixing the distinguished q4 oscillator coordinate',
    invariantAlternatingDimensionOnStandard4: s4Alt.dimension,
    hasNondegenerateInvariantAlternatingForm: s4Alt.nondegenerate,
  },
  intersectionWithColorWeakBlockStabilizer: {
    order: physicalIntersection.length,
    description: 'S3 permuting the three color coordinates and fixing both weak coordinates',
    invariantAlternatingDimensionOnStandard4: s3Alt.dimension,
    hasNondegenerateInvariantAlternatingForm: s3Alt.nondegenerate,
  },
  conclusion: 'The Higgs crossed-octonion partition reduces S5 to S4, or to physical color S3 after respecting the 3+2 block structure. S4 preserves no alternating form; S3 preserves one rank-two degenerate form. Neither supplies a symplectic four-carrier.',
  passed: true,
}, null, 2));
