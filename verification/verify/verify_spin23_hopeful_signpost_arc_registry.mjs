import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const protocol = JSON.parse(readFileSync(path.join(root, "evidence/data/claimipedia-speculative-ansatz-playground.json"), "utf8"));
const data = JSON.parse(readFileSync(path.join(root, "evidence/data/spin23-hopeful-signpost-arc-registry.json"), "utf8"));

assert.equal(data.documentId, 1468);
assert.equal(data.status, "speculative-research-queue-not-evidence");
assert.equal(data.physicalAdmissionChanged, false);
assert.ok(data.arcs.length >= 8);

const required = new Set(protocol.requiredFields);
const ids = new Set();
for (const arc of data.arcs) {
  for (const field of required) assert.ok(Object.hasOwn(arc, field), `${arc.id}: ${field}`);
  assert.ok(Array.isArray(arc.formalTargets));
  assert.ok(arc.formalTargets.length >= protocol.formalizationMinimum);
  assert.ok(Array.isArray(arc.namedCorpusGate) && arc.namedCorpusGate.length >= 1);
  assert.equal(arc.epistemicWeight, "none");
  assert.ok(arc.cheapestKillTest.length > 20);
  assert.ok(arc.negativeControl.length > 20);
  assert.ok(arc.failureValue.length > 20);
  assert.ok(!ids.has(arc.id), `duplicate arc ${arc.id}`);
  ids.add(arc.id);
}

assert.deepEqual(new Set(data.priorityOrder), ids);
assert.equal(data.priorityOrder[0], "translation-without-collapse");

console.log(`PASS 1468: ${data.arcs.length} speculative Spin(2,3) arcs have two formalizations, a named gate, a minimal ansatz, a kill test, a negative control and zero evidential weight.`);
