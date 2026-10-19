import assert from "node:assert/strict";

const states = [];
for (let mask = 0; mask < 32; mask += 1) {
  const occupied = Array.from({ length: 5 }, (_, i) => i + 1).filter((i) => (mask >> (i - 1)) & 1);
  if (occupied.length % 2 === 0) states.push({ occupied, key: occupied.join("") });
}
const byKey = new Map(states.map((state, i) => [state.key, i]));

const label = (occupied) => {
  if (occupied.length === 0) return { field: "nu^c", left: "E", right: "D", multiplet: "singlet" };
  if (occupied.length === 2) {
    if (occupied[0] <= 3 && occupied[1] >= 4) {
      const color = occupied[0];
      const up = occupied[1] === 5;
      return { field: (up ? "u_" : "d_") + color, left: "O2_" + color,
        right: "H_" + occupied[1], multiplet: "Q" };
    }
    if (occupied.every((i) => i <= 3)) {
      const missing = [1, 2, 3].find((i) => !occupied.includes(i));
      return { field: "u^c_" + missing, left: "C", right: "O2_" + missing, multiplet: "u^c" };
    }
    if (occupied[0] === 4 && occupied[1] === 5) return {
      field: "e^c", left: "E", right: "C", multiplet: "singlet",
    };
  }
  if (occupied.length === 4) {
    const missing = [1, 2, 3, 4, 5].find((i) => !occupied.includes(i));
    if (missing <= 3) return {
      field: "d^c_" + missing, left: "D", right: "O2_" + missing, multiplet: "d^c",
    };
    return {
      field: missing === 4 ? "nu" : "e", left: "H_" + missing, right: "E", multiplet: "L",
    };
  }
  throw new Error("unlabelled even Fock state " + occupied.join(","));
};
states.forEach((state) => Object.assign(state, label(state.occupied)));
assert.equal(new Set(states.map((state) => state.field)).size, 16);

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
const diagonalNumberDifference = (i, j) => states.map((state) =>
  Number(state.occupied.includes(i)) - Number(state.occupied.includes(j)));
const mul = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
const sub = (a, b) => a.map((row, i) => row.map((value, j) => value - b[i][j]));
const maxAbs = (a) => Math.max(...a.flat().map(Math.abs));
const diagonal = (values) => values.map((value, i) =>
  values.map((_, j) => i === j ? value : 0));

const roots = [
  { name: "color_12", create: 1, annihilate: 2, sector: "color" },
  { name: "color_23", create: 2, annihilate: 3, sector: "color" },
  { name: "weak_45", create: 4, annihilate: 5, sector: "weak" },
];
for (const root of roots) {
  root.matrix = bilinear(root.create, root.annihilate);
  root.transitions = [];
  for (let output = 0; output < 16; output += 1) for (let input = 0; input < 16; input += 1) {
    const coefficient = root.matrix[output][input];
    if (!coefficient) continue;
    const source = states[input];
    const target = states[output];
    assert.equal(source.multiplet, target.multiplet, "root must preserve each SM multiplet");
    if (root.sector === "color") {
      if (source.multiplet === "Q") assert.equal(source.right, target.right);
      else {
        assert(["u^c", "d^c"].includes(source.multiplet));
        assert.equal(source.left, target.left);
      }
    } else {
      if (source.multiplet === "Q") assert.equal(source.left, target.left);
      else {
        assert.equal(source.multiplet, "L");
        assert.equal(source.right, target.right);
      }
    }
    root.transitions.push(source.field + "->" + target.field);
  }
}
assert.equal(roots[0].transitions.length, 4);
assert.equal(roots[1].transitions.length, 4);
assert.equal(roots[2].transitions.length, 4);

// Exact Lie brackets on the even Fock sector.
const E12 = roots[0].matrix;
const E23 = roots[1].matrix;
const E13 = bilinear(1, 3);
assert(maxAbs(sub(sub(mul(E12, E23), mul(E23, E12)), E13)) < 1e-12);
for (const [i, j] of [[1, 2], [2, 3], [4, 5]]) {
  const Eij = bilinear(i, j);
  const Eji = bilinear(j, i);
  const Hij = diagonal(diagonalNumberDifference(i, j));
  assert(maxAbs(sub(sub(mul(Eij, Eji), mul(Eji, Eij)), Hij)) < 1e-12);
}

// The sterile state and charged singlet are killed by all nonabelian roots.
for (const field of ["nu^c", "e^c"]) {
  const column = states.findIndex((state) => state.field === field);
  assert(roots.every((root) => root.matrix.every((row) => row[column] === 0)));
}

console.log("Five-bit nonabelian roots on Furey TRO blocks: PASS");
for (const root of roots) console.log(root.name + "=" + root.transitions.join(","));
console.log("su3_and_su2_commutators=exact_on_even_fock_sector");
console.log("lorentz_conjugation_and_external_h2r_intertwiner=still_open");
