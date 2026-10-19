#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const C=(re,im=0)=>({re,im});
const add=(a,b)=>C(a.re+b.re,a.im+b.im);
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=a=>C(a.re,-a.im);
const scale=(s,a)=>C(s*a.re,s*a.im);
const mmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0))));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j])));
const maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((z,j)=>Math.hypot(z.re-B[i][j].re,z.im-B[i][j].im))));
const rt=Math.SQRT1_2;
const U=[[C(rt),C(0,-rt)],[C(0,-rt),C(rt)]]; // exp(-i pi sigma_x/4)
const I=[[C(1),C(0)],[C(0),C(1)]];
assert(maxDiff(mmul(U,dag(U)),I)<1e-12,"quarter-turn must be unitary");

const X=[[C(4),C(1.2)],[C(1.2),C(2.5)]];
const Z=mmul(mmul(U,X),dag(U));
assert(Math.abs(Z[0][0].re-Z[1][1].re)<1e-12,"quarter-turn image must have equal populations");
assert(Math.abs(Z[0][0].im)<1e-12&&Math.abs(Z[1][1].im)<1e-12,"image diagonals must be real");
const det=A=>A[0][0].re*A[1][1].re-(A[0][1].re*A[1][0].re-A[0][1].im*A[1][0].im);
assert(Math.abs(det(X)-det(Z))<1e-12,"Jordan determinant must be preserved");

// Real rank-one wall residue maps to equal-population complex relationship residue.
const p=[C(2),C(-0.7)];
const q=U.map(r=>r.reduce((s,x,i)=>add(s,mul(x,p[i])),C(0)));
assert(Math.abs((q[0].re**2+q[0].im**2)-(q[1].re**2+q[1].im**2))<1e-12,"transformed wall amplitudes must have equal norms");
const R=q.map(a=>q.map(b=>mul(a,conj(b))));
assert(Math.abs(det(R))<1e-11,"wall zero-mode residue must remain rank one");

// The transported antiunitary is exchange conjugation up to an irrelevant phase.
const UbarDag=dag(U).map(r=>r.map(conj));
const antiUnitaryPart=mmul(U,UbarDag);
const minusISx=[[C(0),C(0,-1)],[C(0,-1),C(0)]];
assert(maxDiff(antiUnitaryPart,minusISx)<1e-12,"transported conjugation must be phase times sigma_x K");

// Positive imaginary parts are preserved by the same unitary transport.
const ImG=[[C(2),C(0.3)],[C(0.3),C(1)]];
const ImZ=mmul(mmul(U,ImG),dag(U));
assert(ImZ[0][0].re>0&&det(ImZ)>0,"Herglotz positivity must survive quarter-turn");

console.log("Domain-wall real-form quarter-turn certificate: PASS");
console.log("U_Jy_Udagger=Jz; determinant_preserved=true; Herglotz_positivity_preserved=true");
console.log("real_rank_one_wall_residue_maps_to_equal_population_exchange_ray=true");
console.log("transported_conjugation=phase_times_sigma_x_K; physical_phase_probe_required=true");
