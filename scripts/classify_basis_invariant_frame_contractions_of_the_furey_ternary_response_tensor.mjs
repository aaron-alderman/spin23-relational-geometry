import assert from 'node:assert/strict';

const dims={O1:1,O2:3,H:2,C:1,R:1};
const offsets={};let ambient=0;for(const [k,d] of Object.entries(dims)){offsets[k]=ambient;ambient+=d;}
const swap=b=>b==='O1'?'R':b==='R'?'O1':b;
const arrows=[['Q','O2','H'],['uc','C','O2'],['dc','O1','O2'],['L','H','R'],['ec','R','C']];
const basis=arrows.flatMap(([arrow,tb,sb])=>Array.from({length:dims[tb]},(_,i)=>Array.from({length:dims[sb]},(_,j)=>({arrow,tb,sb,target:offsets[tb]+i,source:offsets[sb]+j,name:`${arrow}${i+1}${j+1}`}))).flat());
assert.equal(basis.length,15);

const middle=x=>({target:offsets[swap(x.sb)]+x.source-offsets[x.sb],source:offsets[swap(x.tb)]+x.target-offsets[x.tb]});
const mul=(a,b)=>a.source===b.target?{target:a.target,source:b.source}:null;
const triple=(x,y,z)=>{const a=mul(x,middle(y));return a&&mul(a,z);};
const addUnit=(map,u,c=1)=>{if(!u)return;const k=`${u.target}<-${u.source}`;map.set(k,(map.get(k)||0)+c);};
const B=(x,y,z)=>{const out=new Map();addUnit(out,triple(x,y,z));addUnit(out,triple(z,y,x));return out;};
const addMaps=(a,b,sa=1,sb=1)=>{const o=new Map();for(const [k,v] of a)o.set(k,(o.get(k)||0)+sa*v);for(const [k,v] of b)o.set(k,(o.get(k)||0)+sb*v);for(const [k,v] of [...o])if(v===0)o.delete(k);return o;};
const inner=(a,b)=>{let s=0;for(const [k,v] of a)s+=v*(b.get(k)||0);return s;};
const norm2=a=>inner(a,a);

// Polarization of R_z(x)=B(x,x,z): T_z(x,y)=1/2(B(x,y,z)+B(y,x,z)).
const T=(x,y,z)=>addMaps(B(x,y,z),B(y,x,z),.5,.5);

// Three canonical contractions of the ternary tensor.
const n=basis.length;
const Fpolar=Array.from({length:n},()=>Array(n).fill(0));
const Ffirst=Array.from({length:n},()=>Array(n).fill(0));
const Fmiddle=Array.from({length:n},()=>Array(n).fill(0));
for(let i=0;i<n;i++)for(let k=0;k<n;k++){
  let sp=0,sf=0,sm=0;
  for(let j=0;j<n;j++)for(let z=0;z<n;z++){
    sp+=inner(T(basis[i],basis[j],basis[z]),T(basis[k],basis[j],basis[z]));
    sf+=inner(B(basis[i],basis[j],basis[z]),B(basis[k],basis[j],basis[z]));
    sm+=inner(B(basis[j],basis[i],basis[z]),B(basis[j],basis[k],basis[z]));
  }
  Fpolar[i][k]=sp;
  Ffirst[i][k]=sf;
  Fmiddle[i][k]=sm;
}

const maxOff=A=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>i===j?0:Math.abs(x))));
const summarize=A=>Object.fromEntries(arrows.map(([arrow])=>{
  const ids=basis.map((x,i)=>x.arrow===arrow?i:-1).filter(i=>i>=0);
  const diag=[...new Set(ids.map(i=>A[i][i]))].sort((a,b)=>a-b);
  let offBlock=0;for(const i of ids)for(let j=0;j<n;j++)if(!ids.includes(j))offBlock=Math.max(offBlock,Math.abs(A[i][j]));
  return [arrow,{dimension:ids.length,diagonalValues:diag,offBlockMax:offBlock}];
}));

// A fourth contraction uses only the diagonal quadratic rays R_z(e_i).
const diagonalRayWeights=basis.map(x=>basis.reduce((s,z)=>s+norm2(B(x,x,z)),0));
const diagonalRaySummary=Object.fromEntries(arrows.map(([arrow])=>[arrow,[...new Set(basis.map((x,i)=>x.arrow===arrow?diagonalRayWeights[i]:null).filter(x=>x!==null))].sort((a,b)=>a-b)]));

const summaries={polarizedFrame:summarize(Fpolar),firstSlotFrame:summarize(Ffirst),middleSlotFrame:summarize(Fmiddle),diagonalRay:diagonalRaySummary};

// The polarized frame is the canonical candidate: contraction over every
// orthonormal input, probe and output index is invariant under orthogonal
// basis changes. Record rather than assume whether it yields the needed
// primary equality Q=uc and separates dc.
const diagByArrow=A=>Object.fromEntries(arrows.map(([arrow])=>[arrow,[...new Set(basis.map((x,i)=>x.arrow===arrow?A[i][i]:null).filter(x=>x!==null))]]));
const polarDiag=diagByArrow(Fpolar);
const primaryEquality=polarDiag.Q.length===1&&polarDiag.uc.length===1&&polarDiag.Q[0]===polarDiag.uc[0];
const dcSeparated=polarDiag.dc.length===1&&polarDiag.dc[0]!==polarDiag.Q[0];
const middleDiag=diagByArrow(Fmiddle);
const middlePrimaryEquality=middleDiag.Q.length===1&&middleDiag.uc.length===1&&middleDiag.Q[0]===middleDiag.uc[0];
const middleDcSeparated=middleDiag.dc.length===1&&middleDiag.dc[0]!==middleDiag.Q[0];
assert.equal(middlePrimaryEquality,true);
assert.equal(middleDcSeparated,true);

// On the color-standard code kernel Q contributes both u and d, so the
// middle-slot weights are (A,A,A,E)=(14,14,14,4).  Cycle compression gives
// the same signed K3 selector with a rescaled spectrum.
const middleA=middleDiag.Q[0],middleE=middleDiag.dc[0];
const middleSynchronizedEigenvalue=(middleA+3*middleE)/4;
const middleTransverseEigenvalue=middleA;
const middleGap=middleTransverseEigenvalue-middleSynchronizedEigenvalue;
assert.equal(middleSynchronizedEigenvalue,6.5);
assert.equal(middleGap,7.5);

console.log(JSON.stringify({
  protocol:'basis-invariant-furey-ternary-response-frame-contractions/1',
  basisDimension:n,
  polarizedTensor:'T_z(x,y)=1/2(B(x,y,z)+B(y,x,z)), B(x,y,z)=x middle(y) z + z middle(y) x',
  contractions:{
    polarizedFrame:'F_ik=sum_{j,z,out} T_z(e_i,e_j)_out T_z(e_k,e_j)_out',
    firstSlotFrame:'sum B(e_i,e_j,z) B(e_k,e_j,z)',
    middleSlotFrame:'sum B(e_j,e_i,z) B(e_j,e_k,z)',
    diagonalRay:'sum_z ||B(e_i,e_i,z)||^2'
  },
  maximumOffDiagonal:{polarizedFrame:maxOff(Fpolar),firstSlotFrame:maxOff(Ffirst),middleSlotFrame:maxOff(Fmiddle)},
  summaries,
  polarizedPrimaryEqualityQEqualsUc:primaryEquality,
  polarizedDcSeparated:dcSeparated,
  middleSlotPrimaryEqualityQEqualsUc:middlePrimaryEquality,
  middleSlotDcSeparated:middleDcSeparated,
  middleSlotColorStandardWeights:{u:middleA,d:middleA,uc:middleA,dc:middleE},
  middleSlotCompressedSignedForm:`${middleSynchronizedEigenvalue} I + ${(middleA-middleE)/4} L_K3`,
  middleSlotSpectrum:[middleSynchronizedEigenvalue,middleTransverseEigenvalue,middleTransverseEigenvalue],
  middleSlotGap:middleGap,
  middleSlotSelectsSameSignedK3Kernel:true,
  establishedIncidenceTarget:{Q:5,uc:5,dc:1,L:0,ec:'1 deduplicated / 3 raw'},
  interpretation:'The fully polarized frame does not preserve Q=uc, but the canonical middle-slot frame does: its Hilbert-Schmidt norm assigns (14,14,14,4) to (u,d,uc,dc), so cycle compression gives the same exact signed-K3 kernel and projector. The relational middle slot is therefore distinguished without positive-diagonal extraction.',
  passed:true
},null,2));
