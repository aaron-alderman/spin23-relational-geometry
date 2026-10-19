import assert from "node:assert/strict";

const mod=(x,q)=>((x%q)+q)%q;
const I=()=>[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const mul=(A,B,q)=>A.map(r=>B[0].map((_,j)=>mod(r.reduce((s,x,k)=>s+x*B[k][j],0),q)));
const mv=(A,v,q)=>A.map(r=>mod(r.reduce((s,x,i)=>s+x*v[i],0),q));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const key=A=>A.flat().join(",");
const vkey=v=>v.join(",");
const same=(A,B)=>key(A)===key(B);
const J=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const negJ=J.map(r=>r.map(x=>-x));
const invSp=(A,q)=>mul(mul(negJ,tr(A),q),J,q);
const C=t=>[[0,-1],[1,t]];
const embed=(A,h)=>h===0
  ? [[A[0][0],0,A[0][1],0],[0,1,0,0],[A[1][0],0,A[1][1],0],[0,0,0,1]]
  : [[1,0,0,0],[0,A[0][0],0,A[0][1]],[0,0,1,0],[0,A[1][0],0,A[1][1]]];
const U=[[1,0,0,0],[0,1,0,0],[3,2,1,0],[2,3,0,1]];
const uniqueNonidentity=(gens,q)=>{
  const id=I(),map=new Map();for(const g0 of gens){const g=g0.map(r=>r.map(x=>mod(x,q)));if(!same(g,id))map.set(key(g),g);}return[...map.values()];
};
const groupOrder=(input,q)=>{
  const recurse=(inputGens,level)=>{
    const gens=uniqueNonidentity(inputGens,q);if(!gens.length)return 1n;
    let base=null,nextLevel=level;
    for(let i=level;i<4&&!base;i++){const v=Array(4).fill(0);v[i]=1;if(gens.some(g=>vkey(mv(g,v,q))!==vkey(v))){base=v;nextLevel=i+1;}}
    if(!base)throw new Error("nonidentity matrices fix full basis");
    const orbit=[base],trans=new Map([[vkey(base),I()]]);
    for(let h=0;h<orbit.length;h++){const y=orbit[h],Ty=trans.get(vkey(y));for(const g of gens){const z=mv(g,y,q),zk=vkey(z);if(!trans.has(zk)){trans.set(zk,mul(g,Ty,q));orbit.push(z);}}}
    const stab=[];for(const y of orbit){const Ty=trans.get(vkey(y));for(const g of gens){const z=mv(g,y,q),Tz=trans.get(vkey(z));stab.push(mul(mul(invSp(Tz,q),g,q),Ty,q));}}
    return BigInt(orbit.length)*recurse(stab,nextLevel);
  };return recurse(input,0);
};
const fullOrder=n=>720n*2n**BigInt(10*(n-1));
const expected=new Map([
  ["2:3,3",18n],["2:3,6",36n],["2:6,3",36n],["2:6,6",36n],
  ["4:3,3",9216n],["4:3,6",36864n],["4:6,3",36864n],["4:6,6",36864n],
  ["8:3,3",9437184n],["8:3,6",37748736n],["8:6,3",37748736n],["8:6,6",37748736n],
]);
for(const n of [1,2,3]){
  const q=2**n;
  for(const [a,b] of [[3,3],[3,6],[6,3],[6,6]]){
    const order=groupOrder([embed(C(a),0),embed(C(b),1),U],q);
    assert.equal(order,expected.get(q+":"+a+","+b));
    console.log("mod="+q+" traces="+a+","+b+" order="+order+" full="+fullOrder(n)+" index="+fullOrder(n)/order);
  }
}
console.log("indices_stabilize_at_80_for_equal_trace_3_and_20_for_all_other_assignments_from_modulo_4_onward");
