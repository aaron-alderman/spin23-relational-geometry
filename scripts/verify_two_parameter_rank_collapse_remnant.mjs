#!/usr/bin/env node

const eps = 1e-9;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
const multiply = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const scale = (s, A) => A.map(r => r.map(x => s * x));
const close = (A, B, tol = 1e-8) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));
const outer = (u, v = u) => u.map(x => v.map(y => x * y));
const frob2 = A => A.flat().reduce((s, x) => s + x * x, 0);

const b = [2, -1];
const remnant = outer(b);

const family = (x, y) => {
  const v = [x, y];
  const r2 = x * x + y * y;
  const C = outer(v);
  const X = outer(b, v);
  const Cplus = r2 > eps ? scale(1 / (r2 * r2), C) : [[0, 0], [0, 0]];
  const P = multiply(Cplus, C);
  const Q = multiply(multiply(X, Cplus), transpose(X));
  const R = multiply(X, Cplus);
  return { C, X, Cplus, P, Q, R, r2 };
};

for (const [x, y] of [[1, 0], [0, 2], [3, 4], [-2, 5], [1e-3, -2e-3]]) {
  const F = family(x, y);
  assert(close(F.X, multiply(F.X, F.P)), "range condition failed");
  assert(close(F.Q, remnant), "finite remnant must be path independent");
}

const origin = family(0, 0);
assert(close(origin.Q, [[0, 0], [0, 0]]), "pointwise pseudoinverse at origin must vanish");
assert(!close(origin.Q, remnant), "pointwise fiber must miss the remnant");

// The normalized coupling diverges like 1/r even though its quadratic is finite.
const R1 = family(1e-2, 0).R;
const R2 = family(1e-4, 0).R;
assert(frob2(R2) / frob2(R1) > 9000, "normalized coupling should diverge quadratically in norm squared");

// The support projector has direction-dependent limits at the origin.
const Px = family(1e-2, 0).P;
const Py = family(0, 1e-2).P;
assert(!close(Px, Py), "support projector should not extend continuously to the origin");

// On a circle, encode P by z=(P11-P22)+i(2P12)=exp(2 i theta).
let previous = 0;
let accumulated = 0;
const N = 720;
for (let k = 0; k <= N; k++) {
  const theta = 2 * Math.PI * k / N;
  const P = family(Math.cos(theta), Math.sin(theta)).P;
  let phase = Math.atan2(2 * P[0][1], P[0][0] - P[1][1]);
  if (k > 0) {
    let delta = phase - previous;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;
    accumulated += delta;
  }
  previous = phase;
}
const degree = Math.round(accumulated / (2 * Math.PI));
assert(degree === 2, "projector defect degree must be two");

console.log("Two-parameter rank-collapse remnant certificate: PASS");
console.log("C=vvT; X=bvT; off_origin_XCplusXT=bbT; pointwise_origin_value=0; path_independent_remnant=true");
console.log(`normalized_ratio_diverges=true; projector_nonextendible=true; RP1_boundary_degree=${degree}; line_bundle_w1=0`);
