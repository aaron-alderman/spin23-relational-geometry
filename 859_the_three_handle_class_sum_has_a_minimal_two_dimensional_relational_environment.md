# The Three-Handle Class Sum Has a Minimal Two-Dimensional Relational Environment

**Date:** 17 October 2026  
**Branches:** quadratic relationship selector, Stinespring dilation, bilocal carrier, \(C_3\) covariance, and \(Spin_0(2,3)\)  
**Claim status:** exact finite-dimensional theorem; microscopic identification of the environment remains open  
**Certificate:** [construct_the_minimal_stinespring_dilation_of_the_three_handle_class_sum_channel.mjs](scripts/construct_the_minimal_stinespring_dilation_of_the_three_handle_class_sum_channel.mjs)

## Executive result

The three color-conjugate handle operations are three visible relationships but only two independent environmental directions.

After whitening their common positive invariant metric, the handle matrices \(O_0,O_1,O_2\) are ordinary orthogonal involutions satisfying

\[
O_0+O_1+O_2=0.
\]

The normalized class-sum channel

\[
\mathcal E(X)=\frac13\sum_{i=0}^2 O_iX O_i^T
\]

therefore has Kraus rank two, not three. Its apparent three-label Stinespring environment contains a null \(C_3\)-singlet direction. Removing that direction leaves the real two-dimensional standard representation of \(C_3\).

This is the first exact realization in the programme of the phrase

\[
\boxed{\text{one carrier, two environmental faces, three visible relationships}.}
\]

It is a theorem about the constructed response channel. It is not yet an identification with three colors, three generations, a quantum-error-correcting syndrome space, or a microscopic field multiplet.

## 1. Whitening the invariant metric

The handle class preserves the positive form

\[
Q=\frac23
\begin{pmatrix}
2&0&-1&0\\
0&2&0&-1\\
-1&0&2&0\\
0&-1&0&2
\end{pmatrix}.
\]

Writing \(Q=L^TL\) and defining

\[
O_i=LH_iL^{-1},
\]

gives

\[
O_i^TO_i=I,\qquad O_i^2=I,\qquad \sum_iO_i=0.
\]

Thus the metric complication is removable without changing the linear relation among the three handles.

## 2. The redundant three-label dilation

Stacking the three normalized Kraus operators gives an isometry

\[
V_3=\frac1{\sqrt3}
\begin{pmatrix}
O_0\\O_1\\O_2
\end{pmatrix},
\qquad
V_3^TV_3=I_4.
\]

This is a valid \(12\times4\) Stinespring isometry, but it is not minimal. The vectorized operators span only a two-dimensional space because their sum vanishes.

Rotate the label space into its \(C_3\) singlet and doublet:

\[
K_{\mathbf1}=\frac13(O_0+O_1+O_2)=0,
\]

\[
K_1=\frac1{\sqrt6}(O_0-O_1),
\qquad
K_2=\frac1{\sqrt{18}}(O_0+O_1-2O_2).
\]

The surviving operators obey

\[
K_1^TK_1+K_2^TK_2=I_4.
\]

Hence

\[
V_{\min}=\begin{pmatrix}K_1\\K_2\end{pmatrix}
\]

is an \(8\times4\) minimal isometry. Its ancillary label space is two-dimensional and may be completed to an orthogonal, or after complexification unitary, dilation.

## 3. What the result means

The three handle orientations are an overcomplete zero-sum frame in a two-dimensional relationship plane. Their label permutation representation decomposes as

\[
\mathbb R^3\cong\mathbf1\oplus\mathbf2,
\]

but the singlet Kraus component vanishes. Only the \(\mathbf2\) enters the physical channel.

This cleanly separates three notions that had been easy to blur:

- **carrier:** the four-real-dimensional bilocal symplectic response;
- **environmental faces:** the two independent Kraus directions;
- **relationships:** the three conjugate involutions seen before quotienting the label redundancy.

The \(Spin_0(2,3)\cong Sp(4,\mathbb R)\) carrier is selected by the quadratic action of the relationships, not by retaining any one handle linearly.

## 4. What is not proved

An abstract Stinespring completion does not identify a microscopic bath. In particular, the two-dimensional environment has not been shown to be:

- the two independent covariant source legs required by the bilocal construction;
- a left/right or particle/antiparticle pair;
- a logical qubit or qudit;
- a pair of Goldstone modes;
- a topological edge doublet.

Those are now sharply testable identifications because the required dimension and \(C_3\) representation are fixed.

## 5. Stop-everything criteria

**Positive trigger:** derive the two minimal Kraus operators from two independently normalized Standard-Model/Furey covariant legs, with microscopic color cycling inducing the standard \(C_3\) action on their span.

**Dynamical trigger:** realize the minimal isometry as the reduced evolution of the positive quadratic pulse system already constructed for \(R\) and \(H\), without inserting an arbitrary environmental basis.

**Code trigger:** show that a canonical syndrome or logical subspace of the Standard-Model triorthogonal code carries these same two Kraus directions and reproduces the class-sum channel.

**Negative trigger:** if every microscopic two-leg realization produces a nonzero singlet Kraus component, then the exact zero-sum selector is an effective response idealization rather than a direct matter channel.

## 6. Position in the corpus

- [quadratic color-handle selector](839_color_twirling_kills_the_linear_handle_but_its_quadratic_relationship_channel_selects_the_unique_symplectic_carrier.md)
- [full selector class-sum covariance](848_the_quadratic_handle_twirl_is_a_central_class_sum_for_the_full_order_18_selector.md)
- [minimal bilocal carrier](855_no_linear_full_color_singlet_four_quotient_exists_but_the_minimal_bilocal_response_is_c2_with_canonical_j0.md)
- [typed Bogoliubov action](856_the_minimal_bilocal_c2_carrier_supports_the_full_selector_as_typed_two_mode_bogoliubov_transformations.md)
- [independent second-leg requirement](857_only_an_independent_covariant_second_leg_supplies_the_full_bilocal_c2_carrier_at_fixed_frequency.md)
- [positive Hamiltonian pulses](858_positive_quadratic_hamiltonian_pulses_generate_the_exact_bilocal_selector_without_finite_dimensional_instability.md)

**Subsequent cross-branch resolution:** document [944](944_a_unique_minimal_a2_doublet_environment_embeds_the_cyclotomic_source_into_the_balanced_selector_dilation.md) derives the same nontrivial $C_3$ doublet independently. It is the unique minimum reflection-stable environment that embeds the cyclotomic source characters $(0,3,3)$ into the balanced selector target $(2,2,2)$ while activating the trivial/common sector. The representation and dimension bridge is now exact; equality of microscopic Kraus operators remains open.

