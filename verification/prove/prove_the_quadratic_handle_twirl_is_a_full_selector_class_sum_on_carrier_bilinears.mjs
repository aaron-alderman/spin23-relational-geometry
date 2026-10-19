import assert from 'node:assert/strict';

const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const J=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const zero=()=>I.map(r=>r.map(()=>0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const eq=(A,B,e=1e-10)=>Math.max(...sub(A,B).flat().map(Math.abs))<e;
const pow=(A,n)=>{let X=I;for(let i=0;i<n;i++)X=mm(X,A);return X;};
const pull=(G,A)=>mm(mm(tr(G),A),G);
const inv=A=>{const M=A.map((r,i)=>[...r,...I[i]]);for(let c=0;c<4;c++){let p=c;while(p<4&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<4);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);for(let i=0;i<4;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}}return M.map(r=>r.slice(4));};
const key=A=>JSON.stringify(A.map(r=>r.map(x=>Math.abs(x)<1e-10?0:x)));

const R2=pow(R,2);
const handles=[H,mm(mm(R,H),R2),mm(mm(R2,H),R)];
const handleSet=new Set(handles.map(key));
const twirl=A=>scale(1/3,handles.map(K=>pull(K,A)).reduce(add,zero()));

const group=[I],seen=new Set([key(I)]);
for(let i=0;i<group.length;i++)for(const gen of [R,H]){
  const q=mm(gen,group[i]),k=key(q);if(!seen.has(k)){seen.add(k);group.push(q);}
}
assert.equal(group.length,18);

// The three handles form a complete conjugacy class under the full selector
// group, not merely an orbit under R.
for(const g of group){
  const gi=inv(g);
  const conjugated=new Set(handles.map(K=>key(mm(mm(g,K),gi))));
  assert.deepEqual(conjugated,handleSet);
}

// Consequently the quadratic class-sum channel commutes with pullback by all
// selector elements on the complete 16-dimensional matrix space.
const matrixBasis=[];
for(let a=0;a<4;a++)for(let b=0;b<4;b++){const A=zero();A[a][b]=1;matrixBasis.push(A);}
for(const g of group)for(const A of matrixBasis)assert.ok(eq(twirl(pull(g,A)),pull(g,twirl(A))));

// The unique alternating fixed line is therefore selector invariant.
assert.ok(eq(twirl(J),J));
for(const g of group)assert.ok(eq(pull(g,J),J));

// But linear averaging in scattering coordinates is not the image of this
// quadratic bilinear channel: the scattering chart is nonlinear. Record the
// exact level at which naturality has been established.
console.log(JSON.stringify({
  protocol:'quadratic-handle-twirl-full-selector-class-sum/1',
  selectorGroupOrder:group.length,
  handleClassSize:handleSet.size,
  fullConjugacyClass:true,
  equivarianceTestedOn:{groupElements:group.length,matrixBasisElements:matrixBasis.length,identities:group.length*matrixBasis.length},
  fullSelectorEquivariant:true,
  uniqueFixedSymplecticLineSelectorInvariant:true,
  theorem:'F(g^T A g)=g^T F(A) g for every selector g and every 4x4 bilinear A.',
  redhefferBoundary:'The Redheffer action is the scattering-chart image of transfer conjugation, so the selected carrier symplectic line transports naturally. This does not identify F with entrywise averaging or congruence of scattering matrices; that nonlinear response-level operation requires a separately typed definition.',
  conclusion:'The quadratic relationship selector is a central class-sum channel for the full order-18 selector representation, not only a C3-covariant construction.',
  passed:true
},null,2));
