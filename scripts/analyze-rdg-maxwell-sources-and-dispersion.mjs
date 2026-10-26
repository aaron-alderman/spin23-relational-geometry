import fs from "node:fs";
import path from "node:path";
import {
  identity, maxAbs, multiply, periodicCubeComplex, projectors,
  rank, scale, subtract, transpose, zeros,
} from "./analyze-rdg-maxwell-fixed-complex.mjs";

const ROOT=process.cwd();
const WRITE=process.argv.includes("--write");
const OUTPUT="evidence/data/rdg-maxwell-sources-dispersion-v1.json";
const add=(a,b)=>a.map((row,i)=>row.map((value,j)=>value+b[i][j]));
const diagonal=values=>values.map((value,i)=>values.map((_,j)=>i===j?value:0));
const commutator=(a,b)=>subtract(multiply(a,b),multiply(b,a));
const directSum=matrices=>{
  const offsets=[];
  let total=0;
  for(const matrix of matrices){offsets.push(total);total+=matrix.length;}
  const out=zeros(total,total);
  matrices.forEach((matrix,k)=>matrix.forEach((row,i)=>row.forEach((value,j)=>{out[offsets[k]+i][offsets[k]+j]=value;})));
  return out;
};
const blockMatrix=blocks=>{
  const rowSizes=blocks.map(row=>row[0].length);
  const colSizes=blocks[0].map(block=>block[0].length);
  const rowOffsets=rowSizes.map((_,i)=>rowSizes.slice(0,i).reduce((a,b)=>a+b,0));
  const colOffsets=colSizes.map((_,i)=>colSizes.slice(0,i).reduce((a,b)=>a+b,0));
  const out=zeros(rowSizes.reduce((a,b)=>a+b,0),colSizes.reduce((a,b)=>a+b,0));
  blocks.forEach((row,bi)=>row.forEach((matrix,bj)=>matrix.forEach((values,i)=>values.forEach((value,j)=>{
    out[rowOffsets[bi]+i][colOffsets[bj]+j]=value;
  }))));
  return out;
};

const complex=periodicCubeComplex(2);
const [d0,d1]=complex.d;
const div=transpose(d0);
const sourceCommutator=subtract(multiply(div,projectors[1]),multiply(projectors[0],div));
const badP1=zeros(24,24);
for(let i=0;i<8;i+=1)badP1[i][i]=1;
const badSourceCommutator=subtract(multiply(div,badP1),multiply(identity(8),div));

function oscillatorSystem(w0Squared,wpSquared,gamma=0){
  const n=24;
  const Z=zeros(n,n),I=identity(n),dT=transpose(d1);
  const W0=diagonal(w0Squared),Wp=diagonal(wpSquared),WpInv=diagonal(wpSquared.map(value=>1/value));
  const Gamma=diagonal(Array(n).fill(gamma));
  const K=blockMatrix([
    [Z,dT,Z,scale(-1,I)],
    [scale(-1,d1),Z,Z,Z],
    [Z,Z,Z,I],
    [Wp,Z,scale(-1,W0),scale(-1,Gamma)],
  ]);
  const L=directSum([I,I,multiply(WpInv,W0),WpInv]);
  return {K,L};
}

const n=24;
const uniform=oscillatorSystem(Array(n).fill(4),Array(n).fill(2.25));
const P=directSum([projectors[1],projectors[2],projectors[1],projectors[1]]);
const uniformEnergyResidual=maxAbs(add(multiply(transpose(uniform.K),uniform.L),multiply(uniform.L,uniform.K)));
const uniformDynamicsCommutator=commutator(P,uniform.K);
const uniformMetricCommutator=commutator(P,uniform.L);

const V=8;
const w0Contrast=Array.from({length:n},(_,i)=>Math.floor((i%V)/4)===0?4:9);
const contrast=oscillatorSystem(w0Contrast,Array(n).fill(2.25));
const contrastEnergyResidual=maxAbs(add(multiply(transpose(contrast.K),contrast.L),multiply(contrast.L,contrast.K)));
const contrastDynamicsCommutator=commutator(P,contrast.K);
const contrastMetricCommutator=commutator(P,contrast.L);

const damping=oscillatorSystem(Array(n).fill(4),Array(n).fill(2.25),0.3);
const dampingForm=add(multiply(transpose(damping.K),damping.L),multiply(damping.L,damping.K));
const expectedDamping=zeros(96,96);
for(let i=72;i<96;i+=1)expectedDamping[i][i]=-2*0.3/2.25;
const dampingIdentityResidual=maxAbs(subtract(dampingForm,expectedDamping));

const record={
  schemaVersion:"rdg-maxwell-sources-dispersion-v1",
  date:"2026-10-26",
  purpose:"Extend the RDG-Maxwell bridge to conserved forcing and explicit resonant material memory.",
  sourceContinuity:{
    equations:"dot(E)=epsilon^-1(d1^T nu B-J), dot(rho)=-d0^T J",
    gaussRecord:"d0^T epsilon E-rho",
    translationSelectorContinuityCommutatorRank:rank(sourceCommutator),
    translationSelectorContinuityResidual:maxAbs(sourceCommutator),
    untypedComponentSelectorContinuityCommutatorRank:rank(badSourceCommutator),
    untypedComponentSelectorContinuityResidual:maxAbs(badSourceCommutator),
    conclusion:"A source selector is admissible only when current and charge projections commute with discrete divergence; otherwise selection itself violates continuity.",
  },
  lorentzMaterial:{
    state:"(E,B,P,V) with V=dot(P)",
    equations:[
      "dot(E)=d1^T B-V",
      "dot(B)=-d1 E",
      "dot(P)=V",
      "dot(V)=omega_p^2 E-omega_0^2 P-gamma V",
    ],
    energy:"1/2(||E||^2+||B||^2)+1/(2 omega_p^2)(||V||^2+omega_0^2||P||^2)",
    meaning:"resonance and lag are represented by material state, not an untyped history filter",
  },
  homogeneousLossless:{
    omega0Squared:4,
    omegaPSquared:2.25,
    energyGeneratorResidual:uniformEnergyResidual,
    selectorMetricCommutatorRank:rank(uniformMetricCommutator),
    selectorMetricCommutatorResidual:maxAbs(uniformMetricCommutator),
    selectorDynamicsCommutatorRank:rank(uniformDynamicsCommutator),
    selectorDynamicsCommutatorResidual:maxAbs(uniformDynamicsCommutator),
    conclusion:"The extended selector closes the electromagnetic and material-memory state together.",
  },
  resonantContrast:{
    omega0Squared:"4 on x=0 and 9 on x=1",
    omegaPSquared:2.25,
    energyGeneratorResidual:contrastEnergyResidual,
    selectorMetricCommutatorRank:rank(contrastMetricCommutator),
    selectorMetricCommutatorResidual:maxAbs(contrastMetricCommutator),
    selectorDynamicsCommutatorRank:rank(contrastDynamicsCommutator),
    selectorDynamicsCommutatorResidual:maxAbs(contrastDynamicsCommutator),
    conclusion:"Spatially varying resonance preserves the full lossless energy but mixes the selector sectors through ordinary dispersive material dynamics.",
  },
  homogeneousDamping:{
    gamma:0.3,
    dissipationIdentity:"K^T L+L K has only the V block -2 gamma/omega_p^2",
    dissipationIdentityResidual:dampingIdentityResidual,
    selectorDynamicsCommutatorRank:rank(commutator(P,damping.K)),
    conclusion:"Loss can remain selector-compatible while total energy decreases into an unmodelled bath; closing the larger system requires a bath carrier and detector.",
  },
  verdict:"Charge conservation adds a source-chain gate, while resonance requires an enlarged material state. Homogeneous memory can remain inside the admitted subsystem; conventional spatial variation reopens the defect channel without breaking Maxwell continuity or lossless energy conservation.",
};

if(WRITE){
  fs.mkdirSync(path.dirname(path.join(ROOT,OUTPUT)),{recursive:true});
  fs.writeFileSync(path.join(ROOT,OUTPUT),`${JSON.stringify(record,null,2)}\n`);
}
console.log(JSON.stringify({output:OUTPUT,wrote:WRITE,...record},null,2));

