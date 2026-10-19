# Only an Independent Covariant Second Leg Supplies the Full Bilocal C² Carrier at Fixed Frequency

**Date:** 17 October 2026  
**Branches:** bilocal carrier, topology exchange, sideband reality, propagator dressing, Higgs dressing, and boundary sources  
**Claim status:** exact fixed-condition image-dimension classification for the minimal candidates; physical source selection remains open  
**Certificate:** [classify_candidate_second_legs_for_the_bilocal_c2_response_by_fixed_frequency_image_dimension.mjs](scripts/classify_candidate_second_legs_for_the_bilocal_c2_response_by_fixed_frequency_image_dimension.mjs)

## Executive result

The second bilocal leg cannot be supplied by simply reusing the first leg through the already available neutral exchange, conjugate sideband, scalar propagator, or colorless Higgs dressing. At fixed frequency each of those choices collapses the response to at most two real dimensions.

The full carrier

\[
B(v,w)=\left(\bar w_sv_s,w_t^\dagger v_t\right)\in\mathbb C^2
\]

has an open four-real-dimensional image only when \(w\) is an independent color-covariant leg—or when the dynamics supplies an equivalent independent degree of freedom.

Thus

\[
\boxed{
\text{full bilocal }\mathbb C^2
\Longrightarrow
\text{two independent covariant source/boundary legs}.
}
\]

## 1. Independent-leg surjectivity

For any target pair \((u,z)\in\mathbb C^2\), choose

\[
v_s=1,
\qquad
v_t=(1,0,0),
\]

and

\[
w_s=\bar u,
\qquad
w_t=(\bar z,0,0).
\]

Then

\[
\bar w_sv_s=u,
\qquad
w_t^\dagger v_t=z.
\]

The bilocal map is therefore surjective onto \(\mathbb C^2\) when the two legs can be chosen independently.

## 2. Neutral exchanged topology

On the completed matter module, the established neutral Furey exchange preserves each named particle amplitude. If it is used to define

\[
w=S(v),
\]

then at this level \(w=v\), giving

\[
B(v,v)=\left(|v_s|^2,\|v_t\|^2\right).
\]

Both outputs are real and nonnegative. The image is two-real-dimensional, not four.

The neutral exchange remains essential for Hermitianizing the two-topology response, but it cannot by itself provide the independent relational phase required here.

## 3. Constrained negative-frequency sideband

The physical negative-frequency sideband is determined antiunitarily by the positive-frequency data. It is not a second freely transformed fundamental leg.

Using the gauge-compatible pairing of a triplet with its constrained conjugate reduces the result to a norm/population. Treating \(q^Tq\) as the contraction would retain a complex number but would fail full \(SU(3)\) invariance.

Thus the sideband double restores real-time reality but does not supply an independent complex triplet overlap. Reusing it as \(w\) would double-count constrained data while still failing the four-dimensional image test.

## 4. One-body propagator

Let

\[
w=G(\omega)v
\]

with \(G\) gauge covariant. Schur's lemma makes its action on one irreducible triplet scalar:

\[
w_t=g_t(\omega)v_t.
\]

Then

\[
w_t^\dagger v_t
=
\bar g_t(\omega)\|v_t\|^2.
\]

At fixed frequency this lies on one fixed complex ray. The singlet contributes another fixed ray. Only two nonnegative magnitudes vary, so the image again has real dimension two.

Frequency variation can sweep a larger family, but it does not provide a four-real local carrier at one response fiber.

## 5. Higgs dressing

The Standard-Model Higgs is a color singlet. Multiplying an existing source by a Higgs background can repair weak and hypercharge typing, but it cannot independently choose a color-triplet reference direction.

A Higgs-dressed colored fermion could supply such a leg, but then the independent colored fermion/source—not the Higgs alone—is doing the required work.

## 6. Viable candidates

The surviving physical realizations are:

1. two independently prepared color-covariant source insertions;
2. two boundary ports carrying the same color representation;
3. two topology amplitudes that remain independent before the neutral exchange constraint is imposed;
4. an auxiliary colored response field with its own state space;
5. a cut or intermediate-state construction whose two on-shell legs are independently summed before forming the singlet contraction.

Each must still satisfy no-mirror counting, causal normalization and the Standard-Model charge assignments.

## 7. Stop-everything criteria

**Positive trigger:** identify two existing, independently variable Furey/Standard-Model source legs and derive the two complex contractions with nonzero rank-four response Jacobian.

**Boundary trigger:** derive them as physical incoming/outgoing or left/right boundary ports and match their flux normalization to the Redheffer channels.

**Negative trigger:** every admissible second leg is fixed antiunitarily or linearly by the first. Then the bilocal response has dimension at most two per frequency and cannot realize the selector carrier.

**Falsifier:** a constrained candidate listed above exhibiting an open four-real image at fixed external conditions, or failure of the independent-leg surjectivity witness.

## 8. Verdict

| Candidate second leg | Fixed-frequency real image dimension | Verdict |
|---|---:|---|
| Independent covariant leg | 4 | **viable** |
| Independent boundary/source port | 4 | **viable** |
| Neutral exchanged copy | 2 | **insufficient alone** |
| Constrained conjugate sideband | 2 | **insufficient and not independent** |
| Gauge-covariant scalar propagator | 2 | **insufficient at one fiber** |
| Colorless Higgs alone | at most 2 | **cannot supply triplet reference** |

## 9. Position in the corpus

- [minimal bilocal gauge-singlet carrier](855_no_linear_full_color_singlet_four_quotient_exists_but_the_minimal_bilocal_response_is_c2_with_canonical_j0.md)
- [selector action on the bilocal carrier](856_the_minimal_bilocal_c2_carrier_supports_the_full_selector_as_typed_two_mode_bogoliubov_transformations.md)
- [sideband doubling is required for real-time reality](829_the_redheffer_orbit_preserves_sampled_schur_passivity_but_requires_explicit_sideband_doubling_for_real_time_reality.md)
- [neutral exchange is a color singlet](840_the_established_neutral_exchanged_tro_response_is_a_color_singlet_and_cannot_supply_the_three_quadratic_twirl_legs.md)
- [positive quadratic pulses generate the exact selector](858_positive_quadratic_hamiltonian_pulses_generate_the_exact_bilocal_selector_without_finite_dimensional_instability.md)

