import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registerPath = path.join(root, "corpus", "programmes", "negative-results", "negative_result_register_v1.json");
const scanPath = path.join(root, "evidence", "data", "negative-result-candidate-scan-v1.json");
const register = JSON.parse(fs.readFileSync(registerPath, "utf8"));
const scan = JSON.parse(fs.readFileSync(scanPath, "utf8"));
const registerDirectory = path.dirname(registerPath);

const classifications = new Set([
  "implementation_failure",
  "conditional_obstruction",
  "structural_no_go",
  "inconclusive_test"
]);
const lifecycles = new Set(["retained", "reopened", "superseded", "disputed", "retracted"]);
const requiredStrings = [
  "id", "title", "date", "classification", "lifecycle", "claimTested", "scope",
  "test", "testAdequacy", "observation", "licensedInference", "reopeningCondition",
  "cheapestReopenDatum", "authorityCeiling"
];
const requiredArrays = ["assumptions", "refusedInferences", "mechanisms", "evidence", "successorIds"];

assert.equal(register.schemaVersion, "negative-result-register-v1");
assert.match(register.status, /admitted seed/i);
assert(register.authorityBoundary.length > 80, "authority boundary must prevent universalization");
assert(register.records.length >= 11, "initial admitted seed unexpectedly small");

const ids = new Set();
const classCounts = Object.fromEntries([...classifications].map((value) => [value, 0]));
for (const record of register.records) {
  for (const key of requiredStrings) assert.equal(typeof record[key], "string", `${record.id ?? "unknown"} missing ${key}`);
  for (const key of requiredArrays) assert(Array.isArray(record[key]), `${record.id} missing ${key}`);
  assert(!ids.has(record.id), `duplicate ${record.id}`);
  ids.add(record.id);
  assert(classifications.has(record.classification), `${record.id} bad classification`);
  assert(lifecycles.has(record.lifecycle), `${record.id} bad lifecycle`);
  classCounts[record.classification] += 1;
  assert(record.claimTested.length > 40, `${record.id} claim too vague`);
  assert(record.scope.length > 30, `${record.id} scope too vague`);
  assert(record.assumptions.length > 0, `${record.id} lacks assumptions`);
  assert(record.refusedInferences.length >= 2, `${record.id} needs at least two refused inferences`);
  assert(record.mechanisms.length > 0, `${record.id} lacks mechanism`);
  assert(record.evidence.length >= 2, `${record.id} lacks triangulated evidence`);
  assert(record.reopeningCondition.length > 40, `${record.id} reopening condition too vague`);
  assert(record.cheapestReopenDatum.length > 20, `${record.id} lacks cheapest reopening datum`);

  for (const evidence of record.evidence) {
    assert(fs.existsSync(path.resolve(registerDirectory, evidence)), `${record.id} missing evidence ${evidence}`);
  }
  for (const evidence of record.repairEvidence ?? []) {
    assert(fs.existsSync(path.resolve(registerDirectory, evidence)), `${record.id} missing repair evidence ${evidence}`);
  }

  if (record.classification === "implementation_failure") {
    assert(/implementation|controller|configuration|scenario|run/i.test(`${record.scope} ${record.test}`), `${record.id} lacks concrete implementation`);
    assert(record.refusedInferences.some((value) => /all|univers|general/i.test(value)), `${record.id} must refuse general refutation`);
  }
  if (record.classification === "conditional_obstruction") {
    assert(record.assumptions.length >= 2, `${record.id} conditional result lacks named assumptions`);
    assert(/add|change|supply|introduce|outside|retain/i.test(record.reopeningCondition), `${record.id} reopening does not alter a condition`);
  }
  if (record.classification === "structural_no_go") {
    assert(/exact|counterexample|rank|non-inject|indistinguishable|superposition/i.test(record.testAdequacy), `${record.id} lacks exact certificate`);
    assert(/add|change|measure|derive|use|target/i.test(record.reopeningCondition), `${record.id} does not change the no-go hypothesis`);
    assert(!/^more (?:precision|samples)$/i.test(record.cheapestReopenDatum), `${record.id} improperly reopens by precision alone`);
  }
  if (record.classification === "inconclusive_test") {
    const refusals = record.refusedInferences.join(" ");
    assert(/inadequate|undecided|missing|cannot/i.test(`${record.testAdequacy} ${record.licensedInference}`), `${record.id} does not declare insufficiency`);
    assert(/will|predicts?|determines?|sample size/i.test(refusals), `${record.id} does not refuse premature decision`);
  }
  if (record.lifecycle === "reopened") {
    assert(record.successorIds.length > 0, `${record.id} reopened without successor route`);
    assert((record.repairEvidence ?? []).length > 0, `${record.id} reopened without repair evidence`);
  }
}

for (const [classification, count] of Object.entries(classCounts)) assert(count > 0, `missing class ${classification}`);

assert.equal(scan.schemaVersion, "negative-result-candidate-scan-v1");
assert.equal(scan.status, "candidate_only_not_admitted");
assert(/Human adjudication/i.test(scan.admissionRule), "candidate scan might imply auto-admission");
assert(scan.scannedDocuments >= scan.matchedDocuments);
assert.equal(scan.retainedCandidates, scan.candidates.length);
for (const candidate of scan.candidates) {
  assert(candidate.path.startsWith("corpus/") && candidate.path.endsWith(".md"), `bad candidate ${candidate.path}`);
  assert(!candidate.path.startsWith("corpus/programmes/negative-results/"), "scan recursively admitted its own lane");
  assert(fs.existsSync(path.join(root, candidate.path)), `missing candidate ${candidate.path}`);
  assert(candidate.score > 0 && candidate.samples.length > 0, `empty candidate ${candidate.path}`);
}

console.log("PASS negative-result register");
console.log(`records=${register.records.length}`);
console.log(`classes=${JSON.stringify(classCounts)}`);
console.log(`candidate_scan=${scan.retainedCandidates}/${scan.matchedDocuments} retained`);
