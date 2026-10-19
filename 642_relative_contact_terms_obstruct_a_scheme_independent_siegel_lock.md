# Relative Contact Terms Obstruct a Scheme-Independent Siegel Lock

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B05, B07 and B08  
**Claim status:** exact obstruction on a totally geodesic scalar slice; microscopic subtraction relation remains open  
**Certificate:** [test_contact_scheme_dependence_of_siegel_lock.mjs](scripts/test_contact_scheme_dependence_of_siegel_lock.mjs)

## Executive result

The squared Siegel geodesic distance is invariant under a **common** contact translation,

\[
(Z_{\rm top},Z_{\rm chi})\mapsto
(Z_{\rm top}+Q,Z_{\rm chi}+Q),
\qquad Q=Q^T\in Sym_2(\mathbb R).
\]

It is not invariant under independent finite counterterms. Such shifts change only the real contact parts and leave spectral imaginary parts unchanged. Therefore

\[
\boxed{
d_{\mathfrak H_2}(Z_{\rm top},Z_{\rm chi})^2
\text{ is not by itself a scheme-independent spectral observable.}
}
\]

A physical lock needs a common microscopic subtraction rule, an operationally fixed relative contact term, or a reformulation using contact-insensitive data.

## 1. Exact scalar-slice witness

Take the totally geodesic scalar slice

\[
Z=zI_2,
\qquad \operatorname{Im}z>0.
\]

The trace metric restricts to two copies of the upper-half-plane metric, hence

\[
d_{\mathfrak H_2}(z_1I_2,z_2I_2)
=\sqrt2\,d_{\mathbb H}(z_1,z_2).
\]

Start from two identical responses,

\[
Z_{\rm top}=Z_{\rm chi}=iI_2.
\]

Their locking distance vanishes. Add an independent real contact term to only the chiral response:

\[
Z_{\rm chi}\mapsto(q+i)I_2.
\]

Then

\[
d_{\mathfrak H_2}\bigl(iI_2,(q+i)I_2\bigr)
=\sqrt2\,\operatorname{arcosh}\!\left(1+\frac{q^2}{2}\right).
\]

This is positive for every \(q\ne0\), grows without bound with \(|q|\), and appears despite identical imaginary parts.

## 2. What remains invariant

A common translation by \(Q\) is a genuine Siegel isometry:

\[
d(Z_{\rm top}+Q,Z_{\rm chi}+Q)
=d(Z_{\rm top},Z_{\rm chi}).
\]

Thus the lock naturally depends on the relative contact tensor

\[
\Delta Q=Q_{\rm chi}-Q_{\rm top}.
\]

That tensor is physical only if the theory or measurement protocol supplies a shared subtraction convention. If the two sectors admit independent finite counterterms, \(\Delta Q\) is scheme data and the numerical locking energy is arbitrary.

## 3. Why this matters for the proposed carrier identification

The topology and chiral carriers arise from different constructions. Merely placing both response matrices in \(\mathfrak H_2\) does not prove that their real contact terms share one renormalization prescription.

The nonlinear geometry solves the positivity-versus-noncompact-symmetry problem, but it does not solve this typing problem:

\[
\text{common response domain}
\not\Rightarrow
\text{common subtraction scheme}.
\]

Consequently the diagonal lock is presently a valid geometric functional and a conditional physical interaction, not yet a scheme-independent prediction.

## 4. Three viable continuations

### 4.1 Derive a shared subtraction condition

A single microscopic action may force the same local counterterm on both response sectors. Then \(\Delta Q\) becomes fixed and the geodesic lock is well-defined.

### 4.2 Use contact-insensitive response data

Constant contacts disappear under a spectral derivative and do not affect the imaginary boundary measure. Candidate observables should therefore be built from

\[
\partial_z Z_a(z),
\qquad \operatorname{Im}Z_a(\omega+i0),
\qquad d\mu_a(\omega),
\]

with positivity and covariance rechecked rather than assumed.

### 4.3 Fix the relative contact operationally

A measurement convention at one reference frequency can set \(\Delta Q\). This yields an operational lock, though it is then conditional on that calibration rather than an absolute spectral invariant.

## 5. Stop-everything criterion

Stop calling the full-point geodesic distance an observable locking energy if all of the following hold:

1. topology and chiral responses allow independent local finite counterterms;
2. no microscopic symmetry relates those counterterms;
3. no common calibration fixes their difference;
4. the proposed prediction changes when \(\Delta Q\) changes.

Under those conditions the lock measures a subtraction choice, not new physics.

## 6. New high-value gate

The immediate question is now precise:

\[
\boxed{
\text{Can one derive a common counterterm algebra for the topology and chiral responses?}
}
\]

If yes, the geodesic lock survives as a physical candidate. If no, the branch should move to spectral measures or contact-insensitive derivatives.

## Reproducibility

```powershell
node scripts\test_contact_scheme_dependence_of_siegel_lock.mjs
```
