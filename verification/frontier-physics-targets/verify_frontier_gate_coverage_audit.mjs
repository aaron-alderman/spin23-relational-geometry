import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const audit = read("corpus/programmes/frontier-physics-targets/frontier_gate_coverage_audit_v1.json");
const topics = read("corpus/programmes/frontier-physics-targets/open_topics_register_v1.json");
const topicIds = new Set(topics.topics.map((t) => t.id));
const allowed = new Set(["live", "superseded", "closed"]);
const failures = [];

if (audit.gates.length !== 57) failures.push(`expected 57 AZ gates, found ${audit.gates.length}`);
const ids = new Set();
for (let n = 1; n <= 57; n += 1) {
  const id = `AZ-${String(n).padStart(3, "0")}`;
  if (!audit.gates.some((g) => g.id === id)) failures.push(`missing ${id}`);
}
for (const gate of audit.gates) {
  if (ids.has(gate.id)) failures.push(`duplicate ${gate.id}`);
  ids.add(gate.id);
  if (!allowed.has(gate.status)) failures.push(`${gate.id}: invalid status ${gate.status}`);
  if (!gate.sourceRef || !fs.existsSync(path.join(root, gate.sourceRef))) failures.push(`${gate.id}: missing sourceRef`);
  if (!gate.note) failures.push(`${gate.id}: missing note`);
  if (gate.status !== "closed" && (!Array.isArray(gate.topicIds) || gate.topicIds.length === 0)) failures.push(`${gate.id}: unowned residual gate`);
  for (const id of gate.topicIds ?? []) if (!topicIds.has(id)) failures.push(`${gate.id}: unknown topic ${id}`);
  if (gate.resolutionRef && !fs.existsSync(path.join(root, gate.resolutionRef))) failures.push(`${gate.id}: missing resolutionRef`);
}
if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}
const statusCounts = Object.fromEntries([...allowed].map((s) => [s, audit.gates.filter((g) => g.status === s).length]));
console.log(JSON.stringify({ result: "pass", gates: audit.gates.length, statusCounts, orphaned: 0 }, null, 2));
