import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const e=JSON.parse(fs.readFileSync(path.join(root,"evidence/data/admissibility-planckian-fixed-density-block-cross-rank-v1.json"),"utf8"));
const failures=[]; const check=(x,m)=>{if(!x)failures.push(m)};
check(e.schema==="admissibility.planckian-fixed-density-block-cross-rank/1","schema");
check(e.exact3x3.positivity==="PASS"&&e.exact3x3.minimumNormalizedDeterminantAcrossScans>0.05,"exact rank two");
check(e.integratedBlock.every((x,i,a)=>i===0||x.centre>a[i-1].centre),"centre rank scaling");
check(e.integratedBlock.slice(1).every(x=>Math.abs(x.centre-x.endpoint)<2*Math.max(x.centreSE,x.endpointSE)),"gauge rank agreement");
check(e.integratedBlock.at(-1).centre>0.9&&e.integratedBlock.at(-1).endpoint>0.9,"L9 interior cone");
check(e.admission.lowFrequencyThermodynamicRank==="OPEN","low-frequency firewall");
for(const [name,expected] of Object.entries(e.sourceHashesSha256)){const actual=crypto.createHash("sha256").update(fs.readFileSync(path.join(root,"external/Planckian-tJ",name))).digest("hex");check(actual===expected,`${name} hash`)}
if(failures.length){console.error(`FAIL fixed-density block/cross rank: ${failures.join(", ")}`);process.exit(1)}
console.log("PASS fixed-density block/cross rank boundary");
