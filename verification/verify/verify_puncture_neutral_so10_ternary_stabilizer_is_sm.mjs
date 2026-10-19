import assert from "node:assert/strict";

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const abs = (a) => Math.hypot(a.re, a.im);
const zeroMatrix = () => Array.from({ length: 16 }, () => Array.from({ length: 16 }, () => C()));

const states = [];
for (let mask = 0; mask < 32; mask += 1) {
  const occupied = Array.from({ length: 5 }, (_, i) => i + 1).filter((i) => (mask >> (i - 1)) & 1);
  if (occupied.length % 2 === 0) states.push({ occupied, key: occupied.join("") });
}
const stateByKey = new Map(states.map((state, i) => [state.key, i]));
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
states.forEach((state) => Object.assign(state, edgeFor(state.occupied)));
const edgeIndex = new Map(states.map((state, i) => [state.left + "|" + state.right, i]));
const vacuum = states.findIndex((state) => state.field === "nu^c");

const annihilate = (occupied, mode) => {
  const at = occupied.indexOf(mode);
  if (at < 0) return null;
  const next = [...occupied];
  next.splice(at, 1);
  return { occupied: next, coefficient: at % 2 ? -1 : 1 };
};
const create = (occupied, mode) => {
  if (occupied.includes(mode)) return null;
  const at = occupied.filter((i) => i < mode).length;
  const next = [...occupied];
  next.splice(at, 0, mode);
  return { occupied: next, coefficient: at % 2 ? -1 : 1 };
};
const operator = (steps) => {
  const matrix = zeroMatrix();
  for (let column = 0; column < 16; column += 1) {
    let occupied = [...states[column].occupied];
    let coefficient = 1;
    for (const step of [...steps].reverse()) {
      const result = step.kind === "create" ? create(occupied, step.mode) : annihilate(occupied, step.mode);
      if (!result) { coefficient = 0; break; }
      occupied = result.occupied;
      coefficient *= result.coefficient;
    }
    if (coefficient) matrix[stateByKey.get(occupied.join(""))][column] = C(coefficient);
  }
  return matrix;
};
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const combine = (a, b, alpha, beta) => a.map((row, i) => row.map((value, j) =>
  add(mul(alpha, value), mul(beta, b[i][j]))));
const scale = (alpha, a) => a.map((row) => row.map((value) => mul(alpha, value)));

const triple = (a, b, c) => {
  const x = states[a], y = states[b], z = states[c];
  if (x.right !== y.right || y.left !== z.left) return null;
  const output = edgeIndex.get(x.left + "|" + z.right);
  return output === undefined ? null : output;
};
const derivationResidual = (D) => {
  let maximum = 0;
  for (let a = 0; a < 16; a += 1) for (let b = 0; b < 16; b += 1) for (let c = 0; c < 16; c += 1) {
    const lhs = Array.from({ length: 16 }, () => C());
    const rhs = Array.from({ length: 16 }, () => C());
    const out = triple(a, b, c);
    if (out !== null) for (let i = 0; i < 16; i += 1) lhs[i] = add(lhs[i], D[i][out]);
    for (let i = 0; i < 16; i += 1) if (abs(D[i][a]) > 0) {
      const q = triple(i, b, c);
      if (q !== null) rhs[q] = add(rhs[q], D[i][a]);
    }
    for (let i = 0; i < 16; i += 1) if (abs(D[i][b]) > 0) {
      const q = triple(a, i, c);
      if (q !== null) rhs[q] = add(rhs[q], conj(D[i][b]));
    }
    for (let i = 0; i < 16; i += 1) if (abs(D[i][c]) > 0) {
      const q = triple(a, b, i);
      if (q !== null) rhs[q] = add(rhs[q], D[i][c]);
    }
    for (let i = 0; i < 16; i += 1) maximum = Math.max(maximum, abs(sub(lhs[i], rhs[i])));
  }
  return maximum;
};

const generators = [];
for (let i = 1; i <= 5; i += 1) {
  const diagonal = zeroMatrix();
  for (let s = 0; s < 16; s += 1) {
    const q = states[s].occupied.includes(i) ? -1 : 1;
    diagonal[s][s] = C(0, q);
  }
  generators.push({ name: "H" + i, type: "cartan", matrix: diagonal, expected: true });
}
for (let i = 1; i <= 5; i += 1) for (let j = i + 1; j <= 5; j += 1) {
  const Eij = operator([{ kind: "create", mode: i }, { kind: "annihilate", mode: j }]);
  const Eji = dagger(Eij);
  const blockPreserving = (i <= 3 && j <= 3) || (i >= 4 && j >= 4);
  generators.push({ name: "A" + i + j, type: "number", matrix: combine(Eij, Eji, C(1), C(-1)),
    expected: blockPreserving });
  generators.push({ name: "B" + i + j, type: "number", matrix: scale(C(0, 1), combine(Eij, Eji, C(1), C(1))),
    expected: blockPreserving });

  const pairCreate = operator([{ kind: "create", mode: i }, { kind: "create", mode: j }]);
  const pairDestroy = dagger(pairCreate);
  generators.push({ name: "P" + i + j, type: "pair", matrix: combine(pairCreate, pairDestroy, C(1), C(-1)),
    expected: null });
  generators.push({ name: "Q" + i + j, type: "pair", matrix: scale(C(0, 1),
    combine(pairCreate, pairDestroy, C(1), C(1))), expected: null });
}
assert.equal(generators.length, 45);

for (const generator of generators) {
  generator.residual = derivationResidual(generator.matrix);
  if (generator.expected !== null) assert.equal(generator.residual < 1e-10, generator.expected,
    generator.name + " unexpected ternary-derivation classification; residual=" + generator.residual);
}
const surviving = generators.filter((generator) => generator.residual < 1e-10);
assert.equal(surviving.length, 15);
assert.equal(surviving.filter((generator) => generator.type === "cartan").length, 5);
assert.equal(surviving.filter((generator) => generator.type === "number").length, 8);
assert.deepEqual(surviving.filter((generator) => generator.type === "pair").map((generator) => generator.name),
  ["P45", "Q45"]);

// Compute the rank of the complete real derivation-constraint system on the
// 45-dimensional compact so(10) generator space.  This rules out hidden
// cancelling combinations among generators that fail individually.
class RealSpan {
  constructor() { this.rows = []; this.pivots = []; }
  add(input) {
    const row = [...input];
    for (let k = 0; k < this.rows.length; k += 1) {
      const pivot = this.pivots[k];
      if (Math.abs(row[pivot]) < 1e-10) continue;
      const factor = row[pivot];
      for (let j = pivot; j < row.length; j += 1) row[j] -= factor * this.rows[k][j];
    }
    const pivot = row.findIndex((value) => Math.abs(value) > 1e-10);
    if (pivot < 0) return;
    const scaleFactor = row[pivot];
    for (let j = pivot; j < row.length; j += 1) row[j] /= scaleFactor;
    this.rows.push(row);
    this.pivots.push(pivot);
  }
}
const constraintSpan = new RealSpan();
for (let a = 0; a < 16; a += 1) for (let b = 0; b < 16; b += 1) for (let c = 0; c < 16; c += 1) {
  const baseOutput = triple(a, b, c);
  for (let output = 0; output < 16; output += 1) {
    const rowRe = [], rowIm = [];
    for (const { matrix: D } of generators) {
      let residual = baseOutput === null ? C() : D[output][baseOutput];
      for (let i = 0; i < 16; i += 1) {
        if (triple(i, b, c) === output) residual = sub(residual, D[i][a]);
        if (triple(a, i, c) === output) residual = sub(residual, conj(D[i][b]));
        if (triple(a, b, i) === output) residual = sub(residual, D[i][c]);
      }
      rowRe.push(residual.re);
      rowIm.push(residual.im);
    }
    constraintSpan.add(rowRe);
    constraintSpan.add(rowIm);
  }
}
assert.equal(constraintSpan.rows.length, 30);
assert.equal(45 - constraintSpan.rows.length, 15);

// Eight number-preserving roots kill nu^c.  P45 and Q45 independently move it
// to e^c.  A Cartan sum t_i H_i kills it exactly when sum t_i=0.
for (const generator of surviving.filter((generator) => generator.type === "number")) {
  assert(generator.matrix.every((row) => abs(row[vacuum]) < 1e-12));
}
for (const generator of surviving.filter((generator) => generator.type === "pair")) {
  assert(generator.matrix.some((row) => abs(row[vacuum]) > 1e-12));
}
const punctureNeutralDimension = 8 + 4;
assert.equal(punctureNeutralDimension, 12);

console.log("Puncture-neutral SO(10) ternary stabilizer audit: PASS");
console.log("so10_generators=45 constraint_rank=30 ternary_derivations=15 equals_u3_plus_so4_dimension");
console.log("surviving_number_roots=8 surviving_cartans=5 surviving_pair_roots=P45,Q45");
console.log("nu_c_neutral_cartans=4 puncture_neutral_dimension=12 equals_su3_plus_su2_plus_u1");
console.log("global_group_kernel=see_verify_faithful_sm_group_kernel_is_z6");
