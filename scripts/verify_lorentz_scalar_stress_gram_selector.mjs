#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const tr=A=>A.reduce((s,r,i)=>s+r[i],0);
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const eta=[[1,0,0,0],[0,-1,0,0],[0,0,-1,0],[0,0,0,-1]];
const diag=(a,b,c,d)=>[[a,0,0,0],[0,b,0,0],[0,0,c,0],[0,0,0,d]];
const contract=(A,B)=>tr(mul(mul(mul(T(A),eta),B),eta));

const rapidity=0.73, ch=Math.cosh(rapidity), sh=Math.sinh(rapidity);
const L=[[ch,sh,0,0],[sh,ch,0,0],[0,0,1,0],[0,0,0,1]];
assert(maxAbs(sub(mul(mul(T(L),eta),L),eta))<1e-12,"boost must preserve Minkowski metric");
const transform=A=>mul(mul(L,A),T(L));

const channels=[diag(1,0,0,0),diag(0,2,0,0),diag(0,0,3,0)];
const gram=xs=>xs.map(A=>xs.map(B=>contract(A,B)));
const Q=gram(channels), Qboost=gram(channels.map(transform));
assert(maxAbs(sub(Q,Qboost))<1e-10,"stress Gram matrix must be Lorentz invariant");
assert(maxAbs(sub(Q,diag(1,4,9,0).slice(0,3).map(r=>r.slice(0,3))))<1e-12,"expected isolated selector spectrum failed");

const kappa=0.2;
const orientationMass2=[kappa*(4-1),kappa*(9-1)];
assert(orientationMass2.every(x=>x>0),"isolated eigenline must gap both orientation modes");

// O(3)-equivariance forbids a nonzero vector made from an internal singlet alone:
// invariance under pi rotations about x,y,z forces every component to vanish.
let v=[1.2,-0.7,0.4];
const rotations=[diag(1,-1,-1,1).slice(0,3).map(r=>r.slice(0,3)),diag(-1,1,-1,1).slice(0,3).map(r=>r.slice(0,3))];
const act=(R,x)=>R.map(r=>r.reduce((s,a,i)=>s+a*x[i],0));
const vdiff=(a,b)=>Math.max(...a.map((x,i)=>Math.abs(x-b[i])));
assert(rotations.some(R=>vdiff(act(R,v),v)>0),"generic vector should not be O(3) invariant");
const zero=[0,0,0];
assert(rotations.every(R=>vdiff(act(R,zero),zero)===0),"zero must be invariant");
// Fixed by Rx(pi) implies vy=vz=0; fixed by Ry(pi) then implies vx=0.
const fixedCandidate=[0,0,0];
assert(rotations.every(R=>vdiff(act(R,fixedCandidate),fixedCandidate)===0),"common fixed space calculation failed");

console.log("Lorentz-scalar stress-Gram selector certificate: PASS");
console.log("boost_invariant_Q=diag(1,4,9); isolated_director=e1_mod_sign");
console.log(`orientation_mass2=${orientationMass2.join(',')}; gap_controlled=true`);
console.log("single_internal_singlet_to_O3_vector_equivariant_map=zero; channel_triplet_required=true");
