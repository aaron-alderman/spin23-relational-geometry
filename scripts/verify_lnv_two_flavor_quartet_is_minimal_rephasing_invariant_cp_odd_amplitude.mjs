const variables = [
  { name: "Faa", charge: [2, 0], conjugate: false },
  { name: "Fab", charge: [1, 1], conjugate: false },
  { name: "Fbb", charge: [0, 2], conjugate: false },
  { name: "Faa*", charge: [-2, 0], conjugate: true },
  { name: "Fab*", charge: [-1, -1], conjugate: true },
  { name: "Fbb*", charge: [0, -2], conjugate: true },
];
const balanced = [];
const enumerate = (remaining, start, picked) => {
  if (remaining === 0) {
    const charge = picked.reduce((s, i) => [s[0] + variables[i].charge[0], s[1] + variables[i].charge[1]], [0, 0]);
    if (charge[0] === 0 && charge[1] === 0) balanced.push(picked.map((i) => variables[i].name));
    return;
  }
  for (let i = start; i < variables.length; i++) enumerate(remaining - 1, i, [...picked, i]);
};
for (let d = 1; d <= 4; d++) enumerate(d, 0, []);
const key = (xs) => [...xs].sort().join(" ");
const conjugateName = (x) => x.endsWith("*") ? x.slice(0, -1) : `${x}*`;
const genuinelyComplex = balanced.filter((xs) => key(xs) !== key(xs.map(conjugateName)));
const byDegree = Object.fromEntries([1, 2, 3, 4].map((d) => [d, genuinelyComplex.filter((x) => x.length === d)]));

const C = (re, im) => ({ re, im });
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const phase = (x) => C(Math.cos(x), Math.sin(x));
const scale = (r, z) => C(r * z.re, r * z.im);
const F = { aa: C(0.8, 0.3), ab: C(-0.4, 0.9), bb: C(1.1, -0.2) };
const quartet = (M) => mul(mul(M.aa, M.bb), mul(conj(M.ab), conj(M.ab))).im;
const ta = 0.37;
const tb = -0.52;
const Fr = {
  aa: mul(phase(2 * ta), F.aa),
  ab: mul(phase(ta + tb), F.ab),
  bb: mul(phase(2 * tb), F.bb),
};
const cp = { aa: conj(F.aa), ab: conj(F.ab), bb: conj(F.bb) };

const m = { aa: C(1.3, 0.4), ab: C(-0.5, 0.7), bb: C(0.9, -0.6) };
const Q = 13;
const Fdeep = {
  aa: scale(-1 / Q ** 2, conj(m.aa)),
  ab: scale(-1 / Q ** 2, conj(m.ab)),
  bb: scale(-1 / Q ** 2, conj(m.bb)),
};
const massPairInvariant = mul(mul(m.aa, m.bb), mul(conj(m.ab), conj(m.ab))).im;
const deepQuartet = quartet(Fdeep);
const expectedDeep = -massPairInvariant / Q ** 8;

const result = {
  protocol: "minimal-lnv-two-flavor-cp-odd-amplitude-quartet/1",
  chargedFlavorVariables: variables,
  complexBalancedMonomialsByDegree: byDegree,
  noComplexInvariantBelowDegreeFour: [1, 2, 3].every((d) => byDegree[d].length === 0),
  minimalQuartet: "Im[F_aa F_bb (F_ab^*)^2]",
  quartetValue: quartet(F),
  rephasedQuartetValue: quartet(Fr),
  rephasingError: Math.abs(quartet(F) - quartet(Fr)),
  cpConjugateValue: quartet(cp),
  cpOddError: Math.abs(quartet(cp) + quartet(F)),
  deepEuclidean: {
    Q,
    massPairInvariant,
    amplitudeQuartet: deepQuartet,
    expected: expectedDeep,
    error: Math.abs(deepQuartet - expectedDeep),
    scaling: "-I_M_ab/Q^8",
  },
  spurionComparison: {
    lnvAmplitudeQuartet: "four Majorana-exchange amplitudes; external charged-flavor labels supply the frame",
    vacuumWeakBasisScalarI2: "four Majorana masses plus four charged-lepton masses",
  },
  measurementBoundary: "Channel rates alone give |F_ab|^2. Extracting the quartet sign needs coherent interference or an equivalent flavor-phase tomography protocol.",
};
result.passed =
  result.noComplexInvariantBelowDegreeFour &&
  byDegree[4].some((xs) => key(xs) === key(["Faa", "Fbb", "Fab*", "Fab*"])) &&
  Math.abs(result.quartetValue) > 1e-12 &&
  result.rephasingError < 1e-12 &&
  result.cpOddError < 1e-12 &&
  result.deepEuclidean.error < 1e-18;

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
