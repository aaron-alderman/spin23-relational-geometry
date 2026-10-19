import assert from "node:assert/strict";

const pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const pairIndex = new Map(pairs.map((p, i) => [p.join(","), i]));
const add = (a, b) => a.map((x, i) => x + b[i]);
const scale = (n, a) => a.map((x) => n * x);
const basis2 = (i, j) => {
  const out = Array(6).fill(0);
  const sign = i < j ? 1 : -1;
  out[pairIndex.get([Math.min(i, j), Math.max(i, j)].join(","))] = sign;
  return out;
};
const wedgeVectors = (u, v) => {
  const out = Array(6).fill(0);
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
    out[pairIndex.get(i + "," + j)] = u[i] * v[j] - u[j] * v[i];
  }
  return out;
};
const columns = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const I4 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const pow = (A, n) => {
  let out = I4;
  let base = A;
  while (n) {
    if (n & 1) out = mul(base, out);
    base = mul(base, base);
    n >>= 1;
  }
  return out;
};
const mulMod = (A, B, q) => mul(A, B).map((row) => row.map((x) => ((x % q) + q) % q));
const powMod = (A, n, q) => {
  let out = I4;
  let base = A.map((row) => row.map((x) => ((x % q) + q) % q));
  while (n) {
    if (n & 1) out = mulMod(base, out, q);
    base = mulMod(base, base, q);
    n >>= 1;
  }
  return out;
};

const E1 = basis2(0, 1);
const F1 = scale(-1, basis2(2, 3));
const E2 = basis2(0, 3);
const F2 = scale(-1, basis2(1, 2));
const R = add(basis2(0, 2), scale(-1, basis2(1, 3)));
const primitive = [E1, F1, E2, F2, R];

const expressPrimitive = (x) => {
  const c = [x[0], -x[5], x[2], -x[3], x[1]];
  const rebuilt = c.reduce((s, a, i) => add(s, scale(a, primitive[i])), Array(6).fill(0));
  assert.deepEqual(rebuilt, x);
  return c;
};
const act2 = (g, x) => {
  const cols = columns(g);
  let out = Array(6).fill(0);
  for (let k = 0; k < pairs.length; k++) {
    if (!x[k]) continue;
    const [i, j] = pairs[k];
    out = add(out, scale(x[k], wedgeVectors(cols[i], cols[j])));
  }
  return out;
};
const wedgeMatrix = (g) => transpose(primitive.map((x) => expressPrimitive(act2(g, x))));
const expressPrimitiveMod6 = (x) => [x[0], -x[5], x[2], -x[3], x[1]].map((a) => ((a % 6) + 6) % 6);
const wedgeMatrixMod6 = (g) => transpose(primitive.map((x) => expressPrimitiveMod6(act2(g, x))));

const MBasis = [
  [1, 1, 0, 0, 0],
  [1, -1, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, -3],
  [0, 0, 1, 0, 0],
];
const toMCoordinates = (y) => {
  const numerators = [y[0] + y[1], y[0] - y[1], 2 * y[4], 2 * y[2], -2 * y[3]];
  const denominators = [2, 2, 2, 2, 6];
  return {
    integral: numerators.every((n, i) => n % denominators[i] === 0),
    values: numerators.map((n, i) => n / denominators[i]),
  };
};
const actionOnM = (A5) => {
  const images = columns(mul(A5, MBasis));
  const converted = images.map(toMCoordinates);
  return {
    integral: converted.every((x) => x.integral),
    matrix: transpose(converted.map((x) => x.values)),
    selectorFixed: converted[0].integral && converted[0].values.every((x, i) => x === (i === 0 ? 1 : 0)),
    selectorLine: converted[0].integral && converted[0].values.slice(1).every((x) => x === 0) && Math.abs(converted[0].values[0]) === 1,
  };
};
const preservesMMod6 = (A5) => {
  const images = columns(mulMod(A5, MBasis, 6));
  return images.every((y) => (y[0] + y[1]) % 2 === 0 && (y[0] - y[1]) % 2 === 0 && y[3] % 3 === 0);
};

const C3h1 = [[0, 0, -1, 0], [0, 1, 0, 0], [1, 0, 3, 0], [0, 0, 0, 1]];
const C3h2 = [[1, 0, 0, 0], [0, 0, 0, -1], [0, 0, 1, 0], [0, 1, 0, 3]];
const KplusLower = [[1, 0, 0, 0], [0, 1, 0, 0], [3, 2, 1, 0], [2, 3, 0, 1]];
const forbiddenLower = [[1, 0, 0, 0], [0, 1, 0, 0], [3, 0, 1, 0], [0, 1, 0, 1]];
const swapHandles = [[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]];
const J5 = [[0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, -2]];

const generators = { C3h1, C3h2, KplusLower, forbiddenLower, swapHandles };
const wedgeGenerators = Object.fromEntries(Object.entries(generators).map(([name, g]) => [name, wedgeMatrix(g)]));
for (const [name, g] of Object.entries(generators)) {
  const A5 = wedgeGenerators[name];
  assert.deepEqual(mul(transpose(A5), mul(J5, A5)), J5);
  const onM = actionOnM(A5);
  console.log(name + ": preserves_M=" + onM.integral + ",selector_fixed=" + onM.selectorFixed + ",selector_line=" + onM.selectorLine);
  console.log(name + "_wedge5=" + JSON.stringify(A5));
  if (onM.integral) console.log(name + "_M_basis=" + JSON.stringify(onM.matrix));
  let firstPreserving = null;
  let firstSelectorLine = null;
  for (let n = 1; n <= 120; n++) {
    if (firstPreserving === null && preservesMMod6(wedgeMatrixMod6(powMod(g, n, 6)))) firstPreserving = n;
    if (n <= 12 && firstSelectorLine === null && actionOnM(wedgeMatrix(pow(g, n))).selectorLine) firstSelectorLine = n;
  }
  console.log(name + "_first_power_preserving_M=" + firstPreserving + ",first_power_preserving_selector_line_within_12=" + firstSelectorLine);
}

const rowAct = (v, A, q) => A[0].map((_, j) => ((v.reduce((s, x, i) => s + x * A[i][j], 0) % q) + q) % q);
const orbit = (start2, start3, names) => {
  const key = (a, b) => a.join("") + "|" + b.join("");
  const seen = new Map([[key(start2, start3), [start2, start3]]]);
  const queue = [[start2, start3]];
  while (queue.length) {
    const [a, b] = queue.shift();
    for (const name of names) {
      const A = wedgeGenerators[name];
      const next = [rowAct(a, A, 2), rowAct(b, A, 3)];
      const k = key(next[0], next[1]);
      if (!seen.has(k)) {
        seen.set(k, next);
        queue.push(next);
      }
    }
  }
  return [...seen.values()];
};
const lambda2 = [1, 1, 0, 0, 0];
const lambda3 = [0, 0, 0, 1, 0];
const coreNames = ["C3h1", "C3h2", "KplusLower"];
const coreOrbit = orbit(lambda2, lambda3, coreNames);
const extendedOrbit = orbit(lambda2, lambda3, [...coreNames, "swapHandles", "forbiddenLower"]);
const distinct2 = (xs) => new Set(xs.map(([a]) => a.join(""))).size;
const distinct3 = (xs) => new Set(xs.map(([, b]) => b.join(""))).size;
assert.equal(coreOrbit.length, 240);
assert.equal(extendedOrbit.length, 240);
assert.equal(distinct2(coreOrbit), 3);
assert.equal(distinct3(coreOrbit), 80);
const binaryCovectors = [...new Set(coreOrbit.map(([a]) => a.join("")))].sort();
const qutritCovectors = [...new Map(coreOrbit.map(([, b]) => [b.join(""), b])).values()];
for (const b of qutritCovectors) {
  const dualNorm = ((2 * b[0] * b[1] + 2 * b[2] * b[3] + b[4] * b[4]) % 3 + 3) % 3;
  assert.equal(dualNorm, 0);
  assert.ok(b.some(Boolean));
}
console.log("core_handle_orbit_of_index6_kernel_pair=" + coreOrbit.length + ",binary_covectors=" + distinct2(coreOrbit) + ",qutrit_covectors=" + distinct3(coreOrbit));
console.log("extended_generator_orbit_of_index6_kernel_pair=" + extendedOrbit.length + ",binary_covectors=" + distinct2(extendedOrbit) + ",qutrit_covectors=" + distinct3(extendedOrbit));
console.log("binary_kernel_covector_orbit=" + binaryCovectors.join(","));
console.log("qutrit_kernel_covectors_are_all_80_nonzero_isotropic_covectors_of_the_5d_dual_quadric");

console.log("integral_handle_generator_wedge_analysis: PASS");
