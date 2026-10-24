const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const approx = (a, b, tolerance = 1e-12) => Math.abs(a - b) <= tolerance;

const makeCartan = (nodeCount, edges) => {
  const C = Array.from({ length: nodeCount }, (_, i) =>
    Array.from({ length: nodeCount }, (_, j) => Number(i === j) * 2)
  );
  for (const [i, j] of edges) {
    C[i][j] = -1;
    C[j][i] = -1;
  }
  return C;
};

const fold = ({ name, cartan, orbits, expectedBondProducts }) => {
  const n = cartan.length;
  const blockOf = Array(n).fill(-1);
  orbits.forEach((orbit, block) => orbit.forEach(node => {
    assert(blockOf[node] === -1, name + ': node repeated in orbit partition');
    blockOf[node] = block;
  }));
  assert(blockOf.every(block => block >= 0), name + ': orbit partition must cover every node');

  // For orbit-sum basis b_j=sum_{v in O_j} e_v, C b_j has a constant
  // coefficient on each target orbit O_i. Those constants are the columns
  // of the integral quotient.
  const q = orbits.length;
  const quotient = Array.from({ length: q }, () => Array(q).fill(0));
  for (let j = 0; j < q; j += 1) {
    const image = Array(n).fill(0);
    for (const source of orbits[j]) {
      for (let target = 0; target < n; target += 1) {
        image[target] += cartan[target][source];
      }
    }
    for (let i = 0; i < q; i += 1) {
      const values = orbits[i].map(node => image[node]);
      assert(values.every(value => value === values[0]), name + ': partition must be equitable');
      quotient[i][j] = values[0];
    }
  }

  assert(quotient.every((row, i) => row[i] === 2), name + ': quotient diagonal must remain two');
  assert(quotient.every((row, i) => row.every((x, j) => i === j || x <= 0)), name + ': quotient off-diagonals must be nonpositive');

  // Orthonormal orbit-average basis. Similarity by sqrt(|O_i|) makes the
  // quotient symmetric.
  const sizes = orbits.map(orbit => orbit.length);
  const symmetric = quotient.map((row, i) =>
    row.map((x, j) => x * Math.sqrt(sizes[i] / sizes[j]))
  );
  for (let i = 0; i < q; i += 1) {
    for (let j = 0; j < q; j += 1) {
      assert(approx(symmetric[i][j], symmetric[j][i]), name + ': normalized quotient must be symmetric');
    }
  }

  const bondProducts = [];
  for (let i = 0; i < q; i += 1) {
    for (let j = i + 1; j < q; j += 1) {
      const product = quotient[i][j] * quotient[j][i];
      if (product > 0) bondProducts.push(product);
    }
  }
  assert(
    JSON.stringify(bondProducts) === JSON.stringify(expectedBondProducts),
    name + ': unexpected bond multiplicities ' + JSON.stringify(bondProducts)
  );

  return { name, sizes, quotient, symmetric, bondProducts };
};

// A5 reflection: {1,5},{2,4},{3} -> rank-three C/B transpose pair.
const A5 = fold({
  name: 'A5/Z2',
  cartan: makeCartan(5, [[0, 1], [1, 2], [2, 3], [3, 4]]),
  orbits: [[0, 4], [1, 3], [2]],
  expectedBondProducts: [1, 2]
});

// D5 terminal-node exchange: D5/Z2 -> rank-four B/C transpose pair.
const D5 = fold({
  name: 'D5/Z2',
  cartan: makeCartan(5, [[0, 1], [1, 2], [2, 3], [2, 4]]),
  orbits: [[0], [1], [2], [3, 4]],
  expectedBondProducts: [1, 1, 2]
});

// E6 reflection across the central axis: {1,6},{3,5},{4},{2} -> F4.
const E6 = fold({
  name: 'E6/Z2',
  cartan: makeCartan(6, [[0, 2], [2, 3], [3, 4], [4, 5], [1, 3]]),
  orbits: [[0, 5], [2, 4], [3], [1]],
  expectedBondProducts: [1, 2, 1]
});

// D4 triality: three outer nodes form one orbit -> G2.
const D4 = fold({
  name: 'D4/Z3',
  cartan: makeCartan(4, [[0, 1], [0, 2], [0, 3]]),
  orbits: [[1, 2, 3], [0]],
  expectedBondProducts: [3]
});

assert(D4.quotient[0][1] * D4.quotient[1][0] === 3, 'only the order-three fold should produce a triple bond');
for (const result of [A5, D5, E6]) {
  assert(!result.bondProducts.includes(3), result.name + ': order-two fold must not produce a triple bond');
}

console.log('Simply-laced Dynkin fold family certificate: PASS');
for (const result of [A5, D5, E6, D4]) {
  console.log(result.name + ': orbit_sizes=' + JSON.stringify(result.sizes) + ' quotient=' + JSON.stringify(result.quotient) + ' bond_products=' + JSON.stringify(result.bondProducts));
}
console.log('order_two_folds=max_bond_product_2; order_three_D4_fold=bond_product_3');
