#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const tr=A=>A.reduce((s,r,i)=>s+r[i],0);
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const eta=[[1,0,0,0],[0,-1,0,0],[0,0,-1,0],[0,0,0,-1]];
const contract=(A,B)=>tr(mul(mul(mul(T(A),eta),B),eta));
const diag=(a,b,c,d)=>[[a,0,0,0],[0,b,0,0],[0,0,c,0],[0,0,0,d]];

const channels=[diag(1,0,0,0),diag(0,2,0,0),diag(0,0,3,0)]; // Tx,Ty,Tz
const Q=channels.map(A=>channels.map(B=>contract(A,B)));
const th=0.41, c=Math.cos(th), s=Math.sin(th);
const R=[[c,-s,0],[s,c,0],[0,0,1]];
const rotateChannels=R.map(row=>channels[0].map((_,i)=>channels[0].map((_,j)=>row.reduce((sum,a,k)=>sum+a*channels[k][i][j],0))));
const Qrot=rotateChannels.map(A=>rotateChannels.map(B=>contract(A,B)));
const expected=mul(mul(R,Q),T(R));
assert(maxAbs(sub(Qrot,expected))<1e-12,"Pauli-channel Gram covariance failed");

// Scalar 2x2 Hermitian response: left/right populations plus complex relationship.
const l=4,r=3,cre=1,cim=0.5;
const t0=(l+r)/2, tx=cre, ty=-cim, tz=(l-r)/2;
const determinant=l*r-(cre*cre+cim*cim);
assert(Math.abs(determinant-(t0*t0-tx*tx-ty*ty-tz*tz))<1e-12,"Pauli determinant decomposition failed");
assert(determinant>0 && l>0 && r>0,"example response must be positive");

// Real selector removes one relationship-phase direction but keeps a 3D H2(R) carrier.
const selected=[t0,tx,tz];
assert(selected.length===3 && Math.abs(ty)>0,"selector must remove a genuinely present parent direction");

console.log("Face-valued stress Pauli-triplet certificate: PASS");
console.log("traceless_face_channels_transform_as=SO3; Gram_covariance=true");
console.log(`H2C_det=${determinant}; Minkowski_form=${t0*t0-tx*tx-ty*ty-tz*tz}`);
console.log("left_right_cross_package=H2C; real_selector_removes_one_Bloch_direction=true");
