import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const programme = path.join(root, "corpus/programmes/lattice-subroutine-gravity");
const ledgerPath = path.join(programme, "mece-ledger-v1.json");
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));

const fail = (message) => {
  throw new Error(message);
};

const requiredFiles = [
  "README.md",
  "bridge-assessment.md",
  "corpus-crosswalk.md",
  "genus-two-seam-closure.md",
  "induced-action-preflight.md",
  "cartan-seam-gate.md",
  "thermodynamic-gravity-preflight.md",
  "oriented-seam-modular-line.md",
  "monster-fermionization-bridge.md",
  "literature-review.md",
  "next-steps.md",
  "mece-ledger-v1.json"
];

const requiredEvidence = [
  "evidence/data/lattice-subroutine-gravity-preflight-v1.json",
  "verification/verify/verify_lattice_subroutine_gravity_preflight.mjs"
  ,"evidence/data/lattice-subroutine-genus-two-seam-closure-v1.json"
  ,"verification/verify/verify_lattice_subroutine_genus_two_seam_closure.mjs"
  ,"evidence/data/lattice-subroutine-igusa-seam-completion-v1.json"
  ,"verification/verify/verify_lattice_subroutine_igusa_seam_completion.mjs"
  ,"evidence/data/lattice-subroutine-induced-gravity-preflight-v1.json"
  ,"verification/verify/verify_lattice_subroutine_induced_gravity_preflight.mjs"
  ,"evidence/data/lattice-subroutine-cartan-seam-gate-v1.json"
  ,"verification/verify/verify_lattice_subroutine_cartan_seam_gate.mjs"
  ,"evidence/data/lattice-subroutine-thermodynamic-gravity-preflight-v1.json"
  ,"verification/verify/verify_lattice_subroutine_thermodynamic_gravity_preflight.mjs"
  ,"evidence/data/lattice-subroutine-oriented-seam-modular-line-v1.json"
  ,"verification/verify/verify_lattice_subroutine_oriented_seam_modular_line.mjs"
  ,"evidence/data/lattice-subroutine-monster-fermionization-bridge-v1.json"
  ,"verification/verify/verify_lattice_subroutine_monster_fermionization_bridge.mjs"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(programme, file))) fail(`missing programme file: ${file}`);
}

for (const file of requiredEvidence) {
  if (!fs.existsSync(path.join(root, file))) fail("missing programme evidence: " + file);
}

if (ledger.terminalStatus !== "open") fail("terminal proposition must remain open");

const allowed = new Set(ledger.statusVocabulary);
const laneIds = new Set();
const outputTypes = new Set();
for (const lane of ledger.lanes) {
  if (laneIds.has(lane.id)) fail(`duplicate lane id: ${lane.id}`);
  if (outputTypes.has(lane.outputType)) fail(`non-MECE output type: ${lane.outputType}`);
  if (!allowed.has(lane.status)) fail(`unknown lane status: ${lane.status}`);
  if (!Array.isArray(lane.evidence) || !Array.isArray(lane.openGates)) fail(`untyped lane arrays: ${lane.id}`);
  laneIds.add(lane.id);
  outputTypes.add(lane.outputType);
}

for (const expected of "ABCDEFGHI") {
  if (!laneIds.has(expected)) fail(`missing lane: ${expected}`);
}

const routeIds = new Set();
for (const route of ledger.routes) {
  if (routeIds.has(route.id)) fail(`duplicate route id: ${route.id}`);
  if (!allowed.has(route.status)) fail(`unknown route status: ${route.status}`);
  if (!route.blocker || !route.reopenCondition) fail(`route lacks closure boundary: ${route.id}`);
  for (const lane of route.sequence) {
    if (!laneIds.has(lane)) fail(`route ${route.id} refers to unknown lane ${lane}`);
  }
  routeIds.add(route.id);
}

for (const expected of ["R1", "R2", "R3", "R4", "R5", "R6"]) {
  if (!routeIds.has(expected)) fail(`missing gravity route: ${expected}`);
}

if (ledger.forbiddenPromotions.length < 8) fail("category-error firewall is incomplete");
for (const gate of ledger.nextGates) {
  if (!routeIds.has(gate.route)) fail(`next gate ${gate.id} has unknown route`);
}

const arithmetic = {
  moonshineFirstCoefficient: 196560 + 324,
  expected: 196884,
  leechRank: 24,
  monsterWeightOneCurrents: 0,
  leechWeightOneCurrents: 24
};
if (arithmetic.moonshineFirstCoefficient !== arithmetic.expected) fail("moonshine coefficient check failed");

console.log(JSON.stringify({
  ok: true,
  programme: ledger.programme,
  terminalStatus: ledger.terminalStatus,
  lanes: ledger.lanes.length,
  routes: ledger.routes.length,
  forbiddenPromotions: ledger.forbiddenPromotions.length,
  nextGates: ledger.nextGates.length,
  arithmetic
}, null, 2));
