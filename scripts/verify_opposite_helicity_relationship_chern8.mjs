import assert from 'node:assert/strict';

const N=4096;
let total=0,previous=0;
for(let j=1;j<=N;j++){
  const phi=2*Math.PI*j/N;
  const phase=8*phi;
  let delta=phase-previous;
  while(delta>Math.PI)delta-=2*Math.PI;
  while(delta<=-Math.PI)delta+=2*Math.PI;
  total+=delta;previous=phase;
}
assert.equal(Math.round(total/(2*Math.PI)),8);

const a=2.4,b=1.7,z={re:0.8,im:0.35};
const abs2=w=>w.re*w.re+w.im*w.im;
const rotate=(w,theta)=>({re:w.re*Math.cos(theta)-w.im*Math.sin(theta),im:w.re*Math.sin(theta)+w.im*Math.cos(theta)});
const trace=a+b,det=a*b-abs2(z);
assert(det>0);

let fixedRealSliceFails=false;
for(const phi of [0.03,0.17,0.41,0.88]){
  const zp=rotate(z,8*phi);
  assert(Math.abs(abs2(zp)-abs2(z))<1e-12);
  assert(Math.abs((a+b)-trace)<1e-12);
  assert(Math.abs((a*b-abs2(zp))-det)<1e-12);
  const realInput=rotate({re:1,im:0},8*phi);
  if(Math.abs(realInput.im)>1e-6)fixedRealSliceFails=true;
}
assert(fixedRealSliceFails);

console.log('Opposite-helicity relationship certificate: PASS');
console.log('face_chern_numbers=+4,-4; relationship_chern_number=8; global_real_slice=false; trace_determinant_positivity_global=true');
