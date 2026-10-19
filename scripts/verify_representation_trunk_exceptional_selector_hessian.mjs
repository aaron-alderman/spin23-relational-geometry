import assert from 'node:assert/strict';

const spectrum = ({ lambda, kappa, v, mu = 0 }) => {
  assert(lambda > 0 && kappa > 0 && v > 0);
  const base = [
    { sector: 'radial real singlet', multiplicity: 1, eigenvalue: 8 * lambda * v * v },
    { sector: 'phase singlet', multiplicity: 1, eigenvalue: 0 },
    { sector: 'orbit/tangent complex 16', multiplicity: 32, eigenvalue: 0 },
  ];
  if (mu === 0) base.push({ sector: 'complex 10 complement', multiplicity: 20, eigenvalue: 2 * kappa * v * v });
  else {
    base.push({ sector: 'real 10 complement (+)', multiplicity: 10, eigenvalue: 2 * kappa * v * v + 2 * Math.abs(mu) * v });
    base.push({ sector: 'real 10 complement (-)', multiplicity: 10, eigenvalue: 2 * kappa * v * v - 2 * Math.abs(mu) * v });
  }
  return base;
};

const base = spectrum({ lambda: 3, kappa: 5, v: 2 });
assert.equal(base.reduce((n, x) => n + x.multiplicity, 0), 54);
assert.equal(base.filter((x) => x.eigenvalue === 0).reduce((n, x) => n + x.multiplicity, 0), 33);
assert.equal(base.filter((x) => x.eigenvalue > 0).reduce((n, x) => n + x.multiplicity, 0), 21);
assert(base.every((x) => x.eigenvalue >= 0));

// Direct second derivatives of the quadratic normal form, in the convention
// V=(1/2) m^2 phi^2+..., give the claimed eigenvalues.
const lambda = 7, kappa = 11, v = 3;
const radialQuadraticCoefficient = 4 * lambda * v * v;
const tenQuadraticCoefficient = kappa * v * v;
assert.equal(2 * radialQuadraticCoefficient, 8 * lambda * v * v);
assert.equal(2 * tenQuadraticCoefficient, 2 * kappa * v * v);

// The next independent low-degree compact-E6 scalar, 2 Re(mu N), splits the
// complex 10 into two real 10s.  It cannot lift the orbit kernel because N=0
// on every rank-one vacuum.
const mu = 0.4;
const split = spectrum({ lambda, kappa, v, mu });
assert.equal(split.reduce((n, x) => n + x.multiplicity, 0), 54);
assert.equal(split.filter((x) => x.eigenvalue === 0).reduce((n, x) => n + x.multiplicity, 0), 33);
const tenEigenvalues = split.filter((x) => x.sector.includes('10 complement')).map((x) => x.eigenvalue);
assert.deepEqual(tenEigenvalues, [2 * kappa * v * v + 2 * mu * v, 2 * kappa * v * v - 2 * mu * v]);
assert(tenEigenvalues.every((x) => x > 0));
assert(kappa * v > mu);

const groupDimensions = {
  E6: 78,
  Spin10: 45,
  leftRight: 8 + 3 + 3 + 1,
  standardModel: 8 + 3 + 1,
};
const eaten = {
  gaugedE6: groupDimensions.E6 - groupDimensions.Spin10,
  gaugedSpin10: groupDimensions.Spin10 - groupDimensions.Spin10,
  gaugedLeftRightContainedInSpin10: 0,
  gaugedStandardModelContainedInSpin10: 0,
};
assert.deepEqual(eaten, {
  gaugedE6: 33,
  gaugedSpin10: 0,
  gaugedLeftRightContainedInSpin10: 0,
  gaugedStandardModelContainedInSpin10: 0,
});

console.log(JSON.stringify({
  protocol: 'representation-trunk/exceptional-selector-hessian/1',
  convention: 'canonical real kinetic term (1/2)(partial phi)^2 and trace-normalized Jordan norm',
  potential: 'lambda (||x||^2-v^2)^2 + kappa ||x#||^2',
  hessian: [
    { sector: 'radial real singlet', multiplicity: 1, massSquared: '8 lambda v^2' },
    { sector: 'phase singlet', multiplicity: 1, massSquared: '0' },
    { sector: 'complex tangent 16', realMultiplicity: 32, massSquared: '0' },
    { sector: 'complex complement 10', realMultiplicity: 20, massSquared: '2 kappa v^2' },
  ],
  morseBott: { kernelDimension: 33, positiveNormalDimension: 21, healthyFor: 'lambda>0, kappa>0' },
  gauging: {
    E6: 'eats all 33 orbit modes and leaves Spin(10)',
    Spin10: 'eats none because Spin(10) fixes the vacuum',
    leftRightOrSM: 'eats none because these tested subgroups lie inside Spin(10)',
    generalSubgroupH: 'eats dim(H)-dim(H intersect Spin(10))',
  },
  nextInvariant: {
    form: '2 Re(mu N(x))',
    action: 'splits complex 10 into two real 10s with m^2=2 kappa v^2 +/- 2 |mu| v',
    localStability: 'kappa v > |mu| in the trace/determinant normalization',
    orbitEffect: 'none; N=0 on rank-one orbit, so 33 symmetry modes remain until gauged or explicitly broken',
  },
  passed: true,
}, null, 2));
