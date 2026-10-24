import fs from "node:fs";
import path from "node:path";
const root=process.cwd(), posix=(p)=>p.split(path.sep).join("/");
const read=(p)=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
const audit=read("corpus/programmes/frontier-physics-targets/residual_programme_gate_audit_v1.json");
const topics=read("corpus/programmes/frontier-physics-targets/open_topics_register_v1.json");
const topicIds=new Set(topics.topics.map((t)=>t.id)), failures=[];
for(const f of audit.families){
  for(const id of f.topicIds??[]) if(!topicIds.has(id)) failures.push(`${f.prefix}: unknown ${id}`);
  if(f.disposition==="mapped"&&!(f.topicIds?.length)) failures.push(`${f.prefix}: mapped family has no topics`);
  if(f.disposition==="separate_programme"&&(!f.ownerRef||!fs.existsSync(path.join(root,f.ownerRef)))) failures.push(`${f.prefix}: missing ownerRef`);
}
const walk=(dir)=>fs.readdirSync(dir,{withFileTypes:true}).flatMap((e)=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const pattern=new RegExp(audit.pattern,"i"), matched=[];
for(const abs of walk(path.join(root,"corpus/programmes"))){
  if(!/\.(md|json)$/.test(abs)) continue;
  const rel=posix(path.relative(root,abs));
  if(audit.excludedAsSeparatelyAudited.some((p)=>rel.startsWith(p))) continue;
  if(pattern.test(fs.readFileSync(abs,"utf8"))) matched.push(rel);
}
const unmatched=matched.filter((rel)=>!audit.families.some((f)=>rel.startsWith(f.prefix)));
if(unmatched.length) failures.push(...unmatched.map((p)=>`unmapped residual file: ${p}`));
if(failures.length){console.error(JSON.stringify({result:"fail",matchedFiles:matched.length,failures},null,2));process.exit(1);}
const mapped=matched.filter((rel)=>audit.families.find((f)=>rel.startsWith(f.prefix))?.disposition==="mapped").length;
console.log(JSON.stringify({result:"pass",matchedFiles:matched.length,mappedPhysicsFiles:mapped,separateProgrammeFiles:matched.length-mapped,unmatched:0},null,2));
