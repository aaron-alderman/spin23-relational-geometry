import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const outer = (x, y) => x.map((a) => y.map((b) => a * b));
const inverse2 = (A) => {
  const d = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]];
};
const inverse = (A) => {
  const n = A.length;
  const M = A.map((row, i) => [...row, ...Array.from({ length: n }, (_, j) => Number(i === j))]);
  for (let col = 0; col < n; col += 1) {
    let p = col;
    for (let r = col + 1; r < n; r += 1) if (Math.abs(M[r][col]) > Math.abs(M[p][col])) p = r;
    [M[col], M[p]] = [M[p], M[col]];
    const q = M[col][col];
    assert(Math.abs(q) > 1e-12);
    M[col] = M[col].map((x) => x / q);
    for (let r = 0; r < n; r += 1) if (r !== col) {
      const f = M[r][col];
      M[r] = M[r].map((x, j) => x - f * M[col][j]);
    }
  }
  return M.map((row) => row.slice(n));
};
const frobenius = (A) => Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0));

const H2 = [[0.5, 0.2], [0.2, 1.2]];
const w = [0.3, -0.2];
const z = -1;
const baseInverseKernel = [[z - H2[0][0], -H2[0][1]], [-H2[1][0], z - H2[1][1]]];
const baseResolvent = inverse2(baseInverseKernel);
const gaps = [5, 10, 20, 40, 80, 160];
const checks = gaps.map((Delta) => {
  const H = [
    [H2[0][0], H2[0][1], w[0]],
    [H2[1][0], H2[1][1], w[1]],
    [w[0], w[1], Delta],
  ];
  const zMinusH = H.map((row, i) => row.map((x, j) => (i === j ? z : 0) - x));
  const fullProjected = inverse(zMinusH).slice(0, 2).map((row) => row.slice(0, 2));
  const selfEnergy = scale(1 / (z - Delta), outer(w, w));
  const effectiveInverseKernel = add(baseInverseKernel, scale(-1, selfEnergy));
  const feshbachResolvent = inverse2(effectiveInverseKernel);
  assert(frobenius(add(fullProjected, scale(-1, feshbachResolvent))) < 1e-12);
  return {
    gap: Delta,
    selfEnergyNorm: frobenius(selfEnergy),
    projectedResolventErrorFromRankTwoLimit: frobenius(add(fullProjected, scale(-1, baseResolvent))),
  };
});
for (let i = 1; i < checks.length; i += 1) {
  assert(checks[i].projectedResolventErrorFromRankTwoLimit < checks[i - 1].projectedResolventErrorFromRankTwoLimit);
}
assert(checks.at(-1).projectedResolventErrorFromRankTwoLimit < checks[0].projectedResolventErrorFromRankTwoLimit / 20);

console.log(JSON.stringify({
  protocol: "gapped-third-face-converges-to-peirce-compression/1",
  model: "H_Delta=[[H_2,w],[w^T,Delta]]",
  exactFeshbachKernel: "zI_2-H_2-w w^T/(z-Delta)",
  checks,
  asymptotic: "The self-energy and projected-resolvent correction are O(||w||^2/Delta) away from the heavy pole.",
  selectionResult: "A large third-face gap dynamically approaches the rank-two Peirce compression.",
  limitation: "The gap selects H_2(C), not its H_2(R) conjugation-fixed slice. Removing the imaginary corner direction requires an independent reciprocity, antiunitary, decoherence or mass mechanism.",
  passed: true,
}, null, 2));
