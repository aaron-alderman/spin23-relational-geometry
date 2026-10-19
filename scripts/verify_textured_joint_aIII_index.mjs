const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const zeros = (r, c) => Array.from({ length: r }, () => Array(c).fill(0));
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const kron = (A, B) => A.flatMap(rowA => B.map(rowB => rowA.flatMap(a => rowB.map(b => a * b))));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));

function rank(A, tolerance = 1e-10) {
  const M = A.map(row => [...row]);
  let r = 0;
  for (let c = 0; c < M[0].length && r < M.length; c++) {
    let pivot = r;
    for (let i = r + 1; i < M.length; i++) if (Math.abs(M[i][c]) > Math.abs(M[pivot][c])) pivot = i;
    if (Math.abs(M[pivot][c]) < tolerance) continue;
    [M[r], M[pivot]] = [M[pivot], M[r]];
    const p = M[r][c];
    for (let j = c; j < M[0].length; j++) M[r][j] /= p;
    for (let i = 0; i < M.length; i++) {
      if (i === r) continue;
      const f = M[i][c];
      for (let j = c; j < M[0].length; j++) M[i][j] -= f * M[r][j];
    }
    r++;
  }
  return r;
}

const blockChiral = A => {
  const p = A.length;
  const q = A[0].length;
  const H = zeros(p + q, p + q);
  const At = transpose(A);
  for (let i = 0; i < p; i++) for (let j = 0; j < q; j++) {
    H[i][p + j] = A[i][j];
    H[p + j][i] = At[j][i];
  }
  const grading = zeros(p + q, p + q);
  for (let i = 0; i < p; i++) grading[i][i] = 1;
  for (let i = 0; i < q; i++) grading[p + i][p + i] = -1;
  return { H, grading };
};

const wall = blockChiral([[1], [0]]); // grading dimensions 2+1, index +1
const oneGeneration = blockChiral([[2], [3]]); // grading dimensions 2+1
const HY = zeros(9, 9);
const W = zeros(9, 9);
for (let g = 0; g < 3; g++) {
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    HY[3 * g + i][3 * g + j] = oneGeneration.H[i][j];
    W[3 * g + i][3 * g + j] = oneGeneration.grading[i][j];
  }
}

const D = add(kron(wall.H, eye(9)), kron(wall.grading, HY));
const S = kron(wall.grading, W);
assert(maxAbs(add(mul(S, D), mul(D, S))) < 1e-12, "joint operator must be odd under total chiral grading");

const signs = S.map((row, i) => row[i]);
const nPlus = signs.filter(x => x > 0).length;
const nMinus = signs.filter(x => x < 0).length;
assert(nPlus === 15 && nMinus === 12, "total chiral sectors must have 15-12 imbalance");
assert(D.length - rank(D) === 3, "untextured joint operator must have three zeros");

// A deterministic generic texture coupling: any matrix supported only between
// opposite total-chirality sectors preserves AIII, even when it is not a tensor sum.
const texture = zeros(D.length, D.length);
for (let i = 0; i < D.length; i++) {
  for (let j = i + 1; j < D.length; j++) {
    if (signs[i] === -signs[j]) {
      const value = (((i + 1) * 17 + (j + 1) * 31) % 23 - 11) / 97;
      texture[i][j] = value;
      texture[j][i] = value;
    }
  }
}
assert(maxAbs(add(mul(S, texture), mul(texture, S))) < 1e-12, "texture must preserve total chiral symmetry");
const textured = add(D, texture);
assert(textured.length - rank(textured) === 3, "generic AIII texture must retain the three-index kernel");

// A same-sector term breaks AIII and can lift the zero modes.
const delta = Math.sqrt(2) / 10;
const broken = add(textured, eye(textured.length).map(row => row.map(x => delta * x)));
assert(maxAbs(add(mul(S, broken), mul(broken, S))) > 0.1, "same-sector mass must break total chiral symmetry");
assert(broken.length - rank(broken) === 0, "generic grading-breaking mass must be able to lift all three zeros");

// Balancing each 2+1 internal complex to 2+2 removes the chiral-dimension index.
const balancedOne = blockChiral([[2, 0], [0, 3]]);
const balancedHY = zeros(12, 12);
const balancedW = zeros(12, 12);
for (let g = 0; g < 3; g++) {
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    balancedHY[4 * g + i][4 * g + j] = balancedOne.H[i][j];
    balancedW[4 * g + i][4 * g + j] = balancedOne.grading[i][j];
  }
}
const balancedD = add(kron(wall.H, eye(12)), kron(wall.grading, balancedHY));
const balancedS = kron(wall.grading, balancedW);
const balancedTrace = balancedS.reduce((sum, row, i) => sum + row[i], 0);
assert(Math.abs(balancedTrace) < 1e-12, "Dirac-completed internal carrier must have zero net chiral index");
assert(balancedD.length - rank(balancedD) === 0, "generic balanced completion may be fully gapped");

console.log("Textured joint AIII-index certificate: PASS");
console.log("total_chiral_dimensions=15_plus_12_minus; index=3");
console.log("generic_nonfactorizing_AIII_texture_retains_three_zeros=true");
console.log("same_sector_breaking_can_lift_all=true; balanced_Dirac_completion_index=0");
