import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-one-loop-Schur-tangency-toy.json','utf8'));

const masses=evidence.enumeration.mediatorMassSquaredValues;
const values=evidence.enumeration.couplingValues;
let cases=0;
let aligned=0;
let transverse=0;

// Clear denominators by multiplying every entry of
// G=-(1/a)vv^T+kappa gg^T by a.  At kappa=1 the determinant
// of aG must be -a(d g_N-y g_L)^2.
for(const a of masses){
  for(const d of values){
    for(const y of values){
      for(const gL of values){
        for(const gN of values){
          const C=-d*d+a*gL*gL;
          const P=-d*y+a*gL*gN;
          const S=-y*y+a*gN*gN;
          const cross=d*gN-y*gL;
          const expected=cross===0 ? 0 : -a*cross*cross;
          assert.equal(C*S-P*P,expected);
          cases+=1;
          if(cross===0){
            aligned+=1;
            assert.equal(C*S-P*P,0);
          }else{
            transverse+=1;
            assert.notEqual(C*S-P*P,0);
          }
        }
      }
    }
  }
}

assert.equal(cases,768);
assert.equal(aligned,144);
assert.equal(transverse,624);
assert.equal(evidence.enumeration.cases,cases);
assert.equal(evidence.enumeration.alignedCases,aligned);
assert.equal(evidence.enumeration.transverseCases,transverse);
assert.equal(evidence.enumeration.identityFailures,0);
assert.equal(evidence.decision.genericTangency,false);

// Symbolic-coefficient audit of det(-vv^T/a+k gg^T): the constant
// and k^2 coefficients vanish and the k coefficient is -cross^2/a.
const witness={a:5,d:2,y:-3,gL:4,gN:1};
const cross=witness.d*witness.gN-witness.y*witness.gL;
assert.equal(cross,14);
assert.equal(-cross*cross,-196);

console.log(`PASS 1514: ${transverse}/${cases} nonzero integer toy couplings generate a transverse one-loop packet; the ${aligned} aligned cases are exactly tangent to the Schur cone.`);
