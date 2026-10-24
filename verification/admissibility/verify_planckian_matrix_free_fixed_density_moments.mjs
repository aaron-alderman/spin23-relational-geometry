import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const e=JSON.parse(fs.readFileSync(path.join(root,"evidence/data/admissibility-planckian-matrix-free-fixed-density-moments-v1.json"),"utf8"));
const failures=[]; const check=(x,m)=>{if(!x)failures.push(m)};
check(e.schema==="admissibility.planckian-matrix-free-fixed-density-moments/1","schema");
check(e.unscreened.every((x,i,a)=>i===0||x.normalizedDifference<a[i-1].normalizedDifference),"monotone convergence");
check(e.fits.unscreenedL5Plus>1.8&&e.fits.unscreenedL5Plus<2.2,"unscreened exponent");
check(Math.max(e.screenedL9.unscreened,e.screenedL9.fixedMu0p5,e.screenedL9.muEqualsQmin)-Math.min(e.screenedL9.unscreened,e.screenedL9.fixedMu0p5,e.screenedL9.muEqualsQmin)<0.001,"screening collision");
check(e.unscreened.slice(1).every(x=>x.bootstrapSE/x.normalizedDifference<0.02),"sampling precision");
check(e.admission.finiteFrequencyBlockCross==="ADMITTED"&&e.admission.thermodynamicRank==="OPEN","rank firewall");
for(const [name,expected] of Object.entries(e.sourceHashesSha256)){const actual=crypto.createHash("sha256").update(fs.readFileSync(path.join(root,"external/Planckian-tJ",name))).digest("hex");check(actual===expected,`${name} hash`)}
if(failures.length){console.error(`FAIL matrix-free fixed-density moments: ${failures.join(", ")}`);process.exit(1)}
console.log("PASS matrix-free fixed-density moment convergence");
