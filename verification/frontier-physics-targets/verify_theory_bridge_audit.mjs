import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const target = "corpus/programmes/frontier-physics-targets/theory_bridge_audit_v1.json";
const audit = JSON.parse(fs.readFileSync(path.join(root, target), "utf8"));
const expansion = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/frontier-physics-targets/physics_math_object_expansion_v1.json"), "utf8"));
const topics = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/frontier-physics-targets/open_topics_register_v1.json"), "utf8"));
const workClasses = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/frontier-physics-targets/theory_bridge_topic_work_classes_v1.json"), "utf8"));
const failures = [];
const digest = relative => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative), "utf8")).digest("hex");

if (audit.schema !== "frontier.theory-bridge-audit/1") failures.push("schema mismatch");
if (audit.authority !== "typed_bridge_accounting_not_new_physical_identification") failures.push("authority boundary drifted");
for (const input of audit.inputs ?? []) {
  if (!fs.existsSync(path.join(root, input.source))) failures.push(`missing input ${input.source}`);
  else if (digest(input.source) !== input.sha256) failures.push(`stale input hash ${input.source}`);
}
const expectedIds = [...expansion.claimFamilyClusters.map(cluster => cluster.id)].sort();
const actualIds = [...(audit.records ?? []).map(record => record.clusterId)].sort();
if (JSON.stringify(expectedIds) !== JSON.stringify(actualIds)) failures.push("bridge cluster universe differs from object expansion");
if (new Set(actualIds).size !== actualIds.length) failures.push("duplicate bridge cluster record");
const expectedTopicIds = [...topics.topics.map(topic => topic.id)].sort();
const classifiedTopicIds = [...workClasses.topics.map(topic => topic.topicId)].sort();
if (JSON.stringify(expectedTopicIds) !== JSON.stringify(classifiedTopicIds)) failures.push("topic work-class universe is incomplete or duplicated");
const declaredClasses = new Set(Object.keys(workClasses.classes ?? {}));
for (const topic of workClasses.topics ?? []) {
  if (!declaredClasses.has(topic.workClass)) failures.push(`${topic.topicId}: unknown work class ${topic.workClass}`);
  if (!topic.reason) failures.push(`${topic.topicId}: missing work-class reason`);
}
if (audit.summary?.coveredObjectFamilyCells !== expansion.summary.objectFamilyCells) failures.push("object-family cell coverage drifted");
for (const record of audit.records ?? []) {
  for (const field of audit.requiredFields ?? []) {
    const value = record[field];
    if (value == null || value === "" || (Array.isArray(value) && !value.length)) failures.push(`${record.id}: missing ${field}`);
  }
  if (!record.independentVerification?.method || !record.independentVerification?.sourceRefs?.length) failures.push(`${record.id}: incomplete independent verification`);
  for (const source of record.independentVerification?.sourceRefs ?? []) if (!fs.existsSync(path.join(root, source))) failures.push(`${record.id}: missing source ${source}`);
  if (!record.counterexampleOrKillTest) failures.push(`${record.id}: missing kill test`);
  if (!record.reopeningTrigger) failures.push(`${record.id}: missing reopening trigger`);
  if (!declaredClasses.has(record.workClassification)) failures.push(`${record.id}: undeclared work classification`);
}
if (audit.summary?.unresolvedStructuralRecords !== 0) failures.push("structural omissions remain");

if (failures.length) {
  console.error(JSON.stringify({ result: "fail", target, failures: failures.slice(0, 100), failureCount: failures.length }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ result: "pass", target, bridgeClusters: actualIds.length, coveredObjectFamilyCells: audit.summary.coveredObjectFamilyCells, workCounts: audit.summary.workCounts }, null, 2));
