#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-off-shell-product-curvature-response-v1.json",
  import.meta.url,
),"utf8"));

const d=4;
const delta=(i,j)=>i===j?1:0;
const close=(x,y)=>assert.ok(Math.abs(x-y)<1e-10*Math.max(1,Math.abs(y)));

const insertedCoefficient=({Ric,Pv,Lambda,exponential,riemannOverride})=>{
  let R=0;
  for(let i=0;i<d;i++) R+=Ric[i][i];

  // Weyl-free representative with the requested Ricci tensor.  The final
  // contraction is insensitive to the unused Weyl freedom on these
  // locally symmetric test backgrounds.
  const ricciRepresentative=(i,j,k,l)=>{
    const ric=(
      delta(i,k)*Ric[l][j]-delta(i,l)*Ric[k][j]
      -delta(j,k)*Ric[l][i]+delta(j,l)*Ric[k][i]
    )/(d-2);
    const scalar=-R*(
      delta(i,k)*delta(j,l)-delta(i,l)*delta(j,k)
    )/((d-1)*(d-2));
    return ric+scalar;
  };
  const riemann=riemannOverride??ricciRepresentative;
  const J=(v,m,n)=>0.5*Pv[v]*delta(m,n)
    -0.5*(delta(v,m)*Pv[n]+delta(v,n)*Pv[m]);
  const deWitt=(m,n,a,b)=>0.5*(delta(m,a)*delta(n,b)+delta(m,b)*delta(n,a))
    -0.5*delta(m,n)*delta(a,b);

  const Q=h=>{
    let trace=0;
    let norm=0;
    for(let i=0;i<d;i++){
      trace+=h[i][i];
      for(let j=0;j<d;j++) norm+=h[i][j]*h[i][j];
    }
    let q=-(2*Lambda-R)*norm/4+(2*Lambda-R)*trace*trace/8;
    for(let m=0;m<d;m++) for(let n=0;n<d;n++){
      let h2=0;
      for(let l=0;l<d;l++) h2+=h[m][l]*h[l][n];
      q-=0.5*(h2-trace*h[m][n])*Ric[m][n];
    }
    for(let m=0;m<d;m++) for(let n=0;n<d;n++)
    for(let l=0;l<d;l++) for(let r=0;r<d;r++)
      q-=0.5*h[m][l]*h[n][r]*riemann(m,n,l,r);

    if(exponential){
      for(let m=0;m<d;m++) for(let n=0;n<d;n++){
        const eom=Ric[m][n]+(-R/2+Lambda)*delta(m,n);
        let h2=0;
        for(let l=0;l<d;l++) h2+=h[m][l]*h[l][n];
        q+=0.5*eom*h2;
      }
    }
    return q;
  };

  let JPDWJ=0;
  let fourQ=0;
  for(let v=0;v<d;v++){
    const y=Array.from({length:d},()=>Array(d).fill(0));
    for(let m=0;m<d;m++) for(let n=0;n<d;n++)
    for(let a=0;a<d;a++) for(let b=0;b<d;b++)
      y[m][n]+=deWitt(m,n,a,b)*J(v,a,b);
    for(let m=0;m<d;m++) for(let n=0;n<d;n++)
      JPDWJ+=J(v,m,n)*y[m][n];
    fourQ+=4*Q(y);
  }
  return {R,JPDWJ,fourQ,C:R*JPDWJ/6-fourQ};
};

const einstein=insertedCoefficient({
  Ric:[[3,0,0,0],[0,3,0,0],[0,0,3,0],[0,0,0,3]],
  Pv:[1,2,0,0],
  Lambda:3,
  exponential:true,
});
close(einstein.C,-einstein.R*5/6);

const product=insertedCoefficient({
  Ric:[[-2,0,0,0],[0,-2,0,0],[0,0,-4,0],[0,0,0,-4]],
  Pv:[1,0,0,0],
  Lambda:-3,
  exponential:true,
  riemannOverride:(i,j,k,l)=>{
    const factor=x=>x<2?0:1;
    if(factor(i)!==factor(j)||factor(i)!==factor(k)||factor(i)!==factor(l)) return 0;
    const sectional=i<2?-2:-4;
    return sectional*(delta(i,k)*delta(j,l)-delta(i,l)*delta(j,k));
  },
});
close(product.R,-12);
close(product.JPDWJ,2);
close(product.fourQ,-3);
close(product.C,-1);

const linearProduct=insertedCoefficient({
  Ric:[[-2,0,0,0],[0,-2,0,0],[0,0,-4,0],[0,0,0,-4]],
  Pv:[1,0,0,0],
  Lambda:-3,
  exponential:false,
  riemannOverride:(i,j,k,l)=>{
    const factor=x=>x<2?0:1;
    if(factor(i)!==factor(j)||factor(i)!==factor(k)||factor(i)!==factor(l)) return 0;
    const sectional=i<2?-2:-4;
    return sectional*(delta(i,k)*delta(j,l)-delta(i,l)*delta(j,k));
  },
});
assert.notEqual(linearProduct.C,product.C);

// C=-1 in -(A/4)*4*kappa*C/(16*pi^2 eps), followed by the
// factor two from matching the effective-action density to (1/2)P P^2.
const PResidual=2*(-0.25)*4*product.C/16;
close(PResidual,1/8);
const EResidual=-1/4;
const v=PResidual-EResidual;
const u=-EResidual/12-v/4;
close(v,3/8);
close(u,-7/96);

assert.equal(evidence.contractions.Cproduct,-1);
assert.equal(evidence.remainingReducedBosonicQuadraticAxialResponses,0);

console.log("Spin(2,3) off-shell product curvature response: PASS");
console.log("  Einstein normalization check: C=-(R/6)P^2");
console.log("  product exponential-split coefficient: C=-1");
console.log("  residuals: E=-kappa*A/(4*pi^2*epsilon), P=kappa*A/(8*pi^2*epsilon)");
console.log("  mixed deltaXiR=-7*kappa*A/(96*pi^2*epsilon)");
console.log("  mixed deltaXiRic=3*kappa*A/(8*pi^2*epsilon)");
console.log("  remaining reduced-bosonic quadratic axial responses: zero");
