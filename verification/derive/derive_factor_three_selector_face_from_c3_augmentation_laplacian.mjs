import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(...As)=>As[0].map((r,i)=>r.map((_,j)=>As.reduce((s,A)=>s+A[i][j],0)));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const rank=A=>{const M=A.map(r=>r.map(Number));let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];M[row]=M[row].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};
const det2=([[a,b],[c,d]])=>a*d-b*c;
const gcd=(a,b)=>b===0?Math.abs(a):gcd(b,a%b);

// Three-cycle on the color sheets and the augmentation basis.
const P=[[0,0,1],[1,0,0],[0,1,0]];
const P2=mm(P,P);
const B=[[1,0],[-1,1],[0,-1]];
const C=[[0,-1],[1,-1]];
assert.deepEqual(mm(P,B),mm(B,C));

const N=add(eye(3),P,P2);
const Delta=add(scale(2,eye(3)),scale(-1,P),scale(-1,P2));
assert.ok(mm(N,B).flat().every(x=>x===0));
assert.deepEqual(mm(Delta,B),mm(B,scale(3,eye(2))));

// In multiplicity coordinates (u,d,uc), dc=u+d-uc.  The genuine up face
// is u+uc; the color-Laplacian down face is Delta*d-dc=3d-dc.
const Dlap=[[1,0,1],[-1,2,1]];
const v=[1,1,-1];
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
assert.ok(Dlap.every(r=>dot(r,v)===0));
assert.equal(rank(Dlap),2);

// Compare with the primitive face/seam selector in the row order
// (up face u+uc, weak seam u-d).
const Dprimitive=[[1,0,1],[1,-1,0]];
const T=[[1,0],[1,-2]];
assert.deepEqual(mm(T,Dprimitive),Dlap);
assert.equal(det2(T),-2);

const minors=A=>[
  det2(A.map(r=>[r[0],r[1]])),
  det2(A.map(r=>[r[0],r[2]])),
  det2(A.map(r=>[r[1],r[2]]))
];
const smith=A=>{
  const d1=A.flat().reduce(gcd,0);
  const d12=minors(A).reduce(gcd,0);
  return [d1,d12/d1];
};
assert.deepEqual(smith(Dprimitive),[1,1]);
assert.deepEqual(smith(Dlap),[1,2]);

// Saturating the Laplacian-face row lattice recovers the primitive seam:
// (up-laplacian)/2 = u-d.
const recoveredSeam=Dlap[0].map((x,i)=>(x-Dlap[1][i])/2);
assert.deepEqual(recoveredSeam,[1,-1,0]);

// Modulo two the two Laplacian rows coincide, exposing the residual defect.
const mod2=A=>A.map(r=>r.map(x=>((x%2)+2)%2));
assert.deepEqual(mod2(Dlap),[[1,0,1],[1,0,1]]);

console.log(JSON.stringify({
  protocol:'c3-augmentation-laplacian-factor-three-selector/1',
  colorCycle:P,
  augmentationBasis:B,
  groupRingNormOnAugmentation:mm(N,B),
  colorLaplacian:Delta,
  colorLaplacianRestriction:[[3,0],[0,3]],
  identity:'(1-g)(1-g^{-1})=2-g-g^{-1}=3 on I',
  upPlusLaplacianFaceMatrix:Dlap,
  selectedKernelGenerator:v,
  primitiveSelectorMatrix:Dprimitive,
  rowLatticeChange:T,
  rowLatticeIndex:Math.abs(det2(T)),
  primitiveSmithInvariants:smith(Dprimitive),
  laplacianSmithInvariants:smith(Dlap),
  recoveredPrimitiveSeam:'(row_up-row_laplacian)/2 = u-d',
  moduloTwoRows:mod2(Dlap),
  conclusion:'The C3 sheet Laplacian canonically supplies the coefficient three and selects the correct rational/integral kernel, but its two constraint rows have index two in the primitive selector lattice. A Z2 orientation or saturation datum is still required for a primitive exact sequence.',
  passed:true
},null,2));
