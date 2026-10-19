import assert from "node:assert/strict";

const fields = {
  Q:   { su2: 2, y6: 1,  z: -1 },
  L:   { su2: 2, y6: -3, z: -1 },
  uC:  { su2: 1, y6: -4, z: 1 },
  dC:  { su2: 1, y6: 2,  z: 1 },
  eC:  { su2: 1, y6: 6,  z: 1 },
  nuC: { su2: 1, y6: 0,  z: 1 },
  H:   { su2: 2, y6: 3,  z: -1 },
  Hdag:{ su2: 2, y6: -3, z: -1 }
};

for (const field of Object.values(fields)) {
  const center = field.su2 === 2 ? -1 : 1;
  assert.equal(field.z, center);
}

const monomials = [
  { name: "up Yukawa", members: ["Q", "H", "uC"] },
  { name: "down Yukawa", members: ["Q", "Hdag", "dC"] },
  { name: "charged-lepton Yukawa", members: ["L", "Hdag", "eC"] },
  { name: "Dirac-neutrino Yukawa", members: ["L", "H", "nuC"] },
  { name: "right-neutrino Majorana mass", members: ["nuC", "nuC"] },
  { name: "Weinberg operator", members: ["L", "H", "L", "H"] },
  { name: "Higgs quadratic", members: ["Hdag", "H"] },
  { name: "Higgs quartic", members: ["Hdag", "H", "Hdag", "H"] }
];

for (const term of monomials) {
  term.parity = term.members.reduce((p, name) => p * fields[name].z, 1);
  term.hypercharge6 = term.members.reduce((y, name) => y + fields[name].y6, 0);
  assert.equal(term.parity, 1);
  assert.equal(term.hypercharge6, 0);
}

// Five-bit audit: Z_chir equals the SU(2)_L center character.
const weights = [];
for (let mask = 0; mask < 32; mask += 1) {
  const q = Array.from({ length: 5 }, (_, i) => ((mask >> i) & 1) ? -1 : 1);
  if (q.filter((x) => x < 0).length % 2 === 0) weights.push(q);
}
const sigma = (q) => q.map((x, i) => i === 3 ? x : -x);
for (const q of weights) {
  const twoT3L = (q[3] - q[4]) / 2;
  const twoT3R = (q[3] + q[4]) / 2;
  const z = q[3] * q[4];
  const su2Center = twoT3L === 0 ? 1 : -1;
  assert.equal(z, su2Center);
  const image = sigma(q);
  const imageT3L = (image[3] - image[4]) / 2;
  const imageT3R = (image[3] + image[4]) / 2;
  assert.equal(imageT3L, twoT3R);
  assert.equal(imageT3R, twoT3L);
}

console.log(JSON.stringify({
  protocol: "topology-parity-is-su2-center-and-yukawas-are-even/1",
  identity: "Z_chir=q4 q5=(-1)^(2j_L) on the one-generation matter module",
  higgsParity: -1,
  auditedTerms: monomials,
  result: "all renormalizable one-generation Yukawas, the Majorana term, the Weinberg operator and the Higgs potential are even",
  exchangeAction: "Dirac Weyl S swaps T3L and T3R at Cartan level; it is not in the centralizer of the unbroken SU(2)_L action",
  boundary: "Ad_Z is gauge-center averaging on physical observables, whereas an S jump needs gauge-field conjugation, Higgs dressing or enlarged left-right/SO(10) covariance",
  passed: true
}, null, 2));
