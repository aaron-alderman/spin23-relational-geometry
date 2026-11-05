import {readFileSync,writeFileSync} from 'node:fs';import {parse} from '../../../.platform-reconstitution/sourcery-platform-reconciled/node_modules/acorn/dist/acorn.mjs';
const path='.platform-reconstitution/sourcery-platform-reconciled/sdk/server/forwarded-identity-runtime.mjs';let text=readFileSync(path,'utf8');const ast=parse(text,{ecmaVersion:'latest',sourceType:'module'}),matches=[];function visit(node){if(!node||typeof node!=='object')return;if(node.type==='Property'&&node.method&&node.key.name==='verifyRequest')matches.push(node);for(const v of Object.values(node)){if(Array.isArray(v))v.forEach(visit);else if(v&&typeof v==='object')visit(v);}}visit(ast);if(matches.length!==1)throw Error('Exact verifier method required');const n=matches[0];text=text.slice(0,n.start)+`verifyRequest(req) {
      return Object.freeze(executeForwardedVerification({ req, issuer: resolvedIssuer, audience: resolvedAudience, keyId: resolvedKeyId, maximumTtlMs: resolvedMaximumTtlMs, clockSkewMs: resolvedClockSkewMs, defaultMethod: authDecisionPolicy.resolve("defaultRequestMethod"), defaultPath: authProviderPolicyValue("forwarded.defaultPath") }, {
        header: ({name}) => ({value:oneHeader(req?.headers,name)}),
        decode: ({value,label}) => ({value:decodeBase64Url(value,label)}),
        signature: ({payload,signature}) => ({value:verify(null,payload,resolvedPublicKey,signature)}),
        parse: ({payload}) => { try { return {value:{ok:true,value:JSON.parse(payload.toString("utf8"))}}; } catch { return {value:{ok:false}}; } },
        canonical: ({claim,payload}) => ({value:JSON.stringify(claim)===payload.toString("utf8")}),
        validateString: ({value,name,options}) => ({value:safeString(value,name,options)}),
        now: () => ({value:Number(now())}),
        lifetime: values => ({value:authDecisionPolicy.evaluate("forwardedLifetimeValid",values)}),
        future: values => ({value:authDecisionPolicy.evaluate("forwardedNotYetValid",values)}),
        expired: values => ({value:authDecisionPolicy.evaluate("forwardedExpired",values)}),
        refuse: ({message,code}) => { throw forwardedIdentityError(message,code); },
      }));
    }`+text.slice(n.end);text=text.replace('executeForwardedSigning}', 'executeForwardedSigning,executeForwardedVerification}');writeFileSync(path,text);
