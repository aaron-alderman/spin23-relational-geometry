import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registerPath = "corpus/programmes/frontier-physics-targets/literature_frontier_search_register_v1.json";
const targetsPath = "corpus/programmes/frontier-physics-targets/frontier_physics_target_register_v1.json";
const register = JSON.parse(fs.readFileSync(path.join(root, registerPath), "utf8"));
const targets = JSON.parse(fs.readFileSync(path.join(root, targetsPath), "utf8"));
const failures = [];

if (register.schema !== "frontier.literature-search-register/1") failures.push("schema mismatch");
if (register.date !== "2026-10-25") failures.push("search date drifted");
if (register.authority !== "dated_search_receipts_and_bounded_novelty_not_scientific_admission") failures.push("authority boundary drifted");
if (!Array.isArray(register.commonProtocol?.databases) || register.commonProtocol.databases.length < 4) failures.push("database protocol incomplete");
const expected = [...targets.coreTargets.map(target => target.id)].sort();
const actual = [...(register.records ?? []).map(record => record.targetId)].sort();
if (JSON.stringify(expected) !== JSON.stringify(actual)) failures.push("target universe incomplete or duplicated");
const labelById = new Map(targets.coreTargets.map(target => [target.id, target.label]));
const required = ["queries","synonyms","neighboringDisciplines","backwardCitationSearch","forwardCitationSearch","strongestSupport","strongestOpposition","presentBounds","conflicts","negativeSearchReceipt","residualNoveltyClaim","updateTrigger"];
for (const record of register.records ?? []) {
  if (record.label !== labelById.get(record.targetId)) failures.push(`${record.targetId}: label drift`);
  for (const field of required) {
    const value = record[field];
    if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) failures.push(`${record.targetId}: missing ${field}`);
  }
  if ((record.queries ?? []).length < 2) failures.push(`${record.targetId}: fewer than two exact queries`);
  if (!record.backwardCitationSearch?.seed?.startsWith("https://")) failures.push(`${record.targetId}: invalid backward seed`);
  if (!record.backwardCitationSearch?.result) failures.push(`${record.targetId}: missing backward result`);
  if (!record.forwardCitationSearch?.query || !record.forwardCitationSearch?.result) failures.push(`${record.targetId}: incomplete forward search`);
  for (const side of ["strongestSupport", "strongestOpposition"]) {
    if (!record[side]?.url?.startsWith("https://") || !record[side]?.finding) failures.push(`${record.targetId}: incomplete ${side}`);
  }
}
if (register.summary?.branches !== expected.length || register.summary?.receiptsComplete !== expected.length || register.summary?.missingReceipts !== 0) failures.push("summary inconsistent");

if (failures.length) {
  console.error(JSON.stringify({result:"fail",target:registerPath,failures},null,2));
  process.exit(1);
}
console.log(JSON.stringify({result:"pass",target:registerPath,branches:actual.length,searchDate:register.date,missingReceipts:0},null,2));
