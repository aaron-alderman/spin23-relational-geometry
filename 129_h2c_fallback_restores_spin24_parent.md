# The \(H_2(\mathbb C)\) Fallback Restores the \(Spin(2,4)\) Parent

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B08 and B11  
**Claim status:** standard Jordan/conformal identification plus explicit matrix verification; physical selection remains open

## 1. Why this fallback matters

The spectral phase-alignment gate produced a clean alternative:

\[
\text{aligned off-diagonal phase}
\Rightarrow H_2(\mathbb R),
\]

\[
\text{unavoidable relative phase}
\Rightarrow H_2(\mathbb C).
\]

The second path is not a small correction to the first. It restores the programme’s larger parent geometry.

## 2. The two determinant cones

Write the real carrier as

\[
X_{\mathbb R}=
\begin{pmatrix}
t+z&x\\
x&t-z
\end{pmatrix}.
\]

Then

\[
\det X_{\mathbb R}=t^2-x^2-z^2.
\]

The complex Hermitian carrier is

\[
X_{\mathbb C}=
\begin{pmatrix}
t+z&x-iy\\
x+iy&t-z
\end{pmatrix},
\]

with

\[
\det X_{\mathbb C}=t^2-x^2-y^2-z^2.
\]

Thus the imaginary off-diagonal response is literally one additional spacelike Jordan coordinate.

The fixed real slice is

\[
y=0.
\]

## 3. Conformal groups

The standard conformal groups of these simple Euclidean Jordan algebras are

\[
\operatorname{Conf}(H_2(\mathbb R))
\simeq Sp(4,\mathbb R)
\simeq Spin_0(2,3),
\]

and

\[
\operatorname{Conf}(H_2(\mathbb C))
\simeq SU(2,2)
\simeq Spin_0(2,4),
\]

up to the familiar finite covering and central quotients.

Their Lie-algebra dimensions are

\[
\dim\mathfrak{so}(2,3)=10,
\qquad
\dim\mathfrak{so}(2,4)=15.
\]

The difference is exactly five.

## 4. The \(10+5\) decomposition returns

Choose a spacelike unit direction in \(\mathbb R^{2,4}\). Its stabilizer is

\[
SO_0(2,3).
\]

At Lie-algebra level,

\[
\mathfrak{so}(2,4)
=
\mathfrak{so}(2,3)\oplus\mathfrak m,
\qquad
\dim\mathfrak m=5.
\]

The explicit generators satisfy the symmetric-pair relations

\[
[\mathfrak h,\mathfrak h]\subset\mathfrak h,
\qquad
[\mathfrak h,\mathfrak m]\subset\mathfrak m,
\qquad
[\mathfrak m,\mathfrak m]\subset\mathfrak h,
\]

where \(\mathfrak h=\mathfrak{so}(2,3)\).

Therefore the complex-carrier fallback reproduces the original \(10+5\) selector problem exactly:

\[
\boxed{
\text{failure of the real spectral slice}
\Longleftrightarrow
\text{restoration of the }Spin(2,4)\text{ parent geometry}.
}
\]

## 5. Interpreting the missing spectral phase

The dangerous marginal identified previously is the flavor-singlet coefficient of

\[
\sigma_y\otimes I_3.
\]

On the Jordan carrier this is the coordinate \(y\). Setting it to zero gives \(H_2(\mathbb R)\); allowing it gives all of \(H_2(\mathbb C)\).

This ties three formerly separate calculations together:

1. the real-structure selector removes one carrier coordinate;
2. the conformal algebra loses five generators;
3. spectral phase alignment is the dynamical condition that keeps the removed coordinate from reappearing.

The five generators are not five extra coordinates of the Jordan algebra. They are the conformal orbit directions restored when the selected hyperplane is no longer preserved.

## 6. Consequence for the central \(Spin(2,3)\) claim

\(Spin(2,3)\) is no longer merely one attractive subgroup of a larger conformal group. Within this response construction it is the exact conformal symmetry of the phase-aligned real slice.

But the burden of proof becomes equally exact:

> Why does the physical dressed spectral response preserve one common real off-diagonal phase across all poles and cuts?

If this cannot be derived, the natural response geometry is \(H_2(\mathbb C)\) and the symmetry returns to \(Spin(2,4)\).

## 7. Physical cost of the complex branch

Moving to \(H_2(\mathbb C)\):

- adds the imaginary relational coordinate;
- enlarges the determinant cone from signature \((1,2)\) to \((1,3)\);
- enlarges the conformal algebra from dimension \(10\) to \(15\);
- removes the specific \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) identification as the full conformal symmetry;
- reopens the selector/holonomy problem instead of solving it.

It may still be the correct branch. It simply cannot be treated as a harmless complexification.

## 8. Stop-everything criteria

**Advance the \(Spin(2,3)\) branch:** derive an all-orders identity that fixes \(y=0\), equivalently the common spectral phase.

**Advance the parent branch:** prove that absorptive, CP or gauge effects necessarily generate \(y\ne0\); then \(Spin(2,4)\) is dynamically restored.

**Falsify the claimed descent:** exhibit two unavoidable physical spectral contributions with inequivalent singlet cross-face phases.

**Reopen the selector:** if \(H_2(\mathbb C)\) is required, determine whether a vacuum, boundary normal or stress tensor dynamically selects a spacelike direction and recovers \(Spin(2,3)\) only at low energy.

## 9. Certificate

The [parent-restoration certificate](scripts/verify-h2c-parent-restoration.mjs) checks both determinant forms, the \(10+5\) dimension count, an explicit \(\mathfrak{so}(2,3)\subset\mathfrak{so}(2,4)\) stabilizer and the symmetric-pair commutator pattern.

## Companion documents

- [Spectral phase alignment as the real-carrier gate](128_spectral_phase_alignment_real_carrier_gate.md)
- [Jordan selection axioms and the \(Spin(2,4)\to Spin(2,3)\) descent](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [The \(10+5\) selector branch](50_the_10_plus_5_selector_branch.md)
- [Grand synthesis](40_grand_synthesis_spin23_pole.md)
