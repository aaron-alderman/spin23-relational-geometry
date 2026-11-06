// Preserve raw receipt bytes despite repository-wide text/eol normalization.
// Only this audit and the maintained qualification tools enter the index.
import fs from 'node:fs';
import {resolve,join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const audit='tooling/maintenance/ordinary-e2e-performance-2026-11-06',scopes=[audit,'tooling/maintenance/managed-validation'],root=resolve('.'),git=(args,options={})=>execFileSync('git',['-c','safe.directory='+root,...args],{maxBuffer:256*2**20,...options}),sha=bytes=>createHash('sha256').update(bytes).digest('hex');
assert(JSON.parse(fs.readFileSync(audit+'/closure-verification.json')).passed);
for(const row of JSON.parse(fs.readFileSync(audit+'/managed-code-hashes.json')).files)assert.equal(sha(fs.readFileSync(row.path)),row.sha256);
assert.equal(git(['diff','--cached','--name-only']).toString().trim(),'','Preserve any pre-existing staged user work');
const modes=new Map(git(['ls-files','--stage','-z','--',...scopes]).toString().split('\0').filter(Boolean).map(line=>{const [metadata,path]=line.split('\t');return[path,metadata.split(' ')[0]];})),files=[];
function walk(dir){assert.equal(fs.realpathSync.native(dir).toLowerCase(),resolve(dir).toLowerCase());for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=join(dir,entry.name);if(entry.isDirectory())walk(file);else{assert(entry.isFile(),'Regular evidence files required');files.push(file.replaceAll('\\','/'));}}}
for(const scope of scopes)walk(scope);
const rows=[];for(const file of files){const object=git(['hash-object','-w','--no-filters','--',file]).toString().trim();assert.match(object,/^[a-f0-9]{40}$/u);rows.push((modes.get(file)||'100644')+' '+object+'\t'+file+'\0');}
git(['update-index','-z','--index-info'],{input:rows.join('')});
const staged=git(['diff','--cached','--name-only','-z']).toString().split('\0').filter(Boolean);assert(staged.every(file=>scopes.some(scope=>file.startsWith(scope+'/'))));
for(const file of files)assert.equal(sha(git(['show',':'+file])),sha(fs.readFileSync(file)),file);
assert(git(['diff','--binary']).equals(fs.readFileSync('.platform-reconstitution/bundles/preservation-2026-11-04/supplementary/main-unstaged.patch')),'Original user diff must remain exact');
console.log(JSON.stringify({scopes,rawFilesStaged:files.length,changedFiles:staged.length,rawIndexBytesVerified:true,originalUserDiffUnchanged:true}));
