import assert from 'node:assert/strict';

const Jc = [[0,1,-1,0],[-1,0,1,0],[1,-1,0,0],[0,0,0,0]];
const Jf = [[0,0,0,1],[0,0,0,1],[0,0,0,1],[-1,-1,-1,0]];
const J = Jc.map((r,i)=>r.map((x,j)=>x+Jf[i][j]));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const det4=A=>{
  const M=A.map(r=>r.map(Number)); let d=1;
  for(let c=0;c<4;c++){
    let p=c; while(p<4&&Math.abs(M[p][c])<1e-10)p++;
    if(p===4)return 0;
    if(p!==c){[M[p],M[c]]=[M[c],M[p]];d=-d;}
    const q=M[c][c]; d*=q;
    for(let i=c+1;i<4;i++){const f=M[i][c]/q;for(let k=c;k<4;k++)M[i][k]-=f*M[c][k];}
  }
  return d;
};
assert.equal(Math.round(det4(J)),9);

const mod=(x,p=3)=>((Math.round(x)%p)+p)%p;
const matVec=(A,v)=>A.map(r=>r.reduce((s,x,i)=>s+x*v[i],0));
const kernel=[];
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++)for(let d=0;d<3;d++){
  const v=[a,b,c,d];
  if(v.some(Boolean)&&matVec(J,v).every(x=>mod(x)===0))kernel.push(v);
}
assert.equal(kernel.length,8);
function normalizeLine(v){
  const i=v.findIndex(Boolean); const inv=v[i]===1?1:2;
  return v.map(x=>mod(inv*x)).join('');
}
const lines=[...new Map(kernel.map(v=>[normalizeLine(v),v.map(x=>mod(x))])).values()]
  .map(v=>{const i=v.findIndex(Boolean);const inv=v[i]===1?1:2;return v.map(x=>mod(inv*x));})
  .sort((a,b)=>a.join('').localeCompare(b.join('')));
assert.equal(lines.length,4);

function rep(p){return Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>(p[c]===r?1:0)-(p[4]===r?1:0)));}
const R=rep([1,2,0,3,4]);
const S=rep([1,0,2,4,3]);
function lineImage(v,A){return matVec(A,v).map(x=>mod(x));}
function sameLine(v,w){
  return [1,2].some(k=>v.every((x,i)=>mod(k*x)===mod(w[i])));
}

function completionBasis(v){
  const pivot=v.findIndex(x=>x===1||x===2);
  let vv=[...v]; if(vv[pivot]===2)vv=vv.map(x=>mod(2*x));
  const cols=[vv,...[0,1,2,3].filter(i=>i!==pivot).map(i=>[0,1,2,3].map(j=>i===j?1:0))];
  const M=Array.from({length:4},(_,i)=>cols.map(c=>c[i]));
  assert.equal(Math.abs(Math.round(det4(M))),1);
  return M.map((row,i)=>row.map((x,j)=>j===0?x/3:x));
}
const completions=lines.map(v=>{
  const P=completionBasis(v);
  const Jprime=mul(mul(tr(P),J),P);
  assert.ok(Jprime.flat().every(x=>Math.abs(x-Math.round(x))<1e-10));
  assert.equal(Math.abs(Math.round(det4(Jprime))),1);
  return {
    ternaryLine:v,
    generator:`(${v.join(',')})/3`,
    c3Stable:sameLine(v,lineImage(v,R)),
    pairedReflectionStable:sameLine(v,lineImage(v,S)),
    transformedUnimodularForm:Jprime.map(r=>r.map(x=>Math.round(x))),
  };
});

const both=completions.filter(x=>x.c3Stable&&x.pairedReflectionStable);
const c3only=completions.filter(x=>x.c3Stable);

console.log(JSON.stringify({
  protocol:'index-three-unimodular-completions-oriented-color-form/1',
  baseLattice:'A4 sum-zero lattice in basis b_i=e_i-e_5',
  equalAreaForm:'J=J_color+J_fixed',
  determinant:Math.round(det4(J)),
  mod3KernelDimension:2,
  discriminantGroup:'(Z/3)^2',
  indexThreeCompletionCount:completions.length,
  completions,
  c3StableCompletionCount:c3only.length,
  signedOrderSixStableCompletionCount:both.length,
  conclusion: both.length===1
    ? 'The equal-area form has four self-dual index-three completions, and exactly one is stable under both the color C3 and paired color/weak reflection.'
    : 'The completion classification does not select a unique signed-covariant overlattice.',
  boundary:'This classification is conditional on the equal-area choice a=b=1; it does not derive that ratio dynamically.',
  passed:true,
},null,2));
