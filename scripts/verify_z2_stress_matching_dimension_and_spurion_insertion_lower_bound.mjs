const dimensions = {
  spacetime: 4,
  stressTensor: 4,
  momentumSpaceStressTwoPoint: 2 * 4 - 4,
  Hl: 2,
  Hnu: 2,
  Glnu: 4,
  Z2: 2 + 2 + 4,
  fullKernelMatchingCoefficient: 4 - 8,
  reducedDimensionlessFormFactorCoefficient: 0 - 8,
  higgsVev: 1,
  chargedLeptonYukawa: 0,
  weinbergCoefficient: -1,
};

const insertions = {
  chargedLeptonMass: 4,
  majoranaMass: 4,
  chargedLeptonYukawaUnbroken: 4,
  weinbergCoefficientUnbroken: 4,
  higgsVevPowerUnbroken: 4 + 2 * 4,
  typeIYnuMinimumFromFourC5: 8,
  typeIHeavyInverseMassPower: 4,
};

const unbrokenDimension =
  insertions.higgsVevPowerUnbroken * dimensions.higgsVev +
  insertions.chargedLeptonYukawaUnbroken * dimensions.chargedLeptonYukawa +
  insertions.weinbergCoefficientUnbroken * dimensions.weinbergCoefficient;

const result = {
  protocol: "z2-stress-matching-dimension-spurion-lower-bound/1",
  dimensions,
  insertions,
  identities: {
    Z2: "Tr(H_l H_nu G_lnu)",
    Hl: "M_l M_l^dagger",
    Hnu: "m_nu m_nu^dagger",
    Glnu: "m_nu H_l^* m_nu^dagger",
    unbrokenScaling: "Z2 ~ v^12 Y_l^4 C5^4",
    typeIScaling: "C5 ~ Y_nu M_R^-1 Y_nu^T",
  },
  unbrokenDimension,
  fullStressSpectralConvention: "Pi(q)=integral d^4x exp(iqx)<TT> has dimension 4; rho(s) in Pi=integral ds rho/(s-q^2) also has dimension 4",
  reducedConvention: "after factoring a q^4 spin-projector tensor, the scalar form factor is dimensionless and its coefficient multiplying Z2 has dimension -8",
  exactLowerBoundScope: "analytic polynomial dependence on spurions without inverse flavor invariants or nonanalytic resummation",
  loopOrderStatus: "not determined by spurion count; topology, gauge contractions and LNV flow must be drawn explicitly",
};
result.passed =
  dimensions.momentumSpaceStressTwoPoint === 4 &&
  dimensions.Z2 === 8 &&
  dimensions.fullKernelMatchingCoefficient === -4 &&
  dimensions.reducedDimensionlessFormFactorCoefficient === -8 &&
  unbrokenDimension === 8 &&
  insertions.chargedLeptonMass === 4 &&
  insertions.majoranaMass === 4;

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
