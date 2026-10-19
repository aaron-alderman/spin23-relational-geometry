import assert from 'node:assert/strict';

const c=(re,im=0)=>[re,im], add=([a,b],[d,e])=>[a+d,b+e], mul=([a,b],[d,e])=>[a*d-b*e,a*e+b*d];
const div=([a,b],[d,e])=>{const n=d*d+e*e;return[(a*d+b*e)/n,(b*d-a*e)/n]};
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),c(0))));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>Math.hypot(x[0]-B[i][j][0],x[1]-B[i][j][1])<1e-12));
const inverse2=A=>{const determinant=add(mul(A[0][0],A[1][1]),[-mul(A[0][1],A[1][0])[0],-mul(A[0][1],A[1][0])[1]]);return [[div(A[1][1],determinant),div([-A[0][1][0],-A[0][1][1]],determinant)],[div([-A[1][0][0],-A[1][0][1]],determinant),div(A[0][0],determinant)]]};
const I=[[c(1),c(0)],[c(0),c(1)]], X=[[c(0),c(1)],[c(1),c(0)]];
const cayley=K=>{const minus=I.map((r,i)=>r.map((x,j)=>add(x,mul(c(0,-1),K[i][j]))));const plus=I.map((r,i)=>r.map((x,j)=>add(x,mul(c(0,1),K[i][j]))));return mm(minus,inverse2(plus))};
const target=X.map(r=>r.map(x=>mul(c(0,-1),x)));
assert.ok(eq(cayley(X),target));

const rt2=Math.sqrt(2), rn=1+rt2, rt=rt2-1;
const reactance=r=>2*r/(1-r*r);
const qn=reactance(rn), qt=reactance(rt);
assert.ok(Math.abs(qn+1)<1e-12&&Math.abs(qt-1)<1e-12);
const blaschkeSquare=r=>{const z=div(c(1,-r),c(1,r));return mul(z,z)};
const cayleyScalar=q=>div(c(1,-q),c(1,q));
assert.ok(Math.hypot(...blaschkeSquare(rn).map((x,i)=>x-cayleyScalar(qn)[i]))<1e-12);
assert.ok(Math.hypot(...blaschkeSquare(rt).map((x,i)=>x-cayleyScalar(qt)[i]))<1e-12);

console.log(JSON.stringify({
  protocol:'silver-unit-cayley-reactance/1',
  scalarIdentity:'((1-ir)/(1+ir))^2 = (1-iq)/(1+iq), q=2r/(1-r^2)',
  positiveSolutions:{qMinusOne:rn,qPlusOne:rt,normalRatio:rn,tangentRatio:rt,product:rn*rt},
  reactances:{normal:qn,tangent:qt},
  matrixIdentity:'Cayley(X)=(I-iX)(I+iX)^-1=-iX',
  gradedPfaffianIdentity:'X=-epsilon D, hence Cayley(-epsilon D)=i epsilon D=-iX',
  interpretation:'The silver ratios are exactly the positive ratios for which the Cayley reactance eigenvalues are -1 and +1, making the reactance matrix an involution.',
  boundary:'This fixes dimensionless ratios conditional on the involutive checkpoint. It does not derive the physical pole scale, operating frequency, or why the checkpoint is dynamically selected.',
  passed:true
},null,2));
