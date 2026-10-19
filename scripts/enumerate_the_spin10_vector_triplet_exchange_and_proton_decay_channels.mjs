import assert from "node:assert/strict";

// Charges use left-handed Weyl fields, B3=3B.
const fields = {
  Q:   { B3: 1,  L: 0 },
  uc:  { B3: -1, L: 0 },
  dc:  { B3: -1, L: 0 },
  L:   { B3: 0,  L: 1 },
  ec:  { B3: 0,  L: -1 },
  nuc: { B3: 0,  L: -1 },
};

const current = (name, scalar, members) => ({
  name,
  scalar,
  members,
  B3: members.reduce((sum, field) => sum + fields[field].B3, 0),
  L: members.reduce((sum, field) => sum + fields[field].L, 0),
});

// 10_H -> T + Tbar + Hu + Hd.  The unique 16_F 16_F 10_H invariant
// supplies the following colored-triplet currents.
const T = [
  current("QQ", "T", ["Q", "Q"]),
  current("uc_ec", "T", ["uc", "ec"]),
  current("dc_nuc", "T", ["dc", "nuc"]),
];
const Tbar = [
  current("Q_L", "Tbar", ["Q", "L"]),
  current("uc_dc", "Tbar", ["uc", "dc"]),
];

const desired = new Set(["uc_ec*Q_L", "dc_nuc*Q_L"]);
const channels = [];
for (const left of T) for (const right of Tbar) {
  const key = `${left.name}*${right.name}`;
  const B3 = left.B3 + right.B3;
  const L = left.L + right.L;
  const classification = desired.has(key)
    ? "desired_FCp_arm"
    : B3 === 0 && L === 0
      ? "additional_B_and_L_conserving"
      : "proton_decay_DeltaB_equals_DeltaL";
  channels.push({
    key,
    currents: [left.name, right.name],
    fields: [...left.members, ...right.members],
    B: B3 / 3,
    L,
    BminusL: B3 / 3 - L,
    classification,
  });
}

assert.equal(channels.length, 6);
assert.equal(channels.filter(({ classification }) => classification === "desired_FCp_arm").length, 2);
assert.equal(channels.filter(({ classification }) => classification === "additional_B_and_L_conserving").length, 1);
assert.equal(channels.filter(({ classification }) => classification === "proton_decay_DeltaB_equals_DeltaL").length, 3);
assert(channels.every(({ BminusL }) => BminusL === 0));
assert.deepEqual(
  channels.filter(({ classification }) => classification === "proton_decay_DeltaB_equals_DeltaL").map(({ key }) => key),
  ["QQ*Q_L", "uc_ec*uc_dc", "dc_nuc*uc_dc"],
);
assert.deepEqual(
  channels.filter(({ classification }) => classification === "additional_B_and_L_conserving").map(({ key }) => key),
  ["QQ*uc_dc"],
);

console.log(JSON.stringify({
  protocol: "Spin10-vector-triplet-exchange-proton-decay-census/1",
  parentInvariant: "16_F 16_F 10_H with 10_H -> T + Tbar + H_u + H_d",
  tripletCurrents: { T, Tbar },
  exchangeChannels: channels,
  counts: {
    total: 6,
    desiredFCpArms: 2,
    additionalBandLConserving: 1,
    protonDecayDeltaBEqualsDeltaL: 3,
  },
  theorem: "The same unified triplet exchange that generates the two F_Cp arms necessarily admits three DeltaB=DeltaL proton-decay channels and one additional B,L-conserving four-quark channel at charge-support level.",
  BLBoundary: "all six channels conserve B-L, so continuous B-L or matter parity cannot separate the desired arms from the proton-decay partners",
  scope: "charge, representation and mediator-incidence census; Lorentz/color contractions, generation antisymmetries, masses and decay rates require a full action",
  passed: true,
}, null, 2));
