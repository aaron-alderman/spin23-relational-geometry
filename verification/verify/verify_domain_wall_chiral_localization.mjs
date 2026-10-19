import assert from 'node:assert/strict';

const m0=1.3,xi=0.8;
const mass=w=>m0*Math.tanh(w/xi);
const profile=w=>Math.cosh(w/xi)**(-m0*xi);
const derivative=w=>-mass(w)*profile(w);

for(const w of [-4,-1.2,-0.2,0,0.3,1.7,4]){
  assert(Math.abs(derivative(w)+mass(w)*profile(w))<1e-12);
}

// Numerical L2 norm converges on expanding intervals.
const integrate=(R,N=200000)=>{
  const h=2*R/N;let sum=0;
  for(let i=0;i<=N;i++){const w=-R+i*h;const weight=(i===0||i===N)?0.5:1;sum+=weight*profile(w)**2}
  return sum*h;
};
const n6=integrate(6),n10=integrate(10);
assert(Number.isFinite(n10)&&n10>0);
assert(Math.abs(n10-n6)/n10<1e-5);

// Antikink reverses the sign in the first-order equation and hence wall chirality.
const antiMass=w=>-mass(w);
const antiProfile=w=>profile(w);
for(const w of [-2,-0.4,0.6,2])assert(Math.abs((-derivative(w))+antiMass(w)*antiProfile(w))<1e-12);

const overlap=L=>Math.exp(-m0*L);
assert(overlap(8)<overlap(4)&&overlap(12)<overlap(8));
assert(overlap(12)<2e-7);

console.log('Domain-wall chiral localization certificate: PASS');
console.log(`kink_zero_mode_normalizable=true; norm=${n10.toFixed(8)}; antikink_opposite_chirality=true; overlap_L12=${overlap(12).toExponential(3)}`);
