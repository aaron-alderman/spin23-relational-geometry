import assert from "node:assert/strict";

const p=3, mod=x=>((x%p)+p)%p;
const key=v=>v.join(",");
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>mod(s+x*B[k][j]),0)));
const mv=(A,v)=>A.map(r=>r.reduce((s,x,i)=>mod(s+x*v[i]),0));
const invScalar=x=>x===1?1:2;
const normalize=v=>{const i=v.findIndex(x=>x!==0);assert.ok(i>=0);const z=invScalar(v[i]);return v.map(x=>mod(z*x));};
const inverse=A0=>{
  const n=A0.length,A=A0.map((r,i)=>[...r.map(mod),...Array.from({length:n},(_,j)=>Number(i===j))]);
  for(let c=0;c<n;c++){
    let q=c;while(q<n&&A[q][c]===0)q++;if(q===n)return null;
    [A[c],A[q]]=[A[q],A[c]];
    const z=invScalar(A[c][c]);A[c]=A[c].map(x=>mod(z*x));
    for(let i=0;i<n;i++)if(i!==c&&A[i][c]){
      const f=A[i][c];A[i]=A[i].map((x,j)=>mod(x-f*A[c][j]));
    }
  }
  return A.map(r=>r.slice(n));
};
const fromColumns=cols=>transpose(cols);

// The sixteen projective spinor weights are [1,+/-1,+/-1,+/-1,+/-1].
const full=[];
for(let n=0;n<16;n++)full.push([1,...Array.from({length:4},(_,i)=>(n>>i)&1?2:1)]);
const qN=[1,1,1,1,1],qE=[1,1,1,2,2];
const missing=new Set([key(qN),key(qE)]);
const points=full.filter(v=>!missing.has(key(v)));
const pointIndex=new Map(points.map((v,i)=>[key(v),i]));

// Find one projective frame: five basis points and a sixth having no zero
// coordinate in that basis.
let frame=null;
outer:for(let a=0;a<10;a++)for(let b=a+1;b<11;b++)for(let c=b+1;c<12;c++)
for(let d=c+1;d<13;d++)for(let e=d+1;e<14;e++){
  const ids=[a,b,c,d,e],S=fromColumns(ids.map(i=>points[i])),Sinv=inverse(S);if(!Sinv)continue;
  for(let u=0;u<14;u++)if(!ids.includes(u)){
    const coords=mv(Sinv,points[u]);
    if(coords.every(x=>x!==0)){frame={ids,u,S,Sinv,coords};break outer;}
  }
}
assert.ok(frame);

const automorphisms=new Map();
const used=Array(14).fill(false),tuple=[];
const testTuple=()=>{
  const T=fromColumns(tuple.map(i=>points[i])),Tinv=inverse(T);if(!Tinv)return;
  for(let vi=0;vi<14;vi++){
    if(used[vi])continue;
    const d=mv(Tinv,points[vi]);if(d.some(x=>x===0))continue;
    const lambdas=d.map((x,i)=>mod(x*invScalar(frame.coords[i])));
    const TD=T.map((r,i)=>r.map((x,j)=>mod(x*lambdas[j])));
    const A=mm(TD,frame.Sinv);
    const Akey=key(normalize(A.flat()).slice());if(automorphisms.has(Akey))continue;
    const perm=[];let good=true;
    for(const x of points){
      const y=normalize(mv(A,x)),j=pointIndex.get(key(y));
      if(j===undefined){good=false;break;}perm.push(j);
    }
    if(!good||new Set(perm).size!==14)continue;
    automorphisms.set(Akey,{A,perm});
  }
};
const rec=()=>{
  if(tuple.length===5){testTuple();return;}
  for(let i=0;i<14;i++)if(!used[i]){
    used[i]=true;tuple.push(i);rec();tuple.pop();used[i]=false;
  }
};
rec();

const punctureActions=new Set();
let preservesMissingPair=0,relativeSignFlip=0;
for(const {A} of automorphisms.values()){
  const rawN=mv(A,qN),rawE=mv(A,qE);
  const n=normalize(rawN),e=normalize(rawE);
  const fixes=key(n)===key(qN)&&key(e)===key(qE);
  const swaps=key(n)===key(qE)&&key(e)===key(qN);
  if(!(fixes||swaps))continue;
  preservesMissingPair++;
  const ln=rawN[0],le=rawE[0];
  const action=fixes?[[ln,0],[0,le]]:[[0,le],[ln,0]];
  punctureActions.add(key(action.flat()));
  if(ln!==le)relativeSignFlip++;
}
assert.equal(automorphisms.size,24);
assert.equal(preservesMissingPair,24);
assert.equal(relativeSignFlip,0);
assert.deepEqual(
  [...punctureActions].sort(),
  ["1,0,0,1","2,0,0,2","0,1,1,0","0,2,2,0"].sort(),
);

console.log("full_twice_punctured_qutrit_projective_automorphism_group: PASS");
console.log("chosen_source_frame="+frame.ids.join(",")+";sixth="+frame.u);
console.log("projective_automorphism_group_order="+automorphisms.size);
console.log("automorphisms_preserving_missing_pair="+preservesMissingPair);
console.log("puncture_monomial_actions="+[...punctureActions].sort().join(";"));
console.log("actions_with_relative_puncture_sign="+relativeSignFlip);

