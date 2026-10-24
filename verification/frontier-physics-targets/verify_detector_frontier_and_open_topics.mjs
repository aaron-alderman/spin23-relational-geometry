import fs from "node:fs";

const read = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const detectorPath = "corpus/programmes/frontier-physics-targets/detector_frontier_register_v1.json";
const topicsPath = "corpus/programmes/frontier-physics-targets/open_topics_register_v1.json";
const targetsPath = "corpus/programmes/frontier-physics-targets/frontier_physics_target_register_v1.json";
const register = read(detectorPath);
const open = read(topicsPath);
const targets = read(targetsPath);

const uniqueIds = (items, prefix, digits, label) => {
  const ids = items.map(({ id }) => id);
  if (new Set(ids).size !== ids.length) throw new Error(`${label}: duplicate id`);
  for (const id of ids) if (!new RegExp(`^${prefix}-\\d{${digits}}$`).test(id)) throw new Error(`${label}: bad id ${id}`);
  return new Set(ids);
};
const areaIds = uniqueIds(register.frontierAreas, "FA", 2, "area");
const detectorIds = uniqueIds(register.detectors, "DET", 3, "detector");
const topicIds = uniqueIds(open.topics, "OT", 3, "topic");
const targetIds = new Set(targets.coreTargets.map(({ id }) => id));
const assertRefs = (values, allowed, context) => {
  if (!Array.isArray(values) || values.length === 0) throw new Error(`${context}: empty refs`);
  for (const value of values) if (!allowed.has(value)) throw new Error(`${context}: unknown ${value}`);
};

for (const detector of register.detectors) {
  if (!register.detectorStatuses.includes(detector.status)) throw new Error(`${detector.id}: bad status`);
  assertRefs(detector.frontierAreaIds, areaIds, detector.id);
  assertRefs(detector.targetIds, targetIds, detector.id);
  if (!detector.records?.length || !detector.controls?.length) throw new Error(`${detector.id}: missing records or controls`);
  for (const ref of detector.sourceRefs ?? []) if (!fs.existsSync(ref)) throw new Error(`${detector.id}: missing source ${ref}`);
}

for (const topic of open.topics) {
  if (!open.statuses.includes(topic.status)) throw new Error(`${topic.id}: bad status`);
  if (!open.priorities.includes(topic.priority)) throw new Error(`${topic.id}: bad priority`);
  assertRefs(topic.frontierAreaIds, areaIds, topic.id);
  assertRefs(topic.targetIds, targetIds, topic.id);
  assertRefs(topic.detectorIds, detectorIds, topic.id);
  for (const dependency of topic.dependencies ?? []) {
    if (!topicIds.has(dependency)) throw new Error(`${topic.id}: unknown dependency ${dependency}`);
    if (dependency === topic.id) throw new Error(`${topic.id}: self dependency`);
  }
  for (const field of ["question", "nextAction", "closure", "killTest"])
    if (!topic[field]?.trim()) throw new Error(`${topic.id}: missing ${field}`);
  if (topic.status === "closed" && (!topic.closureEvidence || !fs.existsSync(topic.closureEvidence)))
    throw new Error(`${topic.id}: closed topic missing closure evidence`);
}

const detectorAreaCoverage = new Set(register.detectors.flatMap(({ frontierAreaIds }) => frontierAreaIds));
const detectorTargetCoverage = new Set(register.detectors.flatMap(({ targetIds }) => targetIds));
const topicAreaCoverage = new Set(open.topics.flatMap(({ frontierAreaIds }) => frontierAreaIds));
const topicTargetCoverage = new Set(open.topics.flatMap(({ targetIds }) => targetIds));
for (const id of areaIds) {
  if (!detectorAreaCoverage.has(id)) throw new Error(`${id}: no detector`);
  if (!topicAreaCoverage.has(id)) throw new Error(`${id}: no open topic`);
}
for (const id of targetIds) {
  if (!detectorTargetCoverage.has(id)) throw new Error(`${id}: no detector`);
  if (!topicTargetCoverage.has(id)) throw new Error(`${id}: no open topic`);
}

const countBy = (items, field) => Object.fromEntries(
  [...Map.groupBy(items, (item) => item[field])].map(([key, values]) => [key, values.length]),
);
console.log(JSON.stringify({
  result: "pass",
  frontierAreas: register.frontierAreas.length,
  detectors: register.detectors.length,
  detectorStatusCounts: countBy(register.detectors, "status"),
  openTopics: open.topics.length,
  topicStatusCounts: countBy(open.topics, "status"),
  topicPriorityCounts: countBy(open.topics, "priority"),
  targetCoverage: `${detectorTargetCoverage.size}/${targetIds.size} detector; ${topicTargetCoverage.size}/${targetIds.size} topic`,
  areaCoverage: `${detectorAreaCoverage.size}/${areaIds.size} detector; ${topicAreaCoverage.size}/${areaIds.size} topic`,
}, null, 2));
