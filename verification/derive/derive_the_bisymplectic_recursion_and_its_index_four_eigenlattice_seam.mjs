import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((row,i)=>row.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(row=>row.map(x=>a*x));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const close=(A,B)=>A.every((row,i)=>row.every((x,j)=>Math.abs(x-B[i][j])<1e-10));
const det=A=>{const M=A.map(r=>r.slice());let d=1;for(let c=0;c<4;c++){let p=c;while(p<4&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<4);if(p!==c){[M[p],M[c]]=[M[c],M[p]];d=-d;}const q=M[c][c];d*=q;for(let i=c+1;i<4;i++){const f=M[i][c]/q;for(let j=c;j<4;j++)M[i][j]-=f*M[c][j];}}return Math.round(d);};
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>+(i===j))]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const q=M[c][c];for(let j=0;j<2*n;j++)M[c][j]/=q;for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];for(let j=0;j<2*n;j++)M[i][j]-=f*M[c][j];}}return M.map(r=>r.slice(n));};
const minor3=(A,rs,cs)=>{const M=rs.map(i=>cs.map(j=>A[i][j]));return Math.round(M[0][0]*(M[1][1]*M[2][2]-M[1][2]*M[2][1])-M[0][1]*(M[1][0]*M[2][2]-M[1][2]*M[2][0])+M[0][2]*(M[1][0]*M[2][1]-M[1][1]*M[2][0]));};
const I=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>+(i===j)));
const Omega=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const J=[[0,1,0,0],[-1,0,0,0],[0,0,0,1],[0,0,-1,0]];
const G=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]];
const R=mm(scale(-1,Omega),J); // Omega^-1 J
const K=mm(G,R);
assert.ok(close(mm(R,R),I));assert.ok(close(mm(G,G),scale(-1,I)));assert.ok(close(mm(K,K),I));
assert.ok(close(mm(R,G),scale(-1,mm(G,R))));
assert.ok(close(mm(Omega,R),J));
assert.ok(close(mm(transpose(R),Omega),mm(Omega,R))); // Omega-self-adjoint

const Eplus=[[1,0],[0,1],[0,1],[-1,0]],Eminus=[[1,0],[0,1],[0,-1],[1,0]];
assert.ok(close(mm(R,Eplus),Eplus));assert.ok(close(mm(R,Eminus),scale(-1,Eminus)));
assert.ok(close(mm(G,Eplus),mm(Eminus,[[0,1],[-1,0]])));
const restrict=(E,F,A)=>mm(mm(transpose(E),A),F);
const Oplus=restrict(Eplus,Eplus,Omega),Ominus=restrict(Eminus,Eminus,Omega),cross=restrict(Eplus,Eminus,Omega);
assert.ok(close(Oplus,[[0,2],[-2,0]]));assert.ok(close(Ominus,[[0,-2],[2,0]]));assert.ok(close(cross,[[0,0],[0,0]]));
const E=Eplus.map((row,i)=>[...row,...Eminus[i]]);
assert.equal(Math.abs(det(E)),4);
const threeMinors=[];for(let omitR=0;omitR<4;omitR++)for(let omitC=0;omitC<4;omitC++)threeMinors.push(Math.abs(minor3(E,[0,1,2,3].filter(i=>i!==omitR),[0,1,2,3].filter(i=>i!==omitC))));
assert.ok(threeMinors.every(x=>x%2===0));assert.ok(threeMinors.includes(2));
const Pplus=scale(.5,add(I,R)),Pminus=scale(.5,add(I,scale(-1,R)));
assert.ok(Pplus.flat().some(x=>Math.abs(x)===.5));assert.ok(Pminus.flat().some(x=>Math.abs(x)===.5));

const Phandle=[[1,1,-1,-1],[0,-1,0,1],[1,0,1,0],[0,1,0,1]];
const Pside=[[1,1,0,0],[0,0,1,1],[1,-1,-1,1],[0,0,1,-1]];
const sidebandEigenMatrix=mm(mm(inverse(Pside),Phandle),E);
assert.ok(sidebandEigenMatrix.flat().every(Number.isInteger));assert.equal(Math.abs(det(sidebandEigenMatrix)),4);
const twiceInverse=scale(2,inverse(sidebandEigenMatrix));assert.ok(twiceInverse.flat().every(x=>Math.abs(x-Math.round(x))<1e-10));
const encode=x=>x[0]+2*x[1]+4*x[2]+8*x[3];
const residueColumns=transpose(sidebandEigenMatrix).map(col=>encode(col.map(x=>mod2(x))));
function mod2(x){return ((x%2)+2)%2;}
const nonzero=[...new Set(residueColumns)].filter(Boolean),dualSaturationPlane=[0,nonzero[0],nonzero[1],nonzero[0]^nonzero[1]].sort((a,b)=>a-b);
const selectedCommonModePlane=[0,3,12,15];
assert.deepEqual(dualSaturationPlane,[0,7,11,12]);assert.notDeepEqual(dualSaturationPlane,selectedCommonModePlane);
const Kpair=[[0,0,0,1],[0,0,1,0],[0,1,0,0],[1,0,0,0]],bits=n=>[n&1,(n>>1)&1,(n>>2)&1,(n>>3)&1];
const pair=(a,b)=>{const x=bits(a),y=bits(b);let s=0;for(let i=0;i<4;i++)for(let j=0;j<4;j++)s+=x[i]*Kpair[i][j]*y[j];return mod2(s);};
assert.ok(dualSaturationPlane.every(a=>dualSaturationPlane.every(b=>pair(a,b)===0)));

// For constant bivectors, every Schouten bracket vanishes; the recursion has zero Nijenhuis torsion.
const pencilDeterminant='det(J-lambda Omega)=(1-lambda^2)^2';
console.log(JSON.stringify({
  protocol:'bisymplectic-recursion-index-four-eigenlattice/1',
  recursionOperator:R,
  algebra:{R2:'I',G2:'-I',RG:'-GR',K2:'I',structure:'split-quaternionic / para-hypercomplex'},
  eigenspaces:{plusBasis:Eplus,minusBasis:Eminus,gradedOperatorExchange:'G Eplus = Eminus epsilon',omegaRestrictions:{plus:Oplus,minus:Ominus,cross}},
  integralSeam:{combinedEigenbasis:E,index:Math.abs(det(E)),smithInvariants:[1,1,2,2],quotient:'C2 plus C2',halfIntegralProjectors:true},
  crossCoordinateAudit:{sidebandEigenMatrix,dualSaturationBasis:'one-half times sidebandEigenMatrix',dualSaturationPlane,selectedCommonModePlane,planesEqual:false,dualPlaneSymplecticallyAdmissible:true},
  pencil:{formula:'J-lambda Omega = Omega (R-lambda I)',determinant:pencilDeterminant,degenerateAt:[-1,1],poissonCompatibility:'Both inverse bivectors are constant, so their Schouten bracket vanishes.',nijenhuisTorsion:'zero because R is constant'},
  theorem:'The two pairings form a constant compatible bi-Hamiltonian pair whose recursion involution splits the carrier into two symplectic faces exchanged by G; the integral eigenlattice sum has index four.',
  boundary:'The index and Smith class match the earlier saturation seam, but equality with the physically selected lattice requires an explicit coordinate/lattice intertwiner and is not claimed.',
  passed:true
},null,2));
