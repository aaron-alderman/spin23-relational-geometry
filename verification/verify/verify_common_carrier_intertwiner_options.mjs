import assert from "node:assert/strict";

const EPS=1e-9;
const zero=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(r=>r.map(x=>a*x));
const determinant=A=>A.length===1?A[0][0]:A[0].reduce((s,x,j)=>s+(j%2?-1:1)*x*determinant(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const rank=A0=>{if(!A0.length)return 0;const A=A0.map(r=>r.slice());let row=0;for(let col=0;col<A[0].length&&row<A.length;col++){let p=row;for(let i=row+1;i<A.length;i++)if(Math.abs(A[i][col])>Math.abs(A[p][col]))p=i;if(Math.abs(A[p][col])<EPS)continue;[A[row],A[p]]=[A[p],A[row]];const d=A[row][col];A[row]=A[row].map(x=>x/d);for(let i=0;i<A.length;i++)if(i!==row){const f=A[i][col];A[i]=A[i].map((x,j)=>x-f*A[row][j]);}row++;}return row;};
const nullspace=A0=>{const A=A0.map(r=>r.slice()),m=A.length,n=A[0].length,piv=[];let row=0;for(let col=0;col<n&&row<m;col++){let p=row;for(let i=row+1;i<m;i++)if(Math.abs(A[i][col])>Math.abs(A[p][col]))p=i;if(Math.abs(A[p][col])<EPS)continue;[A[row],A[p]]=[A[p],A[row]];const d=A[row][col];A[row]=A[row].map(x=>x/d);for(let i=0;i<m;i++)if(i!==row){const f=A[i][col];A[i]=A[i].map((x,j)=>x-f*A[row][j]);}piv.push(col);row++;}const free=[];for(let j=0;j<n;j++)if(!piv.includes(j))free.push(j);return free.map(f=>{const v=Array(n).fill(0);v[f]=1;piv.forEach((p,i)=>v[p]=-A[i][f]);return v;});};
const homSpace=(left,right)=>{const m=left[0].length,n=right[0].length,eqs=[];for(let g=0;g<left.length;g++)for(let i=0;i<m;i++)for(let j=0;j<n;j++){const row=[];for(let a=0;a<m;a++)for(let b=0;b<n;b++)row.push(left[g][i][a]*(b===j)-right[g][b][j]*(a===i));eqs.push(row);}const basis=nullspace(eqs).map(v=>Array.from({length:m},(_,i)=>v.slice(i*n,(i+1)*n)));return {dimension:basis.length,basis,maxRank:basis.reduce((mx,T)=>Math.max(mx,rank(T)),0)};};

const r2=[[0,-1],[1,-1]], selectorH2=scale(-1,eye(2));
const channelH2=[[0,1],[1,0]];
assert.ok(Math.abs(determinant(r2)-1)<EPS);
const r3=[[0,0,1],[1,0,0],[0,1,0]];
const h3=[[0,1,0],[1,0,0],[0,0,1]];
const selectorH3=scale(-1,h3);

const sourceNaive=homSpace([r2,channelH2],[r2,selectorH2]);
const targetUntwisted=homSpace([r3,h3],[r3,selectorH3]);
const sourceRepaired=homSpace([r2,selectorH2],[r2,selectorH2]);
const targetRepaired=homSpace([r3,selectorH3],[r3,selectorH3]);
assert.equal(sourceNaive.dimension,0);
assert.equal(targetUntwisted.dimension,1);
assert.equal(targetUntwisted.maxRank,2);
assert.equal(sourceRepaired.dimension,2);
assert.equal(sourceRepaired.maxRank,2);
assert.equal(targetRepaired.dimension,2);
assert.equal(targetRepaired.maxRank,3);

console.log(JSON.stringify({
  status:"PASS",
  selectorFingerprints:{two:"R:(tr,det,ord)=(-1,1,3), H=-I2",three:"sign-twisted permutation = sign plus standard"},
  authoredEndpointModel:{two:"standard S3 doublet",three:"untwisted permutation = trivial plus standard"},
  naiveIntertwiner:{twoHomDimension:sourceNaive.dimension,threeHomDimension:targetUntwisted.dimension,threeMaxRank:targetUntwisted.maxRank,invertibleFiveCarrierMap:false},
  minimalRepresentationRepair:{two:"replace reflection by the central parity -I2",three:"twist the singlet parity, giving sign plus standard",twoHomDimension:sourceRepaired.dimension,threeHomDimension:targetRepaired.dimension,invertibleBlockMapsExist:true},
  residualNormalizedTransport:"SO(2) phase on the two-sector times discrete signs on the sign and standard three-sector summands",
  verdict:"no intertwiner exists for the naive authored endpoint actions; a precise parity-twisted endpoint action permits one but is new physical data"
}));
