import {writeFileSync} from 'node:fs';
const input=surface=>({kind:'input',surface}),local=name=>({kind:'local',name});
const literal=value=>({kind:'typedLiteral',valueType:value===null?'null':typeof value,value:String(value)});
const field=(object,name)=>({kind:'field',object,field:name}),eq=(left,right)=>({kind:'strictEq',left,right});
const choose=(condition,yes,no)=>({kind:'if',condition,then:yes,else:no}),not=value=>choose(value,literal(false),literal(true));
const and=(...values)=>({kind:'and',entries:values.map(value=>({value}))}),or=(left,right)=>choose(left,literal(true),right);
const list=values=>({kind:'list',entries:values.map(value=>({value:literal(value)}))}),record=entries=>({kind:'record',entries:Object.entries(entries).map(([name,value])=>({name,value}))});
const less=(left,right)=>({kind:'lessThan',left,right}),finite=value=>({kind:'isFinite',value}),raise=(code,message)=>({kind:'raise',errorType:'TypeError',errorCode:code,message:literal(message)});
const value=input('value'),mode=input('mode'),global=input('globalAllowed'),scoped=input('scopedAllowed'),policyCount={kind:'length',value:input('policies')};
const validMode={kind:'includes',value:list(['inherit','extend','scoped']),search:mode};
// includes calls its second operand `search`; authoring emits these exact fields.
const permissionSubjects=record(Object.fromEntries(['read','write','execute','overwriteIsa'].map(p=>[p,literal('perm.'+p)])));
const authorityPredicates=['isa','name','kind','binding','reference','subject','memberIsa','includeDerived','representation','type','parentType','participant','steward','principal','authority','context'];
const roots={
 nonemptyString:and(eq({kind:'typeOf',value},literal('string')),less(literal(0),{kind:'length',value})),
 uniqueResourcePolicy:choose(less(policyCount,literal(2)),choose(eq(policyCount,literal(0)),literal(null),{kind:'get',object:input('policies'),key:literal('0')}),raise('ambiguous-resource-permission-policy','Multiple ResourcePermissionPolicy subjects apply to one resource.')),
 uniqueResourceMode:choose(eq({kind:'length',value:input('modes')},literal(1)),{kind:'get',object:input('modes'),key:literal('0')},raise('ambiguous-resource-permission-mode','ResourcePermissionPolicy requires exactly one active mode.')),
 uniqueOptionalGrantField:choose(less({kind:'length',value:input('values')},literal(2)),choose(eq({kind:'length',value:input('values')},literal(0)),literal(null),{kind:'get',object:input('values'),key:literal('0')}),raise('ambiguous-resource-permission-grant','Scoped permission grant fields must have at most one active value.')),
 resourceMode:choose(validMode,mode,raise('invalid-resource-permission-mode','ResourcePermissionPolicy mode must be inherit, extend or scoped.')),
 permissionNeedsScoped:choose(eq(mode,literal(null)),literal(false),choose(validMode,not(eq(mode,literal('inherit'))),raise('invalid-resource-permission-mode','ResourcePermissionPolicy mode must be inherit, extend or scoped.'))),
 resourcePermission:choose(or(eq(mode,literal(null)),eq(mode,literal('inherit'))),global,choose(eq(mode,literal('extend')),or(global,scoped),choose(eq(mode,literal('scoped')),scoped,raise('invalid-resource-permission-mode','ResourcePermissionPolicy mode must be inherit, extend or scoped.')))),
 permissionSubject:choose({kind:'hasOwn',object:permissionSubjects,key:input('permission')},{kind:'get',object:permissionSubjects,key:input('permission')},literal(null)),
 authorityWitnessPredicates:list(authorityPredicates),
 witnessAuthorityPredicate:{kind:'includes',value:{ref:'authorityWitnessPredicates'},search:input('predicate')},
 credentialResult:choose(eq(input('credential'),literal(null)),literal(null),choose(eq(field(input('credential'),'secret'),input('secret')),record({actor:field(input('credential'),'actor'),identifier:field(input('credential'),'identifier')}),literal(null))),
 storedSessionActive:and(finite(input('createdAt')),finite(input('expiresAt')),finite(input('now')),less(input('now'),input('expiresAt'))),
 hostSessionNeedsClock:and(eq(input('present'),literal(true)),eq(input('revokedAt'),literal(''))),
 hostSessionActive:and({ref:'hostSessionNeedsClock'},finite(input('expiresAt')),finite(input('now')),less(input('now'),input('expiresAt'))),
 hostIdentityActive:and(eq(input('present'),literal(true)),eq(input('status'),literal('active')),eq(input('principalStatus'),literal('active'))),
 hostSessionTouch:and(finite(input('lastSeenAt')),finite(input('now')),not(less({kind:'subtract',left:input('now'),right:input('intervalMs')},input('lastSeenAt')))),
 forwardedLifetimeValid:and(finite(input('issuedAt')),finite(input('expiresAt')),less(input('issuedAt'),input('expiresAt')),not(less(input('maximumTtlMs'),{kind:'subtract',left:input('expiresAt'),right:input('issuedAt')}))),
 forwardedNotYetValid:less({kind:'add',left:input('now'),right:input('clockSkewMs')},input('issuedAt')),
 forwardedExpired:not(less({kind:'subtract',left:input('now'),right:input('clockSkewMs')},input('expiresAt'))),
};
const fields={actorType:{default:'Actor',check:'nonemptyString'},rolePredicate:{default:'role',check:'nonemptyString'},globalPermissionPredicate:{default:'can',check:'nonemptyString'}};
writeFileSync('.platform-reconstitution/sourcery-platform-reconciled/sdk/core/auth-decision-policy.json',JSON.stringify({protocol:'sourcery/authored-policy.v1',fields,expressions:{profile:'sourcery/expression-reduction-values/1',roots}},null,2)+'\n');
