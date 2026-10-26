import fs from "node:fs";
import path from "node:path";

const ROOT=process.cwd();
const WRITE=process.argv.includes("--write");
const OUTPUT="evidence/data/rdg-maxwell-detector-null-budget-v1.json";
const read=name=>JSON.parse(fs.readFileSync(path.join(ROOT,"evidence/data",name),"utf8"));

const fixed=read("rdg-maxwell-fixed-complex-selector-v1.json");
const dynamics=read("rdg-maxwell-hodge-dynamics-v1.json");
const dispersion=read("rdg-maxwell-sources-dispersion-v1.json");
const remesh=read("rdg-maxwell-remeshing-retract-v1.json");
const topology=read("rdg-maxwell-topology-cut-v1.json");
const torus=read("rdg-maxwell-torus-flux-cut-v1.json");
const bath=read("rdg-maxwell-port-and-bath-v1.json");

const channels=[
  {
    id:"G1",gate:"gauge/complex",ordinaryMechanism:"selector does not commute with d",detector:"commutator and pure-gauge injection",exactControl:fixed.selector.chainCommutatorResiduals,
    failureWitness:fixed.untypedSelectorCounterexample.manufacturedCurvatureMaxAbs,status:"exact control and counterexample",
  },
  {
    id:"G2",gate:"constitutive",ordinaryMechanism:"material metric breaks selector symmetry",detector:"[P,L] and admitted-to-defect transfer",exactControl:dynamics.uniformMedium.selectorMetricCommutatorResidual,
    failureWitness:dynamics.translationBreakingMedium.admittedToDefectWitnessMaxAbs,status:"exact control and counterexample",
  },
  {
    id:"G3",gate:"dynamics",ordinaryMechanism:"Maxwell/material generator mixes sectors",detector:"[P,K] over frequency and state",exactControl:dynamics.uniformMedium.selectorDynamicsCommutatorResidual,
    failureWitness:dynamics.translationBreakingMedium.selectorDynamicsCommutatorResidual,status:"exact control and counterexample",
  },
  {
    id:"G4",gate:"source continuity",ordinaryMechanism:"charge and current selectors are inconsistent",detector:"d0^T Pi1-Pi0 d0^T",exactControl:dispersion.sourceContinuity.translationSelectorContinuityResidual,
    failureWitness:dispersion.sourceContinuity.untypedComponentSelectorContinuityResidual,status:"exact control and counterexample",
  },
  {
    id:"G5",gate:"resonant memory",ordinaryMechanism:"spatially varying resonance mixes field/material sectors",detector:"extended-state [P,K] frequency sweep",exactControl:dispersion.homogeneousLossless.selectorDynamicsCommutatorResidual,
    failureWitness:dispersion.resonantContrast.selectorDynamicsCommutatorResidual,status:"exact control and counterexample",
  },
  {
    id:"G6",gate:"remesh",ordinaryMechanism:"projection is metric-safe but not chain-safe, or converse",detector:"chain, retract, metric and adjoint residuals",exactControl:Math.max(...remesh.cochainMaps.transportCommutatorResiduals,...remesh.metricBoundary.compatibleMetricConstruction.map(item=>item.weightedRestrictionResidual)),
    failureWitness:Math.max(...remesh.metricBoundary.euclideanLeastSquares.projectorChainResiduals),status:"exact compatible construction and counterexample",
  },
  {
    id:"G7",gate:"topology record",ordinaryMechanism:"global class changes address at a cut",detector:"boundary mismatch, Wilson circulation or cap flux",exactControl:Math.max(topology.recordTransfer.exactnessResidual,topology.compactU1Extension.transitionHolonomyResidual,torus.fluxTransfer.stokesResidual),
    failureWitness:"discarding boundary/gluing data makes reconstruction many-to-one",status:"exact record transfer",
  },
  {
    id:"G8",gate:"loss/port",ordinaryMechanism:"energy exits through an unmeasured bath or returns outside the observation window",detector:"port power plus echo/return channel",exactControl:bath.dissipativePort.sampleBalanceResidual,
    failureWitness:"finite bath gives full recurrence at 2pi",status:"exact port balance and recurrence counterexample",
  },
];

const record={
  schemaVersion:"rdg-maxwell-detector-null-budget-v1",
  date:"2026-10-26",
  purpose:"Compile every demonstrated conventional route into an RDG-Maxwell defect detector and define the held-out residual gate.",
  measuredModel:{
    equation:"y_Q(omega)=D_Q(omega) Q K_total(omega) P u(omega)+n_Q(omega)",
    terms:{P:"prepared admitted input",K_total:"carrier plus geometry, material, source, boundary and bath response",Q:"defect selector",D_Q:"calibrated detector transfer",n_Q:"noise and drift"},
    residual:"r_Q=y_Q-y_geometry-y_constitutive-y_source-y_boundary-y_detector-y_port",
  },
  conventionalChannels:channels,
  decisionRule:{
    rejectNewPhysicsWhen:"any conventional channel explains the held-out amplitude, phase, frequency dependence, scaling or energy flow within its declared uncertainty",
    retainAnomalyWhen:[
      "the preparation and selector commute with the gauge complex",
      "geometry, constitutive and resonant transfer matrices are independently calibrated",
      "source continuity and both Gauss records close",
      "boundary, topology and remesh receipts retain all global records",
      "detector cross-talk, noise and phase lag are calibrated on held-out configurations",
      "port power and return channels close the energy budget",
      "a preregistered residual survives reversal, scaling, frequency and independent-detector tests",
    ],
    promoteToNewPhysicsOnlyWhen:"the retained residual also conflicts with the complete conventional model in a reproducible way and a typed extension improves held-out predictions",
  },
  suggestedExperiment:{
    platform:"same-device three-mode coherent network, with thin-film lithium niobate as one practical implementation",
    preparation:"two settings with identical pairwise coupling magnitudes and opposite closed-loop phase",
    sweeps:["drive frequency","closed-loop phase","input amplitude","temperature","material bias","boundary loading"],
    records:["complex transfer matrix","Q-sector amplitude and phase","all output-port power","thermal drift","detector impulse response"],
    controls:["homogeneous symmetry-compatible device","deliberate material contrast","deliberate detector cross-talk","open/closed boundary calibration"],
    heldOutTest:"fit nuisance parameters without the target phase configuration, then predict its full complex response before unblinding",
  },
  statusSummary:{
    channels:channels.length,
    exactZeroControls:channels.filter(item=>typeof item.exactControl==="number"?item.exactControl<1e-10:Array.isArray(item.exactControl)&&item.exactControl.every(value=>value<1e-10)).length,
    claim:"A nonzero defect signal is a sensitive relational measurement, not a self-authenticating anomaly.",
  },
  verdict:"The RDG-Maxwell arm now supplies a complete first-pass nuisance ladder. New physics begins only at the reproducible held-out residual after all eight typed conventional channels are bounded; Q-sector power alone is evidence only of symmetry-relative transfer.",
};

if(WRITE)fs.writeFileSync(path.join(ROOT,OUTPUT),`${JSON.stringify(record,null,2)}\n`);
console.log(JSON.stringify({output:OUTPUT,wrote:WRITE,...record},null,2));

