# Frontier wave 2 synthesis: all three gates end at external data

**Date:** 18 October 2026  
**Parent:** [Frontier wave 2 programme](frontier_wave2_00_three_missing_data_programme.md)  
**Status:** wave complete; every proposed internal selector is either scoped no-go, conditional realization, or explicit superselection input

## Verdict

Wave 2 tested the three missing data left by the seven-thread convergence round:

\[
\text{physical source selection},\qquad
\text{normalized }H_2(\mathbb R)\text{ response},\qquad
\text{protected exceptional incidence}.
\]

All three can be represented consistently. None is selected uniquely by the presently established algebra and Standard-Model action.

## 1. Normalized electron response

At an isolated free electron pole, the normalized helicity residue is canonically

\[
R_h(E)=\frac1{2E}
\begin{pmatrix}
E-hk&m_e\\
m_e&E+hk
\end{pmatrix}.
\]

It is positive, trace one, rank one and idempotent. The associated relations

\[
A_h=h\frac{k}{E},\qquad
C_h=\frac{m_e}{E},\qquad
A_h^2+C_h^2=1
\]

are exact for the pole model.

The interacting composite pair does not inherit a canonical relative overlap. Under finite operator renormalization

\[
O\mapsto\operatorname{diag}(a,b)O,
\qquad
g\mapsto\operatorname{diag}(a,b)^{-1}g,
\]

the complete amplitude is unchanged while \(z_L/z_R\) changes by \(a/b\). LSZ, CP, CPT, the Dirac equation and the Yukawa Ward identity do not eliminate this freedom. Only calibrated products \(g_Lz_L\) and \(g_Rz_R\) are observable.

**Disposition:** canonical free-pole geometry; interacting normalization requires a renormalization condition or measurement.

## 2. Physical source selection

Local real background sources and derivative ALPs admit both incidence rays. Exact gauging and one-ray RG closure reject both without additional completion. The anomaly data differ between the candidates but do not independently select one once the exact source quotient is respected.

The smallest honest model is consequently a discrete two-ray benchmark:

\[
v_d=(10,6,2,1;16),
\qquad
v_m=(10,6,4,1;16).
\]

The electron amplitude differs by two and an isolated equal-kinematics electron rate differs by four. This is falsifiable after a source coupling is specified, but it is not a no-refit prediction of the Standard Model, Furey algebra or \(Spin(2,3)\).

**Disposition:** paired-admission/paired-rejection no-selector theorem; retain as an empirical two-ray benchmark.

## 3. Protected exceptional selector

The desired triplet projector is oblique in the canonical metric. An adapted positive metric makes it self-adjoint. The minimal finite realization

\[
\mathcal A_{sd}=\mathbb C_{\rm safe}\oplus\mathbb C_{\rm danger}
\]

passes the KO-six signs, order-zero and first-order conditions, and preserves the split under inner fluctuations and heavy Schur complements only when the central differential is trivial:

\[
[D,P]=0,
\qquad
\Omega_D^1(\mathcal A_{sd})=0.
\]

Turning on the minimal cross edge gives a nonzero represented one-form, violates the minimal first-order condition and regenerates the dangerous threshold propagator. Thus protected centrality and dynamical mixing are mutually exclusive in this minimal sector.

Moreover, \(\mathbb C^2\) with multiplicities \((2,1)\) fixes the ranks but not the safe projector. Its embeddings form

\[
\operatorname{Gr}_{\mathbb C}(2,3)\cong\mathbb{CP}^2.
\]

Choosing \(P=\ker(QQ)\) is additional orientation data.

**Disposition:** consistent superselection completion; no derivation of the physical projector orientation.

## Combined no-selector statement

The present programme admits the following implementations:

\[
\begin{array}{c}
\text{calibrated two-face response},\\
\text{one of two external-source rays},\\
\text{safe/danger superselection projector}.
\end{array}
\]

But it does not derive the calibration, choose between the rays, or orient the projector. These are three versions of the same structural boundary:

\[
\boxed{
\text{the algebra fixes an admissible family more readily than it fixes a physical point in that family.}
}
\]

## Next frontier

Further purely internal enlargement is low value unless it supplies one of the missing selectors without adding equivalent free data. The productive continuation is therefore:

1. **operational closure:** construct the minimum rank-complete measurement that determines the calibrated source products and distinguishes the two rays;
2. **finite-geometry provenance:** test whether the full Furey representation, real structure and Dirac support select the \(\mathbb{CP}^2\) projector orientation rather than merely accommodate it;
3. **UV completion audit:** determine whether an anomaly-completed two-ray source model or a larger finite triple turns the benchmark into a protected relation.

The theoretical programme has not failed. It has localized precisely which information is structural and which information must come from dynamics, boundary conditions or measurement.

## Evidence

- [Normalized electron spectral projection](frontier_wave2_qft_01_normalized_electron_spectral_projection.md)
- [Relative overlap no-go](frontier_wave2_qft_02_relative_electron_overlap_is_a_scheme_coordinate.md)
- [Local source-action classification](frontier_wave2_source_01_local_unitary_selector_classification.md)
- [Minimal two-ray ALP benchmark](frontier_wave2_source_02_minimal_two_ray_alp_model.md)
- [Protected exceptional selector](frontier_wave2_exceptional_01_protected_furey_selector.md)
- [Finite superselection boundary](frontier_wave2_exceptional_02_minimal_finite_superselection_boundary.md)
