import assert from 'node:assert/strict';

const rt3 = Math.sqrt(3);
const c = (re, im = 0) => [re, im];
const add = ([a, b], [d, e]) => [a + d, b + e];
const mul = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const conj = ([a, b]) => [a, -b];
const scale = (a, [x, y]) => [a * x, a * y];
const abs2 = ([x, y]) => x * x + y * y;
const approx = (a, b, eps = 1e-11) => Math.abs(a - b) < eps;
const approxC = (z, w, eps = 1e-11) => approx(z[0], w[0], eps) && approx(z[1], w[1], eps);

const gp = [1, rt3], gm = [1, -rt3];
const phasedSum = theta => {
  const phase = c(Math.cos(theta), Math.sin(theta));
  return gp.map((x, i) => add(c(x), scale(gm[i], phase)));
};
const hermitianOuter = v => v.map(x => v.map(y => mul(x, conj(y))));

const K0 = hermitianOuter(phasedSum(0));
assert.ok(approxC(K0[0][0], c(4)) && approxC(K0[0][1], c(0)) && approxC(K0[1][1], c(0)));
const Kpi = hermitianOuter(phasedSum(Math.PI));
assert.ok(approxC(Kpi[0][0], c(0)) && approxC(Kpi[1][1], c(12)));

const theta = 0.37;
const Ktheta = hermitianOuter(phasedSum(theta));
assert.ok(approx(Ktheta[0][0][0], 2 + 2 * Math.cos(theta)));
assert.ok(approx(Ktheta[1][1][0], 6 - 6 * Math.cos(theta)));
assert.ok(approx(Ktheta[0][1][0], 0));
assert.ok(approx(Math.abs(Ktheta[0][1][1]), 2 * rt3 * Math.sin(theta)));

// A real-symmetric rank-one relationship requires theta=0 or pi. Only theta
// zero has the same norm four as the two primitive roots.
assert.ok(approx(abs2(phasedSum(0)[0]) + abs2(phasedSum(0)[1]), 4));
assert.ok(approx(abs2(phasedSum(Math.PI)[0]) + abs2(phasedSum(Math.PI)[1]), 12));

console.log(JSON.stringify({
  protocol: 'phase-ledger-for-three-relationship-construction/1',
  couplingCoherence: {
    generalRelativePhase: 'theta_c',
    hermitianSelfEnergy: {
      diagonal11: '2+2 cos(theta_c)',
      diagonal22: '6-6 cos(theta_c)',
      offDiagonal: '+/- 2 i sqrt(3) sin(theta_c)',
    },
    realStructureAllowed: ['theta_c = 0', 'theta_c = pi'],
    equalNormThirdRoot: 'theta_c = 0 only',
  },
  pulsePhase: 'the pi eigenphase difference inside each rational-inner face produces a Householder reflection and is not theta_c',
  sidebandCommonPhase: 'the +/- i common phases of S(+omega) and S(-omega) cancel in sequential multiplication and are not theta_c unless the two outputs are physically added at one node',
  operationalResolution: 'Jordan polarization may reconstruct the third projector from separately controlled quadratic evaluations; one simultaneous propagation pulse need not both execute C3 and synthesize the in-phase sum.',
  physicalGate: 'A claim of autonomous orbit completion inside one device must provide a phase reference or boundary mixer that sets theta_c=0 after sideband transport.',
  passed: true,
}, null, 2));
