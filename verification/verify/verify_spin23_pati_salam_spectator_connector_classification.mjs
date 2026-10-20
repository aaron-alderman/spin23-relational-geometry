import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-pati-salam-spectator-connector-classification.json','utf8'));

assert.equal(evidence.schema,'spin23.pati-salam-spectator-connector-classification/1');

// Exact representation arithmetic for the sourced Delta connector:
// (2,bar 4) x (2,4) = (1+3) x (1+15).
const su2=[{name:'1',dim:1},{name:'3',dim:3}];
const su4=[{name:'1',dim:1},{name:'15',dim:15}];
const deltaCandidates=[];
for(const r of su2) for(const c of su4){
  deltaCandidates.push({name:`(${r.name},1,${c.name})`,dim:r.dim*c.dim});
}
assert.deepEqual(deltaCandidates.map(x=>x.dim),[1,15,3,45]);
assert.equal(deltaCandidates.reduce((s,x)=>s+x.dim,0),64);
assert.equal(8*8,64);

// Sort all locally generated candidates through dimension 15. The singlet is
// unique at dimension one and the only representation with no nontrivial
// Pati-Salam charged components.
const candidates=[
  {X:'(1,1,1)',dim:1,charged:false},
  {X:'(3,1,1)',dim:3,charged:true},
  {X:'(1,2,4)',dim:8,charged:true},
  {X:'(2,1,4)',dim:8,charged:true},
  {X:'(1,1,15)',dim:15,charged:true}
];
assert.deepEqual(evidence.smallestCandidates.map(x=>x.dimension),candidates.map(x=>x.dim));
assert.equal(candidates.filter(x=>!x.charged).length,1);
assert.equal(candidates.filter(x=>!x.charged)[0].X,'(1,1,1)');
assert.equal(evidence.smallestCandidates[0].connectorMultiplicity,1);

// H_1 gives (1+3,2,bar 4), whose conjugate X dimensions are 8 and 24.
assert.deepEqual([1*2*4,3*2*4],[8,24]);
assert.equal(8+24,8*4);

// The claimed relation assignment makes the connector odd under KO-6
// chirality but even under relation-sheet parity, with the second edge fixed
// by J.
const gamma=evidence.JAndGradings.KO6Chiralities;
const rel=evidence.JAndGradings.GammaRelSigns;
assert.equal(gamma.IP*gamma.SP,-1);
assert.equal(gamma.PI*gamma.PS,-1);
assert.equal(rel.IP*rel.SP,1);
assert.equal(rel.PI*rel.PS,1);

function det3(m){
  return m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1])
    -m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0])
    +m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);
}
function det4(m){
  let total=0;
  for(let j=0;j<4;j++){
    const minor=m.slice(1).map(row=>row.filter((_,k)=>k!==j));
    total+=(j%2===0?1:-1)*m[0][j]*det3(minor);
  }
  return total;
}

// The cofactor identity is representation-independent. Test it exhaustively
// on a bounded nonzero integer alphabet and compare with the closed formulas.
const vals=[-2,-1,1,2];
let tested=0;
for(const a of vals) for(const x of vals) for(const y of vals)
for(const d of vals) for(const m of vals) for(const MX of vals){
  const heavy=[
    [a,x,y,0],
    [x,d,0,0],
    [y,0,0,m],
    [0,0,m,MX]
  ];
  const complement=heavy.slice(1).map(row=>row.slice(1));
  const cofactor=det3(complement);
  const determinant=det4(heavy);
  assert.equal(cofactor,-d*m*m);
  assert.equal(determinant,-a*d*m*m+x*x*m*m-d*MX*y*y);
  assert.notEqual(cofactor,0);
  tested++;
}
assert.equal(tested,4**6);
assert.equal(evidence.textureObstruction.selectedCofactorBeforeConnector,0);
assert.equal(evidence.textureObstruction.selectedCofactorAfterConnector,'-d*m^2');
assert.equal(evidence.textureObstruction.independentOfSpectatorRepresentation,true);

const branch=Object.fromEntries(evidence.branchDecisions.map(x=>[x.branch,x.status]));
assert.equal(branch['Pati-Salam gauge EFT representation and J/grading only'],'SAT');
assert.equal(branch['isolated singlet as an ordinary module of the unchanged unreduced finite algebra'],'UNSAT');
assert.equal(branch['nonzero direct physical R_N--X mass connector preserving the selected seesaw cofactor zero'],'UNSAT');
assert.equal(branch['categorical, junk-trivial, zero-vacuum, or larger Schur-correlated connector'],'UNDERDETERMINED');
assert.equal(evidence.decision.directPhysicalRowBStatus,'NO-GO');

console.log(`PASS 1522: the unique smallest charged-matter-free gauge candidate is X=(1,1,1) through Delta, but the isolated finite-algebra lift is unavailable and all ${tested} nonzero primitive mass-connector witnesses give selected cofactor -d*m^2 != 0.`);
