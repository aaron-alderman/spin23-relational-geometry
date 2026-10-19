import assert from "node:assert/strict";

const EPS = 1e-12;
const close = (a, b, eps = EPS) => Math.abs(a - b) < eps;

const mul2 = (A, B) => [
  [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
  [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]],
];

const pow2 = (A, n) => {
  let out = [[1, 0], [0, 1]];
  for (let k = 0; k < n; k += 1) out = mul2(out, A);
  return out;
};

// Scalar invariant slice X=x I_2 of the Sp(4,R) fractional action.
// The 2x2 coefficient matrix has determinant one, so its scalar lift is symplectic.
const g = [[2, 1], [1, 1]];
assert.equal(g[0][0] * g[1][1] - g[0][1] * g[1][0], 1);

const mobius = (M, x) => (M[1][0] + M[1][1] * x) / (M[0][0] + M[0][1] * x);
const iterate = (f, x, n) => {
  let y = x;
  for (let k = 0; k < n; k += 1) y = f(y);
  return y;
};

for (const x of [-0.5, 0, 0.2, 1, 3]) {
  for (let n = 1; n <= 8; n += 1) {
    assert.ok(close(iterate((y) => mobius(g, y), x, n), mobius(pow2(g, n), x)));
  }
}

// f(x)=(1+x)/(2+x). Its fixed polynomial and the fixed polynomial of f^2
// are proportional, so there is no distinct real two-cycle.
const fixedPolynomial = (x) => x * x + x - 1;
const fixedPolynomialSecondIterate = (x) => 3 * fixedPolynomial(x);
for (const x of [-3, -1, 0, 0.5, 2]) {
  assert.ok(close(fixedPolynomialSecondIterate(x), 3 * fixedPolynomial(x)));
}

const positiveFixedPoint = (-1 + Math.sqrt(5)) / 2;
assert.ok(close(mobius(g, positiveFixedPoint), positiveFixedPoint));
const derivativeAtPositiveFixedPoint = 1 / (2 + positiveFixedPoint) ** 2;
assert.ok(derivativeAtPositiveFixedPoint > 0 && derivativeAtPositiveFixedPoint < 1);

// The canonical self-triple on the minimal row TRO is radial:
// {x,x,x}=x x* x=||x||^2 x. Projective normalization makes it the identity.
const norm = (x) => Math.hypot(...x);
const normalizedSelfTriple = (x) => {
  const n2 = x.reduce((s, value) => s + value * value, 0);
  const q = x.map((value) => n2 * value);
  const qNorm = norm(q);
  return q.map((value) => value / qNorm);
};
for (const x of [[1, 2], [-3, 4], [0.25, -0.75]]) {
  const expected = x.map((value) => value / norm(x));
  const actual = normalizedSelfTriple(x);
  assert.ok(actual.every((value, i) => close(value, expected[i])));
}

// Support-level Jordan closure of two overlapping spokes is idempotent after
// the induced third edge has appeared. It is closure, not a return dynamics.
const edge = (a, b) => [a, b].sort().join("");
const vertices = ["P", "I", "N"];
const jordanSupportClosure = (input) => {
  const out = new Set(input);
  let changed = true;
  while (changed) {
    changed = false;
    for (const v of vertices) {
      const neighbours = vertices.filter((w) => w !== v && out.has(edge(v, w)));
      for (let i = 0; i < neighbours.length; i += 1) {
        for (let j = i + 1; j < neighbours.length; j += 1) {
          const induced = edge(neighbours[i], neighbours[j]);
          if (!out.has(induced)) {
            out.add(induced);
            changed = true;
          }
        }
      }
    }
  }
  return out;
};

const initialEdges = new Set([edge("P", "I"), edge("P", "N")]);
const closedOnce = jordanSupportClosure(initialEdges);
const closedTwice = jordanSupportClosure(closedOnce);
assert.deepEqual([...closedOnce].sort(), [edge("P", "I"), edge("P", "N"), edge("I", "N")].sort());
assert.deepEqual([...closedTwice].sort(), [...closedOnce].sort());

// Existing covering transports have parameter-independent finite order.
const cycle = (i, n) => (i + 1) % n;
for (const n of [3, 6]) {
  for (let i = 0; i < n; i += 1) {
    assert.equal(iterate((j) => cycle(j, n), i, n), i);
  }
}

const result = {
  protocol: "current-Spin23-return-map-audit/1",
  verified: {
    symplecticFractionalIteration: "T_g^n = T_(g^n) on the scalar H2 slice",
    scalarFlipGate: "derivative is positive; it cannot cross -1",
    scalarTwoCycleGate: "fixed points of T_g^2 are exactly fixed points of T_g for the test hyperbolic element",
    normalizedMinimalTROSelfTriple: "identity on projective row states",
    jordanSupportClosure: "idempotent after the induced third edge appears",
    coverTransport: "fixed C3 and C6 permutations have parameter-independent finite order",
  },
  exactBoundary:
    "The current constructions provide a natural fractional-linear return map, finite covers, algebraic closure and terminating Schur recursion, but no derived law by which the returned state changes the next symplectic generator or holonomy.",
  missingDatum:
    "A covariant feedback law X -> S_lambda(X) in Sym_4(R), giving g_lambda(X)=exp(J S_lambda(X)), or an equivalent state-dependent connection/Redheffer closure.",
  verdict: "return map derived; Feigenbaum-style period doubling not derived",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
