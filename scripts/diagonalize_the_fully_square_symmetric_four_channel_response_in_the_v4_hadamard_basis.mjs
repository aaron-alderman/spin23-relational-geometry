import assert from 'node:assert/strict';

const a=2,b=.3,c=-.2,d=.1;
const K=[
  [a,b,d,c],
  [b,a,c,d],
  [d,c,a,b],
  [c,d,b,a],
];
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-B[i][j]))));
const permMatrix=p=>p.map((_,i)=>p.map((__,j)=>p[j]===i?1:0));
const handleFlip=permMatrix([1,0,3,2]);
const channelFlip=permMatrix([3,2,1,0]);
assert.ok(maxerr(mm(mm(transpose(handleFlip),K),handleFlip),K)<1e-12);
assert.ok(maxerr(mm(mm(transpose(channelFlip),K),channelFlip),K)<1e-12);

const raw=[
  [1,1,1,1],
  [1,-1,-1,1],
  [1,1,-1,-1],
  [1,-1,1,-1],
];
const H=raw.map(v=>v.map(x=>x/2)); // rows are orthonormal characters
assert.ok(maxerr(mm(H,transpose(H)),[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]])<1e-12);
const diagonalized=mm(mm(H,K),transpose(H));
const expected=[a+b+c+d,a-b+c-d,a+b-c-d,a-b-c+d];
for(let i=0;i<4;i++)for(let j=0;j<4;j++)assert.ok(Math.abs(diagonalized[i][j]-(i===j?expected[i]:0))<1e-12);
const coordinateProjectorDistance=Math.sqrt(3)/2;

console.log(JSON.stringify({
  protocol:'v4-square-symmetric-relational-eigenchannels/1',
  sourceOrder:['u','nu','d','e'],
  invariantResponsePattern:'[[a,b,d,c],[b,a,c,d],[d,c,a,b],[c,d,b,a]]',
  parameters:{a,b,c,d},
  commutesWith:['handle flip (u nu)(d e)','channel flip (u e)(nu d)'],
  hadamardCharacters:{trivial:raw[0],handle:raw[1],channel:raw[2],product:raw[3]},
  eigenvalues:{trivial:expected[0],handle:expected[1],channel:expected[2],product:expected[3]},
  diagonalizationError:maxerr(diagonalized,expected.map((x,i)=>expected.map((_,j)=>i===j?x:0))),
  absoluteOverlapOfEveryCharacterWithEveryAtom:.5,
  projectorDistanceFromEveryAtomicChannel:coordinateProjectorDistance,
  orientationTolerance:0.04110225473981188,
  atomicToleranceFails:coordinateProjectorDistance>0.04110225473981188,
  conclusion:'Exact restoration of both square flips turns the response into a V4 convolution algebra. Its canonical eigenchannels are the four Walsh-Hadamard characters, all maximally relational over the four atomic channel labels.',
  boundary:'If character eigenvalues are accidentally degenerate, K alone does not choose a basis inside the degenerate space; the two physical flip operators still do if they are retained as observables.',
  passed:true,
},null,2));
