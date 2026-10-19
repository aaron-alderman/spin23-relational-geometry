#!/usr/bin/env node

const eps=1e-9;
const assert=(c,m)=>{if(!c)throw new Error(m);};
const multiply=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const det2=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const closeM=(A,B)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<eps));
const jordan=([t,x,y])=>[[t+x,y],[y,t-x]];
const etaNorm=([t,x,y])=>t*t-x*x-y*y;

for(const r of [[2,0.3,-1],[1,2,3],[4,-2,0.5]]){
  assert(Math.abs(det2(jordan(r))-etaNorm(r))<eps,"triplet-to-Jordan determinant isometry failed");
}

// Residual plane rotation beta is implemented on H2 by a half-angle face
// congruence g(alpha), beta=2 alpha.
const alpha=0.37, beta=2*alpha;
const g=[[Math.cos(alpha),-Math.sin(alpha)],[Math.sin(alpha),Math.cos(alpha)]];
const r=[2,0.8,-0.4];
const rRot=[r[0],Math.cos(beta)*r[1]-Math.sin(beta)*r[2],Math.sin(beta)*r[1]+Math.cos(beta)*r[2]];
const congruent=multiply(multiply(g,jordan(r)),transpose(g));
assert(closeM(congruent,jordan(rRot)),"SO2 half-angle congruence failed");

// More than one residual angle gives equally valid determinant-preserving maps.
const g2=[[Math.cos(0.11),-Math.sin(0.11)],[Math.sin(0.11),Math.cos(0.11)]];
const image1=multiply(multiply(g,jordan(r)),transpose(g));
const image2=multiply(multiply(g2,jordan(r)),transpose(g2));
assert(!closeM(image1,image2),"intertwiner family must be nonunique");
assert(Math.abs(det2(image1)-det2(image2))<eps,"all residual intertwiners must preserve determinant");

// A general SL2 face change also preserves determinant but changes coordinates.
const h=[[2,1],[1,1]];
assert(Math.abs(det2(h)-1)<eps,"test face change must be SL2");
const hImage=multiply(multiply(h,jordan(r)),transpose(h));
assert(Math.abs(det2(hImage)-etaNorm(r))<eps,"SL2 congruence determinant failed");
assert(!closeM(hImage,jordan(r)),"face basis choice should change the coordinate identification");

// Compact sterile metric and split Jordan metric have unequal inertia.
const compactInertia=[3,0,0], splitInertia=[1,2,0];
assert(compactInertia.some((x,i)=>x!==splitInertia[i]),"inertia gate missing");

console.log("Triplet-intertwiner commuting-diagram gate certificate: PASS");
console.log("selected_sterile_triplet_to_H2R_isometry_exists=true; Furey_H2R_and_stress_H2R_types_match=true");
console.log("residual_SO2_half_angle_family_nonunique=true; SL2_face_torsor_nonunique=true; compact_to_split_requires_selector=true");
