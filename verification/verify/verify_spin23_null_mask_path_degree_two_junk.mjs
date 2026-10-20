import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence = JSON.parse(readFileSync('evidence/data/spin23-null-mask-path-degree-two-junk.json', 'utf8'));
const n = 4;
const E = (i,j) => Array.from({length:n},(_,r)=>Array.from({length:n},(_,c)=>Number(r===i && c===j)));
const add = (A,B) => A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const mul = (A,B) => A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const scale = (s,A) => A.map(r=>r.map(x=>s*x));
const flat = A => A.flat();
const comm = (A,B) => add(mul(A,B),scale(-1,mul(B,A)));

const D = Array.from({length:n},()=>Array(n).fill(0));
for (const [i,j] of [[0,1],[1,2],[2,3]]) D[i][j]=D[j][i]=1;
const es = [0,1,2,3].map(i=>E(i,i));

// Normalized universal forms use A tensor bar(A)^p. Choose [e0],[e1],[e2]
// as a basis of bar(A)=A/C1, so [e3]=-[e0]-[e1]-[e2].
const rho1=[];
for(let l=0;l<n;l++) for(let i=0;i<n-1;i++)
  rho1.push(flat(mul(es[l],comm(D,es[i]))));

const rho2=[];
for(let l=0;l<n;l++) for(let i=0;i<n-1;i++) for(let j=0;j<n-1;j++)
  rho2.push(flat(mul(mul(es[l],comm(D,es[i])),comm(D,es[j]))));

function rank(vectors,tol=1e-10){
  if(!vectors.length) return 0;
  const A=vectors.map(v=>v.slice()); let r=0;
  for(let c=0;c<A[0].length && r<A.length;c++){
    let p=r; while(p<A.length && Math.abs(A[p][c])<tol) p++;
    if(p===A.length) continue;
    [A[p],A[r]]=[A[r],A[p]];
    const q=A[r][c]; A[r]=A[r].map(x=>x/q);
    for(let i=0;i<A.length;i++) if(i!==r){
      const f=A[i][c]; A[i]=A[i].map((x,j)=>x-f*A[r][j]);
    }
    r++;
  }
  return r;
}

function nullspace(columns,tol=1e-10){
  const A=columns[0].map((_,r)=>columns.map(c=>c[r]));
  const piv=[]; let rr=0;
  for(let c=0;c<A[0].length && rr<A.length;c++){
    let p=rr; while(p<A.length && Math.abs(A[p][c])<tol) p++;
    if(p===A.length) continue;
    [A[p],A[rr]]=[A[rr],A[p]];
    const q=A[rr][c]; A[rr]=A[rr].map(x=>x/q);
    for(let i=0;i<A.length;i++) if(i!==rr){
      const f=A[i][c]; A[i]=A[i].map((x,j)=>x-f*A[rr][j]);
    }
    piv.push(c); rr++;
  }
  const free=[...Array(A[0].length).keys()].filter(c=>!piv.includes(c));
  return free.map(f=>{
    const x=Array(A[0].length).fill(0); x[f]=1;
    for(let i=piv.length-1;i>=0;i--){
      const c=piv[i];
      x[c]=-A[i].reduce((s,v,j)=>s+(j===c?0:v*x[j]),0);
    }
    return x;
  });
}

const combine=(columns,v)=>columns[0].map((_,r)=>columns.reduce((s,c,j)=>s+c[r]*v[j],0));
const ker1=nullspace(rho1);

// d(e_a d e_b)=d e_a d e_b = 1 tensor [e_a] tensor [e_b].
function d1(v){
  const out=Array(n*(n-1)*(n-1)).fill(0);
  for(let a=0;a<n;a++) for(let b=0;b<n-1;b++){
    const coefficient=v[a*(n-1)+b];
    if(!coefficient) continue;
    const abar=a<n-1?[[a,1]]:[[0,-1],[1,-1],[2,-1]];
    for(const [i,s] of abar) for(let l=0;l<n;l++)
      out[(l*(n-1)+i)*(n-1)+b]+=coefficient*s;
  }
  return out;
}

const junk=ker1.map(v=>combine(rho2,d1(v)));
assert.equal(rank(rho1),6);
assert.equal(ker1.length,6);
assert.equal(rank(rho2),8);
assert.equal(rank(junk),4);
assert.equal(rank(rho2)-rank(junk),4);

const inSpan=(vectors,v)=>rank([...vectors,v])===rank(vectors);
for(const [i,j] of [[0,2],[2,0],[1,3],[3,1]]){
  const unit=flat(E(i,j));
  assert.equal(inSpan(rho2,unit),true,`E${i}${j} must be represented in degree two`);
  assert.equal(inSpan(junk,unit),true,`E${i}${j} must be junk`);
}
for(let i=0;i<n;i++){
  const unit=flat(E(i,i));
  assert.equal(inSpan(rho2,unit),true,`E${i}${i} must be represented in degree two`);
  assert.equal(inSpan(junk,unit),false,`E${i}${i} must survive junk`);
}

// The bare mixed Jordan product of adjacent self-adjoint edges is precisely
// the distance-two direction that the quotient kills.
const X01=add(E(0,1),E(1,0));
const X12=add(E(1,2),E(2,1));
const mixedJordan=scale(0.5,add(mul(X01,X12),mul(X12,X01)));
assert.equal(inSpan(junk,flat(mixedJordan)),true);

assert.equal(evidence.canonicalWitness.quotientOmega2Dimension,4);
assert.deepEqual(evidence.degreeTwoDirections.junk,['E02','E20','E13','E31']);
console.log('PASS 1492: the canonical C^4 path has six represented one-forms; its four distance-two degree-two relations are exactly junk, leaving only four population directions in Omega_D^2.');
