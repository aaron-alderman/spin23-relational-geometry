import assert from "node:assert/strict";

// Exact integer/rational-polynomial certificate for the H_2(R) restriction of
// the Freudenthal quartic associated with J = H_3(R) subset H_3(O).
// Convention:
// q(alpha,beta,X,Y) = -2(alpha beta - Tr(XY))^2
//                     -8(alpha N(X) + beta N(Y) - Tr(X# Y#)).

const mat3 = (rows) => rows;

function mul(A, B) {
  return A.map((row, i) => B[0].map((_, j) =>
    row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
}

function trace(A) {
  return A[0][0] + A[1][1] + A[2][2];
}

function pairing(A, B) {
  return trace(mul(A, B));
}

function det3(A) {
  const [[a,b,c],[d,e,f],[g,h,i]] = A;
  return a*(e*i-f*h) - b*(d*i-f*g) + c*(d*h-e*g);
}

function adj3(A) {
  const [[a,b,c],[d,e,f],[g,h,i]] = A;
  return mat3([
    [e*i-f*h, c*h-b*i, b*f-c*e],
    [f*g-d*i, a*i-c*g, c*d-a*f],
    [d*h-e*g, b*g-a*h, a*e-b*d],
  ]);
}

function embedH2({a,b,c}, transverse = 0) {
  return mat3([[a,c,0],[c,b,0],[0,0,transverse]]);
}

function detH2(A) {
  return A.a*A.b - A.c*A.c;
}

function traceProductH2(A, C) {
  return A.a*C.a + A.b*C.b + 2*A.c*C.c;
}

const dot = (u, v) => u.reduce((sum, value, i) => sum + value*v[i], 0);
const norm2 = (u) => dot(u,u);

function octFaceQuartic(A, C) {
  const tr = A.a*C.a + A.b*C.b + 2*dot(A.z,C.z);
  const detA = A.a*A.b - norm2(A.z);
  const detC = C.a*C.b - norm2(C.z);
  return -2*(tr*tr - 4*detA*detC);
}

function realSlice(A) {
  return {a:A.a,b:A.b,c:A.z[0]};
}

function quartic({alpha,beta,X,Y}) {
  const kappa = alpha*beta - pairing(X,Y);
  return -2*kappa*kappa
    -8*(alpha*det3(X) + beta*det3(Y) - pairing(adj3(X), adj3(Y)));
}

function assertNumberEqual(actual, expected) {
  assert.ok(actual === expected, `expected ${expected}, received ${actual}`);
}

const samples = [
  [{a:2,b:3,c:1}, {a:4,b:5,c:2}],
  [{a:1,b:1,c:0}, {a:1,b:1,c:0}],
  [{a:3,b:2,c:-1}, {a:2,b:7,c:3}],
  [{a:5,b:9,c:4}, {a:7,b:2,c:-2}],
];

for (const [A,C] of samples) {
  const iA = embedH2(A);
  const iC = embedH2(C);

  // A rank-two face alone is quartically null in the FTS.
  assertNumberEqual(quartic({alpha:0,beta:0,X:iA,Y:mat3([[0,0,0],[0,0,0],[0,0,0]])}), 0);

  // Supplying the discarded transverse unit converts the Jordan cubic into
  // the H_2 determinant inside the Freudenthal quartic.
  const liftedA = embedH2(A, 1);
  assertNumberEqual(
    quartic({alpha:1,beta:0,X:liftedA,Y:mat3([[0,0,0],[0,0,0],[0,0,0]])}),
    -8*detH2(A),
  );

  // A source in the first J copy and response in the dual J copy produce the
  // characteristic discriminant of the 2x2 product AC.
  const qPair = quartic({alpha:0,beta:0,X:iA,Y:iC});
  const trAC = traceProductH2(A,C);
  const expected = -2*(trAC*trAC - 4*detH2(A)*detH2(C));
  assertNumberEqual(qPair, expected);
}

// Exact inverse matching: C = adj(A) gives AC = det(A) I and zero quartic.
for (const A of [{a:2,b:3,c:1}, {a:5,b:4,c:-2}, {a:1,b:1,c:0}]) {
  const adjA = {a:A.b,b:A.a,c:-A.c};
  assertNumberEqual(
    quartic({alpha:0,beta:0,X:embedH2(A),Y:embedH2(adjA)}),
    0,
  );
}

// The H_2(O) -> H_2(R) real-link selector does not preserve the quartic in
// general. Its exact defect is controlled by the seven discarded coordinates.
const octSamples = [
  [
    {a:5,b:6,z:[1,1,2,0,0,0,0,0]},
    {a:4,b:7,z:[2,-1,1,0,0,0,0,0]},
  ],
  [
    {a:9,b:5,z:[2,1,0,1,0,0,0,0]},
    {a:8,b:6,z:[1,0,2,-1,0,0,0,0]},
  ],
];

let witnessedNonzeroDefect = false;
for (const [A,C] of octSamples) {
  const qO = octFaceQuartic(A,C);
  const Ar = realSlice(A);
  const Cr = realSlice(C);
  const qR = -2*(traceProductH2(Ar,Cr)**2 - 4*detH2(Ar)*detH2(Cr));
  const u = A.z.slice(1);
  const v = C.z.slice(1);
  const U = norm2(u);
  const V = norm2(v);
  const D = dot(u,v);
  const t = traceProductH2(Ar,Cr);
  const A0 = detH2(Ar);
  const C0 = detH2(Cr);
  const defect = -8*(t*D + D*D + A0*V + C0*U - U*V);
  assertNumberEqual(qO-qR, defect);
  witnessedNonzeroDefect ||= defect !== 0;
}
assert.equal(witnessedNonzeroDefect, true);

console.log("PASS Freudenthal H2(R) source-response restriction");
console.log("  face-only quartic: 0");
console.log("  transverse-unit lift: q = -8 det(A)");
console.log("  paired source/response: q = -2[(tr AC)^2 - 4 det(A)det(C)]");
console.log("  inverse matching C = adj(A): q = 0");
console.log("  H2(O) -> H2(R): generic quartic defect is nonzero and exactly verified");
