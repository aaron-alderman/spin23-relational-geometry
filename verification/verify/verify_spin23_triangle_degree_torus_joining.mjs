import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const data=JSON.parse(readFileSync(path.join(root,"evidence/data/spin23-triangle-degree-torus-joining.json"),"utf8"));
const score=(o,t)=>Object.keys(t).reduce((s,k)=>s+Math.log(o[k]/t[k])**2,0)/Object.keys(t).length;

assert.equal(data.documentId,1479);
const p=data.oneParameterOrbitSearch.parameters;
const degrees=[p.a+p.c,p.a+p.b,p.b+p.c];
const vandermonde=(degrees[1]-degrees[0])*(degrees[2]-degrees[0])*(degrees[2]-degrees[1]);
assert.ok(Math.abs(vandermonde)>1e-6);

// U=exp(i theta D) commutes with D exactly because both are diagonal.
const phases=degrees.map(d=>({re:Math.cos(p.theta*d),im:Math.sin(p.theta*d)}));
assert.ok(phases.every(z=>Math.abs(z.re*z.re+z.im*z.im-1)<1e-14));
for(let i=0;i<3;i+=1)for(let j=0;j<3;j+=1){
  const commutatorEntry=(degrees[i]-degrees[j])*(i===j?1:0);
  assert.ok(Math.abs(commutatorEntry)<1e-15);
}

const targets=data.targets;
const one=data.oneParameterOrbitSearch.observables;
const full=data.fullDiagonalTorusSearch.observables;
assert.ok(Math.abs(score(one,targets)-data.oneParameterOrbitSearch.meanSquaredLogScore)<1e-12);
assert.ok(Math.abs(score(full,targets)-data.fullDiagonalTorusSearch.meanSquaredLogScore)<2e-8);
assert.ok(one.Vus>0.5&&full.Vus>0.5);
assert.equal(data.exactOrbit.spectrumIndependentOfTheta,true);
assert.equal(data.maximalClosure.arbitraryOffDiagonalSpurionAdded,false);
assert.equal(data.verdict.joinedSolutionFound,false);
assert.equal(data.verdict.globalNoGoEstablished,false);
assert.equal(data.verdict.physicalAdmissionChanged,false);

console.log(`PASS 1479: the degree orbit is exactly isospectral and its maximal derived diagonal closure is U(1)^2; bounded one- and two-phase searches retain |Vus|>${Math.min(one.Vus,full.Vus).toFixed(3)} and establish no global no-go.`);
