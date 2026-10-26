import fs from "node:fs";
import path from "node:path";
import {
  apply, identity, maxAbs, multiply, periodicCubeComplex, projectors,
  rank, scale, subtract, transpose, vectorMaxAbs, zeros,
} from "./analyze-rdg-maxwell-fixed-complex.mjs";

const ROOT=process.cwd();
const WRITE=process.argv.includes("--write");
const OUTPUT="evidence/data/rdg-maxwell-hodge-dynamics-v1.json";

const diagonal=values=>values.map((value,i)=>values.map((_,j)=>i===j?value:0));
const block=(a,b,c,d)=>[
  ...a.map((row,i)=>[...row,...b[i]]),
  ...c.map((row,i)=>[...row,...d[i]]),
];
const blockDiagonal=(a,d)=>block(a,zeros(a.length,d.length),zeros(d.length,a.length),d);
const add=(a,b)=>a.map((row,i)=>row.map((value,j)=>value+b[i][j]));
const dot=(a,b)=>a.reduce((sum,value,i)=>sum+value*b[i],0);
const commutator=(a,b)=>subtract(multiply(a,b),multiply(b,a));

function inverse(matrix) {
  const n=matrix.length;
  const a=matrix.map((row,i)=>[...row,...identity(n)[i]]);
  for(let col=0;col<n;col+=1){
    let pivot=col;
    while(pivot<n&&Math.abs(a[pivot][col])<1e-12)pivot+=1;
    if(pivot===n)throw new Error(`singular matrix at column ${col}`);
    [a[col],a[pivot]]=[a[pivot],a[col]];
    const divisor=a[col][col];
    a[col]=a[col].map(value=>value/divisor);
    for(let row=0;row<n;row+=1){
      if(row===col)continue;
      const factor=a[row][col];
      a[row]=a[row].map((value,j)=>value-factor*a[col][j]);
    }
  }
  return a.map(row=>row.slice(n));
}

function buildDynamics(epsilonValues,nuValues) {
  const complex=periodicCubeComplex(2);
  const [d0,d1,d2]=complex.d;
  const epsilon=diagonal(epsilonValues);
  const epsilonInv=diagonal(epsilonValues.map(value=>1/value));
  const nu=diagonal(nuValues);
  const n=d1.length;
  const K=block(
    zeros(n,n),multiply(multiply(epsilonInv,transpose(d1)),nu),
    scale(-1,d1),zeros(n,n),
  );
  const L=blockDiagonal(epsilon,nu);
  const constraints=block(
    multiply(transpose(d0),epsilon),zeros(d0[0].length,d2.length),
    zeros(d2.length,epsilon.length),d2,
  );
  return {complex,d0,d1,d2,epsilon,nu,K,L,constraints};
}

function cayleyStep(K,state,dt) {
  const I=identity(K.length);
  const left=subtract(I,scale(dt/2,K));
  const right=add(I,scale(dt/2,K));
  return apply(multiply(inverse(left),right),state);
}

const uniform=buildDynamics(Array(24).fill(1),Array(24).fill(1));
const P=blockDiagonal(projectors[1],projectors[2]);
const Q=subtract(identity(48),P);
const hamiltonianSkewResidual=maxAbs(add(multiply(transpose(uniform.K),uniform.L),multiply(uniform.L,uniform.K)));
const constraintGeneratorResidual=maxAbs(multiply(uniform.constraints,uniform.K));
const selectorDynamicsCommutator=commutator(P,uniform.K);
const selectorMetricCommutator=commutator(P,uniform.L);

const initial=Array.from({length:48},(_,i)=>(((i*7)%17)-8)/8);
const evolved=cayleyStep(uniform.K,initial,0.125);
const energy=state=>0.5*dot(state,apply(uniform.L,state));
const constraintBefore=apply(uniform.constraints,initial);
const constraintAfter=apply(uniform.constraints,evolved);

const V=8;
const epsilonContrast=Array.from({length:24},(_,i)=>{
  const local=i%V;
  const x=Math.floor(local/4);
  return x===0?1:3;
});
const contrast=buildDynamics(epsilonContrast,Array(24).fill(1));
const contrastMetricCommutator=commutator(P,contrast.L);
const contrastDynamicsCommutator=commutator(P,contrast.K);
const exchange=multiply(multiply(Q,contrast.K),P);
const witnessColumn=transpose(exchange).findIndex(column=>vectorMaxAbs(column)>1e-10);
const exchangeWitness=witnessColumn<0?[]:exchange.map(row=>row[witnessColumn]);
const contrastHamiltonianSkew=maxAbs(add(multiply(transpose(contrast.K),contrast.L),multiply(contrast.L,contrast.K)));
const contrastConstraintResidual=maxAbs(multiply(contrast.constraints,contrast.K));

const record={
  schemaVersion:"rdg-maxwell-hodge-dynamics-v1",
  date:"2026-10-26",
  purpose:"Test whether the chain-compatible RDG selector also respects constitutive/Hodge structure and source-free Maxwell dynamics.",
  formulation:{
    state:"x=(E,B) in C1 direct-sum C2",
    energy:"H=1/2 E^T epsilon E + 1/2 B^T nu B",
    generator:"K=[[0,epsilon^-1 d1^T nu],[-d1,0]]",
    constraints:"d0^T epsilon E and d2 B",
    selector:"P=Pi1 direct-sum Pi2",
  },
  uniformMedium:{
    hamiltonianSkewResidual,
    constraintGeneratorResidual,
    selectorMetricCommutatorRank:rank(selectorMetricCommutator),
    selectorMetricCommutatorResidual:maxAbs(selectorMetricCommutator),
    selectorDynamicsCommutatorRank:rank(selectorDynamicsCommutator),
    selectorDynamicsCommutatorResidual:maxAbs(selectorDynamicsCommutator),
    cayleyStep:{
      dt:0.125,
      energyBefore:energy(initial),
      energyAfter:energy(evolved),
      energyResidual:Math.abs(energy(evolved)-energy(initial)),
      constraintResidual:vectorMaxAbs(constraintAfter.map((value,i)=>value-constraintBefore[i])),
    },
    conclusion:"With unit positive constitutive matrices, the chain-compatible translation selector commutes with the Maxwell generator; admitted and defect sectors evolve independently.",
  },
  translationBreakingMedium:{
    epsilon:"diagonal edge mass: 1 on x=0 cells and 3 on x=1 cells",
    nu:"identity face mass",
    positive:true,
    hamiltonianSkewResidual:contrastHamiltonianSkew,
    constraintGeneratorResidual:contrastConstraintResidual,
    selectorMetricCommutatorRank:rank(contrastMetricCommutator),
    selectorMetricCommutatorResidual:maxAbs(contrastMetricCommutator),
    selectorDynamicsCommutatorRank:rank(contrastDynamicsCommutator),
    selectorDynamicsCommutatorResidual:maxAbs(contrastDynamicsCommutator),
    admittedToDefectExchangeRank:rank(exchange),
    admittedToDefectWitnessColumn:witnessColumn,
    admittedToDefectWitnessMaxAbs:vectorMaxAbs(exchangeWitness),
    conclusion:"The full Maxwell system remains energy- and constraint-compatible, but material contrast breaks selector invariance and transfers an initially admitted state into the defect sector.",
  },
  interpretation:{
    topologicalGate:"[P,d]=0 is necessary but not sufficient for dynamical closure.",
    constitutiveGate:"The selected symmetry must also preserve epsilon and nu, equivalently the discrete Hodge/constitutive data.",
    dynamicsGate:"Only then does [P,K]=0 and the admitted sector become an invariant subsystem.",
    experimentalMeaning:"A detected Q-sector signal can be ordinary scattering from symmetry-breaking material structure; it is not by itself new physics.",
  },
  verdict:"The RDG selector closes source-free discrete Maxwell dynamics in a homogeneous symmetry-compatible medium. A standard positive inhomogeneous constitutive law reopens the channel and produces admitted-to-defect transfer without violating energy or Gauss constraints.",
};

if(WRITE){
  fs.mkdirSync(path.dirname(path.join(ROOT,OUTPUT)),{recursive:true});
  fs.writeFileSync(path.join(ROOT,OUTPUT),`${JSON.stringify(record,null,2)}\n`);
}
console.log(JSON.stringify({output:OUTPUT,wrote:WRITE,...record},null,2));

