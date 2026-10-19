# A Sideband-Reversing Rational-Inner Boundary Cycle Realizes the Exact A2 Coxeter Element with Positive Pole Scales

**Date:** 17 October 2026  
**Branches:** rational-inner response, $h\chi$ boundary grading, sideband reality, mediator reflection, Floquet conversion, and active $A_2$ selector  
**Claim status:** exact constructive analytic-response theorem; microscopic frequency conversion and scale protection remain open  
**Certificate:** [construct_a_sideband_reversing_rational_inner_cycle_that_realizes_the_exact_a2_coxeter_element.mjs](../../../verification/construct/construct_a_sideband_reversing_rational_inner_cycle_that_realizes_the_exact_a2_coxeter_element.mjs)

## Executive result

The positive rational-inner response of document 825 can realize each mediator Householder reflection at a finite physical frequency. Its unavoidable common phase cancels exactly when the second face is traversed on the opposite real-time sideband.

Choose an operating frequency $\omega_0>0$ and two positive pole scales

\[
\gamma_n=(1+\sqrt2)\omega_0,
\qquad
\gamma_t=(\sqrt2-1)\omega_0.
\]

They obey

\[
\gamma_n\gamma_t=\omega_0^2.
\]

For the squared Blaschke factor

\[
f_\gamma(z)=
\left(\frac{z-i\gamma}{z+i\gamma}\right)^2,
\]

one obtains

\[
f_{\gamma_n}(\omega_0)=+i,
\qquad
f_{\gamma_t}(\omega_0)=-i.
\]

Align the first eigenvector with the normalized mediator normal

\[
n=\frac12(1,\sqrt3).
\]

Then the reciprocal lossless response at positive frequency is

\[
S_+(\omega_0)=-iR_n,
\]

where

\[
R_n=I-2nn^T
\]

is the required Householder reflection. Real-time sideband symmetry gives

\[
S_+(-\omega_0)=\overline{S_+(\omega_0)}=+iR_n.
\]

Let $D$ be the $h\chi$ lepton/color grading from document 902. The oriented two-face cascade

\[
\boxed{
\mathcal C
=
D S_+(-\omega_0)D\,S_+(+\omega_0)
=R_{Dn}R_n
=C_{A_2}
}
\]

is exactly the $120^\circ$ Coxeter rotation and satisfies

\[
\mathcal C^3=I.
\]

By contrast, using the same positive-frequency response on both faces gives

\[
D S_+(\omega_0)D\,S_+(\omega_0)
=-C_{A_2},
\]

an order-six operation. The negative-frequency traversal is therefore structural, not cosmetic.

This is the first explicit causal/lossless analytic-response cycle in the corpus that produces the exact active selector $C_3$ rather than merely admitting its Hamiltonian logarithm.

## 1. Rational-inner building block

For every $\gamma>0$,

\[
b_\gamma(z)=\frac{z-i\gamma}{z+i\gamma}
\]

is analytic and contractive in the upper half-plane and unitary on the real boundary. Squaring gives $f_\gamma=b_\gamma^2$, preserving rational innerness and the real-time relation

\[
f_\gamma(z)=\overline{f_\gamma(-\bar z)}.
\]

Choose the real orthogonal matrix

\[
U=
\begin{pmatrix}
\frac12&-\frac{\sqrt3}{2}\\
\frac{\sqrt3}{2}&\frac12
\end{pmatrix},
\]

whose first column is $n$. Define

\[
S_+(z)
=
U
\begin{pmatrix}
f_{\gamma_n}(z)&0\\
0&f_{\gamma_t}(z)
\end{pmatrix}
U^T.
\]

This response is symmetric, reciprocal, rational inner and compatible with real-time sideband reality. Its Cayley transform has positive matrix residue by the construction of document 825.

## 2. Exact phase calculation

For $\omega>0$,

\[
f_\gamma(\omega)
=
\exp\left[-4i\arctan\left(\frac\gamma\omega\right)\right].
\]

The selected ratios obey

\[
\arctan(1+\sqrt2)=\frac{3\pi}{8},
\qquad
\arctan(\sqrt2-1)=\frac{\pi}{8}.
\]

Their phase difference is therefore

\[
-4\left(\frac{3\pi}{8}-\frac{\pi}{8}\right)
=-\pi.
\]

The two eigenchannels have exactly opposite phases. Factoring out the tangent phase $-i$ leaves eigenvalues $(-1,+1)$, which are the eigenvalues of the Householder reflection normal to $n$.

## 3. Why same-frequency composition fails

The common phase of each positive-frequency face is $-i$. Two such faces contribute

\[
(-i)^2=-1.
\]

Hence the same-frequency product is $-C_{A_2}$. Since

\[
C_{A_2}^3=I,
\]

one has

\[
(-C_{A_2})^3=-I,
\qquad
(-C_{A_2})^6=I.
\]

The result is an order-six lift, not the required order-three active action.

This is the phase analogue of the distinction between a Weyl reflection on weights and its central-square lift on amplitudes.

## 4. Sideband reversal cancels the central phase

Real-time reality fixes the negative-frequency response:

\[
S_+(-\omega_0)
=\overline{S_+(\omega_0)}
=+iR_n.
\]

Conjugating it by the response grading gives

\[
D S_+(-\omega_0)D
=+iR_{Dn}.
\]

Its cascade with the positive-frequency face is

\[
(+i)(-i)R_{Dn}R_n
=C_{A_2}.
\]

Thus sideband reversal removes the unwanted central phase without an arbitrary complex constant multiplier. This preserves the real-time symmetry that a standalone factor of $i$ would violate.

## 5. Physical interpretation

A stationary time-translation-invariant linear response is diagonal in frequency. It supplies $S(+\omega)$ and $S(-\omega)$ but does not ordinarily cascade one into the other.

The exact cycle therefore requires a mechanism that coherently changes sideband:

- a Floquet pump;
- a parametric boundary;
- an Andreev/Bogoliubov-type frequency-converting interface;
- an oriented two-pass path that reverses the frequency convention on the second face;
- a real-time boundary sewing that identifies outgoing $+\omega$ data with incoming $-\omega$ data.

The construction is a proof of compatible analytic dynamics, not yet a derivation of one of these mechanisms from the Standard Model.

## 6. Relation to Jordan/Feshbach composition

Each reflection is the finite phase response associated with one rank-one mediator kernel. The two kernels are related by the $h\chi$ boundary grading. Their ordered cascade therefore realizes

\[
\text{one Feshbach/Jordan face at }+\omega
\quad\circ\quad
\text{one graded face at }-\omega.
\]

The resulting Coxeter element is a concrete finite composition of two relational faces. This is substantially closer to the requested “Jordan-triple recursion implies $Sp(4)$” programme than an abstract matrix embedding: the matrices now arise from positive rational-inner response functions with a specified sewing rule.

The construction still produces only the active $C_3$ plane. The neutral complement and final handle sewing remain separate as required by document 903.

## 7. Parameter status

The scale relation

\[
\frac{\gamma_n}{\omega_0}=1+\sqrt2,
\qquad
\frac{\gamma_t}{\omega_0}=\sqrt2-1
\]

is exact and uses positive poles. It is not yet predicted.

Equivalently,

\[
\frac{\gamma_n}{\gamma_t}
=(1+\sqrt2)^2
=3+2\sqrt2.
\]

This is the silver-ratio square. Its occurrence follows from demanding a $\pi$ difference between two squared-Blaschke phases at one frequency; it must not be presented as a Standard-Model mass prediction without a mechanism fixing the pole scales.

## 8. Stop-everything and falsification criteria

**Boundary-cycle trigger:** an identified Furey/Higgs or physical interface coherently maps the $+\omega_0$ output of one face to the $-\omega_0$ input of the $h\chi$-twisted face.

**Scale trigger:** a Ward identity, topology or measured response fixes the reciprocal pole relation $\gamma_n\gamma_t=\omega_0^2$ and the silver-ratio quotient.

**Full-active trigger:** the resulting $C_{A_2}$ is intertwined with the incidence-selected integral plane by the explicit document-898 conjugator.

**Full-selector trigger:** the cycle coexists with the independently sewn neutral plane and handle, satisfying all order-18 relations.

**Stationarity falsifier:** the proposed physical setup is strictly stationary and contains no frequency-converting boundary, yet the $+\omega$ and $-\omega$ responses are multiplied as sequential operations.

**Phase falsifier:** two same-frequency faces are claimed to give $C_3$ without accounting for their common phase; they give $-C_3$.

**Prediction warning:** the pole ratios are identified with particle masses without a derived spectral map.

## 9. Verdict

| Question | Verdict |
|---|---|
| Can a positive rational-inner response realize the required reflection? | **yes, up to a common phase** |
| Are all pole scales positive and finite? | **yes** |
| Does same-frequency composition give $C_3$? | **no; it gives $-C_3$** |
| Does a sideband-reversing graded cascade give exact $C_3$? | **yes** |
| Is the response reciprocal, lossless and real-time compatible? | **yes** |
| Is the frequency-converting boundary derived microscopically? | **not yet** |
| Are the silver-ratio pole scales protected or predicted? | **not yet** |

### Implementation qualification

The sideband exchange used here is exact as the antiunitary real-time sewing \(XK\), not as a passive evolution of one bosonic Nambu mode. Indeed \(X^T\eta_BX=-\eta_B\). A forward-time unitary device therefore requires an enlarged neutral idler/frequency-bin dilation followed by reduction to the reality-fixed response. See [the canonical implementation classification](906_the_sideband_exchange_in_the_a2_cycle_is_an_antiunitary_boundary_sewing_not_a_single_mode_passive_bosonic_evolution.md).

## 10. Position in the corpus

- [positive rational-inner two-character response](../0800-0899/825_a_reciprocal_rational_inner_two_character_response_carries_orientation_odd_coherence_and_a_positive_matrix_spectral_residue.md)
- [$h\chi$ supplies the one-face response grading](902_the_product_of_furey_handle_and_higgs_channel_gradings_is_exactly_the_missing_lepton_color_sign_and_conditionally_reopens_the_a2_route.md)
- [real active-plane versus complex-carrier typing](903_the_hchi_sign_can_source_the_real_active_c3_plane_but_its_exchange_dual_is_not_the_selector_handle_on_that_same_plane.md)
- [conditional $A_2$ reflection theorem](../0800-0899/898_color_multiplicity_and_an_oriented_weak_sign_turn_the_paired_so10_mediator_reflections_into_the_exact_a2_coxeter_generator.md)
- [positive quadratic pulse realization](../0800-0899/858_positive_quadratic_hamiltonian_pulses_generate_the_exact_bilocal_selector_without_finite_dimensional_instability.md)
- [pulse-area protection no-go](../0800-0899/862_positive_quadratic_dynamics_does_not_protect_the_selector_pulse_areas_or_its_finite_order.md)
