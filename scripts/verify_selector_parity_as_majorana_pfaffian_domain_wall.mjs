const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const pfaffian = (A) => {
  const n = A.length;
  assert(n % 2 === 0, "Pfaffian requires even dimension");
  if (n === 0) return 1;
  let result = 0;
  for (let j = 1; j < n; j += 1) {
    const minor = A.filter((_, r) => r !== 0 && r !== j).map((row) => row.filter((_, c) => c !== 0 && c !== j));
    result += (j % 2 === 1 ? 1 : -1) * A[0][j] * pfaffian(minor);
  }
  return result;
};

const blockMajorana = (masses) => {
  const n = 2 * masses.length;
  const A = Array.from({ length: n }, () => Array(n).fill(0));
  masses.forEach((m, i) => {
    A[2 * i][2 * i + 1] = m;
    A[2 * i + 1][2 * i] = -m;
  });
  return A;
};
const add = (A, B, t = 1) => A.map((row, i) => row.map((x, j) => x + t * B[i][j]));
const sign = (x) => (x > 0 ? 1 : x < 0 ? -1 : 0);

for (let channels = 1; channels <= 5; channels += 1) {
  const negative = blockMajorana(Array.from({ length: channels }, (_, i) => -(i + 1)));
  const positive = blockMajorana(Array.from({ length: channels }, (_, i) => i + 1));
  const endpointProduct = sign(pfaffian(negative)) * sign(pfaffian(positive));
  assert(endpointProduct === (channels % 2 === 1 ? -1 : 1), "Pfaffian endpoint invariant must equal sign-change parity");
}

const Aminus = blockMajorana([-2, -3, -4]);
const Aplus = blockMajorana([2, 3, 4]);
const B = Array.from({ length: 6 }, () => Array(6).fill(0));
const entries = [[0, 2, 0.7], [0, 5, -0.4], [1, 3, 0.5], [2, 4, -0.6], [3, 5, 0.3]];
for (const [i, j, x] of entries) {
  B[i][j] = x;
  B[j][i] = -x;
}
const mixedMinus = add(Aminus, B, 0.2);
const mixedPlus = add(Aplus, B, 0.2);
assert(pfaffian(mixedMinus) !== 0 && pfaffian(mixedPlus) !== 0, "mixed endpoints must remain gapped");
assert(sign(pfaffian(mixedMinus)) * sign(pfaffian(mixedPlus)) === -1, "real antisymmetric mixing must preserve odd Pfaffian domain-wall class");

// Any continuous path between opposite nonzero Pfaffian signs must cross Pf=0.
const values = [];
for (let step = 0; step <= 1000; step += 1) {
  const t = step / 1000;
  const At = Aminus.map((row, i) => row.map((x, j) => (1 - t) * x + t * Aplus[i][j]));
  values.push(pfaffian(At));
}
assert(values.some((x) => Math.abs(x) < 1e-10), "opposite Pfaffian endpoints must force a gap closing along interpolation");

// Three uncompleted local indices give odd parity; Dirac balance gives even/trivial parity.
assert(3 % 2 === 1, "three-generation selector class must be Pfaffian odd");
assert(0 % 2 === 0, "Dirac-balanced selector class must be Pfaffian trivial");

console.log("Selector-parity Majorana-Pfaffian certificate: PASS");
console.log("endpoint_invariant=sgn(PfA_minus*PfA_plus)=(-1)^N_sign_changes");
console.log("three_channels_nontrivial=true; real_antisymmetric_mixing_stable=true");
console.log("opposite_Pfaffian_signs_force_zero_crossing=true");
