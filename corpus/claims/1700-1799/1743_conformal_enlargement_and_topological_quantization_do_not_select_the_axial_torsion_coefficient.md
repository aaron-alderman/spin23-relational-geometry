# Conformal Enlargement and Topological Quantization Do Not Select the Axial-Torsion Coefficient

**Date:** 23 October 2026

**Status:** exact Weyl-weight and local-variation no-go

**Depends on:** [the Spin(2,4) parent boundary](../1500-1599/1578_four_dimensional_conformal_cyclic_cosmology_requires_a_spin24_parent_not_spin23_alone.md) and [the commuting-grading closure](1742_the_commuting_uv_grading_class_is_closed_and_every_surviving_flavor_selector_changes_the_model.md)

**Evidence:** [conformal/topological ledger](../../../evidence/data/spin23-conformal-topological-axial-selection-no-go-v1.json) and [verifier](../../../verification/verify/verify_spin23_conformal_topological_axial_selection_no_go.mjs)

## Result

Neither a four-dimensional conformal enlargement nor topological
quantization forbids or fixes the axial torsion-current coefficient.

Under \(g_{\mu\nu}\mapsto\Omega^2g_{\mu\nu}\), a massless Dirac field has
weight \(-3/2\), so

\[
J_5^\mu=\bar\psi\gamma^\mu\gamma_5\psi
\mapsto\Omega^{-4}J_5^\mu.
\]

For a fixed Lorentz connection, \(e_a\wedge T^a\) has weight \(2\).  The
four-dimensional Hodge star on a three-form has weight \(4-2\times3=-2\),
and therefore

\[
S=*\left(e_a\wedge T^a\right)
\]

has weight zero.  Since \(\sqrt{|g|}\) has weight \(4\),

\[
\sqrt{|g|}\,S_\mu J_5^\mu
\mapsto
\sqrt{|g|}\,S_\mu J_5^\mu.
\]

The interaction is already conformally admissible.  Moving from the
\(Spin(2,3)\) phase to a \(Spin(2,4)\)-type conformal parent therefore does not
remove it by Weyl covariance alone.

Nor is the term a characteristic class.  Its functional derivatives with
respect to the fermion and torsion fields are nonzero local sources.  Its
integral varies continuously under compactly supported changes of either
field and depends on the coframe/Hodge structure.  It is not a closed
curvature polynomial such as a Pontryagin, Euler or Nieh--Yan density.
Consequently its coefficient is not quantized by topology.

An anomaly may quantize or constrain a separate topological term, but it
cannot convert this local matter interaction into a discrete invariant.

## Verdict

Conformal covariance allows the operator and topology does not quantize it.
Any successful noncommuting or topological extension must add a more specific
selection mechanism than the group name or the existence of characteristic
classes.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_conformal_topological_axial_selection_no_go.mjs
~~~
