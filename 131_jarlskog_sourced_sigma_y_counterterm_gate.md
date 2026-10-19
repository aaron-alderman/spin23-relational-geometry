# The Jarlskog-Sourced \(\sigma_y\) Counterterm Gate

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B08 and B11  
**Claim status:** symmetry-allowed pseudoscalar spurion identified; parent restoration requires additional phase misalignment, as corrected in [Document 132](132_lorentz_dimension_and_chiral_phase_audit.md)

> **Correction.** A single constant \(\mathcal J_{\rm CP}\sigma_y\) contribution can be absorbed into a rotation of the selected real face slice, subject to anomaly constraints. It forces \(H_2(\mathbb C)\) only if its spectral or momentum-dependent phase is not aligned with the existing scalar connector.

## 1. The dangerous direction

Real-marginal closure fails when the response acquires

\[
\sigma_y\otimes I_3
\]

in face times flavor space. Carrier complex conjugation sends

\[
\sigma_y\longmapsto-\sigma_y.
\]

In a CP-conserving one-generation theory, this suggests a possible protection. Three-generation flavor CP changes the conclusion.

## 2. A flavor-singlet CP-odd spurion

Let

\[
H_u=Y_uY_u^\dagger,
\qquad
H_d=Y_dY_d^\dagger.
\]

The basis-independent pseudoscalar

\[
\mathcal J_{\rm CP}
=
\operatorname{Im}\operatorname{tr}[H_u,H_d]^3
\]

is nonzero when the corresponding Jarlskog-type CP invariant is nonzero.

For the explicit flavor checkpoint,

\[
\operatorname{tr}[H_u,H_d]^3=36i,
\qquad
\mathcal J_{\rm CP}=36.
\]

Under complex conjugation,

\[
\mathcal J_{\rm CP}\longmapsto-\mathcal J_{\rm CP}.
\]

## 3. The allowed composite

Consider

\[
\boxed{
\delta R_{\rm danger}
=
\kappa\,
\mathcal J_{\rm CP}\,
\sigma_y\otimes I_3.
}
\]

Both factors are odd under the candidate complex-conjugation operation, so their product is even:

\[
\mathcal J_{\rm CP}\sigma_y
\longmapsto
(-\mathcal J_{\rm CP})(-\sigma_y)
=
\mathcal J_{\rm CP}\sigma_y.
\]

The operator is Hermitian, a flavor singlet and neutral under the common gauge action on the two dressed faces.

Its face partial trace is

\[
\operatorname{Tr}_{\rm flavor}\delta R_{\rm danger}
=
3\kappa\mathcal J_{\rm CP}\sigma_y,
\]

which is exactly the forbidden imaginary off-diagonal marginal.

## 4. Consequence for technical naturalness

Gauge invariance, flavor-basis covariance and spurionic CP covariance do not by themselves forbid the dangerous direction. Once flavor CP is nonzero, the CP-odd flavor spurion can compensate the carrier-conjugation parity of \(\sigma_y\).

Therefore setting the coefficient \(\kappa\) to zero is not technically explained by those symmetries alone. However, a nonzero constant \(\kappa\) need not destroy the real carrier: one relative chiral rephasing can realify a single common scalar–pseudoscalar phase.

The invariant identifies a symmetry-allowed pseudoscalar source. The stronger claim of parent restoration requires a second, inequivalent spectral phase.

## 5. Important limitation

The construction proves that the counterterm is symmetry-allowed at the spurion level. It does **not** prove:

- that a Standard-Model diagram generates it;
- that its coefficient is nonzero in a specified scheme;
- the minimum loop order;
- that the physical CP transformation of the dressed face operators is exactly bare carrier conjugation;
- that locality, Lorentz structure or reflection positivity permits the required operator insertion.

The invariant has twelfth order in Yukawa spurions because each \(H_f\) is quadratic and the commutator cube contains six \(H\) factors. This suggests strong suppression but does not determine loop order.

## 6. New protection burden

To retain \(H_2(\mathbb R)\) with physical flavor CP, the theory needs an additional reason why

\[
\kappa=0
\]

to all orders. Possible mechanisms are:

1. a face-exchange or reflection selection rule under which \(\mathcal J_{\rm CP}\sigma_y\) remains odd;
2. Lorentz/chirality structure preventing the spurion from entering the relevant two-point function;
3. spectral pairing cancelling it pole by pole;
4. a non-renormalization theorem tied to the unique Yukawa triangle;
5. acceptance that \(H_2(\mathbb C)\) and \(Spin(2,4)\) are restored at sufficiently high order.

## 7. Stop-everything criteria

**Advance \(Spin(2,3)\):** prove \(\kappa=0\) from an exact symmetry or non-renormalization theorem compatible with nonzero flavor CP.

**Restore the parent:** calculate phase-misaligned scalar and pseudoscalar contributions that no single anomaly-allowed chiral rotation can realify across spectral support.

**Pin:** if the term is allowed but its diagrammatic realization is unknown, retain both \(Spin(2,3)\) and \(Spin(2,4)\) branches with the coefficient as the discriminator.

## 8. Certificate

The [Jarlskog–\(\sigma_y\) certificate](scripts/verify-jarlskog-sigma-y-counterterm.mjs) computes the nonzero invariant, verifies its conjugation parity, constructs the Hermitian composite, checks spurionic invariance and evaluates its forbidden face marginal.

## Companion documents

- [Antiunitary and common-spurion alignment criteria](130_antiunitary_and_common_spurion_alignment_criteria.md)
- [Real face-marginal perturbation classification](127_real_face_marginal_perturbation_classification.md)
- [The \(H_2(\mathbb C)\) parent-restoration branch](129_h2c_fallback_restores_spin24_parent.md)
- [Real-selector CP obstruction](74_real_selector_cp_violation_obstruction.md)
