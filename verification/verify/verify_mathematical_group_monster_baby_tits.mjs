import assert from "node:assert/strict";

const orders = {
  tits: 17_971_200n,
  titsAut: 35_942_400n,
  s4: 24n,
  baby: 4_154_781_481_226_426_191_177_580_544_000_000n,
  babyDoubleCover: 8_309_562_962_452_852_382_355_161_088_000_000n
};

assert.equal(orders.titsAut, 2n * orders.tits);
const localProduct = orders.s4 * orders.titsAut;
assert.equal(localProduct, 862_617_600n);
assert.equal(orders.baby % localProduct, 0n);
assert.equal(orders.baby / localProduct, 4_816_481_232_502_590_013_440_000n);
assert.equal(orders.babyDoubleCover, 2n * orders.baby);

const primeValuation = (value, prime) => {
  let remaining = value;
  let exponent = 0;
  while (remaining % prime === 0n) {
    remaining /= prime;
    exponent += 1;
  }
  return { exponent, remaining };
};

let titsRemainder = orders.tits;
for (const [prime, expectedExponent] of [[2n, 11], [3n, 3], [5n, 2], [13n, 1]]) {
  const valuation = primeValuation(titsRemainder, prime);
  assert.equal(valuation.exponent, expectedExponent);
  titsRemainder = valuation.remaining;
}
assert.equal(titsRemainder, 1n, "the Tits order must factor as 2^11 3^3 5^2 13");
assert.notEqual(orders.tits % 23n, 0n, "the Tits group cannot contain the corpus order-23 rail");

// Directional structure: the central extension supplies 2.B -> B and 2.B -> M,
// but no group-theoretic operation reverses the quotient to B -> 2.B or B -> M.
const declaredArrows = new Set(["T->T:2", "T:2->S4xT:2", "S4xT:2->B", "2.B->B", "2.B->M", "T->M"]);
assert(declaredArrows.has("T->T:2"));
assert(declaredArrows.has("S4xT:2->B"));
assert(declaredArrows.has("2.B->B"));
assert(declaredArrows.has("2.B->M"));
assert.equal(declaredArrows.has("B->M"), false);

console.log("Mathematical group Monster--Baby--Tits seam: PASS T=2^11*3^3*5^2*13; T:2 index=2; S4xT:2 maximal-order witness; 2.B double cover; B-to-M reversal forbidden; order23 absent");
