import assert from 'node:assert/strict';

const names=['u','d','e','nu'];
const unit=i=>names.map((_,j)=>i===j?1:0);
const sub=(a,b)=>a.map((x,i)=>x-b[i]);
const l1=a=>a.reduce((s,x)=>s+Math.abs(x),0);
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const incidence=[10,6,2,1];

// A coefficient multiplying O_g in the renormalization of O_f must carry
// channel charge e_f-e_g.  Spurions y_h have charge -e_h and y_h^* have +e_h,
// so y_f^* y_g is a degree-two solution.  Exhaustive small-lattice search
// proves no degree-zero or degree-one solution for f != g.
const integerVectors=(bound)=>{
  const out=[];
  for(let a=-bound;a<=bound;a++)for(let b=-bound;b<=bound;b++)for(let c=-bound;c<=bound;c++)for(let d=-bound;d<=bound;d++)out.push([a,b,c,d]);
  return out;
};
const lattice=integerVectors(2);
const edges=[];
for(let i=0;i<names.length;i++)for(let j=i+1;j<names.length;j++){
  const target=sub(unit(i),unit(j));
  const fullSolutions=lattice.filter(x=>x.every((v,k)=>v===target[k]));
  assert.equal(fullSolutions.length,1);
  const fullMinimum=l1(fullSolutions[0]);
  assert.equal(fullMinimum,2);

  const incidenceDifference=incidence[i]-incidence[j];
  const incidenceSolutions=lattice.filter(x=>dot(incidence,x)===incidenceDifference);
  const incidenceMinimum=Math.min(...incidenceSolutions.map(l1));
  edges.push({
    edge:`${names[i]}-${names[j]}`,
    fullChannelChargeDifference:target,
    minimumFullSpurionDegree:fullMinimum,
    canonicalFullSpurion:`y_${names[i]}^* y_${names[j]}`,
    incidenceChargeDifference:incidenceDifference,
    minimumIncidenceOnlyDegree:incidenceMinimum,
  });
}
assert.ok(edges.every(x=>x.minimumFullSpurionDegree===2));
assert.equal(edges.find(x=>x.edge==='e-nu').minimumIncidenceOnlyDegree,1);

console.log(JSON.stringify({
  protocol:'full-channel-spurion-mixing-order/1',
  channelSpurionGroup:'U(1)_u x U(1)_d x U(1)_e x U(1)_nu in the zero-Yukawa limit, realized at least by independent singlet-field rephasings',
  operatorCharges:'O_f carries +e_f and y_f carries -e_f',
  mixingRule:'A coefficient C_fg multiplying O_g in O_f^R carries e_f-e_g.',
  edges,
  universalMinimum:'Every off-diagonal edge requires at least y_f^* y_g (or its conjugate by direction), hence total spurion degree two.',
  weightedGraph:'At its first symmetry-allowed order, edge f-g is proportional to |y_f y_g| times a loop/dynamical coefficient.',
  incidenceComparison:'The single incidence U(1) with charges (10,6,2,1) is a coarser quotient of the rank-four lattice. It can allow lower-degree monomials, including degree one on e-nu, and therefore cannot by itself protect the channel center.',
  orientationToleranceTranslation:'For a source-map column f with diagonal amplitude d_f and off-diagonal coefficients E_gf, test rho_f=sqrt(sum_{g!=f}|E_gf|^2)/|d_f| against 0.0411022547, or use the exact quadratic flux-cone test.',
  nonClaim:'Spurion covariance gives minimum powers, not loop order, coefficients, signs, or proof that an allowed edge is nonzero.',
  passed:true,
},null,2));
