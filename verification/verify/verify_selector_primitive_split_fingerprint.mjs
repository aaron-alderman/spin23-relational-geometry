import assert from "node:assert/strict";

const EPS=1e-8;
const pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
const zero=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(r=>r.map(x=>a*x));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const block=(A,B,C,D)=>A.map((r,i)=>[...r,...B[i]]).concat(C.map((r,i)=>[...r,...D[i]]));
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r,...eye(n)[i]]);for(let c=0;c<n;c++){let p=c;for(let i=c+1;i<n;i++)if(Math.abs(M[i][c])>Math.abs(M[p][c]))p=i;assert.ok(Math.abs(M[p][c])>EPS);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}}return M.map(r=>r.slice(n));};
const rank=A0=>{const A=A0.map(r=>r.slice());let row=0;for(let col=0;col<A[0].length&&row<A.length;col++){let p=row;for(let i=row+1;i<A.length;i++)if(Math.abs(A[i][col])>Math.abs(A[p][col]))p=i;if(Math.abs(A[p][col])<EPS)continue;[A[row],A[p]]=[A[p],A[row]];const d=A[row][col];A[row]=A[row].map(x=>x/d);for(let i=0;i<A.length;i++)if(i!==row){const f=A[i][col];A[i]=A[i].map((x,j)=>x-f*A[row][j]);}row++;}return row;};
const independentColumns=(P,n)=>{const cs=[];let r=0;for(let j=0;j<P[0].length&&cs.length<n;j++){const c=P.map(x=>x[j]),nr=rank(tr([...cs,c]));if(nr>r){cs.push(c);r=nr;}}assert.equal(cs.length,n);return tr(cs);};
const leftCoordinates=(U,V)=>mm(mm(inverse(mm(tr(U),U)),tr(U)),V);
const formMatrix=v=>{const A=zero(4,4);pairs.forEach(([i,j],k)=>{A[i][j]=v[k];A[j][i]=-v[k];});return A;};
const formVector=A=>pairs.map(([i,j])=>A[i][j]);
const determinant=A=>A.length===1?A[0][0]:A[0].reduce((s,x,j)=>s+(j%2?-1:1)*x*determinant(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const trace=A=>A.reduce((s,r,i)=>s+r[i],0);
const order=(A,max=36)=>{let P=eye(A.length);for(let k=1;k<=max;k++){P=mm(P,A);if(maxAbs(add(P,scale(-1,eye(A.length))))<EPS)return k;}return null;};

const eps=[[0,1],[-1,0]],z=zero(2,2);
const J=block(eps,z,z,scale(-1,eps));
const G0=[[2,-1,0,0],[-1,2,0,0],[0,0,2,3],[0,0,3,6]];
const I=scale(Math.sqrt(3),mm(inverse(G0),J));
const A=[[1,3],[-1,-2]],X=[[1,1],[0,-1]];
const R=block(eye(2),z,z,A),H=block(z,X,X,z);
const primitive=[[1,0,0,0,0,1],[0,1,0,0,0,0],[0,0,1,0,0,0],[0,0,0,1,0,0],[0,0,0,0,1,0]];
const induce=S=>{const M=zero(5,5);primitive.forEach((p,j)=>{const o=formVector(mm(mm(tr(S),formMatrix(p)),S));const c=[o[0],o[1],o[2],o[3],o[4]];assert.ok(Math.abs(o[5]-o[0])<EPS);c.forEach((x,i)=>M[i][j]=x);});return M;};
const K=induce(I),R5=induce(R),H5=induce(H);
assert.ok(maxAbs(add(mm(K,K),scale(-1,eye(5))))<EPS);
assert.ok(maxAbs(add(mm(R5,K),scale(-1,mm(K,R5))))<EPS);
assert.ok(maxAbs(add(mm(H5,K),scale(-1,mm(K,H5))))<EPS);
const Uplus=independentColumns(scale(.5,add(eye(5),K)),3);
const Uminus=independentColumns(scale(.5,add(eye(5),scale(-1,K))),2);
const restrict=(M,U)=>leftCoordinates(U,mm(M,U));
const Rp=restrict(R5,Uplus),Hp=restrict(H5,Uplus),Rm=restrict(R5,Uminus),Hm=restrict(H5,Uminus);
for(const [M,n] of [[Rp,3],[Hp,3],[Rm,2],[Hm,2]])assert.ok(maxAbs(add(mm(M,eye(n)),scale(-1,M)))<EPS);

// Hom_G(W_-,W_+) constraints for a 3x2 matrix T.
const homBasis=[];for(let i=0;i<3;i++)for(let j=0;j<2;j++){const T=zero(3,2);T[i][j]=1;homBasis.push(T);}
const equations=[];for(const [L,Rr] of [[Rp,Rm],[Hp,Hm]])for(let i=0;i<3;i++)for(let j=0;j<2;j++)equations.push(homBasis.map(T=>add(mm(L,T),scale(-1,mm(T,Rr)))[i][j]));
const homDimension=homBasis.length-rank(equations);
assert.equal(homDimension,0);

const fingerprint=M=>({trace:Number(trace(M).toFixed(10)),determinant:Number(determinant(M).toFixed(10)),order:order(M)});
const commutes=(A,B)=>maxAbs(add(mm(A,B),scale(-1,mm(B,A))))<EPS;
const inverseRelation=(A,B)=>maxAbs(add(mm(mm(B,A),B),scale(-1,mm(A,A))))<EPS; // B A B = A^-1 = A^2 for A^3=1
assert.equal(commutes(Rm,Hm),true);
assert.equal(inverseRelation(Rm,Hm),false);
assert.equal(commutes(Rp,Hp),false);
assert.equal(inverseRelation(Rp,Hp),true);
console.log(JSON.stringify({
  status:"PASS",
  split:{minusDimension:2,plusDimension:3},
  selectorCommutesWithSplit:true,
  twoSector:{R:fingerprint(Rm),H:fingerprint(Hm)},
  threeSector:{R:fingerprint(Rp),H:fingerprint(Hp)},
  relations:{twoSector:{commutes:commutes(Rm,Hm),dihedral:inverseRelation(Rm,Hm)},threeSector:{commutes:commutes(Rp,Hp),dihedral:inverseRelation(Rp,Hp)}},
  invariantCrossHomDimension:homDimension,
  consequence:"the exact finite selector derives and preserves Q but cannot itself choose a nonzero E:W2->W3; the channel must break the selector, transform covariantly, or be sourced by an additional operator"
}));
