import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>z(a.re,-a.im);
const div=(a,b)=>{const d=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const scalez=(s,a)=>z(s*a.re,s*a.im),abs=a=>Math.hypot(a.re,a.im);
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const zero=n=>Array.from({length:n},()=>Array.from({length:n},()=>z()));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const mscale=(a,A)=>A.map(r=>r.map(x=>mul(a,x))),mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),z())));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),trans=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>abs(sub(x,B[i][j])))));
const trace=A=>A.reduce((s,r,i)=>add(s,r[i]),z());
const q=(re,im=0)=>z(re/85,im/85);
const S0=[
  [q(21,-52),q(-18,-4),q(58,-6),q(4,-18)],
  [q(-18,-4),q(64,-33),q(11,-7),q(33,-21)],
  [q(58,-6),q(11,-7),q(-26,-53),q(7,11)],
  [q(4,-18),q(33,-21),q(7,11),q(-64,33)],
];
assert.ok(maxerr(mm(dag(S0),S0),eye(4))<1e-12);
assert.ok(maxerr(S0,trans(S0))<1e-12);

// Walsh rows: 1,H,C,HC for atomic order u,nu,d,e.
const Hr=[[1,1,1,1],[1,-1,-1,1],[1,1,-1,-1],[1,-1,1,-1]].map(r=>r.map(x=>z(x/2)));
const parity=[1,1,-1,-1],Dchi=parity.map((x,i)=>parity.map((_,j)=>z(i===j?x:0)));
const reverse=A=>mm(mm(Dchi,A),Dchi);

// Spectral projectors of the symmetric unitary checkpoint.  They are real.
let B=eye(4);const coeff=[z(1)];
for(let k=1;k<=4;k++){const c=mul(z(-1/k),trace(mm(S0,B)));coeff.push(c);B=madd(mm(S0,B),mscale(c,eye(4)));}
const peval=x=>coeff.reduce((v,c)=>add(mul(v,x),c),z());
let roots=Array.from({length:4},(_,k)=>{const a=.31+2*Math.PI*k/4;return z(1.13*Math.cos(a),1.13*Math.sin(a));});
for(let it=0;it<500;it++){
  let delta=0;
  const next=roots.map((r,j)=>{let den=z(1);for(let k=0;k<4;k++)if(k!==j)den=mul(den,sub(r,roots[k]));const d=div(peval(r),den);delta=Math.max(delta,abs(d));return sub(r,d);});
  roots=next;if(delta<1e-14)break;
}
roots.sort((a,b)=>Math.atan2(a.im,a.re)-Math.atan2(b.im,b.re));
const projectors=roots.map((lam,j)=>{
  let X=eye(4);
  for(let k=0;k<4;k++)if(k!==j)X=mscale(div(z(1),sub(lam,roots[k])),mm(X,msub(S0,mscale(roots[k],eye(4)))));
  assert.ok(maxerr(X,dag(X))<1e-8&&maxerr(X,trans(X))<1e-8&&maxerr(mm(X,X),X)<1e-8);
  assert.ok(Math.max(...X.flat().map(x=>Math.abs(x.im)))<1e-8);
  return X;
});

// Type the spectral lines by the established selected-background bias-square map.
const cells=projectors.map(P=>{const d=P.map((r,i)=>r[i].re),h=d[0]+d[2],l=d[0]+d[1];return (h>.5?'C':'D')+(l>.5?'L':'R');});
assert.deepEqual(cells,['CR','CL','DL','DR']);
const upToLeft={u:'CL',nu:'DL',d:'DR',e:'CR'};
const atomicOrder=['u','nu','d','e'];
const atomicRootIndices=atomicOrder.map(f=>cells.indexOf(upToLeft[f]));
assert.deepEqual(atomicRootIndices,[1,2,3,0]);
const diag4=values=>values.map((x,i)=>values.map((_,j)=>i===j?x:z()));
const atomicEigenvalues=atomicRootIndices.map(i=>roots[i]);
const characterMatrix=values=>mm(mm(Hr,diag4(values)),trans(Hr));
const Schi=characterMatrix(atomicEigenvalues);

// The two perfect matchings from even {1,H} to odd {C,HC}, now in the
// correctly typed spectral-channel character basis rather than port coordinates.
const pairings=[[[0,2],[1,3]],[[0,3],[1,2]]];
const pairingAudits=pairings.map(pairs=>{
  const blockOf=new Map();pairs.forEach((pair,k)=>pair.forEach(i=>blockOf.set(i,k)));
  let off2=0,maxOff=0;
  for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(blockOf.get(i)!==blockOf.get(j)){
    off2+=abs(Schi[i][j])**2;maxOff=Math.max(maxOff,abs(Schi[i][j]));
  }
  assert.ok(off2>1e-6);
  return {pairs:pairs.map(pair=>pair.map(i=>['1','H','C','HC'][i])),offBlockFrobeniusNorm:Math.sqrt(off2),maxForbiddenEntry:maxOff,exactFactorization:false};
});

const omega0=1;
const phases=roots.map(l=>{const a=Math.atan2(l.im,l.re);return a>0?a-2*Math.PI:a;});
const gammas=phases.map(phi=>omega0*Math.tan(-phi/4));
assert.ok(gammas.every(g=>g>0&&Number.isFinite(g)));
const blaschke=(w,g)=>div(sub(w,z(0,g)),add(w,z(0,g)));
const f=(w,g)=>mul(blaschke(w,g),blaschke(w,g));
const S=w=>projectors.map((P,j)=>mscale(f(w,gammas[j]),P)).reduce(madd,zero(4));
assert.ok(maxerr(S(z(omega0)),S0)<1e-8);

const boundaryErrors=[];
for(const w of [-3,-.4,0,1,4]){
  const X=S(z(w));boundaryErrors.push(maxerr(mm(dag(X),X),eye(4)));
  assert.ok(boundaryErrors.at(-1)<1e-8&&maxerr(X,trans(X))<1e-8);
}
const wi=z(.8,.6),Si=S(wi),defect=msub(eye(4),mm(dag(Si),Si));
const projectedDefects=projectors.map(P=>trace(mm(P,defect)).re);
assert.ok(projectedDefects.every(x=>x>0));
const reality=S(z(-wi.re,wi.im)).map(r=>r.map(conj));
assert.ok(maxerr(reality,Si)<1e-8);

// H=i(I+S)(I-S)^-1 has H=sum_j(z/(2g_j)-g_j/(2z))P_j.
const inv=A=>{const n=A.length,M=A.map((r,i)=>[...r,...eye(n)[i]]);for(let c=0;c<n;c++){let p=c;while(p<n&&abs(M[p][c])<1e-15)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>div(x,d));for(let i=0;i<n;i++)if(i!==c){const a=M[i][c];M[i]=M[i].map((x,j)=>sub(x,mul(a,M[c][j])));}}return M.map(r=>r.slice(n));};
const Hc=mm(mscale(z(0,1),madd(eye(4),Si)),inv(msub(eye(4),Si)));
const h=(w,g)=>sub(scalez(1/(2*g),w),div(z(g/2),w));
const Hclosed=projectors.map((P,j)=>mscale(h(wi,gammas[j]),P)).reduce(madd,zero(4));
assert.ok(maxerr(Hc,Hclosed)<1e-7);
const residues=projectors.map((P,j)=>mscale(z(gammas[j]/2),P));
const R=residues.reduce(madd,zero(4));
const atomicResidueWeights=atomicRootIndices.map(i=>gammas[i]/2);
const Rchi=characterMatrix(atomicResidueWeights.map(x=>z(x))),Rminus=reverse(Rchi);
for(let j=0;j<4;j++)assert.ok(Math.abs(trace(residues[j]).re-gammas[j]/2)<1e-7);
const channelFlip=[3,2,1,0];
const reversedAtomicWeights=channelFlip.map(i=>atomicResidueWeights[i]);
assert.ok(maxerr(Rminus,characterMatrix(reversedAtomicWeights.map(x=>z(x))))<1e-12);
const RminusPort=atomicRootIndices.map((rootIndex,fidx)=>mscale(z(reversedAtomicWeights[fidx]),projectors[rootIndex])).reduce(madd,zero(4));
assert.ok(maxerr(RminusPort,dag(RminusPort))<1e-8);

// Locate an explicit checkpoint balanced witness for an even input.
let witness=null;
for(const e of [0,1])for(const o of [2,3]){
  const a=Schi[e][e],b=Schi[o][e],coh=mul(conj(a),b),mag=abs(coh);
  if(!witness||mag>witness.coherenceMagnitude)witness={input:['1','H'][e],evenOutput:['1','H'][e],oddOutput:['C','HC'][o-2],linear:2*coh.re,quadrature:2*coh.im,coherenceMagnitude:mag};
}
assert.ok(witness.coherenceMagnitude>1e-6);
const SminusChi=reverse(Schi);
assert.ok(maxerr(SminusChi,characterMatrix(channelFlip.map(i=>atomicEigenvalues[i])))<1e-12);

console.log(JSON.stringify({
  protocol:'four-character-checkpoint-rational-inner-embedding/1',
  characterOrder:['1','H','C','HC'],
  orientationParity:parity,
  typing:{portSpectralCells:cells,chosenAssignment:upToLeft,atomicOrder,atomicRootIndices},
  twoIndependentInterferometerAudit:pairingAudits,
  twoBlockConclusion:'Both even-odd perfect matchings fail: the arithmetic checkpoint has nonzero couplings between the proposed blocks.',
  fullFourModeConstruction:'S(z)=sum_j b_gamma_j(z)^2 P_j with real checkpoint spectral projectors P_j',
  checkpointEigenvalues:roots,
  selectedNegativePhases:phases,
  derivedPositivePoleScales:gammas,
  checkpointRecoveryError:maxerr(S(z(omega0)),S0),
  realAxisUnitarityMaxError:Math.max(...boundaryErrors),
  interiorStrictSchurProjectedDefects:projectedDefects,
  sidebandRealityError:maxerr(reality,Si),
  cayleyClosedFormError:maxerr(Hc,Hclosed),
  positiveResidues:{weightsInRootOrder:gammas.map(g=>g/2),weightsInAtomicOrder:atomicResidueWeights,rankOneSupports:true,sumInTypedCharacterBasis:Rchi.map(r=>r.map(x=>[x.re,x.im]))},
  orientationReversedResidueInWalshBasis:Rminus.map(r=>r.map(x=>[x.re,x.im])),
  checkpointBalancedWitness:witness,
  conclusion:'The independent-two-block ansatz is too small, but a coupled four-character rational-inner response exactly recovers S0, obeys reciprocity/passivity/reality, has positive rank-one residues, and retains orientation-odd even/odd coherence.',
  boundary:'Walsh transformation is applied only after typing spectral lines by the Furey-to-projector bias-square assignment; it is not a transform of raw port coordinates. Gamma values are fitted checkpoint eigenphases, not Standard-Model threshold predictions.',
  passed:true,
},null,2));
