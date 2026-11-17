# Can a common action fix the Yukawa coupling and vacuum scale?

**Date:** 8 November 2026  
**Status:** bounded source audit and conditional single-trace calculation; no predicted physical T1/T2 rest gap  
**Parent:** [action-level mass-gap gate](T1_T2_ACTION_AND_MASS_GAP.md)  
**Evidence:** [normalization and scale audit](../../../evidence/data/yukawa-vacuum-scale-selection-v1.json), [source-check receipts](../../../evidence/data/yukawa-vacuum-source-checks-v1.json)  
**Certificate:** [normalization/scale verifier](../../../verification/verify/verify_yukawa_vacuum_scale_selection.mjs)

The target is the physical rest energy after kinetic normalization. Neither a number called a Yukawa coupling nor a coordinate called a vacuum expectation value is independently sufficient. In a canonical one-channel classical background, the target is \(\Delta=|g_{\rm phys}v_{\rm can}|\). For several channels it is the smallest physical mass singular value, provided no unmatched zero modes remain. In an interacting theory the target becomes an appropriately defined pole or spectral threshold, with gauge and renormalization effects controlled.

## 1. A stronger common-action condition than independent couplings

The previous [rescaling counterfamily](T1_T2_ACTION_AND_MASS_GAP.md#2-the-scalar-action-gives-a-conditional-dynamical-gap) held the scalar kinetic term and potential fixed while changing its independent Yukawa coefficient. It rules out a prediction from those structural constraints alone. It does not rule out an additional action principle tying all three coefficients together.

The corpus has a concrete opening in [claim 1110](../../claims/1100-1199/1110_the_minimal_spectral_kinetic_metric_can_be_normalized_to_the_Jordan_face_but_quartic_exchange_forces_the_Q_Majorana_block_to_rank_one.md). For a finite coefficient block \(C\), the same trace construction yields

\[
Z=\operatorname{Tr}(C^\dagger C),\qquad
W=\operatorname{Tr}[(C^\dagger C)^2],\qquad
\rho=W/Z^2.
\]

The scalar kinetic normalization uses \(Z\), while its normalized quartic retains \(\rho\). These are exact statements in the claim's minimal block-factorized model. Claim 1110 does not itself fix the quadratic potential, spectral cutoff moments, full physical fermion action or a T1/T2 identification.

To test the strongest possible cancellation, explicitly assume a real scalar coordinate \(u\), canonically normalized fermions, a fermion mass block \(uC\), and the single-trace completion

\[
\mathcal L_{\rm scalar}=
\frac{kZ}{2}(\partial u)^2-V(u),\qquad
V(u)=-\frac{a\Lambda^2Z}{2}u^2+\frac{bW}{4}u^4,
\quad a,b,k,\Lambda>0.
\]

This is a declared comparison action using the corpus's trace invariants. The quadratic term and coefficient matching are additional assumptions here, not a newly recovered physical Spin(2,3) action. Multiplicities and convention factors are absorbed into \(a,b,k\). Extra scalar paths or independent trace terms need not retain this form.

Let \(s_i\) be the singular values of \(C\), and write

\[
r_i=s_i^2/Z,\qquad \sum_i r_i=1,\qquad \rho=\sum_i r_i^2.
\]

Minimizing the potential and using \(\phi=\sqrt{kZ}\,u\) gives

\[
u_0^2=\frac{a\Lambda^2Z}{bW},\qquad
g_i^2=\frac{r_i}{k},\qquad
v_{\rm can}^2=\frac ab\frac{k\Lambda^2}{\rho},
\]

and therefore

\[
\boxed{\Delta_i^2=g_i^2v_{\rm can}^2
=\frac ab\Lambda^2\frac{r_i}{\rho}.}
\]

The common amplitude \(C\mapsto tC\), \(t>0\), cancels from all three canonical quantities. Indeed it can be absorbed by \(u\mapsto u/t\) in this linked action. That cancellation removes a coordinate redundancy; it is not a dynamical selection of a preferred bare amplitude.

This is a genuine refinement of the previous independent-Yukawa example: a complete common action can remove an apparent free parameter. It leaves the cutoff/moment combination \((a/b)\Lambda^2\), the kinetic coefficient relevant to the separate canonical coupling, and the singular-value shape unless further conditions determine them.

## 2. The product is still not fixed by trace normalization

For a one-singular-value block, \(r=\rho=1\), so

\[
\Delta^2=(a/b)\Lambda^2.
\]

The Yukawa amplitude has disappeared, but the physical scale is now carried by action coefficients and a cutoff/matching scale. Choosing units with \(\Lambda=1\) does not predict that scale relative to another measured mass.

For two full-rank blocks with the same trace norm, compare

\[
(r_1,r_2)=(1/2,1/2)\quad\hbox{and}\quad(4/5,1/5).
\]

The first has \(\Delta_{\min}^2/[(a/b)\Lambda^2]=1\); the second has \(5/17\). Both retain the same block support, rank, trace norm and positive kinetic/potential assumptions. Shape therefore remains a physical freedom under these constraints. This comparison does not preserve an additional fixed quartic-shape constraint: imposing such a constraint would strengthen the problem.

In claim 1110, exact quartic exchange between a rank-one face and its two-dimensional partner forces that partner to rank at most one in the minimal model. That constrains shape, but leaves a zero singular value if one tries to interpret the entire two-dimensional block as uniformly massive. It is not a proof of a positive gap for every state.

## 3. A stable scalar vacuum does not determine edge Yukawas

[Claim 1542](../../claims/1500-1599/1542_the_six_link_potential_has_no_forced_goldstone_and_an_open_full_rank_vacuum_but_scalar_identification_does_not_derive_the_common_ray.md) supplies a bounded-below six-link potential with an isolated stable vacuum modulo gauge. It can make every link VEV nonzero and the finite Dirac matrix full rank.

Its witness uses unit-valued VEVs in chosen units and chosen potential coefficients. Identifying repeated-charge scalar fields still leaves independent Yukawa maps multiplying their shared VEV. The existence of a stable vacuum and generic full rank therefore do not fix its dimensional scale or the masses.

[Claim 1573](../../claims/1500-1599/1573_a_single_tilted_Yukawa_ray_rotates_the_two_copy_inert_projector_but_a_two_ray_tight_frame_can_close_it.md) gives a promising shape condition: two signed rays can satisfy \(\sum_r y_r^\dagger y_r=I\), cancelling an off-diagonal one-loop rotation. Their common rescaling gives \(|t|^2I\), preserving isotropy. A trace/action normalization could remove this common amplitude as above, but that extra matching has not been derived for the physical T1/T2 carrier. A tight-frame direction condition alone is not an absolute coupling prediction.

## 4. The strongest vacuum-scale construction retains boundary data

[Claim 1612](../../claims/1600-1699/1612_a_radiative_selector_portal_joins_spin23_planck_and_yang_mills_scales_but_retains_one_color_boundary.md) contains a positive one-loop Gildener–Weinberg selector portal. Its tree quartics have a flat ray at a supplied matching scale. Along that ray,

\[
V_1(r)=A_{\rm GW}r^4+B_{\rm GW}r^4\log(r^2/\mu_{\rm GW}^2),
\qquad B_{\rm GW}>0.
\]

The radiative minimum and radial curvature are

\[
v=\mu_{\rm GW}\exp[-1/4-A_{\rm GW}/(2B_{\rm GW})],\qquad
m_\sigma^2=8B_{\rm GW}v^2>0.
\]

The source benchmark gives \(v/\mu_{\rm GW}\simeq5.489251\). Thus a minimum is genuinely determined within a specified running action. It does not select the RG trajectory or its integration constant. Scaling the entire dimensional boundary scale changes \(v\) proportionally while retaining the dimensionless ratios; this means comparing different boundary data, not arbitrarily changing a renormalization point on the same trajectory.

The construction also derives, under its restricted vacuum-energy assumptions,

\[
g_A^2=\frac{B_{\rm GW}}{6\xi n_\chi^4}.
\]

This is a conditional Cartan-normalization relation, not the fermion Yukawa coupling \(g\). Equating the two merely because both are couplings would introduce the missing unification assumption. The portal retains its dimensionless inputs, Cartan matching, absolute transmutation scale and color boundary coupling. Its gauge-fixed induced-gravity parent also has an outstanding fully covariant constraint gate.

Adding a physical Yukawa-coupled fermion to this model changes the loop potential. Its contributions to \(A_{\rm GW},B_{\rm GW}\), stability and thresholds must be recomputed; the existing bosonic benchmark cannot simply be reused to predict that fermion's gap.

## 5. What would close the remaining freedom

The inspected corpus does not supply a single selected, normalized physical action that fixes both the Yukawa block and its vacuum scale. The viable next target is narrower than demanding a number for every bare parameter:

1. Identify the same physical finite block in the fermion vertex, scalar kinetic trace and potential; derive their relative coefficients and allowed extra invariants.
2. Fix its singular-value shape and a nonzero lower bound, while respecting any unmatched-sector index and global selector lift.
3. Derive an independent relation for the remaining dimensionless spectral moments/couplings and the RG boundary trajectory.
4. Predict \(\Delta/M_{\rm ref}\) for an independently defined physical reference scale; one external dimensional calibration can then set units without fitting the target mass.
5. Carry the relation through canonical normalization, thresholds and the full allowed counterterm module.

The last condition is substantive: [claim 1530](../../claims/1500-1599/1530_the_common_coefficient_line_is_RG_invariant_only_under_universal_projective_flow_and_a_fixed_ratio_requires_a_Ward_eigenline.md) distinguishes a running common ray from a protected fixed ratio. An equality imposed at a cutoff is not by itself a low-energy mass prediction.

**Decision:** a common spectral action can remove the independent bare-amplitude rescaling in a restricted single-trace completion. The corpus has not yet fixed the remaining shape, coefficient/matching scale and physical T1/T2 identification needed to predict \(\Delta\). This refines the earlier counterexample without promoting the comparison action to a physical derivation.

The [reference-mass continuation](SPECTRAL_MASS_RATIO_CLOSURE.md) now computes the relative kinetic/quartic coefficient in a specific flat Dirac model and cancels the common quadratic scale against its own scalar fluctuation mass. This produces a conditional mass ratio without choosing the cutoff moments. It also checks the still-free spectral shape, full-operator cross-block rank repair and a truncated-vacuum negative control; none is a physical T1/T2 identification.
