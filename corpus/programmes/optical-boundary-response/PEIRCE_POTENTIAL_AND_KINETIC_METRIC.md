# Deriving the link potential and its kinetic metric

**Date:** 8 November 2026  
**Status:** bounded corpus audit and explicit leading spectral block calculation; full physical selecting action remains open  
**Parent:** [dynamical finite-Dirac and full-action gate](DYNAMICAL_FINITE_DIRAC_AND_FULL_ACTION.md)  
**Evidence:** [Peirce potential/metric calculation](../../../evidence/data/peirce-potential-kinetic-metric-v1.json)  
**Certificate:** [potential/metric verifier](../../../verification/verify/verify_peirce_potential_kinetic_metric.py)

The physically relevant scalar mass is an eigenvalue of the potential Hessian relative to the kinetic metric. Computing a positive curvature without its inertia does not determine a frequency, and fixing a scalar coordinate norm does not remove a physical kinetic coefficient.

## 1. What the corpus supplies

[Claim 1197](../../claims/1100-1199/1197_the_minimum_variance_response_functional_is_a_canonical_relative_selector_but_standard_model_family_spaces_and_weights_remain_noncanonical.md) gives the positive alignment functional

\[
V_H(P)=\kappa\|[P,H]\|_{\rm HS}^2
=2\kappa\left(\operatorname{Tr}(PH^2)-\operatorname{Tr}(PH)^2\right).
\]

It aligns a primitive projector to response eigenlines. Several noncommuting tensors can further isolate a direction. The source explicitly leaves the physical tensors' common bundle, relative weights and microscopic origin open. It does not derive a radial link potential.

[Claim 1195](../../claims/1100-1199/1195_a_charge_three_cross_peirce_vacuum_completes_the_rank_split_to_a_full_jordan_frame_but_needs_response_to_gap_cp1.md) adds the directional term \(\kappa K^\dagger\mathcal R_QK\) to a norm potential. The response eigenvalue splitting gaps link directions once supplied. [Claim 1198](../../claims/1100-1199/1198_the_charge_three_link_has_a_scalar_flavon_versus_dynamical_cross_peirce_fork_separating_bf_closure_from_flavour_closure.md) writes the dynamical \(K\) branch with \(|DK|^2+V(P,K)\), leaving the selecting response potential open.

The [linking-pairing theorem](../../claims/0100-0199/198_linking_algebra_pairing_uniqueness_and_real_structure_gap.md) fixes an invariant positive Hermitian norm on an irreducible rectangular block only up to scale. This supplies a legitimate metric shape, not its numerical kinetic normalization. The [projector-energy action](../../claims/1500-1599/1502_pure_curvature_is_blind_to_flat_leakage_but_covariant_projector_energy_selects_the_parallel_mask.md) likewise introduces a positive coefficient rather than deriving it spectrally.

## 2. A common spectral block generates both leading terms

Choose a rank-one projector \(P\), its rank-two complement \(Q\), and a Hermitian comparison operator

\[
\Phi=\begin{pmatrix}a&K^\dagger\\K&B\end{pmatrix},
\qquad a\in\mathbb R,\quad B=B^\dagger\in\operatorname{End}(Q),\quad K\in\operatorname{Hom}(P,Q).
\]

The representation and backgrounds are declared here, not derived from the physical selector. They transform together under changes of frame. Hold \(a,B,P\) constant while calculating the link sector.

Direct block multiplication gives, with \(q=K^\dagger K\),

\[
\operatorname{Tr}\Phi^2=a^2+\operatorname{Tr}B^2+2q,
\]

\[
\operatorname{Tr}\Phi^4
=a^4+\operatorname{Tr}B^4
+4K^\dagger(a^2I+aB+B^2)K+2q^2.
\]

Use the preceding flat heat-kernel action through \(a_4\), written as

\[
V=-c_2\operatorname{Tr}\Phi^2+c_4\operatorname{Tr}\Phi^4,
\qquad \mathcal L_{\rm kin}=c_{\rm kin}\operatorname{Tr}(D\Phi)^2.
\]

Its coefficients in the stated moment convention are

\[
c_2=\frac{f_2\Lambda^2}{2\pi^2},\qquad
c_4=c_{\rm kin}=\frac{f_0}{8\pi^2}.
\]

Thus the generated link potential and kinetic term are

\[
\boxed{V_K=K^\dagger H_KK+2c_4(K^\dagger K)^2},
\quad H_K=-2c_2I+4c_4(a^2I+aB+B^2),
\]

\[
\boxed{\mathcal L_{\rm kin,K}=Z_K(DK)^\dagger DK},
\qquad Z_K=2c_{\rm kin}>0.
\]

In real coordinates \(K_j=(x_j+iy_j)/\sqrt2\), the kinetic metric is \(G_K=Z_KI\). The tensor \(a^2I+aB+B^2\) has the role of a directional response. Its appearance and the relative leading coefficients are derived by this explicit trace calculation, rather than independently postulating every term of \(V(P,K)\).

This is progress within a declared truncation. It neither selects \(a,B\) nor identifies their physical source. The corpus's Pati–Salam support constructions do not already specify this complete three-state physical action; its [primary finite-Dirac construction](https://arxiv.org/html/1507.08161), equations (12)–(21), retains free allowed entries.

## 3. The radial reference can be calculated conditionally

Diagonalize \(H_K\), with eigenvalues \(h_1<h_2\), and suppose \(h_1<0\). The link vacuum points along the first eigenvector and has

\[
v_K^2=-h_1/(4c_4).
\]

The generalized Hessian gives

\[
m_{\rm rad}^2=-2h_1/Z_K,\qquad
m_{\rm dir}^2=(h_2-h_1)/Z_K.
\]

There are two real transverse directions with the displayed directional mass and one phase direction with zero potential curvature. Whether the phase is gauged away requires an actual gauge action; it is not removed by this matrix calculation.

If the fermions couple canonically through the full \(\Phi\), their rest masses are its singular values. They need not equal the link norm \(v_K\). Changing a supplied diagonal background can change their minimum singular value without changing the link vacuum or radial mass.

The saved comparison fixes \(c_2=2\), \(c_4=c_{\rm kin}=1\), \(a=0\), and the first eigenvalue of \(B\) to \(0.2\). Changing only its second eigenvalue from \(0.8\) to \(1.1\) changes \(\Delta_{\min}/m_{\rm rad}\), while preserving the selected link norm, positive transverse curvatures and radial mass. These are supplied model points, not device parameters.

With \(a=B=0\), the pure cross-sector three-state operator has an unmatched zero eigenvalue, even though its paired modes have a nonzero mass. Its active paired-mode ratio is \(1/2\), but the full minimum gap is zero. Diagonal backgrounds can repair rank; if the kinetic transport grading is identified with \(P-Q\), those diagonal terms also violate its pure-cross anticommutator. A separate Lorentz Clifford factor can still give a Dirac symbol, but that is another carrier identification, not a resolution by renaming.

## 4. Potential and metric closure are separate from symmetry

For the variance potential and the metric induced from \(Z_K|DK|^2\), a fixed-radius link \(K=v_Kn\) has directional kinetic scale \(Z_Kv_K^2\). Its orientation frequencies depend on that scale as well as \(\kappa\) and response eigenvalue gaps. A positive variance Hessian is not a canonically normalized particle mass by itself.

In an ordinary local EFT, an additional positive term

\[
\delta Z\,(DK)^\dagger DK
\]

preserves the same unitary/gauge transformation rules and changes no constant-field potential. It changes \(m_{\rm rad}^2\) and the fermion/scalar mass ratio. This is a counterexample to determination by symmetry and potential alone. It is not a counterexample inside a strictly fixed bare spectral action: that stronger axiom ties the leading kinetic coefficient to the trace. Protecting the tie under the allowed effective-action counterterms remains a separate task, as the corpus's [spectral-word boundary](../../claims/1000-1099/1084_the_minimal_spectral_graph_has_an_all_orders_rank_one_bridge_normal_form_that_forbids_holomorphic_cross_six_mixing.md) and [RG coefficient-line audit](../../claims/1500-1599/1530_the_common_coefficient_line_is_RG_invariant_only_under_universal_projective_flow_and_a_fixed_ratio_requires_a_Ward_eigenline.md) emphasize.

## 5. Full-action stability still controls the interpretation

The exact Gaussian density for constant \(\Phi\) is proportional to \(\operatorname{Tr}e^{-\Phi^2/\Lambda^2}\). At the saved quartic link vacua its link gradient is nonzero: these are not stationary points of that full density. The verifier computes this gradient independently from the full eigenvalues.

This agrees with the preceding [full-action audit](DYNAMICAL_FINITE_DIRAC_AND_FULL_ACTION.md). A common truncated trace can derive the leading potential and metric together, yet fail to justify its own vacuum. The earlier soft stabilizer can repair that issue, but its coefficients are not generated by the block calculation above. Full-action two-derivative coefficients can also depend on the background and momentum; the constant \(G_K\) derived here is only the leading heat coefficient.

## 6. Decision and next discriminator

The corpus permits a concrete derivation of a candidate leading \(V_K\) and kinetic metric from one specified block operator. The remaining freedom has moved to the physical block/background selection, the full stabilizing action and its kinetic/renormalization closure. The corpus does not yet fix those objects so as to predict a physical \(\Delta/m_{\rm rad}\).

The decisive next packet must supply the physical representation of \(P,K,a,B\), derive their common full action and allowed variations, solve a controlled stable vacuum, and compute the scalar pole with its full kinetic normalization. Its predicted fermion/scalar ratio must survive changes of field coordinates and allowed matching prescriptions without using the target mass as a calibration input.

The [joint-background continuation](JOINT_BACKGROUND_VACUUM_AND_KINETIC_PROTECTION.md) now varies all blocks in the polynomial model and derives \(\Phi^2=v^2I\) at its global minima. Its tree ratio is constant across the resulting background orbit, refining the earlier fixed-background comparison: unique \(a,B\) are not necessary when the observable is orbit invariant. The model still fails the full Gaussian vacuum test and lacks a protected or fully transported physical coupling relation.
