import {readFileSync,writeFileSync} from 'node:fs';
import {parse} from '../../../.platform-reconstitution/sourcery-platform-reconciled/node_modules/acorn/dist/acorn.mjs';
const path='.platform-reconstitution/sourcery-platform-reconciled/sdk/server/forwarded-identity-runtime.mjs';let text=readFileSync(path,'utf8');const ast=parse(text,{ecmaVersion:'latest',sourceType:'module'}),matches=[];
function visit(node){if(!node||typeof node!=='object')return;if(node.type==='Property'&&node.method&&node.key.name==='signRequest')matches.push(node);for(const value of Object.values(node)){if(Array.isArray(value))value.forEach(visit);else if(value&&typeof value==='object')visit(value);}}visit(ast);if(matches.length!==1)throw Error('Exact signing method required');const n=matches[0];text=text.slice(0,n.start)+`signRequest(req, { auth, audience } = {}) {
      return Object.freeze(executeForwardedSigning({ req, auth, audience, issuer: resolvedIssuer, keyId, ttlMs: resolvedTtlMs, defaultMethod: authDecisionPolicy.resolve("defaultRequestMethod"), defaultPath: authProviderPolicyValue("forwarded.defaultPath") }, {
        now: () => ({ value: Number(now()) }),
        uuid: () => ({ value: randomUUID() }),
        validateString: ({value,name,options}) => ({value:safeString(value,name,options)}),
        signerRefuse: ({message}) => { throw new Error(message); },
        sign: ({claim}) => {
          const payload = Buffer.from(JSON.stringify(claim), "utf8");
          return {value:{claim:payload.toString("base64url"),signature:sign(null,payload,resolvedPrivateKey).toString("base64url")}};
        },
      }));
    }`+text.slice(n.end);text=text.replace('validForwardedRevision}', 'validForwardedRevision,executeForwardedSigning}');writeFileSync(path,text);
