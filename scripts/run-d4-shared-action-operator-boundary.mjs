#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/d4-shared-action-operator-boundary-v1.json");
const write = process.argv.includes("--write");
const sqrt3 = Math.sqrt(3);
const cartan = [[2,-1,-1,-1],[-1,2,0,0],[-1,0,2,0],[-1,0,0,2]];
const laplacian = [[3,-1,-1,-1],[-1,1,0,0],[-1,0,1,0],[-1,0,0,1]];
const adjacency = [[0,1,1,1],[1,0,0,0],[1,0,0,0],[1,0,0,0]];
const multiply = (a,b) => a.map(row => b[0].map((_,j) => row.reduce((sum,value,k) => sum + value*b[k][j],0)));
const transpose = a => a[0].map((_,j) => a.map(row => row[j]));
const maxAbs = a => Math.max(...a.flat().map(Math.abs));
const determinant4 = a => {
  const m=a.map(row=>[...row]); let det=1;
  for(let i=0;i<4;i+=1){let pivot=i; for(let j=i+1;j<4;j+=1) if(Math.abs(m[j][i])>Math.abs(m[pivot][i])) pivot=j;
    if(Math.abs(m[pivot][i])<1e-14)return 0; if(pivot!==i){[m[pivot],m[i]]=[m[i],m[pivot]];det*=-1;}
    det*=m[i][i]; const scale=m[i][i]; for(let j=i+1;j<4;j+=1){const factor=m[j][i]/scale;for(let k=i;k<4;k+=1)m[j][k]-=factor*m[i][k];}}
  return det;
};
const triality=[[1,0,0,0],[0,0,0,1],[0,1,0,0],[0,0,1,0]];
const fixedBasis=[[1,0],[0,1/sqrt3],[0,1/sqrt3],[0,1/sqrt3]];
const contrastBasis=[[0,0],[1/Math.sqrt(2),1/Math.sqrt(6)],[-1/Math.sqrt(2),1/Math.sqrt(6)],[0,-2/Math.sqrt(6)]];
const restrict=(operator,basis)=>multiply(transpose(basis),multiply(operator,basis));
const commutatorResidual=operator=>{const left=multiply(triality,operator);const right=multiply(operator,triality);return maxAbs(left.map((row,i)=>row.map((v,j)=>v-right[i][j])));};
const operators={
  d4CartanIntersectionForm:{role:"root_or_vanishing_cycle_intersection_form",matrix:cartan,spectrum:[2-sqrt3,2,2,2+sqrt3],determinant:determinant4(cartan)},
  d4StarLaplacian:{role:"positive_generator_for_markov_or_diffusive_dynamics",matrix:laplacian,spectrum:[0,1,1,4],determinant:determinant4(laplacian)},
  d4StarAdjacency:{role:"coherent_hopping_before_diagonal_terms",matrix:adjacency,spectrum:[-sqrt3,0,0,sqrt3],determinant:determinant4(adjacency)},
};
for(const operator of Object.values(operators)){operator.trialityCommutatorResidual=commutatorResidual(operator.matrix);operator.fixedSector=restrict(operator.matrix,fixedBasis);operator.contrastSector=restrict(operator.matrix,contrastBasis);}
const output={
  protocol:"d4-shared-action-operator-boundary/1",packet:"AZ-108",target:"OT-046",dependencies:["OT-027"],
  commonData:{carrierShape:"one central coordinate and three outer coordinates",symmetryAction:"cyclic permutation of the three outer coordinates",fixedSectorDimension:2,contrastSectorDimension:2},
  operators,
  exactComparisons:{cartanFixedSector:[[2,-sqrt3],[-sqrt3,2]],laplacianFixedSector:[[3,-sqrt3],[-sqrt3,1]],adjacencyFixedSector:[[0,sqrt3],[sqrt3,0]],cartanContrastEigenvalue:2,laplacianContrastEigenvalue:1,adjacencyContrastEigenvalue:0,sameTrialityAction:true,sameKernel:false,sameSpectrum:false,quotientDeterminesOperator:false},
  localizationAudit:{spatialBaseCoordinatePresent:false,deformationParameterPresent:false,boundaryConditionPresent:false,fredholmDomainPresent:false,detectorFacingLocalizedPoleDerived:false,reason:"finite triality representation and its fixed/contrast split do not specify a spatial operator family whose asymptotic phases or boundary domain can carry a localization index"},
  decision:{sharedActionSupportsCarrierIdentification:false,existingD4StarClosesOt046:false,ot046RemainsGated:true,requiredReopeningDatum:"one source-native operator family D(lambda) on a declared spatial or geometric domain, its boundary/asymptotic conditions, the quotient pushforward, and a regulator-stable index or pole ledger",newPhysicsEvidence:false},
};
if(write){mkdirSync(dirname(outputPath),{recursive:true});writeFileSync(outputPath,JSON.stringify(output,null,2)+"\n");console.log("wrote "+outputPath);}
console.log(JSON.stringify({determinants:Object.fromEntries(Object.entries(operators).map(([name,value])=>[name,value.determinant])),spectra:Object.fromEntries(Object.entries(operators).map(([name,value])=>[name,value.spectrum])),maximumTrialityCommutatorResidual:Math.max(...Object.values(operators).map(value=>value.trialityCommutatorResidual)),quotientDeterminesOperator:output.exactComparisons.quotientDeterminesOperator,ot046RemainsGated:output.decision.ot046RemainsGated},null,2));
