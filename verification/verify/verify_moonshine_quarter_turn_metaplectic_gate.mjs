import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const gate = load("../../evidence/data/moonshine-quarter-turn-metaplectic-gate-v1.json");
const moonshine = load("../../evidence/data/moonshine-program-lattice-bridge-v1.json");
const seam = load("../../evidence/data/lattice-subroutine-oriented-seam-modular-line-v1.json");
const mixed = load("../../evidence/data/moonshine-mixed-level46-seam-v1.json");

// Abelianizing Dic_11 forces r=r^-1, hence r^2=1. Since 11 is odd,
// s^2=r^11=r, so s generates C4 and its square is the central sign.
const rOrderAfterAbelianization = 2;
const rToEleventh = 11 % rOrderAfterAbelianization;
assert.equal(rToEleventh, 1);
assert.equal(gate.abelianizations.Dic11.abelianization, "C4");
assert.equal(gate.abelianizations.Dic11.abelianRelation, "r=s^2");

// The finite seam determinant and projective dihedral reflection expose only C2.
assert.equal(seam.additiveCarrier.determinantCharacter.positiveGroupElements, 360);
assert.equal(seam.additiveCarrier.determinantCharacter.negativeGroupElements, 360);
assert.equal(gate.abelianizations.Sp4F2.abelianization, "C2");
assert.equal(gate.abelianizations.D11.abelianization, "C2");
assert.equal(gate.couplingChannels.projective.uniqueNontrivial, true);

// Every C4 -> C2 character kills the square, while the faithful phase
// character s -> i sends s^2 to -1.
assert.equal((-1) ** 2, gate.couplingChannels.binaryLiftOfDic11.centralSquareImage);
const i = {re: 0, im: 1};
const iSquared = {re: i.re * i.re - i.im * i.im, im: 2 * i.re * i.im};
assert.deepEqual(iSquared, {re: -1, im: 0});
assert.equal(gate.couplingChannels.metaplecticLift.centralSquareImage, "-1");
assert.equal(gate.couplingChannels.metaplecticLift.retainsCentralSign, true);
assert.equal(mixed.analyticBoundary.thetaMultiplierRequiresMetaplecticLift, true);
assert(moonshine.finiteTransitionSkeleton.relations.includes("S^2=D_5^11=-I"));
assert(gate.semanticBoundary.notEstablished.includes("physical time"));

console.log(JSON.stringify({
  finiteCommonCharacter: "C2 sign/reflection parity",
  dic11Abelianization: gate.abelianizations.Dic11.abelianization,
  binaryChannelRetainsCentralSign: false,
  metaplecticCandidate: {
    quarterTurn: "i",
    square: "-1",
    phaseGroup: "mu4 inside mu8",
  },
  cocycleCompatibilityComputed: false,
}, null, 2));
console.log("PASS verify_moonshine_quarter_turn_metaplectic_gate");
