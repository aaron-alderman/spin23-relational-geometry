#!/usr/bin/env node

const rotation=t=>[[Math.cos(t),-Math.sin(t)],[Math.sin(t),Math.cos(t)]];
const isIntegerMatrix=(A,tol=1e-12)=>A.flat().every(x=>Math.abs(x-Math.round(x))<tol);
const angles=[0,Math.PI/8,Math.PI/4,Math.PI/2,Math.PI,3*Math.PI/2,2*Math.PI];
const samples=angles.map(theta=>({theta,matrix:rotation(theta),preservesZ2:isIntegerMatrix(rotation(theta))}));
const permitted=samples.filter(s=>s.preservesZ2).map(s=>s.theta);
const report={
  protocol:"connected-lattice-symmetry-separation/1",
  theorem:{
    lattice:"For a full lattice Lambda in a finite-dimensional real vector space, Aut(Lambda) is discrete in GL(V).",
    connectedImage:"The continuous image of a connected topological group is connected.",
    consequence:"Every continuous homomorphism from a connected Lie group to Aut(Lambda), or to any finite discrete group, has trivial image."
  },
  toyModel:{
    lattice:"Z^2",
    connectedAmbient:"SO(2)",
    samples,
    discretePreservingAngles:permitted,
    observation:"The continuous rotation family intersects GL(2,Z) only at isolated quarter turns."
  },
  programme:{
    spin23ToMonster:"trivial for every continuous homomorphism because Spin_0(2,3) is connected and the Monster is finite discrete",
    spin23OnLeech:"trivial if required to act continuously through exact Leech-lattice automorphisms",
    survivingRoles:[
      "continuous symmetry after extending the lattice to a real vector space, without preserving every lattice point under the full group",
      "discrete charge or duality subgroup inside a separate arithmetic sector",
      "finite stabilizer of a selected integral Jordan flag",
      "modular/VOA action on global states rather than local gauge transformations"
    ]
  }
};
report.passed=permitted.length===5&&
  !samples.find(s=>Math.abs(s.theta-Math.PI/4)<1e-12).preservesZ2&&
  samples.find(s=>Math.abs(s.theta-Math.PI/2)<1e-12).preservesZ2;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
