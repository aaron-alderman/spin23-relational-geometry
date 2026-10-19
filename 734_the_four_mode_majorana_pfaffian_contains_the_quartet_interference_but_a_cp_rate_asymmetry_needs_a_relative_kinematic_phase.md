# The Four-Mode Majorana Pfaffian Contains the Quartet Interference, but a CP Rate Asymmetry Needs a Relative Kinematic Phase

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the coherent four-fermion branch  
**Claim status:** exact antisymmetrized-amplitude factorization and CP-asymmetry condition; complete Standard-Model four-(W) diagram remains open  
**Certificate:** [verify_four_mode_majorana_pfaffian_contains_quartet_interference_and_cp_phase_condition.mjs](scripts/verify_four_mode_majorana_pfaffian_contains_quartet_interference_and_cp_phase_condition.mjs)

## Executive result

The two composite paths of document 733 are not merely a formal interferometer. They occur in the Pfaffian of a coherent four-fermion pair state.

For four distinct external modes, an antisymmetric pair kernel (K_{ij}=-K_{ji}) gives

\[
\boxed{
\mathcal A_{1234}
=\operatorname{Pf}K
=K_{12}K_{34}-K_{13}K_{24}+K_{14}K_{23}.
}

\]

Assign the flavors

\[
(1,2,3,4)=(\alpha,\alpha,\beta,\beta).

\]

If the pair kernel factors into flavor and kinematic pieces,

\[
K_{ij}=F_{f_if_j}s_{ij},

\]

then

\[
\boxed{
\mathcal A_{1234}
=Pp+Qq,
}

\]

where

\[
p=F_{\alpha\alpha}F_{\beta\beta},
\qquad
q=F_{\alpha\beta}^2,

\]

and

\[
P=s_{12}s_{34},
\qquad
Q=-s_{13}s_{24}+s_{14}s_{23}.

\]

The rate therefore contains

\[
2\operatorname{Re}
\left[
PQ^*,pq^*
\right].

\]

The Majorana quartet coherence is present in the coherent antisymmetrized amplitude.

## 1. Why the Pfaffian appears

A Majorana or BCS-like pair source creates fermions through a quadratic exponential schematically of the form

\[
\exp\left(
\frac12K_{ij}c_i^\dagger c_j^\dagger
\right).

\]

The coefficient of

\[
c_1^\dagger c_2^\dagger c_3^\dagger c_4^\dagger

\]

is the Pfaffian of the four-mode restriction of (K). The alternating signs are forced by fermionic antisymmetry.

Thus the (p) and (q) paths are Wick pairings of one coherent four-mode amplitude, provided the source and final-state modes do not record which pairing occurred.

## 2. Exact interference decomposition

Squaring the amplitude gives

\[
|\mathcal A|^2
=|Pp|^2+|Qq|^2
+2\operatorname{Re}(PQ^*pq^*).

\]

Write

\[
PQ^*=a+ib,
\qquad
pq^*=x+iy.

\]

Then the interference is

\[
2(ax-by).

\]

The CP-odd Majorana quartet is

\[
y=\operatorname{Im}(pq^*).

\]

It contributes to an ordinary rate only when the kinematic pairing coherence has a nonzero imaginary part (b), or when an external phase shifter deliberately creates one.

## 3. CP-conjugate subtraction

Treat (P,Q) as CP-even kinematic coefficients that may contain absorptive phases, while CP conjugates the weak amplitudes:

\[
p\mapsto p^*,
\qquad
q\mapsto q^*.

\]

Then

\[
\boxed{
|Pp+Qq|^2
-|Pp^*+Qq^*|^2
=-4\operatorname{Im}(PQ^*)
\operatorname{Im}(pq^*).
}

\]

Therefore:

- a weak CP phase alone does not create a rate asymmetry;
- a relative absorptive or controlled kinematic phase is also required;
- their product isolates the quartet orientation.

If (P,Q) are both real, the CP-conjugate rates are equal even when the Majorana quartet is nonzero.

## 4. Controlled quadrature versus absorptive phase

There are two conceptually distinct ways to obtain the required phase.

### Dynamical strong/absorptive phase

Thresholds, widths or rescattering can make

\[
\operatorname{Im}(PQ^*)\ne0.

\]

A CP-conjugate subtraction then isolates the product of strong and weak phases. The absorptive contribution must be computed rather than mistaken for CP violation itself.

### Controlled interferometric phase

An external network can impose

\[
Q\mapsto e^{i\chi}Q.

\]

The quarter-turn settings of document 733 then directly select the imaginary weak coherence without relying on an uncontrolled final-state phase.

This option is natural in a simulator or deliberately engineered coherent source, but difficult in a Standard-Model collider process.

## 5. Coherence versus an incoherent double event

If the two LNV subprocesses are independently produced and their pairing labels remain distinguishable, the state is a mixture rather than the Pfaffian superposition. The probability becomes

\[
|Pp|^2+|Qq|^2

\]

and the cross term disappears.

Coherence requires:

- a common quantum source;
- identical fully differential external modes;
- no timing, spatial or detector record of the pairing;
- and amplitude-level summation before phase-space integration.

This is the genuine physical gate.

## 6. Kinematic qualifications

For ideal massless two-component spinor brackets, Plücker/Schouten identities may relate the three pair products. Source attachments, propagator denominators, polarizations and distinct momentum routing generally dress them differently.

The full diagram must therefore retain:

- which weak boson couples to which final lepton;
- the Majorana propagator momentum in each pairing;
- spinor antisymmetrization;
- identical-particle combinatorics;
- and gauge-restoring diagram sets.

The Pfaffian theorem fixes the flavor/pairing algebra but not the Standard-Model kinematic coefficient (P/Q).

## 7. Relation to the positive carrier

The two-path Gram and its positive (H_2(\mathbb R)) compression remain valid for arbitrary complex (Pp) and (Qq). The carrier coordinates become the intensity average and the two interference quadratures.

The Pfaffian result supplies the missing reason that both paths may inhabit one amplitude. It therefore upgrades document 733 from an abstract network to a physically recognizable fermionic pairing structure.

## 8. Stop-everything criteria

Stop calling independent double events coherent without a common source and indistinguishable pairing labels.

Stop claiming a nonzero weak quartet guarantees a CP rate asymmetry; a relative kinematic phase is required.

Stop treating an absorptive phase as the weak Majorana phase.

Stop applying a bare Schouten identity after propagator and source factors distinguish the pairings.

Stop the collider branch if the complete gauge-invariant four-source amplitude decoheres or integrates the cross term to zero.

## 9. Highest-value next calculations

1. Build a toy four-(W) tree amplitude with explicit Majorana propagator denominators and all fermion pairings.
2. Test whether the quartet cross term survives fully differential phase space and which integrations erase it.
3. Add a heavy-neutrino width and separate weak from absorptive phases.
4. Determine whether a realistic decay cascade supplies a common coherent source more naturally than four-boson scattering.
5. If collider coherence fails, preserve the Pfaffian network as the mathematically minimal simulator protocol.

## Companion documents

- [Two-copy positive LNV interferometer](733_a_two_copy_lnv_interferometer_embeds_the_minimal_majorana_cp_quartet_in_a_positive_h2r_carrier.md)
- [Minimal LNV amplitude quartet](732_a_two_flavor_lnv_amplitude_quartet_is_the_minimal_rephasing_invariant_majorana_cp_observable_and_avoids_charged_lepton_mass_spurions.md)
- [The neutral Majorana Pfaffian is det M, but CP removes its real sign](352_the_neutral_majorana_pfaffian_is_det_m_but_cp_makes_it_complex_and_removes_the_sign.md)
