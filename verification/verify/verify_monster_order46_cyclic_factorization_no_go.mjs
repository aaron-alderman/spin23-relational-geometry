import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL(
  "../../evidence/data/monster-order46-cyclic-factorization-no-go-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));

assert.equal(
  evidence.schemaVersion,
  "monster-order46-cyclic-factorization-no-go-v1",
);

const n = 46;
const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
const carry = (a, b, modulus) => Math.floor((a + b) / modulus);
const exponent = (p, a, b, c, modulus = n) =>
  mod(p * a * carry(b, c, modulus), modulus);

// The normalized cyclic representative obeys the 3-cocycle/pentagon equation.
// Linearity in p makes an exhaustive p=1 check sufficient for all 46 classes.
let pentagons = 0;
for (let a = 0; a < n; a += 1) {
  for (let b = 0; b < n; b += 1) {
    for (let c = 0; c < n; c += 1) {
      for (let d = 0; d < n; d += 1) {
        const lhs = mod(
          exponent(1, b, c, d)
          + exponent(1, a, mod(b + c, n), d)
          + exponent(1, a, b, c),
          n,
        );
        const rhs = mod(
          exponent(1, mod(a + b, n), c, d)
          + exponent(1, a, b, mod(c + d, n)),
          n,
        );
        assert.equal(lhs, rhs, `pentagon failed at ${a},${b},${c},${d}`);
        pentagons += 1;
      }
    }
  }
}

// Restriction to <23> = C2 gives p mod 2; restriction to <2> = C23 gives p mod 23.
const restrictionPairs = [];
for (let p = 0; p < n; p += 1) {
  for (let a = 0; a < 2; a += 1) {
    for (let b = 0; b < 2; b += 1) {
      for (let c = 0; c < 2; c += 1) {
        const ambient = exponent(p, 23 * a, 23 * b, 23 * c);
        const restricted = 23 * exponent(mod(p, 2), a, b, c, 2);
        assert.equal(ambient, mod(restricted, n));
      }
    }
  }
  for (let a = 0; a < 23; a += 1) {
    for (let b = 0; b < 23; b += 1) {
      for (let c = 0; c < 23; c += 1) {
        const ambient = exponent(p, 2 * a, 2 * b, 2 * c);
        const restricted = 2 * exponent(mod(p, 23), a, b, c, 23);
        assert.equal(ambient, mod(restricted, n));
      }
    }
  }
  restrictionPairs.push(`${mod(p, 2)},${mod(p, 23)}`);
}
assert.equal(new Set(restrictionPairs).size, 46, "CRT restriction must be bijective");
assert.deepEqual(
  restrictionPairs.filter((pair) => pair === "0,0"),
  ["0,0"],
  "there must be no nontrivial purely mixed class",
);

// A four-trace ratio cancels both independent factors exactly.
const samples = [
  { z23g: "2+3i", z23e: "5-1i", z2z: "7+2i", z2e: "11-4i" },
  { z23g: "-3+2i", z23e: "4+5i", z2z: "1-6i", z2e: "8+3i" },
];
function complex(re, im) { return { re, im }; }
function multiply(a, b) {
  return complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
}
function divide(a, b) {
  const norm = b.re ** 2 + b.im ** 2;
  return complex((a.re * b.re + a.im * b.im) / norm, (a.im * b.re - a.re * b.im) / norm);
}
for (const sample of samples) {
  // JavaScript has no imaginary literal; parse the deliberately varied test records here.
  const values = Object.fromEntries(Object.entries(sample).map(([key, value]) => {
    const match = String(value).match(/^(-?\d+)([+-]\d+)i$/);
    assert.ok(match);
    return [key, complex(Number(match[1]), Number(match[2]))];
  }));
  const zgz = multiply(values.z23g, values.z2z);
  const zg1 = multiply(values.z23g, values.z2e);
  const z1z = multiply(values.z23e, values.z2z);
  const z11 = multiply(values.z23e, values.z2e);
  const ratio = divide(multiply(zgz, z11), multiply(zg1, z1z));
  assert.ok(Math.abs(ratio.re - 1) < 1e-12);
  assert.ok(Math.abs(ratio.im) < 1e-12);
}

assert.equal(evidence.connectedObservable.factorizedNull, "R=1");
assert.match(evidence.connectedObservable.monsterPredictionStatus, /open/);

console.log(JSON.stringify({
  status: "PASS",
  groupOrder: n,
  pentagonsChecked: pentagons,
  cohomologyClasses: restrictionPairs.length,
  distinctRestrictionPairs: new Set(restrictionPairs).size,
  purelyMixedClasses: 0,
  factorizedCrossRatio: 1,
  nextObservable: evidence.connectedObservable.definition,
  monsterNumericalTarget: evidence.connectedObservable.monsterPredictionStatus,
}));
