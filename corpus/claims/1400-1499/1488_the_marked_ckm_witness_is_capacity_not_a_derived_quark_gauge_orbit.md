# The marked CKM witness is capacity, not a derived quark gauge orbit

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact type audit qualifying claim 1487; algebraic witness retained, quark-sector origin not derived

**Depends on:** [the marked-projector CKM witness](1487_the_marked_projector_packet_exactly_joins_two_quark_hierarchies_and_the_ckm_invariants_but_spends_its_axis.md), [the two-point family algebra](../1100-1199/1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md), and [the selector-source audit](../1200-1299/1201_selector_source_audit_closes_generation_blind_furey_and_pure_z3_feedback_leaving_majorana_yukawa_or_intrinsic_generation_geometry.md)

**Evidence:** [machine-readable type ledger](../../../evidence/data/spin23-marked-ckm-type-audit.json) and [executable verifier](../../../verification/verify/verify_spin23_marked_ckm_type_audit.mjs)

## Result

Claim 1487 remains a valid algebraic capacity witness, but its marked
generator is not yet a derived quark-sector operator.

The corpus derives

\[
X_\alpha=I-3P_\alpha
\]

as the family augmentation inside the anomaly-free direction

\[
B-3L_\alpha.
\]

Its traceless family action is lepton specific. Quarks carry the universal
baryonic centroid and have no (A_2) family component. Therefore the
existing gauge construction supplies (X_\alpha) on lepton family space,
not the down-quark deformation (\kappa X_\alpha) used by claim 1487.

The exact CKM fit is consequently classified as

\[
\boxed{\text{typed ansatz capacity, not a derived quark gauge orbit}.}
\]

## The weak-doublet cancellation

Let (U_u) and (U_d) diagonalize the two left-handed quark Hermitian
matrices, so (V=U_u^\dagger U_d). A genuine family gauge transformation
on the Standard Model weak doublet

\[
Q_L=(u_L,d_L)^T
\]

acts as (G\otimes I_2). It sends

\[
U_u\mapsto G U_u,
\qquad
U_d\mapsto G U_d,
\]

and hence

\[
(GU_u)^\dagger(GU_d)=U_u^\dagger U_d.
\]

A common gauge orbit cannot create CKM mixing. The relative insertion used
in claim 1487,

\[
U_u^\dagger e^{i\phi X_\alpha}U_d,
\]

is physically meaningful only if (e^{i\phi X_\alpha}) is a sector-specific
Yukawa, defect or matching operator rather than a universal family gauge
transformation.

## What a valid quark completion must contain

The marked packet can be promoted only by constructing a gauge-compatible
operator with the transformation type of a quark Yukawa spurion. It must:

1. act differently in the up and down Yukawa maps without assigning
   different family gauge transformations to the two members of (Q_L);
2. preserve the Standard Model gauge representations of the Yukawa terms;
3. derive the marked (A_2) direction from a neutral cross-Peirce map,
   defect incidence or another declared field;
4. explain why the same direction generates both the Hermitian
   (\kappa X_\alpha) term and the relative phase orbit;
5. retain the sign and small scale selected by the numerical witness.

This is exactly the second-family-tensor boundary already identified by the
selector-source audit. Relabelling a gauge generator as a down-sector
texture does not cross that boundary.

## Surviving interpretations

Three interpretations remain distinct:

- **quark gauge generator:** excluded as the source of relative CKM motion;
- **effective quark Yukawa spurion:** mathematically viable, but new and not
  derived by the current action;
- **lepton-family generator:** already correctly typed and therefore a
  natural seed for a PMNS/Majorana version of the marked-axis calculation.

The last route is the next source-respecting fan. It must use neutrino mass
ordering and phase assumptions explicitly and must not treat uncertain
Majorana phases as measured targets.

## Consequence for Spin(2,3)

Spin(2,3) still supplies the relational/Jordan carrier and the defect route
to the length-three family module. What is missing is a covariant transport
from that carrier into a **sector-specific Yukawa map**. A family-scalar
Spin(2,3) action or a universal gauge transformation cannot do this. The
needed middle is an operator-valued coupling, not another group-label
coincidence. Physical admission remains false.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_marked_ckm_type_audit.mjs
~~~
