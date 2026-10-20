import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-null-mask-matrix-path-junk.json','utf8'));

function analyze(blocks){
  const m=blocks[0].length,n=4,N=n*m;
  const zero=()=>Array.from({length:N},()=>Array(N).fill(0));
  const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
  const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
  const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
  const flat=A=>A.flat();
  const comm=(A,B)=>add(mul(A,B),scale(-1,mul(B,A)));
  const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
  const D=zero();
  for(let edge=0;edge<3;edge++) for(let a=0;a<m;a++) for(let b=0;b<m;b++){
    D[edge*m+a][(edge+1)*m+b]=blocks[edge][a][b];
    D[(edge+1)*m+b][edge*m+a]=blocks[edge][a][b];
  }
  const es=[];
  for(let vertex=0;vertex<n;vertex++){
    const P=zero();
    for(let a=0;a<m;a++) P[vertex*m+a][vertex*m+a]=1;
    es.push(P);
  }
  const rho1=[];
  for(let l=0;l<n;l++) for(let i=0;i<n-1;i++) rho1.push(flat(mul(es[l],comm(D,es[i]))));
  const rho2=[];
  for(let l=0;l<n;l++) for(let i=0;i<n-1;i++) for(let j=0;j<n-1;j++)
    rho2.push(flat(mul(mul(es[l],comm(D,es[i])),comm(D,es[j]))));

  function rank(vectors,tolerance=1e-9){
    if(!vectors.length)return 0;
    const A=vectors.map(v=>v.slice());let r=0;
    for(let c=0;c<A[0].length&&r<A.length;c++){
      let p=r;while(p<A.length&&Math.abs(A[p][c])<tolerance)p++;
      if(p===A.length)continue;
      [A[p],A[r]]=[A[r],A[p]];
      const q=A[r][c];A[r]=A[r].map(x=>x/q);
      for(let z=0;z<A.length;z++)if(z!==r){const f=A[z][c];A[z]=A[z].map((x,j)=>x-f*A[r][j]);}
      r++;
    }
    return r;
  }
  function nullspace(columns,tolerance=1e-9){
    const A=columns[0].map((_,r)=>columns.map(c=>c[r]));const piv=[];let rr=0;
    for(let c=0;c<A[0].length&&rr<A.length;c++){
      let p=rr;while(p<A.length&&Math.abs(A[p][c])<tolerance)p++;
      if(p===A.length)continue;
      [A[p],A[rr]]=[A[rr],A[p]];
      const q=A[rr][c];A[rr]=A[rr].map(x=>x/q);
      for(let z=0;z<A.length;z++)if(z!==rr){const f=A[z][c];A[z]=A[z].map((x,j)=>x-f*A[rr][j]);}
      piv.push(c);rr++;
    }
    const free=[...Array(A[0].length).keys()].filter(c=>!piv.includes(c));
    return free.map(f=>{const x=Array(A[0].length).fill(0);x[f]=1;for(let i=piv.length-1;i>=0;i--){const c=piv[i];x[c]=-A[i].reduce((s,v,j)=>s+(j===c?0:v*x[j]),0);}return x;});
  }
  const combine=(columns,v)=>columns[0].map((_,r)=>columns.reduce((s,c,j)=>s+c[r]*v[j],0));
  const ker1=nullspace(rho1);
  function d1(v){
    const out=Array(n*(n-1)*(n-1)).fill(0);
    for(let a=0;a<n;a++)for(let b=0;b<n-1;b++){
      const coefficient=v[a*(n-1)+b];
      const abar=a<n-1?[[a,1]]:[[0,-1],[1,-1],[2,-1]];
      for(const [i,s] of abar)for(let l=0;l<n;l++)out[(l*(n-1)+i)*(n-1)+b]+=coefficient*s;
    }
    return out;
  }
  const junk=ker1.map(v=>combine(rho2,d1(v)));
  const inSpan=(vectors,v)=>rank([...vectors,v])===rank(vectors);

  const distanceTwo=[];
  for(const [a,b,c] of [[0,1,2],[2,1,0],[1,2,3],[3,2,1]]){
    const M=zero();
    const Kab=a<b?blocks[a]:transpose(blocks[b]);
    const Kbc=b<c?blocks[b]:transpose(blocks[c]);
    const product=mul(Kab,Kbc);
    for(let i=0;i<m;i++)for(let j=0;j<m;j++)M[a*m+i][c*m+j]=product[i][j];
    distanceTwo.push(inSpan(junk,flat(M)));
  }
  return {internalDimension:m,omega1Rank:rank(rho1),omega1KernelDimension:ker1.length,representedOmega2Rank:rank(rho2),junkRank:rank(junk),quotientRank:rank(rho2)-rank(junk),distanceTwoKilled:distanceTwo};
}

const cases=[
  [[[1]],[[2]],[[3]]],
  [[[1,2],[3,5]],[[2,-1],[4,3]],[[1,0.5],[-2,4]]],
  [[[1,2,0],[0,1,3],[4,0,2]],[[2,0,1],[1,3,0],[0,2,5]],[[1,-1,2],[3,2,0],[0,4,1]]],
];
const results=cases.map(analyze);
assert.deepEqual(results.map(r=>r.omega1Rank),[6,6,6]);
assert.deepEqual(results.map(r=>r.junkRank),[4,4,4]);
assert.deepEqual(results.map(r=>r.quotientRank),[4,6,6]);
for(const result of results)assert.deepEqual(result.distanceTwoKilled,[true,true,true,true]);
assert.equal(evidence.theorem.independentOfMatrixCommutation,true);
assert.match(evidence.verdict,/cannot rescue/);
console.log('PASS 1493: arbitrary noncommuting matrix multiplicities enlarge only the diagonal return-loop sector; all four oriented two-step cross-relations remain exact degree-two junk.');
