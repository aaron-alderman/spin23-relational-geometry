import assert from "node:assert/strict";

const close = (a, b, tolerance) => assert(Math.abs(a - b) < tolerance, `${a} != ${b}`);

// Qf=0 with f_{j+1}=exp(-a m_j)f_j is sampled on [-L,L].  The edge
// mass is negative left of the wall and positive right of it.
function refinedWall(N, mLeft, mRight, probeDistance = 0.75, L = 4) {
  assert.equal(N % 8, 0, "choose N so the probes land on grid sites");
  const a = 2 * L / N;
  const x = Array.from({ length: N + 1 }, (_, j) => -L + j * a);
  const mass = Array.from({ length: N }, (_, j) => {
    const midpoint = (x[j] + x[j + 1]) / 2;
    return midpoint < 0 ? -mLeft : mRight;
  });
  const f = [1];
  for (const m of mass) f.push(Math.exp(-a * m) * f.at(-1));
  const length = Math.sqrt(f.reduce((s, y) => s + y * y, 0));
  const normalized = f.map((y) => y / length);
  for (let j = 0; j < N; j++) {
    close(normalized[j + 1], Math.exp(-a * mass[j]) * normalized[j], 2e-14);
  }
  const indexOf = (target) => {
    const j = Math.round((target + L) / a);
    close(x[j], target, 1e-12);
    return j;
  };
  const p = [normalized[indexOf(-probeDistance)], normalized[indexOf(probeDistance)]];
  const pnorm = Math.hypot(...p);
  const ray = p.map((y) => y / pnorm);
  const residue = ray.map((u) => ray.map((v) => u * v));
  close(residue[0][0] * residue[1][1] - residue[0][1] ** 2, 0, 1e-13);
  return { a, ray, ratio: ray[1] / ray[0], residue };
}

const refinements = [64, 128, 256, 512];
const symmetric = refinements.map((N) => refinedWall(N, 1.1, 1.1));
for (const result of symmetric) {
  close(result.ratio, 1, 1e-12);
  close(result.ray[0], 1 / Math.sqrt(2), 1e-12);
  close(result.ray[1], 1 / Math.sqrt(2), 1e-12);
}

const mLeft = 0.7, mRight = 1.5, d = 0.75;
const expectedRatio = Math.exp(-(mRight - mLeft) * d);
const asymmetric = refinements.map((N) => refinedWall(N, mLeft, mRight, d));
for (const result of asymmetric) close(result.ratio, expectedRatio, 2e-12);

assert(Math.abs(asymmetric.at(-1).ratio - 1) > 0.35, "profile variation must rotate the source ray");
assert(asymmetric.every((x) => x.residue[0][0] >= 0 && x.residue[1][1] >= 0));

// At z=i eta, the zero-pole contribution -pp^T/z is i pp^T/eta and
// therefore has positive semidefinite imaginary part.
const eta = 0.2;
for (const result of [...symmetric, ...asymmetric]) {
  const imaginaryPoleResidue = result.residue.map((row) => row.map((x) => x / eta));
  assert(imaginaryPoleResidue[0][0] >= 0 && imaginaryPoleResidue[1][1] >= 0);
  close(
    imaginaryPoleResidue[0][0] * imaginaryPoleResidue[1][1] - imaginaryPoleResidue[0][1] ** 2,
    0,
    1e-11,
  );
}

console.log("PASS domain-wall refinement source-frame test");
console.log(`refinements=${refinements.join(",")}`);
console.log("symmetric_continuum_ray=(1,1)/sqrt(2)");
console.log(`asymmetric_continuum_ratio=${expectedRatio}`);
console.log("zero_pole_rank=1; Herglotz_positive=true");
console.log("universal_source_frame=false; continuum_ray_tracks_wall_profile=true");
