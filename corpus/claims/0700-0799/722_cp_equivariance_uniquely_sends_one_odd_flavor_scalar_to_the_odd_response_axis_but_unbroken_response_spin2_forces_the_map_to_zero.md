# CP Equivariance Uniquely Sends One Odd Flavor Scalar to the Odd Response Axis, but Unbroken Response (Spin(2)) Forces the Map to Zero

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the response-intertwiner branch  
**Claim status:** exact representation-theoretic classification under stated actions; physical status of the response rotation remains open  
**Certificate:** [verify_cp_equivariant_odd_source_intertwiner_and_spin2_obstruction.mjs](../../../verification/verify/verify_cp_equivariant_odd_source_intertwiner_and_spin2_obstruction.mjs)

> **Cycle 638 scope clarification.** The (Spin(2)) in the zero-map theorem is the embedding-selector rotation of the ((1,u)) response-line plane. It is distinct from the automorphism (Spin(2)) rotating the two traceless coordinates ((d,q)) inside one fixed (H_2(\mathbb R)). See [the two-(Spin(2)) normalizer audit](723_the_fixed_carrier_spin2_and_the_response_embedding_selector_spin2_are_distinct_and_furey_conjugation_breaks_only_the_latter.md).

## Executive result

Suppose the certified weak-basis scalar (I_2) is CP odd and the real Clifford response plane is

\[
R_{\rm resp}
=\mathbb R\Gamma_1\oplus\mathbb R\Gamma_u,
\]

with CP action

\[
C_{\rm resp}=\operatorname{diag}(+1,-1).
\]

A real linear matching map from one CP-odd scalar to this plane has the form

\[
\Phi(I_2)=I_2(a\Gamma_1+b\Gamma_u).
\]

CP equivariance forces

\[
\boxed{a=0,\qquad b\text{ arbitrary}.}
\]

Thus the map, if nonzero, is unique up to normalization and lands on the Furey-odd axis.

There is a second, sharper result. If the response-plane (Spin(2)\cong U(1)) rotation is an exact unbroken gauge symmetry and (I_2) is a response-rotation singlet, then no nonzero vector in the plane is fixed. Therefore

\[
\boxed{
\operatorname{Hom}_{Spin(2)\rtimes CP}
(\mathbb R_-,R_{\rm resp})=0.
}
\]

A nonzero odd matching coefficient requires the response rotation to be explicitly broken, spontaneously selected, gauge-fixed with additional charged data, or absent as a physical redundancy.

## 1. The CP intertwiner calculation

Represent the map by the column

\[
A=\begin{pmatrix}a\\b\end{pmatrix}.
\]

The source action is \(-1\), while the target action is \(C_{\rm resp}\). Equivariance is

\[
C_{\rm resp}A=A(-1).
\]

Hence

\[
\begin{pmatrix}a\\-b\end{pmatrix}
=
\begin{pmatrix}-a\\-b\end{pmatrix},
\]

which gives \(a=0\) with \(b\) free. The intertwiner space is one-dimensional.

This is the first sense in which CP can select a response axis without choosing its scale.

## 2. Why this is conditional rather than a derivation

The calculation assumes the target CP action is already known to be

\[
\Gamma_1\mapsto+\Gamma_1,
\qquad
\Gamma_u\mapsto-\Gamma_u.
\]

That is exactly the missing Furey-to-spacetime parity assignment. Representation theory classifies the map **after** that assignment; it does not prove the assignment.

Likewise, the free coefficient \(b\) contains all dynamics, dimensions, loop suppression and normalization. Symmetry does not show \(b\ne0\).

## 3. The response-rotation obstruction

Let a quarter rotation act on the response plane by

\[
R_{\pi/2}=
\begin{pmatrix}
0&-1\\
1&0
\end{pmatrix}.
\]

If the source is a (Spin(2)) singlet, equivariance also demands

\[
R_{\pi/2}A=A.
\]

But \(R_{\pi/2}-I\) is invertible, so \(A=0\). Requiring the full continuous rotation therefore kills both even and odd linear vector sources.

This settles an ambiguity left by the projective response-line analysis:

\[
\text{a physical response direction}
\quad\Longleftrightarrow\quad
\text{the continuous response rotation is not an unbroken redundancy}.
\]

## 4. Multiplicity and the complete-invariant warning

For one independent CP-odd scalar, the CP-equivariant Hom space has dimension one. For (k) independent odd scalars, it has dimension (k): each can carry its own coefficient into the same odd axis.

Consequently, adding the complete Majorana invariant set does not create new response directions, provided all invariants have the same CP sign. It creates additional independent matching coefficients. A universal response angle then requires relations among those coefficients.

This is why (I_2) is a useful existence witness but not a complete physical response theory.

## 5. Relation to the three typed factors

The Nambu TRO of document 721 produces the source scalar data. The Furey stabilizer supplies the internal even/odd axes. The Clifford construction supplies the (H_2(\mathbb R)) response plane.

The present result classifies the final real linear arrow:

\[
\mathbb R I_2
\xrightarrow{\ \Phi\ }
\mathbb R\Gamma_1\oplus\mathbb R\Gamma_u.
\]

Gauge invariance is automatic only after (I_2) has been reduced to a Standard-Model scalar. CAR compatibility and the identification of internal conjugation with physical CP remain separate gates.

## 6. Branch tree

### Path A — response (Spin(2)) is only a kinematic normalizer

Matter coupling may select an axis. CP then forces a one-invariant odd source onto \(\Gamma_u\), with a free dynamical coefficient.

### Path B — response (Spin(2)) is global and spontaneously broken

The selected response line is an order parameter. Goldstone or pseudo-Goldstone behavior must be included, matching the programme's “next holonomy/Goldstone rung” intuition.

### Path C — response (Spin(2)) is an exact gauge redundancy

No local gauge-invariant vector in the response plane is observable. The physical variable must be projective/composite, or the linear odd-source branch vanishes.

### Path D — the source is itself response-rotation charged

An enlarged matter-response multiplet may restore equivariance. This requires new fields or a derived two-component source, not the scalar (I_2) alone.

## 7. Stop-everything criteria

Stop saying CP determines a nonzero odd response coefficient; it determines only the allowed axis.

Stop treating the response (Spin(2)) simultaneously as an exact gauge redundancy and as a linearly sourced physical vector.

Stop claiming uniqueness once multiple independent CP-odd invariants are admitted; only the target axis remains unique.

Stop the linear source branch if the response rotation is proved to be exact gauge symmetry and no charged source multiplet exists.

## 8. Highest-value next calculations

1. Determine from the Clifford/Jordan construction whether response (Spin(2)) is gauge, global or merely a basis normalizer.
2. Construct the lowest composite (Spin(2))-invariant response observable if the rotation is gauged.
3. Test whether Higgs data form a response-charged doublet capable of replacing the scalar source.
4. Extend the Hom-space calculation to the full independent leptonic and quark CP-invariant source module.
5. Compute whether the projective invariant \(\sin2\theta\) survives after quotienting a gauged response rotation.

## Companion documents

- [Nambu TRO compression of the Majorana flavor word](721_the_majorana_weak_basis_word_is_one_nambu_tro_compression_but_not_an_internal_product_of_the_bare_furey_matter_tro.md)
- [Projective CP invariant of the mixed response line](712_a_mixed_clifford_response_line_has_a_projective_cp_odd_invariant_and_requires_an_odd_cross_kernel.md)
- [Furey stabilizer leaves a response-line circle](709_fureys_su3_stabilizer_leaves_a_circle_of_clifford_response_lines_until_conjugation_parity_selects_an_axis.md)
