import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const r=read('evidence/data/yukawa-vacuum-scale-selection-v1.json');
const close=(a,b)=>assert(Math.abs(a-b)<1e-10*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`);
for(const [p,hash]of Object.entries(r.sources))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'),hash,p);
const rows=[...r.traceCompletion.commonAmplitudeFamily,...r.traceCompletion.shapeFamily,
 ...r.traceCompletion.coefficientAndScaleFamily,r.traceCompletion.rankOneTwoDimensionalExample];
for(const row of rows){
 const {a,b,k,Lambda}=row.coefficients;
 // Direct potential derivatives at the unnormalized vacuum, then normalize.
 const dV=-(a*Lambda**2)*row.Z*row.u0+b*row.W*row.u0**3;
 close(dV,0);
 assert(-(a*Lambda**2)*row.Z+3*b*row.W*row.u0**2>0);
 close(row.canonicalV,Math.sqrt(k*row.Z)*row.u0);
 row.gaps.forEach((mass,i)=>{
  close(mass,row.singularValues[i]*row.u0);
  close(mass,row.canonicalYukawas[i]*row.canonicalV);
  close(mass**2,a/b*Lambda**2*row.r[i]/row.rho);
 });
}
const amplitude=r.traceCompletion.commonAmplitudeFamily;
for(const row of amplitude){
 close(row.canonicalV,amplitude[0].canonicalV);
 row.canonicalYukawas.forEach((g,i)=>close(g,amplitude[0].canonicalYukawas[i]));
 row.gaps.forEach((mass,i)=>close(mass,amplitude[0].gaps[i]));
}
const [equal,unequal]=r.traceCompletion.shapeFamily;
close(equal.Z,unequal.Z);close(equal.minimumGap**2,1);close(unequal.minimumGap**2,5/17);
const [base,coeff,scale]=r.traceCompletion.coefficientAndScaleFamily;
close(coeff.minimumGap/base.minimumGap,Math.sqrt(2));close(scale.minimumGap/base.minimumGap,2);
assert.equal(r.traceCompletion.rankOneTwoDimensionalExample.minimumGap,0);
// Negative control: an independent quartic destroys that common-amplitude
// cancellation when its bare coefficient is held fixed.
const withExtraQuartic=t=>{const Z=t*t,W=t**4;return t*Math.sqrt(Z/(W+1));};
assert(Math.abs(withExtraQuartic(1)-withExtraQuartic(2))>.1);
// A tight frame permits an arbitrary isotropic magnitude until normalized.
for(const t of [.2,1,3]){
 const Y=[[t/Math.sqrt(2),t/Math.sqrt(2)],[t/Math.sqrt(2),-t/Math.sqrt(2)]];
 for(let i=0;i<2;i++)for(let j=0;j<2;j++)close(Y.reduce((s,row)=>s+row[i]*row[j],0),i===j?t*t:0);
}
// Locate each GW minimum by bracketing its derivative, independently of the
// closed-form root used by the audit generator.
const {A,B}=r.radiativePortal;assert(B>0);
for(const row of r.radiativePortal.boundaryScaleFamily){
 const mu=row.muGW;
 const dV=x=>4*x**3*(A+B*Math.log(x*x/(mu*mu))+B/2);
 let lo=.001*mu,hi=100*mu;assert(dV(lo)<0&&dV(hi)>0);
 for(let j=0;j<100;j++){const mid=(lo+hi)/2;if(dV(mid)>0)hi=mid;else lo=mid;}
 close((lo+hi)/2,row.v);close(row.scalonMass**2,8*B*row.v**2);
}
const [gw1,gw2]=r.radiativePortal.boundaryScaleFamily;close(gw2.v/gw1.v,2);
assert.equal(r.radiativePortal.cartanCouplingIdentifiedAsFermionYukawa,false);
const receipts=read(r.sourceVerificationReceipt);assert.equal(receipts.checks.length,5);assert(receipts.checks.every(x=>x.exitCode===0));
assert.equal(r.verdict.commonBareAmplitudeCancelsInDeclaredTraceCompletion,true);
assert.equal(r.verdict.normalizedPhysicalYukawaAndVacuumScaleFixed,false);
assert.equal(r.verdict.physicalGapOrIndependentMassRatioPredicted,false);
assert.equal(r.verdict.independentYukawaCounterfamilyAppliesToEveryCommonAction,false);
console.log(JSON.stringify({passed:true,checks:['source hashes and five archived execution receipts',
 'stationary vacuum and positive radial curvature','canonical Yukawa-times-VEV equals mass singular value',
 'common-amplitude redundancy cancellation','same-trace shape changes rest gap',
 'coefficient and dimensional boundary freedom','rank-one block leaves zero mass',
 'independent-quartic negative control','tight-frame isotropy retains magnitude',
 'independent bracketing of GW minima','physical and conditional status boundaries'],
 scope:'Declared single-trace completion and corpus audit; not a selected physical T1/T2 action'},null,2));
