import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const outer=(u,v)=>u.map(x=>v.map(y=>x*y));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const eq=(A,B)=>maxabs(sub(A,B))<1e-10;
const mv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);

// Minimal parent for two gauge-singlet composite responses O_s,O_t coupled
// to one neutral mediator y. Eliminating y produces the Schur complement.
const A=[[7/3,2/5],[2/5,11/4]],g=[3/7,5/6],m=13/5;
const Keff=sub(A,scale(1/m,outer(g,g)));

// Independent source normalization O -> D O acts by congruence and carries
// the mediator coupling covariantly. Schur elimination commutes with it.
const D=[[2,0],[0,7/3]];
const Aprime=mm(mm(tr(D),A),D),gprime=mv(tr(D),g);
const Kprime=sub(Aprime,scale(1/m,outer(gprime,gprime)));
assert.ok(eq(Kprime,mm(mm(tr(D),Keff),D)));

// Any nonzero coupling vector can be made componentwise equal by a diagonal
// source rescaling. Thus g_s=g_t is not invariant before source norms are fixed.
const Dequal=[[1/g[0],0],[0,1/g[1]]];
const gequal=mv(tr(Dequal),g);
assert.ok(Math.abs(gequal[0]-1)<1e-12&&Math.abs(gequal[1]-1)<1e-12);

// In the maximally symmetric bare case kappa I, the Schur correction selects
// the coupling direction g, but its projective ratio remains arbitrary.
const kappa=5;
const Asymmetric=[[kappa,0],[0,kappa]];
const Ksym=sub(Asymmetric,scale(1/m,outer(g,g)));
const Kg=mv(Ksym,g);
const eigenvalueAlongG=kappa-dot(g,g)/m;
assert.ok(Math.max(...Kg.map((x,i)=>Math.abs(x-eigenvalueAlongG*g[i])))<1e-10);
assert.ok(kappa>dot(g,g)/m); // positive parent Schur response in this witness

// A genuine sector exchange X supplies the missing relations: XAX=A and
// Xg=+/-g imply equal diagonals and even/odd coupling. These are extra
// assumptions, not consequences of Schur elimination.
const X=[[0,1],[1,0]];
const Aexchange=[[3,4/7],[4/7,3]],geven=[2,2],godd=[2,-2];
assert.ok(eq(mm(mm(tr(X),Aexchange),X),Aexchange));
assert.deepEqual(mv(X,geven),geven);
assert.deepEqual(mv(X,godd),godd.map(x=>-x));

// Stress universality fixes the source coupling to T_total=T_s+T_t only after
// T_s,T_t have a common physical normalization. Their two-point weights remain
// independent positive data c_s,c_t.
const centralWeightsA=[1,3],centralWeightsB=[2,3];
const normalizedStressDirections=[centralWeightsA,centralWeightsB].map(([cs,ct])=>[Math.sqrt(cs),Math.sqrt(ct)]);
assert.notEqual(normalizedStressDirections[0][1]/normalizedStressDirections[0][0],normalizedStressDirections[1][1]/normalizedStressDirections[1][0]);

console.log(JSON.stringify({
  protocol:'two-sector-common-mediator-schur-lock-classification/1',
  parent:{A,g,m},
  schurComplement:Keff,
  sourceRescalingNaturality:true,
  equalBareCouplingsAreNormalizationInvariant:false,
  symmetricBareKernel:{matrix:Asymmetric,selectedDirection:g,selectedProjectiveRatio:g[1]/g[0],positiveWitness:true},
  exchangeLock:{requiredRelations:'X A X=A and X g=+/-g',evenDirection:[1,1],oddDirection:[1,-1],status:'extra sector-exchange symmetry'},
  stressBoundary:'A common metric couples to the normalized sum T_s+T_t, but the effective two-point/spectral weights c_s and c_t remain sector data; universality of the source does not predict c_t/c_s.',
  conclusion:'A common Schur mediator can transmit or measure a chosen singlet-triplet direction but cannot select its projective ratio without normalized sources plus an additional sector symmetry or dynamical spectral calculation.',
  nextGate:'Derive a common normalization and the two sector spectral weights from a Standard-Model stress tensor or find an independently justified composite-sector exchange. Do not infer b/a from Schur elimination alone.',
  passed:true
},null,2));
