import assert from "node:assert/strict";

function gcd(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

class Q {
  constructor(n, d = 1n) {
    n = BigInt(n);
    d = BigInt(d);
    assert.notEqual(d, 0n);
    if (d < 0n) [n, d] = [-n, -d];
    const g = gcd(n, d);
    this.n = n / g;
    this.d = d / g;
  }
  add(x) { x = q(x); return new Q(this.n * x.d + x.n * this.d, this.d * x.d); }
  sub(x) { x = q(x); return new Q(this.n * x.d - x.n * this.d, this.d * x.d); }
  mul(x) { x = q(x); return new Q(this.n * x.n, this.d * x.d); }
  div(x) { x = q(x); return new Q(this.n * x.d, this.d * x.n); }
  neg() { return new Q(-this.n, this.d); }
  eq(x) { x = q(x); return this.n === x.n && this.d === x.d; }
  isZero() { return this.n === 0n; }
  toString() { return this.d === 1n ? `${this.n}` : `${this.n}/${this.d}`; }
}

const q = (x, d = 1n) => x instanceof Q ? x : new Q(x, d);
const add = (a, b) => a.map((x, i) => x.add(b[i]));
const sub = (a, b) => a.map((x, i) => x.sub(b[i]));
const scale = (a, s) => a.map((x) => x.mul(s));

function dot(a, b, signature) {
  return a.reduce((sum, x, i) => sum.add(x.mul(b[i]).mul(signature[i])), q(0));
}

function solve(matrix, rhs) {
  const n = rhs.length;
  const a = matrix.map((row, i) => [...row, rhs[i]]);
  for (let col = 0; col < n; col += 1) {
    const pivot = a.findIndex((row, r) => r >= col && !row[col].isZero());
    assert.ok(pivot >= col, "singular exact linear system");
    [a[col], a[pivot]] = [a[pivot], a[col]];
    const p = a[col][col];
    a[col] = a[col].map((x) => x.div(p));
    for (let r = 0; r < n; r += 1) {
      if (r === col) continue;
      const f = a[r][col];
      a[r] = a[r].map((x, j) => x.sub(f.mul(a[col][j])));
    }
  }
  return a.map((row) => row[n]);
}

function spherePoint(u0, v0) {
  const u = q(u0[0], u0[1]);
  const v = q(v0[0], v0[1]);
  const r2 = u.mul(u).add(v.mul(v));
  const den = q(1).add(r2);
  return [q(1).sub(r2).div(den), q(2).mul(u).div(den), q(2).mul(v).div(den)];
}

function hyperboloidPoint(u0, v0) {
  const u = q(u0[0], u0[1]);
  const v = q(v0[0], v0[1]);
  const r2 = u.mul(u).add(v.mul(v));
  const den = q(1).sub(r2);
  return [q(1).add(r2).div(den), q(2).mul(u).div(den), q(2).mul(v).div(den)];
}

function determinant(matrix) {
  const a = matrix.map((row) => [...row]);
  let det = q(1);
  for (let col = 0; col < a.length; col += 1) {
    const pivot = a.findIndex((row, r) => r >= col && !row[col].isZero());
    if (pivot < col) return q(0);
    if (pivot !== col) {
      [a[col], a[pivot]] = [a[pivot], a[col]];
      det = det.neg();
    }
    const p = a[col][col];
    det = det.mul(p);
    for (let r = col + 1; r < a.length; r += 1) {
      const f = a[r][col].div(p);
      for (let j = col; j < a.length; j += 1) a[r][j] = a[r][j].sub(f.mul(a[col][j]));
    }
  }
  return det;
}

function matrixRank(matrix) {
  const a = matrix.map((row) => [...row]);
  let rank = 0;
  for (let col = 0; col < a[0].length && rank < a.length; col += 1) {
    const pivot = a.findIndex((row, r) => r >= rank && !row[col].isZero());
    if (pivot < rank) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const p = a[rank][col];
    for (let r = rank + 1; r < a.length; r += 1) {
      const f = a[r][col].div(p);
      for (let j = col; j < a[r].length; j += 1) a[r][j] = a[r][j].sub(f.mul(a[rank][j]));
    }
    rank += 1;
  }
  return rank;
}

function nullVector(matrix) {
  const a = matrix.map((row) => [...row]);
  const pivots = [];
  let rank = 0;
  for (let col = 0; col < a[0].length && rank < a.length; col += 1) {
    const pivot = a.findIndex((row, r) => r >= rank && !row[col].isZero());
    if (pivot < rank) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const p = a[rank][col];
    a[rank] = a[rank].map((x) => x.div(p));
    for (let r = 0; r < a.length; r += 1) {
      if (r === rank) continue;
      const f = a[r][col];
      a[r] = a[r].map((x, j) => x.sub(f.mul(a[rank][j])));
    }
    pivots.push(col);
    rank += 1;
  }
  const free = [...Array(a[0].length).keys()].find((col) => !pivots.includes(col));
  assert.notEqual(free, undefined, "matrix has trivial nullspace");
  const x = Array(a[0].length).fill(null).map(() => q(0));
  x[free] = q(1);
  for (let r = pivots.length - 1; r >= 0; r -= 1) x[pivots[r]] = a[r][free].neg();
  return x;
}

function vertexCycle(vertices, distinguished, signature) {
  const V0 = vertices[distinguished];
  const face = vertices.filter((_, i) => i !== distinguished);
  const G = scale(vertices.reduce(add), q(1, 4));
  const normalSystem = face.map((V) => V.map((x, i) => x.mul(signature[i])));
  const n = solve(normalSystem, [q(1), q(1), q(1)]);
  const Op = scale(n, q(1).div(dot(n, n, signature)));
  const g2 = dot(G, G, signature);
  const op2 = dot(Op, Op, signature);
  const rows = [G, Op, V0].map((X) => X.map((x, i) => q(2).mul(x).mul(signature[i])));
  const rhs = [
    q(4).mul(g2).add(1),
    q(4).mul(op2).add(1),
    q(8).mul(dot(G, V0, signature)).sub(3),
  ];
  const c = solve(rows, rhs);
  return [...scale(c, q(2)), q(2), q(-4)];
}

function fourCyclePacket(vertices, signature) {
  const cycles = vertices.map((_, i) => vertexCycle(vertices, i, signature));
  const ambientDot = (a, b) => dot(a.slice(0, 3), b.slice(0, 3), signature)
    .add(a[3].mul(b[4])).add(b[3].mul(a[4]));
  const R = [q(0), q(0), q(0), q(-2), q(-4)];
  for (const S of cycles) assert.ok(ambientDot(S, R).isZero());
  const G = scale(vertices.reduce(add), q(1, 4));
  const g2 = dot(G, G, signature);
  const E = scale(G, q(1).div(g2));
  const D = scale(G, q(4));
  const lift = (X) => [...X, q(1), dot(X, X, signature).mul(q(-1, 2))];
  const Ehat = lift(E);
  const Dhat = lift(D);
  const pairedLiftResidual = sub(Dhat, add(scale(Ehat, q(4).mul(g2)), scale(R, q(4).mul(g2).sub(1).div(2))));
  assert.ok(pairedLiftResidual.every((x) => x.isZero()));
  for (const S of cycles) {
    assert.ok(ambientDot(S, Ehat).isZero());
    assert.ok(ambientDot(S, Dhat).isZero());
  }
  const gram = cycles.map((a) => cycles.map((b) => ambientDot(a, b)));
  const det = determinant(gram);
  const rank = matrixRank(gram);
  const cycleMatrix = [...Array(5).keys()].map((row) => cycles.map((S) => S[row]));
  const cycleRank = matrixRank(cycleMatrix);
  assert.equal(cycleRank, 3);
  assert.equal(rank, 3);
  assert.ok(det.isZero());
  const independentMinor = determinant(gram.slice(0, 3).map((row) => row.slice(0, 3)));
  assert.ok(!independentMinor.isZero());
  const relation = nullVector(cycleMatrix);
  for (let row = 0; row < 5; row += 1) {
    const residual = relation.reduce((sum, coefficient, i) => sum.add(coefficient.mul(cycles[i][row])), q(0));
    assert.ok(residual.isZero());
  }
  const T = [...scale(G, q(2)), q(2), q(-4)];
  assert.ok(ambientDot(T, R).isZero());
  const escapeResidual = ambientDot(T, Ehat);
  assert.ok(escapeResidual.eq(q(-2).sub(q(1).div(g2))));
  assert.ok(!escapeResidual.isZero());
  const augmented = [cycles[0], cycles[1], cycles[2], T];
  const augmentedMatrix = [...Array(5).keys()].map((row) => augmented.map((S) => S[row]));
  const augmentedGram = augmented.map((a) => augmented.map((b) => ambientDot(a, b)));
  const augmentedDeterminant = determinant(augmentedGram);
  assert.equal(matrixRank(augmentedMatrix), 4);
  assert.ok(!augmentedDeterminant.isZero());
  const crossRatio = gram[0][1].mul(gram[2][3]).div(gram[0][2].mul(gram[1][3]));
  return {
    gram: gram.map((row) => row.map(String)),
    determinant: det.toString(),
    rank,
    cycleRank,
    independentMinor: independentMinor.toString(),
    linearRelation: relation.map(String),
    projectiveCrossRatio: crossRatio.toString(),
    centroidCycleEscapeResidual: escapeResidual.toString(),
    augmentedRank: matrixRank(augmentedMatrix),
    augmentedGramDeterminant: augmentedDeterminant.toString(),
  };
}

function construct(signature, parameterization, parameters) {
  const vertices = parameters.map(([u, v]) => parameterization(u, v));
  const [V0, V1, V2, V3] = vertices;
  for (const V of [V0, V1, V2, V3]) assert.ok(dot(V, V, signature).eq(1));

  const G = scale(add(add(V0, V1), add(V2, V3)), q(1, 4));

  // If beta(V_i,n)=1 on the opposite face, O'=n/q(n) is its
  // beta-orthogonal circumcentre: beta(V_i,O')=q(O').
  const face = [V1, V2, V3];
  const normalSystem = face.map((V) => V.map((x, i) => x.mul(signature[i])));
  const n = solve(normalSystem, [q(1), q(1), q(1)]);
  const n2 = dot(n, n, signature);
  assert.ok(!n2.isZero(), "null opposite face is outside the generic theorem");
  const Op = scale(n, q(1).div(n2));
  const op2 = dot(Op, Op, signature);
  for (const V of face) assert.ok(dot(V, Op, signature).eq(op2));

  const g2 = dot(G, G, signature);
  assert.ok(!g2.isZero(), "null centroid is outside the finite inversion chart");

  const C = sub(scale(G, q(4)), scale(V0, q(3)));
  const H = sub(sub(scale(G, q(4)), V0), scale(Op, q(2)));
  const E = scale(G, q(1).div(g2));
  const D = scale(G, q(4));
  const B = scale(Op, q(1).div(op2));
  const F = scale(Op, q(4));

  const direction = sub(G, V0);
  const t = q(2).mul(q(1).sub(dot(G, V0, signature))).div(dot(direction, direction, signature));
  const A = add(V0, scale(direction, t));
  assert.ok(dot(A, A, signature).eq(1));

  // Normalize alpha=1 in 2 beta(c,X)=alpha(q(X)+4).
  const rows = [G, Op, V0].map((X) => X.map((x, i) => q(2).mul(x).mul(signature[i])));
  const rhs = [
    q(4).mul(g2).add(1),
    q(4).mul(op2).add(1),
    q(8).mul(dot(G, V0, signature)).sub(3),
  ];
  const c = solve(rows, rhs);
  const alpha = q(1);
  const cycleResidual = (X) => q(2).mul(dot(c, X, signature)).sub(alpha.mul(dot(X, X, signature).add(4)));

  const points = { A, B, C, H, E, D, F };
  for (const [name, X] of Object.entries(points)) {
    assert.ok(cycleResidual(X).isZero(), `${name} misses the common cycle`);
  }

  // Conformal lift into beta plus a hyperbolic plane.  It is null, all seven
  // lifts are incident with S, and S is orthogonal to q(x)=4's cycle R.
  const ambientDot = (a, b) => dot(a.slice(0, 3), b.slice(0, 3), signature)
    .add(a[3].mul(b[4])).add(b[3].mul(a[4]));
  const lift = (X) => [...X, q(1), dot(X, X, signature).mul(q(-1, 2))];
  const S = [...scale(c, q(2)), q(2).mul(alpha), q(-4).mul(alpha)];
  const R = [q(0), q(0), q(0), q(-2), q(-4)];
  for (const X of Object.values(points)) {
    assert.ok(ambientDot(lift(X), lift(X)).isZero());
    assert.ok(ambientDot(lift(X), S).isZero());
  }
  assert.ok(ambientDot(S, R).isZero(), "the common cycle is not orthogonal to q(x)=4");

  // A coefficient scramble is a genuine negative control.
  const scrambledD = scale(G, q(5));
  assert.ok(!cycleResidual(scrambledD).isZero(), "the scale-5 negative control accidentally survived");

  return {
    c: c.map(String),
    centroidNorm: g2.toString(),
    faceCentreNorm: op2.toString(),
    scrambledResidual: cycleResidual(scrambledD).toString(),
    fourCyclePacket: fourCyclePacket(vertices, signature),
  };
}

const euclidean = construct(
  [q(1), q(1), q(1)],
  spherePoint,
  [[[1, 3], [1, 5]], [[0, 1], [0, 1]], [[1, 2], [0, 1]], [[0, 1], [1, 2]]],
);

const lorentzian = construct(
  [q(1), q(-1), q(-1)],
  hyperboloidPoint,
  [[[1, 4], [1, 5]], [[0, 1], [0, 1]], [[1, 2], [0, 1]], [[0, 1], [1, 2]]],
);

console.log(JSON.stringify({ euclidean, lorentzian }, null, 2));
console.log("PASS 1700-1702: the seven-point identity survives both signatures; its four vertex cycles have rank three, and one centroid-centred orthogonal cycle generically supplies the unique missing direction.");
