import assert from "node:assert/strict";

// The faithful quotient involution acts as:
// Q: three copies of -P2; uc:+I3; dc:-I3; L:-P2; ec:-1; nuc:+1.
// Record the signed permutation on the sixteen one-particle basis states.
const action = [];
const addMinusSwap = () => {
  const a = action.length;
  action.push({ target: a + 1, sign: -1 });
  action.push({ target: a, sign: -1 });
};
for (let color = 0; color < 3; color += 1) addMinusSwap(); // Q, dimension 6
for (let i = 0; i < 3; i += 1) action.push({ target: action.length, sign: 1 }); // uc
for (let i = 0; i < 3; i += 1) action.push({ target: action.length, sign: -1 }); // dc
addMinusSwap(); // L, dimension 2
action.push({ target: action.length, sign: -1 }); // ec
action.push({ target: action.length, sign: 1 }); // nuc
assert.equal(action.length, 16);

for (let i = 0; i < action.length; i += 1) {
  const first = action[i];
  const second = action[first.target];
  assert.equal(second.target, i);
  assert.equal(first.sign * second.sign, 1);
}

// Each -P2 block has eigenvalues (+1,-1). Count the full +/- multiplicities.
const negativeEigenvalues = 3 + 3 + 1 + 1; // Q + dc + L + ec
const positiveEigenvalues = 16 - negativeEigenvalues;
assert.equal(negativeEigenvalues, 8);
assert.equal(positiveEigenvalues, 8);

// Determinant and real Spin-lift square.
const determinant = (-1) ** negativeEigenvalues;
const spinLiftSquare = (-1) ** (negativeEigenvalues * (negativeEigenvalues - 1) / 2);
assert.equal(determinant, 1);
assert.equal(spinLiftSquare, 1);

// Construct the induced exterior-Fock signed permutation on all 2^16 basis
// wedges. The canonical lift fixes the vacuum and must square to identity.
const applyExterior = (mask) => {
  const images = [];
  let coefficient = 1;
  for (let i = 0; i < 16; i += 1) if ((mask >> i) & 1) {
    images.push(action[i].target);
    coefficient *= action[i].sign;
  }
  let inversions = 0;
  for (let i = 0; i < images.length; i += 1) for (let j = i + 1; j < images.length; j += 1) if (images[i] > images[j]) inversions += 1;
  if (inversions % 2) coefficient *= -1;
  const targetMask = images.reduce((m, i) => m | (1 << i), 0);
  return { targetMask, coefficient };
};

assert.deepEqual(applyExterior(0), { targetMask: 0, coefficient: 1 });
for (let mask = 0; mask < (1 << 16); mask += 1) {
  const first = applyExterior(mask);
  const second = applyExterior(first.targetMask);
  assert.equal(second.targetMask, mask);
  assert.equal(first.coefficient * second.coefficient, 1);
}

// Multiplying the implementer by i would give square -1, but it no longer fixes
// the normalized vacuum. It is an arbitrary projective rephasing, not data from
// the faithful one-particle action.
const canonicalVacuumPhase = "+1";
const artificiallyRephasedVacuumPhase = "+i";
const artificiallyRephasedSquare = "-1";

console.log(JSON.stringify({
  protocol: "full-generation-fock-lift-order-two/1",
  oneParticleSpace: {
    dimension: 16,
    positiveEigenvalues,
    negativeEigenvalues,
    determinant,
    involution: true,
  },
  canonicalExteriorFockLift: {
    statesChecked: 1 << 16,
    fixesVacuum: true,
    square: "+1",
  },
  realSpinLift: {
    squareFormula: "(-1)^(m(m-1)/2)",
    m: negativeEigenvalues,
    square: spinLiftSquare,
  },
  arbitraryProjectiveRephasing: {
    canonicalVacuumPhase,
    rephasedVacuumPhase: artificiallyRephasedVacuumPhase,
    rephasedSquare: artificiallyRephasedSquare,
    sourceSelected: false,
  },
  pfaffianBoundary: "can transport relative Z2 spectral-flow parity but supplies no absolute mu4 without a determinant-line sewing map",
  passed: true,
}, null, 2));
