# No Unbroken Symmetry Can Fix the Minimal Axial Coefficient, and Perturbative RG Does Not Select One Eighth

**Date:** 23 October 2026

**Status:** exact same-operator symmetry no-go and one-loop RG fixed-point test

**Depends on:** [the minimal-universality boundary](1733_minimal_spin_connection_coupling_is_tree_level_flavor_universal_but_the_allowed_wilson_space_is_not.md) and [the parent compensator lift](1736_the_spin23_compensator_lifts_the_nonminimal_axial_torsion_operator_and_closes_the_parent_symmetry_escape.md)

**Evidence:** [selection ledger](../../../evidence/data/spin23-axial-coefficient-selection-no-go-v1.json) and [verifier](../../../verification/verify/verify_spin23_axial_coefficient_selection_no_go.mjs)

## Result

The proposed “new protecting symmetry” cannot be an ordinary unbroken
low-energy symmetry acting on the existing fields.  Minimal and nonminimal
coupling contribute to the same local operator,

\[
\mathcal O_A=S_\mu\bar\psi\gamma^\mu\gamma_5\psi,
\qquad
\mathcal L_A=(c_{\min}+\kappa)\mathcal O_A.
\]

If an unbroken symmetry permits the nonzero minimal term
\(c_{\min}\mathcal O_A\), then \(\mathcal O_A\) lies in its invariant sector.
The same symmetry necessarily permits \(\kappa\mathcal O_A\) for arbitrary
\(\kappa\).  Symmetry acts on the operator, not on the bookkeeping history of
its coefficient.

Family symmetries can reduce a coefficient matrix—for example from a general
matrix to a circulant or to the identity—but the identity direction is always
a singlet.  They cannot fix its remaining scalar value to \(1/8\).

## Named symmetry audit

The standard candidates all leave the operator allowed:

- fermion number phases cancel inside the bilinear;
- the massless chiral phase leaves the axial current invariant, while a mass
  already breaks that phase;
- the axial current is charge-conjugation even;
- axial torsion and the axial current are both pseudovectors, so their parity
  contraction is even;
- under compensator reversal \(V\mapsto-V\), the projected coframe, torsion,
  broken chirality element and parent axial current change signs in pairs, so
  the parent four-form is even; and
- E6 and residual family transformations retain at least the identity-valued
  singlet coefficient.

An ultraviolet grading could still distinguish two different parent
invariants before breaking, but it would be new structure, must be stated
explicitly, and must survive or control the symmetry-breaking thresholds.  No
such grading occurs in the declared construction.

## Perturbative RG does not select the minimal value

The standard one-loop torsion-background calculation gives

\[
(4\pi)^2{d\eta\over dt}=C\eta h^2,
\qquad C>0,
\]

for a Yukawa coupling \(h\).  Hence, for nonzero \(h\), the only finite fixed
point of this equation is

\[
\eta_*=0,
\]

not \(\eta_*=\pm1/8\).  In the zero-Yukawa limit every value is marginal and
none is selected.  With several fermions, the parameters can mix and need not
be equal.

For constant \(h\),

\[
{\eta(\mu)\over\eta(\mu_{\rm UV})}
=\left({\mu\over\mu_{\rm UV}}\right)^{Ch^2/(4\pi)^2},
\]

so RG evolution transports a boundary value; it does not derive the minimal
geometric value.  A nonzero predictive fixed point would require a specified
interacting UV theory with a different complete beta function.

## Verdict

The conventional selection mechanisms are exhausted:

\[
\boxed{
\text{ordinary unbroken symmetry cannot fix }c_{\min}+\kappa=c_{\min},
\qquad
\text{standard perturbative RG does not select }|c|=1/8.
}
\]

What remains is genuinely new physics rather than another rearrangement of
the current model: a UV grading/nonrenormalization theorem, or a concrete
interacting fixed point, followed by complete threshold matching.

## Source

- I. L. Shapiro, [*Physical Aspects of the Space-Time Torsion*](https://arxiv.org/abs/hep-th/0103093), especially the fermion nonminimal counterterm and RG analysis.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_axial_coefficient_selection_no_go.mjs
~~~
