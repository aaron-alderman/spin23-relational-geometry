#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-positive-spectral-moment-gap-bounds.json",
  import.meta.url,
),"utf8"));
assert.equal(evidence.schema,"spin23.positive-spectral-moment-gap-bounds/1");
assert.match(evidence.status,/do not certify a positive lower gap/);
const close=(a,b,tol=1e-11)=>Math.abs(a-b)<=tol;
const eig2=(a,b,c)=>{const d=Math.hypot(a-c,2*b);return [(a+c-d)/2,(a+c+d)/2];};
const det3=(a)=>a[0][0]*(a[1][1]*a[2][2]-a[1][2]*a[2][1])-a[0][1]*(a[1][0]*a[2][2]-a[1][2]*a[2][0])+a[0][2]*(a[1][0]*a[2][1]-a[1][1]*a[2][0]);

const ex=evidence.exactSpectrum, tau=ex.tau;
const moment=(n)=>ex.weights.reduce((s,w,i)=>s+w*Math.exp(-ex.energies[i]*tau*n),0);
for(let n=0;n<ex.moments0Through16.length;n++) assert.ok(close(moment(n),ex.moments0Through16[n]));
const m=ex.moments0Through16;
const H0=[[m[0],m[1]],[m[1],m[2]]], H1=[[m[1],m[2]],[m[2],m[3]]];
assert.ok(eig2(H0[0][0],H0[0][1],H0[1][1])[0]>0);
assert.ok(eig2(H1[0][0],H1[0][1],H1[1][1])[0]>0);
assert.ok(eig2(H0[0][0]-H1[0][0],H0[0][1]-H1[0][1],H0[1][1]-H1[1][1])[0]>0);

// Generalized eigenvalues det(H1-x H0)=0 recover both atoms.
const qa=m[0]*m[2]-m[1]**2;
const qb=m[1]*m[2]-m[0]*m[3];
const qc=m[1]*m[3]-m[2]**2;
const disc=Math.sqrt(qb**2-4*qa*qc);
const atoms=[(-qb+disc)/(2*qa),(-qb-disc)/(2*qa)].sort((a,b)=>b-a);
for(let i=0;i<2;i++) assert.ok(close(atoms[i],ex.xAtoms[i]));
const recoveredE=atoms.map((x)=>-Math.log(x)/tau);
for(let i=0;i<2;i++) assert.ok(close(recoveredE[i],ex.energies[i]));
const recoveredWeights=[(m[1]-atoms[1]*m[0])/(atoms[0]-atoms[1]),(atoms[0]*m[0]-m[1])/(atoms[0]-atoms[1])];
for(let i=0;i<2;i++) assert.ok(close(recoveredWeights[i],ex.weights[i]));

// Flat rank-two extension: the 3x3 Hankel determinant vanishes, while its
// leading 2x2 block is nonsingular and all sampled quadratic forms are PSD.
const H2=Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>m[i+j]));
assert.ok(Math.abs(det3(H2))<1e-14);
assert.ok(qa>0);
const recurrenceSum=atoms[0]+atoms[1], recurrenceProduct=atoms[0]*atoms[1];
for(let n=0;n<=14;n++) assert.ok(close(m[n+2],recurrenceSum*m[n+1]-recurrenceProduct*m[n]));

// Effective masses are rigorous upper bounds and decrease in this witness.
const em=evidence.effectiveMassWitness;
let previous=Infinity;
for(let i=0;i<em.sampleIndices.length;i++){
  const n=em.sampleIndices[i], value=-Math.log(m[n+1]/m[n])/tau;
  assert.ok(close(value,em.values[i]));
  assert.ok(value>=ex.energies[0] && value<previous);
  previous=value;
}

// Interval-robust rejection of the hypothesis Delta>=0.5.
const nw=evidence.intervalNoiseWitness, lc=evidence.localizingCertificate;
const sigma=(n)=>Math.max(nw.relativeHalfWidth*moment(n),nw.absoluteFloor);
const R=Math.exp(-lc.excludedGapHypothesis*tau), v=lc.witnessVector;
const coeff=[R*v[0]**2,2*R*v[0]*v[1]-v[0]**2,R*v[1]**2-2*v[0]*v[1],-(v[1]**2)];
const central=coeff.reduce((s,a,n)=>s+a*m[n],0);
const intervalRadius=coeff.reduce((s,a,n)=>s+Math.abs(a)*sigma(n),0);
assert.ok(central+intervalRadius<0,"the entire moment interval excludes gap >= 0.5");

// The central sequence is compatible with Delta>=0.3.
const R03=Math.exp(-lc.compatibleCentralGapHypothesis*tau);
const L03=[[R03*m[0]-m[1],R03*m[1]-m[2]],[R03*m[1]-m[2],R03*m[2]-m[3]]];
assert.ok(eig2(L03[0][0],L03[0][1],L03[1][1])[0]>=-1e-13);

// Yet a hidden low-energy atom lies inside every reported interval.
const hs=nw.hiddenSpectrum, hiddenMoment=(n)=>(1-hs.weight)*moment(n)+hs.weight*Math.exp(-hs.energy*tau*n);
let maxRel=0, firstExceeded=null;
for(let n=0;n<=200;n++){
  const difference=Math.abs(hiddenMoment(n)-moment(n));
  if(n<=nw.maximumObservedIndex){
    assert.ok(difference<=sigma(n));
    maxRel=Math.max(maxRel,difference/moment(n));
  }
  if(firstExceeded===null && difference>Math.max(nw.relativeHalfWidth*moment(n),nw.absoluteFloor)) firstExceeded=n;
}
assert.ok(close(maxRel,hs.maximumRelativeDeviationThroughObservedWindow));
assert.equal(firstExceeded,hs.firstIndexExceedingRelativeHalfWidth);
const crossover=Math.log((1-hs.weight)*ex.weights[0]/hs.weight)/(ex.energies[0]-hs.energy);
assert.ok(close(crossover,hs.groundStateCrossoverTime));
assert.ok(hs.energy<lc.compatibleCentralGapHypothesis);

const hiddenEffective=(n)=>-Math.log(hiddenMoment(n+1)/hiddenMoment(n))/tau;
const scaling=evidence.finiteWindowScaling.indices.map((n)=>({n,m: hiddenEffective(n)}));
assert.ok(scaling[0].m>0.5);
assert.ok(scaling.find((x)=>x.n===32).m>0.35);
assert.ok(scaling.find((x)=>x.n===64).m<0.1);
assert.ok(Math.abs(scaling.at(-1).m-hs.energy)<1e-5);

assert.ok(evidence.certificationBoundary.rigorousFromExactFiniteData.length>=4);
assert.ok(evidence.certificationBoundary.notRigorousUnderNonzeroIntervalsWithoutExtraAssumptions.length>=4);
assert.match(evidence.continuumVolumeBoundary.missingUniformity,/uniform in a->0, L->infinity and t_max->infinity/);

console.log("Positive spectral-moment gap-bound audit: PASS");
console.log(`  exact pencil atoms: ${atoms.map(x=>x.toFixed(9)).join(", ")} -> energies ${recoveredE.map(x=>x.toFixed(6)).join(", ")}`);
console.log(`  flat Hankel rank=2; recovered weights ${recoveredWeights.map(x=>x.toFixed(6)).join(", ")}`);
console.log(`  interval certificate: v^T L(Delta=0.5) v <= ${(central+intervalRadius).toExponential(4)} < 0, so Delta<0.5`);
console.log(`  hidden atom: Delta=${hs.energy}, residue=${hs.weight}; max relative deviation through t=${nw.maximumObservedIndex} is ${maxRel.toExponential(4)}`);
console.log(`  first ${nw.relativeHalfWidth} relative-window violation at t=${firstExceeded}; ground-state crossover t=${crossover.toFixed(3)}`);
console.log("  hidden effective masses: "+scaling.map(x=>`t${x.n}:${x.m.toFixed(5)}`).join(" "));
console.log("  boundary: exact flat recovery is brittle; nonzero intervals without a residue floor do not certify a positive lower gap");
