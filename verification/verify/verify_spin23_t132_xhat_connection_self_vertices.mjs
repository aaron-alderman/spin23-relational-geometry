#!/usr/bin/env node

import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const data=JSON.parse(await readFile(new URL("../../evidence/data/spin23-t132-xhat-connection-self-vertices-v1.json",import.meta.url),"utf8"));
const eps=(a,b,c,d)=>{const x=[a,b,c,d];if(new Set(x).size<4)return 0;let n=0;for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)if(x[i]>x[j])n++;return n%2?-1:1;};
const pairs=[];for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)pairs.push([a,b]);
const comps=[];for(let mu=0;mu<4;mu++)for(const pair of pairs)comps.push([mu,...pair]);
const blank=()=>Array.from({length:4},()=>Array.from({length:4},()=>Array(4).fill(0)));
const basis=comps.map(([m,a,b])=>{const A=blank();A[m][a][b]=1;A[m][b][a]=-1;return A;});
const frac=s=>{const [a,b]=s.split("/").map(Number);return b?a/b:a;};
const P=blank();for(const [key,value] of Object.entries(data.source.contorsion)){const [m,a,b]=key.split("").map(Number);P[m][a][b]=frac(value);}
const L=(A,p)=>{let s=0;for(let m=0;m<4;m++)for(let n=0;n<4;n++)for(let a=0;a<4;a++)for(let b=0;b<4;b++)s+=eps(m,n,a,b)*p[m]*A[n][a][b];return s;};
const C=(A,B)=>{let s=0;for(let m=0;m<4;m++)for(let n=0;n<4;n++)for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++)s+=eps(m,n,a,b)*A[m][a][c]*B[n][c][b];return s;};
const cross=z=>C(P,z)+C(z,P),second=(z,w)=>C(z,w)+C(w,z);
const p=data.witnessMomenta.p,pp=data.witnessMomenta.pPrime,q=data.source.momentum;
assert.deepEqual(p.map((x,i)=>x+pp[i]+q[i]),[0,0,0,0]);
assert.equal(L(P,q),frac(data.curvatureDecomposition.LP));
assert.equal(C(P,P),frac(data.curvatureDecomposition.CPP));
const crossVector=basis.map(cross);
assert.equal(crossVector.filter(x=>x!==0).length,1);
assert.equal(crossVector[comps.findIndex(x=>x[0]===3&&x[1]===0&&x[2]===3)],2);
const H1=basis.map((z,i)=>basis.map((w,j)=>L(z,p)*cross(w)+L(w,pp)*cross(z)+L(P,q)*second(z,w)));
const H2=basis.map(z=>basis.map(w=>cross(z)*cross(w)+C(P,P)*second(z,w)));
const rank=M=>{const a=M.map(r=>r.slice());let k=0;for(let c=0;c<a[0].length&&k<a.length;c++){let z=k;for(let r=k+1;r<a.length;r++)if(Math.abs(a[r][c])>Math.abs(a[z][c]))z=r;if(Math.abs(a[z][c])<1e-10)continue;[a[k],a[z]]=[a[z],a[k]];for(let r=k+1;r<a.length;r++){const f=a[r][c]/a[k][c];for(let j=c;j<a[0].length;j++)a[r][j]-=f*a[k][j];}k++;}return k;};
const stats=M=>({rank:rank(M),nonzeroEntries:M.flat().filter(x=>x!==0).length,entrySum:M.flat().reduce((s,x)=>s+x,0),squareSum:M.flat().reduce((s,x)=>s+x*x,0)});
assert.deepEqual(stats(H1),{rank:data.Hkk1.rank,nonzeroEntries:data.Hkk1.nonzeroEntries,entrySum:frac(data.Hkk1.entrySum),squareSum:frac(data.Hkk1.squareSum)});
assert.deepEqual(stats(H2),{rank:data.Hkk2.rank,nonzeroEntries:data.Hkk2.nonzeroEntries,entrySum:frac(data.Hkk2.entrySum),squareSum:frac(data.Hkk2.squareSum)});
assert.equal(data.completeAtFixedCoframe,true);assert.equal(data.fullBosonicTraceComplete,false);
console.log("Spin(2,3) t132 Xhat connection self-vertices: PASS");
console.log("  L(P)=-1, C(P,P)=0, X_P(z)=2 z_(3,[03])");
console.log("  rank Hkk1=24, rank Hkk2=1");
console.log("  fixed-coframe kk block complete; coframe completion remains");
