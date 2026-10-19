# One Standard-Model Generation Passes the Domain-Wall Anomaly Gate

**Date:** 17 October 2026  
**Branches:** B03, B07, B08, B11 and B13  
**Claim status:** exact one-generation perturbative and \(SU(2)\) global anomaly cancellation; lattice mirror decoupling and full bulk realization remain open

## 1. Why the complete boundary set matters

A single charged Weyl mode cannot be placed on an isolated 3+1-dimensional boundary with a dynamical gauge field unless its gauge anomaly is cancelled by other boundary modes or bulk inflow. The relevant object is therefore the complete chiral representation selected by the Furey/TRO branch, not one Weyl node in isolation.

For one all-left Standard-Model generation, use

\[
Q:(\mathbf3,\mathbf2)_{1/6},
\quad
u^c:(\bar{\mathbf3},\mathbf1)_{-2/3},
\quad
d^c:(\bar{\mathbf3},\mathbf1)_{1/3},
\]

\[
L:(\mathbf1,\mathbf2)_{-1/2},
\quad
e^c:(\mathbf1,\mathbf1)_1,
\quad
N^c:(\mathbf1,\mathbf1)_0
\]

with the neutral singlet optional for anomaly purposes.

## 2. Non-Abelian cubic anomaly

For \(SU(3)^3\), the weak doublet \(Q\) contains two color fundamentals, while \(u^c\) and \(d^c\) are antifundamentals:

\[
2-1-1=0.
\]

There is no perturbative \(SU(2)^3\) anomaly because the doublet representation is pseudoreal.

## 3. Mixed gauge anomalies

Ignoring common Dynkin-index factors,

\[
[SU(3)]^2U(1):
\quad
2\left(\frac16\right)-\frac23+\frac13=0,
\]

and

\[
[SU(2)]^2U(1):
\quad
3\left(\frac16\right)-\frac12=0.
\]

The color and weak multiplicities are essential.

## 4. Abelian and gravitational anomalies

The cubic hypercharge sum is

\[
6\left(\frac16\right)^3
+3\left(-\frac23\right)^3
+3\left(\frac13\right)^3
+2\left(-\frac12\right)^3
+1^3
=0.
\]

The mixed gravitational-hypercharge sum is

\[
6\left(\frac16\right)
+3\left(-\frac23\right)
+3\left(\frac13\right)
+2\left(-\frac12\right)
+1
=0.
\]

The sterile neutrino contributes zero to both.

## 5. Witten \(SU(2)\) global anomaly

There are three colored copies of the quark doublet plus one lepton doublet:

\[
N_{\mathbf2}=3+1=4.
\]

This is even, so the one-generation boundary also passes the four-dimensional \(SU(2)\) global-anomaly parity test.

## 6. Domain-wall consequence

The complete one-generation chiral representation can be placed on one wall without requiring net perturbative gauge-anomaly inflow. Species-level anomaly currents cancel in the sum. This aligns with the earlier Furey TRO anomaly audit and makes the boundary architecture materially more plausible than isolating a single Weyl mode.

However, anomaly cancellation is only a necessary condition. A successful regulator must still:

- localize precisely the selected representation on one wall;
- gap or decouple the mirror wall without breaking gauge symmetry;
- preserve locality and unitarity;
- reproduce global as well as perturbative anomaly cancellation;
- generate the Yukawa/Higgs couplings across the selected TRO cycles;
- connect its boundary response to the Jordan carrier.

## 7. Relation to Floquet compensation

The zero/\(pi\) node balance of the current walk is not organized by Standard-Model representations. To use anomaly cancellation constructively, one must assign the entire anomaly-free generation to the physical boundary and show that the compensating Floquet/bulk sectors form a gauge-consistent massive regulator.

The fact that the physical representation is anomaly-free makes mirror gapping possible in principle; it does not supply the interaction that accomplishes it.

## 8. Stop-everything and falsification gates

**Boundary-generation success:** one wall contains exactly one anomaly-free Furey generation, including the correct color/weak multiplicities and optional sterile completion.

**Mirror-gap success:** the opposite wall or \(\pi\) sector is fully gapped by local gauge-invariant interactions with no symmetry breaking or topological order incompatible with observations.

**Yukawa success:** the same boundary construction realizes the cyclic Higgs/Yukawa topology already selected by the TRO.

**Falsifier:** anomaly cancellation is checked for isolated labels but the regulator duplicates or omits color/weak multiplicities.

**Insufficiency warning:** passing all anomaly sums is not a construction of a chiral lattice gauge theory.

## 9. Certificate

The [domain-wall generation anomaly certificate](../../../verification/verify/verify_domain_wall_standard_model_anomalies.mjs) evaluates the exact rational \(SU(3)^3\), mixed, cubic-Abelian and gravitational anomaly sums and checks even weak-doublet parity.

## Companion documents

- [Domain-wall localization and inflow](227_domain_wall_relocates_weyl_compensation_into_bulk_inflow.md)
- [Oriented Furey-sector anomaly audit](../0100-0199/109_furey_oriented_sector_anomaly_audit.md)
- [Four anomaly-free one-generation TROs](../0100-0199/110_furey_anomaly_free_one_generation_tros.md)
- [Weyl-walk Hopf roots and balance](226_weyl_walk_nodes_realize_local_hopf_roots_but_cancel_globally.md)
