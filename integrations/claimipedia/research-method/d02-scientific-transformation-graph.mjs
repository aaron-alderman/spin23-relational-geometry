export const signatureFields = ["domain", "rank", "variance", "basis", "regime", "order", "scheme", "symmetry", "cp", "support"];
export const authority = { proposalOnly: true, entails: false, empiricalAuthority: false };

// These nodes are proposal/review records about response families, not the
// response-valued quantities themselves. Their SI carrier is therefore the
// dimensionless record layer. This does not assign units to the matrices or
// operators represented by those records.
export const recordDimension = {
  mass: 0,
  length: 0,
  time: 0,
  current: 0,
  temperature: 0,
  amount: 0,
  luminousIntensity: 0,
};

const object = (id, signature) => ({ id, signature, dimension: { ...recordDimension } });

export const objects = [
  object("d02.raw-block-family", { domain: "block-herglotz-family", rank: 2, variance: "matrix", basis: "external-interior-block", regime: "upper-half-plane", order: "exact-finite", scheme: "unclassified-singular", symmetry: "declared-in-scope", cp: "unrestricted", support: "mixed-unknown" }),
  object("d02.fixed-support-family", { domain: "block-herglotz-family", rank: 2, variance: "matrix", basis: "support-split", regime: "constant-rank-patch", order: "exact-finite", scheme: "range-compatible", symmetry: "support-frame-covariant", cp: "unrestricted", support: "fixed-rank-plus-null" }),
  object("d02.local-effective-response", { domain: "effective-herglotz-response", rank: 2, variance: "matrix", basis: "external-ports", regime: "constant-rank-patch", order: "exact-finite", scheme: "support-schur", symmetry: "support-frame-covariant", cp: "unrestricted", support: "positive-operator-measure" }),
  object("d02.decorated-local-response", { domain: "decorated-effective-response", rank: 2, variance: "matrix", basis: "external-ports", regime: "constant-rank-patch", order: "exact-finite", scheme: "typed-decoration-transport", symmetry: "declared-compatible-subset", cp: "unrestricted", support: "positive-operator-measure" }),
  object("d02.local-theorem-triage", { domain: "d02-theorem-candidate", rank: 2, variance: "record", basis: "proof-and-receipt", regime: "bounded-finite", order: "review-candidate", scheme: "proposal-only", symmetry: "scoped-audited", cp: "unrestricted", support: "theorem-counterexample-boundary" }),
  object("d02.rank-changing-family", { domain: "block-herglotz-family", rank: 2, variance: "matrix", basis: "external-interior-block", regime: "rank-changing-locus", order: "exact-finite", scheme: "two-path-limit", symmetry: "declared-in-scope", cp: "unrestricted", support: "changing-rank" }),
  object("d02.global-single-law", { domain: "global-stratified-response", rank: 2, variance: "matrix", basis: "global-support-frame", regime: "across-rank-change", order: "conjectural", scheme: "single-canonical-continuation", symmetry: "globally-preserved", cp: "unrestricted", support: "all-strata" }),
];
const byId = new Map(objects.map(value => [value.id, value]));

function rule({ id, kind, from, to, assumptions, losses = [], evidenceRefs, analogyOnly = false }) {
  const fromObject = byId.get(from);
  const toObject = byId.get(to);
  return {
    id,
    kind,
    from,
    to,
    fromSignature: fromObject.signature,
    toSignature: toObject.signature,
    fromDimension: { ...fromObject.dimension },
    toDimension: { ...toObject.dimension },
    dimensionRule: "si-base-exponent-delta",
    dimensionDelta: { ...recordDimension },
    changes: signatureFields.filter(field => fromObject.signature[field] !== toObject.signature[field]),
    assumptions,
    losses,
    removes: [],
    evidenceRefs,
    analogyOnly,
    authority,
  };
}

export const transformations = [
  rule({ id: "classify-fixed-support-stratum", kind: "model-specialization", from: "d02.raw-block-family", to: "d02.fixed-support-family", assumptions: ["constant kernel on the selected patch", "support projector transported with the frame", "coupling annihilates the null bundle"], evidenceRefs: ["215_constant_kernel_ward_herglotz_pseudoinverse_sewing.md#constant-kernel-hypothesis", "generated/d02-execution-receipt.json#wardRegulatorIndependence"] }),
  rule({ id: "apply-local-support-schur-theorem", kind: "schur-elimination", from: "d02.fixed-support-family", to: "d02.local-effective-response", assumptions: ["restricted eliminated block is invertible", "real frequency-independent reciprocal coupling", "upper-half-plane passivity"], evidenceRefs: ["213_fixed_temperature_kms_herglotz_schur_sewing.md#closed-schur-class", "generated/d02-execution-receipt.json#localHerglotzPassivity"] }),
  rule({ id: "transport-compatible-decorations", kind: "decoration-transport", from: "d02.local-effective-response", to: "d02.decorated-local-response", assumptions: ["Ward support is fixed", "thermal channels share one temperature", "wall residue is probe-visible"], losses: ["bulk wall index is not determined by the projected response", "global rank-change continuation"], evidenceRefs: ["D02-RESULT.md#decoration-transport", "generated/d02-execution-receipt.json#projectedResponseDoesNotDetermineBulkIndex"] }),
  rule({ id: "handoff-bounded-theorem-and-obstruction", kind: "review-handoff", from: "d02.decorated-local-response", to: "d02.local-theorem-triage", assumptions: ["the theorem is restricted to finite constant-support patches", "the rank-change counterexample is retained beside the positive theorem"], losses: ["no operator-theoretic or empirical authority", "no single global law across rank change"], evidenceRefs: ["D02-RESULT.md", "generated/d02-execution-result.json"] }),
  rule({ id: "counterexample-silent-rank-change-continuation", kind: "analytic-continuation", from: "d02.rank-changing-family", to: "d02.global-single-law", assumptions: ["deliberate invalid fixture: limiting block alone selects one continuation"], evidenceRefs: ["D02-RESULT.md#minimal-rank-change-obstruction"], analogyOnly: true }),
  rule({ id: "counterexample-boundary-response-determines-wall-index", kind: "projection", from: "d02.local-effective-response", to: "d02.global-single-law", assumptions: ["deliberate invalid fixture: projected response determines invisible bulk index"], losses: ["uncoupled graded zero modes"], evidenceRefs: ["D02-RESULT.md#decoration-transport"], analogyOnly: true }),
];

export const graph = { objects, transformations };
export const queries = [
  { id: "bounded-local-theorem", source: "d02.raw-block-family", target: "d02.local-theorem-triage", maxDepth: 5 },
  { id: "global-rank-change-law", source: "d02.rank-changing-family", target: "d02.global-single-law", maxDepth: 2 },
];
