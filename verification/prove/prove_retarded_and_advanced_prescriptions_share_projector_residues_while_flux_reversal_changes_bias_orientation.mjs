import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im}),add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),divz=(a,b)=>{const d=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const conj=a=>z(a.re,-a.im),abs=a=>Math.hypot(a.re,a.im),eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const mmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mulz(x,B[k][j])),z())));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),cconj=A=>A.map(r=>r.map(conj));
const scale=(a,A)=>A.map(r=>r.map(x=>mulz(a,x))),trace=A=>A.reduce((s,r,i)=>add(s,r[i]),z());
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>abs(sub(x,B[i][j])))));
const q=(re,im=0)=>z(re/85,im/85);
const S=[[q(21,-52),q(-18,-4),q(58,-6),q(4,-18)],[q(-18,-4),q(64,-33),q(11,-7),q(33,-21)],[q(58,-6),q(11,-7),q(-26,-53),q(7,11)],[q(4,-18),q(33,-21),q(7,11),q(-64,33)]];
let B=eye(4);const coeff=[z(1)];for(let k=1;k<=4;k++){const c=mulz(z(-1/k),trace(mmul(S,B)));coeff.push(c);B=madd(mmul(S,B),scale(c,eye(4)));}
const peval=x=>coeff.reduce((v,c)=>add(mulz(v,x),c),z());
let roots=Array.from({length:4},(_,k)=>{const a=.31+2*Math.PI*k/4;return z(1.13*Math.cos(a),1.13*Math.sin(a));});
for(let it=0;it<500;it++){let dmax=0;const next=roots.map((r,j)=>{let den=z(1);for(let k=0;k<4;k++)if(k!==j)den=mulz(den,sub(r,roots[k]));const d=divz(peval(r),den);dmax=Math.max(dmax,abs(d));return sub(r,d);});roots=next;if(dmax<1e-14)break;}
roots.sort((a,b)=>Math.atan2(a.im,a.re)-Math.atan2(b.im,b.re));
const P=roots.map((lam,j)=>{let X=eye(4);for(let k=0;k<4;k++)if(k!==j)X=scale(divz(z(1),sub(lam,roots[k])),mmul(X,msub(S,scale(roots[k],eye(4)))));assert.ok(maxerr(X,dag(X))<1e-9);return X;});

const poles=[2,4,7,11],weights=[1.2,.8,1.5,.6];
const H=w=>P.map((Q,j)=>scale(divz(z(weights[j]),sub(z(poles[j]),w)),Q)).reduce(madd);
for(const [x,y] of [[0,.3],[3,.7],[8,1.1]])assert.ok(maxerr(H(z(x,-y)),dag(H(z(x,y))))<1e-9);

// Retarded/advanced boundary prescriptions approach the same real pole from
// opposite sides and share the same positive residue matrix.
const eps=1e-6,residueChecks=P.map((Q,j)=>{
  const m=poles[j];
  const upper=scale(z(0,eps),H(z(m,eps))); // (m-z)=-i eps, so i eps H -> -? use direct Laurent below
  const recoveredUpper=scale(sub(z(m),z(m,eps)),H(z(m,eps)));
  const recoveredLower=scale(sub(z(m),z(m,-eps)),H(z(m,-eps)));
  const expected=scale(z(weights[j]),Q);
  assert.ok(maxerr(recoveredUpper,expected)<5e-5);
  assert.ok(maxerr(recoveredLower,expected)<5e-5);
  return{channel:j,pole:m,weight:weights[j],sameResidueFromUpperAndLower:true};
});

const X=[[z(),z(),z(1),z()],[z(),z(),z(),z(1)],[z(1),z(),z(),z()],[z(),z(1),z(),z()]];
const flux=Q=>mmul(mmul(X,cconj(Q)),X);
const participation=Q=>{const d=Q.map((r,i)=>r[i].re);return{handle:d[0]+d[2],left:d[0]+d[1]};};
const orientation=P.map((Q,j)=>{const a=participation(Q),b=participation(flux(Q));assert.ok(Math.abs(a.handle-b.handle)<1e-9);assert.ok(Math.abs(b.left-(1-a.left))<1e-9);return{channel:j,retardedAdvancedSupport:a,fluxReversedSupport:b};});

console.log(JSON.stringify({
  protocol:'retarded-advanced-versus-flux-orientation/1',
  spectralModel:'H(z)=sum_j R_j/(m_j-z), R_j=r_j P_j positive',
  retardedAdvancedRelation:'H(x-i0)=H(x+i0)^dagger',
  residueChecks,
  retardedAndAdvancedShareProjectorSupports:true,
  retardedAdvancedSelectDifferentBiasAssignments:false,
  fluxReversalPreservesHandleAndComplementsSide:true,
  orientation,
  conclusion:'Retarded and advanced prescriptions of one Hermitian positive spectral measure have the same pole projectors and therefore the same handle/side bias assignment. Spatial flux reversal changes the side orientation. Causal analyticity alone does not choose between the two Furey-to-projector maps.',
  boundary:'A physical scattering preparation may correlate retardedness with an incoming/outgoing port convention, but that correlation is extra boundary data and must be derived rather than inferred from the i0 prescription.',
  passed:true,
},null,2));
