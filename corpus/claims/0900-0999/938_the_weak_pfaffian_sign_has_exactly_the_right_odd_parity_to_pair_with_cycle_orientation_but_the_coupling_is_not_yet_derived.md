# The Weak Pfaffian Sign Has Exactly the Right Odd Parity to Pair with Cycle Orientation, but the Coupling Is Not Yet Derived

**Date:** 17 October 2026  
**Branches:** Pfaffian orientation, $h\chi$ parity, cycle-order spurion, spontaneous orientation selection, and CP boundary  
**Claim status:** exact representation-theoretic pairing and tuned witness; microscopic coupling, vacuum selection and magnitude remain open  
**Certificate:** [pair_the_weak_pfaffian_sign_with_the_label_orientation_observable_and_audit_what_is_not_derived.mjs](../../../verification/pair/pair_the_weak_pfaffian_sign_with_the_label_orientation_observable_and_audit_what_is_not_derived.mjs)

## Executive result

The weak Pfaffian sign is not yet a derived pulse-order interaction, but it transforms in exactly the representation required to become one.

Write the skew weak lift as

\[
U_{\rm weak}=\eta_{\rm Pf}\,\varepsilon,
\qquad
\eta_{\rm Pf}=\pm1.
\]

Under the $h\chi$ reflection $D=\operatorname{diag}(1,-1)$,

\[
D\varepsilon D^T=-\varepsilon.
\]

Therefore the Pfaffian coefficient is an odd orientation line.

The label-cycle observable

\[
\Omega=\frac12(T-T^{-1})
\]

is odd under the corresponding label reflection:

\[
D_{\rm label}\Omega D_{\rm label}=-\Omega.
\]

Consequently

\[
\boxed{\eta_{\rm Pf},i\Omega}
\]

is an allowed Hermitian $h\chi$-even coupling. Its two Pfaffian signs generate the two inverse cycle orientations.

What is exact is the parity match and existence of the invariant pairing. What is not derived is its coefficient, nonzero vacuum value or protection.

## 1. The existing Pfaffian theorem supplies a sign line

Document 892 proves that skewness collapses the Higgs Hopf phase to

\[
U=\pm\varepsilon.
\]

It does not select one sign. Nor does it derive a term coupling that sign to the response-cycle orientation.

The present calculation identifies its exact representation type: because a determinant-minus-one reflection reverses a two-dimensional alternating form, the Pfaffian sign is $h\chi$-odd.

This is stronger than a naming analogy but weaker than a dynamical derivation.

## 2. The cycle orientation is the same odd representation

The antisymmetric label operator $\Omega$ distinguishes the two words:

\[
T\leftrightarrow T^{-1}
\quad\Longrightarrow\quad
\Omega\leftrightarrow-\Omega.
\]

Multiplying by $i$ gives a Hermitian oriented hopping. Since both $eta_{\rm Pf}$ and $Omega$ are odd, their product is invariant.

The two one-dimensional orientation lines are therefore canonically pairable up to one real coefficient.

## 3. Tuned witness

For a unit-duration autonomous evolution, choose

\[
H_\eta
=
\eta_{\rm Pf}
\frac{4\pi}{3\sqrt3},i\Omega.
\]

Then

\[
e^{-iH_{+}}=T,
\qquad
e^{-iH_{-}}=T^{-1}
\]

up to the fixed orientation convention.

This is a compatibility witness. The coefficient was chosen to obtain the exact $2\pi/3$ holonomy; it has not been predicted.

## 4. Minimal spontaneous-selection model

A phenomenological boundary model could introduce a real pseudoscalar $eta$ with

\[
V(\eta)=\lambda(\eta^2-v^2)^2
\]

and coupling

\[
L_{\rm orient}
=-g\eta\,\psi^\dagger i\Omega\psi.
\]

The two vacua $eta=\pm v$ are exchanged by $h\chi$ and select opposite cycles.

This demonstrates dynamical possibility, not derivation from the Standard Model. Introducing $eta$ as a new elementary field would exceed current evidence. A boundary condensate, Higgs/Pfaffian composite or oriented defect normal is more conservative.

## 5. Exact audit of what is missing

Derived:

- Pfaffian and cycle orientations are the same odd $mathbb Z_2$ representation;
- an invariant scalar pairing exists;
- opposite Pfaffian signs can select inverse cycles;
- the required Hermitian operator is explicit.

Not derived:

- a nonzero microscopic coefficient $g$;
- a nonzero expectation value of the Pfaffian orientation line;
- the magnitude $gv=4\pi/(3\sqrt3)$ for a unit interval;
- stability under CKM/flavor CP violation;
- pulse-area or holonomy quantization.

Thus document 923's “weak/Pfaffian orientation anchor” should be read as a chosen or spontaneously selected orientation sign, not as an already-derived local coupling.

## 6. Stop-everything and falsification criteria

**Microscopic-coupling trigger:** a Higgs/Furey/mediator boundary calculation produces $eta_{\rm Pf}\psi^\dagger i\Omega\psi$ with nonzero coefficient.

**Vacuum trigger:** the boundary effective potential has two Pfaffian-related minima and selects one dynamically.

**Quantization trigger:** topology or arithmetic fixes the integrated coefficient to $2\pi/3$ modulo $2\pi$.

**Flavor trigger:** the three-generation deformation is expressed through a rephasing-invariant CP quantity.

**Parity falsifier:** the Pfaffian line or cycle orientation fails to reverse under the same $h\chi$ reflection.

**Derivation overclaim:** infer the coupling or its magnitude solely from the existence of the two sign representations.

## 7. Verdict

| Question | Verdict |
|---|---|
| Does the Pfaffian sign have the required parity? | **yes, exactly** |
| Is an invariant coupling to cycle orientation allowed? | **yes** |
| Do opposite signs select opposite cycles in the tuned witness? | **yes** |
| Is the coupling generated microscopically? | **not yet** |
| Is its exact magnitude protected? | **not yet** |

## 8. Position in the corpus

- [Pfaffian phase classification](../0800-0899/892_pfaffian_skewness_or_even_real_structure_collapses_the_higgs_hopf_phase_to_the_two_weak_symplectic_signs.md)
- [$h\chi$ pulse-order no-go](937_hchi_exchanges_the_two_primitive_pulses_and_reverses_the_cycle_so_it_cannot_alone_select_orientation.md)
- [minimal positive edge-pulse action](936_two_positive_rank_one_edge_pulses_are_the_minimal_local_action_for_the_two_face_selector_cycle.md)
- [conditional weak/neutrino frame alignment](923_a_neutrino_lepton_anchor_and_one_weak_orientation_bit_uniquely_align_the_three_a2_frames.md)
