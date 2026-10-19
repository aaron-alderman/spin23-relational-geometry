#!/usr/bin/env node

const species = [
  {name:"Q_L", irrep:"(3,2)_{1/6}"},
  {name:"u_R", irrep:"(3,1)_{2/3}"},
  {name:"d_R", irrep:"(3,1)_{-1/3}"},
  {name:"L_L", irrep:"(1,2)_{-1/2}"},
  {name:"e_R", irrep:"(1,1)_{-1}"},
];

const analyze = generations => {
  const blocks=species.map(s=>({irrep:s.irrep,multiplicity:generations,commutantBlock:`M_${generations}(C)`,complexDimension:generations**2}));
  return {generations,blocks,totalComplexDimension:blocks.reduce((s,b)=>s+b.complexDimension,0)};
};

const one=analyze(1), three=analyze(3);
const withRightNeutrino={
  oneGenerationComplexDimension:one.totalComplexDimension+1,
  threeGenerationComplexDimension:three.totalComplexDimension+9,
};
const report={
  protocol:"standard-model-gauge-commutant-count/1",
  convention:"five inequivalent chiral species; no right-handed neutrino",
  oneGeneration:one,
  threeGenerations:three,
  optionalRightHandedNeutrino:withRightNeutrino,
  conclusion:"Gauge symmetry alone permits an independent family matrix for every inequivalent species.",
};
report.passed=one.totalComplexDimension===5&&three.totalComplexDimension===45&&withRightNeutrino.threeGenerationComplexDimension===54;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
