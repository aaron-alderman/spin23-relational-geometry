import assert from 'node:assert/strict';

const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const kron=(A,B)=>A.flatMap(ar=>B.map(br=>ar.flatMap(a=>br.map(b=>a*b))));
const eq=(A,B,t=1e-10)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));
const det=A=>{const M=A.map(r=>r.map(Number));let d=1;for(let c=0;c<M.length;c++){let p=c;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)return 0;if(p!==c){[M[p],M[c]]=[M[c],M[p]];d=-d;}const q=M[c][c];d*=q;for(let i=c+1;i<M.length;i++){const f=M[i][c]/q;for(let j=c;j<M.length;j++)M[i][j]-=f*M[c][j];}}return Math.round(d);};
const inv=A=>{const n=A.length,M=A.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>i===j?1:0)]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-10)p++;assert.ok(p<n);[M[p],M[c]]=[M[c],M[p]];const q=M[c][c];for(let j=0;j<2*n;j++)M[c][j]/=q;for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];for(let j=0;j<2*n;j++)M[i][j]-=f*M[c][j];}}return M.map(r=>r.slice(n).map(x=>Math.round(x)));};
const mv=(A,v)=>A.map(r=>r.reduce((s,x,i)=>s+x*v[i],0));
const mod=(x,p=3)=>((Math.round(x)%p)+p)%p;
const sameLine=(v,w)=>[1,2].some(k=>v.every((x,i)=>mod(k*x)===mod(w[i])));
const pf4=A=>A[0][1]*A[2][3]-A[0][2]*A[1][3]+A[0][3]*A[1][2];

const eps=[[0,1],[-1,0]],G=[[2,-1],[-1,2]];
const Omega=kron(eps,G);
assert.ok(eq(tr(Omega),scale(-1,Omega)));
assert.equal(det(Omega),9);
assert.equal(Math.abs(pf4(Omega)),3);

// Real color whitening gives precisely the canonical J0 used by the carrier.
const L=[[Math.sqrt(2),-1/Math.sqrt(2)],[0,Math.sqrt(3/2)]]; // G=L^T L
assert.ok(eq(mm(tr(L),L),G));
const B=kron([[1,0],[0,1]],invReal(L));
function invReal(A){const d=A[0][0]*A[1][1]-A[0][1]*A[1][0];return [[A[1][1]/d,-A[0][1]/d],[-A[1][0]/d,A[0][0]/d]];}
const J0=kron(eps,[[1,0],[0,1]]);
assert.ok(eq(mm(mm(tr(B),Omega),B),J0));

// Integral equivalence with the pre-completion A4 equal-area form.
const Jc=[[0,1,-1,0],[-1,0,1,0],[1,-1,0,0],[0,0,0,0]];
const Jf=[[0,0,0,1],[0,0,0,1],[0,0,0,1],[-1,-1,-1,0]];
const JA4=Jc.map((r,i)=>r.map((x,j)=>x+Jf[i][j]));
const P=[[1,-1],[0,1]],Q=[[1,1],[1,2]];
assert.deepEqual(mm(mm(tr(P),G),Q),[[1,0],[0,3]]);
const Uomega=[[1,-1,0,0],[0,1,0,0],[0,0,1,1],[0,0,1,2]];
const Uj=[[1,1,0,1],[0,1,1,-1],[0,1,0,0],[0,0,0,1]];
const Dform=mm(mm(tr(Uomega),Omega),Uomega);
assert.ok(eq(mm(mm(tr(Uj),JA4),Uj),Dform));
const T=mm(Uomega,inv(Uj));
assert.equal(Math.abs(det(T)),1);
assert.ok(eq(mm(mm(tr(T),Omega),T),JA4));

// Product symmetries select one of the four index-three completions.
const C=[[0,-1],[1,-1]],F=[[0,1],[1,0]],I2=[[1,0],[0,1]];
assert.ok(eq(mm(mm(tr(C),G),C),G));
assert.ok(eq(mm(mm(F,C),F),mm(C,C)));
const color=kron(I2,C),joint=kron(F,F);
assert.ok(eq(mm(mm(tr(color),Omega),color),Omega));
assert.ok(eq(mm(mm(tr(joint),Omega),joint),scale(-1,Omega)));

const kernel=[];
for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++)for(let d=0;d<3;d++){
  const v=[a,b,c,d];if(v.some(Boolean)&&mv(Omega,v).every(x=>mod(x)===0))kernel.push(v);
}
const normalize=v=>{const i=v.findIndex(Boolean),k=v[i]===1?1:2;return v.map(x=>mod(k*x));};
const lines=[...new Map(kernel.map(v=>[normalize(v).join(''),normalize(v)])).values()];
assert.equal(lines.length,4);
const stable=lines.filter(v=>sameLine(v,mv(color,v))&&sameLine(v,mv(joint,v)));
const stableWithA4=stable.map(v=>({product:v,a4:mv(inv(T),v).map(x=>mod(x))}));
assert.equal(stable.length,2);
assert.deepEqual(stableWithA4.map(x=>x.a4),[[0,1,2,1],[1,0,2,2]]);
assert.ok(stableWithA4.every(x=>!sameLine(x.a4,[1,1,1,0])));

console.log(JSON.stringify({
  protocol:'weak-pfaffian-times-a2-metric-to-index-three-sp4-carrier/1',
  productForm:'Omega=epsilon_weak tensor G_A2',
  integralOmega:Omega,
  pfaffian:pf4(Omega),determinant:det(Omega),
  realWhitening:'(I tensor L^{-1})^T Omega (I tensor L^{-1}) = J0',
  canonicalJ0:J0,
  integralEquivalenceToA4:{unimodularChange:T,verified:true,elementaryDivisors:[1,3]},
  productSymmetries:{colorC3:'symplectic',jointWeakColorReflection:'anti-symplectic'},
  indexThreeCompletions:lines.length,
  signedCovariantProductLines:stableWithA4,
  equalsKnownColorAverageLine:false,
  conclusion:'The weak Pfaffian sewn to the unique A2 color metric is exactly the real carrier J0 after whitening and is integrally form-equivalent to the earlier determinant-nine A4 lattice. But the natural product color/reflection action leaves two index-three completions, and neither transports to the previously unique color-average line. Form sewing succeeds; equivariant integral identification does not.',
  limitation:'An additional symmetry intertwiner or non-product action is required to identify the product environment lattice with the earlier signed-covariant A4 completion.',
  passed:true
},null,2));
