# The Split-TKK Intertwiner Is a Channel-Controlled Fourier Quarter-Turn Whose Square Is (D), Not the Realified Furey Antiunitary

**Date:** 18 October 2026  
**Branches:** split TKK orbit, controlled Fourier transform, neutral Peirce complex structure, graded antiunitary, sideband exchange, canonical square root of grading  
**Claim status:** exact operator comparison; boundary-action realization remains open  
**Certificate:** [compare_the_split_tkk_canonical_exchange_with_the_realified_furey_antiunitary.mjs](../../../verification/compare/compare_the_split_tkk_canonical_exchange_with_the_realified_furey_antiunitary.mjs)

## Executive result

The canonical coordinate exchange of document 1038 is built entirely from already established ingredients:

- the channel grading (D);
- its projectors (e_\pm=(I\pm D)/2);
- the neutral-Peirce phase-space complex structure (J).

In phase-first ordering ((q_1,q_2,p_1,p_2)), it is

\[
\boxed{
S_-=I_{\rm phase}\otimes e_+
+J_{\rm phase}\otimes e_-.}
\]

It leaves the positive (D) channel unchanged and applies a Fourier quarter-turn

\[
(q_2,p_2)\mapsto(p_2,-q_2)
\]

to the negative channel.

Its square is

\[
\boxed{S_-^2=I_{\rm phase}\otimes D.}
\]

Thus it is a canonical square root of the channel grading.

It is **not** the realified Furey antiunitary. The latter is

\[
\Gamma_{\mathbb R}
=K_{\rm phase}\otimes\varepsilon_{\rm channel},
\qquad
\Gamma_{\mathbb R}^2=-I.
\]

Instead,

\[
\boxed{
\Gamma_{\mathbb R}S_-\Gamma_{\mathbb R}^{-1}
=S_+^{-1},}
\]

where (S_+^{-1}) applies the oppositely oriented quarter-turn to the complementary channel. The antiunitary transports one controlled Fourier face into the other.

This supplies a precise kinematic bridge to the sideband/Pfaffian structure while preventing the false claim that the two operators are identical.

## 1. Projector form of the canonical exchange

Let

\[
D=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\qquad
e_+=\frac{I+D}{2},
\qquad
e_-=\frac{I-D}{2}.
\]

On the real neutral Peirce phase plane use

\[
J=\begin{pmatrix}0&1\\-1&0\end{pmatrix},
\qquad J^2=-I.
\]

Then

\[
S_-=I\otimes e_++J\otimes e_-.
\]

Because the projectors are orthogonal,

\[
S_-^2
=I\otimes e_++J^2\otimes e_-
=I\otimes(e_+-e_-)
=I\otimes D.
\]

The fourth power is identity.

## 2. Explicit coordinate action

The matrix is

\[
S_-=
\begin{pmatrix}
1&0&0&0\\
0&0&0&1\\
0&0&1&0\\
0&-1&0&0
\end{pmatrix}.
\]

Therefore

\[
(Q_1,Q_2,P_1,P_2)
=(q_1,p_2,p_1,-q_2),
\]

exactly the symplectic exchange used to identify the split TKK orbit in document 1038.

With

\[
\Omega=J\otimes I,
\]

one verifies

\[
S_-^T\Omega S_-=\Omega.
\]

## 3. Comparison with the graded antiunitary

The established complex antiunitary is

\[
\Gamma=\varepsilon K,
\qquad
\varepsilon=DX.
\]

On the realified carrier,

\[
\Gamma_{\mathbb R}=K_{\rm phase}\otimes\varepsilon_{\rm channel},
\]

where

\[
K_{\rm phase}=\operatorname{diag}(1,-1).
\]

Its square is

\[
\Gamma_{\mathbb R}^2=-I.
\]

The two operators therefore cannot be equal:

- (S_-^2=D) and (S_-^4=I);
- (\Gamma_{\mathbb R}^2=-I) and (\Gamma_{\mathbb R}^4=I).

They also have different tensor structure:

- (S_-) is channel-controlled phase rotation;
- (\Gamma_{\mathbb R}) is phase reflection times channel quarter-turn.

## 4. Antiunitary transport of controlled faces

Define

\[
S_+^{-1}=I\otimes e_- -J\otimes e_+.
\]

It leaves the negative channel fixed and applies the inverse quarter-turn to the positive channel. Since

\[
\varepsilon e_+\varepsilon^{-1}=e_-,
\qquad
KJK^{-1}=-J,
\]

one gets

\[
\Gamma_{\mathbb R}S_-\Gamma_{\mathbb R}^{-1}
=S_+^{-1}.
\]

This matches the established qualitative action:

- exchange the normal/tangent or lepton/colour faces;
- reverse orientation;
- preserve the graded combined structure.

## 5. Complementary product

The product of the two controlled faces is

\[
S_-S_+^{-1}
=-J\otimes D.
\]

It obeys

\[
(-J\otimes D)^2=-I.
\]

Thus two complementary channel-controlled quarter-turns combine into a global (D)-graded complex structure. This is another exact realization of the “two faces, one quaternionic carrier” motif.

It is still distinct from (\Gamma_{\mathbb R}), but both square to the same central (-I) and are related through the same phase and channel factors.

## 6. What is now closed

Closed:

- the canonical exchange is exactly a controlled Fourier quarter-turn;
- it uses the established neutral phase complex structure and channel projectors;
- it is a square root of (D);
- the graded antiunitary transports it to the complementary inverse face;
- the complementary cascade gives a (D)-graded complex structure.

Not closed:

- the source action has not been shown to perform (S_-);
- the existing local interface of document 997 applies (\varepsilon) to both (q) and (p), not a selective (q\leftrightarrow p) rotation;
- no Standard-Model boundary term has yet selected the negative (D) channel for Fourier rotation;
- the relation to literal bound/free Fourier duality remains interpretive.

## 7. Stop-everything and falsification tests

**Boundary-action trigger:** a first-order symplectic boundary term generates a (\pi/2) phase-space rotation only on (e_-).

**Sideband trigger:** the established sideband reversal plus (h\chi) grading composes dynamically to (S_-), not merely to its conjugation law.

**Bound/free trigger:** the negative channel is independently identified as the sector on which the bound/free Fourier transform acts.

**Placement trigger:** one placement edge implements (S_-) and its reflected edge implements (S_+^{-1}), with their product giving the known central lift.

**Falsifier:** (S_-) is identified directly with (\Gamma_{\mathbb R}) despite their different squares and tensor structures.

**Falsifier:** the local interface (q'=\varepsilon q, p'=\varepsilon p) is claimed to exchange (q_2) with (p_2).

**Boundary warning:** symplectic admissibility of the controlled Fourier transform is treated as proof that the microscopic boundary performs it.

## Verdict

| Question | Verdict |
|---|---|
| What is the split-TKK canonical exchange? | **A quarter-turn controlled by (e_-)** |
| What is its square? | **The channel grading (D)** |
| Is it the realified Furey antiunitary? | **No** |
| How does the antiunitary act on it? | **It sends it to the complementary inverse controlled turn** |
| What does the complementary cascade produce? | **A (D)-graded complex structure squaring to (-I)** |
| Is the controlled Fourier boundary action derived? | **No** |

## Position in the corpus

- [split-tripoten TKK orbit](1038_the_pole_jet_sl2_is_the_tkk_orbit_of_the_split_jordan_involution_D_not_a_primitive_positive_idempotent.md)
- [graded sideband antiunitary](../0900-0999/969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
- [minimal four-real response root](1001_the_neutral_furey_peirce_line_times_the_lepton_color_doublet_is_the_minimal_four_real_response_root_and_its_gram_is_the_jordan_carrier.md)
- [local conservative interface](../0900-0999/997_a_local_conservative_real_interface_network_realizes_the_nested_c12_transport_as_antiperiodic_six_cycle_holonomy.md)
