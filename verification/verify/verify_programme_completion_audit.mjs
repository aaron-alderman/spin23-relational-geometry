import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { resolveCorpusPath } from "./corpus_path_resolver.mjs";

const root = process.cwd();
const audit = JSON.parse(fs.readFileSync(path.join(root, "corpus", "registers", "programme", "programme_completion_audit.json"), "utf8"));
assert.equal(audit.schema_version, 1);
assert.equal(audit.selected_terminal_endpoint, "b");
assert(audit.requirements.length >= 13);
const allowed = new Set(["satisfied", "satisfied_with_qualification", "satisfied_as_split_verdict", "negative_result_established", "satisfied_at_the_claimed_structural_scope"]);
const ids = new Set();
for (const req of audit.requirements) {
  assert(!ids.has(req.id), `duplicate ${req.id}`); ids.add(req.id);
  assert(allowed.has(req.result), `unresolved result on ${req.id}: ${req.result}`);
  assert(req.evidence.length > 0, `no evidence for ${req.id}`);
  for (const file of req.evidence) assert(fs.existsSync(resolveCorpusPath(root, file)), `${req.id} missing ${file}`);
}
console.log("PASS programme completion audit");
console.log(`requirements=${audit.requirements.length}`);
console.log(`endpoint=${audit.selected_terminal_endpoint}`);
console.log("unresolved_audit_items=0");
