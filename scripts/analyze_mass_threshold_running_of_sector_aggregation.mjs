import assert from "node:assert/strict";

const abs = (n) => n < 0n ? -n : n;
const gcd = (a, b) => {
  a = abs(a); b = abs(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
};
const F = (n, d = 1n) => {
  assert(d !== 0n);
  if (d < 0n) { n = -n; d = -d; }
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
};
const add = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a, b) => F(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a, b) => F(a.n * b.n, a.d * b.d);
const div = (a, b) => F(a.n * b.d, a.d * b.n);
const sq = (a) => mul(a, a);
const str = (a) => a.d === 1n ? `${a.n}` : `${a.n}/${a.d}`;
const num = (a) => Number(a.n) / Number(a.d);
const zero = F(0n);
const one = F(1n);

const sectors = [
  { name: "Q", dimension: 6n, mass2: 1n, phaseRe: 1n, phaseIm: 0n },
  { name: "uc", dimension: 3n, mass2: 4n, phaseRe: 0n, phaseIm: 1n },
  { name: "dc", dimension: 3n, mass2: 9n, phaseRe: -1n, phaseIm: 0n },
  { name: "L", dimension: 2n, mass2: 16n, phaseRe: 0n, phaseIm: -1n },
  { name: "ec", dimension: 1n, mass2: 25n, phaseRe: 1n, phaseIm: 0n },
];
const totalDimension = sectors.reduce((s, r) => s + r.dimension, 0n);
assert.equal(totalDimension, 15n);

const atScale = (q2) => {
  const residues = sectors.map((r) => F(r.dimension, q2 + r.mass2));
  const total = residues.reduce(add, zero);
  const weights = residues.map((rho) => div(rho, total));
  assert.deepEqual(weights.reduce(add, zero), one);
  const re = weights.reduce((s, w, i) => add(s, mul(w, F(sectors[i].phaseRe))), zero);
  const im = weights.reduce((s, w, i) => add(s, mul(w, F(sectors[i].phaseIm))), zero);
  const determinant = sub(one, add(sq(re), sq(im)));
  assert(num(determinant) >= -1e-14);
  return {
    q2: q2.toString(),
    weights: Object.fromEntries(sectors.map((r, i) => [r.name, str(weights[i])])),
    carrier: { diagonal: "1", re: str(re), im: str(im), determinant: str(determinant) },
  };
};

const samples = [0n, 1n, 10n, 100n, 1000n].map(atScale);
const ultravioletWeights = Object.fromEntries(sectors.map((r) => [r.name, str(F(r.dimension, totalDimension))]));
const infrared = samples[0];
assert.notDeepEqual(infrared.weights, ultravioletWeights);

// d_r/(Q^2+m_r^2) = d_r/Q^2 + O(Q^-4), so normalization gives d_r/sum d + O(Q^-2).
const qLarge = atScale(1000000000n);
for (const sector of sectors) {
  const observed = Number(qLarge.weights[sector.name].split("/")[0]) /
    Number(qLarge.weights[sector.name].split("/")[1] ?? 1);
  const expected = Number(sector.dimension) / Number(totalDimension);
  assert(Math.abs(observed - expected) < 1e-8);
}

console.log(JSON.stringify({
  protocol: "mass-threshold-running-of-sector-aggregation/1",
  model: "rho_r(Q^2)=d_r/(Q^2+m_r^2), followed by normalized positive aggregation",
  assumptions: [
    "equal residue per matter component",
    "positive simple Euclidean poles",
    "illustrative nondegenerate squared masses (1,4,9,16,25)",
    "fixed illustrative rank-one face phases (1,i,-1,-i,1)",
  ],
  ultravioletLimit: {
    weights: ultravioletWeights,
    theorem: "w_r(Q^2)=d_r/15+O(Q^-2)",
  },
  samples,
  conclusion: "Thresholds generate a scale-dependent trajectory in Delta_4 while every aggregate remains in the same H2(R) positive cone. Dimension weights are an ultraviolet limit under equal per-component residues, not a universal finite-scale law.",
  physicalGate: "Derive the actual stress/current spectral densities and residues; masses alone in this toy Stieltjes model are not a Standard-Model prediction.",
  passed: true,
}, null, 2));
