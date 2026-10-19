# The Odd-Frequency Half-Poles Give a Conditional Wall Spectrum, but the Underived Edge Length Controls Even the Level Ordering

**Date:** 18 October 2026  
**Branches:** odd-frequency convolution, half-pole scales, paired-wall spectrum, six-cycle seam geometry, scale bridge  
**Claim status:** exact consequence of an explicitly conditional scale identification; no parameter-free physical prediction  
**Certificate:** [test_the_conditional_half_pole_to_paired_wall_scale_bridge.mjs](scripts/test_the_conditional_half_pole_to_paired_wall_scale_bridge.mjs)

## Executive result

The exact paired-wall spectrum can be connected algebraically to the two internal half-pole scales, but not canonically.

The odd-frequency convolution branch supplies

\[
b_1=\frac12,\qquad
b_2=\frac{(1+\sqrt2)^2}{2}
=\frac{3+2\sqrt2}{2},
\]

with

\[
\frac{b_2}{b_1}=3+2\sqrt2.
\]

Make three explicit assumptions:

1. \(c=1\) converts each internal frequency scale \(b_i\) into a spatial inverse localization length \(m_i=b_i\);
2. one edge of the placement six-cycle has physical length \(a\);
3. the minimal two-edge seam separation becomes \(L=2a\).

Then

\[
\ell_i=m_iL=2ab_i,
\]

and the exact levels are

\[
E_i=b_i\,y(2ab_i),
\qquad
y(\ell)=e^{-\ell\sqrt{1-y(\ell)^2}}.
\]

This is a one-parameter family, not a prediction. More sharply, the level ordering itself depends on \(a\). There is a unique numerical crossing

\[
\boxed{a_*\approx0.3385649179}
\]

in the chosen pole units, with

\[
a<a_*:\quad E_2>E_1,
\]

\[
a>a_*:\quad E_2<E_1.
\]

Thus the graph statement “the seams are two edges apart” cannot be substituted for a continuum distance. The edge-length conversion is a physically decisive missing datum.

## 1. Why the half-scale proposal is attractive

The exact odd-frequency factorization placed its two internal poles at half the external defect scales. The paired-wall problem independently turns an inverse decay scale into a localized-mode width. Both structures therefore contain positive quantities with dimensions of inverse time or inverse length.

In relativistic units, it is natural to test

\[
m_i\stackrel{?}{=}b_i.
\]

This is a valid branch to explore, but dimensional compatibility is not a typed intertwiner. The pole belongs to an internal-frequency convolution; the wall mass belongs to a spatial Dirac generator. A microscopic kinetic term must relate them.

## 2. The graph-to-continuum conversion

The placement classification fixes the minimal oriented separation to two edges. It does not assign a physical size to an edge.

Writing

\[
L=2a
\]

exposes the missing conversion factor rather than silently setting it to one. The two dimensionless wall separations become

\[
\ell_1=a,
\qquad
\ell_2=(3+2\sqrt2)a.
\]

The silver ratio therefore magnifies the same unknown edge length differently in the two channels.

## 3. Exact conditional spectrum

For each candidate mass \(b_i\), document 1054 gives

\[
\frac{E_i}{b_i}
=\exp\!\left[
-2ab_i\sqrt{1-\left(\frac{E_i}{b_i}\right)^2}
\right].
\]

At large \(a\),

\[
E_i\sim b_i e^{-2ab_i}.
\]

The larger pole scale \(b_2\) then localizes much more tightly and its inter-wall tunnelling becomes exponentially smaller. At very small \(a\), both bound levels approach their continuum thresholds, so \(E_i\to b_i\) and the larger scale has the larger energy. Continuity therefore forces an ordering reversal.

Numerical solution of the exact implicit equations gives the unique crossing \(a_*\) above.

## 4. Unit-edge illustration is not a prediction

If one merely chooses \(a=1\), then

\[
\ell_1=1,
\qquad
\ell_2=3+2\sqrt2\approx5.828427.
\]

The exact conditional energies are

\[
E_1\approx0.19994564,
\qquad
E_2\approx0.00857588.
\]

The second level is then roughly \(4.29\%\) of the first. These numbers are useful for checking the map, but have no physical status until the edge unit is derived.

## 5. What would make the bridge real

A source-derived scale bridge needs all of:

- a kinetic operator identifying the internal pole variable with the wall's spatial momentum or Euclidean decay variable;
- a normalization fixing \(m_i/b_i\), rather than only proportionality;
- a geometric or dynamical derivation of the edge length \(a\);
- evidence that the two pole modes correspond to two physical wall channels rather than two terms inside one convolution;
- compatibility with the reflection-completed CI symmetries.

The strongest version would derive one boundary action whose propagator has the known half-poles and whose spatial mass defect is the response Pfaffian. Then \(a\) would be an output of the same action.

## 6. Stop-everything tests

**Common-action trigger:** one quadratic Furey/TKK boundary action produces both the pole denominators and the spatial Dirac transfer matrix. This would type the frequency-to-localization map.

**Edge calibration trigger:** a placement link acquires a source-derived proper time, optical length or correlation length. This fixes \(a\) and immediately produces two conditional levels.

**Ordering falsifier:** any claimed robust hierarchy \(E_2<E_1\) or \(E_2>E_1\) that does not first constrain \(a\) is unsupported; the exact family realizes both orderings.

**Mode-count warning:** the two half-poles may be a jet basis for one response rather than two independent wall species. If so, assigning a separate mass \(m_i=b_i\) to each is categorically wrong.

## Verdict

| Question | Verdict |
|---|---|
| Can the half-poles be inserted into the exact wall law? | **Yes, conditionally** |
| Does the two-edge seam fix \(L\)? | **Only as \(L=2a\) with unknown \(a\)** |
| Is there a parameter-free energy prediction? | **No** |
| Is even the level ordering fixed? | **No; it reverses at \(a\approx0.338565\)** |
| Highest-value next step? | **Derive one action linking internal frequency, spatial localization and edge transport** |

## Position in the corpus

- [signed odd-frequency convolution theorem](1034_the_tuned_defects_have_an_exact_signed_two_kernel_odd_frequency_convolution_but_no_single_positive_scalar_autocorrelation.md)
- [exact paired-wall spectrum](1054_the_exact_piecewise_pfaffian_kink_antikink_spectrum_obeys_an_implicit_exponential_law_and_calibrates_the_endpoint_projection.md)
- [minimal two-edge seam classification](1043_semilinearity_does_not_repair_an_all_edge_quarter_turn_but_a_minimal_same_face_twist_antitwist_pair_preserves_the_six_cycle.md)
