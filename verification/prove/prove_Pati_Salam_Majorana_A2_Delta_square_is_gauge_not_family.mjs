import assert from "node:assert/strict";

// Abstract bimodule labels for the complexified two-summand Pati-Salam
// representation. Reality swaps the two summands.
const source = { left: "X_R", opposite: "Y_lepton" };
const target = { left: "Y_lepton", opposite: "X_R" };

const changesLeft = source.left !== target.left;
const changesOpposite = source.opposite !== target.opposite;
const firstOrderCompatible = !changesLeft || !changesOpposite;

assert.equal(changesLeft, true);
assert.equal(changesOpposite, true);
assert.equal(firstOrderCompatible, false);

// Delta is in (2_R,4). Its symmetric square decomposes by
// Sym^2(V tensor W) = Sym^2 V tensor Sym^2 W
//                     + Alt^2 V tensor Alt^2 W.
const dim2 = 2;
const dim4 = 4;
const sym2 = (n) => (n * (n + 1)) / 2;
const alt2 = (n) => (n * (n - 1)) / 2;

const carrierDimension = dim2 * dim4;
const symmetricSquareDimension = sym2(carrierDimension);
const tripletTenDimension = sym2(dim2) * sym2(dim4);
const singletSixDimension = alt2(dim2) * alt2(dim4);

assert.equal(symmetricSquareDimension, 36);
assert.equal(tripletTenDimension, 30);
assert.equal(singletSixDimension, 6);
assert.equal(
  symmetricSquareDimension,
  tripletTenDimension + singletSixDimension,
);

// A concrete rank-one Delta and H = Delta Delta verify symmetry and rank one.
const Delta = [1, 2, -1, 0, 3, 1, -2, 4];
const H = Delta.map((x) => Delta.map((y) => x * y));
for (let i = 0; i < H.length; i += 1) {
  for (let j = 0; j < H.length; j += 1) {
    assert.equal(H[i][j], H[j][i]);
    assert.equal(H[i][j] * H[0][0], H[i][0] * H[0][j]);
  }
}

const sourceFieldIndices = {
  Delta: ["SU2_R", "SU4_color_lepton"],
  generation: [],
};
assert.equal(sourceFieldIndices.generation.length, 0);

console.log(
  JSON.stringify(
    {
      protocol: "Pati-Salam-Majorana-A2-Delta-square-gauge-not-family/1",
      bimoduleLabels: { source, target },
      defectTest: {
        changesLeft,
        changesOpposite,
        firstOrderCompatible,
        conclusion:
          "The full Pati-Salam Majorana edge is a diagonal first-order defect.",
      },
      sourcedComponent:
        "(A_(2))_(dot a I)^(dot b' J') = k^(nu_R)* Delta_(dot a J) Delta_(dot b I)",
      representationArithmetic: {
        Delta: "(2_R,1_L,4)",
        symmetricSquare:
          "Sym^2(2 tensor 4) = (Sym^2 2 tensor Sym^2 4) + (Alt^2 2 tensor Alt^2 4)",
        result: "(3_R,1_L,10) + (1_R,1_L,6)",
        dimensions: {
          Sym2OfEight: symmetricSquareDimension,
          tripletTen: tripletTenDimension,
          singletSix: singletSixDimension,
          sum: tripletTenDimension + singletSixDimension,
        },
      },
      rankOneCompositeVerified: true,
      familyAudit: {
        DeltaIndices: sourceFieldIndices.Delta,
        DeltaGenerationIndices: sourceFieldIndices.generation,
        generationDependence:
          "The fixed coefficient k^(nu_R) is a 3x3 matrix; Delta itself is generation blind.",
        conclusion:
          "The published Delta square is a Pati-Salam gauge composite, not a B-3L_i family composite.",
      },
      passed: true,
    },
    null,
    2,
  ),
);
