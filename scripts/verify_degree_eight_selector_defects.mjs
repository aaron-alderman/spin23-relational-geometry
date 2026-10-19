import assert from 'node:assert/strict';

const roots=Array.from({length:8},(_,k)=>({re:Math.cos(2*Math.PI*k/8),im:Math.sin(2*Math.PI*k/8)}));
const cmul=(a,b)=>({re:a.re*b.re-a.im*b.im,im:a.re*b.im+a.im*b.re});
const cadd=(a,b)=>({re:a.re+b.re,im:a.im+b.im});
const cpow=(z,n)=>{let r={re:1,im:0};for(let i=0;i<n;i++)r=cmul(r,z);return r};
const abs=z=>Math.hypot(z.re,z.im);
for(const z of roots){
  assert(abs(cadd(cpow(z,8),{re:-1,im:0}))<1e-10);
  assert(8*abs(cpow(z,7))>1e-8); // simple derivative
}

let totalWinding=0;
for(const z0 of roots){
  const N=1024,r=1e-3;
  let previous=Math.atan2(cadd(cpow({re:z0.re+r,im:z0.im},8),{re:-1,im:0}).im,cadd(cpow({re:z0.re+r,im:z0.im},8),{re:-1,im:0}).re);
  let winding=0;
  for(let j=1;j<=N;j++){
    const t=2*Math.PI*j/N;
    const z={re:z0.re+r*Math.cos(t),im:z0.im+r*Math.sin(t)};
    const s=cadd(cpow(z,8),{re:-1,im:0});
    const phase=Math.atan2(s.im,s.re);
    let d=phase-previous;while(d>Math.PI)d-=2*Math.PI;while(d<=-Math.PI)d+=2*Math.PI;
    winding+=d;previous=phase;
  }
  const index=Math.round(winding/(2*Math.PI));
  assert.equal(index,1);totalWinding+=index;
}
assert.equal(totalWinding,8);

// South-patch section 1-w^8 is regular and nonzero at infinity w=0.
assert.equal(cadd({re:1,im:0},{re:0,im:0}).re,1);

console.log('Degree-eight selector defect certificate: PASS');
console.log('simple_zeros=8; local_index_each=1; total_selector_index=8; infinity_regular=true; global_nonzero_selector=false');
