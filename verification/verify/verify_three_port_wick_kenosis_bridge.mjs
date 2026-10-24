import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledger = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/three_port_wick_kenosis_bridge_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };
const close = (left, right, tolerance = 1e-12) => Math.abs(left - right) < tolerance;
const C = (re, im = 0) => ({ re, im });
const add = (left, right) => C(left.re + right.re, left.im + right.im);
const sub = (left, right) => C(left.re - right.re, left.im - right.im);
const mul = (left, right) => C(left.re * right.re - left.im * right.im, left.re * right.im + left.im * right.re);
const conj = (value) => C(value.re, -value.im);
const scale = (scalar, value) => C(scalar * value.re, scalar * value.im);
const abs2 = (value) => value.re ** 2 + value.im ** 2;
const equalC = (left, right) => close(left.re, right.re) && close(left.im, right.im);

const { a, b, c } = ledger.checkpoint;
const [ur, ui] = ledger.checkpoint.u;
const [vr, vi] = ledger.checkpoint.v;
const [wr, wi] = ledger.checkpoint.w;
const u = C(ur, ui);
const v = C(vr, vi);
const w = C(wr, wi);
const loop = mul(mul(u, v), w);
const determinant = a * b * c + 2 * loop.re - a * abs2(v) - b * abs2(w) - c * abs2(u);

insist(equalC(loop, C(0, 2)), "unexpected loop product");
insist(determinant === 329, "unexpected H3 determinant");
insist(a > Math.sqrt(abs2(u)) + Math.sqrt(abs2(w)), "row one is not strictly diagonally dominant");
insist(b > Math.sqrt(abs2(u)) + Math.sqrt(abs2(v)), "row two is not strictly diagonally dominant");
insist(c > Math.sqrt(abs2(v)) + Math.sqrt(abs2(w)), "row three is not strictly diagonally dominant");

// The imaginary v edge is locally realified by the exact quarter turn -i.
const quarterTurn = C(0, -1);
insist(equalC(mul(quarterTurn, v), C(1)), "quarter turn does not realify v");
// A common real port gauge would make the gauge-invariant loop product real.
insist(!close(loop.im, 0), "checkpoint does not obstruct simultaneous realification");

// Eliminate port three by the Schur complement rather than by naive deletion.
const q = scale(1 / c, mul(conj(w), conj(v)));
const effectiveEdge = sub(u, q);
const effectiveA = a - abs2(w) / c;
const effectiveB = b - abs2(v) / c;
const effectiveDeterminant = effectiveA * effectiveB - abs2(effectiveEdge);
const orientationResidue = mul(u, conj(q)).im;
insist(equalC(q, C(0, -1 / 11)), "unexpected indirect path");
insist(equalC(effectiveEdge, C(2, 1 / 11)), "unexpected effective edge");
insist(close(effectiveDeterminant, determinant / c), "Schur determinant identity failed");
insist(close(orientationResidue, loop.im / c), "Schur orientation identity failed");
insist(close(u.im, 0) && !close(effectiveEdge.im, 0), "Schur descent did not retain hidden phase");

console.log(JSON.stringify({
  status: "PASS",
  carrier: ledger.carrier,
  determinant,
  loopProduct: [loop.re, loop.im],
  eachFaceLocallyRealifiable: true,
  commonGlobalRealForm: false,
  quarterTurn: "-i maps v=i to 1",
  indirectPath: [q.re, q.im],
  effectiveEdge: [effectiveEdge.re, effectiveEdge.im],
  orientationResidue,
  schurDeterminant: effectiveDeterminant,
  naiveDeletionForgetsOrientation: true,
  schurEliminationRetainsOrientation: true,
}));
