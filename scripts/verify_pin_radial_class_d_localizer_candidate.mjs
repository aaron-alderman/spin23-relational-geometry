import { analyse } from "./explore_class_d_oriented_double_localizer.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const small = { L: 2, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25 };
const signed = analyse({ ...small, boundaryMass: 0 }, { coordinate: "y", kappa: 0.2, center: 0 });
assert(signed.projectedPositionMaxAbs < 1e-12,
  "the deck-sector compression of the signed transverse coordinate must vanish");
assert(signed.reference.sign === 1 && signed.defect.sign === 1,
  "the oriented-double signed-coordinate determinants must pair to a trivial sign");

for (const boundaryMass of [0, 0.3]) for (const kappa of [0.1, 0.2, 0.3]) {
  const radial = analyse({ ...small, boundaryMass }, { coordinate: "absY", kappa, center: 0.5 });
  assert(radial.sectorReference.sign === 1 && radial.sectorDefect.sign === -1,
    "the small-system radial marker must distinguish reference and defect across the tested scale and edge mass range");
}

const largeResults = [0, 0.3].map((boundaryMass) => analyse(
  { L: 4, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25, boundaryMass },
  { coordinate: "absY", kappa: 0.2, center: 0.5, withGap: true },
));
for (const result of largeResults) {
  assert(result.sectorReference.sign === 1 && result.sectorDefect.sign === -1,
    "the L=4 radial marker must remain reference-trivial and defect-nontrivial");
  assert(result.sectorReferenceGap > 0.2 && result.sectorDefectGap > 0.035,
    "the L=4 radial signs must be protected by resolved reduced-localizer gaps");
}
assert(Math.abs(largeResults[1].sectorDefectGap - largeResults[0].sectorDefectGap) < 0.002,
  "the defect radial-localizer gap must be insensitive to the tested remote edge mass");

console.log("Pin radial class-D localizer candidate: PASS");
console.log("deck_compressed_signed_Y_zero=true");
console.log("oriented_double_signed_marker_trivial=true");
console.log("radial_sector_marker_reference=+1_defect=-1");
console.log("radial_marker_remote_edge_stable=true");
console.log("theorem_status=candidate_not_yet_real_K_pairing");

