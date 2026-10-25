import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL(
  "../../evidence/data/xxz23-order46-carrier-gap-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));
assert.equal(evidence.schemaVersion, "xxz23-order46-carrier-gap-v1");

const N = 23;
const L = evidence.sourceModel.minimumCommensuratePeriodicLength;
assert.equal(L, 2 * N);
assert.ok(Math.abs(evidence.sourceModel.anisotropy - Math.cos(Math.PI / N)) < 1e-15);
assert.equal(evidence.sourceModel.infraredRadiusSquared, "23/2");
assert.equal(evidence.availableOperators.commutesWithHamiltonian, true);
assert.match(evidence.availableOperators.fusion, /sum_k Z_pm\^k/);

// Represent D_23 elements as (a,b)=g^a r^b with
// (a,b)(c,d)=(a+(-1)^b c,b+d).
const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
const multiply = ([a, b], [c, d]) => [
  mod(a + (b === 0 ? c : -c), N),
  mod(b + d, 2),
];
const identity = [0, 0];
const order = (element) => {
  let power = identity;
  for (let n = 1; n <= 2 * N; n += 1) {
    power = multiply(power, element);
    if (power[0] === 0 && power[1] === 0) return n;
  }
  throw new Error("order not found");
};

const elements = [];
for (let a = 0; a < N; a += 1) {
  for (let b = 0; b < 2; b += 1) elements.push([a, b]);
}
assert.equal(elements.length, 46);
const orderHistogram = new Map();
for (const element of elements) {
  const elementOrder = order(element);
  orderHistogram.set(elementOrder, (orderHistogram.get(elementOrder) ?? 0) + 1);
  if (element[1] === 1) assert.equal(elementOrder, 2);
}
assert.deepEqual(Object.fromEntries(orderHistogram), { 1: 1, 2: 23, 23: 22 });
assert.equal(Math.max(...orderHistogram.keys()), 23);
assert.equal(evidence.dihedralObstruction.hasElementOfOrder46, false);

// By contrast, adjoining a commuting involution gives C23 x C2 = C46.
// h=g^12 z has order lcm(23,2)=46 and the required powers.
const hPower = (power) => ({ g: mod(12 * power, N), z: mod(power, 2) });
assert.deepEqual(hPower(2), { g: 1, z: 0 });
assert.deepEqual(hPower(23), { g: 0, z: 1 });
assert.deepEqual(hPower(46), { g: 0, z: 0 });
for (let power = 1; power < 46; power += 1) {
  assert.notDeepEqual(hPower(power), { g: 0, z: 0 });
}

assert.ok(evidence.openCarrierLayers.includes("TY bicharacter and associator extraction"));
assert.ok(evidence.openCarrierLayers.includes("order-46 element h with h^2=g and h^23=z"));
assert.match(evidence.minimalRepairSpecification.provenanceBoundary, /emulation/);

console.log(JSON.stringify({
  status: "PASS",
  N,
  minimumSites: L,
  anisotropy: evidence.sourceModel.anisotropy,
  dihedralElementOrders: Object.fromEntries(orderHistogram),
  naturalExtensionHasOrder46Element: false,
  repairedCommutingRoot: "h=g^12 z",
  repairedRootOrder: 46,
  provedCarrierLayers: evidence.provedCarrierLayers.length,
  openCarrierLayers: evidence.openCarrierLayers.length,
}));
