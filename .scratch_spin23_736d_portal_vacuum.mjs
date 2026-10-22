import assert from "node:assert/strict";

// Equal-singular-value branches of the v394 corner give
// V(q,p)=-a q-b p+4q^2+6p^2+8qp, q,p>=0.
const V=(q,p,a,b)=>-a*q-b*p+4*q*q+6*p*p+8*q*p;
const solve=(a,b)=>{
  const candidates=[{phase:"origin",q:0,p:0},{phase:"Phi-only",q:a/8,p:0},{phase:"Psi-only",q:0,p:b/12}];
  const q=(3*a-2*b)/8,p=(b-a)/4;
  if(q>=0&&p>=0)candidates.push({phase:"coexist",q,p});
  for(const c of candidates)c.energy=V(c.q,c.p,a,b);
  candidates.sort((x,y)=>x.energy-y.energy);
  return {a,b,winner:candidates[0],candidates};
};

const cases=[solve(0.5,1),solve(0.8,1),solve(1.2,1)];
assert.equal(cases[0].winner.phase,"Psi-only");
assert.equal(cases[1].winner.phase,"coexist");
assert.equal(cases[2].winner.phase,"Phi-only");
const canonical={
  substitutions:"Q=8q, P=12p, A=a/8, B=b/12",
  potential:"-A Q-B P+Q^2/16+P^2/24+QP/12",
  radialHessian:[[1/8,1/12],[1/12,1/12]],
  determinant:1/288,
  phases:[
    {condition:"A/B <= 1",winner:"Psi-only",Q:0,P:"12B"},
    {condition:"1 < A/B < 3/2",winner:"coexist",Q:"24(A-B)",P:"12(3B-2A)"},
    {condition:"A/B >= 3/2",winner:"Phi-only",Q:"8A",P:0}
  ]
};

console.log(JSON.stringify({
  protocol:"spin23-736d-two-condensate-portal-vacuum/1",
  potential:"-a q-b p+4 q^2+6 p^2+8 q p",
  Hessian:[[8,8],[8,12]],
  HessianDeterminant:32,
  phases:[
    {condition:"a/b <= 2/3",winner:"Psi-only",q:0,p:"b/12"},
    {condition:"2/3 < a/b < 1",winner:"coexist",q:"(3a-2b)/8",p:"(b-a)/4"},
    {condition:"a/b >= 1",winner:"Phi-only",q:"a/8",p:0}
  ],
  cases,
  canonical,
  passed:true
},null,2));
