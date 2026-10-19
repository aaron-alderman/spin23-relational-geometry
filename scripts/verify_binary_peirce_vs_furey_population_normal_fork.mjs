#!/usr/bin/env node

// Exact/numerical certificate for the two real-form embeddings inside H_2(C).
// Jy contains the named population faces p,q but is not U(1)-invariant.
// Jz is U(1)-invariant but excludes their difference.  A pi/2 Bloch rotation
// maps the abstract Jordan algebras while moving p,q to coherent projectors.

import assert from 'node:assert/strict';

const C=(re=0,im=0)=>({re,im});
const addc=(a,b)=>C(a.re+b.re,a.im+b.im);
const mulc=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conjc=a=>C(a.re,-a.im);
const scalec=(s,a)=>C(s*a.re,s*a.im);
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>addc(x,B[i][j])));
const scale=(s,A)=>A.map(r=>r.map(x=>scalec(s,x)));
const dagger=A=>A[0].map((_,j)=>A.map(r=>conjc(r[j])));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>addc(s,mulc(x,B[k][j])),C())));
const nearc=(a,b,e=1e-10)=>Math.abs(a.re-b.re)<e&&Math.abs(a.im-b.im)<e;
const equal=(A,B)=>A.every((r,i)=>r.every((x,j)=>nearc(x,B[i][j])));
const ad=(U,X)=>mul(mul(U,X),dagger(U));

const I=[[C(1),C()],[C(),C(1)]];
const sx=[[C(),C(1)],[C(1),C()]];
const sy=[[C(),C(0,-1)],[C(0,1),C()]];
const sz=[[C(1),C()],[C(),C(-1)]];
const p=scale(.5,add(I,sz));
const q=scale(.5,add(I,scale(-1,sz)));

// Coordinate extraction in the Hermitian Pauli basis (I,sx,sy,sz).
const coords=X=>[
  (X[0][0].re+X[1][1].re)/2,
  (X[0][1].re+X[1][0].re)/2,
  (X[1][0].im-X[0][1].im)/2,
  (X[0][0].re-X[1][1].re)/2,
];
const inJy=X=>Math.abs(coords(X)[2])<1e-10; // span(I,sx,sz)
const inJz=X=>Math.abs(coords(X)[3])<1e-10; // span(I,sx,sy)

assert(inJy(p)&&inJy(q));
assert(!inJz(p)&&!inJz(q));
assert(inJz(add(p,q)));

// Relative-face U(1): exp(-i phi sz/2), tested at a generic angle.
const phi=.731;
const Uz=[
  [C(Math.cos(phi/2),-Math.sin(phi/2)),C()],
  [C(),C(Math.cos(phi/2),Math.sin(phi/2))],
];
assert(inJz(ad(Uz,sx))&&inJz(ad(Uz,sy))&&inJz(ad(Uz,I)));
assert(!inJy(ad(Uz,sx)));

// Quarter-turn about x maps sz to sy up to orientation and hence Jy to Jz.
const c=Math.SQRT1_2;
const Ux=add(scale(c,I),scale(-c,sy.map((r,i)=>r.map((_,j)=>mulc(C(0,1),sx[i][j])))));
// The construction above is c(I - i sx); spell-check unitarity.
assert(equal(mul(Ux,dagger(Ux)),I));
const imageX=ad(Ux,sx), imageZ=ad(Ux,sz);
assert(inJz(imageX)&&inJz(imageZ));
assert(!inJy(imageZ));
const pCoherent=ad(Ux,p),qCoherent=ad(Ux,q);
assert(inJz(pCoherent)&&inJz(qCoherent));
assert(Math.abs(coords(pCoherent)[3])<1e-10&&Math.abs(coords(qCoherent)[3])<1e-10);

const report={
  protocol:'binary-peirce-vs-furey-population-normal-fork/1',
  entrywiseRealCarrier:{basis:['I','sigma_x','sigma_z'],containsNamedFaces:true,continuousRelativeU1Invariant:false},
  populationNormalCarrier:{basis:['I','sigma_x','sigma_y'],containsNamedFacesIndividually:false,containsFaceSum:true,continuousRelativeU1Invariant:true},
  representationTheorem:'Under relative U(1), H2(C)=R I + R sigma_z + span_R(sigma_x,sigma_y); the last plane is irreducible for continuous rotations, so no invariant 3-plane can contain I, sigma_z and one relationship line.',
  quarterTurn:{axis:'sigma_x',angle:'pi/2',mapsEntrywiseRealToPopulationNormal:true,movesNamedFacesToCoherentProjectors:true,pImageCoordinates:coords(pCoherent),qImageCoordinates:coords(qCoherent)},
  consequence:'The two routes have isomorphic Jordan algebras but incompatible physical face assignments. A bridge must rotate/reinterpret the faces, neutralize U(1), or use an external covariant lock.',
  passed:true,
};
console.log(JSON.stringify(report,null,2));
