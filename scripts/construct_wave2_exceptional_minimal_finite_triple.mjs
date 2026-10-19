#!/usr/bin/env node

import assert from "node:assert/strict";

const I = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const Z = (r, c) => Array.from({ length: r }, () => Array(c).fill(0));
const T = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const scale = (a, A) => A.map((row) => row.map((x) => a * x));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const comm = (A, B) => sub(mul(A, B), mul(B, A));
const maxAbs = (A) => Math.max(...A.flat().map((x) => Math.abs(x)));
const block2 = (A, B, C, D) => [
  ...A.map((row, i) => [...row, ...B[i]]),
  ...C.map((row, i) => [...row, ...D[i]]),
];
const trace = (A) => A.reduce((s, row, i) => s + row[i], 0);

function inverse3(A) {
  const M = A.map((row, i) => [...row, ...I(3)[i]]);
  for (let c = 0; c < 3; c += 1) {
    const p = M.findIndex((row, r) => r >= c && Math.abs(row[c]) > 1e-12);
    assert(p >= c);
    [M[c], M[p]] = [M[p], M[c]];
    const pivot = M[c][c];
    M[c] = M[c].map((x) => x / pivot);
    for (let r = 0; r < 3; r += 1) {
      if (r === c) continue;
      const f = M[r][c];
      M[r] = M[r].map((x, j) => x - f * M[c][j]);
    }
  }
  return M.map((row) => row.slice(3));
}

function rank(A, tol = 1e-10) {
  const M = A.map((row) => [...row]);
  let r = 0;
  for (let c = 0; c < M[0].length && r < M.length; c += 1) {
    const p = M.findIndex((row, i) => i >= r && Math.abs(row[c]) > tol);
    if (p < r) continue;
    [M[r], M[p]] = [M[p], M[r]];
    const pivot = M[r][c];
    M[r] = M[r].map((x) => x / pivot);
    for (let i = 0; i < M.length; i += 1) {
      if (i === r) continue;
      const f = M[i][c];
      M[i] = M[i].map((x, j) => x - f * M[r][j]);
    }
    r += 1;
  }
  return r;
}

// Clebsch-adapted direct-sum basis: two safe directions and one danger-only.
const B = T([
  [1, -1, 0],
  [1, 0, -1],
  [0, 1, 1],
]);
const Binv = inverse3(B);
const P0 = [[1, 0, 0], [0, 1, 0], [0, 0, 0]];
const Q0 = sub(I(3), P0);
const P = mul(mul(B, P0), Binv);
const Q = sub(I(3), P);
const G = mul(T(Binv), Binv);
const gAdjoint = (A) => mul(mul(inverse3(G), T(A)), G);

assert(maxAbs(sub(mul(P, P), P)) < 1e-12);
assert(maxAbs(sub(gAdjoint(P), P)) < 1e-12);
assert(maxAbs(mul(P, Q)) < 1e-12);
assert.equal(Math.round(trace(P)), 2);
assert.equal(Math.round(trace(Q)), 1);

// A = C_safe plus C_danger acts by rho(a,b)=aP+bQ.  Work with its two
// central generators.  Double the module for an even KO6 realization.
const z3 = Z(3, 3);
const rhoP = block2(P, z3, z3, P);
const rhoQ = block2(Q, z3, z3, Q);
const gamma = block2(I(3), z3, z3, scale(-1, I(3)));
const J0 = block2(z3, I(3), I(3), z3); // followed by complex conjugation
const Hmetric = block2(G, z3, z3, G);

assert(maxAbs(sub(mul(J0, J0), I(6))) < 1e-12); // J^2=+1
assert(maxAbs(add(mul(J0, gamma), mul(gamma, J0))) < 1e-12); // J gamma=-gamma J
assert(maxAbs(comm(rhoP, rhoQ)) < 1e-12); // order-zero on central generators

// Protected Dirac support: arbitrary masses within the two central blocks.
const Mprotected = add(scale(2, P), scale(5, Q));
const Dprotected = block2(z3, Mprotected, Mprotected, z3);
assert(maxAbs(add(mul(Dprotected, gamma), mul(gamma, Dprotected))) < 1e-12);
assert(maxAbs(comm(Dprotected, J0)) < 1e-12);
assert(maxAbs(comm(Dprotected, rhoP)) < 1e-12);

// With J0 K and real generators, the opposite central action equals rho.
// Hence first order is [[D,rho(e_i)],rho^o(e_j)]=0, trivially here.
const protectedFirstOrder = maxAbs(comm(comm(Dprotected, rhoP), rhoP));
assert.equal(protectedFirstOrder, 0);

// A nontrivial cross-sector Dirac edge in the adapted orthonormal basis.
const X0 = [[0, 0, 1], [0, 0, 0], [1, 0, 0]];
const X = mul(mul(B, X0), Binv);
assert(maxAbs(sub(gAdjoint(X), X)) < 1e-12);
const Mmix = add(Mprotected, X);
const Dmix = block2(z3, Mmix, Mmix, z3);
const crossCommutator = comm(Dmix, rhoP);
const mixedFirstOrder = maxAbs(comm(crossCommutator, rhoP));
assert(maxAbs(crossCommutator) > 0);
assert(mixedFirstOrder > 0);

// The two universal degree-one generators e_s d e_d and e_d d e_s have
// independent represented supports.  Since rho is faithful, ker(pi_0)=0;
// rank two therefore means no degree-one junk removes the cross edge.
const omegaSD = mul(rhoP, comm(Dmix, rhoQ));
const omegaDS = mul(rhoQ, comm(Dmix, rhoP));
const representedOneFormRank = rank([omegaSD.flat(), omegaDS.flat()]);
assert.equal(representedOneFormRank, 2);
const degreeOneJunkDimension = 0;

// Inner fluctuations contain these same nonzero cross-sector one-forms.
const innerFluctuationNorm = Math.max(maxAbs(omegaSD), maxAbs(omegaDS));
assert(innerFluctuationNorm > 0);

// Threshold Schur complements: central block structure is stable under inverse;
// an allowed off-block entry immediately creates a cross propagator.
const Kprotected0 = [[2, 0, 0], [0, 3, 0], [0, 0, 5]];
const KprotectedInv0 = inverse3(Kprotected0);
assert.equal(KprotectedInv0[0][2], 0);
const epsilon = 0.2;
const Kmixed0 = [[2, 0, epsilon], [0, 3, 0], [epsilon, 0, 5]];
const KmixedInv0 = inverse3(Kmixed0);
assert(Math.abs(KmixedInv0[0][2]) > 0);

const result = {
  finiteAlgebra: "C_safe direct-sum C_danger",
  representation: {
    safeRank: Math.round(trace(P)),
    dangerRank: Math.round(trace(Q)),
    adaptedMetric: G,
    pSelfAdjointDefect: maxAbs(sub(gAdjoint(P), P)),
    abstractEmbeddingModuli: "Gr_C(2,3)=CP^2 (real dimension 4)",
  },
  realEvenTriple: {
    hilbertDimension: 6,
    J2: 1,
    JDSign: 1,
    JGammaSign: -1,
    gammaDSign: -1,
    KOConvention: 6,
  },
  protectedBranch: {
    commutatorWithCentralProjector: maxAbs(comm(Dprotected, rhoP)),
    firstOrderDefect: protectedFirstOrder,
    representedOneFormDimension: 0,
    innerFluctuations: "trivial on the C_safe/C_danger label",
    thresholdCrossPropagator: KprotectedInv0[0][2],
  },
  mixingBranch: {
    commutatorWithCentralProjector: maxAbs(crossCommutator),
    firstOrderDefect: mixedFirstOrder,
    representedOneFormDimension: representedOneFormRank,
    degreeOneJunkDimension,
    innerFluctuationNorm,
    thresholdCrossPropagator: KmixedInv0[0][2],
  },
  boundary: {
    theorem: "protection implies a trivial differential on the central label; a nontrivial central-label one-form is the forbidden mixing",
    arbitraryDatum: "the abstract C^2 algebra fixes ranks but not the CP^2 embedding of its rank-two projector relative to the Clebsch covectors",
    status: "consistent superselection completion, not a derivation of the Furey selector",
  },
};

console.log(JSON.stringify(result, null, 2));
