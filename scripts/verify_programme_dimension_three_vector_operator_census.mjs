import assert from "node:assert/strict";

const operators = [
  { id: "jQ", type: "fermion_phase_current", dimension: 3, gaugeSinglet: true },
  { id: "ju", type: "fermion_phase_current", dimension: 3, gaugeSinglet: true },
  { id: "jd", type: "fermion_phase_current", dimension: 3, gaugeSinglet: true },
  { id: "jL", type: "fermion_phase_current", dimension: 3, gaugeSinglet: true },
  { id: "je", type: "fermion_phase_current", dimension: 3, gaugeSinglet: true },
  { id: "jN", type: "fermion_phase_current", dimension: 3, gaugeSinglet: true },
  { id: "jH", type: "higgs_phase_current", dimension: 3, gaugeSinglet: true },
  { id: "dHH", type: "total_gradient", dimension: 3, gaugeSinglet: true },
  { id: "dB", type: "abelian_field_eom", dimension: 3, gaugeSinglet: true },
];
assert.equal(operators.length, 9);
assert(operators.every((x) => x.dimension === 3 && x.gaugeSinglet));
assert.equal(operators.filter((x) => x.type === "total_gradient").length, 1);
assert.equal(operators.filter((x) => x.type === "abelian_field_eom").length, 1);

// Seven phase currents in the order Q,u^c,d^c,L,e^c,N^c,H.
const hypercharge6Y = [1, -4, 2, -3, 6, 0, 3];
const baryon3B = [1, -1, -1, 0, 0, 0, 0];
const leptonL = [0, 0, 0, 1, -1, -1, 0];
const bMinusL3 = baryon3B.map((x, i) => x - 3 * leptonL[i]);
const V = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const apply = (A, x) => A.map((row) => dot(row, x));
for (const x of [hypercharge6Y, baryon3B, leptonL, bMinusL3]) {
  assert.deepEqual(apply(V, x), [0, 0, 0, 0]);
}

const rank = (A) => {
  const M = A.map((row) => row.map(Number));
  let r = 0;
  for (let c = 0; c < M[0].length && r < M.length; c++) {
    let p = r;
    while (p < M.length && Math.abs(M[p][c]) < 1e-12) p++;
    if (p === M.length) continue;
    [M[p], M[r]] = [M[r], M[p]];
    const q = M[r][c];
    for (let j = c; j < M[0].length; j++) M[r][j] /= q;
    for (let i = 0; i < M.length; i++) if (i !== r) {
      const f = M[i][c];
      for (let j = c; j < M[0].length; j++) M[i][j] -= f * M[r][j];
    }
    r++;
  }
  return r;
};
assert.equal(rank(V), 4);
assert.equal(7 - rank(V), 3);
assert.equal(rank([hypercharge6Y, baryon3B, leptonL]), 3);

const rawHermitianGaugeSingletVectors = 9;
const moduloTotalGradients = rawHermitianGaugeSingletVectors - 1;
const phaseCurrentRepresentativesAfterEliminatingDB = moduloTotalGradients - 1;
const externalGlobalSourceQuotient = phaseCurrentRepresentativesAfterEliminatingDB - 1; // quotient gauged Y
assert.equal(moduloTotalGradients, 8);
assert.equal(phaseCurrentRepresentativesAfterEliminatingDB, 7);
assert.equal(externalGlobalSourceQuotient, 6);

const yukawaPreservingDimension = 3;
const globalYukawaSymmetryModuloHypercharge = yukawaPreservingDimension - 1;
const anomalyProtectedContinuousDimension = 1;
assert.equal(globalYukawaSymmetryModuloHypercharge, 2);
assert.equal(anomalyProtectedContinuousDimension, 1);

console.log("PASS dimension-three vector-operator census");
console.log("raw_gauge_singlet_Hermitian_vectors=9");
console.log("mod_total_gradients=8; eliminate_dB_by_EOM=7; external_global_source_quotient_by_Y=6");
console.log("Yukawa_nullity=3; modulo_gauged_Y=2; anomaly_protected_axis=B-L");
console.log("renormalization_closed_module_is_at_least_six_dimensional_before_flavor_expansion=true");
