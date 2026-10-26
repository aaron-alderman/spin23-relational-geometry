#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const xs=[1e-6,1e-4,1e-2,.1,1,10,100,1e4,1e6];
const omegas=[0,.1,1,10,100];
const backgrounds=[.01,1,100];
const externalFields=[.03,.1,.3,1,3];
const round=(value,digits=10)=>Number(value.toFixed(digits));
const complex=(re,im=0)=>({re:round(re),im:round(im),magnitude:round(Math.hypot(re,im)),phaseRadians:round(Math.atan2(im,re))});
const simpleY=x=>(x+Math.sqrt(x*x+4*x))/2;
const standardY=x=>Math.sqrt((x*x+Math.sqrt(x**4+4*x*x))/2);
const muSimple=y=>y/(1+y);
const dMuSimple=y=>1/(1+y)**2;
const expKernel=omega=>({re:1/(1+omega*omega),im:omega/(1+omega*omega)}); // e^-iwt convention
const logSlope=(f,x)=>{const h=1e-4;return Math.log(f(x*Math.exp(h))/f(x*Math.exp(-h)))/(2*h)};

const staticCurves={
  aqualSimple:xs.map(x=>({x,y:round(simpleY(x)),boost:round(simpleY(x)/x)})),
  qumondStandard:xs.map(x=>({x,y:round(standardY(x)),boost:round(standardY(x)/x)}))
};
const staticDiagnostics=Object.fromEntries([
  ["aqualSimple",simpleY],["qumondStandard",standardY]
].map(([id,f])=>[id,{
  deepLogSlope:round(logSlope(f,1e-6)),
  deepBtfrCoefficientY2OverX:round(f(1e-6)**2/1e-6),
  newtonianFractionalExcessAtX1e6:round(f(1e6)/1e6-1,12)
}]));

const efe=externalFields.map(yExternal=>{
  const mu=muSimple(yExternal),logDerivative=1/(1+yExternal);
  return{yExternal,muExternal:round(mu),logDerivative:round(logDerivative),perpendicularGain:round(1/mu),parallelGain:round(1/(mu*(1+logDerivative))),parallelToPerpendicular:round(1/(1+logDerivative))};
});

const fieldRelaxation=backgrounds.map(x=>{
  const yStatic=simpleY(x),excess=yStatic-x;
  return{x,yStatic:round(yStatic),responses:omegas.map(omega=>{
    const h=expKernel(omega),re=x+excess*h.re,im=excess*h.im;
    return{omegaTau:omega,acceleration:complex(re,im),mondExcessTransfer:complex(h.re,h.im)};
  })};
});

const modifiedInertia=backgrounds.map(x=>{
  const y0=simpleY(x),mu0=muSimple(y0),coupling=y0*dMuSimple(y0);
  return{x,y0:round(y0),mu0:round(mu0),linearResponses:omegas.map(omega=>{
    const h=expKernel(omega),denRe=mu0+coupling*h.re,denIm=coupling*h.im,den2=denRe*denRe+denIm*denIm;
    return{omegaRatio:omega,deltaYOverDeltaX:complex(denRe/den2,-denIm/den2)};
  })};
});

const variants=[
  {id:"V1",name:"instantaneous AQUAL simple-mu",modificationSite:"nonlinear elliptic field constitutive law",equation:"div[mu(|grad Phi|/a0) grad Phi] = 4 pi G rho; mu(y)=y/(1+y)",geometry:"matter-centred nonlinear spatial response; spherical vacuum potential tends to sqrt(G M a0) ln r",retardation:"none in the nonrelativistic equation; a relativistic/hyperbolic completion remains required",identifies:["deep-MOND logarithmic lapse candidate","BTFR normalization once a0 is fixed","instantaneous modified-gravity EFE"],doesNotIdentify:["lensing metric","causal propagation kernel"]},
  {id:"V2",name:"instantaneous QUMOND standard-nu",modificationSite:"nonlinear source construction followed by linear Poisson solve",equation:"Delta Phi = div[nu(|grad Phi_N|/a0) grad Phi_N]",geometry:"ordinary Poisson geometry sourced by baryons plus a derived phantom-density field",retardation:"none in the nonrelativistic equation",identifies:["same deep and Newtonian limits as V1","different transition-region and nonspherical source geometry"],doesNotIdentify:["relativistic lensing completion","time-domain response"]},
  {id:"V3",name:"external-field anisotropic AQUAL",modificationSite:"linearized constitutive tensor around an external field",equation:"mu_e [Delta + L_e partial_parallel^2] deltaPhi = 4 pi G deltaRho",geometry:"environment-selected axis with unequal parallel and perpendicular susceptibility",retardation:"instantaneous; the external field is evaluated at the current state",identifies:["modified-gravity EFE","quadrupolar/anisotropic internal response"],doesNotIdentify:["orbital-history dependence"]},
  {id:"V4",name:"causal relaxation of the MOND field excess",modificationSite:"retarded field response",equation:"g(omega)=g_N+[g_MOND(g_N)-g_N]/(1-i omega tau)",geometry:"V1 static geometry with a causal relaxation fibre; tau must be derived rather than fitted per object",retardation:"exponential retarded kernel acting only on the MOND excess",identifies:["static V1 at zero frequency","frequency-dependent suppression and phase lag"],doesNotIdentify:["a covariant parent action","whether tau is universal or dynamically generated"]},
  {id:"V5",name:"trajectory-memory modified inertia",modificationSite:"inertial response of trajectories",equation:"g_N(t)=mu(q(t)) g(t), q=K_ret * |g| / a0",geometry:"history space rather than a purely spatial metric; the state is a trajectory functional",retardation:"causal memory; linear response depends on internal/external frequency ratios",identifies:["static simple-mu law","history-sensitive EFE and noncircular response"],doesNotIdentify:["unique memory kernel","relativistic lensing law"]}
];

const result={
  schemaVersion:"0.1.0",
  status:"proposal tournament; analytic and synthetic checks only",
  conventions:{x:"g_N/a0",y:"g/a0",fourier:"exp(-i omega t)",retardedExponentialKernel:"H=1/(1-i omega tau)",warning:"complex response phase is convention-dependent; causal support is not"},
  authority:{literature:[
    {role:"MOND deep limit",url:"https://doi.org/10.1086/161130"},
    {role:"AQUAL",url:"https://doi.org/10.1086/162570"},
    {role:"QUMOND",url:"https://arxiv.org/abs/0911.5464"},
    {role:"modified-inertia memory",url:"https://arxiv.org/abs/2208.07073"}
  ],corpusInputs:["corpus/syntheses/grand-synthesis/aarons_spin23_research_thesis.md","evidence/data/local-cluster-radial-timelike-field-v1.json"]},
  variants,
  probes:{staticCurves,staticDiagnostics,externalFieldAnisotropy:efe,causalFieldRelaxation:fieldRelaxation,modifiedInertiaLinearization:modifiedInertia},
  admissibility:{
    commonStaticChecks:{deepSlopeOneHalf:Object.values(staticDiagnostics).every(v=>Math.abs(v.deepLogSlope-.5)<.002),btfrCoefficientOne:Object.values(staticDiagnostics).every(v=>Math.abs(v.deepBtfrCoefficientY2OverX-1)<.002),newtonianRecovery:Object.values(staticDiagnostics).every(v=>Math.abs(v.newtonianFractionalExcessAtX1e6)<.002)},
    externalFieldTensor:{positiveGains:efe.every(v=>v.parallelGain>0&&v.perpendicularGain>0),parallelNoLargerThanPerpendicular:efe.every(v=>v.parallelGain<=v.perpendicularGain)},
    retardation:{zeroFrequencyFieldMatchesStatic:fieldRelaxation.every(v=>Math.abs(v.responses[0].acceleration.re-v.yStatic)<1e-9),fieldKernelBounded:fieldRelaxation.every(v=>v.responses.every(r=>r.mondExcessTransfer.magnitude<=1+1e-12)),modifiedInertiaFinite:modifiedInertia.every(v=>v.linearResponses.every(r=>Number.isFinite(r.deltaYOverDeltaX.magnitude))),causalPoleStatement:"the exponential kernel has its only pole at omega=-i/tau under the stated Fourier convention"}
  },
  discrimination:{
    staticSphericalRotation:"separates interpolation choices mainly near x approximately 1; cannot distinguish V1 from V4 at equilibrium",
    nonsphericalFieldMap:"can distinguish AQUAL constitutive geometry from QUMOND derived-source geometry",
    externalFieldOrientation:"tests V3-like anisotropy, but instantaneous modified gravity and trajectory memory predict different dependence on orbital history",
    timeDomainForcing:"separates V4 field lag from V1-V3 instantaneous laws and from V5 trajectory-dependent response",
    lensing:"requires a relativistic completion and cannot be inferred from these nonrelativistic proposals"
  },
  m44Boundary:{currentUse:"design constraints only",reason:"the current cluster director snapshot has neither a baryonic mass model nor member-level orbit histories, so fitting these variants would manufacture an identification",nextData:["member-level baryonic mass and selection model","full astrometric covariance","independent radial velocities","Galactic external-field direction and orbit history","preregistered spatial and temporal residual readers"]},
  verdict:{winner:null,statement:"V1-V3 are distinguishable spatial modified-gravity geometries; V4 and V5 add inequivalent causal structures. Static MOND behavior fixes only the zero-frequency limit, so no retardation model is selected without time-domain or orbit-history data."}
};

assert.equal(result.admissibility.commonStaticChecks.deepSlopeOneHalf,true);
assert.equal(result.admissibility.commonStaticChecks.btfrCoefficientOne,true);
assert.equal(result.admissibility.commonStaticChecks.newtonianRecovery,true);
assert.equal(result.admissibility.externalFieldTensor.positiveGains,true);
assert.equal(result.admissibility.externalFieldTensor.parallelNoLargerThanPerpendicular,true);
assert.equal(result.admissibility.retardation.zeroFrequencyFieldMatchesStatic,true);
assert.equal(result.admissibility.retardation.fieldKernelBounded,true);
assert.equal(result.variants.length,5);

const output=`${JSON.stringify(result,null,2)}\n`;
if(process.argv.includes("--write")){
  fs.writeFileSync(new URL("../evidence/data/mond-geometry-retardation-variants-v1.json",import.meta.url),output);
  console.log("wrote evidence/data/mond-geometry-retardation-variants-v1.json");
}else console.log(output.trimEnd());
