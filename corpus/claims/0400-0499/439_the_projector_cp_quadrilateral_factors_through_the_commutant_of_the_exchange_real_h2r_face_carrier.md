# The Projector CP Quadrilateral Factors through the Commutant of the Exchange-Real \(H_2(\mathbb R)\) Face Carrier

**Date:** 17 October 2026  
**Branches:** B02, B03, B06, B08 and B11  
**Claim status:** exact tensor-factorization theorem; interacting face–flavor entanglement remains open

## 1. Joining the two successful branches

The response branch supplies an exchange-real positive face carrier

\[
S\in H_2(\mathbb R)_+,
\]

whose conformal group leads to

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

The rank-deficient flavor branch supplies a CP-odd projector quadrilateral on

\[
F\cong\mathbb C^3.
\]

The combined response space is

\[
\mathbb R^2_{\rm face}\otimes\mathbb C^3_{\rm flavor}.
\]

The question is whether the real face condition destroys the complex projector phase. It does not when the structures act on commuting tensor factors.

## 2. Factor-local projectors and responses

Let \(S_r\in H_2(\mathbb R)\) be real face operators and let \(P_r\) be flavor spectral projectors. Define combined operators

\[
X_r=S_r\otimes P_r.
\]

For an alternating charged/neutral quadrilateral,

\[
\begin{aligned}
\operatorname{Tr}(X_1X_2X_3X_4)
&=\operatorname{Tr}_{\rm face}(S_1S_2S_3S_4)\\
&\qquad\times
\operatorname{Tr}_{\rm flavor}(P_1P_2P_3P_4).
\end{aligned}
\]

Because every \(S_r\) is a real matrix,

\[
\operatorname{Tr}_{\rm face}(S_1S_2S_3S_4)\in\mathbb R.
\]

Therefore

\[
\boxed{
\operatorname{ImTr}(X_1X_2X_3X_4)
=\operatorname{Tr}_{\rm face}(S_1S_2S_3S_4)
\operatorname{Im}\mathcal B_{\rm flavor}.
}
\]

The face carrier scales the CP-odd invariant by a real response weight but does not force it to vanish.

## 3. Rank-one face ray

If all four combined residues share one normalized rank-one face projector

\[
p=|f\rangle\langle f|,
\qquad f\in\mathbb R^2,quad \|f\|=1,
\]

then

\[
p^n=p,
\qquad
\operatorname{Tr}p=1.
\]

Hence

\[
\operatorname{Tr}
\left[(p\otimes P_1)(p\otimes P_2)(p\otimes P_3)(p\otimes P_4)\right]
=\mathcal B_{\rm flavor}.
\]

The full six-dimensional residue system reproduces the flavor Jarlskog quartet exactly while remaining supported on a boundary ray of the \(H_2(\mathbb R)_+\) cone.

## 4. Commutant statement

The face Jordan action has the form

\[
J_{\rm face}\otimes I_3,
\]

while flavor projectors and holonomies act as

\[
I_2\otimes A_{\rm flavor}.
\]

They commute exactly:

\[
[J_{\rm face}\otimes I_3, I_2\otimes A_{\rm flavor}]=0.
\]

Thus the projector CP holonomy lives in the commutant of the real Jordan carrier. The antiunitary defining the exchange-real face slice need not conjugate the flavor coefficients.

This is the precise mechanism by which a real \(Spin(2,3)\) response carrier can coexist with nonzero complex PMNS/CKM data.

## 5. Positivity

If \(S\ge0\) and \(P\ge0\), then

\[
S\otimes P\ge0.
\]

Positive sums

\[
\rho=\sum_r S_r\otimes P_r
\]

remain positive. Therefore factor-local flavor projectors can decorate an exchange-real spectral measure without spoiling spectral positivity.

The CP phase appears only in closed products of noncommuting flavor projectors, not in the positivity of any individual residue.

## 6. Partial trace

For a factor-local term,

\[
\operatorname{Tr}_{\rm flavor}(S\otimes P)
=S\operatorname{Tr}P.
\]

Rank-one flavor projectors have trace one, so the face marginal remains exactly \(S\in H_2(\mathbb R)_+\).

Consequently the external observer may see the same real Jordan response even while flavor-resolved closed paths carry nonzero CP phases.

This also means the face marginal alone cannot reconstruct the flavor holonomy.

## 7. Entanglement gate

A general positive operator on

\[
\mathbb C^2\otimes\mathbb C^3
\]

need not be a sum with all face factors in one protected real Jordan subalgebra. Face–flavor entangled terms can introduce paired imaginary generators such as

\[
\sigma_y\otimes A_y
\]

with \(A_y\) flavor-antisymmetric, while the total operator remains Hermitian or even real under a graded structure.

Therefore factor-locality is sufficient but not automatic. The interacting theory must show either:

- exact carrier–flavor commutant factorization;
- a controlled graded-real extension;
- or a bound on the entangling corrections.

## 8. Consequence for \(Spin(2,3)\)

The result closes a compatibility question, not a dynamical derivation:

\[
\boxed{
H_2(\mathbb R)\text{ face response}
\quad\text{is compatible with}\quad
\text{nonzero projector CP holonomy in its flavor commutant}.
}

The local face conformal group remains \(Sp(4,\mathbb R)\cong Spin_0(2,3)\). Flavor CP does not enlarge it merely by existing on a commuting tensor factor.

Conversely, the \(Spin(2,3)\) carrier does not predict the flavor quartet’s value.

## 9. Branch decision

- **Closed:** factor-local four-step traces split into real face and complex flavor factors.
- **Closed:** a common rank-one real face ray reproduces the flavor projector quartet exactly.
- **Closed:** face Jordan and flavor holonomy actions commute.
- **Closed:** tensor-product residues preserve positivity and the real face marginal.
- **Closed:** the face marginal cannot reconstruct the CP phase.
- **Open:** radiative stability of exact face–flavor factor-locality.
- **Open:** classification and observable impact of allowed entangled corrections.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** derive the full Higgs-dressed spectral density with an exact face-Jordan/flavor-commutant decomposition and a nonzero measured projector quartet.

**Factorization falsifier:** a claimed tensor-local residue fails the trace product identity.

**Reality falsifier:** the selected face operation also conjugates flavor and thereby forces every projector quartet real.

**Positivity falsifier:** a proposed factor-local positive residue has a negative eigenvalue.

**Prediction warning:** compatibility of \(Spin(2,3)\) with CP is not a prediction of the CP phase.

## 11. Certificate

The [face/flavor projector-factorization certificate](../../../verification/verify/verify_projector_cp_holonomy_factors_through_real_face_commutant.mjs) checks Kronecker trace factorization, exact recovery on a rank-one real face ray, positivity, face marginal reality, commutation of the two actions and preservation of a nonzero CP-odd quartet.

## Companion documents

- [Projector-quadrilateral holonomy](438_projector_quadrilateral_holonomy_recovers_the_jarlskog_quartet_without_extending_rank_deficient_polar_transport.md)
- [Real face carrier with complex flavor CP](../0100-0199/120_real_face_carrier_complex_flavor_cp.md)
- [Face–flavor entangled spectral checkpoint](../0100-0199/126_face_flavor_entangled_spectral_cp_checkpoint.md)
- [Exchange-real response phase blindness](423_exchange_real_spectral_positivity_supports_the_spin23_carrier_but_cannot_phase_match_the_antiunitaries.md)
