#!/usr/bin/env node

const mod=(x,p)=>((x%p)+p)%p;
const mul=(A,B,p)=>A.map(r=>B[0].map((_,j)=>mod(r.reduce((s,x,k)=>s+x*B[k][j],0),p)));
const key=A=>A.flat().join(",");
const I=[[1,0],[0,1]];
const pow=(A,n,p)=>{let R=I;for(let i=0;i<n;i++)R=mul(R,A,p);return R;};
const generate=(gens,p)=>{
  const seen=new Map([[key(I),I]]),queue=[I];
  while(queue.length){
    const a=queue.shift();
    for(const g of gens){
      const b=mul(a,g,p),k=key(b);
      if(!seen.has(k)){seen.set(k,b);queue.push(b);}
    }
  }
  return [...seen.values()];
};
const det=(A,p)=>mod(A[0][0]*A[1][1]-A[0][1]*A[1][0],p);
const s1=[[1,1],[0,1]],s2=[[1,0],[-1,1]];
const primes=[2,3,5];
const data=primes.map(p=>{
  const a=s1.map(r=>r.map(x=>mod(x,p))),b=s2.map(r=>r.map(x=>mod(x,p)));
  const group=generate([a,b],p);
  const center=pow(mul(a,b,p),3,p),minusI=[[mod(-1,p),0],[0,mod(-1,p)]];
  const centerSquared=mul(center,center,p);
  const projectiveOrder=group.length/(p===2?1:2);
  return {
    p,
    generatedOrder:group.length,
    expectedSL2Order:p*(p*p-1),
    allDeterminantOne:group.every(g=>det(g,p)===1),
    fullTwist:center,
    minusIdentity:minusI,
    fullTwistIsMinusIdentity:key(center)===key(minusI),
    centerSquaredIsIdentity:key(centerSquared)===key(I),
    minusIdentityEqualsIdentity:key(minusI)===key(I),
    projectiveOrder,
    familiarProjectiveGroup:p===2?"PSL(2,2) ~= S3":p===3?"PSL(2,3) ~= A4":"PSL(2,5) ~= A5"
  };
});
const report={
  protocol:"braid-congruence-reductions/1",
  representation:"sigma1 -> [[1,1],[0,1]], sigma2 -> [[1,0],[-1,1]]",
  reductions:data,
  conclusions:[
    "The braid image surjects onto SL(2,F_p) for p=2,3,5 in the explicit enumeration.",
    "At p=2 the central sign collapses because -I=I.",
    "At odd p the full twist remains the nontrivial central element -I of order two.",
    "Projectivization gives the finite modular shadows S3, A4 and A5 for p=2,3,5.",
    "These quotients are exact arithmetic data but do not supply a Monster action, VOA, or moonshine module."
  ]
};
report.passed=data.every(d=>d.generatedOrder===d.expectedSL2Order&&d.allDeterminantOne&&
  d.fullTwistIsMinusIdentity&&d.centerSquaredIsIdentity)&&
  data[0].minusIdentityEqualsIdentity&&data.slice(1).every(d=>!d.minusIdentityEqualsIdentity);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
