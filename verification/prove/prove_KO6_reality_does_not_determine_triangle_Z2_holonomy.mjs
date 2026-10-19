import assert from "node:assert/strict";

const edgeNames = ["PI", "IN", "NP"];
const connections = [];

for (let mask = 0; mask < 8; mask += 1) {
  const twists = edgeNames.map((edge, k) => ({ edge, usesJSheetFlip: Boolean((mask >> k) & 1) }));
  const holonomy = twists.reduce((h, x) => h ^ Number(x.usesJSheetFlip), 0);
  // Deck equivariance: flipping the input sheet before transport equals flipping
  // the output sheet after transport for either preserving or switching lifts.
  const deckEquivariant = [0, 1].every((sheet) =>
    twists.every((x) => ((sheet ^ 1) ^ Number(x.usesJSheetFlip)) === ((sheet ^ Number(x.usesJSheetFlip)) ^ 1)),
  );
  connections.push({ twists, holonomy, cover: holonomy ? "connected C6" : "two C3 sheets", deckEquivariant });
}

assert.ok(connections.every((x) => x.deckEquivariant));
assert.equal(connections.filter((x) => x.holonomy === 0).length, 4);
assert.equal(connections.filter((x) => x.holonomy === 1).length, 4);

const result = {
  protocol: "KO6-reality-underdetermines-triangle-holonomy/1",
  fixedData: {
    reality: "J is a sheet-exchanging involution",
    KO6: "J^2=+1 and J gamma=-gamma J",
    triangleEdges: edgeNames,
  },
  exhaustiveConnectionCount: connections.length,
  trivialHolonomyConnections: connections.filter((x) => x.holonomy === 0).length,
  mobiusHolonomyConnections: connections.filter((x) => x.holonomy === 1).length,
  allConnectionsJEquivariant: connections.every((x) => x.deckEquivariant),
  missingDatum: "a rule selecting whether each base-edge transport is T_e or J composed with T_e",
  theorem: "KO-6 reality supplies the deck involution but does not select the Z2 connection. Both trivial and Mobius triangle holonomies are compatible with J^2=1 and J gamma=-gamma J.",
  resolutionRequirements: [
    "explicit physical particle/conjugate representation",
    "specified transport or represented one-form along each relation edge",
    "junk quotient determining which mixed transports survive",
    "proof that the selected holonomy survives symmetry breaking",
  ],
  status: "indeterminate from the current axioms",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
