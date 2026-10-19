# The Textured AIII Operator Is Fredholm When the Wall Mass Stays Gapped at Infinity

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08 and B11  
**Claim status:** continuum Fredholm theorem under explicit boundedness, asymptotic-limit and grading hypotheses; derivation of these hypotheses from the complete Furey/Standard-Model action remains open

## 1. Correcting the finite-to-continuum transition

The earlier finite chiral complex used unequal total grading dimensions to exhibit three forced zero modes by rank-nullity. That is a useful certificate, but it is not the continuum proof.

For a physical one-dimensional Dirac wall, the wall spinor has one \(C_{\rm w}=+1\) and one \(C_{\rm w}=-1\) fiber direction. With an internal \(8+7\) grading,

\[
\begin{aligned}
\operatorname{rank}\mathcal K_+
&=1\cdot8+1\cdot7=15,\\
\operatorname{rank}\mathcal K_-
&=1\cdot7+1\cdot8=15.
\end{aligned}
\]

The continuum fibers are balanced. The nonzero index is analytic and comes from the wall asymptotics, not a finite fiber-rank mismatch.

## 2. Continuum operator and domain

Let

\[
D_{\rm w,A}
=-i\sigma_x(\partial_x+A(x))+m(x)\sigma_z
\]

act on \(L^2(\mathbb R,\mathbb C^2)\), with wall grading

\[
C_{\rm w}=\sigma_y.
\]

Let the internal Hermitian Yukawa operator act on

\[
V=V_+\oplus V_-,
\qquad
\dim V_+=8N_g,
\qquad
\dim V_-=7N_g,
\]

with

\[
W=\operatorname{diag}(I_{8N_g},-I_{7N_g}),
\qquad
\{W,H_Y(x)\}=0.
\]

Define

\[
\boxed{
\mathcal D
=D_{\rm w,A}\otimes I_V
+C_{\rm w}\otimes H_Y(x)}
\]

on the Sobolev domain

\[
\operatorname{Dom}\mathcal D
=H^1(\mathbb R,\mathbb C^2\otimes V).
\]

The total grading is

\[
\mathscr S=C_{\rm w}\otimes W.
\]

If \([W,A(x)]=0\), then

\[
\{\mathscr S,\mathcal D\}=0.
\]

## 3. Sufficient analytic hypotheses

A clean sufficient set is:

1. \(m(x)\) is bounded, locally absolutely continuous and has nonzero limits
   \[
   m(x)\to m_\pm,\qquad m_\pm\ne0;
   \]
2. the wall changes sign,
   \[
   m_-<0<m_+;
   \]
3. \(H_Y(x)\) is bounded, Hermitian, \(W\)-odd and has limits \(H_{Y,\pm}\);
4. \(A(x)\) is bounded, commutes with \(W\), and tends to removable constant or pure-gauge limits;
5. coefficient differences from their two limiting half-line operators vanish at infinity;
6. all additional texture terms are bounded, \(\mathscr S\)-odd and decay or possess gapped limits.

Compact support is more than sufficient. Decay to zero in operator norm is the natural broader condition.

## 4. Self-adjointness

The free first-order Dirac operator is self-adjoint on \(H^1\). The mass, gauge and Yukawa terms above are bounded Hermitian multiplication operators. Kato–Rellich therefore gives a self-adjoint \(\mathcal D\) on the same domain.

No domain change is required as the bounded textures are varied continuously.

## 5. The asymptotic symbol has a protected gap

At either end, Fourier transformation gives

\[
\mathcal D_\pm(k)
=k\sigma_x\otimes I
+m_\pm\sigma_z\otimes I
+\sigma_y\otimes H_{Y,\pm}.
\]

The three wall matrices anticommute appropriately, so

\[
\boxed{
\mathcal D_\pm(k)^2
=k^2I+m_\pm^2I+I\otimes H_{Y,\pm}^2.}
\]

Since \(H_{Y,\pm}^2\succeq0\),

\[
\|\mathcal D_\pm(k)\psi\|^2
\ge(k^2+m_\pm^2)\|\psi\|^2.
\]

Therefore the asymptotic gap obeys

\[
\delta_\pm\ge|m_\pm|>0.
\]

The unmatched internal neutrino direction does not close the bulk gap. It merely has \(H_Y=0\), leaving the nonzero wall mass as its asymptotic gap.

## 6. Fredholm property

Compare \(\mathcal D\) with the operator that equals its limiting constant coefficients on the two half-lines. Multiplication by a bounded coefficient that vanishes at infinity is relatively compact with respect to a one-dimensional Dirac resolvent.

Consequently the essential spectrum is controlled by the two limit operators. Since both have a gap around zero,

\[
0\notin\sigma_{\rm ess}(\mathcal D).
\]

Thus the off-diagonal chiral block

\[
Q:\mathcal H_-\longrightarrow\mathcal H_+
\]

is Fredholm, and

\[
\operatorname{ind}Q
=\dim\ker Q-\dim\ker Q^\dagger
\]

is well defined.

## 7. Homotopy to the product representative

Scale the bounded Yukawa texture:

\[
H_Y(x)\longmapsto \tau H_Y(x),
\qquad
0\le\tau\le1.
\]

The asymptotic square remains

\[
k^2+m_\pm^2+\tau^2H_{Y,\pm}^2,
\]

so the gap cannot close. The AIII grading is preserved. Decaying gauge and nonfactorizing odd textures may be removed by the same type of gap-preserving homotopy.

At \(\tau=0\),

\[
\mathcal D\simeq D_{\rm w}\otimes I_V.
\]

On \(V_+\), the total grading equals \(C_{\rm w}\); on \(V_-\), it equals \(-C_{\rm w}\). Therefore

\[
\begin{aligned}
\operatorname{ind}_{\mathscr S}(D_{\rm w}\otimes I_V)
&=(\dim V_+)\operatorname{ind}_{C_{\rm w}}D_{\rm w}\\
&\quad-(\dim V_-)\operatorname{ind}_{C_{\rm w}}D_{\rm w}.
\end{aligned}
\]

Hence

\[
\boxed{
\operatorname{ind}_{\mathscr S}\mathcal D
=\nu_{\rm w}\left(\dim V_+-\dim V_-\right).}
\]

For a single sign wall, \(\nu_{\rm w}=1\), and for three uncompleted generations,

\[
\boxed{\operatorname{ind}_{\mathscr S}\mathcal D=3.}
\]

## 8. Stability class

The index survives:

- arbitrary bounded complex Yukawa textures that remain \(W\)-odd;
- flavor mixing and CP phases;
- bounded gauge transport commuting with \(W\);
- nonseparable wall/internal perturbations that remain \(\mathscr S\)-odd;
- compactly supported disorder;
- asymptotically constant deformations that retain nonzero \(m_\pm\).

It can change only if:

- an asymptotic wall mass reaches zero;
- zero enters the essential spectrum through another nondecaying channel;
- the operator domain or ellipticity changes;
- the total grading is broken;
- an additional asymptotic sector changes the Fredholm problem.

## 9. Dirac and Majorana forks

Adding one right-handed neutrino per generation changes the internal dimensions to \(8+8\). The same Fredholm theorem applies, but

\[
\dim V_+-\dim V_-=0,
\]

so the protected index vanishes.

A same-sector Majorana or Weinberg block instead satisfies

\[
\{W,H_M\}\ne0,
\]

and therefore breaks \(\mathscr S\). The AIII index is no longer the protecting invariant.

The two neutrino-mass mechanisms remain topologically distinct in the continuum theorem.

## 10. Remaining physical dependencies

This theorem does not yet prove:

- that the selector wall is a physical spacetime defect;
- that the Standard Model contains the required asymptotic sign change;
- that the complete Furey operator has the stated Sobolev domain;
- that gauge and gravitational anomalies preserve the grading;
- that the three analytic zero modes are the observed neutrinos rather than defect excitations;
- that \(N_g=3\) is derived rather than inserted.

The continuum mathematical gap is now closed conditionally; the physical realization remains open.

## 11. Stop-everything and falsification gates

**Stop-everything trigger:** the complete Furey/Standard-Model action produces this operator and its physical wall, with the analytic index identifying the observed generation count.

**Asymptotic trigger:** a source-derived stress or selector profile enforces \(m_-<0<m_+\) without an ad hoc external defect.

**Fredholm falsifier:** zero lies in the essential spectrum despite the claimed asymptotic gap.

**Texture falsifier:** a nondecaying perturbation with no invertible limit is treated as compact.

**Index falsifier:** the continuum result is justified by unequal fiber ranks rather than the wall Fredholm index.

**Majorana falsifier:** the AIII integer is retained after adding a same-sector grading-breaking mass.

**Generation falsifier:** the formula \(N_g\) is presented as a derivation of \(N_g=3\).

## 12. Certificate

The [continuum AIII Fredholm-gap certificate](scripts/verify_continuum_aiii_fredholm_gap_and_product_index.mjs) checks the total grading, asymptotic symbol-square identity, gap-preserving texture homotopy, equal continuum fiber ranks, product-index count, Dirac balancing and Majorana grading failure.

## Companion documents

- [Textured joint AIII index](320_the_textured_joint_operator_has_a_three_generation_aiii_index_beyond_kernel_factorization.md)
- [Gauge-covariant Yukawa transport](319_gauge_covariance_preserves_the_deck_lift_but_yukawa_transport_controls_kernel_factorization.md)
- [Joint wall–Yukawa kernel](318_the_graded_wall_yukawa_sum_localizes_exactly_one_forced_zero_per_generation.md)
- [Fifteen-state Yukawa neutrino zero](312_the_fifteen_state_yukawa_grading_forces_one_neutrino_zero_mode_per_generation.md)
