import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im}),add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>z(a.re,-a.im);
const divz=(a,b)=>{const d=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const abs=a=>Math.hypot(a.re,a.im),eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const mmulc=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mulz(x,B[k][j])),z())));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),trans=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const cconj=A=>A.map(r=>r.map(conj)),scale=(a,A)=>A.map(r=>r.map(x=>mulz(a,x)));
const trace=A=>A.reduce((s,r,i)=>add(s,r[i]),z()),maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>abs(sub(x,B[i][j])))));
const block=(a,b,c,d)=>[[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]];
const inv2=A=>{const d=sub(mulz(A[0][0],A[1][1]),mulz(A[0][1],A[1][0]));return [[divz(A[1][1],d),divz(z(-A[0][1].re,-A[0][1].im),d)],[divz(z(-A[1][0].re,-A[1][0].im),d),divz(A[0][0],d)]];};
const real=A=>A.map(r=>r.map(x=>z(x)));

const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const I4=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const N=[[1,0,-1,1],[0,0,0,1],[-1,0,2,-1],[0,-1,-1,4]];
const key=JSON.stringify;
const inv=A=>{const aug=A.map((r,i)=>[...r,...I4[i]]);for(let c=0;c<4;c++){let p=c;while(p<4&&aug[p][c]===0)p++;assert.ok(p<4);[aug[c],aug[p]]=[aug[p],aug[c]];const d=aug[c][c];aug[c]=aug[c].map(x=>x/d);for(let i=0;i<4;i++)if(i!==c){const f=aug[i][c];aug[i]=aug[i].map((x,j)=>x-f*aug[c][j]);}}return aug.map(r=>r.slice(4));};
const group=[I4],seen=new Set([key(I4)]);
for(let h=0;h<group.length;h++)for(const g of [R,H]){const x=mul(g,group[h]),k=key(x);if(!seen.has(k)){seen.add(k);group.push(x);}}
assert.equal(group.length,18);
const orbit=[];const orbitSeen=new Set();
for(const g of group){const X=mul(mul(g,N),inv(g)),k=key(X);if(!orbitSeen.has(k)){orbitSeen.add(k);orbit.push(X);}}
assert.equal(orbit.length,18);

const scattering=M=>{
  const A=M.slice(0,2).map(r=>r.slice(0,2)),B=M.slice(0,2).map(r=>r.slice(2,4));
  const C=M.slice(2,4).map(r=>r.slice(0,2)),D=M.slice(2,4).map(r=>r.slice(2,4));
  const alpha=madd(scale(z(.5),real(A.map((r,i)=>r.map((x,j)=>x+D[i][j])))),scale(z(0,.5),real(C.map((r,i)=>r.map((x,j)=>x-B[i][j])))));
  const beta=madd(scale(z(.5),real(A.map((r,i)=>r.map((x,j)=>x-D[i][j])))),scale(z(0,.5),real(C.map((r,i)=>r.map((x,j)=>x+B[i][j])))));
  const a=alpha,b=beta,c=cconj(beta),d=cconj(alpha),di=inv2(d);
  return block(scale(z(-1),mmulc(di,c)),di,msub(a,mmulc(mmulc(b,di),c)),mmulc(b,di));
};
const spectralProjectors=S=>{
  let B=eye(4);const coeff=[z(1)];
  for(let k=1;k<=4;k++){const c=mulz(z(-1/k),trace(mmulc(S,B)));coeff.push(c);B=madd(mmulc(S,B),scale(c,eye(4)));}
  const peval=x=>coeff.reduce((v,c)=>add(mulz(v,x),c),z());
  let roots=Array.from({length:4},(_,k)=>{const a=.29+2*Math.PI*k/4;return z(1.11*Math.cos(a),1.11*Math.sin(a));});
  for(let it=0;it<600;it++){let delta=0;const next=roots.map((r,j)=>{let den=z(1);for(let k=0;k<4;k++)if(k!==j)den=mulz(den,sub(r,roots[k]));const d=divz(peval(r),den);delta=Math.max(delta,abs(d));return sub(r,d);});roots=next;if(delta<1e-13)break;}
  roots.sort((a,b)=>Math.atan2(a.im,a.re)-Math.atan2(b.im,b.re));
  for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)assert.ok(abs(sub(roots[i],roots[j]))>1e-5);
  const projectors=roots.map((lam,j)=>{let P=eye(4);for(let k=0;k<4;k++)if(k!==j)P=scale(divz(z(1),sub(lam,roots[k])),mmulc(P,msub(S,scale(roots[k],eye(4)))));assert.ok(maxerr(P,dag(P))<1e-7);return P;});
  return{roots,projectors};
};

const audits=orbit.map((M,index)=>{
  const S=scattering(M);assert.ok(maxerr(mmulc(dag(S),S),eye(4))<1e-8);
  const {roots,projectors:P}=spectralProjectors(S);
  const cells=P.map((X,j)=>{const d=X.map((r,i)=>r[i].re),h=d[0]+d[2],s=d[0]+d[1];return{j,handleWeight:h,leftWeight:s,handle:h>.5?'C':'D',side:s>.5?'L':'R',margin:Math.min(Math.abs(h-.5),Math.abs(s-.5))};});
  const fullSquare=new Set(cells.map(x=>x.handle+x.side)).size===4;
  const orientationScore=cells.reduce((s,x)=>s+Math.abs(2*x.leftWeight-1),0);
  assert.ok(orientationScore>0);
  return{index,fullSquare,minMargin:Math.min(...cells.map(x=>x.margin)),orientationScore,eigenvalues:roots,cells};
});
const full=audits.filter(x=>x.fullSquare);
const failures=audits.filter(x=>!x.fullSquare);

console.log(JSON.stringify({
  protocol:'selector-orbit-projector-bias-square-audit/1',
  selectorBackgrounds:audits.length,
  backgroundsWithFullHandleSideBiasSquare:full.length,
  backgroundsWithoutFullSquare:failures.length,
  minimumMarginAcrossFullSquares:full.length?Math.min(...full.map(x=>x.minMargin)):null,
  orientationOddScoreRange:full.length?{minimum:Math.min(...full.map(x=>x.orientationScore)),maximum:Math.max(...full.map(x=>x.orientationScore))}:null,
  audits,
  conclusion:full.length===audits.length?'The handle-by-side bias square survives all 18 selector backgrounds.':'The bias square is background-dependent and fails on part of the 18-point selector orbit.',
  boundary:'The audit uses the fixed complex polarization and scattering-port convention at every conjugate carrier word. A physical transport of the polarization/ports could alter the comparison.',
  passed:true,
},null,2));
