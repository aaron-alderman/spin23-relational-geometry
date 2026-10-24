import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { resolveCorpusPath } from "./corpus_path_resolver.mjs";

const root = process.cwd();
const reg = JSON.parse(fs.readFileSync(path.join(root, "corpus", "registers", "programme", "programme_paperworthiness_register.json"), "utf8"));
assert.equal(reg.schema_version, 1);
assert(reg.candidates.length > 0);
const ids = new Set();
const ranks = new Set();
for (const item of reg.candidates) {
  assert(!ids.has(item.id)); ids.add(item.id);
  assert(!ranks.has(item.rank)); ranks.add(item.rank);
  assert(["A", "B", "C"].includes(item.tier));
  for (const key of ["central_claim", "novelty_boundary", "missing_before_submission"]) assert(item[key]?.length > 40, `${item.id} missing ${key}`);
  assert(item.evidence.length >= 2);
  for (const doc of item.evidence) assert(fs.existsSync(resolveCorpusPath(root, doc)), `${item.id} missing ${doc}`);
}
assert.deepEqual([...ranks].sort((a, b) => a - b), Array.from({length: reg.candidates.length}, (_, i) => i + 1));
console.log("PASS programme paperworthiness register");
console.log(`candidates=${reg.candidates.length}`);
console.log(`tier_counts=${JSON.stringify(Object.fromEntries(["A", "B", "C"].map((t) => [t, reg.candidates.filter((x) => x.tier === t).length])))}`);
console.log(`supporting_only_classes=${reg.supporting_only.length}`);
