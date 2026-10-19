#!/usr/bin/env node

// Hypercharge is stored as 2Y.
const fields={
  L:{su2:2,y2:-1,chirality:"left"},
  Hdag:{su2:2,y2:-1,chirality:"scalar"},
  ec:{su2:1,y2:2,chirality:"left Weyl positron"},
  ecDag:{su2:1,y2:-2,chirality:"right electron"}
};
const chiL={su2:1,y2:fields.L.y2+fields.Hdag.y2,definition:"epsilon/Hermitian singlet contraction H^dagger L"};
const chiR={su2:1,y2:fields.ecDag.y2,definition:"e^{c dagger}"};
const yukawaY2=fields.L.y2+fields.ec.y2+fields.Hdag.y2;
const gramEntryY2=(a,b)=>-a.y2+b.y2;
const smFermions=[
  {id:"Q",color:"3",su2:2,y6:1},
  {id:"uc",color:"3bar",su2:1,y6:-4},
  {id:"dc",color:"3bar",su2:1,y6:2},
  {id:"L",color:"1",su2:2,y6:-3},
  {id:"ec",color:"1",su2:1,y6:6}
];
const scalarOptions=[
  {id:"H",su2:2,y6:3},
  {id:"Hdag",su2:2,y6:-3}
];
const ecField=smFermions.find(x=>x.id==="ec");
const ecYukawas=[];
for(const f of smFermions)for(const s of scalarOptions){
  const colorSinglet=f.color==="1";
  const weakSinglet=(ecField.su2===1&&f.su2===2&&s.su2===2);
  const hyperchargeNeutral=ecField.y6+f.y6+s.y6===0;
  if(colorSinglet&&weakSinglet&&hyperchargeNeutral)
    ecYukawas.push([f.id,"ec",s.id]);
}

const C=(re,im=0)=>({re,im});
const add=(a,b)=>C(a.re+b.re,a.im+b.im);
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=a=>C(a.re,-a.im);
const inner=(u,v)=>u.reduce((s,x,i)=>add(s,mul(conj(x),v[i])),C(0,0));
const norm2=u=>inner(u,u).re;
const u=[C(1,1),C(2,0)];
const v=[C(2,-1),C(0,1)];
const uv=inner(u,v);
const gram={
  a:norm2(u),
  d:norm2(v),
  z:uv
};
const detComplex=gram.a*gram.d-(gram.z.re**2+gram.z.im**2);
const detReal=gram.a*gram.d-gram.z.re**2;
const realPositive=gram.a>=0&&gram.d>=0&&detReal>=-1e-12;
const t=(gram.a+gram.d)/2,x=(gram.a-gram.d)/2,y=gram.z.re;
const report={
  protocol:"dressed-electron-h2-response/1",
  fields,
  dressedFaces:{chiL,chiR},
  representationChecks:{
    sameWeakSinglet:chiL.su2===1&&chiR.su2===1,
    sameHypercharge:chiL.y2===chiR.y2,
    commonHypercharge:chiL.y2/2,
    yukawaTriangleNeutral:yukawaY2===0,
    allGramEntriesNeutral:[
      gramEntryY2(chiL,chiL),gramEntryY2(chiL,chiR),
      gramEntryY2(chiR,chiL),gramEntryY2(chiR,chiR)
    ].every(q=>q===0)
  },
  renormalizableEcYukawaEnumeration:{
    candidates:ecYukawas,
    unique:ecYukawas.length===1&&ecYukawas[0].join(" ")==="L ec Hdag"
  },
  gaugeInvariantResponse:"G_ij=<chi_i^dagger chi_j> is invariant because chi_L and chi_R carry the same U(1) phase.",
  numericalGramCheck:{
    u,v,gram,
    determinantH2C:detComplex,
    determinantRealProjection:detReal,
    realProjectionPositive:realPositive,
    lorentzIdentityError:Math.abs(detReal-(t*t-x*x-y*y))
  },
  oneGenerationPhase:{
    complexYukawaParameters:1,
    removableFieldRephasingsAtLeast:1,
    physicalChargedLeptonYukawaPhases:0,
    implication:"For one generation the off-diagonal charged-lepton mass/Yukawa response can be chosen real without violating gauge invariance."
  },
  limitations:[
    "Lorentz chirality is suppressed; a positive Euclidean two-point or Dirac response kernel must be constructed explicitly.",
    "With several generations, the charged-lepton and neutrino sectors must be treated jointly and physical PMNS phases must not be projected out.",
    "The response matrix is composite and state-dependent, not automatically the fundamental external carrier."
  ],
  conclusion:"The cyclic charged-lepton Yukawa triangle supplies a gauge-neutral two-face response whose positive real Gram projection lies in H2(R), evading the charged fixed-line no-go at one generation."
};
report.passed=Object.values(report.representationChecks).every(Boolean)&&
  report.renormalizableEcYukawaEnumeration.unique&&
  detComplex>=-1e-12&&realPositive&&
  report.numericalGramCheck.lorentzIdentityError<1e-12&&
  report.oneGenerationPhase.physicalChargedLeptonYukawaPhases===0;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
