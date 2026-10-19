import assert from 'node:assert/strict';

const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const diag=v=>v.map((x,i)=>v.map((_,j)=>i===j?x:0));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const eq=(A,B,t=1e-9)=>maxabs(sub(A,B))<t;
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];for(let j=c;j<M[0].length;j++)M[row][j]/=d;for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];for(let j=c;j<M[0].length;j++)M[i][j]-=f*M[row][j];}row++;}return row;};
const rankMod=(A,p)=>{const M=A.map(r=>r.map(x=>((x%p)+p)%p));let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let k=row;while(k<M.length&&M[k][c]===0)k++;if(k===M.length)continue;[M[row],M[k]]=[M[k],M[row]];const inv=Array.from({length:p},(_,x)=>x).find(x=>(x*M[row][c])%p===1);M[row]=M[row].map(x=>(x*inv)%p);for(let i=0;i<M.length;i++)if(i!==row&&M[i][c]){const f=M[i][c];M[i]=M[i].map((x,j)=>((x-f*M[row][j])%p+p)%p);}row++;}return row;};
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r,...I(n)[i]]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}}return M.map(r=>r.slice(n));};
const orthonormalColumns=A=>{
  const out=[];
  for(let j=0;j<A[0].length;j++){
    let v=A.map(r=>r[j]);
    for(const q of out){const d=v.reduce((s,x,i)=>s+x*q[i],0);v=v.map((x,i)=>x-d*q[i]);}
    const n=Math.sqrt(v.reduce((s,x)=>s+x*x,0));
    if(n>1e-9)out.push(v.map(x=>x/n));
  }
  return out[0].map((_,i)=>out.map(q=>q[i]));
};
const jacobiEigenvalues=S=>{
  const A=S.map(r=>r.slice()),n=A.length;
  for(let iter=0;iter<10000;iter++){
    let p=0,q=1,best=0;
    for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(Math.abs(A[i][j])>best){best=Math.abs(A[i][j]);p=i;q=j;}
    if(best<1e-12)break;
    const phi=.5*Math.atan2(2*A[p][q],A[q][q]-A[p][p]),c=Math.cos(phi),s=Math.sin(phi);
    const app=A[p][p],aqq=A[q][q],apq=A[p][q];
    for(let k=0;k<n;k++)if(k!==p&&k!==q){
      const akp=A[k][p],akq=A[k][q];
      A[k][p]=A[p][k]=c*akp-s*akq;A[k][q]=A[q][k]=s*akp+c*akq;
    }
    A[p][p]=c*c*app-2*s*c*apq+s*s*aqq;
    A[q][q]=s*s*app+2*s*c*apq+c*c*aqq;
    A[p][q]=A[q][p]=0;
  }
  return A.map((r,i)=>r[i]).sort((a,b)=>a-b);
};

const full=[];
for(let mask=0;mask<32;mask++){
  const q=Array.from({length:5},(_,i)=>(mask>>i)&1?-1:1);
  if(q.filter(x=>x<0).length%2===0)full.push({mask,q});
}
const physical=full.filter(x=>x.mask!==0),n=15;
const index=new Map(physical.map(({q},i)=>[q.join(','),i]));
const cycle=q=>[q[2],q[0],q[1],q[3],q[4]];
const P=Array.from({length:n},()=>Array(n).fill(0));
for(let j=0;j<n;j++)P[index.get(cycle(physical[j].q).join(','))][j]=1;
const P2=mm(P,P);
const Pstd=scale(1/3,sub(scale(2,I(n)),add(P,P2)));
assert.ok(eq(mm(Pstd,Pstd),Pstd));

const A=Array.from({length:4},(_,a)=>physical.map(({q})=>(q[a]-q[a+1])/2));
const At=tr(A),QK=sub(I(n),mm(mm(At,inverse(mm(A,At))),A));
assert.ok(eq(mm(QK,QK),QK));
assert.ok(eq(mm(QK,Pstd),mm(Pstd,QK)));
const Qstd=mm(QK,Pstd);
assert.equal(rank(Qstd),6);
const B=orthonormalColumns(Qstd);
assert.equal(B[0].length,6);
assert.ok(eq(mm(tr(B),B),I(6)));
assert.ok(eq(mm(B,tr(B)),Qstd));

const label=mask=>{const a=[];for(let i=0;i<5;i++)if((mask>>i)&1)a.push(i+1);return a.join('');};
const sectorOf=mask=>{
  const s=label(mask);
  if(['12','13','23'].includes(s))return 'uc';
  if(['14','24','34'].includes(s))return 'd';
  if(['15','25','35'].includes(s))return 'u';
  if(['1245','1345','2345'].includes(s))return 'dc';
  if(s==='45')return 'ec';
  if(s==='1234')return 'e';
  if(s==='1235')return 'nu';
  throw new Error('unlabelled '+s);
};
const sectors=physical.map(x=>sectorOf(x.mask));
const incidenceBySector={uc:5,d:5,u:5,dc:1,ec:1,e:0,nu:0};
const Lambda=diag(sectors.map(s=>incidenceBySector[s]));
assert.ok(eq(mm(P,Lambda),mm(Lambda,P)));

// Lambda is color-equivariant but does not preserve the charge-neutral
// relation space.  The orthogonal compression is the typed self-adjoint
// response operator once the coordinate/Hilbert--Schmidt metric is chosen.
const leakage=mm(sub(I(n),Qstd),mm(Lambda,Qstd));
const preservesKernel=maxabs(leakage)<1e-10;
assert.equal(preservesKernel,false);
const compressed=mm(mm(tr(B),Lambda),B);
const incidenceSpectrum=jacobiEigenvalues(compressed);
const rounded=incidenceSpectrum.map(x=>Math.round(x*1e10)/1e10);
assert.ok(Math.abs(rounded[0]-rounded[1])<1e-8);
assert.ok(Math.abs(rounded[2]-rounded[3])<1e-8);
assert.ok(Math.abs(rounded[4]-rounded[5])<1e-8);
const complexSpectrum=[rounded[0],rounded[2],rounded[4]];
const distinct=[...new Set(complexSpectrum)];
assert.deepEqual(complexSpectrum,[2,5,5]);

// The two established incidence contractions differ only on fixed leptonic
// coordinates, so they agree exactly on the color-standard sector.
const rawBySector={uc:5,d:5,u:5,dc:1,ec:3,e:0,nu:0};
const LambdaRaw=diag(sectors.map(s=>rawBySector[s]));
const compressedRaw=mm(mm(tr(B),LambdaRaw),B);
assert.ok(eq(compressedRaw,compressed));

// Because Lambda=5I-4P_dc on the color-standard sector, the simple low
// eigenspace has a basis-free projector obtained from the projected d^c
// sector.  The factor 4/3 normalizes its sole nonzero eigenvalue.
const Pdc=diag(sectors.map(s=>s==='dc'?1:0));
const Tdc=mm(mm(Qstd,Pdc),Qstd);
assert.equal(rank(Tdc),2);
assert.ok(eq(mm(Tdc,Tdc),scale(3/4,Tdc)));
const Eselected=scale(4/3,Tdc);
assert.ok(eq(mm(Eselected,Eselected),Eselected));
assert.ok(eq(mm(P,Eselected),mm(Eselected,P)));
assert.ok(eq(mm(Qstd,Eselected),Eselected));
const M36=Eselected.map(r=>r.map(x=>Math.round(36*x)));
assert.ok(eq(scale(1/36,M36),Eselected));
assert.ok(eq(mm(M36,M36),scale(36,M36)));
const Mmod3=M36.map(r=>r.map(x=>((x%3)+3)%3));
const Mmod3Squared=mm(Mmod3,Mmod3).map(r=>r.map(x=>x%3));
assert.ok(Mmod3Squared.flat().every(x=>x===0));
const mod3Rank=rankMod(Mmod3,3);
const gcd2=(a,b)=>b===0?Math.abs(a):gcd2(b,a%b);
const gcdAll=xs=>xs.reduce((g,x)=>gcd2(g,x),0);
const independentColumns=[];
for(let j=0;j<n&&independentColumns.length<2;j++){
  const col=M36.map(r=>r[j]);
  if(rank([...independentColumns,col].map((_,k)=>[...independentColumns,col][k]))>independentColumns.length) independentColumns.push(col);
}
// The preceding rank helper is row-oriented; verify and normalize the chosen
// two columns directly.
assert.equal(rank(tr(independentColumns)),2);
const primitiveColumns=independentColumns.map(v=>{const g=gcdAll(v);return v.map(x=>x/g);});
let Bint=tr(primitiveColumns);
const latticeIndex=B=>{const minors=[];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)minors.push(B[i][0]*B[j][1]-B[i][1]*B[j][0]);return gcdAll(minors);};
const initialIndex=latticeIndex(Bint);
if(initialIndex>1){
  let replacement=null;
  for(let a=0;a<initialIndex&&!replacement;a++)for(let b=0;b<initialIndex&&!replacement;b++)if(a||b){
    const numerator=Bint.map(r=>a*r[0]+b*r[1]);
    if(numerator.every(x=>x%initialIndex===0)){
      const v=numerator.map(x=>x/initialIndex);
      for(const old of [Bint.map(r=>r[0]),Bint.map(r=>r[1])]){
        const candidate=tr([v,old]);
        if(rank(candidate)===2&&latticeIndex(candidate)===1){replacement=candidate;break;}
      }
    }
  }
  assert.ok(replacement);
  Bint=replacement;
}
const saturationIndex=latticeIndex(Bint);
const action=mm(mm(inverse(mm(tr(Bint),Bint)),tr(Bint)),mm(P,Bint));
const actionRounded=action.map(r=>r.map(x=>Math.round(x)));
assert.ok(eq(action,actionRounded));
assert.equal(saturationIndex,1);
assert.deepEqual(mm(actionRounded,mm(actionRounded,actionRounded)),I(2));
const actionMod3=actionRounded.map(r=>r.map(x=>((x%3)+3)%3));
const activeNilpotentMod3=sub(actionMod3,I(2)).map(r=>r.map(x=>((x%3)+3)%3));
assert.equal(rankMod(activeNilpotentMod3,3),1);
assert.ok(mm(activeNilpotentMod3,activeNilpotentMod3).flat().every(x=>x%3===0));
const handleActiveR=[[0,-1],[1,-1]];
const integralConjugator=[[1,1],[0,-1]];
assert.ok(eq(mm(actionRounded,integralConjugator),mm(integralConjugator,handleActiveR)));
assert.equal(integralConjugator[0][0]*integralConjugator[1][1]-integralConjugator[0][1]*integralConjugator[1][0],-1);

// A generic Higgs-dressed diagonal Gram model has one weight for the up
// Dirac pair (uc,u) and one for the down pair (d,dc).
const Eselected6=mm(mm(tr(B),Eselected),B);
const yukawaSpectra=[];
for(const [yu2,yd2] of [[1,1],[4,1],[100,1]]){
  const D=diag(sectors.map(s=>['uc','u'].includes(s)?yu2:['d','dc'].includes(s)?yd2:0));
  const C=mm(mm(tr(B),D),B);
  const ev=jacobiEigenvalues(C).map(x=>Math.round(x*1e10)/1e10);
  const commutator=sub(mm(compressed,C),mm(C,compressed));
  yukawaSpectra.push({
    yu2,yd2,
    realSpectrum:ev,
    complexMultiplicitySpectrum:[ev[0],ev[2],ev[4]],
    commutatorWithIncidenceFrobenius:Math.sqrt(commutator.flat().reduce((s,x)=>s+x*x,0)),
    preservesIncidenceSelectedDoublet:maxabs(sub(mm(Eselected6,mm(C,Eselected6)),mm(C,Eselected6)))<1e-9
  });
}
assert.equal(new Set(yukawaSpectra[0].complexMultiplicitySpectrum).size,1);
assert.equal(new Set(yukawaSpectra[1].complexMultiplicitySpectrum).size,3);
assert.equal(yukawaSpectra[0].preservesIncidenceSelectedDoublet,true);
assert.equal(yukawaSpectra[1].preservesIncidenceSelectedDoublet,false);

console.log(JSON.stringify({
  protocol:'furey-incidence-on-three-code-color-doublets/1',
  sectorOrder:sectors,
  standardGaugeKernelRealDimension:6,
  multiplicityComplexDimension:3,
  incidence:{
    sectorWeights:incidenceBySector,
    commutesWithColor:true,
    preservesGaugeNeutralKernel:preservesKernel,
    leakageMaxEntry:maxabs(leakage),
    definitionUsed:'orthogonal compression Q_std Lambda Q_std with the coordinate/Hilbert-Schmidt metric',
    realSpectrum:rounded,
    complexMultiplicitySpectrum:complexSpectrum,
    distinctEigenvalues:distinct,
    simpleComplexEigenlines:1,
    selectedDoubletProjector:'E_inc=(4/3) Q_std P_dc Q_std',
    selectedDoubletProjectorRank:rank(Eselected),
    selectedDoubletProjectorIdempotent:true,
    selectedDoubletProjectorDistinctEntries:[...new Set(Eselected.flat().map(x=>Math.round(x*1e12)/1e12))].sort((a,b)=>a-b),
    integralClearingDenominator:36,
    mod3ClearedProjectorRank:mod3Rank,
    mod3ClearedProjectorSquareZero:true,
    saturatedSelectedLatticeBasis:Bint,
    initialColumnLatticeIndex:initialIndex,
    saturatedSelectedLatticeIndex:saturationIndex,
    colorActionOnSelectedIntegralLattice:actionRounded,
    colorActionMod3:actionMod3,
    colorActionMod3JordanType:'J2(1)',
    handleActiveOrderThreeBlock:handleActiveR,
    integralConjugatorToHandleActiveBlock:integralConjugator,
    integrallyConjugateToHandleActiveBlock:true,
    deduplicatedAndMultiplicityPreservingContractionsAgreeOnColorStandardSector:eq(compressedRaw,compressed)
  },
  higgsDressedDiagonalGramExamples:yukawaSpectra,
  conclusion:'The established incidence Laplacian conditionally selects exactly one C3 doublet: after metric compression its complex multiplicity spectrum is (2,5,5), with one simple low line and a degenerate high plane. But Lambda itself does not preserve the gauge-neutral kernel; the compression requires the coordinate/Hilbert-Schmidt metric, and no theorem yet identifies the selected line with the handle Kraus plane.',
  yukawaBoundary:'Equal up/down Gram weights are scalar on the multiplicity space. Unequal physical Yukawa weights split it completely, but the selection then depends on empirical couplings rather than the bare Furey/code incidence.',
  passed:true
},null,2));
