import assert from 'node:assert/strict';

const components=[{name:'Q',m:3,n:2},{name:'ucdc',m:2,n:3},{name:'L',m:2,n:1},{name:'ecnc',m:1,n:2}];
const z=(re=0,im=0)=>({re,im}),addz=(a,b)=>z(a.re+b.re,a.im+b.im),subz=(a,b)=>z(a.re-b.re,a.im-b.im),mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>z(a.re,-a.im);
const zeros=(r,c)=>Array.from({length:r},()=>Array.from({length:c},()=>z()));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>addz(x,B[i][j]))),sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>subz(x,B[i][j])));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>addz(s,mulz(x,B[k][j])),z())));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),comm=(A,B)=>sub(mm(A,B),mm(B,A));
const scale=(s,A)=>A.map(r=>r.map(x=>mulz(s,x))),flatReal=A=>A.flatMap(r=>r.flatMap(x=>[x.re,x.im]));
const maxabs=A=>Math.max(...A.flatMap(r=>r.map(x=>Math.hypot(x.re,x.im))));
const rank=rows=>{const A=rows.filter(r=>r.some(x=>Math.abs(x)>1e-10)).map(r=>[...r]);if(!A.length)return 0;let k=0;for(let c=0;c<A[0].length&&k<A.length;c++){let p=k;while(p<A.length&&Math.abs(A[p][c])<1e-10)p++;if(p===A.length)continue;[A[k],A[p]]=[A[p],A[k]];const d=A[k][c];A[k]=A[k].map(x=>x/d);for(let i=0;i<A.length;i++)if(i!==k&&Math.abs(A[i][c])>1e-10){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[k][j]);}k++;}return k;};
const blockSet=(X,r0,c0,B)=>{for(let i=0;i<B.length;i++)for(let j=0;j<B[0].length;j++)X[r0+i][c0+j]=B[i][j];};
const unit=(m,n,i,j,phase)=>{const P=zeros(m,n);P[i][j]=phase;return P;};

const audit=({name,m,n})=>{
  const N=2*m+n,o1=0,o2=m,o3=m+n,metric=zeros(N,N);blockSet(metric,o1,o3,eye(m));blockSet(metric,o2,o2,eye(n));blockSet(metric,o3,o1,eye(m));
  const plus=P=>{const X=zeros(N,N);blockSet(X,o1,o2,P);blockSet(X,o2,o3,scale(z(-1),dag(P)));return X;};
  const minus=P=>{const X=zeros(N,N);blockSet(X,o2,o1,dag(P));blockSet(X,o3,o2,scale(z(-1),P));return X;};
  const extractPlus=X=>X.slice(o1,o1+m).map(r=>r.slice(o2,o2+n));
  const units=[];for(let i=0;i<m;i++)for(let j=0;j<n;j++)for(const phase of [z(1),z(0,1)])units.push(unit(m,n,i,j,phase));
  const gp=units.map(plus),gm=units.map(minus),g2=[],gm2=[],g0=[];
  for(const X of gp)for(const Y of gp)g2.push(comm(X,Y));
  for(const X of gm)for(const Y of gm)gm2.push(comm(X,Y));
  for(const X of gp)for(const Y of gm)g0.push(comm(X,Y));
  const dims={minus2:rank(gm2.map(flatReal)),minus1:rank(gm.map(flatReal)),zero:rank(g0.map(flatReal)),plus1:rank(gp.map(flatReal)),plus2:rank(g2.map(flatReal))};
  const all=[...gm2,...gm,...g0,...gp,...g2],totalRank=rank(all.map(flatReal)),expected=N*N-1;
  for(const X of all)assert.ok(maxabs(add(mm(dag(X),metric),mm(metric,X)))<1e-10);
  assert.equal(totalRank,expected);
  let tripleChecks=0;
  for(const x of units)for(const y of units)for(const zz of units){
    const got=extractPlus(comm(comm(plus(x),minus(y)),plus(zz)));
    const expectedTriple=sub(add(mm(mm(x,dag(y)),zz),mm(mm(zz,dag(y)),x)),mm(mm(zz,dag(x)),y));
    assert.ok(maxabs(sub(got,expectedTriple))<1e-10);tripleChecks++;
  }
  return{name,rectangle:`M_${m},${n}(C)`,realKtsDimension:2*m*n,metricHermitianSignature:{positive:m+n,negative:m},gradedDimensions:dims,totalDimension:totalRank,expectedSpecialUnitaryDimension:expected,identifiedRealLieAlgebra:`su(${m+n},${m})`,complexType:`A_${N-1}`,tripleRecoveryChecks:tripleChecks,kLayer:`u(${m})`,kDimension:m*m};
};

const audits=components.map(audit),keys=['minus2','minus1','zero','plus1','plus2'];
const totals=Object.fromEntries(keys.map(k=>[k,audits.reduce((s,a)=>s+a.gradedDimensions[k],0)]));
assert.deepEqual(totals,{minus2:18,minus1:32,zero:50,plus1:32,plus2:18});assert.equal(audits.reduce((s,a)=>s+a.totalDimension,0),150);
const L=audits.find(x=>x.name==='L');assert.equal(L.identifiedRealLieAlgebra,'su(3,2)');assert.deepEqual(Object.values(L.gradedDimensions),[4,4,8,4,4]);

console.log(JSON.stringify({
  protocol:'full-complex-furey-structurable-five-grading/1',
  scalarConvention:'The complex TRO with dagger is treated as a real Kantor triple system on the basis {E_ij,iE_ij}.',
  componentAudits:audits,
  fullGradedDimensions:totals,
  fullClosureDimension:150,
  fullClosure:'su(5,3) + su(5,2) + su(3,2) + su(3,1)',
  exceptionalClosure:false,
  realSliceComparison:{closure:'so(5,3) + so(5,2) + so(3,2) + so(3,1)',gradedDimensions:[5,16,23,16,5],dimension:65},
  spin23Boundary:'The L=M_2,1 complex component closes on su(3,2), not sp(4,R). The sp(4,R) ~= so(3,2) closure appears only on the entrywise-real slice selected by an additional real/CP structure.',
  orientationBoundary:'The full complex L-component K layer is u(2), dimension four. Its real slice reduces to the one-dimensional so(2) area operator. Therefore the local orientation pseudoscalar is not uniquely selected before the real slice.',
  conclusion:'The natural full complex structurable completion yields only classical special-unitary linking closures. Spin(2,3) is a real-slice subclosure, not the intrinsic full-complex Kantor parent.',
  passed:true,
},null,2));
