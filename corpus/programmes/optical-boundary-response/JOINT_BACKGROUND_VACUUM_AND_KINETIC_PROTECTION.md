# Joint background selection, full vacuum and kinetic protection

**Date:** 8 November 2026  
**Status:** bounded corpus/primary-source audit and classical full-matrix polynomial calculation; no physical T1/T2 pole-mass prediction  
**Parent:** [link potential and kinetic metric](PEIRCE_POTENTIAL_AND_KINETIC_METRIC.md)  
**Evidence:** [joint background/protection audit](../../../evidence/data/joint-background-vacuum-kinetic-protection-v1.json), [source-check receipts](../../../evidence/data/joint-background-source-checks-v1.json)  
**Certificate:** [joint-background verifier](../../../verification/verify/verify_joint_background_vacuum_kinetic_protection.py)

The target is one action that selects all mass-carrying blocks, supplies a stable physical scalar reference and predicts the mass ratio after quantum matching. This requires more than a potential whose minimum exists or a symmetry that forbids an unwanted mixing entry.

## 1. What changes when all blocks vary together

The preceding comparison held the diagonal blocks \(a,B\) fixed and varied only \(K\). Now allow every Hermitian entry of

\[
\Phi=\begin{pmatrix}a&K^\dagger\\K&B\end{pmatrix}
\]

to vary in the polynomial model

\[
V(\Phi)=-c_2\operatorname{Tr}\Phi^2+c_4\operatorname{Tr}\Phi^4,
\qquad c_2,c_4>0.
\]

Writing \(v^2=c_2/(2c_4)\),

\[
V=c_4\operatorname{Tr}(\Phi^2-v^2I)^2
-N c_4v^4.
\]

Thus its global minima obey

\[
\boxed{\Phi^2=v^2I.}
\]

The blocks are no longer independent supplied numbers. They obey

\[
a^2+K^\dagger K=v^2,\qquad
(aI+B)K=0,\qquad
KK^\dagger+B^2=v^2I_Q.
\]

This selects equal nonzero singular values but does not uniquely select the blocks or signs. For instance \(\Phi=vU\operatorname{diag}(1,-1,-1)U^\dagger\) describes a continuous vacuum orbit. Relative to a fixed projector, its \(a,B,K\) change while the singular values remain \(v\).

This supplies an important refinement: unique backgrounds are not logically required for a mass prediction if the predicted ratio is invariant over every allowed vacuum. A physically sourced carrier, variation domain and reference excitation are still required.

## 2. The same tree-level ratio survives the vacuum orbit

Take the kinetic density \(c_{\rm kin}\operatorname{Tr}(\partial\Phi)^2\) and canonical fermions coupled through \(y\Phi\). These are declared terms of this comparison action. In an orthonormal real Hermitian basis the kinetic metric is \(2c_{\rm kin}I\).

At \(\Phi=vJ\), \(J^\dagger=J\), \(J^2=I\), the potential Hessian acts as

\[
\mathcal H(\delta\Phi)=2c_2(\delta\Phi+J\delta\Phi J).
\]

Directions commuting with \(J\), including the collective radial mode, have curvature \(4c_2\). Directions anticommuting with \(J\) have zero curvature. Consequently

\[
m_{\rm rad}^2=2c_2/c_{\rm kin},\qquad
\Delta=|y|v,\qquad
\boxed{\frac{\Delta^2}{m_{\rm rad}^2}
=\frac{y^2c_{\rm kin}}{4c_4}.}
\]

With the earlier leading spectral normalization \(y=1\), \(c_{\rm kin}=c_4\), this is \(\Delta/m_{\rm rad}=1/2\), independent of \(c_2\) and of the vacuum orbit. No target mass is used for this classical relation.

For three states the all-positive vacuum has nine positive-curvature scalar directions. The \(1+2\) mixed-sign vacuum has five positive-curvature and four zero-curvature directions. Whether the latter are physical Goldstones or gauge directions must be established by a complete gauge action. The ratio concerns the fermion sector and the radial scalar, not a mass gap for the entire theory.

Allowing diagonal blocks is also a real change to the earlier pure-cross transport ansatz. For the literal rank-one/rank-two grading \(A=P-Q\), a purely odd \(\Phi\) always has an unmatched zero. It cannot obey \(\Phi^2=v^2I_3\). A separate Lorentz Clifford factor can support ordinary Dirac masses, but identifying it with the physical T1/T2 story is still a missing bridge.

## 3. This closes a polynomial model, not the original cutoff vacuum

There are two distinct uses of the polynomial.

- If it is a heat expansion of a decaying spectral cutoff, the [exact full-action audit](DYNAMICAL_FINITE_DIRAC_AND_FULL_ACTION.md) controls its validity. At \(\Phi=vJ\), the Gaussian full density has

  \[
  \left.\frac{d}{dt}\operatorname{Tr}e^{-t^2\Phi^2/\Lambda^2}\right|_{t=1}
  =-2N\frac{v^2}{\Lambda^2}e^{-v^2/\Lambda^2}<0.
  \]

  The polynomial minimum is not stationary in that full action.

- If the polynomial is declared the complete defining matrix potential, it is bounded below and confining, and the calculation above is a genuine classical vacuum calculation in that new model. Its action choice, spacetime kinetic term, physical representations and quantum completion remain additional data. This does not derive that model from the corpus's decaying-cutoff action.

The two interpretations must not be interchanged to call the same calculation a stable full spectral vacuum.

## 4. The strongest corpus protection mechanisms do not fix this ratio

[Claim 1567](../../claims/1500-1599/1567_a_nonsupersymmetric_E6_quartic_vacuum_restores_the_exotic_rank_but_no_residual_abelian_selector_protects_bidoublet_inertness.md) supplies an open stable reduced two-singlet vacuum with chosen quartic coefficients. It leaves the complete E6 invariant potential and physical spectrum open. It does not identify that vacuum with the three-state comparison above.

[Claim 1575](../../claims/1500-1599/1575_a_residual_Z3_family_cycle_realizes_the_two_copy_frame_and_protects_a_three_family_E6_portal.md) is a positive protection result: a three-family \(Z_3\) can forbid mixed-copy operators while retaining the physical chiral families. Its special Yukawa frame gives isotropic one-loop wave-function sources. The claim still leaves the complete scalar vacuum, quartic corrections, threshold matching and normalized portal line open.

[Claim 1574](../../claims/1500-1599/1574_two_matter_channels_close_the_copy_frame_but_reduction_to_one_chiral_family_collapses_it_at_threshold.md) demonstrates why thresholds matter: a high-energy tight frame can become rank one after a channel is removed. Three retained families avoid that particular obstruction; they do not turn every allowed diagonal coefficient into a fixed number.

Even a full unitary-conjugation symmetry and \(\Phi\mapsto-\Phi\) leave \(\operatorname{Tr}(D\Phi)^2\) and \(\operatorname{Tr}\Phi^4\) separately invariant. A scalar-copy phase symmetry likewise permits its own kinetic norm and self-quartic. Such symmetries can forbid a cross term without equating kinetic, quartic and Yukawa coefficients. The saved deformation changes \(c_{\rm kin}\) while holding the potential and vertex fixed; the vacuum remains unchanged but the ratio changes. This is not a field-coordinate rescaling, which transforms all three coefficients together and leaves \(y^2c_{\rm kin}/c_4\) invariant.

## 5. Renormalizability is not preservation of the spectral relation

There are real renormalizability results for spectral actions. [Van Suijlekom, arXiv:1112.4690](https://arxiv.org/html/1112.4690), introduction and the discussion after example 30, distinguishes absorbable counterterms from multiplicative preservation of the original coefficient unification. Its result concerns an asymptotically expanded higher-derivative theory under stated graph conditions, not a universal closure theorem for every unexpanded action.

[Chamseddine–Iliopoulos–van Suijlekom, *Spectral action in matrix form*](https://www.waltervansuijlekom.nl/wp-content/uploads/2020/11/Chamseddine2020_Article_SpectralActionInMatrixForm.pdf), introduction and equations (9)–(11), derive matrix-form quantization rules and coupling relations; stability of those relations is posed as an investigation. Preserving matrix notation alone is not a protection theorem for this mass ratio.

In a fixed field convention, protection of the displayed classical combination requires

\[
\frac{d}{d\log\mu}\log\left(\frac{y^2c_{\rm kin}}{c_4}\right)
=2\frac{\beta_y}{y}
+\frac{\beta_{\rm kin}}{c_{\rm kin}}
-\frac{\beta_4}{c_4}=0
\]

and compatible threshold maps. This is a necessary condition for a constant running tree combination, not a sufficient all-orders pole-mass theorem. Scalar/fermion self-energies and mixing remain part of a physical mass calculation. The corpus's [coefficient-line RG audit](../../claims/1500-1599/1530_the_common_coefficient_line_is_RG_invariant_only_under_universal_projective_flow_and_a_fixed_ratio_requires_a_Ward_eigenline.md) supplies the corresponding source-module discipline, not the missing beta functions of this joined model.

Exact protection is one route, not the only route to predictivity. A uniquely fixed high-scale boundary action plus calculable RG flow and thresholds could predict a changed low-energy ratio. The absence of a scale-independent relation does not itself preclude that possibility. Neither joined physical calculation is supplied by the inspected corpus.

## 6. Decision and next discriminator

Joint variation removes the independent diagonal-background fitting in the classical polynomial model and yields an orbit-invariant tree ratio. That is the strongest positive result of this continuation. It neither stabilizes the original full cutoff vacuum nor protects the required coupling combination.

The remaining task is to derive a physical full stabilizing action and its allowed variations, then either establish a Ward/nonrenormalization identity for the normalized mass relation or compute its unique RG/threshold trajectory to physical poles. Fixing the action at a UV scale independently of the target mass would suffice; repeatedly enforcing its tree relation after matching would be a fit.

The [UV/pole continuation](UV_BOUNDARY_RUNNING_AND_POLE_MATCHING.md) audits whether that input packet exists. The inspected corpus's fixed-point and stabilized-vacuum routes leave it open. A new scalar-channel dispersion calculation verifies that a shared two-particle cut leaves finite matching terms undetermined, while a consistent finite scheme transformation preserves the pole. It does not compute target-model running or manufacture a UV completion.
