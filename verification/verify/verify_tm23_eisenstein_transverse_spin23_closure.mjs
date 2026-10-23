import assert from "node:assert/strict";

const zero4 = () => Array.from({ length: 4 }, () => Array(4).fill(0));
const identity4 = () => Array.from({ length: 4 }, (_, i) =>
  Array.from({ length: 4 }, (_, j) => (i === j ? 1 : 0)));
const add = (a, b) => a.map((row, i) => row.map((value, j) => value + b[i][j]));
const scale = (a, matrix) => matrix.map((row) => row.map((value) => {
  const product = a * value;
  return Object.is(product, -0) ? 0 : product;
}));
const multiply = (a, b) => a.map((row) =>
  b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
const transpose = (matrix) => matrix[0].map((_, j) => matrix.map((row) => row[j]));
const bracket = (a, b) => add(multiply(a, b), scale(-1, multiply(b, a)));
const flat = (matrix) => matrix.flat();
function power(matrix, exponent) {
  let answer = identity4();
  for (let i = 0; i < exponent; i += 1) answer = multiply(matrix, answer);
  return answer;
}

function rank(vectors, tolerance = 1e-10) {
  if (vectors.length === 0) return 0;
  const matrix = vectors.map((vector) => [...vector]);
  let row = 0;
  for (let column = 0; column < matrix[0].length && row < matrix.length; column += 1) {
    let pivot = row;
    while (pivot < matrix.length && Math.abs(matrix[pivot][column]) < tolerance) pivot += 1;
    if (pivot === matrix.length) continue;
    [matrix[row], matrix[pivot]] = [matrix[pivot], matrix[row]];
    const divisor = matrix[row][column];
    for (let j = column; j < matrix[0].length; j += 1) matrix[row][j] /= divisor;
    for (let i = 0; i < matrix.length; i += 1) {
      if (i === row) continue;
      const factor = matrix[i][column];
      for (let j = column; j < matrix[0].length; j += 1) {
        matrix[i][j] -= factor * matrix[row][j];
      }
    }
    row += 1;
  }
  return row;
}

function nullspace(matrix, tolerance = 1e-10) {
  const reduced = matrix.map((row) => [...row]);
  const pivotColumns = [];
  let pivotRow = 0;
  for (let column = 0; column < reduced[0].length && pivotRow < reduced.length; column += 1) {
    let pivot = pivotRow;
    while (pivot < reduced.length && Math.abs(reduced[pivot][column]) < tolerance) pivot += 1;
    if (pivot === reduced.length) continue;
    [reduced[pivotRow], reduced[pivot]] = [reduced[pivot], reduced[pivotRow]];
    const divisor = reduced[pivotRow][column];
    for (let j = column; j < reduced[0].length; j += 1) reduced[pivotRow][j] /= divisor;
    for (let i = 0; i < reduced.length; i += 1) {
      if (i === pivotRow) continue;
      const factor = reduced[i][column];
      for (let j = column; j < reduced[0].length; j += 1) {
        reduced[i][j] -= factor * reduced[pivotRow][j];
      }
    }
    pivotColumns.push(column);
    pivotRow += 1;
  }
  const pivotSet = new Set(pivotColumns);
  const freeColumns = [...Array(reduced[0].length).keys()].filter((column) => !pivotSet.has(column));
  return freeColumns.map((freeColumn) => {
    const vector = Array(reduced[0].length).fill(0);
    vector[freeColumn] = 1;
    for (let i = 0; i < pivotColumns.length; i += 1) {
      vector[pivotColumns[i]] = -reduced[i][freeColumn];
    }
    return vector;
  });
}

function linearCombination(coefficients, basis) {
  return coefficients.reduce(
    (answer, coefficient, i) => add(answer, scale(coefficient, basis[i])),
    zero4(),
  );
}

function lieClosure(seeds) {
  const basis = [];
  for (const seed of seeds) {
    if (rank([...basis.map(flat), flat(seed)]) > basis.length) basis.push(seed);
  }
  for (let head = 0; head < basis.length; head += 1) {
    for (let j = 0; j < head; j += 1) {
      const next = bracket(basis[head], basis[j]);
      if (rank([...basis.map(flat), flat(next)]) > basis.length) basis.push(next);
    }
  }
  return basis;
}

const integralJ = [
  [0, 0, 1, 0],
  [0, 0, 0, 1],
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
];
const selectedOrderThree = [
  [-2, 0, -3, 0],
  [0, -2, 0, 3],
  [1, 0, 1, 0],
  [0, -1, 0, 1],
];
const mutualShear = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [3, 2, 1, 0],
  [2, 3, 0, 1],
];
const shearLogarithm = add(mutualShear, scale(-1, identity4()));
assert.deepEqual(multiply(shearLogarithm, shearLogarithm), zero4());
assert.deepEqual(add(identity4(), shearLogarithm), mutualShear);

// Standard ten-dimensional linear basis of sp(4,R): X=[[A,B],[C,-A^T]],
// with A arbitrary and B,C symmetric.
const sp4Basis = [];
for (let i = 0; i < 2; i += 1) {
  for (let j = 0; j < 2; j += 1) {
    const x = zero4();
    x[i][j] = 1;
    x[j + 2][i + 2] = -1;
    sp4Basis.push(x);
  }
}
for (const [i, j] of [[0, 0], [0, 1], [1, 1]]) {
  const upper = zero4();
  upper[i][j + 2] = 1;
  upper[j][i + 2] = 1;
  if (i === j) upper[i][j + 2] = 1;
  sp4Basis.push(upper);
  const lower = zero4();
  lower[i + 2][j] = 1;
  lower[j + 2][i] = 1;
  if (i === j) lower[i + 2][j] = 1;
  sp4Basis.push(lower);
}
assert.equal(rank(sp4Basis.map(flat)), 10);
for (const x of sp4Basis) {
  assert.deepEqual(add(multiply(transpose(x), integralJ), multiply(integralJ, x)), zero4());
}

const commutatorColumns = sp4Basis.map((x) => flat(bracket(x, selectedOrderThree)));
const commutatorEquations = [...Array(16).keys()].map((row) =>
  commutatorColumns.map((column) => column[row]));
const centralizerCoefficients = nullspace(commutatorEquations);
const centralizer = centralizerCoefficients.map((coefficients) =>
  linearCombination(coefficients, sp4Basis));
assert.equal(centralizer.length, 4);

const derivedSeeds = [];
for (let i = 0; i < centralizer.length; i += 1) {
  for (let j = i + 1; j < centralizer.length; j += 1) {
    derivedSeeds.push(bracket(centralizer[i], centralizer[j]));
  }
}
const semisimpleCentralizer = lieClosure(derivedSeeds);
assert.equal(semisimpleCentralizer.length, 3);
assert.equal(rank([...centralizer.map(flat), flat(shearLogarithm)]), 5);

const compactTurn = add(scale(2, selectedOrderThree), identity4());
assert.deepEqual(multiply(compactTurn, compactTurn), scale(-3, identity4()));

const closureWithU11 = lieClosure([...centralizer, shearLogarithm]);
const closureWithSU11 = lieClosure([...semisimpleCentralizer, shearLogarithm]);
const closureWithSU11TurnAndShear = lieClosure([
  ...semisimpleCentralizer,
  compactTurn,
  shearLogarithm,
]);
assert.equal(closureWithU11.length, 10);
assert.equal(closureWithSU11.length, 6);
assert.equal(closureWithSU11TurnAndShear.length, 10);

// Stricter discrete-data test: the identity components of the Zariski closures
// of the three conjugate unipotent cyclic subgroups have Lie generators
// Ad(M^j)N, j=0,1,2.  No continuous-centralizer directions are assumed here.
const conjugateShearLogarithms = [0, 1, 2].map((j) => {
  const mPower = power(selectedOrderThree, j);
  const inversePower = power(selectedOrderThree, (3 - j) % 3);
  return multiply(multiply(mPower, shearLogarithm), inversePower);
});
const discreteZariskiLieClosure = lieClosure(conjugateShearLogarithms);
assert.equal(discreteZariskiLieClosure.length, 6);

// The equal-discriminant-five selector also supplies one trace-three
// hyperbolic element on each handle.  For a trace-three SL(2) element H, its
// real logarithm is a nonzero scalar multiple of 2H-3I, so the following are
// the exact rational directions of the two connected split tori.
const handleHyperbolicDirections = [
  [
    [-3, 0, -2, 0],
    [0, 0, 0, 0],
    [2, 0, 3, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, -3, 0, -2],
    [0, 0, 0, 0],
    [0, 2, 0, 3],
  ],
];
const traceThreeHandleMatrices = [
  [
    [0, 0, -1, 0],
    [0, 1, 0, 0],
    [1, 0, 3, 0],
    [0, 0, 0, 1],
  ],
  [
    [1, 0, 0, 0],
    [0, 0, 0, -1],
    [0, 0, 1, 0],
    [0, 1, 0, 3],
  ],
];
for (const direction of handleHyperbolicDirections) {
  assert.deepEqual(
    add(multiply(transpose(direction), integralJ), multiply(integralJ, direction)),
    zero4(),
  );
}
const fullSelectorZariskiLieClosure = lieClosure([
  shearLogarithm,
  ...handleHyperbolicDirections,
]);
assert.equal(fullSelectorZariskiLieClosure.length, 10);

// Standard TKK/Hamiltonian typing.  For X=[[A,B],[C,-A^T]], B and C are
// symmetric and the quadratic Hamiltonian Hessian is G=-JX.
function tkkBlocks(x) {
  return {
    A: x.slice(0, 2).map((row) => row.slice(0, 2)),
    B: x.slice(0, 2).map((row) => row.slice(2)),
    C: x.slice(2).map((row) => row.slice(0, 2)),
  };
}
function hamiltonianHessian(x) {
  return scale(-1, multiply(integralJ, x));
}
const dynamicalDirections = [...handleHyperbolicDirections, shearLogarithm];
for (const direction of dynamicalDirections) {
  const hessian = hamiltonianHessian(direction);
  assert.deepEqual(transpose(hessian), hessian);
}
assert.deepEqual(tkkBlocks(handleHyperbolicDirections[0]), {
  A: [[-3, 0], [0, 0]],
  B: [[-2, 0], [0, 0]],
  C: [[2, 0], [0, 0]],
});
assert.deepEqual(tkkBlocks(handleHyperbolicDirections[1]), {
  A: [[0, 0], [0, -3]],
  B: [[0, 0], [0, -2]],
  C: [[0, 0], [0, 2]],
});
assert.deepEqual(tkkBlocks(shearLogarithm), {
  A: [[0, 0], [0, 0]],
  B: [[0, 0], [0, 0]],
  C: [[3, 2], [2, 3]],
});

const activeTraceThree = [[0, -1], [1, 3]];
const activeHyperbolicDirection = [[-3, -2], [2, 3]];
assert.deepEqual(multiply(activeHyperbolicDirection, activeHyperbolicDirection), [[5, 0], [0, 5]]);
assert.deepEqual(
  add(scale(1.5, [[1, 0], [0, 1]]), scale(0.5, activeHyperbolicDirection)),
  activeTraceThree,
);
const hyperbolicStepTime = Math.acosh(1.5) / Math.sqrt(5);
assert.ok(Math.abs(Math.cosh(Math.sqrt(5) * hyperbolicStepTime) - 1.5) < 1e-14);
assert.ok(Math.abs(
  Math.sinh(Math.sqrt(5) * hyperbolicStepTime) / Math.sqrt(5) - 0.5,
) < 1e-14);

function matrixMod(matrix, modulus) {
  return matrix.map((row) => row.map((value) => ((value % modulus) + modulus) % modulus));
}
function multiplyMod(a, b, modulus) {
  return matrixMod(multiply(a, b), modulus);
}
function finiteOrder(matrix, modulus, ceiling = 100) {
  let current = identity4();
  for (let order = 1; order <= ceiling; order += 1) {
    current = multiplyMod(matrix, current, modulus);
    if (JSON.stringify(current) === JSON.stringify(identity4())) return order;
  }
  return null;
}
function enumerateFiniteMatrixGroup(generators, modulus) {
  const identity = identity4();
  const key = (matrix) => matrix.flat().join(",");
  const seen = new Map([[key(identity), identity]]);
  const queue = [identity];
  for (let head = 0; head < queue.length; head += 1) {
    for (const generator of generators) {
      const next = multiplyMod(generator, queue[head], modulus);
      const nextKey = key(next);
      if (seen.has(nextKey)) continue;
      seen.set(nextKey, next);
      queue.push(next);
    }
  }
  return queue;
}
const levelThreeGenerators = [...traceThreeHandleMatrices, mutualShear].map((matrix) => matrixMod(matrix, 3));
assert.deepEqual(levelThreeGenerators.map((matrix) => finiteOrder(matrix, 3)), [4, 4, 3]);
const levelThreeGroup = enumerateFiniteMatrixGroup(levelThreeGenerators, 3);
assert.equal(levelThreeGroup.length, 51840);
const repairedMachineMod3 = matrixMod(selectedOrderThree, 3);
assert.deepEqual(repairedMachineMod3, [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 0, 1, 0],
  [0, 2, 0, 1],
]);
const repairedMachineNilpotentMod3 = matrixMod(
  add(repairedMachineMod3, scale(-1, identity4())),
  3,
);
assert.equal(rank(repairedMachineNilpotentMod3.map((row) => [...row])), 2);
assert.deepEqual(
  multiplyMod(repairedMachineNilpotentMod3, repairedMachineNilpotentMod3, 3),
  zero4(),
);

function thetaAction(matrix, characteristic) {
  const bits = [3, 2, 1, 0].map((shift) => (characteristic >> shift) & 1);
  const mu = bits.slice(0, 2);
  const nu = bits.slice(2);
  const A = matrix.slice(0, 2).map((row) => row.slice(0, 2));
  const B = matrix.slice(0, 2).map((row) => row.slice(2));
  const C = matrix.slice(2).map((row) => row.slice(0, 2));
  const D = matrix.slice(2).map((row) => row.slice(2));
  const CDT = multiply(C, transpose(D));
  const ABT = multiply(A, transpose(B));
  const mod2 = (n) => ((n % 2) + 2) % 2;
  const nextMu = [0, 1].map((i) => mod2(
    D[i][0] * mu[0] + D[i][1] * mu[1] -
    C[i][0] * nu[0] - C[i][1] * nu[1] + CDT[i][i]));
  const nextNu = [0, 1].map((i) => mod2(
    -B[i][0] * mu[0] - B[i][1] * mu[1] +
    A[i][0] * nu[0] + A[i][1] * nu[1] + ABT[i][i]));
  return nextMu.concat(nextNu).reduce((answer, bit) => 2 * answer + bit, 0);
}

assert.equal(thetaAction(selectedOrderThree, 15), 15);
assert.equal(thetaAction(mutualShear, 15), 15);
assert.notDeepEqual(
  multiply(mutualShear, selectedOrderThree),
  multiply(selectedOrderThree, mutualShear),
);

console.log(JSON.stringify({
  sourceSelectedData: {
    cyclicRepair: "selected exact order-three lift",
    transverseGenerator: "equal-discriminant-five mutual shear",
    mutualShearPreservesQStar: true,
    mutualShearIsMod4SelectorGenerator: true,
  },
  centralizer: {
    dimension: centralizer.length,
    realForm: "u(1,1)",
    derivedDimension: semisimpleCentralizer.length,
    derivedRealForm: "su(1,1) ~= spin(2,1)",
  },
  transverseClosure: {
    shearIsOutsideCentralizer: true,
    withU11: closureWithU11.length,
    withSU11Alone: closureWithSU11.length,
    canonicalCompactTurn: "Z=2*M_3+I, Z^2=-3*I",
    withSU11CompactTurnAndShear: closureWithSU11TurnAndShear.length,
    target: "sp(4,R) ~= spin(2,3)",
  },
  discretePairZariskiTest: {
    generators: "Ad(M_3^j)(log K), j=0,1,2",
    seedRank: rank(conjugateShearLogarithms.map(flat)),
    closureDimension: discreteZariskiLieClosure.length,
  },
  fullArithmeticSelectorZariskiTest: {
    generators:
      "log directions of the two trace-three handle elements and the mutual shear",
    seedRank: rank([shearLogarithm, ...handleHyperbolicDirections].map(flat)),
    closureDimension: fullSelectorZariskiLieClosure.length,
  },
  carrierDynamics: {
    type: "piecewise-constant quadratic Hamiltonian control system",
    handleChannels: "X_i=2*K_i-3*H_i-2*T_i",
    mutualChannel: "N=K([[3,2],[2,3]])",
    finiteTimes: {
      handle: hyperbolicStepTime,
      mutualShear: 1,
    },
    exactFiniteMaps: {
      handle: "exp(t_h*X_i)=H_i, t_h=acosh(3/2)/sqrt(5)",
      mutualShear: "exp(N)=I+N=K",
    },
    lieRankCondition: 10,
    conclusion:
      "the Lie-algebra rank condition gives full local accessibility; controllability requires reversible/signed controls",
  },
  levelThreeBFDynamics: {
    reducedGeneratorOrders: [4, 4, 3],
    interpretation: [
      "local handle-1 Fourier",
      "local handle-2 Fourier",
      "mutual BF phase/shear",
    ],
    generatedGroup: "Sp(4,F_3)",
    generatedGroupOrder: levelThreeGroup.length,
    irreducibleHeisenbergCarrierDimension: 9,
    repairedMachineGate: {
      matrix: repairedMachineMod3,
      type: "oppositely oriented local self shears / qutrit phase gates",
      nilpotentRank: 2,
      nilpotenceDegree: 2,
      order: 3,
    },
  },
  boundary:
    "This proves algebraic generation and a carrier-level switched quadratic flow with exact finite times; it does not derive the switching controls from the irreversible Turing update or microscopic fields.",
}, null, 2));
console.log("PASS verify_tm23_eisenstein_transverse_spin23_closure");
