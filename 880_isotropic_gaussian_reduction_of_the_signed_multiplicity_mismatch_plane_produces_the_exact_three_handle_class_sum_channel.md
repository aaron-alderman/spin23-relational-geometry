# Isotropic Gaussian Reduction of the Signed Multiplicity Mismatch Plane Produces the Exact Three-Handle Class-Sum Channel

**Date:** 17 October 2026  
**Branches:** middle-frame effective action, Gaussian/Feshbach reduction, signed multiplicity environment, handle class-sum channel, and \(Sp(4,\mathbb R)\) response  
**Claim status:** exact effective-channel theorem; microscopic color-singlet bath reduction and frame alignment remain open  
**Certificate:** [derive_the_handle_class_sum_as_gaussian_reduction_of_the_signed_multiplicity_mismatch_plane.mjs](scripts/derive_the_handle_class_sum_as_gaussian_reduction_of_the_signed_multiplicity_mismatch_plane.mjs)

## Executive result

The signed multiplicity mismatch plane does not merely resemble the minimal handle environment. If treated as an isotropic Gaussian auxiliary sector and coupled through the frame isometry of document 879, integrating it out produces exactly the established three-handle class-sum channel.

Let

\[
P_{\rm std}
=I_3-\frac13\mathbf1\mathbf1^T
=\frac13L_{K_3}
\]

be the projector onto the zero-sum label plane. Let \(O_0,O_1,O_2\) be the whitened handle involutions, satisfying

\[
O_0+O_1+O_2=0.
\]

Then for every carrier matrix \(X\),

\[
\boxed{
\frac13\sum_{i,j}
(P_{\rm std})_{ij}O_iXO_j^T
=
\frac13\sum_iO_iXO_i^T.
}
\]

The right side is precisely the handle class-sum channel.

Factoring \(P_{\rm std}\) into two orthonormal standard-plane directions gives exactly the two minimal Kraus operators previously obtained by Stinespring reduction.

This closes the effective Gaussian source-to-Kraus bridge. The remaining physical gate is whether the actual matter mismatch sector can be contracted to this colorless two-dimensional bath.

## 1. Gaussian mismatch covariance

The residual middle-frame energy, after subtracting its universal synchronized eigenvalue, is proportional to

\[
y^TL_{K_3}y
\]

on the switched multiplicity variables

\[
y=(u,d,-u^c).
\]

The singlet direction \(\mathbf1\) is the synchronized active mode. On the orthogonal zero-sum plane,

\[
L_{K_3}=3I.
\]

The Moore--Penrose inverse is

\[
L_{K_3}^+=\frac13P_{\rm std}.
\]

Therefore an isotropic Gaussian governed by this quadratic form has covariance proportional to \(P_{\rm std}\). Overall temperature, coupling or response normalization changes only the scalar prefactor.

## 2. Coupling the mismatch labels to handles

Use the exact frame map

\[
e_i\mapsto O_i/\sqrt2.
\]

At the redundant three-label level, a Gaussian covariance \(P_{\rm std}\) induces the quadratic carrier superoperator

\[
\Phi_P(X)
=\frac13\sum_{i,j}(P_{\rm std})_{ij}O_iXO_j^T.
\]

Since

\[
P_{\rm std}=I_3-\frac13J_3,
\]

the singlet correction is

\[
-\frac19
\left(\sum_iO_i\right)
X
\left(\sum_jO_j\right)^T=0.
\]

Hence

\[
\Phi_P(X)
=\frac13\sum_iO_iXO_i^T
=\mathcal E_{\rm handle}(X).
\]

The equality holds as a complete superoperator identity, not only on a chosen set of states.

## 3. Minimal Kraus factorization

Choose an orthonormal basis of the standard label plane:

\[
q_1=\frac1{\sqrt2}(1,-1,0),
\qquad
q_2=\frac1{\sqrt6}(1,1,-2).
\]

Then

\[
P_{\rm std}=q_1q_1^T+q_2q_2^T.
\]

The induced Kraus operators are

\[
\begin{aligned}
K_1
&=\frac1{\sqrt3}\sum_i(q_1)_iO_i
=\frac1{\sqrt6}(O_0-O_1),\\
K_2
&=\frac1{\sqrt3}\sum_i(q_2)_iO_i
=\frac1{\sqrt{18}}(O_0+O_1-2O_2).
\end{aligned}
\]

These are exactly the minimal Kraus operators of document 859. They obey

\[
K_1^TK_1+K_2^TK_2=I_4.
\]

Thus the Gaussian mismatch reduction is trace preserving after the established normalization and has minimal environment dimension two.

## 4. Why this is more than a representation match

Before this calculation, the matter edge plane and handle environment were known to be isometric abstract frames. The new result identifies the complete quadratic operation:

\[
\boxed{
\text{isotropic covariance on matter mismatches}
\longmapsto
\text{handle class-sum CP channel}.
}
\]

All cross terms are controlled by the standard-plane covariance, and they reduce exactly to the diagonal class sum because the handle singlet vanishes.

No background-by-background fitting or arbitrary Kraus rotation is needed after the cyclic frame alignment is chosen.

## 5. Relation to Feshbach/Jordan recursion

The effective chain is now

\[
\begin{aligned}
&\text{Furey middle-slot triple}\\
&\quad\Longrightarrow
\text{positive frame operator}\\
&\quad\Longrightarrow
\text{signed-}K_3\text{ mismatch action}\\
&\quad\Longrightarrow
\text{standard-plane Gaussian covariance}\\
&\quad\Longrightarrow
\text{two-Kraus handle channel on the bilocal carrier}.
\end{aligned}
\]

This is an explicit “nested dolls” construction:

- the middle matter operator is characterized by all outer ternary relations;
- its transverse mismatches form a Gaussian relational environment;
- integrating that environment produces the quadratic handle selector;
- the selector acts on the four-real bilocal symplectic carrier.

The known Feshbach polarization then supplies the Jordan triple on a two-face response once that carrier’s symmetric kernels span \(H_2(\mathbb R)\).

## 6. The color-factor obstruction

The actual matter kernel is

\[
\mathbb R^3_{\rm mult}\otimes I_{\rm color}.
\]

Its transverse sector is

\[
E_{\rm edge}\otimes I_{\rm color},
\]

of real dimension four, not two.

The two-dimensional covariance used above is the **multiplicity label covariance after contracting the color augmentation factor**. Such a contraction is natural for a gauge-singlet response because the \(C_3\)-invariant metric on \(I\) is unique up to scale. But the physical reduction must still be demonstrated.

Two possibilities must be distinguished:

1. **color is traced/contracted:** only the multiplicity label doublet remains, giving the derived handle channel;
2. **color information remains in the environment:** the minimal bath can have dimension four and the resulting channel need not equal the two-Kraus class sum.

This is now the principal microscopic gate.

## 7. The cyclic-alignment obstruction

The Gaussian calculation also assumes that the cyclic matter-edge labels have been aligned with the cyclic handle labels. The abstract isometry proves such an alignment exists. Standard-Model gauge data do not choose it because the multiplicity cycle is not microscopic color.

A physical alignment could come from:

- Higgs-dressed response ordering;
- a boundary or Floquet holonomy;
- a Jordan source convention fixed by the two outer legs;
- the sewn ribbon’s oriented seam data;
- an emergent diagonal \(C_3\) in the effective response theory.

Until one is derived, the result is an exact conditional effective model.

## 8. Stop-everything and falsification criteria

**Gaussian-action trigger:** integrating the two outer Furey/Jordan legs yields the signed-\(K_3\) transverse quadratic action with no extra anisotropic term.

**Color-trace trigger:** gauge-singlet contraction of \(I_{\rm color}\) leaves exactly \(P_{\rm std}\) on multiplicity labels and no residual color Kraus index.

**Alignment trigger:** Higgs/ribbon/boundary data canonically pair the three matter edges with the three handle orientations.

**Full-channel trigger:** the resulting reduced carrier map agrees with the handle class sum before any fitted Kraus rotation.

**Negative trigger:** tracing color is forbidden or leaves a rank-four Choi environment.

**Falsifier:** claiming that Gaussianity alone identifies the channel. Isotropy, color contraction and cyclic frame alignment are all required.

## 9. Verdict

At effective quadratic level, the matter-to-handle map now closes:

\[
\boxed{
P_{\rm std}^{\rm mismatch}
\xrightarrow{\ e_i\mapsto O_i/\sqrt2\ }
\mathcal E_{\rm handle}
=\frac13\sum_iO_i(\cdot)O_i^T.
}
\]

The algebraic and completely positive channel structures agree exactly. The remaining work is physical rather than formal: derive the color-singlet Gaussian reduction and the cyclic label alignment from the Jordan/Furey/Standard-Model system.

## 10. Dependencies

- [triangular-frame isometry and typing boundary](879_the_signed_multiplicity_edges_and_the_three_handle_kraus_operators_are_the_same_zero_sum_triangle_as_abstract_frames_but_their_c3_actions_are_differently_typed.md)
- [basis-independent middle-slot frame](878_the_basis_independent_middle_slot_frame_of_the_furey_triple_selects_the_same_signed_k3_active_module.md)
- [minimal handle Stinespring environment](859_the_three_handle_class_sum_has_a_minimal_two_dimensional_relational_environment.md)
- [Jordan triple as Feshbach polarization](668_the_jordan_triple_is_the_polarization_of_feshbach_relational_self_energy.md)
- [bilocal \(Sp(4)\) carrier](856_the_minimal_bilocal_c2_carrier_supports_the_full_selector_as_typed_two_mode_bogoliubov_transformations.md)
