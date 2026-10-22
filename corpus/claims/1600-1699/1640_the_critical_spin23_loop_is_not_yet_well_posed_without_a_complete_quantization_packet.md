# The Critical Spin(2,3) Loop Is Not Yet Well Posed Without a Complete Quantization Packet

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact input-completeness audit at the critical-PGT quantum boundary

**Depends on:** [the normal-beta information-rank audit](1639_the_known_normal_beta_data_have_rank_two_and_the_exact_critical_pgt_loop_is_the_irreducible_missing_calculation.md), [the constrained two-copy action](1634_the_two_copy_spin23_compensator_can_be_frozen_exactly_but_quantum_closure_needs_a_new_protecting_principle.md), and [the critical pseudoscalar PGT sector](1622_the_full_local_pgt_route_contains_a_healthy_critical_pseudoscalar_sector_but_not_an_open_quantum_region.md)

**Evidence:** [quantization-packet ledger](../../../evidence/data/spin23-critical-pgt-quantization-packet-gate-v1.json) and [verifier](../../../verification/verify/verify_spin23_critical_pgt_quantization_packet_gate.mjs)

## Result

The exact one-loop calculation isolated in claim 1639 cannot yet be started
unambiguously from the repository. The available files are sufficient to
identify the classical critical surface, its natural AdS background, its
linear (2+1) pole content, and a nonvanishing canonical constraint-bracket
block. They do not freeze a unique off-shell path integral.

Fourteen input classes were audited. Three are available, three are partial,
and eight are missing. In particular, the displayed geometric action is not
yet expanded in one self-contained irreducible-projector convention; the
BRST differential and convenient linear gauges are not a complete background
gauge fermion; and neither the functional measure, the complete second-class
determinant, the Euclidean integration contours nor the subtraction and
redundancy conventions have been fixed.

Consequently there is presently no unique Hessian, ghost operator or beta
vector to evaluate. This is a well-posedness obstruction prior to the
technical difficulty of the heat-kernel calculation.

## Why the classical specification is insufficient

The action in claim 1634 correctly states the invariant critical content,
but deliberately leaves numerical irreducible-curvature conventions open.
That is harmless for pole count and residue signs, because nonzero field
rescalings preserve them. It is not harmless for a divergent functional:
projector normalizations, integration-by-parts choices and the definition of
the independent connection determine the entries of the nonminimal Hessian
and the coordinate representation of its counterterms.

Similarly, unitary gauge for the compensator, symmetric-vierbein gauge and
background de Donder gauge establish a usable classical count. A loop
calculation needs a single gauge fermion with gauge parameters, auxiliary
fields and all mixed ghost vertices for diffeomorphisms, Lorentz rotations,
broken Spin(2,3), and the optional copy gauge symmetry. The schematic local
BRST complex in claim 1636 establishes which counterterms are allowed; it was
not claimed to define this gauge-fixed quantum action.

Finally, the positive determinant quoted in claim 1622 proves constant rank
for a particular primary-if-constraint bracket block in the massive domain.
It does not by itself specify the full Senjanovic measure factor, its
covariant implementation, or its contribution to the background-field
effective action.

## Minimum quantization packet

A calculation-ready packet must freeze all of the following in one
convention:

1. the complete nonlinear tetrad--connection--compensator--multiplier action,
   including every normalization and sign;
2. explicit definitions and completeness relations for all torsion and
   curvature irreducible projectors;
3. the exact background split and fluctuation variables, including whether
   the connection or contorsion is fundamental;
4. one background-covariant gauge fermion for every first-class symmetry;
5. the resulting ghost, antighost and Nakanishi--Lautrup action, including
   mixed vertices;
6. the field-space measure and all change-of-variable Jacobians;
7. the complete second-class measure factor, or a proved equivalent
   conversion to first-class variables;
8. the Euclidean continuation and integration contours for the noncompact
   gauge directions, conformal factor, auxiliaries and multipliers;
9. boundary conditions and zero-mode treatment for every field and ghost on
   the chosen AdS domain;
10. regulator and subtraction prescriptions;
11. a complete local invariant counterterm basis;
12. the quotient convention for topological, equation-of-motion,
    field-redefinition and BRST-exact terms;
13. the projection map from invariant counterterms to the critical normal
    coordinates; and
14. sources or observables that define the matching interpretation of the
    running couplings.

These data need not be unique. Different legitimate gauges should give the
same physical conclusion after the appropriate quotient. They must,
however, be stated before that equivalence can be tested.

## Nonuniqueness witness

At least four choices invisible to the classical (2+1) spectrum can alter
the off-shell intermediate functional:

- a rescaling or recombination of irreducible curvature projectors;
- different background gauge parameters and connection gauge conditions;
- connection versus contorsion variables with their associated Jacobian; and
- different implementations of the second-class measure and Euclidean
  multiplier contour.

The physical on-shell answer may be invariant under some of these choices,
but proving that statement is part of the missing calculation. Selecting one
silently would turn a reproducible beta-function claim into a convention- and
measure-dependent guess.

## Exhaustion verdict

The programme has now reached two nested, precise boundaries:

\[
 \operatorname{rank}K=2<8
 \quad\text{and}\quad
 N_{\rm packet}=(3\ {m available},3\ {\rm partial},8\ {\rm missing}).
\]

The first says that the known quantum data leave six displayed normal
directions unresolved. The second says that the exact determinant needed to
fill those directions is not yet uniquely defined by the assembled inputs.

The next admissible research step is therefore not another symmetry, matter,
or toy-flow scan. It is to publish a complete quantization packet satisfying
the fourteen-item contract, validate its nilpotent BRST and constraint
measure, and only then compute the full one-loop divergent functional. If
that packet is supplied, claim 1639 specifies the calculation that follows.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_critical_pgt_quantization_packet_gate.mjs
~~~
