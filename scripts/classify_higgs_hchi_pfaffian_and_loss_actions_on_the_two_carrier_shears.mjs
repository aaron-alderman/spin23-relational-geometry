import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(...As)=>As[0].map((row,i)=>row.map((_,j)=>As.reduce((s,A)=>s+A[i][j],0)));
const scale=(a,A)=>A.map(row=>row.map(x=>a*x));
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>+(i===j))]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const q=M[c][c];for(let j=0;j<2*n;j++)M[c][j]/=q;for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];for(let j=0;j<2*n;j++)M[i][j]-=f*M[c][j];}}return M.map(r=>r.slice(n));};
const zero=()=>Array.from({length:4},()=>Array(4).fill(0));
const blockDiag=(A,B)=>[[A[0][0],A[0][1],0,0],[A[1][0],A[1][1],0,0],[0,0,B[0][0],B[0][1]],[0,0,B[1][0],B[1][1]]];
const ad=(G,X)=>mm(mm(G,X),inverse(G));
const E=i=>{const A=[[0,0],[0,0]];A[i][i]=1;return A;};
const T=B=>{const X=zero();for(let i=0;i<2;i++)for(let j=0;j<2;j++)X[i][j+2]=B[i][j];return X;};
const C=B=>{const X=zero();for(let i=0;i<2;i++)for(let j=0;j<2;j++)X[i+2][j]=B[i][j];return X;};
const H=A=>{const X=zero();for(let i=0;i<2;i++)for(let j=0;j<2;j++){X[i][j]=A[i][j];X[j+2][i+2]=-A[i][j];}return X;};
const N=i=>add(C(E(i)),H(E(i)),scale(-1,T(E(i))));
const Nbar=i=>add(scale(-1,C(E(i))),H(E(i)),T(E(i)));
const Nnormal=N(0),Ntangent=N(1);
const X=[[0,1],[1,0]],D=[[1,0],[0,-1]],eps=[[0,1],[-1,0]];
const Higgs=blockDiag(X,X),Hchi=blockDiag(D,D),Gamma=blockDiag(eps,scale(-1,eps));
assert.deepEqual(ad(Higgs,Nnormal),Ntangent);assert.deepEqual(ad(Higgs,Ntangent),Nnormal);
assert.deepEqual(ad(Hchi,Nnormal),Nnormal);assert.deepEqual(ad(Hchi,Ntangent),Ntangent);
assert.deepEqual(ad(Gamma,Nnormal),Nbar(1));assert.deepEqual(ad(Gamma,Ntangent),Nbar(0));

const K=[[0,0,0,1],[0,0,1,0],[0,-1,0,0],[-1,0,0,0]],I=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>+(i===j)));
const outer=(u,v)=>u.map(x=>v.map(y=>x*y)),col=A=>A.map(r=>r[0]),transvection=v=>add(I,outer(v,col(mm(K,v.map(x=>[x])))));
const e3=[0,0,1,0],e4=[0,0,0,1],Tau3=transvection(e3),Tau4=transvection(e4);
assert.deepEqual(ad(Higgs,Tau3),Tau4);assert.deepEqual(ad(Higgs,Tau4),Tau3);
assert.deepEqual(ad(Hchi,Tau3),inverse(Tau3));assert.deepEqual(ad(Hchi,Tau4),inverse(Tau4));

const bits=n=>[n&1,(n>>1)&1,(n>>2)&1,(n>>3)&1],encode=x=>x[0]+2*x[1]+4*x[2]+8*x[3],mod2=x=>((x%2)+2)%2;
const actCode=(M,n)=>encode(col(mm(M,bits(n).map(x=>[x]))).map(mod2)),mapPlane=(M,W)=>W.map(x=>actCode(M,x)).sort((a,b)=>a-b);
const WE=[0,7,11,12],WP=[0,3,12,15],TauBoth=mm(Tau3,Tau4);
for(const Tau of [Tau3,Tau4]){assert.deepEqual(mapPlane(Tau,WE),WP);assert.deepEqual(mapPlane(Tau,WP),WE);}
assert.deepEqual(mapPlane(TauBoth,WE),WE);assert.deepEqual(mapPlane(TauBoth,WP),WP);

const response=[[2,0],[0,3]];assert.notDeepEqual(mm(X,response),mm(response,X));assert.deepEqual(mm(D,response),mm(response,D));

console.log(JSON.stringify({
  protocol:'carrier-shear-discrete-spurion-action/1',
  jordanChannelActions:{HiggsSwap:'N11 <-> N22',hchiGrading:'fixes N11 and N22 separately',gradedPfaffian:'N11 -> Nbar22 and N22 -> Nbar11, exchanging channel and conformal orientation'},
  finiteCarrierActions:{HiggsSwap:'Tau_e3 <-> Tau_e4',hchiGrading:'preserves each mod-two transvection but reverses its integral unipotent orientation: Tau -> Tau^-1',eachTransvection:'swaps WE and WP modulo two',product:'Tau_e3 Tau_e4 stabilizes both planes'},
  anisotropicResponse:{example:response,HiggsInvariant:false,hchiDiagonal:true,criterion:'normal/tangent inequality breaks the Higgs channel exchange but is compatible with hchi labeling'},
  theorem:'Higgs reflection exchanges the two carrier shears, hchi labels but does not select them, and the graded Pfaffian also reverses conformal orientation. Only an anisotropic response spurion can distinguish normal from tangent.',
  boundary:'Unequal silver/loss coefficients label the channels but do not by themselves prove that one shear is globally chosen; weak-loss Jordan coverage requires both channel charts.',
  passed:true
},null,2));
