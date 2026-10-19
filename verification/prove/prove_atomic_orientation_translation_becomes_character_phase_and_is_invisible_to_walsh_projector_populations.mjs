import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-B[i][j]))));
const raw=[
  [1,1,1,1],
  [1,-1,-1,1],
  [1,1,-1,-1],
  [1,-1,1,-1],
];
const F=raw.map(r=>r.map(x=>x/2));
const channelTranslation=[3,2,1,0];
const T=channelTranslation.map((_,i)=>channelTranslation.map((__,j)=>channelTranslation[j]===i?1:0));
const D=mm(mm(F,T),transpose(F));
const expected=[[1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,-1]];
assert.ok(maxerr(D,expected)<1e-12);

const projector=i=>Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>r===i&&c===i?1:0));
for(let i=0;i<4;i++)assert.ok(maxerr(mm(mm(D,projector(i)),D),projector(i))<1e-12);

const interference=(i,j)=>Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>(r===i&&c===j)||(r===j&&c===i)?1:0));
const odd=interference(0,2),even=interference(0,1);
assert.ok(maxerr(mm(mm(D,odd),D),odd.map(r=>r.map(x=>-x)))<1e-12);
assert.ok(maxerr(mm(mm(D,even),D),even)<1e-12);

console.log(JSON.stringify({
  protocol:'atomic-orientation-to-walsh-character-phase/1',
  atomicOrientationDifference:'side/channel translation at fixed handle',
  walshConjugate:D,
  characterSigns:{trivial:1,handle:1,channel:-1,product:-1},
  projectorAction:'Every rank-one character projector is fixed because the phase squares to +1.',
  populationConsequence:'All observables diagonal in the Walsh character basis give identical values for the two atomic orientations.',
  phaseSensitiveWitness:'Interference between an even character (trivial or handle) and an odd character (channel or product) reverses sign.',
  orientedAlgebraConsequence:'The orientation bit survives at amplitude/TRO level but is forgotten by the commutative Jordan algebra of character projectors.',
  passed:true,
},null,2));
