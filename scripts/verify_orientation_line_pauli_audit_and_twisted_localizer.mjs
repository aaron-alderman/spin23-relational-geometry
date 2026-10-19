import { orientationLineCandidates } from "./explore_regulated_glide_relative_pfaffian.mjs";
import { analyse } from "./explore_class_d_oriented_double_localizer.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const byLabel = Object.fromEntries(orientationLineCandidates.map((candidate) => [candidate.label, candidate]));

assert(orientationLineCandidates.length === 16,
  "the complete Pauli audit must find sixteen glide-odd, particle-hole-even, Majorana-real factors");
const kineticCompatible = orientationLineCandidates.filter(({ commutesAx, commutesAy }) => commutesAx && commutesAy)
  .map(({ label }) => label).sort();
assert(JSON.stringify(kineticCompatible) === JSON.stringify(["IIz", "Ixz", "Iyy", "Izz"]),
  "exactly four orientation-line candidates must commute with both kinetic generators");
assert(byLabel.Iyy.commutesB1 === false && byLabel.Iyy.commutesB2 === false
  && byLabel.Iyy.commutesWilson === false && byLabel.Iyy.commutesSelector === true,
  "I tensor sigma_y tensor sigma_y must anticommute with both texture masses and Wilson regulator but commute with the selector");

const smallBase = { L: 2, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25, boundaryMass: 0 };
for (const candidateLabel of ["Ixz", "Iyy"]) {
  const result = analyse(smallBase, { coordinate: "twistedY", candidateLabel, kappa: 0.2, center: 0 });
  assert(result.sectorReference.sign === 1 && result.sectorDefect.sign === -1,
    `${candidateLabel} must distinguish reference and defect in the small system`);
}

const largeBase = { L: 4, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25 };
const failedIxz = analyse({ ...largeBase, boundaryMass: 0 },
  { coordinate: "twistedY", candidateLabel: "Ixz", kappa: 0.2, center: 0 });
assert(failedIxz.sectorReference.sign === -1 && failedIxz.sectorDefect.sign === -1,
  "I tensor sigma_x tensor sigma_z must be rejected because its small-size discrimination fails at L=4");

const iyyLarge = [0, 0.3].map((boundaryMass) => analyse({ ...largeBase, boundaryMass },
  { coordinate: "twistedY", candidateLabel: "Iyy", kappa: 0.2, center: 0, withGap: true }));
for (const result of iyyLarge) {
  assert(result.sectorReference.sign === 1 && result.sectorDefect.sign === -1,
    "I tensor sigma_y tensor sigma_y must preserve reference/defect discrimination under the remote edge mass");
  assert(result.sectorReferenceGap > 0 && result.sectorDefectGap > 0,
    "the tested Iyy twisted localizers must remain invertible");
}
assert(iyyLarge[1].sectorDefectGap < 0.002,
  "the edge-perturbed Iyy defect gap must be recorded as small rather than robust");

console.log("Orientation-line Pauli audit and twisted localizer: PASS");
console.log("admissible_orientation_line_factors=16");
console.log("kinetic_compatible_factors=IIz,Ixz,Iyy,Izz");
console.log("Ixz_small_size_selection_fails_at_L4=true");
console.log("Iyy_reference=+1_defect=-1_under_tested_edge_mass=true");
console.log("Iyy_twisted_gap_status=positive_but_fragile");

