import {readFileSync,writeFileSync} from 'node:fs';
import {parse} from '../../../.platform-reconstitution/sourcery-platform-reconciled/node_modules/acorn/dist/acorn.mjs';
const root='.platform-reconstitution/sourcery-platform-reconciled/';
function replaceFunctions(path,replacements){let text=readFileSync(root+path,'utf8');const nodes=parse(text,{ecmaVersion:'latest',sourceType:'module'}).body;for(const [name,replacement]of Object.entries(replacements)){const matches=nodes.filter(n=>(n.declaration||n).type==='FunctionDeclaration'&&(n.declaration||n).id.name===name);if(matches.length!==1)throw Error('Exact existing function required: '+name);}const changes=nodes.filter(n=>Object.hasOwn(replacements,(n.declaration||n).id?.name)).sort((a,b)=>b.start-a.start);for(const n of changes)text=text.slice(0,n.start)+replacements[(n.declaration||n).id.name]+text.slice(n.end);return text;}
let text=replaceFunctions('sdk/server/auth-provider-runtime.mjs',{defaultAuthProvider:`function defaultAuthProvider(prog, binding) {
  const facts = authCredentialFacts(prog);
  let version, index;
  const refresh = () => {
    if (index && version === facts.version) return;
    const next = buildAuthCredentialIndex(facts, credential => {
      throw new RuntimeDiagnosticError([bindingIssue(
        binding,
        \`Binding \${binding?.subject || "<unknown>"} authors duplicate AuthCredential.identifier "\${credential.identifier}".\`,
        { code: "duplicate-auth-identifier", subject: credential.subject, predicate: "identifier" },
      )], { code: "duplicate-auth-identifier", title: \`Runtime startup failed for binding \${binding?.subject || "<unknown>"}\` });
    });
    index = next; version = facts.version;
  };
  refresh();
  return {
    authenticate({ identifier, secret }) { refresh(); return authenticateAuthCredential(index.credentials, identifier, secret); },
    identifierForActor(actor) { refresh(); return identifierForAuthActor(index.labels, actor); },
  };
}`});
text='import {authCredentialFacts,buildAuthCredentialIndex,authenticateAuthCredential,identifierForAuthActor} from "./auth-provider-policy.mjs";\n'+text;writeFileSync(root+'sdk/server/auth-provider-runtime.mjs',text);
text=replaceFunctions('sdk/server/identity-runtime.mjs',{normalizeProviderIdentity:'',createStaticIdentityProvider:'',createAuthoredProjectIdentityProvider:''});
text='import {normalizeAuthProviderIdentity as normalizeProviderIdentity,authProviderPolicyValue} from "./auth-provider-policy.mjs";\nexport {createPolicyStaticIdentityProvider as createStaticIdentityProvider,createPolicyAuthoredProjectIdentityProvider as createAuthoredProjectIdentityProvider} from "./auth-provider-policy.mjs";\n'+text;
text=text.replace('randomBytes, scryptSync, timingSafeEqual','randomBytes, timingSafeEqual').replace('const SAFE_PRINCIPAL = /^[A-Za-z0-9._:-]{1,160}$/u;','const SAFE_PRINCIPAL = new RegExp(authProviderPolicyValue("auth.principalPattern"), authProviderPolicyValue("auth.principalFlags"));').replace('const IDENTITY_KINDS = new Set(["user", "agent", "service"]);','const IDENTITY_KINDS = new Set(authProviderPolicyValue("auth.kinds"));').replaceAll('"rel-project-host"','authProviderPolicyValue("auth.hostIssuer")');
writeFileSync(root+'sdk/server/identity-runtime.mjs',text);
text=replaceFunctions('sdk/server/forwarded-identity-runtime.mjs',{
 safeString:`function safeString(value, name, options) { return normalizeForwardedString(value, name, options, forwardedIdentityError); }`,
 safeKeyId:`function safeKeyId(value) { return normalizeForwardedString(value, "keyId", { optional: false, maximum: authProviderPolicyValue("forwarded.maximumKeyId"), pattern: authProviderPolicyValue("forwarded.keyPattern") }, forwardedIdentityError); }`,
});
text='import {authProviderPolicyValue,normalizeForwardedString,validForwardedRevision} from "./auth-provider-policy.mjs";\n'+text;
text=text.replace('export const FORWARDED_IDENTITY_SCHEMA_VERSION = "verified-forwarded-identity/v1";','export const FORWARDED_IDENTITY_SCHEMA_VERSION = authProviderPolicyValue("forwarded.version");').replace('export const FORWARDED_IDENTITY_HEADER = "x-rel-forwarded-identity";','export const FORWARDED_IDENTITY_HEADER = authProviderPolicyValue("forwarded.header");').replace('export const FORWARDED_IDENTITY_SIGNATURE_HEADER = "x-rel-forwarded-identity-signature";','export const FORWARDED_IDENTITY_SIGNATURE_HEADER = authProviderPolicyValue("forwarded.signatureHeader");');
const start=text.indexOf('const CLAIM_KEYS = Object.freeze(['),end=text.indexOf(']);',start)+3;if(start<0||end<3)throw Error('Existing claim field catalogue required');text=text.slice(0,start)+'const CLAIM_KEYS = Object.freeze(authProviderPolicyValue("forwarded.fields"));'+text.slice(end);
text=text.replace('const SAFE_TOKEN = /^[A-Za-z0-9][A-Za-z0-9._:@/+-]{0,255}$/u;\n','').replace('const SAFE_KEY_ID = /^[A-Za-z0-9_-]{1,64}$/u;\n','').replaceAll('!Number.isInteger(claim.identityRevision) || claim.identityRevision < 0','!validForwardedRevision(claim.identityRevision)').replaceAll('!Number.isInteger(claim.principalRevision) || claim.principalRevision < 0','!validForwardedRevision(claim.principalRevision)');
writeFileSync(root+'sdk/server/forwarded-identity-runtime.mjs',text);
