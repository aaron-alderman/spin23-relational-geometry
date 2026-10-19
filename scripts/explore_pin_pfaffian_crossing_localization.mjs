import { projectedSystems } from "./explore_regulated_glide_relative_pfaffian.mjs";

const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mul = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => sum + x * b[k][j], 0)));
const identity = (n) => Array.from({ length: n }, (_, i) =>
  Array.from({ length: n }, (_, j) => Number(i === j)));

// Cyclic Jacobi diagonalization for the small real symmetric matrices used here.
const jacobi = (input, tolerance = 1e-12, maxSweeps = 120) => {
  const a = input.map((row) => [...row]);
  const v = identity(a.length);
  let sweeps = 0;
  for (; sweeps < maxSweeps; sweeps += 1) {
    let largest = 0;
    for (let p = 0; p < a.length - 1; p += 1) for (let q = p + 1; q < a.length; q += 1) {
      largest = Math.max(largest, Math.abs(a[p][q]));
      if (Math.abs(a[p][q]) < tolerance) continue;
      const tau = (a[q][q] - a[p][p]) / (2 * a[p][q]);
      const t = (tau >= 0 ? 1 : -1) / (Math.abs(tau) + Math.sqrt(1 + tau * tau));
      const c = 1 / Math.sqrt(1 + t * t);
      const s = t * c;
      const app = a[p][p];
      const aqq = a[q][q];
      const apq = a[p][q];
      a[p][p] = app - t * apq;
      a[q][q] = aqq + t * apq;
      a[p][q] = 0;
      a[q][p] = 0;
      for (let k = 0; k < a.length; k += 1) if (k !== p && k !== q) {
        const akp = a[k][p];
        const akq = a[k][q];
        a[k][p] = c * akp - s * akq;
        a[p][k] = a[k][p];
        a[k][q] = s * akp + c * akq;
        a[q][k] = a[k][q];
      }
      for (let k = 0; k < a.length; k += 1) {
        const vkp = v[k][p];
        const vkq = v[k][q];
        v[k][p] = c * vkp - s * vkq;
        v[k][q] = s * vkp + c * vkq;
      }
    }
    if (largest < tolerance) break;
  }
  return a.map((row, i) => ({ value: row[i], vector: v.map((r) => r[i]) }))
    .sort((x, y) => x.value - y.value);
};

const analyse = ({ field, delta }, sectorSign = 1, base = { L: 2, M: 1, r: 0.8, m0: 0.8, mu: 0.7 }) => {
  const system = projectedSystems({ ...base, delta }, sectorSign);
  const a = field === "pfd" ? system.ad : system.ar;
  const b = mul(transpose(a), a);
  const spectrum = jacobi(b);
  const pair = spectrum.slice(0, 2);
  const fullModes = pair.map(({ vector }) => system.q.map((row) =>
    row.reduce((sum, x, k) => sum + x * vector[k], 0)));
  const sites = system.nx * system.ny;
  const raw = Array.from({ length: sites }, (_, site) => fullModes.reduce((modeSum, mode) => {
    let weight = 0;
    for (let alpha = 0; alpha < system.spin; alpha += 1) weight += mode[system.spin * site + alpha] ** 2;
    return modeSum + weight;
  }, 0));
  const normalization = raw.reduce((sum, x) => sum + x, 0);
  const weights = raw.map((x) => x / normalization);
  const rows = [];
  for (let iy = 0; iy < system.ny; iy += 1) {
    const y = iy - base.M;
    for (let x = 0; x < system.nx; x += 1) rows.push({ x, y, weight: weights[iy * system.nx + x] });
  }
  const core = rows.filter(({ x, y }) => y === 0 && (x === 0 || x === base.L))
    .reduce((sum, point) => sum + point.weight, 0);
  const boundary = rows.filter(({ y }) => Math.abs(y) === base.M)
    .reduce((sum, point) => sum + point.weight, 0);
  const yProfile = Array.from({ length: system.ny }, (_, iy) => ({
    y: iy - base.M,
    weight: rows.filter((point) => point.y === iy - base.M).reduce((sum, point) => sum + point.weight, 0),
  }));
  const xProfile = Array.from({ length: system.nx }, (_, x) => ({
    x,
    weight: rows.filter((point) => point.x === x).reduce((sum, point) => sum + point.weight, 0),
  }));
  const ipr = weights.reduce((sum, x) => sum + x * x, 0);
  return {
    field,
    texture: field === "pfd" ? "defect" : "reference",
    delta,
    sectorSign,
    squaredSingularPair: pair.map(({ value }) => value),
    nextSquaredSingular: spectrum[2].value,
    coreWeight: core,
    boundaryWeight: boundary,
    ipr,
    effectiveSites: 1 / ipr,
    xProfile,
    yProfile,
    siteWeights: rows,
  };
};

const crossings = [
  { field: "pfd", delta: 0.164641571 },
  { field: "pfr", delta: 0.431858063 },
  { field: "pfd", delta: 0.876560211 },
  { field: "pfd", delta: 1.321239471 },
  { field: "pfd", delta: 1.421520233 },
  { field: "pfd", delta: 1.739992523 },
  { field: "pfd", delta: 1.892502594 },
  { field: "pfr", delta: 1.962477875 },
];

if (process.argv[1]?.endsWith("explore_pin_pfaffian_crossing_localization.mjs")) {
  for (const crossing of crossings) console.log(JSON.stringify(analyse(crossing)));
}

export { analyse, crossings, jacobi };
