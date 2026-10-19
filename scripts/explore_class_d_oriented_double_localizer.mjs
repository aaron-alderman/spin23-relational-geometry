import { projectedSystems, orientationLineCandidates } from "./explore_regulated_glide_relative_pfaffian.mjs";
import { jacobi } from "./explore_pin_pfaffian_crossing_localization.mjs";

const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mul = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => sum + x * b[k][j], 0)));
const maxAbs = (a) => {
  let maximum = 0;
  for (const row of a) for (const value of row) maximum = Math.max(maximum, Math.abs(value));
  return maximum;
};

const determinantSignLog = (input, tolerance = 1e-12) => {
  const a = input.map((row) => [...row]);
  let sign = 1;
  let logAbs = 0;
  for (let k = 0; k < a.length; k += 1) {
    let pivot = k;
    for (let i = k + 1; i < a.length; i += 1) if (Math.abs(a[i][k]) > Math.abs(a[pivot][k])) pivot = i;
    if (Math.abs(a[pivot][k]) < tolerance) return { sign: 0, logAbs: -Infinity };
    if (pivot !== k) { [a[k], a[pivot]] = [a[pivot], a[k]]; sign *= -1; }
    const value = a[k][k];
    sign *= Math.sign(value);
    logAbs += Math.log(Math.abs(value));
    for (let i = k + 1; i < a.length; i += 1) {
      const factor = a[i][k] / value;
      for (let j = k + 1; j < a.length; j += 1) a[i][j] -= factor * a[k][j];
    }
  }
  return { sign, logAbs };
};

const diagonal = (values) => values.map((x, i) => values.map((_, j) => i === j ? x : 0));
const add = (a, b) => a.map((row, i) => row.map((x, j) => x + b[i][j]));
const scale = (s, a) => a.map((row) => row.map((x) => s * x));

const smallestSingular = (a) => {
  const gram = mul(transpose(a), a);
  return Math.sqrt(Math.max(0, jacobi(gram)[0].value));
};

const analyse = (parameters, { kappa = 0.25, center = 0, coordinate = "y", candidateLabel = "IIz", radialT = 0, withGap = false } = {}) => {
  const system = projectedSystems(parameters, 1);
  const coordinates = [];
  for (let iy = 0; iy < system.ny; iy += 1) for (let x = 0; x < system.nx; x += 1) {
    const y = iy - parameters.M;
    const value = coordinate === "y" ? y
      : coordinate === "absY" ? Math.abs(y)
        : coordinate === "radialHomotopy"
          ? (1 - radialT) * Math.abs(y) + radialT * y * y / parameters.M
          : coordinate === "radialLocalHomotopy"
            ? (1 - radialT) * Math.abs(y) + radialT * y * y
          : x;
    for (let alpha = 0; alpha < system.spin; alpha += 1) coordinates.push(value);
  }
  const centered = coordinates.map((value) => value - center);
  let position = diagonal(centered);
  if (coordinate === "twistedY") {
    const candidate = orientationLineCandidates.find(({ label }) => label === candidateLabel);
    if (!candidate) throw new Error(`Unknown orientation-line candidate ${candidateLabel}`);
    position = Array.from({ length: system.n }, () => Array(system.n).fill(0));
    for (let site = 0; site < system.nx * system.ny; site += 1) {
      const y = Math.floor(site / system.nx) - parameters.M;
      for (let a = 0; a < system.spin; a += 1) for (let b = 0; b < system.spin; b += 1) {
        position[system.spin * site + a][system.spin * site + b]
          = y * candidate.majoranaMatrix[a][b] - (a === b ? center : 0);
      }
    }
  }
  const localizer = (a) => add(a, scale(kappa, position));
  const projectedPosition = mul(mul(transpose(system.q), position), system.q);
  const sectorLocalizer = (a) => add(a, scale(kappa, projectedPosition));
  const fullReference = localizer(system.fullAr);
  const fullDefect = localizer(system.fullAd);
  const reducedReference = sectorLocalizer(system.ar);
  const reducedDefect = sectorLocalizer(system.ad);
  return {
    parameters,
    kappa,
    center,
    coordinate,
    candidateLabel: coordinate === "twistedY" ? candidateLabel : undefined,
    radialT: coordinate === "radialHomotopy" || coordinate === "radialLocalHomotopy" ? radialT : undefined,
    reference: determinantSignLog(fullReference),
    defect: determinantSignLog(fullDefect),
    sectorReference: determinantSignLog(reducedReference),
    sectorDefect: determinantSignLog(reducedDefect),
    sectorReferenceGap: withGap ? smallestSingular(reducedReference) : undefined,
    sectorDefectGap: withGap ? smallestSingular(reducedDefect) : undefined,
    sectorReferenceHamiltonianGap: withGap ? smallestSingular(system.ar) : undefined,
    sectorDefectHamiltonianGap: withGap ? smallestSingular(system.ad) : undefined,
    projectedPositionMaxAbs: maxAbs(projectedPosition),
  };
};

if (process.argv[1]?.endsWith("explore_class_d_oriented_double_localizer.mjs")) {
  const base = { L: 4, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25 };
  for (const boundaryMass of [0, 0.3]) for (const coordinate of ["y", "absY"]) {
    for (const kappa of [0.05, 0.1, 0.2, 0.4]) {
      console.log(JSON.stringify(analyse({ ...base, boundaryMass }, { coordinate, kappa, center: 0 })));
    }
  }
}

export { analyse, determinantSignLog };
