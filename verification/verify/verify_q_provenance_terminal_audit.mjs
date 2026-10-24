import assert from "node:assert/strict";
import fs from "node:fs";

const ledgerPath="corpus/programmes/frontier/wave-7/q_provenance_audit_v1.json";
const wave66="corpus/programmes/frontier/wave-7/frontier_wave7_66_selector_induced_signature23_form.md";
const wave67="corpus/programmes/frontier/wave-7/frontier_wave7_67_q_transport_and_reverse_channel_fork.md";
const wave68="corpus/programmes/frontier/wave-7/frontier_wave7_68_selector_split_fingerprint_and_channel_breaking_gate.md";
const wave69="corpus/programmes/frontier/wave-7/frontier_wave7_69_q_provenance_terminal_synthesis.md";
const ledger=JSON.parse(fs.readFileSync(ledgerPath,"utf8"));
const texts=[wave66,wave67,wave68,wave69].map(p=>fs.readFileSync(p,"utf8"));

assert.equal(ledger.schema,"q-provenance-audit/1");
assert.equal(ledger.antiRetrofit.selectorAndPrimitiveSourcesDate,"2026-10-17");
assert.equal(ledger.antiRetrofit.rectangularSpin23ClosureDate,"2026-10-25");
assert.equal(ledger.sourceNativeChain.length,6);
assert.equal(ledger.sourceNativeChain.at(-1).object,"Q");
assert.equal(ledger.rectangularChannelFork.branches.length,2);
assert.deepEqual(ledger.rectangularChannelFork.branches.map(x=>x.closure),["so(2,3)","so(5)"]);
assert.equal(ledger.transport.authoredIntertwinerFound,false);
assert.equal(ledger.transport.continuousDimension,4);
assert.equal(ledger.selectorSplitFingerprint.invariantCrossHomDimension,0);
assert.ok(ledger.candidateInventory.length>=10);
assert.match(ledger.terminalVerdict.qExistence,/conditionally/);
assert.match(ledger.terminalVerdict.qAdjointPhysicalRule,/not yet/);
for(const text of texts){assert.match(text,/Q/);assert.match(text,/rectangular/i);}
assert.match(texts[0],/predates the target closure/);
assert.ok(texts[1].includes("\\mathfrak{so}(5)"));
assert.ok(texts[1].includes("\\mathfrak{so}(2,3)"));
assert.match(texts[2],/Hom/);
assert.match(texts[3],/Do not search for more five-by-five metrics/);

console.log(JSON.stringify({
  status:"PASS",
  sourceNativeSteps:ledger.sourceNativeChain.length,
  candidateClasses:ledger.candidateInventory.length,
  antiRetrofit:"PASS",
  exactPositiveResult:"selector (J,G0,I) induces Q of signature (2,3) on primitive two-forms",
  exactResidualFork:"+E^T gives so(2,3); -E^T gives so(5)",
  invariantCrossHomDimension:ledger.selectorSplitFingerprint.invariantCrossHomDimension,
  authoredTransportFound:ledger.transport.authoredIntertwinerFound,
  remainingGate:"one calibrated common-carrier intertwiner fixing endpoint identity and reverse-channel phase"
}));
