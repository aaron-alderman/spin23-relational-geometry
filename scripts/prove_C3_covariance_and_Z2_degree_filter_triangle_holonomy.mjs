import assert from "node:assert/strict";

const rotate = ([a, b, c]) => [c, a, b];
const parity = (bits) => bits.reduce((x, y) => x ^ y, 0);
const key = (bits) => bits.join("");

const connections = Array.from({ length: 8 }, (_, mask) =>
  [0, 1, 2].map((k) => (mask >> k) & 1),
);

const strictlyC3Invariant = connections.filter((bits) => key(rotate(bits)) === key(bits));
assert.deepEqual(strictlyC3Invariant.map(key).sort(), ["000", "111"]);

const counts = {
  even: connections.filter((bits) => parity(bits) === 0).length,
  odd: connections.filter((bits) => parity(bits) === 1).length,
};
assert.deepEqual(counts, { even: 4, odd: 4 });

// A homogeneous transport has one common Z2 degree d on every edge.
// Its triangle holonomy is 3d=d mod 2.
const homogeneous = [0, 1].map((degree) => {
  const bits = [degree, degree, degree];
  return {
    degree,
    representative: key(bits),
    holonomy: parity(bits),
    cover: parity(bits) ? "connected C6" : "two disjoint C3 sheets",
  };
});
assert.equal(homogeneous[0].holonomy, 0);
assert.equal(homogeneous[1].holonomy, 1);

// Every connection is gauge-equivalent to a representative with only the
// total holonomy on the final edge. Vertex gauge bits act by t_ij -> t_ij+g_i+g_j.
const canonicalize = ([tPI, tIN, tNP]) => {
  const gP = 0;
  const gI = tPI;
  const gN = tPI ^ tIN;
  return [tPI ^ gP ^ gI, tIN ^ gI ^ gN, tNP ^ gN ^ gP];
};
for (const bits of connections) {
  const canonical = canonicalize(bits);
  assert.deepEqual(canonical, [0, 0, parity(bits)]);
}

const result = {
  protocol: "C3-covariance-Z2-degree-filter/1",
  rawConnections: connections.length,
  gaugeClasses: 2,
  strictlyC3InvariantRepresentatives: strictlyC3Invariant.map(key).sort(),
  homogeneousTransports: homogeneous,
  filters: {
    realityDeckEquivariance: "retains all eight raw connections",
    gaugeEquivalence: "reduces them to even and odd holonomy classes",
    strictC3EdgeCovariance: "selects 000 and 111 as symmetric representatives",
    homogeneousEvenDegree: "selects 000 and the trivial C3+C3 cover",
    homogeneousOddDegree: "selects 111 and the connected C6 cover",
  },
  theorem:
    "C3 covariance plus homogeneous Z2 degree reduces the eight edge assignments to two canonical candidates. Even transport gives the trivial double cover; odd transport gives the Mobius double cover.",
  boundary:
    "The axioms must still decide whether relationship transport is even composition or odd represented-one-form/Jordan-triple transport.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
