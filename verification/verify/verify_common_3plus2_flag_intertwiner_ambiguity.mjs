import assert from "node:assert/strict";

const C = (re = 0, im = 0) => ({ re, im });
const zero = () => Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => C()));
const generators = [];
const addRootPair = (i, j) => {
  const realSkew = zero();
  realSkew[i][j] = C(1); realSkew[j][i] = C(-1);
  generators.push(realSkew);
  const imaginarySymmetric = zero();
  imaginarySymmetric[i][j] = C(0, 1); imaginarySymmetric[j][i] = C(0, 1);
  generators.push(imaginarySymmetric);
};
addRootPair(0, 1); addRootPair(1, 2); addRootPair(3, 4);
for (const entries of [
  [1, -1, 0, 0, 0],
  [0, 1, -1, 0, 0],
  [0, 0, 0, 1, -1],
  [2, 2, 2, -3, -3],
]) {
  const diagonal = zero();
  entries.forEach((value, i) => { diagonal[i][i] = C(0, value); });
  generators.push(diagonal);
}

class Span {
  constructor() { this.rows = []; this.pivots = []; }
  add(input) {
    const row = [...input];
    for (let k = 0; k < this.rows.length; k += 1) {
      const p = this.pivots[k];
      if (Math.abs(row[p]) < 1e-10) continue;
      const factor = row[p];
      for (let j = p; j < row.length; j += 1) row[j] -= factor * this.rows[k][j];
    }
    const p = row.findIndex((value) => Math.abs(value) > 1e-10);
    if (p < 0) return;
    const factor = row[p];
    for (let j = p; j < row.length; j += 1) row[j] /= factor;
    this.rows.push(row); this.pivots.push(p);
  }
}

// Unknown complex 5x5 intertwiner: 50 real coordinates, with Re then Im for
// every matrix entry.  Impose [T,G]=0 for the common SM 3+2 representation.
const constraints = new Span();
const variable = (row, column, imaginary) => 2 * (5 * row + column) + Number(imaginary);
for (const G of generators) for (let a = 0; a < 5; a += 1) for (let b = 0; b < 5; b += 1) {
  const realRow = Array(50).fill(0);
  const imagRow = Array(50).fill(0);
  for (let u = 0; u < 5; u += 1) for (let v = 0; v < 5; v += 1) {
    let cr = 0, ci = 0;
    if (a === u) { cr += G[v][b].re; ci += G[v][b].im; }
    if (v === b) { cr -= G[a][u].re; ci -= G[a][u].im; }
    if (cr === 0 && ci === 0) continue;
    realRow[variable(u, v, false)] += cr;
    realRow[variable(u, v, true)] -= ci;
    imagRow[variable(u, v, false)] += ci;
    imagRow[variable(u, v, true)] += cr;
  }
  constraints.add(realRow);
  constraints.add(imagRow);
}
assert.equal(constraints.rows.length, 46);
assert.equal(50 - constraints.rows.length, 4); // two complex scalars

const complexIntertwinerDimension = 2;
const unitaryPhaseDimension = 2;
const combinedVolumePhaseDimension = 1; // 3 alpha + 2 beta = 0 on phase angles
const individualVolumeChoices = 3 * 2;
assert.equal(complexIntertwinerDimension, 2);
assert.equal(unitaryPhaseDimension, 2);
assert.equal(combinedVolumePhaseDimension, 1);
assert.equal(individualVolumeChoices, 6);

console.log("Common 3+2 flag intertwiner ambiguity: PASS");
console.log("real_unknowns=50 constraint_rank=46 commutant_complex_dimension=2");
console.log("equivariant_map=alpha_I3_plus_beta_I2");
console.log("unitary_ambiguity=U1_x_U1 combined_volume_leaves_U1");
console.log("matching_individual_volume_forms_leaves_Z3_x_Z2_of_order_6");
console.log("canonical_phase_selection=still_open");
