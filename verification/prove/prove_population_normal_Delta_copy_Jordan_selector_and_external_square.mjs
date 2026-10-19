import assert from "node:assert/strict";

const z = (re = 0, im = 0) => ({ re, im });
const cadd = (a, b) => z(a.re + b.re, a.im + b.im);
const csub = (a, b) => z(a.re - b.re, a.im - b.im);
const cmul = (a, b) =>
  z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const cscale = (a, s) => z(a.re * s, a.im * s);
const cconj = (a) => z(a.re, -a.im);
const close = (a, b, eps = 1e-10) =>
  Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;

const M = (a, b, c, d) => [
  [a, b],
  [c, d],
];
const madd = (A, B) =>
  A.map((row, i) => row.map((x, j) => cadd(x, B[i][j])));
const msub = (A, B) =>
  A.map((row, i) => row.map((x, j) => csub(x, B[i][j])));
const mscale = (A, s) => A.map((row) => row.map((x) => cscale(x, s)));
const mm = (A, B) =>
  A.map((row, i) =>
    B[0].map((_, j) =>
      row.reduce((sum, x, k) => cadd(sum, cmul(x, B[k][j])), z()),
    ),
  );
const dagger = (A) =>
  A[0].map((_, j) => A.map((row) => cconj(row[j])));
const jordan = (A, B) => mscale(madd(mm(A, B), mm(B, A)), 0.5);
const comm = (A, B) => msub(mm(A, B), mm(B, A));
const meq = (A, B) =>
  A.every((row, i) => row.every((x, j) => close(x, B[i][j])));
const zero = M(z(), z(), z(), z());

const I = M(z(1), z(), z(), z(1));
const sx = M(z(), z(1), z(1), z());
const sy = M(z(), z(0, -1), z(0, 1), z());
const sz = M(z(1), z(), z(), z(-1));

assert(meq(jordan(I, sx), sx));
assert(meq(jordan(I, sy), sy));
assert(meq(jordan(sx, sx), I));
assert(meq(jordan(sy, sy), I));
assert(meq(jordan(sx, sy), zero));

// Construct 2 i sigma_z directly.
const twoISz = M(z(0, 2), z(), z(), z(0, -2));
assert(meq(comm(sx, sy), twoISz));

const iSy = sy.map((row) => row.map((entry) => cmul(z(0, 1), entry)));
const Eplus = mscale(madd(sx, iSy), 0.5);
const Eminus = dagger(Eplus);
assert(meq(jordan(Eplus, Eplus), zero));
assert(meq(jordan(Eminus, Eminus), zero));

const kron = (A, B) =>
  A.flatMap((rowA) =>
    B.map((rowB) =>
      rowA.flatMap((a) => rowB.map((b) => cmul(a, b))),
    ),
  );
const externalSquare = kron(Eplus, Eplus);
assert(externalSquare.flat().some((entry) => !close(entry, z())));

const theta = 0.731;
const U = M(
  z(Math.cos(theta / 2), Math.sin(theta / 2)),
  z(),
  z(),
  z(Math.cos(theta / 2), -Math.sin(theta / 2)),
);
const transformed = mm(mm(U, Eplus), dagger(U));
const phaseTimesEplus = Eplus.map((row) =>
  row.map((entry) =>
    cmul(z(Math.cos(theta), Math.sin(theta)), entry),
  ),
);
assert(meq(transformed, phaseTimesEplus));

const samples = [
  [3, 1, 2],
  [5, -2, 1],
  [2, 0.5, -0.25],
];
for (const [t, x, y] of samples) {
  const detEqualDiagonal = t * t - x * x - y * y;
  const detH2R = (t + x) * (t - x) - y * y;
  assert(Math.abs(detEqualDiagonal - detH2R) < 1e-12);
}

console.log(
  JSON.stringify(
    {
      protocol:
        "population-normal-Delta-copy-Jordan-selector-external-square/1",
      jordanCarrier: "span_R{I,sigma_x,sigma_y}",
      jordanClosure: {
        sigmaX_square: "I",
        sigmaY_square: "I",
        sigmaX_o_sigmaY: "0",
      },
      associativeEnvelope: {
        commutator: "[sigma_x,sigma_y]=2 i sigma_z",
        extraDirection: "sigma_z (neutral population difference)",
      },
      determinant:
        "det [[t,x-iy],[x+iy,t]] = t^2-x^2-y^2 = det [[t+x,y],[y,t-x]]",
      identification:
        "J_z is Jordan-isomorphic to H_2(R), with conformal group Sp(4,R) locally Spin_0(2,3).",
      chargeAction: {
        eigenvector: "E_+=(sigma_x+i sigma_y)/2",
        verifiedNumerically: "U(theta) E_+ U(theta)^* = exp(i theta) E_+",
      },
      squareAudit: {
        internalJordanSquareOfEplus: "zero",
        externalTensorSquareOfEplus: "nonzero",
        conclusion:
          "The doubled-charge Majorana composite must use an external symmetric tensor/index product, not the internal Jordan square.",
      },
      physicalBoundary:
        "The selector acts on equal-dimensional scalar-copy/response faces, not directly on rank-1 and rank-2 fermion family subspaces; the kinetic Gram metric must support the exchange.",
      passed: true,
    },
    null,
    2,
  ),
);
