# Exact Gauge-Counterterm Splitting of the Full Lock

**Date:** 17 October 2026  
**Branches:** B01, B05, B06 and B11  
**Claim status:** exact background gauge-mass kernel and invariant decomposition; complete scheme-dependent beta functions and Yukawa terms remain open

## 1. Background-dependent gauge mass matrix

For

\[
L=(u,v,a),
\]

the left weak generators act as \(J_iL\), while the Abelian right generator acts as \(-LJ_3\). The field-dependent gauge mass Gram matrix is constructed from

\[
gJ_1L,quad gJ_2L,quad gJ_3L,quad -g_ELJ_3.
\]

The quartic part of the one-loop vector effective potential is proportional to

\[
\operatorname{Tr}[(M_V^2(L))^2].
\]

The overall polarization, regularization and loop prefactor is conventional. The invariant polynomial inside it is the relevant symmetry statement.

## 2. Exact native-invariant decomposition

Using

\[
A=a^2,qquad B=u^2+v^2,
\]

\[
D=(u^2-v^2)^2+4(u\cdot v)^2,
\qquad
C=(a\cdot u)^2+(a\cdot v)^2,
\]

the exact result is

\[
\boxed{
\begin{aligned}
\operatorname{Tr}[(M_V^2)^2]
={}&g^4\left[
2A^2+2AB+\frac32B^2+\frac12D+2C
\right]\\
&+2g^2g_E^2(B^2-D)+g_E^4B^2.
\end{aligned}
}
\]

This identity holds for arbitrary \(L\), not only at the aligned vacuum.

## 3. Custodial and breaking pieces

When \(g_E=0\), the coefficients obey the custodial relations with an induced combination equivalent to

\[
\lambda_1=\lambda_2=g^4
\]

in the normalization of the invariant kernel. This is expected: gauging the left group alone commutes with the full right \(SO(3)_R\).

The Abelian contribution is

\[
\boxed{
\Delta_E
=\left(2g^2g_E^2+g_E^4\right)B^2
-2g^2g_E^2D.
}
\]

It vanishes only when \(g_E=0\). It changes the \(B^2\) and \(D\) coefficients without the correlated changes in \(A^2,AB,C\) required by custodial symmetry.

Therefore

\[
\boxed{
\text{right-}T_3\text{ gauging radiatively leaves the custodial coefficient locus.}
}
\]

This upgrades the earlier spurion argument to an exact background-field polynomial.

## 4. Meaning for the Jordan programme

The same asymmetry has two descriptions:

- electroweak: hypercharge gauges only \(T_{R3}\), breaking global custodial \(SO(3)_R\);
- Jordan: the native symmetry fixes the trace axis and rotates only the traceless plane.

Thus the source of custodial breaking is not an accidental nuisance added after the fact. It is precisely the structural distinction that makes the external carrier a Jordan algebra rather than an ordinary Euclidean three-vector.

The remaining quantitative task is to combine these quartic shifts with mass, Yukawa and wave-function beta functions, minimize the running potential and calculate the induced \(w/k-1\).

## 5. Branch decision

**Positive:** the complete running predicts a small finite misalignment or an infrared-attractive near-custodial trajectory tied to measured gauge couplings.

**Negative:** independent counterterms must be retuned to maintain \(\rho\), with no source relation controlling them.

**Current result:** scalar loops preserve the enhanced locus, while the Abelian gauge sector breaks it by a completely explicit invariant polynomial.

**Unsafe shortcut:** state that custodial symmetry is radiatively stable because the scalar potential alone has the symmetry.

## 6. Certificate

The [gauge-counterterm certificate](scripts/verify-full-lock-gauge-counterterms.mjs) builds the full \(4\times4\) gauge Gram matrix for arbitrary numerical backgrounds, verifies the invariant decomposition at independent probes and isolates its custodial and Abelian-breaking pieces.

## Companion documents

- [Custodial scalar-loop closure](93_full_lock_custodial_loop_closure.md)
- [General full-lock potential](89_jordan_native_full_lock_potential.md)
- [Custodial alignment and rho sensitivity](92_custodial_alignment_rho_sensitivity.md)
- [Fiveplet charge eigenstates](96_custodial_fiveplet_charge_eigenstates_and_vertices.md)

