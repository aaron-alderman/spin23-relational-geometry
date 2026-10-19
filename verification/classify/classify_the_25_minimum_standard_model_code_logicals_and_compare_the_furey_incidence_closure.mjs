import assert from 'node:assert/strict';

const range=n=>Array.from({length:n},(_,i)=>i);
const key=v=>v.join(',');
const add=(...vs)=>vs[0].map((_,i)=>vs.reduce((s,v)=>s+v[i],0));
const scale=(a,v)=>v.map(x=>a*x);
const permutations=a=>a.length===0?[[]]:a.flatMap((x,i)=>permutations(a.filter((_,j)=>j!==i)).map(p=>[x,...p]));

const labelOccupation=o=>{
  if(o.length===0)return 'nu^c';
  if(o.length===2&&o[0]<=3&&o[1]>=4)return `${o[1]===5?'u':'d'}_${o[0]}`;
  if(o.length===2&&o.every(i=>i<=3))return `u^c_${[1,2,3].find(i=>!o.includes(i))}`;
  if(o.join('')==='45')return 'e^c';
  if(o.length===4){const m=[1,2,3,4,5].find(i=>!o.includes(i));if(m<=3)return `d^c_${m}`;return m===4?'nu':'e';}
  throw new Error(`unlabelled ${o}`);
};
const states=[];
for(let mask=0;mask<32;mask++){
  const occupied=range(5).filter(i=>(mask>>i)&1).map(i=>i+1);
  if(occupied.length%2===0)states.push({occupied,q:range(5).map(i=>occupied.includes(i+1)?-1:1),field:labelOccupation(occupied)});
}
const nu=states.find(s=>s.field==='nu^c'), physical=states.filter(s=>s!==nu);
const byQ=new Map(states.map(s=>[key(s.q),s]));
const byField=new Map(states.map(s=>[s.field,s]));

const logicals=[];
for(let i=0;i<physical.length;i++)for(let j=i+1;j<physical.length;j++)for(let k=j+1;k<physical.length;k++){
  const triple=[physical[i],physical[j],physical[k]];
  const solutions=[];
  for(const a of [-1,1])for(const b of [-1,1])for(const c of [-1,1]){
    if(key(add(scale(a,triple[0].q),scale(b,triple[1].q),scale(c,triple[2].q)))===key(nu.q))solutions.push([a,b,c]);
  }
  if(solutions.length)logicals.push({fields:triple.map(s=>s.field),weights:triple.map(s=>s.q),solutions});
}
assert.equal(logicals.length,25);
assert.ok(logicals.every(x=>x.solutions.length===1));

// Classify the 25 supports under S5 coordinate permutations.
const perms=permutations(range(5));
const supportKey=fields=>[...fields].sort().join('|');
const logicalKeys=new Set(logicals.map(x=>supportKey(x.fields)));
const permuteWeight=(q,p)=>p.map(i=>q[i]);
const orbitOf=logical=>{
  const out=new Set();
  for(const p of perms){
    const fields=logical.weights.map(q=>byQ.get(key(permuteWeight(q,p))).field);
    out.add(supportKey(fields));
  }
  return out;
};
const unseen=new Set(logicalKeys),orbits=[];
while(unseen.size){
  const seed=[...unseen][0];
  const logical=logicals.find(x=>supportKey(x.fields)===seed);
  const orbit=orbitOf(logical);
  const inside=[...orbit].filter(x=>logicalKeys.has(x));
  inside.forEach(x=>unseen.delete(x));
  orbits.push({seed,size:inside.length,members:inside.sort()});
}
assert.equal(orbits.reduce((s,o)=>s+o.size,0),25);

const family=f=>f.replace(/_\d$/,'');
const familyPatterns={};
for(const l of logicals){
  const p=l.fields.map(family).sort().join('+');
  familyPatterns[p]=(familyPatterns[p]||0)+1;
}

// Weak reflection q4<->q5 permutes the logical set.
const weak=q=>[q[0],q[1],q[2],q[4],q[3]];
for(const l of logicals){
  const image=supportKey(l.weights.map(q=>byQ.get(key(weak(q))).field));
  assert.ok(logicalKeys.has(image));
}

// Compare the project incidence closure dc=u+d-uc as an equality of weights.
const incidenceResiduals=[];
for(let c=1;c<=3;c++){
  const fields=[`d^c_${c}`,`u_${c}`,`d_${c}`,`u^c_${c}`];
  const residual=add(byField.get(fields[0]).q,scale(-1,byField.get(fields[1]).q),scale(-1,byField.get(fields[2]).q),byField.get(fields[3]).q);
  incidenceResiduals.push({color:c,fields,equation:'dc-u-d+uc',residual,neutral:residual.every(x=>x===0)});
  assert.ok(residual.some(x=>x!==0));
  assert.ok(!logicalKeys.has(supportKey([`u_${c}`,`d_${c}`,`u^c_${c}`])));
}

// Stronger test: none of these four-field supports admits any +-1 neutral relation.
for(const item of incidenceResiduals){
  const qs=item.fields.map(f=>byField.get(f).q);
  const weakCenterSigns=item.fields.map(f=>{
    const q=byField.get(f).q;
    return q[3]===q[4]?1:-1;
  });
  item.weakCenterSigns=weakCenterSigns;
  item.fureyIncidenceSigns=[1,-1,-1,1];
  assert.deepEqual(weakCenterSigns,item.fureyIncidenceSigns);
  const neutralSigns=[];
  for(const a of [-1,1])for(const b of [-1,1])for(const c of [-1,1])for(const d of [-1,1])
    if(add(scale(a,qs[0]),scale(b,qs[1]),scale(c,qs[2]),scale(d,qs[3])).every(x=>x===0))neutralSigns.push([a,b,c,d]);
  item.neutralSignPatterns=neutralSigns;
  assert.deepEqual(neutralSigns,[[-1,-1,-1,-1],[1,1,1,1]]);
}

console.log(JSON.stringify({
  protocol:'minimum-standard-model-code-logicals-versus-furey-incidence/1',
  minimumLogicalSupports:logicals.length,
  uniqueCoefficientChoicePerSupport:true,
  s5OrbitCount:orbits.length,
  s5Orbits:orbits.map(o=>({seed:o.seed,size:o.size})),
  familyPatterns,
  weakWeylPermutesAllSupports:true,
  incidenceComparison:incidenceResiduals,
  conclusion:'The code logical triangles and the signed Furey incidence equation are not the same relation. The Furey quartet support is nevertheless exactly Spin(10)-neutral with equal signs, and its response-incidence coefficient pattern is exactly the SU(2)_L center character: -1 on the weak-doublet u,d legs and +1 on the singlet uc,dc legs. This is a canonical local-coefficient twist, not equality of the charge-lattice relations.',
  passed:true
},null,2));
