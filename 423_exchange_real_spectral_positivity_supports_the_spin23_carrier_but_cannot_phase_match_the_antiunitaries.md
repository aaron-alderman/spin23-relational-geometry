# Exchange-Real Spectral Positivity Supports the \(Spin(2,3)\) Carrier but Cannot Phase-Match the Antiunitaries

**Date:** 17 October 2026  
**Branches:** B02, B03, B06, B08 and B11  
**Claim status:** exact fixed-cone and phase-blindness theorem; microscopic Higgs-dressed spectral alignment remains open

## 1. Question resolved

Could the Higgs-dressed positive response fix the phase of the weak CAR real structure and thereby close the exceptional/Furey determinant-line sewing problem?

The answer is:

\[
\boxed{\text{not from positivity and exchange-real reciprocity alone}.}
\]

Those conditions can select the correct three-dimensional Jordan cone and hence support the \(Spin_0(2,3)\) carrier. But they see only the adjoint action of the antiunitary, which is invariant under arbitrary rephasing of that antiunitary.

## 2. Exact exchange-real fixed cone

Let

\[
J=\sigma_x\mathcal K,
\]

where \(\mathcal K\) is coefficient conjugation. A Hermitian response

\[
R=\begin{pmatrix}a&c\\ \bar c&d\end{pmatrix}
\]

is exchange-real when

\[
R=JRJ^{-1}=\sigma_x\bar R\sigma_x.
\]

Direct calculation gives only

\[
a=d.
\]

Thus

\[
R(a,c)=
\begin{pmatrix}
a&c\\
\bar c&a
\end{pmatrix},
\qquad a\in\mathbb R,quad c\in\mathbb C.
\]

This is a three-real-dimensional Jordan algebra. Its determinant and eigenvalues are

\[
\det R=a^2-|c|^2,
\qquad
\lambda_\pm=a\pm|c|.
\]

Therefore its positive cone is

\[
\boxed{a\ge |c|,}
\]

the three-dimensional Lorentz cone. A fixed unitary rotation identifies it with \(H_2(\mathbb R)_+\), preserving the established route

\[
H_2(\mathbb R)
\Longrightarrow Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

## 3. Rephasing the antiunitary changes nothing observable here

For any \(\phi\), define

\[
J_\phi=e^{i\phi}J.
\]

Because \(J\) is antiunitary,

\[
J_\phi^2=J^2.
\]

For every linear response operator \(R\),

\[
J_\phi R J_\phi^{-1}=JRJ^{-1}.
\]

Hence all \(J_\phi\) have exactly the same:

- fixed response algebra;
- positive cone;
- determinant;
- spectral-positivity conditions;
- induced Jordan and conformal groups.

No measurement confined to this adjoint response action can determine \(\phi\).

This proves that the exchange-real \(H_2(\mathbb R)\) carrier and the absolute phase of its implementing antiunitary are logically different data.

## 4. Positive residues do not secretly restore the phase

For every angle \(\theta\), the vector

\[
w_\theta=
\begin{pmatrix}1\\e^{-i\theta}\end{pmatrix}
\]

gives a positive rank-one residue

\[
\rho_\theta=w_\theta w_\theta^\dagger
=
\begin{pmatrix}
1&e^{i\theta}\\
e^{-i\theta}&1
\end{pmatrix}.
\]

Every \(\rho_\theta\) is:

- positive semidefinite;
- rank one;
- exchange-real under the same \(J\);
- on the boundary \(a=|c|\) of the Lorentz cone.

Thus positivity plus exchange reality allows the full circle of off-diagonal phases. A spectral sum

\[
R(z)=\sum_n\frac{\rho_{\theta_n}}{m_n^2-z}
\]

remains in the same complexified response Jordan system while the residues may carry different \(\theta_n\).

## 5. Ordinary real reciprocity is a stronger, basis-dependent condition

One may instead ask for a face basis in which every residue is real symmetric. A relative face rephasing multiplies every off-diagonal residue coefficient by the same unit phase. Therefore a collection \(c_n\) can be made simultaneously real exactly when

\[
\boxed{
\operatorname{Im}(c_n\bar c_m)=0
\quad\text{for all }m,n.
}
\]

This pairwise-collinearity condition is invariant under face rephasing. Positivity does not imply it: \(c_1=1\) and \(c_2=i\) give positive exchange-real rank-one residues but violate it.

Even when the condition holds, it selects a real face convention only up to sign. It still does not compare the phase of an exceptional antiunitary with that of a Furey antiunitary unless the same microscopic sewing law defines both.

## 6. Higgs dressing: what is established and what is not

Higgs dressing remains essential because it can:

- make the two chiral faces transform with compatible unbroken charges;
- permit a neutral off-diagonal response;
- supply a mass/Yukawa mixing coefficient;
- provide a candidate microscopic relation among residue phases.

But the abstract facts

\[
\text{gauge neutrality}
+\text{ positivity}
+\text{ exchange reality}
\]

do not fix the absolute antiunitary phase. A genuine phase anchor must be a matrix element, orientation or sewing tensor that transforms when \(J\) is rephased, not merely an adjoint-invariant response.

## 7. Consequence for the synthesis

Two branches now separate cleanly:

### Carrier branch

\[
\text{exchange-real positive response}
\Longrightarrow H_2(\mathbb R)_+
\Longrightarrow Spin_0(2,3).
\]

This route remains mathematically intact.

### Exceptional/Furey phase-sewing branch

\[
\mathbb Z_3\times U(1)
\xrightarrow{\text{phase-matched antiunitaries}}
\mathbb Z_3\times\mathbb Z_2.
\]

Response positivity and the fixed cone cannot supply the required phase matching. The sewing datum must live one categorical level below the adjoint response: in a phased state, amplitude, Pfaffian or explicit intertwiner.

## 8. Branch decision

- **Closed:** the exchange-real Hermitian fixed set is a Lorentz cone isomorphic to \(H_2(\mathbb R)_+\).
- **Closed:** its definition and positivity are invariant under arbitrary rephasing of \(J\).
- **Closed:** positive exchange-real residues can carry arbitrary off-diagonal phases.
- **Closed:** simultaneous ordinary realification of all residues is equivalent to pairwise phase collinearity.
- **Open:** whether the microscopic Higgs/Furey spectral density satisfies that collinearity condition.
- **Pinned:** response-level positivity cannot phase-match the exceptional and Furey antiunitaries.

## 9. Stop-everything and falsification gates

**Carrier trigger:** derive the full gauge-invariant Higgs-dressed fermionic kernel and prove that every spectral residue lies in the exchange-real cone without projection.

**Phase trigger:** derive a normalized microscopic amplitude that transforms nontrivially under \(J\mapsto e^{i\phi}J\) and matches it to the exceptional determinant line.

**Positivity falsifier:** exhibit a proposed physical residue outside the positive cone after the correct fermionic reflection matrix and contact terms are included.

**Realification falsifier:** find two nonzero residues with \(\operatorname{Im}(c_n\bar c_m)\ne0\) while claiming one face rephasing makes the full spectral measure real.

**Category-error falsifier:** use an adjoint-invariant response condition to claim selection of the absolute phase of its implementing antiunitary.

## 10. Certificate

The [exchange-real response phase-blindness certificate](scripts/verify_exchange_real_response_is_antiunitary_phase_blind.mjs) verifies the fixed-set condition, Lorentz-cone spectrum, arbitrary-phase positive residues, invariance under antiunitary rephasing and the simultaneous-realification obstruction.

## Companion documents

- [Conditional CAR real-structure phase selection](422_a_specified_car_real_structure_reduces_the_weak_phase_to_a_sign_but_does_not_canonically_choose_that_real_structure.md)
- [Neutrino face pair and Higgs dressing](415_the_neutrino_face_pair_yields_h2r_only_after_car_conjugation_and_higgs_dressing.md)
- [Dressed chiral spectral positivity](119_dressed_chiral_spectral_positivity.md)
- [Free Dirac chiral OS carrier](121_free_dirac_chiral_os_h2_carrier.md)
