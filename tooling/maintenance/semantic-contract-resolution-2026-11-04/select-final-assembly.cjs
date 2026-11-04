const fs=require('node:fs'),path=require('node:path');
const audit=__dirname,file=path.join(audit,'claimipedia-assembly-inputs.json'),inputs=JSON.parse(fs.readFileSync(file)),oldAssembly=inputs.assembly,nextAssembly=path.resolve('.platform-reconstitution/semantic-contract-validation-2026-11-04/assembly-final/assembled');
if(!oldAssembly.endsWith(path.normalize('semantic-contract-validation-2026-11-04/assembly/assembled')))throw Error('Unexpected preceding assembly');
const changes=[];
for(const row of inputs.links.filter(r=>r.target.startsWith(oldAssembly+path.sep))){
 if(!fs.lstatSync(row.path).isSymbolicLink()||fs.realpathSync(row.path)!==fs.realpathSync(row.target))throw Error('Generated link identity changed');
 const old=row.target,next=path.join(nextAssembly,path.relative(oldAssembly,old));
 // Unlink only the verified generated junction. Never traverse either target.
 fs.unlinkSync(row.path);try{fs.symlinkSync(next,row.path,'junction');}catch(error){fs.symlinkSync(old,row.path,'junction');throw error;}
 row.target=next;changes.push({path:row.path,previousTarget:old,target:next});
}
if(changes.length!==2)throw Error('Unexpected consumer package binding count');
inputs.previousAssembly=oldAssembly;inputs.assembly=nextAssembly;inputs.assemblySelection='Final source after collision-free compatible-contract comparison; generated junction swap only.';
fs.writeFileSync(file,JSON.stringify(inputs,null,2)+'\n');fs.writeFileSync(path.join(audit,'final-assembly-selection.json'),JSON.stringify({changes,sourceFilesChanged:false,oldAssemblyRetained:true},null,2)+'\n');console.log(changes);
