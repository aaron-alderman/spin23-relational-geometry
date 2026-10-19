import { run, allowedChiralBreakers } from "./explore_regulated_glide_relative_pfaffian.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

assert(allowedChiralBreakers.length === 8,
  "the Pauli audit must find eight glide-even class-D perturbations that break accidental chiral symmetry");
assert(allowedChiralBreakers.some(({ label, commutesQ }) => label === "IyI" && commutesQ),
  "I tensor sigma_y tensor I must be the simplest allowed accidental-chiral-symmetry breaker");

const baseline = run({ L: 2, M: 1, r: 0.8, m0: 0.8, mu: 0.7, delta: 0 });
assert(baseline.relative === 1,
  "the unperturbed accidentally chiral regulator must give a trivial relative Pfaffian in the benchmark");

const nontrivialCases = [
  { L: 2, M: 1, r: 0.8, m0: 0.8, mu: 0.7, delta: 0.25 },
  { L: 3, M: 1, r: 0.8, m0: 0.8, mu: 0.7, delta: 0.25 },
  { L: 2, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 0.25 },
  { L: 2, M: 1, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25 },
  { L: 3, M: 1, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25 },
  { L: 2, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25 },
];

for (const parameters of nontrivialCases) {
  const plus = run(parameters, 1);
  const minus = run(parameters, -1);
  assert(plus.pfr.sign !== 0 && plus.pfd.sign !== 0 && minus.pfr.sign !== 0 && minus.pfd.sign !== 0,
    "reference and defect endpoints must remain Pfaffian-nonsingular in both deck sectors");
  assert(plus.relative === -1 && minus.relative === -1,
    "both deck sectors must show the same nontrivial relative Pfaffian parity");
  assert(plus.sectorDimension * 2 === plus.n && minus.sectorDimension * 2 === minus.n,
    "each real glide sector must have half the oriented-double dimension");
  assert(plus.antiR < 1e-9 && plus.antiD < 1e-9 && minus.antiR < 1e-9 && minus.antiD < 1e-9,
    "projected Majorana matrices must be real antisymmetric");
}

console.log("Regulated glide relative-Pfaffian audit: PASS");
console.log(`allowed_accidental_chiral_breakers=${allowedChiralBreakers.length}`);
console.log("unperturbed_relative_parity=+1");
console.log("perturbed_relative_parity=-1_in_both_deck_sectors");
console.log(`finite_size_parameter_checks=${nontrivialCases.length * 2}`);
console.log("continuum_and_localization_status=still_open");
