import {readFileSync,writeFileSync,readdirSync,lstatSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {parseRawRel} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/sdk/rel.mjs';
import {factsBySubject} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/rel-fact-index.mjs';
const file=new URL('retained-review.json',import.meta.url),review=JSON.parse(readFileSync(file)),base=resolve('.platform-reconstitution'),sha=b=>createHash('sha256').update(b).digest('hex');
const roots=readdirSync(base,{withFileTypes:true}).filter(d=>d.isDirectory()&&/^(expression-algebra-|claimipedia-core-)/.test(d.name)&&!d.name.includes('validation')).map(d=>resolve(base,d.name));
for(const d of readdirSync(resolve(base,'worktrees'),{withFileTypes:true}))if(d.isDirectory()&&!d.isSymbolicLink())roots.push(resolve(base,'worktrees',d.name));
const fields=['sourceDomain','targetDomain','forwardMap','reverseMapOrAbsence','preservedInformation','lostInformation','identity','partiality','failure','authorityEffect','stateOwner','evidence','falsifier','default'];
for(const row of review.records.filter(r=>!r.completeVariants)){
 for(const root of roots){const path=resolve(root,row.source);if(!existsSync(path)||!lstatSync(path).isFile())continue;const bytes=readFileSync(path),facts=factsBySubject(parseRawRel(bytes.toString(),{file:path})).get(row.subject);if(!facts||row.variants.some(v=>JSON.stringify(v.facts)===JSON.stringify(facts)))continue;row.variants.push({commit:null,retainedCopy:path,sha256:sha(bytes),sourceText:bytes.toString(),facts,complete:facts.isa?.includes('AlgebraModule')&&fields.every(f=>facts[f]?.length),gitHistoryRecovered:false});}
 row.completeVariants=row.variants.filter(v=>v.complete).length;
}
writeFileSync(file,JSON.stringify(review,null,2)+'\n');console.log(JSON.stringify({remainingWithoutComplete:review.records.filter(r=>!r.completeVariants).map(r=>r.subject),copyRecoveries:review.records.filter(r=>r.variants.some(v=>v.retainedCopy)).map(r=>({subject:r.subject,complete:r.completeVariants}))}));
