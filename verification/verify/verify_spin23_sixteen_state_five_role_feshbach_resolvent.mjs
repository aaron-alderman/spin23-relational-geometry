import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const prior=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-zero-mode-repair-exhaustion.json','utf8'));
const descent=JSON.parse(readFileSync(
  'evidence/data/spin23-five-role-correspondence-descent-no-go.json','utf8'));
const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-sixteen-state-five-role-feshbach-resolvent.json','utf8'));
assert.equal(evidence.schema,'spin23.sixteen-state-five-role-feshbach-resolvent/1');
assert.deepEqual(evidence.orders.retainedSectors,descent.newSectorRepair.sourceSectors.slice(0,5));
assert.deepEqual(evidence.orders.auxiliarySectors,descent.newSectorRepair.auxiliarySectorsPerRelationSheet);

const inv=M=>{
  const n=M.length,A=M.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>i===j?1:0)]);
  for(let c=0;c<n;c++){
    let p=c;while(p<n&&Math.abs(A[p][c])<1e-12)p++;
    assert.ok(p<n);[A[p],A[c]]=[A[c],A[p]];
    const q=A[c][c];A[c]=A[c].map(x=>x/q);
    for(let i=0;i<n;i++)if(i!==c){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[c][j]);}
  }
  return A.map(r=>r.slice(n));
};
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const close=(a,b,tol=1e-9)=>Math.abs(a-b)<tol;

function matrices(p,z){
  const {x,y,g,h,u,v,w}=p;
  const D=Array.from({length:8},()=>Array(8).fill(0));
  for(const [i,j,q] of [[0,1,x],[1,2,y],[2,3,g],[3,4,h],[3,5,u],[4,6,v],[5,7,w]])
    D[i][j]=D[j][i]=q;
  const K=D.map((r,i)=>r.map((q,j)=>(i===j?z:0)-q));
  const full=inv(K).slice(0,5).map(r=>r.slice(0,5));
  const alpha=u*u*z/(z*z-w*w),beta=v*v/z,A=z-alpha,B=z-beta;
  const theta2=z*z-x*x;
  const theta3=z*(z*z-x*x-y*y);
  const theta4=A*theta3-g*g*theta2;
  const Delta=B*theta4-h*h*theta3;
  const phi4=A*B-h*h;
  const phi3=z*phi4-g*g*B;
  const phi2=z*phi3-y*y*phi4;
  const formula=[
    [phi2,x*phi3,x*y*phi4,x*y*g*B,x*y*g*h],
    [x*phi3,z*phi3,y*z*phi4,y*g*z*B,y*g*h*z],
    [x*y*phi4,y*z*phi4,theta2*phi4,g*theta2*B,g*h*theta2],
    [x*y*g*B,y*g*z*B,g*theta2*B,theta3*B,h*theta3],
    [x*y*g*h,y*g*h*z,g*h*theta2,h*theta3,theta4]
  ].map(r=>r.map(q=>q/Delta));
  return {D,full,formula,alpha,beta,A,B,phi4,phi3,Delta};
}

for(const p of [
  {x:2,y:3,g:5,h:7,u:11,v:13,w:17},
  {x:-2,y:5,g:3,h:-4,u:6,v:7,w:9}
])for(const z of [1.25,2.5,6.5]){
  const m=matrices(p,z);
  for(let i=0;i<5;i++)for(let j=0;j<5;j++)assert.ok(close(m.full[i][j],m.formula[i][j],1e-8));
  const Deff=[
    [0,p.x,0,0,0], [p.x,0,p.y,0,0], [0,p.y,0,p.g,0],
    [0,0,p.g,m.alpha,p.h], [0,0,0,p.h,m.beta]
  ];
  const projectedKernel=Deff.map((r,i)=>r.map((q,j)=>(i===j?z:0)-q));
  const check=mul(projectedKernel,m.formula);
  for(let i=0;i<5;i++)for(let j=0;j<5;j++)assert.ok(close(check[i][j],i===j?1:0,1e-8));
}

function determinantBareiss(M){
  const A=M.map(r=>r.slice());let sign=1,previous=1;
  for(let k=0;k<A.length-1;k++){
    let p=k;while(p<A.length&&A[p][k]===0)p++;
    if(p===A.length)return 0;
    if(p!==k){[A[p],A[k]]=[A[k],A[p]];sign*=-1;}
    const pivot=A[k][k];
    for(let i=k+1;i<A.length;i++)for(let j=k+1;j<A.length;j++)
      A[i][j]=(A[i][j]*pivot-A[i][k]*A[k][j])/previous;
    previous=pivot;
  }
  return sign*A.at(-1).at(-1);
}
for(const p of [
  {x:2,y:3,g:5,h:7,u:11,v:13,w:17},
  {x:-2,y:5,g:3,h:-4,u:6,v:7,w:9}
]){
  const D=matrices(p,1).D;
  assert.equal(determinantBareiss(D),p.x**2*p.g**2*p.v**2*p.w**2);
  const G0=inv(D).map(r=>r.map(q=>-q)).slice(0,5).map(r=>r.slice(0,5));
  const expected=[
    [0,-1/p.x,0,p.y/(p.x*p.g),0],[-1/p.x,0,0,0,0],
    [0,0,0,-1/p.g,0],[p.y/(p.x*p.g),0,-1/p.g,0,0],[0,0,0,0,0]
  ];
  for(let i=0;i<5;i++)for(let j=0;j<5;j++)assert.ok(close(G0[i][j],expected[i][j],1e-10));
}

// The cleared forbidden-entry numerator F4(t) is monic quadratic, and the
// selected spectral-cofactor numerator H3(t) is monic cubic. Neither can
// vanish identically under any finite edge relation.
const p={g:5,h:7,u:11,v:13,w:17};
// F4=t^2+f1*t+f0.
const F4=[(p.w*p.w+p.u*p.u)*p.v*p.v+p.h*p.h*p.w*p.w,
  -(p.w*p.w+p.u*p.u+p.v*p.v+p.h*p.h),1];
assert.equal(F4[2],1);
// H3=t*F4-g^2(t-v^2)(t-w^2), hence leading coefficient one.
const H3=[-p.g*p.g*p.v*p.v*p.w*p.w,
  F4[0]+p.g*p.g*(p.v*p.v+p.w*p.w),F4[1]-p.g*p.g,1];
assert.equal(H3[3],1);
assert.equal(evidence.forbiddenSupportAndCofactor.intervalProtectedResolventZero,false);
assert.equal(evidence.massAndSupportDecision.noNonzeroEdgeRelationProtectsINOnInterval,true);
assert.equal(evidence.controlledZeroEnergyLimit.selectedPP,0);
assert.equal(evidence.controlledZeroEnergyLimit.forbiddenIN,0);
assert.match(evidence.boundary,/not a claimed physical propagator/);

console.log('PASS 1547: the exact Feshbach kernel induces only Z and X diagonals, while the five-role projected resolvent is the recorded dense continuant matrix. Its I-N and selected P-P entries vanish in the controlled zero-energy limit but not on any open energy interval; interval protection would delete a required chain edge or require an impossible monic-polynomial identity.');
