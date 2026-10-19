# A Weak-Basis Majorana Invariant from Charged-Lepton Spectral Projectors

**Date:** 17 October 2026  
**Branches:** B01, B03, B06 and B11  
**Claim status:** exact finite-flavor invariant; locality and portal dynamics remain open

## 1. The pinned problem

In the charged-lepton mass frame, the quartic quantity

\[
I_{\alpha\beta}
=\operatorname{Im}\left[
M_{\alpha\alpha}M_{\beta\beta}(M_{\alpha\beta}^*)^2
\right]
\]

is invariant under residual charged-lepton flavor rephasings and detects Majorana-type phase information.

The unresolved question was whether it could be expressed without first choosing that frame.

It can, provided the charged-lepton eigenvalues are nondegenerate.

## 2. Weak-basis transformations

Use the convention that a left-handed flavor basis change is

\[
\ell_L=W\ell_L'.
\]

Then the complex symmetric Majorana tensor and charged-lepton Hermitian operator transform as

\[
M\mapsto M'=W^TMW,
\]

\[
H_e\mapsto H_e'=W^\dagger H_eW.
\]

Let \(P_\alpha\) be the spectral projector of \(H_e\) associated with charged-lepton eigenvalue \(\lambda_\alpha\). It transforms as

\[
P_\alpha\mapsto P_\alpha'=W^\dagger P_\alpha W,
\]

and hence

\[
P_\alpha^*\mapsto W^TP_\alpha^*W^*.
\]

## 3. Projectors without eigenvector phases

For three distinct charged-lepton eigenvalues,

\[
\boxed{
P_\alpha
=\prod_{\gamma\ne\alpha}
\frac{H_e-\lambda_\gamma I}
{\lambda_\alpha-\lambda_\gamma}.
}
\]

This expression depends only on \(H_e\) and its labeled eigenvalues. It contains no eigenvector phase convention.

The labels \(e,\mu,\tau\) are physically fixed by the distinct charged-lepton masses. If two eigenvalues were degenerate, only the projector onto the degenerate subspace would be canonical and the pairwise invariant below would cease to be individually defined.

## 4. Closed trace invariant

Define

\[
\boxed{
Q_{\alpha\beta}
=\operatorname{Tr}\left(
P_\alpha^*MP_\alpha M^\dagger
P_\beta^*MP_\beta M^\dagger
\right).
}
\]

Under a weak-basis transformation, the complete product transforms as

\[
W^T
\left(
P_\alpha^*MP_\alpha M^\dagger
P_\beta^*MP_\beta M^\dagger
\right)
W^*.
\]

Since \(W^*W^T=I\), cyclicity of trace gives

\[
Q_{\alpha\beta}'=Q_{\alpha\beta}.
\]

Thus

\[
\boxed{
\mathcal I_{\alpha\beta}=\operatorname{Im}Q_{\alpha\beta}
}
\]

is a genuine weak-basis invariant.

## 5. Reduction in the charged-lepton frame

In the charged-lepton mass frame,

\[
(P_\alpha)_{ij}=\delta_{i\alpha}\delta_{j\alpha}.
\]

Direct index contraction gives

\[
Q_{\alpha\beta}
=M_{\alpha\alpha}M_{\beta\beta}
(M_{\alpha\beta}^*)^2.
\]

Therefore

\[
\boxed{
\mathcal I_{\alpha\beta}
=\operatorname{Im}\left[
M_{\alpha\alpha}M_{\beta\beta}(M_{\alpha\beta}^*)^2
\right].
}
\]

The earlier fixed-frame invariant was not a hallucinated basis artifact. It was the charged-lepton-frame expression of this closed projector trace.

## 6. What this changes for the orientation branch

The previous Majorana/Nambu result remains intact:

- a raw Nambu \(\sigma_y\) coefficient is basis dependent and removable by Takagi congruence;
- the scalar \(\mathcal I_{\alpha\beta}\) is basis independent because it compares the Majorana tensor with the charged-lepton spectral decomposition;
- physical orientation is therefore relational between two flavor structures, not an imaginary coordinate of \(M\) alone.

An external face-exchange pseudoscalar \(\chi_{\rm ext}\) could enter the symmetry-even combination

\[
\chi_{\rm ext}\,\mathcal I_{\alpha\beta}.
\]

This is now basis-covariant at the flavor level. It is still only a permitted portal, not a derived interaction.

## 7. Important locality distinction

The normalized spectral projectors contain inverse eigenvalue differences. They are excellent finite-dimensional observables and spurion invariants, but they are not manifestly polynomial local operators in the underlying fields.

Multiplying by the relevant charged-lepton discriminant denominators produces a polynomial numerator built from \(H_e\), \(M\) and \(M^\dagger\). That polynomial has high spurion degree and does not define a low-dimension renormalizable interaction.

Consequently this result solves the **basis-invariance gate**, not the **local-portal gate**.

The next questions are:

1. what is the lowest-degree polynomial weak-basis invariant with the same CP parity;
2. whether it can arise from integrating out a selected mediator;
3. whether external reciprocity permits or forbids the corresponding counterterm;
4. whether the coupling predicts anything beyond an arbitrary coefficient.

## 8. Relation to Dirac and Majorana CP data

The familiar Dirac-type invariant

\[
\operatorname{ImTr}[H_e,H_\nu]^3,
\qquad H_\nu=MM^\dagger,
\]

depends only on Hermitian spectral data and detects oscillation-type CP violation. It loses the Majorana column phases.

The invariant \(\mathcal I_{\alpha\beta}\) contains \(M\) itself, not only \(MM^\dagger\), and is therefore sensitive to lepton-number-violating phase information. These are different invariant sectors and should not be conflated.

## 9. Stop-everything and falsification gates

**Portal derivation:** the same antiunitary or Jordan selector that fixes external reciprocity generates a definite coefficient multiplying a polynomial completion of \(\mathcal I_{\alpha\beta}\).

**Observable success:** the portal correlates an external orientation observable with a measurable lepton-number-violating phase combination.

**Locality failure:** every completion is a high-degree arbitrary spurion operator with no selected mediator or scale.

**Reciprocity failure:** radiative generation of the portal necessarily populates the forbidden external \(\sigma_y\) response and restores the \(Spin(2,4)\) parent.

**Degeneracy caveat:** at an exact charged-lepton degeneracy, individual \(\alpha\beta\) invariants are not canonical; only subspace-summed quantities survive.

## 10. Certificate

The [weak-basis Majorana-projector certificate](scripts/verify_weak_basis_majorana_projector_invariant.mjs) reconstructs the charged-lepton spectral projectors polynomially, verifies the fixed-frame contraction, applies a nontrivial unitary weak-basis change and confirms exact numerical invariance.

## Companion documents

- [Majorana Nambu \(\sigma_y\) is not a basis-invariant orientation](175_majorana_nambu_sigma_y_is_not_a_basis_invariant_orientation.md)
- [Three-flavor real-face/complex-PMNS carrier](174_three_flavor_real_face_complex_pmns_spectral_carrier.md)
- [Exchange-paired Yukawas and CP orientation](164_exchange_paired_yukawas_and_cp_orientation_gate.md)
- [Real carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
