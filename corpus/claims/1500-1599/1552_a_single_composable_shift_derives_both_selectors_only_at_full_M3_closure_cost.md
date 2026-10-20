# A Single Composable Shift Derives Both Selectors Only at Full M3 Closure Cost

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact weighted-shift and typed-branch exhaustion; one-generator unification no-go in finite-dimensional C*-algebras

**Depends on:** [the selected-return corner audit](1543_the_diagonal_expectation_is_canonical_but_the_selected_PI_return_corner_is_new_marked_projector_data.md), [the relational partial-isometry audit](1546_the_Majorana_anchor_contains_the_P_to_N_partial_isometry_line_but_not_a_canonical_transporter.md), and [the minimal oriented correspondence algebra](1549_the_minimal_oriented_correspondence_algebra_realizes_both_selectors_but_does_not_unify_them.md)

**Evidence:** [one-generator weighted-shift exhaustion](../../../evidence/data/spin23-one-generator-selector-unification-no-go.json) and [executable verifier](../../../verification/verify/verify_spin23_one_generator_selector_unification_no_go.mjs)

## Result

On three objects \(I,P,N\), let

\[
s=|P\rangle\langle I|,
\qquad
t=|N\rangle\langle P|,
\qquad
u=a\,s+b\,t,
\qquad ab\ne0.
\]

Then \(u\) does make both desired structures functions of one generator.  For
the unit-weight shift,

\[
u^*u=p_I+p_P=q,
\qquad
uu^*=p_P+p_N,
\]

and hence

\[
p_P=(u^*u)(uu^*),
\quad
p_I=q-p_P,
\quad
p_N=uu^*-p_P,
\quad
t=p_Nup_P.
\]

But the same generator necessarily has

\[
\boxed{u^2=ab\,|N\rangle\langle I|\ne0.}
\]

Closure under multiplication and adjoint gives every matrix unit:

\[
\boxed{C^*(u)=M_3(\mathbb C),
\qquad C^*(u)'=\mathbb C1.}
\]

Thus the only genuinely composable one-generator construction derives \(q\)
and \(t\) at the exact cost of the forbidden open \(I\)-\(N\) carrier and full
three-object support.  No choice of nonzero weights, phases, \(J\)-completion
or relation grading removes that cost.

Respecting the existing branch typing changes the answer.  The selected-return
arrow and Majorana transporter then have distinct middle objects:

\[
s_D:D_I\to D_P,
\qquad
t_M:M_P\to M_N.
\]

For

\[
u_{\rm typed}=a\,s_D\oplus b\,t_M
\]

one has \(u_{\rm typed}^2=0\) and

\[
C^*(u_{\rm typed})
\subseteq M_2(\mathbb C)_{D,I/P}\oplus
M_2(\mathbb C)_{M,P/N}
\]

with no mixed carrier.  If \(|a|\ne|b|\), spectral projections of
\(u^*u\) separate the two blocks and the generated algebra is the full direct
sum \(M_2\oplus M_2\).  If \(|a|=|b|\) and no branch idempotents are supplied,
the two identical blocks remain multiplicity-locked and the algebra is one
diagonal copy of \(M_2\); supplying \(b_D,b_M\) splits them again.

This safe alternative is not a unification.  It is one reducible operator
containing two orthogonal arrows.  Unequal weights introduce their independent
scale ratio; equal weights require the already independent branch selectors
to recover the two arrows.  In either case the Dirac \(PP\) coefficient and
Majorana \(PN\) coefficient remain two independent supported directions.

## 1. Weighted composable chain

In the ordered basis \((I,P,N)\),

\[
u=
\begin{pmatrix}
0&0&0\\
a&0&0\\
0&b&0
\end{pmatrix}.
\]

Its source and range operators are

\[
u^*u=|a|^2p_I+|b|^2p_P,
\qquad
uu^*=|a|^2p_P+|b|^2p_N.
\]

If \(|a|\ne|b|\), their spectral projections recover all three vertex
projections.  If \(|a|=|b|=r\), then

\[
r^{-2}u^*u=p_I+p_P,
\quad
r^{-2}uu^*=p_P+p_N,
\]

and multiplying these commuting projections recovers \(p_P\), hence \(p_I\)
and \(p_N\).  Compressing \(u\) with those projections recovers \(s\) and
\(t\), up to their known nonzero weights.

Therefore every nonzero weighted case generates the adjacent matrix units.
Their product gives \(E_{NI}\); adjoints give the reverse arrows; further
products give all nine units of \(M_3\).

The commutant calculation is equally sharp.  Commutation with the recovered
vertex projections makes a matrix diagonal.  Commutation with \(s\) equates
the \(I,P\) diagonal entries, and commutation with \(t\) equates the \(P,N\)
entries.  Only scalar matrices remain.

## 2. Why path-length truncation cannot be a C*-algebra solution

One may try to impose the radical-square-zero relation

\[
ts=0
\]

while retaining normalized adjacent partial isometries.  This is impossible
in a faithful *-representation.  Since

\[
s^*s=p_I,
\quad ss^*=p_P,
\quad t^*t=p_P,
\]

one obtains

\[
(ts)^*(ts)
=s^*t^*ts
=s^*p_Ps
=s^*s
=p_I\ne0.
\]

Thus \(ts\ne0\).  A truncated path space that discards \(ts\) may be used as
a graded vector space or an externally projected correspondence, but it is not
closed under faithful C*-multiplication.

Adding a direct \(I\to N\) term to \(u\) cannot cancel the coefficient of
\(u^2\): in the acyclic three-object support the only length-two contribution
to \(E_{NI}\) is \(ab\).  Phases change it to \(ab e^{i\theta}\), never to zero
while both adjacent arrows remain nonzero.  Cancellation requires at least a
second independent length-two path, hence more objects/arrows and a tuned
relation rather than a smaller one-generator model.

## 3. Relation grading and real structure

If both desired adjacent arrows are relation-even, their product is even:

\[
|t s|_{\rm rel}=|t|_{\rm rel}|s|_{\rm rel}=+1.
\]

Consequently relation parity cannot remove the \(I\to N\) composite while
retaining both factors as homogeneous even generators.  Making one adjacent
arrow odd makes \(u=s+t\) nonhomogeneous and still does not make the product
zero.

The real completion adds the \(J\)-conjugate representation and reverse
orientations already required by *-closure.  It doubles the representation;
it does not shrink \(M_3\) or erase \(u^2\).  On a tree, all phases of \(a,b\)
can be removed by vertex rephasings.  There is no gauge-invariant holonomy,
but the two positive magnitudes remain unless normalization fixes them.

## 4. The typed safe alternative

On

\[
H_{\rm typed}
=\operatorname{span}\{D_I,D_P\}
\oplus
\operatorname{span}\{M_P,M_N\},
\]

write

\[
u_{\rm typed}
=aE_{D_P,D_I}+bE_{M_N,M_P}.
\]

The two summands have orthogonal source and range projections, so every mixed
product vanishes and \(u_{\rm typed}^2=0\).  For distinct nonzero singular
values, functional calculus separates the four endpoint projections and
then the two arrows.  The result is

\[
C^*(u_{\rm typed})=M_2\oplus M_2,
\qquad
C^*(u_{\rm typed})'=\mathbb C\oplus\mathbb C
\]

in the multiplicity-free four-dimensional representation.

For equal singular values the two summands are identical copies of the same
two-dimensional shift.  Without branch idempotents,

\[
C^*(u_{\rm typed})\cong M_2\otimes1_2,
\qquad
C^*(u_{\rm typed})'\cong1_2\otimes M_2.
\]

Adding \(b_D,b_M\) restores \(M_2\oplus M_2\), but also explicitly restores
the independent branch datum the one-generator proposal was meant to derive.

In a larger five-role universe, the degenerate proposal \(u=t\) does not
derive the selected corner.  Although on a literal three-object universe one
can write \(q=1-tt^*\), in the declared five-role system the complement of
\(p_N\) also contains \(Z,X\) and any other typed objects.  The apparent
derivation is therefore an artifact of deleting the roles that \(q\) was
introduced to exclude.

## 5. Portal coefficient dimension

Neither closure changes the coefficient count.  In the composable algebra
\(M_3\), the diagonal unit \(p_P\) and the symmetric \(PN\) unit
\(t+t^T\) are linearly independent.  In the typed algebra they lie in
different direct summands and are again independent.  Hence the unrestricted
portal coefficient space has complex dimension two:

\[
\Lambda_Dp_P+\Lambda_M(t+t^T).
\]

Choosing \(\Lambda_D=\Lambda_M\) is still the external coefficient equalizer
of claims 1521, 1546 and 1549.  Encoding both arrows with one displayed
operator \(u\) does not create a Ward identity on the independent supported
couplings.

## 6. Exhaustion and minimum closure cost

For a one-generator weighted/path-length-two construction there are only
three cases:

1. **Both composable weights nonzero:** \(C^*(u)=M_3\), \(u^2\ne0\), forbidden
   \(I\)-\(N\) support appears, and the portal coefficient dimension is two.
2. **One weight zero:** the algebra is \(M_2\oplus\mathbb C\), but one of the
   transporter or selected-return structures is absent.  The apparent
   three-object complement formula for \(q\) fails in the actual five-role
   universe.
3. **Branch-typed orthogonal arrows:** support is safe, but the generator is a
   reducible direct sum.  Distinct weights reintroduce an independent ratio;
   equal weights require branch projectors to split the components.  Portal
   coefficient dimension remains two.

Therefore the minimum closure cost of a genuine composable one-generator
unification is the full \(M_3\) block and its \(I\)-\(N\) carrier.  Avoiding
that cost requires keeping the arrows typed and noncomposable, which is
exactly the independent-selector architecture of claim 1549 in compressed
notation.

## Verdict

\[
\boxed{
\begin{array}{c}
u=s_{IP}+t_{NP}\text{ derives }q\text{ and }t,\\[2pt]
\text{but necessarily generates }u^2\propto E_{NI}
\text{ and }C^*(u)=M_3.
\end{array}}
\]

There is no faithful finite-dimensional C*-algebra realization with both
normalized composable arrows, \(ts=0\), and no full \(M_3\) closure.  The
smallest safe alternative is the reducible typed sum \(s_D\oplus t_M\), which
does not unify their scales, phases, branch selectors or portal coefficients.

The exact reopening datum would be a sourced non-C*-multiplicative projection
on path degree, or a larger multi-path interference geometry with a protected
relation cancelling every forbidden composite.  Either is strictly more
structure than the one-generator proposal.

## Reproduction

Run:

```bash
node verification/verify/verify_spin23_one_generator_selector_unification_no_go.mjs
```

The verifier exhausts zero/nonzero weighted supports, closes the generated
matrix units, computes commutants, checks the radical-square-zero
contradiction, and compares the composable and typed block-diagonal cases.
