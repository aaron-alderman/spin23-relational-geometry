# A Two-Copy LNV Interferometer Embeds the Minimal Majorana-CP Quartet in a Positive (H_2(mathbb R)) Carrier

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the coherent-LNV measurement branch  
**Claim status:** exact minimal algebraic interferometer and positive compression; physical four-boson/four-lepton implementation remains open  
**Certificate:** [verify_two_copy_lnv_interferometer_embeds_majorana_quartet_in_positive_h2r.mjs](../../../verification/verify/verify_two_copy_lnv_interferometer_embeds_majorana_quartet_in_positive_h2r.mjs)

## Executive result

The two-flavor Majorana quartet can be realized as the oriented coherence of two composite paths.

Define

\[
\boxed{
p=F_{\alpha\alpha}F_{\beta\beta},
\qquad
q=F_{\alpha\beta}^2.
}

\]

Under charged-flavor rephasings, both transform with the same charge:

\[
p,q
\mapsto
e^{2i(\theta_\alpha+\theta_\beta)}p,q.
\]

Their relative coherence is invariant:

\[
pq^*
=F_{\alpha\alpha}F_{\beta\beta}
(F_{\alpha\beta}^*)^2.

\]

Therefore

\[
\boxed{
\operatorname{Im}(pq^*)
=J^F_{\alpha\beta}.
}

\]

The two paths have a direct two-copy interpretation:

- (p): one (alphaalpha) LNV event and one (\beta\beta) LNV event;
- (q): two (alpha\beta) LNV events.

Both yield the same total final-flavor multiset: two (alpha) leptons and two (\beta) leptons.

## 1. Positive two-path Gram

The composite amplitudes define the rank-one complex Gram matrix

\[
G_{pq}
=
\begin{pmatrix}
|p|^2&pq^*\\
qp^*&|q|^2
\end{pmatrix}
\ge0.

\]

Let

\[
t=\frac{|p|^2+|q|^2}{2},
\qquad
x=\operatorname{Re}(pq^*),
\qquad
y=\operatorname{Im}(pq^*).

\]

Compress the complex Gram to

\[
\boxed{
R_{pq}
=
\begin{pmatrix}
t+x&y\\
y&t-x
\end{pmatrix}
\in H_2(\mathbb R).
}

\]

Its determinant is

\[
\boxed{
\det R_{pq}
=t^2-|pq^*|^2
=\frac{(|p|^2-|q|^2)^2}{4}
\ge0.
}

\]

Thus the full complex quartet coherence, including its CP-odd imaginary part, fits inside a positive real rank-two Jordan carrier.

## 2. Quadrature extraction

Introduce a controllable relative phase (chi) and measure

\[
I(\chi)=|p+e^{i\chi}q|^2.

\]

Then

\[
I(\chi)
=|p|^2+|q|^2
+2\operatorname{Re}(e^{-i\chi}pq^*).

\]

The two quarter-turn settings give

\[
\boxed{
J^F_{\alpha\beta}
=\frac{I(\pi/2)-I(-\pi/2)}{4}.
}

\]

This extracts the CP-odd quadrature without separately subtracting the two path intensities.

The real quadrature follows from (I(0)-I(\pi)).

## 3. Why two copies are minimal

The invariant is quartic in the elementary LNV kernel. A one-copy process contains one amplitude and its conjugate in a rate, producing degree-two channel magnitudes.

Two coherent copies permit products of two amplitudes in each path and their interference in the probability:

\[
(F F)(F F)^*.

\]

This is the first probability-level construction with the required degree-four charge balance.

The two-copy interpretation therefore mirrors the monomial minimality theorem of document 732.

## 4. CP and positivity

Under CP with absorptive phases removed,

\[
p\mapsto p^*,
\qquad
q\mapsto q^*.

\]

Hence

\[
x\mapsto x,
\qquad
y\mapsto-y.

\]

The carrier reflection is exactly

\[
R_{pq}\mapsto
\sigma_zR_{pq}\sigma_z.

\]

Positivity and CP orientation therefore coexist in one (H_2(\mathbb R)) response.

## 5. Relation to the carrier boundary

The compressed determinant vanishes when

\[
|p|=|q|.

\]

This is not the same boundary condition as linear dependence of two vector-valued spectral amplitudes; (p) and (q) are scalar paths and are automatically collinear as one-dimensional vectors.

Here the compression discards the population imbalance and uses it as the residual determinant:

\[
\det R_{pq}
=\left(\frac{|p|^2-|q|^2}{2}\right)^2.

\]

Boundary saturation means balanced composite-path intensities.

## 6. Physical implementation gate

The algebra does not guarantee that the two products occur coherently in nature. A physical implementation needs:

- a common initial state, schematically four same-sign weak bosons or an equivalent LNV source;
- the same fully symmetrized (2\ell_\alpha+2\ell_\beta) final state;
- indistinguishable momentum, spin and spacetime assignments for the two pairings;
- a controllable or inferable relative phase;
- subtraction of absorptive final-state phases;
- and normalization of disconnected versus connected contributions.

Alternatively, a quantum simulator or amplitude-analysis network can realize the same two-path kernel.

## 7. Consequence for the Jordan programme

This construction closes an algebraic loop:

\[
\text{Majorana LNV amplitudes}
\longrightarrow
\text{quartic relational phase}
\longrightarrow
\text{two-path Gram coherence}
\longrightarrow
H_2(\mathbb R)_+
\longrightarrow
Sp(4,\mathbb R)\cong Spin_0(2,3).

\]

The carrier is no longer merely attached to the quartet by analogy. It is an explicit positive compression of the minimal coherent network measuring it.

## 8. Stop-everything criteria

Stop claiming channel-by-channel rates measure the quartet.

Stop multiplying statistically independent probabilities; the two composite paths must interfere at amplitude level.

Stop treating unequal momentum or spin assignments as one coherent path without symmetrization and normalization.

Stop identifying a controllable laboratory phase with the Majorana weak phase without conjugate-process calibration.

Stop the direct experimental branch if no physical process makes (p) and (q) coherent, while retaining the exact positive network construction.

## 9. Highest-value next calculations

1. Enumerate Wick contractions for a four-(W^-) to (2\ell_\alpha+2\ell_\beta) amplitude and identify the (p/q) interference term.
2. Determine whether disconnected pair production can remain quantum coherent after phase-space integration.
3. Build a three-setting positive tomography protocol robust to unequal path intensities.
4. Add absorptive phases and derive a CP-conjugate subtraction isolating the weak quartet.
5. Compare this two-copy carrier with the three-port Majorana triangle carrier.

## Companion documents

- [Minimal two-flavor LNV amplitude quartet](732_a_two_flavor_lnv_amplitude_quartet_is_the_minimal_rephasing_invariant_majorana_cp_observable_and_avoids_charged_lepton_mass_spurions.md)
- [Positive spectral half-trace carrier](729_half_the_trace_of_a_positive_two_probe_spectral_gram_is_the_canonical_carrier_coordinate_but_z2_matching_remains_a_form_factor_gate.md)
- [Quadrature lock-in protocol](../0300-0399/339_a_quadrature_lockin_protocol_measures_the_three_port_schur_holonomy.md)
