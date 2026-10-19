import assert from 'node:assert/strict';

const p=3,mod=x=>((x%p)+p)%p;
const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>mod(row.reduce((s,x,k)=>s+x*B[k][j],0))));
const key=A=>A.flat().map(mod).join('');
const eq=(A,B)=>key(A)===key(B);
const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const U=[[1,0,0,0],[0,1,0,0],[0,1,1,0],[1,0,0,1]];
const pow=(A,n)=>{let X=I;while(n--)X=mul(A,X);return X;};
const Z=pow(mul(H,R),2);
const U2=pow(U,2);

const F1=[[0,0,1,0],[0,1,0,0],[-1,0,0,0],[0,0,0,1]];
const F2=[[1,0,0,0],[0,0,0,1],[0,0,1,0],[0,-1,0,0]];
const D1=[[1,0,0,0],[0,1,0,0],[1,0,1,0],[0,0,0,1]];
const D2=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,1,0,1]];
const swap=H;
const gens=[F1,F2,D1,D2,swap,U];
const queue=[I],seen=new Set([key(I)]);
for(let h=0;h<queue.length;h++)for(const g of gens){const x=mul(queue[h],g),k=key(x);if(!seen.has(k)){seen.add(k);queue.push(x);}}
assert.equal(queue.length,51840);

const conjugatorsToU=queue.filter(g=>eq(mul(g,Z),mul(U,g)));
const conjugatorsToU2=queue.filter(g=>eq(mul(g,Z),mul(U2,g)));
const centralizerZ=queue.filter(g=>eq(mul(g,Z),mul(Z,g)));
const centralizerU=queue.filter(g=>eq(mul(g,U),mul(U,g)));
assert.equal(conjugatorsToU.length,0);
assert.equal(conjugatorsToU2.length,0);

const subZ=new Set([key(I),key(Z),key(pow(Z,2))]);
const subU=new Set([key(I),key(U),key(U2)]);
assert.notDeepEqual([...subZ].sort(),[...subU].sort());

const rank=A=>{
  const M=A.map(row=>row.map(mod));let r=0;
  for(let c=0;c<4;c++){
    let k=r;while(k<4&&M[k][c]===0)k++;if(k===4)continue;
    [M[r],M[k]]=[M[k],M[r]];const inv=M[r][c]===1?1:2;M[r]=M[r].map(x=>mod(inv*x));
    for(let i=0;i<4;i++)if(i!==r&&M[i][c]){const f=M[i][c];M[i]=M[i].map((x,j)=>mod(x-f*M[r][j]));}
    r++;
  }
  return r;
};
const diffI=A=>A.map((row,i)=>row.map((x,j)=>mod(x-I[i][j])));
assert.equal(rank(diffI(Z)),2);assert.equal(rank(diffI(U)),2);
assert.ok(eq(mul(diffI(Z),diffI(Z)),Array.from({length:4},()=>Array(4).fill(0))));
assert.ok(eq(mul(diffI(U),diffI(U)),Array.from({length:4},()=>Array(4).fill(0))));

console.log(JSON.stringify({
  protocol:'central-selector-versus-mutual-shear-mod-three/1',
  sp4F3Order:queue.length,
  integerDistinction:{Z:'finite order 3',U:'infinite-order primitive unipotent shear'},
  moduloThree:{ZOrder:3,UOrder:3,rankZMinusI:2,rankUMinusI:2,squareZeroNilpotentParts:true},
  sameCyclicSubgroup:false,
  conjugateToU:conjugatorsToU.length>0,
  conjugateToUInverse:conjugatorsToU2.length>0,
  conjugatorCounts:{toU:conjugatorsToU.length,toUInverse:conjugatorsToU2.length},
  centralizerOrders:{Z:centralizerZ.length,U:centralizerU.length},
  conjugacyClassSizes:{Z:queue.length/centralizerZ.length,U:queue.length/centralizerU.length},
  conclusion:'The central selector phase and primitive mutual shear are distinct integral operations, distinct cyclic subgroups modulo three, and not conjugate in Sp(4,F3), even up to inversion. Equal order, rank and nilpotency type do not identify them.',
  boundary:'The central selector register cannot be called mutual framing through equality or a symplectic change of finite frame. Any relationship would require a different quotient, representation or source-derived non-conjugacy intertwiner.',
  passed:true,
},null,2));
