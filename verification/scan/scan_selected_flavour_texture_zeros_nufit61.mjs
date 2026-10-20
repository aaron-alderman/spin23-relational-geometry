const DEG = Math.PI / 180;

// NuFIT 6.1, IC24 with SK atmospheric data, as published in the official
// parameter table. Ranges are the listed one-dimensional 3-sigma intervals.
const ranges = {
  NO: {
    s12: [0.2893, 0.3295], s13: [0.02064, 0.02418], s23: [0.435, 0.584],
    delta: [125, 365], dm21: [7.236e-5, 7.823e-5], dmA: [2.450e-3, 2.576e-3],
    central: {s12: 0.3088, s13: 0.02248, s23: 0.470, delta: 212, dm21: 7.537e-5, dmA: 2.511e-3},
  },
  IO: {
    s12: [0.2893, 0.3295], s13: [0.02093, 0.02441], s23: [0.439, 0.584],
    delta: [203, 335], dm21: [7.236e-5, 7.822e-5], dmA: [2.421e-3, 2.547e-3],
    central: {s12: 0.3088, s13: 0.02262, s23: 0.550, delta: 274, dm21: 7.537e-5, dmA: 2.483e-3},
  },
};

function weights(p) {
  const s12 = Math.sqrt(p.s12), c12 = Math.sqrt(1 - p.s12);
  const s13 = Math.sqrt(p.s13), c13 = Math.sqrt(1 - p.s13);
  const s23 = Math.sqrt(p.s23), c23 = Math.sqrt(1 - p.s23);
  const cd = Math.cos(p.delta * DEG);
  return {
    e: [c12*c12*c13*c13, s12*s12*c13*c13, s13*s13],
    mu: [
      s12*s12*c23*c23 + c12*c12*s23*s23*s13*s13 + 2*s12*c12*c23*s23*s13*cd,
      c12*c12*c23*c23 + s12*s12*s23*s23*s13*s13 - 2*s12*c12*c23*s23*s13*cd,
      s23*s23*c13*c13,
    ],
    tau: [
      s12*s12*s23*s23 + c12*c12*c23*c23*s13*s13 - 2*s12*c12*s23*c23*s13*cd,
      c12*c12*s23*s23 + s12*s12*c23*c23*s13*s13 + 2*s12*c12*s23*c23*s13*cd,
      c23*c23*c13*c13,
    ],
  };
}

function masses(ordering, m0, p) {
  if (ordering === 'NO') return [m0, Math.sqrt(m0*m0 + p.dm21), Math.sqrt(m0*m0 + p.dmA)];
  const m3 = m0;
  const m2 = Math.sqrt(m0*m0 + p.dmA);
  return [Math.sqrt(m2*m2 - p.dm21), m2, m3];
}

function defect(ordering, flavor, m0, p) {
  const w = weights(p)[flavor];
  const lengths = masses(ordering, m0, p).map((m, i) => m * w[i]);
  return 2 * Math.max(...lengths) - lengths.reduce((a, b) => a + b, 0);
}

const logGrid = (n, lo = 1e-6, hi = 1) => Array.from({length: n}, (_, i) => lo * Math.pow(hi / lo, i / (n - 1)));

function bisectBoundary(ordering, flavor, p, lo, hi) {
  let dlo = defect(ordering, flavor, lo, p);
  for (let i = 0; i < 70; i++) {
    const mid = Math.sqrt(lo * hi);
    const dm = defect(ordering, flavor, mid, p);
    if ((dlo <= 0) === (dm <= 0)) { lo = mid; dlo = dm; } else hi = mid;
  }
  return Math.sqrt(lo * hi);
}

function intervals(ordering, flavor, p, n = 5000) {
  const grid = logGrid(n);
  const out = [];
  let inside = defect(ordering, flavor, grid[0], p) <= 0;
  let start = inside ? grid[0] : null;
  for (let i = 1; i < grid.length; i++) {
    const now = defect(ordering, flavor, grid[i], p) <= 0;
    if (now !== inside) {
      const edge = bisectBoundary(ordering, flavor, p, grid[i - 1], grid[i]);
      if (now) start = edge; else { out.push([start, edge]); start = null; }
      inside = now;
    }
  }
  if (inside) out.push([start, grid.at(-1)]);
  return out;
}

let seed = 0x61f17a11;
function random() {
  seed = (1664525 * seed + 1013904223) >>> 0;
  return seed / 2**32;
}
const lerp = ([a, b]) => a + (b - a) * random();

function sampleEnvelope(ordering, flavor, count = 6000) {
  const R = ranges[ordering];
  let accepted = 0, low = Infinity, high = -Infinity;
  for (let k = 0; k < count; k++) {
    const p = {s12: lerp(R.s12), s13: lerp(R.s13), s23: lerp(R.s23), delta: lerp(R.delta), dm21: lerp(R.dm21), dmA: lerp(R.dmA)};
    const ints = intervals(ordering, flavor, p, 350);
    if (ints.length) {
      accepted++;
      low = Math.min(low, ...ints.map(x => x[0]));
      high = Math.max(high, ...ints.map(x => x[1]));
    }
  }
  return {samples: count, samplesWithSolution: accepted, sampledLightestMassEnvelopeEV: accepted ? [low, high] : null};
}

const central = {}, envelopes = {};
for (const ordering of ['NO', 'IO']) {
  central[ordering] = {};
  envelopes[ordering] = {};
  for (const flavor of ['e', 'mu', 'tau']) {
    central[ordering][flavor] = intervals(ordering, flavor, ranges[ordering].central);
    envelopes[ordering][flavor] = sampleEnvelope(ordering, flavor);
  }
}

const minElectronWeight1 = (1 - ranges.IO.s12[1]) * (1 - ranges.IO.s13[1]);
const maxElectronWeight2 = ranges.IO.s12[1] * (1 - ranges.IO.s13[0]);
const maxElectronWeight3 = ranges.IO.s13[1];
const maxM2OverM1 = 1 / Math.sqrt(1 - ranges.IO.dm21[1] / ranges.IO.dmA[0]);
const electronIOExclusionMargin = minElectronWeight1 - maxM2OverM1 * maxElectronWeight2 - maxElectronWeight3;

if (electronIOExclusionMargin <= 0) throw new Error('electron IO analytic exclusion bound failed');
if (central.NO.e.length !== 1) throw new Error('central electron NO branch unexpectedly absent or disconnected');
if (central.IO.e.length !== 0 || envelopes.IO.e.samplesWithSolution !== 0) throw new Error('electron IO branch unexpectedly present');

const [electronLower, electronUpper] = central.NO.e[0];
const p = ranges.NO.central;
const ew = weights(p).e;
const observables = m1 => {
  const m = masses('NO', m1, p);
  return {
    sumMassesEV: m.reduce((a, b) => a + b, 0),
    betaDecayMassEV: Math.sqrt(m.reduce((s, x, i) => s + ew[i] * x*x, 0)),
  };
};

console.log(JSON.stringify({
  protocol: 'selected-flavour-one-zero-nufit61-envelope/1',
  input: 'NuFIT 6.1 IC24-with-SK listed best fits and one-dimensional 3-sigma ranges.',
  source: 'https://www.nu-fit.org/sites/default/files/v61.tbl-parameters.pdf',
  criterion: 'A complex diagonal Majorana entry can vanish iff the three lengths m_i |U_{alpha i}|^2 satisfy the triangle inequality.',
  centralIntervalsEV: central,
  deterministicSampled3SigmaEnvelopes: envelopes,
  electronNormalEndpointObservables: {
    lower: observables(electronLower),
    upper: observables(electronUpper),
  },
  exactResult: {
    electronInvertedOrderingExcludedOverInputBox: true,
    minimumElectronWeight1: minElectronWeight1,
    maximumM2OverM1: maxM2OverM1,
    conservativeExclusionMargin: electronIOExclusionMargin,
  },
  caveat: 'Sampled envelopes are deterministic existence diagnostics over marginal ranges, not confidence intervals or a correlated NuFIT likelihood analysis.',
  passed: true,
}, null, 2));
