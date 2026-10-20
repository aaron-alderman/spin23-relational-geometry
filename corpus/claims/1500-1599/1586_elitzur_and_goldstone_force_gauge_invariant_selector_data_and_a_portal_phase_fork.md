# Elitzur and Goldstone Force Gauge-Invariant Selector Data and a Portal-Phase Fork

**Date:** 20 October 2026

**Gates:** A2, A4, A5, A6 and A8

**Status:** exact symmetry-type audit and portal phase theorem; full gauge-invariant effective action remains open

**Depends on:** [the electroweak gauge-quotient refinement](1582_the_electroweak_gauge_quotient_makes_z3_breaking_depend_on_two_doublet_support.md), [the quantum Hall index-three bridge](1585_quantum_hall_bulk_boundary_dynamics_realizes_index_three_but_not_the_z3_flavor_frame.md), and [the reduced E6xZ3 vacuum](1581_the_z3_reduced_three_radial_potential_has_an_open_neutral_vev_and_zero_portal_singlet_vacuum.md)

**Evidence:** [Elitzur/Goldstone ledger](../../../evidence/data/spin23-elitzur-goldstone-selector-gate.json) and [deterministic verifier](../../../verification/verify/verify_spin23_elitzur_goldstone_selector_gate.mjs)

**Subsequent cosmological/QFT gate:** [claim 1587](1587_sakharov_t_yang_mills_and_vacuum_energy_form_a_joint_cosmological_qft_closure_gate.md) joins the symmetry-type audit to Sakharov conditions, microscopic T, BRST-complete gauge QFT and renormalized vacuum energy.

## Result

The programme must classify every proposed breaking symmetry before it
counts Goldstones or vacuum components:

\[
\boxed{\text{local gauge},\quad\text{global continuous},\quad
\text{global discrete},\quad\text{accidental},\quad\text{topological}.}
\]

Elitzur's theorem forbids using an unfixed gauge-variant local one-point
function as a physical order parameter for a local gauge redundancy. Thus

\[
Spin(2,3)\to Spin(1,3)
\]

and

\[
E_6\to Spin(10)\times U(1)
\]

must be stated through gauge-invariant or gauge-covariant data: the orbit
minimum modulo gauge, bundle reduction, covariant projector, pole spectrum,
Wilson/disorder data where applicable, and BRST physical cohomology. A
gauge-fixed compensator VEV is useful notation but not the final physical
certificate.

## Goldstone count and gauge absorption

The Lie-algebra dimension differences are

\[
10-6=4,
\qquad
78-(45+1)=32.
\]

These are broken generator counts, not automatically physical massless
boson counts. The ordinary Nambu--Goldstone conclusion applies to broken
global continuous internal symmetries under its standard hypotheses. For a
gauged symmetry, the corresponding gauge-fixed Goldstone coordinates can
be absorbed into massive vector polarizations. For spacetime symmetry
breaking, constraint and inverse-Higgs relations require a separate count.

In particular, the four Spin(2,3)/Spin(1,3) coset directions cannot simply
be called four physical Goldstone particles or identified with the tetrad
without deriving the constraint structure.

## Exact portal phase fork

Claim 1582 identified the gauge-invariant electroweak order parameter

\[
\mathcal O=H_u^Ti\sigma_2H_d,
\qquad q_{Z_3}(\mathcal O)=1.
\]

If the effective potential is independent of
\(\theta=\arg\mathcal O\), it has an accidental global U(1). A nonzero
\(\langle\mathcal O\rangle\) then produces a physical massless phase mode,
subject to the complete anomaly and gauge analysis.

The first pure Z3 phase-locking operator gives the normalized angular
potential

\[
V(\theta)=\Lambda^4[1-\cos(3\theta)].
\]

For phase kinetic term \(f^2(\partial\theta)^2/2\), it has

\[
\theta=0,{2\pi\over3},{4\pi\over3},
\qquad
m_\theta^2={9\Lambda^4\over f^2}.
\]

Thus the completion has a sharp fork:

\[
\boxed{
\begin{array}{ll}
\text{no phase locking}:&\text{accidental U(1) and a Goldstone/axion-like mode},\\
\text{Z3 phase locking}:&\text{pseudo-Goldstone mass and three candidate wall vacua}.
\end{array}}
\]

Gauge quotienting or a connected larger vacuum can still identify/connect
the minima; that must be checked in the complete E6 potential.

## Quantum Hall distinction

The Chern phase of claim 1585 requires no local symmetry-breaking order
parameter. Its chiral edge states are protected by bulk topology and
spectral flow/anomaly inflow; they are not Nambu--Goldstone bosons. This is
one reason the quantum Hall route is attractive for the family index: it
can protect chiral modes without adding unwanted massless scalars.

It still cannot orient the family basis. The relational/Z3 selector must
act inside the protected edge space while its own gauge/global status is
declared and tested by the rules above.

## Programme consequence

The complete scalar/selector action must now report, for every claimed VEV:

1. whether the field is gauge variant;
2. the corresponding gauge-invariant phase diagnostic;
3. the physical vector, scalar and Goldstone spectrum;
4. the topology of the vacuum after quotienting by gauge;
5. whether the residual Z3 is global, gauged or approximate; and
6. how anomalies and higher-dimensional phase locking modify it.

This is a stricter and more physical replacement for informal statements
that a gauge symmetry “spontaneously breaks.”

## Reproduction

~~~powershell
node verification/verify/verify_spin23_elitzur_goldstone_selector_gate.mjs
~~~
