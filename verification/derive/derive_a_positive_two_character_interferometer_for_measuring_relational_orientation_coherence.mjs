import assert from 'node:assert/strict';

const p=.7,q=.3,c={re:.2,im:.1};
const determinant=p*q-c.re*c.re-c.im*c.im;
assert.ok(p>=0&&q>=0&&determinant>=0);
const intensities=x=>({
  linearPlus:(p+q+2*x.re)/2,
  linearMinus:(p+q-2*x.re)/2,
  circularPlus:(p+q+2*x.im)/2,
  circularMinus:(p+q-2*x.im)/2,
});
const original=intensities(c),reversed=intensities({re:-c.re,im:-c.im});
const stokes=x=>({S0:p+q,S1:2*x.re,S2:2*x.im,S3:p-q});
const s=stokes(c),sr=stokes({re:-c.re,im:-c.im});
assert.equal(sr.S0,s.S0);assert.equal(sr.S3,s.S3);assert.equal(sr.S1,-s.S1);assert.equal(sr.S2,-s.S2);
assert.ok(Math.abs((original.linearPlus-original.linearMinus)-s.S1)<1e-12);
assert.ok(Math.abs((original.circularPlus-original.circularMinus)-s.S2)<1e-12);
const visibility=2*Math.hypot(c.re,c.im)/(p+q);
assert.ok(visibility<=1+1e-12);

console.log(JSON.stringify({
  protocol:'positive-even-odd-character-interferometer/1',
  coherenceMatrix:{p,c,q,determinant,positiveSemidefinite:true},
  orientationAction:'c -> -c',
  analyzerIntensities:{original,reversed},
  stokesLikeCoordinates:{original:s,reversed:sr},
  orientationEven:['S0=p+q','S3=p-q'],
  orientationOdd:['S1=2 Re c','S2=2 Im c'],
  normalizedVisibility:visibility,
  positivityBound:'2|c|/(p+q)<=1 follows from |c|^2<=pq and 2sqrt(pq)<=p+q.',
  conclusion:'A positive two-character response measures relational orientation by balanced linear and circular analyzer differences. Diagonal populations alone retain only the orientation-even coordinates.',
  boundary:'The construction assumes coherent access to one even and one odd character mode and a common phase reference. It does not derive those ports from the current scattering checkpoint.',
  passed:true,
},null,2));
