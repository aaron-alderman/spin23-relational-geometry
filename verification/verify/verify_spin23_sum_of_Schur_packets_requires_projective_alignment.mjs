import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-Schur-packet-sum-alignment.json','utf8'));

const masses=[1,2,3];
const values=[-2,-1,1,2];
let total=0,aligned=0,nonaligned=0;

for(const a1 of masses){
  for(const a2 of masses){
    for(const d1 of values){
      for(const y1 of values){
        for(const d2 of values){
          for(const y2 of values){
            // Common numerator after putting each Gram entry over a1*a2.
            const C=d1*d1*a2+d2*d2*a1;
            const P=d1*y1*a2+d2*y2*a1;
            const S=y1*y1*a2+y2*y2*a1;
            const cross=d1*y2-d2*y1;
            const determinantNumerator=C*S-P*P;
            assert.equal(determinantNumerator,a1*a2*cross*cross);
            total+=1;
            if(cross===0){
              aligned+=1;
              assert.equal(determinantNumerator,0);
            }else{
              nonaligned+=1;
              assert.ok(determinantNumerator>0);
            }
          }
        }
      }
    }
  }
}

assert.equal(total,2304);
assert.equal(aligned,432);
assert.equal(nonaligned,1872);

// Three equal-sign packets obey the 2xn Cauchy-Binet sum of squared minors.
const vectors=[[1,2],[-2,1],[3,-1]];
const C=vectors.reduce((s,[d])=>s+d*d,0);
const P=vectors.reduce((s,[d,y])=>s+d*y,0);
const S=vectors.reduce((s,[,y])=>s+y*y,0);
let minors=0;
for(let i=0;i<vectors.length;i++){
  for(let j=i+1;j<vectors.length;j++){
    const cross=vectors[i][0]*vectors[j][1]-vectors[j][0]*vectors[i][1];
    minors+=cross*cross;
  }
}
assert.equal(C*S-P*P,minors);

assert.equal(evidence.enumeration.twoPacketCases,2304);
assert.equal(evidence.enumeration.alignedCases,432);
assert.equal(evidence.enumeration.nonAlignedCases,1872);
assert.equal(evidence.theorem.rankOnePacketsClosedUnderAddition,false);
assert.equal(evidence.theorem.sameSignProtectionEquivalentToProjectiveAlignment,true);

console.log('PASS 1509: among 2304 two-packet sums, exactly the 432 projectively aligned cases remain rank one; 1872 acquire positive determinant, as fixed by the squared-minor formula.');
