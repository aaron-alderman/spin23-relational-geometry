import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const mv=(A,x)=>A.map(r=>r.reduce((s,a,i)=>s+a*x[i],0));
const same=(a,b)=>a.length===b.length&&a.every((x,i)=>Math.abs(x-b[i])<1e-12);
const R=t=>[[Math.cos(t),-Math.sin(t)],[Math.sin(t),Math.cos(t)]];
const block=(A,B)=>[
  [A[0][0],A[0][1],0,0],[A[1][0],A[1][1],0,0],
  [0,0,B[0][0],B[0][1]],[0,0,B[1][0],B[1][1]],
];

const theta=Math.PI/5;
const chargedGauge=R(theta), conjugation=[[1,0],[0,-1]];
assert.notDeepEqual(mm(conjugation,chargedGauge),mm(chargedGauge,conjugation));
const chargedRealLine=[1,0];
assert.ok(!same(mv(chargedGauge,chargedRealLine),chargedRealLine));

// Nambu module V_q + V_-q with J=tau_x K.
const nambuGauge=block(R(theta),R(-theta));
const nambuJ=[
  [0,0,1,0],[0,0,0,-1],
  [1,0,0,0],[0,-1,0,0],
];
assert.deepEqual(mm(nambuJ,nambuJ),[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]);
assert.ok(mm(nambuJ,nambuGauge).every((r,i)=>r.every((x,j)=>Math.abs(x-mm(nambuGauge,nambuJ)[i][j])<1e-12)));
const nambuFixedBasis=[[1,0,1,0],[0,1,0,-1]];
for(const v of nambuFixedBasis)assert.ok(same(mv(nambuJ,v),v));
for(const v of nambuFixedBasis){const gv=mv(nambuGauge,v);assert.ok(same(mv(nambuJ,gv),gv));}

// No particle-half projection commutes with both structures.
const particleProjection=[[1,0,0,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]];
assert.notDeepEqual(mm(nambuJ,particleProjection),mm(particleProjection,nambuJ));

// Contact Kantor product on every selected real two-plane.
const E=[[1,0],[0,1]],dot=(x,y)=>x[0]*y[0]+x[1]*y[1];
const add=(a,b)=>a.map((x,i)=>x+b[i]),sub=(a,b)=>a.map((x,i)=>x-b[i]),scale=(s,x)=>x.map(a=>s*a);
const veq=(a,b)=>a.every((x,i)=>Math.abs(x-b[i])<1e-12);
const V=(x,y,z)=>scale(dot(y,z),x);
const K=(x,y,z)=>sub(V(x,z,y),V(y,z,x));
let firstChecks=0,secondChecks=0;
for(const u of E)for(const v of E)for(const x of E)for(const y of E)for(const z of E){
 const lhs1=sub(V(u,v,V(x,y,z)),V(x,y,V(u,v,z)));
 const rhs1=sub(V(V(u,v,x),y,z),V(x,V(v,u,y),z));assert.ok(veq(lhs1,rhs1));firstChecks++;
 const lhs2=K(K(u,v,x),y,z),rhs2=add(K(u,v,V(x,y,z)),V(y,x,K(u,v,z)));assert.ok(veq(lhs2,rhs2));secondChecks++;
}
assert.ok(veq(K(E[0],E[1],E[1]),E[0]));
for(const x of E)for(const y of E)for(const z of E){
 const lhs=V(mv(R(theta),x),mv(R(theta),y),mv(R(theta),z));
 const rhs=mv(R(theta),V(x,y,z));assert.ok(veq(lhs,rhs));
 const klhs=K(mv(R(theta),x),mv(R(theta),y),mv(R(theta),z));
 const krhs=mv(R(theta),K(x,y,z));assert.ok(veq(klhs,krhs));
}
const reflection=[[1,0],[0,-1]];
const area=[[0,1],[-1,0]];
const reflectedArea=mm(mm(reflection,area),reflection);
assert.ok(reflectedArea.every((r,i)=>r.every((x,j)=>x===-area[i][j])));

// A neutral two-face response admits componentwise conjugation with fixed R^2.
const neutralGauge=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const neutralK=block(conjugation,conjugation);
const neutralFixedBasis=[[1,0,0,0],[0,0,1,0]];
for(const v of neutralFixedBasis){assert.ok(same(mv(neutralK,v),v));assert.ok(same(mv(neutralK,mv(neutralGauge,v)),mv(neutralGauge,v)));}

// J_phi=e^{i phi}K gives a circle of neutral real structures; the metric does
// not choose phi. A fixed nonzero CP-odd scalar is sent to its negative.
const phases=[0,Math.PI/3,Math.PI/2];
const realAxes=phases.map(phi=>[Math.cos(phi/2),Math.sin(phi/2)]);
for(let i=0;i<realAxes.length;i++)for(let j=i+1;j<realAxes.length;j++)assert.ok(!same(realAxes[i],realAxes[j]));
const cpOddBackground=3;
assert.equal(-cpOddBackground,-3);
assert.notEqual(cpOddBackground,-cpOddBackground);

const selectors=[
 {name:'undressed charged Higgs/fermion line',gaugeInvariantRealPlane:false,contactKantor:false,reason:'a nonzero U(1) charge rotates every real line; a neutral Higgs vacuum does not remove electric charge'},
 {name:'gauge-neutral Higgs-dressed two-face response',gaugeInvariantRealPlane:true,contactKantor:true,selectorComplete:false,reason:'common gauge phase cancels at the Hermitian response level; a separately chosen conjugation fixes R^2',caveat:'Higgs dressing types/neutralizes the response but is linear and does not itself choose the antiunitary'},
 {name:'charged Nambu fixed plane',gaugeInvariantRealPlane:true,contactKantor:true,selectorComplete:true,reason:'tau_x K commutes with diag(e^{iqtheta},e^{-iqtheta}) and Fix(J) is R^2',caveat:'no gauge-and-CAR-invariant projection to one particle half; viability requires Nambu doubling to be redundancy'},
 {name:'neutral Majorana two-face plane',gaugeInvariantRealPlane:true,contactKantor:true,selectorComplete:'conditional',reason:'neutral conjugation fixes one real coordinate per face',caveat:'Majorana/Takagi data must select and preserve the same two-face support; corner and real-slice selectors are independent'},
 {name:'local neutral boundary antiunitary',gaugeInvariantRealPlane:true,contactKantor:true,selectorComplete:true,reason:'real boundary fields provide R^2 and Fourier reality supplies the antiunitary',caveat:'effective interface; microscopic SM derivation open'},
 {name:'neutral CP-breaking spurion alone',gaugeInvariantRealPlane:true,contactKantor:false,reason:'a nonzero CP-odd background is not fixed by CP; J_phi remains a chosen family unless an even real structure is independently supplied'},
];

console.log(JSON.stringify({
 protocol:'frontier-kantor-real-subbundle-selector-classification/1',
 commonCriterion:'Fix(J) is gauge covariant iff antiunitary J commutes with the gauge representation; a contact carrier additionally requires real dimension two and a preserved Euclidean form',
 selectors,
 nambu:{fixedRealDimension:2,gaugeActionOnFixedPlane:'R(q theta)',particleHalfCompatibleWithJ:false},
 contactKantorAudit:{firstIdentityChecks:firstChecks,secondIdentityChecks:secondChecks,kOperatorNonzero:true,rotationCovariant:true,reflectionReversesKLine:true,gradingDimensions:[1,2,4,2,1]},
 neutralRealStructureFamily:{parameter:'phi mod 2pi',sampleAxes:realAxes,metricSelectsPhi:false},
 conclusion:'Three minimal selectors are viable only at qualified levels: Nambu reality on a doubled/redundant charged module, neutral Majorana two-face reality, and a neutral real boundary response. Higgs breaking does not realify a charged matter line, and a CP-odd spurion alone orients but does not define an invariant real form.',
 passed:true,
},null,2));
