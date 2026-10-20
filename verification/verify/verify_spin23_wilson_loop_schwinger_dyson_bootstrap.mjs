#!/usr/bin/env node

import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-wilson-loop-schwinger-dyson-bootstrap.json",
  import.meta.url,
),"utf8"));
assert.equal(evidence.schema,"spin23.wilson-loop-schwinger-dyson-bootstrap/1");
assert.match(evidence.status,/no 4D mass-gap certificate/);
const beta=evidence.model.beta,tol=evidence.positivityRelaxation.endpointTolerance;

const besselI=(n,x)=>{
  let term=(x/2)**n,fac=1;
  for(let j=1;j<=n;j++)fac*=j;
  term/=fac;
  let sum=term;
  for(let k=1;k<200;k++){
    term*=x*x/(4*k*(k+n));sum+=term;
    if(Math.abs(term)<1e-17*Math.abs(sum))break;
  }
  return sum;
};
const exact=besselI(1,beta)/besselI(0,beta);
assert.ok(Math.abs(exact-evidence.model.exactPlaquette)<1e-15);

// Each moment is represented as b+a*u and generated only by the loop equation.
const affineMoments=(K)=>{
  const w=[[1,0],[0,1]];
  for(let n=1;n<K;n++)w.push([w[n-1][0]-(2*n/beta)*w[n][0],w[n-1][1]-(2*n/beta)*w[n][1]]);
  return w;
};
const value=(pair,u)=>pair[0]+pair[1]*u;

const jacobiValues=(input)=>{
  const n=input.length,A=input.map(r=>[...r]);
  for(let sweep=0;sweep<120;sweep++){
    let off=0;for(let p=0;p<n-1;p++)for(let q=p+1;q<n;q++)off=Math.max(off,Math.abs(A[p][q]));
    if(off<1e-14)break;
    for(let p=0;p<n-1;p++)for(let q=p+1;q<n;q++){
      const z=A[p][q];if(Math.abs(z)<1e-16)continue;
      const phi=.5*Math.atan2(2*z,A[q][q]-A[p][p]),c=Math.cos(phi),s=Math.sin(phi);
      for(let k=0;k<n;k++)if(k!==p&&k!==q){const x=A[k][p],y=A[k][q];A[k][p]=A[p][k]=c*x-s*y;A[k][q]=A[q][k]=s*x+c*y;}
      const x=A[p][p],y=A[q][q];A[p][p]=c*c*x-2*s*c*z+s*s*y;A[q][q]=s*s*x+2*s*c*z+c*c*y;A[p][q]=A[q][p]=0;
    }
  }
  return A.map((r,i)=>r[i]).sort((a,b)=>a-b);
};
const toeplitz=(K,u)=>{const w=affineMoments(K);return Array.from({length:K+1},(_,i)=>Array.from({length:K+1},(_,j)=>value(w[Math.abs(i-j)],u)));};
const minEig=(K,u)=>jacobiValues(toeplitz(K,u))[0];
const feasible=(K,u)=>minEig(K,u)>=-tol;
const bound=(K,side)=>{
  let bad=side==="lower"?-2:2,good=exact;
  assert.ok(!feasible(K,bad)&&feasible(K,good));
  for(let it=0;it<90;it++){
    const mid=(bad+good)/2;
    if(feasible(K,mid))good=mid;else bad=mid;
  }
  return side==="lower"?{outer:bad,inner:good}:{inner:good,outer:bad};
};

const rows=[];
for(const K of evidence.positivityRelaxation.cutoffs){
  const lower=bound(K,"lower"),upper=bound(K,"upper");
  assert.ok(lower.outer<=lower.inner&&lower.inner<=exact);
  assert.ok(upper.inner>=exact&&upper.inner<=upper.outer);
  const width=upper.outer-lower.outer;
  rows.push({K,lower:lower.outer,upper:upper.outer,width,minEigAtExact:minEig(K,exact)});
}
for(let i=1;i<rows.length;i++){
  assert.ok(rows[i].lower>=rows[i-1].lower-2e-10);
  assert.ok(rows[i].upper<=rows[i-1].upper+2e-10);
  assert.ok(rows[i].width<rows[i-1].width);
}
assert.ok(rows.at(-1).width<1e-2);
for(let i=0;i<rows.length;i++){
  const r=rows[i],expected=evidence.certifiedBounds[i];
  assert.equal(r.K,expected.K);
  assert.ok(Math.abs(r.lower-expected.lower)<2e-12);
  assert.ok(Math.abs(r.upper-expected.upper)<2e-12);
  assert.ok(Math.abs(r.width-expected.width)<3e-12);
}

// Exhibit relaxation artifacts: a point feasible at K but not at K+1.
const spurious=[];
for(let i=0;i<rows.length-1;i++){
  const a=rows[i],b=rows[i+1];
  const candidates=[(a.lower+b.lower)/2,(a.upper+b.upper)/2];
  const x=candidates.find(u=>feasible(a.K,u)&&!feasible(b.K,u));
  if(x!==undefined)spurious.push({K:a.K,u:x,nextMinEig:minEig(b.K,x)});
}
assert.ok(spurious.length>=5);

// Recurrence agrees with the exact Bessel moments and Toeplitz positivity.
const w=affineMoments(8);
for(let n=0;n<w.length;n++)assert.ok(Math.abs(value(w[n],exact)-besselI(n,beta)/besselI(0,beta))<2e-10);
for(const row of rows)assert.ok(row.minEigAtExact>0);

assert.ok(evidence.fourDimensionalBoundary.newComplexity.length>=4);
assert.match(evidence.fourDimensionalBoundary.requiredSupportStatement,/spectral support near exp\(-a Delta\)=1/);
assert.match(evidence.relationshipToPublishedBootstrap.unclosedGate,/do not yet give/);

console.log("Wilson-loop Schwinger-Dyson bootstrap witness: PASS");
console.log(`  exact plaquette I1(2)/I0(2)=${exact.toFixed(12)}`);
for(const r of rows)console.log(`  K=${r.K}: u in [${r.lower.toFixed(12)},${r.upper.toFixed(12)}], width=${r.width.toExponential(3)}, lambda_min(exact)=${r.minEigAtExact.toExponential(3)}`);
console.log("  finite-cutoff spurious witnesses: "+spurious.map(s=>`K${s.K}:u=${s.u.toFixed(8)} -> lambda_min(K+1)=${s.nextMinEig.toExponential(2)}`).join("; "));
console.log("  boundary: plaquette convergence does not exclude low temporal spectral support uniformly in loop cutoff, volume and lattice spacing");
