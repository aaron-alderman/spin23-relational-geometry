import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(readFileSync(path.join(root, "evidence/data/spin23-translation-without-collapse-audit.json"), "utf8"));

assert.equal(data.documentId, 1469);
assert.deepEqual(data.stages, ["JORDAN", "FUREY", "DEFECT", "ACTION", "PORT"]);
assert.equal(data.arrows.length, data.stages.length - 1);
for (let i = 0; i < data.arrows.length; i += 1) {
  assert.equal(data.arrows[i].from, data.stages[i]);
  assert.equal(data.arrows[i].to, data.stages[i + 1]);
}

let packet = new Set(data.candidateInvariants);
for (const stage of data.stages) {
  const supported = new Set(data.stageSupport[stage]);
  packet = new Set([...packet].filter((x) => supported.has(x)));
}
for (const arrow of data.arrows) {
  const preserved = new Set(arrow.preserves);
  packet = new Set([...packet].filter((x) => preserved.has(x)));
}

assert.deepEqual([...packet], data.endToEndPreservedPacket);
assert.equal(packet.size > 0, data.endToEndPacketNonempty);
assert.equal(data.endToEndPacketNonempty, false);
assert.equal(data.spin23Occurrence.atJordanCarrier, true);
assert.equal(data.spin23Occurrence.atPortResponseCompletion, true);
assert.equal(data.spin23Occurrence.transportedThroughEveryDeclaredArrow, false);
assert.ok(data.arrows.filter((arrow) => arrow.freeMapRisk).length >= 3);
assert.equal(data.physicalAdmissionChanged, false);

console.log("PASS 1469: the declared Jordan-Furey-defect-action-port chain transports no nonempty invariant packet end to end; Spin(2,3) currently recurs at endpoints rather than passing functorially through the middle.");
