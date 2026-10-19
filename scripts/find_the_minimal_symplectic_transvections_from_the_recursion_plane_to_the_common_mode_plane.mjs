import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const add=(A,B)=>A.map((row,i)=>row.map((x,j)=>x+B[i][j]));
const outer=(u,v)=>u.map(x=>v.map(y=>x*y));
const I=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>+(i===j)));
const K=[[0,0,0,1],[0,0,1,0],[0,-1,0,0],[-1,0,0,0]];
const bits=n=>[n&1,(n>>1)&1,(n>>2)&1,(n>>3)&1],encode=x=>x[0]+2*x[1]+4*x[2]+8*x[3];
const mod2=x=>((x%2)+2)%2;
const actCode=(T,n)=>encode(mm(T,bits(n).map(x=>[x])).map(row=>mod2(row[0])));
const mapPlane=(T,W)=>W.map(x=>actCode(T,x)).sort((a,b)=>a-b);
const WE=[0,7,11,12],WP=[0,3,12,15];

const candidates=[];
for(let code=1;code<16;code++){
  const v=bits(code),Kv=mm(K,v.map(x=>[x])).map(r=>r[0]);
  const T=add(I,outer(v,Kv)); // x -> x + <x,v>v
  assert.deepEqual(mm(mm(transpose(T),K),T),K);
  const image=mapPlane(T,WE);
  if(JSON.stringify(image)===JSON.stringify(WP))candidates.push({code,vector:v,matrix:T});
}
assert.deepEqual(candidates.map(x=>x.code),[4,8]);
const [Te3,Te4]=candidates.map(x=>x.matrix);
assert.deepEqual(mm(Te3,Te4),mm(Te4,Te3));
for(const {matrix:T} of candidates){const N=T.map((row,i)=>row.map((x,j)=>x-I[i][j]));assert.deepEqual(mm(N,N),Array.from({length:4},()=>Array(4).fill(0)));}

console.log(JSON.stringify({
  protocol:'recursion-to-common-mode-minimal-transvection/1',
  recursionPlane:WE,
  commonModePlane:WP,
  primitiveTransvectionCount:15,
  successfulTransvections:candidates,
  successfulDirections:['e3','e4'],
  uniqueness:'Exactly two primitive symplectic transvections map WE to WP.',
  quadratureMeaning:'Both successful directions lie in the imaginary-quadrature block span(e3,e4).',
  integralMeaning:'Each matrix is an integral K-symplectic unipotent with square-zero logarithm; modulo two it maps the corresponding index-four overlattice exactly.',
  boundary:'One transvection selects the carrier plane but does not by itself complete the first placement Lie order; full integral sp4 still requires the independent conjugate handle-plus-translation pair.',
  passed:true
},null,2));
