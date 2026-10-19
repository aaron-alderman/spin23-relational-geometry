# Rescaling Naturality Classifies Linear Stress-to-Symplectic Maps but Leaves One Relative Normalization Free

**Date:** 17 October 2026  
**Branches:** stress-to-symplectic functor, source normalization, full-color invariant pencil, and ultraviolet benchmark  
**Claim status:** complete classification of linear diagonally natural maps; nonlinear and microscopic functors remain open  
**Certificate:** [classify_diagonal_rescaling_natural_linear_stress_to_symplectic_pencil_functors.mjs](../../../verification/classify/classify_diagonal_rescaling_natural_linear_stress_to_symplectic_pencil_functors.mjs)

## Executive result

Let

\[
C=\begin{pmatrix}C_{ss}&C_{st}\\C_{st}&C_{tt}\end{pmatrix}\succeq0
\]

be a two-sector stress spectral kernel, and let the target be the full-color invariant alternating pencil

\[
K_{a,b}=aK_s+bK_t.
\]

Require a linear map \(L:C\mapsto(a,b)\) to be natural under independent positive source rescalings

\[
D=\operatorname{diag}(r,s),
\qquad C\mapsto D^TCD,
\]

with the two forms transforming by pullback weights

\[
(a,b)\mapsto(r^2a,s^2b).
\]

Then the complete family is

\[
\boxed{
a=\alpha C_{ss},
\qquad
b=\beta C_{tt}.
}
\]

The natural-map space has dimension two. Positivity requires \(\alpha,\beta\ge0\); nondegeneracy on every positive-definite input requires both strictly positive.

Naturality therefore removes arbitrary mixing but leaves the relative normalization \(\beta/\alpha\) free.

## 1. Weight classification

The three coordinates of \(C\) transform with characters

\[
C_{ss}:r^2,
\qquad
C_{st}:rs,
\qquad
C_{tt}:s^2.
\]

The two target coefficient lines transform as \(r^2\) and \(s^2\). A linear equivariant map can connect only equal characters. Hence

\[
C_{ss}\to a,
\qquad
C_{tt}\to b,
\]

and the mixed correlator has nowhere to go.

The certificate obtains the same result by solving the full six-parameter intertwiner system against three generic diagonal rescalings. Its nullity is exactly two.

## 2. Off-diagonal stress coherence is excluded linearly

The cross correlator \(C_{st}\) cannot contribute linearly to either invariant alternating sector because its normalization weight is \(rs\), not \(r^2\) or \(s^2\).

This does not mean cross stress is physically irrelevant. It means that sending it to the symplectic pencil requires at least one additional typed object:

- a spurion of weight \(r/s\) or \(s/r\);
- a nonlinear normalized combination such as \(C_{st}/\sqrt{C_{ss}C_{tt}}\);
- an enlarged target containing a cross-sector alternating form;
- a chosen common normalization that reduces the independent rescaling group.

Full \(SU(3)\) supplies no invariant cross-sector alternating form, so the enlarged-target route must also change the representation content.

## 3. The free-UV benchmark does not choose a convention

For the conditional ultraviolet kernel

\[
C_{UV}=\operatorname{diag}(1,3),
\]

the output ratio is

\[
\frac ba=3\frac\beta\alpha.
\]

Two natural positive conventions already disagree:

### Total-weight convention

\[
\alpha=\beta=1
\quad\Longrightarrow\quad
(a,b)=(1,3).
\]

### Per-component convention

Normalize the triplet coefficient by its three identical color components:

\[
\alpha=1,
\qquad \beta=\frac13
\quad\Longrightarrow\quad
(a,b)=(1,1).
\]

Both respect source-rescaling naturality and positivity. The distinction is whether \(K_t\) is normalized as one total triplet form or as the sum of three equally normalized component forms.

This is precisely the missing physical normalization exposed by documents 847 and 849.

## 4. What could fix \(\beta/\alpha\)

Credible selectors are now sharply limited:

1. **Microscopic componentwise functor:** derive \(K_s\) and \(K_t\) by summing the same per-field construction; this would favor dimension-normalized coefficients.
2. **Operational total-weight functor:** define the forms through integrated spectral weight measured by one apparatus; this may favor total coefficients.
3. **Common action metric:** obtain both source and target norms from one Hessian, removing independent convention choices.
4. **Quantization/integrality:** an integral lattice or minimal charge may normalize the primitive forms.
5. **Ward or sum-rule normalization:** a fixed contact term or ultraviolet residue could calibrate both channels.

None follows from linear naturality alone.

## 5. Stop-everything criteria

**Positive trigger:** derive \(\alpha\) and \(\beta\) from one microscopic source-to-response rule and recover a nondegenerate \(K_{a,b}\) whose reduction gives \(J_0\).

**Negative trigger:** every admissible functor retains an arbitrary positive \(\beta/\alpha\). Then stress can populate the symplectic pencil but cannot select its pole direction.

**Nonlinear trigger:** a normalization-independent function of \(C_{st}^2/(C_{ss}C_{tt})\) generates the missing lock and passes positivity and threshold limits.

**Falsifier:** a third linearly independent natural map or a linear off-diagonal contribution. The exact character classification excludes both.

## 6. Verdict

| Question | Verdict |
|---|---|
| How many linear rescaling-natural maps exist? | **two-dimensional family** |
| Can diagonal stress weights populate both symplectic sectors? | **yes** |
| Can cross stress enter linearly? | **no** |
| Does positivity fix the relative normalization? | **no** |
| Does the free \(3:1\) input fix the output ratio? | **no** |
| What remains? | **derive \(\beta/\alpha\) microscopically or go nonlinear** |

## 7. Position in the corpus

- [conditional free-UV stress benchmark](849_free_uv_color_multiplicity_conditionally_gives_a_three_to_one_stress_weight_but_not_the_symplectic_pencil_ratio.md)
- [common Schur mediator does not select the ratio](847_a_common_schur_or_stress_mediator_transmits_but_does_not_select_the_singlet_triplet_symplectic_ratio.md)
- [full-color symplectic pencil](845_full_color_on_the_minimal_eight_real_carrier_leaves_two_symplectic_scales_and_does_not_select_the_unique_spin23_line.md)
- [nonlinear cross stress is unique only with composite-sector exchange](851_normalized_cross_stress_leaves_functional_freedom_unless_an_exact_composite_sector_exchange_forces_the_equal_line.md)

