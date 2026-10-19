import assert from 'node:assert/strict';

const rt2 = Math.sqrt(2), rt3 = Math.sqrt(3);
const c = (re, im = 0) => [re, im];
const addC = ([a, b], [d, e]) => [a + d, b + e];
const mulC = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const divC = ([a, b], [d, e]) => { const n = d * d + e * e; return [(a * d + b * e) / n, (b * d - a * e) / n]; };
const conj = ([a, b]) => [a, -b];
const scaleC = (a, [x, y]) => [a * x, a * y];
const realM = A => A.map(row => row.map(x => c(x)));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => addC(s, mulC(x, B[k][j])), c(0))));
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const approxM = (A, B, eps = 1e-9) => A.every((row, i) => row.every((x, j) => Math.abs(x[0] - B[i][j][0]) < eps && Math.abs(x[1] - B[i][j][1]) < eps));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const I = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => c(Number(i === j))));
const block = (A, B, C, D) => A.map((row, i) => [...row, ...B[i]]).concat(C.map((row, i) => [...row, ...D[i]]));
const zero = (m, n) => Array.from({ length: m }, () => Array.from({ length: n }, () => c(0)));
const inverse2real = A => { const d = A[0][0] * A[1][1] - A[0][1] * A[1][0]; return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]]; };
const f = (omega, gamma) => { const b = divC(c(omega, -gamma), c(omega, gamma)); return mulC(b, b); };

const omega0 = 1;
const gn = 1 + rt2, gt = rt2 - 1;
const U = [[1 / 2, -rt3 / 2], [rt3 / 2, 1 / 2]];
const Ut = [[U[0][0], U[1][0]], [U[0][1], U[1][1]]];
const D = [[1, 0], [0, -1]];
const response = omega => mm(mm(realM(U), [[f(omega, gn), c(0)], [c(0), f(omega, gt)]]), realM(Ut));
const activeEuclidean = omega => mm(mm(mm(realM(D), response(-omega)), realM(D)), response(omega));

// T maps the full active integral basis to the Euclidean mediator basis.
const P = [[1, -1 / 2], [0, rt3 / 2]], X = [[1, 1], [0, -1]];
const mmReal = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const T = mmReal(P, X), Tinv = inverse2real(T);
const activeIntegral = omega => mm(mm(realM(Tinv), activeEuclidean(omega)), realM(T));
const fullR = omega => block(I(2), zero(2, 2), zero(2, 2), activeIntegral(omega));

const R0real = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 3], [0, 0, -1, -2]];
const Hreal = [[0, 0, 1, 1], [0, 0, 0, -1], [1, 1, 0, 0], [0, -1, 0, 0]];
const G0real = [[2, -1, 0, 0], [-1, 2, 0, 0], [0, 0, 2, 3], [0, 0, 3, 6]];
const R0 = realM(R0real), H = realM(Hreal), G0 = realM(G0real);
assert.ok(approxM(fullR(omega0), R0));
assert.ok(approxM(mm(mm(R0, R0), R0), I(4)));
assert.ok(approxM(mm(H, H), I(4)));
assert.ok(approxM(mm(mm(dagger(R0), G0), R0), G0));
assert.ok(approxM(mm(mm(dagger(H), G0), H), G0));

// The network is lossless at every sampled real frequency but finite order is
// a checkpoint property.
const samples = [0.7, 0.9, 1, 1.1, 1.4].map(omega => {
  const Rw = fullR(omega);
  const unitaryDefect = maxDefect(mm(mm(dagger(Rw), G0), Rw), G0);
  const orderThreeDefect = maxDefect(mm(mm(Rw, Rw), Rw), I(4));
  return { omega, generalizedUnitaryDefect: unitaryDefect, orderThreeDefect };
});
assert.ok(samples.every(x => x.generalizedUnitaryDefect < 1e-9));
assert.ok(samples.find(x => x.omega === 1).orderThreeDefect < 1e-9);
assert.ok(samples.filter(x => x.omega !== 1).every(x => x.orderThreeDefect > 1e-5));

// Exact checkpoint finite group order using integer matrices.
const mulReal = mmReal;
const key = A => A.flat().join(',');
const group = [Array.from({ length: 4 }, (_, i) => Array.from({ length: 4 }, (_, j) => Number(i === j)))];
const seen = new Set([key(group[0])]);
for (let cursor = 0; cursor < group.length; cursor++) for (const g of [R0real, Hreal]) {
  const next = mulReal(group[cursor], g);
  if (!seen.has(key(next))) { seen.add(key(next)); group.push(next); }
}
assert.equal(group.length, 18);

console.log(JSON.stringify({
  protocol: 'composed-active-cycle-static-handle-selector-network/1',
  network: { active: 'R(omega)=I2 direct-sum T^{-1}[D S(-omega) D S(+omega)]T', handle: 'H constant feedthrough' },
  checkpoint: { omega0, REqualsIntegralSelectorGenerator: true, R3: true, H2: true, generatedGroupOrder: group.length },
  broadband: { generalizedLosslessAtAllSamples: true, samples, finiteOrderVerdict: 'R(omega)^3=I only at the selected checkpoint among tested frequencies' },
  consequence: 'The dispersive active cycle and static handle form one causal lossless four-channel network realizing the complete order-18 selector at omega0. The finite group is a checkpoint monodromy, not a broadband transfer symmetry.',
  remainingProtection: 'A Ward, topological, or feedback mechanism must pin the operating frequency and reciprocal pole relation if exact finite order is to be physical rather than tuned.',
  passed: true,
}, null, 2));
