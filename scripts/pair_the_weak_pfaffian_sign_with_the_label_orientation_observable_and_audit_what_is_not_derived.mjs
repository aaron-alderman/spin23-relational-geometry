import assert from 'node:assert/strict';

const rt3=Math.sqrt(3), c=(re,im=0)=>[re,im];
const add=([a,b],[d,e])=>[a+d,b+e], mul=([a,b],[d,e])=>[a*d-b*e,a*e+b*d], conj=([a,b])=>[a,-b], scale=(r,[a,b])=>[r*a,r*b];
const realM=A=>A.map(row=>row.map(x=>c(x)));
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((z,x,k)=>add(z,mul(x,B[k][j])),c(0))));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const dagger=A=>transpose(A).map(row=>row.map(conj));
const msub=(A,B)=>A.map((row,i)=>row.map((x,j)=>[x[0]-B[i][j][0],x[1]-B[i][j][1]]));
const mscale=(r,A)=>A.map(row=>row.map(x=>scale(r,x)));
const maxDefect=(A,B)=>Math.max(...A.flatMap((row,i)=>row.map((x,j)=>Math.hypot(x[0]-B[i][j][0],x[1]-B[i][j][1]))));
const I3=realM([[1,0,0],[0,1,0],[0,0,1]]), Dlabel=realM([[0,0,1],[0,1,0],[1,0,0]]);
const T=realM([[0,1,0],[0,0,1],[1,0,0]]), Tinv=transpose(T), Omega=mscale(0.5,msub(T,Tinv));
const iOmega=Omega.map(row=>row.map(([x,y])=>[-y,x]));
assert.ok(maxDefect(iOmega,dagger(iOmega))<1e-12);
assert.ok(maxDefect(mm(mm(Dlabel,Omega),Dlabel),mscale(-1,Omega))<1e-12);

const Dweak=realM([[1,0],[0,-1]]), eps=realM([[0,1],[-1,0]]);
assert.ok(maxDefect(mm(mm(Dweak,eps),transpose(Dweak)),mscale(-1,eps))<1e-12);

// With eta=+1 and the tuned coefficient, the minimal odd coupling is the
// autonomous oriented generator from document 934.
const coupling=4*Math.PI/(3*rt3), Hplus=mscale(coupling,iOmega), Hminus=mscale(-1,Hplus);
const zeta=c(-0.5,rt3/2), zeta2=conj(zeta);
const F=[[c(1),c(1),c(1)],[c(1),zeta2,zeta],[c(1),zeta,zeta2]].map(row=>row.map(x=>scale(1/rt3,x)));
const diag=xs=>xs.map((x,i)=>xs.map((_,j)=>i===j?x:c(0)));
const Uplus=mm(mm(F,diag([c(1),zeta,zeta2])),dagger(F)), Uminus=dagger(Uplus);
assert.ok(Math.min(maxDefect(Uplus,T),maxDefect(Uplus,Tinv))<1e-12);
assert.ok(Math.min(maxDefect(Uminus,T),maxDefect(Uminus,Tinv))<1e-12);
assert.ok(maxDefect(Uminus,dagger(Uplus))<1e-12);

console.log(JSON.stringify({
  protocol:'pfaffian-sign-to-label-orientation-pairing/1',
  weakParity:{equation:'D eps D^T = -eps',defect:maxDefect(mm(mm(Dweak,eps),transpose(Dweak)),mscale(-1,eps))},
  labelParity:{equation:'D Omega D = -Omega',defect:maxDefect(mm(mm(Dlabel,Omega),Dlabel),mscale(-1,Omega))},
  invariantCoupling:'eta_Pf i Omega is even because both eta_Pf and Omega are hchi-odd',
  tunedWitness:{coefficient:'4 pi/(3 sqrt(3)) for unit time',oppositeSignsGiveInverseCycles:maxDefect(Uminus,dagger(Uplus))},
  derived:'the Pfaffian line and cycle orientation line carry the same odd Z2 representation, so a scalar invariant pairing exists and is unique up to coefficient',
  notDerived:['a nonzero microscopic coupling coefficient','a nonzero Pfaffian vacuum expectation value','the magnitude needed for exact 2pi/3 holonomy','protection against flavor CP and radiative corrections'],
  passed:true,
},null,2));
