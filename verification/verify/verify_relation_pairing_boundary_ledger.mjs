import fs from "node:fs";

const ledger = JSON.parse(fs.readFileSync(
  "corpus/programmes/frontier/wave-7/relation_pairing_boundary_ledger_v1.json", "utf8",
));

if (ledger.schema !== "relation-pairing-boundary-ledger/1") throw new Error("unexpected ledger schema");
if (ledger.boundaries.length !== 10) throw new Error("expected ten audited boundaries");
const byId = new Map(ledger.boundaries.map((entry) => [entry.id, entry]));
for (const id of [
  "full_carrier_nondegeneracy", "type_pairing", "positivity", "discriminant_and_glue",
  "code_distance", "cubic_closure", "golay_tensor_translation", "dynamics", "detector",
  "exceptional_completion",
]) if (!byId.has(id)) throw new Error(`missing boundary ${id}`);

if (byId.get("type_pairing").state !== "filled") throw new Error("type pairing must be filled");
if (!byId.get("discriminant_and_glue").derived.includes("determinant 64")) throw new Error("missing determinant anchor");
if (!byId.get("code_distance").derived.includes("[24,12,2]")) throw new Error("missing code-distance anchor");
if (!byId.get("full_carrier_nondegeneracy").open.includes("QR-003")) throw new Error("missing common radical anchor");
if (byId.get("detector").state !== "unfilled") throw new Error("detector boundary must remain open");
if (!ledger.boundaries.every((entry) => entry.derived && entry.open && entry.reopen)) {
  throw new Error("every boundary needs derived, open, and reopen clauses");
}

console.log(JSON.stringify({
  result: "pass",
  boundaries: ledger.boundaries.length,
  states: Object.fromEntries(ledger.boundaries.map((entry) => [entry.id, entry.state])),
  verdict: ledger.verdict,
}, null, 2));
