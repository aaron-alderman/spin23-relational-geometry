import assert from 'node:assert/strict';
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,v,k)=>s+v*B[k][j],0)));
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>i===j?1:0)]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const q=M[c][c];for(let j=0;j<2*n;j++)M[c][j]/=q;for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];for(let j=0;j<2*n;j++)M[i][j]-=f*M[c][j];}}return M.map(r=>r.slice(n));};
const bits=n=>[n&1,(n>>1)&1,(n>>2)&1,(n>>3)&1], encode=x=>x[0]+2*x[1]+4*x[2]+8*x[3], key=W=>W.slice().sort((a,b)=>a-b).join(',');
const matvec=(A,x)=>A.map(r=>r.reduce((s,v,j)=>s+v*x[j],0)), zero=()=>Array.from({length:4},()=>Array(4).fill(0));
const scale=(a,A)=>A.map(row=>row.map(x=>a*x));
const translation=B=>{const X=zero();for(let i=0;i<2;i++)for(let j=0;j<2;j++)X[i][j+2]=B[i][j];return X;};

const H=[[0,0,1,1],[0,0,0,-1],[1,1,0,0],[0,-1,0,0]], Peig=[[1,1,-1,-1],[0,-1,0,1],[1,0,1,0],[0,1,0,1]];
const Zprime=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]], Q=[[1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]], K0=[[1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,-1]];
const S=mm(mm(Peig,Q),K0), Sinverse=inverse(S), Z=mm(mm(Peig,Zprime),inverse(Peig)), L=mm(Z,H), transport=X=>mm(mm(S,X),Sinverse);
const selectorGenerators={normal:transport(translation([[1,0],[0,0]])),tangent:transport(translation([[0,0],[0,1]])),relationship:transport(translation([[0,1],[1,0]])),coherentHandle:L};
const Pside=[[1,1,0,0],[0,0,1,1],[1,-1,-1,1],[0,0,1,-1]], PsideInverse=inverse(Pside);
const sidebandGenerators=Object.fromEntries(Object.entries(selectorGenerators).map(([n,A])=>[n,mm(mm(PsideInverse,A),Pside)]));

const subspaces=new Map();for(let a=1;a<16;a++)for(let b=a+1;b<16;b++){const W=[0,a,b,a^b].sort((x,y)=>x-y);subspaces.set(key(W),W);}
const K=[[0,0,0,1],[0,0,1,0],[0,1,0,0],[1,0,0,0]];
const pairing=(a,b)=>{const x=bits(a),y=bits(b);let s=0;for(let i=0;i<4;i++)for(let j=0;j<4;j++)s+=x[i]*K[i][j]*y[j];return s%2;};
const lagrangians=[...subspaces.values()].filter(W=>W.every(a=>W.every(b=>pairing(a,b)===0)));assert.equal(lagrangians.length,15);
const belongs=(v,W)=>{const d=v.map(x=>2*x);if(d.some(x=>Math.abs(x-Math.round(x))>1e-9))return false;return W.includes(encode(d.map(x=>((Math.round(x)%2)+2)%2)));};
const planeGenerators=W=>{const n=W.filter(x=>x!==0);return [bits(n[0]).map(x=>x/2),bits(n[1]).map(x=>x/2)];};
const latticeGenerators=W=>[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1],...planeGenerators(W)];
const preserves=(A,W)=>latticeGenerators(W).every(x=>belongs(matvec(A,x),W));
const records=lagrangians.map(W=>({plane:W,...Object.fromEntries(Object.entries(sidebandGenerators).map(([n,A])=>[n,preserves(A,W)]))}));
const all=records.filter(r=>r.normal&&r.tangent&&r.relationship&&r.coherentHandle), faces=records.filter(r=>r.normal&&r.tangent), core=records.filter(r=>r.relationship&&r.coherentHandle), previouslySelected=[0,3,12,15];
const doubledFaceGenerators={...sidebandGenerators,normal:scale(2,sidebandGenerators.normal),tangent:scale(2,sidebandGenerators.tangent)};
const doubledRecords=lagrangians.map(W=>({plane:W,...Object.fromEntries(Object.entries(doubledFaceGenerators).map(([n,A])=>[n,preserves(A,W)]))}));
const doubledAll=doubledRecords.filter(r=>r.normal&&r.tangent&&r.relationship&&r.coherentHandle);
const commonModeBasis=[[.5,0,0,0],[.5,1,0,0],[0,0,.5,0],[0,0,.5,1]];
const commonModeBasisInverse=inverse(commonModeBasis);
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const Jcode=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]];
const pulledBackForm=mm(mm(transpose(Pside),Jcode),Pside);
const commonModeForm=mm(mm(transpose(commonModeBasis),pulledBackForm),commonModeBasis).map(row=>row.map(Math.round));
const carrierMatricesRaw=Object.fromEntries(Object.entries(doubledFaceGenerators).map(([n,A])=>[n,mm(mm(commonModeBasisInverse,A),commonModeBasis)]));
for(const A of Object.values(carrierMatricesRaw)) for(const row of A) for(const x of row) assert.ok(Math.abs(x-Math.round(x))<1e-9);
const integralCarrierMatrices=Object.fromEntries(Object.entries(carrierMatricesRaw).map(([n,A])=>[n,A.map(row=>row.map(Math.round))]));
const bracket=(A,B)=>mm(A,B).map((row,i)=>row.map((x,j)=>x-mm(B,A)[i][j]));
const mod=(x,p)=>((x%p)+p)%p;
const modInverse=(a,p)=>{for(let x=1;x<p;x++)if(mod(a*x,p)===1)return x;throw new Error('noninvertible');};
const modRank=(vectors,p)=>{const M=vectors.map(A=>A.flat().map(x=>mod(x,p)));let r=0;for(let c=0;c<16;c++){let q=r;while(q<M.length&&M[q][c]===0)q++;if(q===M.length)continue;[M[r],M[q]]=[M[q],M[r]];const u=modInverse(M[r][c],p);for(let j=c;j<16;j++)M[r][j]=mod(M[r][j]*u,p);for(let i=0;i<M.length;i++)if(i!==r&&M[i][c]){const f=M[i][c];for(let j=c;j<16;j++)M[i][j]=mod(M[i][j]-f*M[r][j],p);}r++;}return r;};
const modLieDimension=p=>{const basis=[];for(const A of Object.values(integralCarrierMatrices))if(modRank([...basis,A],p)>basis.length)basis.push(A);let changed=true;while(changed){changed=false;const snapshot=basis.slice();for(let i=0;i<snapshot.length;i++)for(let j=i+1;j<snapshot.length;j++){const C=bracket(snapshot[i],snapshot[j]);if(modRank([...basis,C],p)>basis.length){basis.push(C);changed=true;}}}return basis.length;};
const modularClosureDimensions={p2:modLieDimension(2),p3:modLieDimension(3),p5:modLieDimension(5)};
assert.deepEqual(modularClosureDimensions,{p2:5,p3:10,p5:10});
const facePlane=[0,1,2,3];
assert.equal(faces.length,1);
assert.equal(core.length,1);
assert.equal(all.length,0);
assert.equal(key(faces[0].plane),key(facePlane));
assert.equal(key(core[0].plane),key(previouslySelected));
assert.equal(faces[0].relationship,true);
assert.equal(faces[0].coherentHandle,false);
assert.equal(core[0].normal,false);
assert.equal(core[0].tangent,false);
assert.equal(doubledAll.length,1);
assert.equal(key(doubledAll[0].plane),key(previouslySelected));
console.log(JSON.stringify({
  protocol:'sideband-saturation-full-physical-generator-census/1',
  coordinateRule:'Pside^-1 A Pside on the actual sideband overlattices',
  counts:{symplecticSaturations:lagrangians.length,bothPrimitiveFaces:faces.length,relationshipAndCoherentHandle:core.length,allFourGenerators:all.length},
  uniqueFacePlane:faces[0].plane,
  facePlaneAlsoPreservesRelationship:faces[0].relationship,
  facePlanePreservesCoherentHandle:faces[0].coherentHandle,
  uniqueRelationshipHandlePlane:core[0].plane,
  relationshipHandlePlanePreservesNormal:core[0].normal,
  relationshipHandlePlanePreservesTangent:core[0].tangent,
  doubledFaceNormalization:{allFourGenerators:doubledAll.length,uniquePlane:doubledAll[0].plane},
  integralCarrierMatrices,
  commonModeForm,
  modularClosureDimensions,
  previouslySelectedPlane:previouslySelected,
  previousPlanePreservesAll:all.some(r=>key(r.plane)===key(previouslySelected)),
  theorem:'No exponent-two index-four symplectic saturation is invariant under the full primitive transported generator set; after doubling both face generators, exactly the previously selected saturation is invariant under all four.',
  branchSplit:'The unique face-compatible plane and the unique relationship-handle-compatible plane are distinct.',
  boundary:'This is an integral-lattice obstruction to primitive face normalization, not to the real Lie closure. Doubling both faces selects a consistent integral form but does not explain dynamically why the physical face units should be doubled.',
  records,
  passed:true
},null,2));
