# The Quantization Packet Freezes the Critical-PGT Hessian but Exposes One Second-Class Measure Blocker

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** constructive quantum-definition advance; packet sufficient for the gauge-fixed quadratic Hessian, not yet for a complete off-shell determinant

**Depends on:** [the quantization-packet gate](1640_the_critical_spin23_loop_is_not_yet_well_posed_without_a_complete_quantization_packet.md)

**Specification:** [quantization packet v1](../../programmes/closure/spin23-gravity-route/quantization-packet-v1.md)

**Evidence:** [packet ledger](../../../evidence/data/spin23-critical-pgt-quantization-packet-v1.json) and [verifier](../../../verification/verify/verify_spin23_critical_pgt_quantization_packet_v1.mjs)

## Result

Quantization packet v1 converts the previous fourteen-class input gap into a
single sharply isolated obstruction. Thirteen classes are now frozen by an
explicit choice. The complete field-dependent second-class measure remains
partial because the repository contains the nonvanishing massive (0^-)
primary-if-constraint bracket block, but not all 34 second-class constraints
and their bracket operator in the packet convention.

This is enough to construct and test the gauge-fixed quadratic Hessian. It is
not enough to call its ordinary field/ghost determinant the complete quantum
effective action.

## Choices now fixed

The packet defines, rather than merely names:

- Lorentzian orientation, curvature and torsion conventions;
- the trace, axial and tensor torsion projectors;
- the exact pseudoscalar curvature normalization;
- one nonlinear broken-phase action and critical surface;
- an exponential coframe and affine connection background split;
- de Donder, antisymmetric-coframe and unitary selector gauges;
- a single BRST gauge fermion and its ghost/auxiliary action (s\Psi);
- a compact boundaryless Euclidean AdS quotient and zero-mode rule;
- steepest-descent, multiplier and Grassmann contours;
- ultralocal background measures with retained change-of-variable Jacobians;
- dimensional regularization and background-field MS-bar;
- the unquotiented counterterm policy and eight-row normal map; and
- pole/residue and background-vertex matching observables.

These are scheme choices, not newly discovered physical laws. Their value is
that every later coefficient can now be traced to one declared convention.

## Exact torsion-projector check

In components (T_{abc}=-T_{bac}), define

\[
v_b=T_{aba},
\qquad
s_d={1\over6}\epsilon_{dabc}T_{abc},
\]

and

\[
V_{abc}={1\over3}(\delta_{ac}v_b-\delta_{bc}v_a),
\qquad
A_{abc}=-\epsilon_{abcd}s_d,
\qquad
Q=T-V-A.
\]

The verifier checks on a basis of all 24 torsion components that this is an
idempotent, complete decomposition with dimensions

\[
24=4_{\rm trace}+4_{\rm axial}+16_{\rm tensor},
\]

and that (Q) has vanishing trace and axial trace. This component check fixes
the signs hidden in the compact form notation.

## BRST and gauge count

The gauge conditions have ranks

\[
4_{\rm diff}+6_{\rm Lorentz}+4_{\rm broken}=14.
\]

The diffeomorphism ghost has a second-order minimal operator on the Einstein
background. The Lorentz and broken-parent ghosts are algebraic at the chosen
background. Antighosts and Nakanishi--Lautrup fields are BRST doublets, so
they add no cohomology.

The fixed-spurion choice is deliberate. Adding a dynamical copy connection
would require a fourth gauge-fermion term and adds the (f_q^2) normal
direction already excluded from this target.

## Remaining blocker

The Faddeev--Senjanovic factor

\[
\sqrt{\det\{\chi_A,\chi_B\}}
\]

must use the complete second-class set. The known determinant

\[
J^{-12}\left[\left({{}^p\!\pi\over6J}\right)^2+m^2\right]^6
\]

proves that one decisive bracket block does not lose rank for (m\ne0); it
does not equal the determinant of the full 34-constraint system. Treating it
as the whole measure would be an unjustified completion.

There are two valid ways forward:

1. translate the complete canonical constraint list and bracket matrix into
   the frozen convention, then evaluate its determinant on a general
   background; or
2. construct a covariant BV/BFV conversion and prove equality of its measure
   to the reduced phase-space quantization.

Until one is done, the packet supports the Hessian/principal-symbol tranche
and reduced physical determinants, but not a definitive off-shell beta
functional.

## Sources

- H.-J. Yo and J. M. Nester, [*Hamiltonian analysis of Poincare gauge theory scalar modes*](https://arxiv.org/abs/gr-qc/9902032).
- O. Melichev and R. Percacci, [*On the Renormalization of Poincare Gauge Theories*](https://arxiv.org/abs/2307.02336).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_critical_pgt_quantization_packet_v1.mjs
~~~
