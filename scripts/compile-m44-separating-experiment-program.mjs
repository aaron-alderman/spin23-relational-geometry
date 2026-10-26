#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const inverse=JSON.parse(fs.readFileSync(new URL("../evidence/data/m44-inverse-response-jets-v1.json",import.meta.url),"utf8"));
const contract=JSON.parse(fs.readFileSync(new URL("../evidence/data/m44-anchor-width-calibration-contract-v1.json",import.meta.url),"utf8"));
const pair=(a,b)=>[a,b].sort().join("::");
const ambiguityPairs=[...new Set(inverse.equivalenceClasses.flatMap(group=>group.members.flatMap((left,i)=>group.members.slice(i+1).map(right=>pair(left,right)))))].sort();

const actions=[
  {
    id:"X1-absolute-anchor-pilot",stage:2,type:"calibration+observation",prerequisites:["P1-forward-law"],
    separates:[pair("L0-ordinary-constant","L1-constant-displacement"),pair("L0-ordinary-constant","L2-constant-tilt"),pair("L1-constant-displacement","L2-constant-tilt")],
    deliverable:"calibrated anchor surface with retained constant and affine terms on held-out standards",
    failureMeaning:"E0 remains one location-kernel class; displacement is untestable rather than absent"
  },
  {
    id:"X2-frozen-ordinary-phase-space",stage:1,type:"model",prerequisites:["P2-full-covariance"],
    separates:[pair("L3-ordinary-affine-dynamics","L5-generic-affine-latent-response"),pair("L3-ordinary-affine-dynamics","L6-smooth-geometric-bend")],
    deliverable:"member-level ordinary residual prediction frozen before new spectroscopy",
    failureMeaning:"ordinary dynamics remains an unfrozen flexible explanation"
  },
  {
    id:"X3-cross-instrument-replication",stage:2,type:"replication",prerequisites:["P2-full-covariance"],
    separates:[pair("L3-ordinary-affine-dynamics","L4-calibration-or-population-drift"),pair("L4-calibration-or-population-drift","L5-generic-affine-latent-response"),pair("L4-calibration-or-population-drift","L6-smooth-geometric-bend"),pair("L3-ordinary-affine-dynamics","L4-calibration-or-population-drift"),pair("L4-calibration-or-population-drift","L7-geometric-thickness")],
    deliverable:"same frozen targets and lines measured on a withheld independently calibrated spectrograph",
    failureMeaning:"instrument-specific structure remains inside the affine and width classes"
  },
  {
    id:"X4-carrier-law-line-holdout",stage:2,type:"derivation+observation",prerequisites:["P1-forward-law"],
    separates:[pair("L5-generic-affine-latent-response","L6-smooth-geometric-bend"),pair("L3-ordinary-affine-dynamics","L6-smooth-geometric-bend"),pair("L4-calibration-or-population-drift","L6-smooth-geometric-bend")],
    deliverable:"preregistered carrier/line response followed by withheld-line evaluation",
    failureMeaning:"geometric bend remains only an untyped member of the affine-response class"
  },
  {
    id:"X5-hierarchical-width-deconvolution",stage:2,type:"multi-epoch inference",prerequisites:["P1-forward-law","P2-full-covariance"],
    separates:[pair("L3-ordinary-affine-dynamics","L7-geometric-thickness"),pair("L4-calibration-or-population-drift","L7-geometric-thickness")],
    deliverable:"joint star/line/epoch/instrument covariance with binary, atmosphere and measurement mixtures separated",
    failureMeaning:"W remains an undeconvolved width mixture"
  }
].map(action=>({...action,separates:[...new Set(action.separates)].sort()}));

const prerequisites=[
  {id:"P1-forward-law",stage:0,deliverable:"source-derived displacement, tilt, bend and thickness response on named carriers, including normalization and falsifiers",status:contract.corpusLawAudit.laws.some(x=>x.executableForContract)?"satisfied":"missing"},
  {id:"P2-full-covariance",stage:1,deliverable:"member-level astrometric, spectral, fitted-model and selection covariance with provenance",status:"missing"}
];

const covers=(selection,target)=>selection.some(action=>action.separates.includes(target));
const subsets=[];for(let mask=1;mask<2**actions.length;mask++){const selection=actions.filter((_,i)=>mask&(1<<i)),covered=ambiguityPairs.filter(target=>covers(selection,target));subsets.push({selection,covered})}
const complete=subsets.filter(item=>item.covered.length===ambiguityPairs.length);
const selected=complete.sort((a,b)=>a.selection.length-b.selection.length||a.selection.map(x=>x.id).join().localeCompare(b.selection.map(x=>x.id).join()))[0]??null;
const coveredPairs=selected?.covered??[],uncoveredPairs=ambiguityPairs.filter(target=>!coveredPairs.includes(target));
const marginalCoverage=actions.map(action=>({action:action.id,pairs:action.separates.filter(target=>ambiguityPairs.includes(target)),count:action.separates.filter(target=>ambiguityPairs.includes(target)).length,uniquelyRequiredPairs:action.separates.filter(target=>ambiguityPairs.includes(target)&&actions.filter(other=>other.separates.includes(target)).length===1)}));

const result={
  schemaVersion:"0.1.0",status:"deterministic experiment compiler; no observation authorized or performed",
  inputs:{inverse:"evidence/data/m44-inverse-response-jets-v1.json",contract:"evidence/data/m44-anchor-width-calibration-contract-v1.json"},
  objective:"separate every pair that co-occurs in a current observable equivalence class",
  ambiguityPairs,prerequisites,actions,marginalCoverage,
  cover:{completeCoverExists:Boolean(selected),minimumActionCount:selected?.selection.length??null,selectedActions:selected?.selection.map(x=>x.id)??[],coveredPairs,uncoveredPairs},
  stagedProgram:[
    {stage:0,name:"derive",items:["P1-forward-law"],stop:"do not acquire a large bespoke dataset if the carrier-specific law remains undefined"},
    {stage:1,name:"reconstruct",items:["P2-full-covariance","X2-frozen-ordinary-phase-space"],stop:"do not call residual structure anomalous until the ordinary prediction and covariance are frozen"},
    {stage:2,name:"observe-once-retain-identity",items:["X1-absolute-anchor-pilot","X3-cross-instrument-replication","X4-carrier-law-line-holdout","X5-hierarchical-width-deconvolution"],stop:"retain raw star/line/epoch/instrument identity; do not collapse to one catalogue velocity"},
    {stage:3,name:"adjudicate",items:["rerun response-jet inversion","compare only preregistered observable classes","abstain on remaining aliases"],stop:"no physical promotion without independent held-out separation"}
  ],
  decision:selected?"the five actions form the unique minimum complete cover under the declared discrimination graph":"the declared action library cannot separate every current ambiguity pair",
  caveat:"pair coverage means an action supplies a declared discriminator; it does not guarantee statistical power or a positive geometric result"
};

assert.equal(ambiguityPairs.length,11);
assert.equal(result.cover.completeCoverExists,true);
assert.equal(result.cover.minimumActionCount,5);
assert.deepEqual(result.cover.selectedActions,actions.map(x=>x.id));
assert.equal(prerequisites.find(x=>x.id==="P1-forward-law").status,"missing");
assert.equal(result.status.includes("no observation authorized"),true);
const output=`${JSON.stringify(result,null,2)}\n`;
if(process.argv.includes("--write")){fs.writeFileSync(new URL("../evidence/data/m44-separating-experiment-program-v1.json",import.meta.url),output);console.log("wrote evidence/data/m44-separating-experiment-program-v1.json")}else console.log(output.trimEnd());
