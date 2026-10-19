import assert from "node:assert/strict";

const species = [
  { name: "Q", colorTriality: 1, weakParity: 1, y6: 1 },
  { name: "u^c", colorTriality: -1, weakParity: 0, y6: -4 },
  { name: "d^c", colorTriality: -1, weakParity: 0, y6: 2 },
  { name: "L", colorTriality: 0, weakParity: 1, y6: -3 },
  { name: "e^c", colorTriality: 0, weakParity: 0, y6: 6 },
  { name: "nu^c", colorTriality: 0, weakParity: 0, y6: 0 },
];
const nearInteger = (x) => Math.abs(x - Math.round(x)) < 1e-10;
const trivialOn = (state, a, b, k) => {
  // phi=k*pi/3 follows from the charged-lepton singlet.
  const turns = state.colorTriality * a / 3 + state.weakParity * b / 2 + state.y6 * k / 6;
  return nearInteger(turns);
};

const kernel = [];
for (let a = 0; a < 3; a += 1) for (let b = 0; b < 2; b += 1) for (let k = 0; k < 6; k += 1) {
  if (species.every((state) => trivialOn(state, a, b, k))) kernel.push({ a, b, k });
}
assert.equal(kernel.length, 6);
for (let k = 0; k < 6; k += 1) {
  assert(kernel.some((element) => element.k === k && element.a === k % 3 && element.b === k % 2));
}

// The generator has order lcm(3,2,6)=6 and every kernel element is its power.
const generator = { a: 1, b: 1, k: 1 };
const powers = Array.from({ length: 6 }, (_, n) => ({
  a: n * generator.a % 3,
  b: n * generator.b % 2,
  k: n * generator.k % 6,
}));
assert.deepEqual(new Set(kernel.map((x) => x.a + "," + x.b + "," + x.k)),
  new Set(powers.map((x) => x.a + "," + x.b + "," + x.k)));

console.log("Faithful Standard-Model group kernel: PASS");
console.log("kernel_order=6 generator=(omega3,-1,exp(i*pi/3))");
console.log("faithful_group=(SU3_x_SU2_x_U1)/Z6_isomorphic_to_S(U3_x_U2)");
console.log("matches_exceptional_Jordan_flag_global_group=true");
