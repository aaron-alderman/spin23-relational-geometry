import assert from 'node:assert/strict';

// Physical punctured order used by the incidence certificate:
// uc(3), d(3), e, u(3), nu, ec, dc(3).
const sectors=['uc','uc','uc','d','d','d','e','u','u','u','nu','ec','dc','dc','dc'];
const B=[
  [0,-1],[1,2],[-1,-1],[1,1],[-1,-2],[0,1],[0,0],[1,1],
  [-1,-2],[0,1],[0,0],[0,0],[0,3],[-3,-6],[3,3]
];
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];M[row]=M[row].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};

// Completed Furey graph arrow order is (Q,uc,dc,ec,nuc,L).  On the punctured
// coordinates Q=u+d and L=e+nu; nuc is absent.
const arrowOrder=['Q','uc','dc','ec','nuc','L'];
const aggregate=arrowOrder.map(arrow=>sectors.map(s=>{
  if(arrow==='Q')return Number(s==='u'||s==='d');
  if(arrow==='L')return Number(s==='e'||s==='nu');
  if(arrow==='nuc')return 0;
  return Number(s===arrow);
}));
const aggregatedActive=mm(aggregate,B);
assert.ok(aggregatedActive.flat().every(x=>x===0));

// The two completed graph cycles and their relative class live entirely in
// this six-arrow quotient.
const cC=[1,1,0,1,0,1];
const cD=[1,0,1,0,1,1];
const relative=cC.map((x,i)=>x-cD[i]);
assert.deepEqual(relative,[0,1,-1,1,-1,0]);

// Every sector-constant functional factors through aggregate and annihilates
// the active lattice.  The four colored orbit sums also vanish separately.
const colored=['uc','d','u','dc'];
const orbitSums=Object.fromEntries(colored.map(s=>[s,
  [0,1].map(j=>B.reduce((sum,row,i)=>sum+(sectors[i]===s?row[j]:0),0))
]));
assert.ok(Object.values(orbitSums).flat().every(x=>x===0));

// In contrast the active lattice itself is rank two.
assert.equal(rank(B),2);

console.log(JSON.stringify({
  protocol:'incidence-selected-active-lattice-vs-furey-cycle-homology/1',
  activeLatticeRank:rank(B),
  fureyArrowOrder:arrowOrder,
  aggregationOfActiveBasis:aggregatedActive,
  coloredOrbitSums:orbitSums,
  completedCycleBasis:{cC,cD,relative},
  ordinaryCycleHomologySeesActiveLattice:false,
  reason:'The selected plane is a color-standard zero-sum fluctuation inside each colored sector, whereas the ordinary Furey graph retains only sector arrows and their color-singlet sums.',
  consequence:'The existing genus-one/genus-two ribbon homology cannot topologically protect L_inc. A color-resolved cover, a C3 local coefficient system, or noncentral edge transport is required.',
  minimalReopening:'Refine each colored arrow into three sheets and compute H1 of the ribbon with the augmentation ideal of Z[C3] as local coefficients; its real rank-two standard component is the only plausible topological home for L_inc.',
  passed:true
},null,2));
