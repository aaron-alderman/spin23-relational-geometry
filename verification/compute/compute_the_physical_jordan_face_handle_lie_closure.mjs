import assert from 'node:assert/strict';

const zero=()=>Array.from({length:4},()=>Array(4).fill(0));
const multiply=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((sum,value,k)=>sum+value*B[k][j],0)));
const add=(A,B)=>A.map((row,i)=>row.map((value,j)=>value+B[i][j]));
const scale=(x,A)=>A.map(row=>row.map(value=>x*value));
const bracket=(A,B)=>add(multiply(A,B),scale(-1,multiply(B,A)));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const close=(A,B,tolerance=1e-10)=>A.every((row,i)=>row.every((value,j)=>Math.abs(value-B[i][j])<tolerance));
const rank=vectors=>{if(vectors.length===0)return 0;const A=vectors.map(V=>V.flat().slice());let r=0;for(let c=0;c<16;c++){let p=r;while(p<A.length&&Math.abs(A[p][c])<1e-10)p++;if(p===A.length)continue;[A[r],A[p]]=[A[p],A[r]];const q=A[r][c];for(let j=c;j<16;j++)A[r][j]/=q;for(let i=0;i<A.length;i++)if(i!==r){const f=A[i][c];for(let j=c;j<16;j++)A[i][j]-=f*A[r][j];}r++;}return r;};
const independent=(basis,X)=>rank([...basis,X])>rank(basis);

const omega=zero();for(let i=0;i<2;i++){omega[i][i+2]=1;omega[i+2][i]=-1;}
const translation=B=>{const X=zero();for(let i=0;i<2;i++)for(let j=0;j<2;j++)X[i][j+2]=B[i][j];return X;};
const T11=translation([[1,0],[0,0]]);
const T22=translation([[0,0],[0,1]]);
const T12=translation([[0,1],[1,0]]);
const W=omega; // canonical symplectic inversion / TKK grade reversal

for(const X of [T11,T22,T12,W]) assert.ok(close(add(multiply(transpose(X),omega),multiply(omega,X)),zero()));

function lieClosure(seeds){
  const basis=[];for(const X of seeds)if(independent(basis,X))basis.push(X);
  let changed=true;
  while(changed){changed=false;const snapshot=basis.slice();for(let i=0;i<snapshot.length;i++)for(let j=i+1;j<snapshot.length;j++){const B=bracket(snapshot[i],snapshot[j]);if(B.flat().some(v=>Math.abs(v)>1e-10)&&independent(basis,B)){basis.push(B);changed=true;}}}
  return basis;
}

const translationsOnly=lieClosure([T11,T22,T12]);
const diagonalFacesWithHandle=lieClosure([T11,T22,W]);
const isotropicFaceWithHandle=lieClosure([add(T11,T22),W]);
const fullRelationalClosure=lieClosure([T11,T22,T12,W]);

assert.equal(translationsOnly.length,3);
assert.equal(diagonalFacesWithHandle.length,6);
assert.equal(isotropicFaceWithHandle.length,3);
assert.equal(fullRelationalClosure.length,10);

// Verify the ten-dimensional result equals all of sp(4,R) by the defining equation.
for(const X of fullRelationalClosure) assert.ok(close(add(multiply(transpose(X),omega),multiply(omega,X)),zero()));

console.log(JSON.stringify({
  protocol:'physical-jordan-face-handle-lie-closure/1',
  generators:{
    T11:'normal rank-one Jordan translation',
    T22:'tangent rank-one Jordan translation',
    T12:'off-diagonal relational/Jordan translation',
    W:'canonical symplectic inversion and TKK grade reversal'
  },
  closureDimensions:{translationsOnly:translationsOnly.length,isotropicFacePlusW:isotropicFaceWithHandle.length,twoDiagonalFacesPlusW:diagonalFacesWithHandle.length,fullRelationalSet:fullRelationalClosure.length},
  theorem:'The two face translations plus their off-diagonal relationship and one grade-reversing handle generate all of sp(4,R).',
  ablation:'Without the off-diagonal relationship the system closes at dimension six; without grade reversal the translations remain abelian of dimension three.',
  spin23:'dimension ten plus the symplectic defining equation identifies the closure with sp(4,R)=so(2,3).',
  boundary:'The closure is conditional on identifying the physical saturated handle/sideband operation with the canonical TKK grade reversal in the same symplectic typing.',
  passed:true
},null,2));
