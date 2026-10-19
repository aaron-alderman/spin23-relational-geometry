import assert from 'node:assert/strict';

const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const zero=(m,n=m)=>Array.from({length:m},()=>Array(n).fill(0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const eq=(A,B,t=1e-10)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));
const pow=(A,n)=>{let X=I(A.length);for(let i=0;i<n;i++)X=mm(X,A);return X;};
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];M[row]=M[row].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};
const frob=(A,B)=>A.flat().reduce((s,x,i)=>s+x*B.flat()[i],0);

// Cyclically oriented edge frame of the multiplicity triangle.
const edges=[[1,-1,0],[0,1,-1],[-1,0,1]];
assert.deepEqual(edges.reduce((a,b)=>a.map((x,i)=>x+b[i]),[0,0,0]),[0,0,0]);
assert.equal(rank(edges),2);
const edgeGram=edges.map(a=>edges.map(b=>a.reduce((s,x,i)=>s+x*b[i],0)));
const LK3=[[2,-1,-1],[-1,2,-1],[-1,-1,2]];
assert.deepEqual(edgeGram,LK3);

// Whitened three-handle frame from the selector class sum.
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const Q=[[4/3,0,-2/3,0],[0,4/3,0,-2/3],[-2/3,0,4/3,0],[0,-2/3,0,4/3]];
const R2=pow(R,2),handles=[H,mm(mm(R,H),R2),mm(mm(R2,H),R)];
const rs=Math.sqrt(2/3),rl=Math.sqrt(2),d=(rs+rl)/2,o=(rs-rl)/2;
const L=zero(4);for(const [a,b] of [[0,2],[1,3]]){L[a][a]=L[b][b]=d;L[a][b]=L[b][a]=o;}
const is=(1/rs+1/rl)/2,io=(1/rs-1/rl)/2;
const Li=zero(4);for(const [a,b] of [[0,2],[1,3]]){Li[a][a]=Li[b][b]=is;Li[a][b]=Li[b][a]=io;}
assert.ok(eq(mm(L,Li),I(4))&&eq(mm(L,L),Q));
const O=handles.map(K=>mm(mm(L,K),Li));
assert.ok(eq(O.reduce(add,zero(4)),zero(4)));
assert.equal(rank(O.map(A=>A.flat())),2);
const handleGram=O.map(A=>O.map(B=>frob(A,B)));
assert.ok(eq(handleGram,scale(2,LK3)));

// The frame assignment edge_i -> O_i/sqrt(2) preserves every Gram entry.
const normalizedHandles=O.map(A=>scale(1/Math.sqrt(2),A));
const normalizedGram=normalizedHandles.map(A=>normalizedHandles.map(B=>frob(A,B)));
assert.ok(eq(normalizedGram,edgeGram));

// Selector conjugation cycles the handle frame.
const Rw=mm(mm(L,R),Li),RwInv=pow(Rw,2);
for(let i=0;i<3;i++)assert.ok(eq(mm(mm(Rw,O[i]),RwInv),O[(i+1)%3]));

// The only relation in both frames is the singlet sum. Therefore the frame
// assignment descends to an isometric C3 intertwiner of two standard planes.
const labelCycle=[[0,0,1],[1,0,0],[0,1,0]];
assert.equal(rank(sub(labelCycle,I(3))),2);

console.log(JSON.stringify({
  protocol:'signed-k3-edge-frame-to-handle-kraus-frame/1',
  multiplicityTriangleEdges:edges,
  edgeGram,
  whitenedHandleGram:handleGram,
  gramScale:2,
  normalizedAssignment:'edge_i -> O_i/sqrt(2)',
  normalizedAssignmentIsIsometric:true,
  uniqueLinearRelationInBothFrames:'frame_0+frame_1+frame_2=0',
  frameRanks:{multiplicityEdges:rank(edges),handleOperators:rank(O.map(A=>A.flat()))},
  handleConjugationCyclesFrame:true,
  abstractC3Intertwiner:true,
  typingBoundary:{
    multiplicityAction:'cyclic permutation of the switched matter nodes (u,d,-uc)',
    handleAction:'conjugation by the selector generator R on the bilocal symplectic carrier',
    microscopicColorAction:'acts inside the augmentation ideal I and does not permute u,d,uc',
    conclusion:'The two zero-sum frames are canonically isometric as abstract C3 modules, but identifying their C3 generators is additional response-level physics, not Standard-Model color covariance.'
  },
  passed:true
},null,2));
