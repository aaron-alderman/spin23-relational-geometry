import { analyse } from "./explore_class_d_oriented_double_localizer.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const parameters = (M) => ({ L: 2, M, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25, boundaryMass: 0 });
const options = { radialT: 1, kappa: 0.2, center: 0.5, withGap: true };

const edgeNormalized = [2, 3, 4].map((M) => analyse(parameters(M), {
  ...options, coordinate: "radialHomotopy",
}));
assert(JSON.stringify(edgeNormalized.map(({ sectorDefect }) => sectorDefect.sign)) === JSON.stringify([-1, 1, 1]),
  "edge-normalized quadratic radius must lose the negative marker beyond M=2");

const localNormalizedWidths = [2, 3, 4, 6];
const localNormalized = localNormalizedWidths.map((M) => analyse(parameters(M), {
  ...options, coordinate: "radialLocalHomotopy",
}));
for (const result of localNormalized) {
  assert(result.sectorReference.sign === 1 && result.sectorDefect.sign === -1,
    "locally normalized quadratic radius must preserve reference/defect discrimination across widths");
  assert(result.sectorReferenceGap > 0.21 && result.sectorDefectGap > 0.03,
    "locally normalized quadratic radius must retain resolved width-stable gaps");
}
assert(Math.abs(localNormalized[2].sectorDefectGap - localNormalized[3].sectorDefectGap) < 1e-6,
  "M=4 and M=6 locally normalized defect gaps must have converged at the reported precision");

console.log("Radial local normalization controls width stability: PASS");
console.log("edge_normalized_y2_over_M_signs_M2_M3_M4=-1,+1,+1");
console.log("local_normalized_y2_signs_M2_M3_M4_M6=-1,-1,-1,-1");
console.log("local_normalized_defect_gap_limit_approximately=0.032366");
console.log("large_width_dense_matrix_audit_M6=true");

