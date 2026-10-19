import assert from "node:assert/strict";

const sectors = ["Q", "uc", "dc", "L", "ec", "nuc"];
const b = { Q: 1, uc: -1, dc: -1, L: -3, ec: 3, nuc: 3 }; // 3(B-L)
const lambdaUnique = { Q: 5, uc: 5, dc: 1, L: 1, ec: 1, nuc: 0 };
const lambdaMultiplicity = { Q: 5, uc: 5, dc: 1, L: 1, ec: 3, nuc: 0 };
const pNuc = { Q: 0, uc: 0, dc: 0, L: 0, ec: 0, nuc: 1 };

const classes = (observables) => {
  const grouped = new Map();
  for (const sector of sectors) {
    const key = observables.map((observable) => observable[sector]).join(",");
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(sector);
  }
  return [...grouped.entries()].map(([eigenvalues, members]) => ({ eigenvalues, sectors: members }));
};

const classifications = {
  bOnly: classes([b]),
  incidenceUniqueOnly: classes([lambdaUnique]),
  incidenceMultiplicityOnly: classes([lambdaMultiplicity]),
  bAndPNuc: classes([b, pNuc]),
  bAndIncidenceUnique: classes([b, lambdaUnique]),
  bAndIncidenceMultiplicity: classes([b, lambdaMultiplicity]),
};
assert.equal(classifications.bOnly.length, 4);
assert.equal(classifications.bAndPNuc.length, 5);
assert.equal(classifications.bAndIncidenceUnique.length, 6);
assert.equal(classifications.bAndIncidenceMultiplicity.length, 6);

const omegaUnique = Object.fromEntries(sectors.map((sector) =>
  [sector, lambdaUnique[sector] + 3 * b[sector]]));
const omegaMultiplicity = Object.fromEntries(sectors.map((sector) =>
  [sector, lambdaMultiplicity[sector] + 3 * b[sector]]));
assert.equal(new Set(Object.values(omegaUnique)).size, 6);
assert.equal(new Set(Object.values(omegaMultiplicity)).size, 6);

// Exact Lagrange data: P_r=product_{s!=r}(Omega-omega_s I)/(omega_r-omega_s).
const lagrangeData = (eigenvalues) => Object.fromEntries(sectors.map((sector) => {
  const roots = sectors.filter((other) => other !== sector).map((other) => eigenvalues[other]);
  const denominator = roots.reduce((product, root) => product * (eigenvalues[sector] - root), 1);
  return [sector, { eigenvalue: eigenvalues[sector], otherRoots: roots, denominator }];
}));

console.log(JSON.stringify({
  protocol: "joint-spectrum-of-incidence-and-bl/1",
  observables: {
    threeBMinusL: b,
    incidenceDeduplicated: lambdaUnique,
    incidenceMultiplicityPreserving: lambdaMultiplicity,
    sterileProjector: pNuc,
  },
  generatedCommutativeAlgebraDimensions: {
    bOnly: classifications.bOnly.length,
    incidenceUniqueOnly: classifications.incidenceUniqueOnly.length,
    incidenceMultiplicityOnly: classifications.incidenceMultiplicityOnly.length,
    bAndPNuc: classifications.bAndPNuc.length,
    bAndIncidenceUnique: classifications.bAndIncidenceUnique.length,
    bAndIncidenceMultiplicity: classifications.bAndIncidenceMultiplicity.length,
  },
  jointClasses: classifications,
  primitiveSingleGenerators: {
    rule: "Omega=Lambda+3[3(B-L)]",
    deduplicated: { eigenvalues: omegaUnique, lagrangeProjectors: lagrangeData(omegaUnique) },
    multiplicityPreserving: { eigenvalues: omegaMultiplicity, lagrangeProjectors: lagrangeData(omegaMultiplicity) },
  },
  result: "B-L alone generates four charge classes; B-L plus P_nuc generates five and cannot split uc from dc. B-L plus either natural incidence Laplacian has six distinct joint eigenpairs and generates the full center C^6.",
  interpretation: "Anomaly-free charge and ternary incidence are complementary coordinates on the completed matter center. A one-operator generator exists but depends on relative normalization; the two-observable joint spectrum is the cleaner statement.",
  passed: true,
}, null, 2));
