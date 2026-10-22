# The Quadratic Dimension-Four Shell Has Nine Unresolved Response Directions

> **Design update (claim 1677):** the lower bound is attained.  Seven
> explicit flat nonaxial torsion jets augment the two axial rows to rank nine
> in the derivative-torsion basis, and two curved linear-torsion probes have
> rank two in the Bianchi-reduced mixed basis.  Background selection is
> closed; the remaining work is evaluation of the packet determinants.

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact operator-count and minimum-response exhaustion boundary

**Depends on:** [the complete axial response](1673_the_complete_second_class_measure_is_ultralocal_on_the_massive_branch.md) and [the curvature-square integrability failure](1675_the_curvature_square_integrability_relation_fails_and_proves_an_independent_rtt_counterterm.md)

**Evidence:** [quadratic-shell ledger](../../../evidence/data/spin23-dimension-four-quadratic-shell-response-deficiency-v1.json) and [verifier](../../../verification/verify/verify_spin23_dimension_four_quadratic_shell_response_deficiency.mjs)

## Result

The next source calculation can be bounded exactly before another Hessian is
evaluated.  For a metric-compatible connection, the parity-even
dimension-four counterterms that are quadratic in the Einstein-form fields
have the independent decomposition

\[
3\,RR+9\,(\nabla T)(\nabla T)+2\,R\nabla T,
\]

for a total of fourteen operators.  Equivalently, a Cartan-form basis may be
chosen as

\[
6\,FF+4\,(DT)(DT)+4\,FDT.
\]

There is one Euler-density direction, so the local response quotient has
dimension thirteen.

The packet has presently computed four independent quadratic responses:

\[
C^2,\qquad R^2,\qquad B\,(\nabla\cdot S)^2,
\qquad Z\,F_S^2.
\]

Their source rows are independent because the first two survive at zero
torsion, while the last two vanish there and distinguish longitudinal from
transverse axial derivatives.  Therefore

\[
\boxed{
\dim\mathcal O_{4,2}/E_4=13,
\qquad
\operatorname{rank}\mathcal R_{\rm known}=4,
\qquad
\operatorname{deficiency}=9.
}
\]

At least nine additional independent quadratic response numbers are needed
to reconstruct this shell.  No further manipulation of the five axial
coefficients can lower that bound.

## Basis count

The Einstein-form basis used in the explicit PGT one-loop literature is

\[
\{H^{RR}_{1,2,3}\},
\qquad
\{H^{TT}_{1},\ldots,H^{TT}_{9}\},
\qquad
\{H^{RT}_{3},H^{RT}_{5}\}.
\]

The last pair remains after three Bianchi relations reduce five candidate
\(R\nabla T\) structures to two.  Converting to Cartan form gives six
curvature squares together with four independent \(DTDT\) and four
independent \(FDT\) terms.  Thus restricting the action to the ordinary six
PGT curvature squares omits eight propagation-level dimension-four
operators even before the topological quotient.

The completed axial flat responses determine two directions inside the
nine-dimensional \((\nabla T)^2\) space.  They do not probe either
\(R\nabla T\) direction because the matching protocol is even in the axial
source.  Consequently a minimal completion can be organized as

\[
7\ \text{additional derivative-torsion responses}
+2\ \text{curvature--single-torsion responses}=9.
\]

This is a lower bound on response numbers, not a claim that any arbitrary
nine backgrounds will give a nonsingular design matrix.

## Minimal source architecture

A viable execution suite must leave the pure-axial slice:

1. **Flat trace-torsion jets:** longitudinal, transverse and mixed
   polarizations to resolve derivative contractions containing
   \(T_\mu=T^\nu{}_{\nu\mu}\).
2. **Flat tensor-torsion jets:** several inequivalent momentum/index
   alignments for the traceless sixteen-component torsion irrep.
3. **Mixed-irrep jets:** axial--trace, axial--tensor and trace--tensor
   polarizations where allowed, preventing diagonal probes from missing
   off-block contractions.
4. **Curved linear-torsion backgrounds:** at least two Bianchi-independent
   configurations to isolate \(H^{RT}_3\) and \(H^{RT}_5\).

The design matrix must be constructed before selecting a minimal subset;
irreducible labels alone do not guarantee independence after integration by
parts and Bianchi identities.

## Why the curvature--axial responses do not reduce nine

The coefficients \(\xi_R\) and \(\xi_{\rm Ric}\) multiply \(RTT\) operators.
They are cubic in background fields, whereas the fourteen-operator census
above is the quadratic field-order shell controlling propagators.  Their
nonzero values prove that the cubic shell is also populated, but they cannot
replace a missing \((\nabla T)^2\) or \(R\nabla T\) response.

At still higher field order, independent \(TT\nabla T\) and \(T^4\) terms
appear.  Their complete counts and quotient maps are not fixed by the current
packet.  The nine-direction deficit is therefore a strict lower bound on the
remaining full beta-functional problem, not its total dimension.

## Exhaustion boundary

The axial programme is exhausted and the next calculation is now specified
at the smallest defensible scale.  Progress requires the packet Hessian on
trace- and tensor-torsion source backgrounds and a rank-certified projection
onto the nine missing quadratic directions.  Published coefficients from a
different PGT action establish the basis and methodology but cannot be
transferred as beta coefficients for this critical action.

Beyond that quadratic completion, separate three- and four-background-field
calculations are required for the already-proved \(RTT\) leak and the
remaining \(TT\nabla T,T^4\) shell.  This is the next significant point at
which the present exact data are exhausted.

## Source

O. Melichev and R. Percacci,
[*On the Renormalization of Poincare Gauge Theories*](https://arxiv.org/abs/2307.02336),
especially equations (4.10)--(4.16): the Einstein-form and Cartan-form
dimension-four bases and their Bianchi reductions.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_dimension_four_quadratic_shell_response_deficiency.mjs
~~~
