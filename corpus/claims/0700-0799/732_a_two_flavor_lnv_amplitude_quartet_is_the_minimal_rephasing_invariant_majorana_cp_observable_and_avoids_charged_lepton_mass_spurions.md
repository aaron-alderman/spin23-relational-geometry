# A Two-Flavor LNV Amplitude Quartet Is the Minimal Rephasing-Invariant Majorana-CP Observable and Avoids Charged-Lepton Mass Spurions

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the lower-order LNV-amplitude branch  
**Claim status:** exact amplitude-level rephasing minimality and deep-Euclidean matching; coherent experimental extraction remains open  
**Certificate:** [verify_lnv_two_flavor_quartet_is_minimal_rephasing_invariant_cp_odd_amplitude.mjs](../../../verification/verify/verify_lnv_two_flavor_quartet_is_minimal_rephasing_invariant_cp_odd_amplitude.mjs)

## Executive result

The high spurion order of the vacuum weak-basis scalar (I_2) is not the minimum order at which Majorana CP can appear in a physical **flavor-labelled lepton-number-violating amplitude**.

For

\[
W^-W^-\to\ell^-_\alpha\ell^-_\beta,

\]

the symmetric Majorana-exchange flavor kernel is

\[
F_{\alpha\beta}(q^2)
=\sum_iU_{\alpha i}U_{\beta i}
\frac{m_i}{q^2-m_i^2}.

\]

For two charged flavors (alpha,eta), the minimal rephasing-invariant CP-odd polynomial is

\[
\boxed{
J^F_{\alpha\beta}(q^2)
=\operatorname{Im}
\left[
F_{\alpha\alpha}
F_{\beta\beta}
\left(F_{\alpha\beta}^*\right)^2
\right].
}

\]

The exhaustive charge-balance certificate proves that no degree-one, degree-two or degree-three monomial in

\[
F_{\alpha\alpha},
\quad
F_{\alpha\beta},
\quad
F_{\beta\beta}

\]

and their conjugates is both rephasing invariant and genuinely complex. Degree four is minimal.

This observable uses four Majorana-exchange amplitudes but no charged-lepton mass spurions: the external charged-flavor labels supply the operational flavor frame.

## 1. Charged-flavor rephasing

Under

\[
\ell_\alpha\mapsto e^{i\theta_\alpha}\ell_\alpha,

\]

the kernel transforms as

\[
F_{\alpha\beta}
\mapsto
e^{i(\theta_\alpha+\theta_\beta)}F_{\alpha\beta}.

\]

Therefore

\[
F_{\alpha\alpha}F_{\beta\beta}(F_{\alpha\beta}^*)^2

\]

has zero charge under both independent rephasings.

Complex conjugation sends

\[
J^F_{\alpha\beta}\mapsto-J^F_{\alpha\beta}.

\]

It is a legitimate CP-odd amplitude invariant.

## 2. Why lower degree fails

At degree two, the balanced monomials are channel magnitudes such as

\[
|F_{\alpha\alpha}|^2,
\quad
|F_{\alpha\beta}|^2,
\quad
|F_{\beta\beta}|^2,

\]

which are real.

There is no balanced degree-three monomial. Charge conservation requires each external flavor phase to appear equally often in amplitudes and conjugate amplitudes. The loop-plus-doubled-edge quartet is the first nontrivial closed relational graph.

This is the amplitude analogue of a two-vertex multigraph with one loop at each vertex and the connecting edge traversed twice in the opposite orientation.

## 3. Deep-Euclidean relation to the mass-pair invariant

For (q^2=-Q^2) and (Q^2\gg m_i^2),

\[
F(-Q^2)
=-\frac{M_\nu^*}{Q^2}
+O(Q^{-4}).

\]

Hence

\[
\boxed{
J^F_{\alpha\beta}(-Q^2)
=-rac{1}{Q^8}
\operatorname{Im}
\left[
(M_\nu)_{\alpha\alpha}
(M_\nu)_{\beta\beta}
\left((M_\nu)_{\alpha\beta}^*\right)^2
\right]
+O(Q^{-10}).
}

\]

This is precisely the complex conjugate of the charged-lepton-frame pair invariant used earlier, now realized as a physical LNV amplitude relation.

## 4. Why this avoids (H_\ell)

A vacuum weak-basis scalar has no external flavor labels. It must use (H_\ell) to define the charged-lepton frame invariantly.

The scattering amplitude already has physical external labels (ell_\alpha,ell_\beta), defined by the observed charged-lepton mass eigenstates. Rephasing invariance is still required, but explicit charged-lepton mass factors are not.

Accordingly:

| object | Majorana order | charged-lepton-mass order |
|---|---:|---:|
| vacuum scalar (I_2) | 4 | 4 |
| LNV amplitude quartet (J^F_{\alpha\beta}) | 4 amplitudes linear in (m_\nu) | 0 explicit mass spurions |

The price is that the result is not a flavor-blind vacuum coefficient. It is an external-channel observable.

## 5. Measurement remains nontrivial

Each isolated rate measures

\[
|F_{\alpha\beta}|^2

\]

and is blind to the sign of (J^F_{\alpha\beta}).

Extracting the quartet requires relative phase information among

\[
F_{\alpha\alpha},
\quad
F_{\beta\beta},
\quad
F_{\alpha\beta}.

\]

Possible mechanisms include:

- coherent charged-flavor superpositions;
- a calibrated LNV reference amplitude;
- a common multi-path decay or scattering process;
- or an analogue simulator of the symmetric flavor kernel.

Absorptive phases must be separated by conjugate-process comparison or dispersive analysis.

## 6. Relation to the spectral (H_2(\mathbb R)) carrier

For two selected flavor channels, coherent amplitude vectors can be Gram-compressed into

\[
\rho=
\begin{pmatrix}
\|a\|^2&\operatorname{Re}\langle a,b\rangle\\
\operatorname{Re}\langle a,b\rangle&\|b\|^2
\end{pmatrix}
\in H_2(\mathbb R)_+.

\]

But an ordinary two-channel Gram at one setting contains only one cross coherence. The quartet needs either several calibrated settings or an enlarged coherent network that preserves all three complex amplitudes.

Thus the LNV kernel supplies the phase at lower spurion order, while the (H_2(\mathbb R)) response supplies positivity. Their full operational merger remains a multi-setting tomography problem.

## 7. Branch consequences

### Vacuum stress branch

Retain (I_2) as the leading scalar coefficient in the standard covariant algebra. It is high order and likely extremely suppressed.

### Flavor-labelled LNV branch

Use (J^F_{\alpha\beta}) as the lower-order Majorana CP observable. It is physically more direct but experimentally demanding.

### Three-flavor triangle branch

The six-amplitude invariant of document 342 remains the natural three-port holonomy. The quartet is lower degree but probes only a two-flavor face.

### Heavy-state branch

Heavy Majorana resonances can amplify (F_{\alpha\beta}). Their mixing and absorptive phases must be included without confusing resonance phases with CP-odd weak phases.

## 8. Stop-everything criteria

Stop claiming that every physical Majorana CP observable requires charged-lepton mass spurions; external flavor labels can replace them operationally.

Stop treating the quartet as a vacuum weak-basis scalar; it belongs to a flavor-labelled amplitude.

Stop claiming rate measurements determine its sign.

Stop multiplying amplitudes evaluated at inequivalent kinematics without a common normalization.

Stop the light-neutrino experimental branch if no coherent phase-comparison process can be constructed, while retaining the exact amplitude invariant.

## 9. Highest-value next calculations

1. Construct a minimal coherent three-setting protocol extracting the quartet from two charged flavors.
2. Determine whether a common physical process contains all required paths at identical kinematics.
3. Extend the Gram carrier to include the reference phase without leaving positivity.
4. Compare quartet sensitivity with the six-amplitude three-flavor triangle.
5. Test heavy-neutrino resonance enhancement while subtracting absorptive phases.

## Companion documents

- [Same-sign weak-boson scattering carries the Majorana triangle](../0300-0399/342_same_sign_weak_boson_scattering_carries_the_majorana_triangle_at_amplitude_level.md)
- [Weak-basis pair invariant status](717_a_majorana_cp_invariant_exists_with_two_families_and_generically_misaligns_the_up_neutral_response_if_it_matches_the_odd_axis.md)
- [Lowest-degree vacuum trace-word theorem](731_i2_is_the_lowest_degree_cp_odd_single_trace_in_the_standard_hl_hnu_glnu_covariant_algebra_so_that_shortcut_is_closed.md)
- [Spectral half-trace carrier](729_half_the_trace_of_a_positive_two_probe_spectral_gram_is_the_canonical_carrier_coordinate_but_z2_matching_remains_a_form_factor_gate.md)
