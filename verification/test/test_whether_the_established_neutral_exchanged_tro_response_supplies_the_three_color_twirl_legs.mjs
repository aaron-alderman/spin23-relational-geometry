import assert from 'node:assert/strict';

const permutationMatrix=p=>Array.from({length:p.length},(_,i)=>Array.from({length:p.length},(_,j)=>p[j]===i?1:0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>x===B[i][j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));

// The operator-carrier exchange used by document 617 swaps only the two
// neutral one-dimensional endpoint blocks 0 and 7.
const exchangePermutation=[7,1,2,3,4,5,6,0];
const S8=permutationMatrix(exchangePermutation);
assert.ok(eq(mm(S8,S8),eye(8)));

// Any Standard-Model color action fixes the neutral endpoints.  A concrete
// color cycle on three colored endpoint labels is enough to verify the orbit;
// the same commutation follows for every matrix supported away from 0 and 7.
const colorPermutation=[0,2,3,1,4,5,6,7];
const C8=permutationMatrix(colorPermutation),C82=mm(C8,C8);
assert.ok(eq(mm(mm(C8,S8),C82),S8));
assert.ok(eq(mm(C8,S8),mm(S8,C8)));
const endpointOrbit=[S8,mm(mm(C8,S8),C82),mm(mm(C82,S8),C8)];
assert.ok(endpointOrbit.every(x=>eq(x,S8)));

// On the completed one-generation matter module the same survivor exchange is
// the identity on the sixteen named Fock states.  Hence its conjugacy orbit is
// a singleton for every color/root/Cartan generator, not only this permutation.
const S16=eye(16);
const colorStatePermutation=[0,2,3,1,...Array.from({length:12},(_,i)=>i+4)];
const C16=permutationMatrix(colorStatePermutation),C162=mm(C16,C16);
const stateOrbit=[S16,mm(mm(C16,S16),C162),mm(mm(C162,S16),C16)];
assert.ok(stateOrbit.every(x=>eq(x,S16)));

const endpointAverage=scale(1/3,endpointOrbit.reduce(add,eye(8).map(r=>r.map(()=>0))));
assert.ok(eq(endpointAverage,S8));
assert.equal(new Set(endpointOrbit.map(JSON.stringify)).size,1);
assert.equal(new Set(stateOrbit.map(JSON.stringify)).size,1);

console.log(JSON.stringify({
  protocol:'neutral-exchanged-tro-versus-three-color-twirl-legs/1',
  establishedExchange:{operatorCarrierSize:8,neutralEndpoints:[0,7],involution:true,matterModuleAction:'identity on sixteen named Fock states'},
  colorConjugacy:{endpointOrbitSize:1,matterStateOrbitSize:1,linearAverage:'S, not zero'},
  requiredByQuadraticSelector:{orbitSize:3,distinctLegs:true,linearAverage:'zero'},
  mismatch:'The established neutral exchanged-TRO response is a gauge intertwiner and therefore a color singlet. It cannot by color conjugation generate the three noncommuting handle legs H_i.',
  survivingRole:'It still supplies the Hermitian two-topology response and H2(R) carrier. A separate color-covariant relationship multiplet, or a color-dependent source-to-transfer map, is required for the quadratic symplectic twirl.',
  reopeningCondition:'Construct three admissible TRO exchanges S_i that transform cyclically under color while their quadratic Hermitian response is gauge singlet, and verify they preserve the completed matter incidence and positivity.',
  passed:true
},null,2));
