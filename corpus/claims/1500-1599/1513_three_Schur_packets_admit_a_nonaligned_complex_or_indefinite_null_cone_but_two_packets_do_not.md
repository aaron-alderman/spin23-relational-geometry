# Three Schur Packets Admit a Nonaligned Complex or Indefinite Null Cone, but Two Packets Do Not

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact two- and three-packet algebraic classification; physical enforcement of the nonaligned null cone remains open

**Depends on:** [the same-sign global Schur-ray theorem](1509_sums_of_rank_one_Schur_packets_preserve_the_texture_only_when_all_mediator_paths_share_one_projective_coupling_ray.md), [the local-Hom/global-rank obstruction](1510_one_dimensional_local_arrow_spaces_do_not_force_the_global_rank_one_Schur_alignment_ideal.md), and [the next-investigation roadmap](1511_the_highest_value_next_investigations_are_the_physical_intertwiner_RG_tangency_and_categorical_closure_tests.md)

**Evidence:** [complex/indefinite Schur-locus ledger](../../../evidence/data/spin23-complex-indefinite-Schur-locus.json) and [exact Gaussian-integer verifier](../../../verification/verify/verify_spin23_complex_indefinite_Schur_locus.mjs)

## Result

The complex-phase and indefinite-sign caveat in claim 1509 has an exact
threshold. Two nonzero packets cannot cancel unless their coupling vectors
are projectively aligned. Three packets can cancel on a distinct nonaligned
quadratic null cone.

For complete symmetric Schur packets

\[
G_i=w_i v_i v_i^T,
\qquad
v_i=(d_i,y_i)^T,
\qquad
\Delta_{ij}=d_i y_j-d_j y_i,
\]

one has

\[
\boxed{\det\!\left(\sum_iG_i\right)
=\sum_{i<j}w_iw_j\Delta_{ij}^{2}.}
\]

For two packets and nonzero weights this becomes

\[
\det(G_1+G_2)=w_1w_2\Delta_{12}^2=0
\quad\Longleftrightarrow\quad
\Delta_{12}=0.
\]

Complex phases and opposite mass signs therefore do **not** reopen a
two-packet loophole.

For three packets, however,

\[
q_w(\Delta)=w_1w_2\Delta_{12}^2
+w_1w_3\Delta_{13}^2
+w_2w_3\Delta_{23}^2=0
\]

has nonzero solutions over \(\mathbb C\), and over \(\mathbb R\) whenever
the weights have mixed signs. These solutions preserve the zero determinant
without putting all three coupling vectors on one projective ray.

## 1. Why three packets are the first new case

The minors of a \(2\times3\) coupling matrix have no Plucker relation. On
the chart \(\Delta_{12}\ne0\), any prescribed projective triple
\((\Delta_{12},\Delta_{13},\Delta_{23})\) can be realized by choosing the
first two columns as a basis and solving linearly for the third. The other
charts cover the remaining points.

With all three weights nonzero, \(q_w\) is a nondegenerate quadratic form.
Over \(\mathbb C\), its projectivization is a smooth irreducible conic in
\(\mathbb P^2\). The affine cone is singular only at

\[
\Delta_{12}=\Delta_{13}=\Delta_{23}=0,
\]

which is precisely the common-ray stratum.

For real weights the distinction is sharp:

- same-sign weights make \(q_w\) definite, recovering claim 1509;
- mixed signs give signature \((1,2)\) or \((2,1)\), producing a real null
  cone of nonaligned cancellations.

If a weight vanishes, the corresponding coordinate plane is merely a
lower-packet boundary and reduces to the two-packet classification.

## 2. Exact nonaligned examples

Complex symmetric packets do not use a Hermitian conjugate. With equal
weights and

\[
v_1=(3,0)^T,
\quad v_2=(0,3)^T,
\quad v_3=(-5i,4)^T,
\]

the three nonzero minors are

\[
(\Delta_{12},\Delta_{13},\Delta_{23})=(9,12,15i),
\]

and

\[
9^2+12^2+(15i)^2=0.
\]

Every pair is nonaligned, yet the sum has rank one.

For a wholly real indefinite example, take weights \((1,1,-1)\) and

\[
v_1=(5,0)^T,
\quad v_2=(0,5)^T,
\quad v_3=(3,4)^T.
\]

Then

\[
(\Delta_{12},\Delta_{13},\Delta_{23})=(25,20,-15),
\qquad
25^2-20^2-(-15)^2=0.
\]

Again all pairs are nonaligned and the resulting sum has rank one. It cannot
have rank zero: vanishing would require two independent mutually orthogonal
null rows in a nondegenerate three-dimensional symmetric space, whose Witt
index is only one.

## 3. Hermitian comparison

If the physical object is instead a Hermitian Gram sum

\[
H=\sum_iw_i v_i v_i^\dagger
\]

with real weights, then

\[
\det H=\sum_{i<j}w_iw_j|\Delta_{ij}|^2.
\]

Positive weights eliminate phase cancellation completely: arbitrary complex
vectors still require the common ray. Mixed-sign Hermitian weights retain a
signed real null cone from three packets onward. The complex cone is thus a
feature of symmetric transpose matching, not of positive Hermitian Gram
matching.

## 4. Perturbative robustness

The two zero strata have different local behavior in packet coordinates.

At the common-ray vertex all minors vanish. Therefore

\[
q_w(\epsilon h)=O(\epsilon^2).
\]

Small misalignment first lifts the determinant quadratically. This statement
is restricted to complete-packet deformations; an independent primitive
matrix entry can still lift a rank-one matrix determinant linearly.

At a nonzero null-cone point,

\[
\nabla q_w\ne0.
\]

A generic transverse packet perturbation therefore lifts the determinant at
order \(\epsilon\). The cancellation cone is an extended algebraic locus,
not an isolated numerical coincidence, but it is not robust under generic
deformation.

This corrects both possible overstatements:

1. nonaligned zeros are not merely isolated fine-tuned points;
2. existence of the cone does not make it technically natural.

Naturalness requires an additional rule that forces the minor vector to stay
null.

## 5. Symmetry and the Spin(2,3) path

After square-root rescaling of nonzero complex weights, the quadratic form is
the standard \(O(3,\mathbb C)\) form. For real mixed signs its stabilizer is
\(O(1,2)\) or \(O(2,1)\). These groups preserve the null cone and move among
its nonzero points, but invariance of \(q_w\) does not itself impose
\(q_w=0\).

This creates a precise new joining test. The three mediator minors behave as
a quadratic three-vector; in the real-indefinite case their cancellation
locus is an \(SO(1,2)\) null cone. Since a Spin(1,2) sector can sit inside
Spin(2,3), one can now ask a representation-theoretic question rather than
make an analogy:

\[
\boxed{\text{Does the physical aggregate carrier force its minor vector
onto a Spin(1,2)-compatible null orbit?}}
\]

No such forcing has been derived. The result is a concrete candidate middle
and kill test, not evidence that the Pati--Salam carrier realizes it.

## 6. Programme consequence

The physical aggregate-intertwiner census must record not only the number of
independent packet columns but also:

1. whether the effective matching is symmetric or Hermitian;
2. the signs and phases of the inverse heavy weights;
3. whether exactly three or more physical packet directions occur;
4. whether a real, CP, orbit, or representation constraint forces the minor
   vector onto the relevant null cone.

The preferred robust branch remains a common source ray. But a three-packet
null-orbit branch can no longer be dismissed as algebraically impossible.
It should be retained only if the physical carrier supplies the missing null
constraint; otherwise its linear transverse sensitivity makes it a tuning.

## Boundaries

**Packet-number boundary:** the exhaustive classification here is exact for
two and three packets. For \(n>3\), the minors obey Plucker relations in
addition to the weighted quadratic equation.

**Zero-weight boundary:** a zero weight removes a packet and belongs to a
lower-packet stratum.

**Physical-sign boundary:** the sign of an effective inverse heavy weight
must be determined from a properly normalized physical matching problem; it
cannot be chosen only to reach the null cone.

**Symmetry boundary:** cone preservation is weaker than a representation law
that forces nullness.

**Loop boundary:** the present result is algebraic matching. RG tangency of
either the common-ray ideal or the null-cone ideal is not established.

## Verdict

\[
\boxed{
\begin{array}{ll}
n=2:& \det=0\iff\text{common ray},\\[2mm]
n=3:& \det=0\iff\text{common ray or a nonzero weighted null minor vector}.
\end{array}}
\]

The nonaligned branch exists for complex-symmetric packets and for real
mixed-sign packets. It is a smooth cone away from the common-ray vertex and
is generically lifted at first order. Its programme value is therefore a
specific representation-theoretic question: derive a physical null-orbit
constraint or close the branch.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_complex_indefinite_Schur_locus.mjs
node verification/verify/verify_spin23_sum_of_Schur_packets_requires_projective_alignment.mjs
~~~
