# Dynamical finite Dirac operators and full-action stability

**Date:** 8 November 2026  
**Status:** bounded corpus audit, exact flat constant-mass monotonicity result and conditional stabilizer comparison; no physical T1/T2 mass ratio  
**Parent:** [spectral coefficient and shape closure](SPECTRAL_MASS_RATIO_CLOSURE.md)  
**Evidence:** [full-action audit](../../../evidence/data/dynamical-finite-dirac-full-action-v1.json)  
**Certificate:** [full-action verifier](../../../verification/verify/verify_dynamical_finite_dirac_full_action.py)

The question is whether the mass-carrying finite operator can vary, acquire a stable finite spectrum, and share a physical scalar excitation whose mass provides the reference. Allowing a variation, stabilizing its singular values, fixing its orientation and obtaining positive-norm propagating modes are different requirements.

## 1. The corpus identifies the missing dynamical field

[Claim 1198](../../claims/1100-1199/1198_the_charge_three_link_has_a_scalar_flavon_versus_dynamical_cross_peirce_fork_separating_bf_closure_from_flavour_closure.md) distinguishes

\[
\Phi=sK
\]

with a dynamical scalar \(s\) and fixed family map \(K\), from a theory in which \(K\) or the complete link is dynamical. The first supplies a Higgs/topological sector while inserting family direction and strengths as spurion data. The second needs its own kinetic term and response potential \(V(P,K)\); that potential is left open.

[Claim 1195](../../claims/1100-1199/1195_a_charge_three_cross_peirce_vacuum_completes_the_rank_split_to_a_full_jordan_frame_but_needs_response_to_gap_cp1.md) shows that a nonzero dynamical link completes a Jordan frame but leaves directional \(\mathbb{CP}^1\) modes for a norm-only potential. Whether those are physical Goldstones depends on which transformations are global rather than gauged. [Claim 1196](../../claims/1100-1199/1196_no_u3_covariant_effective_action_of_one_projector_can_select_its_orientation_so_closure_requires_a_second_family_tensor.md) requires another family tensor to select an orientation.

Inner fluctuations provide scalar degrees of freedom built from a chosen finite geometry; they are not by themselves an integration over all finite Dirac matrices. The corpus's [generalized-fluctuation audit](../../claims/1100-1199/1105_the_generalized_quadratic_inner_fluctuation_is_a_first_order_defect_dressing_not_the_square_of_the_charge_three_family_edge.md) also prevents replacing the actual opposite-algebra fluctuation by an arbitrary square of a family link. Neither construction establishes a full physical variation domain for the desired spectrum.

## 2. Exact full-cutoff obstruction in the inspected flat model

Consider the same flat four-dimensional Dirac/scalar model as the preceding calculation, with a constant Hermitian mass matrix. Let

\[
s_i=m_i^2/\Lambda^2,\qquad F(t)=f(\sqrt t)\ge0,
\]

where the cutoff is integrable with the moments needed below. The exact four-momentum integral, including four spin components, gives the action density

\[
\mathcal V=\frac{\Lambda^4}{4\pi^2}\sum_i W(s_i),
\qquad W(s)=\int_s^\infty(t-s)F(t)\,dt.
\]

Differentiation yields

\[
\boxed{W'(s)=-\int_s^\infty F(t)\,dt\le0},\qquad
\boxed{W''(s)=F(s)\ge0}.
\]

Where the cutoff has a positive tail, the first inequality is strict. Increasing an independently variable squared mass lowers the action, and the infimum is approached at infinite mass. With a compactly supported cutoff, all masses above its support instead have an undetermined flat action value. Neither case selects a unique finite positive mass radius.

This strengthens the Gaussian example: monotonicity follows from cutoff positivity, not monotonicity of the cutoff profile. It is exact in this flat continuum constant-mass model. It is not a no-go for curved/compact backgrounds, nonconstant fields, constrained variation domains, fermionic determinants, extra potentials or all spectral actions.

Consequently, merely promoting every entry of this mass matrix to a variable does not complete the proposed mechanism. A polynomial heat truncation cannot supply a stable full-action minimum where the exact density has none.

## 3. A fixed radius selects shape but removes the reference radial mode

If an additional condition fixes

\[
\sum_i s_i=R,
\]

convexity gives

\[
\sum_i W(s_i)\ge N W(R/N).
\]

For a strictly positive cutoff on the relevant interval, equality requires equal squared masses. Thus the full, untruncated cutoff action can select equal singular values on this constrained domain. This is stronger than the earlier quartic shape calculation.

The radius \(R\) and its enforcement are extra data unless the physical action derives them. More critically, a hard norm constraint excludes the collective radial fluctuation. The previous reference mass \(m_{\rm scalar}\) was precisely that radial mode. It cannot be carried unchanged into the constrained theory. Any surviving shape mode needs its own kinetic normalization and detector identification.

Unitary orientations can still form a flat orbit even after singular values are selected. A claim of a fully gapped physical vacuum must handle those directions and any gauge constraints separately.

## 4. A soft stabilizer gives a finite minimum with new parameters

A concrete nonpolynomial comparison potential is

\[
U(s_1,\ldots,s_N)=\sum_i e^{-s_i}
+\frac\kappa2\left(\sum_i s_i-R\right)^2,
\qquad \kappa>0,\ R\ge0.
\]

On the positive orthant this is strictly convex and coercive. Its unique singular-value minimum has \(s_i=q>0\), where

\[
\kappa(Nq-R)=e^{-q}.
\]

The squared-mass-coordinate Hessian is

\[
H_s=e^{-q}I+\kappa\mathbf1\mathbf1^T>0.
\]

This is a stable full Gaussian-plus-stabilizer potential, not a heat expansion. It illustrates how a permitted additional term can repair the radius problem. It does not derive \(\kappa\) or \(R\) from the selector.

To expose the mass-ratio issue, additionally assume the diagonal real amplitudes \(m_i\) have kinetic term \(Z\sum_i(\partial m_i)^2/2\), set \(s_i=m_i^2/\Lambda^2\), and write the potential density as \(C_0\Lambda^4U\), with \(Z,C_0>0\). The collective radial mode then has

\[
m_{\rm rad}^2=\frac{4C_0q\Lambda^2}{Z}
(e^{-q}+\kappa N),\qquad
\frac{\Delta^2}{m_{\rm rad}^2}
=\frac{Z}{4C_0(e^{-q}+\kappa N)}.
\]

The kinetic term is supplied independently in this comparison. Varying the stabilizer changes the ratio even though all singular values are equal and locally stable. In a full matrix field, orientation/phase modes remain a separate issue. The example is not a Lorentzian, reflection-positive T1/T2 field theory or a prediction of the corpus.

## 5. Dynamical Dirac ensembles are a real neighbouring route

[Barrett–Glaser](https://arxiv.org/html/1510.01377), sections 1–2 and 4, integrate over finite Dirac operators with a chosen measure and polynomial actions, and study phase changes. This demonstrates a mathematically concrete variation over finite geometries, not a derived Standard-Model or T1/T2 spectrum.

[Pérez-Sánchez](https://arxiv.org/html/1912.13288), abstract and section 2.5, explicitly uses growing polynomial spectral functions for random-matrix path integrals. Such a polynomial can be the complete defining action of a finite matrix model; it need not be a truncation of a decaying cutoff. It therefore lies outside the monotonicity result above. Its coefficients, finite geometry and measure remain part of the model definition.

The measure is essential. For a bounded nonnegative cutoff on a finite-dimensional matrix space, \(S(D)=\operatorname{Tr}f(D/\Lambda)\) is bounded. Hence \(e^{-S(D)}\) has a positive lower bound, and its integral against flat Lebesgue measure on an unbounded nonzero matrix space diverges. A confining action, constrained domain or non-flat prior is additional structure. An ensemble eigenvalue distribution also does not automatically define a propagating scalar mass.

The inspected corpus contains no joined implementation of this ensemble route with the physical selector carrier, a selected action/measure, a controlled four-dimensional continuation and the required optical source dictionary. This is a bounded retrieval finding, not a claim that no such model could be built.

## 6. Decision and next discriminator

The dynamical-link branch exists as an explicit open programme. The bare full decaying-cutoff action does not select its mass radius in the audited flat model. A hard radius can select shape but removes the earlier radial reference; a soft stabilizer restores that mode while introducing parameters that change the ratio. Confining finite-Dirac ensembles are another legitimate action class, with new matching burdens.

The next required packet must derive the allowed \(D_F\) variations and their measure or kinetic geometry, provide a stable full action with no adjustable target-mass parameters, and identify the positive-residue scalar reference on that same physical carrier. Only after the action selects both spectrum and reference excitation can \(\Delta/m_{\rm scalar}\) graduate from a conditional formula to a physical prediction.

The [potential/metric continuation](PEIRCE_POTENTIAL_AND_KINETIC_METRIC.md) now derives a candidate link potential and leading kinetic metric together from a declared Hermitian block trace. It keeps the unsourced diagonal backgrounds explicit and verifies that the resulting quartic vacua fail the full Gaussian stationarity test. A stable full selecting action and its physical scalar pole remain open.
