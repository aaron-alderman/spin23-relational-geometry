const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const base=path.resolve('.platform-reconstitution'),source=path.join(base,'sourcery-platform-reconciled'),legacy=path.join(base,'sourcery-platform'),audit=__dirname;
const {parse}=require('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn');
const rows=require('./input-contracts.json').rows,sha=b=>crypto.createHash('sha256').update(b).digest('hex'),receipts=[];
function write(file,text){fs.mkdirSync(path.dirname(path.join(source,file)),{recursive:true});fs.writeFileSync(path.join(source,file),text);}
for(const row of rows){let text=fs.readFileSync(path.join(legacy,row.path),'utf8');if(sha(text)!==row.sha256)throw Error('Original changed');const original=text;
 if(row.syntax!=='valid')text=text.replace(/^iimport /,'import ').replace(/^mport /m,'import ');
 text=text.replace(/(['"])\.\.\/\.\.\/expression-algebra\/src\/(?:index\.mjs|operations\/[^'"]+\.mjs)\1/g,'"../sdk/core/platform-contract-values.mjs"');
 const selected='test/migration-contract-'+path.basename(row.path);write(selected,text);receipts.push({original:row.path,originalSha256:sha(original),selected,syntaxRepair:row.syntax!=='valid'});
}
// Recover regular assurance source only, preserving the legacy bytes and evidence identity.
const recovered=[];function copy(dir){for(const e of fs.readdirSync(path.join(legacy,dir),{withFileTypes:true})){const rel=dir+'/'+e.name;if(e.isDirectory())copy(rel);else if(e.isFile()){if(fs.existsSync(path.join(source,rel)))throw Error('Existing source '+rel);const bytes=fs.readFileSync(path.join(legacy,rel));write(rel,bytes);recovered.push({path:rel,sha256:sha(bytes),source:'retained legacy working tree; not certified historical authority'});}else throw Error('Unexpected link '+rel);}}
copy('assurance');
const facades={
 'sdk/plugins/data-space/deferred/runtime/projection-picker-values.mjs':['./projection-runtime.mjs','assetPickerCatalogRuleValue','assetPickerSyncTargetPageSubject','runtimeAssetPickerPage','runtimeAssetPickerQuery'],
 'sdk/plugins/data-space/deferred/runtime/projection-picker-filter-values.mjs':['./projection-runtime.mjs','filterAssetPickerOptions'],
 'sdk/server/durable-generation-values.mjs':['./durable-generation-store.mjs','publicGeneration','publicLifecycleState'],
 'sdk/server/filesystem-capability-projections.mjs':['./filesystem-capability-runtime.mjs','authorizationContext','maxTraversal','policyKey','traversalCovers'],
 'sdk/plugins/mcp/fact-projection.mjs':['./runtime.mjs','sortedStrings','sortBySubject','sortByName','sortByOrderThenSubject','sortByFact','sortByAuthoredFact'],
 'sdk/plugins/mcp/stable-json.mjs':['./runtime.mjs','plainJsonValue','stableJsonValue','stableJsonString','stableHash'],
 'sdk/server/operator-workspace-values.mjs':['./operator-workspace.mjs','normalizeEvent','publicWorkspace','publicGeneration','withoutPrivateFile'],
 'sdk/platform-daemon/platform-matrix-values.mjs':['./platform-matrix.mjs','normalizeHostname','normalizeName','normalizePathname','serviceSafe','linuxJoin','shellQuote','nginxJson'],
 'sdk/platform-daemon/project-extension-host-config.mjs':['./project-extension-host.mjs','startConfiguredProjectExtensionHost'],
 'sdk/core/semantic-authoring-lowering/merge-winners.mjs':['./merge-runtime.mjs','collectPropagatableWinners'],
 'sdk/platform-daemon/remote-deploy-mcp-protocol.mjs':['./remote-deploy-mcp-server.mjs','errorResponse','responseFor'],
 'sdk/platform-daemon/remote-deploy-mcp-dispatch.mjs':['./remote-deploy-mcp-server.mjs','handleRemoteDeployMcpRequest'],
 'sdk/server/server-routing-binding-values.mjs':['./server-routing.mjs','routePathForPageOnBinding','urlForPageOnBinding'],
 'sdk/core/semantic-index-taxonomy-ancestors.mjs':['./semantic-index.mjs','taxonomyAncestorsByTypeFor'],
 'sdk/core/semantic-index-taxonomy-descendants.mjs':['./semantic-index.mjs','taxonomyDescendantsByTypeFor'],
 'sdk/server/server-service-phase-receipt-values.mjs':['./server-service-runtime.mjs','phaseReceipt'],
 'sdk/server/server-service-closed-recovery-values.mjs':['./server-service-runtime.mjs','closedRecoveryReceipts'],
 'sdk/server/server-service-values.mjs':['./server-service-runtime.mjs','requestUsesStreamSetup','bindingForCommand'],
 'sdk/platform-daemon/app-template-policy.mjs':['./app-template-registry.mjs','TEMPLATE_DESCRIPTORS'],
};
for(const [file,[specifier,...names]]of Object.entries(facades)){const owner=path.resolve(source,path.dirname(file),specifier);let text=fs.readFileSync(owner,'utf8');const ast=parse(text,{ecmaVersion:'latest',sourceType:'module'}),exports=new Set(ast.body.filter(n=>n.type==='ExportNamedDeclaration').flatMap(n=>n.declaration?.id?[n.declaration.id.name]:n.declaration?.declarations?n.declaration.declarations.map(d=>d.id.name):n.specifiers.map(s=>s.exported.name)));const missing=names.filter(n=>!exports.has(n));if(missing.length)fs.writeFileSync(owner,text+'\n// Explicit domain contract surface; implementation remains shared with runtime callers.\nexport { '+missing.join(', ')+' };\n');write(file,'// Domain facade for the existing runtime owner.\nexport { '+names.join(', ')+' } from '+JSON.stringify(specifier)+';\n');}
fs.writeFileSync(path.join(audit,'preparation.json'),JSON.stringify({rows:receipts,recovered,facades},null,2)+'\n');console.log(JSON.stringify({contracts:rows.length,recovered:recovered.length,facades:Object.keys(facades).length}));
