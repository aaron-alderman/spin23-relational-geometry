import assert from 'node:assert/strict';

const tol=1e-10;
const invariantUnderShift=(m,delta,kind)=>{
  for(const phi of [0.13,.47,1.02,2.31]){
    const f=x=>kind==='cos'?Math.cos(m*x):Math.sin(m*x);
    if(Math.abs(f(phi+delta)-f(phi))>tol)return false;
  }
  return true;
};
const evenUnderReflection=(m,kind)=>{
  for(const phi of [.19,.71,1.44]){
    const f=x=>kind==='cos'?Math.cos(m*x):Math.sin(m*x);
    if(Math.abs(f(-phi)-f(phi))>tol)return false;
  }
  return true;
};

const allowed=[];
for(let m=1;m<=24;m++)for(const kind of ['cos','sin']){
  if(invariantUnderShift(m,2*Math.PI/3,kind)&&invariantUnderShift(m,Math.PI,kind)&&evenUnderReflection(m,kind))allowed.push({m,kind});
}
assert.deepEqual(allowed.slice(0,4),[{m:6,kind:'cos'},{m:12,kind:'cos'},{m:18,kind:'cos'},{m:24,kind:'cos'}]);

const kappa=2.7;
const V=phi=>-kappa*Math.cos(6*phi);
const d2V=phi=>36*kappa*Math.cos(6*phi);
const minima=[];
for(let n=0;n<6;n++){
  const phi=n*Math.PI/3;
  minima.push(phi);
  assert.ok(Math.abs(V(phi)+kappa)<tol);
  assert.ok(d2V(phi)>0);
}
for(let n=0;n<6;n++){
  const shifted=(n+.5)*Math.PI/3;
  assert.ok(Math.abs(V(shifted)-kappa)<tol);
  assert.ok(d2V(shifted)<0);
}

console.log(JSON.stringify({
  protocol:'minimal-sixth-harmonic-phase-locking/1',
  symmetries:['placement shift phi -> phi+2pi/3','deck shift phi -> phi+pi','Real/CP reflection phi -> -phi'],
  allowedNonconstantModes:allowed,
  minimalInvariant:'cos(6 phi)',
  potential:'V(phi)=-kappa cos(6 phi), kappa>0',
  minima:minima.map((_,n)=>`${n} pi/3`),
  curvatureAtMinima:36*kappa,
  shiftedOrbit:'kappa<0 selects phi=(n+1/2)pi/3',
  boundary:'The symmetry classification forces the harmonic form but not a nonzero coefficient, its sign, or its microscopic scale.',
  passed:true
},null,2));
