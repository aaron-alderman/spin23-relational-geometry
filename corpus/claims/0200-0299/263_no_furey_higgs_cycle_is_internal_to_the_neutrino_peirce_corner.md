# No Furey Higgs Cycle Is Internal to the Neutrino Peirce Corner

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08 and B11  
**Claim status:** exact directed-incidence audit; operator coefficients and dynamical action remain separate questions

## 1. The corner and the cycles

The neutral Peirce corner uses the block-object subset

\[
P=\{D,E\}.
\]

For a cyclically surviving Furey topology, the four Yukawa cycles are:

\[
H\xrightarrow{Q}O_2\xrightarrow{u^c}C\xrightarrow{h_C}H,
\]

\[
H\xrightarrow{Q}O_2\xrightarrow{d^c}D\xrightarrow{h_D^\dagger}H,
\]

\[
C\xrightarrow{e^c}E\xrightarrow{L}H\xrightarrow{h_C^\dagger}C,
\]

and, after the unique neutrino completion,

\[
H\xrightarrow{h_D}D\xrightarrow{\nu^c}E\xrightarrow{L}H.
\]

## 2. Exact incidence classification

Relative to \(P=\{D,E\}\):

| Cycle | Internal \(P\to P\) edges | Crossing edges | External edges |
|---|---:|---:|---:|
| up | 0 | 0 | 3 |
| down | 0 | 2 | 1 |
| charged lepton | 0 | 2 | 1 |
| neutrino | 1 | 2 | 0 |

The sole Peirce-internal matter edge is

\[
\nu^c:D\to E.
\]

No complete Higgs cycle lies inside the neutrino corner.

## 3. Consequence for same-carrier closure

If the Peirce projector is interpreted as a projector on the same five-block carrier that supports the matter and Higgs arrows, then:

- the down cycle enters and exits through \(D\);
- the charged-lepton cycle enters and exits through \(E\);
- the neutrino cycle uses the internal \(D\to E\) edge but enters from and returns to \(H\);
- the up cycle acts entirely in the complement.

Therefore the full Yukawa incidence does not preserve \(P\) as an invariant block-object subsystem.

\[
\boxed{
\text{same-carrier Peirce closure is incompatible with the full cycle incidence}.}
\]

This is stronger than the minimal compensated-leakage example: it follows directly from the source endpoint graph.

## 4. Why a closed cyclic trace does not repair the issue

Each Yukawa interaction is a closed trace over the full block cycle. Gauge invariance and cyclic closure make the scalar action well defined, but they do not make every intermediate arrow preserve the \(D,E\) subspace.

Varying the action or constructing a Hamiltonian exposes the crossing legs. A closed loop in the full carrier is not a closed path inside the Peirce corner.

## 5. The required factor separation

The successful architecture must distinguish:

\[
\mathcal H_{\rm response}
\quad\text{from}\quad
\mathcal H_{\rm Furey\ matter}.
\]

The neutral Peirce corner can motivate or label the response factor, but the response projector cannot simply be the block projector acting on the same matter carrier.

A viable map has the form

\[
\Pi_{\rm response}:
\text{gauge-neutral composites or boundary data}
\longrightarrow
H_2(\mathbb R),
\]

while the complete Furey cycles act on the separate matter/linking factor.

This explains why the factor-local commutant construction succeeded whereas the full entrywise lift failed.

## 6. What remains of the internal bridge

The neutrino Peirce corner still provides:

- a gauge-neutral canonical \(M_2(\mathbb C)\) corner;
- the correct real Jordan fixed form;
- a source-selected two-face relational pattern;
- the unique neutral \(D\to E\) arrow.

But its physical role must be one of:

1. a response functor/compression derived from composites;
2. a boundary label copied into an external response factor;
3. an emergent low-energy observable algebra;
4. a partial internal sector, not the full matter Hamiltonian.

It is not a closed carrier for all Standard-Model interactions.

## 7. Stop-everything and falsification gates

**Functor trigger:** an explicit positive gauge-invariant map sends the full cyclic matter theory to the neutral two-face response and intertwines Schur composition.

**Composite trigger:** bilinears built from the crossing arrows close on the Peirce response even though individual arrows do not.

**Boundary trigger:** domain-wall projection produces an independent neutral face factor canonically labelled by \(D,E\).

**Falsifier:** a full Furey Higgs cycle is claimed to live inside \(p_\nu M_3p_\nu\), or closed cyclic trace is used as proof that every intermediate leg preserves the corner.

## 8. Certificate

The [Furey Higgs-cycle/Peirce-incidence certificate](../../../verification/verify/verify_furey_higgs_cycle_peirce_incidence.mjs) encodes all four directed cycles, classifies every edge as internal, crossing or external relative to \(\{D,E\}\), and confirms that no complete cycle is Peirce internal.

## Companion documents

- [Higgs-compensated Peirce leakage](262_higgs_compensation_restores_gauge_invariance_but_can_break_peirce_closure.md)
- [Cyclic Furey Yukawa topology](../0100-0199/111_furey_cyclic_yukawa_topology_selection.md)
- [Unique neutrino TRO completion](../0100-0199/167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Factor-local selector/Yukawa commutant](255_factor_local_selector_commutes_with_full_one_generation_yukawa_operator.md)
