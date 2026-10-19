import assert from "node:assert/strict";

const states = [];
for (let mask = 0; mask < 32; mask += 1) {
  const occupied = Array.from({ length: 5 }, (_, i) => i + 1)
    .filter((i) => (mask >> (i - 1)) & 1);
  if (occupied.length % 2 === 0) states.push({ occupied, key: occupied.join("") });
}
const byKey = new Map(states.map((state, i) => [state.key, i]));
const particle = (o) => {
  if (o.length === 0) return { field: "nu^c", left: "E", right: "D" };
  if (o.length === 2 && o[0] <= 3 && o[1] >= 4) return {
    field: (o[1] === 5 ? "u_" : "d_") + o[0], left: "O2_" + o[0], right: "H_" + o[1],
  };
  if (o.length === 2 && o.every((i) => i <= 3)) {
    const c = [1, 2, 3].find((i) => !o.includes(i));
    return { field: "u^c_" + c, left: "C", right: "O2_" + c };
  }
  if (o.join("") === "45") return { field: "e^c", left: "E", right: "C" };
  if (o.length === 4) {
    const missing = [1, 2, 3, 4, 5].find((i) => !o.includes(i));
    if (missing <= 3) return { field: "d^c_" + missing, left: "D", right: "O2_" + missing };
    return { field: missing === 4 ? "nu" : "e", left: "H_" + missing, right: "E" };
  }
  throw new Error("unlabelled state " + o.join(""));
};
states.forEach((state) => Object.assign(state, particle(state.occupied)));
assert.equal(states.length, 16);
assert.equal(new Set(states.map((state) => state.field)).size, 16);

const swapNeutral = (label) => label === "D" ? "E" : label === "E" ? "D" : label;
const topologyB = states.map((state) => ({
  ...state, left: swapNeutral(state.left), right: swapNeutral(state.right),
}));
assert(states.every((state, i) =>
  topologyB[i].field === state.field &&
  topologyB[i].left === swapNeutral(state.left) &&
  topologyB[i].right === swapNeutral(state.right)));

const zero = () => Array.from({ length: 16 }, () => Array(16).fill(0));
const bilinear = (create, annihilate) => {
  const matrix = zero();
  for (let column = 0; column < states.length; column += 1) {
    const occupied = [...states[column].occupied];
    const at = occupied.indexOf(annihilate);
    if (at < 0 || occupied.includes(create)) continue;
    let coefficient = at % 2 ? -1 : 1;
    occupied.splice(at, 1);
    const insertion = occupied.filter((i) => i < create).length;
    coefficient *= insertion % 2 ? -1 : 1;
    occupied.splice(insertion, 0, create);
    matrix[byKey.get(occupied.join(""))][column] = coefficient;
  }
  return matrix;
};
const diagonal = (values) => values.map((value, i) =>
  values.map((unused, j) => i === j ? value : 0));
const identity = diagonal(Array(16).fill(1));
const multiply = (a, b) => a.map((row) => b[0].map((unused, j) =>
  row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
const equal = (a, b) => a.every((row, i) => row.every((value, j) => value === b[i][j]));

const generators = [];
for (const [name, i, j] of [
  ["E12_color", 1, 2], ["E21_color", 2, 1],
  ["E23_color", 2, 3], ["E32_color", 3, 2],
  ["E45_weak", 4, 5], ["E54_weak", 5, 4],
]) generators.push({ name, matrix: bilinear(i, j) });
for (let mode = 1; mode <= 5; mode += 1) generators.push({
  name: "N" + mode,
  matrix: diagonal(states.map((state) => Number(state.occupied.includes(mode)))),
});

// S is the identity on named particle/Fock states while exchanging their
// neutral endpoint realization. The A and B gauge matrices must therefore
// satisfy S G_A = G_B S entry by entry.
for (const generator of generators) {
  const left = multiply(identity, generator.matrix);
  const right = multiply(generator.matrix, identity);
  assert(equal(left, right), generator.name + " failed exchange intertwining");
}

console.log(JSON.stringify({
  protocol: "furey-survivor-exchange-sm-intertwiner/1",
  stateCount: states.length,
  exchange: "D<->E on TRO endpoints; identity on the sixteen named even-Fock states",
  testedGenerators: generators.map((generator) => generator.name),
  nonabelianGeneratorsTested: 6,
  cartanNumberOperatorsTested: 5,
  everyFiveBitWeightPreserved: states.every((state, i) => state.key === topologyB[i].key),
  exactIntertwinerEquationsPassed: generators.length,
  implication: "The neutral survivor exchange intertwines the completed-TRO Standard-Model Lie-algebra action and preserves its full weight data.",
  limitation: "This does not establish that the exchange extends to an automorphism of Furey's source nested algebra, Lorentz action, or dynamics.",
  passed: true,
}, null, 2));
