import fs from "node:fs";

const ledger = JSON.parse(fs.readFileSync(
  "corpus/programmes/frontier/wave-7/relation_physical_bridge_ledger_v1.json", "utf8",
));
if (ledger.schema !== "relation-physical-bridge-ledger/1") throw new Error("unexpected schema");
if (ledger.stages.length !== 9) throw new Error("expected nine bridge stages");
const byId = new Map(ledger.stages.map((stage) => [stage.id, stage]));
for (const id of [
  "formal_operator_assignment", "five_modality_composition", "split_lattice_carrier",
  "natural_positive_split_intertwiner", "natural_operator_dynamics", "qr003_wall",
  "abstract_detector", "hermitian_physical_completion", "experiment",
]) if (!byId.has(id)) throw new Error(`missing stage ${id}`);
if (byId.get("formal_operator_assignment").state !== "filled") throw new Error("formal operator stage should be filled");
if (byId.get("natural_positive_split_intertwiner").state !== "ruled_out") throw new Error("intertwiner no-go missing");
if (!byId.get("natural_operator_dynamics").result.includes("dimension 198")) throw new Error("dynamics anchor missing");
if (!byId.get("abstract_detector").result.includes("rank 23")) throw new Error("detector anchor missing");
if (!ledger.stages.every((stage) => stage.result && stage.boundary)) throw new Error("every stage requires result and boundary");

console.log(JSON.stringify({
  result: "pass",
  stages: ledger.stages.length,
  states: Object.fromEntries(ledger.stages.map((stage) => [stage.id, stage.state])),
  terminalVerdict: ledger.terminalVerdict,
}, null, 2));
