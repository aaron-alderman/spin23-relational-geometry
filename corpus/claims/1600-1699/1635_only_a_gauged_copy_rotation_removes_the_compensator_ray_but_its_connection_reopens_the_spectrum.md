# Only a Gauged Copy Rotation Removes the Compensator Ray, but Its Connection Reopens the Spectrum

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A7, A8 and A11

**Status:** exact local rank and degree-of-freedom classification of minimal symmetries acting on the two vector copies

**Depends on:** [the frozen two-copy action and AdS spectrum](1634_the_two_copy_spin23_compensator_can_be_frozen_exactly_but_quantum_closure_needs_a_new_protecting_principle.md)

**Evidence:** [multiplicity-symmetry ledger](../../../evidence/data/spin23-two-copy-multiplicity-symmetry-classification-v1.json) and [verifier](../../../verification/verify/verify_spin23_two_copy_multiplicity_symmetry_classification.mjs)

## Result

There is a basis-free replacement for the fixed-ray constraint of claim 1634.
For the two vectors (Y_I^A), impose

\[
 \epsilon^{IJ}Y_I^{[A}Y_J^{B]}=0,
 \qquad \delta^{IJ}Y_I^AY_{JA}=-\ell^2.
\]

The first equation says that the (5\times2) matrix (Y) has rank at most
one; the second fixes its nonzero norm. Locally,

\[
 Y_I^A=n_I V^A,qquad n_In_I=1,qquad V^2=-\ell^2.
\]

This removes the arbitrary fixed ray (n^I) from the written constraint, but
creates a circle of equivalent-looking rays. The three minimal symmetry
interpretations are exhaustive at the level of a real two-dimensional
multiplicity space:

1. global (SO(2)): the ray angle is a physical Goldstone mode;
2. local (SO(2)): the angle is gauge, but its copy connection is either an
   unprotected auxiliary field or a massive spin-one particle; and
3. exchange (\mathbb Z_2): symmetric and antisymmetric lines are canonical,
   but the symmetry cannot gauge away the five orthogonal-copy components.

Thus no minimal copy symmetry simultaneously derives the selected ray,
retains exactly the (2+1) target spectrum, and is closed under all allowed
local counterterms.

There is also an action-level obstruction. The Stelle--West term is linear in
one ambient vector. The defining real doublet of continuous (SO(2)) has no
nonzero invariant covector, so no expression (r^IY_I^A) is copy invariant
unless (r^I=0). A continuous copy symmetry therefore requires an additional
transforming unit doublet (n_I), or an equivalent oriented square root of the
rank-one Gram projector, before the gravity action itself can be written.

## Rank-one constraint rather than a chosen projector

At the background

\[
 \bar Y_1^A=\ell\delta^A_4,\qquad \bar Y_2^A=0,
\]

the ten bivector equations have linearization

\[
 \delta Q^{AB}=\bar Y_1^{[A}\delta Y_2^{B]}.
\]

Their Jacobian has rank four, not ten: they set the four components of
(delta Y_2) transverse to (\bar V) to zero while leaving its parallel
component as the infinitesimal copy angle. The norm equation adds one rank.
The constrained tangent therefore has dimension five:

\[
 10-4-1=5=4_{\mathrm{Spin}(2,3)/\mathrm{Spin}(1,3)}+1_{\rm copy\ angle}.
\]

The four broken Spin(2,3) transformations remove the first four directions.
What happens to the last direction distinguishes the branches below.

The rank-one equations are stronger than merely setting the determinant of
the (2\times2) Gram matrix to zero. In signature ((2,3)), two independent
vectors can span a degenerate plane, so a zero Gram determinant does not imply
linear dependence.

## Covariant-action obstruction

Let (J=\left(\begin{smallmatrix}0&-1\\1&0\end{smallmatrix}\right)) generate
the copy rotation. An invariant real covector (r) would obey

\[
 rJ=0.
\]

Since (J) is invertible, (r=0). Hence

\[
 \operatorname{Hom}_{SO(2)}(\mathbb R^2,\mathbb R)=0.
\]

The linear compensator required by
(epsilon_{ABCDE}V^EF^{AB}\wedge F^{CD}) cannot be constructed from the
copy doublet alone. The rank-one Gram matrix determines the projector
(n_In_J), but not an oriented vector (n_I); choosing its square root is a
double-cover section.

One can add a unit Stueckelberg doublet (n_I), transforming with (Y_I), and
define (V^A=n^IY_I^A). Local (SO(2)) then gauges its angle. This makes the
action covariant but does not derive the oriented section from the original
two-copy carrier. It also leaves the copy-connection counterterm problem
below. By contrast, exchange (\mathbb Z_2) has the invariant covector
((1,1)), so it canonically permits the symmetric combination, but its finite
orbit cannot remove the antisymmetric vector field.

## Global continuous branch

If (SO(2)_{\rm copy}) is global and exact, a rank-one vacuum breaks it to a
discrete stabilizer. The orbit is one-dimensional. Any invariant potential is
constant along that orbit, so its Hessian has an exact zero direction. After
the four broken Spin(2,3) directions are quotiented, one physical massless
scalar remains.

This branch replaces an imposed ray by spontaneous selection, but falsifies
the target spectrum:

\[
 (2^+_{\rm massless})+(0^-_{\rm massive})+(0_{\rm Goldstone}).
\]

Explicit breaking can mass the angle, but then the ray is again selected by
an external breaking tensor rather than derived from the continuous symmetry.

## Local continuous branch

Gauge the copy rotation with an Abelian connection (q_\mu):

\[
 {\cal D}_\mu Y_I^A=D_\mu Y_I^A
 +g_q q_\mu\epsilon_I{}^JY_J^A.
\]

The local gauge map sends the remaining tangent to
(delta Y_2^4=\ell\alpha(x)) and has rank one. Together, the rank-five
constraints and ranks (4+1) of the two broken gauge orbits resolve all ten
vector-copy components:

\[
 10-5-4-1=0.
\]

This is the only minimal continuous branch that genuinely turns the ray into
gauge, after a transforming unit doublet or equivalent oriented section has
also been supplied to write the Stelle--West term. It has two subbranches:

- If (q_\mu) has no kinetic term, it is algebraic and adds no classical
  particle. The (2+1) spectrum survives at tree level.
- The invariant (-Z_q f_{\mu\nu}f^{\mu\nu}/4) is nevertheless an allowed
  ghost-number-zero counterterm. For (Z_q>0), the rank-one condensate Higgses
  (q_\mu), producing a healthy massive vector with three polarizations.
  For (Z_q<0), it is a ghost. Either outcome leaves the target theory.

No enhanced gauge symmetry appears at (Z_q=0); the same local (SO(2))
already acts for every (Z_q). Therefore the auxiliary surface is not
symmetry-protected. Charged propagating matter would generate (f^2)
directly. In the constrained pure-bosonic truncation, this claim establishes
that (f^2) is allowed and unprotected, not a numerical nonzero beta
coefficient.

A four-dimensional BF construction could keep a copy connection topological,
but it adds a two-form gauge field and a new gauge complex. It is not a
minimal completion and its own kinetic counterterms require a fresh audit.

## Discrete exchange branch

Under (Y_1\leftrightarrow Y_2), define

\[
 V={Y_1+Y_2\over\sqrt2},\qquad
 W={Y_1-Y_2\over\sqrt2}.
\]

The even and odd lines are now canonical representation spaces. The symmetry
forbids terms odd in (W), so (W=0) is a stationary and consistent
truncation. But a finite group has zero-dimensional gauge orbits. It removes
none of the five components of (W).

A positive (W^2) term makes those components heavy rather than absent; a
multiplier (B_AW^A), with (B) odd, removes them but reinstates an imposed
constraint. The exchange symmetry explains why a line is distinguished, not
why the orthogonal field is nondynamical. It also leaves a symmetric versus
antisymmetric choice or discrete vacuum structure depending on the potential.

## Anomaly and constraint implications

The copy action on the compensators is real and bosonic, so neither the global
nor gauged (SO(2)) branch has a perturbative chiral anomaly in this sector.
That is not an all-matter result. Any chiral fermions charged under the gauged
copy (SO(2)\simeq U(1)) must satisfy the ordinary cubic and mixed
gauge--gravitational anomaly sums; the current repository does not supply such
charges.

The local rank result is independent of the PGT critical constraint
determinant. Adding a kinetic (f^2) term changes the total degree count by
three without repairing or directly bifurcating the gravitational Dirac
block. Couplings between the copy vector and torsion can of course require a
new full Hamiltonian analysis.

## Exhaustion verdict

The minimal multiplicity-symmetry possibilities end as follows:

| branch | ray status | extra local mode | protected target spectrum? |
|---|---|---:|---|
| no copy symmetry | fixed spurion | 0 | no derived ray |
| global (SO(2)) | spontaneous orbit | 1 scalar | no |
| local (SO(2)), (Z_q=0) | gauge | 0 classically | no; (f^2) allowed |
| local (SO(2)), (Z_q\ne0) | gauge | 3 vector | no |
| exchange (\mathbb Z_2) | canonical eigenlines | 5 unless constrained | no |

The only tree-level solution is a gauged copy rotation plus an oriented
Stueckelberg section on the critical auxiliary surface (Z_q=0). This imports
new geometric data and moves the radiative-stability problem to a new
coupling. The next decisive question is therefore cohomological:
whether the complete BRST Ward identities can forbid (f^2) and the seven PGT
departures simultaneously.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_two_copy_multiplicity_symmetry_classification.mjs
~~~
