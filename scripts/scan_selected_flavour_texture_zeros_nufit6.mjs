const DEG = Math.PI / 180;

const ranges = {
  NO: {
    s12: [0.275, 0.345], s13: [0.02030, 0.02388], s23: [0.435, 0.585],
    delta: [124, 364], dm21: [6.92e-5, 8.05e-5], dmA: [2.451e-3, 2.578e-3],
    central: {s12: 0.308, s13: 0.02215, s23: 0.470, delta: 212, dm21: 7.49e-5, dmA: 2.513e-3},
  },
  IO: {
    s12: [0.275, 0.345], s13: [0.02060, 0.02409], s23: [0.440, 0.584],
    delta: [201, 335], dm21: [6.92e-5, 8.05e-5], dmA: [2.421e-3, 2.547e-3],
    central: {s12: 0.308, s13: 0.02231, s23: 0.550, delta: 274, dm21: 7.49e-5, dmA: 2.484e-3},
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
  const largest = Math.max(...lengths);
  return 2 * largest - lengths.reduce((a, b) => a + b, 0);
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

let seed = 0x5eed1234;
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

const central = {};
const envelopes = {};
for (const ordering of ['NO', 'IO']) {
  central[ordering] = {};
  envelopes[ordering] = {};
  for (const flavor of ['e', 'mu', 'tau']) {
    central[ordering][flavor] = intervals(ordering, flavor, ranges[ordering].central);
    envelopes[ordering][flavor] = sampleEnvelope(ordering, flavor);
  }
}

// Analytic electron-IO exclusion over the stated 3-sigma box.  Divide the
// triangle inequality by m1.  Uniformly, m2/m1 is bounded by its m3=0,
// largest-dm21/smallest-dmA value, while m3/m1 <= 1.  Conservative separate
// extrema of the three electron weights already leave a large positive gap.
const minElectronWeight1 = (1 - ranges.IO.s12[1]) * (1 - ranges.IO.s13[1]);
const maxElectronWeight2 = ranges.IO.s12[1] * (1 - ranges.IO.s13[0]);
const maxElectronWeight3 = ranges.IO.s13[1];
const maxM2OverM1 = 1 / Math.sqrt(1 - ranges.IO.dm21[1] / ranges.IO.dmA[0]);
const electronIOExclusionMargin = minElectronWeight1 - maxM2OverM1 * maxElectronWeight2 - maxElectronWeight3;
if (electronIOExclusionMargin <= 0) throw new Error('electron IO analytic exclusion bound failed');
if (central.NO.e.length === 0) throw new Error('central electron NO branch unexpectedly absent');
if (central.IO.e.length !== 0 || envelopes.IO.e.samplesWithSolution !== 0) throw new Error('electron IO branch unexpectedly present');

console.log(JSON.stringify({
  protocol: 'selected-flavour-one-zero-nufit6-envelope/1',
  input: 'NuFIT 6.0 IC24-with-SK 3-sigma ranges and listed best fits; NuFIT 6.1 is the current official update but a likelihood-level 6.1 scan is not performed here.',
  criterion: 'A complex diagonal Majorana entry can vanish iff the three lengths m_i |U_{alpha i}|^2 satisfy the triangle inequality.',
  centralIntervalsEV: central,
  deterministicSampled3SigmaEnvelopes: envelopes,
  exactResult: {
    electronInvertedOrderingExcludedOverInputBox: true,
    reason: 'For IO, even the conservative bound min(w1)-max(m2/m1)max(w2)-max(m3/m1)max(w3) stays positive throughout the input box.',
    minimumElectronWeight1: minElectronWeight1,
    maximumM2OverM1: maxM2OverM1,
    conservativeExclusionMargin: electronIOExclusionMargin,
  },
  caveat: 'Sampled envelopes are existence diagnostics, not confidence intervals or an exhaustive likelihood analysis.',
  passed: true,
}, null, 2));
