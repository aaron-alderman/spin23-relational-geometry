import { analyse } from "./explore_class_d_oriented_double_localizer.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const base = { L: 4, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25 };

for (const boundaryMass of [0, 0.5]) {
  for (const radialT of [0, 0.5, 1]) {
    const result = analyse({ ...base, boundaryMass }, {
      coordinate: "radialHomotopy", radialT, kappa: 0.2, center: 0.5, withGap: true,
    });
    assert(result.sectorReference.sign === 1 && result.sectorDefect.sign === -1,
      "reference/defect radial signs must remain fixed throughout the sampled function homotopy");
    assert(result.sectorReferenceGap > 0.18 && result.sectorDefectGap > 0.019,
      "the radial-function homotopy must retain resolved reference and defect gaps");
  }
}

console.log("Radial-function localizer homotopy: PASS");
console.log("homotopy=abs_y_to_y_squared_over_M");
console.log("reference_sign=+1_defect_sign=-1");
console.log("minimum_sampled_defect_gap_greater_than=0.019");
console.log("remote_edge_mass_b0.5_homotopy_stable=true");

