const fields = {
  Qbar: { dimension: 1.5, hypercharge: -1 / 6 },
  Lbar: { dimension: 1.5, hypercharge: +1 / 2 },
  L: { dimension: 1.5, hypercharge: -1 / 2 },
  H: { dimension: 1, hypercharge: +1 / 2 },
  Htilde: { dimension: 1, hypercharge: -1 / 2 },
  uR: { dimension: 1.5, hypercharge: +2 / 3 },
  dR: { dimension: 1.5, hypercharge: -1 / 3 },
  eR: { dimension: 1.5, hypercharge: -1 },
  nuR: { dimension: 1.5, hypercharge: 0 },
};

const sum = (names, key) => names.reduce((s, n) => s + fields[n][key], 0);
const monomials = {
  downYukawa: ["Qbar", "H", "dR"],
  upYukawa: ["Qbar", "Htilde", "uR"],
  chargedLeptonYukawa: ["Lbar", "H", "eR"],
  diracNeutrinoYukawa: ["Lbar", "Htilde", "nuR"],
  oneWeinbergHalf: ["L", "H"],
};

const ledger = Object.fromEntries(
  Object.entries(monomials).map(([name, names]) => [
    name,
    {
      fields: names,
      dimension: sum(names, "dimension"),
      hypercharge: sum(names, "hypercharge"),
    },
  ])
);

ledger.weinbergOperator = {
  fields: ["L", "H", "L", "H"],
  dimension: 2 * ledger.oneWeinbergHalf.dimension,
  hypercharge: 2 * ledger.oneWeinbergHalf.hypercharge,
};

const expectedDimensions = {
  brokenPhaseMajoranaBilinear: 3,
  gaugeTopologicalDensity: 4,
  yukawaOddHermitianCombination: 4,
  unbrokenWeinbergOddCombination: 5,
  higgsDressedTopologicalDensity: 6,
};

const chargeFailures = Object.entries(ledger)
  .filter(([, x]) => Math.abs(x.hypercharge) > 1e-12)
  .map(([name]) => name);
const dimensionChecks =
  ledger.downYukawa.dimension === 4 &&
  ledger.upYukawa.dimension === 4 &&
  ledger.chargedLeptonYukawa.dimension === 4 &&
  ledger.diracNeutrinoYukawa.dimension === 4 &&
  ledger.weinbergOperator.dimension === 5;

const passed = chargeFailures.length === 0 && dimensionChecks;

console.log(
  JSON.stringify(
    {
      protocol: "cp-odd-operator-dimension-gauge-charge-ladder/1",
      convention: "Q=T3+Y; canonical four-dimensional engineering dimensions",
      ledger,
      expectedDimensions,
      chargeFailures,
      caveats: [
        "Hypercharge neutrality is necessary, not sufficient; SU(2) indices must be contracted with the appropriate doublet pairing.",
        "A CP-odd Hermitian combination is i(O-O^dagger); its physical coefficient may require relational flavor invariants.",
        "Constant-coefficient X tilde X is topological and has vanishing local bulk metric variation.",
      ],
      passed,
    },
    null,
    2
  )
);

if (!passed) process.exitCode = 1;
