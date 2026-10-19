import assert from "node:assert/strict";

const fockStates = [];
for (let mask = 0; mask < 32; mask += 1) {
  const occupied = Array.from({ length: 5 }, (_, i) => i + 1).filter((i) => (mask >> (i - 1)) & 1);
  if (occupied.length % 2 === 0) fockStates.push({ occupied, key: occupied.join("") });
}
const fockByKey = new Map(fockStates.map((state, i) => [state.key, i]));
const edgeFor = (occupied) => {
  if (occupied.length === 0) return { left: "E", right: "D", field: "nu^c" };
  if (occupied.length === 2) {
    if (occupied[0] <= 3 && occupied[1] >= 4) return {
      left: "O2_" + occupied[0], right: "H_" + occupied[1],
      field: (occupied[1] === 5 ? "u_" : "d_") + occupied[0],
    };
    if (occupied.every((i) => i <= 3)) {
      const missing = [1, 2, 3].find((i) => !occupied.includes(i));
      return { left: "C", right: "O2_" + missing, field: "u^c_" + missing };
    }
    return { left: "E", right: "C", field: "e^c" };
  }
  const missing = [1, 2, 3, 4, 5].find((i) => !occupied.includes(i));
  if (missing <= 3) return { left: "D", right: "O2_" + missing, field: "d^c_" + missing };
  return { left: "H_" + missing, right: "E", field: missing === 4 ? "nu" : "e" };
};
fockStates.forEach((state) => Object.assign(state, edgeFor(state.occupied)));
const edgeIndex = new Map(fockStates.map((state, i) => [state.left + "|" + state.right, i]));

const bilinear = (create, annihilate) => {
  const matrix = Array.from({ length: 16 }, () => Array(16).fill(0));
  for (let column = 0; column < 16; column += 1) {
    const occupied = [...fockStates[column].occupied];
    const at = occupied.indexOf(annihilate);
    if (at < 0 || occupied.includes(create)) continue;
    let coefficient = at % 2 ? -1 : 1;
    occupied.splice(at, 1);
    const insertion = occupied.filter((i) => i < create).length;
    coefficient *= insertion % 2 ? -1 : 1;
    occupied.splice(insertion, 0, create);
    matrix[fockByKey.get(occupied.join(""))][column] = coefficient;
  }
  return matrix;
};
const skewBilinear = (i, j) => {
  const forward = bilinear(i, j);
  const reverse = bilinear(j, i);
  return forward.map((row, a) => row.map((value, b) => value - reverse[a][b]));
};

const triple = (a, b, c) => {
  const x = fockStates[a];
  const y = fockStates[b];
  const z = fockStates[c];
  if (x.right !== y.right || y.left !== z.left) return null;
  const output = edgeIndex.get(x.left + "|" + z.right);
  return output === undefined ? null : output;
};

const derivationResidual = (D) => {
  let maximum = 0;
  let witness = null;
  for (let a = 0; a < 16; a += 1) for (let b = 0; b < 16; b += 1) for (let c = 0; c < 16; c += 1) {
    const lhs = Array(16).fill(0);
    const rhs = Array(16).fill(0);
    const out = triple(a, b, c);
    if (out !== null) for (let i = 0; i < 16; i += 1) lhs[i] += D[i][out];
    for (let i = 0; i < 16; i += 1) if (D[i][a]) {
      const q = triple(i, b, c);
      if (q !== null) rhs[q] += D[i][a];
    }
    // The middle slot is conjugate-linear; coefficients are real here.
    for (let i = 0; i < 16; i += 1) if (D[i][b]) {
      const q = triple(a, i, c);
      if (q !== null) rhs[q] += D[i][b];
    }
    for (let i = 0; i < 16; i += 1) if (D[i][c]) {
      const q = triple(a, b, i);
      if (q !== null) rhs[q] += D[i][c];
    }
    for (let i = 0; i < 16; i += 1) {
      const residual = Math.abs(lhs[i] - rhs[i]);
      if (residual > maximum) {
        maximum = residual;
        witness = {
          inputs: [fockStates[a].field, fockStates[b].field, fockStates[c].field],
          output: fockStates[i].field,
          lhs: lhs[i], rhs: rhs[i],
        };
      }
    }
  }
  return { maximum, witness };
};

const smRoots = [
  { name: "color_12", matrix: skewBilinear(1, 2) },
  { name: "color_23", matrix: skewBilinear(2, 3) },
  { name: "weak_45", matrix: skewBilinear(4, 5) },
];
for (const root of smRoots) {
  root.audit = derivationResidual(root.matrix);
  assert.equal(root.audit.maximum, 0, root.name + " must be a ternary derivation");
}

const brokenRoots = [
  { name: "cross_14", matrix: skewBilinear(1, 4) },
  { name: "cross_15", matrix: skewBilinear(1, 5) },
  { name: "cross_24", matrix: skewBilinear(2, 4) },
];
for (const root of brokenRoots) {
  root.audit = derivationResidual(root.matrix);
  assert(root.audit.maximum > 0, root.name + " must fail the TRO derivation law");
}

console.log("TRO ternary stabilizer root audit: PASS");
console.log("sm_simple_roots_derivation_residual=0");
for (const root of brokenRoots) console.log(root.name + "_residual=" + root.audit.maximum
  + " witness=" + JSON.stringify(root.audit.witness));
console.log("full_so10_intersection_classification=see_verify_puncture_neutral_so10_ternary_stabilizer_is_sm");
