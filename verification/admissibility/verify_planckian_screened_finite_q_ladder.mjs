import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const e=JSON.parse(fs.readFileSync(path.join(root,"evidence/data/admissibility-planckian-screened-finite-q-ladder-v1.json"),"utf8"));
const failures=[]; const check=(x,m)=>{if(!x)failures.push(m)};
check(e.schema==="admissibility.planckian-screened-finite-q-ladder/1","schema");
check(Object.values(e.paths).every(x=>x.exponent>1.7&&x.exponent<2.1),"scaling");
check(e.L9RelativePathDifferences.fixedVersusUnscreened<0.05&&e.L9RelativePathDifferences.scaledVersusUnscreened<0.05,"path collision");
check(e.admission.productionOrderOfLimits==="OPEN"&&e.admission.rankAtlasRerun==="WITHHELD","firewall");
for(const [name,expected] of Object.entries(e.sourceHashesSha256)){const actual=crypto.createHash("sha256").update(fs.readFileSync(path.join(root,"external/Planckian-tJ",name))).digest("hex");check(actual===expected,`${name} hash`)}
if(failures.length){console.error(`FAIL screened finite-q ladder: ${failures.join(", ")}`);process.exit(1)}
console.log("PASS screened finite-q order-of-limits ladder");
