#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const here=path.dirname(fileURLToPath(import.meta.url));
const data=JSON.parse(fs.readFileSync(path.join(here,"..","data","furey_cl6_minimal_ideal_basis.json"),"utf8"));
const counts=[0,0,0,0];for(const s of data.states)counts[s.degree]++;
const chargeOk=data.states.every(s=>s.charge===(s.degree===0?"0":s.degree===3?"1":`${s.degree}/3`));
const sectors=new Set(data.states.map(s=>`${s.charge}|${s.su3}`));
const report={
  protocol:"furey-cl6-minimal-ideal-certificate/1",
  stateCount:data.states.length,
  exteriorDegreeMultiplicities:counts,
  expectedMultiplicities:[1,3,3,1],
  occupationChargeRulePassed:chargeOk,
  inequivalentSU3xU1Sectors:[...sectors],
  gaugeCommutantComplexDimension:sectors.size,
  conclusion:"The minimal color-charge ideal has four inequivalent sectors and commutant C^4; it is not yet the full electroweak or three-generation module.",
};
report.passed=report.stateCount===8&&counts.every((x,i)=>x===[1,3,3,1][i])&&chargeOk&&sectors.size===4;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
