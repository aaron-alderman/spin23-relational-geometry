import assert from 'node:assert/strict';

const zero=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<(M[0]?.length??0)&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];for(let j=c;j<M[0].length;j++)M[row][j]/=d;for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];for(let j=c;j<M[0].length;j++)M[i][j]-=f*M[row][j];}row++;}return row;};
const cm=()=>({re:zero(4,4),im:zero(4,4)});
const realify=({re,im})=>Array.from({length:8},(_,i)=>Array.from({length:8},(_,j)=>{const ir=i%4,jr=j%4,ib=i>=4,jb=j>=4;if(!ib&&!jb)return re[ir][jr];if(!ib&&jb)return-im[ir][jr];if(ib&&!jb)return im[ir][jr];return re[ir][jr];}));
const compactDiag=diag=>{const G=cm();for(let i=0;i<4;i++)G.im[i][i]=diag[i];return realify(G);};
const compactPair=(a,b,imag=false)=>{const G=cm();if(imag){G.im[a][b]=1;G.im[b][a]=1;}else{G.re[a][b]=1;G.re[b][a]=-1;}return realify(G);};

// SU(3) acts on color coordinates 1,2,3. Add B-L proportional to diag(-3,1,1,1).
const su3=[compactDiag([0,1,-1,0]),compactDiag([0,0,1,-1]),compactPair(1,2),compactPair(1,2,true),compactPair(2,3),compactPair(2,3,true)];
const bl=compactDiag([-3,1,1,1]);
const residual=[...su3,bl];

const pairs=[];for(let i=0;i<8;i++)for(let j=i+1;j<8;j++)pairs.push([i,j]);
const basis=pairs.map(([i,j])=>{const A=zero(8,8);A[i][j]=1;A[j][i]=-1;return A;});
const invariantDimension=generators=>{const equations=[];for(const G of generators)for(let a=0;a<8;a++)for(let b=0;b<8;b++){const row=basis.map(A=>add(mm(tr(G),A),mm(A,G))[a][b]);if(row.some(x=>x!==0))equations.push(row);}return basis.length-rank(equations);};
const residualDimension=invariantDimension(residual);
assert.equal(residualDimension,2);

const Ks=zero(8,8),Kt=zero(8,8);Ks[0][4]=-1;Ks[4][0]=1;for(const i of [1,2,3]){Kt[i][i+4]=-1;Kt[i+4][i]=1;}
const invUnder=(G,A)=>{const D=add(mm(tr(G),A),mm(A,G));return Math.max(...D.flat().map(Math.abs))<1e-10;};
for(const A of [Ks,Kt])for(const G of residual)assert.ok(invUnder(G,A));

// A single discrete coordinate exchange between lepton and one color, together
// with SU(3) color symmetry, forces all four per-component coefficients equal.
const perm=Array.from({length:8},()=>Array(8).fill(0));
const p=[1,0,2,3];
for(let j=0;j<4;j++){perm[p[j]][j]=1;perm[p[j]+4][j+4]=1;}
const pull=(G,A)=>mm(mm(tr(G),A),G);
const combine=(a,b)=>Ks.map((r,i)=>r.map((x,j)=>a*x+b*Kt[i][j]));
for(const [a,b] of [[1,2],[2,1],[-1,1]])assert.notDeepEqual(pull(perm,combine(a,b)),combine(a,b));
assert.deepEqual(pull(perm,combine(1,1)),combine(1,1));

// The discrete exchange is incompatible with retaining B-L as a fixed
// generator: conjugation moves its distinguished -3 charge to a color slot.
const conjugatedBL=mm(mm(perm,bl),tr(perm));
assert.notDeepEqual(conjugatedBL,bl);

console.log(JSON.stringify({
  protocol:'equal-symplectic-line-protection-after-su4-breaking/1',
  breaking:'SU(4) -> SU(3) x U(1)_(B-L)',
  residualInvariantAlternatingDimension:residualDimension,
  residualPencil:'a*Ks+b*Kt',
  equalityProtectedByContinuousResidual:false,
  splittingOperator:'Ks-Kt is allowed by the residual symmetry',
  discreteRepair:{operation:'exchange lepton complex coordinate with one color coordinate, combined with SU(3) transitivity',forces:'a=b',preservesBLGenerator:false},
  radiativeBoundary:'Once only SU(3)xU(1) remains, independent renormalization of a and b is symmetry-allowed. Equality is a high-scale matching condition unless an additional discrete/response symmetry survives.',
  conclusion:'Pati-Salam SU(4) selects the equal-component line at the unification scale, but ordinary SU(3)xU(1) breaking reopens the two-dimensional pencil. A transitive discrete remnant would protect equality but conflicts with a fixed B-L/color distinction.',
  passed:true
},null,2));
