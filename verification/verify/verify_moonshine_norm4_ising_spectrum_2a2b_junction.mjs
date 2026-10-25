import assert from "node:assert/strict";
import fs from "node:fs";

const path=new URL("../../evidence/data/moonshine-norm4-ising-spectrum-2a2b-junction-v1.json",import.meta.url);
const r=JSON.parse(fs.readFileSync(path,"utf8"));
assert.equal(r.schemaVersion,"moonshine-norm4-ising-spectrum-2a2b-junction-v1");
const ground=4096;
const pHalf=ground/2;
const spectrum=new Map(r.twistedZeroMode.spectrum.map(x=>[x.weight,x.multiplicity]));
assert.equal(spectrum.get("0"),23*pHalf);
assert.equal(spectrum.get("1/2"),pHalf);
assert.equal(spectrum.get("1/16"),24*pHalf);
assert.equal([...spectrum.values()].reduce((a,b)=>a+b,0),24*ground);
const moments=(power)=>[...spectrum].reduce((sum,[value,multiplicity])=>sum+(Number(value.includes("/")?value.split("/")[0]/value.split("/")[1]:value)**power)*multiplicity,0);
assert.equal(moments(1),r.twistedZeroMode.trace);
assert.equal(moments(2),r.twistedZeroMode.traceSquare);
assert.equal(moments(3),r.twistedZeroMode.traceCube);

// Q has eigenvalues 4 (parallel) and 0 (23 perpendicular directions).
// P has eigenvalues p=+/-1 with equal 2048-dimensional multiplicity.
const eigen=(q,p,sign)=>(q+1/2)/16+sign*p*(1-2*q)/32;
for(const sign of [1,-1]){
  const values=[];
  for(const p of [1,-1]){values.push({q:4,p,value:eigen(4,p,sign),multiplicity:pHalf});values.push({q:0,p,value:eigen(0,p,sign),multiplicity:23*pHalf});}
  const grouped=new Map();for(const x of values)grouped.set(x.value,(grouped.get(x.value)||0)+x.multiplicity);
  assert.equal(grouped.get(0),spectrum.get("0"));
  assert.equal(grouped.get(1/2),spectrum.get("1/2"));
  assert.equal(grouped.get(1/16),spectrum.get("1/16"));
}

// The Miyamoto involution is -1 on weight 1/16 and +1 on weights 0,1/2.
const tauTrace=spectrum.get("0")+spectrum.get("1/2")-spectrum.get("1/16");
assert.equal(tauTrace,0);
assert.equal(r.miyamotoJunction.twistedTraceEach2A,tauTrace);
assert.match(r.miyamotoJunction.productOnTwisted,/-I=z/);
assert.match(r.miyamotoJunction.productOnUntwisted,/\+I/);
assert.equal(r.executableScope.markedAxes,2*r.executableScope.fromMinimalSeeds);
assert.equal(r.executableScope.spectralChecks,3*r.executableScope.markedAxes);
assert.equal(r.executableScope.junctionChecks,r.executableScope.fromMinimalSeeds);

console.log(JSON.stringify({status:"PASS",markedIsingAxes:r.executableScope.markedAxes,spectrum:r.twistedZeroMode.spectrum,traceMoments:{trace:r.twistedZeroMode.trace,traceSquare:r.twistedZeroMode.traceSquare,traceCube:r.twistedZeroMode.traceCube},miyamotoTraceOnTwisted:tauTrace,junction:r.miyamotoJunction.kleinFourType,junctionChecks:r.executableScope.junctionChecks,boundary:r.laboratoryBoundary}));
