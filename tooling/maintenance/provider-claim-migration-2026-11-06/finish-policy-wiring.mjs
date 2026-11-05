import {readFileSync,writeFileSync} from 'node:fs';
const root='.platform-reconstitution/sourcery-platform-reconciled/';
let path=root+'sdk/server/forwarded-identity-runtime.mjs',text=readFileSync(path,'utf8');text=text.replace('const CLAIM_KEYS = Object.freeze(authProviderPolicyValue("forwarded.fields"));\n','').replace('normalizeForwardedString,validForwardedRevision,','normalizeForwardedString,').replace('hostIdentityCookieName = "rel_project_host_session"','hostIdentityCookieName = authProviderPolicyValue("auth.hostCookie")').replace('stripAuthorization = true','stripAuthorization = authProviderPolicyValue("forwarded.stripAuthorization")').replace('platformAuthCookieNames = ["rel_auth", "rel_actor"]','platformAuthCookieNames = authProviderPolicyValue("forwarded.platformCookies")');
const before=`    if ([
      FORWARDED_IDENTITY_HEADER,
      FORWARDED_IDENTITY_SIGNATURE_HEADER,
      "x-rel-actor",
    ].includes(name)) continue;
    if (stripAuthorization && name === "authorization") continue;
    if (name === "cookie") {`;
if(text.split(before).length!==2)throw Error('Header disposition anchor changed');text=text.replace(before,`    const disposition = authProviderPolicyValue("forwarded.headerDisposition", {name,stripAuthorization});
    if (disposition === "strip") continue;
    if (disposition === "cookies") {`).replace('value.split("=", 1)[0])','value.split("=", 1)[0].trim())');writeFileSync(path,text);
path=root+'sdk/server/identity-runtime.mjs';text=readFileSync(path,'utf8').replace('export const HOST_IDENTITY_COOKIE = "rel_project_host_session";','export const HOST_IDENTITY_COOKIE = authProviderPolicyValue("auth.hostCookie");').replace('export const HOST_IDENTITY_SCHEMA_VERSION = 2;','export const HOST_IDENTITY_SCHEMA_VERSION = authProviderPolicyValue("auth.hostSchemaVersion");').replace('export const HOST_IDENTITY_CLAIM_VERSION = "verified-host-identity/v1";','export const HOST_IDENTITY_CLAIM_VERSION = authProviderPolicyValue("auth.hostClaimVersion");').replaceAll('schemaVersion: "platform-principal/v1"','schemaVersion: authProviderPolicyValue("auth.principalVersion")');writeFileSync(path,text);
