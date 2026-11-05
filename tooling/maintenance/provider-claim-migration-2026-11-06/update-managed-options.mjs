import {readFileSync,writeFileSync} from 'node:fs';
for(const [path,changes]of [
 ['tooling/maintenance/managed-validation/run.mjs',[["const args=['--test',extra.path]","const args=[...(extra.nodeOptions||[]),'--test',extra.path]"]]],
 ['tooling/maintenance/managed-validation/close-checkpoint.mjs',[["row.args,['--test',extra.path]","row.args,[...(extra.nodeOptions||[]),'--test',extra.path]"],["['managed-profile-tests.txt',5]","['managed-profile-tests.txt',6]"],["maintenanceChecks:20","maintenanceChecks:21"]]],
]){let text=readFileSync(path,'utf8');for(const [before,after]of changes){if(text.split(before).length!==2)throw Error('Exact maintained anchor required: '+before);text=text.replace(before,after);}writeFileSync(path,text);}
