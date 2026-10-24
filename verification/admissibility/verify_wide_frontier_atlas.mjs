import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(
  fs.readFileSync(path.join(root, "evidence/data/admissibility-wide-frontier-atlas-v1.json"), "utf8"),
);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const score = (lane) =>
  lane.corpusLeverage + lane.experimentalReach + lane.falsifiability + lane.nullUtility - lane.bridgeRisk;

assert(evidence.protocol === "admissibility-wide-frontier-atlas/1", "unexpected protocol");
assert(evidence.lanes.length === 14, "expected fourteen frontier lanes");
assert(new Set(evidence.lanes.map(({ id }) => id)).size === evidence.lanes.length, "lane identifiers must be unique");
assert(evidence.nextPackets.length === 5, "expected five executable packets");
assert(evidence.iterationOne.completed.length === 4, "first iteration completion record incomplete");
assert(evidence.iterationOne.rerankedNext.length === 5, "reranked queue must contain five packets");
assert(evidence.iterationOne.promotions.length === 4, "first iteration promotions incomplete");
assert(evidence.iterationTwo.completed.length === 2, "second iteration completion record incomplete");
assert(evidence.iterationTwo.rerankedNext.length === 5, "second reranked queue must contain five packets");
assert(evidence.iterationTwo.stopRule.includes("platform"), "second-iteration stop rule missing");
assert(evidence.steeringTriggers.length === 6, "iterative steering triggers incomplete");
assert(evidence.successOutcomes.length === 4, "frontier outcomes incomplete");

for (const lane of evidence.lanes) {
  for (const key of ["corpusLeverage", "experimentalReach", "falsifiability", "nullUtility", "bridgeRisk"]) {
    assert(Number.isInteger(lane[key]) && lane[key] >= 0 && lane[key] <= 5, `${lane.id} ${key} outside 0..5`);
  }
  lane.priorityScore = score(lane);
}

const bands = { execute_now: [], develop: [], hold: [] };
for (const lane of evidence.lanes) bands[lane.band].push(lane);
assert(bands.execute_now.length === 5, "execute-now band must contain five lanes");
assert(bands.develop.length === 5, "develop band must contain five lanes");
assert(bands.hold.length === 4, "hold band must contain four lanes");
assert(Math.min(...bands.execute_now.map(score)) >= 14, "execute-now floor changed");
assert(Math.max(...bands.hold.map(score)) <= 8, "hold-band ceiling changed");

const lexical = evidence.corpusCensus.claimLexicalReach;
assert(lexical.phononicsMaterials < lexical.flavorNeutrino, "sparse-lane diagnostic changed");
assert(lexical.transport < lexical.quantumInformation, "experimental asymmetry diagnostic changed");
assert(evidence.corpusCensus.warning.includes("not evidence strength"), "lexical-count firewall missing");

console.log("PASS wide frontier atlas");
console.log(`  lanes: ${evidence.lanes.length}`);
console.log(`  execute/develop/hold: ${bands.execute_now.length}/${bands.develop.length}/${bands.hold.length}`);
console.log(`  top score: ${Math.max(...evidence.lanes.map(score))}`);
console.log(`  next packets: ${evidence.nextPackets.length}`);
console.log(`  iteration-one completed packets: ${evidence.iterationOne.completed.length}`);
console.log(`  iteration-two completed packets: ${evidence.iterationTwo.completed.length}`);

