import { projectedSystems } from "./explore_regulated_glide_relative_pfaffian.mjs";
import { determinantSignLog } from "./explore_class_d_oriented_double_localizer.mjs";

const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mul = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => sum + x * b[k][j], 0)));
const add = (a, b) => a.map((row, i) => row.map((x, j) => x + b[i][j]));
const scale = (s, a) => a.map((row) => row.map((x) => s * x));
const diagonal = (values) => values.map((x, i) => values.map((_, j) => i === j ? x : 0));
const maxAbs = (a) => {
  let maximum = 0;
  for (const row of a) for (const value of row) maximum = Math.max(maximum, Math.abs(value));
  return maximum;
};

const explicitSectorBasis = (system, parameters, sectorSign = 1) => {
  const representatives = [];
  for (let y = -parameters.M; y <= parameters.M; y += 1) for (let x = 0; x < parameters.L; x += 1) {
    const site = (y + parameters.M) * system.nx + x;
    for (let alpha = 0; alpha < system.spin; alpha += 1) {
      representatives.push({ x, y, alpha, fullIndex: system.spin * site + alpha });
    }
  }
  const normalization = 1 / Math.sqrt(2);
  const q = Array.from({ length: system.n }, () => Array(representatives.length).fill(0));
  representatives.forEach(({ fullIndex }, column) => {
    q[fullIndex][column] += normalization;
    for (let row = 0; row < system.n; row += 1) {
      q[row][column] += sectorSign * normalization * system.fullGlide[row][fullIndex];
    }
  });
  return { q, representatives };
};

const analyse = (parameters, { sectorSign = 1, kappa = 0.2, center = 0.5 } = {}) => {
  const system = projectedSystems(parameters, sectorSign);
  const explicit = explicitSectorBasis(system, parameters, sectorSign);
  const qt = transpose(explicit.q);
  const gram = mul(qt, explicit.q);
  const identityError = maxAbs(gram.map((row, i) => row.map((x, j) => x - Number(i === j))));
  const glideError = maxAbs(mul(system.fullGlide, explicit.q).map((row, i) =>
    row.map((x, j) => x - sectorSign * explicit.q[i][j])));

  const radialFullValues = [];
  for (let y = -parameters.M; y <= parameters.M; y += 1) for (let x = 0; x < system.nx; x += 1) {
    for (let alpha = 0; alpha < system.spin; alpha += 1) radialFullValues.push(Math.abs(y));
  }
  const radialExplicit = mul(mul(qt, diagonal(radialFullValues)), explicit.q);
  const expectedRadii = explicit.representatives.map(({ y }) => Math.abs(y));
  const radialDiagonalError = maxAbs(radialExplicit.map((row, i) => row.map((x, j) =>
    x - (i === j ? expectedRadii[i] : 0))));

  const project = (a) => mul(mul(qt, a), explicit.q);
  const ar = project(system.fullAr);
  const ad = project(system.fullAd);
  const maximumLongRangeCoupling = (a) => {
    let maximum = 0;
    for (let i = 0; i < a.length; i += 1) for (let j = 0; j < a.length; j += 1) {
      if (Math.abs(expectedRadii[i] - expectedRadii[j]) > 1) maximum = Math.max(maximum, Math.abs(a[i][j]));
    }
    return maximum;
  };
  const localizer = (a, radial) => add(a, scale(kappa, add(radial, scale(-center, diagonal(Array(radial.length).fill(1))))));
  const explicitReference = determinantSignLog(localizer(ar, radialExplicit));
  const explicitDefect = determinantSignLog(localizer(ad, radialExplicit));

  const numericalQt = transpose(system.q);
  const radialNumerical = mul(mul(numericalQt, diagonal(radialFullValues)), system.q);
  const numericalReference = determinantSignLog(localizer(system.ar, radialNumerical));
  const numericalDefect = determinantSignLog(localizer(system.ad, radialNumerical));

  const fiberMultiplicities = [];
  for (let radius = 0; radius <= parameters.M; radius += 1) {
    fiberMultiplicities.push({
      radius,
      dimension: expectedRadii.filter((value) => value === radius).length,
    });
  }
  return {
    parameters,
    sectorSign,
    dimension: explicit.representatives.length,
    identityError,
    glideError,
    radialDiagonalError,
    fiberMultiplicities,
    referenceLongRangeCoupling: maximumLongRangeCoupling(ar),
    defectLongRangeCoupling: maximumLongRangeCoupling(ad),
    explicitReference,
    explicitDefect,
    numericalReference,
    numericalDefect,
  };
};

if (process.argv[1]?.endsWith("explore_pin_half_line_quotient.mjs")) {
  for (const parameters of [
    { L: 2, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25, boundaryMass: 0 },
    { L: 3, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25, boundaryMass: 0.3 },
  ]) console.log(JSON.stringify(analyse(parameters), null, 2));
}

export { analyse, explicitSectorBasis };
