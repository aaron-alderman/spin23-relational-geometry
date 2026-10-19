import assert from 'node:assert/strict';

const rt2 = Math.sqrt(2), rt3 = Math.sqrt(3);
const c = (re, im = 0) => [re, im];
const add = ([a,b],[d,e]) => [a+d,b+e];
const mul = ([a,b],[d,e]) => [a*d-b*e,a*e+b*d];
const conj = ([a,b]) => [a,-b];
const div = ([a,b],[d,e]) => { const n=d*d+e*e; return [(a*d+b*e)/n,(b*d-a*e)/n]; };
const I = n => Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>c(Number(i===j))));
const dagger = A => A[0].map((_,j)=>A.map(r=>conj(r[j])));
const mm = (A,B) => A.map(r=>B[0].map((_,j)=>r.reduce((z,x,k)=>add(z,mul(x,B[k][j])),c(0))));
const defect = (A,B) => Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x[0]-B[i][j][0],x[1]-B[i][j][1]))));
const block = blocks => {
  const n=blocks.reduce((s,B)=>s+B.length,0), out=Array.from({length:n},()=>Array.from({length:n},()=>c(0)));
  let o=0; for (const B of blocks) { for(let i=0;i<B.length;i++) for(let j=0;j<B.length;j++) out[o+i][o+j]=B[i][j]; o+=B.length; }
  return out;
};
const permute = (A,p) => p.map(i=>p.map(j=>A[i][j]));
const base = (w,g,l) => div(c(w,-g*Math.exp(-l)),c(w,g*Math.exp(l)));
const stage = (w,g,l) => {
  const a=g*Math.exp(-l), b=g*Math.exp(l), k=Math.sqrt(Math.max(0,b*b-a*a)), den=c(w,b);
  return [[div(c(w,-a),den),div(c(0,-k),den)],[div(c(0,-k),den),div(c(w,a),den)]];
};
const embed3 = (A,e) => { const E=I(3), q=[0,e]; for(let i=0;i<2;i++) for(let j=0;j<2;j++) E[q[i]][q[j]]=A[i][j]; return E; };
const scalarSquare = (w,g,l) => mm(embed3(stage(w,g,l),2),embed3(stage(w,g,l),1));
const face = (w,ln,lt) => {
  const raw=permute(block([scalarSquare(w,1+rt2,ln),scalarSquare(w,rt2-1,lt)]),[0,3,1,2,4,5]);
  const R=[[c(.5),c(-rt3/2)],[c(rt3/2),c(.5)]];
  const W=block([R,I(4)]); return mm(mm(W,raw),dagger(W));
};
const faceObserved = (w,ln,lt) => {
  const R=[[c(.5),c(-rt3/2)],[c(rt3/2),c(.5)]];
  const fn=mul(base(w,1+rt2,ln),base(w,1+rt2,ln));
  const ft=mul(base(w,rt2-1,lt),base(w,rt2-1,lt));
  return mm(mm(R,[[fn,c(0)],[c(0),ft]]),dagger(R));
};
const embed = (A,indices,n=10) => { const E=I(n); for(let i=0;i<A.length;i++) for(let j=0;j<A.length;j++) E[indices[i]][indices[j]]=A[i][j]; return E; };
const D2=[[c(1),c(0)],[c(0),c(-1)]];
const D10=embed(D2,[0,1]);
const cycle10 = (w,ln,lt) => {
  const plus=embed(face(w,ln,lt),[0,1,2,3,4,5]);
  const minus=embed(face(-w,ln,lt),[0,1,6,7,8,9]);
  return mm(mm(mm(D10,minus),D10),plus);
};
const observed = A => A.slice(0,2).map(r=>r.slice(0,2));
const expectedCycle = (w,ln,lt) => mm(mm(mm(D2,faceObserved(-w,ln,lt)),D2),faceObserved(w,ln,lt));

const cases=[-3,-1,-.2,.3,1,4].flatMap(w=>[[0,0],[.05,.05],[.1,.02],[0,.2]].map(([ln,lt])=>{
  const U=cycle10(w,ln,lt);
  const unitaryDefect=defect(mm(dagger(U),U),I(10));
  const compressionDefect=defect(observed(U),expectedCycle(w,ln,lt));
  assert.ok(unitaryDefect<1e-9 && compressionDefect<1e-10);
  return {omega:w,ellNormal:ln,ellTangent:lt,unitaryDefect,compressionDefect};
}));

const checkpoint=expectedCycle(1,0,0);
const checkpointCube=mm(mm(checkpoint,checkpoint),checkpoint);
const checkpointOrderThreeDefect=defect(checkpointCube,I(2));
const checkpointUnitarityDefect=defect(mm(dagger(checkpoint),checkpoint),I(2));
assert.ok(checkpointOrderThreeDefect<1e-10 && checkpointUnitarityDefect<1e-10);

console.log(JSON.stringify({
  protocol:'fixed-ten-port-two-face-sideband-cycle-dilation/1',
  ports:{observed:2,positiveFaceEnvironment:4,negativeFaceEnvironment:4,total:10},
  construction:'D10 embed(S6(-omega),obs+Eminus) D10 embed(S6(+omega),obs+Eplus)',
  observedCompression:'D Sobs(-omega) D Sobs(+omega)',
  realStructure:'S6(-omega)=conjugate(S6(omega)); negative sideband is constrained boundary data, not an independent particle',
  checkpoint:{omega:1,ellNormal:0,ellTangent:0,checkpointOrderThreeDefect,checkpointUnitarityDefect},
  cases,
  minimalityBoundary:'Ten ports are canonical for the fresh-environment cascade of the two proven six-port face realizations; global minimality among all joint realizations is not proved.',
  passed:true
},null,2));
