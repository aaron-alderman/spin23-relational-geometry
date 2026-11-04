import {writeFileSync,readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
import {buildBrowserLaneStorageKey} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/browser/browser-lane-storage.mjs';
const inputs=[{mapping:{partition:'b:c',lane:'d'},options:{projectName:'a'}},{mapping:{partition:'c',lane:'d'},options:{projectName:'a:b'}}];
const sourceSha256=createHash('sha256').update(readFileSync(new URL('../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/browser/browser-lane-storage.mjs',import.meta.url))).digest('hex');
writeFileSync(new URL(process.argv[2]||'storage-key-predecessor.json',import.meta.url),JSON.stringify({baselineCommit:'1a7526d40dea6b5abeaf5f4cc540b7b447ecb6f3',sourceSha256,inputs,keys:inputs.map(x=>buildBrowserLaneStorageKey(x.mapping,x.options))},null,2)+'\n');
