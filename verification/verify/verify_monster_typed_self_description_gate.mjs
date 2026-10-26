import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(new URL("../../evidence/data/monster-typed-self-description-gate-v1.json", import.meta.url), "utf8"));
const bridge = JSON.parse(fs.readFileSync(new URL("../../evidence/data/moonshine-program-lattice-bridge-v1.json", import.meta.url), "utf8"));
assert.equal(record.schemaVersion, "monster-typed-self-description-gate-v1");

const factorial = n => Array.from({length:n}, (_, i) => i + 1).reduce((a, b) => a * b, 1);
const multiplicities = xs => [...new Set(xs)].map(x => xs.filter(y => y === x).length);
const caps = record.finiteCertificates.monsterPrimeExponentCaps;
const capPermutationCount = multiplicities(caps).reduce((n, m) => n * factorial(m), 1);
const fixedBoxPoints = [...new Set(caps)].reduce((n, cap) => n * (cap + 1), 1);
assert.equal(capPermutationCount, 6);
assert.equal(capPermutationCount, record.finiteCertificates.capPreservingPermutationCount);
assert.equal(fixedBoxPoints, 1658160);
assert.equal(fixedBoxPoints, record.finiteCertificates.commonFixedBoxPointCount);
assert.equal(factorial(9), 362880);
assert.equal(record.finiteCertificates.equalPositiveCapS9FixedPointLowerBound, 2);

const permutations = [];
for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++) {
  const p = [a, b, c];
  if (new Set(p).size === 3) permutations.push(p);
}
const key = p => p.join("");
const compose = (p, q) => q.map(i => p[i]);
const inverse = p => p.map((_, i) => p.indexOf(i));
const identity = [0, 1, 2];
const order = p => {
  let power = identity;
  for (let n = 1; n <= 6; n++) {
    power = compose(p, power);
    if (key(power) === key(identity)) return n;
  }
  throw new Error("order not found");
};
const conjugate = (h, g) => compose(compose(h, g), inverse(h));
const centre = permutations.filter(g => permutations.every(h => key(compose(g, h)) === key(compose(h, g))));
assert.equal(centre.length, 1);
const unseen = new Set(permutations.map(key));
const classes = [];
while (unseen.size) {
  const g = permutations.find(p => unseen.has(key(p)));
  const klass = new Set(permutations.map(h => key(conjugate(h, g))));
  for (const k of klass) unseen.delete(k);
  classes.push([...klass]);
}
assert.deepEqual(classes.map(c => c.length).sort((a,b) => a-b), [1,2,3]);
const orderCounts = Object.fromEntries([1,2,3].map(n => [n, permutations.filter(p => order(p) === n).length]));
assert.deepEqual(orderCounts, {1:1, 2:3, 3:2});

// The three irreducible S3 character rows, evaluated on the identity,
// transposition and 3-cycle classes. Profiles separate classes, not elements.
const classProfiles = [[1,1,2], [1,-1,0], [1,1,-1]];
assert.equal(new Set(classProfiles.map(profile => JSON.stringify(profile))).size, 3);
assert.equal(classProfiles.length, classes.length);
assert.ok(permutations.length > classProfiles.length);

const mod3 = n => ((n % 3) + 3) % 3;
const digits = n => [n % 3, Math.floor(n / 3) % 3, Math.floor(n / 9) % 3];
const encode = v => mod3(v[0]) + 3 * mod3(v[1]) + 9 * mod3(v[2]);
const multiply = (x, y) => {
  const a = digits(x), b = digits(y), c = [0,0,0,0,0];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) c[i+j] += a[i] * b[j];
  // a^3=a+1 and a^4=a^2+a for the modulus a^3-a-1.
  c[0] += c[3]; c[1] += c[3] + c[4]; c[2] += c[4];
  return encode(c);
};
const power = (x, n) => {
  let out = 1, base = x;
  while (n) { if (n & 1) out = multiply(out, base); base = multiply(base, base); n >>= 1; }
  return out;
};
const field = Array.from({length:27}, (_, i) => i);
const fixed3 = field.filter(x => power(x, 3) === x);
const fixed27 = field.filter(x => power(x, 27) === x);
assert.equal(fixed3.length, 3);
assert.equal(fixed27.length, 27);
assert.equal(fixed3.length, record.finiteCertificates.gf27.xCubedFixedCount);
assert.equal(fixed27.length, record.finiteCertificates.gf27.xTo27FixedCount);

assert.equal(record.sourceClaimAudit.filter(x => x.status.startsWith("exact")).length, 3);
assert.deepEqual(record.knownCorpusCollision.domain, ["23A", "23B"]);
assert.equal(record.knownCorpusCollision.injective, false);
assert.equal(record.knownCorpusCollision.sourceEvidence, "moonshine-program-lattice-bridge-v1");
assert.match(bridge.order23MoonshineBoundary.traceDegeneracy, /same McKay-Thompson series/);
assert.match(bridge.order23OrientationConvention.status, /oriented-generator convention/);
assert.match(record.verdict, /typed equalizer or commuting reconstruction diagram/);
console.log(JSON.stringify({
  status: "PASS",
  box: {capPermutationCount, fixedBoxPoints, fullS9: factorial(9)},
  s3: {elements: permutations.length, centre: centre.length, conjugacyClassSizes: classes.map(c => c.length).sort((a,b)=>a-b), orderCounts, characterProfiles: classProfiles.length},
  gf27: {fixedByCube: fixed3.length, fixedByPower27: fixed27.length},
  operationalTarget: "injective, stable, held-out same-carrier reconstruction",
  knownCollision: "23A and 23B have the same scalar genus-one encoder output"
}));
