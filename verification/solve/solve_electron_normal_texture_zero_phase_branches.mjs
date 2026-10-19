const DEG = 180 / Math.PI;
const TAU = 2 * Math.PI;
const modTau = x => ((x % TAU) + TAU) % TAU;

const p = {
  s12: 0.308,
  s13: 0.02215,
  delta: 212 / DEG,
  dm21: 7.49e-5,
  dm31: 2.513e-3,
};

const weights = [(1 - p.s12) * (1 - p.s13), p.s12 * (1 - p.s13), p.s13];
const masses = m1 => [m1, Math.sqrt(m1*m1 + p.dm21), Math.sqrt(m1*m1 + p.dm31)];
const lengths = m1 => masses(m1).map((m, i) => m * weights[i]);
const defect = m1 => {
  const L = lengths(m1);
  return 2 * Math.max(...L) - L.reduce((a, b) => a + b, 0);
};

function bisect(lo, hi) {
  let flo = defect(lo);
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    const fm = defect(mid);
    if ((flo <= 0) === (fm <= 0)) { lo = mid; flo = fm; } else hi = mid;
  }
  return (lo + hi) / 2;
}

// Brackets established by the preceding certified scan.
const lower = bisect(1e-6, 0.004);
const upper = bisect(0.004, 0.012);

function phases(m1, sign = 1) {
  const [A, B, C] = lengths(m1);
  const cosAlpha = Math.max(-1, Math.min(1, (C*C - A*A - B*B) / (2*A*B)));
  const alpha = sign * Math.acos(cosAlpha);
  const re = -(A + B * Math.cos(alpha));
  const im = -B * Math.sin(alpha);
  const betaEffective = Math.atan2(im, re);
  const alpha31 = betaEffective + 2 * p.delta;
  const residualRe = A + B*Math.cos(alpha) + C*Math.cos(betaEffective);
  const residualIm = B*Math.sin(alpha) + C*Math.sin(betaEffective);
  return {
    alpha21Deg: modTau(alpha) * DEG,
    betaEffectiveDeg: modTau(betaEffective) * DEG,
    alpha31Deg: modTau(alpha31) * DEG,
    residual: Math.hypot(residualRe, residualIm),
  };
}

function observables(m1) {
  const m = masses(m1);
  return {
    massesEV: m,
    sumMassesEV: m.reduce((a, b) => a + b, 0),
    betaDecayMassEV: Math.sqrt(m.reduce((s, x, i) => s + weights[i] * x*x, 0)),
    branches: [phases(m1, 1), phases(m1, -1)],
  };
}

const points = {
  lowerEndpoint: observables(lower),
  arithmeticMidpoint: observables((lower + upper) / 2),
  upperEndpoint: observables(upper),
};

for (const point of Object.values(points)) {
  for (const branch of point.branches) {
    if (branch.residual > 1e-12) throw new Error('phase reconstruction residual too large');
  }
}

const mid = points.arithmeticMidpoint.branches;
const mirrorAlpha = Math.abs(modTau(mid[0].alpha21Deg / DEG + mid[1].alpha21Deg / DEG));
if (Math.min(mirrorAlpha, Math.abs(mirrorAlpha - TAU)) > 1e-8) throw new Error('mirror branch check failed');

console.log(JSON.stringify({
  protocol: 'electron-normal-texture-zero-phase-branches/1',
  input: 'NuFIT 6.0 listed normal-ordering best fit used in the preceding scan',
  convention: 'm_ee=A+B exp(i alpha21)+C exp(i beta_eff), beta_eff=alpha31-2 delta_CP',
  allowedLightestMassIntervalEV: [lower, upper],
  points,
  exactGeometry: {
    alpha21: 'plus/minus arccos((C^2-A^2-B^2)/(2AB))',
    betaEffective: 'arg(-(A+B exp(i alpha21)))',
    twoBranches: 'complex-conjugate mirror triangles',
  },
  boundary: 'Numbers use an uncorrelated listed-best-fit input, not a NuFIT likelihood posterior.',
  passed: true,
}, null, 2));
