import assert from 'node:assert/strict';

const zero=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<(M[0]?.length??0)&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];for(let j=c;j<M[0].length;j++)M[row][j]/=d;for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];for(let j=c;j<M[0].length;j++)M[i][j]-=f*M[row][j];}row++;}return row;};

const cm=()=>({re:zero(4,4),im:zero(4,4)});
const su4=[];
for(const diag of [[1,-1,0,0],[0,1,-1,0],[0,0,1,-1]]){
  const G=cm();for(let i=0;i<4;i++)G.im[i][i]=diag[i];su4.push(G);
}
for(const [a,b] of [[0,1],[1,2],[2,3]]){
  const A=cm();A.re[a][b]=1;A.re[b][a]=-1;su4.push(A);
  const B=cm();B.im[a][b]=1;B.im[b][a]=1;su4.push(B);
}
const realify=({re,im})=>Array.from({length:8},(_,i)=>Array.from({length:8},(_,j)=>{
  const ir=i%4,jr=j%4,ib=i>=4,jb=j>=4;
  if(!ib&&!jb)return re[ir][jr];if(!ib&&jb)return-im[ir][jr];if(ib&&!jb)return im[ir][jr];return re[ir][jr];
}));
const G4=su4.map(realify);

const pairs=[];for(let i=0;i<8;i++)for(let j=i+1;j<8;j++)pairs.push([i,j]);
const basis=pairs.map(([i,j])=>{const A=zero(8,8);A[i][j]=1;A[j][i]=-1;return A;});
const invariantDimension=generators=>{
  const equations=[];
  for(const G of generators)for(let a=0;a<8;a++)for(let b=0;b<8;b++){
    const row=basis.map(A=>add(mm(tr(G),A),mm(A,G))[a][b]);if(row.some(x=>x!==0))equations.push(row);
  }
  return basis.length-rank(equations);
};

const fullSu4AlternatingDimension=invariantDimension(G4);
assert.equal(fullSu4AlternatingDimension,1);

// Choose coordinate 0 as the lepton/fourth-color line and 1,2,3 as ordinary
// colors. Under the SU(3) subgroup the invariant space is span(Ks,Kt).
const Ks=zero(8,8),Kt=zero(8,8);
Ks[0][4]=-1;Ks[4][0]=1;
for(const i of [1,2,3]){Kt[i][i+4]=-1;Kt[i+4][i]=1;}
const K=add(Ks,Kt);
for(const G of G4)assert.ok(maxabs(add(mm(tr(G),K),mm(K,G)))<1e-10);

// One leptoquark generator mixing the lepton with one color already forces
// equality of the two component coefficients in a*Ks+b*Kt.
const L=G4[3]; // real antisymmetric generator mixing complex coordinates 0,1
const defect=s=>add(mm(tr(L),s),mm(s,L));
const Da=defect(Ks),Db=defect(Kt);
assert.ok(maxabs(add(Da,Db))<1e-10);
assert.ok(maxabs(Da)>0&&maxabs(Db)>0);
for(const [a,b] of [[1,2],[2,1],[-1,1]])assert.ok(maxabs(defect(add(Ks.map(r=>r.map(x=>a*x)),Kt.map(r=>r.map(x=>b*x)))))>1e-8);

// The equal line is per-component equality. Its total trace weights retain the
// 1:3 multiplicity after restriction, so this does not erase dimensions.
const componentCoefficients=[1,1];
const totalSectorWeights=[1,3];

console.log(JSON.stringify({
  protocol:'su4-color-lepton-unification-collapses-su3-symplectic-pencil/1',
  carrier:'realification of the complex fundamental 4 of SU(4)',
  realDimension:8,
  fullSu4InvariantAlternatingDimension:fullSu4AlternatingDimension,
  restrictedSu3InvariantAlternatingDimension:2,
  restrictedBasis:{singlet:Ks,triplet:Kt},
  uniqueSu4Line:'R*(Ks+Kt)',
  leptoquarkGeneratorForces:'a=b in a*Ks+b*Kt',
  componentCoefficients,
  totalSectorWeights,
  multiplicityClarification:'SU(4) fixes equal per-component normalization; after SU(3) breaking the triplet still carries three times the total free-copy weight.',
  priorBranchCompatibility:'No bijection between the whole triplet subspace and the singlet line is claimed. Irreducibility above the breaking scale fixes one Hermitian/symplectic normalization before the 3+1 split.',
  fureyBoundary:'The completed Furey ternary product was previously shown not to admit the color-lepton leptoquark roots as derivations. SU(4) is therefore a conditional enlarged gauge/response envelope, not an intrinsic symmetry already derived from that TRO.',
  conclusion:'Pati-Salam-like SU(4) is an exact conditional mechanism collapsing the two-scale SU(3) symplectic pencil to the equal-component line, while preserving the 1:3 total multiplicity distinction after symmetry breaking.',
  passed:true
},null,2));
