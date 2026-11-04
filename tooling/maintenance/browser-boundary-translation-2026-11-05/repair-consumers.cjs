const fs=require('fs'),p=require('path'),root=p.resolve('.platform-reconstitution/sourcery-platform-reconciled');
function edit(file,fn){const path=p.join(root,file),before=fs.readFileSync(path,'utf8'),after=fn(before);if(after===before)throw Error('No change '+file);fs.writeFileSync(path,after);}
edit('sdk/browser/frontend-runtime-registry.mjs',s=>{
 s=`import {emptyObject,falsyOr} from './browser-runtime-defaults.mjs';\nimport {runtimeSourceObject,importRuntimeModule} from './browser-runtime-source.mjs';\n`+s;
 s=s.replace('if (exported == null) return {};','if (exported == null) return emptyObject(undefined);');
 const start=s.indexOf('  if (source && typeof source === "object"',s.indexOf('async function sourceSpecifier')),end=s.indexOf('  if (typeof source !== "string")',start);
 s=s.slice(0,start)+'  const structured = runtimeSourceObject(source,sourceSpecifier,nodeProcess);\n  if (structured.matched) return structured.value;\n'+s.slice(end);
 const from=s.indexOf('async function importFrontendRuntimeModule('),to=s.indexOf('\nfunction materializeFrontendRuntimeRegistry',from);
 s=s.slice(0,from)+'async function importFrontendRuntimeModule(source) { return importRuntimeModule(source,sourceSpecifier,"frontendRuntime"); }\n'+s.slice(to);
 s=s.replace('async function sourceSpecifier(', 'export async function frontendRuntimeSourceSpecifier(').replaceAll('sourceSpecifier,nodeProcess','frontendRuntimeSourceSpecifier,nodeProcess').replaceAll('source,sourceSpecifier,','source,frontendRuntimeSourceSpecifier,');
 s=s.replace('runtime?.name || `frontend runtime #','falsyOr(runtime?.name, `frontend runtime #').replace('` ,','` ,');
 // Keep label spelling and default behavior; only actual empty-object policy and source delegation change here.
 s=s.replace('falsyOr(runtime?.name, `frontend runtime #','runtime?.name || `frontend runtime #');
 return s;
});
for(const [file,capability]of [['renderer-registry.mjs','projectionRuntime'],['semantic-mutation-runtime-registry.mjs','semanticMutationRuntime']])edit('sdk/browser/'+file,s=>{
 s=`import {emptyObject,emptyArray} from './browser-runtime-defaults.mjs';\nimport {importRuntimeModule} from './browser-runtime-source.mjs';\nimport {portableRuntimeSourceSpecifier} from './portable-runtime-source.mjs';\n`+s;
 s=s.replaceAll('if (exported == null) return {};','if (exported == null) return emptyObject(undefined);').replace('if (values == null) return [];','if (values == null) return emptyArray(undefined);');
 const start=s.indexOf('async function sourceSpecifier('),end=s.indexOf('\nfunction materializeSemanticMutationRuntimeRegistry',start);
 if(capability==='semanticMutationRuntime')s=s.slice(0,start)+'async function importSemanticMutationRuntimeModule(source) { return importRuntimeModule(source,portableRuntimeSourceSpecifier,"semanticMutationRuntime"); }\n'+s.slice(end);
 else {const to=s.indexOf('\nexport function resetProjectionRuntime',start);s=s.slice(0,start)+'async function importProjectionRuntimeModule(source) { return importRuntimeModule(source,portableRuntimeSourceSpecifier,"projectionRuntime"); }\n'+s.slice(to);}
 return s;
});
edit('sdk/browser/canvas-renderer.mjs',s=>{
 const start=s.indexOf('export function canvasPointFromEvent('),end=s.indexOf('\nfunction syncListViewport',start);
 return s.slice(0,start)+`export function canvasPointFromEvent(canvas, built, event) {
  const rect = canvas.getBoundingClientRect();
  const positive = value => Number.isFinite(value) && value > 0;
  if (!rect || ![rect.left,rect.top].every(Number.isFinite) || ![rect.width,rect.height,built?.width,built?.height,built?.cellWidth,built?.cellHeight].every(positive) || ![built?.cols,built?.rows].every(value => Number.isSafeInteger(value) && value > 0) || ![event?.clientX,event?.clientY].every(Number.isFinite)) {
    const error = new Error("Canvas hit testing requires finite coordinates and positive geometry.");
    error.code = "invalid-canvas-geometry";
    throw error;
  }
  const cell = (coordinate,origin,span,frameSpan,cellSpan,count) => {
    const normalized = (coordinate-origin)/span;
    if (normalized <= 0) return 0;
    if (normalized >= 1) return count-1;
    return clamp(Math.floor(normalized*frameSpan/cellSpan),0,count-1);
  };
  return {x:cell(event.clientX,rect.left,rect.width,built.width,built.cellWidth,built.cols),y:cell(event.clientY,rect.top,rect.height,built.height,built.cellHeight,built.rows)};
}

export function canvasInteractionAt(built,type,point) {
  return canvasInteractionRegionAt(built,type,point)?.action;
}

export function canvasInteractionRegionAt(built,type,point) {
  if (![point?.x,point?.y].every(Number.isFinite)) {
    const error = new Error("Canvas hit testing requires a finite point."); error.code = "invalid-canvas-point"; throw error;
  }
  return [...built.interactive].reverse().find(region => region.type === type && point.x >= region.x && point.x < region.x+region.w && point.y >= region.y && point.y < region.y+region.h);
}
`+s.slice(end);
});
edit('sdk/browser/frontend.mjs',s=>{
 s=`import {falsyOr} from './browser-runtime-defaults.mjs';\n`+s;
 const start=s.indexOf('function netSurfaceTargets('),end=s.indexOf('\nfunction conflictPolicySubjects',start);
 s=s.slice(0,start)+`export function netSurfaceTargets(net = {}) {
  const targets = net?.surfaceTargets;
  if (targets == null) return [];
  if (!Array.isArray(targets) || targets.some(target => !target || typeof target !== "object" || Array.isArray(target))) throw runtimeError("RouteTarget list must contain records.","invalid-route-targets");
  return targets;
}

function uniqueNetTarget(net,key,value) {
  const matches = netSurfaceTargets(net).filter(target => target[key] === value);
  if (matches.length > 1) throw runtimeError("Ambiguous browser RouteTarget.","ambiguous-route-target",{[key]:value});
  return matches[0] || null;
}
export function netSurfaceTargetByRole(net = {},role = "") { return uniqueNetTarget(net,"role",role); }
export function netSurfaceTargetBySubject(net = {},subject = "") { return uniqueNetTarget(net,"subject",subject); }
export function requireNetSurfaceTarget(net = {},role = "") {
  const target = netSurfaceTargetByRole(net,role);
  if (target) return target;
  throw runtimeError(\`Missing required RouteTarget role "\${role}".\`,"missing-route-target",{role});
}
export function netSurfaceTargetPage(net = {},role = "") { return String(requireNetSurfaceTarget(net,role)?.page || "").trim(); }
export function netSurfaceTargetUrl(net = {},role = "",options = {}) { return routeTargetHref(requireNetSurfaceTarget(net,role),urlForSurface,options); }
`+s.slice(end);
 const from=s.indexOf('function requireBrowserOrigin('),to=s.indexOf('\nfunction reversePlanUrlForNet',from);
 s=s.slice(0,from)+`export function requireBrowserOrigin(origin = "") {
  const candidate = origin || (typeof window === "object" && (window.location?.origin || (window.location?.href ? new URL(window.location.href).origin : "")));
  if (!candidate) throw runtimeError("Missing required browser origin.","missing-browser-origin");
  let url;
  try { url = new URL(candidate); } catch (cause) { throw runtimeError("Invalid browser origin.","invalid-browser-origin",{cause}); }
  if (!["http:","https:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) throw runtimeError("Invalid browser origin.","invalid-browser-origin");
  return url.origin;
}

function browserRouteUrl(base,options) {
  const origin = requireBrowserOrigin(options.origin);
  if (typeof base !== "string") throw runtimeError("Browser route URL must be a string.","invalid-browser-route-url");
  let url;
  try { url = new URL(base,origin); } catch (cause) { throw runtimeError("Invalid browser route URL.","invalid-browser-route-url",{cause}); }
  if (url.origin !== origin || url.username || url.password) throw runtimeError("Browser route URL cannot discard a foreign origin or credentials.","cross-origin-browser-route-url");
  return url;
}

export function queryUrl(base,key,value,options = {}) {
  const url = browserRouteUrl(base,options);
  url.searchParams.set(key,value);
  return url.pathname+url.search;
}

export function siblingRouteUrl(base,endpoint,options = {}) {
  const url = browserRouteUrl(falsyOr(base,"/"),options);
  if (typeof endpoint !== "string" || !endpoint || /[/?#]/.test(endpoint)) throw runtimeError("Sibling route endpoint must be one nonempty path segment.","invalid-browser-route-endpoint");
  const parts = url.pathname.split("/"); parts[parts.length-1] = endpoint; url.pathname = parts.join("/"); url.search = "";
  return url.pathname;
}
`+s.slice(to);
 s=s.replace('function reversePlanUrlForNet(', 'export function reversePlanUrlForNet(').replace('function mutationHistoryUrlForNet(', 'export function mutationHistoryUrlForNet(');
 // Pass explicit origins through both sibling endpoint helpers.
 s=s.replace('reversePlanUrlForNet(net = {})','reversePlanUrlForNet(net = {}, options = {})').replace('siblingRouteUrl(net.saveUrl || "/save", "plan-reverse-mutation")','siblingRouteUrl(net.saveUrl || "/save", "plan-reverse-mutation", options)');
 const u=s.indexOf('function urlForSurface('),v=s.indexOf('\nfunction snapshotText(',u);
 s=s.slice(0,u)+`export function urlForSurface(port,path,options = {}) {
  const url = browserRouteUrl(falsyOr(path,"/"),options);
  if (port) {
    const text = String(port),number = Number(text);
    if (!/^\\d+$/.test(text) || !Number.isSafeInteger(number) || number > 65535) throw runtimeError("Invalid browser surface port.","invalid-browser-port");
    url.port = String(number);
  }
  return url.toString();
}
`+s.slice(v);
 return s;
});
console.log('Wired shared browser defaults/source boundaries; repaired hit-test and origin-aware routing guards.');
