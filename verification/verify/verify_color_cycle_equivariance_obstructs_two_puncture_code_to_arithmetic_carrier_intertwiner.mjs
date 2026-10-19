import assert from 'node:assert/strict';

const p=3,mod=x=>((x%p)+p)%p;
function rank(A){const M=A.map(r=>r.map(mod));let r=0;for(let c=0;c<(M[0]?.length??0)&&r<M.length;c++){let q=r;while(q<M.length&&M[q][c]===0)q++;if(q===M.length)continue;[M[r],M[q]]=[M[q],M[r]];const inv=M[r][c]===1?1:2;for(let j=c;j<M[r].length;j++)M[r][j]=mod(inv*M[r][j]);for(let i=0;i<M.length;i++)if(i!==r){const f=M[i][c];for(let j=c;j<M[i].length;j++)M[i][j]=mod(M[i][j]-f*M[r][j]);}r++;}return r;}
const I4=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i===j?1:0));
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]].map(r=>r.map(mod));
const RminusI=R.map((r,i)=>r.map((x,j)=>mod(x-I4[i][j])));
assert.equal(rank(RminusI),1);
const carrierFixedDimension=4-rank(RminusI);
assert.equal(carrierFixedDimension,3);

// The color cycle (123) fixes both punctures nu^c=(+++++) and e^c=(+++--).
// Therefore it fixes the two evaluation coordinates W/A and acts identically
// on logical X; CSS duality makes the logical Z action identity as well.
const nuC=[1,1,1,1,1], eC=[1,1,1,-1,-1];
const colorCycle=q=>[q[1],q[2],q[0],q[3],q[4]];
assert.deepEqual(colorCycle(nuC),nuC);
assert.deepEqual(colorCycle(eC),eC);
const codeLogicalAction=I4;

// For Phi: code -> carrier, equivariance is R Phi = Phi I = Phi.
// Every column of Phi must lie in Fix(R), so rank Phi <= 3.
// For Psi: carrier -> code, equivariance is Psi R = Psi, so Psi kills
// im(R-I), again forcing rank <= 3.
const maxEquivariantRank=carrierFixedDimension;
assert.ok(maxEquivariantRank<4);

console.log(JSON.stringify({
  protocol:'color-cycle-equivariance-obstructs-code-carrier-intertwiner/1',
  physicalColorCycle:'(123) on the first three SO(10) oscillator coordinates',
  punctures:{nuC,eC,bothFixed:true},
  codeLogicalAction,
  arithmeticCarrierAction:R,
  carrierRminusIRank:rank(RminusI),
  carrierFixedDimension,
  maximumRankOfEquivariantLinearMap:maxEquivariantRank,
  invertibleEquivariantIntertwinerExists:false,
  conclusion:'The physical color C3 acts trivially on the (nu^c,e^c) two-puncture logical Pauli phase space but nontrivially and unipotently on the arithmetic carrier. No invertible color-equivariant identification exists.',
  exits:['use non-Weyl encoded operations','use puncture motion rather than the pointwise stabilizer','change the puncture pair','treat the carrier color cycle as an emergent response symmetry rather than the microscopic Weyl action'],
  passed:true,
},null,2));
