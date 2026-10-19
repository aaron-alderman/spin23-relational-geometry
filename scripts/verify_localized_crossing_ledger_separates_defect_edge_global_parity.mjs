import { run } from "./explore_regulated_glide_relative_pfaffian.mjs";
import { analyse } from "./explore_pin_pfaffian_crossing_localization.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const base = { M: 2, r: 0.8, m0: 0.8, mu: 0.7 };
const interval = [1.2, 1.3];
const defectRoots = [
  { L: 2, delta: 1.263992310 },
  { L: 3, delta: 1.261130371 },
  { L: 4, delta: 1.257363281 },
];

const ledger = [];
for (const root of defectRoots) {
  const start = run({ ...base, L: root.L, delta: interval[0] });
  const end = run({ ...base, L: root.L, delta: interval[1] });
  const profile = analyse({ field: "pfd", delta: root.delta }, 1, { ...base, L: root.L });
  const defectParity = Number(start.pfd.sign !== end.pfd.sign);
  const referenceParity = Number(start.pfr.sign !== end.pfr.sign);
  const globalParity = Number(start.relative !== end.relative);
  assert(defectParity === 1,
    `L=${root.L} must contain one mod-two defect crossing on the declared interval`);
  assert(profile.coreWeight > 0.28 && profile.yProfile.find(({ y }) => y === 0).weight > 0.5,
    `L=${root.L} crossing must retain strong defect-core and central-row localization`);
  assert(profile.boundaryWeight < 0.12,
    `L=${root.L} defect crossing must remain separated from the outer boundary`);
  assert(globalParity === (defectParity ^ referenceParity),
    "global Pfaffian parity must equal defect parity XOR reference parity");
  ledger.push({ L: root.L, defectParity, referenceParity, globalParity });
}

assert(JSON.stringify(ledger.map(({ referenceParity }) => referenceParity)) === JSON.stringify([0, 0, 1]),
  "only L=4 must acquire a reference crossing inside the declared interval");
assert(JSON.stringify(ledger.map(({ globalParity }) => globalParity)) === JSON.stringify([1, 1, 0]),
  "the global relative parity must lose the stable defect event when the L=4 edge event cancels it");

const edgeRoot = analyse({ field: "pfr", delta: 1.250488281 }, 1, { ...base, L: 4 });
assert(edgeRoot.boundaryWeight > 0.7 && edgeRoot.yProfile.find(({ y }) => y === 0).weight < 0.03,
  "the canceling L=4 reference crossing must be an outer-edge mode");
assert(Math.max(...edgeRoot.xProfile.map(({ weight }) => Math.abs(weight - 1 / 8))) < 1e-8,
  "the canceling reference-edge mode must be uniform around the circumference");

console.log("Localized crossing ledger separates defect, edge and global parity: PASS");
console.log("declared_delta_interval=[1.2,1.3]");
console.log("defect_event_parity_L2_L3_L4=1,1,1");
console.log("reference_edge_parity_L2_L3_L4=0,0,1");
console.log("global_relative_parity_L2_L3_L4=1,1,0");

