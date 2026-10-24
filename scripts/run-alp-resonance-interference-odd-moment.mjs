import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const background = 1.7;
const signalResidue = -0.42;
const widthScale = 0.08;
const window = 0.6;
const sampleOffsets = [0.05, 0.12, 0.25, 0.5];

const rate = x => {
  const real = background + signalResidue * x / (x * x + widthScale * widthScale);
  const imaginary = -signalResidue * widthScale / (x * x + widthScale * widthScale);
  return real * real + imaginary * imaginary;
};

const pairedDifferences = sampleOffsets.map(x => ({
  x,
  numeric: rate(x) - rate(-x),
  analytic: 4 * background * signalResidue * x / (x * x + widthScale * widthScale),
}));

const oddMoment = 2 * background * signalResidue * Math.log((window * window + widthScale * widthScale) / (widthScale * widthScale));
const reversedOddMoment = -oddMoment;

const evidence = {
  schema: "admissibility.alp-resonance-interference-odd-moment/1",
  date: "2026-10-25",
  amplitudeModel: "A(x)=B+S/(x+i*gamma), x=m_gg^2-m_a^2, with real locally constant B and S",
  parameters: { background, signalResidue, widthScale, window },
  identities: {
    pairedDifference: "rate(+x)-rate(-x)=4*B*S*x/(x^2+gamma^2)",
    symmetricCountInterference: 0,
    signWeightedMoment: "2*B*S*log((L^2+gamma^2)/gamma^2)",
  },
  pairedDifferences,
  oddMoment,
  reversedOddMoment,
  evenCancellation: {
    constantBackgroundSquared: true,
    pureBreitWignerSignalSquared: true,
    realInterferenceInSymmetricCount: true,
  },
  detectorConditions: {
    symmetricMassResolutionPreservesOddParity: true,
    asymmetricAcceptanceCanLeakEvenTerms: true,
    backgroundSlopeRequiresSidebandNuisance: true,
    absorptivePhasesRequireEvenOddJointFit: true,
    sourceSignReversalRequired: true,
  },
  decisions: {
    ordinarySymmetricYieldRetainsRealInterferenceSign: false,
    oddMassMomentRetainsResidueSignInDeclaredModel: true,
    signalAndLeadingEvenBackgroundCancelFromOddMoment: true,
    detectorLevelLikelihoodComputed: false,
    publicDataRecastCompleted: false,
    newPhysicsEvidence: false,
  },
};

if (process.argv.includes("--write")) writeFileSync(resolve("evidence/data/alp-resonance-interference-odd-moment-v1.json"), `${JSON.stringify(evidence, null, 2)}\n`);
console.log(JSON.stringify({ pairedDifferences, oddMoment, reversedOddMoment }, null, 2));
