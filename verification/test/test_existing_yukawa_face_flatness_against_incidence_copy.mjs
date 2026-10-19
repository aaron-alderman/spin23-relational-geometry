import assert from 'node:assert/strict';

const rank=A=>{const M=A.map(r=>r.map(Number));let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];M[row]=M[row].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};
const det2=([[a,b],[c,d]])=>a*d-b*c;
const gcd=(a,b)=>b===0?Math.abs(a):gcd(b,a%b);

// Independent augmentation coefficients are x=(u,d,uc), with
// dc=u+d-uc from the resolved O2 cycle boundary.
const sectorRows={
  u:[1,0,0],
  d:[0,1,0],
  uc:[0,0,1],
  dc:[1,1,-1]
};
const add=(a,b)=>a.map((x,i)=>x+b[i]);
const scale=(s,a)=>a.map(x=>s*x);
const dot=(a,b)=>a.reduce((z,x,i)=>z+x*b[i],0);

const incidence=[1,1,-1]; // dc coefficient is 3.
assert.equal(dot(sectorRows.dc,incidence),3);

// Published path orientation: H->O2->C/D->H, so both colored arrows enter
// each Yukawa face with the same sign after the colorless Higgs edge is
// projected away.
const published=[
  add(sectorRows.u,sectorRows.uc),
  add(sectorRows.d,sectorRows.dc)
];
assert.deepEqual(published,[[1,0,1],[1,2,-1]]);
assert.equal(rank(published),2);
const publishedKernel=[1,-1,-1];
assert.ok(published.every(r=>dot(r,publishedKernel)===0));
assert.notDeepEqual(publishedKernel,incidence);

const publishedMinors=[
  det2(published.map(r=>[r[0],r[1]])),
  det2(published.map(r=>[r[0],r[2]])),
  det2(published.map(r=>[r[1],r[2]]))
];
const publishedSmith=[published.flat().reduce(gcd,0),publishedMinors.reduce(gcd,0)];
assert.deepEqual(publishedSmith,[1,2]);

// Exhaust every independent orientation/sign convention for the two unit
// coefficient colored pairs alpha*u+beta*uc and gamma*d+delta*dc.
const signs=[-1,1];
const cases=[];
for(const alpha of signs)for(const beta of signs)for(const gamma of signs)for(const delta of signs){
  const up=add(scale(alpha,sectorRows.u),scale(beta,sectorRows.uc));
  const down=add(scale(gamma,sectorRows.d),scale(delta,sectorRows.dc));
  const D=[up,down];
  cases.push({alpha,beta,gamma,delta,rank:rank(D),incidenceEvaluations:[dot(up,incidence),dot(down,incidence)]});
}
assert.equal(cases.length,16);
assert.equal(cases.filter(c=>c.incidenceEvaluations.every(x=>x===0)).length,0);

// The obstruction is already forced by the down face: on the incidence
// copy it evaluates gamma*d+delta*dc=(gamma+3 delta)w, never zero for signs.
const possibleDownEvaluations=[...new Set(cases.map(c=>c.incidenceEvaluations[1]))].sort((a,b)=>a-b);
assert.deepEqual(possibleDownEvaluations,[-4,-2,2,4]);

// By contrast, the desired second row compares the two Q components and
// has unit coefficients.  Along with the up face it selects the target.
const repaired=[
  add(sectorRows.u,sectorRows.uc),
  add(sectorRows.u,scale(-1,sectorRows.d))
];
assert.deepEqual(repaired,[[1,0,1],[1,-1,0]]);
assert.ok(repaired.every(r=>dot(r,incidence)===0));
assert.equal(rank(repaired),2);

console.log(JSON.stringify({
  protocol:'yukawa-face-flatness-versus-incidence-copy/1',
  cycleParameterization:'(u,d,uc); dc=u+d-uc',
  incidenceGenerator:incidence,
  incidenceSectorRatio:{u:1,d:1,uc:-1,dc:3},
  publishedOrientedFaceMatrix:published,
  publishedFaceKernelGenerator:publishedKernel,
  publishedSmithInvariants:publishedSmith,
  allUnitOrientationCases:cases.length,
  casesAnnihilatingIncidenceCopy:0,
  possibleDownFaceEvaluationsOnIncidenceCopy:possibleDownEvaluations,
  existingUpFaceMatchesNeededRow:true,
  neededReplacementSecondRow:'u-d',
  repairedConstraintMatrix:repaired,
  conclusion:'The up Yukawa triangle supplies u+uc, but no orientation of the ordinary down triangle d +/- dc can annihilate dc=3d. Selection requires a quark-component seam u-d or a non-unit/wound constraint.',
  passed:true
},null,2));
