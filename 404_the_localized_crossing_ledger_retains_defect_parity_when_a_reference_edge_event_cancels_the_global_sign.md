# The Localized Crossing Ledger Retains Defect Parity When a Reference-Edge Event Cancels the Global Sign

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** finite localization-filtered mod-two ledger established on a declared parameter interval; continuum spectral-flow theorem remains open

## 1. The declared path

Consider the selector-coefficient interval

\[
\delta:1.2\longrightarrow1.3
\]

at fixed

\[
M=2,\qquad r=m_0=0.8,\qquad\mu=0.7.
\]

This interval contains the localized defect root for circumferences
\(L=2,3,4\). At \(L=4\), it also contains the remote reference-edge root that
previously contaminated the global relative Pfaffian.

That makes the interval an exact test of whether localization filtering retains
the physical defect event.

## 2. Three parity ledgers

Define endpoint parities

\[
\nu_{\rm def}
=\frac{1-s_{\rm def}(1.2)s_{\rm def}(1.3)}2,
\]

\[
\nu_{\rm ref}
=\frac{1-s_{\rm ref}(1.2)s_{\rm ref}(1.3)}2,
\]

and

\[
\nu_{\rm global}
=\frac{1-\mathcal Q_{\rm rel}(1.2)
\mathcal Q_{\rm rel}(1.3)}2.
\]

Because \(\mathcal Q_{\rm rel}=s_{\rm ref}s_{\rm def}\),

\[
\nu_{\rm global}
=\nu_{\rm def}\oplus\nu_{\rm ref}.
\]

The computed ledger is

| \(L\) | defect parity | reference parity | global relative parity |
|---:|---:|---:|---:|
| 2 | 1 | 0 | 1 |
| 3 | 1 | 0 | 1 |
| 4 | 1 | 1 | 0 |

The local defect event is stable across circumference. The global parity loses
it at \(L=4\) because the reference-edge event contributes a second crossing.

## 3. The defect root remains localized

The defect roots are approximately

\[
1.263992\quad(L=2),\qquad
1.261130\quad(L=3),\qquad
1.257363\quad(L=4).
\]

Their paired-nullspace profiles satisfy:

- more than \(50\%\) weight on the central row;
- more than \(28\%\) on the two defect-core sites;
- less than \(12\%\) on the two outer rows.

The crossing identity is therefore stable even though the root drifts slightly.

## 4. The canceling reference root is an edge event

At \(L=4\), the reference root

\[
\delta_{\rm ref}\approx1.250488
\]

has:

- more than \(73\%\) weight on the outer rows;
- less than \(3\%\) on the central row;
- exactly uniform circumference density within numerical precision.

It is not a second defect event. Its contribution belongs in the reference-edge
ledger.

## 5. The localization-filtered event invariant

On this declared interval, define

\[
\nu_{\rm local-defect}
=\#\{\text{zero crossings with defect-localized paired projector}\}
\bmod2.
\]

The result is

\[
\boxed{\nu_{\rm local-defect}=1}
\]

for \(L=2,3,4\), even though the global relative endpoint parity becomes zero
at \(L=4\).

This is the finite local spectral-flow quantity that the global Pfaffian could
not supply on its own.

## 6. Status of the localization rule

The present classification uses strong spatial separation rather than a
universal numerical threshold. Defect and edge weights differ by large margins
in the tested systems.

For a theorem, the localization filter should be replaced by one of:

- a Riesz projector for an isolated local spectral subspace;
- exponential localization bounds uniform in volume;
- a trace per defect region with an error bound vanishing as the boundary
  recedes;
- a scattering or transfer-matrix spectral-flow formulation.

The finite ledger is robust evidence, not yet the infinite-volume definition.

## 7. Relation to the radial phase

Throughout this interval the radial localizer remains in its nontrivial defect
phase. It supplies the stable local environment; the crossing ledger supplies
the parity-changing event inside that environment.

Thus the two-layer structure is operational:

\[
\boxed{
\text{radial phase}\quad+quad
\text{localization-filtered spectral flow}.
}

The edge event affects the global comparison but neither the radial defect phase
nor the local defect-event count.

## 8. Consequence for the causal value

The normalized causal value \(\delta=1.25\) is the lower endpoint neighborhood
of a path containing one localized defect crossing. At the largest tested
circumference it also lies just below a reference-edge crossing.

The meaningful statement is therefore:

- the source value lies in the radial defect phase;
- increasing \(\delta\) from \(1.25\) to \(1.3\) crosses one localized defect
  event modulo two;
- the open-strip global sign may or may not change because of remote edge flow.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** prove a volume-uniform localized spectral-flow
index whose finite restriction equals this ledger and whose mod-two value is
forced by the source-normalized path.

**Global-sign falsifier:** infer zero defect parity at \(L=4\) from the canceled
global relative sign.

**Localization falsifier:** count the reference-edge root as a defect event.

**Threshold falsifier:** present the finite weight cutoffs as universal without
an exponential localization or Riesz-projector theorem.

**Path falsifier:** quote \(\nu_{\rm local-defect}=1\) without specifying the
parameter interval and fixed Hamiltonian coefficients.

## 10. Pinned dependency and continuation

Pin the continuum local spectral-flow theorem. The next calculation should
construct the isolated two-dimensional crossing projector over the interval,
track it continuously, and quantify its leakage outside a fixed defect region
as \(L,M\) grow.

## 11. Certificate

The [localized crossing-ledger certificate](scripts/verify_localized_crossing_ledger_separates_defect_edge_global_parity.mjs)
checks endpoint parities, spatial classifications and the XOR relation between
defect, reference and global ledgers.

## Companion documents

- [Radial phase versus bound-state parity](403_the_radial_localizer_classifies_the_defect_phase_but_does_not_count_the_bound_state_parity_flip.md)
- [Reference-edge contamination](394_circumference_scaling_preserves_the_defect_root_but_exposes_reference_boundary_contamination.md)
- [Defect-localized crossing](393_the_upper_pin_boundary_is_defect_localized_and_nearly_converged_in_transverse_width.md)
