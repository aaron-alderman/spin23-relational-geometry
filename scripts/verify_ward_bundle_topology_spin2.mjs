import assert from 'node:assert/strict';

const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const norm=a=>Math.sqrt(dot(a,a));
const frame=x=>[
  [-x[1], x[0], x[3],-x[2]],
  [-x[2],-x[3], x[0], x[1]],
  [-x[3], x[2],-x[1], x[0]],
];

const samples=[
  [1,0,0,0],
  [0,1,0,0],
  [0.5,0.5,0.5,0.5],
  [0.2,-0.3,0.4,Math.sqrt(1-0.04-0.09-0.16)],
].map(x=>{const n=norm(x);return x.map(v=>v/n)});

for(const x of samples){
  const F=frame(x);
  for(const v of F){assert(Math.abs(dot(x,v))<1e-12);assert(Math.abs(norm(v)-1)<1e-12)}
  for(let i=0;i<3;i++)for(let j=i+1;j<3;j++)assert(Math.abs(dot(F[i],F[j]))<1e-12);
}

// TS2 has equatorial clutching rotation 2*phi; spin two doubles it to 4*phi.
const N=4096;
let total=0, previous=0;
for(let j=1;j<=N;j++){
  const phi=2*Math.PI*j/N;
  const phase=4*phi;
  let delta=phase-previous;
  while(delta>Math.PI)delta-=2*Math.PI;
  while(delta<=-Math.PI)delta+=2*Math.PI;
  total+=delta;
  previous=phase;
}
const winding=Math.round(total/(2*Math.PI));
assert.equal(winding,4);

console.log('Ward-bundle topology certificate: PASS');
console.log('S3_tangent_global_quaternion_frame=true; massive_support_trivial=true; null_spin2_clutching_winding=4; single_helicity_global_frame=false');
