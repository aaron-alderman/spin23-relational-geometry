import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(
  fs.readFileSync(path.join(root, "evidence/data/admissibility-hybrid-bosonic-frontier-v1.json"), "utf8"),
);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function near(actual, expected, tolerance, label) {
  assert(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, received ${actual}`);
}

assert(
  evidence.admissionVerdict === "TWO_EXECUTABLE_BRANCHES_NO_SELECTOR_CARRIER_ADMITTED",
  "no bosonic platform may be promoted to an admitted selector carrier",
);
assert(evidence.platforms.length === 5, "expected five platform records");
assert(new Set(evidence.platforms.map(({ id }) => id)).size === 5, "platform identifiers must be unique");
assert(evidence.nextExperiments.length === 3, "expected three next experiments");

const byId = Object.fromEntries(evidence.platforms.map((platform) => [platform.id, platform]));
const acoustic = byId["acoustic-nonhermitian-klein-bottle-lattice"].reportedCouplingHz;
assert(acoustic.every((value, index) => index === 0 || value > acoustic[index - 1]), "acoustic coupling sequence must be ordered");

const yig = byId["yig-photon-magnon-phonon"].reported;
near(yig.magnonCavityCouplingMHz / yig.magnonDecayMHz, 13.53061224489796, 1e-12, "magnon strong-coupling ratio");
near((yig.reducedPolaritonDecayKHz * 1000) / yig.phononDampingHz, 5.032258064516129, 1e-12, "polariton/phonon damping ratio");
assert(yig.polaromechanicalCooperativity === 9400, "reported cooperativity changed");

const thermal = byId["magnon-polaron-thermal-hall"];
assert(thermal.reportedThermalHallAnglePercentUpTo === 2, "thermal Hall angle changed");
assert(thermal.competingMechanism.includes("without Berry curvature"), "adversarial mechanism firewall missing");

assert(evidence.reranking.previousExecuteNowPosition === 5, "previous rank changed");
assert(evidence.reranking.newExecuteNowPosition === 3, "new rank changed");

console.log("PASS hybrid bosonic frontier triage");
console.log(`  platforms: ${evidence.platforms.length}`);
console.log(`  YIG magnon coupling/decay: ${yig.magnonCavityCouplingMHz / yig.magnonDecayMHz}`);
console.log(`  YIG cooperativity: ${yig.polaromechanicalCooperativity}`);
console.log(`  reranked execute-now position: ${evidence.reranking.newExecuteNowPosition}`);

