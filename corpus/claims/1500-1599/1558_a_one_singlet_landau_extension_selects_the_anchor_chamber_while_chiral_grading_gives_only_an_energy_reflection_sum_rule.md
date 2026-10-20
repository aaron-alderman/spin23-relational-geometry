# A One-Singlet Landau Extension Selects the Anchor Chamber, while Chiral Grading Gives Only an Energy-Reflection Sum Rule

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** smallest explicit label-level ordering dynamics and exact interval-observable audit; conditional construction, not a physical lift

**Depends on:** [the weighted anchor chamber](1553_the_anchor_cut_has_an_open_weight_chamber_but_the_stable_vacuum_does_not_enforce_its_ordering.md) and [the exact Feshbach/resolvent obstruction](1547_the_exact_feshbach_kernel_induces_the_wrong_diagonals_and_the_protected_resolvent_zeros_hold_only_at_zero_energy_not_on_an_interval.md)

**Evidence:** [dynamics and interval-observable ledger](../../../evidence/data/spin23-anchor-dynamical-ordering-interval-observable.json) and [deterministic verifier](../../../verification/verify/verify_spin23_anchor_dynamical_ordering_interval_observable.mjs)

## Result

Both remaining label-level questions admit small, exact constructions, but
neither supplies the missing physical derivation.

First, one new real ordering singlet \(\sigma\) suffices to stabilize the
seven edge weights strictly inside the \(H_{16}\) anchor chamber.  For
\(0<a<1\), \(\eta>0\), and \(\Lambda>0\), take

\[
\begin{aligned}
V={}&(\sigma^2-1)^2+\eta(\sigma-1)^2\\
&+\Lambda\big[(x-1)^2+(z-1)^2+(r-1)^2+(s-1)^2\\
&\qquad +(y-(1-a\sigma))^2
 +(u-(1+a\sigma))^2+(v-(1+a\sigma))^2\big].
\end{aligned}
\]

This is a sum of squares with the unique zero

\[
(\sigma;x,y,z,u,v,r,s)
=(1;1,1-a,1,1+a,1+a,1,1).
\]

All weights are positive, the Hessian is positive definite, and the six
anchor-chamber margins are

\[
(2a,2a,1+a,1+a,1+a,1+a).
\]

Thus the ordering is open and dynamically stable.  If the weights are link
modulus squares, the potential remains renormalizable: its highest field
degree is four and the \(\sigma |\phi|^2\) interactions are cubic.  But the
orientation bias \(\eta(\sigma-1)^2\) and the unequal singlet couplings are
new marked data.  The construction stabilizes the desired ordering; it does
not derive that orientation from Spin(2,3).

Second, the full eight-state sheet of claim 1547 has an exact chiral grading

\[
\Gamma=\operatorname{diag}(+,-,+,-,+,+,-,-),
\qquad \Gamma D_8\Gamma=-D_8.
\]

Consequently its resolvent obeys

\[
\Gamma G(z)\Gamma=-G(-z).
\]

For causal boundary values this becomes

\[
\Gamma G^R(E)\Gamma=-G^A(-E).
\]

The forbidden \(I-N\) channel and selected \(P-P\) channel are same-grade,
so they satisfy the exact interval identities

\[
G^R_{IN}(E)+G^A_{IN}(-E)=0,
\qquad
G^R_{PP}(E)+G^A_{PP}(-E)=0.
\]

For the positive real weights used by the ordering construction, the
resolvent is reciprocal, so for every even real window \(W\) supported on
\([-L,L]\),

\[
\int_{-L}^{L}W(E)\,\operatorname{Re}G^R_{ij}(E)\,dE=0,
\qquad ij\in\{IN,PP\},
\]

with the causal or principal-value prescription at poles.  This is a genuine
interval-level dispersive sum rule, exact under every perturbation that
preserves both the chiral grading and reciprocity.  For a general Hermitian
bipartite operator with complex edge phases, the ordered retarded/advanced
identity remains exact, while the phase-robust integral is instead the
reciprocal symmetrization

\[
\int_{-L}^{L}W(E)\,\operatorname{Re}
\frac{G^R_{ij}(E)+G^R_{ji}(E)}2\,dE=0.
\]

The distinction matters only off diagonal; \(P-P\) is already symmetric.
Neither version is a pointwise interval texture: both entries remain
generically nonzero at nonzero energy.

The combined verdict is

\[
\boxed{
\begin{array}{rcl}
\text{stable anchor ordering with one new singlet}&=&\mathrm{SAT},\\
\text{ordering derived from existing Spin(2,3) data}&=&\mathrm{NO},\\
\text{pointwise interval resolvent zero}&=&\mathrm{UNSAT},\\
\text{energy-reflection interval sum rule}&=&\mathrm{SAT}.
\end{array}}
\]

## 1. Stability and robustness of the ordering vacuum

Because every term in \(V\) is nonnegative, a global minimum with zero
energy must annihilate every square.  The first square permits
\(\sigma=\pm1\), while the bias square permits only \(\sigma=1\).  The
remaining squares then fix every edge weight.  Hence the displayed vacuum
is the unique global minimum in weight space.

The weight-weight Hessian is \(2\Lambda\) times the identity.  The only
mixed entries couple \(\sigma\) to \(y,u,v\), with values

\[
2\Lambda a,\quad -2\Lambda a,\quad -2\Lambda a.
\]

The \(\sigma\sigma\) entry is

\[
8+2\eta+6\Lambda a^2.
\]

After eliminating the three mixed weight directions, its Schur complement
is exactly

\[
8+2\eta>0.
\]

The Hessian is therefore positive definite.  Strict chamber margins and
the implicit-function theorem then keep the vacuum in the same chamber for
sufficiently small coefficient perturbations.

More directly, independent weight perturbations bounded by \(\delta\) can
reduce a one-edge margin by at most \(2\delta\) and a two-edge margin by at
most \(3\delta\).  Hence every perturbation satisfying

\[
\delta<\min\left(a,\frac{1+a}{3}\right)
\]

preserves all six facets.  At \(a=1/4\), the vacuum is

\[
(x,y,z,u,v,r,s)=(1,\tfrac34,1,\tfrac54,\tfrac54,1,1)
\]

and has minimum facet margin \(1/2\) and independent-weight robustness
radius \(1/4\).

The field-count statement is deliberately narrow.  Among extensions that
retain the sourced symmetric link sector and resolve its branch with a new
local order parameter, one real scalar is the smallest possible addition.
One can instead hard-code unequal coefficients with no new field.  Nor does
this exclude a non-polynomial, threshold, or beta-function mechanism using
no new propagating field.

At \(\eta=0\), the two branches \(\sigma=\pm1\) are degenerate.  Only the
positive branch puts \(y\) below \(u,v\).  Thus the bias has not disappeared:
it has been localized as one explicit, auditable assumption.

## 2. Exact energy-reflection identity

In the sheet order

\[
(PN,IN,IP,TP,SP,TU,SI,NU),
\]

every edge of \(D_8\) joins opposite signs of \(\Gamma\).  Therefore
\(\{\Gamma,D_8\}=0\).  For every complex \(z\) off the spectrum,

\[
\begin{aligned}
\Gamma(z-D_8)^{-1}\Gamma
&=(z+D_8)^{-1}\\
&=-(-z-D_8)^{-1}.
\end{aligned}
\]

This proves the analytic identity.  Setting \(z=E+i0\) converts the
negative-energy term to the advanced boundary value.  Since \(I=PN\) and
\(N=IP\) both carry positive grade, and a diagonal \(P-P\) entry is
necessarily same-grade, their retarded/advanced signs are odd under energy
reflection.  When the sheet matrix is real symmetric,
\(G^A_{ij}=\overline{G^R_{ij}}\), so taking real parts and integrating an
ordered entry against an even window gives the displayed dispersive sum
rule.  For general complex Hermitian weights one instead uses
\(G^A_{ij}=\overline{G^R_{ji}}\); adding the \(ij\) and \(ji\) identities
proves the symmetrized sum rule above.  The unsymmetrized off-diagonal
integral is not phase-robust.

This statement is stronger than an isolated equality at \(E=0\), but weaker
than the interval texture sought in claim 1547.  It permits
\(G_{IN}(E)\ne0\) and \(G_{PP}(E)\ne0\) at every generic nonzero energy;
positive and negative energies cancel in the specified observable.

## 3. Exact robustness boundary

Arbitrary changes to the seven off-diagonal edge weights preserve
\(\{\Gamma,D_8\}=0\), so the ordered retarded/advanced energy-reflection
identity is insensitive to their magnitudes, signs, or phases when the
Hermitian conjugate edges are included.  The unsymmetrized \(I-N\) real-part
integral additionally requires reciprocity, as supplied by the positive
real weight vacuum.  With arbitrary phases, reciprocal symmetrization gives
the phase-robust observable.  Both statements survive additional bipartite
edges with the corresponding reality condition.

Diagonal masses and same-grade edges do not anticommute with \(\Gamma\).
They generically create an even-in-energy component at first order and
destroy the sum rule.  This matters physically: the very endpoint diagonal
terms sought in the five-role texture would break the minimal chiral
protection unless they arise in a larger graded completion.

## Verdict

There is no remaining label-level impossibility here.  A stable dynamical
ordering and an exact interval observable both exist in minimal conditional
forms.  Their assumptions expose the missing middle rather than remove it:

- the ordering law needs a new oriented singlet coupling and bias; and
- the interval law is an energy-reflection dispersive cancellation protected
  by chiral grading, not pointwise absence of propagation.

A physical completion must therefore explain why the orientation bias is
selected, why the relevant response is centered on the chiral energy origin,
and how the grading survives the physical diagonal terms and thresholds.
Until external states, normalization, and a causal measured response are
specified, the sum rule remains a falsifiable label-level prediction rather
than a phenomenological observable.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_anchor_dynamical_ordering_interval_observable.mjs
node verification/verify/verify_spin23_anchor_cut_weighted_robustness.mjs
node verification/verify/verify_spin23_sixteen_state_five_role_feshbach_resolvent.mjs
~~~
