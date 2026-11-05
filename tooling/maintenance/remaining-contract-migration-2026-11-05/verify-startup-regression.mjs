import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import * as current from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/startup-runtime.mjs';
const root=resolve('.platform-reconstitution/sourcery-platform-reconciled'),commit='c8a49c5032835cd37d4e9bc04cb2daf8cb8ce8f9',path='sdk/core/startup-runtime.mjs';
const bytes=execFileSync('git',['-c','safe.directory='+root,'-C',root,'show',commit+':'+path]);
let body=bytes.toString();for(const name of ['./rel-core.mjs','./lane-runtime.mjs'])body=body.replace(JSON.stringify(name),JSON.stringify(pathToFileURL(resolve(root,'sdk/core',name)).href));
const historical=await import('data:text/javascript;base64,'+Buffer.from(body).toString('base64'));
const facts=[{s:'a',p:'p',o:'x',pol:'is'}],lanes=Object.fromEntries([['__proto__',{witnesses:facts}],['ordinary',{witnesses:facts}]]),results=[];
for(const name of ['laneWitnessTexts','laneWitnessesS','laneWitnessFacts']){
 const before=historical[name]({lanes}),after=current[name]({lanes});
 const oldOwn=Object.hasOwn(before,'__proto__'),newOwn=Object.hasOwn(after,'__proto__'),ordinaryUnchanged=JSON.stringify(before.ordinary)===JSON.stringify(after.ordinary),prototypePreserved=Object.getPrototypeOf(after)===Object.prototype;
 if(oldOwn||!newOwn||!ordinaryUnchanged||!prototypePreserved)throw Error('Startup regression control failed: '+name);
 results.push({name,historicalOwnLane:oldOwn,currentOwnLane:newOwn,ordinaryUnchanged,currentOrdinaryPrototype:prototypePreserved,historicalPrototypeChanged:Object.getPrototypeOf(before)!==Object.prototype});
}
const receipt={commit,path,historicalSha256:createHash('sha256').update(bytes).digest('hex'),currentSha256:createHash('sha256').update(readFileSync(resolve(root,path))).digest('hex'),results,causalFamilies:1,scope:'Three serialization manifestations of one prototype-key custody defect; same-run engineering evidence, not three independent confirmations.',passed:true};
writeFileSync(new URL('startup-negative-control.json',import.meta.url),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));
