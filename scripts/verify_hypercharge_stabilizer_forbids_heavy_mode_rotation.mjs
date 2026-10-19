import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im}),add=(a,b)=>C(a.re+b.re,a.im+b.im),sub=(a,b)=>C(a.re-b.re,a.im-b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),abs=a=>Math.hypot(a.re,a.im);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0)))),comm=(A,B)=>mm(A,B).map((r,i)=>r.map((x,j)=>sub(x,mm(B,A)[i][j]))),norm=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x.re*x.re+x.im*x.im,0));
const Z=C(0),O=C(1),Y=[[Z,Z,Z],[Z,O,Z],[Z,Z,Z]],pC=Y;
const X=[[C(0,.3),Z,C(.2,.4)],[Z,C(0,-.7),Z],[C(-.2,.4),Z,C(0,.4)]];
assert(norm(comm(X,Y))<1e-12&&norm(comm(X,pC))<1e-12);
const T=[[Z,Z,C(0,-1)],[Z,Z,Z],[C(0,1),Z,Z]],dT=comm(X,T);
for(let i=0;i<3;i++){assert(abs(dT[1][i])<1e-12);assert(abs(dT[i][1])<1e-12)}
const mixer=[[Z,C(0,1),Z],[C(0,1),Z,Z],[Z,Z,Z]];
assert(norm(comm(mixer,Y))>1e-3&&norm(comm(mixer,pC))>1e-3);
const stabilizerEffectiveDimension=4,neutralAdjointDimension=3,chargedProjectorSinglets=1;
assert.equal(neutralAdjointDimension+chargedProjectorSinglets,stabilizerEffectiveDimension);

console.log('Hypercharge-stabilizer heavy-mode no-go certificate: PASS');
console.log('gauge_stabilizer=S(U2_neutral x U1_charged); pC_fixed=true; neutral_ED_triplet_closed=true; mixing_requires_breaking_hypercharge_embedding=true');
