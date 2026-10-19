import assert from 'node:assert/strict';

const rho=0.04110225473981188;
const uniformRatioThreshold=rho/(1+rho);
const loop=1/(16*Math.PI*Math.PI);
const y=[1,.02,.005,.001];
const n=4;
const offdiag=(scale)=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?0:scale*y[i]*y[j]));
const addDiag=(E,d)=>E.map((r,i)=>r.map((x,j)=>x+(i===j?d[i]:0)));
const frob=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0));
const rowBound=A=>Math.max(...A.map(r=>r.reduce((s,x)=>s+Math.abs(x),0)));
const envelope=scale=>{
  const sum2=y.reduce((s,x)=>s+x*x,0),sum4=y.reduce((s,x)=>s+x**4,0);
  const F=scale*Math.sqrt(sum2*sum2-sum4);
  const R=scale*Math.max(...y.map((x,i)=>x*y.reduce((s,z,j)=>s+(i===j?0:z),0)));
  return{frobenius:F,maxRowSum:R,bestElementary:Math.min(F,R)};
};

const jacobi=input=>{
  const A=input.map(r=>[...r]),V=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
  for(let iter=0;iter<200;iter++){
    let p=0,q=1,m=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(Math.abs(A[i][j])>m){m=Math.abs(A[i][j]);p=i;q=j;}
    if(m<1e-14)break;
    const phi=.5*Math.atan2(2*A[p][q],A[q][q]-A[p][p]),c=Math.cos(phi),s=Math.sin(phi);
    const R=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));R[p][p]=c;R[q][q]=c;R[p][q]=s;R[q][p]=-s;
    const mm=(X,Y)=>X.map(r=>Y[0].map((_,j)=>r.reduce((z,x,k)=>z+x*Y[k][j],0)));
    const T=R[0].map((_,j)=>R.map(r=>r[j]));
    const B=mm(mm(T,A),R);for(let i=0;i<n;i++)for(let j=0;j<n;j++)A[i][j]=B[i][j];
    const W=mm(V,R);for(let i=0;i<n;i++)for(let j=0;j<n;j++)V[i][j]=W[i][j];
  }
  return{values:A.map((r,i)=>r[i]),vectors:V};
};
const audit=(name,diagonal)=>{
  const E=offdiag(loop),K=addDiag(E,diagonal),ev=jacobi(K);
  const assignments=[];
  for(let f=0;f<n;f++){
    let best=0,overlap=-1;for(let j=0;j<n;j++){const z=Math.abs(ev.vectors[f][j]);if(z>overlap){overlap=z;best=j;}}
    assignments.push({channel:f,eigenvector:best,absoluteOverlap:overlap,projectorDistance:Math.sqrt(1-overlap*overlap),passes:Math.sqrt(1-overlap*overlap)<rho});
  }
  const gaps=[];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)gaps.push(Math.abs(diagonal[i]-diagonal[j]));
  const gamma=Math.min(...gaps),env=envelope(loop);
  return{name,diagonal,gamma,operatorNormEnvelope:env.bestElementary,envelopeToGap:env.bestElementary/gamma,uniformBoundPass:env.bestElementary/gamma<uniformRatioThreshold,eigenvalues:ev.values,assignments};
};
const separated=audit('illustrative separated thresholds',[0,1,2,3]);
const near=audit('illustrative u-d near-degeneracy',[0,1e-6,2,3]);
assert.ok(separated.uniformBoundPass&&separated.assignments.every(x=>x.passes));
assert.ok(!near.uniformBoundPass&&near.assignments.slice(0,2).some(x=>!x.passes));
const env=envelope(loop),E=offdiag(loop);
assert.ok(frob(E)<=env.frobenius+1e-15&&rowBound(E)<=env.maxRowSum+1e-15);

console.log(JSON.stringify({
  protocol:'four-channel-quadratic-spurion-response-envelope/1',
  model:'E_fg=cmax y_f y_g for f!=g, real representative; general complex coefficients satisfy the same magnitude envelopes when |c_fg|<=cmax.',
  coefficientScale:loop,
  illustrativeYukawaMagnitudes:y,
  exactElementaryEnvelopes:{
    frobenius:'cmax sqrt((sum |y_f|^2)^2-sum |y_f|^4)',
    maxRowSum:'cmax max_f |y_f| sum_{g!=f}|y_g|',
    takeMinimum:true,
    values:env,
  },
  uniformOrientationRatioThreshold:uniformRatioThreshold,
  audits:[separated,near],
  conclusion:'Quadratic spurion suppression can make a connected response safely approximate-diagonal when thresholds are separated, but the same edge matrix fails near a sufficiently small diagonal gap.',
  boundary:'The numerical Yukawa vector, common coefficient and loop factor are illustrative dimensionless inputs, not a Standard-Model anomalous-dimension calculation. The formulas, bounds and diagonalizations are the result.',
  passed:true,
},null,2));
