const signWeight = ({ minus = [], plusOnly = null }) => plusOnly === null
  ? Array.from({ length: 5 }, (_, i) => minus.includes(i + 1) ? -1 : 1)
  : Array.from({ length: 5 }, (_, i) => plusOnly === i + 1 ? 1 : -1);

const edges = [];
for (let color = 1; color <= 3; color += 1) {
  edges.push({ left: `O2_${color}`, right: "H_4", field: `d_${color}`, q: signWeight({ minus: [color, 4] }) });
  edges.push({ left: `O2_${color}`, right: "H_5", field: `u_${color}`, q: signWeight({ minus: [color, 5] }) });
  const otherColors = [1, 2, 3].filter((i) => i !== color);
  edges.push({ left: "C", right: `O2_${color}`, field: `u^c_${color}`, q: signWeight({ minus: otherColors }) });
  edges.push({ left: "D", right: `O2_${color}`, field: `d^c_${color}`, q: signWeight({ plusOnly: color }) });
}
edges.push({ left: "H_4", right: "E", field: "nu", q: signWeight({ plusOnly: 4 }) });
edges.push({ left: "H_5", right: "E", field: "e", q: signWeight({ plusOnly: 5 }) });
edges.push({ left: "E", right: "C", field: "e^c", q: signWeight({ minus: [4, 5] }) });
edges.push({ left: "E", right: "D", field: "nu^c", q: signWeight({ minus: [] }) });

const q0 = edges.find((edge) => edge.field === "nu^c");
const physical = edges.filter((edge) => edge !== q0);
const vectorEqual = (a, b) => a.every((value, i) => value === b[i]);
const addSigned = (terms) => Array.from({ length: 5 }, (_, i) => terms.reduce((sum, [sign, edge]) => sum + sign * edge.q[i], 0));
const keyOf = (members) => members.map((edge) => edge.field).sort().join("|");

const logicalSupports = new Map();
for (let i = 0; i < physical.length; i += 1) {
  for (let j = i + 1; j < physical.length; j += 1) {
    for (let k = j + 1; k < physical.length; k += 1) {
      const triple = [physical[i], physical[j], physical[k]];
      const relations = [];
      for (const a of [-1, 1]) for (const b of [-1, 1]) for (const c of [-1, 1]) {
        if (vectorEqual(addSigned([[a, triple[0]], [b, triple[1]], [c, triple[2]]]), q0.q)) {
          relations.push([a, b, c]);
        }
      }
      if (relations.length) logicalSupports.set(keyOf(triple), { triple, relations });
    }
  }
}

const byPair = new Map(edges.map((edge) => [`${edge.left}|${edge.right}`, edge]));
const permutations = (items) => items.flatMap((x, i) =>
  items.filter((_, j) => j !== i).flatMap((y, j, rest) => {
    const remaining = rest.filter((_, k) => k !== j);
    return remaining.map((z) => [x, y, z]);
  }));

const ternarySupports = new Map();
const allFour = [...logicalSupports.values()].map(({ triple }) => [q0, ...triple]);
for (const support of allFour) {
  const witnesses = [];
  for (const output of support) {
    const inputs = support.filter((edge) => edge !== output);
    for (const [x, y, z] of permutations(inputs)) {
      if (x.right !== y.right || y.left !== z.left) continue;
      const actual = byPair.get(`${x.left}|${z.right}`);
      if (actual === output) witnesses.push(`${output.field}=[${x.field},${y.field},${z.field}]`);
    }
  }
  if (witnesses.length) ternarySupports.set(keyOf(support), witnesses);
}

const matched = [...logicalSupports.values()].filter(({ triple }) => ternarySupports.has(keyOf([q0, ...triple])));
const unmatched = [...logicalSupports.values()].filter(({ triple }) => !ternarySupports.has(keyOf([q0, ...triple])));

const coefficientProfiles = new Map();
const commonPairSums = new Map();
for (const { triple, relations } of logicalSupports.values()) {
  for (const signs of relations) {
    const signed = [[1, q0], ...triple.map((edge, i) => [-signs[i], edge])];
    const positive = signed.filter(([sign]) => sign === 1).map(([, edge]) => edge);
    const negative = signed.filter(([sign]) => sign === -1).map(([, edge]) => edge);
    const profile = `${positive.length}+${negative.length}-`;
    coefficientProfiles.set(profile, (coefficientProfiles.get(profile) ?? 0) + 1);
    if (positive.length === 2 && negative.length === 2) {
      const common = addSigned(positive.map((edge) => [1, edge]));
      assert(vectorEqual(common, addSigned(negative.map((edge) => [1, edge]))));
      const commonKey = common.join(",");
      commonPairSums.set(commonKey, (commonPairSums.get(commonKey) ?? 0) + 1);
    }
  }
}

assert.equal(logicalSupports.size, 25, "the integer minimum-logical enumeration must reproduce all 25 supports");
assert.equal(matched.length, 0, "no minimum logical quartet should be one direct TRO ternary composition");
assert.equal(unmatched.length, 25);

console.log("Minimum logical supports versus Furey ternary products: PASS");
console.log("minimum_integer_logical_supports=25");
console.log("direct_single_ternary_product_supports=0");
console.log("interpretation=anomaly_charge_relations_do_not_select_local_TRO_products");
console.log("possible_higher_bridge=linking_algebra_exchange_or_sum_of_ternary_channels");
console.log("coefficient_profiles=" + JSON.stringify(Object.fromEntries(coefficientProfiles)));
console.log("common_pair_sums=" + JSON.stringify(Object.fromEntries(commonPairSums)));
import assert from "node:assert/strict";

