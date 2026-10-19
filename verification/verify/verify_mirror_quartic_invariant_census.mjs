import assert from 'node:assert/strict';

const F=[
  {n:'Q',t:1,d:1,y:1,B:1,L:0},
  {n:'uc',t:-1,d:0,y:-4,B:-1,L:0},
  {n:'dc',t:-1,d:0,y:2,B:-1,L:0},
  {n:'L',t:0,d:1,y:-3,B:0,L:1},
  {n:'ec',t:0,d:0,y:6,B:0,L:-1},
  {n:'nc',t:0,d:0,y:0,B:0,L:-1},
];
const candidates=[];
for(let a=0;a<F.length;a++)for(let b=a;b<F.length;b++)for(let c=b;c<F.length;c++)for(let d=c;d<F.length;d++){
  const x=[F[a],F[b],F[c],F[d]],triality=x.reduce((s,q)=>s+q.t,0),doublets=x.reduce((s,q)=>s+q.d,0),y=x.reduce((s,q)=>s+q.y,0);
  if(((triality%3)+3)%3===0&&doublets%2===0&&y===0)candidates.push({
    name:x.map(q=>q.n).join(' '),
    B3:x.reduce((s,q)=>s+q.B,0),
    L:x.reduce((s,q)=>s+q.L,0)
  });
}
const names=candidates.map(x=>x.name);
assert(names.includes('Q Q Q L'));
assert(names.includes('uc uc dc ec'));
const charged=['Q','uc','dc','L','ec'];
const seed=['Q Q Q L','uc uc dc ec'];
assert(charged.every(f=>seed.some(o=>o.split(' ').includes(f))));
assert(candidates.find(x=>x.name==='Q Q Q L').B3===3&&candidates.find(x=>x.name==='Q Q Q L').L===1);
assert(candidates.find(x=>x.name==='uc uc dc ec').B3===-3&&candidates.find(x=>x.name==='uc uc dc ec').L===-1);

console.log('Mirror quartic invariant census certificate: PASS');
console.log('representation_level_candidates='+candidates.length);
console.log('charged_cover=QQQL plus uc-uc-dc-ec; preserves_B_minus_L=true; proves_gap=false');
console.log(names.join('; '));
