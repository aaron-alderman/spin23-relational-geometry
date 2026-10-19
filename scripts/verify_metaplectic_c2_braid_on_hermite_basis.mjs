import assert from "node:assert/strict";

// Phases are stored as exponents of zeta_8 = exp(i*pi/4).
const mod8 = (n) => ((n % 8) + 8) % 8;

const P = ({ m, n, phase }) => ({ m: n, n: m, phase: mod8(phase + 2) });
const S = ({ m, n, phase }) => ({ m, n, phase: mod8(phase - 1 - 2 * n) });

function applyWord(word, m, n) {
  let state = { m, n, phase: 0 };
  for (const letter of [...word].reverse()) state = letter === "P" ? P(state) : S(state);
  return state;
}

for (let m = 0; m < 12; m += 1) {
  for (let n = 0; n < 12; n += 1) {
    const left = applyWord("PSPS", m, n);
    const right = applyWord("SPSP", m, n);
    const expectedLongest = { m, n, phase: mod8(2 - 2 * (m + n)) };
    assert.deepEqual(left, right);
    assert.deepEqual(left, expectedLongest);

    const fourth = applyWord("PSPSPSPS", m, n);
    const expectedMinusParity = { m, n, phase: mod8(4 + 4 * (m + n)) };
    assert.deepEqual(fourth, expectedMinusParity);

    const eighth = applyWord("PSPSPSPSPSPSPSPS", m, n);
    assert.deepEqual(eighth, { m, n, phase: 0 });
  }
}

console.log(JSON.stringify({
  protocol: "metaplectic-c2-braid-on-hermite-basis/1",
  convention: {
    zeta8: "exp(i*pi/4)",
    Ptilde: "i times channel swap",
    Stilde: "exp(-i*pi/4) times the second-channel Fourier transform",
    FourierEigenvalue: "F h_n = (-i)^n h_n"
  },
  braid: {
    equality: "Ptilde Stilde Ptilde Stilde = Stilde Ptilde Stilde Ptilde",
    commonValue: "i times the full two-channel Fourier transform",
    checkedHermitePairs: 144
  },
  powers: {
    fourthPowerOfCoxeterLift: "minus full parity (a lift of -I4)",
    eighthPowerOfCoxeterLift: "identity"
  },
  signChoiceResult: "Changing either simple lift by the central sign changes neither four-letter word because each generator occurs twice.",
  conclusion: "There is no metaplectic braid anomaly. A fixed Maslov phase remains in the common longest-word operator, but it is coherent and sign-choice independent."
}, null, 2));
