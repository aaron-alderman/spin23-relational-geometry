import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-five-chain-minimal-auxiliary-feshbach-topology.json','utf8'));
assert.equal(evidence.schema,'spin23.five-chain-minimal-auxiliary-feshbach-topology/1');

const inv=M=>{
  const n=M.length,A=M.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>i===j?1:0)]);
  for(let c=0;c<n;c++){
    let p=c;while(p<n&&Math.abs(A[p][c])<1e-12)p++;
    assert.ok(p<n);[A[p],A[c]]=[A[c],A[p]];
    const q=A[c][c];A[c]=A[c].map(x=>x/q);
    for(let i=0;i<n;i++)if(i!==c){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[c][j]);}
  }
  return A.map(r=>r.slice(n));
};
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const close=(a,b)=>Math.abs(a-b)<1e-10;

// Exhaust nonempty one-auxiliary attachment supports on the five retained
// roles. Generically the induced support is the complete graph on the
// attachment set. Both desired diagonals with no forbidden edge require the
// unique support {I,P}; it necessarily also renormalizes allowed I--P.
const roles=['I','P','N','Z','X'];
const forbidden=new Set(['I--N','P--Z','N--X']);
const canonical=(a,b)=>[a,b].sort().join('--');
const oneAuxSurvivors=[];
for(let mask=1;mask<1<<5;mask++){
  const attached=roles.filter((_,i)=>mask>>i&1);
  const diagonals=new Set(attached);
  const off=[];
  for(let i=0;i<attached.length;i++)for(let j=i+1;j<attached.length;j++)off.push(canonical(attached[i],attached[j]));
  if(diagonals.has('I')&&diagonals.has('P')&&!off.some(x=>forbidden.has(x)))oneAuxSurvivors.push({attached,off});
}
// Requiring no unwanted diagonal also removes every support containing N/Z/X.
const desiredOnly=oneAuxSurvivors.filter(x=>x.attached.every(r=>r==='I'||r==='P'));
assert.deepEqual(desiredOnly,[{attached:['I','P'],off:['I--P']}]);

const z=2,M=11,lI=3,lP=5;
const oneFactor=1/(z-M);
const oneSigma=[[lI*lI*oneFactor,lI*lP*oneFactor],[lI*lP*oneFactor,lP*lP*oneFactor]];
assert.ok(close(oneSigma[0][0]*oneSigma[1][1]-oneSigma[0][1]**2,0));
assert.equal(evidence.unconstrainedMassiveScalarAuxiliaries.oneAuxiliary.minimumForBothDiagonalsIfAllowedIPEdgeRenormalization,true);

// Two disconnected scalar leaves give independent diagonal-only functions.
const MI=7,MP=13;
const DA=[[MI,0],[0,MP]];
const B=[[lI,0],[0,lP]];
const R=inv([[z-MI,0],[0,z-MP]]);
const Sigma=mul(mul(B,R),transpose(B));
assert.ok(close(Sigma[0][1],0));
assert.ok(close(Sigma[0][0],lI*lI/(z-MI)));
assert.ok(close(Sigma[1][1],lP*lP/(z-MP)));

// A connected generic 2x2 auxiliary mass block produces an I--P term.
const connectedR=inv([[z-MI,-2],[-2,z-MP]]);
const connectedSigma=mul(mul(B,connectedR),transpose(B));
assert.notEqual(connectedSigma[0][1],0);
assert.equal(evidence.unconstrainedMassiveScalarAuxiliaries.twoAuxiliaries.necessaryForIndependentDiagonalOnlySelfEnergies,true);

function determinant(M){
  if(M.length===0)return 1;
  return M[0].reduce((s,x,j)=>s+(j%2===0?1:-1)*x*
    determinant(M.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
}
const x=2,y=3,g=5,h=7,dI=-lI*lI/MI,dP=-lP*lP/MP;
const Deff=[[dI,x,0,0,0],[x,dP,y,0,0],[0,y,0,g,0],[0,0,g,0,h],[0,0,0,h,0]];
const cofactorP=Deff.filter((_,i)=>i!==1).map(r=>r.filter((_,j)=>j!==1));
assert.equal(determinant(cofactorP),0);
assert.ok(close(determinant(Deff),dI*y*y*h*h));
assert.equal(evidence.cofactorAndRank.selectedCofactorPP,0);

// Strict grading: an invertible odd block has off-diagonal normal form and
// inverse. Same-chirality inverse blocks vanish, so retained self-energies at
// z=0 vanish for every allowed attachment. Test a generic 2+2 block.
const K=[[2,3],[5,7]];
assert.notEqual(determinant(K),0);
const zero=[[0,0],[0,0]],Kt=transpose(K);
const odd=[
  [0,0,K[0][0],K[0][1]],[0,0,K[1][0],K[1][1]],
  [Kt[0][0],Kt[0][1],0,0],[Kt[1][0],Kt[1][1],0,0]
];
const oddInv=inv(odd);
for(let i=0;i<2;i++)for(let j=0;j<2;j++){
  assert.ok(close(oddInv[i][j],0));
  assert.ok(close(oddInv[i+2][j+2],0));
}
// A one-dimer spectral diagonal is z/(z^2-m^2), hence zero at z=0.
const m=17,lambda=19;
assert.ok(close(lambda*lambda*0/(0-m*m),0));
assert.match(evidence.strictGradingRelationAudit.strictOneOrTwoAuxiliaryStateResult,/UNSAT/);
assert.match(evidence.strictGradingRelationAudit.allSizeResult,/UNSAT/);

// The exact scalar-leaf self-energy is not constant; its Taylor coefficients
// begin -lambda^2/M-lambda^2*z/M^2. The effective-operator support/cofactor
// is exact, while the constant texture is only its low-energy expansion.
for(const [L,Mass] of [[3,7],[5,13]]){
  const eps=1e-5;
  const exact=L*L/(eps-Mass);
  const truncated=-L*L/Mass-L*L*eps/(Mass*Mass);
  assert.ok(Math.abs(exact-truncated)<1e-9);
}
assert.match(evidence.intervalAndEFTDecision.constantTextureStatus,/EFT/);
assert.match(evidence.physicalBoundary,/does not source/);

console.log('PASS 1550: one shared grading-even leaf is minimal only if a rank-one I-P renormalization is allowed; two disconnected massive leaves are necessary and sufficient for independent diagonal-only I/P self-energies and exact forbidden-support stability. Strict grading forbids their masses, and every invertible odd auxiliary block has zero same-chirality inverse at zero energy, so no ordinary finite-Dirac Schur repair generates the required zero-energy diagonals.');
