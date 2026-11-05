const fs=require('node:fs'),cp=require('node:child_process'),path=require('node:path'),assert=require('node:assert/strict');
const scope='tooling/maintenance/integrated-baseline-closure-plan-2026-11-06/',git=args=>cp.execFileSync('git',args,{maxBuffer:64*2**20});
assert(JSON.parse(fs.readFileSync(path.join(__dirname,'verification.json'))).passed);
assert.equal(git(['diff','--cached','--name-only']).toString().trim(),'','Preserve existing staged user work');
git(['add','--',scope]);const files=git(['diff','--cached','--name-only','-z']).toString().split('\0').filter(Boolean);assert(files.length&&files.every(f=>f.startsWith(scope)));
process.stdout.write(git(['-c','gc.auto=0','-c','maintenance.auto=false','commit','-m','Record the finite integrated platform baseline closure plan']));
