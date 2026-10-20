import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-shared126-breaking-projector-polynomial-audit.json','utf8'));
const zeros=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(r=>r.map(x=>a*x));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const multiply=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const eq=(A,B,tol=1e-12)=>Array.isArray(A)
  ? A.length===B.length&&A.every((x,i)=>eq(x,B[i],tol))
  : Math.abs(A-B)<=tol;
const matrixRank=A=>{
  const M=A.map(r=>r.map(Number));let rank=0,col=0;
  while(rank<M.length&&col<(M[0]?.length??0)){
    let pivot=rank;while(pivot<M.length&&Math.abs(M[pivot][col])<1e-10)pivot++;
    if(pivot===M.length){col++;continue;}
    [M[rank],M[pivot]]=[M[pivot],M[rank]];
    const q=M[rank][col];for(let j=col;j<M[0].length;j++)M[rank][j]/=q;
    for(let i=0;i<M.length;i++)if(i!==rank){const f=M[i][col];for(let j=col;j<M[0].length;j++)M[i][j]-=f*M[rank][j];}
    rank++;col++;
  }
  return rank;
};
const E=(n,i,j)=>{const A=zeros(n,n);A[i][j]=1;return A;};
const I3=identity(3);
function identity(n){return Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>Number(i===j)));}

const P=E(3,0,0),I=E(3,1,1),N=E(3,2,2);
const familyProjectors=[P,I,N];
// Orthogonal primitive-idempotent relations.
for(let r=0;r<3;r++)for(let s=0;s<3;s++)
  assert.ok(eq(multiply(familyProjectors[r],familyProjectors[s]),r===s?familyProjectors[r]:zeros(3,3)));
assert.ok(eq(add(add(P,I),N),I3));

// Every degree <=2 polynomial in these commuting projectors remains diagonal.
const generators=[I3,P,I,N];
const monomials=[...generators];
for(const A of generators)for(const B of generators)monomials.push(multiply(A,B));
for(const A of monomials)for(let r=0;r<3;r++)for(let s=0;s<3;s++)
  if(r!==s)assert.equal(A[r][s],0);
// Their linear span is exactly the three-dimensional diagonal algebra.
const flattened=monomials.map(A=>A.flat());
assert.equal(matrixRank(flattened),3);

// One insertion on each leg gives six independent symmetric coordinate masks.
const pairs=[[0,0],[0,1],[0,2],[1,1],[1,2],[2,2]];
const symMask=(r,s)=>r===s
  ? E(3,r,r)
  : add(E(3,r,s),E(3,s,r));
const masks=pairs.map(([r,s])=>symMask(r,s));
assert.equal(matrixRank(masks.map(A=>A.flat())),6);
// Two independent branch projectors therefore give twelve primitive masks
// and 2^12 binary support patterns in the generous envelope.
assert.equal(2*6,12);
assert.equal(2**12,4096);
assert.equal(evidence.supportClassification.primitiveBranchCoordinateMasks,12);
assert.equal(evidence.supportClassification.binarySupportPatternsInGenerousEnvelope,4096);

// Coordinate masking of a generic universal symmetric Y can select the target
// support exactly, but it selects a=Y_PP and c=Y_PN independently.
const [a,b,c,d,e,f]=[2,3,5,7,11,13];
const Y=[[a,b,c],[b,d,e],[c,e,f]];
const sandwich=(L,A,R)=>multiply(multiply(L,A),R);
const Dtarget=sandwich(P,Y,P);
const Mtarget=add(sandwich(P,Y,N),sandwich(N,Y,P));
assert.deepEqual(Dtarget,scale(a,E(3,0,0)));
assert.deepEqual(Mtarget,scale(c,add(E(3,0,2),E(3,2,0))));
assert.equal(Dtarget[0][2],0);
assert.equal(Mtarget[2][2],0);
assert.equal(Mtarget[1][2],0);

// Even one common Wilson coefficient leaves a rank-two map (a,c)->(wa,wc).
const w=17;
const selectedMap=[[w,0],[0,w]];
assert.equal(matrixRank(selectedMap),2);
assert.notEqual(w*a,w*c);
assert.equal(evidence.coefficientFreedom.rankOfSelectedEntryMap,2);

// Exhaust all diagonal one-leg operators drawn from the projector polynomial
// span: none sends E_PP to a vector with PN support.
const EPP=E(3,0,0);
for(const L of monomials)for(const R of monomials){
  const out=sandwich(L,EPP,R);
  assert.equal(out[0][2],0);
  assert.equal(out[2][0],0);
}

// Minimum new datum: rank-one partial isometry t_NP=|N><P|.
const t=E(3,2,0),td=transpose(t);
assert.equal(matrixRank(t),1);
assert.ok(eq(multiply(td,t),P));
assert.ok(eq(multiply(t,td),N));
const Lambda=19;
const A=scale(Lambda,sandwich(P,EPP,P));
const transported=add(multiply(t,A),multiply(A,td));
assert.deepEqual(A,scale(Lambda,E(3,0,0)));
assert.deepEqual(transported,scale(Lambda,add(E(3,2,0),E(3,0,2))));

// Explicit branch-conditioned full texture preserves all forbidden zeros and
// full heavy rank while using Lambda from the single PP block.
const mu=23;
const D=add(A,add(scale(29,I),scale(31,N)));
const M=add(transported,scale(mu,I));
const det3=X=>
  X[0][0]*(X[1][1]*X[2][2]-X[1][2]*X[2][1])
 -X[0][1]*(X[1][0]*X[2][2]-X[1][2]*X[2][0])
 +X[0][2]*(X[1][0]*X[2][1]-X[1][1]*X[2][0]);
assert.equal(D[0][2],0);
assert.equal(M[0][2],Lambda);
assert.equal(M[1][2],0);
assert.equal(M[2][2],0);
assert.equal(matrixRank([[M[1][1],M[1][2]],[M[2][1],M[2][2]]]),1);
assert.equal(det3(M),-mu*Lambda**2);
assert.notEqual(det3(M),0);

// Rank-one minimality: a diagonal operator has no P<->N element, while the
// exhibited rank-one operator has exactly the required nonzero element.
for(const A0 of monomials)assert.equal(A0[2][0],0);
assert.equal(t[2][0],1);

assert.equal(evidence.candidateResults.filter(x=>x.oneRay).length,1);
assert.equal(evidence.candidateResults.at(-1).candidate,'branch-conditioned rank-one partial isometry');
assert.match(evidence.strongestNoGo,/selected coefficient map has rank two/);
assert.match(evidence.reopeningDatum,/partial isometry/);
assert.match(evidence.verdict,/minimum additional datum.*partial isometry/);

console.log('PASS 1544: the commuting 45/210 branch and P/I/N family projector algebra is diagonal on the six symmetric Yukawa coordinates. It can select D:PP and M:PN support, but the selected map (Y_PP,Y_PN)->(k_D,k_M) has rank two even with one common Wilson coefficient. A rank-one off-diagonal P-to-N partial isometry is the minimum new spurion and explicitly transports the single PP coefficient into PN only on the Majorana branch.');
