import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lane = path.join(root, "corpus", "programmes", "randall-warped-geometry");
const register = JSON.parse(fs.readFileSync(path.join(lane, "randall_programme_map_v1.json"), "utf8"));

assert.equal(register.schemaVersion, "randall-warped-geometry-programme-v1");
assert.equal(register.promptSource.role, "retrieval_prompt_only");
assert(register.branches.length >= 8);
assert(register.refusedInferences.length >= 5);
assert(register.researchGates.length >= 5);
assert(register.authorityBoundary.length > 120);

const ids = new Set();
for (const branch of register.branches) {
  assert(!ids.has(branch.id), `duplicate ${branch.id}`);
  ids.add(branch.id);
  for (const key of ["name", "carrier", "selector", "retainedRecord", "corpusDistance", "status"]) {
    assert(branch[key]?.length > 10, `${branch.id} missing ${key}`);
  }
  assert(branch.primarySources.length > 0, `${branch.id} lacks primary sources`);
  for (const source of branch.primarySources) assert(/^https:\/\/(?:arxiv\.org|atlas\.cern)/.test(source), `${branch.id} non-primary source ${source}`);
}

for (const document of register.documents) {
  assert(fs.existsSync(path.join(lane, document)), `missing ${document}`);
}

const hierarchy = 16 * Math.log(10);
assert(Math.abs(hierarchy - 36.8413614879) < 1e-9);
assert(Math.abs(Math.exp(-hierarchy) - 1e-16) < 1e-28);
assert(Math.abs(Math.exp(-2 * hierarchy) - 1e-32) < 1e-44);

const spinFace = fs.readFileSync(path.join(lane, "03_karch_randall_spin23_face.md"), "utf8");
assert(spinFace.includes("Spin_0(2,4)\\supset Spin_0(2,3)\\supset Spin_0(1,3)"));
assert(/carrier map is not yet known/i.test(spinFace));

const proposal = fs.readFileSync(path.join(lane, "08_proposal_letter_and_email.md"), "utf8");
assert(/unsent draft/i.test(proposal));
assert(/not\*?\s*claiming/i.test(proposal));
assert(/positive:[\s\S]*negative:[\s\S]*conditional:/i.test(proposal));

console.log("PASS Randall warped-geometry programme");
console.log(`branches=${register.branches.length}`);
console.log(`documents=${register.documents.length}`);
console.log(`kL=${hierarchy.toFixed(6)} warp=${Math.exp(-hierarchy).toExponential(1)}`);
