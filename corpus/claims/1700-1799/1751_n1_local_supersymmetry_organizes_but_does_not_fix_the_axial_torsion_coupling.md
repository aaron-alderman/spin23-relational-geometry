# N=1 Local Supersymmetry Organizes but Does Not Fix the Axial Torsion Coupling

**Date:** 23 October 2026

**Status:** explicit supermultiplet and Kähler-connection audit of the selected new-model branch

**Depends on:** [the new-model path selection](1750_gauged_axial_locking_fails_and_local_supersymmetry_is_the_next_new_model_branch.md) and [the earlier spectrum count](../1600-1699/1637_every_minimal_enhanced_protection_changes_the_target_spectrum_leaving_only_a_dynamical_rg_reopening.md)

**Evidence:** [supergravity selector ledger](../../../evidence/data/spin23-n1_sugra_axial_selector_audit-v1.json) and [verifier](../../../verification/verify/verify_spin23_n1_sugra_axial_selector_audit.mjs)

## Result

Four-dimensional \(N=1\) local supersymmetry does not fix the coefficient of
the longitudinal axial torsion-current interaction.  It offers two natural
supermultiplet embeddings, and neither reproduces the desired conclusion.

A real linear multiplet contains a two-form whose three-form field strength is
dual to a vector

\[
 H^\mu\propto\epsilon^{\mu\nu\rho\sigma}\partial_\nu B_{\rho\sigma},
 \qquad \partial_\mu H^\mu=0.
\]

This vector is transverse by the Bianchi identity.  The surviving critical
PGT mode is the longitudinal \(0^-\) component of axial torsion, so the linear
multiplet does not embed the target pole.

A chiral multiplet can contain the required pseudoscalar,

\[
 A|={1\over\sqrt2}(s+ia),
\]

but it also contains the real scalar \(s\) and a Weyl fermion.  More
decisively, supersymmetry permits a continuous family of interactions.

## Explicit supersymmetric deformation

Let \(Q\) be a matter chiral multiplet and impose the shift
\(A\mapsto A+if\alpha\).  The Kähler potential

\[
 K={1\over2}(A+\bar A)^2
 +e^{c(A+\bar A)/f}\bar Q Q
\]

is invariant for every real \(c\).  At \(Q=0\), its matter metric and Kähler
connection are

\[
 G_{Q\bar Q}=e^{c(A+\bar A)/f},
 \qquad
 \Gamma^Q{}_{AQ}=\partial_A\log G_{Q\bar Q}={c\over f}.
\]

The fermion sigma-model covariant derivative therefore contains the derivative
of the pseudoscalar coupled to the chiral matter current, with coefficient
proportional to \(c/f\).  Using the two chiral multiplets of a Dirac fermion and
the appropriate relative signs assembles the axial current.

This is an allowed supersymmetric D-term for every \(c\).  Local supersymmetry
relates its component vertices inside a supermultiplet, but it does not select
\(c=1/8\) or forbid the continuous deformation.

## Spectrum and breaking cost

Unbroken local supersymmetry also replaces the target spectrum by supermultiplets:

- the graviton brings a gravitino;
- the pseudoscalar brings a real scalar and fermion; and
- matter fermions bring scalar partners.

After supersymmetry breaking, integrating out those partners produces threshold
corrections, while the unbroken Ward identities no longer protect the isolated
low-energy coefficient.  Thus neither the exact nor broken phase yields the
original claim: the exact phase changes the spectrum and still permits \(c\),
while the broken phase loses exact protection.

## Verdict

\[
 \boxed{
 N=1\ \text{local supersymmetry organizes }S_\mu J_5^\mu
 \text{ but does not select its coefficient.}
 }
\]

The next meaningful UV candidate must do more than place torsion in a
supermultiplet.  It must supply a quantized normalization, for example from a
specific higher-dimensional/string construction, and demonstrate that moduli,
mixing and thresholds do not reintroduce a continuous coefficient.

## Source context

- J. Giedt, [*Full Component Lagrangian in the Linear Multiplet Formulation of String-inspired Effective Supergravity*](https://arxiv.org/abs/hep-th/0205206), for general matter-coupled linear-multiplet supergravity.
- S. Aoki and Y. Yamada, [*DBI Action of Real Linear Superfield in 4D N=1 Conformal Supergravity*](https://arxiv.org/abs/1603.06770), for the existence of broad locally supersymmetric linear-multiplet interactions.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_n1_sugra_axial_selector_audit.mjs
~~~
