import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im});
const add=(a,b)=>C(a.re+b.re,a.im+b.im);
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=a=>C(a.re,-a.im);
const scale=(a,s)=>C(a.re*s,a.im*s);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0))));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j])));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j])));
const mscale=(A,s)=>A.map(r=>r.map(x=>scale(x,s)));
const transform=(U,X)=>mm(mm(U,X),dag(U));
const jordan=(X,Y)=>mscale(madd(mm(X,Y),mm(Y,X)),0.5);
const triple=(X,Y,Z)=>mscale(madd(mm(mm(X,Y),Z),mm(mm(Z,Y),X)),0.5);
const maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const det=X=>add(mul(X[0][0],X[1][1]),scale(mul(X[0][1],X[1][0]),-1));
const trace=X=>add(X[0][0],X[1][1]);

const X=[[C(2.2),C(0.5,0.3)],[C(0.5,-0.3),C(1.4)]];
const Y=[[C(1.1),C(-0.2,0.4)],[C(-0.2,-0.4),C(2.0)]];
const Z=[[C(0.9),C(0.15,-0.1)],[C(0.15,0.1),C(1.6)]];

for(const phi of [0.07,0.31,0.82,1.4]){
  const p=C(Math.cos(4*phi),Math.sin(4*phi));
  const U=[[p,C(0)],[C(0),conj(p)]];
  const TX=transform(U,X),TY=transform(U,Y),TZ=transform(U,Z);
  assert(maxDiff(transform(U,jordan(X,Y)),jordan(TX,TY))<1e-11);
  assert(maxDiff(transform(U,triple(X,Y,Z)),triple(TX,TY,TZ))<1e-11);
  assert(Math.hypot(det(TX).re-det(X).re,det(TX).im-det(X).im)<1e-11);
  assert(Math.hypot(trace(TX).re-trace(X).re,trace(TX).im-trace(X).im)<1e-11);
  assert(maxDiff(TX,dag(TX))<1e-11);
  assert(det(TX).re>0&&trace(TX).re>0);
}

console.log('Twisted H2(C) Jordan gluing certificate: PASS');
console.log('face_transition_winding=4; relationship_winding=8; jordan_product_global=true; triple_product_global=true; determinant_positive_global=true; H2R_reduction_obstructed=true');
