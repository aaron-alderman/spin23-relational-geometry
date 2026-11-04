const fs=require('fs'),p=require('path'),root=p.resolve('.platform-reconstitution/sourcery-platform-reconciled');
function edit(file,fn){const path=p.join(root,file),before=fs.readFileSync(path,'utf8'),after=fn(before);if(after===before)throw Error('No change '+file);fs.writeFileSync(path,after);}
edit('sdk/browser/frontend-session-runtime.mjs',s=>{
 const helper=`export function sessionInspectorSessionId(windowObject, queryParam) {\n  const id = new URL(windowObject.location.href).searchParams.get(queryParam);\n  if (!id) throw new Error(\`Missing required query parameter: \${queryParam}\`);\n  return id;\n}\n\n`;
 s=s.replace('export async function mountSessionInspectorPageRuntime',helper+'export async function mountSessionInspectorPageRuntime').replace('  const sessionId = new URL(windowObject.location.href).searchParams.get(queryParam);\n  if (!sessionId) throw new Error(`Missing required query parameter: ${queryParam}`);','  const sessionId = sessionInspectorSessionId(windowObject, queryParam);');
 s=s.replace('  const render = () => controller?.render();','  let cleanup = null;\n  try {\n  const render = () => controller?.render();');
 const start=s.indexOf('  let stream = new eventSourceCtor'),end=s.lastIndexOf('\n}');
 const tail=`  let stream = null;
  let disposed = false;
  let pageHidden = false;
  const onPageShow = () => { if (!disposed) pageHidden = false; };
  const onPageHide = event => { pageHidden = true; if (event?.persisted !== true) dispose(); };
  const onBackend = event => { if (disposed || pageHidden) return; memory.runtime.sessionStatus = "streaming"; consumePublishedPublication({eventName:"backend",event,metadata:sessionEventMetadataFor(memory,"backend")}); render(); };
  const onFrontend = event => { if (disposed || pageHidden) return; memory.runtime.sessionStatus = "streaming"; consumePublishedPublication({eventName:"frontend",event,metadata:sessionEventMetadataFor(memory,"frontend")}); render(); };
  const onBackendMeta = event => { if (!disposed && !pageHidden) rememberSessionEventMetadata(memory,"backend",event); };
  const onFrontendMeta = event => { if (!disposed && !pageHidden) rememberSessionEventMetadata(memory,"frontend",event); };
  const listeners = [["backend",onBackend],["backend.meta",onBackendMeta],["frontend",onFrontend],["frontend.meta",onFrontendMeta]];
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    let failure;
    const attempt = fn => { try { fn(); } catch (error) { failure ||= error; } };
    attempt(() => windowObject?.removeEventListener?.("pagehide",onPageHide));
    attempt(() => windowObject?.removeEventListener?.("pageshow",onPageShow));
    const ownedStream = stream; stream = null;
    if (ownedStream) {
      for (const [name,handler] of listeners) attempt(() => ownedStream.removeEventListener?.(name,handler));
      attempt(() => { ownedStream.onerror = null; });
      attempt(() => ownedStream.close());
    }
    const ownedController = controller; controller = null;
    attempt(() => ownedController?.dispose());
    attempt(() => container.replaceChildren());
    if (failure) throw failure;
  };
  cleanup = dispose;
  stream = new eventSourceCtor(resolvedNet.urlForSessionEvents(sessionId));
  windowObject?.addEventListener?.("pagehide",onPageHide);
  windowObject?.addEventListener?.("pageshow",onPageShow);
  for (const [name,handler] of listeners) stream.addEventListener(name,handler);
  stream.onerror = error => { if (disposed || pageHidden) return; if (memory.runtime.sessionStatus !== "missing") memory.runtime.sessionStatus = "stream-error"; console.error(error); };
  return dispose;
  } catch (error) {
    if (cleanup) { try { cleanup(); } catch { /* Preserve the setup failure. */ } }
    else { try { controller?.dispose(); } catch {} controller = null; try { container.replaceChildren(); } catch {} }
    throw error;
  }`;
 return s.slice(0,start)+tail+s.slice(end);
});
edit('sdk/browser/canvas-renderer.mjs',s=>{
 for(const name of ['snapshotCanvasSession','restoreCanvasSession','snapshotWorkbenchDraft','restoreWorkbenchDraft','normalizeLensMode'])s=s.replace('function '+name+'(', 'export function '+name+'(');
 s=s.replace('const LENS_MODES = Object.freeze(', 'const LENS_MODES = Object.freeze('); // Existing runtime constants remain the actual owners.
 s=s.replace('const DEFAULT_LENS_MODE = "options";',`const DEFAULT_LENS_MODE = "options";\nexport function canvasAuthoredVocabulary() {\n  return Object.freeze({lensModes:LENS_MODES,defaultLensMode:DEFAULT_LENS_MODE,listTargetActions:Object.freeze([...LIST_TARGET_ACTION_KINDS])});\n}`);
 s=s.replace('      !transient.has(key),\n    ),','      !transient.has(key),\n    ).map(([key,value]) => [key,cloneCanvasStateValue(value)]),');
 s=s.replace('function snapshotPersistentWorkbenchUi(state, built = null) {\n  const ui = ensureWorkbenchUiState(state);','function snapshotPersistentWorkbenchUi(state, built = null) {\n  const ui = state?.runtime?.workbenchUi || {};');
 s=s.replace('function snapshotWorkbenchViewContext(state, built = null) {\n  if (!built) return null;\n  const ui = ensureWorkbenchUiState(state);','function snapshotWorkbenchViewContext(state, built = null) {\n  if (!built) return null;\n  const ui = state?.runtime?.workbenchUi || {};');
 s=s.replace('export function restoreCanvasSession(state, snapshot = {}) {','function checkedWorkbenchSnapshot(snapshot) {\n  const record = value => value && typeof value === "object" && !Array.isArray(value);\n  if (!record(snapshot) || !record(snapshot.viewState) || (snapshot.runtime !== undefined && !record(snapshot.runtime)) || (snapshot.runtime?.workbenchUi !== undefined && !record(snapshot.runtime.workbenchUi))) {\n    const error = new Error("Malformed workbench snapshot."); error.code = "invalid-workbench-snapshot"; throw error;\n  }\n  return cloneCanvasStateValue(snapshot);\n}\n\nexport function restoreCanvasSession(state, snapshot = {}) {\n  snapshot = checkedWorkbenchSnapshot(snapshot);');
 s=s.replace('export function restoreWorkbenchDraft(state, snapshot = {}) {','export function restoreWorkbenchDraft(state, snapshot = {}) {\n  snapshot = checkedWorkbenchSnapshot(snapshot);');
 s=s.replace('Object.entries(pageState(state)).filter(([key]) => key.startsWith(WORKBENCH_VIEW_PREFIX))','Object.entries(pageState(state)).filter(([key]) => key.startsWith(WORKBENCH_VIEW_PREFIX)).map(([key,value]) => [key,cloneCanvasStateValue(value)])');
 // A malformed persisted payload must not masquerade as an empty successful restore.
 s=s.replace('restoreCanvasSession(state, safeJsonParse(stored, {}));','let snapshot;\n  try { snapshot = JSON.parse(stored); } catch (cause) { const error = new Error("Malformed persisted workbench snapshot.",{cause}); error.code = "invalid-workbench-snapshot"; throw error; }\n  restoreCanvasSession(state, snapshot);');
 return s;
});
edit('sdk/browser/frontend.mjs',s=>{
 for(const name of ['parseProgramTransfer','runtimeAssetsFromPayload','runtimeAssetSourcesForKind','deferredProgramBoundaries','resolveDeferredUrl','resolveDeferredProgramChain','resolveInlineStartupProgram','responseRelFormat'])s=s.replace('function '+name+'(', 'export function '+name+'('); // async declarations also match this exact substring.
 s=s.replace('  if (header === "B") return "B";','  if (header && !["B","S","rel"].includes(header)) throw runtimeError(`Unsupported startup transfer format: ${header}`,"invalid-startup-transfer-format");\n  if (header === "B") return "B";');
 s=s.replace('function parseProgramTransfer(payload) {','function parseProgramTransfer(payload) {\n  if (payload?.format && !["B","S","rel"].includes(payload.format)) throw runtimeError(`Unsupported startup transfer format: ${payload.format}`,"invalid-startup-transfer-format");');
 s=s.replace('if (!value || typeof value !== "object" || Array.isArray(value)) return null;','if (!value || typeof value !== "object" || Array.isArray(value)) throw runtimeError("Invalid startup runtime asset record.","invalid-startup-runtime-asset");');
 s=s.replace('  if (!browserPath && !file) return null;','  if (!browserPath && !file) throw runtimeError("Startup runtime asset requires browserPath or file.","invalid-startup-runtime-asset");');
 s=s.replace('    if (!Array.isArray(parsed)) return [];','    if (!Array.isArray(parsed)) throw runtimeError("Startup runtime asset header must contain an array.","invalid-startup-runtime-asset");');
 s=s.replace('Array.isArray(payload?.runtimeAssets) && payload.runtimeAssets.length','Array.isArray(payload?.runtimeAssets)');
 s=s.replace('const key = asset.browserPath || asset.file || "";','const key = JSON.stringify([asset.browserPath || "",asset.file || ""]);');
 s=s.replace('    const next = deferredProgramBoundaries(current.facts, programUrl)\n      .find(boundary => !loaded.has(boundary.url));\n    if (!next) return current;','    const boundaries = deferredProgramBoundaries(current.facts, programUrl);\n    const next = boundaries.find(boundary => !loaded.has(boundary.url));\n    if (!next) {\n      if (boundaries.length) throw runtimeError("Cyclic deferred startup program chain.","cyclic-startup-transfer");\n      return current;\n    }');
 s=s.replace('  const message = error?.message || "";','  const message = error?.message || "";');
 s=s.replace('      ...(error.renderer ? { renderer: error.renderer } : {}),','      ...(error.renderer ? { renderer: error.renderer } : {}),\n      ...Object.fromEntries(["subject","predicate","details","authority","status"].filter(key => error[key] !== undefined).map(key => [key,error[key]])),');
 s=s.replace('const issues = explicitIssues.length ? explicitIssues : [synthesizedRuntimeIssue(error)].filter(Boolean);','const issues = explicitIssues.length ? explicitIssues : [synthesizedRuntimeIssue(error) || {code:"unknown-runtime-failure",message:typeof error === "string" && error ? error : error?.message || fallback}];');
 s=s.replace('    at: "runtime",\n  };','    ...(error?.status !== undefined ? {status:error.status} : {}),\n    ...(error?.cause ? {causeKind:String(error.cause.code || error.cause.name || typeof error.cause)} : {}),\n    at: "runtime",\n  };');
 return s;
});
console.log('Repaired inspector resource custody, canvas snapshot isolation/refusal, startup format/asset/cycle handling and diagnostic evidence.');
