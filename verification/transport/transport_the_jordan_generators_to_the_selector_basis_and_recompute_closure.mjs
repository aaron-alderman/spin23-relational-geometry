import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((sum,value,k)=>sum+value*B[k][j],0)));
const add=(A,B)=>A.map((row,i)=>row.map((value,j)=>value+B[i][j]));
const scale=(x,A)=>A.map(row=>row.map(value=>x*value));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const bracket=(A,B)=>add(mm(A,B),scale(-1,mm(B,A)));
const close=(A,B,tolerance=1e-10)=>A.every((row,i)=>row.every((value,j)=>Math.abs(value-B[i][j])<tolerance));
const inverse=A=>{const n=A.length,M=A.map((row,i)=>[...row,...Array.from({length:n},(_,j)=>i===j?1:0)]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const q=M[c][c];for(let j=0;j<2*n;j++)M[c][j]/=q;for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];for(let j=0;j<2*n;j++)M[i][j]-=f*M[c][j];}}return M.map(row=>row.slice(n));};
const rank=vectors=>{if(vectors.length===0)return 0;const A=vectors.map(V=>V.flat().slice());let r=0;for(let c=0;c<16;c++){let p=r;while(p<A.length&&Math.abs(A[p][c])<1e-10)p++;if(p===A.length)continue;[A[r],A[p]]=[A[p],A[r]];const q=A[r][c];for(let j=c;j<16;j++)A[r][j]/=q;for(let i=0;i<A.length;i++)if(i!==r){const f=A[i][c];for(let j=c;j<16;j++)A[i][j]-=f*A[r][j];}r++;}return r;};
const independent=(basis,X)=>rank([...basis,X])>rank(basis);
const lieClosure=seeds=>{const basis=[];for(const X of seeds)if(independent(basis,X))basis.push(X);let changed=true;while(changed){changed=false;const snapshot=basis.slice();for(let i=0;i<snapshot.length;i++)for(let j=i+1;j<snapshot.length;j++){const B=bracket(snapshot[i],snapshot[j]);if(B.flat().some(v=>Math.abs(v)>1e-10)&&independent(basis,B)){basis.push(B);changed=true;}}}return basis;};
const zero=()=>Array.from({length:4},()=>Array(4).fill(0));
const translation=B=>{const X=zero();for(let i=0;i<2;i++)for(let j=0;j<2;j++)X[i][j+2]=B[i][j];return X;};

const H=[[0,0,1,1],[0,0,0,-1],[1,1,0,0],[0,-1,0,0]];
const Jcode=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]];
const P=[[1,1,-1,-1],[0,-1,0,1],[1,0,1,0],[0,1,0,1]];
const Zprime=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]];
const Q=[[1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]];
const K0=[[1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,-1]];
const S=mm(mm(P,Q),K0), Sinverse=inverse(S), Pinverse=inverse(P);
const Z=mm(mm(P,Zprime),Pinverse), L=mm(Z,H);
const transport=X=>mm(mm(S,X),Sinverse); // normalization 1/sqrt(2) cancels
const Tn=transport(translation([[1,0],[0,0]]));
const Tt=transport(translation([[0,0],[0,1]]));
const Tr=transport(translation([[0,1],[1,0]]));

for(const X of [Tn,Tt,Tr,L]) assert.ok(close(add(mm(transpose(X),Jcode),mm(Jcode,X)),zero()));
const closure=lieClosure([Tn,Tt,Tr,L]);
const integralClosure=lieClosure([scale(2,Tn),scale(2,Tt),Tr,L]);
assert.equal(closure.length,10);
assert.equal(integralClosure.length,10);

const denominator=X=>X.flat().every(v=>Math.abs(v-Math.round(v))<1e-10)?1:X.flat().every(v=>Math.abs(2*v-Math.round(2*v))<1e-10)?2:null;
assert.deepEqual([denominator(Tn),denominator(Tt),denominator(Tr),denominator(L)],[2,2,1,1]);
const residues=[Tn,Tt].map(X=>scale(2,X).flat().map(v=>((Math.round(v)%2)+2)%2));
const mod2Rank=(()=>{const A=residues.map(r=>r.slice());let rank=0;for(let c=0;c<16;c++){let p=rank;while(p<A.length&&A[p][c]===0)p++;if(p===A.length)continue;[A[rank],A[p]]=[A[p],A[rank]];for(let i=0;i<A.length;i++)if(i!==rank&&A[i][c])for(let j=c;j<16;j++)A[i][j]^=A[rank][j];rank++;}return rank;})();
assert.equal(mod2Rank,1);

console.log(JSON.stringify({
  protocol:'selector-basis-jordan-generator-closure/1',
  transportedDenominators:{normal:2,tangent:2,relationship:1,coherentHandle:1},
  halfIntegralResidueRank:mod2Rank,
  primitiveOperatorLatticeIndex:2**mod2Rank,
  closureDimensions:{primitiveRationalSeeds:closure.length,doubledIntegralFaceSeeds:integralClosure.length},
  theorem:'The transported normal, tangent, relationship, and coherent handle generators close to all of sp(4,R) in the selector basis.',
  arithmeticMeaning:'Both primitive faces are half-integral but have the same residue class, so the operator-lattice extension has index two; the relationship and coherent handle remain integral.',
  boundary:'The operator index two does not explain the earlier index-four carrier saturation. A second independent carrier-level half-direction must come from pairing/coordinate saturation rather than face-generator normalization.',
  passed:true
},null,2));
