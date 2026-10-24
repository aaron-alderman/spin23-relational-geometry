import fs from "node:fs";

const spec = JSON.parse(fs.readFileSync(
  "corpus/programmes/frontier/wave-7/monster_lean_definitional_variance_v1.json", "utf8",
));
const primes = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 41n, 47n, 59n, 71n];
const bounds = [46, 20, 9, 6, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const zero = () => Array(15).fill(0);
const plus = (...profiles) => profiles.reduce(
  (sum, profile) => sum.map((value, index) => value + profile[index]), zero(),
);
const node = (index, ...children) => {
  const result = plus(...children);
  result[index] += 1;
  return result;
};
const constant = (name) => {
  const result = node(1);
  if (name === "Eq") result[12] = 1;
  if (name === "Iff") result[13] = 1;
  if (name === "False" || name === "Not") result[14] = 1;
  return result;
};
const encode = (profile) => profile.reduce(
  (address, count, index) => address * primes[index] ** BigInt(Math.min(count, bounds[index])), 1n,
);

const Nat = constant("Nat");
const Type = node(5);
const bvar = node(3);
const lit2 = node(6);
const succ2 = node(0, constant("Nat.succ"), node(0, constant("Nat.succ"), constant("Nat.zero")));
const eqType = (left, right) => node(0, node(0, node(0, constant("Eq"), Nat), left), right);
const witnesses = new Map([
  ["mdata_erasure", [Nat, node(9, Nat)]],
  ["beta_reduction", [Nat, node(0, node(4, Type, bvar), Nat)]],
  ["zeta_reduction", [Nat, node(7, Type, Nat, bvar)]],
  ["literal_expansion_inside_type", [eqType(lit2, lit2), eqType(succ2, succ2)]],
  ["alpha_renaming_control", [node(2, Nat, eqType(bvar, bvar)), node(2, Nat, eqType(bvar, bvar))]],
]);

for (const entry of spec.witnesses) {
  const pair = witnesses.get(entry.id);
  if (!pair) throw new Error(`missing witness implementation: ${entry.id}`);
  const [left, right] = pair;
  if (JSON.stringify(left) !== JSON.stringify(entry.leftProfile)) throw new Error(`${entry.id} left profile drifted`);
  if (JSON.stringify(right) !== JSON.stringify(entry.rightProfile)) throw new Error(`${entry.id} right profile drifted`);
  if (encode(left).toString() !== entry.leftAddress) throw new Error(`${entry.id} left address drifted`);
  if (encode(right).toString() !== entry.rightAddress) throw new Error(`${entry.id} right address drifted`);
  const expected = encode(left) === encode(right) ? "address_preserved" : "address_changes";
  if (entry.result !== expected) throw new Error(`${entry.id} classification drifted`);
}

console.log(JSON.stringify({
  result: "pass",
  witnessCount: spec.witnesses.length,
  addressChangingDefinitionalWitnesses: spec.witnesses.filter((entry) => entry.result === "address_changes").map((entry) => entry.id),
  invariantControl: "alpha_renaming_control",
  conclusion: "the raw fold is not invariant under definitional equality",
}, null, 2));
