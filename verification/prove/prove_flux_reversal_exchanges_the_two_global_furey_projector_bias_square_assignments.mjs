import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im}),add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),divz=(a,b)=>{const d=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const conj=a=>z(a.re,-a.im),abs=a=>Math.hypot(a.re,a.im),eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const mmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mulz(x,B[k][j])),z())));
const cconj=A=>A.map(r=>r.map(conj)),scale=(a,A)=>A.map(r=>r.map(x=>mulz(a,x)));
const trace=A=>A.reduce((s,r,i)=>add(s,r[i]),z()),q=(re,im=0)=>z(re/85,im/85);
const S=[[q(21,-52),q(-18,-4),q(58,-6),q(4,-18)],[q(-18,-4),q(64,-33),q(11,-7),q(33,-21)],[q(58,-6),q(11,-7),q(-26,-53),q(7,11)],[q(4,-18),q(33,-21),q(7,11),q(-64,33)]];
let B=eye(4);const coeff=[z(1)];for(let k=1;k<=4;k++){const c=mulz(z(-1/k),trace(mmul(S,B)));coeff.push(c);B=madd(mmul(S,B),scale(c,eye(4)));}
const peval=x=>coeff.reduce((v,c)=>add(mulz(v,x),c),z());
let roots=Array.from({length:4},(_,k)=>{const a=.31+2*Math.PI*k/4;return z(1.13*Math.cos(a),1.13*Math.sin(a));});
for(let it=0;it<500;it++){let dmax=0;const next=roots.map((r,j)=>{let den=z(1);for(let k=0;k<4;k++)if(k!==j)den=mulz(den,sub(r,roots[k]));const d=divz(peval(r),den);dmax=Math.max(dmax,abs(d));return sub(r,d);});roots=next;if(dmax<1e-14)break;}
roots.sort((a,b)=>Math.atan2(a.im,a.re)-Math.atan2(b.im,b.re));
const P=roots.map((lam,j)=>{let X=eye(4);for(let k=0;k<4;k++)if(k!==j)X=scale(divz(z(1),sub(lam,roots[k])),mmul(X,msub(S,scale(roots[k],eye(4)))));return X;});
const Xflux=[[z(),z(),z(1),z()],[z(),z(),z(),z(1)],[z(1),z(),z(),z()],[z(),z(1),z(),z()]];
const transform=Q=>mmul(mmul(Xflux,cconj(Q)),Xflux);
const weights=Q=>{const d=Q.map((r,i)=>r[i].re);return{handle:d[0]+d[2],left:d[0]+d[1]};};
const audits=P.map((Q,j)=>{const before=weights(Q),after=weights(transform(Q));assert.ok(Math.abs(after.handle-before.handle)<1e-10);assert.ok(Math.abs(after.left-(1-before.left))<1e-10);return{projector:j,before,after,cellBefore:(before.handle>.5?'C':'D')+(before.left>.5?'L':'R'),cellAfter:(after.handle>.5?'C':'D')+(after.left>.5?'L':'R')};});
assert.deepEqual(audits.map(x=>[x.cellBefore,x.cellAfter]),[['CR','CL'],['CL','CR'],['DL','DR'],['DR','DL']]);

const upToLeft={u:'CL',e:'CR',d:'DR',nu:'DL'};
const upToRight={u:'CR',e:'CL',d:'DL',nu:'DR'};
const flipCell=c=>c[0]+(c[1]==='L'?'R':'L');
for(const f of Object.keys(upToLeft))assert.equal(flipCell(upToLeft[f]),upToRight[f]);

console.log(JSON.stringify({
  protocol:'flux-reversal-action-on-bias-square-orientation/1',
  antiunitary:'Theta=X K with X swapping left/right propagation blocks',
  projectorWeightAudits:audits,
  biasCellAction:{CL:'CR',CR:'CL',DL:'DR',DR:'DL'},
  candidateAssignments:{upToLeft,upToRight},
  assignmentsExchangedByFluxReversal:true,
  fixedAssignmentUnderFluxReversal:false,
  conclusion:'Flux reversal preserves handle bias and reverses side bias, so it exchanges the two global Furey-to-projector assignments. The remaining Z2 is an orientation torsor, not a choice selected by reversal symmetry.',
  boundary:'The transformed projector need not be another eigenprojector of the same fixed checkpoint; document 785 rules out that permutation. The exact statement is about bias-cell orientation and the covariant response family. A retarded/advanced boundary condition or physical time orientation is needed to choose a representative.',
  passed:true,
},null,2));
