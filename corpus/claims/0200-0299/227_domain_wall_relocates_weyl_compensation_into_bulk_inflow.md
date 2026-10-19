# A Domain Wall Relocates Weyl Compensation into Bulk Inflow

**Date:** 17 October 2026  
**Branches:** B03, B07, B09, B11 and B13  
**Claim status:** standard domain-wall zero-mode mechanism with an explicit localization certificate; no constructed 4+1-dimensional completion of the present walk

## 1. What a boundary escape can accomplish

The three-dimensional Weyl walk has exact global chirality balance. A domain-wall construction can produce a single chiral mode on one observed 3+1-dimensional boundary, but it does not destroy the compensating topology. It relocates compensation into:

- an opposite wall;
- a higher-dimensional bulk topological term;
- or degrees of freedom at infinity.

This is the correct sense in which boundary/domain-wall fermions evade a strictly same-dimensional doubling argument.

Kaplan's construction uses a massive theory in \(2n+1\) dimensions with a mass kink to obtain chiral zero modes in \(2n\) dimensions; see [Kaplan, *A Method for Simulating Chiral Fermions on the Lattice*](https://doi.org/10.1016/0370-2693(92)91112-M). The associated anomaly is accounted for by bulk current flow, following the Callan--Harvey mechanism ([DOI](https://doi.org/10.1016/0550-3213(85)90489-4)).

## 2. Minimal 4+1-dimensional wall

Take a 4+1-dimensional Dirac operator with one extra spatial coordinate \(w\),

\[
\mathcal D_5
=i\gamma^\mu\partial_\mu
+i\gamma^w\partial_w
-m(w),
\]

where \(\mu=0,1,2,3\) and

\[
m(w)=m_0\tanh(w/\xi).
\]

For a four-dimensional zero mode of definite wall chirality, the transverse equation reduces, after a convention choice, to

\[
\left(\partial_w+m(w)\right)f(w)=0.
\]

Its solution is

\[
\boxed{
f(w)=N\,\operatorname{sech}(w/\xi)^{m_0\xi}.}
\]

For \(m_0\xi>0\), this is normalizable and exponentially localized. Reversing the kink reverses the surviving chirality.

## 3. Finite slab and the hidden partner

On a compact or finite extra dimension, a kink must be accompanied by an antikink or boundary condition carrying the complementary index. The second wall supports the opposite chirality.

If their separation is \(L\), the wavefunction overlap is parametrically

\[
\Delta_{\rm mix}\sim e^{-m_0L}.
\]

The mirror can be exponentially decoupled at low energy, but it is not absent from the ultraviolet completion.

## 4. Anomaly inflow accounting

A chiral wall current by itself can be anomalous. Integrating out the massive bulk fermion induces a parity-odd/topological bulk response whose variation supplies the missing current. Schematically,

\[
\partial_\mu j^\mu_{\rm wall}
=-\partial_w j^w_{\rm bulk}.
\]

The combined bulk-plus-wall system is gauge consistent even when the wall current alone is not conserved. This is relocation, not erasure, of the anomaly.

For a fully anomaly-free set of Standard-Model wall fermions, perturbative gauge anomalies can cancel among the boundary species. The higher-dimensional regulator and global-anomaly checks are still required.

## 5. Relation to the Floquet \(\pi\) sector

The present 3D walk's \(\pi\)-gap nodes cannot simply be relabeled “bulk inflow.” A valid identification requires an explicit enlarged unitary \(U(\mathbf k,k_w)\) or boundary evolution satisfying:

1. locality and exact unitarity in the 4D spatial bulk;
2. a mass/domain-wall profile;
3. the desired boundary Weyl modes;
4. a gapped bulk spectrum;
5. spectral flow reproducing the gauge anomaly;
6. a map from the old zero/\(pi\) node charges to bulk/boundary indices.

Until then, domain-wall inflow is a viable architecture, not an explanation of the certified walk's duplicates.

## 6. Jordan and carrier interpretation

The wall supplies a natural selector: localization distinguishes one boundary face from its remote partner. Boundary Green functions obtained by eliminating the massive bulk are Schur complements and therefore fit the established causal Jordan-response machinery.

The high-value bridge is

\[
\text{bulk Dirac/Jordan response}
\xrightarrow{\text{Schur boundary map}}
\text{chiral boundary }H_2\text{ carrier}.
\]

This must be calculated for an explicit bulk action. The mere existence of a localized zero mode does not fix the boundary \(Spin(2,3)\) response.

## 7. Stop-everything and falsification gates

**Walk completion:** construct a 4+1-dimensional exactly unitary local walk whose boundary spectrum contains the desired anomaly-free Furey matter sector and whose bulk/remote-wall modes account for every compensating charge.

**Schur bridge:** integrate out the gapped bulk and obtain the same positive causal two-face boundary response used in the Jordan recursion.

**Inflow success:** background-gauge spectral flow matches the complete boundary anomaly polynomial.

**Falsifier:** the \(\pi\) nodes of the existing three-dimensional walk are called anomaly inflow without an extra-dimensional bulk current or index calculation.

**Mirror failure:** remote-wall mixing cannot be suppressed without unacceptable nonlocality, gauge breaking or a new light mirror sector.

## 8. Certificate

The [domain-wall localization certificate](../../../verification/verify/verify_domain_wall_chiral_localization.mjs) checks the kink zero-mode differential equation, numerical normalizability, chirality reversal under an antikink and exponential suppression of two-wall overlap.

## Companion documents

- [Weyl-walk Hopf roots and balance](226_weyl_walk_nodes_realize_local_hopf_roots_but_cancel_globally.md)
- [Body-diagonal Floquet chirality theorem](../0100-0199/177_body_diagonal_parity_theorem_and_floquet_chirality_balance.md)
- [Walk resolvent and Siegel domain](../0100-0199/159_walk_siegel_resolvent_and_sp4_domain.md)
- [Twisted-bundle Schur covariance](221_twisted_bundle_schur_recursion_is_globally_covariant.md)
