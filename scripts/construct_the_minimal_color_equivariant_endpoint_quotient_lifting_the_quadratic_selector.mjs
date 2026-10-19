import assert from 'node:assert/strict';

const zero=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const eq=(A,B,e=1e-10)=>maxabs(sub(A,B))<e;
const rank=A=>{
  const M=A.map(r=>r.slice());let row=0;
  for(let c=0;c<(M[0]?.length??0)&&row<M.length;c++){
    let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;
    if(p===M.length)continue;
    [M[row],M[p]]=[M[p],M[row]];
    const d=M[row][c];for(let j=c;j<M[0].length;j++)M[row][j]/=d;
    for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];for(let j=c;j<M[0].length;j++)M[i][j]-=f*M[row][j];}
    row++;
  }
  return row;
};
const inv=A=>{
  const n=A.length,M=A.map((r,i)=>[...r,...eye(n)[i]]);
  for(let c=0;c<n;c++){
    let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<n);
    [M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);
    for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}
  }
  return M.map(r=>r.slice(n));
};
const pow=(A,n)=>{let X=eye(A.length);for(let i=0;i<n;i++)X=mm(X,A);return X;};

// Completed endpoint color representation: a three-color orbit and five
// individually color-fixed endpoints.
const C=zero(8,8);
C[1][0]=1;C[2][1]=1;C[0][2]=1;
for(let i=3;i<8;i++)C[i][i]=1;
const C2=pow(C,2),I8=eye(8),I4=eye(4);
assert.ok(eq(pow(C,3),I8));

// Exact four-dimensional response carrier and its handle orbit.
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const R2=pow(R,2);
const handles=[H,mm(mm(R,H),R2),mm(mm(R2,H),R)];
assert.ok(eq(handles.reduce(add,zero(4,4)),zero(4,4)));

// Natural quartet P: one fixed direction plus the three-color orbit.
const P=[[1,0,0,0],[0,0,0,1],[0,1,0,0],[0,0,1,0]];
const e0=[1,0,0,0],e1=[0,1,0,0],e2=[0,0,1,0];
const rv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
const av=(a,b)=>a.map((x,i)=>x+b[i]),sv=(s,a)=>a.map(x=>s*x);
const v=av(e1,sv(1/3,e2)),Rv=rv(R,v),R2v=rv(R,Rv);
const X=I4.map((_,i)=>[e0[i],v[i],Rv[i],R2v[i]]);
const Xi=inv(X);
assert.ok(eq(mm(R,X),mm(X,P)));

// q selects O2_1,O2_2,O2_3 plus one chosen color-fixed endpoint H4.
// j is its equivariant section. Pi and J transport this split quotient into
// the established R carrier.
const q=zero(4,8);
q[0][3]=1;q[1][0]=1;q[2][1]=1;q[3][2]=1;
const j=tr(q);
assert.ok(eq(mm(q,C),mm(P,q)));
assert.ok(eq(mm(C,j),mm(j,P)));
assert.ok(eq(mm(q,j),I4));
const Pi=mm(X,q),J=mm(j,Xi),E=mm(J,Pi);
assert.ok(eq(mm(Pi,C),mm(R,Pi)));
assert.ok(eq(mm(C,J),mm(J,R)));
assert.ok(eq(mm(Pi,J),I4));
assert.ok(eq(mm(E,E),E)&&eq(mm(E,C),mm(C,E)));
assert.equal(rank(Pi),4);assert.equal(rank(E),4);

// Lift the response handles to partial endpoint operators.  They close as
// involutions only on im(J), and vanish on ker(Pi).
const lifted=handles.map(K=>mm(mm(J,K),Pi));
assert.ok(eq(lifted.reduce(add,zero(8,8)),zero(8,8)));
assert.ok(eq(mm(mm(C,lifted[0]),C2),lifted[1]));
assert.ok(eq(mm(mm(C,lifted[1]),C2),lifted[2]));
assert.ok(eq(mm(mm(C,lifted[2]),C2),lifted[0]));
assert.ok(lifted.every(S=>eq(mm(S,S),E)));
assert.ok(lifted.every((S,i)=>eq(mm(Pi,S),mm(handles[i],Pi))));

// The full quadratic congruence channel descends exactly on every matrix
// unit A: S_i^T Pi^T A Pi S_i = Pi^T H_i^T A H_i Pi.
const basis4=[];
for(let a=0;a<4;a++)for(let b=0;b<4;b++){
  const A=zero(4,4);A[a][b]=1;basis4.push(A);
}
for(const A of basis4)for(let i=0;i<3;i++){
  const sourceA=mm(mm(tr(Pi),A),Pi);
  const lhs=mm(mm(tr(lifted[i]),sourceA),lifted[i]);
  const rhs=mm(mm(tr(Pi),mm(mm(tr(handles[i]),A),handles[i])),Pi);
  assert.ok(eq(lhs,rhs));
}

// Fixed subspace: color sum plus the five fixed endpoints.  The quotient
// retains rank two of these six directions and kills four.
const fixed=zero(8,6);
fixed[0][0]=fixed[1][0]=fixed[2][0]=1;
for(let k=0;k<5;k++)fixed[3+k][1+k]=1;
const fixedImageRank=rank(mm(Pi,fixed));
assert.equal(fixedImageRank,2);

// Compute dim Hom_C(R^8,R^4) from the linear equations Pi C = R Pi.
const intertwinerConstraints=[];
for(let a=0;a<4;a++)for(let b=0;b<8;b++){
  const row=Array(32).fill(0);
  for(let k=0;k<8;k++)row[a*8+k]+=C[k][b];
  for(let k=0;k<4;k++)row[k*8+b]-=R[a][k];
  intertwinerConstraints.push(row);
}
const intertwinerDimension=32-rank(intertwinerConstraints);
assert.equal(intertwinerDimension,14);

// Equivariant deformations DeltaJ of a section must obey C DeltaJ=DeltaJ R
// and Pi DeltaJ=0. Their dimension measures the section nonuniqueness.
const sectionConstraints=[];
for(let a=0;a<8;a++)for(let b=0;b<4;b++){
  const row=Array(32).fill(0);
  for(let k=0;k<8;k++)row[k*4+b]+=C[a][k];
  for(let k=0;k<4;k++)row[a*4+k]-=R[k][b];
  sectionConstraints.push(row);
}
for(let a=0;a<4;a++)for(let b=0;b<4;b++){
  const row=Array(32).fill(0);
  for(let k=0;k<8;k++)row[k*4+b]+=Pi[a][k];
  sectionConstraints.push(row);
}
const equivariantSectionFreedom=32-rank(sectionConstraints);
assert.equal(equivariantSectionFreedom,8);

console.log(JSON.stringify({
  protocol:'minimal-color-equivariant-endpoint-quotient-lifting-quadratic-selector/1',
  sourceRepresentation:{dimension:8,fixedDimension:6,nontrivialRealC3Dimension:2},
  targetRepresentation:{dimension:4,fixedDimension:2,nontrivialRealC3Dimension:2},
  intertwinerSpaceDimension:intertwinerDimension,
  explicitSplitQuotient:{Pi,rightInverse:J,projector:E,rank:rank(Pi),fixedSourceRankRetained:fixedImageRank,fixedSourceDimensionKilled:6-fixedImageRank},
  liftedRelationships:{rank:lifted.map(rank),square:'S_i^2=E, the rank-four equivariant projector',linearColorSumZero:true,colorOrbit:true},
  quadraticDescent:'For every 4x4 A and every i, S_i^T Pi^T A Pi S_i = Pi^T H_i^T A H_i Pi.',
  equivariantSectionFreedom,
  positiveResult:'A color-equivariant split quotient can retain two singlet directions and reproduce the exact quadratic selector, so quotient-level cancellation does not inherently erase all singlets.',
  obstruction:'Color covariance alone leaves a 14-dimensional intertwiner space and an 8-dimensional family of equivariant sections for the displayed quotient. The chosen fixed endpoint and the map to physical Standard-Model sources are not selected.',
  nextGate:'Impose the full completed-TRO and Standard-Model gauge typing on Pi and J. The branch succeeds only if those constraints select a nonzero quotient without inserting the target handles or symplectic form by hand.',
  passed:true
},null,2));
