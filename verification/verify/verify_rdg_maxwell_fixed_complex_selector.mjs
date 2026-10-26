import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(new URL("../../evidence/data/rdg-maxwell-fixed-complex-selector-v1.json", import.meta.url),"utf8"));
assert.equal(record.schemaVersion,"rdg-maxwell-fixed-complex-selector-v1");
assert.deepEqual(record.carrier.cochainDimensions,{C0:8,C1:24,C2:24,C3:8});
assert.deepEqual(record.carrier.differentialRanks,[7,14,7]);
assert.deepEqual(record.carrier.bettiNumbers,[1,3,3,1]);
assert.deepEqual(record.carrier.chainResiduals,{d1d0:0,d2d1:0});
assert.ok(record.selector.projectorResiduals.every(value => value === 0));
assert.ok(record.selector.chainCommutatorResiduals.every(value => value === 0));
assert.ok(record.selector.defectChainCommutatorResiduals.every(value => value === 0));
assert.deepEqual(record.selector.admittedSubcomplex.betti,[1,3,3,1]);
assert.deepEqual(record.selector.defectSubcomplex.betti,[0,0,0,0]);
assert.deepEqual(record.gaugeAndTopology.harmonicCurlResiduals,[0,0,0]);
assert.equal(record.gaugeAndTopology.rankD0WithHarmonicGenerators-record.gaugeAndTopology.rankD0,3);
assert.ok(record.untypedSelectorCounterexample.chainCommutatorRanks.every(value => value > 0));
assert.ok(record.untypedSelectorCounterexample.manufacturedCurvatureMaxAbs > 0);
assert.ok(record.dynamicTransport.chainCommutatorResiduals.every(value => value === 0));
assert.deepEqual(record.topologyChange.periodicTorusBetti,[1,3,3,1]);
assert.deepEqual(record.topologyChange.contractibleThreeSimplexBetti,[1,0,0,0]);
assert.match(record.verdict,/Haar projection alone is insufficient/);

console.log(JSON.stringify({
  status:"PASS",
  complex:"2x2x2 periodic cubical cochains",
  ranks:record.carrier.differentialRanks,
  betti:record.carrier.bettiNumbers,
  selector:"translation Haar projector commutes with d",
  counterexample:"component selector manufactures curvature from pure gauge",
  transport:"translation chain map passes",
  topology:"three Wilson and three flux sectors disappear under contraction",
}));
