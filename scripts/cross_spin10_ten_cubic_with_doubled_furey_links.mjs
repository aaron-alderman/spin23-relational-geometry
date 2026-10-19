#!/usr/bin/env node

import assert from "node:assert/strict";

// All fields are left-handed Weyl fields. Y6=6Y, B3=3B.
const fields = {
  Q:   { su5: "10F",   color: "3",    weak: "2", Y6: 1,  B3: 1,  L: 0, left: "O2", right: "H" },
  uc:  { su5: "10F",   color: "bar3", weak: "1", Y6: -4, B3: -1, L: 0, left: "C",  right: "O2" },
  dc:  { su5: "bar5F", color: "bar3", weak: "1", Y6: 2,  B3: -1, L: 0, left: "D",  right: "O2" },
  L:   { su5: "bar5F", color: "1",    weak: "2", Y6: -3, B3: 0,  L: 1, left: "H",  right: "E" },
  ec:  { su5: "10F",   color: "1",    weak: "1", Y6: 6,  B3: 0,  L: -1,left: "E",  right: "C" },
  nuc: { su5: "1F",    color: "1",    weak: "1", Y6: 0,  B3: 0,  L: -1,left: "E",  right: "D" },
};
for (const f of Object.values(fields)) f.BL3 = f.B3 - 3 * f.L;

// 10_H -> 5_H + bar5_H under SU(5), then to Standard Model irreps.
const tenH = {
  Hu:   { su5: "5H",    color: "1",    weak: "2", Y6: 3 },
  T:    { su5: "5H",    color: "3",    weak: "1", Y6: -2 },
  Hd:   { su5: "bar5H", color: "1",    weak: "2", Y6: -3 },
  Tbar: { su5: "bar5H", color: "bar3", weak: "1", Y6: 2 },
};

const colorProducts = new Map([
  ["1x1", ["1"]], ["1x3", ["3"]], ["3x1", ["3"]],
  ["1xbar3", ["bar3"]], ["bar3x1", ["bar3"]],
  ["3xbar3", ["1", "8"]], ["bar3x3", ["1", "8"]],
  ["3x3", ["bar3", "6"]], ["bar3xbar3", ["3", "bar6"]],
]);
const weakProducts = new Map([
  ["1x1", ["1"]], ["1x2", ["2"]], ["2x1", ["2"]], ["2x2", ["1", "3"]],
]);
const conjugateColor = { "1": "1", "3": "bar3", "bar3": "3", "6": "bar6", "bar6": "6", "8": "8" };
const product = (map, a, b) => {
  const answer = map.get(`${a}x${b}`);
  assert(answer, `missing product ${a} x ${b}`);
  return answer;
};
const scalarRepsForPair = (aName, bName) => {
  const a = fields[aName], b = fields[bName], out = [];
  for (const c of product(colorProducts, a.color, b.color)) {
    for (const w of product(weakProducts, a.weak, b.weak)) {
      out.push({ color: conjugateColor[c], weak: w, Y6: -(a.Y6 + b.Y6) });
    }
  }
  return out;
};
const sameRep = (a, b) => a.color === b.color && a.weak === b.weak && a.Y6 === b.Y6;
const pairKey = (a, b) => [a, b].sort().join("-");

const channels = [];
const names = Object.keys(fields);
for (let i = 0; i < names.length; i++) for (let j = i; j < names.length; j++) {
  const [aName, bName] = [names[i], names[j]];
  const scalarReps = scalarRepsForPair(aName, bName);
  for (const [component, rep] of Object.entries(tenH)) {
    if (scalarReps.some((x) => sameRep(x, rep))) {
      const a = fields[aName], b = fields[bName];
      channels.push({
        pair: pairKey(aName, bName),
        fields: [aName, bName],
        component,
        scalarRep: rep,
        scalarChargesNeeded: {
          B3: -(a.B3 + b.B3),
          L: -(a.L + b.L),
          BL3: -(a.BL3 + b.BL3),
        },
      });
    }
  }
}

const expected = new Map([
  ["Q-uc", "Hu"], ["Q-dc", "Hd"], ["L-ec", "Hd"], ["L-nuc", "Hu"],
  ["L-Q", "Tbar"], ["ec-uc", "T"], ["dc-nuc", "T"],
  ["Q-Q", "T"], ["dc-uc", "Tbar"],
]);
assert.equal(channels.length, 9);
for (const c of channels) assert.equal(expected.get(c.pair), c.component, `unexpected channel ${c.pair}`);
assert.equal(expected.size, channels.length);

// SU(5) subchannels of the Spin(10) invariant 16_F 16_F 10_H.
const su5CubicPieces = {
  "10F*10F*5H": ["Q-uc:Hu", "Q-Q:T", "ec-uc:T"],
  "10F*bar5F*bar5H": ["Q-dc:Hd", "L-ec:Hd", "L-Q:Tbar", "dc-uc:Tbar"],
  "bar5F*1F*5H": ["L-nuc:Hu", "dc-nuc:T"],
};
const encoded = new Set(channels.map((c) => `${c.pair}:${c.component}`));
for (const list of Object.values(su5CubicPieces)) for (const x of list) assert(encoded.has(x), `missing SU(5) component ${x}`);

const firstOrderAllowed = (aName, bName) => {
  const a = fields[aName], b = fields[bName];
  return a.left === b.right || a.right === b.left;
};
const desired = new Set(["Q-uc", "Q-dc", "L-ec", "L-nuc"]);
const optionalS1 = new Set(["L-Q", "ec-uc", "dc-nuc"]);
const diquark = new Set(["Q-Q", "dc-uc"]);
const classify = (pair) => desired.has(pair) ? "desired_yukawa" : optionalS1.has(pair) ? "furey_S1_extra" : diquark.has(pair) ? "diquark" : "other";
for (const c of channels) c.classification = classify(c.pair);

assert([...desired, ...optionalS1].every((p) => {
  const [a, b] = p.split("-"); return firstOrderAllowed(a, b);
}));
assert([...diquark].every((p) => {
  const [a, b] = p.split("-"); return !firstOrderAllowed(a, b);
}));
assert.equal(channels.filter((c) => c.classification === "desired_yukawa").length, 4);
assert.equal(channels.filter((c) => c.classification === "furey_S1_extra").length, 3);
assert.equal(channels.filter((c) => c.classification === "diquark").length, 2);

// S3=(bar3,3,+1/3) is not a component of 10_H.
assert(!Object.values(tenH).some((x) => x.color === "bar3" && x.weak === "3" && x.Y6 === 2));

// One T or Tbar cannot carry a separately conserved B and L assignment across
// all of its Spin(10)-related vertices, but B-L is consistent componentwise.
const chargesByComponent = Object.fromEntries(Object.keys(tenH).map((component) => [
  component,
  channels.filter((c) => c.component === component).map((c) => c.scalarChargesNeeded),
]));
const unique = (xs, key) => new Set(xs.map((x) => x[key])).size;
assert(unique(chargesByComponent.T, "B3") > 1 || unique(chargesByComponent.T, "L") > 1);
assert(unique(chargesByComponent.Tbar, "B3") > 1 || unique(chargesByComponent.Tbar, "L") > 1);
assert.equal(unique(chargesByComponent.T, "BL3"), 1);
assert.equal(unique(chargesByComponent.Tbar, "BL3"), 1);
assert.equal(chargesByComponent.T[0].BL3, -2);
assert.equal(chargesByComponent.Tbar[0].BL3, 2);

const fureyIntersection = channels.filter((c) => firstOrderAllowed(...c.fields));
const spin10Only = channels.filter((c) => !firstOrderAllowed(...c.fields));
assert.equal(fureyIntersection.length, 7);
assert.deepEqual(new Set(spin10Only.map((c) => c.pair)), diquark);

const report = {
  protocol: "spin10-ten-cubic-crossed-with-doubled-furey-links/1",
  branchings: {
    E6: "27 -> 16_(+1) + 10_(-2) + 1_(+4) under Spin(10)*U(1)_psi, with the cubic containing 16_(+1)*16_(+1)*10_(-2)",
    Spin10ToSU5: "16_F -> 10_F + bar5_F + 1_F; 10_H -> 5_H + bar5_H",
    tenHToSM: tenH,
    symmetricProduct: "16*16 = 10_s + 120_a + 126_s, so the 10_H family Yukawa matrix is symmetric",
  },
  su5CubicPieces,
  standardModelChannels: channels,
  counts: {
    totalSpin10ComponentChannels: channels.length,
    desiredColorSingletYukawas: channels.filter((c) => c.classification === "desired_yukawa").length,
    fureyS1Extras: channels.filter((c) => c.classification === "furey_S1_extra").length,
    diquarkChannels: channels.filter((c) => c.classification === "diquark").length,
    doubledFureyIntersection: fureyIntersection.length,
    spin10OnlyBeyondFureyFirstOrder: spin10Only.length,
  },
  comparison: {
    fureyIntersection: fureyIntersection.map((c) => `${c.pair}:${c.component}`),
    spin10RestoresButFureyExcludes: spin10Only.map((c) => `${c.pair}:${c.component}`),
    S1Realized: true,
    S3Realized: false,
  },
  baryonLepton: {
    componentChargesRequiredByVertices: chargesByComponent,
    separateBAndLConsistentForTriplets: false,
    BLConsistent: true,
    assignments: { T_BL3: -2, Tbar_BL3: 2, doublets_BL3: 0 },
    matterParityRemovesTriplets: false,
  },
  sharpResult: {
    exactSpin10Invariant: "contains 4 desired Higgs Yukawas + 3 S1 leptoquark couplings + 2 diquark couplings",
    conventionalFourLinkBranch: "not selected by the irreducible 10_H; it requires Spin(10)-breaking doublet-triplet splitting/decoupling or an additional projection",
    protonSafeS1Branch: "not realizable by the lone 16_F*16_F*10_H invariant because its S1 couplings and diquark couplings are components of the same Spin(10) tensor",
    S3Branch: "absent because 10_H has no (bar3,3,+1/3)",
    compatibility: "full Spin(10) cubic and the minimal Furey first-order rule disagree precisely on Q-Q and uc-dc",
  },
  passed: true,
};

console.log(JSON.stringify(report, null, 2));

