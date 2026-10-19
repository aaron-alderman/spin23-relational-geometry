import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const current = "C:/Users/aaron/sourcery/.consolidation/temple-supervisor/runtime/2026-10-17-recovery-await-v8r6";
const generations = "C:/Users/aaron/sourcery/.consolidation/temple-supervisor/generations";
const predecessorGeneration = "host-recovery-await-v8r6";
const successorVersion = "2026-10-17-scientific-derivation-composer-v15";
const successorGeneration = "host-scientific-derivation-composer-v15";
const successorRoot = `C:/Users/aaron/sourcery/.consolidation/temple-supervisor/runtime/${successorVersion}`;
const sha = value => createHash("sha256").update(value).digest("hex");
const bytes = value => Buffer.byteLength(value);
const exactReplace = (source, needle, replacement) => {
  if (source.split(needle).length !== 2) throw new Error(`Expected one replacement site: ${needle.slice(0, 80)}`);
  return source.replace(needle, replacement);
};

const [manifestText, generationText, controlOriginal, supervisorOriginal, processOriginal, derivationText, pilotText] = await Promise.all([
  readFile(`${current}/manifest.json`, "utf8"),
  readFile(`${generations}/${predecessorGeneration}.json`, "utf8"),
  readFile(`${current}/runtime-package-control.mjs`, "utf8"),
  readFile(`${current}/supervisor-mcp.mjs`, "utf8"),
  readFile(`${current}/runtime-package-process.json`, "utf8"),
  readFile(new URL("./scientific-derivation-process.json", import.meta.url), "utf8"),
  readFile(new URL("./standard-model-stress-pilot.json", import.meta.url), "utf8")
]);
const currentManifest = JSON.parse(manifestText);
const currentGeneration = JSON.parse(generationText);
const derivation = JSON.parse(derivationText);
const pilot = JSON.parse(pilotText);

// The v8r6 base already owns an `exactKeys` validator. Preserve its behavior under
// an explicit owner-specific name before adding the derivation validator.
let control = controlOriginal.replaceAll("exactKeys", "runtimePackageExactKeys");
control = exactReplace(control,
  " config=Object.freeze(clone(config));model=clone(model);",
  ` config=Object.freeze(clone(config));model=clone(model);\n const signatureKeys=['basis','cp','domain','order','rank','regime','scheme','support','symmetry','variance'];\n const exactKeys=(value,keys)=>value&&Object.getPrototypeOf(value)===Object.prototype&&Object.keys(value).sort().join(',')===[...keys].sort().join(',');\n const validSignature=value=>exactKeys(value,signatureKeys)&&Number.isSafeInteger(value.rank)&&value.rank>=0&&value.rank<=8&&signatureKeys.filter(k=>k!=='rank').every(k=>typeof value[k]==='string'&&value[k].length>0&&value[k].length<=160);\n const validateDerivationRequest=request=>{\n  if(!exactKeys(request,['graph','query'])||!exactKeys(request.graph,['objects','transformations'])||!exactKeys(request.query,['maxDepth','source','target'])||!Array.isArray(request.graph.objects)||!Array.isArray(request.graph.transformations)||request.graph.objects.length<2||request.graph.objects.length>128||request.graph.transformations.length<1||request.graph.transformations.length>256||!Number.isSafeInteger(request.query.maxDepth)||request.query.maxDepth<1||request.query.maxDepth>6||typeof request.query.source!=='string'||typeof request.query.target!=='string'||request.query.source.length>160||request.query.target.length>160||canonicalJson(request).length>524288)fail('Bounded scientific derivation request required.');\n  for(const object of request.graph.objects)if(!exactKeys(object,['id','signature'])||typeof object.id!=='string'||!object.id||object.id.length>160||!validSignature(object.signature))fail('Typed scientific object signature required.');\n  const ruleKeys=['analogyOnly','assumptions','authority','changes','evidenceRefs','from','fromSignature','id','kind','losses','removes','to','toSignature'];\n  for(const rule of request.graph.transformations){if(!exactKeys(rule,ruleKeys)||!['id','kind','from','to'].every(k=>typeof rule[k]==='string'&&rule[k]&&rule[k].length<=160)||!validSignature(rule.fromSignature)||!validSignature(rule.toSignature)||!['changes','assumptions','losses','removes','evidenceRefs'].every(k=>Array.isArray(rule[k])&&rule[k].length<=32&&rule[k].every(v=>typeof v==='string'&&v.length>0&&v.length<=500))||typeof rule.analogyOnly!=='boolean'||!exactKeys(rule.authority,['empiricalAuthority','entails','proposalOnly'])||rule.authority.proposalOnly!==true||rule.authority.entails!==false||rule.authority.empiricalAuthority!==false)fail('Bounded typed scientific transformation required.');}\n  return clone(request);\n };\n if(model.scientificDerivation?.protocol!=='scientific-derivation-composition/common-algebra-1'||!Array.isArray(model.scientificDerivation.program))fail('Scientific derivation grammar required.');\n const derivationPilot=JSON.parse(fs.readFileSync(path.join(directory,'scientific-derivation-pilot.json'),'utf8'));\n if(derivationPilot.protocol!=='standard-model-stress-response-pilot/1')fail('Standard Model stress pilot required.');\n const composeDerivation=async request=>{request=validateDerivationRequest(request);const env=await executeProcess(model.scientificDerivation.program,{model:model.scientificDerivation,request},{compute:{},ports:{}}),result=env.result;return{...result,receipt:{...result.receipt,grammarHash:sha(canonicalJson(model.scientificDerivation)),requestHash:sha(canonicalJson(request)),runtimeAction:'temple_runtime_package.compose-derivation'}};};`);

const selfStart = control.indexOf(" const selfCheck=()=>{");
const selfEnd = control.indexOf("\n\n const capture=", selfStart);
if (selfStart < 0 || selfEnd < 0) throw new Error("self-check block not found");
let selfCheck = ` const selfCheck=async()=>{const sourceHash=sha(fs.readFileSync(path.join(directory,'runtime-package-control.mjs'))),phaseIds=sessionModel.phases.map(p=>p.id),derivation=await composeDerivation({graph:derivationPilot.graph,query:derivationPilot.query}),invalid=new Map(derivation.invalidRules.map(row=>[row.rule.id,row])),cases=[\n  {id:'interrupted-resume',passed:sessionModel.invariants.includes('intent-before-effect-and-exact-readback-reconciliation')},\n  {id:'reordered-segment',passed:sessionModel.invariants.includes('next-index-only')},\n  {id:'missing-segment-finalize',passed:sessionModel.invariants.includes('complete-count-and-aggregate-required')},\n  {id:'stale-basis',passed:sessionModel.invariants.includes('exact-snapshot-cursor')},\n  {id:'idempotent-retry',passed:sessionModel.invariants.includes('immutable-segment-identity')},\n  {id:'changed-owner-model-binding',passed:sourceHash===sessionModel.ownerBinding.successorSha256&&sessionModel.ownerBinding.predecessorSha256!==sourceHash},\n  {id:'grammar-phase-injection',passed:new Set(phaseIds).size===phaseIds.length&&sessionModel.phaseInjection==='registered-ports-only'},\n  {id:'generated-view-materialization',passed:sessionModel.materialization?.protocol==='deterministic-context-view/common-algebra-1'&&sessionModel.materialization.encoding==='compact-json-newline'&&sessionModel.phases.some(p=>p.port==='materialize')},\n  {id:'derivation-known-chain',passed:derivation.candidates.length===2&&derivation.candidates.every(row=>row.steps.length===4)},\n  {id:'derivation-information-loss',passed:derivation.candidates.every(row=>row.losses.includes('subtraction-polynomial information')&&row.losses.includes('longitudinal Ward-null directions'))},\n  {id:'derivation-rank-rejection',passed:invalid.get('counterexample-rank-mismatch')?.fromSignatureMatches===false},\n  {id:'derivation-contact-rejection',passed:invalid.get('counterexample-contact-unsafe')?.contactSafe===false},\n  {id:'derivation-analogy-firewall',passed:invalid.get('counterexample-analogy-firewall')?.notAnalogy===false},\n  {id:'derivation-context-rejection',passed:invalid.has('counterexample-undeclared-regime-order-cp')},\n  {id:'derivation-basis-invariance',passed:new Set(derivation.candidates.map(row=>row.steps[2])).size===2&&new Set(derivation.candidates.map(row=>row.target)).size===1},\n  {id:'derivation-authority-boundary',passed:derivation.receipt.entails===false&&derivation.receipt.empiricalAuthority===false&&derivation.receipt.applicationAdmission===false}];return{protocol:'temple-executable-succession-self-check/1',suite:'executable-succession',passed:cases.every(c=>c.passed),cases,scope:'Executable adapter invariants plus data-defined derivation composition cases;not scientific truth,empirical confirmation or corpus admission.'};};`;
selfCheck = selfCheck.replace("const sourceHash=sha(fs.readFileSync(path.join(directory,'runtime-package-control.mjs'))),phaseIds=", "const sourceHash=sha(fs.readFileSync(path.join(directory,'runtime-package-control.mjs'))),supervisorSourceHash=sha(fs.readFileSync(path.join(directory,'supervisor-mcp.mjs'))),phaseIds=");
selfCheck = selfCheck.replace("{id:'changed-owner-model-binding',passed:sourceHash===sessionModel.ownerBinding.successorSha256&&sessionModel.ownerBinding.predecessorSha256!==sourceHash},", `{id:'changed-owner-model-binding',passed:sourceHash===sessionModel.ownerBinding.successorSha256&&sessionModel.ownerBinding.predecessorSha256!==sourceHash},
  {id:'derivation-reflected-operation-binding',passed:supervisorSourceHash===model.scientificDerivation.supervisorOwnerBinding.successorSha256&&model.scientificDerivation.supervisorOwnerBinding.predecessorSha256!==supervisorSourceHash},`);
control = control.slice(0, selfStart) + selfCheck + control.slice(selfEnd);

control = control.replace("runtimeAction:'temple_runtime_package.compose-derivation'", "runtimeAction:'scientific_derivation_compose.compose-derivation'");
control = exactReplace(control, "\n\n const capture=", `
 const scientificDescriptor={name:'scientific_derivation_compose',description:'Compose bounded typed scientific derivation paths into proposal-only candidates with explicit assumptions,losses,evidence and rejection receipts. No entailment,empirical authority,corpus admission or application activation.',inputSchema:{type:'object',additionalProperties:false,required:['action'],properties:{action:{enum:['compose-derivation','standard-model-stress-pilot']},request:{type:'object'}}},annotations:{readOnlyHint:true,destructiveHint:false,openWorldHint:false}};
 const callScientific=async input=>{if(!input||!['compose-derivation','standard-model-stress-pilot'].includes(input.action)||Object.keys(input).sort().join(',')!==(input.action==='compose-derivation'?'action,request':'action'))fail('Exact scientific derivation arguments required.');return input.action==='compose-derivation'?composeDerivation(input.request):composeDerivation({graph:derivationPilot.graph,query:derivationPilot.query});};

 const capture=`);
control = exactReplace(control,
  "return Object.freeze({descriptor,call,guardInstalled,guardCheck,guardAdmission});",
  "return Object.freeze({descriptor,scientificDescriptor,descriptors:Object.freeze([descriptor,scientificDescriptor]),call,callScientific,guardInstalled,guardCheck,guardAdmission});");

let supervisorSource = supervisorOriginal.replaceAll(
  "[...this.workerTools,this.runtimePackages.descriptor, ...kernelTools]",
  "[...this.workerTools,...this.runtimePackages.descriptors, ...kernelTools]");
supervisorSource = exactReplace(supervisorSource,
  "result = args.operationId===this.runtimePackages.descriptor.name?this.runtimePackages.descriptor:this.workerTools.find(tool => tool.name === args.operationId);",
  "result = this.runtimePackages.descriptors.find(tool => tool.name === args.operationId)??this.workerTools.find(tool => tool.name === args.operationId);");
supervisorSource = exactReplace(supervisorSource,
  "if(args.operationId===this.runtimePackages.descriptor.name)result=await this.runtimePackages.call(args.input);\n        else return { jsonrpc: '2.0', id: message.id, result: await this.callWorker(args.operationId, args.input) };",
  "if(args.operationId===this.runtimePackages.descriptor.name)result=await this.runtimePackages.call(args.input);\n        else if(args.operationId===this.runtimePackages.scientificDescriptor.name)result=await this.runtimePackages.callScientific(args.input);\n        else return { jsonrpc: '2.0', id: message.id, result: await this.callWorker(args.operationId, args.input) };");

const controlHash = sha(control);
const supervisorHash = sha(supervisorSource);
const process = JSON.parse(processOriginal);
process.preparationSession.ownerBinding.predecessorSha256 = sha(controlOriginal);
process.preparationSession.ownerBinding.successorSha256 = controlHash;
process.scientificDerivation = derivation;
process.scientificDerivation.supervisorOwnerBinding = { predecessorSha256: sha(supervisorOriginal), successorSha256: supervisorHash };
process.preparationSession.invariants = [...process.preparationSession.invariants, "typed-signature-compatibility", "assumption-and-information-loss-accumulation", "proposal-only-authority-boundary", "counterexample-retention"];
const processText = JSON.stringify(process, null, 2) + "\n";
const processHash = sha(processText);

const entries = currentManifest.entries.map(entry => {
  if (entry.name === "runtime-package-control.mjs") return { name: entry.name, content: control, bytes: bytes(control), sha256: controlHash };
  if (entry.name === "supervisor-mcp.mjs") return { name: entry.name, content: supervisorSource, bytes: bytes(supervisorSource), sha256: supervisorHash };
  if (entry.name === "runtime-package-process.json") return { name: entry.name, content: processText, bytes: bytes(processText), sha256: processHash };
  return { name: entry.name, bytes: entry.bytes, sha256: entry.sha256, sharedFrom: `${current}/${entry.name}` };
});
entries.push({ name: "scientific-derivation-pilot.json", content: JSON.stringify(pilot, null, 2) + "\n", bytes: bytes(JSON.stringify(pilot, null, 2) + "\n"), sha256: sha(JSON.stringify(pilot, null, 2) + "\n") });

const manifest = { protocol: currentManifest.protocol, version: successorVersion, entrypoint: currentManifest.entrypoint, scope: "Read-only scientific derivation composition with typed signatures, accumulated assumptions/losses, counterexample receipts and a bounded Standard Model stress-response pilot; no scientific entailment, empirical authority, corpus admission or application activation.", entries: entries.map(({ name, bytes, sha256 }) => ({ name, bytes, sha256 })) };
const successorManifestText = JSON.stringify(manifest, null, 2) + "\n";
const generation = { ...currentGeneration, generationId: successorGeneration, runtimeVersion: successorVersion, runtimeManifestSha256: sha(successorManifestText), hostBasisHash: sha(manifestText), hostBasisGenerationId: predecessorGeneration };
const successorGenerationText = JSON.stringify(generation, null, 2) + "\n";
const generationEntry = { path: `${generations}/${successorGeneration}.json`, content: successorGenerationText, bytes: bytes(successorGenerationText), sha256: sha(successorGenerationText) };

const grammarRef = { laneId: "integration/main", snapshotId: "2a2598ef-dc5c-4938-9d77-04728d691c23", path: "programme/claimipedia-kernel-maintenance-20261017/guard-succession-r6/algebra-first-process.json", objectHash: "4eb2416e58d012833a7a8237914c05dbc7eb78926350bdf591e18f438cbc30f6" };
const workItem = { id: "work.scientific-derivation-composer.v1", scope: "Add a successor-only reflected scientific_derivation_compose operation and Standard Model stress-response pilot without changing existing reflected operation contracts.", outcome: "MCP can find bounded compatible derivation paths and retain assumptions, losses and counterexamples without granting entailment or corpus authority.", exclusions: ["scientific truth admission", "empirical confirmation", "Claimipedia corpus mutation", "application activation", "new external I/O", "opaque computation callbacks"] };
const packageDoc = {
  protocol: "temple-runtime-package/1", family: "protected-runtime", workItem,
  algebraFirst: { protocol: "algebra-first-work/1", workItem, authoring: "common-algebra", grammarRef, changeSetHash: sha(JSON.stringify(entries.map(x => ({ name: x.name, sha256: x.sha256 })))) },
  plan: { protocol: "reviewed-native-install-only-plan/2", route: null, preconditions: [{ path: `${current}/manifest.json`, sha256: sha(manifestText) }], capsules: [{ root: successorRoot, entries, manifest: { name: "manifest.json", content: successorManifestText, bytes: bytes(successorManifestText), sha256: sha(successorManifestText) }, generation: generationEntry }] },
  executableSuccession: {
    protocol: "temple-executable-owner-succession/2", phaseInjection: "grammar-only",
    owners: [
      { name: "runtime-package-control.mjs", predecessorSha256: sha(controlOriginal), successorSha256: controlHash, ports: ["executeModel"], sourceRef: { protocol: "temple-kernel-staging-member/1", path: "runtime-package-control.mjs", objectHash: controlHash }, modelRef: { protocol: "temple-kernel-staging-member/1", path: "runtime-package-process.json", objectHash: processHash } },
      { name: "supervisor-mcp.mjs", predecessorSha256: sha(supervisorOriginal), successorSha256: supervisorHash, ports: ["describeScientificOperation", "executeScientificOperation"], sourceRef: { protocol: "temple-kernel-staging-member/1", path: "supervisor-mcp.mjs", objectHash: supervisorHash }, modelRef: { protocol: "temple-kernel-staging-member/1", path: "runtime-package-process.json", objectHash: processHash } }
    ],
    qualification: { operationId: "temple_runtime_package", input: { action: "self-check", suite: "executable-succession" }, requiredCases: ["changed-owner-model-binding", "derivation-reflected-operation-binding", "grammar-phase-injection", "derivation-known-chain", "derivation-information-loss", "derivation-rank-rejection", "derivation-contact-rejection", "derivation-analogy-firewall", "derivation-context-rejection", "derivation-basis-invariance", "derivation-authority-boundary"] }
  }
};
const packageText = JSON.stringify(packageDoc, null, 2) + "\n";
const documents = [
  { path: "runtime-package-control.mjs", content: control, objectHash: controlHash },
  { path: "supervisor-mcp.mjs", content: supervisorSource, objectHash: supervisorHash },
  { path: "runtime-package-process.json", content: processText, objectHash: processHash },
  { path: "scientific-derivation-pilot.json", content: entries.at(-1).content, objectHash: entries.at(-1).sha256 },
  { path: "PACKAGE.json", content: packageText, objectHash: sha(packageText) }
];

if (process.preparationSession.ownerBinding.successorSha256 !== controlHash || process.scientificDerivation.supervisorOwnerBinding.successorSha256 !== supervisorHash || generation.runtimeManifestSha256 !== manifest.entries.reduce((_, __) => generation.runtimeManifestSha256, generation.runtimeManifestSha256)) throw new Error("successor assembly mismatch");
globalThis.process.stdout.write(JSON.stringify({ successorGeneration, successorVersion, currentRuntimeHash: sha(manifestText), controlHash, supervisorHash, processHash, manifestHash: sha(successorManifestText), packageHash: sha(packageText), packagePath: "PACKAGE.json", workItem: { protocol: "temple-kernel-staging-work/1", id: workItem.id, claim: workItem.outcome, exclusions: workItem.exclusions }, documents }));
