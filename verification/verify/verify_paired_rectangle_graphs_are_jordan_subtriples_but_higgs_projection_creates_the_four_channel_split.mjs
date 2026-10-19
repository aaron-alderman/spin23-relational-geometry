import assert from 'node:assert/strict';

const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(c,A)=>A.map(r=>r.map(x=>c*x));
const triple=(X,Y,Z)=>scale(.5,add(mm(mm(X,transpose(Y)),Z),mm(mm(Z,transpose(Y)),X)));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-B[i][j]))));
const unit=(m,n,i,j)=>Array.from({length:m},(_,r)=>Array.from({length:n},(_,c)=>r===i&&c===j?1:0));

const samples=[
  {m:3,n:2,X:[[1,2],[3,5],[7,11]],Y:[[2,-1],[0,3],[4,1]],Z:[[5,0],[-2,1],[3,6]]},
  {m:2,n:1,X:[[1],[2]],Y:[[-3],[4]],Z:[[5],[-1]]},
];
const graphAudits=samples.map(({m,n,X,Y,Z})=>{
  const first=triple(X,Y,Z);
  const second=triple(transpose(X),transpose(Y),transpose(Z));
  const error=maxerr(second,transpose(first));
  assert.ok(error<1e-12);
  return{shape:[m,n],graphRealDimension:2*m*n,closureError:error};
});

// Higgs-selected coordinate subtriples are closed, but are not ideals of the
// undressed rectangular triple: mixed triples regenerate the other component.
const qDown=unit(3,2,0,0),qUp=unit(3,2,0,1);
assert.ok(maxerr(triple(qDown,qDown,qDown),qDown)<1e-12);
assert.ok(maxerr(triple(qUp,qUp,qUp),qUp)<1e-12);
const quarkCross=triple(qDown,qDown,qUp);
assert.ok(maxerr(quarkCross,scale(.5,qUp))<1e-12);

const nu=unit(2,1,0,0),electron=unit(2,1,1,0);
assert.ok(maxerr(triple(nu,nu,nu),nu)<1e-12);
assert.ok(maxerr(triple(electron,electron,electron),electron)<1e-12);
const leptonCross=triple(nu,nu,electron);
assert.ok(maxerr(leptonCross,scale(.5,electron))<1e-12);

console.log(JSON.stringify({
  protocol:'paired-rectangle-jordan-graph-and-higgs-split/1',
  involution:'Theta(X,Y)=(Y^T,X^T) on M_mn direct-sum M_nm over the real form',
  fixedGraph:'{(X,X^T)}',
  graphAudits,
  exactIdentity:'{X^T,Y^T,Z^T}={X,Y,Z}^T for the symmetrized rectangular triple',
  undressedCenter:'R^2 labels the quark paired rectangle and lepton paired rectangle; it does not label u,d,e,nu separately.',
  componentSubtriples:{
    quarkColumns:'The two Higgs-selected columns are individually closed rank-one rectangular subtriples.',
    leptonRows:'The two Higgs-selected weak components are individually closed one-dimensional subtriples.',
    notIdeals:'Mixed triples {down,down,up}=up/2 and {nu,nu,e}=e/2 prove the component subtriples are not ideals of the undressed triple.'
  },
  conclusion:'Left/right rectangle pairing is intrinsically Jordan-triple compatible. The four channel split is created only after Higgs component projection and external Gram packaging; it is not the center or an ideal quotient of the unbroken Furey triple.',
  boundary:'This verifies algebraic closure of the paired real graph, not a dynamical Higgs vacuum, a canonical normalization, or a map to the checkpoint spectral projectors.',
  passed:true,
},null,2));
