# \(B-L\) Ward Normalization Reduces the Generated \(\mathfrak{sp}(4,\mathbb R)\) to a Four-Dimensional Solvable Subalgebra

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B11 and the relational-carrier/Jordan-triple branch  
**Claim status:** exact global infinitesimal stabilizer classification in the fixed source frame; physical contact-term policy remains open  
**Certificate:** [classify_bl_ward_compatible_tkk_subalgebra.mjs](scripts/classify_bl_ward_compatible_tkk_subalgebra.mjs)

## Executive result

Let

\[
Z=
\begin{pmatrix}
Z_{\Lambda\Lambda}&Z_{\Lambda B}\\
Z_{\Lambda B}&Z_{BB}
\end{pmatrix}
\]

be the relational response in the fixed incidence/\(B-L\) source frame. An infinitesimal TKK transformation acts as

\[
\delta Z=B+AZ+ZA^T-ZCZ,
\]

with \(B,C\in Sym_2(\mathbb R)\) and \(A\in\mathfrak{gl}(2,\mathbb R)\).

Requiring the Ward-normalized \(B-L\) autocorrelator to remain fixed,

\[
\delta Z_{BB}=0
\]

for **every** symmetric response \(Z\), reduces the ten-dimensional algebra to four generators:

\[
\boxed{
A=
\begin{pmatrix}a&b\\0&0\end{pmatrix},
\qquad
B=
\begin{pmatrix}u&v\\v&0\end{pmatrix},
\qquad
C=0.
}
\]

This four-dimensional algebra is closed and solvable. No special-conformal lower wing survives.

If every correlator involving \(B-L\) is fixed—not only \(Z_{BB}\)—the surviving algebra is only the one-dimensional contact translation of \(Z_{\Lambda\Lambda}\).

## 1. Polynomial stabilizer calculation

Write

\[
Z=\begin{pmatrix}x&y\\y&z\end{pmatrix},
\quad
A=\begin{pmatrix}a&b\\c&d\end{pmatrix},
\quad
B=\begin{pmatrix}u&v\\v&w\end{pmatrix},
\quad
C=\begin{pmatrix}r&s\\s&t\end{pmatrix}.
\]

The protected variation is

\[
(\delta Z)_{22}
=w+2cy+2dz-r y^2-2syz-tz^2.
\]

For this polynomial to vanish for all \(y,z\), every coefficient must vanish:

\[
w=c=d=r=s=t=0.
\]

The free coefficients are

\[
a,b,u,v,
\]

and the certificate verifies that their four symplectic block generators close under every pairwise commutator.

## 2. Stronger protected-row condition

If the full protected row is held fixed,

\[
(\delta Z)_{12}=0,
\qquad
(\delta Z)_{22}=0
\]

for every \(Z\), then the first equation further imposes

\[
v=a=b=0.
\]

Only

\[
B=uE_{11}
\]

survives. This shifts the unprotected incidence/incidence contact term and leaves the mixed and \(B-L\) responses untouched.

## 3. Meaning of the reduction

The full TKK algebra remains the canonical conformal completion of the response carrier. It is not compatible with treating the \(B-L\) current as one fixed, quantized, Ward-normalized source inside a single theory.

Fractional generators with \(C\ne0\) necessarily change \(Z_{BB}\) somewhere on the domain. Lower-row middle generators mix the nonconserved incidence source into \(B-L\). Both conflict with the protected-current interpretation.

Thus the physical hierarchy becomes

\[
\mathfrak{sp}(4,\mathbb R)_{\rm generated}
\supset
\mathfrak p_{B-L}^{(4)}
\supset
\mathbb R_{\rm incidence\ contact}.
\]

The appropriate member depends on which contact and mixed-response data are declared physical.

## 4. Relation to earlier UV reduction

[Document 641](641_uv_normalization_generically_reduces_diagonal_siegel_locking_to_a_discrete_spectral_symmetry.md) classified stabilization by ultraviolet matrices. The present reduction is logically different:

- UV normalization fixes asymptotic response tensors;
- Ward normalization fixes the identity and normalization of one source operator.

Their intersection can only be smaller. A physical full-group claim must pass both gates.

## 5. Stop-everything criteria

Stop calling the full generated \(Sp(4,\mathbb R)\) a symmetry of the fixed-current theory if:

1. \(B-L\) charge normalization is physical and quantized;
2. a generator changes \(Z_{BB}\) across the response domain;
3. a transformation mixes the nonconserved incidence source into the conserved current;
4. special-conformal response transformations are used without transforming the Ward data;
5. contact translations are counted as physical without a subtraction policy.

## 6. Next gates

1. Intersect the four-dimensional Ward-compatible algebra with UV-normalization stabilizers.
2. Decide whether mixed \(Z_{\Lambda B}\) contact terms are measurable or scheme data.
3. Include Majorana breaking, where continuous \(B-L\) protection is lost.
4. Test whether the full group can instead act as a duality between theories with transformed current normalization.

## Reproducibility

```powershell
node scripts\classify_bl_ward_compatible_tkk_subalgebra.mjs
```
