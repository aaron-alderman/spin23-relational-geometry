# Every Ordinary Multiplicity-One Internal Selector Preserving E6 Allows the Nonfactorized Quartic

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** representation-theoretic no-go; ordinary multiplicity-one selector class closed

**Depends on:** [the gauge-loop source theorem](1569_pure_E6_gauge_loops_source_the_nonfactorized_mixed_quartic_and_close_the_lambda2_zero_surface.md) and [the canonical mixed-quartic Hessian](1568_the_nonfactorized_E6_quartic_regenerates_both_bidoublet_mixings_and_closes_the_minimal_nonsupersymmetric_inert_route.md)

**Evidence:** [selector-commutant ledger](../../../evidence/data/spin23-e6-multiplicity-one-selector-commutant.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_multiplicity_one_selector_commutant.mjs)

## Result

With one complex \(27_H\) and one complex \(351'_H\), no ordinary unitary
internal symmetry commuting with E6 can forbid the nonfactorized mixed
quartic

\[
I_2=\bar\psi^\mu\psi_\nu\bar S^{\nu\tau}S_{\mu\tau}.
\]

Generalized CP does not help: \(I_2\) is Hermitian and CP even.  Therefore
the complete multiplicity-one class of ordinary internal selectors leaves
the operator allowed.  Combined with claim 1569, which proves that E6
gauge loops source \(I_2\), this closes not merely commuting Abelian charge
assignments but the full ordinary commuting internal-symmetry escape.

## 1. The unitary commutant

Let \(V_{27}\) and \(V_{351'}\) be the two complex irreducible E6 modules.
An internal selector \(U\) that preserves the canonical kinetic terms and
commutes with the E6 gauge action belongs to the unitary commutant of

\[
V_{27}\oplus V_{351'}.
\]

The two modules are irreducible and inequivalent.  Schur's lemma gives

\[
U|_{V_{27}}=e^{i\alpha}\mathbf 1_{27},
\qquad
U|_{V_{351'}}=e^{i\beta}\mathbf 1_{351'},
\]

and every cross-intertwiner vanishes.  This holds element by element for
any finite or continuous selector group.  Its image on these fields is
therefore a subgroup of

\[
U(1)_\psi\times U(1)_S.
\]

The selector group itself need not be Abelian, but its action on this
multiplicity-one scalar sector factors through commuting phases.  Thus the
earlier charge argument was already exhaustive for ordinary unitary
symmetries, not merely for groups initially declared Abelian.

## 2. Both mixed quartics are neutral

Under the most general commuting action,

\[
\psi\mapsto e^{i\alpha}\psi,
\qquad
S\mapsto e^{i\beta}S.
\]

Both mixed quartics contain one field and one conjugate of each species:

\[
I_1=(\bar\psi\psi)(\bar S S),
\qquad
I_2=\bar\psi^\mu\psi_\nu\bar S^{\nu\tau}S_{\mu\tau}.
\]

Their phase exponents are identically

\[
(-\alpha+\alpha,-\beta+\beta)=(0,0).
\]

No subgroup, non-Abelian presentation, or discrete choice inside the
commutant distinguishes them.

## 3. Antiunitary selectors do not remove I2

An antiunitary generalized-CP action complex-conjugates the invariant and
may accompany that conjugation by allowed unitary intertwiners.  But

\[
I_2=\psi^\dagger(S^\dagger S)\psi
\]

in matrix notation, so \(I_2^*=I_2\).  The multiplicity-one intertwiners
can contribute only phases, which cancel between each field and its
conjugate.  Consequently \(I_2\) is CP even and cannot be made odd by an
ordinary generalized-CP assignment on this field content.

This statement does not exclude exotic transformations acting on an
additional relation algebra.  It says precisely that such extra structure
is absent from the ordinary multiplicity-one E6 modules.

## 4. Combination with the gauge-loop result

Claim 1569 found

\[
K_{\rm gauge}={28\over9}I_1+20I_2.
\]

The nonzero \(20I_2\) projection means that simply omitting the operator at
tree level is unstable.  The present commutant theorem means that no
ordinary internal symmetry available on the same fields can turn that
omission into a Ward identity.

Hence

\[
\boxed{
\begin{array}{rcl}
\text{commuting unitary selector forbidding }I_2&=&\mathrm{NONE},\\
\text{generalized-CP selector making }I_2\text{ odd}&=&\mathrm{NONE},\\
\text{pure-gauge regeneration at }\lambda_2=0&=&\mathrm{YES},\\
\text{ordinary multiplicity-one escape class}&=&\mathrm{CLOSED}.
\end{array}}
\]

## 5. What remains constructively

The theorem identifies a minimum structural price for reopening the
branch.  At least one assumption used by the commutant argument must fail:

1. **Nontrivial multiplicity:** add copies of an E6 irrep so the commutant
   contains a genuine matrix algebra acting on copy space.
2. **Relation-space structure:** let the selector act on Yukawa or
   contraction channels not represented by a uniform transformation of
   the elementary E6 multiplets.
3. **Noncommuting extension:** embed E6 and the selector into a larger
   algebra so the selector is not in the E6 commutant.
4. **Enlarged completion:** add fields whose gauge-loop projections cancel
   by an identity enforced in the full theory.

These are not four names for the same phase symmetry; they are the first
places where the Schur-commutant proof genuinely ceases to apply.

## Spin(2,3) status

For the Spin(2,3) programme, the result rules out an especially tempting
but empty move: assigning a more elaborate ordinary internal group to the
same single E6 multiplets.  Whatever the abstract group, its commuting
action collapses to two phases and leaves \(I_2\) invariant.

A Spin(2,3)-derived law must therefore be visible as a nontrivial action on
multiplicity, correspondence, or relation data, or as part of a
noncommuting enlarged algebra.  This supplies a falsifiable interface: a
candidate bridge must exhibit the extra carrier explicitly and show how
its Ward identity removes the \(20I_2\) gauge projection.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_multiplicity_one_selector_commutant.mjs
~~~
