# Frontier Wave 3 — The Unique (QQ)-Kernel Functional and Its Provenance Boundary

**Date:** 18 October 2026  
**Status:** exact uniqueness theorem; provenance remains open  
**Depends on:** [finite-geometry commutant audit](frontier_wave3_provenance_01_furey_data_leave_the_safe_projector_transitive.md)

## Result

Once the exceptional Clebsch covector

\[
q_{QQ}=(1,1,1)
\]

is admitted as normalized data on the mediator multiplicity space, the desired orthogonal safe projector is unique:

\[
P_{QQ}
=I-\frac{q_{QQ}^\dagger q_{QQ}}{q_{QQ}q_{QQ}^\dagger}
=
\begin{pmatrix}
\frac23&-\frac13&-\frac13\\
-\frac13&\frac23&-\frac13\\
-\frac13&-\frac13&\frac23
\end{pmatrix}.
\]

Its image is

\[
\operatorname{im}P_{QQ}=\ker q_{QQ}.
\]

This answers the linear-algebra question completely. It does **not** answer the finite-geometry provenance question, because the current Furey construction does not derive (q_{QQ}) as a covector on the exceptional triplet-copy space.

## 1. Positive selector functional

Define the normalized rank-one danger projector

\[
A_{QQ}=\frac{q_{QQ}^\dagger q_{QQ}}
{q_{QQ}q_{QQ}^\dagger}.
\]

For any rank-two Hermitian projector (P), define

\[
F_{QQ}(P)=\operatorname{Tr}(A_{QQ}P)
=\frac{\|Pq_{QQ}^\dagger\|^2}{\|q_{QQ}\|^2}.
\]

Then

\[
F_{QQ}(P)\ge0.
\]

Moreover,

\[
F_{QQ}(P)=0
\Longleftrightarrow
Pq_{QQ}^\dagger=0.
\]

Because a rank-two projector has a one-dimensional kernel, this is equivalent to

\[
\ker P=\operatorname{span}(q_{QQ}^\dagger),
\]

and hence

\[
\boxed{F_{QQ}(P)=0\Longleftrightarrow P=P_{QQ}.}
\]

Thus (F_{QQ}) is the simplest possible unique selector.

## 2. Why this is not the result wave 3 was seeking

The covector (q_{QQ}) comes from the explicit (Spin(10)) component Clebsch table. It is already the numerical statement that all three triplet copies couple to (QQ) with equal normalized coefficient.

Using it to define \(\ker q_{QQ}\) proves which plane is safe. It does not show that the Furey finite geometry:

- contains the three-dimensional mediator multiplicity space;
- represents the three unified scalar origins;
- produces their relative Clebsch normalization;
- represents (A_{QQ}) as a central or spectral finite-geometry operator;
- protects its kernel against allowed heavy mixing and counterterms.

The distinction is

\[
\text{source-level kernel}
\ne
\text{finite-geometry-derived central sector}.
\]

Wave 2 already showed that an inserted central sector protects the split. Wave 3 shows that the existing Furey data do not generate the non-scalar operator needed to insert the correct one without external Clebsch input.

## 3. Covariance is not selection

Under a mediator basis change (U\in U(3)),

\[
q_{QQ}\mapsto q_{QQ}U^\dagger,
\qquad
P_{QQ}\mapsto UP_{QQ}U^\dagger.
\]

The formula is covariant. This means it is basis independent once (q_{QQ}) is physical data. It does not make (q_{QQ}) an invariant generated from the Furey tensors.

Before (q_{QQ}) is supplied, (U(3)) acts transitively on the possible danger lines. After it is supplied, the stabilizer is (U(2)\times U(1)) and its orthogonal complement is fixed. The entire selection occurs at that insertion.

## 4. Available alternatives and their residual moduli

| data on (W\) | projector family left | conclusion |
|---|---|---|
| rank (2+1) only | \(\mathbb{CP}^2\) | four real moduli |
| KO-six conjugate pairing | \(\mathbb{CP}^2\) | no reduction |
| extra condition (P=\bar P\) | \(\mathbb{RP}^2\) | two real moduli |
| one safe electron line | \(\mathbb{CP}^1\) | two real moduli |
| one real safe electron line | \(\mathbb{RP}^1\) | one real modulus |
| named danger line (q_{QQ}^\dagger\) | one point | unique, but datum imported |
| nondegenerate Hermitian (K_W\) | three rank-two spectral complements | finite, provided (K_W\) is derived |
| named simple eigenline of (K_W\) | one point | unique if it equals (q_{QQ}^\dagger\) |

## 5. Minimal positive construction still needed

The smallest genuine provenance result would construct a source map

\[
Y_F:W\longrightarrow\mathcal C_F,
\]

from the triplet multiplicity to a Furey current or arrow carrier, together with an independently fixed positive form \(G_F\) on \(\mathcal C_F\). It would then derive

\[
K_W=Y_F^\dagger G_FY_F.
\]

To solve the safe-projector problem, the following must all be checked:

1. (K_W\) is non-scalar and gauge equivariant;
2. its one-dimensional danger eigenspace is \(\operatorname{span}(q_{QQ}^\dagger)\);
3. the eigenvalue separation survives the real structure and grading;
4. the anomaly-free TRO and Yukawa cycles remain intact;
5. every represented one-form and heavy threshold commutes with the resulting (P_{QQ}\);
6. the relative normalization in (Y_F\) is derived, not chosen to reproduce \((1,1,1)\).

The positive Gram form is important. A support-only map can identify which currents occur but cannot fix the equal coefficients needed for the danger line.

## 6. Stop rules

Do not call (P_{QQ}\) Furey-derived merely because:

- the Furey TRO omits a diquark arrow;
- the exceptional Clebsch table independently supplies a (QQ) row;
- a basis can be chosen in which an inserted central projector has rank (2+1);
- a finite Dirac operator is defined afterward to have (P_{QQ}\) as a spectral projector.

Any of these realizes or labels the desired split. None proves provenance.

## 7. Reopening criterion

The branch reopens positively when an explicit represented finite geometry produces (Y_F\) and (G_F\), and the resulting (K_W\) passes the six tests above. It closes negatively if every gauge-, reality-, grading- and TRO-compatible (Y_F^\dagger G_FY_F\) is scalar on (W). The present result lies between them: all currently represented Furey operators are scalar on (W), but the complete cross-carrier representation has not yet been constructed.

