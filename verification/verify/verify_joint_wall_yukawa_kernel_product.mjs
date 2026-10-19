const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const zeros = (rows, cols) => Array.from({ length: rows }, () => Array(cols).fill(0));
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
    for (let i = r + 1; i < M.length; i++) {
      if (Math.abs(M[i][c]) > Math.abs(M[pivot][c])) pivot = i;
    }
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
  const C = zeros(p + q, p + q);
  for (let i = 0; i < p; i++) C[i][i] = 1;
  for (let i = 0; i < q; i++) C[p + i][p + i] = -1;
  return { H, C };
};

// One finite wall complex with index 2-1=1.
const wall = blockChiral([[1], [0]]);
assert(wall.H.length - rank(wall.H) === 1, "wall complex must have one zero");
assert(maxAbs(add(mul(wall.C, wall.H), mul(wall.H, wall.C))) < 1e-12, "wall grading must anticommute");

// Three copies of an internal 2+1 Yukawa complex: one unmatched state per copy.
const oneGeneration = blockChiral([[2], [3]]);
const internal = zeros(9, 9);
for (let generation = 0; generation < 3; generation++) {
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    internal[3 * generation + i][3 * generation + j] = oneGeneration.H[i][j];
  }
}
assert(internal.length - rank(internal) === 3, "three internal generations must have three zeros");

// Graded Clifford sum D = D_wall tensor I + C_wall tensor H_Y.
const D = add(kron(wall.H, eye(internal.length)), kron(wall.C, internal));
const D2 = mul(D, D);
const expectedSquare = add(kron(mul(wall.H, wall.H), eye(internal.length)), kron(eye(wall.H.length), mul(internal, internal)));
assert(maxAbs(add(D2, expectedSquare.map(row => row.map(x => -x)))) < 1e-12, "Clifford-sum square identity failed");
assert(D.length - rank(D) === 3, "joint kernel must contain exactly one wall-localized zero per internal generation");

// A grading-breaking selector component proportional to C_wall spoils the
// anticommutator and the sum-of-squares proof.
const epsilon = 0.2;
const brokenWall = add(wall.H, wall.C.map(row => row.map(x => epsilon * x)));
assert(maxAbs(add(mul(wall.C, brokenWall), mul(brokenWall, wall.C))) > 0.1, "selector-angle component must break the wall grading");

console.log("Joint wall-Yukawa kernel certificate: PASS");
console.log("ker_Dwall=1; ker_HY_three_generation=3; ker_joint=3");
console.log("Djoint_squared=Dwall_squared_plus_HY_squared=true");
console.log("smooth_transverse_selector_mass_breaks_fixed_wall_grading=true");
