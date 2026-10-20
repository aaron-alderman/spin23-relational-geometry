#!/usr/bin/env node

import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-stochastic-quantization-gap-audit.json",
  import.meta.url,
),"utf8"));
assert.equal(evidence.schema,"spin23.stochastic-quantization-gap-audit/1");
assert.match(evidence.status,/not a physical transfer gap/);
const beta=evidence.compactModel.beta;

const besselI=(n,x)=>{let term=(x/2)**n,fac=1;for(let j=1;j<=n;j++)fac*=j;term/=fac;let sum=term;for(let k=1;k<200;k++){term*=x*x/(4*k*(k+n));sum+=term;if(Math.abs(term)<1e-17*Math.abs(sum))break;}return sum;};
const plaquette=besselI(1,beta)/besselI(0,beta);
assert.ok(Math.abs(plaquette-evidence.compactModel.equilibriumPlaquette)<1e-15);

const jacobi=(input)=>{
  const n=input.length,A=input.map(r=>[...r]),V=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
  for(let sweep=0;sweep<120;sweep++){
    let off=0;for(let p=0;p<n-1;p++)for(let q=p+1;q<n;q++)off=Math.max(off,Math.abs(A[p][q]));if(off<1e-14)break;
    for(let p=0;p<n-1;p++)for(let q=p+1;q<n;q++){
      const z=A[p][q];if(Math.abs(z)<1e-16)continue;const phi=.5*Math.atan2(2*z,A[q][q]-A[p][p]),c=Math.cos(phi),s=Math.sin(phi);
      for(let k=0;k<n;k++)if(k!==p&&k!==q){const x=A[k][p],y=A[k][q];A[k][p]=A[p][k]=c*x-s*y;A[k][q]=A[q][k]=s*x+c*y;}
      const x=A[p][p],y=A[q][q];A[p][p]=c*c*x-2*s*c*z+s*s*y;A[q][q]=s*s*x+2*s*c*z+c*c*y;A[p][q]=A[q][p]=0;
      for(let k=0;k<n;k++){const x=V[k][p],y=V[k][q];V[k][p]=c*x-s*y;V[k][q]=s*x+c*y;}
    }
  }
  const order=Array.from({length:n},(_,i)=>i).sort((i,j)=>A[i][i]-A[j][j]);
  return {values:order.map(i=>A[i][i]),vectors:order.map(i=>V.map(r=>r[i]))};
};
const fpMatrix=(N,M=1)=>{
  const modes=Array.from({length:2*N+1},(_,i)=>i-N);
  return modes.map((n,i)=>modes.map((m,j)=>M*(i===j?n*n+beta*beta/8:Math.abs(n-m)===1?-beta/4:Math.abs(n-m)===2?-beta*beta/16:0)));
};
const rotorMatrix=(N,kappa=2)=>{
  const modes=Array.from({length:2*N+1},(_,i)=>i-N);
  return modes.map((n,i)=>modes.map((m,j)=>i===j?n*n+kappa:Math.abs(n-m)===1?-kappa/2:0));
};

const rows=[];
for(const N of evidence.compactModel.fourierCutoffs){
  const spec=jacobi(fpMatrix(N));
  rows.push({N,ground:spec.values[0],gap:spec.values[1]-spec.values[0]});
}
for(let i=1;i<rows.length;i++)assert.ok(Math.abs(rows[i].gap-rows.at(-1).gap)<Math.abs(rows[i-1].gap-rows.at(-1).gap)+1e-13);
assert.ok(Math.abs(rows.at(-1).ground)<1e-12);
const gap=rows.at(-1).gap;
for(let i=0;i<rows.length;i++){
  const r=rows[i],expected=evidence.computedSpectrum.M1CutoffRows[i];
  assert.equal(r.N,expected.N);
  assert.ok(Math.abs(r.ground-expected.ground)<5e-10);
  assert.ok(Math.abs(r.gap-expected.gap)<1e-12);
}

// The exact ground-state Fourier coefficients are I_n(beta/2).
const groundSpec=jacobi(fpMatrix(18)),groundVec=groundSpec.vectors[0];
const exactCoeffs=Array.from({length:37},(_,i)=>besselI(Math.abs(i-18),beta/2));
const norm=Math.hypot(...exactCoeffs),normalized=exactCoeffs.map(x=>x/norm);
const overlap=Math.abs(groundVec.reduce((s,x,i)=>s+x*normalized[i],0));
assert.ok(overlap>1-1e-12);

// Constant mobility is an allowed stochastic-time convention and scales the
// entire relaxation spectrum without changing equilibrium moments.
const mobilityRows=evidence.compactModel.mobilities.map(M=>{const e=jacobi(fpMatrix(18,M)).values;return {M,gap:e[1]-e[0]};});
for(const row of mobilityRows)assert.ok(Math.abs(row.gap-row.M*gap)<2e-12);
for(let i=0;i<mobilityRows.length;i++){
  assert.equal(mobilityRows[i].M,evidence.computedSpectrum.mobilityGapRows[i].M);
  assert.ok(Math.abs(mobilityRows[i].gap-evidence.computedSpectrum.mobilityGapRows[i].gap)<1e-12);
}

const rotor=jacobi(rotorMatrix(18,2)).values,physicalGap=rotor[1]-rotor[0];
assert.ok(Math.abs(physicalGap-evidence.computedSpectrum.physicalRotorGap)<1e-12);
assert.ok(Math.abs(physicalGap-gap)>0.1);
for(const row of mobilityRows)if(row.M!==1)assert.ok(Math.abs(row.gap-physicalGap)>0.1);

assert.ok(evidence.fourDimensionalRequirements.physicalGap.includes("reconstructed physical Hamiltonian"));
assert.ok(Object.keys(evidence.fourDimensionalRequirements).length>=7);
assert.match(evidence.spin23Boundary.notABridge,/does not identify fictitious stochastic time with physical time/);

console.log("Stochastic-quantization gap audit: PASS");
console.log(`  equilibrium <cos theta>=I1(2)/I0(2)=${plaquette.toFixed(12)}`);
for(const r of rows)console.log(`  Fourier N=${r.N}: E0=${r.ground.toExponential(3)}, stochastic gap=${r.gap.toFixed(12)}`);
console.log("  mobility scaling: "+mobilityRows.map(r=>`M=${r.M}:gap=${r.gap.toFixed(12)}`).join("; "));
console.log(`  equilibrium ground-state overlap=${overlap.toFixed(12)}; physical rotor gap=${physicalGap.toFixed(12)}`);
console.log("  boundary: stochastic mixing is mobility dependent; physical mass belongs to OS/transfer reconstruction in Euclidean spacetime");
