import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const I=[[1,0],[0,1]];
const C=[[0,-1],[1,-1]];
const F=[[1,0],[1,-1]];
assert.equal(maxabs(sub(mm(mm(C,C),C),I)),0);
assert.equal(maxabs(sub(mm(F,F),I)),0);
assert.equal(maxabs(sub(mm(mm(F,C),F),mm(C,C))),0);

// Exact commutant equations on M=[[a,b],[c,d]].
// [M,C]=0 gives b+c=0, -a-b+d=0, a-c-d=0 (one redundant).
// [M,F]=0 gives b=0, a+2b-d=0, -2c-a+d=0 (one redundant).
// Together: b=c=0 and a=d.
const fullCommutantBasis=[I];
const reflectionCommutantBasis=[I,F];
for(const B of fullCommutantBasis){assert.equal(maxabs(sub(mm(B,C),mm(C,B))),0);assert.equal(maxabs(sub(mm(B,F),mm(F,B))),0)}
for(const B of reflectionCommutantBasis)assert.equal(maxabs(sub(mm(B,F),mm(F,B))),0);

const Pplus=scale(.5,add(I,F)), Pminus=scale(.5,sub(I,F));
const response=(fp,fm)=>add(scale(fp,Pplus),scale(fm,Pminus));
const anisotropic=response(2,3);
assert.equal(maxabs(sub(mm(anisotropic,F),mm(F,anisotropic))),0);
assert.ok(maxabs(sub(mm(anisotropic,C),mm(C,anisotropic)))>0);
const isotropic=response(2,2);
assert.equal(maxabs(sub(mm(isotropic,C),mm(C,isotropic))),0);

const gammaNormal=1+Math.sqrt(2), gammaTangent=Math.sqrt(2)-1;
const factor=(w,g,l)=>{const nr=[w,-g*Math.exp(-l)],dr=[w,g*Math.exp(l)];const n=nr[0]*dr[0]+nr[1]*dr[1],im=nr[1]*dr[0]-nr[0]*dr[1],den=dr[0]**2+dr[1]**2;const r=[n/den,im/den];return [r[0]**2-r[1]**2,2*r[0]*r[1]]};
const fn=factor(1,gammaNormal,.1), ft=factor(1,gammaTangent,.02);
const eigenvalueSeparation=Math.hypot(fn[0]-ft[0],fn[1]-ft[1]);
assert.ok(eigenvalueSeparation>1e-6);

console.log(JSON.stringify({
  protocol:'a2-environment-reflection-spurion-theorem/1',
  generators:{C,F},
  fullS3Commutant:{dimension:1,basis:['I'],consequence:'an equivariant A2-to-A2 linear coupling is scalar'},
  reflectionCommutant:{dimension:2,basis:['I','F'],projectors:{plus:Pplus,minus:Pminus},consequence:'one face may have independent normal and tangent eigenresponses'},
  silverSample:{omega:1,ellNormal:.1,ellTangent:.02,normalEigenvalue:fn,tangentEigenvalue:ft,eigenvalueSeparation},
  theorem:'Distinct normal/tangent poles or losses require breaking S3 to a face reflection (or another spurion). Two conjugate reflection faces may restore C3 in their ordered monodromy.',
  boundary:'Representation equality of the placement A2 plane and minimal environment does not determine the anisotropic coupling coefficients.',
  passed:true
},null,2));
