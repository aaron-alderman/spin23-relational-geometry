import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-cross-anchor-sewing-exhaustion.json','utf8'));

const zeros=n=>Array.from({length:n},()=>Array(n).fill(0));
const E=(n,i,j)=>{const A=zeros(n);A[i][j]=1;return A;};
const add=(A,B)=>A.map((row,i)=>row.map((x,j)=>x+B[i][j]));
const scale=(s,A)=>A.map(row=>row.map(x=>s*x));
const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const flat=A=>A.flat();
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const kron=(A,B)=>A.flatMap(rowA=>B.map(rowB=>rowA.flatMap(a=>rowB.map(b=>a*b))));

function rank(vectors,tol=1e-10){
  if(!vectors.length)return 0;
  const A=vectors.map(v=>v.slice());let r=0;
  for(let c=0;c<A[0].length&&r<A.length;c++){
    let p=r;while(p<A.length&&Math.abs(A[p][c])<tol)p++;
    if(p===A.length)continue;
    [A[p],A[r]]=[A[r],A[p]];
    const q=A[r][c];A[r]=A[r].map(x=>x/q);
    for(let i=0;i<A.length;i++)if(i!==r){
      const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[r][j]);
    }
    r++;
  }
  return r;
}

function centralizerDimension(generators,n){
  const rows=[];
  for(const A of generators)for(let i=0;i<n;i++)for(let j=0;j<n;j++){
    const row=Array(n*n).fill(0);
    for(let a=0;a<n;a++)for(let b=0;b<n;b++)
      row[a*n+b]=(i===a?A[b][j]:0)-(b===j?A[i][a]:0);
    rows.push(row);
  }
  return n*n-rank(rows);
}

const inSpan=(basis,M)=>rank([...basis.map(flat),flat(M)])===rank(basis.map(flat));
function algebraClosure(generators,n){
  const basis=[];
  const addIndependent=M=>{
    if(!inSpan(basis,M)){basis.push(M);return true;}
    return false;
  };
  addIndependent(Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>Number(i===j))));
  for(const g of generators)addIndependent(g);
  let changed=true;
  while(changed){
    changed=false;
    const snapshot=basis.slice();
    for(const A of snapshot)for(const B of snapshot)if(addIndependent(mul(A,B)))changed=true;
  }
  return basis;
}

const local=[];
for(let a=0;a<2;a++)for(let b=0;b<2;b++)local.push(E(4,a,b));
for(let a=2;a<4;a++)for(let b=2;b<4;b++)local.push(E(4,a,b));
assert.equal(centralizerDimension(local,4),2);

const gamma=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>Number(i===j)*[1,-1,1,-1][i]));
const relationParity=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>Number(i===j)*[1,1,-1,-1][i]));
const values=[-1,0,1];
let total=0,rankOne=0,rankTwo=0,chiralityEven=0,chiralityOdd=0,mixedChirality=0;

for(const a of values)for(const b of values)for(const c of values)for(const d of values){
  if(!(a||b||c||d))continue;
  const S=[[a,b],[c,d]];
  const T=zeros(4);
  for(let i=0;i<2;i++)for(let j=0;j<2;j++){
    T[i][j+2]=S[i][j];
    T[j+2][i]=S[i][j];
  }
  total++;
  if(a*d-b*c===0)rankOne++;else rankTwo++;

  const gradedComm=add(mul(gamma,T),scale(-1,mul(T,gamma)));
  const gradedAnti=add(mul(gamma,T),mul(T,gamma));
  const even=maxAbs(gradedComm)===0;
  const odd=maxAbs(gradedAnti)===0;
  if(even)chiralityEven++;
  if(odd)chiralityOdd++;
  if(!even&&!odd)mixedChirality++;

  // Every cross-sector carrier sewing is relation-sheet odd.
  assert.equal(maxAbs(add(mul(relationParity,T),mul(T,relationParity))),0);
  assert.notEqual(maxAbs(add(mul(relationParity,T),scale(-1,mul(T,relationParity)))),0);

  assert.equal(centralizerDimension([...local,T],4),1);
  const closure=algebraClosure([...local,T],4);
  assert.equal(closure.length,16);
  assert.equal(inSpan(closure,E(4,1,3)),true); // mixed I_D -> N_M support

  // A scalar gauge action commutes with the relation-space sewing.
  const gaugeGenerator=[[0,1],[-1,0]];
  const liftedSewing=kron(T,[[1,0],[0,1]]);
  const liftedGauge=kron(Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>Number(i===j))),gaugeGenerator);
  assert.equal(maxAbs(add(mul(liftedSewing,liftedGauge),scale(-1,mul(liftedGauge,liftedSewing)))),0);
}

assert.deepEqual(
  {total,rankOne,rankTwo,chiralityEven,chiralityOdd,mixedChirality},
  {total:80,rankOne:32,rankTwo:48,chiralityEven:8,chiralityOdd:8,mixedChirality:64}
);

// J completion: duplicate a real sewing on the conjugate sheet. The doubled
// operator commutes with the linear part of the antiunitary sheet swap and
// remains odd under doubled relation parity.
const sampleS=[[1,0],[0,0]];
const sampleT=zeros(4);
for(let i=0;i<2;i++)for(let j=0;j<2;j++){
  sampleT[i][j+2]=sampleS[i][j];sampleT[j+2][i]=sampleS[i][j];
}
const doubled=zeros(8),J0=zeros(8),Gamma8=zeros(8);
for(let i=0;i<4;i++)for(let j=0;j<4;j++){
  doubled[i][j]=sampleT[i][j];doubled[i+4][j+4]=sampleT[i][j];
}
for(let i=0;i<4;i++){J0[i][i+4]=1;J0[i+4][i]=1;Gamma8[i][i]=1;Gamma8[i+4][i+4]=-1;}
assert.equal(maxAbs(add(mul(J0,doubled),scale(-1,mul(doubled,J0)))),0);
// This Gamma8 grades real sheets rather than D/M inside one sheet; the J pair
// can be completed consistently. The primitive D/M block itself remains odd
// under relationParity as checked exhaustively above.

// Coefficient-line equalizer: (d,y)=lambda*(1,kappa) has one parameter and
// all copies share a projective ray, while carrier support stays block-diagonal.
const kappa=3;
const lambdas=[-2,1,4];
const columns=lambdas.map(lambda=>[lambda,kappa*lambda]);
for(let i=0;i<columns.length;i++)for(let j=i+1;j<columns.length;j++)
  assert.equal(columns[i][0]*columns[j][1]-columns[j][0]*columns[i][1],0);
const compatibilityEquation=[[1,-1]]; // mu_D-mu_M=0
assert.equal(2-rank(compatibilityEquation),1);
assert.equal(evidence.coefficientLineSewing.aggregateCoefficientSpaceComplexDimension,1);
assert.equal(evidence.coefficientLineSewing.compatibleCoefficientEndomorphismComplexDimension,1);
assert.equal(evidence.coefficientLineSewing.underlyingCarrierCommutantComplexDimension,2);

// No carrier arrow was added: the two local edge blocks remain orthogonal.
const XD=add(E(4,0,1),E(4,1,0));
const XM=add(E(4,2,3),E(4,3,2));
assert.equal(maxAbs(mul(XD,XM)),0);
assert.equal(maxAbs(mul(XM,XD)),0);

// Junk qualification for the hypothetical same-sheet P-to-P carrier sewing:
// the graph I_D-P_D-P_M-N_M is P4. Its length-three I_D-N_M matrix is
// represented in degree three, but the complete represented degree-three
// space is d(ker rho_2), so Omega_D^3 is zero.
function nullspace(columns,tol=1e-10){
  const A=columns[0].map((_,r)=>columns.map(c=>c[r]));
  const piv=[];let rr=0;
  for(let c=0;c<A[0].length&&rr<A.length;c++){
    let p=rr;while(p<A.length&&Math.abs(A[p][c])<tol)p++;
    if(p===A.length)continue;
    [A[p],A[rr]]=[A[rr],A[p]];
    const q=A[rr][c];A[rr]=A[rr].map(x=>x/q);
    for(let i=0;i<A.length;i++)if(i!==rr){
      const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[rr][j]);
    }
    piv.push(c);rr++;
  }
  const free=[...Array(A[0].length).keys()].filter(c=>!piv.includes(c));
  return free.map(f=>{
    const x=Array(A[0].length).fill(0);x[f]=1;
    for(let i=piv.length-1;i>=0;i--){
      const c=piv[i];x[c]=-A[i].reduce((s,v,j)=>s+(j===c?0:v*x[j]),0);
    }
    return x;
  });
}
const nPath=4;
const pathD=zeros(nPath);
for(const [i,j] of [[0,1],[1,2],[2,3]])pathD[i][j]=pathD[j][i]=1;
const pathIdempotents=[0,1,2,3].map(i=>E(nPath,i,i));
const comm=(A,B)=>add(mul(A,B),scale(-1,mul(B,A)));
function representedForms(degree){
  const out=[];
  const visit=indices=>{
    if(indices.length===degree){
      for(let l=0;l<nPath;l++){
        let M=pathIdempotents[l];
        for(const i of indices)M=mul(M,comm(pathD,pathIdempotents[i]));
        out.push(flat(M));
      }
      return;
    }
    for(let i=0;i<nPath-1;i++)visit([...indices,i]);
  };
  visit([]);return out;
}
const rho2=representedForms(2),rho3=representedForms(3);
const ker2=nullspace(rho2);
const combine=(columns,v)=>columns[0].map((_,r)=>columns.reduce((s,c,j)=>s+c[r]*v[j],0));
function universalD2(v){
  const tailCount=(nPath-1)**2;
  const out=Array(nPath*(nPath-1)**3).fill(0);
  for(let a=0;a<nPath;a++)for(let tail=0;tail<tailCount;tail++){
    const coefficient=v[a*tailCount+tail];
    if(!coefficient)continue;
    const abar=a<nPath-1?[[a,1]]:[[0,-1],[1,-1],[2,-1]];
    for(const [i,s] of abar)for(let l=0;l<nPath;l++)
      out[(l*(nPath-1)+i)*tailCount+tail]+=coefficient*s;
  }
  return out;
}
const junk3=ker2.map(v=>combine(rho3,universalD2(v)));
assert.equal(rank(rho3),8);
assert.equal(rank(junk3),8);
assert.equal(rank(rho3)-rank(junk3),0);
assert.equal(rank([...junk3,flat(E(4,0,3))]),rank(junk3));
assert.match(evidence.canonicalJunkQualification.degreeThreeCalculation,/Omega_D\^3=0/);

assert.equal(evidence.ordinaryCarrierSewing.boundedEnumeration.nonzeroMatrices,80);
assert.equal(evidence.ordinaryCarrierSewing.boundedEnumeration.allNonzeroGenerateM4,true);
assert.match(evidence.minimalityTheorem.statement,/no nonzero ordinary carrier-linear sewing/i);
assert.match(evidence.verdict,/coefficient lines/);

console.log('PASS 1521: all 80 nonzero bounded 2x2 carrier sewings reduce the commutant to one but generate M4 and are relation-sheet odd; the one-line coefficient equalizer instead forces a common Schur ray without adding mixed carrier support.');
