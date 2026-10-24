import fs from "node:fs";

const spec = JSON.parse(fs.readFileSync(
  "corpus/programmes/frontier/wave-7/monster_lean_bounded_locality_no_go_v1.json", "utf8",
));
const primes = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 41n, 47n, 59n, 71n];
const bounds = [46, 20, 9, 6, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const wordPair = (radius) => ({
  x: "0".repeat(radius) + "1" + "0".repeat(radius + 1) + "0".repeat(radius),
  y: "0".repeat(2 * radius + 1) + "1" + "0".repeat(radius),
});
const bag = (tokens) => [...Map.groupBy(tokens, (token) => token)]
  .map(([token, values]) => `${token}*${values.length}`).sort().join("|");
const windows = (word, width) => Array.from(
  { length: word.length - width + 1 }, (_, index) => word.slice(index, index + width),
);
const localSignature = (word, radius) => JSON.stringify({
  prefix: word.slice(0, radius),
  suffix: word.slice(-radius),
  decks: Array.from({ length: radius + 1 }, (_, index) => bag(windows(word, index + 1))),
});
const monsterAddress = (word) => {
  const profile = Array(15).fill(0);
  profile[1] = word.length + 1; // one named constant per domain plus terminal Unit
  profile[2] = word.length; // one forallE per arrow
  return profile.reduce(
    (product, count, index) => product * primes[index] ** BigInt(Math.min(count, bounds[index])), 1n,
  ).toString();
};

const witnesses = spec.testedRadii.map((radius) => {
  const { x, y } = wordPair(radius);
  if (x === y) throw new Error(`radius ${radius}: witness words coincide`);
  if (x.length !== 3 * radius + 2 || y.length !== x.length)
    throw new Error(`radius ${radius}: length formula failed`);
  if (x.slice(0, radius) !== y.slice(0, radius) || x.slice(-radius) !== y.slice(-radius))
    throw new Error(`radius ${radius}: anchors differ`);
  if (localSignature(x, radius) !== localSignature(y, radius))
    throw new Error(`radius ${radius}: bounded detector separated the pair`);
  if (monsterAddress(x) !== monsterAddress(y))
    throw new Error(`radius ${radius}: Monster addresses differ`);
  const firstDifference = [...x].findIndex((value, index) => value !== y[index]) + 1;
  if (firstDifference !== radius + 1)
    throw new Error(`radius ${radius}: first difference ${firstDifference} != ${radius + 1}`);
  return {
    radius,
    wordLength: x.length,
    firstRootDifferenceDepth: firstDifference,
    monsterAddress: monsterAddress(x),
    x,
    y,
  };
});

console.log(JSON.stringify({
  result: "pass",
  testedRadii: witnesses.length,
  witnesses,
  conclusion: "no fixed finite-radius anchored local-window bag identifies all closed right-associated Lean type chains",
}, null, 2));
