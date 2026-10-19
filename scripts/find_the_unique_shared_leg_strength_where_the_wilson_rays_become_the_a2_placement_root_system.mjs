import assert from 'node:assert/strict';

const tol = 1e-12;
const I = [[1, 0], [0, 1]];
const A = [[0, -1], [1, -1]];
const F = [[1, 0], [1, -1]];
const Fplus = [[0, -1], [-1, 0]];
const GA2 = [[2, -1], [-1, 2]];
const u = [1, 0];
const d = [0, 1];
const l = [1, 1];
const mm = (X, Y) => X.map((row) => Y[0].map((_, j) =>
  row.reduce((s, x, k) => s + x * Y[k][j], 0)));
const mv = (X, v) => X.map((row) => row.reduce((s, x, i) => s + x * v[i], 0));
const dot = (x, y) => x.reduce((s, a, i) => s + a * y[i], 0);
const outer = (x, y) => x.map((a) => y.map((b) => a * b));
const scale = (s, X) => X.map((row) => row.map((x) => s * x));
const sub = (X, Y) => X.map((row, i) => row.map((x, j) => x - Y[i][j]));
const eq = (X, Y) => X.every((row, i) => row.every((x, j) => Math.abs(x - Y[i][j]) < tol));
const inner = (x, K, y) => dot(x, mv(K, y));
const reflectionNormalMetric = (g, K) => {
  const Kg = mv(K, g);
  const denom = dot(g, Kg);
  return sub(I, scale(2 / denom, outer(g, Kg)));
};

// Remove the irrelevant positive scalar from the inverse-mass metric.  With
// r=kappa/m^2, K is proportional to [[1+r,-r],[-r,1+r]].
const metric = (r) => [[1 + r, -r], [-r, 1 + r]];
const normalizedOverlap = (x, K, y) =>
  inner(x, K, y) / Math.sqrt(inner(x, K, x) * inner(y, K, y));

for (const r of [0.1, 0.3, 1, 2, 10]) {
  const K = metric(r);
  const cLu = normalizedOverlap(l, K, u);
  const cUd = normalizedOverlap(u, K, d);
  const cDl = normalizedOverlap(d, K, l);
  assert(Math.abs(cLu - Math.sqrt(1 / (2 * (1 + r)))) < tol);
  assert(Math.abs(cDl - cLu) < tol);
  assert(Math.abs(cUd + r / (1 + r)) < tol);
  assert(cLu * cUd * cDl < 0);
}

// Equal A2 root-line angles require all absolute overlaps to be 1/2.
// |<u,d>|=r/(1+r)=1/2 has the unique positive solution r=1, which also gives
// <l,u>=<d,l>=1/2.
const selectedRatio = 1;
const Kstar = metric(selectedRatio);
assert(eq(Kstar, GA2));
const overlaps = {
  lu: normalizedOverlap(l, Kstar, u),
  ud: normalizedOverlap(u, Kstar, d),
  dl: normalizedOverlap(d, Kstar, l),
};
assert(Math.abs(overlaps.lu - 0.5) < tol);
assert(Math.abs(overlaps.ud + 0.5) < tol);
assert(Math.abs(overlaps.dl - 0.5) < tol);

// Metric Householder reflections normal to d and l are exactly the two
// established integral placement faces; their ordered product is A.
const Sd = reflectionNormalMetric(d, Kstar);
const Sl = reflectionNormalMetric(l, Kstar);
const Su = reflectionNormalMetric(u, Kstar);
assert(eq(Sd, F));
assert(eq(Sl, Fplus));
assert(eq(mm(Sd, Sl), A));
assert(eq(mm(Sl, Sd), mm(A, A)));
assert(eq(Su, [[-1, 1], [0, 1]]));

// The two-reflection product has trace -2r/(1+r); trace=-1 (the nontrivial
// order-three characteristic polynomial) selects r=1 uniquely.
for (const r of [0.2, 0.7, 1, 1.8]) {
  const K = metric(r);
  const P = mm(reflectionNormalMetric(d, K), reflectionNormalMetric(l, K));
  const trace = P[0][0] + P[1][1];
  assert(Math.abs(trace + 2 * r / (1 + r)) < tol);
  if (r === 1) assert(eq(mm(mm(P, P), P), I));
  else assert(!eq(mm(mm(P, P), P), I));
}

// Weyl closure at the selected point has six elements.
const key = (X) => X.flat().map((x) => Math.round(x * 1e12) / 1e12).join(',');
const group = new Map([[key(I), I]]);
let changed = true;
while (changed) {
  changed = false;
  for (const X of [...group.values()]) for (const Y of [Sd, Sl]) {
    for (const Z of [mm(X, Y), mm(Y, X)]) {
      if (!group.has(key(Z))) {
        group.set(key(Z), Z);
        changed = true;
      }
    }
  }
}
assert.equal(group.size, 6);

console.log(JSON.stringify({
  protocol: 'unique-shared-leg-strength-wilson-rays-a2-placement-root-system/1',
  ratio: 'r=kappa/m^2',
  scaleFreeInverseMassMetric: 'K(r)=[[1+r,-r],[-r,1+r]]',
  normalizedOverlaps: {
    general: {
      lu: '+sqrt(1/[2(1+r)])',
      ud: '-r/(1+r)',
      dl: '+sqrt(1/[2(1+r)])',
    },
    selected: overlaps,
  },
  uniqueness: {
    condition: 'all three absolute ray overlaps equal 1/2, equivalently the two-face product has trace -1',
    uniquePositiveSolution: 'r=1',
  },
  selectedGeometry: {
    condition: 'kappa=m^2',
    inverseMassMetricWithScale: 'K=(1/(3m^2)) G_A2',
    rootRays: { alpha1: u, alpha2: d, highestRoot: l },
    reflections: { normalToD: Sd, normalToL: Sl, normalToU: Su },
    placementIdentification: ['S_d=F', 'S_l=F A', 'S_d S_l=A'],
    WeylClosureOrder: group.size,
  },
  genericBoundary: 'the negative Bargmann/projective Z2 holonomy persists for every r>0, but exact A2 Coxeter geometry occurs only at r=1',
  physicalGate: 'derive or protect the nonperturbative equality between the shared-leg self-energy scale kappa and the bare mediator mass-squared m^2',
  passed: true,
}, null, 2));
