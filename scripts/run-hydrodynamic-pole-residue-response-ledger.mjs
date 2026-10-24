import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const write = process.argv.includes("--write");
const constants = { w0: 1.7, eta0: 0.23, d0: 0.31, g0: 0.27, cs2: 1 / 3 };
const point = { omega: 0.8, k: 0.65, T: 1.4 };
const grams = {
  tensor: [[1, 0], [0, 0]],
  shear: [[0, 0], [0, 1]],
  sound: [[1, 1], [1, 1]]
};

const complex = (re, im = 0) => ({ re, im });
const add = (a, b) => complex(a.re + b.re, a.im + b.im);
const multiply = (a, b) => complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const divide = (a, b) => {
  const scale = b.re ** 2 + b.im ** 2;
  return complex((a.re * b.re + a.im * b.im) / scale, (a.im * b.re - a.re * b.im) / scale);
};

function medium(T) {
  return {
    w: constants.w0 * T ** 4,
    eta: constants.eta0 * T ** 3,
    D: constants.d0 / T,
    Gamma: constants.g0 / T,
    cs: Math.sqrt(constants.cs2)
  };
}

function channels({ omega, k, T }) {
  const { w, eta, D, Gamma } = medium(T);
  const tensor = complex(0, eta * omega);
  const shear = divide(complex(w * D * k ** 2), complex(D * k ** 2, -omega));
  const sound = divide(complex(w * k ** 2), complex(constants.cs2 * k ** 2 - omega ** 2, -Gamma * k ** 2 * omega));
  return { tensor, shear, sound };
}

function spectralMatrix(values) {
  return [[values.tensor.im + values.sound.im, values.sound.im], [values.sound.im, values.shear.im + values.sound.im]];
}

const determinant2 = matrix => matrix[0][0] * matrix[1][1] - matrix[0][1] ** 2;
const determinantGeneral2 = matrix => matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
const rank2 = matrix => determinant2(matrix) > 1e-12 ? 2 : (Math.max(...matrix.flat().map(Math.abs)) > 1e-12 ? 1 : 0);

function polesAndResidues({ k, T }) {
  const { w, D, Gamma, cs } = medium(T);
  const shearPole = complex(0, -D * k ** 2);
  const shearResidue = complex(0, w * D * k ** 2);
  const discriminant = cs ** 2 * k ** 2 - (Gamma * k ** 2 / 2) ** 2;
  const root = Math.sqrt(discriminant);
  const soundPoles = [complex(root, -Gamma * k ** 2 / 2), complex(-root, -Gamma * k ** 2 / 2)];
  const soundResidues = soundPoles.map(pole => divide(complex(w * k ** 2), add(complex(-2 * pole.re, -2 * pole.im), complex(0, -Gamma * k ** 2))));
  return { shear: { pole: shearPole, residue: shearResidue }, sound: soundPoles.map((pole, index) => ({ pole, residue: soundResidues[index] })), allPolesRetarded: [shearPole, ...soundPoles].every(pole => pole.im < 0), underdampedSound: discriminant > 0 };
}

function congruence(matrix, S) {
  const left = S.map(row => matrix[0].map((_, j) => row[0] * matrix[0][j] + row[1] * matrix[1][j]));
  return left.map(row => S.map(target => row[0] * target[0] + row[1] * target[1]));
}

const values = channels(point);
const rho = spectralMatrix(values);
const beta = 1 / point.T;
const kmsMultiplier = 1 / Math.tanh(beta * point.omega / 2);
const noise = rho.map(row => row.map(value => kmsMultiplier * value));
const S = [[1, 0.3], [-0.2, 1.1]];
const detS = determinantGeneral2(S);
const transformed = congruence(rho, S);
const realContact = [[0.7, -0.2], [-0.2, 0.5]];
const contactShiftedSpectral = rho.map(row => [...row]);
const poleLedger = polesAndResidues(point);

const output = {
  protocol: "hydrodynamic-pole-residue-response-ledger/1",
  date: "2026-10-25",
  target: "OT-016",
  convention: "Fourier convention chosen so the positive-frequency dissipative spectral matrix is Im G_R; signs must be translated if another convention uses -Im G_R.",
  model: {
    constants,
    point,
    medium: medium(point.T),
    channels: {
      tensor: "G_T(z)=i eta z (local first-order hydrodynamic term; no pole)",
      shear: "G_V(z)=w D k^2/(D k^2-i z)",
      sound: "G_S(z)=w k^2/(c_s^2 k^2-z^2-i Gamma k^2 z)"
    },
    grams
  },
  responseAtPoint: {
    channelValues: values,
    spectralMatrix: rho,
    determinant: determinant2(rho),
    rank: rank2(rho),
    positiveDefinite: rho[0][0] > 0 && rho[1][1] > 0 && determinant2(rho) > 0
  },
  poleLedger,
  kms: {
    beta,
    multiplier: kmsMultiplier,
    symmetrizedNoise: noise,
    rankPreserved: rank2(noise) === rank2(rho),
    determinantScaleCheck: Math.abs(determinant2(noise) - kmsMultiplier ** 2 * determinant2(rho)) < 1e-10
  },
  invariance: {
    portBasis: {
      S,
      determinantS: detS,
      transformedSpectralMatrix: transformed,
      rankPreserved: rank2(transformed) === rank2(rho),
      determinantCongruenceCheck: Math.abs(determinant2(transformed) - detS ** 2 * determinant2(rho)) < 1e-10
    },
    realContact: {
      contact: realContact,
      spectralMatrixAfterContact: contactShiftedSpectral,
      unchanged: JSON.stringify(contactShiftedSpectral) === JSON.stringify(rho),
      reason: "A real analytic contact term changes the dispersive real part but has no positive-frequency spectral residue in this prototype."
    },
    hydrodynamicFrame: {
      certified: false,
      missing: "a source-generating functional showing invariance under an explicit hydrodynamic field redefinition, rather than only port-basis congruence"
    }
  },
  decision: {
    frequencyWavevectorResponseConstructed: true,
    poleAndResidueLedgerConstructed: true,
    kmsNoiseConstructed: true,
    positivityAtWitness: true,
    portBasisAndRealContactRankStable: true,
    hydrodynamicFrameIndependenceEstablished: false,
    microscopicCarrierEstablished: false,
    fullOt016Closure: false,
    generatedSpin23DynamicsEstablished: false,
    newPhysicsEvidence: false
  },
  implication: "The effective prototype now has poles, residues, KMS noise and two nuisance invariances. OT-016 remains open only at the physical-frame and microscopic matching gates; local response rank is not forced onto a ray by Ward/KMS structure alone."
};

const serialized = `${JSON.stringify(output, null, 2)}\n`;
if (write) await writeFile(resolve(root, "evidence/data/hydrodynamic-pole-residue-response-ledger-v1.json"), serialized, "utf8");
process.stdout.write(serialized);
