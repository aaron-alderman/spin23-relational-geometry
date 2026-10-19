import assert from 'node:assert/strict';

const rt2=Math.sqrt(2), rt3=Math.sqrt(3);
const gn=1+rt2, gt=rt2-1;
const sq=x=>x*x;

// Strict loss: det of one eigenchannel's two-face boundary product is
// ((z^2+a^2)/(z^2+b^2))^2.  At the upper pole z=i b the numerator is a^2-b^2.
const strictCases=[
  {gamma:gn,ell:.05},
  {gamma:gt,ell:.2},
  {gamma:gn,ell:.1},
].map(({gamma,ell})=>{
  const a=gamma*Math.exp(-ell), b=gamma*Math.exp(ell);
  const uncancelledNumerator=a*a-b*b;
  assert.ok(Math.abs(uncancelledNumerator)>1e-12);
  return {gamma,ell,a,b,upperPoleImaginaryPart:b,uncancelledNumerator};
});

// Lossless: in the eigenbasis M=U^T D U has nonzero off-diagonal entry.
// C_12 contains m12*m11*f_t/f_n, which has an order-two pole at z=i*gamma_n.
const m11=-.5, m12=-rt3/2, m22=.5;
assert.ok(Math.abs(m11*m12)>1e-12);
assert.notEqual(gn,gt);
const fAtImaginary=(gamma,x)=>sq((x-gamma)/(x+gamma)); // f_gamma(i x), away from x=-gamma
const ftAtNormalZero=fAtImaginary(gt,gn);
assert.ok(Number.isFinite(ftAtNormalZero)&&Math.abs(ftAtNormalZero)>1e-12);

// Numerical blow-up approaching z=i gamma_n from a real displacement epsilon.
const cmul=([a,b],[c,d])=>[a*c-b*d,a*d+b*c];
const cdiv=([a,b],[c,d])=>{const n=c*c+d*d;return[(a*c+b*d)/n,(b*c-a*d)/n]};
const f=(z,g)=>{const num=[z[0],z[1]-g],den=[z[0],z[1]+g];const r=cdiv(num,den);return cmul(r,r)};
const mag=([a,b])=>Math.hypot(a,b);
const blowup=[1e-1,1e-2,1e-3,1e-4].map(epsilon=>{
  const z=[epsilon,gn], fn=f(z,gn), ft=f(z,gt);
  const ratio=cdiv(ft,fn);
  return {epsilon,absPoleTerm:Math.abs(m11*m12)*mag(ratio)};
});
for(let i=1;i<blowup.length;i++) assert.ok(blowup[i].absPoleTerm>50*blowup[i-1].absPoleTerm);

console.log(JSON.stringify({
  protocol:'two-face-same-half-plane-rational-inner-no-go/1',
  strictLoss:{determinantFactor:'((z^2+a^2)/(z^2+b^2))^2',strictCases,conclusion:'upper pole z=+ib is uncancelled whenever a<b'},
  lossless:{mixingMatrix:[[m11,m12],[m12,m22]],normalScale:gn,tangentScale:gt,ftAtNormalZero,offDiagonalPoleCoefficient:m11*m12,blowup,conclusion:'D does not commute with the response eigenbasis, so f_t/f_n leaves an upper-half-plane pole'},
  theorem:'No constant compression of an upper-half-plane analytic rational-inner matrix can equal a boundary matrix with an upper-half-plane pole.',
  allowedCategory:'two oriented analytic faces sewn by a local real interface / boundary monodromy',
  passed:true
},null,2));
