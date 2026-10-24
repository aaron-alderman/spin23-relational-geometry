import assert from "node:assert/strict";
import fs from "node:fs";

const fixture = JSON.parse(fs.readFileSync(
  "integrations/sourcery/mcp-admission/scientific-derivation-composer/admissibility-vertical-slices-v1.json", "utf8"));

function search(slice) {
  const objects = new Set(slice.objects);
  assert.equal(objects.size, slice.objects.length);
  for (const rule of slice.transformations) {
    assert(objects.has(rule.from) && objects.has(rule.to));
    assert(rule.assumptions.length > 0 && rule.evidenceRefs.length > 0);
    if (rule.kind === "projection") assert(rule.losses.length > 0);
    if (!rule.admitted) assert(rule.refusal);
  }
  let frontier = [{current: slice.query.source, steps: []}];
  const accepted = [];
  for (let depth = 0; depth < slice.query.maxDepth; depth += 1) {
    const next = [];
    for (const path of frontier) {
      for (const rule of slice.transformations) {
        if (rule.admitted && rule.from === path.current) {
          const extension = {current: rule.to, steps: [...path.steps, rule.id]};
          if (extension.current === slice.query.target) accepted.push(extension);
          else next.push(extension);
        }
      }
    }
    frontier = next;
  }
  return accepted;
}

assert.equal(fixture.protocol, "admissibility-vertical-slices/1");
assert.deepEqual(fixture.authority, {proposalOnly:true, entails:false, empiricalAuthority:false, applicationAdmission:false});
const f05 = fixture.slices.find((slice) => slice.id.startsWith("F05"));
const f01 = fixture.slices.find((slice) => slice.id.startsWith("F01"));
const f05Paths = search(f05);
const f01Paths = search(f01);
assert.deepEqual(f05Paths.map((path) => path.steps), [[
  "wall-localizes-response", "integrate-positive-fluctuation", "gradient-return-step"
]]);
assert.equal(f01Paths.length, 0);
const blocked = f01.transformations.find((rule) => rule.id === "forbidden-orientation-promotion");
assert(blocked && !blocked.admitted && blocked.refusal.includes("no orientation"));
assert.deepEqual(f05.interfaceCoordinates, ["A03", "A04"]);
assert.deepEqual(f01.interfaceCoordinates, ["A02"]);
assert.equal(f01.outsideInterfaceNode, "QS-008");
for (const ratio of [0.01, 0.25, 0.5, 0.99]) assert(Math.abs(1 - 2 * ratio) < 1);

console.log(JSON.stringify({
  status: "PASS",
  F05: {candidateCount: f05Paths.length, steps: f05Paths[0].steps, interface: f05.interfaceCoordinates},
  F01: {candidateCount: 0, refusal: blocked.id, reason: blocked.refusal, interface: f01.interfaceCoordinates, outsideInterfaceNode: f01.outsideInterfaceNode}
}, null, 2));
