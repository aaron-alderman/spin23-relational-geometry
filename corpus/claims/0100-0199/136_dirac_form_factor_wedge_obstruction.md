# Dirac Form Factors and the Phase-Wedge Obstruction

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B08 and B11  
**Claim status:** exact fixed-helicity Hermitian-kernel classification; full Standard-Model form factors remain uncomputed

## 1. The Lorentz-complete reduced face matrix

After a legitimate fixed-helicity or Euclidean test-spinor projection, the Hermitian two-face kernel has the general form

\[
K(p)
=
t(p)I
+z(p)\sigma_z
+x(p)\sigma_x
+y(p)\sigma_y.
\]

The four real coefficients have a direct interpretation:

- \(t\): average positive spectral or kinetic weight;
- \(z\): chiral/axial face imbalance;
- \(x\): scalar left–right connector;
- \(y\): pseudoscalar left–right connector.

In matrix form,

\[
K(p)
=
\begin{pmatrix}
t+z&x-iy\\
x+iy&t-z
\end{pmatrix}.
\]

## 2. Positivity and determinant

The eigenvalues are

\[
\lambda_\pm
=
t\pm\sqrt{x^2+y^2+z^2}.
\]

Thus positivity requires

\[
t\ge0,
\qquad
t^2-x^2-y^2-z^2\ge0.
\]

This is precisely the \(H_2(\mathbb C)\) Lorentz cone. A real carrier is not a different positivity condition; it is a globally selected hyperplane in this cone.

## 3. Chiral rephasing

A fixed relative chiral phase rotates

\[
\begin{pmatrix}x\\y\end{pmatrix}
\longmapsto
\begin{pmatrix}
\cos\alpha&-\sin\alpha\\
\sin\alpha&\cos\alpha
\end{pmatrix}
\begin{pmatrix}x\\y\end{pmatrix}.
\]

For any one momentum, \(\alpha\) can set \(y=0\). The real-carrier question concerns the complete family \(K(p)\).

## 4. The phase-wedge invariant

For two momentum or spectral points define

\[
\boxed{
\mathcal W(p,q)
=
x(p)y(q)-y(p)x(q).
}
\]

This oriented area is invariant under every common chiral rotation.

If

\[
\mathcal W(p,q)\ne0
\]

for any pair, no fixed rotation makes both kernels real.

Conversely, if at least one off-diagonal vector is nonzero and

\[
\mathcal W(p,q)=0
\quad\text{for all }p,q,
\]

all vectors \((x(p),y(p))\) are collinear. One fixed rotation sends that line to the \(x\)-axis, producing a global \(H_2(\mathbb R)\) slice.

Therefore

\[
\boxed{
\text{global real carrier}
\iff
\mathcal W(p,q)=0
\text{ for all spectral pairs}.
}
\]

## 5. Relation to scalar and pseudoscalar form factors

In the Dirac self-energy language,

\[
x(p)\leftrightarrow m_s(p^2),
\qquad
y(p)\leftrightarrow m_p(p^2).
\]

Then

\[
\mathcal W(p,q)
=
m_s(p^2)m_p(q^2)
-m_p(p^2)m_s(q^2).
\]

The wedge vanishes exactly when the scalar/pseudoscalar ratio is momentum independent wherever the denominator is nonzero.

This is the basis-independent observable form of the spectral phase-alignment gate.

## 6. Why this improves the programme

The programme no longer needs to ask vaguely whether a complex phase appears. It must calculate one invariant:

\[
\mathcal W(p,q).
\]

A constant Jarlskog-sourced pseudoscalar term can still give \(\mathcal W=0\) if it remains proportional to the scalar connector. Momentum-dependent absorptive or multi-spurion contributions can make \(\mathcal W\ne0\).

The wedge is invariant under the one field redefinition that otherwise obscures the question.

## 7. Stop-everything criteria

**Preserve \(Spin(2,3)\):** prove \(\mathcal W(p,q)=0\) for the complete physical spectral support, with an anomaly-allowed common rotation.

**Restore \(Spin(2,4)\):** calculate one physical pair with \(\mathcal W(p,q)\ne0\).

**Kernel failure:** if the correct fermionic reflection kernel is not Hermitian positive after the stated projection, neither cone interpretation applies.

## 8. Certificate

The [Dirac phase-wedge certificate](../../../verification/verify/verify-dirac-face-form-factor-wedge.mjs) verifies positivity, the \(H_2(\mathbb C)\) determinant, chiral rotation, rotation invariance of \(\mathcal W\) and the obstruction from a nonzero sample.

## Companion documents

- [Lorentz, dimension, and chiral-phase audit](132_lorentz_dimension_and_chiral_phase_audit.md)
- [Spectral phase-alignment gate](128_spectral_phase_alignment_real_carrier_gate.md)
- [The \(H_2(\mathbb C)\) parent-restoration branch](129_h2c_fallback_restores_spin24_parent.md)
- [Jarlskog-sourced pseudoscalar gate](131_jarlskog_sourced_sigma_y_counterterm_gate.md)
