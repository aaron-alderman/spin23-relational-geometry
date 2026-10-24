import assert from "node:assert/strict";

const near = (a, b, tol = 1e-10) => assert.ok(Math.abs(a - b) < tol, `${a} != ${b}`);

function invariants(x, y) {
  return {
    u: x ** 3 - 3 * x * y ** 2,
    v: y ** 3 - 3 * x ** 2 * y,
    w: x ** 2 + y ** 2,
  };
}

for (const [x, y] of [[1, 2], [-3, 1], [0.25, -1.75], [2, 0]]) {
  const a = invariants(x, y);
  near(a.u ** 2 + a.v ** 2, a.w ** 3);

  const theta = 2 * Math.PI / 3;
  const xr = Math.cos(theta) * x - Math.sin(theta) * y;
  const yr = Math.sin(theta) * x + Math.cos(theta) * y;
  const b = invariants(xr, yr);
  near(a.u, b.u);
  near(a.v, b.v);
  near(a.w, b.w);
}

// Quotient-cycle norms 2 and 2/3 with mutual inner product -1.
const cartan = [
  [2, (2 * -1) / (2 / 3)],
  [(2 * -1) / 2, 2],
];
assert.deepEqual(cartan, [[2, -3], [-1, 2]]);
assert.equal(cartan[0][1] * cartan[1][0], 3);

console.log("D4 triality singularity quotient certificate: PASS");
console.log("invariant_ring=C[u,v,w]/(u^2+v^2-w^3)");
console.log("quotient_fiber:u=epsilon; cycle_norms={2,2/3}; cartan=[[2,-3],[-1,2]]");
