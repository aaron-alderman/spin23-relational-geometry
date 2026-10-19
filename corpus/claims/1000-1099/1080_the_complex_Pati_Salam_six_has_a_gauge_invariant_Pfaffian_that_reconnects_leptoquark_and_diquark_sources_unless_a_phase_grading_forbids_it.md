# The Complex Pati–Salam Six Has a Gauge-Invariant Pfaffian That Reconnects Leptoquark and Diquark Sources Unless a Phase Grading Forbids It

**Date:** 18 October 2026  
**Branches:** spectral Pati–Salam scalar potential, complex \(\mathbf6\), proton safety, finite-geometry grading  
**Claim status:** exact invariant-theory classification; protection by the complete Model C spectral action remains unproved  
**Certificate:** [classify_hermitian_and_pfaffian_mixings_of_complex_pati_salam_sixes.mjs](../../../verification/classify/classify_hermitian_and_pfaffian_mixings_of_complex_pati_salam_sixes.mjs)  
**Primary sources:** [Chamseddine–Connes–van Suijlekom 2013](https://arxiv.org/abs/1304.8050), [Aydemir–Minic–Sun–Takeuchi 2018](https://arxiv.org/abs/1804.05844)

## Executive result

The NCG Pati–Salam source split of document 1079 is not protected by the Pati–Salam gauge group alone.

For a complex

\[
H\in\mathbf6\cong\Lambda^2\mathbb C^4,
\]

there are two qualitatively different quadratic contractions:

1. the Hermitian contraction \(H^dagger H'\), which pairs colour–lepton with colour–lepton and colour–colour with colour–colour;
2. the holomorphic epsilon contraction
   \[
   H^T JH'
   \propto
   \epsilon_{IJKL}H^{IJ}H'^{KL},
   \]
   which pairs colour–lepton with colour–colour.

The second contraction is an exact \(SU(4)\) invariant. In the broken phase it is precisely the bilinear that mixes a safe leptoquark component with its dangerous diquark companion.

Therefore

\[
\boxed{
SU(4)\text{ gauge invariance does not protect }K_{\mathrm{lq,dq}}=0.}
\]

There is, however, an equally exact minimal protector. A common phase action

\[
H_L,H_R\longmapsto e^{i\theta}(H_L,H_R)
\]

allows the useful Hermitian communication

\[
H_L^\dagger H_R
\]

but forbids the Pfaffian terms

\[
H_L^TJH_R,
\qquad
H_L^TJH_L,
\qquad
H_R^TJH_R.
\]

The decisive microscopic question is now precise: does the represented finite geometry and its full spectral action supply this phase/grading as an exact selection rule, or did the phenomenological model simply set a gauge-allowed Pfaffian coefficient small?

The primary literature currently supports only the cautious answer. The finite geometry derives the Yukawa-source separation; the 2018 phenomenological analysis explicitly assumes suppressed mixing with the diquark companion. The complete left–right Model C potential has not yet been reduced here far enough to promote the phase grading.

## 1. Exterior-square realization

Let

\[
\mathbb C^4
=
\mathbb C_c^3\oplus\mathbb C_\ell
\]

with exterior-square basis

\[
e_{12},e_{13},e_{23};e_{14},e_{24},e_{34}.
\]

The first three bivectors are colour–colour; the last three are colour–lepton.

Define

\[
B_\epsilon(x,y)
=
\frac12\epsilon_{IJKL}x^{IJ}y^{KL}
=x^TJy.
\]

In the ordered basis above,

\[
J=
\begin{pmatrix}
0&0&0&0&0&1\\
0&0&0&0&-1&0\\
0&0&0&1&0&0\\
0&0&1&0&0&0\\
0&-1&0&0&0&0\\
1&0&0&0&0&0
\end{pmatrix},
\qquad
J^2=I.
\]

It is entirely off-block:

\[
P_{cc}JP_{cc}=0,
\qquad
P_{lq}JP_{lq}=0,
\]

while

\[
P_{cc}JP_{lq}\ne0.
\]

Thus the epsilon pairing is not merely capable of mixing the two source types; it contains **only** cross-type pairings.

## 2. Exact \(SU(4)\) invariance

For \(g\in SU(4)\), the exterior-square representation satisfies

\[
(\Lambda^2g)^TJ(\Lambda^2g)=J
\]

because the four-index epsilon tensor is preserved by determinant-one transformations.

Infinitesimally, for every \(X\in\mathfrak{sl}_4\),

\[
(X^{(2)})^TJ+JX^{(2)}=0.
\]

The certificate verifies this identity on all fifteen generators. The dangerous pairing is therefore not a symmetry-breaking correction. It is allowed by the full Pati–Salam colour–lepton group.

This explains why the phenomenological statement “suppress the companion mixing” is a real extra condition. Representation theory does not set it to zero.

## 3. Hermitian and Pfaffian contractions do opposite jobs

For two complex sixes \(H_L,H_R\), the Hermitian contraction is

\[
H_L^\dagger H_R
=
T_L^\dagger T_R
+D_L^\dagger D_R,
\]

where \(T\) denotes the colour–lepton triplet and \(D\) the colour–colour companion. It communicates left and right within each source class. Its \(T_L^\dagger T_R\) term is exactly the sort of mixing needed to generate the crossed \(F_Cp\) response.

The holomorphic invariant instead has the schematic form

\[
H_L^TJH_R
=
T_LD_R+D_LT_R.
\]

It crosses the source classes and therefore lets a mass eigenstate inherit both leptoquark and diquark couplings. That is the proton-decay route.

Self-Pfaffians do the same within one multiplet:

\[
H_X^TJH_X\propto T_XD_X.
\]

The exact mass problem is consequently not “does \(H_L\) mix with \(H_R\)?” Some left–right mixing is wanted. It is:

\[
\boxed{
\text{allow Hermitian same-type mixing, forbid holomorphic cross-type mixing}.}
\]

## 4. The minimal phase grading

Give both complex sixes common charge one under a phase action:

\[
H_L\mapsto e^{i\theta}H_L,
\qquad
H_R\mapsto e^{i\theta}H_R.
\]

Then

\[
q(H_L^\dagger H_R)=0,
\]

while

\[
q(H_X^TJH_Y)=2.
\]

A continuous \(U(1)_H\), or a suitable \(\mathbb Z_N\) for which \(2\not\equiv0\pmod N\), therefore enforces the desired block structure at quadratic order.

This phase need not be a new spacetime gauge boson. It could be:

- a grading of the represented one-form module;
- a remnant of fermion-number assignment on the finite Hilbert bimodule;
- an exact discrete symmetry of the finite Dirac operator;
- a selection rule inherited from which closed paths occur in the spectral action.

But one of these must be shown. The Pati–Salam gauge group alone is insufficient.

## 5. What the spectral papers establish

The 2013 spectral Pati–Salam construction derives the algebra

\[
\mathbb H_R\oplus\mathbb H_L\oplus M_4(\mathbb C)
\]

and shows that the scalar content depends on the finite Dirac operator and on whether the first-order condition is imposed. For generic finite Dirac data, the relevant Higgs tensors become fundamental inner-fluctuation fields, and the spectral action supplies their kinetic, mass and quartic terms. The displayed action is organized through Hermitian tensor contractions and modulus-square quartics. See [the primary construction](https://arxiv.org/abs/1304.8050).

The 2015 analysis makes the model fork explicit: its left–right symmetric case adds the \((1_R,1_L,6)\) sector associated with the most general finite Dirac operator. See [the scalar-content classification](https://arxiv.org/abs/1507.08161).

The 2018 Model C analysis then derives the leptoquark-only versus diquark-only Yukawa incidence, but states that mixing between the safe and companion scalars is suppressed and the companion is heavy. See [the phenomenological source decomposition](https://arxiv.org/abs/1804.05844).

These facts establish:

- source separation is genuinely tied to NCG structure;
- the scalar content is constrained by finite Dirac data;
- the phenomenological proton-safety argument still contains a mass-mixing assumption.

They do **not yet establish**, in the present audit, that a common \(U(1)_H\) or discrete grading forbids every Pfaffian mixing term in the complete left–right Model C spectral action and under renormalization.

## 6. A sharper interpretation of “complex six”

Document 1076 proved that one **real** Pati–Salam six cannot retain both desired conjugate triplet orientations while deleting their source partners by a mediator-only projector.

A complex six doubles the real carrier. That creates an internal phase and distinguishes:

- Hermitian propagation, which respects the complex orientation;
- Pfaffian propagation, which uses the real-type epsilon form to pair the two halves.

The NCG construction escapes the real-six no-go only if its complex orientation is dynamically respected. If a Pfaffian mass is admitted, the complex doubling collapses back toward the dangerous real pairing.

So “complex” is not merely a field-count adjective. It is the potential protection datum.

## 7. Radiative question

If an exact phase/grading forbids \(H^TJH'\), perturbative counterterms respecting that symmetry cannot generate it. If the coefficient is merely set to zero at one scale with no symmetry, it is not technically protected because the operator is gauge invariant.

The next audit must therefore inventory every interaction that breaks the common phase:

- fermionic Yukawa couplings;
- Majorana-sector finite Dirac entries;
- mixed scalar quartics;
- Pati–Salam-breaking vacuum expectation values;
- real-structure identifications between \(H\) and its conjugate;
- threshold terms generated by heavy companion fields.

The symmetry must act on the complete action, not only on the quadratic scalar truncation.

## 8. Stop-everything and reopening criteria

**Gauge-protection stop:** do not claim the zero leptoquark–diquark block follows from \(SU(4)\). The epsilon pairing is an explicit invariant counterexample.

**Complex-field stop:** calling the six complex does not itself forbid the Pfaffian. A common phase must survive the complete action.

**Spectral-action stop:** the Hermitian form of the displayed earlier spectral action is suggestive but not yet a complete proof for left–right Model C and its broken vacuum.

**Positive reopening trigger:** expand the complete Model C spectral action into \(T_{L/R}\) and \(D_{L/R}\) components and prove every quadratic and vacuum-induced cross term vanishes by an exact grading.

**Negative trigger:** find a nonzero coefficient of any

\[
T_LD_L,
\quad
T_RD_R,
\quad
T_LD_R,
\quad
D_LT_R.
\]

Then proton safety requires quantitative decoupling rather than exact source superselection.

## 9. Verdict

The dangerous scalar mixing has now been identified as a specific invariant rather than a vague naturalness problem:

\[
\boxed{
\text{proton safety is the absence of the }\Lambda^2\mathbb C^4
\text{ Pfaffian channel}.}
\]

The desired left–right response and the dangerous companion reconnection live in different bilinear geometries—Hermitian versus epsilon-holomorphic. That is excellent news for the programme: the selection can in principle be exact without killing the crossed response. The remaining burden is to derive the phase distinction from the finite geometry rather than assign it by hand.

## Position in the corpus

- [NCG Model C source/Wilson audit](1079_NCG_Pati_Salam_Model_C_realizes_the_safe_source_split_but_its_minimal_left_right_pair_still_closes_the_Wilson_triangle.md)
- [proton-safe source projector](1076_the_proton_safe_current_projector_exists_only_after_breaking_the_pati_salam_colour_lepton_roots.md)
- [one-form underdetermination theorem](1077_coarse_Furey_arrow_incidence_cannot_determine_the_represented_one_form_or_S1_copy_number.md)
- [minimal continuous \(U(1)\) no-go](1078_no_minimal_family_universal_anomaly_free_U1_can_protect_the_proton_safe_S1_source_mask.md)
- [rank-one breaking-spurion audit](1081_the_common_H_phase_is_broken_by_the_Pati_Salam_ten_vev_but_a_rank_one_neutrino_spurion_annihilates_the_direct_six_Pfaffian_quartic.md)
