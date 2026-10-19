# Majorana Nambu \(\sigma_y\) Is Not by Itself a Basis-Invariant Orientation

**Date:** 17 October 2026  
**Branches:** B01, B03, B06, B08 and B11  
**Claim status:** exact finite-flavor Nambu decomposition and basis-obstruction theorem; invariant dynamical coupling remains open

## 1. Anomalous correlator target

Ordinary neutrino spectral projectors contain

\[
U_{\alpha i}\overline{U}_{\beta i}
\]

and are blind to Majorana column phases. Lepton-number-violating correlators instead contain

\[
\mathcal M_{\alpha\beta}
=\sum_i m_iU_{\alpha i}U_{\beta i},
\]

a complex symmetric flavor tensor.

This is the correct object to test as a possible source of the orientation-odd face coordinate.

## 2. Nambu decomposition

For a complex symmetric Majorana tensor \(M=M^T\), the finite-momentum Nambu Hamiltonian has the schematic Hermitian form

\[
H_N(\xi)=
\begin{pmatrix}
\xi I&M\\
M^\dagger&-\xi I
\end{pmatrix}.
\]

Decompose

\[
A=\frac12(M+M^\dagger),
\qquad
B=\frac{1}{2i}(M-M^\dagger),
\]

with \(A=A^\dagger\) and \(B=B^\dagger\). Then

\[
\boxed{
H_N
=\sigma_z\otimes\xi I
+\sigma_x\otimes A
-\sigma_y\otimes B.
}
\]

Thus a complex Majorana tensor does populate the face \(\sigma_y\) channel in a fixed flavor basis.

## 3. Why the raw coefficient is not physical orientation

Every complex symmetric matrix admits a Takagi factorization

\[
U^TMU=D,
\qquad
D=\operatorname{diag}(m_1,m_2,m_3),
\qquad m_i\ge0.
\]

In the Takagi mass basis,

\[
B'=\frac{D-D^\dagger}{2i}=0.
\]

Therefore the presence or magnitude of the face \(\sigma_y\otimes B\) term depends on the flavor basis. It cannot be identified directly with a basis-independent external causal orientation.

This is a no-go for the simplest proposed bridge:

\[
\operatorname{Im}M_{\alpha\beta}
\stackrel{\rm not\ canonical}{\longrightarrow}
\chi_{\rm orient}.
\]

## 4. The charged-lepton frame restores meaningful invariants

The Takagi transformation also changes the charged-current and charged-lepton flavor structures. Once the charged-lepton mass matrix is fixed diagonal, only diagonal flavor rephasings remain available.

Under

\[
M_{\alpha\beta}
\mapsto
e^{i(\phi_\alpha+\phi_\beta)}M_{\alpha\beta},
\]

the quantities

\[
\boxed{
I_{\alpha\beta}
=\operatorname{Im}
\left[
M_{\alpha\alpha}M_{\beta\beta}
(M_{\alpha\beta}^*)^2
\right]
}
\]

are invariant. A nonzero value cannot be removed by rephasing the charged-lepton flavor basis.

These are legitimate Majorana-type CP-odd orientation candidates. Individual entries of \(B\) are not.

## 5. Correct form of a possible bridge

Let \(\chi_{\rm ext}\) be an external pseudoscalar coefficient multiplying the face \(\sigma_y\) response and changing sign under reciprocity/CP. A basis-independent coupling may have the form

\[
\mathcal O_{\rm bridge}
=\chi_{\rm ext}\,I_{\alpha\beta}
\]

or a fully weak-basis-invariant generalization built from \(M_\nu\) and the charged-lepton Hermitian matrix.

Both factors are CP odd, so the product is CP even. This is symmetry allowed. Neither its coefficient nor its presence is yet derived.

## 6. Relation to the real face selector

Factor-local reciprocity remains consistent:

- the ordinary positive spectral carrier has no face \(\sigma_y\) term;
- the anomalous Nambu kernel can have one in a chosen flavor frame;
- a source-derived external orientation must couple to a flavor-basis invariant, not to that raw term;
- imposing entrywise reality on the whole flavor-Nambu operator would erase the very invariant needed to characterize Majorana CP.

## 7. Branch decision

- **Falsified in scope:** a free Majorana phase directly and canonically equals the external face orientation.
- **Established:** the Nambu decomposition contains a basis-dependent \(\sigma_y\otimes B\) term.
- **Established:** rephasing-invariant Majorana CP polynomials exist after the charged-lepton frame is fixed.
- **Open:** a local action coupling one of those invariants to the external orientation field.
- **Open:** a fully weak-basis-invariant formulation compatible with three-family renormalization.

## 8. Stop-everything and falsification gates

**Stop-everything positive:** the same weak-basis CP invariant that controls a measurable lepton-number-violating observable appears as the unique source for the external orientation-odd response, with a coefficient fixed by the Furey/Jordan action.

**Observable success:** the bridge produces a relation among neutrino masses, Majorana phases and an independent causal/response observable.

**Basis failure:** the proposed source changes under an allowed charged-lepton-preserving rephasing.

**Dynamics failure:** all invariant couplings are optional higher-dimensional portal terms with arbitrary coefficients and no new prediction.

## 9. Certificate

The [Majorana Nambu orientation certificate](../../../verification/verify/verify_majorana_nambu_orientation_invariant.mjs) constructs a complex symmetric mass tensor by Takagi factorization, verifies the Hermitian Nambu decomposition and nonzero raw \(\sigma_y\) coefficient, removes it in the mass basis, and checks a nonzero charged-lepton-frame rephasing invariant.

## Companion documents

- [Three-flavor real-face spectral carrier](174_three_flavor_real_face_complex_pmns_spectral_carrier.md)
- [Exchange-paired neutrino Majorana gate](170_exchange_paired_neutrino_two_cycle_and_majorana_gate.md)
- [Jarlskog-sourced orientation gate](131_jarlskog_sourced_sigma_y_counterterm_gate.md)
- [Antiunitary reciprocity selector](161_antiunitary_reciprocity_selector_and_five_directions.md)

