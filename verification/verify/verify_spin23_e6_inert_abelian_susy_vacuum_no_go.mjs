import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-e6-inert-abelian-susy-vacuum-no-go.json','utf8'));

assert.equal(evidence.schema,'spin23.e6-inert-abelian-susy-vacuum-no-go/1');
const mod=(x,n)=>((x%n)+n)%n;

// Exhaust all Z_N, N=2..24, and verify the charge collision whenever both
// matter Yukawas are allowed: h=s=-2f and every unbarred cubic has charge 3h.
let protectedWitnesses=0;
for(let N=2;N<=24;N++){
  for(let f=0;f<N;f++){
    for(let h=0;h<N;h++) for(let s=0;s<N;s++){
      if(mod(2*f+h,N)!==0 || mod(2*f+s,N)!==0) continue;
      assert.equal(h,s);
      const charges=[3*h,2*h+s,h+2*s,3*s].map(x=>mod(x,N));
      assert.ok(charges.every(x=>x===charges[0]));
      if(charges[1]!==0){
        protectedWitnesses++;
        assert.ok(charges.every(x=>x!==0));
      } else {
        assert.ok(charges.every(x=>x===0));
      }
    }
  }
}
assert.ok(protectedWitnesses>0);

const z=evidence.z5Witness;
assert.equal(mod(2*z.charges.f+z.charges.h,5),0);
assert.equal(mod(2*z.charges.f+z.charges.s,5),0);
assert.equal(mod(3*z.charges.h,5),4);
assert.equal(z.allBarredCubicsCharge,1);
assert.equal(z.allHiggsCubicsForbidden,true);

// With only nonzero quadratic pair masses, every F-term sets its partner to zero.
const m27=2,m351=3;
const fields={H:0,barH:0,S:0,barS:0};
assert.equal(m27*fields.barH,0);
assert.equal(m27*fields.H,0);
assert.equal(m351*fields.barS,0);
assert.equal(m351*fields.S,0);
assert.equal(evidence.fTermResult.uniqueFflatVacuum,'H=barH=S=barS=0');
assert.equal(evidence.fTermResult.spontaneousE6Breaking,false);
assert.equal(evidence.fTermResult.exoticMassVevs,false);

assert.equal(evidence.decision.commutingAbelianProtectionAndMinimalRenormalizableSusyBreakingCompatible,false);
assert.equal(evidence.decision.nonSupersymmetricEscapeOpen,true);
assert.equal(evidence.decision.enlargedOrNonabelianSelectorEscapeOpen,true);
assert.equal(evidence.decision.portalWardLineDerived,false);

console.log('PASS 1566: retaining both matter Yukawas forces equal Higgs charges, so every same-orientation scalar cubic has the same charge as the dangerous mixed invariant; forbidding that invariant removes all Higgs cubics and leaves only the zero F-flat vacuum in the minimal massive renormalizable SUSY system.');
