import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im}),add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),divz=(a,b)=>{const d=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const conj=a=>z(a.re,-a.im),abs=a=>Math.hypot(a.re,a.im),eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const mmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mulz(x,B[k][j])),z())));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),scale=(a,A)=>A.map(r=>r.map(x=>mulz(a,x)));
const trace=A=>A.reduce((s,r,i)=>add(s,r[i]),z()),maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>abs(sub(x,B[i][j])))));
const q=(re,im=0)=>z(re/85,im/85);
const S=[[q(21,-52),q(-18,-4),q(58,-6),q(4,-18)],[q(-18,-4),q(64,-33),q(11,-7),q(33,-21)],[q(58,-6),q(11,-7),q(-26,-53),q(7,11)],[q(4,-18),q(33,-21),q(7,11),q(-64,33)]];
assert.ok(maxerr(mmul(dag(S),S),eye(4))<1e-12);

// Faddeev-LeVerrier characteristic coefficients.
let B=eye(4);const coeff=[z(1)];
for(let k=1;k<=4;k++){const c=mulz(z(-1/k),trace(mmul(S,B)));coeff.push(c);B=madd(mmul(S,B),scale(c,eye(4)));}
const peval=(x)=>coeff.reduce((v,c)=>add(mulz(v,x),c),z());
let roots=Array.from({length:4},(_,k)=>{const a=.31+2*Math.PI*k/4;return z(1.13*Math.cos(a),1.13*Math.sin(a));});
for(let it=0;it<500;it++){
  let delta=0;const next=roots.map((r,j)=>{let den=z(1);for(let k=0;k<4;k++)if(k!==j)den=mulz(den,sub(r,roots[k]));const d=divz(peval(r),den);delta=Math.max(delta,abs(d));return sub(r,d);});roots=next;if(delta<1e-14)break;
}
roots.sort((a,b)=>Math.atan2(a.im,a.re)-Math.atan2(b.im,b.re));
for(const r of roots){assert.ok(abs(peval(r))<1e-10);assert.ok(Math.abs(abs(r)-1)<1e-10);}
for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)assert.ok(abs(sub(roots[i],roots[j]))>1e-4);

const projectors=roots.map((lam,j)=>{
  let P=eye(4);
  for(let k=0;k<4;k++)if(k!==j)P=scale(divz(z(1),sub(lam,roots[k])),mmul(P,msub(S,scale(roots[k],eye(4)))));
  assert.ok(maxerr(P,dag(P))<1e-9);assert.ok(maxerr(mmul(P,P),P)<1e-9);assert.ok(abs(sub(trace(P),z(1)))<1e-9);
  return P;
});
assert.ok(maxerr(projectors.reduce(madd),eye(4))<1e-9);
const participation=projectors.map((P,j)=>{const coordinate=P.map((r,i)=>r[i].re);assert.ok(coordinate.every(x=>x>1e-8));return{
  eigenphase:Math.atan2(roots[j].im,roots[j].re),eigenvalue:roots[j],coordinate,
  handleWeights:[coordinate[0]+coordinate[2],coordinate[1]+coordinate[3]],
  sideWeights:[coordinate[0]+coordinate[1],coordinate[2]+coordinate[3]],
  inverseParticipation:1/coordinate.reduce((s,x)=>s+x*x,0),
};});

console.log(JSON.stringify({
  protocol:'scattering-spectral-projector-participation/1',
  characteristicCoefficients:coeff,
  simpleUnitCircleSpectrum:true,
  projectorsRankOne:true,
  channelOrder:['left/handle1','left/handle2','right/handle1','right/handle2'],
  participation,
  allProjectorsTouchEveryCoordinate:true,
  allProjectorsTouchBothHandles:true,
  allProjectorsTouchBothSides:true,
  conclusion:'Every scalar-dressed residue eigenchannel is a rank-one coherent superposition with nonzero participation on all four scattering coordinates. None is even support-local to one handle or one boundary side.',
  boundary:'Participation weights do not identify Standard Model fields. A gauge-compatible source map would still be needed to interpret these coherent channels as typed Furey combinations.',
  passed:true,
},null,2));
