import fs from 'node:fs/promises';
import {materializeSourceGraph} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/source-bootstrap-materialize.mjs';
import {readManifest} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/source-bootstrap-files.mjs';
import {existsSync} from 'node:fs';
import {setTimeout} from 'node:timers/promises';
const [manifestPath,destination,output]=process.argv.slice(2),manifest=await readManifest(manifestPath),start=performance.now(),graph=await materializeSourceGraph(manifest,destination,process.env);
await fs.writeFile(output,JSON.stringify({graph,elapsedMilliseconds:performance.now()-start,scope:'Bundle materialization only, not qualification or measured application startup.'},null,2)+'\n');console.log(JSON.stringify({destination,materialized:true}));
// Serialize timed workloads. The candidate child is launched after the before
// graph, and must not release the controller into HTTP samples during CPU work.
if(destination.endsWith('candidate')){const deadline=Date.now()+180000;while(!existsSync(new URL('./paired-canonical-2.json',import.meta.url))){if(Date.now()>deadline)throw Error('Paired CPU measurements did not finish before application samples');await setTimeout(250);}}
