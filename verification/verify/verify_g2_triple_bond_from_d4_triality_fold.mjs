const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const add = (...vectors) => vectors[0].map((_, i) => vectors.reduce((sum, v) => sum + v[i], 0));
const matMul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const equalMatrix = (A, B) => A.every((row, i) => row.every((x, j) => x === B[i][j]));

// D4 simple roots in R4. alpha2 is central; alpha1, alpha3 and alpha4
// are the mutually orthogonal outer nodes permuted by triality.
const alpha1 = [1, -1, 0, 0];
const alpha2 = [0, 1, -1, 0];
const alpha3 = [0, 0, 1, -1];
const alpha4 = [0, 0, 1, 1];
const outer = [alpha1, alpha3, alpha4];

for (const root of [alpha1, alpha2, alpha3, alpha4]) {
  assert(dot(root, root) === 2, "all D4 simple roots must have squared length two");
}
for (let i = 0; i < outer.length; i += 1) {
  for (let j = i + 1; j < outer.length; j += 1) {
    assert(dot(outer[i], outer[j]) === 0, "the three triality outer roots must be orthogonal");
  }
  assert(dot(alpha2, outer[i]) === -1, "the central D4 root must meet every outer root once");
}

// The folded short root is the orbit average s = (a1+a3+a4)/3.
// Keep its numerator integral to make the exact rational arithmetic visible.
const shortNumerator = add(alpha1, alpha3, alpha4);
const shortDenominator = 3;
const long = alpha2;
const shortLengthNumerator = dot(shortNumerator, shortNumerator);
const shortLengthDenominator = shortDenominator ** 2;
const shortLongNumerator = dot(shortNumerator, long);
const shortLongDenominator = shortDenominator;

assert(shortLengthNumerator === 6 && shortLengthDenominator === 9, "short root must have squared length 2/3");
assert(dot(long, long) === 2, "fixed central root must retain squared length two");
assert(shortLongNumerator === -3 && shortLongDenominator === 3, "folded roots must have inner product -1");
assert(dot(long, long) * shortLengthDenominator === 3 * shortLengthNumerator, "long/short squared-length ratio must be three");

// Standard Cartan convention A_ij = 2 (alpha_i, alpha_j)/(alpha_j, alpha_j),
// with the short root first and the long root second.
const cartan = [
  [2, -1],
  [-3, 2]
];
assert(cartan[0][0] * cartan[1][1] - cartan[0][1] * cartan[1][0] === 1, "G2 Cartan determinant must be one");

// Reflections acting on coefficient columns in the [short,long] basis.
const reflectShort = [
  [-1, 3],
  [0, 1]
];
const reflectLong = [
  [1, 0],
  [1, -1]
];
assert(equalMatrix(matMul(reflectShort, reflectShort), identity(2)), "short-root reflection must square to identity");
assert(equalMatrix(matMul(reflectLong, reflectLong), identity(2)), "long-root reflection must square to identity");

const coxeter = matMul(reflectShort, reflectLong);
let power = identity(2);
let order = 0;
do {
  power = matMul(power, coxeter);
  order += 1;
  assert(order <= 12, "Coxeter product failed to close");
} while (!equalMatrix(power, identity(2)));
assert(order === 6, "G2 Coxeter element must have order six");

// Generate the root system from the two simple roots. Integer coefficient
// coordinates remain exact under both reflection matrices.
const apply = (M, v) => M.map(row => row[0] * v[0] + row[1] * v[1]);
const key = v => `${v[0]},${v[1]}`;
const roots = new Map([[key([1, 0]), [1, 0]], [key([0, 1]), [0, 1]]]);
let changed = true;
while (changed) {
  changed = false;
  for (const root of [...roots.values()]) {
    for (const reflection of [reflectShort, reflectLong]) {
      const image = apply(reflection, root);
      if (!roots.has(key(image))) {
        roots.set(key(image), image);
        changed = true;
      }
    }
  }
}

// Use 3 times the folded Gram matrix to classify lengths without fractions:
// 3G = [[2,-3],[-3,6]]. Short roots have scaled norm 2; long roots norm 6.
const scaledNorm = ([x, y]) => 2 * x * x - 6 * x * y + 6 * y * y;
const shortRoots = [...roots.values()].filter(root => scaledNorm(root) === 2);
const longRoots = [...roots.values()].filter(root => scaledNorm(root) === 6);
assert(roots.size === 12, "G2 must have twelve roots");
assert(shortRoots.length === 6, "G2 must have six short roots");
assert(longRoots.length === 6, "G2 must have six long roots");

console.log("D4 triality to G2 triple-bond certificate: PASS");
console.log("outer_triality_orbit_size=3; outer_roots_pairwise_orthogonal=true");
console.log("folded_short_norm_squared=2/3; fixed_long_norm_squared=2; ratio=3");
console.log("cartan=[[2,-1],[-3,2]]; determinant=1; coxeter_order=6");
console.log("root_count=12; short_roots=6; long_roots=6");
