import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const WRITE = process.argv.includes("--write");
const OUTPUT = "evidence/data/rdg-maxwell-fixed-complex-selector-v1.json";
const EPS = 1e-10;

const zeros = (rows, cols) => Array.from({ length: rows }, () => Array(cols).fill(0));
const identity = size => Array.from({ length: size }, (_, i) => Array.from({ length: size }, (_, j) => Number(i === j)));
const transpose = matrix => matrix[0].map((_, j) => matrix.map(row => row[j]));
const multiply = (left, right) => left.map(row => right[0].map((_, j) => row.reduce((sum, value, k) => sum + value * right[k][j], 0)));
const subtract = (left, right) => left.map((row, i) => row.map((value, j) => value - right[i][j]));
const add = (left, right) => left.map((row, i) => row.map((value, j) => value + right[i][j]));
const scale = (value, matrix) => matrix.map(row => row.map(entry => value * entry));
const apply = (matrix, vector) => matrix.map(row => row.reduce((sum, value, j) => sum + value * vector[j], 0));
const maxAbs = matrix => Math.max(0, ...matrix.flat().map(Math.abs));
const vectorMaxAbs = vector => Math.max(0, ...vector.map(Math.abs));

function rank(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  const a = matrix.map(row => row.map(Number));
  let pivotRow = 0;
  for (let col = 0; col < a[0].length && pivotRow < a.length; col += 1) {
    let pivot = pivotRow;
    while (pivot < a.length && Math.abs(a[pivot][col]) < EPS) pivot += 1;
    if (pivot === a.length) continue;
    [a[pivotRow], a[pivot]] = [a[pivot], a[pivotRow]];
    const divisor = a[pivotRow][col];
    a[pivotRow] = a[pivotRow].map(value => value / divisor);
    for (let row = 0; row < a.length; row += 1) {
      if (row === pivotRow) continue;
      const factor = a[row][col];
      if (Math.abs(factor) < EPS) continue;
      a[row] = a[row].map((value, j) => value - factor * a[pivotRow][j]);
    }
    pivotRow += 1;
  }
  return pivotRow;
}

function firstNonzeroColumn(matrix) {
  for (let col = 0; col < matrix[0].length; col += 1) {
    const witness = matrix.map(row => row[col]);
    if (vectorMaxAbs(witness) > EPS) return { column: col, output: witness };
  }
  return null;
}

function periodicCubeComplex(N = 2) {
  const V = N ** 3;
  const E = 3 * V;
  const F = 3 * V;
  const C = V;
  const mod = value => (value + N) % N;
  const v = (x, y, z) => mod(x) * N * N + mod(y) * N + mod(z);
  const e = (axis, x, y, z) => axis * V + v(x, y, z);
  const f = (normal, x, y, z) => normal * V + v(x, y, z);
  const c = (x, y, z) => v(x, y, z);
  const shift = ([x, y, z], axis, amount = 1) => {
    const q = [x, y, z];
    q[axis] += amount;
    return q;
  };

  const d0 = zeros(E, V);
  const d1 = zeros(F, E);
  const d2 = zeros(C, F);
  for (let x = 0; x < N; x += 1) for (let y = 0; y < N; y += 1) for (let z = 0; z < N; z += 1) {
    const p = [x, y, z];
    for (let axis = 0; axis < 3; axis += 1) {
      d0[e(axis, ...p)][v(...p)] -= 1;
      d0[e(axis, ...p)][v(...shift(p, axis))] += 1;
      d2[c(...p)][f(axis, ...p)] -= 1;
      d2[c(...p)][f(axis, ...shift(p, axis))] += 1;
    }

    // Oriented face fluxes: B_x=Dy A_z-Dz A_y and cyclic permutations.
    d1[f(0, ...p)][e(2, ...shift(p, 1))] += 1;
    d1[f(0, ...p)][e(2, ...p)] -= 1;
    d1[f(0, ...p)][e(1, ...shift(p, 2))] -= 1;
    d1[f(0, ...p)][e(1, ...p)] += 1;

    d1[f(1, ...p)][e(0, ...shift(p, 2))] += 1;
    d1[f(1, ...p)][e(0, ...p)] -= 1;
    d1[f(1, ...p)][e(2, ...shift(p, 0))] -= 1;
    d1[f(1, ...p)][e(2, ...p)] += 1;

    d1[f(2, ...p)][e(1, ...shift(p, 0))] += 1;
    d1[f(2, ...p)][e(1, ...p)] -= 1;
    d1[f(2, ...p)][e(0, ...shift(p, 1))] -= 1;
    d1[f(2, ...p)][e(0, ...p)] += 1;
  }

  const translation = degree => {
    const size = [V, E, F, C][degree];
    const T = zeros(size, size);
    for (let x = 0; x < N; x += 1) for (let y = 0; y < N; y += 1) for (let z = 0; z < N; z += 1) {
      const p = [x, y, z];
      const q = shift(p, 0);
      if (degree === 0) T[v(...q)][v(...p)] = 1;
      if (degree === 3) T[c(...q)][c(...p)] = 1;
      if (degree === 1) for (let axis = 0; axis < 3; axis += 1) T[e(axis, ...q)][e(axis, ...p)] = 1;
      if (degree === 2) for (let axis = 0; axis < 3; axis += 1) T[f(axis, ...q)][f(axis, ...p)] = 1;
    }
    return T;
  };

  return { N, dimensions: [V, E, F, C], d: [d0, d1, d2], translation, indexes: { v, e, f, c } };
}

function simplex3Complex() {
  const vertices = [[0], [1], [2], [3]];
  const edges = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
  const faces = [[0,1,2],[0,1,3],[0,2,3],[1,2,3]];
  const cells = [[0,1,2,3]];
  const indexOf = (list, item) => list.findIndex(candidate => candidate.length === item.length && candidate.every((value, i) => value === item[i]));
  const boundaryMatrix = (higher, lower) => {
    const boundary = zeros(lower.length, higher.length);
    higher.forEach((cell, column) => {
      for (let i = 0; i < cell.length; i += 1) {
        const face = cell.filter((_, j) => j !== i);
        boundary[indexOf(lower, face)][column] += i % 2 === 0 ? 1 : -1;
      }
    });
    return boundary;
  };
  const d0 = transpose(boundaryMatrix(edges, vertices));
  const d1 = transpose(boundaryMatrix(faces, edges));
  const d2 = transpose(boundaryMatrix(cells, faces));
  return { dimensions: [vertices.length, edges.length, faces.length, cells.length], d: [d0,d1,d2] };
}

function bettiNumbers(dimensions, differentials) {
  const ranks = differentials.map(rank);
  return {
    ranks,
    betti: [
      dimensions[0] - ranks[0],
      dimensions[1] - ranks[0] - ranks[1],
      dimensions[2] - ranks[1] - ranks[2],
      dimensions[3] - ranks[2],
    ],
  };
}

const torus = periodicCubeComplex(2);
const [d0,d1,d2] = torus.d;
const chainResiduals = [maxAbs(multiply(d1,d0)), maxAbs(multiply(d2,d1))];
const topology = bettiNumbers(torus.dimensions, torus.d);

const translations = [0,1,2,3].map(torus.translation);
const projectors = translations.map((T, degree) => scale(0.5, add(identity(torus.dimensions[degree]), T)));
const defects = projectors.map((P, degree) => subtract(identity(torus.dimensions[degree]), P));
const selectorCommutators = torus.d.map((d, degree) => subtract(multiply(d, projectors[degree]), multiply(projectors[degree + 1], d)));
const defectCommutators = torus.d.map((d, degree) => subtract(multiply(d, defects[degree]), multiply(defects[degree + 1], d)));
const projectedTopology = selectors => {
  const dimensions = selectors.map(rank);
  const ranks = torus.d.map((d,degree) => rank(multiply(d,selectors[degree])));
  return {
    dimensions,
    differentialRanks:ranks,
    betti:[
      dimensions[0]-ranks[0],
      dimensions[1]-ranks[0]-ranks[1],
      dimensions[2]-ranks[1]-ranks[2],
      dimensions[3]-ranks[2],
    ],
  };
};
const admittedTopology=projectedTopology(projectors);
const defectTopology=projectedTopology(defects);
const transportCommutators = torus.d.map((d, degree) => subtract(multiply(d, translations[degree]), multiply(translations[degree + 1], d)));

const bad = torus.dimensions.map(size => zeros(size,size));
bad[0] = identity(torus.dimensions[0]);
bad[3] = identity(torus.dimensions[3]);
for (let degree = 1; degree <= 2; degree += 1) {
  const block = torus.dimensions[degree] / 3;
  for (let i = 0; i < block; i += 1) bad[degree][i][i] = 1;
}
const badCommutators = torus.d.map((d, degree) => subtract(multiply(d,bad[degree]), multiply(bad[degree+1],d)));
const badWitness = firstNonzeroColumn(multiply(d1,multiply(bad[1],d0)));

const harmonic = [0,1,2].map(axis => Array.from({ length: torus.dimensions[1] }, (_, i) => Number(Math.floor(i / (torus.dimensions[1] / 3)) === axis)));
const harmonicMatrix = transpose(harmonic);
const augmentedD0 = d0.map((row, i) => [...row, ...harmonicMatrix[i]]);
const harmonicCurlResiduals = harmonic.map(form => vectorMaxAbs(apply(d1,form)));
const harmonicPeriodSums = harmonic.map(form => form.reduce((sum,value) => sum + value,0));

const simplex = simplex3Complex();
const simplexTopology = bettiNumbers(simplex.dimensions,simplex.d);

const record = {
  schemaVersion: "rdg-maxwell-fixed-complex-selector-v1",
  date: "2026-10-26",
  purpose: "Test whether an RDG-style symmetry selector can preserve a typed discrete Maxwell complex and expose the obstruction created by an untyped repair.",
  carrier: {
    complex: "2x2x2 periodic oriented cubic cell complex",
    cochainDimensions: { C0: torus.dimensions[0], C1: torus.dimensions[1], C2: torus.dimensions[2], C3: torus.dimensions[3] },
    typing: { C0: "gauge scalars chi", C1: "vector potentials A", C2: "magnetic fluxes B", C3: "magnetic-charge tests" },
    differentialRanks: topology.ranks,
    bettiNumbers: topology.betti,
    chainResiduals: { d1d0: chainResiduals[0], d2d1: chainResiduals[1] },
  },
  selector: {
    group: "Z2 generated by one-cell translation in x on the N=2 periodic complex",
    definition: "Pi_k=(I+T_k)/2 on every cochain degree; Q_k=I-Pi_k",
    projectorResiduals: projectors.map(P => maxAbs(subtract(multiply(P,P),P))),
    chainCommutatorResiduals: selectorCommutators.map(maxAbs),
    defectChainCommutatorResiduals: defectCommutators.map(maxAbs),
    admittedSubcomplex:admittedTopology,
    defectSubcomplex:defectTopology,
    interpretation: "Haar averaging is a gauge-compatible admissibility selector only because the group acts by cochain maps on every degree.",
  },
  gaugeAndTopology: {
    gaugeKernelResidual: chainResiduals[0],
    harmonicOneForms: 3,
    harmonicCurlResiduals,
    harmonicPeriodSums,
    rankD0: rank(d0),
    rankD0WithHarmonicGenerators: rank(augmentedD0),
    conclusion: "The three constant axial one-forms span the H1 remainder: they are curl-free but not periodic gradients and require Wilson-period coordinates.",
  },
  untypedSelectorCounterexample: {
    definition: "identity on C0/C3 and keep-only-x-component projection on C1/C2",
    chainCommutatorRanks: badCommutators.map(rank),
    chainCommutatorResiduals: badCommutators.map(maxAbs),
    manufacturedCurvatureWitnessVertex: badWitness.column,
    manufacturedCurvatureMaxAbs: vectorMaxAbs(badWitness.output),
    conclusion: "An idempotent selector on each carrier space need not be a chain map; this one turns a pure gauge d0 chi into nonzero selected curvature.",
  },
  dynamicTransport: {
    map: "one-cell x translation used as a topology-preserving geometry update",
    chainCommutatorResiduals: transportCommutators.map(maxAbs),
    conclusion: "This update transports the full complex functorially. Arbitrary repair/projection does not inherit that property.",
  },
  topologyChange: {
    periodicTorusBetti: topology.betti,
    contractibleThreeSimplexBetti: simplexTopology.betti,
    contractibleThreeSimplexDifferentialRanks: simplexTopology.ranks,
    conclusion: "A torus-to-contractible carrier change removes three H1 Wilson sectors and three H2 flux sectors; no degreewise chain isomorphism can hide that event.",
  },
  verdict: "The fixed-complex bridge passes exactly for a symmetry action that is a cochain action. Haar projection alone is insufficient: admissibility must commute with the differential, preserve harmonic records, and use typed transport when geometry changes.",
};

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  if (WRITE) {
    fs.mkdirSync(path.dirname(path.join(ROOT,OUTPUT)),{recursive:true});
    fs.writeFileSync(path.join(ROOT,OUTPUT),`${JSON.stringify(record,null,2)}\n`);
  }
  console.log(JSON.stringify({ output: OUTPUT, wrote: WRITE, ...record }, null, 2));
}

export { add, apply, bettiNumbers, defects, identity, maxAbs, multiply, periodicCubeComplex, projectors, rank, scale, subtract, transpose, vectorMaxAbs, zeros };

