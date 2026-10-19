import assert from 'node:assert/strict';

const mod=(n,m)=>((n%m)+m)%m;
const perms=a=>{
  if(a.length===0)return [[]];
  const out=[];for(let i=0;i<a.length;i++)for(const p of perms([...a.slice(0,i),...a.slice(i+1)]))out.push([a[i],...p]);
  return out;
};
const S5=perms([0,1,2,3,4]);
assert.equal(S5.length,120);
const SM=S5.filter(p=>new Set(p.slice(0,3)).size===3&&p.slice(0,3).every(x=>x<3)&&p.slice(3).every(x=>x>=3));
assert.equal(SM.length,12);

const matchings=xs=>{
  if(xs.length===0)return [[]];
  const a=xs[0],out=[];
  for(let i=1;i<xs.length;i++){
    const b=xs[i],rest=xs.filter((_,j)=>j!==0&&j!==i);
    for(const m of matchings(rest))out.push([[a,b],...m]);
  }
  return out;
};

const forms=[];
for(let c=0;c<5;c++){
  const rest=[0,1,2,3,4].filter(x=>x!==c);
  for(const pairs of matchings(rest))forms.push({c,pairs});
}
assert.equal(forms.length,15);

const canonical=f=>{
  const ps=f.pairs.map(p=>[...p].sort((a,b)=>a-b)).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  return String(f.c)+'|'+ps.map(p=>p.join('')).join(',');
};
const apply=(p,f)=>({c:p[f.c],pairs:f.pairs.map(([a,b])=>[p[a],p[b]])});
const keys=new Set(forms.map(canonical));
for(const p of S5)for(const f of forms)assert(keys.has(canonical(apply(p,f))));

const q4=(f,x)=>mod(3*x[f.c]+2*f.pairs.reduce((s,[a,b])=>s+x[a]*x[b],0),4);
for(const f of forms){
  const dist={};
  for(let n=0;n<32;n++){
    const x=Array.from({length:5},(_,i)=>(n>>i)&1),q=q4(f,x);
    dist[q]=(dist[q]??0)+1;
  }
  assert.deepEqual(dist,{0:10,1:6,2:6,3:10});
}

const f0=forms[0];
const stabS5=S5.filter(p=>canonical(apply(p,f0))===canonical(f0));
assert.equal(stabS5.length,8);
assert.equal(120/stabS5.length,15);

const fixedBySM=forms.filter(f=>SM.every(p=>canonical(apply(p,f))===canonical(f)));
assert.equal(fixedBySM.length,0);

const orbitPartition=(group)=>{
  const unseen=new Set(forms.map(canonical)),sizes=[];
  while(unseen.size){
    const seed=[...unseen][0],f=forms.find(x=>canonical(x)===seed);
    const orb=new Set(group.map(p=>canonical(apply(p,f))));
    for(const k of orb)unseen.delete(k);
    sizes.push(orb.size);
  }
  return sizes.sort((a,b)=>a-b);
};
assert.deepEqual(orbitPartition(S5),[15]);
const smOrbits=orbitPartition(SM);

// Exhaust all S3xS2-invariant Z4 quadratic polynomials, not only the
// coordinate-normal forms above.  Coefficients are constant on the two
// coordinate orbits and on the CC, WW and CW pair orbits.
const rank2=M0=>{
  const M=M0.map(r=>r.map(x=>x&1));let rank=0;
  for(let c=0;c<M[0].length;c++){
    let p=rank;while(p<M.length&&!M[p][c])p++;
    if(p===M.length)continue;
    [M[rank],M[p]]=[M[p],M[rank]];
    for(let i=0;i<M.length;i++)if(i!==rank&&M[i][c])M[i]=M[i].map((x,j)=>x^M[rank][j]);
    rank++;
  }
  return rank;
};
const vectors=Array.from({length:32},(_,n)=>Array.from({length:5},(_,i)=>(n>>i)&1));
const invariantAmbientType=[];
const invariantFunctions=[];
for(let alphaC=0;alphaC<4;alphaC++)for(let alphaW=0;alphaW<4;alphaW++)
for(let betaCC=0;betaCC<2;betaCC++)for(let betaWW=0;betaWW<2;betaWW++)for(let betaCW=0;betaCW<2;betaCW++){
  const q=x=>mod(
    alphaC*(x[0]+x[1]+x[2])+alphaW*(x[3]+x[4])
    +2*betaCC*(x[0]*x[1]+x[0]*x[2]+x[1]*x[2])
    +2*betaWW*x[3]*x[4]
    +2*betaCW*(x[0]+x[1]+x[2])*(x[3]+x[4]),4
  );
  const dist={};for(const x of vectors){const z=q(x);dist[z]=(dist[z]??0)+1;}
  const B=Array.from({length:5},(_,i)=>Array.from({length:5},(_,j)=>{
    const ei=Array(5).fill(0),ej=Array(5).fill(0);ei[i]=1;ej[j]=1;
    return mod(q(ei.map((v,k)=>v^ej[k]))-q(ei)-q(ej),4)/2;
  }));
  if(rank2(B)===5&&JSON.stringify(dist)===JSON.stringify({0:10,1:6,2:6,3:10})){
    invariantAmbientType.push({alphaC,alphaW,betaCC,betaWW,betaCW});
    invariantFunctions.push(q);
  }
}
assert.equal(invariantAmbientType.length,4);

// Construct explicit GL(5,2) isometries from each invariant form to
// qJ=2x0x1+3x2+2x3x4.
const qJ=x=>mod(2*x[0]*x[1]+3*x[2]+2*x[3]*x[4],4);
const xor=(x,y)=>x.map((a,i)=>a^y[i]);
const polar=(q,x,y)=>mod(q(xor(x,y))-q(x)-q(y),4);
const inSpan=(v,basis)=>{
  const S=new Set(['00000']);
  for(const b of basis)for(const k of [...S])S.add(xor(k.split('').map(Number),b).join(''));
  return S.has(v.join(''));
};
const findIsometry=qTarget=>{
  const es=Array.from({length:5},(_,i)=>Array.from({length:5},(_,j)=>Number(i===j)));
  const nonzero=vectors.filter(v=>v.some(Boolean));
  const cols=[];
  const rec=i=>{
    if(i===5)return true;
    for(const y of nonzero){
      if(inSpan(y,cols)||qJ(y)!==qTarget(es[i]))continue;
      let ok=true;
      for(let j=0;j<i;j++)if(polar(qJ,y,cols[j])!==polar(qTarget,es[i],es[j])){ok=false;break;}
      if(!ok)continue;
      cols.push(y);if(rec(i+1))return true;cols.pop();
    }
    return false;
  };
  assert(rec(0));
  for(const x of vectors){
    const image=Array(5).fill(0);
    for(let i=0;i<5;i++)if(x[i])for(let j=0;j<5;j++)image[j]^=cols[i][j];
    assert.equal(qJ(image),qTarget(x));
  }
  return cols;
};
const explicitIsometries=invariantFunctions.map(findIsometry);
const additive=invariantAmbientType.filter(f=>f.betaCC===0&&f.betaWW===0&&f.betaCW===0);
assert.deepEqual(additive,[{alphaC:3,alphaW:1,betaCC:0,betaWW:0,betaCW:0}]);

console.log('five_bit_ambient_quadratic_twist_symmetry_classification: PASS');
console.log('ambient_type_coordinate_forms=15_equal_to_5_distinguished_bits_times_3_matchings');
console.log('S5_is_transitive_with_stabilizer_order8');
console.log('no_form_is_invariant_under_the_full_SM_flag_group_S3_times_S2');
console.log('SM_flag_orbit_sizes='+smOrbits.join(','));
console.log('all_flag_invariant_Z4_quadratic_polynomials_tested=128');
console.log('flag_invariant_nondegenerate_ambient_type_forms='+invariantAmbientType.length);
if(invariantAmbientType.length)console.log('flag_invariant_forms='+JSON.stringify(invariantAmbientType));
console.log('explicit_GL5_isometries_to_qJ='+JSON.stringify(explicitIsometries));
console.log('unique_additive_flag_invariant_form=qSM_3_times_color_sum_plus_weak_sum');
console.log('the_3_plus_2_flag_plus_additivity_selects_a_candidate_but_the_orientation_sign_still_needs_derivation');
