#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const gates=[
  {id:"typed-observable",question:"Is the measured quantity defined without using the target hypothesis?"},
  {id:"independent-zero",question:"Is its absolute zero fixed by an independent calibration at the required scale?"},
  {id:"affine-control",question:"Are spatial, magnitude, colour and instrument-dependent affine freedoms bounded?"},
  {id:"covariance",question:"Is the full measurement and fitted-nuisance covariance propagated?"},
  {id:"ordinary-controls",question:"Are binaries, stellar atmosphere, selection and ordinary dynamics controlled?"},
  {id:"forward-map",question:"Does a frozen source-derived law map the geometric variable to this observable?"},
  {id:"independent-holdout",question:"Is there a genuinely unused instrument, field or sample for validation?"}
];
const gate=(state,evidence)=>({state,evidence});
const candidates=[
  {
    id:"A1-cross-channel-rv-location",role:"anchor",observable:"spectroscopic radial velocity minus an astrometry-only perspective/convergent-point prediction",currentData:"373 robust M44 residual inliers from Gaia DR3 after the frozen selection",typeStatus:"proxy-not-coordinate",
    gates:{
      "typed-observable":gate("pass","the subtraction is defined before any T1 interpretation"),
      "independent-zero":gate("partial","Gaia has external RV standards, but the current residual uses Gaia aggregate RVs and no independent spectrograph zero"),
      "affine-control":gate("partial","template temperature was tested; Gaia DR3 RV magnitude trend, position and instrument replication remain"),
      covariance:gate("fail","the current spike does not propagate the full astrometric covariance, fitted common-velocity covariance and spectral nuisance covariance jointly"),
      "ordinary-controls":gate("partial","robust clipping and coarse temperature control exist; binaries, convection, gravitational redshift and frozen N-body tails remain"),
      "forward-map":gate("fail","no corpus law maps extra-coordinate displacement to a calibrated RV residual"),
      "independent-holdout":gate("fail","the hash folds are retrospective and use one Gaia spectral product")
    },
    falsifiers:["residual follows Gaia magnitude/template systematics","independent spectroscopy does not reproduce the spatial field","frozen ordinary dynamics explains the residual","no source-derived displacement-to-RV transfer law can be stated"]
  },
  {
    id:"A2-parallax-photometric-location",role:"anchor",observable:"Gaia parallax distance minus independently calibrated photometric or standard-candle distance",currentData:"not constructed for the selected M44 sample",typeStatus:"conditional-proxy",
    gates:{
      "typed-observable":gate("pass","a distance residual is independently definable"),
      "independent-zero":gate("partial","Gaia DR3 retains an uncorrected parallax bias and photometric distances import their own zero"),
      "affine-control":gate("partial","published parallax corrections depend on position, magnitude and colour"),
      covariance:gate("partial","Gaia supplies astrometric correlations, but the joint photometric and cluster-model covariance is absent here"),
      "ordinary-controls":gate("fail","extinction, metallicity, rotation, binaries and stellar-model discrepancy have not been jointly fitted"),
      "forward-map":gate("fail","ordinary distance disagreement is not a derived measurement of an extra coordinate"),
      "independent-holdout":gate("fail","no frozen second distance ladder is attached")
    },
    falsifiers:["signal tracks colour, magnitude or sky-position correction","alternative stellar models move the inferred zero","independent distance ladders disagree","no geometric transfer law survives ordinary distance calibration"]
  },
  {
    id:"A3-line-resolved-cross-instrument-phase",role:"anchor",observable:"line-by-line wavelength residual against an astrometric velocity prediction, repeated on independent spectrographs",currentData:"absent from the present corpus",typeStatus:"preferred-future-proxy",
    gates:{
      "typed-observable":gate("pass","line identities, instruments and astrometric prediction can be frozen before fitting"),
      "independent-zero":gate("partial","frequency-comb/telluric and RV-standard routes exist but no M44 contract is instantiated"),
      "affine-control":gate("partial","a design can stratify instrument, epoch, line, magnitude and stellar type; bounds are not yet measured"),
      covariance:gate("partial","epoch and line covariance can be retained but no matrix exists yet"),
      "ordinary-controls":gate("partial","multi-epoch binaries and atmosphere-dependent line shifts are controllable in principle"),
      "forward-map":gate("fail","the required carrier- and line-dependent T1 law has not been derived"),
      "independent-holdout":gate("partial","a second spectrograph is an available design, not an executed holdout")
    },
    falsifiers:["line residuals do not share the preregistered carrier law","effect changes with spectrograph or reduction pipeline","multi-epoch variability explains the signal","ordinary atmosphere models remove the line pattern"]
  },
  {
    id:"A4-ordinary-spatial-depth",role:"anchor",observable:"inverse-parallax physical position or cluster depth",currentData:"available for selected M44 members",typeStatus:"type-error-as-direct-anchor",
    gates:{"typed-observable":gate("fail","ordinary three-dimensional position is not the hypothesized fourth coordinate")},
    falsifiers:["not applicable: retire the direct identification rather than fit it"]
  },
  {
    id:"W1-cross-channel-rv-scatter",role:"width",observable:"intrinsic scatter of the astrometry-minus-spectroscopy residual after deconvolving errors and ordinary mixtures",currentData:"robust scatter 1.43 km/s in the current M44 pass",typeStatus:"conditional-proxy",
    gates:{
      "typed-observable":gate("pass","a residual-distribution width is independently definable"),
      "independent-zero":gate("pass","a width does not require a location zero, although its error floor must be calibrated"),
      "affine-control":gate("partial","heteroscedastic magnitude, template and spatial width changes have not been bounded"),
      covariance:gate("fail","per-star measurement errors, common fitted velocity and nuisance-mixture covariance are not jointly deconvolved"),
      "ordinary-controls":gate("fail","binaries, rotation, atmosphere shifts and tail dynamics can all broaden the distribution"),
      "forward-map":gate("fail","no law maps fourth-coordinate thickness to RV-residual variance"),
      "independent-holdout":gate("fail","no independent spectroscopic width measurement exists")
    },
    falsifiers:["width collapses after binary/measurement deconvolution","width follows stellar type or magnitude","independent instruments give incompatible intrinsic widths","no thickness-to-variance transfer law is derived"]
  },
  {
    id:"W2-line-coherence-loss",role:"width",observable:"carrier- and line-resolved loss of cross-line coherence after ordinary atmosphere covariance",currentData:"absent from the present corpus",typeStatus:"preferred-future-proxy",
    gates:{
      "typed-observable":gate("pass","cross-line covariance can be declared independently"),
      "independent-zero":gate("pass","the null is full coherence after the calibrated ordinary line model"),
      "affine-control":gate("partial","instrument and stellar-type dependence can be designed but are not bounded"),
      covariance:gate("partial","the required line-by-epoch covariance is constructible but absent"),
      "ordinary-controls":gate("partial","line formation, activity, rotation and blending require an explicit hierarchical model"),
      "forward-map":gate("fail","no frozen thickness-to-coherence kernel exists"),
      "independent-holdout":gate("partial","withheld lines and a second spectrograph are available designs, not completed evidence")
    },
    falsifiers:["coherence loss follows known line-formation groups","withheld lines fail","independent instruments disagree","the declared thickness kernel does not predict the covariance eigenstructure"]
  },
  {
    id:"W3-astrometric-cluster-depth",role:"width",observable:"deconvolved variance of ordinary three-dimensional member positions",currentData:"partly available from Gaia parallaxes",typeStatus:"type-error-as-direct-width",
    gates:{"typed-observable":gate("fail","ordinary cluster depth is not fourth-coordinate thickness without a forward map")},
    falsifiers:["not applicable: retain as an ordinary nuisance/control, not a direct thickness reader"]
  }
];

const required=gates.map(item=>item.id);
for(const candidate of candidates){
  const states=required.map(id=>candidate.gates[id]?.state??"missing");
  candidate.gateSummary=Object.fromEntries(["pass","partial","fail","missing"].map(state=>[state,states.filter(x=>x===state).length]));
  candidate.decision=candidate.typeStatus.startsWith("type-error")?"retire-as-direct-mapping":states.every(state=>state==="pass")?"admit":"hold";
}
const pairs=[
  {id:"P1-current-rv-location-plus-scatter",anchor:"A1-cross-channel-rv-location",width:"W1-cross-channel-rv-scatter",decision:"hold",reason:"both statistics reuse one residual product; joint covariance, ordinary-mixture deconvolution and both geometric forward maps are absent"},
  {id:"P2-line-resolved-location-plus-coherence",anchor:"A3-line-resolved-cross-instrument-phase",width:"W2-line-coherence-loss",decision:"preferred-future-design",reason:"one spectral campaign can retain line, epoch and instrument identity, but promotion waits for source-derived kernels and a genuinely withheld spectrograph"},
  {id:"P3-distance-location-plus-cluster-depth",anchor:"A2-parallax-photometric-location",width:"W3-astrometric-cluster-depth",decision:"retire-as-direct-geometric-pair",reason:"the apparent pair is dominated by ordinary distance and physical depth and does not type the proposed extra coordinate"}
];

const result={
  schemaVersion:"0.1.0",status:"calibration contract; no physical promotion",abstractRequirement:{anchor:"absolute spatially resolved location channel with retained zero and affine calibration",width:"intrinsic distribution-width channel with a declared error-floor deconvolution",joint:"joint covariance plus independently derived forward maps from geometry to both observables"},
  authority:[
    {id:"gaia-dr3-docs",url:"https://gea.esac.esa.int/archive/documentation/GDR3/",supports:"DR3 astrometry equals EDR3; global parallax bias about -0.017 mas remains uncorrected and correction depends on position, magnitude and colour"},
    {id:"lindegren-2021",doi:"10.1051/0004-6361/202039653",supports:"parallax bias has non-trivial magnitude, colour, ecliptic-latitude and solution-type dependence"},
    {id:"katz-2023",doi:"10.1051/0004-6361/202244220",supports:"Gaia DR3 RV zero point has a magnitude trend reaching about 0.4 km/s near GRVS=14; a correction is provided"},
    {id:"gaia-covariance-docs",url:"https://gea.esac.esa.int/archive/documentation/GDR3/Data_processing/chap_cu3ast/sec_cu3ast_intro/ssec_cu3ast_intro_tansforms.html",supports:"astrometric transformations require Jacobian propagation of the full covariance matrix"},
    {id:"soubiran-2013",doi:"10.1051/0004-6361/201220927",supports:"Gaia RV standards are externally monitored and inter-instrument zero points must be estimated"}
  ],
  corpusLawAudit:{
    method:"targeted exact-text scan for configuration-T1 frequency, projection and response-kernel laws; unrelated uses of trigonometric mixing were excluded by type",
    source:"corpus/syntheses/grand-synthesis/aarons_spin23_research_thesis.md",
    laws:[
      {id:"L1-frequency-projection",expression:"omega_obs = omega_1 cos(theta) + omega_2 sin(theta)",inputs:["orientation theta","two frequency components"],covers:["orientation-dependent frequency mixing"],missing:["dynamical clock definition","phase transport","carrier or line assignment","displacement response","thickness/coherence response"],executableForContract:false},
      {id:"L2-spatial-frame-projection",expression:"x_obs = E^T G q",inputs:["two orthonormal 4x3 frames","intrinsic spatial coordinate"],covers:["rank-two-plus-one spatial compression"],missing:["electromagnetic transfer law","absolute extra-coordinate zero","spectral response","stochastic thickness response"],executableForContract:false},
      {id:"L3-electromagnetic-kernel-placeholder",expression:"K_EM(q, omega, theta, grad(theta))",inputs:["declared but unspecified arguments"],covers:["names the required response family"],missing:["functional form","normalization","shared gravity constraint","falsifiable carrier dependence"],executableForContract:false}
    ],
    conclusion:"the corpus contains no executable source-derived anchor or width transfer law; only orientation projections and an explicitly unspecified response-kernel slot"
  },
  gates,candidates,pairs,
  verdict:{admittedCandidates:candidates.filter(x=>x.decision==="admit").map(x=>x.id),heldCandidates:candidates.filter(x=>x.decision==="hold").map(x=>x.id),retiredDirectMappings:candidates.filter(x=>x.decision==="retire-as-direct-mapping").map(x=>x.id),nextAction:"derive a source-native observable law before acquiring a large dataset; in parallel, specify a line-resolved two-instrument pilot that preserves raw line, epoch, star and instrument identity",noResultMeaning:"failure to calibrate an absolute anchor makes displacement untestable; it is not evidence for the ordinary/null family"}
};

assert.equal(result.verdict.admittedCandidates.length,0);
assert.deepEqual(result.verdict.retiredDirectMappings,["A4-ordinary-spatial-depth","W3-astrometric-cluster-depth"]);
assert.equal(candidates.find(x=>x.id==="A1-cross-channel-rv-location").gates["forward-map"].state,"fail");
assert.equal(pairs.find(x=>x.id==="P2-line-resolved-location-plus-coherence").decision,"preferred-future-design");
assert.equal(candidates.filter(x=>!x.typeStatus.startsWith("type-error")).every(x=>required.every(id=>x.gates[id])),true);
assert.equal(result.corpusLawAudit.laws.some(x=>x.executableForContract),false);
const output=`${JSON.stringify(result,null,2)}\n`;
if(process.argv.includes("--write")){fs.writeFileSync(new URL("../evidence/data/m44-anchor-width-calibration-contract-v1.json",import.meta.url),output);console.log("wrote evidence/data/m44-anchor-width-calibration-contract-v1.json")}else console.log(output.trimEnd());
