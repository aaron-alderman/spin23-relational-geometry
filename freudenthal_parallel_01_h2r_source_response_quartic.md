# Freudenthal Parallel Branch 01: the (H_2(\mathbb R)) Source--Response Quartic

**Date:** 17 October 2026  
**Status:** exact restriction theorem in the associative real corner of the exceptional Freudenthal system; no claim that the Standard Model selects the Freudenthal parent  
**Certificate:** [verify_freudenthal_h2r_source_response_restriction.mjs](scripts/verify_freudenthal_h2r_source_response_restriction.mjs)

## Executive result

The existing programme already proves the exceptional Peirce descent

\[
H_3(\mathbb O)
\longrightarrow H_2(\mathbb O)
\longrightarrow H_2(\mathbb R),
\]

and shows that the first arrow produces the (H_2(\mathbb O)) determinant rather than directly selecting the (Spin(2,3)) carrier. This note adds the first Freudenthal calculation without repeating that work.

Let

\[
\mathcal F(J)=\mathbb R\oplus\mathbb R\oplus J\oplus J,
\qquad J=H_3(\mathbb O),
\]

and write an element as (x=(\alpha,\beta,X,Y)). Use the convention

\[
q(x)=
-2\bigl[\alpha\beta-\operatorname{Tr}(X\circ Y)\bigr]^2
-8\bigl[
\alpha N(X)+\beta N(Y)
-\operatorname{Tr}(X^\#\circ Y^\#)
\bigr].
\]

For

\[
A=\begin{pmatrix}a&c\\c&b\end{pmatrix}\in H_2(\mathbb R),
\qquad
\iota(A)=
\begin{pmatrix}
a&c&0\\c&b&0\\0&0&0
\end{pmatrix}\in J,
\]

three exact facts follow.

### 1. A bare rank-two face is quartically null

\[
q(0,0,\iota(A),0)=0.
\]

Thus merely inserting the (Spin(2,3)) carrier into one (27)-dimensional Jordan slot gives no nonzero Freudenthal quartic. The larger exceptional system does not recognize the carrier determinant without additional transverse or dual data.

### 2. The discarded face restores the determinant

Let (e_3=\operatorname{diag}(0,0,1)). Since

\[
N(\iota(A)+e_3)=\det A,
\]

one obtains

\[
\boxed{
q(1,0,\iota(A)+e_3,0)=-8\det A.
}
\]

The Freudenthal quartic therefore packages the already-established cubic normal-residue mechanism, but it does not remove the need to supply the transverse unit (e_3). This is a precise selector boundary.

### 3. Paired Jordan copies produce a source--response discriminant

Place (A) in the first Jordan copy and (C\in H_2(\mathbb R)) in the dual copy:

\[
x_{A,C}=(0,0,\iota(A),\iota(C)).
\]

Because

\[
\iota(A)^\#=(\det A)e_3,
\qquad
\operatorname{Tr}(\iota(A)\circ\iota(C))=\operatorname{tr}(AC),
\]

the quartic restricts to

\[
\boxed{
q(x_{A,C})
=-2\left[
(\operatorname{tr}AC)^2
-4\det(A)\det(C)
\right].
}
\]

The bracket is the characteristic discriminant of the (2\times2) matrix (AC):

\[
(\operatorname{tr}AC)^2-4\det(AC).
\]

For positive (A) and (C), the product (AC) has two positive real eigenvalues (\lambda_1,\lambda_2), so

\[
q(x_{A,C})=-2(\lambda_1-\lambda_2)^2\le0.
\]

It vanishes precisely when the two relational eigenchannels are matched:

\[
AC=\lambda I.
\]

Equivalently, up to scale,

\[
C\propto A^{-1}.
\]

This supplies a concrete interpretation unavailable from the bare (27=27) coincidence: the two Jordan copies naturally accommodate a source and a dual response, while the exceptional quartic measures their failure to be inverse-matched.

## Relation to the existing symplectic-inversion branch

The programme already establishes the response-domain transformation

\[
F\longmapsto-F^{-1}
\]

as a spectrum-generating duality rather than a symmetry of one fixed normalized theory. The present restriction supplies an exceptional-geometric reformulation of the same inverse relation.

For a nonsingular source (A), choose its adjugate response

\[
C=A^\#=(\det A)A^{-1}.
\]

Then

\[
AC=(\det A)I
\]

and hence

\[
q(x_{A,A^\#})=0.
\]

More generally, on the positive (H_2(\mathbb R)) cone,

\[
\boxed{
q(x_{A,C})=0
\iff
C=\lambda A^{-1}
\quad(\lambda>0).
}
\]

Thus the quartic-null locus of the restricted Freudenthal system is exactly the inverse-matched source--response locus. In the quasiconformal (E_8) construction, the Freudenthal quartic participates in the generalized light-cone relation. On this restricted slice, that light-cone condition is not an arbitrary exceptional decoration: it is the already-derived physical operation of exchanging a response with its inverse dual.

This remains a kinematic bridge. It does not prove that the full (E_7) automorphism group or quasiconformal (E_8) acts on the Standard Model. It identifies one established response duality with one exact exceptional invariant locus.

## The exceptional quartic does not survive the real-slice selector automatically

The parent Peirce face is (H_2(\mathbb O)), not (H_2(\mathbb R)). Write its links as

\[
z=r+u,
\qquad
w=s+v,
\]

where (r,s\in\mathbb R) and (u,v\in\operatorname{Im}\mathbb O\cong\mathbb R^7). Define

\[
U=|u|^2,
\qquad
V=|v|^2,
\qquad
D=u\cdot v,
\]

and let

\[
t=ap+bq+2rs,
\qquad
A_0=ab-r^2,
\qquad
C_0=pq-s^2
\]

be the corresponding real-slice quantities. Direct restriction gives the exact defect

\[
\boxed{
q_{H_2(\mathbb O)}-q_{H_2(\mathbb R)}
=-8\left[
tD+D^2+A_0V+C_0U-UV
\right].
}
\]

This defect is generically nonzero. Therefore the established Clifford conditional expectation

\[
H_2(\mathbb O)\longrightarrow H_2(\mathbb R)
\]

does not commute with preservation of the Freudenthal quartic on arbitrary source--response pairs.

This supplies an immediate boundary for the (E_8)-crystal reading:

- the exceptional quartic is a parent invariant;
- the physical real-slice selector generally breaks or coarse-grains it;
- retaining it in the reduced theory requires the imaginary links to vanish dynamically, form an unobserved balanced sector, or contribute a compensating term.

Thus (E_7/E_8) is more naturally interpreted here as architecture of the surrounding family than as an unbroken symmetry of the selected (Spin(2,3)) response face.

## What this adds

The Freudenthal extension does not yet select the Standard Model or (Spin(2,3)). It does add two exact structural facts:

1. a single Jordan face is insufficient—the quartic requires transverse or dual information;
2. paired source and response data produce a basis-independent spectral mismatch measure.

This fits the programme's existing distinction between a response carrier and its dual realization more naturally than identifying observed constants with individual coordinates of (J_3(\mathbb O)).

## What remains open

1. Determine whether the programme's physical response (C(s)) is canonically the Freudenthal-dual partner of its source Gram (A(s)), rather than an arbitrarily inserted second Jordan element.
2. Compare quartic-null inverse matching with the existing symplectic-inversion and dual-pole results.
3. Classify the zero-defect locus on which the full (H_2(\mathbb O)) quartic survives the established Clifford conditional expectation; test whether any such locus is dynamically or gauge-theoretically selected.
4. Test whether the orientation-odd phase lives in the Freudenthal symplectic pairing or triple product, since the real quartic itself is even.
5. Do not promote (E_7) or (E_8) to a physical symmetry unless the source--response pairing and transverse unit are derived from the declared action.

## Stop conditions

Close this branch if the second Jordan copy cannot be typed as a physical dual response, if the quartic mismatch is merely a restatement of ordinary (2\times2) spectral discriminants with no exceptional selection, or if the Clifford reduction destroys the pairing needed by the quartic.
