#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-critical-pgt-quantization-packet-v1.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.frozenClasses.length, evidence.counts.frozen);
assert.equal(evidence.partialClasses.length, evidence.counts.partial);
assert.equal(evidence.counts.frozen + evidence.counts.partial, evidence.counts.total);
assert.deepEqual(evidence.partialClasses, ["second-class-measure"]);
assert.equal(Object.values(evidence.gaugeRanks).slice(0, 3).reduce((a, b) => a + b, 0), evidence.gaugeRanks.total);

const eps = (a, b, c, d) => {
  const x = [a, b, c, d];
  if (new Set(x).size < 4) return 0;
  let inversions = 0;
  for (let i = 0; i < 4; i += 1) for (let j = i + 1; j < 4; j += 1) {
    if (x[i] > x[j]) inversions += 1;
  }
  return inversions % 2 === 0 ? 1 : -1;
};
const index = (a, b, c) => (a*4+b)*4+c;
const basis = [];
for (let a = 0; a < 4; a += 1) for (let b = a + 1; b < 4; b += 1) {
  for (let c = 0; c < 4; c += 1) {
    const t = Array(64).fill(0);
    t[index(a,b,c)] = 1;
    t[index(b,a,c)] = -1;
    basis.push(t);
  }
}
assert.equal(basis.length, 24);

const decompose = (t) => {
  const v = Array(4).fill(0);
  const s = Array(4).fill(0);
  for (let b = 0; b < 4; b += 1) for (let a = 0; a < 4; a += 1) v[b] += t[index(a,b,a)];
  for (let d = 0; d < 4; d += 1) for (let a = 0; a < 4; a += 1) {
    for (let b = 0; b < 4; b += 1) for (let c = 0; c < 4; c += 1) {
      s[d] += eps(d,a,b,c)*t[index(a,b,c)]/6;
    }
  }
  const V = Array(64).fill(0);
  const A = Array(64).fill(0);
  for (let a = 0; a < 4; a += 1) for (let b = 0; b < 4; b += 1) for (let c = 0; c < 4; c += 1) {
    V[index(a,b,c)] = ((a === c ? v[b] : 0) - (b === c ? v[a] : 0))/3;
    for (let d = 0; d < 4; d += 1) A[index(a,b,c)] -= eps(a,b,c,d)*s[d];
  }
  return { v, s, V, A, Q: t.map((x, i) => x-V[i]-A[i]) };
};
const dot = (x, y) => x.reduce((sum, value, i) => sum + value*y[i], 0);
for (const t of basis) {
  const { V, A, Q } = decompose(t);
  const reconstructed = V.map((x, i) => x+A[i]+Q[i]);
  assert.ok(reconstructed.every((x, i) => Math.abs(x-t[i]) < 1e-12));
  const q = decompose(Q);
  assert.ok(q.v.every((x) => Math.abs(x) < 1e-12));
  assert.ok(q.s.every((x) => Math.abs(x) < 1e-12));
  assert.ok(Math.abs(dot(V,A)) < 1e-12);
  assert.ok(Math.abs(dot(V,Q)) < 1e-12);
  assert.ok(Math.abs(dot(A,Q)) < 1e-12);
}

const rank = (input, tolerance = 1e-12) => {
  const a = input.map((row) => row.slice());
  let r = 0;
  for (let c = 0; c < a[0].length && r < a.length; c += 1) {
    let p = r;
    for (let i = r + 1; i < a.length; i += 1) if (Math.abs(a[i][c]) > Math.abs(a[p][c])) p = i;
    if (Math.abs(a[p][c]) <= tolerance) continue;
    [a[r], a[p]] = [a[p], a[r]];
    const pivot = a[r][c];
    for (let j = c; j < a[r].length; j += 1) a[r][j] /= pivot;
    for (let i = 0; i < a.length; i += 1) if (i !== r) {
      const f = a[i][c];
      for (let j = c; j < a[i].length; j += 1) a[i][j] -= f*a[r][j];
    }
    r += 1;
  }
  return r;
};
assert.equal(rank(evidence.normalMatrix), 8);
assert.match(evidence.secondClassBoundary.forbiddenShortcut, /do not identify/i);

console.log("Spin(2,3) critical-PGT quantization packet v1: PASS");
console.log("  frozen input classes: 13/14");
console.log("  torsion decomposition: 24 = 4 + 4 + 16, complete and orthogonal");
console.log("  gauge-fixing rank: 14 = 4 + 6 + 4");
console.log("  displayed normal-map rank: 8");
console.log("  remaining blocker: complete 34-constraint second-class measure");
