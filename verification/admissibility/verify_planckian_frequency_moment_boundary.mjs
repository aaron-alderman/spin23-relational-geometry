import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const e=JSON.parse(fs.readFileSync(path.join(root,"evidence/data/admissibility-planckian-frequency-moment-boundary-v1.json"),"utf8"));
const failures=[]; const check=(x,m)=>{if(!x)failures.push(m)};
check(e.schema==="admissibility.planckian-frequency-moment-boundary/1","schema");
check(e.rmsModes[0].exact&&e.rmsModes.at(-1).preliminary,"epistemic labels");
check(e.rmsModes.every(x=>x.centre[0]>0&&x.centre[1]>=x.centre[0]),"positive ordered modes");
check(e.rmsModes.at(-1).centre[1]<e.rmsModes[0].centre[1],"no ultraviolet divergence over ladder");
check(e.resourceBoundary.complex128VectorGiB>1&&e.resourceBoundary.L7Dimension>1e15,"resource boundary");
check(e.admission.currentWorkspaceLane==="EXHAUSTED"&&e.admission.lowFrequencyThermodynamicRank==="OPEN_EXTERNAL_SCALE","exhaustion firewall");
for(const [name,expected] of Object.entries(e.sourceHashesSha256)){const actual=crypto.createHash("sha256").update(fs.readFileSync(path.join(root,"external/Planckian-tJ",name))).digest("hex");check(actual===expected,`${name} hash`)}
if(failures.length){console.error(`FAIL frequency-moment boundary: ${failures.join(", ")}`);process.exit(1)}
console.log("PASS frequency-moment compute boundary");
