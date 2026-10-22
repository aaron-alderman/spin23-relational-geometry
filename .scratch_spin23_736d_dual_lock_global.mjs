import assert from "node:assert/strict";

const dims={1:2,2:2,3:2,4:2,5:3,6:1,7:2,8:2,9:2,10:3};
const op=[
  [1,5],[1,5],[8,5],[5,2],[5,3],[5,4],[1,6],[8,6],[8,6],[6,4],
  [6,7],[6,7],[2,1],[7,8],[5,9],[9,10],[1,5],[10,1],[10,2],[4,10]
];
const blockDims=op.map(([i,j])=>dims[i]*dims[j]);
assert.equal(blockDims.reduce((a,b)=>a+b,0),92);

const sortedPair=(a,b)=>a<b?[a,b]:[b,a];
const edges=[];
for(let r=0;r<op.length;r++) for(let s=r+1;s<op.length;s++){
  const p=op[r],q=op[s],labels=new Map();
  if(p[1]===q[0]&&p[0]!==q[1]) labels.set(JSON.stringify(sortedPair(p[0],q[1])),sortedPair(p[0],q[1]));
  if(p[0]===q[1]&&p[1]!==q[0]) labels.set(JSON.stringify(sortedPair(p[1],q[0])),sortedPair(p[1],q[0]));
  for(const label of labels.values()) edges.push({u:r,v:s,label});
}

const offsets=[];let total=0;
for(const d of blockDims){offsets.push(total);total+=d;}
assert.equal(total,92);
const fullOffsetsP=offsets;
const fullOffsetsJ=offsets.map(x=>92+x);
const zeros=n=>Array.from({length:n},()=>Array(n).fill(0));
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((sum,x,k)=>sum+x*B[k][j],0)));
const tr=A=>A.reduce((sum,row,i)=>sum+row[i],0);

const build=(b,c)=>{
  const D=zeros(184);
  for(const edge of edges){
    const key=edge.label.join(",");
    const value=key==="2,9"?b:key==="5,10"?c:0;
    if(value===0) continue;
    const d=blockDims[edge.u];
    assert.equal(d,blockDims[edge.v]);
    for(let a=0;a<d;a++){
      const pu=fullOffsetsP[edge.u]+a,jv=fullOffsetsJ[edge.v]+a;
      const ju=fullOffsetsJ[edge.u]+a,pv=fullOffsetsP[edge.v]+a;
      D[pu][jv]=D[jv][pu]=value;
      D[ju][pv]=D[pv][ju]=value;
    }
  }
  return D;
};

const traces=(b,c)=>{
  const D=build(b,c),D2=mm(D,D),D4=mm(D2,D2);
  return {t2:tr(D2),t4:tr(D4)};
};
const bOnly=traces(1,0),cOnly=traces(0,1),both=traces(1,1);
const coefficients={
  t2b:bOnly.t2,
  t2c:cOnly.t2,
  t4b:bOnly.t4,
  t4c:cOnly.t4,
  t4bc:both.t4-bOnly.t4-cOnly.t4
};
const counts={
  weak:edges.filter(e=>e.label.join(",")==="2,9").length,
  color:edges.filter(e=>e.label.join(",")==="5,10").length
};
assert.deepEqual(counts,{weak:1,color:5});
for(const [b,c] of [[2,3],[3,1],[1,4]]){
  const got=traces(b,c);
  assert.equal(got.t2,coefficients.t2b*b*b+coefficients.t2c*c*c);
  assert.equal(got.t4,coefficients.t4b*b**4+coefficients.t4c*c**4+coefficients.t4bc*b*b*c*c);
}

const lambdaB=4*coefficients.t4b;
const lambdaC=4*coefficients.t4c;
const lambdaBC=2*coefficients.t4bc;
const determinant=lambdaB*lambdaC-lambdaBC**2;

console.log(JSON.stringify({
  protocol:"spin23-736d-dual-lock-global-copy-locked/1",
  positiveDimension:92,
  jCompletedDimension:184,
  edgeCounts:counts,
  coefficients,
  quartic:`${coefficients.t4b} b^4 + ${coefficients.t4c} c^4 + ${coefficients.t4bc} b^2 c^2`,
  standardPotential:{lambdaB,lambdaC,lambdaBC,determinant},
  samples:{bOnly,cOnly,both},
  passed:true
},null,2));
