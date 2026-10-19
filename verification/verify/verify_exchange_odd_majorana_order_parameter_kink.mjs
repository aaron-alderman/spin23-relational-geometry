import assert from "node:assert/strict";

const a = 1.7;
const b = 0.8;
const v = 2.1;
const V = (mp, mm) => a * (mp - v) ** 2 + b * (mm * mm - v * v) ** 2;
const grad = (mp, mm) => [2 * a * (mp - v), 4 * b * mm * (mm * mm - v * v)];
const hessianAtVacuum = [[2 * a, 0], [0, 8 * b * v * v]];

for (const sign of [-1, 1]) {
  assert(Math.abs(V(v, sign * v)) < 1e-12);
  assert(grad(v, sign * v).every((x) => Math.abs(x) < 1e-12));
}
assert(hessianAtVacuum[0][0] > 0 && hessianAtVacuum[1][1] > 0);

const toFaces = (mp, mm) => ({ mL: mp - mm, mR: mp + mm });
assert.deepEqual(toFaces(v, v), { mL: 0, mR: 2 * v });
assert.deepEqual(toFaces(v, -v), { mL: 2 * v, mR: 0 });

// Exact phi^4 kink in the exchange-odd coordinate.
const k = v * Math.sqrt(2 * b);
const kink = (x) => v * Math.tanh(k * x);
const kinkPrime = (x) => v * k / Math.cosh(k * x) ** 2;
const kinkSecond = (x) => -2 * v * k * k * Math.tanh(k * x) / Math.cosh(k * x) ** 2;
for (const x of [-3, -1, -0.2, 0, 0.4, 1.3, 3]) {
  const phi = kink(x);
  const eomResidual = kinkSecond(x) - 4 * b * phi * (phi * phi - v * v);
  assert(Math.abs(eomResidual) < 1e-9);
  assert(Math.abs(0.5 * kinkPrime(x) ** 2 - b * (phi * phi - v * v) ** 2) < 1e-9);
}

const analyticTension = 4 * Math.sqrt(2 * b) * v ** 3 / 3;
const L = 12 / k;
const N = 200000;
let numericTension = 0;
for (let i = 0; i < N; i += 1) {
  const x = -L + (i + 0.5) * (2 * L / N);
  const phi = kink(x);
  numericTension += (0.5 * kinkPrime(x) ** 2 + b * (phi * phi - v * v) ** 2) * (2 * L / N);
}
assert(Math.abs(numericTension / analyticTension - 1) < 1e-8);

console.log(JSON.stringify({
  protocol: "exchange-odd-majorana-order-parameter-kink/1",
  potential: "V=a(mPlus-v)^2+b(mMinus^2-v^2)^2",
  exchange: "mPlus -> mPlus; mMinus -> -mMinus",
  minima: [toFaces(v, v), toFaces(v, -v)],
  hessianAtEitherMinimum: hessianAtVacuum,
  kink: "mMinus(x)=v tanh(v sqrt(2b) x)",
  analyticTension,
  numericTension,
  physicalFork: "global exchange gives two vacua and a wall; gauged Weyl exchange identifies the minima and removes this global wall",
  passed: true
}, null, 2));
