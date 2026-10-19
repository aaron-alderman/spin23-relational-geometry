import { analyse } from "./explore_class_d_oriented_double_localizer.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const small = { L: 2, M: 2, r: 0.8, m0: 0.8, mu: 0.7, boundaryMass: 0 };
const smallSamples = [1.1, 1.15, 1.26399231, 1.35].map((delta) => analyse({ ...small, delta }, {
  coordinate: "absY", kappa: 0.2, center: 0.5, withGap: true,
}));
assert(JSON.stringify(smallSamples.map(({ sectorDefect }) => sectorDefect.sign)) === JSON.stringify([1, -1, -1, 1]),
  "small-system radial phase must surround but not flip at the localized Hamiltonian crossing");
assert(smallSamples[2].sectorDefectHamiltonianGap < 1e-6,
  "the reported small-system defect root must close the Hamiltonian gap");
assert(smallSamples[2].sectorDefectGap > 0.037,
  "the radial localizer must remain strongly gapped at the Hamiltonian zero");

const large = { L: 4, M: 2, r: 0.8, m0: 0.8, mu: 0.7, boundaryMass: 0 };
const largeSamples = [1.24, 1.257363281, 1.27].map((delta) => analyse({ ...large, delta }, {
  coordinate: "absY", kappa: 0.2, center: 0.5, withGap: true,
}));
assert(largeSamples.every(({ sectorDefect }) => sectorDefect.sign === -1),
  "large-system radial marker must be unchanged across the localized Hamiltonian root");
assert(largeSamples[1].sectorDefectHamiltonianGap < 1e-6
  && largeSamples[1].sectorDefectGap > 0.038,
  "large-system Hamiltonian closure must occur inside a well-gapped radial-localizer phase");

const radialBoundaries = [1.108929443, 1.348321533];
assert(radialBoundaries[0] < 1.26399231 && radialBoundaries[1] > 1.26399231,
  "radial-localizer phase boundaries must bracket rather than coincide with the localized spectral crossing");

console.log("Radial localizer phase versus bound-state spectral flow: PASS");
console.log("small_radial_delta_window_approximately=(1.108929,1.348322)");
console.log("localized_hamiltonian_root_small=1.263992");
console.log("radial_marker_flips_at_hamiltonian_root=false");
console.log("interpretation=local_phase_not_instantaneous_bound_state_parity");

