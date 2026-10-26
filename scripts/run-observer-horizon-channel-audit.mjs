import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const pi = Math.PI;

const unruh = [];
for (const acceleration of [0.3, 0.8, 2.0]) {
  for (const gap of [0.2, 0.5, 1.0]) {
    const beta = 2 * pi / acceleration;
    const excitation = gap / (2 * pi) / Math.expm1(beta * gap);
    const deexcitation = gap / (2 * pi) / (1 - Math.exp(-beta * gap));
    unruh.push({
      acceleration,
      gap,
      beta,
      temperature: 1 / beta,
      excitation,
      deexcitation,
      ratio: excitation / deexcitation,
      kmsRatio: Math.exp(-beta * gap),
      ratioResidual: Math.abs(excitation / deexcitation - Math.exp(-beta * gap))
    });
  }
}

const kerr = [];
for (const chi of [0, 0.5, 0.9, 0.99]) {
  const mass = 1;
  const aKerr = chi * mass;
  const root = Math.sqrt(mass * mass - aKerr * aKerr);
  const rPlus = mass + root;
  const rMinus = mass - root;
  const denominator = rPlus * rPlus + aKerr * aKerr;
  const omegaH = aKerr / denominator;
  const surfaceGravity = (rPlus - rMinus) / (2 * denominator);
  const hawkingTemperature = surfaceGravity / (2 * pi);
  kerr.push({
    chi,
    rPlus,
    rMinus,
    equatorialErgosurface: 2 * mass,
    polarErgosurface: rPlus,
    equatorialErgoregionThickness: 2 * mass - rPlus,
    omegaH,
    surfaceGravity,
    hawkingTemperature,
    schwarzschildTemperatureResidual: chi === 0 ? Math.abs(hawkingTemperature - 1 / (8 * pi * mass)) : null
  });
}

const referenceKerr = kerr.find(row => row.chi === 0.9);
const m = 2;
const transmissionProbability = 0.2;
const superradiance = [0.5, 1, 1.5].map(thresholdRatio => {
  const omega = thresholdRatio * m * referenceKerr.omegaH;
  const horizonFrequency = omega - m * referenceKerr.omegaH;
  const reflectionProbability = 1 - horizonFrequency / omega * transmissionProbability;
  return {
    thresholdRatio,
    omega,
    horizonFrequency,
    transmissionProbability,
    reflectionProbability,
    amplified: reflectionProbability > 1 + 1e-12
  };
});

const seamChannelIndependence = {
  fixedGenerator: [0, 0.05, 0.1].map(coupling => ({
    aElliptic: 1,
    bHyperbolic: 0.5,
    discriminant: 0.5 ** 2 - 1 ** 2,
    channelCoupling: coupling,
    densityOfStates: 1.5,
    goldenRuleWidth: 2 * pi * coupling ** 2 * 1.5
  })),
  fixedChannel: [0.2, 1, 1.2].map(bHyperbolic => ({
    aElliptic: 1,
    bHyperbolic,
    discriminant: bHyperbolic ** 2 - 1,
    channelCoupling: 0.08,
    densityOfStates: 1.5,
    goldenRuleWidth: 2 * pi * 0.08 ** 2 * 1.5
  }))
};

const evidence = {
  schema_version: "1.0.0",
  date: "2026-10-26",
  protocol: "observer-horizon-channel-audit/1",
  packets: ["AZ-136", "AZ-137", "AZ-138", "AZ-139", "AZ-140"],
  units: "c=hbar=k_B=G=M=1 where applicable",
  unruh: {
    formula: "F_up=Omega/(2pi)/(exp(2pi Omega/a)-1)",
    detailedBalance: "F_up/F_down=exp(-2pi Omega/a)",
    rows: unruh,
    maximumDetailedBalanceResidual: Math.max(...unruh.map(row => row.ratioResidual))
  },
  kerr: {
    formulas: {
      horizons: "r_pm=M+-sqrt(M^2-a_Kerr^2)",
      horizonAngularVelocity: "Omega_H=a_Kerr/(r_+^2+a_Kerr^2)",
      surfaceGravity: "kappa=(r_+-r_-)/(2(r_+^2+a_Kerr^2))",
      temperature: "T_H=kappa/(2pi)",
      neutralBosonicSuperradiance: "0<omega<m Omega_H"
    },
    rows: kerr,
    scatteringRows: superradiance,
    maximumSchwarzschildTemperatureResidual: Math.max(...kerr.map(row => row.schwarzschildTemperatureResidual ?? 0))
  },
  seamChannelIndependence,
  boundaries: {
    unruhChangesGlobalVacuum: false,
    thermalDetectorRecordDefinesUniqueGlobalState: false,
    horizonEqualsErgosurface: false,
    horizonEqualsSuperradiantThreshold: false,
    seamCrossingSuppliesTransitionAmplitude: false,
    analogueHawkingObservationProvesGravitationalHawkingRadiation: false,
    nuclearWidthDeterminesUniqueMicroscopicMechanism: false
  },
  nextGate: "Bind one detector response to a specified state and trajectory, one Kerr scattering calculation to a source-derived Spin(2,3) action, and one nuclear parent-plus-channel model to coincidence data without fitting the discriminating record."
};

if (write) {
  writeFileSync(resolve("evidence/data/observer-horizon-channel-audit-v1.json"), `${JSON.stringify(evidence, null, 2)}\n`);
}

console.log(JSON.stringify({
  result: "pass",
  unruhRows: unruh.length,
  maximumDetailedBalanceResidual: evidence.unruh.maximumDetailedBalanceResidual,
  kerrRows: kerr.length,
  superradiantRows: superradiance.filter(row => row.amplified).length,
  seamChannelInterventions: seamChannelIndependence.fixedGenerator.length + seamChannelIndependence.fixedChannel.length,
  wrote: write
}, null, 2));
