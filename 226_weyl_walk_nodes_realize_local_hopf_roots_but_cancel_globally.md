# Weyl-Walk Nodes Realize Local Hopf Roots but Cancel Globally

**Date:** 17 October 2026  
**Branches:** B04, B07, B09, B11 and B13  
**Claim status:** exact local two-band topology for the certified walk and exact global zero/\(\pi\) charge balance; no spin-two dynamics or anomaly-safe node selection yet

## 1. A legitimate null-helicity root

Near each Weyl point of a two-band unitary walk, the effective Bloch vector has the form

\[
\mathbf v(\mathbf k_0+\mathbf q)
=J\mathbf q+O(q^2).
\]

On a small sphere around the node, either eigenband is a complex line bundle whose first Chern number is the local degree

\[
\chi=\operatorname{sgn}\det J
\]

up to the band/orientation sign convention. This is the primitive Chern-one Weyl/Hopf line needed by the null topology branch.

The explicit body-diagonal walk therefore supplies a concrete local fermion-helicity root rather than borrowing one from a timelike stress continuum.

## 2. Local relationship and fourth power

The two opposite eigenlines around a Weyl node have Chern numbers \(\pm\chi\). Their off-diagonal relationship line has

\[
|c_1(\mathcal R_{\rm Weyl})|=2.
\]

Its fourth tensor power has

\[
|c_1(\mathcal R_{\rm Weyl}^{\otimes4})|=8,
\]

matching the null stress-helicity relationship bundle locally.

This realizes the exact helicity tensor-root construction on a small momentum sphere surrounding a lattice Weyl node.

## 3. Global Floquet cancellation

For the certified body-diagonal walk, the eight Brillouin corners have local degrees

\[
\chi_{\mathbf n}=(-1)^{n_x+n_y+n_z}.
\]

Thus:

- four zero-quasienergy nodes have \(\chi=+1\);
- four \(\pi\)-quasienergy nodes have \(\chi=-1\);
- the total degree is zero.

The local Hopf roots do not combine into one globally unpaired Weyl line over the Brillouin zone. Their topology is balanced between the two Floquet gaps.

## 4. Meaning for the selector branch

A small sphere around one chosen infrared node supports the same local relationship winding used in the celestial construction. But a global lattice theory must also account for the other seven nodes. Selecting only one without explaining the compensating topology violates the exact walk theorem.

The possible consistent interpretations are:

1. the \(\pi\) nodes act as regulator/anomaly-flow sectors rather than light particles;
2. a boundary or domain wall localizes one chirality while the rest live elsewhere;
3. interactions pair and gap nodes without breaking the desired gauge symmetry;
4. a different support shell changes the node inventory;
5. the full carrier is a direct sum whose total Chern class cancels.

## 5. No automatic spin-two mode

Taking the fourth tensor power of the local relationship line constructs the correct topological bundle. It does not create:

- a propagating spin-two lattice excitation;
- a stress-tensor pole;
- diffeomorphism gauge symmetry;
- Einstein dynamics;
- a composite graviton.

Those require a dynamical sector and an operator map. The walk presently supplies a null fermionic root and a controlled ultraviolet compensation pattern.

## 6. New bridge to the “one twist” language

Locally, one Weyl eigenline is a primitive Hopf/Chern-one carrier. The sequence is

\[
\text{Chern-one Weyl face}
\to
\text{Chern-two face relation}
\xrightarrow{\otimes4}
\text{Chern-eight stress relation}.
\]

Globally, the lattice enforces an equal and opposite collection. The “one twist” is therefore visible locally, while global consistency supplies the compensating twists automatically.

## 7. Stop-everything and falsification gates

**Boundary/anomaly success:** derive the \(\pi\)-sector charges as regulator or boundary anomaly flow while retaining one physical low-energy Weyl sector.

**Spin-two-map success:** construct a local gauge-invariant operator whose response carries the fourth-power relationship bundle and develops an isolated null spin-two pole.

**Falsifier:** one infrared node is used as a global chiral theory while the other seven certified nodes are ignored.

**Null-shell success:** a mixed-parity unitary walk changes the global node balance in a controlled higher-dimensional or boundary setting.

**Jordan selection gate:** derive the walk coin, node choice and tensor-power response from the same Jordan/TRO sewing data.

## 8. Certificate

The [Weyl-walk Hopf-root certificate](scripts/verify_weyl_walk_hopf_root_balance.mjs) enumerates all eight node charges, verifies zero/\(\pi\) balance and checks the local Chern-one to relationship-two to fourth-power-eight sequence.

## Companion documents

- [Eight-body-diagonal Weyl walk](176_eight_body_diagonal_weyl_walk_and_null_speed_gate.md)
- [Body-diagonal parity and chirality theorem](177_body_diagonal_parity_theorem_and_floquet_chirality_balance.md)
- [Stress relationship fourth power](224_stress_relationship_is_fourth_tensor_power_of_fermion_relationship.md)
- [Stress/helicity scope audit](225_null_helicity_topology_is_not_generic_stress_spectral_topology.md)
