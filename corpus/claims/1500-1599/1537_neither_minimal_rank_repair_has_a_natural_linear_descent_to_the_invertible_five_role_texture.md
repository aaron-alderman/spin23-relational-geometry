# Neither Minimal Rank Repair Has a Natural Linear Descent to the Invertible Five-Role Texture

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact quotient theorem plus bounded compression and Schur audit; natural linear descent UNSAT, non-linear correspondence datum isolated

**Depends on:** [the exact four-zero-mode repair classification](1533_the_four_zero_modes_require_exactly_four_new_real_completed_dimensions_and_no_edge_only_repair_exists.md), [the explicit six-character geometry](1529_the_six_character_completion_is_an_exact_real_even_label_geometry_but_not_a_physical_pati_salam_completion.md), and [the protected five-state chain](1523_one_intermediate_real_pair_is_the_minimal_categorical_repair_of_the_spectator_connector_no_go.md)

**Evidence:** [descent no-go ledger](../../../evidence/data/spin23-five-role-correspondence-descent-no-go.json) and [deterministic quotient/compression verifier](../../../verification/verify/verify_spin23_five_role_correspondence_descent_no_go.mjs)

## Result

Neither minimum rank repair of claim 1533 descends naturally to the
invertible five-role coefficient matrix.

There is a short general obstruction. A strict descent would be a complex
linear surjection \(Q\) satisfying

\[
QJ=JQ,
\qquad
Q\gamma=\gamma Q,
\qquad
Q\Gamma_{\rm rel}=\Gamma_{\rm rel}Q,
\qquad
QD_{\rm src}=D_{\rm phys}Q.
\]

Both repaired source operators are invertible. The last equation makes
\(\ker Q\) invariant under \(D_{\rm src}\), so the induced quotient operator
must also be invertible.

But the positive relation sheet of the five-role target is

\[
PN_+,IN_-,IP_+,TP_-,SP_+,
\]

with chiral dimensions (3:2). Every grading-odd, relation-preserving target
operator has rank at most four on that sheet and hence a zero mode. Its
\(J\)-completed target has at least two. Therefore

\[
\boxed{\text{strict linear }J/\gamma/\Gamma_{\rm rel}
\text{-compatible quotient: UNSAT}.}
\]

A weaker compression does exist. Retaining the five sectors above produces
the off-diagonal chain

\[
I-P-N-Z-X.
\]

This gives exactly the four coefficients \((x,y,g,h)\), adds no forbidden
primitive \(L-N\) support, and is singular. It does not produce the two
diagonal coefficients \(A,d\) of the required physical matrix. In particular,
the nonzero \(d\) needed for

\[
\det M_5=d y^2h^2
\]

is not in the image of the compression.

Nor can the discarded directions be Schur-eliminated. Every repair has three
discarded states on each relation sheet. Their grading-odd auxiliary block is
singular. In the \(SI/IS+NU/UN\) repair it is visibly one \(TU-NU\) pair plus the
isolated \(SI\) direction.

The multiplicity repair has an additional failure of naturality: reducing
each doubled multiplicity space to one physical direction requires a
functional \(\mathbb C^2\to\mathbb C\). No nonzero functional is invariant
under the unbroken \(U(2)\) change of multiplicity basis. Choosing it selects
the coupling ray that the programme was meant to derive.

Thus the exact remaining datum is not another matrix entry. It is a new
non-quotient correspondence functor that must simultaneously:

1. generate the effective \(A\) and \(d\) coefficients;
2. select the common multiplicity ray canonically;
3. preserve the cofactor zero; and
4. forbid primitive \(L-N\) support.

## 1. The five-role target and its unavoidable imbalance

Map the retained relation sectors to physical roles by

\[
PN\mapsto I,
\quad IN\mapsto P,
\quad IP\mapsto N,
\quad TP\mapsto Z,
\quad SP\mapsto X.
\]

The four retained edge orbits then become

\[
I-P,
\quad P-N,
\quad N-Z,
\quad Z-X.
\]

The desired coefficient matrix, written in \((P,I,N,Z,X)\) order, is

\[
M_5=
\begin{pmatrix}
A&x&y&0&0\\
x&d&0&0&0\\
y&0&0&g&0\\
0&0&g&0&h\\
0&0&0&h&0
\end{pmatrix}.
\]

Its off-diagonal graph is precisely the retained chain. Its two diagonal
coefficients are not primitive edges of that chain.

On one relation sheet, the KO-6 signs along the chain alternate

\[
+,-,+,-,+.
\]

Hence a grading-odd operator there has block shape

\[
\begin{pmatrix}
0&B_{3\times2}\\
B^*_{2\times3}&0
\end{pmatrix}
\]

and rank at most four. This proves target singularity without choosing any
coefficient.

Now suppose a strict quotient \(Q\) existed. Its kernel would obey

\[
D_{\rm src}(\ker Q)\subseteq\ker Q.
\]

Since \(D_{\rm src}\) is invertible and the space is finite-dimensional, the
inclusion is equality. The inverse also preserves the kernel, so the induced
quotient map is invertible. This contradicts the target rank bound. The
argument applies to both claim-1533 repairs.

## 2. Matrix-multiplicity compression

Use the less exotic minimum multiplicities

\[
(m_{PN},m_{IN},m_{IP},m_{TP},m_{SP},m_{TU})
=(1,2,1,2,1,1).
\]

In positive/negative chiral bases, a determinant-one source block is

\[
K=
\begin{pmatrix}
1&0&0&0\\
0&1&1&0\\
0&0&1&0\\
0&0&0&1
\end{pmatrix},
\]

where the rows are \((PN,IP,SP,TU)\) and columns are
\((IN_1,IN_2,TP_1,TP_2)\). The real-completed source Dirac operator is
invertible.

To compress it, select functionals

\[
q_I:\mathbb C^2_{IN}\to\mathbb C,
\qquad
q_T:\mathbb C^2_{TP}\to\mathbb C,
\]

and discard their complementary directions together with \(TU\). The verifier
checks all 16 pairs of nonzero sign vectors for \((q_I,q_T)\). Every choice can
make all four chain coefficients nonzero. Every compressed five-by-five chain
still has rank four and determinant zero.

The choice of \(q_I\) is exactly a choice of a ray in the mediator multiplicity
space. Under a general \(U(2)\) basis change, no nonzero linear functional is
invariant: if \(qU=q\) for every \(U\), choosing \(U=-1\) gives \(q=-q\), hence
\(q=0\). Therefore a nonzero quotient functional cannot be canonical under the
available multiplicity symmetry.

This is the common-ray problem in quotient language. Compression can impose a
ray, but it cannot derive one from the source representation.

The three discarded directions per relation sheet have an odd, grading-odd
auxiliary block, so its determinant vanishes. Ordinary Schur elimination is
not defined. Consequently the missing diagonal coefficients cannot be
generated by integrating out this legal auxiliary block.

## 3. New-sector compression

For the multiplicity-one repair, one relation sheet is

\[
PN,IN,IP,TP,SP,TU,SI,NU.
\]

There is a canonical coordinate compression retaining

\[
PN,IN,IP,TP,SP
\]

and deleting \((TU,SI,NU)\). It respects the sector labels, grading and relation
sheet at the vector-space level. It is not an intertwining quotient: the
discarded subspace is not invariant under the invertible source Dirac
operator.

The compressed operator is again the singular five-chain. The auxiliary
block on \((TU,SI,NU)\) has only the edge \(TU-NU\):

\[
D_{\rm aux}=
\begin{pmatrix}
0&0&u\\
0&0&0\\
\bar u&0&0
\end{pmatrix}.
\]

It has rank two and zero determinant for every \(u\). Thus there is no legal
Schur complement. Giving the isolated direction a self term or joining the
two relation sheets would violate the exact grading/relation support that
defined the repair.

No old-to-old forbidden primitive edge appears under coordinate compression.
The stronger demand in the question cannot be met, however, because no legal
Schur elimination exists from which an induced-support audit could proceed.

## 4. What manual completion accomplishes

The raw compressed chain, in \((I,P,N,Z,X)\) order, is

\[
C_5=
\begin{pmatrix}
0&x&0&0&0\\
x&0&y&0&0\\
0&y&0&g&0\\
0&0&g&0&h\\
0&0&0&h&0
\end{pmatrix},
\qquad
\det C_5=0.
\]

Inserting \(A\) and \(d\) manually converts it to \(M_5\). Over all 64 nonzero sign
assignments for \((A,x,y,d,g,h)\), the verifier finds

\[
\operatorname{cof}_{PP}(M_5)=0,
\qquad
\det M_5=d y^2h^2\ne0,
\]

and no forbidden primitive \(L-N\) entry. This confirms that the target itself
is consistent. It also locates the logical gap exactly: \(A,d\) and the
multiplicity ray were supplied after compression, not produced by it.

The diagonal \(d\) is indispensable. Setting it to zero makes the determinant
zero for every other coefficient. Therefore it cannot be dismissed as an
inessential effective convention.

## 5. Classification

| descent notion | multiplicity repair | new-sector repair |
|---|---|---|
| strict surjective Dirac quotient | UNSAT | UNSAT |
| coordinate/linear compression | singular five-chain | singular five-chain |
| legal Schur complement | auxiliary block singular | auxiliary block singular |
| forbidden old-to-old edge added by compression | no | no |
| common ray derived | no | not applicable |
| invertible protected (M_5) without new coefficients | no | no |

The result does not say that all generalized correspondences are impossible.
It says that the desired physical matrix is neither a strict linear quotient
nor a legal Schur complement of either minimal finite-Dirac repair.

## Verdict

The exact remaining descent problem has a bounded no-go:

\[
\boxed{
\text{no natural surjective linear }J/\gamma/\Gamma_{\rm rel}
\text{-compatible map yields invertible }M_5.}
\]

The only bounded candidates compress to the correct four-edge chain but are
singular. Completing them requires precisely the information not present in
the source:

\[
\boxed{
(A,d)+\text{a canonical common-ray selector}+
\text{a proof of forbidden-support stability}.}
\]

Any successful next construction must therefore be non-quotient in the
ordinary linear sense: for example an energy-dependent Feshbach rule with a
separately invertible auxiliary object, a path-algebra/correspondence
composition law, or a Jordan/normalizer functor. Naming such a mechanism is
not enough; it must compute the two diagonal terms and the ray rather than
postulate them.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_five_role_correspondence_descent_no_go.mjs
node verification/verify/verify_spin23_six_character_zero_mode_repair_exhaustion.mjs
node verification/verify/verify_spin23_six_character_ordinary_correspondence_completion.mjs
node verification/verify/verify_spin23_spectator_connector_minimal_repair_exhaustion.mjs
~~~
