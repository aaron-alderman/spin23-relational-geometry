# One-Dimensional Local Arrow Spaces Do Not Force the Global Rank-One Schur Alignment Ideal

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact quiver-parameter no-go; a common-source factorization or stronger representation theorem remains open

**Depends on:** [the global Schur-ray theorem](1509_sums_of_rank_one_Schur_packets_preserve_the_texture_only_when_all_mediator_paths_share_one_projective_coupling_ray.md), [the typed-path matching construction](1508_the_typed_path_matching_law_maps_the_required_composite_to_a_rank_one_Schur_packet_not_an_independent_leakage_arrow.md), and [the typed twin-wheel split](../1100-1199/1127_opposite_anchor_typing_splits_the_Sp6_envelope_into_two_local_Spin23_relational_wheels.md)

**Evidence:** [local/global Hom ledger](../../../evidence/data/spin23-local-Hom-global-alignment-no-go.json) and [exhaustive verifier](../../../verification/verify/verify_spin23_local_one_dimensional_arrows_do_not_force_global_Schur_alignment.mjs)

## Result

Making every individual quiver arrow space one-dimensional does not enforce
the common projective ray required by claim 1509.

With mediator copies \(P_i\), let

\[
d_i:L\to P_i,
\qquad
y_i:P_i\to N
\]

each carry one scalar. The aggregate coupling data form

\[
V=
\begin{pmatrix}
d_1&d_2&\cdots&d_m\\
y_1&y_2&\cdots&y_m
\end{pmatrix}.
\]

Global Schur protection requires

\[
\boxed{\operatorname{rank}V=1,}
\]

or equivalently

\[
\boxed{d_iy_j-d_jy_i=0\quad\text{for every }i<j.}
\]

The local statement \(\dim\operatorname{Hom}=1\) for each separate arrow
does not impose any of these cross-copy equations.

## 1. Explicit counterexample

Take two mediator copies with coupling vectors

\[
v_1=(1,1)^T,
\qquad
v_2=(1,-1)^T.
\]

Every local arrow coefficient is a nonzero scalar, yet

\[
\det(v_1,v_2)=-2\ne0.
\]

The two Schur packets span rank two and lift the protected cofactor.

Thus

\[
\boxed{
\text{local one-dimensionality}\not\Rightarrow
\text{global projective alignment}.}
\]

## 2. Determinantal geometry

The aligned locus is the rank-one determinantal variety of \(2\times m\)
matrices. Away from the zero matrix it admits the factorization

\[
d_i=\kappa y_i
\]

for one common \(\kappa\). Its generic dimension is \(m+1\) inside the
\(2m\)-dimensional unconstrained coupling space, so its codimension is

\[
\boxed{m-1.}
\]

For the three single-mediator topology classes, two independent relations are
needed unless some paths are absent.

## 3. Exhaustive three-mediator audit

Let every \(d_i,y_i\) independently take values \(\pm1\). There are
\(2^6=64\) assignments for three mediator copies.

- 16 have all columns on one projective ray;
- 48 are misaligned and produce at least one nonzero minor.

The fact that every local Hom coordinate is one-dimensional and nonzero does
not make alignment generic; three quarters of this smallest sign audit fail.

## 4. What the twin-wheel category already does

The current relational construction successfully:

- separates Dirac and Majorana relation sectors;
- remembers opposite anchors;
- distinguishes primitive arrows from reducible paths;
- maps each factored path to its complete Schur packet.

It does not yet identify the ratios \(d_i/y_i\) of distinct mediator copies.
Orthogonal twin wheels provide typing, not a diagonal natural transformation
across every possible hinge.

This is a precise limitation, not a rejection of the construction.

## 5. Minimal upgrades

Any of the following would impose the required global ideal:

1. one common source morphism \(u=(\kappa,1)^T\) with each mediator path
   weighted only by a scalar \(\lambda_i\), so \(v_i=\lambda_i u\);
2. a diagonal natural transformation relating all \(L\to P_i\) and
   \(P_i\to N\) arrows;
3. an irreducible representation theorem whose intertwiner space for the
   aggregate coupling matrix is one-dimensional;
4. physical absence of every mediator path except one.

The fourth is approximately the minimal Pati--Salam inventory result of claim
1498. The first three would provide a deeper geometric derivation.

## 6. Fan downward: mediator census

The result strengthens the inventory requirement. Each additional mediator
is not harmless merely because its individual matching is correlated. It
either must be absent or its two portals must be locked to the common source
ray.

This makes the conditional charged bidoublet especially diagnostic: if it is
present with independent portals, it supplies a second column of \(V\) and
generically violates a minor.

## 7. Fan upward: Spin(2,3) representation target

The next representation calculation is now sharply formulated. Determine
the dimension of the **aggregate** intertwiner space mapping the typed
Dirac/Majorana hinge into all admitted mediator carriers.

If Schur's lemma or a Jordan-Peirce identity reduces that aggregate space to
one common morphism, projective alignment is derived. If it permits two
independent morphisms, the multi-path texture is generically unprotected.

## Boundaries

**Symmetry boundary:** the present no-go applies to the free typed quiver with
independent scalar arrows. An additional symmetry may impose the minors.

**Absence boundary:** with only one physical mediator packet, alignment is
automatic and the no-go is vacuous.

**Complex boundary:** complex alignment is still rank one, but tuned
indefinite cancellations can protect a determinant without rank-one \(V\).

**Loop boundary:** momentum-dependent form factors enlarge the aggregate
module beyond a finite scalar matrix.

## Verdict

The required middle is stronger than locally thin arrows:

\[
\boxed{
\text{global coupling matrix rank one}
\quad\text{not merely}\quad
\dim\operatorname{Hom}(u,v)=1\text{ edge by edge}.}
\]

The next high-value task is an aggregate intertwiner census for the actual
minimal Pati--Salam mediator representations, including whether the
conditional bidoublet adds a genuinely independent column.

The programme-level ordering, executable artifacts, stop/go rules, and work
to defer are fixed in [claim 1511](1511_the_highest_value_next_investigations_are_the_physical_intertwiner_RG_tangency_and_categorical_closure_tests.md).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_local_one_dimensional_arrows_do_not_force_global_Schur_alignment.mjs
node verification/verify/verify_spin23_sum_of_Schur_packets_requires_projective_alignment.mjs
~~~
