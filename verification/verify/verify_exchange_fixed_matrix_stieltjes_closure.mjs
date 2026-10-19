import assert from "node:assert/strict";

const sectors = [
  { name: "Q", atoms: [{ s: 1, a: 6, theta: 0 }, { s: 40, a: 2, theta: Math.PI / 3 }] },
  { name: "uc", atoms: [{ s: 4, a: 3, theta: Math.PI / 2 }, { s: 60, a: 1, theta: -Math.PI / 5 }] },
  { name: "dc", atoms: [{ s: 9, a: 3, theta: Math.PI }, { s: 80, a: 0.5, theta: Math.PI / 7 }] },
  { name: "L", atoms: [{ s: 16, a: 2, theta: -Math.PI / 2 }, { s: 100, a: 1.5, theta: Math.PI / 4 }] },
  { name: "ec", atoms: [{ s: 25, a: 1, theta: 0 }, { s: 120, a: 0.25, theta: -Math.PI / 8 }] },
];

// Every atom a[[1,e^{i theta}],[e^{-i theta},1]] is positive rank one.
const kernel = (atoms, q2) => atoms.reduce((k, atom) => {
  assert(atom.a >= 0 && atom.s >= 0);
  const scale = atom.a / (q2 + atom.s);
  return {
    n: k.n + scale,
    re: k.re + scale * Math.cos(atom.theta),
    im: k.im + scale * Math.sin(atom.theta),
  };
}, { n: 0, re: 0, im: 0 });

const determinant = (k) => k.n * k.n - k.re * k.re - k.im * k.im;
const scales = [0, 0.5, 2, 10, 100, 10000];
const samples = scales.map((q2) => {
  const bySector = sectors.map((sector) => ({ name: sector.name, ...kernel(sector.atoms, q2) }));
  for (const k of bySector) assert(determinant(k) >= -1e-12);
  const total = bySector.reduce((k, r) => ({ n: k.n + r.n, re: k.re + r.re, im: k.im + r.im }), { n: 0, re: 0, im: 0 });
  assert(determinant(total) >= -1e-12);
  const normalized = { n: 1, re: total.re / total.n, im: total.im / total.n };
  return {
    q2,
    sectorDeterminants: Object.fromEntries(bySector.map((r) => [r.name, determinant(r)])),
    normalizedCarrier: { ...normalized, determinant: determinant(normalized) },
  };
});

// At large Q^2 the sector populations approach their zeroth spectral masses,
// not their representation dimensions unless a separate sum rule equates them.
const zerothMasses = Object.fromEntries(sectors.map((r) => [r.name, r.atoms.reduce((s, a) => s + a.a, 0)]));
const totalMass = Object.values(zerothMasses).reduce((a, b) => a + b, 0);
const ultravioletSectorWeights = Object.fromEntries(Object.entries(zerothMasses).map(([name, mass]) => [name, mass / totalMass]));
const dimensionWeights = { Q: 6 / 15, uc: 3 / 15, dc: 3 / 15, L: 2 / 15, ec: 1 / 15 };
assert(Object.keys(dimensionWeights).some((name) => Math.abs(ultravioletSectorWeights[name] - dimensionWeights[name]) > 1e-6));

console.log(JSON.stringify({
  protocol: "exchange-fixed-matrix-stieltjes-closure/1",
  spectralAtoms: sectors,
  samples,
  closureTheorem: "A positive sum/integral of exchange-fixed H2(R) matrix residues remains exchange fixed, Herglotz/Stieltjes positive, and inside H2(R)+. Threshold- and atom-dependent complex phases require no alignment.",
  ultravioletMomentRule: {
    zerothSpectralMasses: zerothMasses,
    normalizedWeights: ultravioletSectorWeights,
    dimensionWeights,
    result: "UV weights equal normalized zeroth spectral masses. Dimension weights require an additional residue sum rule."
  },
  symmetryGate: "Derive an exact face-exchange symmetry of the action and an invariant vacuum so the full matrix spectral measure has equal diagonal populations.",
  passed: true,
}, null, 2));
