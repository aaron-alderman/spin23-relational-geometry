import assert from "node:assert/strict";

const EPS=1e-9;
const zero=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(r=>r.map(x=>a*x));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const block=(A,B,C,D)=>A.map((r,i)=>[...r,...B[i]]).concat(C.map((r,i)=>[...r,...D[i]]));
const rank=A0=>{const A=A0.map(r=>r.slice());let row=0;for(let col=0;col<A[0].length&&row<A.length;col++){let p=row;for(let i=row+1;i<A.length;i++)if(Math.abs(A[i][col])>Math.abs(A[p][col]))p=i;if(Math.abs(A[p][col])<EPS)continue;[A[row],A[p]]=[A[p],A[row]];const d=A[row][col];A[row]=A[row].map(x=>x/d);for(let i=0;i<A.length;i++)if(i!==row){const f=A[i][col];A[i]=A[i].map((x,j)=>x-f*A[row][j]);}row++;}return row;};
const symmetricBasis=n=>{const out=[];for(let i=0;i<n;i++)for(let j=i;j<n;j++){const S=zero(n,n);S[i][j]=S[j][i]=1;out.push(S);}return out;};
const invariantFormDimension=generators=>{const basis=symmetricBasis(5),eqs=[];for(const X of generators)for(let i=0;i<5;i++)for(let j=0;j<5;j++)eqs.push(basis.map(S=>add(mm(tr(X),S),mm(S,X))[i][j]));return basis.length-rank(eqs);};
const comm=(A,B)=>add(mm(A,B),scale(-1,mm(B,A)));
const spanRank=xs=>rank(xs.map(x=>x.flat()));
const closure=seeds=>{const xs=[];for(const x of seeds)if(spanRank([...xs,x])>xs.length)xs.push(x);let changed=true;while(changed){changed=false;const snapshot=xs.slice();for(let i=0;i<snapshot.length;i++)for(let j=i+1;j<snapshot.length;j++){const c=comm(snapshot[i],snapshot[j]);if(maxAbs(c)>EPS&&spanRank([...xs,c])>xs.length){xs.push(c);changed=true;}}}return xs;};

const z22=zero(2,2),z23=zero(2,3),z32=zero(3,2),z33=zero(3,3);
const so2=[[0,-1],[1,0]];
const skew3=[];for(let i=0;i<3;i++)for(let j=i+1;j<3;j++){const A=zero(3,3);A[i][j]=-1;A[j][i]=1;skew3.push(A);}
const compact=[block(so2,z23,z32,z33),...skew3.map(A=>block(z22,z23,z32,A))];
assert.equal(invariantFormDimension(compact),2);

const crossPlus=[],crossMinus=[];
for(let a=0;a<3;a++)for(let i=0;i<2;i++){
  const E=zero(3,2);E[a][i]=1;
  crossPlus.push(block(z22,tr(E),E,z33));
  crossMinus.push(block(z22,scale(-1,tr(E)),E,z33));
}
const Q=block(scale(-1,eye(2)),z23,z32,eye(3));
const H=eye(5);
for(const X of compact)assert.ok(maxAbs(add(mm(tr(X),Q),mm(Q,X)))<EPS);
for(const X of crossPlus)assert.ok(maxAbs(add(mm(tr(X),Q),mm(Q,X)))<EPS);
for(const X of compact)assert.ok(maxAbs(add(mm(tr(X),H),mm(H,X)))<EPS);
for(const X of crossMinus)assert.ok(maxAbs(add(mm(tr(X),H),mm(H,X)))<EPS);
assert.equal(invariantFormDimension([...compact,...crossPlus]),1);
assert.equal(invariantFormDimension([...compact,...crossMinus]),1);
assert.equal(closure(crossPlus).length,10);
assert.equal(closure(crossMinus).length,10);

// The first channel basis element makes the adjoint identities explicit.
const E=zero(3,2);E[0][0]=1;
const N=block(z22,z23,E,z33);
const qAdj=mm(mm(Q,tr(N)),Q); // Q^{-1}=Q
const hAdj=tr(N);
assert.ok(maxAbs(add(add(N,scale(-1,qAdj)),scale(-1,crossPlus[0])))<EPS);
assert.ok(maxAbs(add(add(N,hAdj),scale(-1,crossPlus[0])))<EPS);
assert.ok(maxAbs(add(add(N,scale(-1,hAdj)),scale(-1,crossMinus[0])))<EPS);

console.log(JSON.stringify({
  status:"PASS",
  compactEndpointInvariantForms:{dimension:2,normalForm:"diag(a I2,b I3)"},
  noncompactCompletion:{reverse:"+E^T",invariantFormDimension:1,form:"diag(-I2,+I3)",signature:[2,3],closure:"so(2,3)",dimension:closure(crossPlus).length},
  compactCompletion:{reverse:"-E^T",invariantFormDimension:1,form:"I5",signature:[5,0],closure:"so(5)",dimension:closure(crossMinus).length},
  qAdjointIdentity:"N_E - N_E^sharp_Q = N_E + N_E^T",
  verdict:"the split and dagger narrow the problem to a sign/phase fork; they do not by themselves choose the Spin(2,3) branch"
}));
