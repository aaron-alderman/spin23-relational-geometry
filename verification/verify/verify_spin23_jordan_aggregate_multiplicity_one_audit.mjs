import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-jordan-aggregate-multiplicity-one-audit.json','utf8'));

const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b){[a,b]=[b,a%b];}return a;};
const rat=(n,d=1n)=>{
  n=BigInt(n);d=BigInt(d);
  if(n===0n)return {n:0n,d:1n};
  if(d<0n){n=-n;d=-d;}
  const g=gcd(n,d);
  return {n:n/g,d:d/g};
};
const sub=(a,b)=>rat(a.n*b.d-b.n*a.d,a.d*b.d);
const div=(a,b)=>rat(a.n*b.d,a.d*b.n);
const isZero=a=>a.n===0n;

function rationalRank(integerRows){
  if(integerRows.length===0)return 0;
  const A=integerRows.map(row=>row.map(x=>rat(x)));
  const rows=A.length,cols=A[0].length;
  let r=0;
  for(let c=0;c<cols&&r<rows;c++){
    let pivot=r;
    while(pivot<rows&&isZero(A[pivot][c]))pivot++;
    if(pivot===rows)continue;
    [A[r],A[pivot]]=[A[pivot],A[r]];
    const p=A[r][c];
    for(let j=c;j<cols;j++)A[r][j]=div(A[r][j],p);
    for(let i=0;i<rows;i++)if(i!==r&&!isZero(A[i][c])){
      const f=A[i][c];
      for(let j=c;j<cols;j++)A[i][j]=sub(A[i][j],rat(f.n*A[r][j].n,f.d*A[r][j].d));
    }
    r++;
  }
  return r;
}

const zeros=n=>Array.from({length:n},()=>Array(n).fill(0));
const E=(n,i,j)=>{const A=zeros(n);A[i][j]=1;return A;};
const add=(A,B)=>A.map((row,i)=>row.map((x,j)=>x+B[i][j]));
const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));

function centralizerDimension(generators,n){
  const rows=[];
  for(const A of generators){
    for(let i=0;i<n;i++)for(let j=0;j<n;j++){
      const row=Array(n*n).fill(0);
      for(let a=0;a<n;a++)for(let b=0;b<n;b++){
        row[a*n+b]=(i===a?A[b][j]:0)-(b===j?A[i][a]:0);
      }
      rows.push(row);
    }
  }
  return n*n-rationalRank(rows);
}

const P=E(3,0,0),I=E(3,1,1),N=E(3,2,2);
const XPI=add(E(3,0,1),E(3,1,0));
const XPN=add(E(3,0,2),E(3,2,0));
const XIN=add(E(3,1,2),E(3,2,1));

const ladder=[
  centralizerDimension([],3),
  centralizerDimension([P],3),
  centralizerDimension([P,I,N],3),
  centralizerDimension([P,I,N,XPI],3),
  centralizerDimension([P,I,N,XPI,XPN],3)
];
assert.deepEqual(ladder,[9,5,3,2,1]);
assert.deepEqual(evidence.familyCentralizerLadder.map(x=>x.complexDimension),ladder);

// The mixed Jordan product of the two untyped wheels restores the I-N edge.
assert.deepEqual(add(mul(XPI,XPN),mul(XPN,XPI)),XIN);

// A generation-blind irreducible internal action has exact commutant
// I_internal tensor M_3(C), hence complex dimension nine.
const kron=(A,B)=>A.flatMap(rowA=>B.map(rowB=>rowA.flatMap(a=>rowB.map(b=>a*b))));
const I3=add(add(P,I),N);
const internalMatrixUnits=[E(2,0,0),E(2,0,1),E(2,1,0),E(2,1,1)];
const generationBlindGenerators=internalMatrixUnits.map(A=>kron(A,I3));
assert.equal(centralizerDimension(generationBlindGenerators,6),9);
assert.equal(evidence.factorizationTheorem.relevantDimensions.combinedHomComplexDimension,9);

// Keeping two independently typed irreducible two-state sectors gives one
// scalar per sector, not one scalar globally.
const typedGenerators=[];
for(let a=0;a<2;a++)for(let b=0;b<2;b++)typedGenerators.push(E(4,a,b));
for(let a=2;a<4;a++)for(let b=2;b<4;b++)typedGenerators.push(E(4,a,b));
assert.equal(centralizerDimension(typedGenerators,4),2);
assert.equal(evidence.typedAnchorTheorem.complexCentralizerDimension,2);

// Rank-one and rank-two projectors cannot be related by similarity.
const Q=add(I,N);
const trace=A=>A.reduce((s,row,i)=>s+row[i],0);
assert.equal(trace(P),1);
assert.equal(trace(Q),2);
assert.notEqual(trace(P),trace(Q));

// Conditional SO(1,2) minor-vector test: the form is preserved, but the
// standard vector representation has no nonzero fixed vector.
const eta=[[1,0,0],[0,-1,0],[0,0,-1]];
const K1=[[0,1,0],[1,0,0],[0,0,0]];
const K2=[[0,0,1],[0,0,0],[1,0,0]];
const J=[[0,0,0],[0,0,-1],[0,1,0]];
for(const A of [K1,K2,J]){
  const condition=add(mul(transpose(A),eta),mul(eta,A));
  assert.equal(maxAbs(condition),0);
}
const invariantRows=[...K1,...K2,...J];
assert.equal(3-rationalRank(invariantRows),0);
assert.equal(evidence.threePacketNullVectorTest.fixedSubspaceDimension,0);
const nullVector=[5,4,3];
const q=nullVector[0]**2-nullVector[1]**2-nullVector[2]**2;
assert.equal(q,0);
const act=(A,v)=>A.map(row=>row.reduce((s,x,i)=>s+x*v[i],0));
assert.notDeepEqual(act(K1,nullVector),[0,0,0]);

assert.match(evidence.aggregateVerdict.publishedPhysicalCarrier,/dimension 9/);
assert.match(evidence.aggregateVerdict.untypedGlobalRepair,/Sp\(6,R\)/);
assert.match(evidence.exactReopeningDatum.primary,/cross-anchor sewing/);
assert.match(evidence.verdict,/do not force aggregate multiplicity one/);

console.log('PASS 1518: exact commutant ladder 9->5->3->2->1; scalar multiplicity occurs only after the two untyped wheels generate the mixed I-N edge, while protected opposite-anchor typing retains two scalars. The conditional SO(1,2) minor vector has no nonzero invariant but admits non-invariant null orbits.');
