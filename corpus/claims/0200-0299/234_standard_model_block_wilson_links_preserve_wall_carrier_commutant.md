# Standard-Model Block Wilson Links Preserve the Wall-Carrier Commutant

**Date:** 17 October 2026  
**Branches:** B01, B03, B07, B08, B11 and B13  
**Claim status:** exact finite representation/link covariance for one generation; chiral gauge dynamics, Higgs/Yukawa links and quantum anomaly flow remain open

## 1. One-generation link representation

For a gauge element

\[
g=(g_3,g_2,e^{i\theta})
\in SU(3)\times SU(2)\times U(1)_Y,
\]

the all-left one-generation module carries

\[
R_F(g)=
R_Q\oplus R_{u^c}\oplus R_{d^c}
\oplus R_L\oplus R_{e^c}\oplus R_{N^c},
\]

where

\[
R_Q=g_3\otimes g_2\,e^{i\theta/6},
\quad
R_{u^c}=\bar g_3e^{-2i\theta/3},
\quad
R_{d^c}=\bar g_3e^{i\theta/3},
\]

\[
R_L=g_2e^{-i\theta/2},
\quad
R_{e^c}=e^{i\theta},
\quad
R_{N^c}=1.
\]

The dimensions sum to

\[
6+3+3+2+1+1=16.
\]

## 2. Wilson-link covariance

Let a link carry a group element \(u_{xy}\). Under independent endpoint transformations,

\[
u_{xy}\mapsto g_xu_{xy}g_y^{-1}.
\]

Because \(R_F\) is a representation,

\[
R_F(u_{xy})mapsto
R_F(g_x)R_F(u_{xy})R_F(g_y)^\dagger.
\]

Every block therefore satisfies the same finite link-conjugacy law used in the \(U(1)\) wall prototype.

## 3. Carrier commutant

The face and wall-spin operators act as

\[
S_{\rm carrier}\otimes I_{16},
\]

while gauge links act as

\[
I_{\rm carrier}\otimes R_F(u_{xy}).
\]

They commute exactly. Non-Abelian gauge transport therefore does not by itself mix or complexify the two-face carrier.

This remains true for arbitrary link backgrounds and not only infinitesimal gauge fields.

## 4. Why Yukawa links are different

Gauge links act within each irreducible block. Yukawa maps connect inequivalent blocks, for example

\[
Q\leftrightarrow u^c,
\quad
Q\leftrightarrow d^c,
\quad
L\leftrightarrow e^c,
\quad
L\leftrightarrow N^c,
\]

and require a Higgs doublet to make the maps gauge covariant.

Consequently, Wilson-link covariance follows from representation theory, while the real-carrier compatibility of Yukawa terms is the nontrivial TRO portal condition

\[
J_EB_H=B_HJ_F.
\]

The two questions must not be conflated.

## 5. Gauge-neutral wall response

A projected response at one site transforms by

\[
G_{\rm wall}\mapsto
R_F(g_x)G_{\rm wall}R_F(g_x)^\dagger.
\]

Taking an internal trace, a gauge-singlet block contraction or a physical matrix element produces a gauge-invariant positive face response. Positivity is preserved under unitary conjugation and positive partial traces.

## 6. What this advances

The wall branch now supports:

- the exact one-generation gauge representation;
- finite non-Abelian Wilson links;
- local endpoint covariance;
- a carrier in the gauge commutant;
- gauge-invariant positive compressions.

The missing pieces are dynamical gauge fields, temporal link substeps, Yukawa/Higgs maps, mirror interactions and quantum anomaly flow.

## 7. Stop-everything and falsification gates

**Full link success:** implement all three spatial directions and temporal transporters in an exactly unitary wall walk.

**Yukawa success:** the cyclic Furey Higgs maps obey both gauge covariance and the real-TRO portal equation.

**Anomaly-flow success:** the regulated fermion determinant or spectral flow reproduces the already-vanishing complete boundary anomaly polynomial block by block.

**Falsifier:** gauge links are inserted with the same matrix on inequivalent Standard-Model representations rather than through \(R_F\).

**Global-group gate:** quotient by the correct Standard-Model central subgroup when moving from Lie-algebra tests to the faithful gauge group.

## 8. Certificate

The [Standard-Model block-link certificate](../../../verification/verify/verify_standard_model_block_link_covariance.mjs) constructs noncommuting sample \(SU(3)\) and \(SU(2)\) elements, assembles the sixteen-dimensional representation, verifies the homomorphism and endpoint link law and checks exact carrier commutation.

## Companion documents

- [Gauge-linked wall covariance](232_gauge_linked_wall_hamiltonian_preserves_covariance_and_passivity.md)
- [Furey generation wall commutant](231_anomaly_free_furey_generation_loads_as_wall_carrier_commutant.md)
- [TRO real-portal theorem](222_tro_real_portal_intertwiner_theorem_and_gauge_obstruction.md)
- [Cyclic Yukawa topology](../0100-0199/111_furey_cyclic_yukawa_topology_selection.md)
