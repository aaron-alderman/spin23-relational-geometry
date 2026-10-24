import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lane = "corpus/programmes/frontier-physics-targets";
const atlas = JSON.parse(fs.readFileSync(path.join(root, lane, "frontier_experiment_atlas_v1.json"), "utf8"));
const detectors = JSON.parse(fs.readFileSync(path.join(root, lane, "detector_frontier_register_v1.json"), "utf8"));
const topics = JSON.parse(fs.readFileSync(path.join(root, lane, "open_topics_register_v1.json"), "utf8"));
const failures = [];
const areaIds = new Set(detectors.frontierAreas.map((area) => area.id));
const detectorIds = new Set(detectors.detectors.map((detector) => detector.id));
const topicIds = new Set(topics.topics.map((topic) => topic.id));
const requiredText = ["title", "mode", "readiness", "estimate", "platform", "hypothesis", "analysis", "success", "nullValue", "stopRule"];
const requiredLists = ["intervention", "record", "controls", "topicIds", "detectorIds"];

if (atlas.schema !== "frontier.experiment-atlas/1") failures.push(`Unexpected schema ${atlas.schema}`);
if (atlas.experiments.length !== areaIds.size) failures.push(`${atlas.experiments.length} experiments for ${areaIds.size} frontier areas`);
const seenExperiments = new Set(), seenAreas = new Set(), coveredTopics = new Set(), coveredDetectors = new Set();

for (const experiment of atlas.experiments) {
  if (seenExperiments.has(experiment.id)) failures.push(`Duplicate experiment ${experiment.id}`);
  seenExperiments.add(experiment.id);
  if (!areaIds.has(experiment.frontierAreaId)) failures.push(`${experiment.id}: unknown area ${experiment.frontierAreaId}`);
  if (seenAreas.has(experiment.frontierAreaId)) failures.push(`Multiple experiments for ${experiment.frontierAreaId}`);
  seenAreas.add(experiment.frontierAreaId);
  for (const key of requiredText) if (typeof experiment[key] !== "string" || !experiment[key].trim()) failures.push(`${experiment.id}: missing ${key}`);
  for (const key of requiredLists) if (!Array.isArray(experiment[key]) || !experiment[key].length) failures.push(`${experiment.id}: missing ${key}`);
  if ((experiment.intervention?.length ?? 0) < 3 || (experiment.record?.length ?? 0) < 3 || (experiment.controls?.length ?? 0) < 3) failures.push(`${experiment.id}: protocol lacks intervention/record/control depth`);
  for (const id of experiment.topicIds ?? []) {
    coveredTopics.add(id);
    if (!topicIds.has(id)) failures.push(`${experiment.id}: unknown topic ${id}`);
  }
  for (const id of experiment.detectorIds ?? []) {
    coveredDetectors.add(id);
    if (!detectorIds.has(id)) failures.push(`${experiment.id}: unknown detector ${id}`);
  }
  const expectedTopics = topics.topics.filter((topic) => topic.frontierAreaIds.includes(experiment.frontierAreaId)).map((topic) => topic.id).sort();
  const expectedDetectors = detectors.detectors.filter((detector) => detector.frontierAreaIds.includes(experiment.frontierAreaId)).map((detector) => detector.id).sort();
  if (JSON.stringify([...experiment.topicIds].sort()) !== JSON.stringify(expectedTopics)) failures.push(`${experiment.id}: topic crosswalk drift`);
  if (JSON.stringify([...experiment.detectorIds].sort()) !== JSON.stringify(expectedDetectors)) failures.push(`${experiment.id}: detector crosswalk drift`);
  for (const url of experiment.precedents ?? []) if (!/^https:\/\//.test(url)) failures.push(`${experiment.id}: malformed precedent ${url}`);
}

for (const id of areaIds) if (!seenAreas.has(id)) failures.push(`Uncovered frontier area ${id}`);
for (const id of topicIds) if (!coveredTopics.has(id)) failures.push(`Uncovered topic ${id}`);
for (const id of detectorIds) if (!coveredDetectors.has(id)) failures.push(`Uncovered detector ${id}`);
for (const id of ["EX-019", "EX-020"]) {
  const experiment = atlas.experiments.find((item) => item.id === id);
  if (!experiment?.readiness.includes("conditional")) failures.push(`${id}: fundamental frontier is not marked conditional`);
}

if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}

const modes = Object.fromEntries([...atlas.experiments.reduce((map, experiment) => map.set(experiment.mode, (map.get(experiment.mode) ?? 0) + 1), new Map())].sort());
console.log(JSON.stringify({ result: "pass", experiments: atlas.experiments.length, frontierAreas: `${seenAreas.size}/${areaIds.size}`, topics: `${coveredTopics.size}/${topicIds.size}`, detectors: `${coveredDetectors.size}/${detectorIds.size}`, modes, fundamentalFirewallsConditional: true }, null, 2));
