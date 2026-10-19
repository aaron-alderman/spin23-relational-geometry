import assert from 'node:assert/strict';

const deltaMinimum=0.08389390482432013;
const genericRelativeLeakageThreshold=Math.sqrt(1+deltaMinimum)-1;
const beta=Math.sqrt(1-deltaMinimum*deltaMinimum);
const involutionAwareThreshold=Math.sqrt(beta*beta+deltaMinimum)-beta;

// In the ideal source frame Gamma is an arbitrary Hermitian involution.  A
// candidate map is tested column by column: q_f = chi_f a_f^* Gamma a_f.
// Normalization divides q_f by a positive number and cannot change its sign.
const gamma=[1,1,-1,-1];
const chi=[1,1,-1,-1];
const quadraticScores=A=>A[0].map((_,f)=>{
  let q=0,n2=0;
  for(let i=0;i<4;i++){
    const x=A[i][f];
    q+=chi[f]*gamma[i]*x*x;
    n2+=x*x;
  }
  return{channel:f,unnormalized:q,normalized:q/n2,passes:q>0};
});

// Arbitrarily unequal diagonal gains leave all four normalized rays fixed.
const diagonalGains=[1000,3,0.02,17];
const D=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i===j?diagonalGains[j]:0));
const diagonalScores=quadraticScores(D);
assert.ok(diagonalScores.every(x=>x.passes&&Math.abs(x.normalized-1)<1e-14));
const diagonalConditionNumber=Math.max(...diagonalGains)/Math.min(...diagonalGains);
assert.equal(diagonalConditionNumber,50000);

// Cross-side leakage, rather than gain hierarchy, is what can change a sign.
// This example has a huge global condition number but remains directly certified.
const A=D.map(row=>[...row]);
A[2][0]=10;     // 1% wrong-side amplitude relative to channel-0 gain.
A[3][1]=0.02;   // small wrong-side leakage in channel 1.
A[0][2]=0.0001; // small wrong-side leakage in channel 2.
A[1][3]=0.1;    // small wrong-side leakage in channel 3.
const mixedScores=quadraticScores(A);
assert.ok(mixedScores.every(x=>x.passes));

// The leakage-only theorem.  After fixing the irrelevant phase, write
// a_f=d_f u_f+e_f with e_f perpendicular to u_f and rho_f=||e_f||/d_f.
// For ||Gamma||=1 and ideal signed margin delta_f,
// chi_f a_f^*Gamma a_f >= d_f^2(delta_f-2 rho_f-rho_f^2).
const lowerBound=rho=>deltaMinimum-2*rho-rho*rho;
assert.ok(lowerBound(genericRelativeLeakageThreshold-1e-9)>0);
assert.ok(lowerBound(genericRelativeLeakageThreshold+1e-9)<0);
assert.ok(involutionAwareThreshold>genericRelativeLeakageThreshold);

console.log(JSON.stringify({
  protocol:'restricted-ray-nonunitary-orientation-certificate/1',
  orbitMinimumSignedMargin:deltaMinimum,
  directTest:'For every source projector P_f, Tr(chi_f Gamma A P_f A^dagger)>0. Equivalently, the corresponding diagonal entry of A^dagger(chi_f Gamma)A is positive.',
  convexForm:'With Q_f=A P_f A^dagger positive semidefinite, require Tr(chi_f Gamma Q_f)>0. These are linear half-space tests in the output Gram variables Q_f; rank-one is an additional physical constraint.',
  arbitraryDiagonalGainExample:{
    gains:diagonalGains,
    globalConditionNumber:diagonalConditionNumber,
    normalizedSignedScores:diagonalScores.map(x=>x.normalized),
    conclusion:'All normalized rays are unchanged despite condition number 50000.'
  },
  mixedHighConditionExample:{scores:mixedScores},
  relativeLeakageSufficientTest:{
    decomposition:'a_f=d_f u_f+e_f, e_f perpendicular to u_f, rho_f=||e_f||/d_f',
    genericLowerBound:'signed numerator / d_f^2 >= delta_f-2 rho_f-rho_f^2',
    genericUniformThreshold:genericRelativeLeakageThreshold,
    involutionAwareThreshold,
    involutionAwareNote:'Using ||(I-u u^dagger)Gamma u||=sqrt(1-delta_f^2) improves the cross-term coefficient, while retaining the conservative -||e||^2 term.'
  },
  conclusion:'Global anisotropy is not the relevant obstruction. Independent positive source gains are removed by per-source normalization; only leakage between differently graded rays must be bounded or tested directly.',
  boundary:'The direct inequalities certify a supplied map exactly. The leakage thresholds are sufficient worst-case bounds, assume nonzero source images, and do not by themselves construct the microscopic Furey-to-projector intertwiner.',
  passed:true,
},null,2));
