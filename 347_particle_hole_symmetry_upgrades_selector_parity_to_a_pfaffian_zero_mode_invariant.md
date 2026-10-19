# Particle–Hole Symmetry Upgrades Selector Parity to a Pfaffian Zero-Mode Invariant

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08 and B11  
**Claim status:** exact finite-channel Pfaffian and mod-two spectral-flow theorem; embedding the full charged Furey/Standard-Model defect into this real BdG class remains open

> **Later correction (Document 378):** the Pfaffian wall theorem below remains
> exact. What is not established is that its three sign-reversing channels are
> the primitive selector quotient of the conventional index-three vortex. A
> Pin selector parity must be computed on its own operator and domain.

## 1. What the local-system calculation lacked

The four-component selector bundle retains

\[
\nu\bmod2,
\]

but a parity class does not pin a generic complex Hermitian eigenvalue at zero.

Spectral protection requires a real structure that forces nonzero eigenvalues to occur in symmetry-related pairs. The natural candidate is the self-dual CAR particle–hole symmetry.

## 2. Majorana representation

For a BdG Hamiltonian with particle–hole symmetry

\[
\Xi H\Xi^{-1}=-H,
\qquad
\Xi^2=+1,
\]

one can choose a Majorana basis in which

\[
H=iA,
\]

with

\[
A^T=-A,
\qquad
A\in M_{2N}(\mathbb R).
\]

The bulk is gapped exactly when

\[
\det A\ne0.
\]

Since

\[
\det A=\operatorname{Pf}(A)^2,
\]

the sign of the real Pfaffian cannot change without a gap closing.

## 3. One-channel selector wall

For one Majorana channel, take

\[
A(m)=
\begin{pmatrix}
0&m\\
-m&0
\end{pmatrix}.
\]

Its Pfaffian is

\[
\operatorname{Pf}A(m)=m.
\]

A mass wall with

\[
m_-<0<m_+
\]

has endpoint invariant

\[
\boxed{
\mathcal Q
=\operatorname{sgn}
\left[
\operatorname{Pf}A_-\,
\operatorname{Pf}A_+
\right]
=-1.}
\]

Every continuous real antisymmetric interpolation between the endpoints must pass through

\[
\operatorname{Pf}A=0,
\]

and hence through a zero eigenvalue.

## 4. Multiple channels give parity

For \(N\) independent channels,

\[
A=\bigoplus_{j=1}^N m_j
\begin{pmatrix}
0&1\\
-1&0
\end{pmatrix},
\]

so

\[
\operatorname{Pf}A=\prod_{j=1}^Nm_j.
\]

If all \(N\) masses reverse sign,

\[
\boxed{
\mathcal Q=(-1)^N.}
\]

Only the parity of the local integer survives, exactly matching the sign-monodromy local system:

\[
\nu\bmod2
\quad\longleftrightarrow\quad
\operatorname{sgn}(\operatorname{Pf}A_-\operatorname{Pf}A_+).
\]

For three local modes,

\[
\mathcal Q=-1.
\]

For a Dirac-balanced zero index,

\[
\mathcal Q=+1.
\]

## 5. Stability under mixing

Real antisymmetric channel-mixing perturbations can change the Pfaffian continuously but cannot change its sign while the endpoint matrices remain invertible.

Thus the invariant survives:

- real Majorana-channel mixing;
- disorder preserving particle–hole symmetry;
- nonfactorizing selector textures;
- deformations of the wall profile;
- movement and pairwise annihilation of zero modes.

An odd zero-mode parity cannot disappear without:

- a bulk endpoint gap closing;
- particle–hole symmetry breaking;
- coupling to an additional odd topological sector;
- changing the Fredholm domain.

## 6. Relation to class D and AIII

The globally graded AIII lift carries an integer:

\[
\nu\in\mathbb Z.
\]

The grading-reversing minimal selector cannot retain that signed integer. With CAR particle–hole symmetry, it can instead lie in a real BdG class with

\[
\mathcal Q\in\mathbb Z_2.
\]

The relation is reduction modulo two:

\[
\boxed{
\mathcal Q=(-1)^\nu.}
\]

The Majorana/Pfaffian structure supplies the analytic pairing theorem missing from the bare local-coefficient calculation.

## 7. CP phases do not automatically destroy CAR particle–hole symmetry

Complex Yukawa or pairing coefficients may look nonreal in a particle basis. A BdG Hamiltonian can still be represented as \(iA\) with real antisymmetric \(A\) after passage to Majorana operators; particle–hole symmetry is built into the self-dual CAR description.

This differs from an ordinary time-reversal or CP reality condition. Flavor CP violation can coexist with BdG particle–hole symmetry.

However, the Standard-Model chiral Hamiltonian is not automatically a physical BdG system. The Nambu completion must represent genuine Majorana or superconducting redundancy rather than an artificial doubling.

## 8. Sector-by-sector viability

The Pfaffian realization is most credible in:

- gauge-neutral sterile-neutrino sectors;
- Majorana-completed neutral defects;
- identical-sheet CAR sectors with a gauge-equivariant real structure.

It is not automatically available for:

- an undoubled charged chiral irrep;
- a unitary charged particle–antiparticle swap;
- a purely complex response matrix with no physical particle–hole constraint.

The gauge-commutant audit remains mandatory.

## 9. What this achieves

The chain is now:

\[
\boxed{
\text{grading-reversing selector deck}
\longrightarrow
\text{index sign local system}
\longrightarrow
\mathbb Z_2
\longrightarrow
\text{Pfaffian zero-mode parity under CAR particle–hole symmetry}.}
\]

This upgrades the candidate parity to an analytic protection mechanism under explicit real-BdG hypotheses.

It still does not derive three generations: every odd \(N\) has the same invariant.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** the physical neutral Furey/CAR selector operator is put in Majorana form and its endpoint Pfaffians reproduce the nontrivial selector parity.

**Spectral-flow trigger:** a complete defect calculation shows one unpaired Majorana crossing while all other crossings pair.

**Reality falsifier:** the matrix called \(A\) is not real antisymmetric in any gauge-compatible Majorana basis.

**Gap falsifier:** a Pfaffian sign is assigned at a singular endpoint.

**Charged-sector falsifier:** BdG redundancy is imposed on a charged chiral sector without a gauge-equivariant CAR completion.

**Generation falsifier:** \(\mathcal Q=-1\) is claimed to distinguish three from one or five generations.

## 11. Pinned dependency

The mod-two analytic mechanism is established abstractly. The remaining physical task is to construct the actual neutral or identical-sheet Furey defect Hamiltonian in a gauge-compatible Majorana basis and compute its endpoint Pfaffians.

## 12. Certificate

The [selector-parity Majorana-Pfaffian certificate](scripts/verify_selector_parity_as_majorana_pfaffian_domain_wall.mjs) checks the endpoint invariant, odd/even channel rule, stability under real antisymmetric mixing and the forced Pfaffian zero crossing.

## Companion documents

- [Twisted selector index parity](346_the_four_component_selector_retains_only_index_parity_while_the_global_double_restores_z.md)
- [Full-selector Clifford lift](345_the_full_selector_has_a_four_component_local_clifford_lift_but_needs_eight_for_a_global_aiii_grading.md)
- [Three-sheet CAR gauge gate](328_the_three_sheet_car_count_is_consistent_but_the_charged_nambu_swap_cannot_be_the_full_selector_lift.md)
- [Gauge-commutant flag antiunitary](337_the_flag_antiunitary_lives_in_the_gauge_multiplicity_commutant_and_cp_breaks_it.md)
