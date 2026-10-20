import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const data=JSON.parse(readFileSync(path.join(root,"evidence/data/spin23-s3-doublet-commutant-audit.json"),"utf8"));
assert.equal(data.documentId,1486);
const sizes=[1,3,2],one=[1,1,1],sign=[1,-1,1],a2=[2,0,-1];
const inner=(x,y)=>sizes.reduce((s,n,i)=>s+n*x[i]*y[i],0)/6;
assert.equal(inner(one,one),1);
assert.equal(inner(sign,sign),1);
assert.equal(inner(a2,a2),1);
assert.equal(inner(one,sign),0);
assert.equal(inner(one,a2),0);
assert.equal(inner(sign,a2),0);

// End(A2) has character chi_A2^2 = 1 + sign + A2.
const end=a2.map(x=>x*x);
assert.deepEqual(end,[4,0,1]);
assert.equal(inner(end,one),1);
assert.equal(inner(end,sign),1);
assert.equal(inner(end,a2),1);
// Hom(A2+sign,A2+sign) has one scalar on each irreducible block.
const source=a2.map((x,i)=>x+sign[i]);
assert.equal(inner(source,source),2);
assert.equal(data.representations.equivariantLinearResponseDimension,2);
assert.equal(data.representations.familyDoubletCommutantDimension,1);

const rt=Math.sqrt(3)/2;
const r=[[-.5,-rt],[rt,-.5]],s=[[1,0],[0,-1]],I=[[1,0],[0,1]],J=[[0,-1],[1,0]],Z=[[1,0],[0,-1]];
const mul=(a,b)=>a.map((row,i)=>b[0].map((_,j)=>row.reduce((v,x,k)=>v+x*b[k][j],0)));
const sub=(a,b)=>a.map((row,i)=>row.map((x,j)=>x-b[i][j]));
const norm=a=>Math.hypot(...a.flat());
const comm=(a,b)=>sub(mul(a,b),mul(b,a));
assert.ok(norm(comm(I,r))<1e-14&&norm(comm(I,s))<1e-14);
assert.ok(norm(comm(J,r))<1e-14&&norm(comm(J,s))>1);
assert.ok(norm(comm(Z,s))<1e-14&&norm(comm(Z,r))>1);
assert.equal(data.subgroupFork[0].hermitianCommutantDimension,1);
assert.equal(data.subgroupFork[1].hermitianCommutantDimension,2);
assert.equal(data.subgroupFork[2].hermitianCommutantDimension,2);
assert.equal(data.verdict.undecoratedS3SuppliesFixedCabibboRotator,false);
assert.equal(data.verdict.orientationTensorIsSignCovariantNotS3Invariant,true);
assert.equal(data.verdict.physicalAdmissionChanged,false);
console.log("PASS 1486: End_S3(A2) is scalar, while Herm_0(A2)=A2+sign admits only block-scalar equivariant linear response; a fixed Cabibbo rotator needs a new spurion or symmetry reduction.");
