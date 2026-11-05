import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {loadContract} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/platform-assurance.mjs';
import {parseRawRel} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/sdk/rel.mjs';
import {factsBySubject} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/rel-fact-index.mjs';
import {semanticOperationBindings} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/semantic-contract-operations.mjs';
import {semanticContractFields as fields} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/semantic-contract-validation.mjs';
const root=resolve('.platform-reconstitution/sourcery-platform-reconciled'),sha=b=>createHash('sha256').update(b).digest('hex'),read=p=>readFileSync(resolve(root,p)),write=(p,x)=>{mkdirSync(dirname(resolve(root,p)),{recursive:true});writeFileSync(resolve(root,p),typeof x==='string'?x:JSON.stringify(x,null,2)+'\n');};
const document=JSON.parse(readFileSync(new URL('prior-records/semantic-contract-translations.json',import.meta.url))),retained=JSON.parse(readFileSync(new URL('prior-records/retained-semantic-contracts.json',import.meta.url))),cases=JSON.parse(read('assurance/semantic-contract-cases.json')),review=JSON.parse(readFileSync(new URL('retained-review.json',import.meta.url)));
const priorSubjects=new Set(document.records.map(r=>r.subject));
const descriptions={
 strictProcessReference:'Exact own enumerable process reference traversal, array coordinates and unsafe/missing reference refusals',
 refusalResult:'Exact success envelopes, authored refusal status and malformed envelope refusal',
 uriDecode:'Primitive URI component decoding and frozen malformed URI outcomes',
 refusalClass:'Private construction provenance owns valid refusal status despite mutable public fields and forged lookalikes',
 surfaceProcessEngine:'Current synchronous recursive process value interpretation with lazy conditional and strict reference admission',
 domExpression:'Authored node serialization, escaped text/attributes and executable attribute/URL refusals',
 jsonDecode:'JSON input/parse/schema outcomes, checked schema violations and explicit validator transformation',
 blobDecode:'Text MIME/encoding boundary, canonical bytes and MIME/encoding refusal',
 startupRuntime:'Startup lane own-key custody for prototype-like names and explicit fact payload precedence',
 runtimeBuildPolicyResolution:'Explicit scoped generation retention, authored default requirement and compatibility provenance',
 pageRank:'Personalized one-node rank conservation/convergence and explicit mixing, distribution, edge-target and iteration admission',
 valueSemantics:'Exact compatibility truthiness, canonical scalar equality, null stringification and strict typed-literal matching',
 canonicalJson:'Sorted recursive canonical JSON text with trailing newline for JSON data',
 authoredFailure:'Branded authored TypeError identity, frozen retained failure projection and rejection of unregistered error kinds',
 compileExpressions:'Deterministic literal graph compilation and required authoring profile admission',
 graphFromRecords:'Ordered duplicate graph values, last-value selection, frozen projection and active-only row admission',
 ownArrayValues:'Fresh dense own-data array values and ordinary-array admission',
 recordFromEntries:'Exact data pairs, prototype-like own keys, duplicate-key and primitive-key refusal',
 portableSha256:'SHA-256 empty/abc known answers through portable text and byte entry points',
 parseSpki:'Current Ed25519 SPKI parser success and invalid public PEM data outcomes',
 withInputSurface:'Frozen lexical input shadowing with preserved other bindings and explicit static-name/context admission',
 verifyEd25519:'Current valid, changed-message, malformed-signature and wrong-key-type verification outcomes',
 expressionEvaluator:'Reduction-profile typed arithmetic evaluation and zero-denominator refusal through authored graph compilation',
 canonicalValues:'Current strict canonical Boolean, integer and MIME normalization and integer parsing/refusal',
 relFactStore:'Ordered fact history retraction, active object/subject lookup and REL parsing',
};
const additions=[];
for(const [name,description]of Object.entries(descriptions)){
 const subject='module.'+name;if(priorSubjects.has(subject))throw Error('Fresh adjacent cohort required');
 const row=review.records.find(r=>r.subject===subject);let selected=row.variants.find(v=>v.complete),registrationOnly=false;
 if(!selected){
  const contract=loadContract(root),paths=[...new Set(contract.facts.filter(f=>f.s===subject).map(f=>f.file))];
  if(!paths.length)throw Error('No retained declaration: '+subject);
  const sources=paths.map(path=>({repository:'sourceryPlatform',path,sha256:sha(read(path))})),sourceText=paths.map(p=>read(p).toString()).join('\n');
  selected={commit:null,sourceText,sha256:sha(sourceText),facts:factsBySubject(parseRawRel(sourceText,{file:paths.join('+')})).get(subject),registrationSources:sources,complete:false};registrationOnly=true;
 }
 const original=selected.facts,witnessCases=cases.cases.filter(c=>c.subjects.includes(subject)),operations=[...new Set(witnessCases.map(c=>c.operation))];if(!witnessCases.length)throw Error('Actual semantic cases required');
 const bindings=operations.map(operation=>({operation,...semanticOperationBindings[operation],sha256:sha(read(semanticOperationBindings[operation].path))}));
 if(bindings.some(b=>b.repository!==row.repository))throw Error('Explicit current owner required');
 const source='assurance/adjacent-semantic-contracts/'+row.repository+'/'+name+'.rel';
 const clauses={sourceDomain:'Explicit JSON normative fixtures for '+description+'. No caller-selected module, export or capability.',targetDomain:description+'; JSON observations explicitly flatten the rank typed array and null-prototype lexical bindings without claiming descriptor equivalence.',forwardMap:'Execute the whitelisted current owner exports named in bindings and compare the hand-authored expectations in the listed cases.',reverseMapOrAbsence:'No inverse is established. Returned projections do not reconstruct prior allocations, rejected input spelling, provider state or original object descriptors.',preservedInformation:'Exactly the checked values, ordering, refusal classes/messages and explicit frozen/prototype observations in the listed cases.',lostInformation:'Unobserved descriptors, allocation identity, provider internals and execution timing; the JSON projection is a bounded test boundary.',identity:'Repository '+row.repository+', explicit implementation paths and hashes, retained declaration hash, specification bytes and exact normative case identities.',partiality:'Bounded current-runtime translation only. Arbitrary JavaScript getters/proxies, generic decomposition equivalence and restoration of former private paths are not established by these cases.',failure:'Only the explicit data refusals and thrown-error expectations listed in the normative cases are qualified; no untested failure precedence is implied.',authorityEffect:'Invocation-local observation/allocation plus the explicitly called current cryptographic provider for SPKI/signature checks. No production activation, filesystem mutation, scientific admission or dynamic execution grant.',stateOwner:'Caller owns input data; current module owns invocation-local results and private failure branding. The qualifier owns only temporary test observations.',evidence:'Hand-authored normative cases '+witnessCases.map(c=>c.id).join(', ')+'. Source, ordinary-copy assembly and isolated-bootstrap execution are required before checkpoint closure.',falsifier:'Any listed case fails, a retained/source/specification/code hash changes, or an implementation is bound to the wrong repository/path/export.',default:'Current compatibility/default behavior is bounded by the listed explicit inputs. No default-free architecture claim is made.'};
 const amendments=fields.filter(f=>clauses[f]!==original[f]?.join(' | ')).map(field=>({field,retained:original[field],current:clauses[field]}));
 const spec='// Bounded current owner behavior; not generic executable algebra or recovered missing history.\n'+[[subject,'isa','RuntimeSemanticContract'],[subject,'notProved','executable-algebra'],[subject,'qualification','bounded-current-runtime-behavior'],...fields.map(f=>[subject,f,clauses[f]]),...bindings.map(b=>[subject,'currentImplementation',b.path])].map(f=>'('+f.map(x=>JSON.stringify(x)).join(', ')+')').join('\n')+'\n';write(source,spec);
 retained.records.push({subject,repository:row.repository,source:row.source,selectedCommit:selected.commit,sourceSha256:selected.sha256,sourceText:selected.sourceText,subjectFacts:original,variants:row.variants.map(v=>({commit:v.commit,retainedCopy:v.retainedCopy,sha256:v.sha256,subjectFacts:v.facts})),retainedCopy:selected.retainedCopy,registrationSources:selected.registrationSources,registrationOnly,selection:registrationOnly?'Original complete algebra source is not recovered. Current bounded specification is explicitly reconstituted against surviving platform registration only.':'Complete retained declaration selected for bounded amendment; all variants remain recorded; no canonical authority or universal equivalence is promoted.'});
 const record={subject,repository:row.repository,source,retainedSource:row.source,kind:'RuntimeSemanticContract',retainedSourceSha256:selected.sha256,retainedSubjectSha256:sha(JSON.stringify(original)),bindings,clauses,amendments,unprovedRetainedAdditionalFields:Object.keys(original).filter(f=>f!=='isa'&&!fields.includes(f)),cases:witnessCases.map(c=>c.id),specificationSha256:sha(Buffer.from(spec)),qualification:'bounded-current-runtime-behavior',universalEquivalenceProved:false,executableAlgebraProved:false,scientificAcceptance:false,executionGranted:false,registrationOnly};document.records.push(record);additions.push(record);
}
write('assurance/retained-semantic-contracts.json',retained);document.sourceCodeSha256=Object.fromEntries(['assurance/semantic-contract-operations.mjs','assurance/semantic-contract-cases.mjs','assurance/semantic-adjacent-operations.mjs'].map(p=>[p,sha(read(p))]));document.casesSha256=sha(read('assurance/semantic-contract-cases.json'));document.retainedDocumentSha256=sha(read('assurance/retained-semantic-contracts.json'));write('assurance/semantic-contract-translations.json',document);
writeFileSync(new URL('adjacent-amendments.json',import.meta.url),JSON.stringify({records:additions,completeRetainedDeclarations:additions.filter(r=>!r.registrationOnly).length,registrationOnlyReconstitutions:additions.filter(r=>r.registrationOnly).map(r=>r.subject),genericAlgebraProved:false},null,2)+'\n');console.log(JSON.stringify({contracts:document.records.length,added:additions.length,cases:cases.cases.length}));
