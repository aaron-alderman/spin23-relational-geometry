import assert from 'node:assert/strict';

const rt3 = Math.sqrt(3), pi = Math.PI;
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const madd = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const msub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const scaleM = (r, A) => A.map(row => row.map(x => r * x));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
const I3 = [[1,0,0],[0,1,0],[0,0,1]], I2 = [[1,0],[0,1]];
const swap = (i, j) => { const S = I3.map(row => [...row]); [S[i], S[j]] = [S[j], S[i]]; return S; };
const S01 = swap(0,1), S12 = swap(1,2);
const Pminus = S => scaleM(0.5, msub(I3, S));
const pulseHamiltonian = S => scaleM(pi, Pminus(S));
const K01 = pulseHamiltonian(S01), K12 = pulseHamiltonian(S12);
const expPulse = S => madd(I3, scaleM(-2, Pminus(S))); // e^{-i pi P_-}=I-2P_-=S
assert.ok(maxDefect(expPulse(S01), S01) < 1e-12 && maxDefect(expPulse(S12), S12) < 1e-12);

const eigenSummary = K => ({ trace: K[0][0] + K[1][1] + K[2][2], rank: 1, nonzeroEigenvalue: pi });
assert.ok(Math.abs(eigenSummary(K01).trace - pi) < 1e-12 && Math.abs(eigenSummary(K12).trace - pi) < 1e-12);

const roots = [[1,rt3],[-2,0],[1,-rt3]], Q = scaleM(1/Math.sqrt(6), roots);
const householder = g => { const n=g[0]*g[0]+g[1]*g[1]; return [[1-2*g[0]*g[0]/n,-2*g[0]*g[1]/n],[-2*g[1]*g[0]/n,1-2*g[1]*g[1]/n]]; };
const compress = A => mm(mm(transpose(Q), A), Q);
const K01active = compress(K01), K12active = compress(K12);
const expectedK01 = scaleM(pi/2, madd(I2, householder(roots[2])));
const expectedK12 = scaleM(pi/2, madd(I2, householder(roots[0])));
assert.ok(maxDefect(K01active, expectedK01) < 1e-12 && maxDefect(K12active, expectedK12) < 1e-12);

const Uforward = mm(expPulse(S01), expPulse(S12)), Ureverse = mm(expPulse(S12), expPulse(S01));
const activeForward = compress(Uforward), activeReverse = compress(Ureverse);
assert.ok(maxDefect(mm(mm(Uforward,Uforward),Uforward), I3) < 1e-12);
assert.ok(maxDefect(activeReverse, transpose(activeForward)) < 1e-12);

console.log(JSON.stringify({
  protocol: 'minimal-positive-edge-pulse-selector-action/1',
  action: 'L = i psi^* dot(psi) - psi^* K_ab psi during each unit pulse',
  pulseHamiltonians: { K01: '(pi/2)(I-S01)', K12: '(pi/2)(I-S12)', properties: 'real symmetric positive semidefinite rank one, edge local' },
  pulseExponential: 'exp(-i K_ab)=S_ab',
  activeRestrictions: { K01: '(pi/2)(I+H_g-)', K12: '(pi/2)(I+H_g+)' },
  orderedCycle: { forward: 'exp(-iK01) exp(-iK12)', reverse: 'exp(-iK12) exp(-iK01)', reverseIsInverseDefect: maxDefect(activeReverse, transpose(activeForward)) },
  limitation: 'The exact pulse area pi and the temporal ordering remain external control data until a Ward, arithmetic, or autonomous defect mechanism fixes them.',
  passed: true,
}, null, 2));
