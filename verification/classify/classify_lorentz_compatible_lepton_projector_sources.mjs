import assert from "node:assert/strict";

const fields = [
  { name: "Q", su3: "3", su2: 2, y6: 1 },
  { name: "uc", su3: "bar3", su2: 1, y6: -4 },
  { name: "dc", su3: "bar3", su2: 1, y6: 2 },
  { name: "L", su3: "1", su2: 2, y6: -3 },
  { name: "ec", su3: "1", su2: 1, y6: 6 },
];
const scalars = [
  { name: "H", su3: "1", su2: 2, y6: 3 },
  { name: "Hdag", su3: "1", su2: 2, y6: -3 },
];

const colorPairHasSinglet = (a, b) =>
  (a === "1" && b === "1") || (a === "3" && b === "bar3") || (a === "bar3" && b === "3");
const weakPairHasSinglet = (a, b) => (a === 1 && b === 1) || (a === 2 && b === 2);

const bareScalarBilinears = [];
for (let i = 0; i < fields.length; i += 1) for (let j = i; j < fields.length; j += 1) {
  const a = fields[i], b = fields[j];
  if (a.y6 + b.y6 === 0 && colorPairHasSinglet(a.su3, b.su3) && weakPairHasSinglet(a.su2, b.su2)) {
    bareScalarBilinears.push([a.name, b.name]);
  }
}
assert.deepEqual(bareScalarBilinears, []);

// A Hermitian bilinear of one left Weyl field is the time component of a
// Lorentz vector current; covariantly it is psi^dagger bar(sigma)^mu psi.
const hermitianCurrents = fields.map((field) => `j_${field.name}^mu`);
assert.equal(hermitianCurrents.length, 5);

const yukawas = [];
for (let i = 0; i < fields.length; i += 1) for (let j = i; j < fields.length; j += 1) {
  const a = fields[i], b = fields[j];
  for (const h of scalars) {
    const colorOkay = colorPairHasSinglet(a.su3, b.su3);
    const weakDoublets = [a.su2, b.su2, h.su2].filter((d) => d === 2).length;
    const weakOkay = weakDoublets === 2;
    if (colorOkay && weakOkay && a.y6 + b.y6 + h.y6 === 0) {
      yukawas.push([a.name, b.name, h.name]);
    }
  }
}
assert.deepEqual(yukawas, [
  ["Q", "uc", "H"],
  ["Q", "dc", "Hdag"],
  ["L", "ec", "Hdag"],
]);

const lepton = fields.find((field) => field.name === "L");
const higgs = scalars.find((field) => field.name === "H");
const weinbergHypercharge = 2 * lepton.y6 + 2 * higgs.y6;
assert.equal(weinbergHypercharge, 0);

console.log(JSON.stringify({
  protocol: "lorentz-compatible-lepton-projector-sources/1",
  convention: "all fermions are left-handed Weyl fields and Y6=6Y",
  fields,
  bareLorentzScalarGaugeSingletFermionBilinears: bareScalarBilinears,
  noBareMassResult: "No pair of the fifteen-state chiral fields is simultaneously a Lorentz-scalar two-Weyl bilinear and an internal gauge singlet.",
  hermitianGaugeSingletCurrents: hermitianCurrents,
  currentTyping: "psi_r^dagger bar(sigma)^mu psi_r is a Lorentz vector; psi_r^dagger psi_r alone is not a Lorentz scalar.",
  renormalizableYukawaScalars: yukawas,
  leptonProjectorRoutes: {
    vector: "j_L^mu=L^dagger bar(sigma)^mu L, coupled to a vector response source",
    stress: "the P_L-compressed fermion stress tensor, coupled to a symmetric tensor/metric response",
    scalarYukawa: "e^c H^dagger L plus its Hermitian conjugate",
    scalarWeinberg: "(L H)(L H) plus its Hermitian conjugate; dimension five and lepton-number violating",
    scalarFourFermion: "j_L^mu j_{L,mu}; dimension six",
  },
  weinbergOperator: { fields: ["L", "L", "H", "H"], y6: weinbergHypercharge, gaugeSingletContractionExists: true },
  actionGate: "Choose the Lorentz type of the two-face auxiliary response. A scalar auxiliary cannot couple linearly to L^dagger L; it needs a scalar composite such as the lepton Yukawa, Weinberg, or current-current operator. A stress-derived carrier should instead use the compressed stress tensor.",
  passed: true,
}, null, 2));
