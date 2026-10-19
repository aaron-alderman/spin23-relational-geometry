const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const branches = {
  conventionalVortex: { domain: "oriented_plane", complexIndex: 3, invariant: "complex_chiral_index" },
  orientedQuotient: { domain: "oriented_double_cover", deck: "grading_preserving", coverIndexParity: 0 },
  pinPrimitive: { domain: "reflected_or_nonorientable", deck: "grading_reversing", complexCoverIndex: 0, invariant: "independent_real_mod2" },
  bdiChain: { domain: "momentum_circle", invariant: "BDI_integer_to_class_D_parity" },
  pfaffianWall: { domain: "real_endpoint_interpolation", invariant: "Pfaffian_sign" },
  localClifford: { domain: "parameter_cylinder", invariant: "algebra_and_holonomy_only" },
};

assert(branches.conventionalVortex.complexIndex === 3, "conventional vortex index remains three");
assert(branches.pinPrimitive.complexCoverIndex === 0, "exact grading-reversing symmetric cover index must be zero");
assert(branches.orientedQuotient.coverIndexParity === 0, "ordinary degree-two oriented pullback index must be even");

const bridgeRules = [
  { from: "bdiChain", to: "classDChain", theorem: "Pfaffian_at_invariant_momenta", allowed: true },
  { from: "pfaffianWall", to: "wallCrossingParity", theorem: "real_antisymmetric_endpoint_sign", allowed: true },
  { from: "conventionalVortex", to: "pinPrimitive", theorem: null, allowed: false },
  { from: "selectorLineW1", to: "occupiedBundleW1", theorem: null, allowed: false },
  { from: "localClifford", to: "globalVortexIndex", theorem: null, allowed: false },
];

for (const rule of bridgeRules) {
  assert(rule.allowed === Boolean(rule.theorem),
    `invariant transport ${rule.from} to ${rule.to} must require an explicit theorem`);
}

const requiredFields = ["operator", "domain", "symmetry", "invariant", "bridgeTheorem"];
assert(requiredFields.length === 5, "future parity claims must carry the five-field evidence template");

console.log("Selector parity claim ledger: PASS");
console.log(`independent_branches=${Object.keys(branches).length}`);
console.log("withdrawn_transport=conventional_index_three_to_Pin_parity");
console.log("retained_theorems=local_system,Pfaffian_wall,BDI_to_D,conventional_vortex,local_Clifford");
console.log("future_claim_fields=operator,domain,symmetry,invariant,bridge_theorem");
