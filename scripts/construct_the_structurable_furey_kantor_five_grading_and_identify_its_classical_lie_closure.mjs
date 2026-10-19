import assert from 'node:assert/strict';

const components=[
  {name:'Q',m:3,n:2},
  {name:'ucdc',m:2,n:3},
  {name:'L',m:2,n:1},
  {name:'ecnc',m:1,n:2},
];
const zeros=(r,c)=>Array.from({length:r},()=>Array(c).fill(0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j])),sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j])),comm=(A,B)=>sub(mm(A,B),mm(B,A));
const flat=A=>A.flat(),maxabs=A=>Math.max(...A.flat().map(Math.abs));
const rank=rows=>{const A=rows.filter(r=>r.some(x=>Math.abs(x)>1e-10)).map(r=>[...r]);if(!A.length)return 0;let k=0;for(let c=0;c<A[0].length&&k<A.length;c++){let p=k;while(p<A.length&&Math.abs(A[p][c])<1e-10)p++;if(p===A.length)continue;[A[k],A[p]]=[A[p],A[k]];const d=A[k][c];A[k]=A[k].map(x=>x/d);for(let i=0;i<A.length;i++)if(i!==k&&Math.abs(A[i][c])>1e-10){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[k][j]);}k++;}return k;};
const unit=(m,n,i,j)=>{const X=zeros(m,n);X[i][j]=1;return X;};
const blockSet=(X,r0,c0,B)=>{for(let i=0;i<B.length;i++)for(let j=0;j<B[0].length;j++)X[r0+i][c0+j]=B[i][j];};
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));

const audit=({name,m,n})=>{
  const N=2*m+n,o1=0,o2=m,o3=m+n;
  const metric=zeros(N,N);blockSet(metric,o1,o3,eye(m));blockSet(metric,o2,o2,eye(n));blockSet(metric,o3,o1,eye(m));
  const plus=P=>{const X=zeros(N,N);blockSet(X,o1,o2,P);blockSet(X,o2,o3,scale(-1,tr(P)));return X;};
  const minus=P=>{const X=zeros(N,N);blockSet(X,o2,o1,tr(P));blockSet(X,o3,o2,scale(-1,P));return X;};
  const extractPlus=X=>X.slice(o1,o1+m).map(r=>r.slice(o2,o2+n));
  const units=[];for(let i=0;i<m;i++)for(let j=0;j<n;j++)units.push(unit(m,n,i,j));
  const gp=units.map(plus),gm=units.map(minus);
  const g2=[];for(const X of gp)for(const Y of gp)g2.push(comm(X,Y));
  const gm2=[];for(const X of gm)for(const Y of gm)gm2.push(comm(X,Y));
  const g0=[];for(const X of gp)for(const Y of gm)g0.push(comm(X,Y));
  const dims={minus2:rank(gm2.map(flat)),minus1:rank(gm.map(flat)),zero:rank(g0.map(flat)),plus1:rank(gp.map(flat)),plus2:rank(g2.map(flat))};
  const all=[...gm2,...gm,...g0,...gp,...g2],totalRank=rank(all.map(flat)),expectedTotal=N*(N-1)/2;
  for(const X of all)assert.ok(maxabs(add(mm(tr(X),metric),mm(metric,X)))<1e-10);
  assert.equal(totalRank,expectedTotal);

  // Recover the structurable KTS product from the graded Lie bracket.
  let tripleChecks=0,tripleSign=null;
  for(const x of units)for(const y of units)for(const z of units){
    const bracket=extractPlus(comm(comm(plus(x),minus(y)),plus(z)));
    const expected=sub(add(mm(mm(x,tr(y)),z),mm(mm(z,tr(y)),x)),mm(mm(z,tr(x)),y));
    const plusError=maxabs(sub(bracket,expected)),minusError=maxabs(add(bracket,expected));
    const sign=plusError<1e-10?1:minusError<1e-10?-1:null;assert.notEqual(sign,null);
    if(tripleSign===null&&maxabs(expected)>0)tripleSign=sign;
    if(maxabs(expected)>0)assert.equal(sign,tripleSign);tripleChecks++;
  }

  const signature={positive:m+n,negative:m};
  return{
    name,rectangle:`M_${m},${n}`,matrixRealizationDimension:N,metricSignature:signature,
    gradedDimensions:dims,totalDimension:totalRank,expectedOrthogonalDimension:expectedTotal,
    identifiedRealLieAlgebra:`so(${m+n},${m})`,complexType:N%2===0?`D_${N/2}`:`B_${(N-1)/2}`,
    tripleRecovery:{checks:tripleChecks,overallSign:tripleSign},
    kLayerInterpretation:`Lambda^2(R^${m})`,kDimension:m*(m-1)/2,
  };
};

const audits=components.map(audit);
const totalGrades=['minus2','minus1','zero','plus1','plus2'].map(k=>audits.reduce((s,a)=>s+a.gradedDimensions[k],0));
assert.deepEqual(totalGrades,[5,16,23,16,5]);assert.equal(audits.reduce((s,a)=>s+a.totalDimension,0),65);
const lepton=audits.find(x=>x.name==='L');assert.equal(lepton.identifiedRealLieAlgebra,'so(3,2)');assert.deepEqual(Object.values(lepton.gradedDimensions),[1,2,4,2,1]);

// On L=M_2,1, K(x,y) is the oriented area form times the standard 2D skew map.
const e0=[[1],[0]],e1=[[0],[1]],k01=sub(mm(e0,tr(e1)),mm(e1,tr(e0))),k10=sub(mm(e1,tr(e0)),mm(e0,tr(e1)));
assert.ok(maxabs(add(k01,k10))<1e-12);assert.equal(rank([flat(k01)]),1);

console.log(JSON.stringify({
  protocol:'structurable-furey-kantor-five-grading/1',
  product:'V(x,y,z)=x y^T z+z y^T x-z x^T y on each real rectangular component',
  componentAudits:audits,
  fullGradedDimensions:{minus2:totalGrades[0],minus1:totalGrades[1],zero:totalGrades[2],plus1:totalGrades[3],plus2:totalGrades[4]},
  fullClosureDimension:65,
  fullClosure:'so(5,3) + so(5,2) + so(3,2) + so(3,1)',
  exceptionalClosure:false,
  leptonComponent:{rectangle:'M_2,1',fiveGrades:[1,2,4,2,1],closure:'so(3,2) isomorphic to sp(4,R)',warning:'This is a contact five-grading on a two-dimensional KTS, not yet the three-graded TKK construction of H2(R).'},
  localOrientationDefect:{operator:k01,outerSwapOperator:k10,oddUnderOuterSwap:true,interpretation:'oriented real area form on the two-row lepton face'},
  globalOrientationBoundary:'No certified intertwiner yet identifies this local row-orientation pseudoscalar with the global Walsh/Furey-to-projector orientation bit.',
  conclusion:'The valid structurable completion closes on a direct sum of classical split orthogonal algebras. It is not exceptional. One lepton component independently closes on so(3,2) ~= sp(4,R), while its one-dimensional K layer is a local orientation pseudoscalar whose relation to the established global phase remains unproved.',
  passed:true,
},null,2));
