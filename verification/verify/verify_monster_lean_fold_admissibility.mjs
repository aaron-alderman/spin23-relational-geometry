import fs from "node:fs";

const spec = JSON.parse(fs.readFileSync(
  "corpus/programmes/frontier/wave-7/monster_lean_fold_admissibility_v1.json", "utf8",
));
const frontier = JSON.parse(fs.readFileSync(
  "corpus/programmes/frontier/wave-7/monster_lean_fold_frontier_geometry_v1.json", "utf8",
));
const primes = spec.coordinates.map((entry) => BigInt(entry.prime));
const bounds = spec.coordinates.map((entry) => BigInt(entry.bound));

const product = (values) => values.reduce((accumulator, value) => accumulator * value, 1n);
const monsterOrder = product(primes.map((prime, index) => prime ** bounds[index]));
const addressCount = product(bounds.map((bound) => bound + 1n));
const strictInteriorCount = product(bounds);

if (monsterOrder.toString() !== spec.exactArithmetic.monsterOrder) throw new Error("Monster order drifted");
if (Number(addressCount) !== spec.exactArithmetic.addressCount) throw new Error("address count drifted");
if (Number(strictInteriorCount) !== spec.exactArithmetic.strictInteriorAddressCount) throw new Error("interior count drifted");

function gcd(a, b) {
  let x = a; let y = b;
  while (y !== 0n) [x, y] = [y, x % y];
  return x;
}
function lcm(a, b) { return a / gcd(a, b) * b; }
function encode(address) { return product(address.map((value, index) => primes[index] ** BigInt(value))); }
function meet(left, right) { return left.map((value, index) => Math.min(value, right[index])); }
function join(left, right) { return left.map((value, index) => Math.max(value, right[index])); }
function star(left, right) { return left.map((value, index) => Math.min(value + right[index], Number(bounds[index]))); }

// Exhaust every one-dimensional coordinate law. Product laws then follow coordinatewise.
let scalarCases = 0;
for (let coordinate = 0; coordinate < bounds.length; coordinate += 1) {
  const bound = Number(bounds[coordinate]);
  for (let x = 0; x <= bound; x += 1) for (let y = 0; y <= bound; y += 1) for (let z = 0; z <= bound; z += 1) {
    const operation = (a, b) => Math.min(a + b, bound);
    if (operation(operation(x, y), z) !== operation(x, operation(y, z))) throw new Error("saturated addition is not associative");
    if (operation(x, y) !== operation(y, x)) throw new Error("saturated addition is not commutative");
    if (operation(x, 0) !== x) throw new Error("zero is not an identity");
    if (operation(x, bound) !== bound) throw new Error("top is not absorbing");
    scalarCases += 1;
  }
}

const rankCounts = [1n];
for (const boundBigInt of bounds) {
  const bound = Number(boundBigInt);
  const next = Array(rankCounts.length + bound).fill(0n);
  for (let rank = 0; rank < rankCounts.length; rank += 1) for (let increment = 0; increment <= bound; increment += 1) next[rank + increment] += rankCounts[rank];
  rankCounts.splice(0, rankCounts.length, ...next);
}
const saturationCounts = [1n];
for (const bound of bounds) {
  const next = Array(saturationCounts.length + 1).fill(0n);
  for (let count = 0; count < saturationCounts.length; count += 1) {
    next[count] += saturationCounts[count] * bound;
    next[count + 1] += saturationCounts[count];
  }
  saturationCounts.splice(0, saturationCounts.length, ...next);
}
if (rankCounts.reduce((sum, value) => sum + value, 0n) !== addressCount) throw new Error("rank census does not cover address space");
if (saturationCounts.reduce((sum, value) => sum + value, 0n) !== addressCount) throw new Error("saturation census does not cover address space");
if (JSON.stringify(saturationCounts.map(Number)) !== JSON.stringify(frontier.saturationGeometry.addressesByNumberOfSaturatedCoordinates)) throw new Error("saturation distribution drifted");
const peak = rankCounts.reduce((maximum, value) => maximum > value ? maximum : value);
const peakRanks = rankCounts.flatMap((value, rank) => value === peak ? [rank] : []);
if (JSON.stringify(peakRanks) !== JSON.stringify(frontier.rankGeometry.peakRanks)) throw new Error("rank peaks drifted");
if (Number(peak) !== frontier.rankGeometry.addressesAtEachPeak) throw new Error("rank peak size drifted");
if (Number(addressCount) - spec.reportedCensus.distinctAddresses !== frontier.reportedOccupancy.unobservedFormalAddresses) throw new Error("reported occupancy drifted");

const examples = [
  bounds.map(() => 0),
  bounds.map(Number),
  bounds.map((bound, index) => (index * 7 + 3) % (Number(bound) + 1)),
  spec.workedExample.address,
];
let pairCases = 0;
for (const left of examples) for (const right of examples) {
  const encodedLeft = encode(left); const encodedRight = encode(right);
  if (encode(meet(left, right)) !== gcd(encodedLeft, encodedRight)) throw new Error("meet/gcd mismatch");
  if (encode(join(left, right)) !== lcm(encodedLeft, encodedRight)) throw new Error("join/lcm mismatch");
  if (encode(star(left, right)) !== gcd(encodedLeft * encodedRight, monsterOrder)) throw new Error("saturated product mismatch");
  pairCases += 1;
}

const raw = spec.workedExample.rawProfile;
const capped = raw.map((value, index) => Math.min(value, Number(bounds[index])));
if (JSON.stringify(capped) !== JSON.stringify(spec.workedExample.address)) throw new Error("worked-example cap mismatch");
if (capped.reduce((sum, value) => sum + value, 0) !== spec.workedExample.addressRank) throw new Error("worked-example rank mismatch");
if (raw.slice(0, 12).reduce((sum, value) => sum + value, 0) !== spec.workedExample.nodeCount) throw new Error("worked-example node count mismatch");
if (encode(capped).toString().length !== spec.workedExample.encodedAddressDigits) throw new Error("worked-example digit count mismatch");
const clampedKinds = raw.flatMap((value, index) => value > Number(bounds[index]) ? [spec.coordinates[index].kind] : []);
if (JSON.stringify(clampedKinds) !== JSON.stringify(spec.workedExample.clampedKinds)) throw new Error("worked-example clamp set mismatch");

// A boundary address cannot determine the source exactness bit: b and b+1 cap identically.
for (let coordinate = 0; coordinate < bounds.length; coordinate += 1) {
  const exactProfile = bounds.map(() => 0n); exactProfile[coordinate] = bounds[coordinate];
  const overflowProfile = [...exactProfile]; overflowProfile[coordinate] += 1n;
  const cap = (profile) => profile.map((value, index) => value > bounds[index] ? bounds[index] : value);
  if (JSON.stringify(cap(exactProfile), (_, value) => typeof value === "bigint" ? value.toString() : value)
    !== JSON.stringify(cap(overflowProfile), (_, value) => typeof value === "bigint" ? value.toString() : value)) throw new Error("boundary ambiguity witness failed");
}

console.log(JSON.stringify({
  result: "pass",
  monsterOrder: monsterOrder.toString(),
  coordinateCount: bounds.length,
  addressCount: Number(addressCount),
  strictInteriorAddressCount: Number(strictInteriorCount),
  strictInteriorFraction: Number(strictInteriorCount) / Number(addressCount),
  factorization: {
    gradedBoxSize: frontier.factorization.gradedBoxSize,
    booleanCubeSize: frontier.factorization.booleanCubeSize,
  },
  rankGeometry: {
    levels: rankCounts.length,
    maximumRank: rankCounts.length - 1,
    peakRanks,
    addressesAtEachPeak: Number(peak),
  },
  saturationGeometry: {
    boundaryAddresses: Number(addressCount - strictInteriorCount),
    expectedSaturatedCoordinates: bounds.reduce((sum, bound) => sum + 1 / (Number(bound) + 1), 0),
  },
  reportedOccupancy: frontier.reportedOccupancy,
  saturatedMonoidScalarCases: scalarCases,
  divisorLatticePairCases: pairCases,
  opcodeMonoid: {
    generators: 15,
    commutative: true,
    addressOrbitFromZero: Number(addressCount),
    topIsAbsorbing: true,
  },
  workedExample: {
    encodedAddress: encode(capped).toString(),
    encodedAddressDigits: encode(capped).toString().length,
    clampedKinds,
  },
  boundaryTheorem: "strict-interior profiles are uniquely recovered; every saturated address coordinate admits exact and arbitrarily large overflow antecedents, so exactness is extra scar data",
}, null, 2));
