# The Local BRST Counterterm Cohomology Defeats Every Commuting Copy-Symmetry Completion

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A7, A8 and A11

**Status:** exact symmetry-character and counterterm-tangency no-go for direct-product multiplicity completions; lower-bound local BRST cohomology, not a full beta-function calculation

**Depends on:** [the minimal multiplicity-symmetry classification](1635_only_a_gauged_copy_rotation_removes_the_compensator_ray_but_its_connection_reopens_the_spectrum.md), [the frozen AdS spectrum](1634_the_two_copy_spin23_compensator_can_be_frozen_exactly_but_quantum_closure_needs_a_new_protecting_principle.md), and [the full critical PGT audit](1622_the_full_local_pgt_route_contains_a_healthy_critical_pseudoscalar_sector_but_not_an_open_quantum_region.md)

**Evidence:** [BRST counterterm ledger](../../../evidence/data/spin23-copy-brst-counterterm-cohomology-no-go-v1.json) and [verifier](../../../verification/verify/verify_spin23_copy_brst_counterterm_cohomology_no_go.mjs)

## Result

Promoting the copy rotation to a gauge symmetry does not protect the healthy
critical gravity action. The reason is structural rather than numerical.
Every direct-product copy group (K_{\rm copy}) acts on the index (I) of
(Y_I^A) and commutes with the spacetime gauge algebra. The pure coframe,
torsion and curvature operators are (K_{\rm copy}) singlets. Consequently,
the copy Ward identity assigns the same trivial character to the desired
pseudoscalar-curvature square and to all dangerous parity-even PGT
counterterms.

Moreover, continuous (SO(2)_{\rm copy}) has no invariant covector on its real
doublet. Writing the linear Stelle--West compensator term already requires an
additional transforming orientation section. The cohomology result below is
therefore deliberately generous: it grants that extra Stueckelberg datum and
still finds no radiative protection.

At ghost number zero and form degree four, the gauge-invariant candidate
counterterm span therefore contains representatives

\[
 R,\quad T_1^2,T_2^2,T_3^2,\quad
 {\cal R}_1^2,\ldots,{\cal R}_6^2,
 \quad f_q^2,
\]

plus the cosmological density, topological densities, constraint-sector
operators and higher-dimension EFT terms. Topological identities and
equation-of-motion field redefinitions can reduce this presentation; they do
not identify the independent (C^2), (R^2) and (f_q^2) normal directions
used below. BRST invariance permits these counterterms; it does not impose the
seven critical PGT equalities or (Z_q=0).

In a counterterm-adapted ten-coupling basis, the target surface has codimension
eight. Its normal directions are two torsion relations, five absent curvature
invariants and the absent copy-gauge kinetic term. The constraint matrix has
rank eight. Known scalar-loop (C^2) and (R^2) counterterms have nonzero
normal projection. Hence even the anomaly-free BRST complex is not tangent to
the target surface:

\[
 \boxed{\text{Slavnov--Taylor invariance}\ \not\Rightarrow\
 \text{critical-surface radiative closure}.}
\]

This exhausts every ordinary global, discrete or gauged multiplicity symmetry
that commutes with the gravitational gauge group. Reopening the fundamental
route requires a symmetry acting nontrivially on the connection/curvature
operators, a larger graded or topological gauge complex, or a dynamical RG
fixed surface. None is supplied by the present Spin(2,3) plus two-copy data.

## BRST complex

For local Spin(2,3), diffeomorphism and copy (SO(2)) ghosts
(c^{AB},\xi^\mu,\eta), a minimal schematic differential is

\[
\begin{aligned}
s{\cal A}^{AB}&=-D c^{AB}+{\cal L}_\xi{\cal A}^{AB},\\
sY_I^A&=c^A{}_B Y_I^B+\eta\epsilon_I{}^JY_J^A
 +{\cal L}_\xi Y_I^A,\\
sq&=-d\eta+{\cal L}_\xi q,\\
sc&=-\tfrac12[c,c]+{\cal L}_\xi c,\qquad s\eta={\cal L}_\xi\eta,
\end{aligned}
\]

with the standard diffeomorphism-ghost completion understood. The rank-one
constraint and norm are covariant, so their multiplier sector can be included
in BRST doublets. Gauge-fixing antighosts and Nakanishi--Lautrup fields also
form contractible pairs and do not remove gauge-invariant ghost-number-zero
classes.

For any invariant four-form (I_4),

\[
 sI_4=d(i_\xi I_4),
\]

so its integral is a cocycle in (H^{0,4}(s\mid d)). General local BRST
cohomology results identify such gauge-invariant local functionals as the
counterterm representatives, modulo total derivatives and equation-of-motion
or field-redefinition classes.

The present certificate is a **sufficient subspace audit**, not a claimed
dimension theorem for (H^{0,4}(s\mid d)). It is enough for a no-go because
finding even one allowed non-tangent nontrivial counterterm disproves closure;
a complete antifield computation may add classes and may identify topological
or field-redefinition-redundant representatives.

## Independent representative classes

Use a basis adapted to physical sectors rather than to one paper's index
conventions:

\[
 g=(t_1,t_2,t_3,c_C,c_R,c_X,c_4,c_5,c_6,z_q).
\]

Here (t_i) multiply the three irreducible torsion squares; (c_X) is the
pseudoscalar-curvature square retained by the (0^-) theory; (c_C,c_R) can
be chosen to contain the torsionless (C^2,R^2) directions; (c_{4,5,6})
complete the six curvature-square coordinates; and (z_q) multiplies
(f_q^2).

The target surface is

\[
\begin{gathered}
2t_1+t_2=0,\qquad t_1+2t_3=0,\\
c_C=c_R=c_4=c_5=c_6=0,\qquad z_q=0.
\end{gathered}
\]

The eight rows are independent in this standard off-shell coupling
presentation, so its target tangent is two-dimensional: one torsion ray and
the (c_X) axis. This coordinate codimension is not asserted to survive every
topological or field-redefinition quotient. The one-loop pseudoscalar
coefficients

\[
 \Delta c_C={1\over120},\qquad \Delta c_R={1\over72}
\]

have nonzero image under this constraint matrix. They are therefore a finite
tangency falsifier without requiring the remaining beta functions.

The representative classes can also be separated by field configurations:

- torsionless Weyl-curved data distinguish (C^2);
- conformally flat scalar-curved data distinguish (R^2);
- pure trace, axial and tensor contorsions distinguish the three torsion
  quadratic forms;
- a copy connection with (f_q\ne0) distinguishes (f_q^2); and
- axial torsion with nonzero pseudoscalar curvature distinguishes (X^2).

This separation is not a substitute for a full off-shell antifield proof, but
it prevents the needed classes from being dismissed as the same algebraic
operator. The already computed scalar loop supplies the nonzero physical
counterterm representatives needed for the closure verdict.

## Why copy Ward identities cannot help

Let (K_{\rm copy}) be any compact or finite group acting only on the two-copy
index and commuting with Spin(2,3). After all copy indices are contracted, the
geometric operators satisfy

\[
 \chi_{K}(T_i^2)=\chi_K({\cal R}_j^2)=1.
\]

Thus the Ward-character map on the nine PGT quadratic operators is the zero
charge row. It cannot distinguish (c_X) from (c_C,c_R,c_{4,5,6}), nor can
it impose relations among (t_1,t_2,t_3). Gauging (K_{\rm copy}) adds the
new singlet (f_q^2) rather than removing old singlets.

This proves a useful direct-product theorem:

> A symmetry acting trivially on the independent gravitational connection
> cannot protect a proper linear subspace of pure connection invariants when
> every invariant in question carries the trivial symmetry character.

The result includes global (SO(2)), gauged (SO(2)), (O(2)), exchange
(\mathbb Z_2), and their subgroups. Nonlinear realization on the compensator
does not alter the theorem after the pure geometric invariants are formed.

## Candidate enhanced principles

Several familiar symmetries fail before a loop calculation:

- **Parity or CP** permits every operator in the displayed parity-even basis.
- **Weyl symmetry** would forbid the fixed norm, Einstein scale and AdS
  curvature that define the target background.
- **A shift symmetry of the (0^-) scalar** conflicts with its required
  nonzero mass and does not forbid pure metric (C^2).
- **The copy gauge symmetry** permits (f_q^2) and acts trivially on the PGT
  curvature basis.
- **The existing critical constraints** are predominantly second class, not
  generators of a new gauge Ward identity.

Three qualitatively new routes remain logically open:

1. an enlarged connection symmetry or topological complex whose first-class
   constraints remove the unwanted curvature sectors;
2. an AdS superalgebra completion, such as a suitable extension of
   (OSp(1|4)), with a complete supermultiplet containing the torsion mode and
   cancellations verified beyond tree level; or
3. a nontrivial RG fixed point/invariant surface on which all eight normal
   beta components vanish.

Each route changes the theory. Supersymmetry requires new fermions and partners
and is not guaranteed to protect higher-loop curvature invariants. A fixed
point is a dynamical calculation, not a Ward identity. A topological complex
must reproduce the two graviton helicities rather than gauge them away.

## Anomaly boundary

The bosonic compensator sector has no perturbative chiral copy anomaly. If
chiral matter is charged under copy (SO(2)\simeq U(1)), nilpotent quantum
BRST requires

\[
 \sum_f q_f^3=0,\qquad \sum_f q_f=0,
\]

with the appropriate left-handed spectrum and mixed non-Abelian conditions.
No charge assignment is presently derived, so anomaly freedom of an extended
matter theory is open. This uncertainty cannot rescue the model: the
ghost-number-zero counterterm obstruction survives even if all anomalies
cancel.

## Significant exhaustion point

The finite symmetry route is exhausted at a sharper boundary than claim 1634:

1. a basis-free rank-one constraint exists;
2. only local copy rotation makes its ray gauge;
3. its BRST complex permits a new (f_q^2) class;
4. every commuting copy symmetry is blind to all pure PGT quadratic
   invariants; and
5. an explicit one-loop matter determinant already points out of the critical
   tangent space.

More scans over ordinary copy groups cannot change these facts. The next
meaningful work must specify an enlarged symmetry acting on the connection, a
full super/topological field content, or an actual fixed-point beta system.
Without one of those new inputs, the fundamental local-polynomial route is
closed and the (2+1) theory should be used only as a tuned EFT.

## Sources

- G. Barnich, F. Brandt and M. Henneaux, [*Local BRST cohomology in gauge theories*](https://arxiv.org/abs/hep-th/0002245).
- G. Barnich, M. Henneaux, T. Hurth and K. Skenderis, [*Cohomological analysis of gauge-fixed gauge theories*](https://arxiv.org/abs/hep-th/9910201).
- O. Melichev and R. Percacci, [*On the renormalization of Poincare gauge theories*](https://arxiv.org/abs/2307.02336).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_copy_brst_counterterm_cohomology_no_go.mjs
~~~
