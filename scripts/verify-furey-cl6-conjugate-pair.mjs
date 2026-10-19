#!/usr/bin/env node
import fs from "node:fs";import path from "node:path";import{fileURLToPath}from"node:url";
const here=path.dirname(fileURLToPath(import.meta.url));
const d=JSON.parse(fs.readFileSync(path.join(here,"..","data","furey_cl6_conjugate_pair_basis.json"),"utf8"));
const total=d.sectors.reduce((s,x)=>s+x.multiplicity,0);
const grouped=new Map();for(const s of d.sectors){const k=`${s.charge}|${s.su3}`;grouped.set(k,(grouped.get(k)||0)+1);}
const blocks=[...grouped].map(([irrep,m])=>({irrep,multiplicity:m,commutantComplexDimension:m*m}));
const dim=blocks.reduce((s,b)=>s+b.commutantComplexDimension,0);
const conjugatePairs=[
  ["1/3|3","-1/3|3bar"],
  ["2/3|3bar","-2/3|3"],
  ["1|1","-1|1"],
];
const report={protocol:"furey-cl6-conjugate-pair-certificate/1",totalStates:total,irrepBlocks:blocks,complexLinearGaugeCommutantDimension:dim,neutralSingletMultiplicity:grouped.get("0|1"),conjugatePairsPresent:conjugatePairs.every(([a,b])=>grouped.has(a)&&grouped.has(b)),warning:"An imposed anti-linear conjugation changes the real commutant problem; this count is complex-linear SU(3)xU(1)."};
report.passed=total===16&&dim===10&&report.neutralSingletMultiplicity===2&&report.conjugatePairsPresent;
console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
