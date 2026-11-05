// Extend the authored document without replacing any previously qualified root.
import {readFileSync,writeFileSync} from 'node:fs';
const file=new URL('../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/auth-decision-policy.json',import.meta.url),document=JSON.parse(readFileSync(file));
const input=surface=>({kind:'input',surface}),literal=value=>({kind:'typedLiteral',valueType:value===null?'null':typeof value,value:String(value)}),eq=(left,right)=>({kind:'strictEq',left,right}),choose=(condition,yes,no)=>({kind:'if',condition,then:yes,else:no}),not=value=>choose(value,literal(false),literal(true)),and=(...values)=>({kind:'and',entries:values.map(value=>({value}))}),list=values=>({kind:'list',entries:values.map(value=>({value:literal(value)}))}),record=entries=>({kind:'record',entries:Object.entries(entries).map(([name,value])=>({name,value:literal(value)}))}),includes=(value,search)=>({kind:'includes',value,search});
const roots={
 requestIdentityLane:choose(input('hasForwardedPrincipal'),literal('forwarded'),choose(input('forwardingConfigured'),literal('anonymous'),literal('local'))),
 localIdentityLane:choose(input('hasCookieActor'),literal('cookie'),literal('header')),
 requestMutating:not(includes(list(['GET','HEAD','OPTIONS','TRACE']),input('method'))),
 csrfSessionEligible:and(input('hasActor'),input('hasToken')),
 bodyLimits:record({json:1048576,form:1048576,sessionText:2097152,assetUpload:26214400,deployPayload:52428800}),
 csrfBodyTokenKind:choose(includes(input('contentType'),literal('application/json')),literal('json'),choose(includes(input('contentType'),literal('application/x-www-form-urlencoded')),literal('form'),literal('none'))),
 csrfNeedsBody:and(not(input('hasToken')),not(eq(input('bodyTokenKind'),literal('none')))),
 csrfBodyLimitName:choose(eq(input('routeAs'),literal('sessionWrite')),literal('sessionText'),literal('json')),
 csrfFailure:choose(input('hasToken'),choose(input('matches'),literal(null),literal('csrf-token-invalid')),literal('csrf-token-missing')),
 csrfFailureMessage:choose(eq(input('code'),literal('csrf-token-invalid')),literal('CSRF token is invalid for the authenticated session.'),literal('CSRF token is required for cookie-authenticated mutations.')),
};
for(const [name,value]of Object.entries(roots)){if(Object.hasOwn(document.expressions.roots,name)&&JSON.stringify(document.expressions.roots[name])!==JSON.stringify(value))throw Error('Existing authored root differs: '+name);document.expressions.roots[name]=value;}
for(const [name,value]of Object.entries({defaultRequestMethod:'GET',csrfHeaderName:'x-rel-csrf-token'})){const field={default:value,check:'nonemptyString'};if(Object.hasOwn(document.fields,name)&&JSON.stringify(document.fields[name])!==JSON.stringify(field))throw Error('Existing authored field differs: '+name);document.fields[name]=field;}
writeFileSync(file,JSON.stringify(document,null,2)+'\n');
