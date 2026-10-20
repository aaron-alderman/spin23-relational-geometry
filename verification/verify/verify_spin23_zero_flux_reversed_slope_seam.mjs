import assert from "node:assert/strict";

const targetUp = 1.3577502786208545e-5;
const targetDown = 3.497378191729099e-4;
const target = { Vus: 0.22501, Vcb: 0.04183, Vub: 0.003732, J: 3.115e-5 };

function jacobi(A) {
  A = A.map(row => row.slice());
  const U = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  for (let step = 0; step < 100; step += 1) {
    let p = 0;
    let q = 1;
    for (let i = 0; i < 3; i += 1) {
      for (let j = i + 1; j < 3; j += 1) {
        if (Math.abs(A[i][j]) > Math.abs(A[p][q])) [p, q] = [i, j];
      }
    }
    if (Math.abs(A[p][q]) < 1e-15) break;
    const phi = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
    const c = Math.cos(phi);
    const s = Math.sin(phi);
    const app = c * c * A[p][p] - 2 * s * c * A[p][q] + s * s * A[q][q];
    const aqq = s * s * A[p][p] + 2 * s * c * A[p][q] + c * c * A[q][q];
    for (let r = 0; r < 3; r += 1) {
      if (r !== p && r !== q) {
        const arp = A[r][p];
        const arq = A[r][q];
        A[r][p] = A[p][r] = c * arp - s * arq;
        A[r][q] = A[q][r] = s * arp + c * arq;
      }
      const urp = U[r][p];
      const urq = U[r][q];
      U[r][p] = c * urp - s * urq;
      U[r][q] = s * urp + c * urq;
    }
    A[p][p] = app;
    A[q][q] = aqq;
    A[p][q] = A[q][p] = 0;
  }
  const order = [0, 1, 2].sort((i, j) => A[i][i] - A[j][j]);
  return {
    values: order.map(i => A[i][i]),
    vectors: U.map(row => order.map(i => row[i])),
  };
}

const ratio = values => (values[1] - values[0]) / (values[2] - values[0]);
const q = targetUp / (2 - targetUp);
const x = Math.sqrt(3) * q;
const a = 1 + x;
const b = 1 - x;
const c = 1;
const S = a + b + c;
const R = Math.sqrt(((a - b) ** 2 + (b - c) ** 2 + (c - a) ** 2) / 2);

const D = [a + c, a + b, b + c];
const H = [[0, a, c], [a, 0, b], [c, b, 0]];
const matrix = s => D.map((d, i) => D.map((_, j) => (i === j ? d : 0) + s * H[i][j]));

const up = jacobi(matrix(-1));
const sortedUp = ratio(up.values);
const physicalUp = 1 - sortedUp;
assert.ok(Math.abs(R / S - q) < 1e-15);
assert.ok(Math.abs(sortedUp - (S - R) / (S + R)) < 2e-11);
assert.ok(Math.abs(physicalUp - targetUp) < 2e-11);

let lo = 0.01;
let hi = 0.02;
for (let step = 0; step < 100; step += 1) {
  const eta = (lo + hi) / 2;
  if (ratio(jacobi(matrix(eta)).values) > targetDown) lo = eta;
  else hi = eta;
}
const eta = (lo + hi) / 2;
const down = jacobi(matrix(eta));
const physicalDown = ratio(down.values);
assert.ok(Math.abs(physicalDown - targetDown) < 2e-12);

const upOrder = [2, 1, 0];
const downOrder = [0, 1, 2];
const Uu = up.vectors.map(row => upOrder.map(j => row[j]));
const Ud = down.vectors.map(row => downOrder.map(j => row[j]));
const cmul = (u, v) => ({ re: u.re * v.re - u.im * v.im, im: u.re * v.im + u.im * v.re });
const cadd = (u, v) => ({ re: u.re + v.re, im: u.im + v.im });
const cconj = u => ({ re: u.re, im: -u.im });
const cabs = u => Math.hypot(u.re, u.im);
const phase = angle => ({ re: Math.cos(angle), im: Math.sin(angle) });

function observables(alpha, beta) {
  const phases = [{ re: 1, im: 0 }, phase(alpha), phase(beta)];
  const V = Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (_, j) => {
    let z = { re: 0, im: 0 };
    for (let k = 0; k < 3; k += 1) {
      z = cadd(z, { re: Uu[k][i] * Ud[k][j] * phases[k].re, im: Uu[k][i] * Ud[k][j] * phases[k].im });
    }
    return z;
  }));
  const jarlskog = Math.abs(cmul(cmul(V[0][0], V[1][1]), cmul(cconj(V[0][1]), cconj(V[1][0]))).im);
  return { Vus: cabs(V[0][1]), Vcb: cabs(V[1][2]), Vub: cabs(V[0][2]), J: jarlskog };
}

function score(o) {
  return Object.keys(target).reduce((sum, key) => sum + Math.log(o[key] / target[key]) ** 2, 0) / 4;
}

let best = { score: Infinity };
const grid = 512;
for (let i = 0; i < grid; i += 1) {
  const alpha = 2 * Math.PI * i / grid;
  for (let j = 0; j < grid; j += 1) {
    const beta = 2 * Math.PI * j / grid;
    const values = observables(alpha, beta);
    const candidate = score(values);
    if (candidate < best.score) best = { score: candidate, alpha, beta, ...values };
  }
}

assert.ok(best.score > 0.7);
assert.ok(best.Vus > 0.9);

console.log(JSON.stringify({
  passed: true,
  zeroFluxIdentity: {
    sortedRatio: "(S-R)/(S+R)",
    reversedPhysicalRatio: "2R/(S+R)",
    requiredRoverS: q,
  },
  spectralWitness: { a, b, c, eta, up: physicalUp, down: physicalDown },
  boundedDiagonalTorusGrid: { grid, ...best, globalMinimumClaimed: false },
  verdict: {
    decreasingUpSlopeReopenedAwayFromPiFlux: true,
    bothMassHierarchiesCompatibleAtZeroFlux: true,
    joinedCkmWitnessFound: false,
    generalHolonomyExcluded: false,
    physicalAdmissionChanged: false,
  },
}, null, 2));
