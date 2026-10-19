#!/usr/bin/env node

// Exact polynomial certificate for quartic mixing in the real 3x2 locking field.
// A polynomial is a Map from six-exponent keys to integer coefficients.
const n=6;
const zeroKey=Array(n).fill(0).join(",");
const constant=c=>new Map(c===0?[]:[[zeroKey,c]]);
const variable=i=>new Map([[Array.from({length:n},(_,j)=>j===i?1:0).join(","),1]]);
const add=(a,b,scale=1)=>{
  const out=new Map(a);
  for(const [k,v] of b){const z=(out.get(k)||0)+scale*v;if(z)out.set(k,z);else out.delete(k);}
  return out;
};
const mul=(a,b)=>{
  const out=new Map();
  for(const [ka,va] of a)for(const [kb,vb] of b){
    const ea=ka.split(",").map(Number),eb=kb.split(",").map(Number);
    const k=ea.map((x,i)=>x+eb[i]).join(",");
    out.set(k,(out.get(k)||0)+va*vb);
  }
  return out;
};
const scale=(a,c)=>new Map([...a].map(([k,v])=>[k,c*v]).filter(([,v])=>v));
const deriv=(a,i)=>{
  const out=new Map();
  for(const [k,v] of a){const e=k.split(",").map(Number);if(!e[i])continue;const c=v*e[i];e[i]--;out.set(e.join(","),(out.get(e.join(","))||0)+c);}
  return out;
};
const evaluate=(a,x)=>[...a].reduce((s,[k,v])=>s+v*k.split(",").map(Number).reduce((p,e,i)=>p*x[i]**e,1),0);
const sq=a=>mul(a,a);

// Variable order: u=(x0,x1,x2), v=(x3,x4,x5).
const x=Array.from({length:n},(_,i)=>variable(i));
const sum=ps=>ps.reduce((a,p)=>add(a,p),constant(0));
const u2=sum(x.slice(0,3).map(sq));
const v2=sum(x.slice(3,6).map(sq));
const uv=sum([0,1,2].map(i=>mul(x[i],x[i+3])));
const S=add(u2,v2);
const D=add(sq(add(u2,v2,-1)),scale(sq(uv),4));
const S2=sq(S);
const hessian=p=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>deriv(deriv(p,i),j)));
const HS=hessian(S2),HD=hessian(D);
const traceProduct=(A,B)=>sum(Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>mul(A[i][j],B[j][i]))).flat());

const Faa=traceProduct(HS,HS);
const Fab=scale(traceProduct(HS,HD),2);
const Fbb=traceProduct(HD,HD);
const isotropic=[1,0,0,0,1,0]; // S=2, D=0
const rankOne=[1,0,0,0,0,0];   // S=1, D=1
const decompose=F=>{
  const A=evaluate(F,isotropic)/4;
  const B=evaluate(F,rankOne)-A;
  const residual=add(add(F,scale(S2,-A)),scale(D,-B));
  return {S2:A,D:B,residualTerms:residual.size};
};
const pieces={alphaSquared:decompose(Faa),alphaBeta:decompose(Fab),betaSquared:decompose(Fbb)};
const probes=[[1,2,3,4,5,6],[2,-1,0,1,3,-2],[0,1,1,2,0,-1]];
const reconstructionPass=Object.entries({alphaSquared:Faa,alphaBeta:Fab,betaSquared:Fbb}).every(([name,F])=>{
  const c=pieces[name];
  return probes.every(p=>evaluate(F,p)===c.S2*evaluate(S2,p)+c.D*evaluate(D,p));
});
const betaGeneratesAlpha=pieces.betaSquared.S2!==0;
const report={
  protocol:"locking-one-loop-quartic-mixing/1",
  field:"real 3x2 matrix K",
  invariants:{S:"tr(K^T K)",D:"S^2-4 det(K^T K)"},
  divergenceKernel:"Tr[(Hessian V4)^2]",
  decomposition:pieces,
  combined:`(${pieces.alphaSquared.S2} alpha^2 + ${pieces.alphaBeta.S2} alpha beta + ${pieces.betaSquared.S2} beta^2) S^2 + (${pieces.alphaSquared.D} alpha^2 + ${pieces.alphaBeta.D} alpha beta + ${pieces.betaSquared.D} beta^2) D`,
  betaGeneratesAlpha,
  interpretation:"At alpha=0, beta self-interactions generate a nonzero S^2 counterterm; beta/alpha >> 1 is not closed under scalar one-loop renormalization without protection or tuning.",
  reconstructionPass
};
report.passed=reconstructionPass&&betaGeneratesAlpha&&Object.values(pieces).every(p=>p.residualTerms===0);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
