import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/xxz23-ising-ladder-order46-toy-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "xxz23-ising-ladder-order46-toy-v1");

const L = 4;
const N = 23;
const delta = Math.cos(Math.PI / N);
const isingExchange = 1;
const isingField = 1;
const beta = 1;
const dimension = 2 ** (2 * L);
const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
const bit = (state, position) => (state >> position) & 1;
const zValue = (state, position) => 1 - 2 * bit(state, position);
const popcount = (value) => {
  let count = 0;
  let remaining = value;
  while (remaining) {
    count += remaining & 1;
    remaining >>= 1;
  }
  return count;
};

function sectorOf(state) {
  const sigmaBits = state & ((1 << L) - 1);
  const tauBits = state >> L;
  const charge = popcount(sigmaBits);
  const parity = popcount(tauBits) % 2 === 0 ? 1 : -1;
  return { charge, parity, key: `${charge},${parity}` };
}

const sectors = new Map();
for (let state = 0; state < dimension; state += 1) {
  const sector = sectorOf(state);
  if (!sectors.has(sector.key)) sectors.set(sector.key, []);
  sectors.get(sector.key).push(state);
}

function buildBlocks(lambda) {
  const blocks = new Map();
  for (const [key, states] of sectors) {
    const positions = new Map(states.map((state, index) => [state, index]));
    const matrix = Array.from({ length: states.length }, () => new Float64Array(states.length));
    for (let row = 0; row < states.length; row += 1) {
      const state = states[row];
      let diagonal = 0;
      for (let site = 0; site < L; site += 1) {
        const next = (site + 1) % L;
        const sigmaZ = zValue(state, site);
        const sigmaNextZ = zValue(state, next);
        const tauZ = zValue(state, L + site);
        diagonal += (delta / 2) * sigmaZ * sigmaNextZ;
        diagonal += -isingField * tauZ;
        diagonal += lambda * sigmaZ * tauZ;

        if (bit(state, site) !== bit(state, next)) {
          const target = state ^ (1 << site) ^ (1 << next);
          const column = positions.get(target);
          assert.notEqual(column, undefined);
          matrix[row][column] += 1;
        }

        const targetTau = state ^ (1 << (L + site)) ^ (1 << (L + next));
        const tauColumn = positions.get(targetTau);
        assert.notEqual(tauColumn, undefined);
        matrix[row][tauColumn] += -isingExchange;
      }
      matrix[row][row] += diagonal;
    }
    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix.length; j += 1) {
        assert.ok(Math.abs(matrix[i][j] - matrix[j][i]) < 1e-14);
      }
    }
    blocks.set(key, { states, matrix });
  }
  return blocks;
}

function jacobiEigenvalues(input, tolerance = 1e-12) {
  const n = input.length;
  const a = input.map((row) => Float64Array.from(row));
  const maxIterations = 100 * n * n;
  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    let p = 0;
    let q = 1;
    let maximum = 0;
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) {
        const value = Math.abs(a[i][j]);
        if (value > maximum) {
          maximum = value;
          p = i;
          q = j;
        }
      }
    }
    if (maximum < tolerance) return Array.from({ length: n }, (_, index) => a[index][index]);
    const angle = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const app = a[p][p];
    const aqq = a[q][q];
    const apq = a[p][q];
    a[p][p] = cosine ** 2 * app - 2 * sine * cosine * apq + sine ** 2 * aqq;
    a[q][q] = sine ** 2 * app + 2 * sine * cosine * apq + cosine ** 2 * aqq;
    a[p][q] = 0;
    a[q][p] = 0;
    for (let k = 0; k < n; k += 1) {
      if (k === p || k === q) continue;
      const akp = a[k][p];
      const akq = a[k][q];
      a[k][p] = cosine * akp - sine * akq;
      a[p][k] = a[k][p];
      a[k][q] = sine * akp + cosine * akq;
      a[q][k] = a[k][q];
    }
  }
  throw new Error(`Jacobi iteration failed for block size ${n}`);
}

function sectorPartitions(lambda) {
  const partitions = new Map();
  for (const [key, block] of buildBlocks(lambda)) {
    const eigenvalues = jacobiEigenvalues(block.matrix);
    partitions.set(key, eigenvalues.reduce((sum, energy) => sum + Math.exp(-beta * energy), 0));
  }
  return partitions;
}

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const div = (a, b) => {
  const norm = b.re ** 2 + b.im ** 2;
  return C((a.re * b.re + a.im * b.im) / norm, (a.im * b.re - a.re * b.im) / norm);
};
const abs = (a) => Math.hypot(a.re, a.im);

function trace(partitions, k, l) {
  let result = C(0);
  for (const [key, partition] of partitions) {
    const [chargeText, parityText] = key.split(",");
    const charge = Number(chargeText);
    const parity = Number(parityText);
    const angle = 2 * Math.PI * k * charge / N;
    const weight = partition * (l === 0 ? 1 : parity);
    result = add(result, C(weight * Math.cos(angle), weight * Math.sin(angle)));
  }
  return result;
}

function connectedRatio(lambda) {
  const partitions = sectorPartitions(lambda);
  const ratio = div(
    mul(trace(partitions, 1, 1), trace(partitions, 0, 0)),
    mul(trace(partitions, 1, 0), trace(partitions, 0, 1)),
  );
  return { ratio, partitions };
}

const factorized = connectedRatio(0);
assert.ok(Math.abs(factorized.ratio.re - 1) < 1e-10);
assert.ok(Math.abs(factorized.ratio.im) < 1e-10);
const coupledValues = [];
for (const lambda of [0.2, 0.5, 1, 2]) {
  const result = connectedRatio(lambda);
  coupledValues.push({ lambda, ratio: result.ratio, magnitude: abs(result.ratio) });
}
const expected = new Map(evidence.connectedRatios.map((entry) => [entry.lambda, entry]));
const allCalculated = [{ lambda: 0, ratio: factorized.ratio, magnitude: abs(factorized.ratio) }, ...coupledValues];
for (const calculated of allCalculated) {
  const target = expected.get(calculated.lambda);
  assert.ok(target);
  assert.ok(Math.abs(calculated.ratio.re - target.re) < 1e-12);
  assert.ok(Math.abs(calculated.ratio.im - target.im) < 1e-12);
  assert.ok(Math.abs(calculated.magnitude - target.magnitude) < 1e-12);
}
assert.equal(evidence.scalingBoundary.smallToyRealizesTyMpo, false);
assert.equal(evidence.scalingBoundary.publishedTyMpoMinimumPeriodicLength, 46);

const hPower = (power) => ({ g: mod(12 * power, N), z: mod(power, 2) });
assert.deepEqual(hPower(2), { g: 1, z: 0 });
assert.deepEqual(hPower(23), { g: 0, z: 1 });
for (let power = 1; power < 46; power += 1) {
  assert.notDeepEqual(hPower(power), { g: 0, z: 0 });
}

console.log(JSON.stringify({
  status: "PASS",
  sitesPerLeg: L,
  qubits: 2 * L,
  hilbertDimension: dimension,
  sectors: sectors.size,
  delta,
  beta,
  factorizedRatio: factorized.ratio,
  coupledValues,
  order46Root: "h=g^12 z",
  realizesCommensurateTyMpo: false,
  nextCalculation: evidence.scalingBoundary.nextCalculation,
}));
