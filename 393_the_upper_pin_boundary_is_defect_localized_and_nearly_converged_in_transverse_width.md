# The Upper Pin Boundary Is Defect-Localized and Nearly Converged in Transverse Width

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** explicit finite-width zero-mode localization and root scaling; longitudinal and continuum limits remain open

## 1. The question resolved here

The four-band scan at transverse half-width \(M=1\) could not say whether its
Pfaffian roots were defect modes, outer-boundary modes, regulator levels or
extended finite-volume states.

This calculation diagonalizes

\[
B=A^T A=-A^2
\]

at a Pfaffian root, where \(A\) is the real antisymmetric Majorana matrix in one
glide sector. A simple antisymmetric zero crossing has a two-dimensional null
space, so localization is computed from the projector onto the two lowest
eigenvectors, not from an arbitrary member of that pair.

That basis-invariant choice matters: the individual zero vectors may rotate,
but their summed spatial density does not.

## 2. The upper boundary that contains the causal checkpoint

At fixed

\[
L=2,\qquad r=m_0=0.8,\qquad \mu=0.7,
\]

the defect-Pfaffian root above \(\delta=1.25\) behaves as follows:

| \(M\) | upper root | central-row weight | two-core-site weight | outer-edge weight | effective sites |
|---:|---:|---:|---:|---:|---:|
| 1 | 1.321239 | 0.5684 | 0.3486 | 0.4316 | 9.22 of 12 |
| 2 | 1.263992 | 0.5111 | 0.3399 | 0.1010 | 10.79 of 20 |
| 3 | 1.266541 | 0.5234 | 0.3248 | 0.0189 | 11.05 of 28 |

The two defect-core sites are \((x,y)=(0,0)\) and \((L,0)\), where both
texture masses vanish.

Three observations occur together:

1. the core retains roughly one third of the total zero-pair weight;
2. the effective support saturates near eleven sites while the lattice grows
   from 12 to 28 sites;
3. outer-edge weight falls from \(43.2\%\) to \(1.9\%\).

This is the spatial signature expected of a defect-localized crossing, not an
outer-boundary resonance.

## 3. Root convergence

The first width enlargement produces a substantial shift,

\[
1.321239\longrightarrow1.263992,
\]

but the next changes the root by only

\[
1.266541-1.263992\approx0.00255.
\]

Thus the upper root is nearly converged in transverse width over the sizes
computed. This is meaningful positive evidence, but not yet a continuum
theorem: \(L\) remains fixed, only three widths have been tested, and regulator
scaling has not been performed.

## 4. A control crossing is extended

At \(M=2\), the low-\(\delta\) defect root is

\[
\delta_{\rm low}\approx0.120847.
\]

Its zero-pair density has:

- effective support \(19.70\) of 20 sites;
- core weight \(0.0995\), equal to the uniform two-of-twenty baseline \(0.1\);
- central-row weight \(0.2143\), close to the uniform one-of-five-row baseline
  \(0.2\).

It is therefore an extended finite-volume crossing at this width. The
localization test is not merely labeling every Pfaffian root a defect state.

The \(M=1\) root at \(\delta\approx0.876560\), which formed the lower boundary
of the band containing \(1.25\), is also broad: its effective support is
\(11.44\) of 12 sites and its core weight is below the uniform baseline. The
band decomposition reorganizes when \(M\) increases, so it is not legitimate
to identify every finite-width lower root as one continuously tracked phase
boundary without a full spectral-flow matching.

## 5. Consequence for the causal checkpoint

At \(M=3\),

\[
1.25<1.266541,
\]

so the causal checkpoint remains on the nontrivial side of the localized upper
boundary. Its margin is now only

\[
1.266541-1.25\approx0.01654.
\]

This strengthens two conclusions at once:

- the nearby boundary is physically more credible because its crossing state
  is defect-localized and transversely stable;
- \(\delta=1.25\) remains a compatibility witness, not a robust prediction,
  because it lies very close to that boundary.

Small changes in normalization or in the remaining kernel coefficients could
move it across the transition.

## 6. What has and has not advanced

The earlier undifferentiated list of possible explanations can now be split.

**Advanced:** the upper root near \(1.266\) is strongly supported as a genuine
defect-localized level crossing in the regulated finite system.

**Demoted:** the low-\(\delta\), \(M=2\) root is not a localized defect
transition; it is an extended finite-volume event at the tested size.

**Still open:** whether the localized upper root defines a nonzero-width
continuum relative-Pfaffian phase, whether its boundary partner is at infinity
or another defect, and whether the source kernel fixes all normalized
coefficients so that \(1.25\) has predictive status.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** the localized root converges under simultaneous
\(L,M\) enlargement and regulator removal, while a source-derived normalized
kernel lands on a protected side without coefficient fitting.

**Localization falsifier:** outer-edge weight fails to decay or effective
support grows proportionally to volume at larger widths.

**Convergence falsifier:** the apparent \(M=2,3\) agreement disappears when
\(M\ge4\) or \(L\) increases.

**Phase falsifier:** a localized zero is treated as proving a stable phase
without showing that both neighboring bulk/reference gaps remain open.

**Prediction falsifier:** the small \(0.01654\) margin is described as robust
against uncomputed normalization and regulator corrections.

## 8. Pinned dependency and next calculation

Pin continuum language until the same localized boundary is tracked with
larger circumference \(L\) and across regulator parameters \(r,m_0,\mu\).

The next high-value calculation is two-dimensional finite-size scaling of this
specific root, rather than exhaustive scaling of every finite-volume crossing.
In parallel, the causal source should be extended from matching only \(\delta\)
to matching the complete normalized parameter tuple
\((r,m_0,\mu,\delta)\).

## 9. Certificates and exploration

The [localization certificate](scripts/verify_pin_pfaffian_crossing_localization.mjs)
checks the paired-nullspace localization, width decay of outer-edge weight,
near agreement of the \(M=2,3\) roots, the extended control crossing and the
remaining margin above \(1.25\).

The [localization exploration script](scripts/explore_pin_pfaffian_crossing_localization.mjs)
computes the full site, row and circumference profiles from the projected
Majorana matrices.

## Companion documents

- [Finite Pin phase-band scan](392_the_finite_pin_benchmark_has_four_pfaffian_bands_below_delta_two_and_the_causal_checkpoint_is_not_deep_inside_one.md)
- [Normalized causal Pin checkpoint](391_a_causal_inverse_propagator_can_land_exactly_on_a_verified_nontrivial_pin_checkpoint_after_canonical_normalization.md)
- [Finite nontrivial relative Pfaffian](383_the_regulated_pin_lattice_has_a_nontrivial_relative_pfaffian_phase_but_glide_and_car_do_not_force_it.md)
