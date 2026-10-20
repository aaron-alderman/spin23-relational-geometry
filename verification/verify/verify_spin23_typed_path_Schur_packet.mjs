import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-typed-path-Schur-packet.json','utf8'));

const values=[-3,-2,-1,1,2,3];
let packets=0;
for(const a of values){
  for(const d of values){
    for(const y of values){
      // Store the common-denominator numerators of
      // (c,p,s)=-(d^2,d y,y^2)/a.  Their determinant identity is exact over Z.
      const C=-d*d;
      const P=-d*y;
      const S=-y*y;
      assert.equal(C*S-P*P,0);
      assert.equal((-2*P)*S-(-2*S)*P,0); // tangent vector from varying d
      packets+=1;
    }
  }
}
assert.equal(packets,216);

// An independent physical leakage r changes p only.  After multiplying by
// a^2, the cone defect is -2 P R-R^2 with R=a r.
for(const P of [-6,-2,1,5]){
  for(const R of [-7,-1,0,2,8]){
    const defect=P*P-(P+R)*(P+R);
    const expected=-2*P*R-R*R;
    assert.equal(defect,expected===0 ? 0 : expected);
    if(R!==0&&R!==-2*P) assert.notEqual(defect,0);
  }
}

// Numeric physical witness and the exact low-energy sensitivity formula.
const a=5,d=2,y=3,r=0.1;
const c=-d*d/a,p=-d*y/a,s=-y*y/a;
const matchedLight=c-p*p/s;
const leakedLight=c-(p+r)*(p+r)/s;
const sensitivity=-2*d*r/y+a*r*r/(y*y);
assert.ok(Math.abs(matchedLight)<1e-12);
assert.ok(Math.abs(leakedLight-sensitivity)<1e-12);

assert.equal(evidence.enumeration.nonzeroIntegerPackets,216);
assert.equal(evidence.theorem.matchedPacketRankOne,true);
assert.equal(evidence.theorem.compositePathIsIndependentPrimitive,false);
assert.equal(evidence.theorem.independentLeakageIsTransverseGenerically,true);

console.log('PASS 1508: 216 exact Schur packets lie on cs-p^2=0; an independent middle coefficient has cone defect -2pr-r^2 and lifts the light zero as -2dr/y+a r^2/y^2.');
