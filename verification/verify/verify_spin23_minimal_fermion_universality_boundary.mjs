#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-minimal-fermion-universality-boundary-v1.json", root,
), "utf8"));

const mul = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
const add = (...matrices) => matrices[0].map((row, i) => row.map((_, j) =>
  matrices.reduce((sum, matrix) => sum + matrix[i][j], 0)));
const scale = (x, a) => a.map((row) => row.map((value) => x * value));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const maxAbs = (a) => Math.max(...a.flat().map(Math.abs));
const sub = (a, b) => add(a, scale(-1, b));

const I = [[1,0,0],[0,1,0],[0,0,1]];
const P = [[0,0,1],[1,0,0],[0,1,0]];
const P2 = mul(P, P);
const C = add(I, scale(0.2, add(P, P2)));

assert.equal(evidence.minimalDiracCoefficientMagnitude, 1 / 8);
assert.equal(evidence.operatorDimension, 4);
assert.equal(evidence.renormalizationBoundary.minimalityProtected, false);

// The residual family cycle admits a non-scalar real-symmetric circulant.
assert.ok(maxAbs(sub(mul(P, C), mul(C, P))) < 1e-14);
assert.ok(maxAbs(sub(C, scale(C[0][0], I))) > 0.1);
assert.deepEqual(evidence.e6Boundary.witnessEigenvalues, [1.4, 0.8, 0.8]);

// A universal coefficient remains universal under independent mass-basis rotations.
const theta = 0.37;
const U = [
  [Math.cos(theta), -Math.sin(theta), 0],
  [Math.sin(theta), Math.cos(theta), 0],
  [0, 0, 1],
];
const cMin = evidence.minimalDiracCoefficientMagnitude;
assert.ok(maxAbs(sub(mul(mul(transpose(U), scale(cMin, I)), U), scale(cMin, I))) < 1e-14);

for (const relative of [
  "corpus/claims/1500-1599/1575_a_residual_Z3_family_cycle_realizes_the_two_copy_frame_and_protects_a_three_family_E6_portal.md",
  "corpus/claims/1600-1699/1611_the_surviving_0minus_torsion_mode_gives_a_generic_axionlike_spin_portal_not_yet_a_spin23_fingerprint.md",
  "corpus/claims/1600-1699/1632_a_finite_spectral_triple_can_couple_to_spin23_geometry_but_the_action_vacuum_and_spectrum_are_missing.md"
]) await access(new URL(relative, root));

console.log("Spin(2,3) minimal-fermion universality boundary: PASS");
console.log("  minimal coefficient: |c_min| = 1/8 in the declared torsion convention");
console.log("  mass-basis rotations: identity coefficient remains identity");
console.log("  residual Z3: admits non-scalar circulant flavor coefficients");
console.log("  conclusion: tree-level minimal universality is a slice, not a protected UV prediction");
