const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const audit=__dirname,scopes=['tooling/maintenance/managed-validation/',"tooling/maintenance/source-history-disposition-2026-11-06/","tooling/maintenance/reproduction-inventory-2026-11-06/","tooling/maintenance/host-boundary-discovery-2026-11-06/",'tooling/maintenance/auth-identity-decision-migration-2026-11-06/'];
const git=args=>cp.execFileSync('git',args,{maxBuffer:256*2**20});
assert.equal(JSON.parse(fs.readFileSync(path.join(audit,'closure-verification.json'))).passed,true);
assert.equal(git(['diff','--cached','--name-only']).toString().trim(),'','Preserve an existing staged change');
git(['add','--',...scopes]);
const staged=git(['diff','--cached','--name-only','-z']).toString().split('\0').filter(Boolean);
assert(staged.length);assert(staged.every(file=>scopes.some(scope=>file.startsWith(scope))));
process.stdout.write(git(['-c','gc.auto=0','-c','maintenance.auto=false','commit','-m','Qualify authored authorization and identity lifecycle decisions']));
