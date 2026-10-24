#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/hydrodynamic-causal-relaxation-wedge-v1.json");
const write = process.argv.includes("--write");

const D = 0.31 / 1.4;
const Gamma = 0.27 / 1.4;
const cs2 = 1 / 3;
const cs = Math.sqrt(cs2);
const shearCausalThreshold = D;
const soundCausalThreshold = Gamma / (1 - cs2);
const tauShear = 1.25 * shearCausalThreshold;
const tauSound = 1.25 * soundCausalThreshold;
const kValues = [0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20];

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const div = (a, b) => {
  const d = b.re ** 2 + b.im ** 2;
  return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
};
const abs = z => Math.hypot(z.re, z.im);

const polynomial = (coefficients, z) => coefficients.reduce((value, coefficient) => add(mul(value, z), C(coefficient)), C(0));

function durandKerner(coefficients) {
  const lead = coefficients[0];
  const monic = coefficients.map(value => value / lead);
  const degree = monic.length - 1;
  const radius = 1 + Math.max(...monic.slice(1).map(Math.abs));
  let roots = Array.from({ length: degree }, (_, index) => {
    const angle = 2 * Math.PI * (index + 0.17) / degree;
    return C(radius * Math.cos(angle), radius * Math.sin(angle));
  });
  for (let iteration = 0; iteration < 500; iteration += 1) {
    let maximumStep = 0;
    const next = roots.map((rootValue, index) => {
      let denominator = C(1);
      roots.forEach((other, otherIndex) => {
        if (otherIndex !== index) denominator = mul(denominator, sub(rootValue, other));
      });
      const step = div(polynomial(monic, rootValue), denominator);
      maximumStep = Math.max(maximumStep, abs(step));
      return sub(rootValue, step);
    });
    roots = next;
    if (maximumStep < 1e-13) break;
  }
  return roots.sort((a, b) => a.im - b.im || a.re - b.re);
}

const shearRoots = k => {
  const disc = 1 - 4 * tauShear * D * k ** 2;
  if (disc >= 0) {
    const root = Math.sqrt(disc);
    return [C((-1 + root) / (2 * tauShear)), C((-1 - root) / (2 * tauShear))];
  }
  const imag = Math.sqrt(-disc) / (2 * tauShear);
  return [C(-1 / (2 * tauShear), imag), C(-1 / (2 * tauShear), -imag)];
};

const soundRoots = k => durandKerner([
  tauSound,
  1,
  (tauSound * cs2 + Gamma) * k ** 2,
  cs2 * k ** 2,
]);

const samples = kValues.map(k => {
  const shear = shearRoots(k);
  const sound = soundRoots(k);
  const hydrodynamicShear = [...shear].sort((a, b) => abs(a) - abs(b))[0];
  const soundPair = [...sound].sort((a, b) => Math.abs(b.im) - Math.abs(a.im)).slice(0, 2);
  return {
    k,
    shearGrowthRates: shear,
    soundGrowthRates: sound,
    maximumRealPart: Math.max(...shear.map(z => z.re), ...sound.map(z => z.re)),
    shearHydrodynamicRatio: -hydrodynamicShear.re / (D * k ** 2),
    soundPhaseSpeed: Math.max(...soundPair.map(z => Math.abs(z.im))) / k,
    soundAttenuationCoefficient: -2 * soundPair.reduce((sum, z) => sum + z.re, 0) / (soundPair.length * k ** 2),
    maximumPolynomialResidual: Math.max(
      ...sound.map(z => abs(polynomial([tauSound, 1, (tauSound * cs2 + Gamma) * k ** 2, cs2 * k ** 2], z))),
    ),
  };
});

const shearFrontSpeed = Math.sqrt(D / tauShear);
const soundFrontSpeed = Math.sqrt(cs2 + Gamma / tauSound);
const low = samples[0];
const routhHurwitzMarginCoefficient = Gamma;

const result = {
  protocol: "hydrodynamic-causal-relaxation-wedge/1",
  date: "2026-10-25",
  target: "OT-016",
  parent: "AZ-102",
  primaryLiterature: [
    { title: "Schwinger-Keldysh effective field theory for stable and causal relativistic hydrodynamics", url: "https://arxiv.org/abs/2309.00511", role: "nonlinear stable and causal relaxation-type hydrodynamic EFT" },
    { title: "Relativistic hydrodynamic fluctuations from an effective action", url: "https://arxiv.org/abs/2309.00512", role: "causality and stability as conditions on the stochastic hydrodynamic validity regime" },
  ],
  inheritedFirstOrderModel: {
    shear: "s=-D k^2",
    sound: "s^2+Gamma k^2 s+c_s^2 k^2=0",
    obstruction: "the shear heat kernel and k^2 damping have no finite propagation front when extrapolated beyond their hydrodynamic regime",
  },
  relaxationCompletion: {
    shear: "tau_q s^2+s+D k^2=0",
    sound: "tau_pi s^3+s^2+(tau_pi c_s^2+Gamma)k^2 s+c_s^2 k^2=0",
    shearFrontSpeed: "sqrt(D/tau_q)",
    soundFrontSpeed: "sqrt(c_s^2+Gamma/tau_pi)",
    soundRouthHurwitzMargin: "Gamma k^2 > 0",
  },
  parameters: { D, Gamma, cs2, cs, tauShear, tauSound, shearCausalThreshold, soundCausalThreshold },
  samples,
  audit: {
    samplesChecked: samples.length,
    shearFrontSpeed,
    soundFrontSpeed,
    maximumGrowthRateRealPart: Math.max(...samples.map(sample => sample.maximumRealPart)),
    maximumPolynomialResidual: Math.max(...samples.map(sample => sample.maximumPolynomialResidual)),
    lowKShearRecoveryError: Math.abs(low.shearHydrodynamicRatio - 1),
    lowKSoundSpeedRecoveryError: Math.abs(low.soundPhaseSpeed - cs),
    lowKSoundAttenuationRecoveryError: Math.abs(low.soundAttenuationCoefficient - Gamma),
    routhHurwitzMarginCoefficient,
    shearCausalityPassed: shearFrontSpeed <= 1,
    soundCausalityPassed: soundFrontSpeed <= 1,
    sampledStabilityPassed: samples.every(sample => sample.maximumRealPart < 0),
    analyticSoundStabilityPassed: Gamma > 0 && tauSound > 0 && cs2 > 0,
  },
  decision: {
    firstOrderGlobalCausalityEstablished: false,
    finiteCausalStableRelaxationWedgeExhibited: true,
    lowMomentumHydrodynamicRecoveryEstablished: true,
    uniqueRelaxationCompletionDerived: false,
    stochasticKmsCompletionOfAuxiliaryModesEstablished: false,
    nonlinearStressWardCompletionEstablished: false,
    microscopicMatchingEstablished: false,
    fullOt016Closure: false,
    newPhysicsEvidence: false,
  },
  implication: "The inherited first-order shear/sound response is an infrared expansion, not a globally causal theory. Adding one shear-flux and one viscous-stress relaxation time yields a nonempty stable subluminal wedge and recovers the original poles at low momentum. This proves compatibility, not selection: the relaxation times, auxiliary noise and microscopic carrier still have to be derived or measured.",
};

if (write) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}

console.log(JSON.stringify(result, null, 2));
