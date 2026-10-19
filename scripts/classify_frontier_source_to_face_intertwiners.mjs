import assert from "node:assert/strict";

// Source basis: (lambda, q), where q is the Ward-protected B-L direction.
// Target basis: (s, d), the even and odd eigendirections of face exchange.
const G = [
  [231, 9],
  [9, 48],
];
const targetParity = [1, -1];

const parityCases = [
  { id: "same-even", sourceParity: [1, 1] },
  { id: "same-odd", sourceParity: [-1, -1] },
  { id: "lambda-odd-q-even", sourceParity: [-1, 1] },
  { id: "lambda-even-q-odd", sourceParity: [1, -1] },
].map((entry) => {
  const allowedEntries = [];
  for (let row = 0; row < 2; row += 1) {
    for (let col = 0; col < 2; col += 1) {
      if (targetParity[row] === entry.sourceParity[col]) allowedEntries.push([row, col]);
    }
  }
  const hasPerfectMatching =
    allowedEntries.some(([r, c]) => r === 0 && c === 0) &&
      allowedEntries.some(([r, c]) => r === 1 && c === 1) ||
    allowedEntries.some(([r, c]) => r === 0 && c === 1) &&
      allowedEntries.some(([r, c]) => r === 1 && c === 0);
  const wardQToEvenAllowed = allowedEntries.some(([row, col]) => row === 0 && col === 1);
  return {
    ...entry,
    allowedEntries,
    equivariantHomDimension: allowedEntries.length,
    fullRankIntertwinerExists: hasPerfectMatching,
    wardQToEvenAllowed,
  };
});

assert.equal(parityCases.find((x) => x.id === "same-even").fullRankIntertwinerExists, false);
assert.equal(parityCases.find((x) => x.id === "same-odd").fullRankIntertwinerExists, false);
assert.equal(parityCases.find((x) => x.id === "lambda-odd-q-even").fullRankIntertwinerExists, true);
assert.equal(parityCases.find((x) => x.id === "lambda-even-q-odd").fullRankIntertwinerExists, true);
assert.equal(parityCases.find((x) => x.id === "lambda-odd-q-even").wardQToEvenAllowed, true);

// Impose the free-UV source Gram matrix and require q to map to the normalized
// exchange-even face direction.  The remaining column is fixed up to orientation.
const qNorm = Math.sqrt(G[1][1]);
const lambdaEvenComponent = G[0][1] / qNorm;
const lambdaOddMagnitude = Math.sqrt(G[0][0] - (G[0][1] ** 2) / G[1][1]);
const metricMatchedMaps = [-1, 1].map((orientation) => [
  [lambdaEvenComponent, qNorm],
  [orientation * lambdaOddMagnitude, 0],
]);

const transposeTimesSelf = (M) => [
  [M[0][0] ** 2 + M[1][0] ** 2, M[0][0] * M[0][1] + M[1][0] * M[1][1]],
  [M[0][1] * M[0][0] + M[1][1] * M[1][0], M[0][1] ** 2 + M[1][1] ** 2],
];
const close = (a, b) => Math.abs(a - b) < 1e-10;
for (const M of metricMatchedMaps) {
  const recovered = transposeTimesSelf(M);
  assert.ok(recovered.every((row, i) => row.every((value, j) => close(value, G[i][j]))));
  assert.ok(close(M[1][1], 0)); // q maps to the exchange-even axis.
  assert.notEqual(M[1][0], 0); // full rank requires lambda to have odd component.
}
assert.ok(close(metricMatchedMaps[0][0][0], metricMatchedMaps[1][0][0]));
assert.ok(close(metricMatchedMaps[0][1][0], -metricMatchedMaps[1][1][0]));

const result = {
  protocol: "frontier-source-to-furey-face-intertwiner/1",
  bases: {
    source: ["lambda-incidence", "q=B-L"],
    target: ["s=face-sum (exchange even)", "d=face-difference (exchange odd)"],
  },
  freeUvGram: G,
  parityCases,
  metricMatchedWardMaps: metricMatchedMaps.map((matrix, index) => ({
    orientation: index === 0 ? -1 : 1,
    matrix,
  })),
  exactConclusions: [
    "If the two source currents carry the same source-label CP/reversal parity, every exchange-equivariant linear map into the face plane has rank at most one.",
    "A full-rank exchange-equivariant map exists only after the source plane itself is split into one even and one odd line.",
    "Requiring the Ward-protected B-L line to map to the exchange-even face sum selects the conditional parity assignment q even and lambda odd.",
    "The free-UV Gram matrix and the Ward-axis condition then leave exactly two metric-matched maps, exchanged by reversal of the face-difference orientation.",
  ],
  physicalBoundary:
    "The Standard-Model vector-current pair does not by itself supply a relative source-label CP sign. Treating lambda as odd therefore requires an additional CP-odd spurion, boundary orientation, or a genuinely opposite-parity probe.",
  orderBoundary:
    "A linear isometry of current-label spaces is not yet a completely positive map: complete positivity requires an operator-system extension and a declared positive cone/order unit on the source operators.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
