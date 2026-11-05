import * as fs from 'node:fs';
import {join,resolve} from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const audit=process.argv[2];if(!audit?.startsWith('tooling/maintenance/')||audit.includes('..'))throw Error('Explicit maintenance audit path required');
const scopes=[audit+'/', 'tooling/maintenance/managed-validation/'],git=args=>execFileSync('git',args,{maxBuffer:256*2**20}),sha=b=>createHash('sha256').update(b).digest('hex'),commit=git(['rev-parse','HEAD']).toString().trim(),files=git(['ls-tree','-r','--name-only','-z','HEAD','--',...scopes]).toString().split('\0').filter(Boolean),working=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=join(dir,entry.name);if(entry.isDirectory())walk(file);else{assert(entry.isFile(),'Regular evidence files required');working.push(file.replaceAll('\\','/'));}}}for(const scope of scopes)walk(scope);assert.deepEqual(working.sort(),[...files].sort(),'All scoped evidence files must be committed');
const batch=spawnSync('git',['cat-file','--batch'],{input:files.map(file=>'HEAD:'+file+'\n').join(''),maxBuffer:256*2**20});assert.equal(batch.status,0);let offset=0,bytes=0;for(const file of files){const end=batch.stdout.indexOf(10,offset),match=/^[a-f0-9]{40} blob ([0-9]+)$/u.exec(batch.stdout.subarray(offset,end).toString());assert(match);const length=Number(match[1]);assert.equal(sha(batch.stdout.subarray(end+1,end+1+length)),sha(fs.readFileSync(file)),file);offset=end+1+length+1;bytes+=length;}
assert.equal(git(['diff','--cached','--name-only']).toString().trim(),'');assert(git(['diff','--binary']).equals(fs.readFileSync(resolve('.platform-reconstitution/bundles/preservation-2026-11-04/supplementary/main-unstaged.patch'))));
const result={commit,audit,files:files.length,bytes,rawGitBlobsMatchWorkingBytes:true,stagedEmpty:true,originalUserDiffUnchanged:true};fs.writeFileSync(resolve('.platform-reconstitution/latest-audit-commit-verification.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
