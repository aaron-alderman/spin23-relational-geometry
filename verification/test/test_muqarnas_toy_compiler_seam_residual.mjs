import assert from "node:assert/strict";

const patch = (label, length = 1, seams = []) => ({
  label,
  length,
  seams: [...seams],
  leftPort: {type: "unit", orientation: -1},
  rightPort: {type: "unit", orientation: 1}
});

const sew = (left, right, label = `${left.label}${right.label}`) => {
  assert.equal(left.rightPort.type, right.leftPort.type);
  assert.equal(left.rightPort.orientation, -right.leftPort.orientation);
  return {
    label,
    length: left.length + right.length,
    seams: [...left.seams, left.length, ...right.seams.map((x) => left.length + x)],
    leftPort: left.leftPort,
    rightPort: right.rightPort
  };
};

const collapse = (left, right, label) => {
  const fine = sew(left, right, label);
  return {...fine, seams: [...left.seams, ...right.seams.map((x) => left.length + x)], hiddenSeams: [left.length]};
};

const canonical = (p) => ({length: p.length, seams: p.seams, leftPort: p.leftPort, rightPort: p.rightPort});
const A = patch("A");
const B = patch("B");
const C = patch("C");

// Fine geometric sewing is associative.
const fineLeft = sew(sew(A, B), C);
const fineRight = sew(A, sew(B, C));
assert.deepEqual(canonical(fineLeft), canonical(fineRight));
assert.deepEqual(fineLeft.seams, [1, 2]);

// Coarse reductions hide different internal seams.
const X = collapse(A, B, "X");
const Y = collapse(B, C, "Y");
const U = sew(X, C, "U");
const V = sew(A, Y, "V");
assert.equal(U.length, V.length);
assert.deepEqual(U.seams, [2]);
assert.deepEqual(V.seams, [1]);
assert.notDeepEqual(U.seams, V.seams);

// A silhouette detector and an unoriented seam-count detector erase the defect.
const silhouette = (p) => ({length: p.length, leftPort: p.leftPort.type, rightPort: p.rightPort.type});
const seamCount = (p) => p.seams.length;
assert.deepEqual(silhouette(U), silhouette(V));
assert.equal(seamCount(U), seamCount(V));

// An oriented seam-position detector resolves an odd residual.
const signedSeamPosition = (p) => p.seams.reduce((sum, x) => sum + x, 0) / p.seams.length - p.length / 2;
assert.equal(signedSeamPosition(U), 0.5);
assert.equal(signedSeamPosition(V), -0.5);

const reflectSeams = (p) => ({...p, seams: p.seams.map((x) => p.length - x).sort((a, b) => a - b)});
assert.deepEqual(reflectSeams(U).seams, V.seams);
assert.equal(signedSeamPosition(reflectSeams(U)), -signedSeamPosition(U));

console.log(JSON.stringify({
  protocol: "muqarnas-toy-compiler-seam-residual/1",
  fineAssembly: {
    associative: true,
    totalLength: fineLeft.length,
    seams: fineLeft.seams
  },
  macroReduction: {
    leftGrouping: {label: U.label, visibleSeams: U.seams, signedResidual: signedSeamPosition(U)},
    rightGrouping: {label: V.label, visibleSeams: V.seams, signedResidual: signedSeamPosition(V)},
    sameExterior: true,
    sameUnorientedSeamCount: true,
    distinguishedByOrientedSeamDetector: true,
    exchangedByReflection: true
  },
  conclusion: "Associative fine assembly can induce nonassociative macro labels and an orientation-odd seam scar when coarse reductions hide different internal interfaces.",
  sourceBoundary: "This is a synthetic control, not a transcription of a historical muqarnas rule.",
  passed: true
}, null, 2));

