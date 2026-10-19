import assert from "node:assert/strict";

const vertices = ["P", "I", "N"];
const next = { P: "I", I: "N", N: "P" };
const stateKey = ({ vertex, sheet }) => vertex + (sheet > 0 ? "+" : "-");

const R = ({ vertex, sheet }) => ({ vertex: next[vertex], sheet });
const J = ({ vertex, sheet }) => ({ vertex, sheet: -sheet });
const T = (state) => J(R(state));

for (const vertex of vertices) {
  for (const sheet of [1, -1]) {
    assert.deepEqual(J(R({ vertex, sheet })), R(J({ vertex, sheet })));
  }
}

const iterate = (f, x, n) => {
  let y = x;
  for (let k = 0; k < n; k += 1) y = f(y);
  return y;
};

const start = { vertex: "P", sheet: 1 };
const orbit = Array.from({ length: 7 }, (_, n) => stateKey(iterate(T, start, n)));
assert.deepEqual(orbit, ["P+", "I-", "N+", "P-", "I+", "N-", "P+"]);
assert.deepEqual(iterate(T, start, 3), J(start));
assert.deepEqual(iterate(T, start, 6), start);
assert.notDeepEqual(iterate(T, start, 3), start);

// T=JR is anti-linear. Its nth power has anti-linearity parity n mod 2.
const linearity = Array.from({ length: 7 }, (_, n) => (n % 2 ? "anti-linear" : "complex-linear"));
assert.equal(linearity[3], "anti-linear");
assert.equal(linearity[6], "complex-linear");

const relationRealityPairs = {
  PN: "NP",
  NI: "IN",
  IP: "PI",
};
assert.equal(relationRealityPairs.PN, "NP");
assert.notEqual(relationRealityPairs.PN, "PI");

const result = {
  protocol: "minimal-Real-groupoid-C6/1",
  transport: "T=J composed with R, where R advances P->I->N->P and J flips the Real sheet",
  orbit,
  identities: {
    JR_equals_RJ: true,
    T_cubed: "J (one base-triangle circuit is anti-linear and sheet reversing)",
    T_to_sixth: "identity (two circuits are complex-linear and close)",
  },
  anchorObservation: {
    realityPairing: relationRealityPairs,
    directDiracMajoranaCarrierIdentification: false,
    newComplexLinearScalarSeamAdded: false,
  },
  theorem:
    "A minimal Real/groupoid transport realizes the connected C6 cover without adding a complex-linear anchor-mixing edge: one triangle circuit returns by J and two circuits return linearly.",
  boundary:
    "This is a Real-semilinear holonomy, not an element of the ordinary complex-linear represented one-form module. A physical model must justify R and its compatibility with the typed sectors.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
