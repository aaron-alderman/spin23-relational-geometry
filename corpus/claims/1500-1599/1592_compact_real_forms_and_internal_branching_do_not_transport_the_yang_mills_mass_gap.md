# Compact Real Forms and Internal Branching Do Not Transport the Yang--Mills Mass Gap

**Date:** 20 October 2026

**Gates:** A1, A2, A4, A6, A7 and A8

**Status:** exact finite algebra, signature, branching and one-loop witnesses; no nonperturbative mass-gap bridge

**Depends on:** [the chiral E6 carrier audit](1560_the_chiral_E6_27_is_a_third_carrier_branch_but_its_cubic_does_not_close_reality_grading_or_the_portal_Ward_line.md) and [the Yang--Mills/QFT closure gate](1587_sakharov_t_yang_mills_and_vacuum_energy_form_a_joint_cosmological_qft_closure_gate.md)

**Evidence:** [compact-real-form/internal-unification ledger](../../../evidence/data/spin23-compact-real-form-internal-unification-bridge.json) and [deterministic verifier](../../../verification/verify/verify_spin23_compact_real_form_internal_unification_bridge.mjs)

## Result

There are two mathematically meaningful approaches to the programme from Yang--Mills theory, but neither is a shortcut:

\[
\boxed{
Spin(5)_{\rm compact}\longleftrightarrow Spin(2,3)_{\rm split}
\quad\text{shares complex algebra, not positivity or a gap},
}
\]

and

\[
\boxed{
E_6\rightarrow Spin(10)\times U(1)_\psi\rightarrow G_{\rm SM}\rightarrow SU(3)_c
\quad\text{branches representations, not infrared dynamics}.
}
\]

The first is a compact-real-form sandbox for rigorous techniques. The second identifies the internal color sector that actually carries the QCD mass-gap problem. They may eventually meet through a derived scale or matching law; at present they are logically separate.

## The real-form bridge and its obstruction

The exceptional low-rank isomorphisms are

\[
Spin(5)\simeq Sp(2),\qquad Spin_0(2,3)\simeq Sp(4,\mathbb R),
\]

with common complexification

\[
\mathfrak{spin}(5,\mathbb C)\simeq\mathfrak{sp}(4,\mathbb C).
\]

Both real algebras have dimension ten. They do not have the same reality or positivity structure. With the convention that the compact directions of the Killing form are negative, compact \(\mathfrak{spin}(5)\) has signature \((0,10)\). The Cartan decomposition of the split form is

\[
\mathfrak{so}(2,3)=\mathfrak k\oplus\mathfrak p,\qquad
\mathfrak k=\mathfrak{so}(2)\oplus\mathfrak{so}(3),
\]

so \(\dim\mathfrak k=4\), \(\dim\mathfrak p=6\), and the Killing signature is \((6,4)\). This finite signature witness is the obstruction in miniature: the positive invariant form used in compact Euclidean Yang--Mills is not carried unchanged into the noncompact theory.

Consequently, complexification or analytic continuation alone does not transport reflection positivity, the vacuum measure, the physical Hilbert space or a spectral gap. These are constructions to be proved, not polynomial identities in the complexified Lie algebra.

## A deliberately deceptive one-loop witness

For pure Yang--Mills,

\[
b_0={11\over3}C_A.
\]

In standard long-root normalization, both \(B_2\simeq\mathfrak{spin}(5)\) and \(A_2\simeq\mathfrak{su}(3)\) have \(C_A=3\), hence

\[
b_0[Spin(5)]=b_0[SU(3)]=11.
\]

This equality is useful as a guardrail. It shows that even an exact shared perturbative coefficient does not identify two gauge theories and cannot prove their infrared spectra or mass gaps. Asymptotic freedom generates the possibility of a scale; it is not the Jaffe--Witten existence-and-gap theorem.

## The internal-unification route

The standard E6 branch contains exact dimension balances

\[
\begin{aligned}
78&=45_0+1_0+16_{-3}+\overline{16}_{3},\\
27&=16_1+10_{-2}+1_4,\\
16&\rightarrow10+\overline5+1\quad\text{under }SU(5).
\end{aligned}
\]

It can therefore organize candidate gauge bosons, one-family matter, exotics and singlets on a path to the twelve-generator Standard Model algebra and its eight-generator color subalgebra. But a branching rule contains no Yang--Mills measure, Wilson-loop area law, glueball correlator or Hamiltonian spectral estimate. In particular,

\[
\boxed{E_6\text{ representation closure}\not\Rightarrow SU(3)_c\text{ confinement or a mass gap}.}
\]

Threshold spectra, anomaly cancellation, symmetry-breaking vacua and running-coupling matching must be supplied before the low-energy color theory is even fixed. Its nonperturbative infrared dynamics must then be solved independently.

## The joined research ladder

1. Define compact \(Spin(5)\) lattice and continuum observables with a positive Euclidean measure.
2. Distinguish a finite-volume transfer-matrix gap from bounds uniform in volume and lattice spacing that survive the continuum limit.
3. Derive the \(E_6\to Spin(10)\to G_{\rm SM}\) breaking spectrum, thresholds, anomalies and coupling matching.
4. Treat \(SU(3)_c\) confinement, glueball correlations and its physical gap as an independent nonperturbative arm.
5. Define the broken Lorentzian \(Spin(2,3)\) Cartan action and establish its BRST/constraint reduction and unitary physical state space.
6. Retain the required massless spin-2 pole while testing whether torsional, coset or other non-Einstein connection sectors are gapped.
7. Rejoin the compact, internal and gravitational arms only if an explicit common scale, matching condition or protected observable is derived.

A universal gap for the whole \(Spin(2,3)\) connection is not the desired result: it would generically remove long-range gravity. The meaningful target is sector-selective--massless Einstein gravity, independently confining compact color, and possibly gapped extra connection modes.

## What would move the programme

- **Useful failure:** an indefinite kinetic or physical inner product shows that the proposed noncompact quantum action is inadmissible before any mass-gap discussion.
- **Partial success:** a compact \(Spin(5)\) construction isolates a rigorous mechanism or inequality that can be reformulated after the broken \(Spin(2,3)\) constraints are imposed.
- **Internal success:** the E6 breaking calculation fixes the actual low-energy color coupling and threshold data without claiming that branching proves confinement.
- **Joined success:** one derived selector or modulus controls a gravitational extra-sector mass and a color matching scale while leaving the graviton massless; this would be a new physical relation, not analytic continuation.

## Sources

- [Jaffe and Witten, *Quantum Yang--Mills Theory*](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf)
- [Gross and Wilczek, ultraviolet behavior of non-Abelian gauge theories](https://doi.org/10.1103/PhysRevLett.30.1343)
- [Gross and Wilczek, *Asymptotically Free Gauge Theories I*](https://doi.org/10.1103/PhysRevD.8.3633)
- [Gursey, Ramond and Sikivie, the original E6 unified gauge model](https://doi.org/10.1016/0370-2693(76)90417-2)
- [Slansky, group theory for unified model building](https://doi.org/10.1016/0370-1573(81)90092-2)
- [Real forms of the complex anti-de Sitter algebra](https://arxiv.org/abs/hep-th/9108018)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_compact_real_form_internal_unification_bridge.mjs
~~~
