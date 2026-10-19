# The Walk-Response Determinant Is Homogeneous, Not Universal

**Date:** 17 October 2026  
**Branches:** B07, B08 and B13  
**Claim status:** verified finite-family identity plus explicit heterogeneous counterexamples; analytic homogeneous proof remains open

## 1. The apparent invariant

The first two-port response grid produced the striking relation

\[
\det X=(1-r^2)^2
\]

for every tested chain length (N) and uniform coin angle (θ).

This looked like a candidate subdivision-invariant boundary scale analogous to the homogeneous scalar Dirichlet-to-Neumann result.

The correct next action was to vary the interior nonuniformly before treating it as a theorem.

## 2. Heterogeneous test

Replace the uniform coin by site-dependent rotations

\[
C_n=C(θ_n).
\]

The finite walk remains real and orthogonal. The Euclidean precision

\[
H=(I-rU)^T(I-rU)
\]

remains positive, and the inward-port Schur response (X) remains in (H_2(\mathbb R)_+).

But the determinant generally changes with the profile:

\[
\boxed{
\det X\ne(1-r^2)^2
\quad\text{for generic }θ_n.
}
\]

The certificate tests several deterministic heterogeneous families across (N=2,3,5,7,10) and multiple (r). Deviations are far above numerical tolerance.

## 3. Correct status of the homogeneous law

For spatially constant (θ_n=θ), the relation

\[
\det X=(1-r^2)^2
\]

continues to hold at machine precision across all tested lengths and angles. This strongly suggests an exact continuant or transfer-matrix identity for the homogeneous reflecting walk.

That analytic proof has not yet been written. Even if proved, its scope is limited:

- uniform site coin;
- reflecting boundary convention;
- selected inward port pair;
- Euclideanization (H=(I-rU)^T(I-rU));
- fixed boundary-coordinate normalization.

It cannot be promoted to a universal interior-independent scale.

## 4. Port orientation matters

Changing the retained pair from inward ports to outward or same-side components changes the determinant. The apparent law therefore uses the directional boundary orientation, not merely the fact that two real variables were retained.

This is useful: the carrier remembers relational orientation. It is also a warning: the port choice must be physically derived.

## 5. Coordinate normalization remains free

If both boundary coordinates are rescaled by a common factor (s), the precision response transforms as

\[
X\mapsto s^{-2}X,
\]

and hence

\[
\det X\mapsto s^{-4}\det X.
\]

Therefore even the homogeneous value does not supply an absolute physical mass scale until the boundary amplitudes have canonical normalization.

The candidate quantity

\[
\mu=\sqrt{\det X}
\]

is coordinate dependent in this walk construction.

## 6. Relation to the scalar boundary branch

The result mirrors the earlier scalar comparison:

- homogeneous systems can possess a simple determinant scale stable under subdivision;
- heterogeneous systems admit profile-dependent boundary data and potentially inequivalent operational scales;
- sewing invariance alone does not select a normalization;
- an observable prescription—response curvature, decay exponent, flux normalization or canonical commutator—is required.

The walk has therefore reproduced the same obstruction rather than solved it.

## 7. Programme consequence

The discrete walk now provides:

- a positive (H_2(\mathbb R)) response;
- exact Schur sewing;
- a simple homogeneous determinant law;
- explicit failure of that law under heterogeneous coins;
- explicit dependence on port orientation and normalization.

This is a credible boundary-response branch, but it does not yet select the (Spin(2,3)) scale or symmetry uniquely.

## 8. Stop-everything and falsification gates

**Analytic advance:** prove the homogeneous determinant law by a transfer/continuant recursion and identify its conserved current.

**Generalized invariant:** find a heterogeneous replacement built from the full ordered transfer product that is both subdivision invariant and canonically normalized.

**Physical selection:** derive the inward ports and their normalization from gauge flux, canonical anticommutation relations or reflection positivity.

**Demotion:** if every candidate invariant changes under harmless port-coordinate choices, retain (H_2(\mathbb R)) only as a bookkeeping cone.

**Failure:** Lorentzian or gauge continuation makes the response nonpositive or complex without a canonical real slice.

## 9. Certificate

The [walk determinant stress test](scripts/verify_walk_boundary_determinant_invariant.mjs) verifies the homogeneous formula, produces heterogeneous counterexamples, compares alternative port pairs and checks the exact boundary-rescaling law.

## Companion documents

- [Finite-walk two-port (H_2(\mathbb R)) response](156_walk_two_port_h2r_boundary_response.md)
- [Heterogeneous scalar boundary scales](141_heterogeneous_boundary_transfer_scales.md)
- [Boundary normalization and stress scale](134_boundary_and_stress_normalization_scale_audit.md)
- [Scalar network sewing invariants](66_scalar_network_subdivision_invariants.md)
