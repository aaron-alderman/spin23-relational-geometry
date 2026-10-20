import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-ordinary-Z2-composite-leakage-no-go.json','utf8'));

const fields=['L_P','H','nu_P_c','S','nu_N_c'];
const assignments=[];
for(let mask=0;mask<2**fields.length;mask++){
  const sign={};
  fields.forEach((f,i)=>{sign[f]=(mask&(1<<i)) ? 1 : -1;});
  assignments.push(sign);
}

const parity=(s,names)=>names.reduce((p,name)=>p*s[name],1);
const standardDirac=s=>parity(s,['L_P','H','nu_P_c']);
const desiredMajorana=s=>parity(s,['S','nu_P_c','nu_N_c']);
const dangerousDimensionFive=s=>parity(s,['S','L_P','H','nu_N_c']);

const requiredEven=assignments.filter(s=>standardDirac(s)===1&&desiredMajorana(s)===1);
const protects=requiredEven.filter(s=>dangerousDimensionFive(s)===-1);

assert.equal(assignments.length,32);
assert.equal(requiredEven.length,8);
assert.equal(protects.length,0);
for(const s of assignments){
  assert.equal(dangerousDimensionFive(s),standardDirac(s)*desiredMajorana(s));
}

assert.equal(evidence.enumeration.fieldSignAssignments,32);
assert.equal(evidence.enumeration.preserveBothRequiredVertices,8);
assert.equal(evidence.enumeration.alsoForbidCompositeLeakage,0);
assert.equal(evidence.theorem.ordinaryFieldZ2CanProtectExactMask,false);
assert.equal(evidence.theorem.relationParityIsOrdinaryFieldParity,false);

console.log('PASS 1507: all 8 ordinary field-Z2 assignments preserving the required Dirac and Majorana vertices also make S L_P H nu_N^c even; none protects the exact mask.');
