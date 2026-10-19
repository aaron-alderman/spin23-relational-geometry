#!/usr/bin/env node

const fields={
  H:{dimension:1,hypercharge:0.5,weak:"2"},
  Hdagger:{dimension:1,hypercharge:-0.5,weak:"2*"},
  L:{dimension:1.5,hypercharge:-0.5,weak:"2"},
  eR:{dimension:1.5,hypercharge:-1,weak:"1"},
  derivative:{dimension:1,hypercharge:0,weak:"1"}
};
const candidates=[
  {
    name:"Hdagger L",
    dimension:fields.Hdagger.dimension+fields.L.dimension,
    hypercharge:fields.Hdagger.hypercharge+fields.L.hypercharge,
    local:true,polynomial:true,canonical:false
  },
  {
    name:"(Hdagger L)/mu",
    dimension:fields.Hdagger.dimension+fields.L.dimension-1,
    hypercharge:fields.Hdagger.hypercharge+fields.L.hypercharge,
    local:true,polynomial:true,canonical:false,
    issue:"requires an external dimension-one normalization"
  },
  {
    name:"(Hdagger L)/sqrt(Hdagger H)",
    dimension:fields.Hdagger.dimension+fields.L.dimension-1,
    hypercharge:fields.Hdagger.hypercharge+fields.L.hypercharge,
    local:true,polynomial:false,canonical:false,
    issue:"singular at Hdagger H=0"
  },
  {
    name:"Dslash eR",
    dimension:fields.derivative.dimension+fields.eR.dimension,
    hypercharge:fields.eR.hypercharge,
    local:true,polynomial:true,canonical:false,
    issue:"equation-of-motion proportional to the Yukawa-dressed left face"
  }
];
const A=2,D=3,Zre=0.7,Zim=0.2;
const det=A*D-Zre*Zre-Zim*Zim;
const s=1.9;
const scaled={A:s*s*A,D,Zre:s*Zre,Zim:s*Zim};
const scaledDet=scaled.A*scaled.D-scaled.Zre**2-scaled.Zim**2;
const report={
  protocol:"symmetric-phase-dressed-face-options/1",
  fields,
  candidates,
  target:{dimension:fields.eR.dimension,hypercharge:fields.eR.hypercharge},
  checks:{
    normalizedCandidatesMatch:[candidates[1],candidates[2]].every(c=>c.dimension===fields.eR.dimension&&c.hypercharge===fields.eR.hypercharge),
    derivativeMatchesComposite:candidates[3].dimension===candidates[0].dimension&&candidates[3].hypercharge===candidates[0].hypercharge,
    undividedCompositeDimensionMismatch:candidates[0].dimension!==fields.eR.dimension,
    noElementaryNeutralScalarDimensionOne:"The only dimension-one Standard-Model matter scalar is the Higgs doublet, not a gauge singlet.",
    derivativeEOM:"i Dslash eR = y_e^* Hdagger L in the classical Standard-Model equations of motion, up to conventions."
  },
  normalizationCongruence:{
    originalDeterminant:det,
    faceScale:s,
    scaledMatrix:scaled,
    scaledDeterminant:scaledDet,
    expected:s*s*det,
    preservesConeSign:Math.sign(det)===Math.sign(scaledDet),
    interpretation:"An arbitrary face normalization is a positive congruence and preserves cone geometry, but rescales physical response data."
  },
  conclusion:"No canonical local polynomial symmetric-phase pair is obtained from the stated Standard-Model fields: scale division is arbitrary, Higgs-norm division is singular, and derivative dressing is EOM-redundant."
};
report.passed=report.checks.normalizedCandidatesMatch&&report.checks.derivativeMatchesComposite&&
  report.checks.undividedCompositeDimensionMismatch&&
  Math.abs(scaledDet-s*s*det)<1e-12&&report.normalizationCongruence.preservesConeSign;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
