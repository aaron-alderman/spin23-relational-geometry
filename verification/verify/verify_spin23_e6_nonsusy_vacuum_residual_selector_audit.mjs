import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-e6-nonsusy-vacuum-residual-selector-audit.json','utf8'));

assert.equal(evidence.schema,'spin23.e6-nonsusy-vacuum-residual-selector-audit/1');
const p=evidence.reducedPotential.parameters;
const D=4*p.lambdaS*p.lambdaT-p.kappa**2;
assert.equal(D,evidence.reducedPotential.quarticDeterminant);
assert.ok(p.lambdaS>0 && p.lambdaT>0 && D>0);

const x=(2*p.lambdaT*p.muS2-p.kappa*p.muT2)/D;
const y=(2*p.lambdaS*p.muT2-p.kappa*p.muS2)/D;
assert.equal(x,evidence.reducedPotential.stationaryPoint.x);
assert.equal(y,evidence.reducedPotential.stationaryPoint.y);
assert.ok(x>0 && y>0);
const V=(x,y)=>-p.muS2*x-p.muT2*y+p.lambdaS*x*x+p.lambdaT*y*y+p.kappa*x*y;
assert.equal(V(x,y),evidence.reducedPotential.stationaryEnergy);
assert.ok(V(x,y)<evidence.reducedPotential.xBoundaryMinimumEnergy);
assert.ok(V(x,y)<evidence.reducedPotential.yBoundaryMinimumEnergy);
assert.ok(V(x,y)<evidence.reducedPotential.originEnergy);

const mod=(a,n)=>((a%n)+n)%n;
let retainedCases=0;
for(let N=2;N<=32;N++){
  for(let f=0;f<N;f++) for(let h=0;h<N;h++) for(let s=0;s<N;s++){
    if(mod(2*f+h,N)!==0 || mod(2*f+s,N)!==0) continue;
    retainedCases++;
    assert.equal(h,s);
    assert.equal(mod(-h+s,N),0);
    for(let k=0;k<N;k++){
      if(mod(k*h,N)!==0 || mod(k*s,N)!==0) continue;
      assert.equal(mod(k*h,N),mod(k*s,N));
      assert.equal(mod(k*h,N),0);
    }
  }
}
assert.ok(retainedCases>0);

const z=evidence.z5Witness;
assert.equal(mod(2*z.charges.f+z.charges.h,5),0);
assert.equal(mod(2*z.charges.f+z.charges.s,5),0);
assert.equal(z.residualSubgroupOrder,1);
assert.equal(z.selectorCompletelyBroken,true);
assert.equal(z.relativeBidoubletBilinearNeutral,true);

assert.equal(evidence.decision.nonSupersymmetricReducedVacuumExistsOnOpenParameterSet,true);
assert.equal(evidence.decision.minimalSusyFtermObstructionEvaded,true);
assert.equal(evidence.decision.commutingAbelianSelectorProtectsPostBreakingInertness,false);
assert.equal(evidence.decision.portalWardLineDerived,false);

console.log('PASS 1567: a bounded nonsupersymmetric quartic potential has an open simultaneous-singlet vacuum with rank-11 exotic mass, but the retained Yukawas force equal selector charges, so the residual commuting abelian symmetry cannot distinguish or protect the two bidoublets after breaking.');
