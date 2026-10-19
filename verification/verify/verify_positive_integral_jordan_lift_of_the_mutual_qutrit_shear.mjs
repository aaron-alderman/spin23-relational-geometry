import assert from "node:assert/strict";

const mod=(x,p=3)=>((x%p)+p)%p;
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(c,A)=>A.map(r=>r.map(x=>c*x));
const outer=(v)=>v.map(x=>v.map(y=>x*y));
const transpose=(A)=>A[0].map((_,j)=>A.map(r=>r[j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const eq=(A,B)=>JSON.stringify(A)===JSON.stringify(B);
const det2=(K)=>K[0][0]*K[1][1]-K[0][1]*K[1][0];

const e1=[1,0],e2=[0,1],sum=[1,1];
const Kplus=add(add(outer(e1),outer(e2)),scale(2,outer(sum)));
assert.deepEqual(Kplus,[[3,2],[2,3]]);
assert.equal(det2(Kplus),5);
assert(Kplus[0][0]>0&&det2(Kplus)>0);
assert.deepEqual(Kplus.map(r=>r.map(x=>mod(x))),[[0,2],[2,0]]);

// The bare real lift of the residue is indefinite.
const Kbare=[[0,2],[2,0]];
assert(det2(Kbare)<0);

// Integral symmetric shear is symplectic in ordering (a1,a2,b1,b2).
const J=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const S=(K)=>[[1,0,0,0],[0,1,0,0],[K[0][0],K[0][1],1,0],[K[1][0],K[1][1],0,1]];
assert(eq(mul(mul(transpose(S(Kplus)),J),S(Kplus)),J));

// Enumerate trace-minimal positive-definite integral lifts of Kmut modulo 3.
const lifts=[];
for(let a=0;a<=12;a++)for(let d=0;d<=12;d++)for(let b=-10;b<=10;b++){
  if(mod(a)!==0||mod(d)!==0||mod(b)!==2)continue;
  if(a>0&&a*d-b*b>0)lifts.push({K:[[a,b],[b,d]],trace:a+d,det:a*d-b*b});
}
const minTrace=Math.min(...lifts.map(x=>x.trace));
const minimal=lifts.filter(x=>x.trace===minTrace);
assert.equal(minTrace,6);
assert.deepEqual(minimal.map(x=>x.K),[[[3,-1],[-1,3]],[[3,2],[2,3]]]);

// A PSD 2x2 response with exactly zero self terms cannot have a mutual term.
// Cauchy-Schwarz gives |K12|^2 <= K11 K22 = 0.
for(let b=-5;b<=5;b++)if(b!==0)assert(det2([[0,b],[b,0]])<0);

console.log("Positive integral Jordan lift of mutual qutrit shear: PASS");
console.log("Kplus_equals_3_2__2_3_and_decomposes_as_e1e1_plus_e2e2_plus_2_sumsum");
console.log("Kplus_is_positive_definite_with_eigenvalues_1_and_5_and_determinant_5");
console.log("the_integral_shear_is_Sp4Z_and_reduces_mod_3_to_Kmut_equal_0_2__2_0");
console.log("a_healthy_positive_response_requires_level_3_self_terms_invisible_to_the_qutrit_code");
console.log("there_are_exactly_two_trace_6_positive_integral_lifts_so_positivity_alone_does_not_select_Kplus");
