#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const concepts=[
  {id:"front",label:"wavefront",type:"geometric/phase object",definition:"a constant-phase surface or singular-support boundary associated with propagation",minimalData:["phase or support convention","time","propagation law"]},
  {id:"wavelet",label:"secondary circular or spherical front",type:"local propagator object",definition:"an isotropic point-source front at a declared elapsed time",minimalData:["source event","speed or dispersion law","dimension","metric or medium"]},
  {id:"envelope",label:"envelope",type:"family singularity",definition:"the locus where neighbouring members of a parameterized family touch",minimalData:["family F(x;s)=0","F=0","partial_s F=0"]},
  {id:"caustic",label:"caustic",type:"projection singularity",definition:"the image of a rank loss in the ray or wavefront projection, commonly producing geometric concentration",minimalData:["ray/front manifold","projection map","rank-loss condition","finite-wave regularization"]},
  {id:"cusp",label:"cusp",type:"higher envelope singularity",definition:"a generic pointed caustic where the envelope degeneracy increases",minimalData:["F=0","partial_s F=0","partial_s^2 F=0","nondegenerate higher derivative and transversality"]},
  {id:"pressure",label:"pressure wave",type:"classical material field",definition:"a propagating compression and rarefaction disturbance governed by a material constitutive and evolution law",minimalData:["density or strain field","constitutive law","boundary conditions","damping"]},
  {id:"normal_mode",label:"normal mode",type:"spectral dynamical object",definition:"an eigenmotion of the declared linearized system and its boundary conditions",minimalData:["state space","operator","boundary conditions","normalization"]},
  {id:"phonon",label:"phonon",type:"quantized material mode",definition:"a quantum of a normal mode of a lattice or effective elastic medium",minimalData:["mode branch","wavevector or mode label","quantization convention","occupation"]},
  {id:"resonance",label:"resonance",type:"response-spectrum object",definition:"a pole or declared response enhancement of the complete driven, damped and coupled system",minimalData:["retarded response","probe coupling","damping","boundary/loading conditions"]},
  {id:"dispersion",label:"dispersion relation",type:"spectral transport law",definition:"a branch relation omega_n(k) connecting temporal frequency and spatial wavevector",minimalData:["branch label","omega(k)","validity range"]},
  {id:"group_velocity",label:"group velocity",type:"packet transport reader",definition:"the gradient of a dispersion branch with respect to wavevector",minimalData:["differentiable dispersion branch","v_g=grad_k omega"]},
  {id:"shock",label:"shock",type:"nonlinear weak-solution structure",definition:"a propagating discontinuity produced when nonlinear characteristics intersect and regularization becomes singular",minimalData:["conservation/evolution law","jump condition","entropy or admissibility condition"]},
  {id:"osculating_circle",label:"osculating circle",type:"local differential-geometric approximation",definition:"the circle matching a planar curve's position, tangent and curvature at one regular point",minimalData:["regular curve","nonzero curvature","radius=1/|kappa|"]},
  {id:"frenet_transport",label:"Frenet/SE(2) transport",type:"local-to-global reconstruction",definition:"ordered rotation and translation driven by curvature reconstructing a planar curve up to rigid motion",minimalData:["arc length","curvature kappa(s)","initial frame"]}
];

const relations=[
  {from:"wavelet",to:"envelope",kind:"family_can_generate",condition:"a parameterized family is supplied; tangency is solved rather than inferred visually"},
  {from:"envelope",to:"caustic",kind:"can_realize",condition:"the family is a projected ray or phase manifold and the projection loses rank"},
  {from:"caustic",to:"cusp",kind:"can_contain",condition:"the generic higher-degeneracy conditions hold"},
  {from:"dispersion",to:"group_velocity",kind:"derives",condition:"v_g=grad_k omega on one smooth branch"},
  {from:"normal_mode",to:"phonon",kind:"quantizes_to",condition:"the normal mode belongs to a quantized lattice or elastic field"},
  {from:"pressure",to:"normal_mode",kind:"decomposes_into",condition:"the linearized bounded problem admits a spectral decomposition"},
  {from:"normal_mode",to:"resonance",kind:"may_appear_as",condition:"the probe couples to the mode and damping/loading are declared"},
  {from:"group_velocity",to:"caustic",kind:"can_focus_into",condition:"the direction map from wavevector to group velocity loses rank"},
  {from:"frenet_transport",to:"osculating_circle",kind:"has_local_reader",condition:"curvature is nonzero"},
  {from:"front",to:"shock",kind:"not_equivalent_but_can_coincide",condition:"a nonlinear characteristic front steepens into an admissible discontinuity"}
];

const prohibitedEquivalences=[
  ["caustic","resonance","geometric concentration is not temporal or spectral amplification"],
  ["cusp","shock","a projection singularity need not be a field discontinuity"],
  ["pressure","phonon","a classical pressure disturbance is not automatically quantized or lattice-supported"],
  ["wavelet","front","one secondary front is not the complete propagated field"],
  ["osculating_circle","front","a local curve approximation is not automatically a physical wavefront"],
  ["envelope","superposition","an envelope is a geometric tangency locus, while superposition also carries amplitude and phase"],
  ["resonance","normal_mode","a dark or uncoupled mode need not appear as an observed resonance"],
  ["group_velocity","phase_velocity","packet/energy transport and constant-phase motion can differ in a dispersive medium"]
];

const result={
  schemaVersion:"0.1.0",
  status:"typed vocabulary and bridge; no new physical identification",
  trigger:{illustration:"https://x.com/matheorems/status/2114714945204199814",role:"intuition only; the image and caption are not evidence that every wave is circular or circle-generated"},
  exactCore:{
    planarCurve:"for an arc-length curve gamma(s), gamma'=T and T'=kappa N; kappa(s) plus an initial frame reconstructs gamma up to rigid motion",
    movingIsotropicFront:"F(x,t;s)=|x-X(s)|^2-c^2(t-s)^2=0",
    envelope:"F=0 and partial_s F=0",
    genericCusp:"F=partial_s F=partial_s^2 F=0 with the required higher nondegeneracy and transversality",
    dispersiveTransport:"v_g=grad_k omega_n(k)",
    response:"poles, residues, cuts and zeros belong to the complete retarded response, not to geometry alone"
  },
  concepts,relations,prohibitedEquivalences,
  readers:[
    {question:"what propagates?",records:["field variable","front/support","mode branch","polarization"]},
    {question:"how does it propagate?",records:["dispersion","group velocity","attenuation","metric/constitutive tensor"]},
    {question:"where does it concentrate?",records:["Jacobian/rank loss","envelope","caustic type","finite-wavelength smoothing"]},
    {question:"what rings?",records:["retarded poles","residues","linewidths","probe and boundary conditions"]},
    {question:"is it nonlinear?",records:["amplitude dependence","characteristic crossing","jump and entropy conditions","harmonic generation"]},
    {question:"what is observed?",records:["detector transfer","bandwidth","phase reference","noise and covariance"]}
  ],
  corpusJoins:[
    {path:"corpus/programmes/admissibility/admissibility_06_dynamic_response_geometry_detection_metastability.md",join:"resonance, causal response, geometry, detector and memory remain typed parts of one drive-to-record chain"},
    {path:"corpus/claims/1000-1099/1024_conjugate_frequency_reality_pairs_but_does_not_remove_the_imaginary_residual_mode_so_spin23_is_static_or_reciprocal.md",join:"complex dispersive response is not collapsed into a static real covariance"},
    {path:"corpus/claims/1000-1099/1025_a_reciprocal_keldysh_kernel_places_noise_in_h2r_while_retarded_response_remains_complex_and_fdt_preserves_the_split.md",join:"retarded propagation and reciprocal noise retain different analytic types"},
    {path:"corpus/programmes/frontier-physics-targets/detector_frontier_register_v1.json",join:"frequency, phase, causal-lag spectroscopy and detector calibration provide operational readers"}
  ],
  ambientBoundaries:{
    notOrganizedAround:["MOND","gravitational retardation","M44","extra dimensions"],
    downstreamUseRule:"a later programme may instantiate this bridge only after supplying its own carrier, operator, constitutive law, dimensions, boundary conditions and observables",
    noInference:["a circular drawing implies isotropic physics","tangent circles prove a wave law","a caustic proves resonance","a resonance proves a phonon","a visual cusp proves a shock","a shared silhouette identifies a shared mechanism"]
  },
  sources:[
    {role:"strong Huygens principle and forward fundamental solution",url:"https://math.mit.edu/~dyatlov/res/res_final.pdf"},
    {role:"water-wave dispersion, phase and group velocity",url:"https://ocw.mit.edu/courses/18-357-interfacial-phenomena-fall-2010/229785489c81648500f89044a97c0e51_MIT18_357F10_Lecture19.pdf"},
    {role:"osculating-circle geometry example",url:"https://arxiv.org/abs/2112.03614"}
  ],
  verdict:"admit as a neutral local-to-global wave geometry and mode-typing bridge; require a separate physical law before using it in any ambient application"
};

assert.equal(concepts.length,14);
assert.equal(new Set(concepts.map(x=>x.id)).size,concepts.length);
const ids=new Set(concepts.map(x=>x.id));
for(const relation of relations){assert.ok(ids.has(relation.from));assert.ok(ids.has(relation.to));}
for(const [a,b] of prohibitedEquivalences){assert.ok(ids.has(a)||a==="superposition"||a==="phase_velocity");assert.ok(ids.has(b)||b==="superposition"||b==="phase_velocity");}
assert.ok(result.ambientBoundaries.notOrganizedAround.includes("MOND"));
assert.match(result.verdict,/neutral/u);

const output=`${JSON.stringify(result,null,2)}\n`;
if(process.argv.includes("--write")){
  fs.writeFileSync(new URL("../evidence/data/wave-geometry-mode-singularity-bridge-v1.json",import.meta.url),output);
  console.log("wrote evidence/data/wave-geometry-mode-singularity-bridge-v1.json");
}else console.log(output.trimEnd());
