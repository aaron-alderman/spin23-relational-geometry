import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const e=JSON.parse(fs.readFileSync(path.join(root,"evidence/data/admissibility-planckian-source-complete-finite-q-ladder-v1.json"),"utf8"));
const failures=[]; const check=(x,m)=>{if(!x)failures.push(m)};
check(e.schema==="admissibility.planckian-source-complete-finite-q-ladder/1","schema");
check(JSON.stringify(e.families)===JSON.stringify(["t","t_prime","J","J_prime","V"]),"families");
check(e.unscreened.every((x,i,a)=>i===0||x.normalizedDifference<a[i-1].normalizedDifference),"monotone convergence");
check(e.fits.L5ThroughL11Exponent>1.8&&e.fits.L5ThroughL11Exponent<2.1,"asymptotic exponent");
check(e.screenedL3ThroughL9.L9RelativeToUnscreened.fixed<0.03&&e.screenedL3ThroughL9.L9RelativeToUnscreened.scaled<0.03,"screened collision");
check(e.maximumContinuityResidual<1e-12,"continuity");
check(e.admission.fixedDensity==="OPEN"&&e.admission.rankAtlasRerun==="WITHHELD","firewall");
for(const [name,expected] of Object.entries(e.sourceHashesSha256)){const actual=crypto.createHash("sha256").update(fs.readFileSync(path.join(root,"external/Planckian-tJ",name))).digest("hex");check(actual===expected,`${name} hash`)}
if(failures.length){console.error(`FAIL source-complete finite-q ladder: ${failures.join(", ")}`);process.exit(1)}
console.log("PASS source-complete finite-q gauge ladder");
