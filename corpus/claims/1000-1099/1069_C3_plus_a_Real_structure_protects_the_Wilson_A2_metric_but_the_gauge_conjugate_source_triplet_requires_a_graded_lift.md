# \(C_3\) Plus a Real Structure Protects the Wilson \(A_2\) Metric, but the Gauge-Conjugate Source Triplet Requires a Graded Lift

**Date:** 18 October 2026  
**Branches:** Wilson \(A_2\) metric, counterterm algebra, placement \(C_3\), Real structure, gauge orientation, dicyclic lift  
**Claim status:** exact quadratic counterterm and source-intertwiner classification; microscopic graded symmetry remains open  
**Certificate:** [classify_the_c3_real_counterterms_and_gauge_orientation_obstruction_for_the_wilson_a2_mediator.mjs](../../../verification/classify/classify_the_c3_real_counterterms_and_gauge_orientation_obstruction_for_the_wilson_a2_mediator.mjs)

> **Forward result (document 1070).** The physical
> \(S_1/S_1^\dagger\) vertex pattern induces the edge voltage \((0,1,1)\),
> a zero-flux coboundary, and therefore cannot produce the connected
> placement six-cycle. Uniform antiunitary sewing has the required odd flux
> only on the full six-state conjugation completion.

## Executive result

Placement \(C_3\) symmetry can protect the Wilson \(A_2\) metric against real quadratic counterterms—but not against every complex Hermitian counterterm.

Let

\[
A=
\begin{pmatrix}
0&-1\\
1&-1
\end{pmatrix}
\]

act on the two-dimensional mediator-copy space. The general Hermitian matrix satisfying

\[
A^\dagger H A=H
\]

is

\[
\boxed{
H(a,d)=
\begin{pmatrix}
a&-a/2+id\\
-a/2-id&a
\end{pmatrix}.
}
\]

Thus \(C_3\) alone leaves two real parameters. Besides the \(A_2\) metric, it permits the Hermitian pseudoscalar

\[
i\varepsilon=
\begin{pmatrix}
0&i\\
-i&0
\end{pmatrix}.
\]

Ordinary complex conjugation sends

\[
d\longmapsto-d.
\]

Therefore a compatible Real/antiunitary symmetry removes this counterterm and leaves

\[
\boxed{
H\propto G_{A_2}.
}
\]

So \(C_3+\text{Real}\), not \(C_3\) alone, protects the selected metric ray.

There is also an exact source intertwiner. Order the three coupling rays as

\[
\Lambda=(u\;d\;l)
=
\begin{pmatrix}
1&0&1\\
0&1&1
\end{pmatrix}.
\]

The signed source cycle

\[
T=
\begin{pmatrix}
0&0&-1\\
1&0&0\\
0&-1&0
\end{pmatrix}
\]

satisfies

\[
\boxed{
A\Lambda=\Lambda T,
\qquad
T^3=I.
}
\]

Its fixed kernel is

\[
\ker\Lambda
=\mathbb R(-1,-1,1),
\]

the relation

\[
l-u-d=0.
\]

This is an exact realization of three relationships descending to a two-dimensional carrier.

But the physical bilinears have gauge-conjugate orientations:

\[
u,d:\ S_1^\dagger,
\qquad
l:\ S_1.
\]

The signed cycle \(T\) does not preserve that orientation grading. Hence it cannot be an ordinary complex-linear internal symmetry commuting with the gauge action. It must be implemented through conjugation, a graded/antiunitary sewing, or a neutral effective quotient.

The same Real structure needed to protect the \(A_2\) metric is therefore also suggested by the gauge orientation of the source cycle—but its microscopic action is not yet derived.

## 1. The exact three-to-two intertwiner

The coupling vectors obey

\[
u=e_1,
\qquad
d=e_2,
\qquad
l=e_1+e_2.
\]

The placement cycle acts by

\[
Au=d,
\qquad
Ad=-l,
\qquad
Al=-u.
\]

This induces the signed three-cycle \(T\). Although signs appear, its third power is exactly the identity.

The relation \(l-u-d=0\) is invariant under \(T\). Quotienting the three-dimensional signed source representation by this fixed relation gives the two-dimensional \(A_2\) representation:

\[
\mathbb R^3/\langle l-u-d\rangle
\longrightarrow
\mathbb R^2.
\]

This is a precise algebraic form of

\[
\boxed{\text{one carrier, two dimensions, three relationships}.}
\]

It is not yet a field-content statement.

## 2. Quadratic counterterm algebra

Write a general Hermitian copy-space form as

\[
H=
\begin{pmatrix}
a&c+id\\
c-id&b
\end{pmatrix}.
\]

Solving \(A^\dagger H A=H\) gives

\[
b=a,
\qquad
c=-\frac a2,
\]

while \(d\) remains free. Hence

\[
H
=
\frac a2G_{A_2}
+d\,i\varepsilon.
\]

Positivity requires

\[
a>0,
\qquad
|d|<\frac{\sqrt3}{2}a.
\]

The imaginary antisymmetric term is not an algebraic mistake. It is Hermitian and commutes with the complex \(C_3\) action. It distinguishes the two complex characters of \(C_3\) after diagonalization.

Therefore placement symmetry alone does not uniquely protect the real \(A_2\) kernel.

## 3. The Real selector

Let the copy-space Real structure act by complex conjugation in the integral root basis. Then

\[
\overline{G_{A_2}}=G_{A_2},
\qquad
\overline{i\varepsilon}=-i\varepsilon.
\]

Demanding

\[
\overline H=H
\]

forces \(d=0\). The allowed positive counterterms reduce to

\[
H=\rho G_{A_2},
\qquad
\rho>0.
\]

The overall scale may run, but the critical ratio and root angles are protected.

This is precisely the type of division of labor seen elsewhere in the programme:

- the order-three relation fixes the root geometry;
- the Real structure excludes the orientation-odd complex deformation;
- their product can lift to a coherent order-six or order-twelve structure.

## 4. Gauge-orientation obstruction

The gauge-dressed mediator interactions have schematic form

\[
S\,\lambda_L B_L
+S^\dagger
\left(
\lambda_uB_u+\lambda_dB_d
\right)
+\mathrm{h.c.}
\]

The \(l\) ray therefore belongs to the \(S\) orientation, while \(u,d\) belong to \(S^\dagger\). Define the orientation grading

\[
P_{\rm gauge}
=\operatorname{diag}(-1,-1,+1)
\]

in source order \((u,d,l)\). Directly,

\[
[T,P_{\rm gauge}]\ne0.
\]

The source cycle crosses the conjugation boundary. An ordinary unitary flavor symmetry cannot linearly rotate all three bilinears into one another while preserving their gauge representations.

Three possibilities remain:

1. an antiunitary or graded symmetry conjugates the gauge representation on the crossing steps;
2. the cycle acts only after forming gauge-neutral composite response operators;
3. a larger field multiplet contains both orientations as independent components.

The first possibility aligns structurally with the established dicyclic/sideband lift, but equality is not proved.

## 5. Counterterm stability boundary

If a full microscopic symmetry realizes both \(T\) and the required Real action, every invariant quadratic counterterm remains proportional to \(G_{A_2}\). Then \(r=1\) is symmetry protected rather than tuned order by order.

If only the projective \(C_3\) survives, the \(i\varepsilon\) counterterm is allowed. It complexifies the mediator kernel and can move the theory away from the real projective triangle even while preserving the abstract cyclic symmetry.

If neither symmetry acts microscopically, all Hermitian copy-space counterterms are allowed and the exact \(A_2\) point is unprotected.

## 6. Stop-everything criteria

**Protection trigger:** construct a gauge-compatible antiunitary \(\mathcal R\) with \(\mathcal R^2=\pm1\) whose copy action is conjugation and whose source action implements the orientation changes in \(T\).

**Counterterm trigger:** prove the complete renormalized quadratic action obeys both \(A^\dagger H A=H\) and \(\overline H=H\). Then \(H\propto G_{A_2}\) to all symmetry-preserving orders.

**\(C_3\)-only falsifier:** claim that complex \(C_3\) symmetry alone leaves only one quadratic invariant. The \(i\varepsilon\) term survives.

**Gauge-linearity falsifier:** treat \(B_L,B_u,B_d\) as one ordinary complex-linear gauge multiplet despite their \(S_1/S_1^\dagger\) orientations.

**Effective-quotient trigger:** construct neutral bilinears on which the signed cycle becomes linear without violating gauge charge.

**Anomaly/locality gate:** verify that the graded symmetry is compatible with Lorentz structure, CAR statistics, locality and the Standard-Model anomaly constraints.

## Verdict

| Question | Verdict |
|---|---|
| Does an exact source-to-carrier \(C_3\) intertwiner exist? | **Yes** |
| What relation is quotiented? | **\(l-u-d=0\)** |
| Does complex \(C_3\) alone uniquely protect \(G_{A_2}\)? | **No** |
| What extra quadratic term survives? | **\(d\,i\varepsilon\)** |
| Does \(C_3+\)Real protect the \(A_2\) metric ray? | **Yes** |
| Is the source cycle an ordinary gauge-linear symmetry? | **No** |
| What is required? | **A graded/antiunitary lift or neutral effective quotient** |
| Is that microscopic lift derived? | **No** |

## Position in the corpus

- [placement versus log-det selector audit](1068_placement_C3_covariance_selects_the_Wilson_A2_metric_but_the_generic_Jordan_logdet_barrier_selects_the_unmixed_point_instead.md)
- [unique Wilson/\(A_2\) critical metric](1067_the_Wilson_rays_become_exactly_the_A2_placement_root_system_at_the_unique_shared_leg_strength_kappa_equals_m_squared.md)
- [dicyclic placement lift](../0900-0999/992_the_coherent_two_face_response_is_a_dicyclic_central_lift_of_the_placement_weyl_groupoid.md)
- [Furey conjugation versus physical CP](../0300-0399/356_furey_conjugation_supplies_car_particle_hole_reality_not_an_exact_flavor_cp.md)

