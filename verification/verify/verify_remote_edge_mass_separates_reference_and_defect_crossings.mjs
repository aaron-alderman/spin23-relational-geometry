import { run } from "./explore_regulated_glide_relative_pfaffian.mjs";
import { analyse } from "./explore_pin_pfaffian_crossing_localization.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const base = { L: 4, M: 2, r: 0.8, m0: 0.8, mu: 0.7 };
const unperturbed = { reference: 1.250488281, defect: 1.257363281 };
const perturbed = { reference: 1.210312500, defect: 1.254609375 };

const referenceShift = Math.abs(perturbed.reference - unperturbed.reference);
const defectShift = Math.abs(perturbed.defect - unperturbed.defect);
assert(referenceShift > 0.04 && referenceShift > 10 * defectShift,
  "remote edge mass must move the reference boundary root far more than the defect root");

const parameters = { ...base, boundaryMass: 0.3 };
const reference = analyse({ field: "pfr", delta: perturbed.reference }, 1, parameters);
const defect = analyse({ field: "pfd", delta: perturbed.defect }, 1, parameters);
assert(reference.squaredSingularPair[1] < 1e-8 && defect.squaredSingularPair[1] < 1e-8,
  "reported perturbed roots must contain numerical null pairs");
assert(reference.boundaryWeight > 0.9 && reference.yProfile.find(({ y }) => y === 0).weight < 0.01,
  "perturbed reference root must remain an outer-edge state");
assert(defect.coreWeight > 0.28 && defect.yProfile.find(({ y }) => y === 0).weight > 0.5,
  "perturbed defect root must retain its core-localized identity");

const atCheckpointWithoutEdgeMass = run({ ...base, boundaryMass: 0, delta: 1.25 });
const atCheckpointWithEdgeMass = run({ ...base, boundaryMass: 0.3, delta: 1.25 });
assert(atCheckpointWithoutEdgeMass.relative === 1 && atCheckpointWithEdgeMass.relative === -1,
  "a remote symmetry-preserving edge mass must flip the global relative Pfaffian at fixed defect parameters");

console.log("Remote edge mass separates reference and defect crossings: PASS");
console.log(`reference_root_shift=${referenceShift.toFixed(6)}`);
console.log(`defect_root_shift=${defectShift.toFixed(6)}`);
console.log("reference_shift_over_defect_shift_greater_than_10=true");
console.log("delta_1.25_global_relative_sign_is_boundary_condition_dependent=true");

