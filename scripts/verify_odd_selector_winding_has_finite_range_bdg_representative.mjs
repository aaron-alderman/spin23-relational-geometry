const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (x, a) => C(x * a.re, x * a.im);
const close = (a, b, eps = 1e-9) => Math.hypot(a.re - b.re, a.im - b.im) < eps;
const matAdd = (a, b) => a.map((row, i) => row.map((z, j) => add(z, b[i][j])));
const matScaleComplex = (z, a) => a.map((row) => row.map((x) => mul(z, x)));
const closeMatrix = (a, b) => a.every((row, i) => row.every((z, j) => close(z, b[i][j])));

const zero = [[C(0), C(0)], [C(0), C(0)]];
const tx = [[C(0), C(1)], [C(1), C(0)]];
const ty = [[C(0), C(0, -1)], [C(0, 1), C(0)]];
const tz = [[C(1), C(0)], [C(0), C(-1)]];

const bloch = (k, m, delta) => tz.map((row, i) => row.map((z, j) =>
  add(add(scale(Math.cos(m * k), z), scale(Math.sin(m * k), ty[i][j])),
    scale(delta * Math.sin(k), tx[i][j]))));

// Exact Fourier blocks H(k)=sum_r exp(i k r) h_r.
const hoppingBlocks = (m, delta) => {
  const blocks = new Map();
  const put = (r, block) => blocks.set(r, blocks.has(r) ? matAdd(blocks.get(r), block) : block);
  put(m, matAdd(matScaleComplex(C(0.5), tz), matScaleComplex(C(0, -0.5), ty)));
  put(-m, matAdd(matScaleComplex(C(0.5), tz), matScaleComplex(C(0, 0.5), ty)));
  if (delta !== 0) {
    put(1, matScaleComplex(C(0, -delta / 2), tx));
    put(-1, matScaleComplex(C(0, delta / 2), tx));
  }
  return blocks;
};

const reconstruct = (k, blocks) => {
  let result = zero.map((row) => row.map((z) => C(z.re, z.im)));
  for (const [r, block] of blocks.entries()) {
    const p = C(Math.cos(k * r), Math.sin(k * r));
    result = matAdd(result, matScaleComplex(p, block));
  }
  return result;
};

for (const m of [1, 3, 5, -1, -3]) {
  for (const delta of [0, 0.37]) {
    const blocks = hoppingBlocks(m, delta);
    const maximumRange = Math.max(...[...blocks.keys()].map(Math.abs));
    assert(maximumRange === Math.max(Math.abs(m), delta === 0 ? 0 : 1),
      "real-space range must equal the largest nonzero Fourier harmonic");
    for (const k of [0, 0.23, 0.91, 2.4, Math.PI]) {
      assert(closeMatrix(reconstruct(k, blocks), bloch(k, m, delta)),
        "finite Fourier blocks must reconstruct the Bloch Hamiltonian exactly");
    }
    if (Math.abs(m % 2) === 1) {
      // The chiral symbol q=e^{imk} is antipodally odd.
      for (const k of [0.12, 0.7, 1.8]) {
        const q = C(Math.cos(m * k), Math.sin(m * k));
        const qDeck = C(Math.cos(m * (k + Math.PI)), Math.sin(m * (k + Math.PI)));
        assert(close(qDeck, scale(-1, q)), "odd winding symbol must satisfy antipodal sewing");
      }
    }
  }
}

console.log("Finite-range odd-selector BdG representative certificate: PASS");
console.log("winding_m_symbol_range=|m|");
console.log("minimal_three_flavor_winding_three_range=3");
console.log("class_D_breaking_term_range=1");
console.log("finite_range_locality_obstruction=false");
console.log("selector_coordinate_identification_still_open=true");
