# The Selector Redheffer Orbit Is a Lossless Feedback Cascade with Global Schur and Positive-Residue Control

**Date:** 17 October 2026  
**Branches:** selector orbit, Redheffer transport, rational-inner response, passivity, residues, and doubled sideband reality  
**Claim status:** global theorem for the constructed rational-inner response on the stated scattering charts; individual pole identification remains open  
**Certificate:** [factor_the_selector_redheffer_denominators_as_lossless_feedback_and_prove_global_schur_preservation.mjs](scripts/factor_the_selector_redheffer_denominators_as_lossless_feedback_and_prove_global_schur_preservation.mjs)

## Executive result

The analytic gate left open by the sampled audit can be closed for the constructed response without fitting high-degree denominator polynomials.

The selector action was defined in transfer coordinates by

\[
T_g(z)=G_gT(z)G_g^{-1}.
\]

Let

\[
K_g=\operatorname{Scat}(G_g).
\]

With the transfer convention used throughout the certificates, multiplication order becomes the reversed physical cascade, and the transported scattering response factors exactly as

\[
\boxed{
S_g(z)=K_{g^{-1}}\star S(z)\star K_g,
}

where (star) is the Redheffer cascade product.

For all eighteen selector elements, the certificate proves computationally that:

- (G_g) is (J)-unitary;
- (K_g) and (K_{g^{-1}}) are unitary scattering matrices;
- the cascade formula equals direct transfer conjugation;
- every fixed feedback block relevant to the denominators has operator norm (0) or (1/\sqrt5);
- the arithmetic checkpoint errors are below (5.2\times10^{-16}).

Since the rational-inner base satisfies

\[
\lVert S(z)\rVert<1,
\qquad \operatorname{Im}z>0,

\]

every feedback denominator is invertible by the Neumann criterion. Consequently no selector introduces an upper-half-plane pole, the full orbit remains Schur/passive, and the Cayley transforms have positive-semidefinite spectral weights.

This replaces the earlier statement “supported on 756 samples” by a global result for this explicit analytic family.

## 1. Exact Redheffer factorization

For two scattering matrices

\[
A=\begin{pmatrix}A_{11}&A_{12}\\A_{21}&A_{22}\end{pmatrix},
\qquad
B=\begin{pmatrix}B_{11}&B_{12}\\B_{21}&B_{22}\end{pmatrix},

\]

the cascade uses the feedback inverses

\[
D_L^{-1}=(I-A_{22}B_{11})^{-1},
\qquad
D_R^{-1}=(I-B_{11}A_{22})^{-1}.

\]

Its blocks are

\[
\begin{aligned}
(A\star B)_{11}
&=A_{11}+A_{12}B_{11}D_L^{-1}A_{21},\\
(A\star B)_{12}
&=A_{12}D_R^{-1}B_{12},\\
(A\star B)_{21}
&=B_{21}D_L^{-1}A_{21},\\
(A\star B)_{22}
&=B_{22}+B_{21}A_{22}D_R^{-1}B_{12}.
\end{aligned}
\]

The exact selector denominator therefore factors into two feedback stages.

First stage:

\[
K_{g^{-1}}\star S(z),

\]

with denominators

\[
\begin{aligned}
D_{1,L}(z)&=I-(K_{g^{-1}})_{22}S_{11}(z),\\
D_{1,R}(z)&=I-S_{11}(z)(K_{g^{-1}})_{22}.
\end{aligned}
\]

Second stage:

\[
(K_{g^{-1}}\star S(z))\star K_g,

\]

with denominators

\[
\begin{aligned}
D_{2,L}(z)
&=I-(K_{g^{-1}}\star S(z))_{22}(K_g)_{11},\\
D_{2,R}(z)
&=I-(K_g)_{11}(K_{g^{-1}}\star S(z))_{22}.
\end{aligned}
\]

This is a structural factorization of the complete rational denominator. It is more useful for analyticity than expanding a large scalar polynomial because each factor carries a direct norm bound.

## 2. Uniform invertibility in the upper half-plane

The selected base response has the orthogonal spectral form

\[
S(z)=\sum_{j=1}^4 b_{\gamma_j}(z)^2P_j,
\qquad
b_\gamma(z)=\frac{z-i\gamma}{z+i\gamma},

\]

with (gamma_j>0). Hence

\[
\lVert S(z)\rVert
=\max_j|b_{\gamma_j}(z)|^2
<1

\]

for every (operatorname{Im}z>0).

Unitarity of (K_g) implies that each scattering block is contractive. The explicit selector orbit gives the stronger bound

\[
\max\left(
\lVert(K_{g^{-1}})_{22}\rVert,
\lVert(K_g)_{11}\rVert
\right)
\le\frac1{\sqrt5}<1

\]

for every nontrivial feedback stage; the identity stages have zero feedback block.

Thus

\[
\lVert(K_{g^{-1}})_{22}S_{11}(z)\rVert<1.

\]

The first inverse exists by its convergent Neumann series. Lossless Redheffer composition maps the Schur class into itself, so the intermediate response is contractive. The strict (1/\sqrt5) bound on the second fixed block then gives

\[
\lVert(K_{g^{-1}}\star S(z))_{22}(K_g)_{11}\rVert<1,

\]

and the second inverse also exists.

Therefore

\[
\boxed{
S_g(z)\text{ is analytic and Schur for every }
g\text{ and every }\operatorname{Im}z>0.
}

## 3. Computational corroboration

The theorem is structural; the numerical grid is retained as a convention and implementation check.

Across the same (18\times42=756) selector/frequency samples, now including a more extreme range (0.01\le\operatorname{Im}z\le20), the certificate finds:

\[
\max\lVert S(z)\rVert=0.9995812344,
\]

\[
\max\text{ feedback norm product}=0.4461763116<1,
\]

\[
\min|\det D|=0.3959658937,
\]

\[
\max\lVert S_g(z)\rVert=0.9998479029,
\]

and direct-transfer versus star-cascade error below

\[
2.21\times10^{-14}.
\]

These figures are not the proof of global regularity; they verify the implementation of the exact factorization used in the proof.

## 4. Residue sign is now controlled globally

Define the Cayley transform, with a convention chosen so that the upper half-plane maps to matrices with positive imaginary part,

\[
H_g(z)=i(I+S_g(z))(I-S_g(z))^{-1}.
\]

Because (S_g) is rational Schur and inner on the real boundary, (H_g) is a rational matrix Herglotz function. Its representing measure is positive semidefinite. Therefore every finite real pole (m) has a positive-semidefinite spectral weight (W_m\succeq0):

\[
H_g(z)=C_g+D_gz+sum_m\frac{W_m}{m-z}.
\]

Equivalently, if the local Laurent expansion is written using (1/(z-m)), its residue coefficient is (-W_m\preceq0). This sign convention must not be mistaken for a negative physical spectral weight.

Thus the earlier possible falsifier—negative Cayley spectral weight after selector transport—is excluded for the constructed family.

The theorem does not say that the transported weights remain the original rank-one projectors. Feedback can move poles, mix their ranges and combine degeneracies while preserving positivity.

## 5. Doubled reality remains essential

The proof acts on the complex positive-frequency envelope. It does not restore the already-falsified identity

\[
S_{g,+}(z)=\overline{S_{g,+}(-\bar z)}.
\]

Real-time completion remains

\[
S_{g,-}(z)=\overline{S_{g,+}(-\bar z)},
\qquad
\mathbb S_g(z)=
\begin{pmatrix}S_{g,+}(z)&0\\0&S_{g,-}(z)\end{pmatrix}.
\]

The correct order is still

\[
S_+\xrightarrow{\Phi_g}S_{g,+}
\xrightarrow{\text{sideband completion}}\mathbb S_g.
\]

Analytic passivity and real-time typing are separate gates, and both are now explicit.

## 6. What has closed and what remains open

| Question | Status |
|---|---|
| Is the selector action an exact response-level group action? | **proved** |
| Does it factor as fixed lossless Redheffer cascades? | **proved** |
| Can a feedback denominator vanish in the open upper half-plane for this base family? | **no; globally excluded** |
| Does every transported response remain Schur/passive? | **proved** |
| Are Cayley spectral weights positive semidefinite? | **proved as a Herglotz consequence** |
| Does the undoubled envelope obey real-time reality? | **no; previously falsified** |
| Does doubled sideband completion obey reality? | **yes, exactly** |
| Are individual transformed pole locations available in radicals? | **not derived and not needed for the analytic theorem** |
| Are poles and residue ranges identified with Standard Model states or thresholds? | **open physical dependency** |
| Does the selector action arise from Furey's TRO/Jordan operations? | **open intertwiner dependency** |

## 7. Stop-everything and falsification criteria

**Mathematical falsifier:** an explicit (g) or (z) violating the star-factorization identity, (J)-unitarity, fixed-network unitarity, or the feedback norm bound. The complete eighteen-element certificate finds none.

**Domain warning:** a different base response that is merely boundary-unitary but not Schur in the upper half-plane does not inherit this theorem.

**Physical stop-everything signal:** derive the same lossless feedback factors (K_R,K_H), including their normalization, from a Standard Model stress/current response or from Furey's oriented matter intertwiners. That would identify the arithmetic selector with an independently derived causal scattering operation.

## 8. Position in the corpus

- [transfer-level color intertwiner and scattering-category typing](837_oriented_color_intertwines_exactly_at_transfer_level_but_not_as_an_ordinary_scattering_or_four_atom_action.md)
- [the exact discrete Redheffer action](828_the_selector_group_has_an_exact_redheffer_action_on_scattering_space_transporting_all_18_checkpoints_without_spectral_refitting.md)
- [the sampled analytic audit and sideband repair](829_the_redheffer_orbit_preserves_sampled_schur_passivity_but_requires_explicit_sideband_doubling_for_real_time_reality.md)
- [the selected-background coupled rational-inner response](826_the_arithmetic_checkpoint_rejects_two_independent_character_interferometers_but_has_an_exact_coupled_four_character_positive_residue_embedding.md)
- [the sideband-exchange real-time completion](781_a_sideband_exchange_real_structure_gives_the_complex_scattering_checkpoint_a_real_time_reciprocal_passive_completion.md)
- [the Jordan–Lie scale audit](835_jordan_lie_compatibility_and_ward_positivity_do_not_fix_the_dynamical_bracket_scale.md)

