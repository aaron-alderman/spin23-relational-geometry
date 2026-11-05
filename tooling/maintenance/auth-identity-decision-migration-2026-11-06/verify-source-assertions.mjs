import {readFileSync as read,writeFileSync as write} from 'node:fs';
import assert from 'node:assert/strict';
const audit=import.meta.dirname,prior='tooling/maintenance/auth-session-policy-migration-2026-11-05/source-tests.txt';
const titles=path=>read(path,'utf8').split(/\r?\n/u).filter(line=>line.startsWith('✔ ')).map(line=>line.replace(/^✔ /u,'').replace(/ \([\d.]+ms\)$/u,''));
const old=titles(prior),current=titles(audit+'/source-tests.txt'),remaining=[...current],missing=[];
assert.match(read(audit+'/source-tests.txt','utf8'),/pass 2167/u);
for(const title of old){const index=remaining.indexOf(title);if(index<0)missing.push(title);else remaining.splice(index,1);}
assert.deepEqual(missing,[]);assert.equal(old.length,2146);assert.equal(current.length,2167);assert.equal(remaining.length,21);
const result={priorChecks:old.length,currentChecks:current.length,addedChecks:remaining,missing,helperModulesIncluded:1,priorAssertingChecks:2145,currentAssertingChecks:2166};
write(audit+'/source-assertion-preservation.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({prior:old.length,current:current.length,added:remaining.length}));
