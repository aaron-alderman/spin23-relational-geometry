import assert from "node:assert/strict";

const dims={1:2,2:2,3:2,4:2,5:3,6:1,7:2,8:2,9:2,10:3};
const op=[
  [1,5],[1,5],[8,5],[5,2],[5,3],[5,4],[1,6],[8,6],[8,6],[6,4],
  [6,7],[6,7],[2,1],[7,8],[5,9],[9,10],[1,5],[10,1],[10,2],[4,10]
];
const blockDims=op.map(([i,j])=>dims[i]*dims[j]);
const offsets=[];let positiveDim=0;
for(const d of blockDims){offsets.push(positiveDim);positiveDim+=d;}
assert.equal(positiveDim,92);

const sortedPair=(a,b)=>a<b?[a,b]:[b,a];
const edges=[];
for(let u=0;u<op.length;u++) for(let v=u+1;v<op.length;v++){
  const p=op[u],q=op[v],labels=new Map();
  if(p[1]===q[0]&&p[0]!==q[1]) labels.set(JSON.stringify(sortedPair(p[0],q[1])),sortedPair(p[0],q[1]));
  if(p[0]===q[1]&&p[1]!==q[0]) labels.set(JSON.stringify(sortedPair(p[1],q[0])),sortedPair(p[1],q[0]));
  for(const label of labels.values()) edges.push({u,v,label});
}

const names={"2,9":"B","5,10":"C","1,4":"H","4,8":"G","2,6":"P","6,7":"M"};
const labels=Object.keys(names);
const eye=(n,s=1)=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?s:0));
const kron=(A,B)=>A.flatMap(row=>B.map(brow=>row.flatMap(a=>brow.map(b=>a*b))));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const zeros=(m,n=m)=>Array.from({length:m},()=>Array(n).fill(0));
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((sum,x,k)=>sum+x*B[k][j],0)));
const tr=A=>A.reduce((sum,row,i)=>sum+row[i],0);
const addBlock=(A,r0,c0,B)=>B.forEach((row,i)=>row.forEach((x,j)=>A[r0+i][c0+j]+=x));

const fieldMap=(a,b,label,values)=>{
  const key=label.join(","),value=values[names[key]];
  if(["2,9","5,10","1,4","4,8"].includes(key)) return eye(dims[b],value);
  if(["2,6","6,7"].includes(key)){
    if(dims[a]===2&&dims[b]===1) return [[value,0]];
    if(dims[a]===1&&dims[b]===2) return [[value],[0]];
  }
  throw new Error(`unsupported map ${a}->${b} for ${key}`);
};

const build=values=>{
  const D=zeros(184);
  for(const edge of edges){
    const key=edge.label.join(",");
    if(!(key in names)) continue;
    const p=op[edge.u],q=op[edge.v];
    const horizontal=p[1]===q[0]&&p[0]!==q[1];
    const vertical=p[0]===q[1]&&p[1]!==q[0];
    assert.notEqual(horizontal,vertical);
    let X,XJ;
    if(horizontal){
      const F=fieldMap(p[0],q[1],edge.label,values);
      X=kron(F,eye(dims[p[1]]));XJ=kron(eye(dims[p[1]]),F);
    }else{
      const F=fieldMap(p[1],q[0],edge.label,values);
      X=kron(eye(dims[p[0]]),F);XJ=kron(F,eye(dims[p[0]]));
    }
    const pu=offsets[edge.u],jv=92+offsets[edge.v],ju=92+offsets[edge.u],pv=offsets[edge.v];
    addBlock(D,jv,pu,X);addBlock(D,pu,jv,transpose(X));
    addBlock(D,pv,ju,XJ);addBlock(D,ju,pv,transpose(XJ));
  }
  return D;
};

const traces=values=>{
  const D=build(values),D2=mm(D,D),D4=mm(D2,D2);
  return {t2:tr(D2),t4:tr(D4)};
};
const zero=()=>Object.fromEntries(Object.values(names).map(name=>[name,0]));
const basis={};
for(const name of Object.values(names)){const v=zero();v[name]=1;basis[name]=traces(v);}
const pairCross={};
const fieldNames=Object.values(names);
for(let i=0;i<fieldNames.length;i++) for(let j=i+1;j<fieldNames.length;j++){
  const a=fieldNames[i],b=fieldNames[j],v=zero();v[a]=v[b]=1;
  const plus=traces(v);v[b]=-1;const minus=traces(v);
  assert.equal(plus.t4,minus.t4);
  pairCross[`${a}${b}`]=plus.t4-basis[a].t4-basis[b].t4;
}
const allValues=Object.fromEntries(fieldNames.map(name=>[name,1]));
const all=traces(allValues);
const pairReconstruction=Object.values(basis).reduce((s,x)=>s+x.t4,0)+Object.values(pairCross).reduce((s,x)=>s+x,0);
const signSamples={};
for(const name of fieldNames){const v={...allValues,[name]:-1};signSamples[name]=traces(v).t4;}

console.log(JSON.stringify({
  protocol:"spin23-736d-six-orbit-radial-trace/1",
  dimensions:{positive:92,jCompleted:184},
  edgeCounts:Object.fromEntries(labels.map(key=>[names[key],edges.filter(e=>e.label.join(",")===key).length])),
  basis,pairCross,all,pairReconstruction,
  residualBeyondPairNormTerms:all.t4-pairReconstruction,
  signSamples,
  passed:true
},null,2));
