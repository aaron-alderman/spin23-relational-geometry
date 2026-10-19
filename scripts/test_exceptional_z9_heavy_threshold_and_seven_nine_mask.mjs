#!/usr/bin/env node

import assert from "node:assert/strict";

const N = 9;
const mod = (n) => ((n % N) + N) % N;

const q = Object.freeze({
  Q: 1,
  uc: -1,
  dc: -1,
  L: 0,
  ec: 0,
  nuc: 0,
  Hu: 0,
  Hd: 0,
  T: -1,
  Tdag: 1,
  D: -2,
  Ddag: 2,
});

const vertices = [
  { id: "Q-uc-Hu", class: "ordinary", fields: ["Q", "uc", "Hu"] },
  { id: "Q-dc-Hd", class: "ordinary", fields: ["Q", "dc", "Hd"] },
  { id: "L-ec-Hd", class: "ordinary", fields: ["L", "ec", "Hd"] },
  { id: "L-nuc-Hu", class: "ordinary", fields: ["L", "nuc", "Hu"] },
  { id: "T-Q-L", class: "retained-Furey", fields: ["T", "Q", "L"] },
  { id: "Tdag-uc-ec", class: "retained-Furey", fields: ["Tdag", "uc", "ec"] },
  { id: "Tdag-dc-nuc", class: "retained-Furey", fields: ["Tdag", "dc", "nuc"] },
  { id: "D-Q-Q", class: "excluded-diquark", fields: ["D", "Q", "Q"] },
  { id: "Ddag-uc-dc", class: "excluded-diquark", fields: ["Ddag", "uc", "dc"] },
].map((v) => ({ ...v, charge: mod(v.fields.reduce((s, f) => s + q[f], 0)) }));

assert.equal(vertices.length, 9);
assert.equal(vertices.filter((v) => v.class !== "excluded-diquark").length, 7);
assert(vertices.every((v) => v.charge === 0), "all nine Spin(10) component vertices must be Z9-neutral");

const bilinears = [
  { id: "Hu-Hd", sector: "bidoublet", fields: ["Hu", "Hd"] },
  { id: "T-D", sector: "six-Pfaffian", fields: ["T", "D"] },
  { id: "Tdag-D", sector: "cross-Hermitian", fields: ["Tdag", "D"] },
  { id: "Tdag-T", sector: "diagonal-Hermitian", fields: ["Tdag", "T"] },
  { id: "Ddag-D", sector: "diagonal-Hermitian", fields: ["Ddag", "D"] },
].map((b) => ({ ...b, charge: mod(b.fields.reduce((s, f) => s + q[f], 0)) }));

assert.equal(bilinears.find((b) => b.id === "Hu-Hd").charge, 0);
assert.equal(bilinears.find((b) => b.id === "T-D").charge, 6);
assert.equal(bilinears.find((b) => b.id === "Tdag-D").charge, 8);
assert.equal(bilinears.find((b) => b.id === "Tdag-T").charge, 0);
assert.equal(bilinears.find((b) => b.id === "Ddag-D").charge, 0);

// In 27 = 16_1 + 10_-2 + 1_4, the exceptional cubic contains
// 16*16*10 and 1*10*10.  A single Spin(10)-singlet x must multiply both
// the bidoublet pairing Hu Hd and the six Pfaffian pairing T D.
const singletScan = Array.from({ length: N }, (_, qx) => {
  const huHd = mod(qx + q.Hu + q.Hd) === 0;
  const td = mod(qx + q.T + q.D) === 0;
  const unbrokenPowers = Array.from({ length: N }, (_, k) => k).filter((k) => mod(k * qx) === 0);
  return {
    qx,
    allows_x_HuHd: huHd,
    allows_x_TD: td,
    allows_complete_x_10_10: huHd && td,
    unbrokenSubgroupOrderAfterNonzeroXVEV: unbrokenPowers.length,
  };
});

assert.equal(singletScan.filter((r) => r.allows_complete_x_10_10).length, 0);
assert.deepEqual(singletScan.filter((r) => r.allows_x_HuHd).map((r) => r.qx), [0]);
assert.deepEqual(singletScan.filter((r) => r.allows_x_TD).map((r) => r.qx), [3]);
assert.equal(singletScan.find((r) => r.qx === 3).unbrokenSubgroupOrderAfterNonzeroXVEV, 3);

const effective = [
  {
    id: "T-sector-exchange",
    sourceBlocks: ["T-Q-L", "Tdag-uc-ec", "Tdag-dc-nuc"],
    allowed: true,
  },
  {
    id: "D-sector-exchange",
    sourceBlocks: ["D-Q-Q", "Ddag-uc-dc"],
    allowed: true,
  },
  {
    id: "T-D-cross-exchange",
    sourceBlocks: ["T-sector", "D-sector"],
    allowed: false,
    obstruction: "both holomorphic TD and Hermitian TdagD carry nonzero Z9 charge",
  },
];

assert.equal(effective.find((e) => e.id === "D-sector-exchange").allowed, true);
assert.equal(effective.find((e) => e.id === "T-D-cross-exchange").allowed, false);

const result = {
  modulus: N,
  decomposition: "27 = 16_1 + 10_-2 + 1_4",
  vertices,
  sevenVersusNine: {
    retainedTargetCount: 7,
    fullSpin10Count: 9,
    neutralVertexCount: vertices.filter((v) => v.charge === 0).length,
    z9DeletesExcludedDiquarkVertices: false,
  },
  bilinears,
  singletScan,
  effective,
  theorem: {
    vertexMask: "NO-GO: Z9 assigns charge zero to all nine 16*16*10 component vertices",
    completeExceptionalCubic: "NO-GO under one singlet eigencharge, neutral Hu/Hd, and the stated T/D lift",
    protonProtection: "YES conditionally: Z9 forbids T-D cross mixing while allowing each diagonal sector",
    exactSevenChannelLowEnergyMask: "UNDERDETERMINED without an independent incidence projector or symmetry-protected hierarchy",
  },
};

console.log(JSON.stringify(result, null, 2));
