# One-Form Center Symmetry and Theta-Pi Anomalies Constrain Phases but Do Not Prove the Mass Gap

**Date:** 21 October 2026

**Gates:** A1, A2, A3, A4, A6, A7, A8 and A11

**Status:** exact symmetry/anomaly implication audit with a finite countermodel; this route becomes an input to a proof rather than a proof shortcut

**Depends on:** [the constructive Yang--Mills gate](../1500-1599/1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md), [the topological shared-scale no-go](1601_topological_charge_and_theta_angles_do_not_protect_a_qcd_spin23_or_cosmological_shared_scale.md), and [the functional physical-spectrum gate](1609_functional_mass_generation_gives_gauge_fixed_screening_not_by_itself_the_yang_mills_hamiltonian_gap.md)

**Evidence:** [one-form/anomaly boundary ledger](../../../evidence/data/spin23-one-form-anomaly-mass-gap-boundary.json) and [deterministic verifier](../../../verification/verify/verify_spin23_one_form_anomaly_mass_gap_boundary.mjs)

## Result

Generalized symmetry is a sharper language for confinement than an appeal to a
group name.  In pure (SU(N)) Yang--Mills, Wilson lines are charged under a
(Z_N) one-form center symmetry.  An unbroken center is compatible with an
area law.  At \(\theta=\pi\), the mixed center/CP anomaly additionally forbids a
unique, trivial, gapped vacuum preserving both symmetries.

Neither statement supplies the missing mass-gap theorem:

\[
 \boxed{\text{center realization + anomaly matching}
 \quad\not\Rightarrow\quad
 \inf(\operatorname{spec}H_{\rm phys}\setminus\{0\})>0.}
\]

The anomaly is a constraint on possible infrared realizations, not a selector
among them.  It can be matched by degenerate CP-breaking gapped vacua, broken
center symmetry, topological order, or gapless degrees of freedom.  At
\(\theta=0\), the special mixed anomaly is absent and therefore cannot prove the
Clay statement there.

## An explicit logical countermodel

Take any sector having a nonzero string tension and unbroken one-form center,
and tensor it with a center-neutral massless scalar.  The Wilson-loop order of
the first sector is unchanged, while in a periodic box of length (L) the
neutral sector has

\[
 \Delta_{\rm neutral}(L)={2\pi\over L}.
\]

For (L=(8,16,32,64,128)), the verified gaps are

\[
 (0.785398,0.392699,0.196350,0.098175,0.0490874),
\]

and tend to zero.  Thus an area-law sector and an unbroken center can coexist
with a gapless center-neutral local spectrum.  This countermodel is not pure
Yang--Mills; that is precisely its logical use.  It proves that center data
alone cannot establish the proposition.  Pure-Yang--Mills dynamics must still
exclude such neutral infrared behavior.

Likewise, a topological theory on a \(\theta=\pi\) domain wall can match anomaly
inflow while carrying no information fixing the bulk (0^{++}) glueball mass.
Anomaly matching is invaluable for rejecting candidate phases, but it does
not generate a dimensional lower bound.

## What the route genuinely adds

This arm is not empty.  It sharpens a constructive or numerical programme:

1. classify the exact one-form symmetry after matter and global-form choices;
2. determine its realization using Wilson/'t Hooft lines;
3. enforce the \(\theta=\pi\) mixed anomaly and domain-wall inflow;
4. reconstruct positive correlators of center-neutral local operators; and
5. prove that their infinite-volume spectral measures have no support in a
   common interval ((0,\Delta)).

The first three steps prune infrared phases.  Only the last two establish the
bulk Hamiltonian gap.

## Why it does not bridge to Spin(2,3)

The relevant centers already fail to match: pure color (SU(3)) has (Z_3),
whereas the simply connected group covering the (SO(2,3)) identity component
has (Z_2).  More importantly, equality of centers would still not identify
real forms, kinetic signatures, line-operator spectra, BRST cohomology, or
Hamiltonians.  Fundamental quarks explicitly break the pure-(SU(3))
one-form symmetry, while the broken gravitational sector must retain its
massless spin-2 pole.  No color mass scale is transported by center data.

The legitimate Spin(2,3) connection is methodological: determine generalized
symmetries and anomalies of the *specified broken action*, including defects,
then use them to veto inconsistent gapped auxiliary phases.  They cannot make
the required massless Einstein sector disappear and cannot replace its
positive-residue spectrum calculation.

## Reopening condition

This route becomes proof-bearing only when its phase classification is joined
to a positive gauge-invariant reconstruction and a uniform lower spectral
bound for every center-neutral channel.  Until then it is a powerful filter,
not a mass-gap or shared-scale mechanism.

## Primary sources

- D. Gaiotto, A. Kapustin, N. Seiberg and B. Willett, [*Generalized Global Symmetries*](https://arxiv.org/abs/1412.5148).
- D. Gaiotto, A. Kapustin, Z. Komargodski and N. Seiberg, [*Theta, Time Reversal, and Temperature*](https://arxiv.org/abs/1703.00501).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_one_form_anomaly_mass_gap_boundary.mjs
~~~
