# Higgs Compensation Restores Gauge Invariance but Can Break Peirce Closure

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08 and B11  
**Claim status:** exact minimal charge-tensor and Schur-leakage model; coefficient and full Furey-Higgs embedding remain open

## 1. Two different invariance questions

For the completed linking faces \((E,C,D)\),

\[
Y_{\rm face}=\operatorname{diag}(0,1,0),
\qquad
p=p_E+p_D.
\]

Two conditions must not be conflated:

\[
[H,Q_{\rm total}]=0
\]

for gauge invariance, and

\[
[H,p\otimes I]=0
\]

for Peirce closure.

A compensator can make the first true while leaving the second false.

## 2. Charged compensated transition

The face transition

\[
T_{EC}=|E\rangle\langle C|
\]

has hypercharge \(-1\). Let a scalar operator

\[
\phi_+=|1\rangle\langle0|
\]

raise compensator charge by \(+1\). Then

\[
H_c
=g\left(
T_{EC}\otimes\phi_+
+T_{EC}^\dagger\otimes\phi_+^\dagger
\right)
\]

obeys

\[
\boxed{[H_c,Q_{\rm total}]=0.}
\]

But \(T_{EC}\) maps between the \(p\) and \(q=p_C\) sectors, so

\[
\boxed{[H_c,p\otimes I]\ne0.}
\]

Gauge invariance has been restored by the scalar, not by making the face transition neutral.

## 3. Neutral transition

The neutrino relation

\[
T_{ED}=|E\rangle\langle D|
\]

is neutral on the face factor. Its Hermitian completion satisfies both

\[
[H_n,Q_{\rm total}]=0,
\qquad
[H_n,p\otimes I]=0.
\]

Thus the neutrino channel acts internally to the Peirce corner while the charged-lepton channel can cause compensated leakage.

## 4. Exact Schur correction

Give the \(q\)-sector a gap \(\Delta\). Compressing to \(p\) gives

\[
\Sigma(z)
=PH_cQ(QHQ-z)^{-1}QH_cP.
\]

In the minimal model,

\[
\boxed{
\Sigma(z)
=\frac{g^2}{\Delta-z}
|\ell\rangle\langle\ell|,}
\]

where \(|\ell\rangle\) is one light face/compensator state. The correction is rank one.

This is precisely the residue class already proved unable to preserve the Lorentz/Jordan determinant unless \(g=0\) or additional degenerate channels complete it.

## 5. Consequence for the four Higgs channels

The conventional four Yukawa contractions are gauge covariant, but that fact alone does not say whether their Furey face realization stays inside the neutral Peirce corner.

Channel by channel one must determine:

- the linking-face source and target;
- the compensating Higgs orientation;
- whether the face part commutes with \(p\);
- the complement gap;
- the Schur residue on \(H_2(\mathbb R)\).

The neutrino arrow passes the face-closure test. Charged channels involving the \(C\) face require either decoupling, enlarged carrier treatment or controlled leakage.

## 6. Three consistent architectures

1. **Exact corner theory:** charged compensated transitions do not act on the response corner, so \(g=0\) in the response sector.
2. **Emergent corner theory:** \(C\)-face modes are heavy and \(g^2/\Delta\) is small; Spin\((2,3)\) is approximate.
3. **Unital block carrier:** retain \(M_2\oplus\mathbb C\) and treat the \(C\)-population as part of the response, abandoning a closed three-coordinate carrier until a later reduction.

The mathematics does not choose among these.

## 7. Stop-everything and falsification gates

**Exact-decoupling trigger:** Furey's action places every charged Higgs compensator in the matter factor, leaving the neutral response projector untouched.

**Controlled-leakage trigger:** the complement gap and coupling are derived and predict a small determinant anisotropy.

**Enlargement trigger:** charged response data are indispensable, forcing \(M_2\oplus\mathbb C\) or the full \(M_3\) as the physical carrier.

**Falsifier:** total gauge covariance is cited as proof of Peirce closure without evaluating \([H,p\otimes I]\).

## 8. Certificate

The [Higgs-compensated Peirce-leakage certificate](scripts/verify_higgs_compensated_peirce_leakage.mjs) constructs a total-charge-invariant charged transition, verifies its nonzero Peirce commutator, contrasts the neutral transition and computes the exact rank-one compressed self-energy.

## Companion documents

- [Peirce compression and conditional dynamics](261_peirce_compression_is_a_cp_retraction_not_a_unital_full_algebra_expectation.md)
- [Factor-local selector/Yukawa commutant](255_factor_local_selector_commutes_with_full_one_generation_yukawa_operator.md)
- [Full one-generation Higgs portal](237_full_one_generation_higgs_yukawa_portal_is_gauge_covariant.md)
- [Rank-one determinant no-go](257_any_nonzero_rank_one_selector_schur_correction_breaks_lorentz_determinant_symmetry.md)
