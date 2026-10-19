# The Graded Wall–Yukawa Sum Localizes Exactly One Forced Zero per Generation

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08 and B11  
**Claim status:** exact kernel-product theorem for a grading-preserving sign wall; derivation of this operator from the full Furey/Standard-Model action remains open

## 1. From comparison to a joint operator

The programme previously had two zero-mode statements:

- an internal \(8+7\) Yukawa rank imbalance forces at least one neutrino zero per generation;
- a sign-changing one-dimensional Dirac mass can bind one spatial wall zero.

Merely observing both is not a synthesis. They must occur in one operator. There is a canonical graded construction that does exactly this.

## 2. The wall operator

Take the one-dimensional sign-wall Dirac operator

\[
D_{\rm w}=-i\sigma_x\partial_x+m(x)\sigma_z,
\qquad
m(-\infty)<0<m(+\infty).
\]

It has the fixed chiral grading

\[
C_{\rm w}=\sigma_y,
\qquad
\{C_{\rm w},D_{\rm w}\}=0.
\]

At zero energy,

\[
\partial_x\psi+m(x)\sigma_y\psi=0.
\]

Choosing the normalizable \(\sigma_y\) eigenspinor gives

\[
\psi_0(x)\propto
\exp\!\left[-\int_0^x m(s)\,ds\right]\chi,
\]

and hence one wall zero for a simple sign change.

This is the grading-preserving representative of the lifted half-turn. It uses only the antipodal endpoint masses \(\pm\sigma_z\); it does not yet assume that an arbitrary smooth rotation through the full selector plane preserves the zero.

## 3. The internal Yukawa operator

For one Standard-Model generation without \(\nu^c\),

\[
H_Y=
\begin{pmatrix}
0&M_{8\times7}\\
M^\dagger&0
\end{pmatrix}.
\]

The \(8+7\) imbalance gives

\[
\dim\ker H_Y\ge1.
\]

For three generations, with generic nonzero charged-fermion Yukawas,

\[
\dim\ker H_Y=3.
\]

These are the three unmatched neutrino directions.

## 4. The graded Clifford sum

Define

\[
\boxed{
\mathcal D
=D_{\rm w}\otimes I_{15N_g}
+C_{\rm w}\otimes H_Y.}
\]

Because \(C_{\rm w}^2=I\) and \(\{C_{\rm w},D_{\rm w}\}=0\),

\[
\boxed{
\mathcal D^2
=D_{\rm w}^2\otimes I
+I\otimes H_Y^2.}
\]

Both terms on the right are positive. Therefore

\[
\langle\Psi,\mathcal D^2\Psi\rangle=0
\]

if and only if each term vanishes separately. This proves

\[
\boxed{
\ker\mathcal D
=\ker D_{\rm w}\otimes\ker H_Y.}
\]

The zero modes are not merely numerically equal in number; they are tensor products of the same spatial and internal kernels.

## 5. Three-generation consequence

For a wall of index one and the uncompleted Standard-Model Yukawa complex,

\[
\dim\ker\mathcal D
=1\times3=3.
\]

Thus the graded joint operator localizes exactly one forced neutrino zero per generation.

Adding one \(\nu^c\) per generation permits \(H_Y\) to become full rank, eliminating the internal factor of the kernel. A Majorana/Weinberg block breaks the internal bipartite grading and can likewise lift or split the localized modes.

This supplies a concrete meeting point for the 15-state, Clifford and domain-wall branches.

## 6. Why the quarter-turn wall is different

A smooth selector-angle wall uses

\[
D_\theta=-i\sigma_x\partial_x+
m\bigl(\cos\theta(x)\sigma_z+\sin\theta(x)\sigma_y\bigr).
\]

The transverse component is proportional to the would-be grading \(C_{\rm w}=\sigma_y\). Hence

\[
\{C_{\rm w},D_\theta\}
=2m\sin\theta(x)\,I.
\]

Unless \(\sin\theta(x)=0\), the fixed grading is broken and the square of the proposed joint operator acquires cross terms. The kernel-product theorem no longer applies.

This algebra explains the previous interface result:

- the sign wall with antipodal masses has an exact graded zero;
- the \(\pi/2\) wall generically has a shifted subgap level;
- a smooth half-turn needs an additional symmetry, enlarged Clifford representation or bundle connection to keep the zero pinned.

## 7. Relation to the selector bundle lift

The unitary deck transition

\[
g=\sigma_x
\]

commutes with the kinetic matrix \(\sigma_x\) and flips the sign-wall mass:

\[
gD_{\rm w}[m]g^{-1}=D_{\rm w}[-m].
\]

This is precisely the equivariance required at the antipodal selector identification. But the joint construction still needs:

- a globally consistent domain and transition condition;
- gauge-equivariance on all 15 internal states;
- identification of \(g\) inside the existing Furey/CAR carrier;
- an anomaly and symmetry-class audit.

The kernel theorem is exact once those hypotheses hold; it does not prove them.

## 8. A full-selector completion

The four-component bundle lift from the previous branch can preserve a fixed grading while the selector explores all three directions. One can seek a larger wall operator

\[
\widetilde D_{\rm w}
=-i\alpha\partial_x+\sum_{a=1}^3m_an(x)\beta_a
\]

with an additional matrix \(\widetilde C\) anticommuting with \(\alpha\) and every \(\beta_a\). The joint construction then repeats:

\[
\widetilde{\mathcal D}
=\widetilde D_{\rm w}\otimes I+
\widetilde C\otimes H_Y.
\]

The cost is extra Clifford dimension. The full-selector lift is credible only if those matrices are supplied by the already present Lorentz/Nambu/Furey factors, not by adding independent mirror states.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the common 30-dimensional Furey/CAR carrier realizes the joint graded operator without new states, giving one gauge-consistent localized neutrino per generation.

**Kernel trigger:** the physical wall/domain conditions make \(D_{\rm w}\) Fredholm with index one and preserve the displayed sum-of-squares identity.

**Completion trigger:** the existing Nambu or Lorentz Clifford factor supplies the full-selector \(\widetilde C\) without independent doubling.

**Smoothing falsifier:** the sign-wall kernel theorem is asserted for a smooth two-mass rotation even though the transverse mass breaks \(C_{\rm w}\).

**Tensor-product falsifier:** equality of zero counts is presented as kernel factorization without the anticommuting graded sum.

**Gauge falsifier:** the wall grading or deck transition mixes Standard-Model representations with unequal gauge charges.

**Overcounting falsifier:** the wall Clifford factor is interpreted as new internal matter rather than spacetime spinor structure.

## 10. Certificate

The [joint wall–Yukawa kernel certificate](../../../verification/verify/verify_joint_wall_yukawa_kernel_product.mjs) uses finite chiral complexes to verify the Clifford-square identity, exact kernel multiplication, three-generation count and failure after a transverse grading-breaking mass is introduced.

## Companion documents

- [Selector bundle-lift classification](317_the_selector_great_circle_has_a_unique_exchange_bundle_lift_but_full_rp2_requires_doubling.md)
- [Quarter-turn subgap versus half-turn zero](316_the_quarter_turn_binds_a_subgap_state_while_the_rp2_half_turn_can_bind_a_zero.md)
- [Fifteen-state Yukawa neutrino zero](312_the_fifteen_state_yukawa_grading_forces_one_neutrino_zero_mode_per_generation.md)
- [Massless Clifford neutrino cone](313_the_yukawa_zero_mode_extends_to_a_massless_dirac_type_cone.md)
- [Common carrier without independent overcounting](310_tensoring_the_selector_pair_with_the_nambu_pair_overcounts_the_generation.md)
