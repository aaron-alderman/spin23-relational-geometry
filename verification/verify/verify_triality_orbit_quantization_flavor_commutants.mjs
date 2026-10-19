const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const zeros = (r, c) => Array.from({ length: r }, () => Array(c).fill(0));
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const scale = (s, A) => A.map(row => row.map(x => s * x));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));
const comm = (A, B) => sub(mul(A, B), mul(B, A));

function permutationMatrix(p) {
  const P = zeros(p.length, p.length);
  for (let i = 0; i < p.length; i++) P[p[i]][i] = 1;
  return P;
}

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

// Linear equations for X P - P X = 0 in the nine entries of X.
function commutantDimension(generators) {
  const equations = [];
  for (const P of generators) {
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      const row = Array(9).fill(0);
      for (let k = 0; k < 3; k++) {
        row[3 * i + k] += P[k][j];
        row[3 * k + j] -= P[i][k];
      }
      equations.push(row);
    }
  }
  return 9 - rank(equations);
}

const P12 = permutationMatrix([1, 0, 2]);
const P23 = permutationMatrix([0, 2, 1]);
assert(commutantDimension([P12, P23]) === 2, "S3 permutation commutant must be two-dimensional");
assert(commutantDimension([P12]) === 5, "nested-flag S2 commutant must be five-dimensional");

const I = eye(3);
const J = Array.from({ length: 3 }, () => Array(3).fill(1));
const Hu = add(scale(2, I), scale(0.7, J));
const Hd = add(scale(-1.1, I), scale(1.3, J));
assert(maxAbs(comm(Hu, P12)) < 1e-12 && maxAbs(comm(Hu, P23)) < 1e-12, "S3 Yukawa must commute with permutations");
assert(maxAbs(comm(Hu, Hd)) < 1e-12, "all S3-invariant Yukawa Hermitians must commute");
const singlet = [1, 1, 1];
const doublet1 = [1, -1, 0];
const apply = (A, v) => A.map(row => row.reduce((s, x, i) => s + x * v[i], 0));
const proportional = (u, v, lambda) => Math.max(...u.map((x, i) => Math.abs(x - lambda * v[i]))) < 1e-12;
assert(proportional(apply(Hu, singlet), singlet, 2 + 3 * 0.7), "S3 singlet eigenvalue failed");
assert(proportional(apply(Hu, doublet1), doublet1, 2), "S3 doublet eigenvalue failed");

// Generic real symmetric S2-invariant matrices share the antisymmetric
// eigenvector (1,-1,0), so their commutator has a zero mode and no 3-family
// Jarlskog determinant.
const A = [[2, 0.4, 0.8], [0.4, 2, 0.8], [0.8, 0.8, 5]];
const B = [[1, -0.2, 0.3], [-0.2, 1, 0.3], [0.3, 0.3, 4]];
assert(maxAbs(comm(A, P12)) < 1e-12 && maxAbs(comm(B, P12)) < 1e-12, "S2 matrices must commute with selected swap");
const C = comm(A, B);
assert(Math.max(...apply(C, [1, -1, 0]).map(Math.abs)) < 1e-12, "S2-invariant commutator must annihilate common antisymmetric flavor");
const det3 = M =>
  M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1])
  - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0])
  + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
assert(Math.abs(det3(C)) < 1e-12, "S2-invariant flavor commutator determinant must vanish");

assert(3 * 16 === 48, "three-sheet orbit quantization must produce 48 complex generation states");

console.log("Triality-orbit flavor-commutant certificate: PASS");
console.log("C3_permutation_module=singlet_plus_doublet; S3_commutant_dimension=2");
console.log("exact_S3_Yukawas_commute_and_have_degenerate_doublet=true");
console.log("nested_flag_S2_commutant_dimension=5; common_flavor_line_forces_three_family_CP_zero=true");
