# Pairing Exchange Can Cancel the Inclusive Majorana-Quartet Asymmetry, While a Signed Differential Moment Restores It

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the phase-space-survival branch  
**Claim status:** exact involution theorem and explicit routed-propagator toy; full Standard-Model phase-space symmetry remains open  
**Certificate:** [verify_pairing_exchange_can_cancel_inclusive_majorana_quartet_but_signed_differential_weight_restores_it.mjs](scripts/verify_pairing_exchange_can_cancel_inclusive_majorana_quartet_but_signed_differential_weight_restores_it.mjs)

## Executive result

The Pfaffian cross term can be nonzero differentially and still disappear from an inclusive observable.

Let the two coherent composite paths be

\[
\mathcal A(\Phi)=P(\Phi)p+Q(\Phi)q,

\]

where \(\Phi\) denotes phase-space variables and

\[
p=F_{\alpha\alpha}F_{\beta\beta},
\qquad
q=F_{\alpha\beta}^2.

\]

The CP-conjugate differential rate difference is

\[
\Delta_{CP}(\Phi)
=-4\operatorname{Im}[P(\Phi)Q(\Phi)^*]
\operatorname{Im}(pq^*).

\]

Suppose phase space has a measure-preserving involution \(\tau\) that exchanges the two kinematic pairings:

\[
P(\tau\Phi)=Q(\Phi),
\qquad
Q(\tau\Phi)=P(\Phi).

\]

Then

\[
\operatorname{Im}[P(\tau\Phi)Q(\tau\Phi)^*]
=-\operatorname{Im}[P(\Phi)Q(\Phi)^*],

\]

and therefore

\[
\boxed{
\int d\Phi\,\Delta_{CP}(\Phi)=0
}

\]

for an exchange-symmetric measure and acceptance.

The weak quartet survives pointwise. It is the inclusive integration that erases it.

## 1. Explicit routed-propagator toy

Use one exchange-odd routing variable \(x\in[-1,1]\) and a Breit–Wigner-like denominator

\[
D(y)=\frac{1}{y+i\Gamma}.

\]

Take

\[
P(x)=D(x-a),
\qquad
Q(x)=P(-x)=D(-x-a).

\]

Then

\[
P(-x)Q(-x)^*
=\left(P(x)Q(x)^*\right)^*,

\]

so its imaginary part is exactly odd.

The executable certificate verifies:

- a nonzero differential CP density;
- exact oddness under \(x\mapsto-x\);
- zero symmetric inclusive integral;
- a nonzero signed moment;
- a nonzero half-space integral;
- and a nonzero inclusive result when the two widths are deliberately made unequal.

## 2. Signed differential observable

Choose an exchange-odd weight

\[
w(\tau\Phi)=-w(\Phi).

\]

Then

\[
w(\Phi)\Delta_{CP}(\Phi)

\]

is exchange even, and

\[
\boxed{
\mathcal A_w
=\int d\Phi\,w(\Phi)\Delta_{CP}(\Phi)
}

\]

can be nonzero.

In the toy model, \(w(x)=\operatorname{sgn}x\) extracts the lost orientation.

Equivalently, one may retain separate \(x>0\) and \(x<0\) bins rather than summing them.

## 3. What can break the cancellation

The inclusive cancellation is absent if the exchange relation is broken by:

- unequal propagator masses or widths;
- source labels that distinguish the pairings;
- asymmetric detector acceptance or analysis cuts;
- different spin/polarization weights;
- nonidentical momentum routings;
- or additional connected diagrams.

Such breaking can make the unweighted integral nonzero. It can also introduce CP-even instrumental asymmetries, so a conjugate-process comparison remains essential.

## 4. Relation to the positive carrier

At every differential phase-space point, the two-path amplitude defines the positive carrier of document 733. The phase-space involution reflects its CP-odd coordinate:

\[
y(\tau\Phi)=-y(\Phi).

\]

An unweighted inclusive sum can therefore project the carrier onto its even axis, despite a nonzero odd coordinate pointwise.

The signed moment is a relational orientation measurement: it weights the two halves of phase space oppositely before aggregation, preserving the odd Jordan coordinate.

## 5. Experimental lesson

An inclusive null result would not by itself prove the Majorana quartet vanishes. It may reflect:

- pairing-exchange symmetry;
- angular or momentum integration;
- decoherence;
- or absence of a kinematic phase.

The correct analysis must inspect fully differential distributions and construct exchange-odd optimal observables.

## 6. Stop-everything criteria

Stop interpreting a vanishing inclusive CP asymmetry as a vanishing weak quartet without testing pairing exchange.

Stop integrating over a variable whose sign labels the two orientations before constructing an odd moment.

Stop using asymmetric cuts as evidence of CP violation without conjugate-process and detector-control subtraction.

Stop the proposed signed observable if the full amplitude has no well-defined measure-preserving pairing involution.

## 7. Highest-value next calculations

1. Identify the pairing-exchange variable in an explicit four-source kinematic parameterization.
2. Construct the optimal weight proportional to the calculated CP-odd differential kernel.
3. Test the cancellation with spin and polarization sums included.
4. Add heavy-neutrino widths and compare symmetric versus nondegenerate resonances.
5. Determine whether a decay cascade supplies a cleaner exchange-odd variable than scattering.

## Companion documents

- [Four-mode Pfaffian interference](734_the_four_mode_majorana_pfaffian_contains_the_quartet_interference_but_a_cp_rate_asymmetry_needs_a_relative_kinematic_phase.md)
- [Positive two-copy LNV interferometer](733_a_two_copy_lnv_interferometer_embeds_the_minimal_majorana_cp_quartet_in_a_positive_h2r_carrier.md)
- [Minimal LNV amplitude quartet](732_a_two_flavor_lnv_amplitude_quartet_is_the_minimal_rephasing_invariant_majorana_cp_observable_and_avoids_charged_lepton_mass_spurions.md)
