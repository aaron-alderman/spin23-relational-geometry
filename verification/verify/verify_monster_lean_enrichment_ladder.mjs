import fs from "node:fs";

const spec = JSON.parse(fs.readFileSync(
  "corpus/programmes/frontier/wave-7/monster_lean_enrichment_ladder_v1.json", "utf8",
));
const primes = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 41n, 47n, 59n, 71n];
const bounds = [46, 20, 9, 6, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const C = (name) => ({ tag: "const", name });
const L = (value) => ({ tag: "lit", value });
const A = (fn, arg) => ({ tag: "app", fn, arg });
const F = (domain, body) => ({ tag: "forallE", domain, body });
const Eq = (left, right) => A(A(A(C("Eq"), C("Nat")), L(left)), L(right));

const objects = new Map([
  ["Nat", C("Nat")], ["Bool", C("Bool")], ["Unit", C("Unit")], ["String", C("String")],
  ["arrow_Nat_Nat", F(C("Nat"), C("Nat"))],
  ["arrow_Bool_Bool", F(C("Bool"), C("Bool"))],
  ["arrow_Nat_Bool", F(C("Nat"), C("Bool"))],
  ["arrow_Bool_Nat", F(C("Bool"), C("Nat"))],
  ["eq_2_2", Eq(2, 2)], ["eq_0_0", Eq(0, 0)], ["eq_2_0", Eq(2, 0)], ["eq_0_2", Eq(0, 2)],
  ["assoc_left", F(F(C("Nat"), C("Bool")), C("Unit"))],
  ["assoc_right", F(C("Nat"), F(C("Bool"), C("Unit")))],
  ["quartet_A", F(F(C("Nat"), C("Bool")), F(C("Unit"), C("String")))],
  ["quartet_B", F(F(C("Nat"), C("String")), F(C("Unit"), C("Bool")))],
]);
if (objects.size !== spec.benchmarkObjects) throw new Error("benchmark size drifted");

const zero = () => Array(15).fill(0);
const merge = (left, right) => left.map((value, index) => index < 12 ? value + right[index] : Math.max(value, right[index]));
const bump = (profile, index) => { const result = [...profile]; result[index] += 1; return result; };
const profile = (node) => {
  if (node.tag === "const") {
    const result = bump(zero(), 1);
    if (node.name === "Eq") result[12] = 1;
    if (node.name === "Iff") result[13] = 1;
    if (node.name === "False" || node.name === "Not") result[14] = 1;
    return result;
  }
  if (node.tag === "lit") return bump(zero(), 6);
  if (node.tag === "app") return bump(merge(profile(node.fn), profile(node.arg)), 0);
  if (node.tag === "forallE") return bump(merge(profile(node.domain), profile(node.body)), 2);
  throw new Error(`unknown node ${node.tag}`);
};
const address = (node) => profile(node).reduce(
  (product, count, index) => product * primes[index] ** BigInt(Math.min(count, bounds[index])), 1n,
).toString();
const bag = (tokens) => [...Map.groupBy(tokens, (token) => token)]
  .map(([token, values]) => `${token}*${values.length}`).sort().join("|");
const leafLabel = (node) => node.tag === "const" ? `const:${node.name}` : node.tag === "lit" ? `lit:${node.value}` : node.tag;
const children = (node) => node.tag === "app" ? [["fn", node.fn], ["arg", node.arg]]
  : node.tag === "forallE" ? [["domain", node.domain], ["body", node.body]] : [];
const leafTokens = (node, output = []) => {
  if (children(node).length === 0) output.push(leafLabel(node));
  else for (const [, child] of children(node)) leafTokens(child, output);
  return output;
};
const edgeTokens = (node, output = []) => {
  for (const [role, child] of children(node)) {
    output.push(`${node.tag}.${role}->${leafLabel(child)}`);
    edgeTokens(child, output);
  }
  return output;
};
const rootedLeafPaths = (node, path = [], output = []) => {
  const edges = children(node);
  if (edges.length === 0) output.push(`${path.join("/") || "root"}=>${leafLabel(node)}`);
  else for (const [role, child] of edges) rootedLeafPaths(child, [...path, `${node.tag}.${role}`], output);
  return output;
};

const signatures = new Map();
for (const [name, node] of objects) {
  const d0 = address(node);
  const d1 = `${d0}::${bag(leafTokens(node))}`;
  const d2 = `${d1}::${bag(edgeTokens(node))}`;
  const d3 = `${d2}::${bag(rootedLeafPaths(node))}`;
  signatures.set(name, { D0: d0, D1: d1, D2: d2, D3: d3 });
}

const partition = (detector) => [...Map.groupBy([...objects.keys()], (name) => signatures.get(name)[detector]).values()];
const summary = (detector) => {
  const groups = partition(detector);
  const collisions = groups.filter((group) => group.length > 1);
  return {
    distinctSignatures: groups.length,
    collisionGroups: collisions.length,
    collisionPairs: collisions.reduce((sum, group) => sum + group.length * (group.length - 1) / 2, 0),
    largestFibre: Math.max(...groups.map((group) => group.length)),
    collisions,
  };
};

for (const expected of spec.detectors) {
  const actual = summary(expected.id);
  for (const key of ["distinctSignatures", "collisionGroups", "collisionPairs", "largestFibre"])
    if (actual[key] !== expected[key]) throw new Error(`${expected.id} ${key} drifted: ${actual[key]} != ${expected[key]}`);
}
for (const detector of ["D1", "D2", "D3"])
  if (JSON.stringify(summary(detector).collisions) !== JSON.stringify(spec.expectedResidualCollisions[detector]))
    throw new Error(`${detector} residual collision partition drifted`);

console.log(JSON.stringify({
  result: "pass",
  benchmarkObjects: objects.size,
  ladder: Object.fromEntries(spec.detectors.map((entry) => [entry.id, summary(entry.id)])),
  conclusion: "names, order and nonlocal correlation are separate detector resources",
}, null, 2));
