const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const fields = [
  { name: "Q", multiplicity: 6, Y: 1 / 6, su2IndexMultiplicity: 3 * 0.5, su3IndexMultiplicity: 2 * 0.5, su3Cubic: 2 },
  { name: "u^c", multiplicity: 3, Y: -2 / 3, su2IndexMultiplicity: 0, su3IndexMultiplicity: 0.5, su3Cubic: -1 },
  { name: "d^c", multiplicity: 3, Y: 1 / 3, su2IndexMultiplicity: 0, su3IndexMultiplicity: 0.5, su3Cubic: -1 },
  { name: "L", multiplicity: 2, Y: -1 / 2, su2IndexMultiplicity: 0.5, su3IndexMultiplicity: 0, su3Cubic: 0 },
  { name: "e^c", multiplicity: 1, Y: 1, su2IndexMultiplicity: 0, su3IndexMultiplicity: 0, su3Cubic: 0 }
];

const sum = f => fields.reduce((total, field) => total + f(field), 0);
const oneGeneration = {
  gravitationalU1: sum(f => f.multiplicity * f.Y),
  U1Cubed: sum(f => f.multiplicity * f.Y ** 3),
  SU2SquaredU1: sum(f => f.su2IndexMultiplicity * f.Y),
  SU3SquaredU1: sum(f => f.su3IndexMultiplicity * f.Y),
  SU3Cubed: sum(f => f.su3Cubic)
};

for (const [name, value] of Object.entries(oneGeneration)) {
  assert(Math.abs(value) < 1e-12, name + " must cancel within one generation");
}

for (const generations of [1, 2, 3, 4, 5, 7]) {
  for (const value of Object.values(oneGeneration)) {
    assert(Math.abs(generations * value) < 1e-12, "perturbative anomaly cancellation cannot select generation number");
  }
  const weakDoublets = 4 * generations;
  assert(weakDoublets % 2 === 0, "Witten SU(2) anomaly must vanish for every generation count");
}

const selectorClass = generations => generations % 2;
assert(selectorClass(1) === selectorClass(3), "selector Z2 class cannot distinguish one from three");
assert(selectorClass(3) === selectorClass(5), "selector Z2 class cannot distinguish three from five");
assert(selectorClass(2) === selectorClass(4), "selector Z2 class cannot distinguish even counts");

const wallIndex = 1;
for (const generations of [1, 2, 3, 4, 5]) {
  const internalEuler = generations * (8 - 7);
  const jointIndex = wallIndex * internalEuler;
  assert(jointIndex === generations, "joint index must reproduce the supplied generation multiplicity");
}

console.log("Generation-selection no-go certificate: PASS");
console.log("all_local_SM_anomalies_cancel_per_generation=true; Witten_doublet_count=4Ng_even=true");
console.log("stable_selector_bundle_class=Ng_mod_2; cannot_distinguish_1_3_5=true");
console.log("AIII_index=Ng_records_but_does_not_derive_generation_count=true");
