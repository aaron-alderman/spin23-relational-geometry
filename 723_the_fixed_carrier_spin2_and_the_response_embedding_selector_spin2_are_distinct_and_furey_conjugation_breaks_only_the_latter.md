# The Fixed-Carrier (Spin(2)) and the Response-Embedding Selector (Spin(2)) Are Distinct, and Furey Conjugation Breaks Only the Latter

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B07, B08, B09, B10, B11, B14 and the response-normalizer audit  
**Claim status:** exact Lie-generator distinction and conjugation action; physical gauging of either subgroup remains model dependent  
**Certificate:** [verify_carrier_spin2_and_embedding_selector_spin2_are_distinct.mjs](scripts/verify_carrier_spin2_and_embedding_selector_spin2_are_distinct.mjs)

## Executive result

The programme has been using “response (Spin(2))” for two different rotations. They must be separated.

Choose the three-dimensional ambient spin-factor subspace

\[
W=\operatorname{span}_{\mathbb R}\{d,1,u\},
\]

where (d) is the Peirce face-difference direction, (1) is the even octonion link and (u) is the Furey-odd link.

There are two rotations:

1. **fixed-carrier rotation:** rotate (d) and a selected link (q) inside one fixed (H_2(\mathbb R));
2. **embedding-selector rotation:** fix (d) and rotate the link (q(\theta)=\cos\theta,1+\sin\theta,u), thereby moving between different embedded (H_2(\mathbb R)) subalgebras.

For the even carrier, their infinitesimal generators are

\[
J_{d1}=
\begin{pmatrix}
0&-1&0\\
1&0&0\\
0&0&0
\end{pmatrix},
\qquad
J_{1u}=
\begin{pmatrix}
0&0&0\\
0&0&-1\\
0&1&0
\end{pmatrix}.
\]

They are not equal and do not commute:

\[
[J_{d1},J_{1u}]=\pm J_{du}.
\]

Together they generate (mathfrak{so}(3)) on (W).

Therefore the zero-map obstruction of document 722 applies only if the **embedding-selector** rotation (J_{1u}) is an exact gauge redundancy. It does not follow merely because a fixed (H_2(\mathbb R)) has its ordinary (Spin(2)) automorphism.

## 1. The automorphism of a fixed carrier

For a selected link (q), the Jordan algebra is

\[
J_q=\operatorname{span}_{\mathbb R}\{I,\Gamma_d,\Gamma_q\}
\cong H_2(\mathbb R).
\]

Its connected automorphism rotates the traceless plane

\[
\operatorname{span}\{d,q\}.
\]

For (q=1), (J_{d1}) preserves this plane. It changes the population/link coordinate basis inside the same Jordan algebra. It does not rotate (1) into the external link (u).

This is the (Spin(2)) factor in the stabilizer of the selected oriented two-plane inside (Spin(9)).

## 2. The selector rotation changes the embedded algebra

The generator (J_{1u}) fixes (d) and acts by

\[
1\mapsto u,
\qquad
u\mapsto-1.
\]

It sends

\[
J_1
\longmapsto
J_{q(\theta)}.
\]

Except at the same projective line, this is a different three-dimensional Jordan subalgebra of the ambient (H_2(\mathbb O)) spin factor.

It is an ambient embedding normalizer, not an internal automorphism of one fixed carrier.

## 3. Furey conjugation distinguishes the two

On the ordered basis ((d,1,u)), Furey conjugation is

\[
K_u=\operatorname{diag}(1,1,-1).
\]

It obeys

\[
K_uJ_{d1}K_u=J_{d1},
\]

but

\[
K_uJ_{1u}K_u=-J_{1u}.
\]

Equivalently,

\[
K_uR_{1u}(\theta)K_u
=R_{1u}(-\theta).
\]

Once the matter construction fixes (u) and (K_u), the continuous selector circle is not a symmetry commuting with the coupled conjugation frame. It is reduced to the conjugation-invariant projective axes (\mathbb R1) and (\mathbb Ru).

This makes a response-axis selection physically meaningful without denying the internal automorphism group of the chosen carrier.

## 4. Correction to the linear-map obstruction

Document 722 proved:

\[
\operatorname{Hom}_{Spin(2)_{\rm selector}\rtimes CP}
(\mathbb R_-,\operatorname{span}\{\Gamma_1,\Gamma_u\})=0
\]

when the source is a selector-rotation singlet.

That theorem remains exact. Its scope is now explicit.

It does **not** imply

\[
\operatorname{Hom}_{Spin(2)_{\rm carrier}}(\mathbb R_-,J_q)=0
\]

as a statement about the full Jordan carrier, because (Spin(2)_{\rm carrier}) acts on the different plane \((d,q)), and the physical source coupling must be formulated with the scalar and tensor coordinates of that fixed carrier.

The programme should therefore ask whether the ambient selector rotation survives the matter coupling. The current Furey conjugation data say it does not survive as a commuting continuous symmetry.

## 5. Consequence for the projective CP angle

The projective angle

\[
[r_e:r_o]\in\mathbb RP^1
\]

is removable before the matter conjugation frame is fixed. After (u) and (K_u) are fixed, (R_{1u}(\theta)) changes the relative matter/response sewing and is not a symmetry unless the matter data transform simultaneously.

Thus the angle is:

- a coordinate choice in the isolated ambient response algebra;
- a potentially physical relative orientation in the coupled Furey/response system;
- still unphysical if a larger diagonal symmetry rotates both matter and response frames together.

The remaining test is the stabilizer of the full coupled action.

## 6. Branch tree

### Path A — only the fixed-carrier (Spin(2)) is gauged

The CP-equivariant selector map of document 722 may be nonzero because the embedding circle is already broken by the matter conjugation frame.

### Path B — a diagonal matter-response selector rotation survives

The angle remains gauge. The source must transform in the corresponding doublet or only composite projective observables can be physical.

### Path C — the selector rotation is global and explicitly broken by flavor

The CP-odd invariant supplies a controlled explicit-breaking coefficient, and no Goldstone mode is required.

### Path D — the selector rotation is global and spontaneously broken

A response-orientation Goldstone or pseudo-Goldstone mode appears and must be included in the low-energy theory.

## 7. Stop-everything criteria

Stop referring to both rotations by one unqualified (Spin(2)).

Stop applying the selector-plane zero-map theorem merely from the known automorphism group of (H_2(\mathbb R)).

Stop treating the response angle as physical before computing the diagonal stabilizer of the coupled matter-response action.

Stop the physical-angle branch if an exact simultaneous rotation removes the angle from all normalized observables.

## 8. Highest-value next calculations

1. Compute the stabilizer of a minimal coupled kernel containing (K_u), the even/odd response plane and the Majorana CP spurion.
2. Determine whether any continuous diagonal matter-response rotation survives.
3. Formulate source coupling in fixed-carrier Jordan coordinates and check its internal (Spin(2)_{\rm carrier}) covariance.
4. If the selector symmetry is explicitly broken, compute the pseudo-Goldstone mass from the quadratic kernel.
5. If it is gauged diagonally, construct the lowest projective/composite response observable.

## Companion documents

- [CP-equivariant odd-source map and selector-rotation obstruction](722_cp_equivariance_uniquely_sends_one_odd_flavor_scalar_to_the_odd_response_axis_but_unbroken_response_spin2_forces_the_map_to_zero.md)
- [Furey stabilizer and response-line circle](709_fureys_su3_stabilizer_leaves_a_circle_of_clifford_response_lines_until_conjugation_parity_selects_an_axis.md)
- [Projective CP invariant of a mixed response line](712_a_mixed_clifford_response_line_has_a_projective_cp_odd_invariant_and_requires_an_odd_cross_kernel.md)
