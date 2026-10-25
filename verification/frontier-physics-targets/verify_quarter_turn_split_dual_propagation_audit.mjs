import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const audit = JSON.parse(readFileSync(new URL("corpus/programmes/frontier-physics-targets/quarter_turn_split_dual_propagation_audit_v1.json", root), "utf8"));
const digest = value => createHash("sha256").update(value).digest("hex");
const recalculated = digest(audit.candidates.map(item => {
  const text = readFileSync(new URL(item.path, root), "utf8").replaceAll("\r\n", "\n");
  assert.equal(digest(text), item.sha256, `stale digest ${item.path}`);
  return `${item.path}:${item.sha256}`;
}).join("\n"));

assert.equal(recalculated, audit.sourceDigest);
assert.equal(audit.summary.unclassified, 0);
assert.equal(audit.decision.claimipediaSourceNativeCellClosed, true);
assert.equal(audit.decision.crossCarrierIntertwinerClosed, false);
assert.equal(audit.decision.physicalActionClosed, false);
assert.equal(audit.landmarks.length, 6);
for (const expected of [
  "902_the_product_of_furey_handle_and_higgs_channel_gradings",
  "916_the_neutral_peirce_to_selector_intertwiner",
  "981_the_fourier_and_handle_forms_define_a_split_quaternionic",
  "969_the_graded_sideband_interface",
  "983_a_single_imaginary_quadrature_symplectic_transvection",
  "1505_the_real_completed_two_path_geometry"
]) assert(audit.landmarks.some(item => item.path.includes(expected)), `missing landmark ${expected}`);

console.log(JSON.stringify({ result: "pass", candidates: audit.summary.candidates, categories: audit.summary.categories, landmarks: audit.landmarks.length, sourceDigest: audit.sourceDigest }, null, 2));
