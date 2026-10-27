import fs from "node:fs";

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const readText = (path) => fs.readFileSync(path, "utf8");
const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};

const evidencePath = "evidence/data/oph-record-law-reproduction-v1.json";
const bridgePath = "corpus/programmes/observer-patch-holography/oph_bridge_matrix_v1.json";
const lanePath = "corpus/programmes/observer-patch-holography/README.md";
const programmePath = "corpus/programmes/observer-patch-holography/oph_record_law_executable_programme_v1.md";
const geometryPath = "corpus/programmes/observer-patch-holography/oph_channel_geometry_and_local_closure_v1.md";
const literaturePath = "corpus/programmes/observer-patch-holography/oph_literature_frontier_and_emulator_v1.md";
const independentReferencePath = "corpus/programmes/observer-patch-holography/oph_independent_reference_emulator_v1.md";
const synthesisPath = "corpus/syntheses/the_admissibility_frontier_current_synthesis.md";
const chapterPath = "book/edition-3/chapters/08-admissibility-frontier.md";
const detectorPath = "corpus/programmes/frontier-physics-targets/detector_frontier_register_v1.json";
const topicPath = "corpus/programmes/frontier-physics-targets/open_topics_register_v1.json";

const evidence = readJson(evidencePath);
const bridge = readJson(bridgePath);
const detectors = readJson(detectorPath);
const topics = readJson(topicPath);

requireCondition(evidence.schema === "spin23.oph-record-law-reproduction/v1", "bad evidence schema");
requireCondition(evidence.source.commit === bridge.sourceCommit, "source commit mismatch");
for (const [path, hash] of Object.entries(evidence.source.files)) {
  requireCondition(path.startsWith("model/record_laws/"), `unexpected upstream path ${path}`);
  requireCondition(/^[0-9a-f]{64}$/u.test(hash), `bad upstream hash ${path}`);
}
requireCondition(evidence.runs.length === 5, "expected five reproduction runs");
requireCondition(evidence.runs.every((run) => run.exitCode === 0), "nonpassing reproduction run");
requireCondition(evidence.runs.some((run) => String(run.result).includes("36 passed")), "focused tests not retained");
requireCondition(evidence.runs.some((run) => String(run.result).includes("1275 model artifacts")), "artifact verification not retained");
const burnIn = evidence.runs.find((run) => typeof run.result === "object");
requireCondition(burnIn?.result?.exact_replay === true, "burn-in exact replay missing");
requireCondition(burnIn?.result?.physical_law_selected === false, "physical-law nonselection boundary missing");

requireCondition(bridge.schema === "spin23.oph-bridge-matrix/v1", "bad bridge schema");
requireCondition(bridge.rows.length === 12, "expected twelve bridge rows");
requireCondition(new Set(bridge.rows.map((row) => row.id)).size === 12, "duplicate bridge row");
requireCondition(bridge.summary.canonicalH2R === false, "H2(R) boundary lost");
requireCondition(bridge.summary.spin23Derived === false, "Spin(2,3) boundary lost");
requireCondition(bridge.summary.physicalRecordLawSelected === false, "record-law selection boundary lost");

const detector = detectors.detectors.find(({ id }) => id === "DET-039");
const topic = topics.topics.find(({ id }) => id === "OT-054");
const emulatorTopic = topics.topics.find(({ id }) => id === "OT-055");
requireCondition(detector, "DET-039 missing");
requireCondition(topic, "OT-054 missing");
requireCondition(emulatorTopic, "OT-055 missing");
requireCondition(topic.detectorIds.includes("DET-039"), "OT-054 does not use DET-039");
requireCondition(emulatorTopic.detectorIds.includes("DET-039"), "OT-055 does not use DET-039");
requireCondition(detector.sourceRefs.includes(lanePath), "DET-039 does not cite OPH lane");
requireCondition(detector.sourceRefs.includes(geometryPath), "DET-039 does not cite executed geometry");
requireCondition(topic.status === "closed" && topic.closureEvidence === geometryPath, "OT-054 closure mismatch");
requireCondition(emulatorTopic.status === "active" && emulatorTopic.progressEvidence === independentReferencePath, "OT-055 progress mismatch");

for (const path of [lanePath, programmePath, synthesisPath, chapterPath]) {
  const text = readText(path);
  requireCondition(
    /physical_law_selected|physical record law|physical law|selects none of the record laws|which mechanism nature uses/u.test(text),
    `${path}: missing selection boundary`,
  );
  requireCondition(/H_2\(R\)|H_2\(\\mathbb\{R\}\)|H₂\((?:R|ℝ)\)/u.test(text), `${path}: missing H2 gate`);
  requireCondition(/Spin|sp\(4,R\)/u.test(text), `${path}: missing Spin/Lie boundary`);
}

console.log(JSON.stringify({
  result: "pass",
  sourceCommit: evidence.source.commit,
  reproducedRuns: evidence.runs.length,
  focusedTests: 36,
  verifiedArtifacts: 1275,
  bridgeRows: bridge.rows.length,
  detector: detector.id,
  closedTopic: topic.id,
  openTopic: emulatorTopic.id,
  physicalLawSelected: false,
  canonicalH2R: false,
  spin23Derived: false
}, null, 2));
