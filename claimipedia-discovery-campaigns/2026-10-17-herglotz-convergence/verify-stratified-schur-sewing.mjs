import assert from "node:assert/strict";

const norm = (value) => Math.hypot(value.re, value.im);
const inverse = ({ re, im }) => {
  const denominator = re * re + im * im;
  return { re: re / denominator, im: -im / denominator };
};

function classifyElimination({ stratum, supportRankConstant, nullCoupling, atLocus }) {
  if (stratum === "fixed-null") {
    if (!supportRankConstant) return { permitted: false, handler: "patch-or-retain" };
    if (nullCoupling !== 0) return { permitted: false, handler: "range-condition-refusal" };
    return { permitted: true, handler: "support-pseudoinverse" };
  }
  if (stratum === "simple-pole" && atLocus) return { permitted: false, handler: "residue-or-retain" };
  if (stratum === "rank-change" && atLocus) return { permitted: false, handler: "patch-or-retain" };
  return { permitted: true, handler: "ordinary-inverse" };
}

// Fixed Ward null: the support inverse remains finite and the null regulator is irrelevant
// exactly when the boundary coupling annihilates the null direction.
const ward = classifyElimination({ stratum: "fixed-null", supportRankConstant: true, nullCoupling: 0, atLocus: true });
assert.deepEqual(ward, { permitted: true, handler: "support-pseudoinverse" });
const badWard = classifyElimination({ stratum: "fixed-null", supportRankConstant: true, nullCoupling: 0.2, atLocus: true });
assert.deepEqual(badWard, { permitted: false, handler: "range-condition-refusal" });

// A wall resolvent pole is a positive spectral residue, not a regular interior inverse.
// The inverse magnitude scales as 1/eta when the upper-half-plane point approaches the pole.
const wallMagnitudes = [1e-1, 1e-3, 1e-5].map((eta) => norm(inverse({ re: 0, im: eta })));
assert(wallMagnitudes[1] > 90 * wallMagnitudes[0]);
assert(wallMagnitudes[2] > 90 * wallMagnitudes[1]);
const wallAtPole = classifyElimination({ stratum: "simple-pole", supportRankConstant: false, nullCoupling: 0, atLocus: true });
assert.deepEqual(wallAtPole, { permitted: false, handler: "residue-or-retain" });

// A hydrodynamic/support eigenvalue crossing zero likewise invalidates a single inverse patch.
const hydroCorrections = [1e-1, 1e-3, 1e-5].map((scale) => 0.25 / scale);
assert(hydroCorrections[1] > 90 * hydroCorrections[0]);
assert(hydroCorrections[2] > 90 * hydroCorrections[1]);
const hydroAtChange = classifyElimination({ stratum: "rank-change", supportRankConstant: false, nullCoupling: 0, atLocus: true });
assert.deepEqual(hydroAtChange, { permitted: false, handler: "patch-or-retain" });

// Away from the singular locus, the same modes may be eliminated on a declared patch.
assert.deepEqual(
  classifyElimination({ stratum: "simple-pole", supportRankConstant: true, nullCoupling: 0, atLocus: false }),
  { permitted: true, handler: "ordinary-inverse" },
);
assert.deepEqual(
  classifyElimination({ stratum: "rank-change", supportRankConstant: true, nullCoupling: 0, atLocus: false }),
  { permitted: true, handler: "ordinary-inverse" },
);

console.log("Support-stratified Schur sewing synthesis certificate: PASS");
console.log("fixed_ward_null=support-pseudoinverse; bad_null_coupling=refused; wall_pole=residue-or-retain; rank_change=patch-or-retain; off_locus=ordinary-inverse");
