import assert from 'node:assert/strict';

const ids=new Map();let next=0;
const id=k=>{if(!ids.has(k))ids.set(k,next++);return ids.get(k)};
const gen=(name,indices,spin)=>new Map([[String(id(name+':'+indices.join(',')+':'+spin)),1]]);
const add=(A,B)=>{const R=new Map(A);for(const [k,v] of B){const n=(R.get(k)||0)+v;if(n)R.set(k,n);else R.delete(k)}return R};
const scale=(A,c)=>new Map([...A].map(([k,v])=>[k,c*v]).filter(([,v])=>v));
const wedge=(A,B)=>{const R=new Map();for(const [ka,va] of A)for(const [kb,vb] of B){const a=ka?ka.split(',').map(Number):[],b=kb?kb.split(',').map(Number):[];if(a.some(x=>b.includes(x)))continue;let inv=0;for(const x of a)for(const y of b)if(x>y)inv++;const key=[...a,...b].sort((x,y)=>x-y).join(','),v=va*vb*(inv%2?-1:1);R.set(key,(R.get(key)||0)+v)}for(const [k,v] of [...R])if(!v)R.delete(k);return R};
const pair=(nameA,idxA,nameB,idxB)=>add(wedge(gen(nameA,idxA,0),gen(nameB,idxB,1)),scale(wedge(gen(nameA,idxA,1),gen(nameB,idxB,0)),-1));
const e2=(i,j)=>i===0&&j===1?1:i===1&&j===0?-1:0;
const e3=(a,b,c)=>{if(new Set([a,b,c]).size<3)return 0;const p=[a,b,c],inv=(p[0]>p[1])+(p[0]>p[2])+(p[1]>p[2]);return inv%2?-1:1};

let qqql=new Map();
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++)for(let i=0;i<2;i++)for(let j=0;j<2;j++)for(let k=0;k<2;k++)for(let l=0;l<2;l++){
  const coeff=e3(a,b,c)*e2(i,j)*e2(k,l);if(!coeff)continue;
  qqql=add(qqql,scale(wedge(pair('Q',[a,i],'Q',[b,j]),pair('Q',[c,k],'L',[l])),coeff));
}
let uude=new Map();
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++){
  const coeff=e3(a,b,c);if(!coeff)continue;
  uude=add(uude,scale(wedge(pair('dc',[a],'uc',[b]),pair('uc',[c],'ec',[])),coeff));
}
assert(qqql.size>0&&uude.size>0);
assert([...qqql.values()].some(v=>v!==0)&&[...uude.values()].some(v=>v!==0));

const equations=[[3,0,0,1,0,0],[0,2,1,0,1,0]];
const rank2=equations[0].some((x,i)=>equations[1][i]!==0&&equations[0].some((y,j)=>y*equations[1][i]!==x*equations[1][j]));
assert(rank2);
const phaseNullity=6-2;
assert.equal(phaseNullity,4);
const BminusL=[1,-1,-1,-3,3,3],hypercharge6=[1,-4,2,-3,6,0];
for(const q of [BminusL,hypercharge6])for(const row of equations)assert.equal(row.reduce((s,x,i)=>s+x*q[i],0),0);

console.log('Mirror covering-quartic contraction certificate: PASS');
console.log('QQQL_terms='+qqql.size+'; uude_terms='+uude.size+'; both_nonzero=true; residual_species_U1_nullity=4; BminusL_preserved=true');
