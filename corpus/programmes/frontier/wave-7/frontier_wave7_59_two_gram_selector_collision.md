# Frontier Wave 7.59: The Two-Gram Selector Collision

**Date:** 25 October 2026  
**Status:** exact selector no-go; physical objective remains open  
**Ledger:** [two-Gram collision](two_gram_selector_collision_v1.json)  
**Certificate:** [collision verifier](../../../../verification/verify/verify_two_gram_selector_collision.mjs)

## Result

Two earlier corpus lanes maximize a “Gram determinant,” but they maximize
determinants of different objects. They therefore select different channels.

Let

\[
f_j=\langle e_{\rm ref},e_j\rangle,
\qquad
s=\langle e_1,e_0\rangle,
\qquad
c=\overline{f_1}f_0.
\]

The three-ray environment Gram matrix and the two-column channel Gram matrix
are

\[
G_3=\operatorname{Gram}(e_{\rm ref},e_0,e_1),
\qquad
G_2=E^\dagger E=\operatorname{Gram}(e_0,e_1).
\]

## 1. Full environment volume selects the Gram centre

For

\[
R^2=(1-|f_0|^2)(1-|f_1|^2),
\]

one has

\[
\det G_3=R^2-|s-c|^2.
\]

Hence the unique maximum is

\[
\boxed{s=c.}
\]

At this point the projected residuals

\[
u_j=e_j-f_je_{\rm ref}
\]

obey \(\langle u_1,u_0\rangle=0\). This is the orthogonal-residual partial
sewing used by the causal Gram-centre construction.

## 2. Channel volume selects the isotropic lock

For normalized conditioned rays,

\[
G_2=
\begin{pmatrix}
1&\bar s\\s&1
\end{pmatrix},
\qquad
\det G_2=1-|s|^2.
\]

If zero lies in the admissible Gram disk, the channel volume is uniquely
maximized at

\[
\boxed{s=0.}
\]

This is precisely the equal-singular-value condition of the earlier real
locking tensor. Its invariant discriminant is

\[
(\operatorname{tr}G_2)^2-4\det G_2=4|s|^2,
\]

which vanishes only at \(s=0\).

## 3. Exact incompatibility

The two interior maxima coincide if and only if

\[
c=\overline{f_1}f_0=0.
\]

For nonzero transfers and a disk containing the origin,

\[
\boxed{
\text{orthogonal residuals}
\ne
\text{orthogonal conditioned rays}.
}
\]

The distinction is not semantic. The first compares what remains after the
reference component is removed; the second compares the full channel columns.

## 4. Rational checkpoint

For

\[
f_0=3/5,
\qquad
f_1=5/13,
\qquad
c=3/13,
\]

the full-environment determinants are

\[
\det G_3(c)=\frac{2304}{4225},
\qquad
\det G_3(0)=\frac{2079}{4225},
\]

while the channel determinants are

\[
\det G_2(c)=\frac{160}{169},
\qquad
\det G_2(0)=1.
\]

At the causal centre the locking discriminant is

\[
\Delta_K=\frac{36}{169}>0.
\]

Thus the checkpoint partial-sewing map is a full-rank *anisotropic* lock.

## 5. Consequence for the corpus

The causal-volume lane and the earlier isotropic-locking lane share the same
three-by-two carrier but do not select the same vacuum:

- causal Gram extremality maximizes the volume of reference plus residual
  environment directions;
- the locking potential maximizes the area of the two conditioned channel
  directions and preserves a diagonal rotation.

One cannot use the success of either functional as a derivation of the other.
A joint theory must choose one, introduce a weighted competition, or derive a
new constraint making \(c=0\).

## 6. Next gate

Classify the compact and real stabilizers of both strata and determine the
most general low-degree invariant potential. In particular, decide whether an
unequal-singular-value causal centre can be an isolated stable vacuum without
inserting an endpoint anisotropy spurion.

[Wave 7.60](frontier_wave7_60_bifundamental_stabilizers_and_quartic_selection.md)
closes this gate at quartic order: the unspurioned potential selects isotropy
or remains flat, while the causal unequal pair requires an anisotropy datum.

## Boundary

This is a theorem about two Gram objectives on the same admissible channel
space. It does not decide which objective is physically correct. Maximum
three-ray volume, maximum two-column volume and maximum quantum entropy remain
separately typed principles.
