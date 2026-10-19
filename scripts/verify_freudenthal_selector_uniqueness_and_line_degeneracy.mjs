import assert from "node:assert/strict";

const dot = (u,v) => u.reduce((s,x,i) => s+x*v[i],0);
const norm2 = (u) => dot(u,u);

function faceQuartic(A,C) {
  const tr = A.a*C.a + A.b*C.b + 2*dot(A.z,C.z);
  const dA = A.a*A.b - norm2(A.z);
  const dC = C.a*C.b - norm2(C.z);
  return -2*(tr*tr - 4*dA*dC);
}

function lineFace(A,q) {
  return {a:A.a,b:A.b,z:q.map(x => A.c*x)};
}

const axes = Array.from({length:8},(_,i) =>
  Array.from({length:8},(_,j) => i===j ? 1 : 0));

const A = {a:5,b:4,c:2};
const C = {a:3,b:7,c:-1};
const expected = faceQuartic(lineFace(A,axes[0]),lineFace(C,axes[0]));

// Every unit coordinate line gives the same restricted quartic.
for (const q of axes) {
  assert.equal(norm2(q),1);
  assert.equal(faceQuartic(lineFace(A,q),lineFace(C,q)),expected);
}

// Relative line angle is visible only when source and response are embedded
// into different H_2(R) copies.
const sameLine = faceQuartic(lineFace(A,axes[0]),lineFace(C,axes[0]));
const orthogonalLines = faceQuartic(lineFace(A,axes[0]),lineFace(C,axes[1]));
assert.notEqual(sameLine,orthogonalLines);

// Relative to the scalar-line selector, a positive diagonal response detects
// every discarded imaginary source component.  The exact defect is
// q_O-q_R = -8 det(C) |u|^2.
const sourceWithImaginaryLink = {a:7,b:6,z:[2,1,-2,0,0,0,0,0]};
const projectedSource = {a:7,b:6,z:[2,0,0,0,0,0,0,0]};
const diagonalResponse = {a:3,b:5,z:[0,0,0,0,0,0,0,0]};
const u = sourceWithImaginaryLink.z.slice(1);
const defect = faceQuartic(sourceWithImaginaryLink,diagonalResponse)
  - faceQuartic(projectedSource,diagonalResponse);
assert.equal(defect,-8*(diagonalResponse.a*diagonalResponse.b)*norm2(u));
assert.notEqual(defect,0);

// The dual statement holds with source and response exchanged.
assert.equal(
  faceQuartic(diagonalResponse,sourceWithImaginaryLink)
    - faceQuartic(diagonalResponse,projectedSource),
  defect,
);

console.log("PASS Freudenthal selector uniqueness and line degeneracy");
console.log("  all eight unit coordinate link lines have identical same-line quartic");
console.log("  mixed lines retain their relative angle");
console.log("  positive diagonal probes force discarded components to vanish for factorwise preservation");
