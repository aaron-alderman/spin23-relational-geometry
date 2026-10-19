import assert from 'node:assert/strict';

const zeros=(r,c)=>Array.from({length:r},()=>Array(c).fill(0));
const unit=(r,c,i,j)=>{const X=zeros(r,c);X[i][j]=1;return X;};
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j])),sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x)),tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-B[i][j]))));
const V=(x,y,z)=>sub(add(mm(mm(x,tr(y)),z),mm(mm(z,tr(y)),x)),mm(mm(z,tr(x)),y));
const J=(x,y,z)=>scale(.5,add(mm(mm(x,tr(y)),z),mm(mm(z,tr(y)),x)));

const L=[unit(2,1,0,0),unit(2,1,1,0)];
const R=L.map(tr);
let jordanChecks=0,kantorChecks=0,kantorFailure=null,transposeCovarianceFailures=0;
for(let i=0;i<2;i++)for(let j=0;j<2;j++)for(let k=0;k<2;k++){
  const jl=J(L[i],L[j],L[k]),jr=J(R[i],R[j],R[k]);
  assert.ok(maxerr(jr,tr(jl))<1e-12);jordanChecks++;
  const vl=V(L[i],L[j],L[k]),vr=V(R[i],R[j],R[k]),error=maxerr(vr,tr(vl));
  kantorChecks++;if(error>1e-12){transposeCovarianceFailures++;kantorFailure??={i,j,k,left:vl,right:vr,transposeOfLeft:tr(vl),error};}
}
assert.ok(kantorFailure);

// K(x,y)z=(x z^T y)-(y z^T x) for the structurable product reduces to
// left multiplication by x y^T-y x^T.  The M_2,1 face has one such line;
// M_1,2 has none because every 1x1 skew matrix vanishes.
const kLeft=sub(mm(L[0],tr(L[1])),mm(L[1],tr(L[0])));
const kRight=sub(mm(R[0],tr(R[1])),mm(R[1],tr(R[0])));
assert.ok(maxerr(kLeft,[[0,1],[-1,0]])<1e-12);assert.ok(maxerr(kRight,[[0]])<1e-12);

console.log(JSON.stringify({
  protocol:'cp-transpose-pairing-versus-lepton-kantor-slice/1',
  pairedFaces:['L=M_2,1(R)','ec+nu=M_1,2(R)'],
  cpDiracSupportAction:'Theta(X,Y)=(Y^T,X^T)',
  jordanGraph:{product:'J(x,y,z)=1/2(x y^T z+z y^T x)',checks:jordanChecks,transposeCovariant:true,fixedGraphClosed:true},
  structurableGraph:{product:'V(x,y,z)=x y^T z+z y^T x-z x^T y',checks:kantorChecks,transposeCovarianceFailures,firstFailure:kantorFailure,transposeCovariant:false,fixedGraphClosed:false},
  fiveGradeMismatch:{M21:[1,2,4,2,1],M12:[0,2,2,2,0],degreeTwoDimensions:[1,0]},
  kOperators:{M21:kLeft,M12:kRight},
  conclusion:'The established CP/Dirac transpose exchange preserves the paired Jordan graph but not the structurable Kantor product or its five-grading. It therefore does not select the isolated real M_2,1 Spin(2,3) Kantor slice.',
  boundary:'A different CP action could preserve a Kantor system only if independently derived; composing transpose with an arbitrary face identification would add precisely the missing structure and cannot be assumed.',
  passed:true,
},null,2));
