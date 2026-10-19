# Seesaw Matching of the Composite Exceptional Determinant

**Date:** 17 October 2026  
**Branches:** B03, B05, B06, B09 and B11  
**Claim status:** exact leading tree-level heavy-field matching; ultraviolet coefficient and multi-flavor embedding remain open

## 1. High-energy operator

Use one heavy left-handed sterile field \(N=\nu^c\), with

\[
\mathcal L_N
\supset
-\frac12M_RNN
-y_\nu(LH)N
+\text{h.c.}
\]

and the baryon-safe composite exceptional interaction

\[
\mathcal L_{\rm ex}
\supset
\frac{C}{\Lambda^5}
(QN)(QN)(u^cd^c)
+\text{h.c.}
\]

All parentheses denote the previously specified Lorentz and gauge contractions. The high-energy operator has dimension nine.

## 2. Leading heavy-field equation

At energies well below \(|M_R|\), and to first order in \(C/\Lambda^5\), the sterile equation of motion is

\[
M_RN+y_\nu(LH)=0,
\]

so

\[
\boxed{
N=-\frac{y_\nu}{M_R}(LH)
+O(M_R^{-2}\partial,C).
}
\]

Substituting this classical solution into the dimension-nine operator gives

\[
\boxed{
\mathcal L_{\rm eff}
\supset
\frac{Cy_\nu^2}{\Lambda^5M_R^2}
\big[Q(LH)\big]
\big[Q(LH)\big]
(u^cd^c)
+\text{h.c.}
}
\]

This is the leading tree-level matching term. Directly contracting the two sterile fields at the same vertex would instead be a loop/contact renormalization question and should not replace the classical matching.

## 3. Dimension and charge ledger

The low-energy operator contains:

- six Weyl fermions: \(Q,Q,L,L,u^c,d^c\), total dimension nine;
- two Higgs scalars, total dimension two.

Therefore

\[
\dim\mathcal O_{11}=11,
\]

and its coefficient has dimension

\[
-5-2=-7,
\]

as required for a four-dimensional Lagrangian.

Its quantum numbers are

\[
Y:
2\left(\frac16-\frac12+\frac12\right)
-\frac23+\frac13=0,
\]

\[
\Delta B:
2\left(\frac13\right)
-\frac13-\frac13=0,
\]

and

\[
\boxed{\Delta L=2.}
\]

The hermitian conjugate supplies the \(\Delta L=-2\) orientation.

## 4. Sterile rephasing invariant coefficient

Under a sterile basis rephasing

\[
N\mapsto e^{i\alpha}N,
\]

the couplings transform as

\[
y_\nu\mapsto e^{-i\alpha}y_\nu,
\qquad
M_R\mapsto e^{-2i\alpha}M_R,
\qquad
C\mapsto e^{-2i\alpha}C,
\]

because the exceptional operator contains \(N^2\).

Hence

\[
\boxed{
C_{\rm eff}
=C\frac{y_\nu^2}{M_R^2}
}
\]

is invariant under the sterile rephasing. Its phase is not a basis convention.

This is the precise phase that can carry the antiunitary-odd orientation after heavy-neutrino matching.

## 5. Electroweak-broken form

After replacing both Higgs fields by the neutral vacuum value \(v\),

\[
\mathcal O_{11}
\longrightarrow
v^2(Q L)(Q L)(u^cd^c),
\]

and the coefficient becomes

\[
\frac{Cy_\nu^2v^2}{\Lambda^5M_R^2}.
\]

Using the one-generation seesaw relation

\[
m_\nu=-\frac{y_\nu^2v^2}{M_R},
\]

this can be written

\[
\boxed{
-\frac{C}{\Lambda^5}\frac{m_\nu}{M_R}.
}
\]

The low-energy six-fermion interaction is suppressed both by \(\Lambda^{-5}\) and by the seesaw ratio \(m_\nu/M_R\).

## 6. What phase is physical with one generation

Without \(C\), a one-generation seesaw has enough field rephasings to remove the phases of \(y_\nu\) and \(M_R\); it has no ordinary leptonic CP invariant.

The composite interaction adds a third complex coefficient. The invariant phase of

\[
C\frac{y_\nu^2}{M_R^2}
\]

is physical **relative to the new exceptional operator**.

Therefore this construction does not derive the previously found multi-flavor invariant

\[
J_M
=\operatorname{ImTr}(H_e^*MH_eM^\dagger MM^\dagger).
\]

Instead, it adds a new high-dimension CP phase unless the exceptional/Furey structure fixes \(C\) in terms of the existing Yukawa and Majorana data.

This is the central predictivity gate.

## 7. Multi-flavor extension

With several sterile fields and generations,

\[
N=-M_R^{-1}Y_\nu^T(LH)+\cdots.
\]

The high-energy determinant coefficient becomes a tensor in complement/species space. Matching produces contractions containing two copies of \(M_R^{-1}Y_\nu^T\).

Because polarized determinant coefficients proliferate as \(\binom{n+2}{3}\), a multi-flavor completion can easily introduce more CP tensors than the low-energy Majorana sector contains. A successful exceptional embedding must reduce this tensor space rather than merely populate it.

## 8. Phenomenological interpretation

The broken-phase operator contains four quark fields and two lepton fields. It is baryon conserving and lepton-number violating, so it belongs to the broad class of short-distance \(\Delta L=2\) interactions relevant to rare processes rather than ordinary neutrino oscillations.

No rate is predicted here because \(C\), \(\Lambda\), flavor contractions and hadronic matching are unknown. Experimental comparison must wait until those data are fixed.

## 9. Relation to the Jordan/\(Spin(2,3)\) carrier

The matching establishes a legal route

\[
\text{exceptional odd determinant}
\to
\text{sterile-neutrino composite}
\to
\Delta L=2\text{ low-energy operator}.
\]

It does not yet involve the external \(H_2(\mathbb R)\) response. To connect \(Spin(2,3)\), one must show that the same odd coefficient controls an orientation-sensitive two-face response or boundary observable.

Otherwise the exceptional determinant remains an internal high-dimension interaction independent of the Jordan response carrier.

## 10. Stop-everything and falsification gates

**Coefficient selection:** the Furey/exceptional embedding fixes \(C\) as a definite function of \(Y_\nu,M_R\), eliminating the new independent CP phase.

**Invariant descent:** the multi-flavor matching reduces to a fixed multiple of \(J_M\) or another already-measurable Majorana invariant.

**Response bridge:** the same matched coefficient appears in an external reciprocal-response observable.

**Phenomenological success:** a calculable \(\Delta L=2\) rate follows after fixing \(\Lambda\) from the same theory.

**Arbitrariness failure:** \(C\) is an independent Wilson tensor, so the construction increases rather than reduces the CP parameter count.

**Decoupling:** the \(m_\nu/M_R\) suppression makes every effect unobservable and constrains no other sector.

## 11. Certificate

The [composite-determinant seesaw certificate](../../../verification/verify/verify_composite_determinant_seesaw_matching.mjs) verifies operator dimensions, gauge and baryon/lepton charges, sterile-rephasing invariance and the electroweak-broken coefficient identity.

## Companion documents

- [Composite exceptional complement](187_neutrino_completion_unlocks_composite_exceptional_complement.md)
- [Neutral Fock action and seesaw separation](171_neutral_fock_action_and_positive_response_separation.md)
- [Polynomial Majorana invariant](182_low_degree_polynomial_majorana_cp_invariant.md)
- [Oriented exceptional cubic](185_oriented_exceptional_flag_unique_cubic_odd_invariant.md)
