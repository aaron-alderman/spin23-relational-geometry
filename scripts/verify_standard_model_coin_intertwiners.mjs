#!/usr/bin/env node

const fields={
  L:{su2:2,color:1,Y:-1/2}, eR:{su2:1,color:1,Y:-1}, nR:{su2:1,color:1,Y:0},
  Q:{su2:2,color:3,Y:1/6}, uR:{su2:1,color:3,Y:2/3}, dR:{su2:1,color:3,Y:-1/3}
};
const scalars={H:{su2:2,color:1,Y:1/2},tildeH:{su2:2,color:1,Y:-1/2}};
const channels=[
  {name:"charged lepton",left:"L",right:"eR",expected:"H"},
  {name:"Dirac neutrino",left:"L",right:"nR",expected:"tildeH",optional:true},
  {name:"up quark",left:"Q",right:"uR",expected:"tildeH"},
  {name:"down quark",left:"Q",right:"dR",expected:"H"}
].map(c=>{
  const left=fields[c.left],right=fields[c.right];
  const required={su2:left.su2,color:left.color===right.color?1:null,Y:left.Y-right.Y};
  const matches=Object.entries(scalars).filter(([,s])=>s.su2===required.su2&&s.color===required.color&&Math.abs(s.Y-required.Y)<1e-12).map(([name])=>name);
  const bareIntertwiner=left.su2===right.su2&&left.color===right.color&&Math.abs(left.Y-right.Y)<1e-12;
  return {...c,leftRep:left,rightRep:right,requiredFieldForMapRightToLeft:required,matches,bareIntertwiner,passed:matches.length===1&&matches[0]===c.expected&&!bareIntertwiner};
});
const report={
  protocol:"standard-model-coin-intertwiners/1",
  theorem:"A fixed coin block M:V_R->V_L is invariant iff rho_L(g)M=M rho_R(g). A field-valued block Phi is covariant iff Phi->rho_L(g)Phi rho_R(g)^-1.",
  channels,
  fureyConventionWarning:"Furey TRO tables use left-handed conjugate fields and directed block arrows; dagger and orientation must be converted before matching these R-to-L entries.",
  interpretation:[
    "No charged Standard-Model Yukawa channel admits a bare fixed intertwiner from its right-handed singlet to its left-handed weak doublet.",
    "Charged leptons and down quarks require H; up quarks and an optional Dirac neutrino require tilde-H.",
    "Color transport is diagonal in the quark Yukawa channels, so the mixing field is a color singlet.",
    "Exponentiating [[0,Phi],[Phi dagger,0]] gives a unitary field-dependent coin but does not fix Yukawa magnitudes or flavor matrices.",
    "This is representation arithmetic, not a Higgs-potential, generation, or anomaly derivation."
  ]
};
report.passed=channels.every(c=>c.passed);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
