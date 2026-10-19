import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>z(a.re,-a.im);
const divz=(a,b)=>{const d=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const abs2=a=>a.re*a.re+a.im*a.im;
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const mmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mulz(x,B[k][j])),z())));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),trans=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const scale=(a,A)=>A.map(r=>r.map(x=>mulz(a,x)));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const inv=A=>{const n=A.length,M=A.map((r,i)=>[...r,...eye(n)[i]]);for(let c=0;c<n;c++){let p=c;while(p<n&&abs2(M[p][c])<1e-20)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>divz(x,d));for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>sub(x,mulz(f,M[c][j])));}}return M.map(r=>r.slice(n));};
const q=(re,im=0)=>z(re/85,im/85);
const S0=[
  [q(21,-52),q(-18,-4),q(58,-6),q(4,-18)],
  [q(-18,-4),q(64,-33),q(11,-7),q(33,-21)],
  [q(58,-6),q(11,-7),q(-26,-53),q(7,11)],
  [q(4,-18),q(33,-21),q(7,11),q(-64,33)],
];
assert.ok(maxerr(mmul(dag(S0),S0),eye(4))<1e-12);
assert.ok(maxerr(trans(S0),S0)<1e-12);

const gamma=2,omega0=1;
const blaschke=w=>divz(sub(w,z(0,gamma)),add(w,z(0,gamma)));
const b0=blaschke(z(omega0,0));
const f=w=>divz(blaschke(w),b0);
const scattering=w=>scale(f(w),S0);
assert.ok(maxerr(scattering(z(omega0,0)),S0)<1e-12);

const boundaryChecks=[-3,-.5,0,1,4].map(w=>{
  const S=scattering(z(w,0));
  assert.ok(maxerr(mmul(dag(S),S),eye(4))<1e-11);
  assert.ok(maxerr(trans(S),S)<1e-12);
  return {omega:w,scalarModulus:Math.sqrt(abs2(f(z(w,0))))};
});
const upperChecks=[[0,.2],[1,.4],[-2,1],[3,2]].map(([x,y])=>{
  const w=z(x,y),fw=f(w),S=scattering(w),defect=msub(eye(4),mmul(dag(S),S));
  const expected=scale(z(1-abs2(fw)),eye(4));assert.ok(maxerr(defect,expected)<1e-11);assert.ok(1-abs2(fw)>0);
  const F=mmul(madd(eye(4),S),inv(msub(eye(4),S)));
  const herm=scale(z(.5),madd(F,dag(F)));
  const rhs=mmul(mmul(inv(msub(eye(4),dag(S))),defect),inv(msub(eye(4),S)));
  assert.ok(maxerr(herm,rhs)<1e-10);
  const diag=herm.map((r,i)=>r[i].re);assert.ok(diag.every(v=>v>0));
  return {frequency:{re:x,im:y},schurDefect:1-abs2(fw),positiveRealDiagonal:diag};
});

console.log(JSON.stringify({
  protocol:'reciprocal-rational-inner-interpolation-of-selector-scattering/1',
  checkpointFrequency:omega0,
  lowerHalfPlanePole:{re:0,im:-gamma},
  scalarFactor:'f(z)=b(z)/b(omega0), b(z)=(z-i gamma)/(z+i gamma)',
  checkpointRecovered:true,
  reciprocalAtAllFrequencies:true,
  boundaryInnerChecks:boundaryChecks,
  upperHalfPlaneSchurAndPositiveRealChecks:upperChecks,
  cayleyResponse:'F(z)=(I+S(z))(I-S(z))^-1 has positive Hermitian part in Im z>0',
  result:'No generic analyticity, reciprocity or passivity obstruction prevents embedding the selected scattering checkpoint in a causal rational inner response.',
  limitations:['complex-envelope reality only','pole scale gamma is free','scalar all-pass dressing does not derive the matrix structure','no Furey threshold or stress-tensor residue identification'],
  passed:true,
},null,2));
