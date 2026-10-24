import fs from "node:fs";
import path from "node:path";
const root=process.cwd();
const read=(p)=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
const audit=read("corpus/programmes/frontier-physics-targets/frontier_wave_gate_audit_v1.json");
const topics=read("corpus/programmes/frontier-physics-targets/open_topics_register_v1.json");
const topicIds=new Set(topics.topics.map((t)=>t.id));
const expectedSources=["wave-6","wave-7"].flatMap(wave=>fs.readdirSync(path.join(root,"corpus/programmes/frontier",wave))
  .filter(name=>name.startsWith(`frontier_${wave.replace("-","")}_`)&&name.endsWith(".md"))
  .map(name=>`corpus/programmes/frontier/${wave}/${name}`)).sort();
const allowed=new Set(["live","superseded","closed"]), failures=[], ids=new Set(), sources=new Set();
if(audit.packets.length!==expectedSources.length) failures.push(`expected ${expectedSources.length} packet files, found ${audit.packets.length} audit records`);
for(const p of audit.packets){
  if(ids.has(p.id)) failures.push(`duplicate ${p.id}`); ids.add(p.id);
  if(sources.has(p.sourceRef)) failures.push(`duplicate source ${p.sourceRef}`); sources.add(p.sourceRef);
  if(!allowed.has(p.status)) failures.push(`${p.id}: invalid status`);
  if(!p.sourceRef||!fs.existsSync(path.join(root,p.sourceRef))) failures.push(`${p.id}: missing source`);
  if(p.status!=="closed"&&(!Array.isArray(p.topicIds)||!p.topicIds.length)) failures.push(`${p.id}: unowned gate`);
  for(const id of p.topicIds??[]) if(!topicIds.has(id)) failures.push(`${p.id}: unknown ${id}`);
}
for(const source of expectedSources) if(!sources.has(source)) failures.push(`missing source record ${source}`);
for(const source of sources) if(!expectedSources.includes(source)) failures.push(`stale source record ${source}`);
if(failures.length){console.error(JSON.stringify({result:"fail",failures},null,2));process.exit(1);}
const statusCounts=Object.fromEntries([...allowed].map((s)=>[s,audit.packets.filter((p)=>p.status===s).length]));
console.log(JSON.stringify({result:"pass",packets:audit.packets.length,statusCounts,orphaned:0},null,2));
