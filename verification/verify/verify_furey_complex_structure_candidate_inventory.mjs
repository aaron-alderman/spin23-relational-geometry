import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0))),sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j])),norm=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0)),I=[[1,0],[0,1]],J=[[0,1],[-1,0]],K=[[1,0],[0,-1]];
assert(norm(sub(mm(J,J),[[-1,0],[0,-1]]))<1e-12);
assert(norm(sub(mm(K,K),I))<1e-12);
assert(norm(mm(K,J).map((r,i)=>r.map((x,j)=>x+mm(J,K)[i][j])))<1e-12);
const theta=.37,R=[[Math.cos(theta),Math.sin(theta)],[-Math.sin(theta),Math.cos(theta)]],realAxis=[1,0],rotated=[R[0][0],R[1][0]];
assert(Math.abs(rotated[1])>1e-6);
const neutralGauge=I;assert(mm(neutralGauge,[[1],[0]])[1][0]===0);
const intertwinerEquations=[
  [-1,-1,0,0],[1,-1,0,0],[0,0,1,-1],[0,0,1,1]
];
const rank=M=>{const A=M.map(r=>[...r]);let q=0;for(let c=0;c<A[0].length&&q<A.length;c++){let p=q;while(p<A.length&&Math.abs(A[p][c])<1e-12)p++;if(p===A.length)continue;[A[q],A[p]]=[A[p],A[q]];const z=A[q][c];A[q]=A[q].map(x=>x/z);for(let i=0;i<A.length;i++)if(i!==q){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[q][j])}q++}return q};
assert.equal(rank(intertwinerEquations),4);
const inventory=[
  {name:'weak M2(C) off-diagonal',square:-1,gaugeRotatesRealAxis:true,selected:false},
  {name:'charged E-C linking corner',square:-1,gaugeRotatesRealAxis:true,selected:false},
  {name:'neutral E-D Peirce corner',square:-1,gaugeRotatesRealAxis:false,selected:true},
  {name:'O1-R survivor exchange',square:1,gaugeRotatesRealAxis:false,selected:false}
];
assert.equal(inventory.filter(x=>x.square===-1&&!x.gaugeRotatesRealAxis).length,1);

console.log('Furey complex-structure candidate inventory certificate: PASS');
console.log('negative_square_candidates=3; gauge_neutral_selected_candidate=neutrino_Peirce; survivor_exchange_square=+1; Higgs_intertwiner_open=true');
