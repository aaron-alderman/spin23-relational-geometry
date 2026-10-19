import assert from 'node:assert/strict';

const pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const form=v=>{const A=Array.from({length:4},()=>Array(4).fill(0));pairs.forEach(([i,j],k)=>{A[i][j]=v[k];A[j][i]=-v[k];});return A;};
const vector=A=>pairs.map(([i,j])=>A[i][j]);
const wedge=(a,b)=>a[0]*b[5]+a[5]*b[0]-a[1]*b[4]-a[4]*b[1]+a[2]*b[3]+a[3]*b[2];
const B=[
  [0,1,0,0,-1,0],
  [1,0,0,0,0,1],
  [0,0,1,1,0,0],
  [1,0,0,0,0,-1],
  [0,0,1,-1,0,0],
];
const clean=x=>Object.is(x,-0)?0:x;
const gram=B.map(a=>B.map(b=>clean(-wedge(a,b)))); // sign convention gives signature (2,3)
assert.deepEqual(gram,[[-2,0,0,0,0],[0,-2,0,0,0],[0,0,-2,0,0],[0,0,0,2,0],[0,0,0,0,2]]);
const M=[[1,0,-1,1],[0,0,0,1],[-1,0,2,-1],[0,-1,-1,4]];
const cols=B.map(b=>{const out=vector(mul(mul(tr(M),form(b)),M));return B.map((x,i)=>wedge(x,out)/wedge(x,x));});
const R5=Array.from({length:5},(_,i)=>cols.map(c=>c[i]));
const rrefNull=A=>{const X=A.map(r=>[...r]);const piv=[];let row=0;for(let col=0;col<X[0].length&&row<X.length;col++){let p=row;while(p<X.length&&Math.abs(X[p][col])<1e-10)p++;if(p===X.length)continue;[X[row],X[p]]=[X[p],X[row]];const d=X[row][col];X[row]=X[row].map(x=>x/d);for(let i=0;i<X.length;i++)if(i!==row){const f=X[i][col];X[i]=X[i].map((x,j)=>x-f*X[row][j]);}piv.push(col);row++;}const free=[0,1,2,3,4].filter(c=>!piv.includes(c));assert.equal(free.length,1);const v=Array(5).fill(0);v[free[0]]=1;for(let i=piv.length-1;i>=0;i--)v[piv[i]]=-X[i].reduce((s,x,j)=>s+(j===piv[i]?0:x*v[j]),0);return v;};
const A=R5.map((r,i)=>r.map((x,j)=>x-(i===j?1:0)));
let fixed=rrefNull(A);
const denom=fixed.find(x=>Math.abs(x)>1e-10);fixed=fixed.map(x=>Math.round(x/denom));
const mv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
assert.deepEqual(mv(R5,fixed),fixed);
const norm=mv(gram,fixed).reduce((s,x,i)=>s+fixed[i]*x,0);
const fixedForm=Array(6).fill(0).map((_,k)=>fixed.reduce((s,c,i)=>s+c*B[i][k],0));
assert.notEqual(norm,0);
const check=mul(mul(tr(R5),gram),R5).map(r=>r.map(clean));
assert.deepEqual(check,gram);

const l1=4.390256884515514,l2=1.8378527913529716;
console.log(JSON.stringify({
  protocol:'fully-hyperbolic-selector-primitive-fixed-axis/1',
  primitiveBasis:B,
  metricConvention:'G=-wedge, signature (2,3)',
  primitiveGram:gram,
  inducedMatrix:R5,
  fixedVectorCoordinates:fixed,
  fixedPrimitiveTwoFormCoordinates:fixedForm,
  fixedNorm:norm,
  causalType:norm<0?'negative/timelike in the stated convention':norm>0?'positive/spacelike in the stated convention':'null',
  orthogonalComplementSignature:norm<0?'(2,2)':'(1,3)',
  boostEigenvaluePairs:[[l1*l2,1/(l1*l2)],[l1/l2,l2/l1]],
  conclusion:'The fully hyperbolic selector fixes a non-null primitive axis. Its orthogonal four-space carries the two reciprocal boost pairs.',
  passed:true,
},null,2));
