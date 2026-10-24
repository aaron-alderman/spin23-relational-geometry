import fs from "node:fs";
import path from "node:path";
const root=process.cwd();
const read=(p)=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
const audit=read("corpus/programmes/frontier-physics-targets/frontier_wave_gate_audit_v1.json");
const topics=read("corpus/programmes/frontier-physics-targets/open_topics_register_v1.json");
const topicIds=new Set(topics.topics.map((t)=>t.id));
const expected=[...Array.from({length:17},(_,i)=>`W6-${String(i).padStart(2,"0")}`),...Array.from({length:36},(_,i)=>`W7-${String(i).padStart(2,"0")}`)];
const allowed=new Set(["live","superseded","closed"]), failures=[], ids=new Set();
if(audit.packets.length!==expected.length) failures.push(`expected ${expected.length} packets, found ${audit.packets.length}`);
for(const id of expected) if(!audit.packets.some((p)=>p.id===id)) failures.push(`missing ${id}`);
for(const p of audit.packets){
  if(ids.has(p.id)) failures.push(`duplicate ${p.id}`); ids.add(p.id);
  if(!allowed.has(p.status)) failures.push(`${p.id}: invalid status`);
  if(!p.sourceRef||!fs.existsSync(path.join(root,p.sourceRef))) failures.push(`${p.id}: missing source`);
  if(p.status!=="closed"&&(!Array.isArray(p.topicIds)||!p.topicIds.length)) failures.push(`${p.id}: unowned gate`);
  for(const id of p.topicIds??[]) if(!topicIds.has(id)) failures.push(`${p.id}: unknown ${id}`);
}
if(failures.length){console.error(JSON.stringify({result:"fail",failures},null,2));process.exit(1);}
const statusCounts=Object.fromEntries([...allowed].map((s)=>[s,audit.packets.filter((p)=>p.status===s).length]));
console.log(JSON.stringify({result:"pass",packets:audit.packets.length,statusCounts,orphaned:0},null,2));
