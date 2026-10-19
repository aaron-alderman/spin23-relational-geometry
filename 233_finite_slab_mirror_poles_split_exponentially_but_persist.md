# Finite-Slab Mirror Poles Split Exponentially but Persist

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B11 and B13  
**Claim status:** exact finite topological-chain spectrum and response prototype; not yet the interacting Standard-Model mirror sector

## 1. Why a finite slab must be tested

An infinite mass kink supports one localized chiral mode. A finite regulator has another boundary or antikink. The two localized modes can mix, producing a small Dirac mass rather than an exactly isolated Weyl state.

The simplest finite analogue is an open dimerized chiral chain.

## 2. Topological dimer chain

Take \(2N\) sites with alternating hoppings

\[
t_1,t_2,t_1,t_2,\ldots,t_1,
\qquad 0<t_1<t_2.
\]

The single-particle Hamiltonian is real, symmetric and bipartite. In the semi-infinite limit, the left and right ends each carry a zero mode. At finite \(N\), their exponentially small overlap produces eigenvalues

\[
E_\pm=\pm\delta_N.
\]

Asymptotically,

\[
\delta_N\propto
t_2\left(\frac{t_1}{t_2}\right)^N
\]

up to an order-one normalization factor.

## 3. Response interpretation

Project the resolvent onto the two end sites:

\[
G_{\rm ends}(z)
=P_{\rm ends}(H-zI)^{-1}P_{\rm ends}^T.
\]

It is a \(2\times2\) Herglotz response. Its low-energy pole pair records the physical/mirror mixing:

\[
G_{\rm ends}(z)
\sim
\frac{R_+}{\delta_N-z}
+\frac{R_-}{-\delta_N-z}
+\cdots,
\qquad R_\pm\succeq0.
\]

The end residues are correlated: neither wall is an autonomous finite system.

## 4. Thick-slab limit

Increasing \(N\) makes \(\delta_N\) exponentially small. This creates a parametrically accurate chiral regime over energies

\[
\delta_N\ll E\ll\Delta_{\rm bulk}.
\]

But for every finite \(N\), the opposite-wall pole remains. Geometry suppresses mirror mixing; it does not generate a mirror mass of order the cutoff while leaving the physical wall massless.

That stronger goal requires interactions, asymmetric boundary conditions, overlap/Ginsparg--Wilson structure or an infinite extra dimension.

## 5. Consequence for the programme

The finite slab gives two different scales:

- the bulk dimerization gap, set by approximately \(|t_2-t_1|\);
- the physical/mirror splitting \(2\delta_N\), exponentially smaller.

This is useful for regulator control but insufficient as a phenomenological mirror solution: an exponentially light partner is the opposite of a heavy decoupled mirror unless the observed theory is defined on only one boundary with the other removed to infinity.

## 6. Interaction target

Because one complete Standard-Model generation is anomaly-free, symmetric mass generation of a mirror sector is not immediately excluded by perturbative anomalies. A valid interaction must:

1. gap only the remote-wall/mirror degrees of freedom;
2. preserve the full gauge group;
3. avoid bilinear masses that pair away the physical wall;
4. introduce no unwanted topological order or massless composites;
5. preserve the positive boundary response.

The free slab provides the null model against which such an interaction must be tested.

## 7. Stop-everything and falsification gates

**Geometric decoupling:** take a controlled infinite-width limit while retaining local four-dimensional observables and finite computational/physical meaning.

**Mirror-gap success:** add local gauge-invariant Furey/TRO interactions and obtain a cutoff-scale mirror gap with an exactly chiral physical wall.

**Response success:** the interacting end Green function retains positive residues and the desired \(H_2\) carrier.

**Falsifier:** finite wall separation is claimed to make the mirror heavy; the free calculation makes the induced mass exponentially small.

**Topological-order gate:** any interaction-based mirror gap must state whether it leaves a nontrivial boundary topological phase.

## 8. Certificate

The [finite-slab mirror certificate](scripts/verify_finite_slab_mirror_splitting.mjs) diagonalizes several open dimer chains, verifies paired near-zero eigenvalues, exponential suppression with length, end localization and Herglotz positivity of the two-end resolvent.

## Companion documents

- [Domain-wall localization and inflow](227_domain_wall_relocates_weyl_compensation_into_bulk_inflow.md)
- [Finite domain-wall Schur response](229_finite_domain_wall_resolvent_is_a_schur_herglotz_carrier.md)
- [One-generation wall anomaly gate](228_one_standard_model_generation_passes_domain_wall_anomaly_gate.md)
- [Furey generation wall loading](231_anomaly_free_furey_generation_loads_as_wall_carrier_commutant.md)
