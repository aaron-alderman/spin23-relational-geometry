import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const det=A=>{const n=A.length,M=A.map(r=>r.slice());let d=1;for(let i=0;i<n;i++){let p=i;for(let j=i+1;j<n;j++)if(Math.abs(M[j][i])>Math.abs(M[p][i]))p=j;if(Math.abs(M[p][i])<1e-12)return 0;if(p!==i){[M[p],M[i]]=[M[i],M[p]];d=-d}const q=M[i][i];d*=q;for(let j=i+1;j<n;j++){const f=M[j][i]/q;for(let k=i;k<n;k++)M[j][k]-=f*M[i][k]}}return Math.round(d*1e12)/1e12};
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<1e-12));
const T=[[1,0,0,0],[0,-1,0,0],[0,0,-1,0],[0,0,0,1]];
const H=[[0,0,1,1],[0,0,0,-1],[1,1,0,0],[0,-1,0,0]];
const P=[[1,1,0,0],[0,0,1,1],[1,-1,-1,1],[0,0,1,-1]];
const Jcode=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]];
const JT=mm(mm(transpose(P),Jcode),P);

// Basis of L'=Z^4 + (e1+e2)/2 + (e3+e4)/2.
const B=[[.5,0,0,0],[.5,1,0,0],[0,0,.5,0],[0,0,.5,1]];
const TB=[[1,0,0,0],[-1,-1,0,0],[0,0,-1,0],[0,0,1,1]];
const U=mm(P,B), JB=mm(mm(transpose(B),JT),B);
assert.ok(eq(mm(T,B),mm(B,TB)));
assert.ok(eq(mm(H,U),mm(U,TB)));
assert.equal(Math.abs(det(B)),.25);
assert.equal(det(U),-1);
assert.equal(det(JB),1);
assert.ok(JB.flat().every(Number.isInteger));

const bits=n=>[n&1,(n>>1)&1,(n>>2)&1,(n>>3)&1];
const subspaces=new Map();
for(let a=1;a<16;a++)for(let b=a+1;b<16;b++){const members=[0,a,b,a^b].sort((x,y)=>x-y);subspaces.set(members.join(','),members)}
assert.equal(subspaces.size,35);
const K=JT.map(r=>r.map(x=>((x/2)%2+2)%2));
const pairing=(a,b)=>{const x=bits(a),y=bits(b);let s=0;for(let i=0;i<4;i++)for(let j=0;j<4;j++)s+=x[i]*K[i][j]*y[j];return s%2};
const symplecticAdmissible=[...subspaces.values()].filter(W=>W.every(a=>W.every(b=>pairing(a,b)===0)));
assert.equal(symplecticAdmissible.length,15);
const chosen=[0,3,12,15]; // span of (e1+e2) and (e3+e4)
assert.ok(subspaces.has(chosen.join(',')));
assert.ok(symplecticAdmissible.some(W=>W.join(',')===chosen.join(',')));

console.log(JSON.stringify({
  protocol:'index-four-sideband-to-selector-saturation/1',
  inducedOverlattice:'Z^4 + (e1+e2)/2 + (e3+e4)/2',
  quotient:'C2 x C2',
  overlatticeBasis:B,
  twistInOverlatticeBasis:TB,
  unimodularHandleIntertwiner:U,
  determinantOfIntertwiner:det(U),
  primitivePulledBackForm:JB,
  determinantOfForm:det(JB),
  census:{allExponentTwoIndexFourOverlattices:subspaces.size,symplecticallyIntegralAndUnimodular:symplecticAdmissible.length,reasonTInvariant:'T is identity modulo 2'},
  selectionBoundary:'P selects one of 15 symplectically admissible saturations; T and the transported alternating form alone do not select it uniquely.',
  passed:true
},null,2));
