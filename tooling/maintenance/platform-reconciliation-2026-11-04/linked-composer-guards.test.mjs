import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,unlink,rmdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {composeLayerWorkspaces} from './compose-linked-validation.mjs';

test('linked validation refuses a retained source checkout as its reuse root',async()=>{
 const previous=process.env.SOURCERY_RECONCILIATION_REUSE_TARGET;
 process.env.SOURCERY_RECONCILIATION_REUSE_TARGET=resolve('.platform-reconstitution/sourcery-applications');
 try{await assert.rejects(composeLayerWorkspaces({target:resolve('.platform-reconstitution/not-created-by-refused-test')}),/prior generated assembly, never a source checkout/u);}
 finally{if(previous===undefined)delete process.env.SOURCERY_RECONCILIATION_REUSE_TARGET;else process.env.SOURCERY_RECONCILIATION_REUSE_TARGET=previous;}
});
test('linked validation refuses a nonempty output before reading or linking inputs',async()=>{
 const target=await mkdtemp(resolve('.platform-reconstitution/linked-composer-guard-')),file=join(target,'retained.txt');await writeFile(file,'must remain');
 const previous=process.env.SOURCERY_RECONCILIATION_REUSE_TARGET;
 process.env.SOURCERY_RECONCILIATION_REUSE_TARGET=resolve('.platform-reconstitution/reconciled-validation-2026-11-04-r2/assembled');
 try{await assert.rejects(composeLayerWorkspaces({target}),/target must be empty/u);}
 finally{if(previous===undefined)delete process.env.SOURCERY_RECONCILIATION_REUSE_TARGET;else process.env.SOURCERY_RECONCILIATION_REUSE_TARGET=previous;await unlink(file);await rmdir(target);}
});
