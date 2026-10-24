import assert from "node:assert/strict";

const EPS=1e-9;
const zero=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(r=>r.map(x=>a*x));
const block=(A,B,C,D)=>A.map((r,i)=>[...r,...B[i]]).concat(C.map((r,i)=>[...r,...D[i]]));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const det=A=>A.length===1?A[0][0]:A[0].reduce((s,x,j)=>s+(j%2?-1:1)*x*det(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const leadingMinors=A=>Array.from({length:A.length},(_,k)=>det(A.slice(0,k+1).map(r=>r.slice(0,k+1))));

const E=[[3/5,5/13],[4/5,0],[0,12/13]];
const z22=zero(2,2),z23=zero(2,3),z32=zero(3,2),z33=zero(3,3);
const Xplus=block(z22,tr(E),E,z33),Xminus=block(z22,scale(-1,tr(E)),E,z33);
const Q=block(scale(-1,eye(2)),z23,z32,eye(3)),H=eye(5);
assert.ok(maxAbs(add(mm(tr(Xplus),Q),mm(Q,Xplus)))<EPS);
assert.ok(maxAbs(add(mm(tr(Xminus),H),mm(H,Xminus)))<EPS);
const gram=mm(tr(E),E);
assert.ok(Math.abs(gram[0][0]+gram[1][1]-2)<EPS);
assert.ok(Math.abs(det(gram)-160/169)<EPS);
const sigmaMax=Math.sqrt(16/13),gamma=2;

const Acompact=add(scale(-gamma,H),Xminus);
const Anoncompact=add(scale(-gamma,H),Xplus);
const Dcompact=scale(2*gamma,H);
const Dnoncompact=scale(-1,add(Anoncompact,tr(Anoncompact)));
assert.ok(maxAbs(add(add(Acompact,tr(Acompact)),Dcompact))<EPS);
assert.ok(maxAbs(add(add(Anoncompact,tr(Anoncompact)),Dnoncompact))<EPS);
assert.ok(leadingMinors(Dcompact).every(x=>x>EPS));
assert.ok(leadingMinors(Dnoncompact).every(x=>x>EPS));

// Onsager-Casimir reversal: block time-reversal parities determine the sign.
const same2=eye(2),same3=eye(3),opposite2=scale(-1,eye(2)),opposite3=eye(3);
const reverseSame=mm(mm(same2,tr(E)),same3);
const reverseOpposite=mm(mm(opposite2,tr(E)),opposite3);
assert.ok(maxAbs(add(reverseSame,scale(-1,tr(E))))<EPS);
assert.ok(maxAbs(add(reverseOpposite,tr(E)))<EPS);

console.log(JSON.stringify({
  status:"PASS",
  checkpointSingularValuesSquared:[16/13,10/13],
  undampedRoles:{noncompact:"X+ has real pairs +/-sigma and is a saddle as a direct real-time generator",compact:"X- has imaginary pairs +/-i sigma and is lossless for the positive norm"},
  deterministicPassivity:{compact:"any gamma>=0 for -gamma I+X-",noncompact:`requires gamma>=g*sigma_max; sigma_max=${sigmaMax}`},
  causalStableWitnesses:{gamma,compact:true,noncompact:true},
  positiveStationaryNoiseWitnesses:{compactDiffusion:"2 gamma I",noncompactDiffusion:"2(gamma I-X+)",bothStationaryCovariance:"I5"},
  strictDetailedBalance:{noncompactDampedWitness:true,compactWitness:"has a reversible circulating/Hamiltonian current unless endpoint time-reversal parities reverse it"},
  onsagerCasimir:{sameEndpointParity:"+E^T",oppositeEndpointParity:"-E^T"},
  verdict:"causality, stability, passivity and equilibrium covariance do not universally select the branch; endpoint time-reversal parity or an explicitly typed Wick/coherent complex structure does"
}));
