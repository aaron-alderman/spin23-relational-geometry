import assert from 'node:assert/strict';

const zero=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const eq=(A,B)=>maxabs(sub(A,B))<1e-10;
const rank=A=>{
  const M=A.map(r=>r.slice());let row=0;
  for(let c=0;c<(M[0]?.length??0)&&row<M.length;c++){
    let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;
    if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];
    const d=M[row][c];for(let j=c;j<M[0].length;j++)M[row][j]/=d;
    for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];for(let j=c;j<M[0].length;j++)M[i][j]-=f*M[row][j];}row++;
  }return row;
};
const inv=A=>{const n=A.length,M=A.map((r,i)=>[...r,...eye(n)[i]]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}}return M.map(r=>r.slice(n));};

// Reconstruct the explicit quotient of document 843.
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const P=[[1,0,0,0],[0,0,0,1],[0,1,0,0],[0,0,1,0]];
const e0=[1,0,0,0],e1=[0,1,0,0],e2=[0,0,1,0];
const rv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
const v=e1.map((x,i)=>x+e2[i]/3),Rv=rv(R,v),R2v=rv(R,Rv);
const X=Array.from({length:4},(_,i)=>[e0[i],v[i],Rv[i],R2v[i]]),Xi=inv(X);
assert.ok(eq(mm(R,X),mm(X,P)));
const q=zero(4,8);q[0][3]=1;q[1][0]=1;q[2][1]=1;q[3][2]=1;
const j=Array.from({length:8},(_,i)=>Array.from({length:4},(_,a)=>q[a][i]));
const Pi=mm(X,q),J=mm(j,Xi);

// Established neutral endpoint exchange D <-> E; in this endpoint ordering
// those are indices 6 and 7. It is invisible to the displayed quotient.
const S=eye(8);S[6][6]=S[7][7]=0;S[6][7]=S[7][6]=1;
assert.ok(eq(mm(Pi,S),Pi));
assert.ok(eq(mm(S,J),J));
assert.ok(eq(mm(mm(Pi,S),J),eye(4)));

// Full-color typing: Hom_SU3(1,3)=0 and Hom_SU3(3,1)=0.  Solve the
// infinitesimal invariant-vector/covector equations for fundamental 3.
const H1=[[1,0,0],[0,-1,0],[0,0,0]],H2=[[0,0,0],[0,1,0],[0,0,-1]];
const E=(a,b)=>{const M=zero(3,3);M[a][b]=1;return M;};
const roots=[E(0,1),E(1,0),E(1,2),E(2,1)];
const gens=[H1,H2,...roots];
const vectorConstraints=gens.flatMap(G=>G);
const covectorConstraints=gens.flatMap(G=>Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>G[j][i])));
const invariantVectorDimension=3-rank(vectorConstraints);
const invariantCovectorDimension=3-rank(covectorConstraints);
assert.equal(invariantVectorDimension,0);
assert.equal(invariantCovectorDimension,0);

console.log(JSON.stringify({
  protocol:'neutral-furey-exchange-versus-full-color-symplectic-pencil-lock/1',
  explicitQuotient:{PiAfterExchangeEqualsPi:true,exchangeFixesSection:true,inducedCarrierAction:'identity'},
  fullColorTyping:{homSingletToTripletDimension:invariantVectorDimension,homTripletToSingletDimension:invariantCovectorDimension},
  theorem:'Any SU(3)-equivariant linear exchange is block diagonal between the inequivalent singlet and triplet isotypic sectors. It cannot identify their two invariant symplectic coefficients.',
  conclusion:'The established neutral exchange can organize topology faces within each gauge sector, but it cannot lock the singlet and triplet coefficients of a*Ks+b*Kt. In the explicit quotient it is completely invisible.',
  nextGate:'A sector lock must be nonlinear/composite, use a gauge-charged spurion whose total response is a singlet, or arise from a common dynamical normalization such as stress-energy or Schur elimination.',
  passed:true
},null,2));
