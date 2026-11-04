const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{pathToFileURL}=require('node:url');
const root=path.resolve('.platform-reconstitution/sourcery-platform-reconciled'),before=JSON.parse(fs.readFileSync(path.join(__dirname,'runtime-performance-before.json'))),out=path.resolve('.platform-reconstitution/browser-boundary-validation-2026-11-05/performance-before');
const replacements={
 'canvas-renderer':`export function canvasInteractionRegionAt(built,type,point) {
  if (![point?.x,point?.y].every(Number.isFinite)) {
    const error = new Error("Canvas hit testing requires a finite point."); error.code = "invalid-canvas-point"; throw error;
  }
  return [...built.interactive].reverse().find(region => region.type === type && point.x >= region.x && point.x < region.x+region.w && point.y >= region.y && point.y < region.y+region.h);
}`,
 'frontend':`function uniqueNetTarget(net,key,value) {
  if (typeof value !== "string" || !value) return null;
  const matches = netSurfaceTargets(net).filter(target => Object.hasOwn(target,key) && target[key] === value);
  if (matches.length > 1) throw runtimeError("Ambiguous browser RouteTarget.","ambiguous-route-target",{[key]:value});
  return matches[0] || null;
}`};
const rows=[];fs.mkdirSync(out,{recursive:true});for(const [name,body]of Object.entries(replacements)){const p='sdk/browser/'+name+'.mjs',text=fs.readFileSync(path.join(root,p),'utf8'),start=text.indexOf(name==='frontend'?'function uniqueNetTarget(':'export function canvasInteractionRegionAt('),end=text.indexOf('\n}',start)+2;if(start<0||end<2)throw Error('Function boundary absent');const reconstructed=text.slice(0,start)+body+text.slice(end),hash=crypto.createHash('sha256').update(reconstructed).digest('hex');if(hash!==before.sourceSha256[p])throw Error('Pre-performance full-file identity mismatch');const fixture=reconstructed.replace(/(["'])(\.\.?\/[^"'\r\n]+)\1/g,(_m,q,s)=>q+pathToFileURL(path.resolve(root,path.dirname(p),s)).href+q);fs.writeFileSync(path.join(out,name+'.mjs'),fixture);rows.push({path:p,beforeSha256:hash,recordedBeforeSha256:before.sourceSha256[p],exactReconstruction:true,fixtureSha256:crypto.createHash('sha256').update(fixture).digest('hex')});}
fs.writeFileSync(path.join(__dirname,'runtime-performance-reconstruction.json'),JSON.stringify({rows,method:'Reverse only the two performance changes; require exact full-file hashes from the recorded pre-performance measurement before emitting fixtures. Relative imports point to current unchanged dependencies.'},null,2)+'\n');
