import assert from 'node:assert/strict';

const rt2=Math.sqrt(2), rt3=Math.sqrt(3);
const c=(re,im=0)=>[re,im];
const add=([a,b],[d,e])=>[a+d,b+e];
const mul=([a,b],[d,e])=>[a*d-b*e,a*e+b*d];
const conj=([a,b])=>[a,-b];
const div=([a,b],[d,e])=>{const n=d*d+e*e;return[(a*d+b*e)/n,(b*d-a*e)/n]};
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>c(Number(i===j))));
const dagger=A=>A[0].map((_,j)=>A.map(r=>conj(r[j])));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((z,x,k)=>add(z,mul(x,B[k][j])),c(0))));
const defect=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x[0]-B[i][j][0],x[1]-B[i][j][1]))));
const block=blocks=>{const n=blocks.reduce((s,B)=>s+B.length,0),o=Array.from({length:n},()=>Array.from({length:n},()=>c(0)));let q=0;for(const B of blocks){for(let i=0;i<B.length;i++)for(let j=0;j<B.length;j++)o[q+i][q+j]=B[i][j];q+=B.length}return o};
const permute=(A,p)=>p.map(i=>p.map(j=>A[i][j]));
const embed=(A,idx,n)=>{const E=I(n);for(let i=0;i<A.length;i++)for(let j=0;j<A.length;j++)E[idx[i]][idx[j]]=A[i][j];return E};

const minimalScalarSquare=(w,g,l)=>{
  const a=g*Math.exp(-l), b=g*Math.exp(l);
  const d=Math.sqrt((a*a+b*b)/2), k=Math.sqrt(2*(b*b-a*a));
  const den=mul(c(w,b),c(w,b));
  const p=mul(c(w,-a),c(w,-a)), pSharp=mul(c(w,a),c(w,a));
  const q=mul(c(k),c(w,d)), qSharp=mul(c(k),c(w,-d));
  return [[div(p,den),div(c(-qSharp[0],-qSharp[1]),den)],[div(q,den),div(pSharp,den)]];
};
const face4=(w,ln,lt)=>{
  const raw=permute(block([minimalScalarSquare(w,1+rt2,ln),minimalScalarSquare(w,rt2-1,lt)]),[0,2,1,3]);
  const R=[[c(.5),c(-rt3/2)],[c(rt3/2),c(.5)]];
  const W=block([R,I(2)]); return mm(mm(W,raw),dagger(W));
};
const observed=A=>A.slice(0,2).map(r=>r.slice(0,2));
const D2=[[c(1),c(0)],[c(0),c(-1)]];
const D6=embed(D2,[0,1],6);
const cycle6=(w,ln,lt)=>{
  const plus=embed(face4(w,ln,lt),[0,1,2,3],6);
  const minus=embed(face4(-w,ln,lt),[0,1,4,5],6);
  return mm(mm(mm(D6,minus),D6),plus);
};

const cases=[-3,-1,-.2,0,.3,1,4].flatMap(w=>[[0,0],[.05,.05],[.1,.02],[0,.2]].map(([ln,lt])=>{
  const F=face4(w,ln,lt), C=cycle6(w,ln,lt);
  const faceUnitarityDefect=defect(mm(dagger(F),F),I(4));
  const cycleUnitarityDefect=defect(mm(dagger(C),C),I(6));
  const expected=mm(mm(mm(D2,observed(face4(-w,ln,lt))),D2),observed(face4(w,ln,lt)));
  const compressionDefect=defect(observed(C),expected);
  assert.ok(faceUnitarityDefect<1e-9&&cycleUnitarityDefect<1e-9&&compressionDefect<1e-10);
  return {omega:w,ellNormal:ln,ellTangent:lt,faceUnitarityDefect,cycleUnitarityDefect,compressionDefect};
}));

const checkpoint=observed(cycle6(1,0,0));
const orderThreeDefect=defect(mm(mm(checkpoint,checkpoint),checkpoint),I(2));
assert.ok(orderThreeDefect<1e-10);

console.log(JSON.stringify({
  protocol:'minimal-two-port-completion-of-squared-loss-factor/1',
  scalarFormula:'1/(z+ib)^2 [[(z-ia)^2,-k(z-id)],[k(z+id),(z+ia)^2]], d^2=(a^2+b^2)/2, k^2=2(b^2-a^2)',
  polynomialIdentity:'(z^2+a^2)^2 + 2(b^2-a^2)(z^2+(a^2+b^2)/2) = (z^2+b^2)^2',
  dimensions:{minimalSquaredScalar:2,minimalFullFace:4,freshEnvironmentTwoFaceCycle:6},
  strictLossLowerBound:'The full observed face has defect rank two, so any pointwise unitary completion needs at least two environment ports; the four-port construction attains this.',
  checkpoint:{omega:1,orderThreeDefect},
  cases,
  boundary:'The six-port two-face fresh-environment construction is not proved globally minimal for the composite cycle; direct joint spectral factorization may reduce it further.',
  passed:true
},null,2));
