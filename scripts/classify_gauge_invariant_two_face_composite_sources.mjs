import assert from "node:assert/strict";

const sectors = [
  { name: "Q", dimension: 6 },
  { name: "uc", dimension: 3 },
  { name: "dc", dimension: 3 },
  { name: "L", dimension: 2 },
  { name: "ec", dimension: 1 },
];

// Coordinates in the Hermitian Pauli basis (I, sigma_x, sigma_y, sigma_z).
// Antiunitary exchange Theta=sigma_x K fixes I,sigma_x,sigma_y and flips sigma_z.
const antiunitaryParity = { I: 1, sx: 1, sy: 1, sz: -1 };
// Unitary face swap fixes only I,sigma_x.
const unitaryParity = { I: 1, sx: 1, sy: -1, sz: -1 };
const fixedDimension = (parity) => Object.values(parity).filter((p) => p === 1).length;
assert.equal(fixedDimension(antiunitaryParity), 3);
assert.equal(fixedDimension(unitaryParity), 2);

const sectorCount = sectors.length;
const classifications = {
  oneTopologyHermitianGaugeSinglets: sectorCount,
  unrestrictedTwoFaceHermitianGaugeSinglets: 4 * sectorCount,
  antiunitaryExchangeFixedGaugeSinglets: fixedDimension(antiunitaryParity) * sectorCount,
  unitaryExchangeFixedGaugeSinglets: fixedDimension(unitaryParity) * sectorCount,
  antiunitaryFixedCrossFaceOnlyGaugeSinglets: 2 * sectorCount,
  leptonSectorAntiunitaryFixedGaugeSinglets: fixedDimension(antiunitaryParity),
};
assert.deepEqual(classifications, {
  oneTopologyHermitianGaugeSinglets: 5,
  unrestrictedTwoFaceHermitianGaugeSinglets: 20,
  antiunitaryExchangeFixedGaugeSinglets: 15,
  unitaryExchangeFixedGaugeSinglets: 10,
  antiunitaryFixedCrossFaceOnlyGaugeSinglets: 10,
  leptonSectorAntiunitaryFixedGaugeSinglets: 3,
});

const gram = (contributions) => {
  const n = contributions.reduce((sum, term) => sum + term.weight, 0);
  const re = contributions.reduce((sum, term) => sum + term.weight * Math.cos(term.phase), 0);
  const im = contributions.reduce((sum, term) => sum + term.weight * Math.sin(term.phase), 0);
  return { n, re, im, determinant: n * n - re * re - im * im };
};

const singleRedundantImage = gram([{ weight: 7, phase: Math.PI / 5 }]);
assert(Math.abs(singleRedundantImage.determinant) < 1e-12);
const twoChannelMixture = gram([
  { weight: 3, phase: 0 },
  { weight: 4, phase: Math.PI / 2 },
]);
assert(Math.abs(twoChannelMixture.determinant - 24) < 1e-12);
const samePhaseMixture = gram([
  { weight: 3, phase: Math.PI / 7 },
  { weight: 4, phase: Math.PI / 7 },
]);
assert(Math.abs(samePhaseMixture.determinant) < 1e-12);

console.log(JSON.stringify({
  protocol: "gauge-invariant-two-face-composite-sources/1",
  inputFromExactSMCommutant: "End_SM(M)=direct sum_r C P_r for r=Q,uc,dc,L,ec",
  sectors,
  hermitianFaceBasis: ["I", "sigma_x", "sigma_y", "sigma_z"],
  antiunitaryExchange: {
    action: "H -> sigma_x conjugate(H) sigma_x",
    parity: antiunitaryParity,
    fixedBasisPerSector: ["I", "sigma_x", "sigma_y"],
  },
  unitaryExchange: {
    action: "H -> sigma_x H sigma_x",
    parity: unitaryParity,
    fixedBasisPerSector: ["I", "sigma_x"],
  },
  classifications,
  redundantFaceGram: {
    rule: "psi_B=e^{i theta} S psi_A gives n[[1,e^{i theta}],[e^{-i theta},1]]",
    singleChannel: singleRedundantImage,
    consequence: "one deterministic exchanged image is always a rank-one boundary ray",
  },
  mixture: {
    distinctPhaseChannels: twoChannelMixture,
    samePhaseChannels: samePhaseMixture,
    consequence: "two positive channels populate the cone interior iff their relative phases are not identical modulo 2pi",
  },
  selectorResult: "The lepton projector restricts the fifteen-dimensional exchange-fixed source space to one three-dimensional H2(R) source cone, but gauge symmetry alone does not select P_L over the other four projectors.",
  physicalGate: "Construct existing-field composite channels whose topology comparison explicitly uses S, derive why the lepton projector is chosen, and obtain at least two non-collinear positive residues without an independent mirror multiplet.",
  passed: true,
}, null, 2));
