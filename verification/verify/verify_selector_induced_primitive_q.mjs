import assert from "node:assert/strict";

const EPS = 1e-9;
const pairs = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
const zero = (m,n) => Array.from({length:m},()=>Array(n).fill(0));
const eye = n => Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const tr = A => A[0].map((_,j)=>A.map(r=>r[j]));
const mm = (A,B) => A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add = (A,B) => A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale = (a,A) => A.map(r=>r.map(x=>a*x));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));
const rank = A0 => {
  const A=A0.map(r=>r.slice()); let row=0;
  for(let col=0;col<A[0].length&&row<A.length;col++){
    let p=row; for(let i=row+1;i<A.length;i++) if(Math.abs(A[i][col])>Math.abs(A[p][col])) p=i;
    if(Math.abs(A[p][col])<EPS) continue;
    [A[row],A[p]]=[A[p],A[row]]; const d=A[row][col]; A[row]=A[row].map(x=>x/d);
    for(let i=0;i<A.length;i++) if(i!==row){const f=A[i][col];A[i]=A[i].map((x,j)=>x-f*A[row][j]);}
    row++;
  }
  return row;
};
const inverse = A => {
  const n=A.length, M=A.map((r,i)=>[...r,...eye(n)[i]]);
  for(let c=0;c<n;c++){
    let p=c; for(let i=c+1;i<n;i++) if(Math.abs(M[i][c])>Math.abs(M[p][c])) p=i;
    assert.ok(Math.abs(M[p][c])>EPS); [M[c],M[p]]=[M[p],M[c]];
    const d=M[c][c]; M[c]=M[c].map(x=>x/d);
    for(let i=0;i<n;i++) if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}
  }
  return M.map(r=>r.slice(n));
};
const independentColumns = (P,wanted) => {
  const cols=[]; let old=0;
  for(let j=0;j<P[0].length&&cols.length<wanted;j++){
    const c=P.map(r=>r[j]); const test=[...cols,c];
    const now=rank(tr(test)); if(now>old){cols.push(c);old=now;}
  }
  assert.equal(cols.length,wanted); return tr(cols);
};
const jacobiEigenvalues = A0 => {
  const A=A0.map(r=>r.slice()), n=A.length;
  for(let it=0;it<100*n*n;it++){
    let p=0,q=1,best=0;
    for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(Math.abs(A[i][j])>best){best=Math.abs(A[i][j]);p=i;q=j;}
    if(best<1e-11) break;
    const phi=.5*Math.atan2(2*A[p][q],A[q][q]-A[p][p]), c=Math.cos(phi), s=Math.sin(phi);
    const app=A[p][p], aqq=A[q][q], apq=A[p][q];
    for(let k=0;k<n;k++)if(k!==p&&k!==q){const akp=A[k][p],akq=A[k][q];A[k][p]=A[p][k]=c*akp-s*akq;A[k][q]=A[q][k]=s*akp+c*akq;}
    A[p][p]=c*c*app-2*s*c*apq+s*s*aqq; A[q][q]=s*s*app+2*s*c*apq+c*c*aqq; A[p][q]=A[q][p]=0;
  }
  return A.map((r,i)=>r[i]);
};
const signature = A => {const e=jacobiEigenvalues(A);return {positive:e.filter(x=>x>EPS).length,negative:e.filter(x=>x<-EPS).length,zero:e.filter(x=>Math.abs(x)<=EPS).length,eigenvalues:e};};
const formMatrix = v => {const A=zero(4,4);pairs.forEach(([i,j],k)=>{A[i][j]=v[k];A[j][i]=-v[k];});return A;};
const formVector = A => pairs.map(([i,j])=>A[i][j]);
const wedge = (a,b) => a[0]*b[5]+a[5]*b[0]-a[1]*b[4]-a[4]*b[1]+a[2]*b[3]+a[3]*b[2];

// Corpus-native selector data from claims 895 and 913.
const G0=[[2,-1,0,0],[-1,2,0,0],[0,0,2,3],[0,0,3,6]];
const J=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]];
const C=scale(Math.sqrt(3),mm(inverse(G0),J));
assert.ok(maxAbs(add(mm(C,C),eye(4)))<EPS);
assert.ok(maxAbs(add(mm(mm(tr(C),J),C),scale(-1,J)))<EPS);
assert.ok(maxAbs(add(mm(mm(tr(C),G0),C),scale(-1,G0)))<EPS);

// J as a two-form has negative wedge norm in this orientation.
const omega=[1,0,0,0,0,-1];
assert.equal(wedge(omega,omega),-2);
const primitive=[
  [1,0,0,0,0,1],
  [0,1,0,0,0,0],
  [0,0,1,0,0,0],
  [0,0,0,1,0,0],
  [0,0,0,0,1,0],
];
for(const p of primitive) assert.ok(Math.abs(wedge(p,omega))<EPS);
const B=primitive.map(a=>primitive.map(b=>wedge(a,b)));
assert.deepEqual({...signature(B),eigenvalues:undefined},{positive:3,negative:2,zero:0,eigenvalues:undefined});

// Pullback by the compatible complex structure is an involution on primitive forms.
const induced=zero(5,5);
primitive.forEach((p,j)=>{
  const out=formVector(mm(mm(tr(C),formMatrix(p)),C));
  assert.ok(Math.abs(wedge(out,omega))<EPS);
  const coordinates=[out[0],out[1],out[2],out[3],out[4]];
  assert.ok(Math.abs(out[5]-out[0])<EPS);
  coordinates.forEach((x,i)=>{induced[i][j]=x;});
});
assert.ok(maxAbs(add(mm(induced,induced),scale(-1,eye(5))))<EPS);
assert.ok(maxAbs(add(mm(mm(tr(induced),B),induced),scale(-1,B)))<EPS);
const Pplus=scale(.5,add(eye(5),induced));
const Pminus=scale(.5,add(eye(5),scale(-1,induced)));
assert.equal(rank(Pplus),3);
assert.equal(rank(Pminus),2);
const Uplus=independentColumns(Pplus,3), Uminus=independentColumns(Pminus,2);
const Bplus=mm(mm(tr(Uplus),B),Uplus), Bminus=mm(mm(tr(Uminus),B),Uminus);
const sigPlus=signature(Bplus), sigMinus=signature(Bminus);
assert.deepEqual([sigPlus.positive,sigPlus.negative],[3,0]);
assert.deepEqual([sigMinus.positive,sigMinus.negative],[0,2]);

// Therefore -B is exactly negative on the two-dimensional anti-invariant
// sector and positive on the three-dimensional invariant sector.
const Q=scale(-1,B);
assert.deepEqual([signature(Q).positive,signature(Q).negative],[2,3]);

console.log(JSON.stringify({
  status:"PASS",
  antecedent:"selector (J,G0) package of claims 895/913",
  compatibleComplexStructureSquare:"-I4",
  primitiveDimension:5,
  complexPullbackEigenspaces:{plus:3,minus:2},
  wedgeRestriction:{plusSignature:[3,0],minusSignature:[0,2]},
  derivedQ:"Q=-wedge pairing, ordered as (C- sector,C+ sector)",
  derivedQSignature:[2,3],
  coordinateNormalForm:"diag(-I2,+I3) up to positive scale and adapted orthonormal basis",
  qualification:"physical force requires exact selector symmetry and a typed transport from the selector module to the rectangular channel"
}));
