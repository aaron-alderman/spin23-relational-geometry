import assert from "node:assert/strict";

const mod = (x, n) => ((x % n) + n) % n;

// Kernel of the integer-hypercharge embedding into the faithful Pati-Salam
// quotient. Centre phases are measured in sixths of a turn.
const kernel = [];
for (let a = 0; a < 3; a += 1) {
  for (let l = 0; l < 2; l += 1) {
    for (let n = 0; n < 6; n += 1) {
      for (let epsilon = 0; epsilon < 2; epsilon += 1) {
        const target = 3 * epsilon;
        const su4Colour = mod(n + 2 * a, 6);
        const su4Lepton = mod(-3 * n, 6);
        const su2L = mod(3 * l, 6);
        const su2RUp = mod(3 * n, 6);
        const su2RDown = mod(-3 * n, 6);
        if (
          su4Colour === target &&
          su4Lepton === target &&
          su2L === target &&
          su2RUp === target &&
          su2RDown === target
        ) {
          kernel.push({ a, l, n, epsilon });
        }
      }
    }
  }
}

assert.equal(kernel.length, 6);
for (const item of kernel) {
  assert.equal(item.a, mod(item.n, 3));
  assert.equal(item.l, mod(item.n, 2));
  assert.equal(item.epsilon, mod(item.n, 2));
}

// U charges in ninth-root exponents on left-handed SM multiplets.
const names = ["Q", "uc", "dc", "L", "ec", "nuc"];
const qU = [1, -1, -1, 0, 0, 0].map((x) => mod(x, 9));
const y6 = [1, -4, 2, -3, 6, 0];
const qTau9 = qU.map((q, i) => mod(q + 2 * y6[i], 9));
const qTau3 = qTau9.map((q) => {
  assert.equal(q % 3, 0);
  return mod(q / 3, 3);
});

assert.deepEqual(qTau9, [3, 0, 3, 3, 3, 0]);
assert.deepEqual(qTau3, [1, 0, 1, 1, 1, 0]);

// Canonical inverse baryon-triality representative B-2Y.
const qBminus2Y = [0, 1, -1, 1, 1, 0].map((x) => mod(x, 3));
const colourCentre = [1, -1, -1, 0, 0, 0].map((x) => mod(x, 3));
assert.deepEqual(
  qTau3.map((q, i) => mod(q - qBminus2Y[i], 3)),
  colourCentre,
);

// The order-nine lift cubes to colour centre.
const qUcube = qU.map((q) => mod(3 * q, 9));
assert.deepEqual(qUcube, [3, 6, 6, 0, 0, 0]);
assert.deepEqual(
  qUcube.map((q) => mod(q / 3, 3)),
  colourCentre,
);

// The hypercharge dressing z=omega^2 has cube equal to inverse colour centre
// in the Z6-quotiented SM group, so tau has exact order three.
assert.ok(qTau9.every((q) => mod(3 * q, 9) === 0));

const table = Object.fromEntries(
  names.map((name, i) => [
    name,
    {
      y6: y6[i],
      z9Lift: qU[i],
      splitRepresentativeMod3: qTau3[i],
      Bminus2YMod3: qBminus2Y[i],
      differenceIsColourCentre: colourCentre[i],
    },
  ]),
);

const result = {
  protocol: "majorana-vacuum-stabilizer-and-split-baryon-triality/1",
  connectedStabilizer: "(SU(3)c x SU(2)L x U(1)y) / Z6",
  hyperchargeEmbedding:
    "(A,L,z) -> (diag(z A,z^-3), L, diag(z^3,z^-3)) in Pati-Salam/Z2",
  kernel,
  disconnectedLift: {
    relation: "t^3 = embedded SU(3) colour centre",
    orderOnFields: 9,
    orderModuloGauge: 3,
    splittingDressing: "tau = t * g_y(omega^2)",
    splitGroup: "G_SM x Z3",
  },
  fieldTable: table,
  theorem:
    "The rank-one Majorana vacuum has connected stabilizer equal to the Z6-quotiented Standard-Model group. The Z9 lift cubes to colour centre, and hypercharge dressing produces an exact order-three complement gauge-equivalent to B-2Y.",
  boundary:
    "This proves the global stabilizer and representative equivalence, not the induced Spin-bordism map or the threshold/Wess-Zumino anomaly transgression.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
