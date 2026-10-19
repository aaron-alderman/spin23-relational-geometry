import assert from 'node:assert/strict';

const inv=A=>{const n=A.length,M=A.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>i===j?1:0)]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-14)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}}return M.map(r=>r.slice(n));};
const mv=(A,x)=>A.map(r=>r.reduce((s,v,j)=>s+v*x[j],0));
const det2=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const moments=(poles,weights,count)=>Array.from({length:count},(_,k)=>poles.reduce((s,m,j)=>s+weights[j]*m**k,0));

const poles=[2,5],weights=[3,1.5],mu=moments(poles,weights,5);
const H0=[[mu[0],mu[1]],[mu[1],mu[2]]];
const H1=[[mu[1],mu[2]],[mu[2],mu[3]]];
assert.ok(H0[0][0]>0&&det2(H0)>0);
assert.ok(H1[0][0]>0&&det2(H1)>0);

const rhs=[-mu[2],-mu[3]];
const recurrence=mv(inv(H0),rhs); // [c0,c1] for x^2+c1 x+c0
const [c0,c1]=recurrence,disc=c1*c1-4*c0;
assert.ok(disc>0);
const recoveredPoles=[(-c1-Math.sqrt(disc))/2,(-c1+Math.sqrt(disc))/2];
const V=[[1,1],recoveredPoles];
const recoveredWeights=mv(inv(V),[mu[0],mu[1]]);
for(let j=0;j<2;j++){assert.ok(Math.abs(recoveredPoles[j]-poles[j])<1e-12);assert.ok(Math.abs(recoveredWeights[j]-weights[j])<1e-12);}
assert.ok(recoveredPoles.every(x=>x>0)&&recoveredWeights.every(x=>x>0));

const alternatePoles=[1,4],alternateWeights=[1.5,3],alternateMu=moments(alternatePoles,alternateWeights,5);
for(let k=0;k<3;k++)assert.ok(Math.abs(alternateMu[k]-mu[k])<1e-12);
assert.ok(Math.abs(alternateMu[3]-mu[3])>1e-6);

const annihilationResidual=[0,1].map(k=>mu[k+2]+c1*mu[k+1]+c0*mu[k]);
assert.ok(annihilationResidual.every(x=>Math.abs(x)<1e-12));

console.log(JSON.stringify({
  protocol:'positive-atomic-threshold-prony-hankel-recovery/1',
  atomCount:2,
  requiredMomentCount:4,
  suppliedMoments:mu.slice(0,4),
  hankelDeterminants:{H0:det2(H0),shiftedH1:det2(H1)},
  recoveredAnnihilatingPolynomial:{form:'x^2+c1*x+c0',c0,c1},
  recoveredPoles,
  recoveredWeights,
  undersampledCounterexample:{sharedMoments:mu.slice(0,3),firstMeasure:{poles,weights},secondMeasure:{poles:alternatePoles,weights:alternateWeights},differentFourthMoments:[mu[3],alternateMu[3]]},
  theorem:'For n distinct positive atoms with positive weights, moments mu_0 through mu_(2n-1) determine the monic annihilating polynomial through the n x n Hankel system, then recover poles as its roots and weights through a Vandermonde system. Positive H0 and shifted H1 are necessary finite-support positivity checks; real positive roots and positive recovered weights complete the certificate.',
  boundary:'The theorem requires exact finite atomic order n. Noise, continua, repeated poles and unknown model order require rank-revealing or semidefinite moment methods.',
  passed:true,
},null,2));
