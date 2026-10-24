import assert from "node:assert/strict";
import fs from "node:fs";

const spec = JSON.parse(fs.readFileSync("corpus/programmes/frontier/wave-7/sourcery_ale_algebra_v1.json", "utf8"));
const slices = JSON.parse(fs.readFileSync("integrations/sourcery/mcp-admission/scientific-derivation-composer/admissibility-vertical-slices-v1.json", "utf8"));

const canonical = (values) => [...new Set(values)].sort();
const compose = (left, right) => ({
  word: [...left.word, ...right.word],
  A: canonical([...left.A, ...right.A]),
  L: canonical([...left.L, ...right.L]),
  E: canonical([...left.E, ...right.E]),
});
const identity = {word:[], A:[], L:[], E:[]};
const edge = (id, A=[], L=[], E=[]) => ({word:[id], A, L, E});

const p = edge("p", ["a1"], ["l1"], ["e1"]);
const q = edge("q", ["a2"], [], ["e2"]);
const r = edge("r", ["a1"], ["l2"], ["e1"]);
assert.deepEqual(compose(compose(p,q),r), compose(p,compose(q,r)));
assert.deepEqual(compose(identity,p), p);
assert.deepEqual(compose(p,identity), p);
assert.deepEqual(compose(p,p), {word:["p","p"], A:["a1"], L:["l1"], E:["e1"]});
assert.notDeepEqual(compose(p,q).word, compose(q,p).word);
assert.deepEqual({...compose(p,q), word:[]}, {...compose(q,p), word:[]});

// The valuation is not cancellative: X join Z = Y join Z while X != Y.
const x = edge("x", ["a"]);
const y = edge("y", ["a","b"]);
const z = edge("z", ["b"]);
assert.notDeepEqual(x.A, y.A);
assert.deepEqual(compose(x,z).A, compose(y,z).A);

// Loss is monotone under every extension.
let route = identity;
for (const step of [p,q,r]) {
  const before = new Set(route.L);
  route = compose(route, step);
  for (const loss of before) assert(route.L.includes(loss));
}

// The closed F05 slice accumulates every assumption, loss and evidence entry.
const f05 = slices.slices.find((slice) => slice.id.startsWith("F05"));
let f05Route = identity;
for (const step of f05.transformations) {
  assert(step.admitted);
  f05Route = compose(f05Route, edge(step.id, step.assumptions, step.losses, step.evidenceRefs));
}
assert.equal(f05Route.word.length, 3);
assert(f05Route.L.includes("orientation sign of the relative angle"));
assert(f05Route.E.length === 3);

// The refused F01 edge never enters the admitted word and cannot be repaired
// by appending another admitted edge.
const f01 = slices.slices.find((slice) => slice.id.startsWith("F01"));
const admitted = f01.transformations.filter((step) => step.admitted);
const refused = f01.transformations.filter((step) => !step.admitted);
assert.equal(refused.length, 1);
let f01Route = identity;
for (const step of admitted) f01Route = compose(f01Route, edge(step.id, step.assumptions, step.losses, step.evidenceRefs));
assert(!f01Route.word.includes(refused[0].id));
assert(f01Route.L.includes("orientation lift"));

assert.equal(spec.classification.valuationAlgebra, "commutative idempotent monoid / finite join-semilattice when token universes are finite");
assert.equal(spec.rejection.noNegativeEdge, true);
assert.deepEqual(spec.authority, {
  proposalOnly:true, entails:false, empiricalAuthority:false, applicationAdmission:false,
  compositionRule:"path composition cannot raise authority above the least-authorized input or the protocol ceiling"
});

console.log(JSON.stringify({
  status:"PASS",
  algebra:"ordered free path + ALE join-semilattice valuation",
  laws:{associative:true, valuationCommutative:true, valuationIdempotent:true, cancellative:false, invertible:false, lossMonotone:true},
  F05:{steps:f05Route.word.length, assumptions:f05Route.A.length, losses:f05Route.L.length, evidence:f05Route.E.length},
  F01:{admittedSteps:f01Route.word.length, refusedEdge:refused[0].id, retainedLoss:"orientation lift"}
}));
