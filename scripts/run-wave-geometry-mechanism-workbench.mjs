#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";

const round=(x,n=8)=>Number(x.toFixed(n));
const linspace=(a,b,n)=>Array.from({length:n},(_,i)=>a+(b-a)*i/(n-1));

// WG1: an open ray family whose normal projection develops a regular fold caustic.
const rayUs=linspace(.2,.9,19),a=.55;
const rayFamily=rayUs.map(u=>{
  const y=-a*Math.cos(u),yp=a*Math.sin(u),den=Math.sqrt(1+yp*yp);
  const normal=[-yp/den,1/den];
  const curvature=a*Math.cos(u)/(1+yp*yp)**1.5;
  const causticDistance=1/curvature;
  const caustic=[u+causticDistance*normal[0],y+causticDistance*normal[1]];
  const rayEnd=[u+1.18*causticDistance*normal[0],y+1.18*causticDistance*normal[1]];
  return{u:round(u),source:[round(u),round(y)],normal:normal.map(x=>round(x)),curvature:round(curvature),causticDistance:round(causticDistance),caustic:caustic.map(x=>round(x)),rayEnd:rayEnd.map(x=>round(x))};
});

// WG2: a spatially zero-dimensional resonator. It can ring but has no ray projection.
const omega0=1,gamma=.12;
const resonanceCurve=linspace(.02,2.5,220).map(omega=>{
  const re=omega0*omega0-omega*omega,im=-gamma*omega;
  return{omega:round(omega),magnitude:round(1/Math.hypot(re,im))};
});
const resonancePeak=resonanceCurve.reduce((p,c)=>c.magnitude>p.magnitude?c:p);
const pole={re:round(Math.sqrt(omega0*omega0-gamma*gamma/4)),im:round(-gamma/2)};

// WG3: a classical continuum pressure field. No occupation or quantization is introduced.
const acoustic={soundSpeed:1.3,waveNumber:2,omega:2.6};
const pressureFrame=linspace(0,2*Math.PI,121).map(x=>({x:round(x),pressure:round(Math.cos(acoustic.waveNumber*x))}));

// WG4: an anisotropic square lattice. Constant-frequency states are binned by group-velocity direction.
const cx=1,cy=.22,targetOmega=1.35,tolerance=.018,bins=72,angleCounts=Array(bins).fill(0),shell=[];
for(const kx of linspace(-Math.PI,Math.PI,241))for(const ky of linspace(-Math.PI,Math.PI,241)){
  const omega=2*Math.sqrt(cx*Math.sin(kx/2)**2+cy*Math.sin(ky/2)**2);
  if(Math.abs(omega-targetOmega)>tolerance||omega<1e-9)continue;
  const vx=cx*Math.sin(kx)/omega,vy=cy*Math.sin(ky)/omega,angle=Math.atan2(vy,vx);
  const bin=Math.min(bins-1,Math.floor((angle+Math.PI)/(2*Math.PI)*bins));
  angleCounts[bin]++;
  if(shell.length<500)shell.push({kx:round(kx),ky:round(ky),omega:round(omega),groupVelocity:[round(vx),round(vy)]});
}
const meanCount=angleCounts.reduce((s,x)=>s+x,0)/bins,maxCount=Math.max(...angleCounts);
const phononFocusing={springX:cx,springY:cy,targetOmega,tolerance,shellSampleCount:angleCounts.reduce((s,x)=>s+x,0),angularBins:angleCounts,peakToMean:round(maxCount/meanCount),shellPreview:shell};

// WG5: the canonical semicubical cusp as a projection singularity, with no field jump.
const cuspCurve=linspace(-1,1,121).map(u=>({u:round(u),x:round(u*u),y:round(u*u*u)}));

// WG6: a pre-existing Burgers Riemann shock. Its jump line needs no cusp construction.
const shock={equation:"u_t + (u^2/2)_x = 0",leftState:1,rightState:0,rankineHugoniotSpeed:.5,entropy:"Lax: u_L > s > u_R",profileAtT1:[{x:-1,u:1},{x:.499999,u:1},{x:.500001,u:0},{x:2,u:0}]};

const observations=[
  {blindId:"B-01",truth:"geometric_fold_caustic",features:{spatialPropagation:true,projectionRankLoss:true,higherProjectionDegeneracy:false,retardedPole:false,quantized:false,periodicCarrier:false,classicalConstitutive:false,fieldJump:false,entropyCondition:false,anisotropicGroupVelocity:false}},
  {blindId:"B-02",truth:"isolated_resonance",features:{spatialPropagation:false,projectionRankLoss:false,higherProjectionDegeneracy:false,retardedPole:true,quantized:false,periodicCarrier:false,classicalConstitutive:false,fieldJump:false,entropyCondition:false,anisotropicGroupVelocity:false}},
  {blindId:"B-03",truth:"classical_pressure_wave",features:{spatialPropagation:true,projectionRankLoss:false,higherProjectionDegeneracy:false,retardedPole:false,quantized:false,periodicCarrier:false,classicalConstitutive:true,fieldJump:false,entropyCondition:false,anisotropicGroupVelocity:false}},
  {blindId:"B-04",truth:"phonon_focusing",features:{spatialPropagation:true,projectionRankLoss:false,higherProjectionDegeneracy:false,retardedPole:false,quantized:true,periodicCarrier:true,classicalConstitutive:true,fieldJump:false,entropyCondition:false,anisotropicGroupVelocity:true}},
  {blindId:"B-05",truth:"cusp_without_shock",features:{spatialPropagation:false,projectionRankLoss:true,higherProjectionDegeneracy:true,retardedPole:false,quantized:false,periodicCarrier:false,classicalConstitutive:false,fieldJump:false,entropyCondition:false,anisotropicGroupVelocity:false}},
  {blindId:"B-06",truth:"riemann_shock_without_cusp",features:{spatialPropagation:true,projectionRankLoss:false,higherProjectionDegeneracy:false,retardedPole:false,quantized:false,periodicCarrier:false,classicalConstitutive:true,fieldJump:true,entropyCondition:true,anisotropicGroupVelocity:false}}
];
const classify=f=>{
  if(f.quantized&&f.periodicCarrier&&f.anisotropicGroupVelocity)return"phonon_focusing";
  if(f.fieldJump&&f.entropyCondition&&!f.higherProjectionDegeneracy)return"riemann_shock_without_cusp";
  if(f.higherProjectionDegeneracy&&!f.fieldJump)return"cusp_without_shock";
  if(f.projectionRankLoss&&!f.retardedPole)return"geometric_fold_caustic";
  if(f.retardedPole&&!f.spatialPropagation)return"isolated_resonance";
  if(f.classicalConstitutive&&f.spatialPropagation&&!f.quantized)return"classical_pressure_wave";
  return"underdetermined";
};
const inverseResults=observations.map(o=>({...o,predicted:classify(o.features),correct:classify(o.features)===o.truth}));

const cases=[
  {id:"WG1",name:"open-ray fold caustic without resonance",carrier:"one-parameter family of Euclidean rays",generator:"source curve plus normal direction",propagator:"q(u,s)=r_0(u)+s n(u)",projection:"(u,s) to q; det(dq/du,dq/ds)=0",detector:"sampled ray density and fold curve",positiveFinding:"regular projection rank loss",absentByConstruction:["retarded pole","cavity","quantization","shock jump"]},
  {id:"WG2",name:"isolated resonance without caustic",carrier:"one damped scalar coordinate",generator:"m q_ddot + gamma q_dot + k q = f",propagator:"chi_R(omega)=1/(k-m omega^2-i gamma omega)",projection:"none",detector:"gain magnitude and complex pole",positiveFinding:"finite-width response peak",absentByConstruction:["spatial rays","projection rank loss","caustic"]},
  {id:"WG3",name:"classical pressure wave without phonon quantization",carrier:"continuous scalar pressure field",generator:"linear acoustic wave operator",propagator:"p=A cos(kx-omega t), omega=c k",projection:"position-time readout",detector:"classical pressure amplitude",positiveFinding:"propagating compression phase",absentByConstruction:["occupation number","lattice","quantized mode"]},
  {id:"WG4",name:"anisotropic lattice phonon focusing",carrier:"periodic square lattice displacements",generator:"nearest-neighbour springs with Cx != Cy",propagator:"omega^2=4[C_x sin^2(k_x/2)+C_y sin^2(k_y/2)]",projection:"constant-frequency k-shell to group-velocity direction",detector:"angular group-velocity histogram",positiveFinding:"directional concentration of quantized lattice modes",absentByConstruction:["cavity resonance claim","shock"]},
  {id:"WG5",name:"cusp without shock",carrier:"smooth parameter line",generator:"u maps to (u^2,u^3)",propagator:"static projection",projection:"rank loss with higher degeneracy at u=0",detector:"semicubical cusp trace",positiveFinding:"pointed projection singularity",absentByConstruction:["field discontinuity","jump condition","entropy production"]},
  {id:"WG6",name:"Riemann shock without cusp construction",carrier:"scalar conservation-law field",generator:"Burgers flux f(u)=u^2/2 with step initial data",propagator:"entropy weak solution",projection:"ordinary spacetime graph",detector:"jump location and states",positiveFinding:"Rankine-Hugoniot discontinuity selected by Lax entropy",absentByConstruction:["envelope family","higher projection degeneracy","resonance"]}
];

const sx=(v,min,max,x,w)=>x+(v-min)/(max-min)*w,sy=(v,min,max,y,h)=>y+h-(v-min)/(max-min)*h;
const path=pts=>pts.map((p,i)=>`${i?"L":"M"}${round(p[0],2)},${round(p[1],2)}`).join(" ");
const panels=[];
const panel=(x,y,title,body)=>`<g transform="translate(${x} ${y})"><rect width="360" height="300" rx="12" fill="#fbfbfd" stroke="#d7dbe5"/><text x="18" y="28" font-size="17" font-weight="700" fill="#152033">${title}</text>${body}</g>`;
{
  const lines=rayFamily.map(r=>`<line x1="${sx(r.source[0],-1.1,1,28,304)}" y1="${sy(r.source[1],-.7,4.1,48,220)}" x2="${sx(r.rayEnd[0],-1.1,1,28,304)}" y2="${sy(r.rayEnd[1],-.7,4.1,48,220)}" stroke="#8ca3c7" stroke-width="1"/>`).join("");
  const cp=rayFamily.map(r=>[sx(r.caustic[0],-1.1,1,28,304),sy(r.caustic[1],-.7,4.1,48,220)]);
  const sp=rayFamily.map(r=>[sx(r.source[0],-1.1,1,28,304),sy(r.source[1],-.7,4.1,48,220)]);
  panels.push(panel(20,20,"WG1 · fold caustic",`${lines}<path d="${path(sp)}" fill="none" stroke="#152033" stroke-width="2"/><path d="${path(cp)}" fill="none" stroke="#d34a4a" stroke-width="3"/><text x="18" y="286" font-size="12" fill="#526079">rank loss · no pole</text>`));
}
{
  const max=Math.max(...resonanceCurve.map(p=>p.magnitude));
  const pts=resonanceCurve.map(p=>[sx(p.omega,0,2.5,30,300),sy(p.magnitude,0,max*1.05,50,205)]);
  panels.push(panel(400,20,"WG2 · resonance",`<line x1="30" y1="255" x2="330" y2="255" stroke="#a7adba"/><path d="${path(pts)}" fill="none" stroke="#6c52b8" stroke-width="3"/><circle cx="${sx(resonancePeak.omega,0,2.5,30,300)}" cy="${sy(resonancePeak.magnitude,0,max*1.05,50,205)}" r="5" fill="#d34a4a"/><text x="18" y="286" font-size="12" fill="#526079">pole · no spatial projection</text>`));
}
{
  const pts=pressureFrame.map(p=>[sx(p.x,0,2*Math.PI,26,308),sy(p.pressure,-1.15,1.15,58,180)]);
  panels.push(panel(780,20,"WG3 · pressure wave",`<line x1="26" y1="148" x2="334" y2="148" stroke="#a7adba"/><path d="${path(pts)}" fill="none" stroke="#247f77" stroke-width="3"/><text x="18" y="268" font-size="12" fill="#526079">continuous amplitude</text><text x="18" y="286" font-size="12" fill="#526079">no quantized occupation</text>`));
}
{
  const max=Math.max(...angleCounts),cxp=180,cyp=158,pts=angleCounts.map((count,i)=>{const ang=-Math.PI+2*Math.PI*(i+.5)/bins,r=20+92*count/max;return[cxp+r*Math.cos(ang),cyp+r*Math.sin(ang)]});pts.push(pts[0]);
  panels.push(panel(20,340,"WG4 · phonon focusing",`<circle cx="180" cy="158" r="112" fill="none" stroke="#d7dbe5"/><path d="${path(pts)} Z" fill="#e1b84b55" stroke="#b47b13" stroke-width="2"/><circle cx="180" cy="158" r="3" fill="#152033"/><text x="18" y="268" font-size="12" fill="#526079">angular peak/mean = ${phononFocusing.peakToMean}</text><text x="18" y="286" font-size="12" fill="#526079">lattice dispersion · quantized mode</text>`));
}
{
  const pts=cuspCurve.map(p=>[sx(p.x,0,1,58,260),sy(p.y,-1,1,52,200)]);
  panels.push(panel(400,340,"WG5 · cusp",`<path d="${path(pts)}" fill="none" stroke="#d34a4a" stroke-width="3"/><circle cx="58" cy="152" r="5" fill="#152033"/><text x="18" y="268" font-size="12" fill="#526079">higher projection degeneracy</text><text x="18" y="286" font-size="12" fill="#526079">continuous trace · no jump</text>`));
}
{
  const xp=sx(.5,-1,2,34,292),yTop=sy(1,-.1,1.1,52,200),yBottom=sy(0,-.1,1.1,52,200);
  panels.push(panel(780,340,"WG6 · shock",`<path d="M34,${yTop} L${xp},${yTop} L${xp},${yBottom} L326,${yBottom}" fill="none" stroke="#c74f2d" stroke-width="4"/><line x1="${xp}" y1="48" x2="${xp}" y2="254" stroke="#c74f2d" stroke-dasharray="4 4"/><text x="18" y="268" font-size="12" fill="#526079">jump + entropy condition</text><text x="18" y="286" font-size="12" fill="#526079">no envelope construction</text>`));
}
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1160" height="680" viewBox="0 0 1160 680"><rect width="1160" height="680" fill="#f1f3f7"/><text x="20" y="670" font-family="system-ui,sans-serif" font-size="12" fill="#687386">Wave geometry mechanism-separation workbench v1 · generated deterministically</text><g font-family="system-ui,sans-serif">${panels.join("")}</g></svg>\n`;
const figureSha256=crypto.createHash("sha256").update(svg).digest("hex");

const result={schemaVersion:"0.1.0",status:"neutral synthetic mechanism-separation workbench",algebra:{schema:["carrier","generator","propagator","projection","detector"],rule:"mechanism identity requires the typed chain, not a shared silhouette"},cases,calculations:{rayFamily,resonator:{omega0,gamma,pole,peak:resonancePeak,responsePreview:resonanceCurve.filter((_,i)=>i%20===0)},classicalPressure:{...acoustic,framePreview:pressureFrame.filter((_,i)=>i%10===0)},phononFocusing,cusp:{parameterization:"(x,y)=(u^2,u^3)",curvePreview:cuspCurve.filter((_,i)=>i%10===0)},shock},inverseDecompiler:{inputs:"mechanism-blind typed feature envelopes",results:inverseResults,accuracy:round(inverseResults.filter(x=>x.correct).length/inverseResults.length),warning:"perfect synthetic separation tests the typing rules, not empirical identifiability under noise or missing fields"},figure:{path:"evidence/figures/wave-geometry-mechanism-workbench-v1.svg",sha256:figureSha256},applicationBoundary:{neutral:true,notEvidenceFor:["MOND","gravitational retardation","M44","extra dimensions"],reuseGate:"an application must supply its own carrier, governing operator, parameters, data likelihood and detector model"},verdict:"the six mechanisms are separable when the carrier-generator-propagator-projection-detector chain is observed; silhouette-only input remains deliberately inadmissible"};

assert.equal(cases.length,6);
assert.ok(rayFamily.every(r=>r.curvature>0&&r.causticDistance>0));
assert.ok(new Set(rayFamily.map(r=>r.caustic[0])).size>rayFamily.length/2);
assert.ok(resonancePeak.omega>.9&&resonancePeak.omega<1.1);
assert.ok(phononFocusing.shellSampleCount>100);
assert.ok(phononFocusing.peakToMean>1.5);
assert.equal(result.inverseDecompiler.accuracy,1);
assert.equal(new Set(inverseResults.map(x=>x.predicted)).size,6);
assert.equal(result.applicationBoundary.neutral,true);

const output=`${JSON.stringify(result,null,2)}\n`;
if(process.argv.includes("--write")){
  fs.writeFileSync(new URL("../evidence/data/wave-geometry-mechanism-workbench-v1.json",import.meta.url),output);
  fs.writeFileSync(new URL("../evidence/figures/wave-geometry-mechanism-workbench-v1.svg",import.meta.url),svg);
  console.log("wrote wave geometry mechanism workbench evidence and figure");
}else console.log(output.trimEnd());
