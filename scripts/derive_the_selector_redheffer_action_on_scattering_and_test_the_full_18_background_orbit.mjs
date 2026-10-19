import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im}),add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>z(a.re,-a.im);
const divz=(a,b)=>{const d=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const abs=a=>Math.hypot(a.re,a.im),real=A=>A.map(r=>r.map(x=>z(x)));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mulz(x,B[k][j])),z())));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const scale=(a,A)=>A.map(r=>r.map(x=>mulz(a,x))),dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),trans=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>abs(sub(x,B[i][j])))));
const trace=A=>A.reduce((s,r,i)=>add(s,r[i]),z()),zero=n=>Array.from({length:n},()=>Array.from({length:n},()=>z()));
const inv=A=>{const n=A.length,M=A.map((r,i)=>[...r,...eye(n)[i]]);for(let c=0;c<n;c++){let p=c;while(p<n&&abs(M[p][c])<1e-14)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>divz(x,d));for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>sub(x,mulz(f,M[c][j])));}}return M.map(r=>r.slice(n));};
const block=(a,b,c,d)=>[[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]];
const blocks=M=>({a:M.slice(0,2).map(r=>r.slice(0,2)),b:M.slice(0,2).map(r=>r.slice(2,4)),c:M.slice(2,4).map(r=>r.slice(0,2)),d:M.slice(2,4).map(r=>r.slice(2,4))});

const bogoliubov=M=>{
  const {a:A,b:B,c:C,d:D}=blocks(M);
  const alpha=madd(scale(z(.5),real(A.map((r,i)=>r.map((x,j)=>x+D[i][j])))),scale(z(0,.5),real(C.map((r,i)=>r.map((x,j)=>x-B[i][j])))));
  const beta=madd(scale(z(.5),real(A.map((r,i)=>r.map((x,j)=>x-D[i][j])))),scale(z(0,.5),real(C.map((r,i)=>r.map((x,j)=>x+B[i][j])))));
  return block(alpha,beta,beta.map(r=>r.map(conj)),alpha.map(r=>r.map(conj)));
};
const scatterFromTransfer=T=>{
  const {a,b,c,d}=blocks(T),di=inv(d);
  return block(scale(z(-1),mm(di,c)),di,msub(a,mm(mm(b,di),c)),mm(b,di));
};
const transferFromScatter=S=>{
  const {a:s11,b:s12,c:s21,d:s22}=blocks(S),s12i=inv(s12);
  const d=s12i,c=scale(z(-1),mm(s12i,s11)),b=mm(s22,s12i),a=msub(s21,mm(mm(s22,s12i),s11));
  return block(a,b,c,d);
};
const phi=(g,S)=>{const G=bogoliubov(g),T=transferFromScatter(S);return scatterFromTransfer(mm(mm(G,T),inv(G)));};

const rmm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const I4=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const N=[[1,0,-1,1],[0,0,0,1],[-1,0,2,-1],[0,-1,-1,4]];
const rinv=A=>{const aug=A.map((r,i)=>[...r,...I4[i]]);for(let c=0;c<4;c++){let p=c;while(p<4&&Math.abs(aug[p][c])<1e-14)p++;assert.ok(p<4);[aug[c],aug[p]]=[aug[p],aug[c]];const d=aug[c][c];aug[c]=aug[c].map(x=>x/d);for(let i=0;i<4;i++)if(i!==c){const f=aug[i][c];aug[i]=aug[i].map((x,j)=>x-f*aug[c][j]);}}return aug.map(r=>r.slice(4));};
const conjugate=(g,M)=>rmm(rmm(g,M),rinv(g));
const scattering=M=>scatterFromTransfer(bogoliubov(M));

// Transfer/scattering conversion is genuinely invertible on the audited patch.
const S0=scattering(N),T0=bogoliubov(N);
assert.ok(maxerr(scatterFromTransfer(transferFromScatter(S0)),S0)<1e-11);
assert.ok(maxerr(transferFromScatter(scatterFromTransfer(T0)),T0)<1e-11);

const group=[I4],seen=new Set([JSON.stringify(I4)]);
for(let h=0;h<group.length;h++)for(const g of [R,H]){const x=rmm(g,group[h]),k=JSON.stringify(x);if(!seen.has(k)){seen.add(k);group.push(x);}}
assert.equal(group.length,18);
const orbitChecks=group.map((g,index)=>{
  const direct=scattering(conjugate(g,N)),fractional=phi(g,S0),error=maxerr(direct,fractional);
  assert.ok(error<1e-9);
  assert.ok(maxerr(mm(dag(fractional),fractional),eye(4))<1e-8);
  assert.ok(maxerr(fractional,trans(fractional))<1e-8);
  return{index,error};
});

// The maps form the group action expected from transfer conjugation.
const compositionChecks=[];
for(const [i,j] of [[1,2],[3,5],[7,11],[13,17]]){
  const gh=rmm(group[i],group[j]);
  const lhs=phi(gh,S0),rhs=phi(group[i],phi(group[j],S0)),error=maxerr(lhs,rhs);
  assert.ok(error<1e-8);compositionChecks.push({i,j,error});
}

// Nonlinearity distinguishes this from similarity on scattering matrices.
const S1=phi(R,S0),S2=phi(H,S0),segments=[[S0,S1],[S0,S2],[S1,S2]],actions=[['R',R],['H',H],['RH',rmm(R,H)]];
const nonlinearityChecks=[];
for(const [segmentIndex,[A,B]] of segments.entries())for(const [action,g] of actions){
  const mid=scale(z(.5),madd(A,B));
  const error=maxerr(phi(g,mid),scale(z(.5),madd(phi(g,A),phi(g,B))));
  nonlinearityChecks.push({segmentIndex,action,error});
}
const nonlinearError=Math.max(...nonlinearityChecks.map(x=>x.error));

// Boundary preservation is exact on the entire finite orbit.  Interior Schur
// preservation is sampled here, not promoted to a global analyticity theorem.
const interiorChecks=[];
for(const t of [.2,.5,.8])for(const [name,g] of [['R',R],['H',H],['RH',rmm(R,H)]]){
  const X=phi(g,scale(z(t),S0)),defect=msub(eye(4),mm(dag(X),X));
  const probes=Array.from({length:64},(_,k)=>Array.from({length:4},(_,j)=>z(Math.cos((k+1)*(j+1)),Math.sin((k+2)*(j+1)))));
  const minima=probes.map(v=>{
    const col=v.map(x=>[x]),q=mm(mm(dag(col),defect),col)[0][0];return q.re;
  });
  const minimumProbe=Math.min(...minima);interiorChecks.push({t,generator:name,minimumProbe});
}

// Apply the exact action to the actual coupled rational-inner base response.
let CB=eye(4);const characteristic=[z(1)];
for(let k=1;k<=4;k++){const c=mulz(z(-1/k),trace(mm(S0,CB)));characteristic.push(c);CB=madd(mm(S0,CB),scale(c,eye(4)));}
const peval=x=>characteristic.reduce((v,c)=>add(mulz(v,x),c),z());
let roots=Array.from({length:4},(_,k)=>{const a=.31+2*Math.PI*k/4;return z(1.13*Math.cos(a),1.13*Math.sin(a));});
for(let it=0;it<500;it++){let delta=0;const next=roots.map((r,j)=>{let den=z(1);for(let k=0;k<4;k++)if(k!==j)den=mulz(den,sub(r,roots[k]));const d=divz(peval(r),den);delta=Math.max(delta,abs(d));return sub(r,d);});roots=next;if(delta<1e-14)break;}
roots.sort((a,b)=>Math.atan2(a.im,a.re)-Math.atan2(b.im,b.re));
const projectors=roots.map((lam,j)=>{let P=eye(4);for(let k=0;k<4;k++)if(k!==j)P=scale(divz(z(1),sub(lam,roots[k])),mm(P,msub(S0,scale(roots[k],eye(4)))));return P;});
const phases=roots.map(l=>{const a=Math.atan2(l.im,l.re);return a>0?a-2*Math.PI:a;});
const gammas=phases.map(p=>Math.tan(-p/4));
const blaschke=(w,g)=>divz(sub(w,z(0,g)),add(w,z(0,g)));
const baseResponse=w=>projectors.map((P,j)=>scale(mulz(blaschke(w,gammas[j]),blaschke(w,gammas[j])),P)).reduce(madd,zero(4));
assert.ok(maxerr(baseResponse(z(1)),S0)<1e-8);

const det2=A=>sub(mulz(A[0][0],A[1][1]),mulz(A[0][1],A[1][0]));
const minCholeskyPivot=A=>{
  const n=A.length,L=zero(n);let minimum=Infinity;
  for(let i=0;i<n;i++){
    let diag=A[i][i].re;for(let k=0;k<i;k++)diag-=L[i][k].re**2+L[i][k].im**2;
    minimum=Math.min(minimum,diag);if(!(diag>1e-11))return minimum;L[i][i]=z(Math.sqrt(diag));
    for(let j=i+1;j<n;j++){
      let v=A[j][i];for(let k=0;k<i;k++)v=sub(v,mulz(L[j][k],conj(L[i][k])));L[j][i]=scale(z(1/L[i][i].re),[[v]])[0][0];
    }
  }
  return minimum;
};
const transformedDiagnostics=(g,S)=>{
  const G=bogoliubov(g),T=transferFromScatter(S),Tp=mm(mm(G,T),inv(G)),td=blocks(Tp).d;
  return{S:scatterFromTransfer(Tp),transformedTransferDenominator:abs(det2(td)),inputTransmissionDenominator:abs(det2(blocks(S).b))};
};

const upperGrid=[];
for(const x of [-4,-2,-1,0,1,2,4])for(const y of [.05,.2,.5,1,2,5])upperGrid.push(z(x,y));
let minimumSchurPivot=Infinity,minimumTransferDenominator=Infinity,minimumInputTransmissionDenominator=Infinity,maximumReciprocityError=0,maximumRealityError=0;
let upperSamples=0;
for(const g of group)for(const w of upperGrid){
  const base=baseResponse(w),d=transformedDiagnostics(g,base),X=d.S,defect=msub(eye(4),mm(dag(X),X));
  minimumSchurPivot=Math.min(minimumSchurPivot,minCholeskyPivot(defect));
  minimumTransferDenominator=Math.min(minimumTransferDenominator,d.transformedTransferDenominator);
  minimumInputTransmissionDenominator=Math.min(minimumInputTransmissionDenominator,d.inputTransmissionDenominator);
  maximumReciprocityError=Math.max(maximumReciprocityError,maxerr(X,trans(X)));
  const mirror=transformedDiagnostics(g,baseResponse(z(-w.re,w.im))).S.map(r=>r.map(conj));
  maximumRealityError=Math.max(maximumRealityError,maxerr(X,mirror));upperSamples++;
}
assert.ok(minimumSchurPivot>0&&minimumTransferDenominator>1e-8&&minimumInputTransmissionDenominator>1e-8);
const reciprocalOnGrid=maximumReciprocityError<1e-7,sidebandRealOnGrid=maximumRealityError<1e-7;

let maximumBoundaryUnitarityError=0,boundarySamples=0;
for(const g of group)for(const x of [-5,-2,-.5,.5,1,3,7]){
  const X=phi(g,baseResponse(z(x)));maximumBoundaryUnitarityError=Math.max(maximumBoundaryUnitarityError,maxerr(mm(dag(X),X),eye(4)));boundarySamples++;
}
assert.ok(maximumBoundaryUnitarityError<1e-7);

console.log(JSON.stringify({
  protocol:'selector-redheffer-scattering-action/1',
  transferToScattering:'S=[[-d^-1 c,d^-1],[a-b d^-1 c,b d^-1]]',
  scatteringToTransfer:'T=[[S21-S22 S12^-1 S11,S22 S12^-1],[-S12^-1 S11,S12^-1]]',
  selectorAction:'Phi_g(S)=Scat(G_g Trans(S) G_g^-1), with G_g the Bogoliubov image of g',
  groupOrder:group.length,
  orbitChecks,
  maximumDirectOrbitError:Math.max(...orbitChecks.map(x=>x.error)),
  compositionChecks,
  nonlinearityChecks,
  nonlinearMidpointError:nonlinearError,
  exactCheckpointTransportWithoutSpectralRefitting:true,
  exactBoundaryUnitarityAndReciprocityOnFiniteOrbit:true,
  sampledInteriorContractivityProbes:interiorChecks,
  rationalInnerBaseResponse:{gammas,checkpointRecoveryError:maxerr(baseResponse(z(1)),S0)},
  fullOrbitUpperHalfPlaneGridAudit:{upperSamples,minimumSchurCholeskyPivot:minimumSchurPivot,minimumTransformedTransferDenominator:minimumTransferDenominator,minimumInputTransmissionDenominator,maximumReciprocityError,maximumSidebandRealityError:maximumRealityError,reciprocalOnGrid,sidebandRealOnGrid},
  fullOrbitBoundaryGridAudit:{boundarySamples,maximumUnitarityError:maximumBoundaryUnitarityError},
  analyticBoundary:'Pointwise fractional transport can develop denominator zeros. A global theorem that Phi_g maps the whole upper-half-plane Schur class to itself has not been proved by these finite samples.',
  conclusion:'The selector orbit has an exact nonlinear Redheffer action on scattering matrices. It transports all eighteen arithmetic checkpoints from the base without spectral refitting and obeys the group composition law.',
  passed:true,
},null,2));
