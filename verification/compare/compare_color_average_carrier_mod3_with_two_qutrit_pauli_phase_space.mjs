import assert from 'node:assert/strict';

const p=3,mod=x=>((x%p)+p)%p;
const map=A=>A.map(r=>r.map(mod));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>mod(r.reduce((s,x,k)=>s+x*B[k][j],0))));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>mod(x)===mod(B[i][j])));
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
function pow(A,n){let x=I(A.length),b=A;while(n){if(n&1)x=mul(x,b);b=mul(b,b);n>>=1;}return x;}
function rank(A){const M=map(A);let r=0;for(let c=0;c<(M[0]?.length??0)&&r<M.length;c++){let q=r;while(q<M.length&&M[q][c]===0)q++;if(q===M.length)continue;[M[r],M[q]]=[M[q],M[r]];const inv=M[r][c]===1?1:2;for(let j=c;j<M[r].length;j++)M[r][j]=mod(inv*M[r][j]);for(let i=0;i<M.length;i++)if(i!==r){const f=M[i][c];for(let j=c;j<M[i].length;j++)M[i][j]=mod(M[i][j]-f*M[r][j]);}r++;}return r;}
function det(A){const M=map(A);let d=1;for(let c=0;c<M.length;c++){let q=c;while(q<M.length&&M[q][c]===0)q++;if(q===M.length)return 0;if(q!==c){[M[c],M[q]]=[M[q],M[c]];d=mod(-d);}const pivot=M[c][c];d=mod(d*pivot);const inv=pivot===1?1:2;for(let i=c+1;i<M.length;i++){const f=mod(M[i][c]*inv);for(let j=c;j<M.length;j++)M[i][j]=mod(M[i][j]-f*M[c][j]);}}return d;}

const J0=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const S=[[1,0,0,0],[0,-1,0,0],[-1,0,-1,0],[0,-1,0,1]];
const Q=[[0,0,0,-1,0],[0,0,-1,0,0],[0,-1,0,0,0],[-1,0,0,0,0],[0,0,0,0,-2]];
const R5=[[0,1,0,0,0],[-1,-1,0,0,0],[0,0,0,-1,0],[0,0,1,-1,0],[0,0,0,0,1]];
const S5=[[-1,-1,-1,1,0],[0,1,0,-1,0],[0,0,1,-1,0],[0,0,0,-1,0],[0,0,0,0,-1]];
const neg=A=>A.map(r=>r.map(x=>mod(-x)));

assert.equal(det(J0),1);
assert.equal(det(Q),1);
assert.ok(eq(mul(mul(tr(R),map(J0)),R),J0));
assert.ok(eq(mul(mul(tr(S),map(J0)),S),neg(map(J0))));
assert.ok(eq(pow(map(R),3),I(4)));
assert.ok(eq(pow(map(S),2),I(4)));
assert.ok(eq(mul(mul(map(S),map(R)),map(S)),pow(map(R),2)));
assert.ok(eq(mul(mul(tr(R5),map(Q)),R5),Q));
assert.ok(eq(mul(mul(tr(S5),map(Q)),S5),Q));

const RminusI=map(R).map((r,i)=>r.map((x,j)=>mod(x-(i===j?1:0))));
const fixedDimension=4-rank(RminusI);
assert.equal(fixedDimension,3);
const sp4Order=3**4*(3**2-1)*(3**4-1);
assert.equal(sp4Order,51840);

console.log(JSON.stringify({
  protocol:'color-average-carrier-mod3-versus-two-qutrit-pauli/1',
  carrierReduction:{field:'F3',dimension:4,symplecticForm:map(J0),nondegenerate:true,ambientSymplecticGroupOrder:sp4Order},
  twoLogicalQutritPhaseSpace:{field:'F3',dimension:4,form:'canonical Pauli commutator',abstractlyIsomorphic:true},
  signedOrderSixReduction:{colorCycle:map(R),colorCycleOrder:3,colorCycleFixedDimension:fixedDimension,pairedReflection:map(S),pairedReflectionOrder:2,pairedReflectionMultiplier:2,relation:'S R S = R^{-1}'},
  primitiveReduction:{dimension:5,gram:map(Q),determinant:det(Q),nondegenerate:true,colorCycle:map(R5),pairedReflection:map(S5)},
  conclusion:'Modulo three, the completed arithmetic carrier is exactly an abstract two-qutrit symplectic phase space. The color cycle is a characteristic-three unipotent of order three, and the paired reflection is anti-symplectic. No canonical map to the source paper’s two logical qutrits is supplied by this abstract isomorphism.',
  stopCondition:'Do not identify the mod-three carrier with specific logical X/Z operators until a field-labelled symplectic intertwiner is constructed.',
  passed:true,
},null,2));
