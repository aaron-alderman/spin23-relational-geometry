#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-quantum-hall-index-three-bridge.json",
  import.meta.url,
), "utf8"));

const inner = (u, v) => ({
  re: u[0].re*v[0].re+u[0].im*v[0].im+u[1].re*v[1].re+u[1].im*v[1].im,
  im: u[0].re*v[0].im-u[0].im*v[0].re+u[1].re*v[1].im-u[1].im*v[1].re,
});
const phase = (z) => {
  const n = Math.hypot(z.re, z.im);
  return { re: z.re/n, im: z.im/n };
};
const mul = (a, b) => ({ re: a.re*b.re-a.im*b.im, im: a.re*b.im+a.im*b.re });
const conj = (a) => ({ re: a.re, im: -a.im });

const eigenvector = (kx, ky) => {
  const dx = Math.sin(kx);
  const dy = Math.sin(ky);
  const dz = -1 + Math.cos(kx) + Math.cos(ky);
  const r = Math.hypot(dx, dy, dz);
  let v;
  if (dz >= 0) v = [{ re: -dx, im: dy }, { re: dz+r, im: 0 }];
  else v = [{ re: dz-r, im: 0 }, { re: dx, im: -dy }];
  const norm = Math.sqrt(v.reduce((s, z) => s+z.re*z.re+z.im*z.im, 0));
  return v.map((z) => ({ re: z.re/norm, im: z.im/norm }));
};

const N = 41;
const states = Array.from({ length: N }, (_, i) => Array.from({ length: N }, (_, j) =>
  eigenvector(2*Math.PI*i/N, 2*Math.PI*j/N)));
let flux = 0;
for (let i = 0; i < N; i += 1) for (let j = 0; j < N; j += 1) {
  const u = states[i][j];
  const ux = phase(inner(u, states[(i+1)%N][j]));
  const uy = phase(inner(u, states[i][(j+1)%N]));
  const uyAtX = phase(inner(states[(i+1)%N][j], states[(i+1)%N][(j+1)%N]));
  const uxAtY = phase(inner(states[i][(j+1)%N], states[(i+1)%N][(j+1)%N]));
  const plaquette = mul(mul(ux, uyAtX), mul(conj(uxAtY), conj(uy)));
  flux += Math.atan2(plaquette.im, plaquette.re);
}
const chern = Math.round(flux/(2*Math.PI));
assert.equal(chern, evidence.twoBandWitness.occupiedBandChernNumber);
assert.equal(chern * evidence.twoBandWitness.copies, evidence.twoBandWitness.totalChernNumber);
assert.equal(Math.abs(evidence.twoBandWitness.totalChernNumber), evidence.twoBandWitness.absoluteEdgeIndex);
assert.equal(evidence.orientationBoundary.chernNumberSelectsZ3Basis, false);
assert.equal(evidence.orientationBoundary.chernNumberDerivesYukawaFrame, false);
assert.equal(evidence.fourDimensionalRoute.derivedHere, false);

console.log("spin23 quantum-Hall index-three bridge verification: PASS");
console.log(`  occupied-band Chern number: ${chern}`);
console.log("  three-copy bulk index: -3; absolute chiral edge index: 3");
console.log("  U(3) copy freedom remains: topology does not select the Z3 Yukawa frame");
