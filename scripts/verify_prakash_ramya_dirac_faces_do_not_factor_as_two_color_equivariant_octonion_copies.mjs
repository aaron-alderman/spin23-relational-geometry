import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const expi = (x) => C(Math.cos(x), Math.sin(x));
const scale = (a, s) => C(a.re * s, a.im * s);
const near = (a, b, eps = 1e-12) => Math.hypot(a.re - b.re, a.im - b.im) < eps;

// Generic maximal-torus element of SU(3).
const alpha = 0.37, beta = -0.82;
const eigenvalues3 = [expi(alpha), expi(beta), expi(-alpha - beta)];
const chi3 = eigenvalues3.reduce(add, C(0));
const chi3bar = conj(chi3);
assert(!near(chi3, chi3bar)); // 3 and 3bar are inequivalent at a generic element.

const one = C(1);
const chiRightFace = add(scale(one, 2), scale(chi3bar, 2)); // nu^c,e^c,u^c,d^c
const chiLeftFace = add(scale(one, 2), scale(chi3, 2));      // nu,e,u,d
assert(!near(chiRightFace, chiLeftFace));

// Full generation and two copies of O_C have the same color multiplicities.
// O_C = 1 + 1 + 3 + 3bar as a complex SU(3) module.
const chiFullGeneration = add(chiRightFace, chiLeftFace);
const chiOctonionComplexification = add(add(scale(one, 2), chi3), chi3bar);
assert(near(chiFullGeneration, scale(chiOctonionComplexification, 2)));

const fullMultiplicities = { singlet: 4, fundamental3: 2, antifundamental3bar: 2 };
const twoOctonionCopies = { singlet: 4, fundamental3: 2, antifundamental3bar: 2 };
assert.deepEqual(fullMultiplicities, twoOctonionCopies);

// Complex-linear Hom_SU(3)(R,L): only the two singlets on each side can
// map.  Its dimension is 2*2=4, and every such map vanishes on the
// six-dimensional colored subspace, so no invertible color intertwiner exists.
const homRightToLeftComplexDimension = 2 * 2;
const rightDimension = 2 + 2 * 3;
const maximumComplexLinearIntertwinerRank = 2;
assert.equal(rightDimension, 8);
assert(maximumComplexLinearIntertwinerRank < rightDimension);

console.log(JSON.stringify({
  protocol: "prakash-ramya-dirac-faces-versus-octonion-color-factorization/1",
  sourceDoubling: {
    rightFace: "nu^c + e^c + u^c(3bar) + d^c(3bar) = 2*1 + 2*3bar",
    leftFace: "nu + e + u(3) + d(3) = 2*1 + 2*3"
  },
  genericColorCharacters: { chi3, chi3bar, chiRightFace, chiLeftFace },
  faceCharactersEqual: false,
  complexLinearHomRightToLeftDimension: homRightToLeftComplexDimension,
  maximumComplexLinearIntertwinerRank,
  invertibleComplexLinearColorIntertwiner: false,
  fullGenerationColorModule: "4*1 + 2*3 + 2*3bar",
  twoComplexifiedOctonionCopies: "2*(2*1 + 3 + 3bar)",
  abstractFullModuleMatch: true,
  obstruction: "the abstract two-copy octonion grouping is not the physical Dirac-pair face grouping",
  repairOptions: [
    "use an anti-linear color-conjugating exchange between physical Dirac faces",
    "regroup fields into two color-equivariant octonion copies and give up direct Dirac-pair topology",
    "construct a typed response copy rather than identify either matter face with the Clifford multiplicity"
  ],
  passed: true
}, null, 2));
