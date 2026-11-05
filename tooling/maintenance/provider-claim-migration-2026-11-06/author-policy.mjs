import {readFileSync,writeFileSync} from 'node:fs';
const target='.platform-reconstitution/sourcery-platform-reconciled/sdk/server/auth-provider-policy.json';
const L=value=>({kind:'typedLiteral',valueType:value===null?'null':typeof value,value:String(value)}),I=surface=>({kind:'input',surface}),F=(object,field)=>({kind:'field',object,field}),R=entries=>({kind:'record',entries:Object.entries(entries).map(([name,value])=>({name,value}))}),A=values=>({kind:'list',entries:values.map(value=>({value}))}),E=(left,right)=>({kind:'strictEq',left,right}),C=(condition,yes,no)=>({kind:'if',condition,then:yes,else:no}),N=value=>C(value,L(false),L(true)),AND=(...values)=>({kind:'and',entries:values.map(value=>({value}))}),OR=(a,b)=>C(a,L(true),b),LT=(left,right)=>({kind:'lessThan',left,right}),REF=ref=>({ref});
const S=I('state'),D=F(S,'data'),V=name=>F(D,name),Q=name=>F(V('request'),name),ACTION=I('action');
const roots={},protocols={},fields={};
const truth=value=>({kind:'withInputSurface',surface:'truthyInput',value,in:REF('truthy')}),fallback=(value,other)=>C(truth(value),value,other);
const raw=I('truthyInput'),type={kind:'typeOf',value:raw};
roots.truthy=AND(N(E(type,L('undefined'))),N(E(raw,L(null))),N(E(raw,L(false))),N(E(raw,L(0))),N(E(raw,L(''))),E(raw,raw),C(E(type,L('bigint')),N(E({kind:'toString',value:raw},L('0'))),L(true)));
roots.positive=AND({kind:'isSafeInteger',value:I('value')},LT(L(0),I('value')));
roots.nonempty=AND(E({kind:'typeOf',value:I('value')},L('string')),LT(L(0),{kind:'length',value:I('value')}));
for(const [key,value]of Object.entries({'auth.staticIssuer':'rel-static-development','auth.projectIssuer':'rel-authored-projects-development','auth.hostIssuer':'rel-project-host','auth.kind':'user','auth.assurance':'credential','auth.empty':'','auth.credentialType':'AuthCredential','auth.principalPattern':'^[A-Za-z0-9._:-]{1,160}$','auth.principalFlags':'u','crypto.saltBytes':16,'crypto.keyBytes':32,'forwarded.version':'verified-forwarded-identity/v1','forwarded.header':'x-rel-forwarded-identity','forwarded.signatureHeader':'x-rel-forwarded-identity-signature','forwarded.tokenPattern':'^[A-Za-z0-9][A-Za-z0-9._:@/+-]{0,255}$','forwarded.keyPattern':'^[A-Za-z0-9_-]{1,64}$','forwarded.maximumString':256,'forwarded.maximumKeyId':64,'forwarded.optional':false}))roots[key]=L(value);
roots['auth.kinds']=A(['user','agent','service'].map(L));roots['auth.fields']=A(['identifier','secret','actor'].map(L));
roots['crypto.parameters']=R({saltBytes:REF('crypto.saltBytes'),keyBytes:REF('crypto.keyBytes')});
const ret=value=>R({kind:L('return'),value}),call=(port,input,save,next)=>R({kind:L('call'),port:L(port),input,save:L(save),next:L(next)});
function begin(id,budget,first){const initial=id+'.initial',resume=id+'.resume';fields[id+'Steps']={default:budget,check:'positive'};protocols[id]={initial,resume,states:[],budgetField:id+'Steps'};roots[initial]=R({root:L(first),data:R({request:I('request')})});roots[resume]=R({root:F(ACTION,'next'),data:{kind:'mergeRecords',left:D,right:{kind:'recordFromEntries',value:A([A([F(ACTION,'save'),I('observation')])])}}});}
function finish(id){protocols[id].states=Object.keys(roots).filter(k=>k.startsWith(id+'.')&&!['initial','resume'].includes(k.slice(id.length+1)));}

// Preserve the already-controlled provider projection, then give it one shared
// source for kind/assurance/principal policy and an explicit regex port.
const proposed=JSON.parse(readFileSync('tooling/maintenance/request-identity-csrf-migration-2026-11-06/provider-normalization.proposal.json')),oldNames=new Set(Object.keys(proposed.expressions.roots));
function namespace(node){if(Array.isArray(node))return node.map(namespace);if(!node||typeof node!=='object')return node;const out=Object.fromEntries(Object.entries(node).map(([k,v])=>[k,namespace(v)]));if(out.ref&&oldNames.has(out.ref))out.ref='normalize.'+out.ref;if(out.kind==='typedLiteral'&&out.valueType==='string'&&oldNames.has(out.value))out.value='normalize.'+out.value;return out;}
for(const [key,value]of Object.entries(proposed.expressions.roots))roots['normalize.'+key]=namespace(value);
fields.normalizeSteps={default:64,check:'positive'};protocols.normalize={initial:'normalize.initial',resume:'normalize.resume',states:Object.keys(roots).filter(k=>k.startsWith('normalize.')&&!['normalize.initial','normalize.resume','normalize.truthy'].includes(k)),budgetField:'normalizeSteps'};
const normData=F(S,'data'),normValue=name=>F(normData,name),normCall=(port,input,save,next)=>call(port,input,save,'normalize.'+next);
roots['normalize.kind.text'].entries.find(e=>e.name==='input').value.entries[0].value.else=REF('auth.kind');
roots['normalize.assurance.text'].entries.find(e=>e.name==='input').value.entries[0].value.else=REF('auth.assurance');
roots['normalize.validate']=C(AND(N(E(normValue('issuer'),L(''))),N(E(normValue('subject'),L('')))),normCall('matches',R({value:normValue('principal'),pattern:REF('auth.principalPattern'),flags:REF('auth.principalFlags')}),'principalValid','validate.kind'),roots['normalize.return-null']);
roots['normalize.validate.kind']=C(AND(normValue('principalValid'),{kind:'includes',value:REF('auth.kinds'),search:normValue('kind')}),normCall('read',R({receiver:normValue('provider'),key:L('assurance')}),'assuranceRaw','assurance.text'),roots['normalize.return-null']);protocols.normalize.states.push('normalize.validate.kind');

// Active credential projection. Missing development secrets retain the old
// empty-secret profile; a secret with history but no active value is revoked.
const values=I('values'),count={kind:'length',value:values},first={kind:'get',object:values,key:L('0')};
roots['credential.value']=C(LT(count,L(2)),C(E(count,L(0)),REF('auth.empty'),fallback(first,REF('auth.empty'))),{kind:'raise',errorType:'TypeError',errorCode:'ambiguous-auth-credential-field',message:L('AuthCredential fields require at most one active value.')});
roots['credential.status']=R({active:OR(LT(L(0),F(I('counts'),'secret')),E(F(I('history'),'secret'),L(0)))});
roots['credential.usable']=AND(truth(F(I('row'),'identifier')),truth(F(I('row'),'actor')));
roots['credential.hostUsable']=AND(REF('credential.usable'),F(I('row'),'active'),truth(F(I('row'),'secret')));
roots['credential.fingerprint']={kind:'map',items:I('rows'),as:'row',value:A(['identifier','secret','actor','active'].map(key=>F({kind:'local',name:'row'},key)))};

begin('credential',8,'credential.identifier');
roots['credential.identifier']=call('text',R({value:fallback(Q('identifier'),REF('auth.empty'))}),'identifier','credential.lookup');
roots['credential.lookup']=call('lookup',R({key:V('identifier')}),'credential','credential.select');
roots['credential.select']=C(truth(V('credential')),C(F(V('credential'),'active'),call('text',R({value:fallback(Q('secret'),REF('auth.empty'))}),'secret','credential.result'),ret(L(null))),ret(L(null)));
roots['credential.result']=C(E(F(V('credential'),'secret'),V('secret')),ret(R({actor:F(V('credential'),'actor'),identifier:F(V('credential'),'identifier')})),ret(L(null)));finish('credential');
begin('label',4,'label.text');roots['label.text']=call('text',R({value:fallback(Q('actor'),REF('auth.empty'))}),'actor','label.lookup');roots['label.lookup']=call('lookup',R({key:V('actor')}),'identifier','label.result');roots['label.result']=ret(fallback(V('identifier'),L(null)));finish('label');

begin('index',8,'index.admit');roots['index.admit']=C({kind:'withInputSurface',surface:'row',value:Q('row'),in:REF('credential.usable')},call('lookup',R({key:F(Q('row'),'identifier')}),'prior','index.duplicate'),ret(L(false)));
roots['index.duplicate']=C(truth(V('prior')),call('duplicate',R({row:Q('row')}),'refusal','index.done'),call('put',R({key:F(Q('row'),'identifier'),value:Q('row')}),'stored','index.label'));
roots['index.label']=call('lookupLabel',R({key:F(Q('row'),'actor')}),'label','index.labelChoice');roots['index.labelChoice']=C(truth(V('label')),ret(L(true)),call('putLabel',R({key:F(Q('row'),'actor'),value:F(Q('row'),'identifier')}),'storedLabel','index.done'));roots['index.done']=ret(L(true));finish('index');
begin('projectIndex',6,'projectIndex.admit');roots['projectIndex.admit']=C({kind:'withInputSurface',surface:'row',value:Q('row'),in:REF('credential.hostUsable')},call('lookup',R({key:F(Q('row'),'identifier')}),'prior','projectIndex.duplicate'),ret(L(false)));
const identity=R({identifier:F(Q('row'),'identifier'),secret:F(Q('row'),'secret'),principal:F(Q('row'),'actor'),subject:F(Q('row'),'identifier'),kind:REF('auth.kind'),issuer:Q('issuer')});
roots['projectIndex.duplicate']=C(truth(V('prior')),C(OR(N(E(F(V('prior'),'secret'),F(Q('row'),'secret'))),N(E(F(V('prior'),'actor'),F(Q('row'),'actor')))),call('duplicate',R({row:Q('row')}),'refusal','projectIndex.done'),ret(L(false))),call('put',R({key:F(Q('row'),'identifier'),value:Q('row'),identity}),'stored','projectIndex.done'));roots['projectIndex.done']=ret(L(true));finish('projectIndex');

begin('register',16,'register.identifierRead');
const readIdentity=(key,save,next)=>call('read',R({receiver:Q('identity'),key:L(key)}),save,next);
roots['register.identifierRead']=readIdentity('identifier','identifierRaw','register.identifier');roots['register.identifier']=call('text',R({value:fallback(V('identifierRaw'),REF('auth.empty'))}),'identifier','register.secretRead');roots['register.secretRead']=readIdentity('secret','secretRaw','register.secret');roots['register.secret']=call('text',R({value:fallback(V('secretRaw'),REF('auth.empty'))}),'secret','register.admit');
roots['register.admit']=C(AND(truth(V('identifier')),truth(V('secret'))),call('entropy',R({bytes:REF('crypto.saltBytes')}),'salt','register.clone'),ret(L(false)));
roots['register.clone']=call('cloneRecord',R({value:Q('identity')}),'identity','register.issuerRead');roots['register.issuerRead']=readIdentity('issuer','issuerRaw','register.hash');
roots['register.hash']=call('derive',R({secret:V('secret'),salt:V('salt'),bytes:REF('crypto.keyBytes')}),'secretHash','register.put');
roots['register.put']=call('put',R({key:V('identifier'),value:{kind:'mergeRecords',left:V('identity'),right:R({issuer:fallback(V('issuerRaw'),Q('issuer')),identifier:V('identifier'),salt:V('salt'),secretHash:V('secretHash')})}}),'stored','register.done');roots['register.done']=ret(L(true));finish('register');

begin('staticAuth',12,'staticAuth.identifier');roots['staticAuth.identifier']=call('text',R({value:fallback(Q('identifier'),REF('auth.empty'))}),'identifier','staticAuth.lookup');roots['staticAuth.lookup']=call('lookup',R({key:V('identifier')}),'record','staticAuth.select');roots['staticAuth.select']=C(truth(V('record')),call('text',R({value:fallback(Q('secret'),REF('auth.empty'))}),'secret','staticAuth.hash'),ret(L(null)));
roots['staticAuth.hash']=call('derive',R({secret:V('secret'),salt:F(V('record'),'salt'),bytes:REF('crypto.keyBytes')}),'candidate','staticAuth.equal');roots['staticAuth.equal']=call('equal',R({left:V('candidate'),right:F(V('record'),'secretHash')}),'equal','staticAuth.result');
const rec=V('record');roots['staticAuth.result']=C(V('equal'),ret(R({issuer:F(rec,'issuer'),subject:fallback(F(rec,'subject'),F(rec,'identifier')),principal:fallback(F(rec,'principal'),F(rec,'actor')),identifier:F(rec,'identifier'),kind:fallback(F(rec,'kind'),REF('auth.kind')),assurance:fallback(F(rec,'assurance'),REF('auth.assurance')),claims:fallback(F(rec,'claims'),R({}))})),ret(L(null)));finish('staticAuth');

// Claim field grammar and revision decisions share the provider vocabulary.
begin('claimString',4,'claimString.shape');
const val=Q('value'),optional=Q('optional'),maximum=Q('maximum'),invalid=call('refuse',R({message:{kind:'concatStrings',value:A([L('Forwarded identity '),Q('name'),L(' is invalid.')])}}),'refusal','claimString.done');
roots['claimString.shape']=C(AND(OR(E({kind:'typeOf',value:val},L('undefined')),E(val,L(null))),optional),ret(REF('auth.empty')),C(E({kind:'typeOf',value:val},L('string')),C(OR(LT(maximum,{kind:'length',value:val}),AND(N(optional),E(val,L('')))),invalid,C(truth(val),call('matches',R({value:val,pattern:Q('pattern'),flags:L('u')}),'matches','claimString.result'),ret(val))),invalid));roots['claimString.result']=C(V('matches'),ret(val),invalid);roots['claimString.done']=ret(REF('auth.empty'));finish('claimString');
roots['forwarded.revision']=AND(I('integer'),N(LT(I('value'),L(0))));
roots['forwarded.fields']=A(['schemaVersion','issuer','audience','keyId','claimId','principal','identityId','platformPrincipalId','kind','assurance','identityRevision','principalRevision','sessionId','issuedAt','expiresAt','method','path'].map(L));
roots['forwarded.defaultPath']=L('/');
roots['auth.hostCookie']=L('rel_project_host_session');roots['auth.hostSchemaVersion']=L(2);roots['auth.hostClaimVersion']=L('verified-host-identity/v1');roots['auth.principalVersion']=L('platform-principal/v1');
roots['forwarded.platformCookies']=A(['rel_auth','rel_actor'].map(L));roots['forwarded.stripAuthorization']=L(true);
roots['forwarded.strippedHeaders']=A([REF('forwarded.header'),REF('forwarded.signatureHeader'),L('x-rel-actor')]);
roots['forwarded.headerDisposition']=C(OR({kind:'includes',value:REF('forwarded.strippedHeaders'),search:I('name')},AND(truth(I('stripAuthorization')),E(I('name'),L('authorization')))),L('strip'),C(E(I('name'),L('cookie')),L('cookies'),L('pass')));

// Signing projection: preserve lazy auth/field access and the original order of
// audience validation, nonce, coercions, clock strings and revision refusals.
begin('sign',96,'sign.authenticated');
const readAuth=(key,save,next)=>call('readNullable',R({receiver:Q('auth'),key:L(key)}),save,next);
const validate=(value,name,save,next,optional=false)=>call('validateString',R({value,name:L(name),options:R({optional:L(optional),maximum:REF('forwarded.maximumString'),pattern:REF('forwarded.tokenPattern')})}),save,next);
const signerFailure=message=>call('signerRefuse',R({message:L(message)}),'refusal','sign.unsigned');
roots['sign.authenticated']=readAuth('authenticated','authenticated','sign.admit');roots['sign.admit']=C(truth(V('authenticated')),call('now',R({}),'now','sign.clock'),ret(R({})));
roots['sign.clock']=C({kind:'isFinite',value:V('now')},validate(Q('audience'),'audience','audience','sign.uuid'),signerFailure('Forwarded identity clock must return epoch milliseconds.'));
roots['sign.uuid']=call('uuid',R({}),'claimId','sign.principalRead');roots['sign.principalRead']=readAuth('principal','principalRaw','sign.principalChoice');
roots['sign.principalChoice']=C(truth(V('principalRaw')),validate(V('principalRaw'),'principal','principal','sign.identityRead'),readAuth('actor','actorRaw','sign.actor'));
roots['sign.actor']=validate(V('actorRaw'),'principal','principal','sign.identityRead');
roots['sign.identityRead']=readAuth('identityId','identityRaw','sign.identity');roots['sign.identity']=validate(V('identityRaw'),'identityId','identityId','sign.platformRead');
roots['sign.platformRead']=readAuth('platformPrincipalId','platformRaw','sign.platform');roots['sign.platform']=validate(fallback(V('platformRaw'),REF('auth.empty')),'platformPrincipalId','platformPrincipalId','sign.kindRead',true);
roots['sign.kindRead']=readAuth('kind','kindRaw','sign.kind');roots['sign.kind']=validate(V('kindRaw'),'kind','kind','sign.assuranceRead');
roots['sign.assuranceRead']=readAuth('assurance','assuranceRaw','sign.assurance');roots['sign.assurance']=validate(V('assuranceRaw'),'assurance','assurance','sign.identityRevisionRead');
roots['sign.identityRevisionRead']=readAuth('identityRevision','identityRevisionRaw','sign.identityRevision');roots['sign.identityRevision']=call('number',R({value:V('identityRevisionRaw')}),'identityRevision','sign.principalRevisionRead');
roots['sign.principalRevisionRead']=readAuth('principalRevision','principalRevisionRaw','sign.principalRevisionChoice');
roots['sign.principalRevisionChoice']=C(truth(V('principalRevisionRaw')),call('number',R({value:V('principalRevisionRaw')}),'principalRevision','sign.sessionRead'),readAuth('identityRevision','revisionFallback','sign.revisionFallback'));
roots['sign.revisionFallback']=call('number',R({value:V('revisionFallback')}),'principalRevision','sign.sessionRead');
roots['sign.sessionRead']=readAuth('sessionId','sessionRaw','sign.session');roots['sign.session']=validate(fallback(V('sessionRaw'),REF('auth.empty')),'sessionId','sessionId','sign.issued',true);
roots['sign.issued']=call('iso',R({value:V('now')}),'issuedAt','sign.expires');roots['sign.expires']=call('iso',R({value:{kind:'add',left:V('now'),right:Q('ttlMs')}}),'expiresAt','sign.methodRead');
roots['sign.methodRead']=call('readNullable',R({receiver:Q('req'),key:L('method')}),'methodRaw','sign.method');roots['sign.method']=call('textUpper',R({value:fallback(V('methodRaw'),Q('defaultMethod'))}),'method','sign.pathRead');
roots['sign.pathRead']=call('readNullable',R({receiver:Q('req'),key:L('url')}),'pathRaw','sign.path');roots['sign.path']=call('text',R({value:fallback(V('pathRaw'),Q('defaultPath'))}),'path','sign.integerIdentity');
roots['sign.integerIdentity']=call('revisionValid',R({value:V('identityRevision')}),'identityRevisionValid','sign.checkIdentity');roots['sign.checkIdentity']=C(V('identityRevisionValid'),call('revisionValid',R({value:V('principalRevision')}),'principalRevisionValid','sign.checkPrincipal'),signerFailure('Forwarded identity identityRevision must be a non-negative integer.'));
const claim=R({schemaVersion:REF('forwarded.version'),issuer:Q('issuer'),audience:V('audience'),keyId:Q('keyId'),claimId:V('claimId'),...Object.fromEntries(['principal','identityId','platformPrincipalId','kind','assurance','identityRevision','principalRevision','sessionId','issuedAt','expiresAt','method','path'].map(k=>[k,V(k)]))});
roots['sign.checkPrincipal']=C(V('principalRevisionValid'),call('sign',R({claim}),'signed','sign.done'),signerFailure('Forwarded identity principalRevision must be a non-negative integer.'));
roots['sign.done']=ret({kind:'recordFromEntries',value:A([A([REF('forwarded.header'),F(V('signed'),'claim')]),A([REF('forwarded.signatureHeader'),F(V('signed'),'signature')])])});roots['sign.unsigned']=ret(R({}));finish('sign');

begin('verify',96,'verify.claimHeader');
const fail=(message,code='forwarded-identity-invalid')=>call('refuse',R({message:L(message),code:L(code)}),'refusal','verify.absent'),CLAIM=F(V('json'),'value');
roots['verify.claimHeader']=call('header',R({name:REF('forwarded.header')}),'claimHeader','verify.signatureHeader');roots['verify.signatureHeader']=call('header',R({name:REF('forwarded.signatureHeader')}),'signatureHeader','verify.headers');
roots['verify.headers']=C(AND(N(truth(V('claimHeader'))),N(truth(V('signatureHeader')))),ret(L(null)),C(AND(truth(V('claimHeader')),truth(V('signatureHeader'))),call('decode',R({value:V('claimHeader'),label:L('Forwarded identity claim')}),'payload','verify.decodeSignature'),fail('Forwarded identity headers are incomplete.')));
roots['verify.decodeSignature']=call('decode',R({value:V('signatureHeader'),label:L('Forwarded identity signature')}),'signature','verify.signature');roots['verify.signature']=call('signature',R({payload:V('payload'),signature:V('signature')}),'signatureValid','verify.signatureDecision');
roots['verify.signatureDecision']=C(V('signatureValid'),call('parse',R({payload:V('payload')}),'json','verify.json'),fail('Forwarded identity signature is invalid.'));
roots['verify.json']=C(F(V('json'),'ok'),C(AND(N(E(CLAIM,L(null))),E({kind:'typeOf',value:CLAIM},L('object')),N({kind:'isArray',value:CLAIM})),call('canonical',R({claim:CLAIM,payload:V('payload')}),'canonical','verify.canonical'),fail('Forwarded identity claim is not canonical JSON.')),fail('Forwarded identity claim is not valid JSON.'));
roots['verify.canonical']=C(V('canonical'),C(E({kind:'jsonStringify',value:{kind:'keys',value:CLAIM}},{kind:'jsonStringify',value:REF('forwarded.fields')}),C(E(F(CLAIM,'schemaVersion'),REF('forwarded.version')),C(AND(E(F(CLAIM,'issuer'),Q('issuer')),E(F(CLAIM,'audience'),Q('audience')),E(F(CLAIM,'keyId'),Q('keyId'))),validate(F(CLAIM,'claimId'),'claimId','validated','verify.string.principal'),fail('Forwarded identity trust scope does not match.')),fail('Forwarded identity schema is unsupported.')),fail('Forwarded identity claim shape is invalid.')),fail('Forwarded identity claim is not canonical JSON.'));
const stringFields=['principal','identityId','platformPrincipalId','kind','assurance','sessionId'];for(let index=0;index<stringFields.length;index++){const key=stringFields[index],next=index+1<stringFields.length?'verify.string.'+stringFields[index+1]:'verify.identityRevision';roots['verify.string.'+key]=validate(F(CLAIM,key),key,'validated',next,['platformPrincipalId','sessionId'].includes(key));}
roots['verify.identityRevision']=call('revisionValid',R({value:F(CLAIM,'identityRevision')}),'identityRevisionValid','verify.identityRevisionCheck');roots['verify.identityRevisionCheck']=C(V('identityRevisionValid'),call('revisionValid',R({value:F(CLAIM,'principalRevision')}),'principalRevisionValid','verify.principalRevisionCheck'),fail('Forwarded identity revision is invalid.'));
roots['verify.principalRevisionCheck']=C(V('principalRevisionValid'),call('dateParse',R({value:F(CLAIM,'issuedAt')}),'issuedAt','verify.expires'),fail('Forwarded principal revision is invalid.'));
roots['verify.expires']=call('dateParse',R({value:F(CLAIM,'expiresAt')}),'expiresAt','verify.now');roots['verify.now']=call('now',R({}),'now','verify.clock');
roots['verify.clock']=C({kind:'isFinite',value:V('now')},call('lifetime',R({issuedAt:V('issuedAt'),expiresAt:V('expiresAt'),maximumTtlMs:Q('maximumTtlMs')}),'lifetimeValid','verify.lifetime'),fail('Forwarded identity clock must return finite epoch milliseconds.'));
const time=R({issuedAt:V('issuedAt'),expiresAt:V('expiresAt'),now:V('now'),clockSkewMs:Q('clockSkewMs')});
roots['verify.lifetime']=C(V('lifetimeValid'),call('future',time,'future','verify.future'),fail('Forwarded identity lifetime is invalid.'));roots['verify.future']=C(V('future'),fail('Forwarded identity is not yet valid.'),call('expired',time,'expired','verify.expired'));roots['verify.expired']=C(V('expired'),fail('Forwarded identity has expired.','forwarded-identity-expired'),call('readNullable',R({receiver:Q('req'),key:L('method')}),'methodRaw','verify.method'));
roots['verify.method']=call('textUpper',R({value:fallback(V('methodRaw'),Q('defaultMethod'))}),'method','verify.methodCheck');roots['verify.methodCheck']=C(E(F(CLAIM,'method'),V('method')),call('readNullable',R({receiver:Q('req'),key:L('url')}),'pathRaw','verify.path'),fail('Forwarded identity request binding does not match.'));roots['verify.path']=call('text',R({value:fallback(V('pathRaw'),Q('defaultPath'))}),'path','verify.pathCheck');roots['verify.pathCheck']=C(E(F(CLAIM,'path'),V('path')),ret(R({schemaVersion:F(CLAIM,'schemaVersion'),authenticated:L(true),authenticationSource:L('forwarded-host'),...Object.fromEntries(['issuer','audience','keyId','claimId','principal'].map(k=>[k,F(CLAIM,k)])),actor:F(CLAIM,'principal'),...Object.fromEntries(['identityId','platformPrincipalId','kind','assurance','identityRevision','principalRevision','sessionId','issuedAt','expiresAt'].map(k=>[k,F(CLAIM,k)]))})),fail('Forwarded identity request binding does not match.'));roots['verify.absent']=ret(L(null));finish('verify');
writeFileSync(target,JSON.stringify({protocol:'sourcery/authored-policy.v1',fields,protocols,expressions:{profile:'sourcery/expression-reduction-values/1',roots}},null,2)+'\n');
console.log(JSON.stringify({target,entries:Object.keys(protocols),roots:Object.keys(roots).length}));
