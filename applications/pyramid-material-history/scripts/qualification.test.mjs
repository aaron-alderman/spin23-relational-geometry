import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';
import {hash,read,root} from './build.mjs';
import {executeProcess} from '../vendor/sourcery/process/surface-async-process.mjs';
import {prepareUiSurfaceComposition,verifyUiSurfaceComposition} from '../vendor/sourcery/ui/surface-composition.mjs';
import {verifyNativeSurfaceCompositionLowering} from '../vendor/sourcery/ui/native-surface-composition-lowerer.mjs';
import {filterItems,pageItems,bindArguments,declarationFor} from '../vendor/sourcery/collection-model.mjs';
import {calculateWorkedCases,calculateSystemCases,calculateInterfaceCases,assessAssemblyBenchmarks} from './worked-calculations.mjs';
import {projectTraversal,traversalCollections} from './traversal-projection.mjs';
test('traversal records resolve through the retained kernel with scoped catalogue coverage',()=>{
  const g=read('corpus/traversal-graph.json'),objects=built('data/semantic-decomposition.json').objects;
  const projection=projectTraversal(g,new Set(objects.map(o=>o.id)),new Set(atlas.operations.map(o=>o.id)));
  assert.deepEqual(projection,built('data/traversal-projection.json'));
  assert.deepEqual(projection.counts,{regions:3,facets:36,materials:18,ports:11,connections:17,candidates:6,traversals:6});
  for(const r of g.regions){assert.equal(r.axes.length,12);assert.ok(r.residuals.length>0);assert.match(r.scope,/not all/);}
  for(const k of traversalCollections)for(const r of g[k])assert.equal(objects.find(o=>o.id===r.id).kernel.context,g.protocol);
  for(const e of g.connections){const o=objects.find(o=>o.id===e.id);assert.deepEqual(o.inputs,e.inputs);assert.deepEqual(o.outputs,e.outputs);assert.equal(e.independenceEstablished,false);}
});
test('ordered routes retain prerequisites and terminate rejected shortcuts',()=>{
  const g=read('corpus/traversal-graph.json'),known=new Set(built('data/semantic-decomposition.json').objects.map(o=>o.id)),ops=new Set(atlas.operations.map(o=>o.id));
  const p=projectTraversal(g,known,ops),forward=p.routes.find(r=>r.id==='PATH-01');assert.equal(forward.steps.length,8);assert.equal(forward.end,'R-DECISION');assert.equal(forward.eligibleScientificConclusion,false);
  assert.deepEqual(forward.steps[0].additionalPrerequisites,['AX-PY-01','AX-PY-03','AX-PY-11','AX-CH-01']);
  const terminal=p.routes.find(r=>r.id==='PATH-04');assert.equal(terminal.steps.at(-1).status,'Rejected implication');
  const broken=structuredClone(g);broken.traversals[0].connections.reverse();assert.throws(()=>projectTraversal(broken,known,ops),/Disconnected/);
  const overrun=structuredClone(g);overrun.traversals[3].connections.push('EDGE-11');assert.throws(()=>projectTraversal(overrun,known,ops),/terminate/);
  const flattened=structuredClone(g);flattened.connections[0].inputs=['P-OBS'];assert.throws(()=>projectTraversal(flattened,known,ops),/joint prerequisites/);
  const authority=structuredClone(g);authority.authority.noveltyEstablished=true;assert.throws(()=>projectTraversal(authority,known,ops),/authority/);
});
test('candidate and axis contracts reject erased rivals and residuals',()=>{
  const g=read('corpus/traversal-graph.json'),known=new Set(built('data/semantic-decomposition.json').objects.map(o=>o.id)),ops=new Set(atlas.operations.map(o=>o.id));
  const rival=structuredClone(g);rival.candidates[0].strongestRival='';assert.throws(()=>projectTraversal(rival,known,ops),/rival/);
  const residual=structuredClone(g);residual.facets[0].options.pop();assert.throws(()=>projectTraversal(residual,known,ops),/residual/);
  const unresolved=structuredClone(g);unresolved.connections[0].inputs.push('invented-input');assert.throws(()=>projectTraversal(unresolved,known,ops),/Unresolved/);
});
const site=path.join(root,'_site');
const built=p=>JSON.parse(fs.readFileSync(path.join(site,p),'utf8'));
const atlas=read('corpus/atlas.json'),profiles=read('data/programme-profiles.json');
test('retained implementations keep their exact source identities',()=>{
  for(const r of read('data/reuse-lock.json').sources)assert.equal(hash(fs.readFileSync(path.join(root,r.path))),r.retainedHash,r.path);
});
test('every decomposed corpus object preserves the twelve-coordinate kernel',()=>{
  const model=built('data/semantic-decomposition.json');assert.equal(model.objects.length,462);assert.equal(new Set(model.objects.map(x=>x.id)).size,model.objects.length);
  for(const o of model.objects)assert.deepEqual(Object.keys(o.kernel).sort(),[...profiles.kernel.coordinates].sort(),o.id);assert.equal(model.conjunctiveInputs,true);
});
test('joint inputs alternatives and the pyramid case remain distinct',()=>{
  const model=built('data/semantic-decomposition.json');for(const bridge of atlas.bridges){const projected=model.objects.find(x=>x.id===bridge.id);assert.deepEqual(projected.inputs,bridge.from);assert.equal(projected.output,bridge.to);assert.equal(projected.authority.empiricalAuthority,false);}
  assert.equal(atlas.workedCase.id,'pyramids-material-history');assert.equal(atlas.workedCase.subcases[0].id,'granite-alkali-history');assert.equal(new Set(atlas.operations.map(x=>x.exclusiveOutput)).size,9);
});
test('all native page compositions and lowerings replay through the retained mechanisms',()=>{
  const receipt=built('data/publication-receipt.json');assert.equal(receipt.uiEvidence.length,333);
  for(const r of receipt.uiEvidence){const p=built('data/ui/'+(r.route.replaceAll('/','-')||'home')+'.json');assert.equal(verifyUiSurfaceComposition(p.composition).passed,true,r.route);assert.equal(verifyNativeSurfaceCompositionLowering(p).passed,true,r.route);assert.equal(p.adoption.nativeEscapes.length,0);assert.equal(p.adoption.mappings.length,p.facts.filter(f=>f.p==='isa'&&f.o==='DomNode').length);}
});
test('renderer leakage and changed native realization fail closed',()=>{
  const p=built('data/ui/home.json'),bad=structuredClone(p.composition);bad.regions[0].css='display:none';assert.throws(()=>prepareUiSurfaceComposition(bad),/renderer configuration/);const drift=structuredClone(p);drift.realization.regions[0].label='Different source';assert.equal(verifyNativeSurfaceCompositionLowering(drift).passed,false);
});
test('existing collection grammar controls labels paths page sizes and action arguments',()=>{
  const definition={id:'arbitrary',source:{tool:'records',path:['objects']},title:'Unrelated records',filters:[{id:'q',kind:'search',label:'Source-owned label',path:['name'],operator:'contains-folded'}],pagination:{defaultSize:1,sizes:[1,2]},actions:[]};const rows=[{name:'Alpha',target:'a/'},{name:'Beta',target:'b/'}];
  assert.equal(filterItems(rows,definition,{q:'BETA'})[0].name,'Beta');assert.equal(pageItems(rows,definition,{},1,2).items.length,2);assert.throws(()=>pageItems(rows,definition,{},1,3),/not declared/);assert.deepEqual(bindArguments({href:{itemPath:['target']}},rows[1]),{href:'b/'});assert.equal(declarationFor({collections:[]},'records',['objects']),undefined);
});
test('the real composer retains dimensions and refuses historical authority inflation',async()=>{
  const process=read('data/scientific-derivation-process.json'),projection=built('data/record-composition.json');assert.equal(projection.positive.candidates.length,1);assert.equal(projection.historical.candidates.length,0);
  const graph=structuredClone(projection.graph);graph.transformations[0].dimensionDelta.time=1;const {result}=await executeProcess(process.program,{model:process,request:{graph,query:{source:'source-records',target:'published-reading',maxDepth:4}}},{compute:{},ports:{}});assert.equal(result.candidates.length,0);
  const missing=structuredClone(projection.graph);delete missing.transformations[0].dimensionRule;const response=await executeProcess(process.program,{model:process,request:{graph:missing,query:{source:'source-records',target:'published-reading',maxDepth:4}}},{compute:{},ports:{}});assert.equal(response.result.candidates.length,0);
});
test('every generated page has a current hash and its local links resolve under a project path',()=>{
  const pages=built('data/pages.json');let links=0;for(const p of pages){const file=path.join(site,p.route,'index.html'),html=fs.readFileSync(file,'utf8');assert.equal(hash(html),p.sourceHash,p.route);assert.ok(html.includes('type="importmap"'));assert.ok(!html.includes('C:/Users/'));
    for(const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)){const value=match[1];if(/^(https?:|data:|mailto:)/.test(value))continue;const target=path.resolve(path.dirname(file),decodeURIComponent(value));assert.ok(target.startsWith(site+path.sep)||target===site,'path escape '+value);assert.ok(fs.existsSync(target),p.route+' → '+value);links++;}}
  assert.ok(links>1000);
});
test('the full article retains the pyramid case and renders mathematics',()=>{
  const html=fs.readFileSync(path.join(site,'read/index.html'),'utf8');assert.ok(html.includes('The pyramids are the canonical example'));assert.ok(html.includes('katex-display'));assert.ok(html.includes('Granite and alkali treatment within the pyramid case'));assert.ok(html.includes('North Face Corridor'));
});
test('publication carries no new runtime lane or empirical admission claim',()=>{
  const receipt=built('data/publication-receipt.json');assert.equal(receipt.recordComposition.historicalPromotionCandidates,0);assert.equal(receipt.recordComposition.authorityCeiling,'proposal-only; non-entailing; no empirical authority');assert.ok(receipt.boundaries.includes('No new Sourcery lane, registry, scheduler or interpreter.'));
});
test('worked investigations retain atomic outputs conjunctive inputs and resolved evidence',()=>{
  const work=read('corpus/worked-investigations.json'),objects=built('data/semantic-decomposition.json').objects,ids=new Set(objects.map(o=>o.id));
  assert.equal(work.studies.length,18);assert.equal(work.studies.flatMap(s=>s.steps).length,92);
  for(const s of work.studies)for(const step of s.steps){assert.ok(atlas.operations.some(o=>o.id===step.operation));assert.ok(step.output);assert.ok(step.paragraphs.every(p=>p.trim().length>0));assert.deepEqual(objects.find(o=>o.id===step.id).inputs,step.inputs);for(const id of [...step.inputs,...step.evidenceRefs])assert.ok(ids.has(id),step.id+' unresolved '+id);}
  assert.equal(work.studies[2].steps.find(s=>s.matrix).matrix.length,5);
  for(const s of work.studies){const html=fs.readFileSync(path.join(site,'studies',s.id,'index.html'),'utf8');for(const step of s.steps)assert.ok(html.includes('id="'+step.id+'"'));assert.ok(!html.includes('Not supplied in this record.'));}
  assert.deepEqual(built('data/publication-receipt.json').workedInvestigations,{studies:18,steps:92,calculations:32,experimentPerformed:false,monumentSampled:false,historicalAttribution:false});
});
test('worked arithmetic conserves formula mass and exposes rate and detection assumptions',()=>{
  const input=read('corpus/calculation-inputs.json'),output=calculateWorkedCases(input,read('corpus/evidence-audit.json'),read('corpus/removal-evidence.json'),read('corpus/construction-system.json'),read('corpus/interface-evidence.json')),c=id=>output.calculations.find(c=>c.id===id);
  assert.equal(c('C02').rows[0][1],0.001);assert.equal(c('C02').rows[1][1],2.65);
  assert.ok(c('C01').rows[0][1]>1.763&&c('C01').rows[0][1]<1.765);
  // Independent product-side formula accounting for the carbonate balance.
  const metasilicateMass=2*22.98976928+28.0855+3*15.9994;
  assert.ok(Math.abs(60.0843+105.9884-metasilicateMass-44.0095)<0.001);
  for(const row of c('C03').rows)assert.ok(Math.abs(row[1]*row[2]-1000)<1e-8);
  assert.ok(c('C04').rows[1][1]>134&&c('C04').rows[1][1]<136);
  const sameT=structuredClone(input);sameT.temperaturesK.high=sameT.temperaturesK.low;assert.equal(calculateWorkedCases(sameT).calculations.find(c=>c.id==='C04').rows[1][1],1);
  const impossible=structuredClone(input);impossible.detectionScenarios[0].survivalGivenFormation=0;assert.equal(calculateWorkedCases(impossible).calculations.find(c=>c.id==='C05').rows[0][2],1);
  assert.equal(c('C06').rows[1][1],0);assert.ok(c('C06').rows[0][1]>0.64&&c('C06').rows[0][1]<0.65);
  assert.deepEqual(built('data/worked-calculations.json'),output);
});
test('retained composer checks real quantity dimensions and rejects a corrupted molar-volume map',async()=>{
  const report=built('data/worked-quantity-composition.json'),process=read('data/scientific-derivation-process.json');assert.equal(report.results.length,5);for(const result of report.results)assert.equal(result.candidates.length,1);
  const graph=structuredClone(report.graph);graph.transformations[1].dimensionDelta.amount=0;
  const response=await executeProcess(process.program,{model:process,request:{graph,query:{source:'quartz-molar-flux',target:'quartz-recession-speed',maxDepth:1}}},{compute:{},ports:{}});assert.equal(response.result.candidates.length,0);
  const wrongDensity=structuredClone(report.graph);wrongDensity.transformations.find(t=>t.id==='inverse-density-map').dimensionDelta.mass=0;
  const rejected=await executeProcess(process.program,{model:process,request:{graph:wrongDensity,query:{source:'granite-mass-flux',target:'granite-equivalent-recession',maxDepth:1}}},{compute:{},ports:{}});assert.equal(rejected.result.candidates.length,0);
});
test('factorial demonstration separates conditional effects and rejects missing or aliased cells',()=>{
  const p=read('corpus/calculation-inputs.json'),calcs=calculateWorkedCases(p).calculations,f=calcs.find(c=>c.id==='C07');
  assert.deepEqual(f.rows.map(r=>r[1]),[1,7,4,7,6,11]);assert.ok(f.scope.includes('SYNTHETIC'));
  const additive=structuredClone(p);additive.variation.factorialCells.find(c=>c.heat===1&&c.alkali===1).responseMg=6;assert.equal(calculateWorkedCases(additive).calculations.find(c=>c.id==='C07').rows[4][1],0);
  const reordered=structuredClone(p);reordered.variation.factorialCells.reverse();assert.deepEqual(calculateWorkedCases(reordered).calculations.find(c=>c.id==='C07').rows,f.rows);
  const missing=structuredClone(p);missing.variation.factorialCells.pop();assert.throws(()=>calculateWorkedCases(missing),/complete/);
  const alias=structuredClone(p);alias.variation.factorialCells[1]=alias.variation.factorialCells[0];assert.throws(()=>calculateWorkedCases(alias),/complete/);
});
test('sensitivity invariance and bottleneck transfer keep different time metrics distinct',()=>{
  const p=read('corpus/calculation-inputs.json'),calcs=calculateWorkedCases(p).calculations,grid=calcs.find(c=>c.id==='C08').rows,pipe=calcs.find(c=>c.id==='C09').rows;
  const equalScale=grid.filter(r=>r[0]===r[1]);for(const r of equalScale)assert.ok(Math.abs(r[2]-equalScale[0][2])<1e-10);
  assert.deepEqual(pipe.map(r=>r.slice(2)),[[8,17,89],[4,13,49],[4,11,47]]);assert.equal(pipe[2][1],'Inspection/release');
  const single=structuredClone(p);single.variation.pipeline.batchSize=1;for(const r of calculateWorkedCases(single).calculations.find(c=>c.id==='C09').rows)assert.equal(r[3],r[4]);
  const bad=structuredClone(p);bad.variation.sensitivityMultipliers[0]=0;assert.throws(()=>calculateWorkedCases(bad),/positive/);
  const housing=calcs.find(c=>c.id==='C10');assert.ok(Math.abs(housing.rows[1][1]-11385)<1e-8);assert.ok(housing.rows[1][2]>2.13&&housing.rows[1][2]<2.15);
});
test('source-reported EDS entries preserve location units precision and inherited provenance',()=>{
  const audit=read('corpus/evidence-audit.json'),calcs=calculateWorkedCases(read('corpus/calculation-inputs.json'),audit).calculations;
  assert.equal(audit.measurements.length,5);assert.equal(new Set(audit.measurements.map(m=>m.id)).size,5);
  assert.equal(audit.measurements.find(m=>m.id==='M-LAUER-NEAR').PAtPercent,'3.21');assert.equal(audit.measurements.find(m=>m.id==='M-LAUER-INTERIOR').PAtPercent,'0.21');
  assert.equal(audit.measurementContext.reportedAnalyticalUncertainty,null);assert.equal(audit.measurementContext.exactInsetDepthCoordinatesMm,null);assert.equal(audit.measurementContext.allElementsTranscribed,false);assert.equal(audit.measurementContext.independentReplicateDesignEstablished,false);
  const c=calcs.find(c=>c.id==='C12');assert.equal(c.rows[0][1],3);assert.ok(Math.abs(c.rows[1][1]-107/7)<1e-12);assert.ok(c.rows[4][1]<c.rows[1][1]&&c.rows[5][1]>c.rows[1][1]);assert.equal(c.dataClass,'derived-from-reported-measurements');assert.equal(calcs.find(c=>c.id==='C11').dataClass,'reported-measurement-transcription');
  const wrong=structuredClone(audit);wrong.measurements.find(m=>m.id==='M-LAUER-INTERIOR').PAtPercent='0.00';assert.throws(()=>calculateWorkedCases(read('corpus/calculation-inputs.json'),wrong),/transcription/);
  const missing=structuredClone(audit);missing.measurements=missing.measurements.filter(m=>m.id!=='M-LAUER-NEAR');assert.throws(()=>calculateWorkedCases(read('corpus/calculation-inputs.json'),missing),/located/);
  const wrongUnits=structuredClone(audit);wrongUnits.measurementContext.units='mass-percent';assert.throws(()=>calculateWorkedCases(read('corpus/calculation-inputs.json'),wrongUnits),/units/);
});
test('coverage spans every bridge without converting review scope into a truth score',()=>{
  const rows=read('corpus/evidence-coverage.json').rows,ids=new Set(built('data/semantic-decomposition.json').objects.map(o=>o.id));
  assert.deepEqual(rows.flatMap(r=>r.bridgeRefs).sort(),atlas.bridges.map(b=>b.id).sort());assert.equal(rows.filter(r=>r.reviewStatus==='Focused review').length,8);
  for(const row of rows){assert.ok(row.gaps.length);assert.equal(row.score,undefined);for(const id of [...row.bridgeRefs,...row.modelRefs,...row.studyRefs])assert.ok(ids.has(id),id);}
  const receipt=built('data/publication-receipt.json');assert.deepEqual(receipt.evidenceAudit,{reportedSpecimens:4,transcribedEntries:5,coverageBridges:26,rawSpectraInspected:false,newMeasurements:false});
  assert.equal(built('data/semantic-decomposition.json').objects.find(o=>o.id==='C11').inputs.length,5);
});

test('removal records preserve source units missing entries and conditional authority',()=>{
  const r=read('corpus/removal-evidence.json'),p=read('corpus/calculation-inputs.json');
  const calculate=v=>calculateWorkedCases(p,undefined,v).calculations;
  const cs=calculate(r),c=id=>cs.find(c=>c.id===id);
  assert.equal(r.records.length,7);
  assert.equal(r.records.find(v=>v.id==='M-CUI-ORIGINAL').phasePercent.Amorphous,null);
  assert.equal(c('C15').rows[0].at(-1),'—');
  assert.equal(c('C13').dataClass,'reported-measurement-transcription');
  assert.equal(c('C14').dataClass,'source-based-conditional-scenario');
  assert.equal(c('C16').dataClass,'source-based-conditional-scenario');
  assert.equal(r.records.find(v=>v.id==='M-HILLSON-RATE').trialPairingExtracted,false);
  const ids=new Set(built('data/semantic-decomposition.json').objects.map(o=>o.id));
  for(const record of r.records)for(const ref of record.evidenceRefs)assert.ok(ids.has(ref));
  const wrong=structuredClone(r);wrong.records[0].unit='mol m-2 s-1';assert.throws(()=>calculate(wrong),/mass-flux/);
  const reversed=structuredClone(r);reversed.records[0].upper='0.01';assert.throws(()=>calculate(reversed),/ordered/);
});

test('mass flux conversion conserves removed mass under area and density changes',()=>{
  const r=read('corpus/removal-evidence.json'),p=read('corpus/calculation-inputs.json');
  const calc=v=>calculateWorkedCases(p,undefined,v).calculations.find(c=>c.id==='C14').rows;
  const rows=calc(r);
  assert.ok(Math.abs(rows[0][1]-1/15)<1e-12);assert.ok(Math.abs(rows[1][2]-7.5)<1e-12);
  for(const row of rows){assert.ok(Math.abs(row[1]*row[2]-1)<1e-12);assert.ok(Math.abs(row[3]*row[2]-2.7)<1e-12);}
  const area=structuredClone(r);area.conditionalInputs.projectedAreaM2*=2;
  calc(area).forEach((row,i)=>{assert.equal(row[1],rows[i][1]);assert.equal(row[2],rows[i][2]);assert.equal(row[3],2*rows[i][3]);});
  const density=structuredClone(r);density.conditionalInputs.graniteDensityKgPerM3*=2;
  calc(density).forEach((row,i)=>{assert.equal(row[1],rows[i][1]/2);assert.equal(row[2],rows[i][2]*2);assert.equal(row[3],rows[i][3]);});
});

test('a changing denominator permits opposite absolute-stock conclusions',()=>{
  const r=read('corpus/removal-evidence.json'),p=read('corpus/calculation-inputs.json');
  const calc=v=>calculateWorkedCases(p,undefined,v).calculations.find(c=>c.id==='C16').rows;
  const rows=calc(r),low=rows.find(v=>v[0]==='S2 K-feldspar'&&v[1]===.4),high=rows.find(v=>v[0]==='S2 K-feldspar'&&v[1]===.6);
  assert.ok(Math.abs(low[2]-.204)<1e-12);assert.ok(low[3]<0);assert.ok(high[3]>0);
  const threshold=structuredClone(r);threshold.conditionalInputs.retainedMassFractions=[.5];
  assert.equal(calc(threshold).find(v=>v[0]==='S3 quartz')[3],0);
  const invalid=structuredClone(r);invalid.conditionalInputs.retainedMassFractions=[1.1];assert.throws(()=>calc(invalid),/retained-mass/);
});

test('construction packages preserve resolved identities and distinguish context from evidence',()=>{
  const system=read('corpus/construction-system.json'),objects=built('data/semantic-decomposition.json').objects,ids=new Set(objects.map(o=>o.id));
  assert.equal(system.workPackages.length,9);assert.equal(new Set(system.workPackages.map(w=>w.study)).size,9);
  for(const wp of system.workPackages)assert.ok(ids.has(wp.study));
  for(const o of [...system.components,...system.histories,...system.decisions,...system.observations]){
    assert.ok(ids.has(o.id));for(const ref of [...(o.evidenceRefs||[]),...(o.related||[]),...(o.dependencies||[]),...(o.counterevidence||[])])assert.ok(ids.has(ref),o.id+' unresolved '+ref);
  }
  for(const h of system.histories){assert.ok(h.sequence.length>=5);assert.ok(h.predictions.length);assert.ok(h.qualifications.length);assert.ok(h.dependencyMeaning.includes('does not assert'));assert.deepEqual(objects.find(o=>o.id===h.id).inputs,h.dependencies);}
  for(const d of system.decisions){assert.ok(d.retirementRule);assert.equal(d.status,'Open empirical decision');assert.equal(d.score,undefined);}
  assert.equal(system.sourceCapture.surveyTableVisuallyChecked,true);assert.equal(system.sourceCapture.primaryPdfsPublished,false);
  assert.equal(built('data/publication-receipt.json').constructionSystem.verifiedAbatement,false);
});

test('geometric demand retains scale and component boundaries',()=>{
  const system=read('corpus/construction-system.json'),calc=s=>calculateSystemCases(s),c=(s,id)=>calc(s).find(c=>c.id===id);
  assert.equal(c(system,'C17').rows[0][2],'230.329');
  const v=c(system,'C18').rows[0][1],twice=structuredClone(system);twice.geometry.heightM*=2;assert.equal(c(twice,'C18').rows[0][1],2*v);
  for(const row of c(system,'C18').rows.slice(3))assert.ok(row[1]>0&&row[1]<v);
  const bad=structuredClone(system);bad.geometry.innerLinearScales=[1.1];assert.throws(()=>calc(bad),/inner linear/);
  const unit=structuredClone(system);unit.observations[0].unit='cm';assert.throws(()=>calc(unit),/metres/);
  assert.ok(c(system,'C18').scope.includes('not net masonry'));
});

test('resource bottlenecks and availability constrain the same accepted output',()=>{
  const s=read('corpus/construction-system.json'),rows=v=>calculateSystemCases(v).find(c=>c.id==='C19').rows,value=(v,label)=>rows(v).find(r=>r[0]===label)[1];
  assert.equal(value(s,'Availability-adjusted limiting capacity'),3.5);
  const upstream=structuredClone(s);upstream.resources.stageCapacitiesM3PerDay['Quarry/preparation']*=2;assert.equal(value(upstream,'Batch throughput duration lower bound'),value(s,'Batch throughput duration lower bound'));
  const half=structuredClone(s);half.resources.availability/=2;assert.equal(value(half,'Batch throughput duration lower bound'),2*value(s,'Batch throughput duration lower bound'));
  const invalid=structuredClone(s);invalid.resources.availability=1.01;assert.throws(()=>rows(invalid),/availability/);
});

test('chronology and inverse examples do not identify an event or a full detector record',()=>{
  const s=read('corpus/construction-system.json'),cs=calculateSystemCases(s),chrono=cs.find(c=>c.id==='C20'),inverse=cs.find(c=>c.id==='C21');
  assert.deepEqual(chrono.rows.slice(0,3).map(r=>r[1]),[-2550,-2600,-2750]);
  const opacity=inverse.rows.map(r=>r[2]);for(const x of opacity)assert.ok(Math.abs(x-24000)<1e-8);
  assert.notDeepEqual(s.inverse.paths[0].segments,s.inverse.paths[1].segments);assert.ok(inverse.scope.includes('No real muon counts'));
  const bad=structuredClone(s);bad.chronology.repairYear=-3000;assert.throws(()=>calculateSystemCases(bad),/Chronology/);
});

test('reaction and transport coupling respects limiting coefficients and thermal invariance',()=>{
  const s=read('corpus/construction-system.json'),rows=v=>calculateSystemCases(v).find(c=>c.id==='C22').rows;
  for(const row of rows(s)){assert.ok(row[3]<=row[1]);assert.ok(row[3]<=row[2]);assert.ok(row[4]>0);}
  const flat=structuredClone(s);flat.surface.activationKJPerMol=0;const r=rows(flat);assert.deepEqual(r.slice(0,2).map(v=>v.slice(1)),r.slice(2).map(v=>v.slice(1)));
  const cold=structuredClone(s);cold.surface.referenceK=0;assert.throws(()=>rows(cold),/Kelvin|regime/);
});

test('housing takeoff and budget preserve area tax scope and candidate overhead',()=>{
  const s=read('corpus/construction-system.json'),cs=calculateSystemCases(s),geo=cs.find(c=>c.id==='C23'),cost=cs.find(c=>c.id==='C24'),value=(table,label)=>table.rows.find(r=>r[0]===label)[1];
  assert.equal(value(geo,'Floor footprint'),180);assert.equal(value(geo,'External perimeter'),54);assert.ok(Math.abs(value(geo,'Net external wall assembly area')-116.64)<1e-10);assert.equal(value(geo,'Planar slab benchmark volume'),18);
  const direct=value(cost,'Direct package subtotal'),base=value(cost,'Direct-cost multiplier 1 · total');assert.equal(direct,376000);assert.ok(Math.abs(base-523204)<1e-8);
  assert.ok(value(cost,'Candidate total with 20% assigned wall-package saving plus added direct cost')>base);assert.ok(value(cost,'Candidate total with 50% assigned wall-package saving plus added direct cost')<base);
  const noTax=structuredClone(s);noTax.housing.gst=0;const untaxed=calculateSystemCases(noTax).find(c=>c.id==='C24');assert.ok(Math.abs(value(untaxed,'Direct-cost multiplier 1 · total')*1.1-base)<1e-8);
  const wrong=structuredClone(s);wrong.housing.widthM=13;assert.throws(()=>calculateSystemCases(wrong),/floor geometry/);
});

test('lifecycle penalties and scenario regret retain decision meaning',()=>{
  const s=read('corpus/construction-system.json'),cs=calculateSystemCases(s),carbon=cs.find(c=>c.id==='C25'),regret=cs.find(c=>c.id==='C26');
  assert.ok(carbon.rows[0][2]>0);assert.ok(carbon.rows[1][2]<0);assert.equal(carbon.rows[0][2]-carbon.rows[1][2],5000);
  assert.deepEqual(regret.rows,[['Action A',0,30,30],['Action B',20,0,20]]);assert.equal(regret.declaredInputs['Preferred action'],'Action B');assert.ok(regret.scope.includes('SYNTHETIC'));assert.ok(regret.scope.includes('Not historical probabilities'));
  const incomplete=structuredClone(s);incomplete.decisionScenario.actions[0].costs.pop();assert.throws(()=>calculateSystemCases(incomplete),/complete/);
});

test('all new dimensional maps reject undeclared physical rulers',async()=>{
  const report=built('data/worked-quantity-composition.json'),process=read('data/scientific-derivation-process.json');
  for(const id of ['concentration-driving-map','slab-thickness-map']){
    const graph=structuredClone(report.graph),edge=graph.transformations.find(v=>v.id===id);edge.dimensionDelta.current=1;
    const response=await executeProcess(process.program,{model:process,request:{graph,query:{source:edge.from,target:edge.to,maxDepth:1}}},{compute:{},ports:{}});
    assert.equal(response.result.candidates.length,0,id);
  }
});

test('interface evidence preserves source roles context and unresolved assemblies',()=>{
  const e=read('corpus/interface-evidence.json'),objects=built('data/semantic-decomposition.json').objects,ids=new Set(objects.map(o=>o.id));
  assert.equal(e.records.length,9);assert.equal(e.assemblies.length,3);assert.equal(e.primaryDocumentsPublished,false);
  for(const v of [...e.records,...e.assemblies])for(const ref of [...v.evidenceRefs,...(v.related||[])])assert.ok(ids.has(ref),v.id+' → '+ref);
  assert.equal(e.records.find(v=>v.id==='M-GIZA-T17').rows[2][2],'1:2.1');
  assert.equal(objects.find(v=>v.id==='C30').kind,'source-reported-product-declaration');
  assert.deepEqual(built('data/assembly-assessment.json').records,assessAssemblyBenchmarks(e));
  for(const result of assessAssemblyBenchmarks(e)){assert.equal(result.wholeAssemblyCostAUD,null);assert.equal(result.wholeLifeGwpKgCO2e,null);assert.equal(result.eligibleForWholeAssemblyRanking,false);assert.ok(result.missing.length);}
  const zero=structuredClone(e);zero.assemblyInventory['ASM-M2'].wholeAssemblyCostAUD=0;assert.throws(()=>assessAssemblyBenchmarks(zero),/Missing assembly totals/);
  const ranked=structuredClone(e);ranked.comparability.wholeAssemblyRankingAllowed=true;assert.throws(()=>assessAssemblyBenchmarks(ranked),/withhold ranking/);
});

test('hydration and lime-cycle balances conserve the declared physical species',()=>{
  const e=read('corpus/interface-evidence.json'),s=read('corpus/construction-system.json'),cs=calculateInterfaceCases(e,s),m=e.chemistry.molarMassGPerMol;
  assert.ok(Math.abs(m.CaO+m.H2O-m.CaOH2)<1e-10);assert.ok(Math.abs(m.CaO+m.CO2-m.CaCO3)<1e-10);
  const hydration=cs.find(c=>c.id==='C28');for(const row of hydration.rows)assert.ok(Math.abs(row[2]-row[1]-1)<1e-12);
  assert.ok(hydration.rows[0][1]>.18&&hydration.rows[0][1]<.19);
  const cycle=cs.find(c=>c.id==='C29');assert.ok(Math.abs(cycle.rows[1][1]+cycle.rows[2][1]-1)<1e-12);assert.equal(cycle.rows[2][1],cycle.rows[3][1]);assert.equal(cycle.rows[4][1],0);assert.ok(cycle.scope.includes('No net carbon removal'));
});

test('EPD declarations retain missing modules indicator and incompatible bases',()=>{
  const e=read('corpus/interface-evidence.json'),s=read('corpus/construction-system.json'),c=calculateInterfaceCases(e,s).find(c=>c.id==='C30');
  assert.equal(c.rows.find(r=>r[0].startsWith('Midland')&&r[2]==='A4')[3],'ND');
  assert.equal(c.rows.find(r=>r[0].startsWith('Hardie')&&r[2]==='C3')[3],'0.00E+00');
  assert.equal(c.rows.find(r=>r[0].startsWith('Midland')&&r[2]==='D')[3],'-7.05E+00');
  assert.equal(c.dataClass,'reported-product-declaration');
  const unit=structuredClone(e);unit.records.find(v=>v.id==='P-MIDLAND-EPD').declaredUnit='1 kg';assert.throws(()=>calculateInterfaceCases(unit,s),/declared units/);
  const indicator=structuredClone(e);indicator.records.find(v=>v.id==='P-HARDIE6').indicator='GWP-GHG';assert.throws(()=>calculateInterfaceCases(indicator,s),/GWP-total/);
});

test('purchased packs use the dated GST-inclusive price without inventing installed costs',()=>{
  const e=read('corpus/interface-evidence.json'),s=read('corpus/construction-system.json'),calc=(v,sys=s)=>calculateInterfaceCases(v,sys).find(c=>c.id==='C31'),get=(c,name)=>c.rows.find(r=>r[0]===name)[1],c=calc(e);
  assert.equal(get(c,'Masonry 1 leaf · selected whole packs'),17);assert.equal(get(c,'Masonry 2 leaf · selected whole packs'),33);
  assert.equal(get(c,'Masonry 1 leaf · listed material purchase'),'5427.08');assert.equal(get(c,'Masonry 2 leaf · listed material purchase'),'10534.92');assert.equal(get(c,'Masonry 1 leaf · ordered units'),2346);
  const mass=get(c,'Masonry 1 leaf · installed mass lower'),gwp=get(c,'Masonry 1 leaf · installed product A1-A3 lower');assert.ok(Math.abs(gwp/mass-.198)<1e-12);
  const bigger=structuredClone(s);bigger.housing.lengthM*=2;bigger.housing.widthM*=2;const doubled=calc(e,bigger);assert.ok(Math.abs(get(doubled,'Masonry 1 leaf · installed equivalent units')-2*get(c,'Masonry 1 leaf · installed equivalent units'))<1e-8);
  const bad=structuredClone(e);bad.records.find(v=>v.id==='P-MAXIBRICK').selectedPackUnits=0;assert.throws(()=>calc(bad),/pack inputs/);
});

test('thermal guide paths remain conditional and obey inverse resistance scaling',()=>{
  const e=read('corpus/interface-evidence.json'),s=read('corpus/construction-system.json'),calc=v=>calculateInterfaceCases(v,s).find(c=>c.id==='C32');
  for(const row of calc(e).rows){assert.ok(Math.abs(row[2]*row[3]-1)<1e-12);assert.ok(Math.abs(row[4]*row[2]-1166.4)<1e-8);}
  const more=structuredClone(e);more.assumptions.idealInsulationR*=2;assert.ok(calc(more).rows[0][4]<calc(e).rows[0][4]);assert.ok(calc(e).scope.includes('Not measured'));
});
