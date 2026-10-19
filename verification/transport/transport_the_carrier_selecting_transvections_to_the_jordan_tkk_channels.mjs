import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(...As)=>As[0].map((row,i)=>row.map((_,j)=>As.reduce((s,A)=>s+A[i][j],0)));
const scale=(a,A)=>A.map(row=>row.map(x=>a*x));
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>+(i===j))]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const q=M[c][c];for(let j=0;j<2*n;j++)M[c][j]/=q;for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];for(let j=0;j<2*n;j++)M[i][j]-=f*M[c][j];}}return M.map(r=>r.slice(n));};
const zero=()=>Array.from({length:4},()=>Array(4).fill(0));
const I=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>+(i===j)));
const Pside=[[1,1,0,0],[0,0,1,1],[1,-1,-1,1],[0,0,1,-1]],PsideInv=inverse(Pside);
const P=[[1,1,-1,-1],[0,-1,0,1],[1,0,1,0],[0,1,0,1]],Q=[[1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]],K0=[[1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,-1]];
const S=mm(mm(P,Q),K0),Sinv=inverse(S);
const N3=[[0,0,0,0],[0,0,0,0],[0,1,0,0],[0,0,0,0]],N4=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,0,0,0]];
const toSelector=N=>mm(mm(Pside,N),PsideInv),toTKK=N=>mm(mm(Sinv,toSelector(N)),S);

const matrixUnit=(i,j)=>{const A=[[0,0],[0,0]];A[i][j]=1;return A;};
const T=B=>{const X=zero();for(let i=0;i<2;i++)for(let j=0;j<2;j++)X[i][j+2]=B[i][j];return X;};
const K=C=>{const X=zero();for(let i=0;i<2;i++)for(let j=0;j<2;j++)X[i+2][j]=C[i][j];return X;};
const H=A=>{const X=zero();for(let i=0;i<2;i++)for(let j=0;j<2;j++){X[i][j]=A[i][j];X[j+2][i+2]=-A[i][j];}return X;};
const channel=i=>{const E=matrixUnit(i,i),Ti=T(E),Ki=K(E),Hi=H(E),Ni=add(Ki,Hi,scale(-1,Ti)),g=add(I,Ti),ginv=add(I,scale(-1,Ti));assert.deepEqual(mm(mm(g,Ki),ginv),Ni);assert.deepEqual(mm(Ni,Ni),zero());return {translation:Ti,specialConformal:Ki,dilation:Hi,dressedNilpotent:Ni};};
const normal=channel(0),tangent=channel(1),tkkE3=toTKK(N3),tkkE4=toTKK(N4);
assert.deepEqual(tkkE3,tangent.dressedNilpotent);assert.deepEqual(tkkE4,normal.dressedNilpotent);

console.log(JSON.stringify({
  protocol:'carrier-transvection-to-jordan-tkk-channel/1',
  transports:{e3:{selector:toSelector(N3),tkk:tkkE3},e4:{selector:toSelector(N4),tkk:tkkE4}},
  channelIdentification:{e3:'tangent E22 channel',e4:'normal E11 channel',offDiagonalRelationship:false},
  decomposition:'N_i = K_i + H_i - T_i',
  conjugacy:'N_i = Ad_{exp(T_i)} K_i with exp(T_i)=I+T_i',
  properties:{rankOne:true,squareZero:true,containsTranslationDualAndDilation:true},
  interpretation:'The carrier-selecting shear is a translation-dressed special-conformal generator in one diagonal Peirce channel, not the off-diagonal relationship translation.',
  boundary:'Arithmetic leaves normal and tangent alternatives exactly degenerate; selecting one requires Higgs, Pfaffian, loss, or orientation data.',
  passed:true
},null,2));
