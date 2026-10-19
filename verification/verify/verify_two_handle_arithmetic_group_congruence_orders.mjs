import assert from "node:assert/strict";

// Exact Schreier orbit-stabilizer computation of the finite matrix-group orders.

const mod=(x,p)=>((x%p)+p)%p;
const I=()=>[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const mul=(A,B,p)=>A.map(r=>B[0].map((_,j)=>mod(r.reduce((s,x,k)=>s+x*B[k][j],0),p)));
const mv=(A,v,p)=>A.map(r=>mod(r.reduce((s,x,i)=>s+x*v[i],0),p));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const key=A=>A.flat().join(",");
const vkey=v=>v.join(",");
const same=(A,B)=>key(A)===key(B);
const J=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const negJ=J.map(r=>r.map(x=>-x));
const invSp=(A,p)=>mul(mul(negJ,tr(A),p),J,p);
const C=t=>[[0,-1],[1,t]];
const embed=(A,h)=>h===0
  ? [[A[0][0],0,A[0][1],0],[0,1,0,0],[A[1][0],0,A[1][1],0],[0,0,0,1]]
  : [[1,0,0,0],[0,A[0][0],0,A[0][1]],[0,0,1,0],[0,A[1][0],0,A[1][1]]];
const U=[[1,0,0,0],[0,1,0,0],[3,2,1,0],[2,3,0,1]];

const uniqueNonidentity=(gens,p)=>{
  const id=I(),map=new Map();
  for(const g0 of gens){const g=g0.map(r=>r.map(x=>mod(x,p)));if(!same(g,id))map.set(key(g),g);}
  return [...map.values()];
};
const groupOrder=(input,p)=>{
  const recurse=(inputGens,level)=>{
    const gens=uniqueNonidentity(inputGens,p);
    if(!gens.length)return 1;
    let base=null,nextLevel=level;
    for(let i=level;i<4&&!base;i++){
      const v=Array(4).fill(0);v[i]=1;
      if(gens.some(g=>vkey(mv(g,v,p))!==vkey(v))){base=v;nextLevel=i+1;}
    }
    if(!base)throw new Error("nonidentity matrices fix the full standard basis");
    const orbit=[base],trans=new Map([[vkey(base),I()]]);
    for(let h=0;h<orbit.length;h++){
      const y=orbit[h],Ty=trans.get(vkey(y));
      for(const g of gens){
        const z=mv(g,y,p),zk=vkey(z);
        if(!trans.has(zk)){trans.set(zk,mul(g,Ty,p));orbit.push(z);}
      }
    }
    const stabilizers=[];
    for(const y of orbit){
      const Ty=trans.get(vkey(y));
      for(const g of gens){
        const z=mv(g,y,p),Tz=trans.get(vkey(z));
        stabilizers.push(mul(mul(invSp(Tz,p),g,p),Ty,p));
      }
    }
    return orbit.length*recurse(stabilizers,nextLevel);
  };
  return recurse(input,0);
};

const sp4Order=p=>p**4*(p**2-1)*(p**4-1);
const assignments=[[3,3],[3,6],[6,3],[6,6]];
const expectedAtTwo=new Map([["3,3",18],["3,6",36],["6,3",36],["6,6",36]]);
for(const p of [2,3,5,7]){
  for(const [a,b] of assignments){
    const order=groupOrder([embed(C(a),0),embed(C(b),1),U],p);
    console.log("p="+p+" traces="+a+","+b+" order="+order+" full="+sp4Order(p)+" index="+sp4Order(p)/order);
    if(p===2)assert.equal(order,expectedAtTwo.get(a+","+b));
    if([3,5,7].includes(p))assert.equal(order,sp4Order(p));
  }
}
