# The Wilson Rays Become Exactly the \(A_2\) Placement Root System at the Unique Shared-Leg Strength \(\kappa=m^2\)

**Date:** 18 October 2026  
**Branches:** Wilson projective triangle, \(A_2\) root metric, placement groupoid, mediator reflections, shared-leg self-energy, Coxeter selection  
**Claim status:** exact uniqueness and matrix-identification theorem inside the two-copy ansatz; dynamical selection of \(\kappa=m^2\) open  
**Certificate:** [find_the_unique_shared_leg_strength_where_the_wilson_rays_become_the_a2_placement_root_system.mjs](scripts/find_the_unique_shared_leg_strength_where_the_wilson_rays_become_the_a2_placement_root_system.mjs)

> **Forward result (document 1068).** Exact placement \(C_3\) covariance, or
> equal \(K\)-norms for the three marked Wilson rays, selects \(r=1\)
> uniquely. A generic trace-normalized log-determinant/Jordan isotropy
> principle instead selects the unmixed point \(r=0\). Relationship symmetry,
> not the unmarked positive cone, is the conditional selector.

## Executive result

The real-projective Wilson triangle of document 1066 is not generically the established \(A_2\) placement triangle. It becomes exactly that triangle at one and only one positive ratio.

Let

\[
r=\frac{\kappa}{m^2}>0.
\]

Ignoring an irrelevant common positive scale, the loop-corrected inverse-mass metric is

\[
K(r)=
\begin{pmatrix}
1+r&-r\\
-r&1+r
\end{pmatrix}.
\]

Use the three real Wilson coupling rays

\[
u=e_1,
\qquad
d=e_2,
\qquad
l=e_1+e_2.
\]

Their normalized \(K(r)\)-overlaps are

\[
\widehat{\langle l,u\rangle}
=
\widehat{\langle d,l\rangle}
=
\sqrt{\frac1{2(1+r)}},
\]

\[
\widehat{\langle u,d\rangle}
=-\frac{r}{1+r}.
\]

The three unoriented \(A_2\) root lines require absolute overlap \(1/2\). This happens iff

\[
\boxed{r=1},
\qquad\text{that is}\qquad
\boxed{\kappa=m^2}.
\]

At that point,

\[
K
=\frac1{3m^2}
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix}
=\frac1{3m^2}G_{A_2}.
\]

The Wilson coupling directions are literally the two simple roots and their sum:

\[
u=\alpha_1,
\qquad
d=\alpha_2,
\qquad
l=\alpha_1+\alpha_2.
\]

More strongly, their metric Householder reflections reproduce the previously established placement matrices without a similarity transform. Reflection normal to \(d\) is

\[
S_d=
\begin{pmatrix}1&0\\1&-1\end{pmatrix}
=F,
\]

while reflection normal to \(l\) is

\[
S_l=
\begin{pmatrix}0&-1\\-1&0\end{pmatrix}
=FA.
\]

Therefore

\[
\boxed{
S_dS_l=F(FA)=A
}
\]

is exactly the three-placement Coxeter cycle.

The representation-level mediator-to-placement arrow map that remained open in document 991 is therefore realized by the Wilson coupling geometry at the unique point \(\kappa=m^2\). What remains open is harder and more physical: why the shared-leg self-energy should equal the bare mass-squared scale.

## 1. General inverse-mass geometry

For

\[
M^2=m^2I+\kappa ll^T,
\qquad l=(1,1)^T,
\]

the inverse is

\[
(M^2)^{-1}
=\frac1{m^2}
\left(
I-\frac{\kappa}{m^2+2\kappa}ll^T
\right).
\]

Multiplying by the positive scalar \(m^2(m^2+2\kappa)\) leaves the scale-free metric

\[
K(r)=
\begin{pmatrix}
1+r&-r\\
-r&1+r
\end{pmatrix}.
\]

Its eigenvalues are

\[
1,
\qquad
1+2r,
\]

so it is positive for every \(r>0\).

The negative off-diagonal entry gives the projective \(\pi\) holonomy for every positive \(r\). Exact \(A_2\) geometry is a stronger metric condition.

## 2. Uniqueness of the \(A_2\) point

The simple-root correlation has magnitude

\[
\left|
\widehat{\langle u,d\rangle}
\right|
=\frac{r}{1+r}.
\]

Setting it to the \(A_2\) value \(1/2\) gives

\[
2r=1+r,
\]

hence

\[
r=1.
\]

At the same value,

\[
\sqrt{\frac1{2(1+r)}}=\frac12,
\]

so all three ray pairs have the correct \(60^\circ/120^\circ\) geometry.

There is an equivalent Coxeter proof. Let \(S_d(r)\) and \(S_l(r)\) be the \(K(r)\)-orthogonal reflections normal to \(d\) and \(l\). Their product has determinant one and trace

\[
\operatorname{tr}\bigl(S_d(r)S_l(r)\bigr)
=-\frac{2r}{1+r}.
\]

A nontrivial order-three real two-dimensional matrix has characteristic polynomial

\[
\lambda^2+\lambda+1
\]

and therefore trace \(-1\). Again,

\[
-\frac{2r}{1+r}=-1
\quad\Longleftrightarrow\quad
r=1.
\]

Thus the shared-leg ratio is selected both by root angles and by finite Coxeter order.

## 3. Exact placement-arrow identification

At \(r=1\), the three metric reflections are

\[
S_u=
\begin{pmatrix}
-1&1\\
0&1
\end{pmatrix},
\qquad
S_d=
\begin{pmatrix}
1&0\\
1&-1
\end{pmatrix},
\qquad
S_l=
\begin{pmatrix}
0&-1\\
-1&0
\end{pmatrix}.
\]

Documents 990--991 used

\[
F_-=
\begin{pmatrix}
1&0\\
1&-1
\end{pmatrix},
\qquad
F_+=
\begin{pmatrix}
0&-1\\
-1&0
\end{pmatrix}.
\]

Hence

\[
F_-=S_d,
\qquad
F_+=S_l.
\]

The third Wilson ray \(u\) supplies the remaining reflection of the \(A_2\) root triangle. The three reflections close the six-element Weyl group \(W(A_2)\cong S_3\).

No fitted conjugacy is needed: the Wilson copy coordinates themselves become the integral simple-root coordinates.

## 4. What is robust and what is tuned

For every \(r>0\):

- \(K(r)\) is positive;
- the \(u-d\) overlap is negative;
- the \(l-u\) and \(d-l\) overlaps are positive;
- the Bargmann sign is \(-1\);
- the projective line loop has nontrivial deck holonomy.

Only at \(r=1\):

- all three root lengths agree;
- all absolute pair overlaps equal \(1/2\);
- the inverse-mass metric is proportional to \(G_{A_2}\);
- the face product has exact order three;
- the Wilson reflections equal the established integral placement faces.

This separates a topologically robust central sign from a metrically tuned Coxeter realization.

## 5. Physical interpretation of \(\kappa=m^2\)

In the perturbative language of document 1063, \(\kappa\) arose as a shared-\(QL\) self-energy correction. The equality

\[
\kappa=m^2
\]

is not a small-loop regime. It is a strong threshold or self-consistency condition in which the relationship-induced correction equals the bare carrier scale.

Possible readings include:

1. a nonperturbative gap equation fixes the dressed and bare contributions equally;
2. a boundary critical point makes the shared relationship energy equal the carrier mass;
3. an integral \(A_2\) lattice condition quantizes the allowed ratio;
4. the decomposition into “bare” \(m^2\) and “correction” \(\kappa\) is not fundamental, and only their selected ratio is physical.

None is derived. The equality must not be described as a Standard-Model prediction without a dynamical equation.

## 6. Consequence for the silver/placement branch

Document 990 showed that exact integral \(A_2\) reflection structure quantizes the positive boundary reactance amplitude to the unit value. The new dependency chain is

\[
\kappa=m^2
\Longrightarrow
K\propto G_{A_2}
\Longrightarrow
(S_d,S_l)=(F,FA)
\Longrightarrow
S_dS_l=A
\Longrightarrow
\text{unit }A_2\text{ boundary amplitude}.
\]

This does not derive the silver scale. It supplies a new microscopic condition under which the previously established integral placement protection applies to the Wilson mediator sector.

## 7. Stop-everything criteria

**Generic-identification falsifier:** identify the Wilson projective triangle with the placement \(A_2\) triangle for arbitrary \(\kappa/m^2\). The \(\mathbb Z_2\) holonomy agrees, but the angles and reflection order do not.

**Coxeter trigger:** derive \(\kappa=m^2\) from a gap equation, boundary extremum or exact symmetry. Then the Wilson and placement reflection matrices coincide.

**Perturbative falsifier:** claim that a parametrically small radiative correction \(\kappa\ll m^2\) already produces exact \(A_2\); its two-face product is not order three.

**Renormalization gate:** show that \(r=1\) is an RG fixed point or an invariant matching condition. Otherwise exact Coxeter closure holds at most at one tuned scale.

**Physical-functor gate:** identify the three Wilson bilinear rays with the three placement objects and derive their admissible local face traversals. Matrix equality alone remains representation-level.

## Verdict

| Question | Verdict |
|---|---|
| Is the Wilson \(\pi\)-flux triangle generically \(A_2\)? | **No** |
| Does it become exactly \(A_2\)? | **Yes, uniquely at \(\kappa=m^2\)** |
| What is the inverse-mass metric there? | **\(G_{A_2}/(3m^2)\)** |
| Do its reflections match the placement faces? | **Yes, exactly** |
| Does their ordered product equal the placement cycle? | **Yes** |
| Is \(\kappa=m^2\) dynamically derived? | **No** |
| Is the robust \(\mathbb Z_2\) sign dependent on this tuning? | **No** |

## Position in the corpus

- [real-projective Wilson lift](1066_the_Wilson_pi_flux_is_the_nontrivial_RP1_line_holonomy_but_its_canonical_frame_lift_is_central_minus_I_not_a_Pfaffian_sheet_flip.md)
- [placement/mediator arrow identity](991_the_two_mediator_faces_are_exactly_adjacent_reflection_arrows_in_the_three_placement_groupoid.md)
- [integral \(A_2\) boundary quantization](990_exact_a2_lattice_preservation_quantizes_the_boundary_reflection_and_independently_forces_unit_silver_reactance.md)
- [Wilson mass-metric obstruction](1063_the_doubled_furey_links_do_not_supply_two_S1_copies_and_the_shared_QL_leg_radiatively_breaks_the_naive_orthogonality.md)

