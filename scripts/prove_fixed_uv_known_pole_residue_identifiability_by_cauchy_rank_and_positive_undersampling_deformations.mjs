import assert from 'node:assert/strict';

const inv=A=>{const n=A.length,M=A.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>i===j?1:0)]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-14)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}}return M.map(r=>r.slice(n));};
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const det=A=>{const M=A.map(r=>[...r]);let d=1;for(let c=0;c<M.length;c++){let p=c;while(p<M.length&&Math.abs(M[p][c])<1e-14)p++;if(p===M.length)return 0;if(p!==c){[M[c],M[p]]=[M[p],M[c]];d=-d;}const q=M[c][c];d*=q;for(let i=c+1;i<M.length;i++){const f=M[i][c]/q;for(let j=c;j<M.length;j++)M[i][j]-=f*M[c][j];}}return d;};
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const mscale=(a,A)=>A.map(r=>r.map(x=>a*x));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-B[i][j]))));
const psd2=A=>A[0][0]>=-1e-12&&A[1][1]>=-1e-12&&det(A)>=-1e-12;

const poles=[1,3,6],samples=[-4,-1,0];
const C=samples.map(x=>poles.map(m=>1/(m-x)));
assert.ok(Math.abs(det(C))>1e-10);
const Cinv=inv(C);
const contact=[[2,.2],[.2,1]];
const residues=[
  [[2,.3],[.3,1]],
  [[1.2,-.2],[-.2,.8]],
  [[.7,.1],[.1,1.5]],
];
assert.ok(residues.every(psd2));
const values=samples.map((x,k)=>residues.reduce((H,R,j)=>madd(H,mscale(C[k][j],R)),contact));

const recovered=Array.from({length:3},()=>[[0,0],[0,0]]);
for(let a=0;a<2;a++)for(let b=0;b<2;b++){
  const y=values.map(V=>V[a][b]-contact[a][b]);
  const x=Cinv.map(r=>r.reduce((s,v,k)=>s+v*y[k],0));
  for(let j=0;j<3;j++)recovered[j][a][b]=x[j];
}
for(let j=0;j<3;j++)assert.ok(maxerr(recovered[j],residues[j])<1e-10);

const C2=C.slice(0,2);
const nullVector=[
  C2[0][1]*C2[1][2]-C2[0][2]*C2[1][1],
  C2[0][2]*C2[1][0]-C2[0][0]*C2[1][2],
  C2[0][0]*C2[1][1]-C2[0][1]*C2[1][0],
];
for(const row of C2)assert.ok(Math.abs(row.reduce((s,x,j)=>s+x*nullVector[j],0))<1e-12);
const eps=.5,Id=[[1,0],[0,1]];
const deformed=residues.map((R,j)=>madd(R,mscale(eps*nullVector[j],Id)));
assert.ok(deformed.every(psd2));
for(let k=0;k<2;k++){
  const original=residues.reduce((H,R,j)=>madd(H,mscale(C2[k][j],R)),contact);
  const changed=deformed.reduce((H,R,j)=>madd(H,mscale(C2[k][j],R)),contact);
  assert.ok(maxerr(original,changed)<1e-12);
}
assert.ok(maxerr(residues[0],deformed[0])>1e-6);

// With orthogonal known supports P0,P1 and one known pole on each, one sample
// determines each scalar residue weight by projection.
const supports=[[[1,0],[0,0]],[[0,0],[0,1]]],supportPoles=[2,5],weights=[1.7,.9],probe=-1;
const coherentValue=supports.reduce((H,P,j)=>madd(H,mscale(weights[j]/(supportPoles[j]-probe),P)),[[0,0],[0,0]]);
const recoveredWeights=supports.map((P,j)=>(P[0][0]*coherentValue[0][0]+P[1][1]*coherentValue[1][1])*(supportPoles[j]-probe));
assert.ok(recoveredWeights.every((x,j)=>Math.abs(x-weights[j])<1e-12));

console.log(JSON.stringify({
  protocol:'fixed-uv-known-pole-cauchy-identifiability/1',
  unrestrictedMatrixResidues:{poleCount:poles.length,sampleCount:samples.length,cauchyDeterminant:det(C),uniqueRecovery:true},
  undersampledCase:{sampleCount:2,nullDirection:nullVector,distinctPositiveResidueFamilyExists:true},
  coherentKnownSupportCase:{oneSampleRecoversOneKnownPoleWeightPerOrthogonalSupport:true,recoveredWeights},
  theorem:'With fixed contact, n distinct known poles and n distinct off-pole real samples, the n x n Cauchy matrix is invertible and arbitrary matrix residues are unique. With K<n samples, positive-definite residues admit nontrivial positive semidefinite-preserving null deformations. Known orthogonal support decomposition reduces the problem channel by channel.',
  boundary:'This identifies residues only when pole locations, UV contact and support model are supplied. Unknown thresholds remain a nonlinear inverse problem and field-to-support typing remains external.',
  passed:true,
},null,2));
