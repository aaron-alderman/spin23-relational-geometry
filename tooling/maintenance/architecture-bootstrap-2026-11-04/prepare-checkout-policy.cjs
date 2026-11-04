const fs=require('fs'),path=require('path');
const dir=__dirname,file=path.join(dir,'capture-bootstrap-inputs.cjs');
let text=fs.readFileSync(file,'utf8').replace('bundles/architecture-bootstrap-final-2026-11-04','bundles/architecture-bootstrap-pinned-2026-11-04');
text=text.replace('repositories.push(record);',"record.checkoutPolicy={autocrlf:cp.spawnSync('git',['-C',source,'config','--get','core.autocrlf'],{encoding:'utf8'}).stdout.trim()||'false',eol:cp.spawnSync('git',['-C',source,'config','--get','core.eol'],{encoding:'utf8'}).stdout.trim()||'native'};repositories.push(record);");
fs.writeFileSync(file,text);
const runner=path.join(dir,'run-bootstrap-pair.mjs');fs.writeFileSync(runner,fs.readFileSync(runner,'utf8').replace("/pass-'+pass","/pinned-pass-'+pass"));
