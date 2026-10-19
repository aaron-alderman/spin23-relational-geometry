const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const rankReal = (input, tolerance = 1e-10) => {
  const a = input.map((row) => row.slice());
  const rows = a.length;
  const cols = rows === 0 ? 0 : a[0].length;
  let rank = 0;
  for (let col = 0; col < cols && rank < rows; col += 1) {
    let pivot = rank;
    for (let row = rank + 1; row < rows; row += 1) {
      if (Math.abs(a[row][col]) > Math.abs(a[pivot][col])) pivot = row;
    }
    if (Math.abs(a[pivot][col]) <= tolerance) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const p = a[rank][col];
    for (let j = col; j < cols; j += 1) a[rank][j] /= p;
    for (let row = 0; row < rows; row += 1) {
      if (row === rank) continue;
      const f = a[row][col];
      for (let j = col; j < cols; j += 1) a[row][j] -= f * a[rank][j];
    }
    rank += 1;
  }
  return rank;
};

// Exact rectangular models of the semi-infinite Toeplitz monomials T_{z^m}.
// For m>=0, S^m has zero kernel and m-dimensional cokernel.
// For m<0, (S*)^{-m} has (-m)-dimensional kernel and zero cokernel.
const rectangularMonomial = (m, bulkLength = 12) => {
  const domain = m >= 0 ? bulkLength : bulkLength - m;
  const codomain = m >= 0 ? bulkLength + m : bulkLength;
  const matrix = Array.from({ length: codomain }, () => Array(domain).fill(0));
  if (m >= 0) {
    for (let n = 0; n < domain; n += 1) matrix[n + m][n] = 1;
  } else {
    for (let n = 0; n < codomain; n += 1) matrix[n][n - m] = 1;
  }
  const rank = rankReal(matrix);
  return {
    kernel: domain - rank,
    cokernel: codomain - rank,
    index: domain - codomain,
  };
};

for (let m = -5; m <= 5; m += 1) {
  const result = rectangularMonomial(m);
  assert(result.index === -m, "Toeplitz monomial index must be minus winding");
  assert(result.kernel - result.cokernel === -m, "kernel-cokernel must equal index");
  assert(((result.kernel + result.cokernel - m) % 2) === 0,
    "chiral zero-space parity must equal winding parity");
}

const channelCertificate = (exponents) => {
  const winding = exponents.reduce((a, b) => a + b, 0);
  const pieces = exponents.map((m) => rectangularMonomial(m));
  const kernel = pieces.reduce((a, x) => a + x.kernel, 0);
  const cokernel = pieces.reduce((a, x) => a + x.cokernel, 0);
  const index = kernel - cokernel;
  const chiralZeroModes = kernel + cokernel;
  assert(index === -winding, "matrix-symbol Toeplitz index must sum channel indices");
  assert(((chiralZeroModes - winding) % 2) === 0,
    "total chiral zero-mode parity must equal determinant-winding parity");
  return { winding, index, chiralZeroModes };
};

const minimalThree = channelCertificate([1, 1, 1]);
assert(minimalThree.winding === 3 && minimalThree.index === -3 && minimalThree.chiralZeroModes === 3,
  "minimal three-flavor selector must have three one-chirality edge zero modes");

// Every exponent is odd precisely for diagonal antipodal-odd mass channels.
for (const exponents of [[1, 3, -1], [-3, 1, 5], [3, 3, 3], [-1, -1, 1]]) {
  assert(exponents.every((m) => Math.abs(m % 2) === 1), "test family must obey odd deck sewing");
  const result = channelCertificate(exponents);
  assert(Math.abs(result.winding % 2) === 1, "three odd channels must have odd winding");
  assert(Math.abs(result.chiralZeroModes % 2) === 1, "three-flavor chiral kernel must have odd parity");
}

console.log("Selector Toeplitz-index and chiral-edge-parity certificate: PASS");
console.log("Gohberg_Krein_convention=Ind(T_M)=-wind(det(M))");
console.log("minimal_three_flavor_index=-3");
console.log("minimal_three_flavor_chiral_zero_modes=3");
console.log("zero_mode_parity_equals_winding_parity=true");
console.log("Majorana_class_D_reality_not_asserted=true");
