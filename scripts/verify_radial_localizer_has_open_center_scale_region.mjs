import { analyse } from "./explore_class_d_oriented_double_localizer.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const small = { L: 2, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25, boundaryMass: 0 };
for (const kappa of [0.1, 0.2, 0.4]) {
  const signs = [];
  for (const center of [0.3, 0.4, 0.5, 0.8, 0.9]) {
    const result = analyse(small, { coordinate: "absY", kappa, center });
    assert(result.sectorReference.sign === 1, "reference radial marker must remain positive on the small-system grid");
    signs.push(result.sectorDefect.sign);
  }
  const expected = kappa === 0.4 ? [-1, -1, -1, -1, 1] : [1, -1, -1, -1, 1];
  assert(JSON.stringify(signs) === JSON.stringify(expected),
    `small-system radial center samples must contain the common open interior at kappa=${kappa}`);
}

const large = { L: 4, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25, boundaryMass: 0 };
for (const [center, expected] of [[0.3, 1], [0.5, -1], [0.9, 1]]) {
  const result = analyse(large, { coordinate: "absY", kappa: 0.2, center, withGap: center === 0.5 });
  assert(result.sectorReference.sign === 1 && result.sectorDefect.sign === expected,
    `large-system radial center sample ${center} must match the open-window pattern`);
  if (center === 0.5) assert(result.sectorDefectGap > 0.038 - 1e-4,
    "central large-system radial marker must have the reported resolved gap");
}

for (const [kappa, expected] of [[0.006, 1], [0.007, -1], [0.97, -1], [0.98, 1]]) {
  const result = analyse(large, { coordinate: "absY", kappa, center: 0.5 });
  assert(result.sectorReference.sign === 1 && result.sectorDefect.sign === expected,
    `large-system radial scale sample ${kappa} must bracket the finite localizer phase`);
}

console.log("Radial localizer open center-scale region: PASS");
console.log("large_center_window_bracket=(0.3,0.9)");
console.log("large_kappa_window_approximately=(0.006,0.98)");
console.log("radial_phase_is_open_not_tuned=true");
console.log("half_line_real_index_identification=still_open");

