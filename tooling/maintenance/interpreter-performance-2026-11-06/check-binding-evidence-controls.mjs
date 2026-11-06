// Exercise the real source-evidence entry point with invalid audit declarations.
// No owner/source bytes, profile pins, checks or retained content are changed.
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const audit='tooling/maintenance/interpreter-performance-2026-11-06',file=audit+'/current-binding-updates.json',original=fs.readFileSync(file),rows=[];
const cases=[['empty-updates',v=>v.updates=[],/Explicit current binding updates required/u],['wrong-current-hash',v=>v.updates[0].current='0'.repeat(64),/ERR_ASSERTION/u],['wrong-predecessor-hash',v=>v.updates[0].previous='0'.repeat(64),/ERR_ASSERTION/u],['wrong-owner-commit',v=>v.updates[0].ownerCommit='0'.repeat(40),/ERR_ASSERTION/u],['wrong-owner-path',v=>v.updates[0].repositoryPath='src/absent.mjs',/ERR_ASSERTION/u]];
try{
 for(const [name,mutate,diagnostic]of cases){const value=JSON.parse(original);mutate(value);fs.writeFileSync(file,JSON.stringify(value,null,2)+'\n');let failure;try{execFileSync(process.execPath,['tooling/maintenance/managed-validation/record-source-evidence.mjs',audit,'tooling/maintenance/file-session-custody-migration-2026-11-06','2347'],{encoding:'utf8',stdio:'pipe',maxBuffer:8*2**20});}catch(error){failure=error;}assert(failure&&failure.status!==0,name);assert.match(failure.stderr,diagnostic,name);rows.push({name,refused:true,status:failure.status});}
}finally{fs.writeFileSync(file,original);}
fs.writeFileSync(audit+'/binding-evidence-controls.json',JSON.stringify({observedAt:new Date().toISOString(),scope:'Five invalid audit declarations refused by the actual maintained source-evidence entry point. The original explicit update declaration is restored byte-for-byte. No owner source or profile changes.',rows,passed:true},null,2)+'\n');
console.log(JSON.stringify(rows));
