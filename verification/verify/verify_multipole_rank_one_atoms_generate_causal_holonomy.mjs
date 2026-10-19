const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const addC = (a, b) => C(a.re + b.re, a.im + b.im);
const mulC = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjC = (a) => C(a.re, -a.im);
const scaleC = (s, a) => C(s * a.re, s * a.im);
const invC = (a) => { const d = a.re ** 2 + a.im ** 2; return C(a.re / d, -a.im / d); };
const pole = (omega, z) => invC(C(omega - z.re, -z.im));
const outer = (v) => v.map((x) => v.map((y) => mulC(x, conjC(y))));

const a = [C(1), C(1), C(1)];
const b = [C(1), C(0, 1), C(0)];
const e1 = [C(1), C(0), C(0)];
const e2 = [C(0), C(1), C(0)];
const e3 = [C(0), C(0), C(1)];
const atoms = [
  { omega: -2, vector: a, weight: 1 },
  { omega: 1, vector: b, weight: 1 },
  { omega: 3, vector: e1, weight: 0.4 },
  { omega: 4, vector: e2, weight: 0.4 },
  { omega: 5, vector: e3, weight: 0.4 },
];

for (const atom of atoms) {
  const residue = outer(atom.vector);
  const loop = mulC(mulC(residue[0][1], residue[1][2]), residue[2][0]);
  assert(Math.abs(loop.im) < 1e-10 && loop.re >= -1e-10,
    "every individual rank-one atom must have real nonnegative loop product");
}

const response = (z) => {
  const g = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => C(0)));
  for (const atom of atoms) {
    const scalar = scaleC(atom.weight, pole(atom.omega, z));
    const residue = outer(atom.vector);
    for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) {
      g[i][j] = addC(g[i][j], mulC(scalar, residue[i][j]));
    }
  }
  return g;
};

const schurData = (z) => {
  const g = response(z);
  const u = g[0][1];
  const q = mulC(mulC(g[0][2], g[2][1]), invC(g[2][2]));
  return { u, q, area: mulC(u, conjC(q)).im };
};

for (const z of [C(0, 0.3), C(0, 0.8), C(0, 1.5), C(0, 3)]) {
  for (const atom of atoms) assert(pole(atom.omega, z).im > 0,
    "every upper-half-plane pole scalar must have positive imaginary part");
  // The three diagonal atoms give a strict positive lower bound on Im G.
  const diagonalLowerBound = Math.min(
    0.4 * pole(3, z).im,
    0.4 * pole(4, z).im,
    0.4 * pole(5, z).im,
  );
  assert(diagonalLowerBound > 0, "diagonal rank-one atoms must make the Herglotz imaginary part strictly positive");
}

const checkpoints = [
  { eta: 0.3, expected: 0.5060106993821596 },
  { eta: 0.8, expected: 0.2189540756679361 },
  { eta: 1.5, expected: -0.0017582417582417444 },
  { eta: 3, expected: -0.053113553113553105 },
];
for (const checkpoint of checkpoints) {
  const result = schurData(C(0, checkpoint.eta));
  assert(Math.abs(result.area - checkpoint.expected) < 1e-10,
    "frequency-resolved direct/indirect area must match the rational benchmark");
}
assert(checkpoints[0].expected > 0 && checkpoints.at(-1).expected < 0,
  "multi-pole interference area must reverse sign along the imaginary-frequency scan");

const sA = (z) => pole(-2, z);
const sB = (z) => pole(1, z);
const s5 = (z) => pole(5, z);
for (const z of [C(0, 0.6), C(0.2, 1.1)]) {
  const exact = schurData(z);
  const uFormula = addC(sA(z), mulC(C(0, -1), sB(z)));
  const qFormula = mulC(mulC(sA(z), sA(z)), invC(addC(sA(z), scaleC(0.4, s5(z)))));
  assert(Math.abs(exact.u.re - uFormula.re) < 1e-10 && Math.abs(exact.u.im - uFormula.im) < 1e-10,
    "direct path must contain the -2 and 1 poles");
  assert(Math.abs(exact.q.re - qFormula.re) < 1e-10 && Math.abs(exact.q.im - qFormula.im) < 1e-10,
    "indirect path must contain the -2 and 5 pole structure");
}

console.log("Multi-pole rank-one atoms generate causal holonomy: PASS");
console.log("individual_atom_holonomy=zero");
console.log("strict_matrix_Herglotz=true");
console.log("direct_poles=-2,1");
console.log("indirect_structure=-2,5");
console.log("frequency_resolved_area_sign_reversal=true");
