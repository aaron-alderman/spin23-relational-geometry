# The six link vacua span a five-dimensional ((2,3)) quadratic carrier

**Date:** 24 October 2026  
**Status:** exact linear and quadratic theorem; full physical symmetry open  
**Parent:** [Hopf hexagon/link orbit](admissibility_15_hopf_hexagon_as_relative_frame_vacuum_orbit.md)  
**Evidence:** [Five-dimensional carrier certificate](../../../evidence/data/admissibility-link-span-spin23-carrier-v1.json)  
**Verifier:** [Quadratic-signature verifier](../../../verification/admissibility/verify_link_span_spin23_quadratic_carrier.mjs)

## Finding

The six permutation-link vacua do not span a six-dimensional space. In the natural three-point permutation representation their linear span has dimension five.

Choose the common line

\[
u=\frac1{\sqrt3}(1,1,1)
\]

and its trace-zero complement (A_2=u^\perp). Every permutation matrix preserves this splitting, so in an adapted orthonormal basis it has the form

\[
X_\sigma=
\begin{pmatrix}
1&0\\
0&R_\sigma
\end{pmatrix},
\qquad
R_\sigma\in O(A_2).
\]

The six matrices span every block of the form

\[
X=
\begin{pmatrix}
a&0\\
0&R
\end{pmatrix},
\qquad
a\in\mathbb R,
\quad
R\in M_2(\mathbb R).
\]

Therefore

\[
\boxed{
\operatorname{span}\{X_\sigma\}
\cong
\mathbb R\oplus\operatorname{End}(A_2),
\qquad
\dim=1+4=5.
}
\]

Representation-theoretically, this is the image of the real group algebra in the three-point permutation representation:

\[
\mathbb R[S_3]\longrightarrow
\mathbb R\oplus M_2(\mathbb R).
\]

The one-dimensional sign representation is absent, which is why six group elements generate only five linear directions.

## The ((2,3)) quadratic form

Once the family and placement (A_2) planes have correlated orientations, the determinant of the relational map (R:A_{2,P}\to A_{2,F}) is well typed. Define

\[
\boxed{
Q(a,R)=\det R-a^2.
}
\]

For

\[
R=
\begin{pmatrix}x&y\\z&w\end{pmatrix},
\]

write

\[
x=u+v,
\quad
w=u-v,
\quad
y=p+q,
\quad
z=p-q.
\]

Then

\[
\det R=u^2+q^2-v^2-p^2,
\]

and hence

\[
\boxed{
Q=u^2+q^2-a^2-v^2-p^2.
}
\]

The signature is exactly

\[
\boxed{(2,3).}
\]

The relative positive scale between (\det R) and (a^2) is not fixed by the finite representation, but every positive choice has the same signature. Up to overall sign, this five-dimensional carrier therefore has the quadratic type whose connected spin isometry cover is (Spin(2,3)).

## What this does—and does not—say about (Spin(2,3))

This is the first route in the admissibility investigation by which a ((2,3)) carrier is generated directly from the gluing problem:

1. two three-state carriers produce relative permutation frames;
2. the six frames span (\mathbb R\oplus\operatorname{End}(A_2));
3. correlated orientation makes (\det R) meaningful;
4. relational determinant minus singlet norm has signature ((2,3)).

It would be accurate to say:

> the relative-frame matrix has a natural five-dimensional quadratic envelope of (Spin(2,3)) type.

It would **not** yet be accurate to say:

> the physical symmetry of the system is (Spin(2,3)).

The corpus has not shown that the action selects (Q), that dynamics preserve it, or that all connected (SO_0(2,3)) transformations are physically realized. A vector space admitting a metric is not the same as a theory possessing the metric's full isometry group.

## Symmetry-breaking boundary

The qualification is especially informative. Under independent endpoint transformations,

\[
R\longmapsto g_F R g_P^T,
\]

so

\[
\det R\longmapsto
(\det g_F)(\det g_P)\det R.
\]

Thus (Q) is preserved by the orientation-correlated subgroup, including the diagonal (S_3) left after a relative frame condenses. It is not preserved by reflecting only one endpoint.

This orders the emergence:

\[
S_{3,F}\times S_{3,P}
\xrightarrow{\langle X\rangle}
S_{3,\mathrm{diag}}
\xrightarrow{\text{oriented determinant form}}
\text{a }(2,3)\text{ quadratic carrier}.
\]

The quadratic form belongs naturally to the correlated/broken phase, not to the completely independent parent frames.

## Causal classes of the six vacua

For a permutation vacuum, (a=1) and

\[
\det R=\det X_\sigma=\pm1.
\]

Therefore

\[
Q(X_\sigma)=
\begin{cases}
0,&\sigma\text{ even},\\
-2,&\sigma\text{ odd}.
\end{cases}
\]

The three even vacua are null and the three odd vacua are timelike in this normalization. The mixed six-step Hopf/link update alternates between them, so that update does not itself preserve (Q). It should not be silently promoted to a (Spin(2,3)) rotation.

This is a productive constraint: any physical model claiming both the six-step transition and exact (Spin(2,3)) invariance must explain how the metric is modified, how the step is lifted, or why only a subgroup/defect transition is physical.

## Harmonic anatomy

Under the mixed (C_6) step, the five-dimensional carrier decomposes as

\[
\boxed{
\mathbf1
\oplus
\mathbf2_{k=1}
\oplus
\mathbf2_{k=2}.
}
\]

The fundamental plane carries the faithful six-step Hopf phase; the second-harmonic plane factors through the placement three-cycle. The alternating (k=3) sheet character is absent as an independent linear direction and reappears nonlinearly through (\det X). This explains why phase, placement and parity were visible as related but nonidentical structures throughout the corpus.

## Next gate

The next decisive calculation is action-level: search the corpus for a kinetic or response form on (\mathbb R\oplus\operatorname{End}(A_2)), restrict it to this five-dimensional carrier, and test whether its Hessian is proportional to (Q), to a positive Frobenius form, or to neither. Only the first outcome would begin to promote the (Spin(2,3))-type envelope into physical symmetry.
