# The Sideband-Reversing A2 Cycle Is Gauge Compatible Only Downstream of Higgs Dressing and Color Contraction

**Date:** 17 October 2026  
**Branches:** sideband conversion, Nambu typing, gauge superselection, neutral composite responses, and active $A_2$ cycle  
**Claim status:** exact charge-commutant theorem; microscopic neutral frequency converter remains open  
**Certificate:** [type_the_sideband_reversing_a2_cycle_under_internal_charge_superselection.mjs](scripts/type_the_sideband_reversing_a2_cycle_under_internal_charge_superselection.mjs)

## Executive result

The sideband-reversing cycle of document 904 is compatible with unbroken internal gauge symmetry only when it acts on the already completed neutral response modes.

For a charged Nambu pair with charges

\[
(Q,-Q),
\]

the off-diagonal frequency/particle-hole entries carry charges

\[
\begin{pmatrix}0&2Q\\-2Q&0\end{pmatrix}.
\]

A sideband exchange therefore fails to commute with the continuous phase action unless

\[
Q=0
\]

or a charge-two spurion/condensate is present.

The mediator responses used in documents 897–904 are not bare fermion amplitudes. They are:

1. Higgs-dressed left/right Dirac composites;
2. color contracted where necessary;
3. completed to internal-gauge singlets.

Their charge is zero, so every entry of their sideband double is neutral and the exchange commutes with all internal gauge phases.

Thus the correct categorical order is

\[
\boxed{
\text{matter fields}
\to
\text{Higgs dressing}
\to
\text{color contraction}
\to
\text{neutral response modes}
\to
\text{sideband-converting boundary cycle}.
}
\]

Moving the frequency conversion upstream to charged quark or lepton amplitudes would require symmetry breaking not present in the stated construction.

## 1. Charged Nambu obstruction

Let

\[
\Psi=
\begin{pmatrix}\psi\\\psi^\dagger\end{pmatrix}
\]

with charge representation

\[
G_Q(\alpha)
=
\begin{pmatrix}
e^{iQ\alpha}&0\\
0&e^{-iQ\alpha}
\end{pmatrix}.
\]

The sideband/particle-hole exchange is

\[
X=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

For generic $\alpha$,

\[
G_Q(\alpha)X\ne XG_Q(\alpha)
\]

when $Q\ne0$.

Equivalently, the anomalous entries have charge $\pm2Q$. A nonzero mixing coefficient would break the continuous charge symmetry unless accompanied by a compensating charged field.

This is the ordinary Bogoliubov/Nambu superselection gate.

## 2. Neutral composite response

The four response atoms of document 796 are constructed from matched Higgs-dressed faces. Schematically,

\[
O_f
\sim
(H_f^\dagger F_L)f^{c\dagger}
\]

or their Gram/transfer counterparts. Their internal charges cancel.

For the color channels, triplet and dual-triplet indices are also contracted. Therefore

\[
Q(O_\ell)=Q(O_q)=0
\]

for every unbroken internal generator.

Their sideband phase representation is the identity:

\[
G_0(\alpha)=I.
\]

Consequently

\[
[G_0(\alpha),X]=0.
\]

Sideband conversion is gauge compatible at this response level.

## 3. Distinction from independent second legs

Document 857 proved that a constrained negative-frequency sideband cannot supply the four-real bilocal carrier as an independent second leg. The present use does not contradict that result.

Here:

- the two independent response coordinates already come from distinct Dirac/composite channels;
- the negative sideband is constrained by real-time reality;
- sideband exchange is used as a sequential boundary operation that cancels a common phase;
- no additional particle or independent source degree of freedom is counted.

The sideband is a typed sewing index, not the origin of carrier dimension.

## 4. Consequence for microscopic models

A viable implementation may use:

- a parametrically driven interface acting on neutral composite envelopes;
- a Floquet modulation of the mediator/background response;
- a two-pass boundary condition reversing the complex-envelope convention;
- a neutral bosonic collective mode with anomalous frequency conversion.

It may not simply apply a Bogoliubov exchange to charged Standard-Model fermions while claiming all gauge symmetries remain unbroken.

## 5. Stop-everything and falsification criteria

**Neutral-interface trigger:** derive a local or boundary action coupling the two neutral composite response sidebands with the document-904 transfer matrix.

**Gauge trigger:** verify the full converter commutes with every unbroken Standard-Model charge and does not require a hidden charged condensate.

**Floquet trigger:** identify a neutral periodic pump whose quasienergy conversion implements $+\omega_0\leftrightarrow-\omega_0$ coherently.

**Charge falsifier:** the proposed converter acts before Higgs/color completion on a mode with nonzero charge and contains an uncompensated anomalous entry.

**Counting falsifier:** the constrained negative sideband is counted as an independent matter field or independent carrier leg.

## 6. Verdict

| Location of sideband conversion | Gauge status |
|---|---|
| Bare charged fermion/Nambu amplitude | **forbidden without charge-two breaking or spurion** |
| Higgs-dressed but uncontracted colored mode | **still color typed; contraction required** |
| Completed neutral lepton response | **allowed** |
| Completed color-singlet quark response | **allowed** |
| Negative sideband counted as new particle | **incorrect** |

## 7. Position in the corpus

- [sideband-reversing rational-inner $C_3$ cycle](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [sideband real-time completion](781_a_sideband_exchange_real_structure_gives_the_complex_scattering_checkpoint_a_real_time_reciprocal_passive_completion.md)
- [explicit sideband doubling required after selector transport](829_the_redheffer_orbit_preserves_sampled_schur_passivity_but_requires_explicit_sideband_doubling_for_real_time_reality.md)
- [sideband is not an independent bilocal leg](857_only_an_independent_covariant_second_leg_supplies_the_full_bilocal_c2_carrier_at_fixed_frequency.md)
- [neutral Yukawa Gram sources](796_four_higgs_dressed_yukawa_gram_sources_can_supply_rank_four_tomography_only_in_the_nu_right_completed_branch.md)
