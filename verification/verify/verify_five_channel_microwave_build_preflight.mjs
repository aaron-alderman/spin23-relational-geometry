import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL("../../corpus/programmes/frontier/wave-7/five_channel_microwave_build_preflight_v1.json", import.meta.url);
const x = JSON.parse(fs.readFileSync(path));
const near = (a,b,e=1e-12) => Math.abs(a-b)<e;

assert.equal(x.topology.channels,5);
assert.equal(x.topology.phaseLayers,x.topology.channels+1);
assert.equal(x.topology.fixedMixingLayers,x.topology.phaseLayers+1);
assert.equal(x.topology.totalPhaseElements,x.topology.channels*x.topology.phaseLayers);
assert.equal(x.topology.dutInputPorts+x.topology.dutOutputPorts,10);

const halfStep=x.componentAnchor.phaseStepDegrees*Math.PI/180/2;
assert.ok(near(x.componentAnchor.halfStepRadians,halfStep));
assert.ok(near(x.componentAnchor.phaseLayersWorstCaseRadians,halfStep*x.topology.phaseLayers));
assert.equal(x.componentAnchor.phasePathLossDb,x.componentAnchor.packagedPhaseElementLossDb*x.topology.phaseLayers);

const b=x.directionalErrorBudget;
const terms=b.discreteCompilation+b.amplitudeImbalance+b.deembedding+b.drift+b.noiseAndLeakage+b.contingency;
assert.ok(near(terms,b.totalPerDirection));
assert.ok(near(2*b.totalPerDirection,b.twoDirectionTotal));
assert.ok(near(2-2*b.twoDirectionTotal,b.guaranteedSignedResidualMargin));
assert.ok(b.guaranteedSignedResidualMargin>1.5);

assert.ok(x.compileGate.targets.includes("H"));
assert.ok(x.compileGate.targets.includes("S_plus"));
assert.equal(x.measurementGates.firstMatrix,"H");
assert.equal(x.measurementGates.requiresUnnormalizedComplexRecord,true);
assert.equal(x.measurementGates.requiresReferenceThrough,true);
assert.equal(x.measurementGates.allowsDistributedGainInCore,false);

console.log(JSON.stringify({
  status:"PASS",
  topology:x.topology,
  componentRisk:{phasePathLossDb:x.componentAnchor.phasePathLossDb,naiveWorstCasePhaseRadians:x.componentAnchor.phaseLayersWorstCaseRadians},
  compileGate:x.compileGate,
  errorBudget:{perDirection:b.totalPerDirection,twoDirection:b.twoDirectionTotal,guaranteedSignedResidualMargin:b.guaranteedSignedResidualMargin},
  verdict:"the BOM and branch margin are internally consistent; measured-F discrete compilation is the remaining pre-purchase gate"
}));

