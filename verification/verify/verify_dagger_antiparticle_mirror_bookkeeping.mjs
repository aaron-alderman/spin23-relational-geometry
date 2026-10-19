#!/usr/bin/env node

const u1Anomaly=fields=>fields.reduce((s,f)=>s+f.multiplicity*f.Y**3,0);
const gravY=fields=>fields.reduce((s,f)=>s+f.multiplicity*f.Y,0);
const conjugate=fields=>fields.map(f=>({...f,name:`${f.name}_mirror`,Y:-f.Y}));
const oneWeyl=[{name:"psiL",multiplicity:1,Y:1}];
const standardModel=[
  {name:"Q",multiplicity:6,Y:1/6},
  {name:"uc",multiplicity:3,Y:-2/3},
  {name:"dc",multiplicity:3,Y:1/3},
  {name:"L",multiplicity:2,Y:-1/2},
  {name:"ec",multiplicity:1,Y:1}
];
const cases={
  oneIndependentWeyl:{independentFields:oneWeyl,cubicAnomaly:u1Anomaly(oneWeyl),note:"The dagger operator in the Hermitian kinetic term is not a second integration variable and is not added to the anomaly sum."},
  independentMirrorPair:{independentFields:[...oneWeyl,...conjugate(oneWeyl)],cubicAnomaly:u1Anomaly([...oneWeyl,...conjugate(oneWeyl)]),note:"A genuinely independent left-handed conjugate field cancels the anomaly and doubles the chiral spectrum."},
  standardModelGeneration:{cubicHyperchargeAnomaly:u1Anomaly(standardModel),mixedGravitationalHypercharge:gravY(standardModel),independentComplexDimension:standardModel.reduce((s,f)=>s+f.multiplicity,0)},
  standardModelPlusIndependentMirror:{cubicHyperchargeAnomaly:u1Anomaly([...standardModel,...conjugate(standardModel)]),independentComplexDimension:[...standardModel,...conjugate(standardModel)].reduce((s,f)=>s+f.multiplicity,0)}
};
const report={
  protocol:"dagger-antiparticle-mirror-bookkeeping/1",
  cases,
  exactDistinction:[
    "Hermitian conjugation reverses representation and chirality at the operator level.",
    "The conjugate appearing in a Weyl kinetic term is not an additional independent left-handed field.",
    "Only an independently integrated left-handed conjugate module is a mirror contribution to the anomaly sum.",
    "Dagger closure of an observable or action therefore does not by itself imply a vectorlike fermion spectrum.",
    "A block inventory must declare its independent Grassmann generators before reverse blocks can be classified as antiparticles or mirrors."
  ]
};
report.passed=Math.abs(cases.oneIndependentWeyl.cubicAnomaly-1)<1e-12&&Math.abs(cases.independentMirrorPair.cubicAnomaly)<1e-12&&
  Math.abs(cases.standardModelGeneration.cubicHyperchargeAnomaly)<1e-12&&Math.abs(cases.standardModelGeneration.mixedGravitationalHypercharge)<1e-12&&
  cases.standardModelGeneration.independentComplexDimension===15&&cases.standardModelPlusIndependentMirror.independentComplexDimension===30;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
