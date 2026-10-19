import assert from "node:assert/strict";

// Basis of V: a1,a2,b1,b2 = 0,1,2,3. Basis of Lambda^2 in lexicographic pairs.
const pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const form = (entries) => pairs.map((p) => entries.get(p.join("")) ?? 0);
const f = (...terms) => {
  const m = new Map();
  for (const [i, j, c] of terms) m.set(`${Math.min(i, j)}${Math.max(i, j)}`, (i < j ? 1 : -1) * c);
  return form(m);
};
const permutationSign = (xs) => {
  let inversions = 0;
  for (let i = 0; i < xs.length; i++) for (let j = i + 1; j < xs.length; j++) if (xs[i] > xs[j]) inversions++;
  return inversions % 2 ? -1 : 1;
};
const wedgeCoefficient = (x, y) => {
  let s = 0;
  for (let i = 0; i < pairs.length; i++) for (let j = 0; j < pairs.length; j++) {
    const indices = [...pairs[i], ...pairs[j]];
    if (new Set(indices).size < 4) continue;
    s += x[i] * y[j] * permutationSign(indices);
  }
  return s;
};
const B = (x, y) => {
  const value = -wedgeCoefficient(x, y);
  return value === 0 ? 0 : value;
};
const add = (...xs) => xs[0].map((_, i) => xs.reduce((s, x) => s + x[i], 0));
const scale = (n, x) => x.map((a) => n * a);
const gram = (basis) => basis.map((x) => basis.map((y) => B(x, y)));

const a1a2 = f([0, 1, 1]);
const b1b2 = f([2, 3, 1]);
const a1b1 = f([0, 2, 1]);
const a1b2 = f([0, 3, 1]);
const a2b1 = f([1, 2, 1]);
const a2b2 = f([1, 3, 1]);
const omega = add(a1b1, a2b2);

const E1 = a1a2;
const F1 = scale(-1, b1b2);
const E2 = a1b2;
const F2 = scale(-1, a2b1);
const R = add(a1b1, scale(-1, a2b2));
const primitiveBasis = [E1, F1, E2, F2, R];
for (const x of primitiveBasis) assert.equal(wedgeCoefficient(x, omega), 0);
assert.deepEqual(gram(primitiveBasis), [
  [0, 1, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, -2],
]);

const selector = add(E1, F1);             // a1^a2 - b1^b2
const binaryCompanion = add(E1, scale(-1, F1)); // a1^a2 + b1^b2
const binaryRoot = R;                     // a1^b1 - a2^b2
const qutritNull1 = E2;                   // a1^b2
const qutritNull2 = scale(-3, F2);         // 3 a2^b1
const crossPrimeBasis = [selector, binaryCompanion, binaryRoot, qutritNull1, qutritNull2];
assert.deepEqual(gram(crossPrimeBasis), [
  [2, 0, 0, 0, 0],
  [0, -2, 0, 0, 0],
  [0, 0, -2, 0, 0],
  [0, 0, 0, 0, -3],
  [0, 0, 0, -3, 0],
]);
for (const x of crossPrimeBasis.slice(1)) assert.equal(B(selector, x), 0);
assert.equal(wedgeCoefficient(selector, selector), -2);

console.log("primitive_wedge_square_spin23_and_selector_dictionary: PASS");
console.log("primitive_Lambda2_basis=E1=a1^a2,F1=-b1^b2,E2=a1^b2,F2=-a2^b1,R=a1^b1-a2^b2");
console.log("Gram=U+U+<-2>,signature=(2,3)");
console.log("selector_v=E1+F1=a1^a2-b1^b2,norm=2");
console.log("binary_companion_w=E1-F1=a1^a2+b1^b2,norm=-2");
console.log("second_binary_root_R=a1^b1-a2^b2,norm=-2");
console.log("qutrit_null_pair=E2_and_-3F2=a1^b2_and_3a2^b1,pairing=-3");
console.log("selector_complement_Gram=<-2>+<-2>+U(-3)");
console.log("stabilizer_of_positive_selector_in_real_Spin23_is_Spin13_isomorphic_to_SL2C");

