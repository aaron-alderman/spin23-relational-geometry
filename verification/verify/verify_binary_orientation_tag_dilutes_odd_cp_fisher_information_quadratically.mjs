import assert from "node:assert/strict";

const latentInformation = 0.12982650378676153;

function analyze(fidelity) {
  const dilution = 2 * fidelity - 1;
  const observedInformation = dilution ** 2 * latentInformation;
  return {
    fidelity,
    dilution,
    observedInformation,
    retainedFraction: observedInformation / latentInformation
  };
}

const sweep = [0, 0.25, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map(analyze);
const fidelityForFraction = fraction => (1 + Math.sqrt(fraction)) / 2;
const targets = [0.1, 0.5, 0.9, 0.99].map(fraction => ({
  targetRetainedFraction: fraction,
  minimumFidelityAssumingBetterThanRandomTag: fidelityForFraction(fraction)
}));

for (const row of sweep) {
  assert.ok(Math.abs(row.retainedFraction - (2 * row.fidelity - 1) ** 2) < 1e-14);
}
assert.ok(Math.abs(analyze(0.5).observedInformation) < 1e-14);
assert.ok(Math.abs(analyze(0).retainedFraction - 1) < 1e-14);
assert.ok(Math.abs(analyze(1).retainedFraction - 1) < 1e-14);
assert.ok(Math.abs(analyze(0.9).retainedFraction - 0.64) < 1e-14);

console.log(JSON.stringify({
  protocol: "binary-orientation-tag-dilution/1",
  response: "Pr(T=Z)=r, Pr(T=-Z)=1-r",
  dilution: "D=2r-1",
  observedScore: "s_obs(T,u)=D T h(u)",
  informationLaw: "I_obs=D^2 I_latent",
  sweep,
  targets,
  randomTagBoundary: "r=1/2 erases the entire exchange-odd score.",
  antiTagResult: "r<1/2 is not intrinsically bad if the sign is calibrated; r=0 is a perfectly invertible anti-tag.",
  calibrationBoundary: "If D is unconstrained, the local CP amplitude and D appear only through their product and are not separately identifiable from the signal sample.",
  passed: true
}, null, 2));
