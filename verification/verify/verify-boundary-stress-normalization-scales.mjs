#!/usr/bin/env node

const dtnEigen=(m,L)=>({
  even:m*Math.tanh(m*L/2),
  odd:m/Math.tanh(m*L/2)
});
const m=1.7,L=2.3,e=dtnEigen(m,L);
const eps=1e-7,e0=dtnEigen(eps,L);
const rho=5;
const stressExamples={
  nullRadiation:{
    trace:0,
    quadraticInvariant:0,
    observerEnergyDensity:rho,
    consequence:"frame-free polynomial stress scalars can vanish while local energy is nonzero"
  },
  vacuumEnergy:{
    traceMagnitude:4*rho,
    quadraticInvariant:4*rho*rho,
    consequence:"trace and quadratic scales are nonzero for vacuum-type stress"
  }
};
const report={
  protocol:"boundary-stress-normalization-scales/1",
  dimensions:{
    stressTensor:4,
    traceFourthRoot:1,
    quadraticInvariantEighthRoot:1,
    observerEnergyFourthRoot:1,
    inverseLength:1,
    extrinsicCurvature:1,
    dirichletToNeumannEigenvalue:1
  },
  stressCandidates:{
    formulas:[
      "mu_trace=|T^mu_mu|^(1/4)",
      "mu_quad=|T_mn T^mn|^(1/8)",
      "mu_u=(T_mn u^m u^n)^(1/4)"
    ],
    examples:stressExamples,
    result:"No displayed stress scalar is simultaneously local, positive, frame-free and nonzero on all physical stress types."
  },
  boundaryDtN:{
    formula:"lambda_+=m tanh(mL/2), lambda_-=m coth(mL/2)",
    parameters:{m,L},
    eigenvalues:e,
    product:e.even*e.odd,
    productEqualsMassSquared:Math.abs(e.even*e.odd-m*m)<1e-12,
    geometricMean:Math.sqrt(e.even*e.odd),
    masslessLimit:{
      even:e0.even,
      odd:e0.odd,
      expectedEven:0,
      expectedOdd:2/L,
      errors:[Math.abs(e0.even),Math.abs(e0.odd-2/L)]
    }
  },
  selectorAssessment:{
    massiveInterface:"sqrt(det X)=m gives a canonical dimension-one response scale once the bulk operator is fixed.",
    masslessInterface:"det X=0; the nonzero odd eigenvalue tends to 2/L and requires the interface length plus a parity-sector choice.",
    boundaryNormal:"selects the real form geometrically but does not alone determine m or L.",
    stressBridge:"can select a scale only after choosing a state, invariant, observer or boundary datum."
  }
};
report.passed=report.boundaryDtN.productEqualsMassSquared&&
  Math.abs(report.boundaryDtN.geometricMean-m)<1e-12&&
  report.boundaryDtN.masslessLimit.errors[0]<1e-10&&
  report.boundaryDtN.masslessLimit.errors[1]<1e-10&&
  stressExamples.nullRadiation.trace===0&&stressExamples.nullRadiation.quadraticInvariant===0;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
