# The Five-Mode Top Form Lies in the Conjugate Spinor, So the Existing Furey Intertwiner Cannot Fix the Ribbon Sign

**Date:** 17 October 2026  
**Branches:** B03, B04, B08, B09, B10, B11 and B14  
**Claim status:** exact parity and rephasing obstruction; conjugate-sector sewing remains open

## 1. The available ordered factorization

The exact Furey/Fock intertwiner uses modes

\[
1,2,3\quad\text{for colour},
\qquad
4,5\quad\text{for weak isospin}.
\]

In that reference ordering, the five-mode top operator factors as

\[
a_1^\dagger a_2^\dagger a_3^\dagger a_4^\dagger a_5^\dagger
=
(a_1^\dagger a_2^\dagger a_3^\dagger)
(a_4^\dagger a_5^\dagger).
\]

Exchanging the three-mode and two-mode blocks produces the Koszul sign

\[
(-1)^{3\cdot2}=+1.
\]

So the \(3+2\) split itself introduces no hidden minus sign. This is useful, but it is only a reference convention.

## 2. The top state is absent from the completed matter spinor

The completed Furey generation is intertwined with the even Fock sector

\[
S_+=\Lambda^{\mathrm{even}}\mathbb C^5
=
\Lambda^0\oplus\Lambda^2\oplus\Lambda^4,
\qquad
\dim S_+=16.
\]

The top state belongs to

\[
\Lambda^5\mathbb C^5
\subset
S_-=Lambda^{\mathrm{odd}}\mathbb C^5.
\]

Therefore

\[
\boxed{
a_1^\dagger\cdots a_5^\dagger|0\rangle
\text{ is not a state in the completed Furey matter TRO.}
}
\]

The current sixteen-state intertwiner cannot evaluate a vacuum-to-top sign because its target state lies in the opposite chiral spinor.

## 3. Gauge-root data remain blind to the weak top phase

Apply a common weak-mode rephasing

\[
a_4\mapsto e^{i\theta}a_4,
\qquad
a_5\mapsto e^{i\theta}a_5.
\]

Every number operator and the weak root bilinear

\[
a_4^\dagger a_5
\]

is unchanged. Hence the five Cartan actions and the verified \(SU(2)\) root action on the even spinor do not detect \(\theta\).

But the weak top factor transforms with weight two:

\[
a_4^\dagger a_5^\dagger
\mapsto
e^{-2i\theta}a_4^\dagger a_5^\dagger.
\]

At \(\theta=\pi/2\), its sign flips while all the already certified gauge-module data remain identical.

Thus the exact Cartan/root intertwiner cannot fix the weak determinant sign.

## 4. Why colour behaves differently

A common colour rephasing acts on the colour top with weight three. Octonion-product compatibility restricts the allowed phase to \(\alpha^3=1\), so the colour top is invariant.

The asymmetry is therefore exact:

\[
\text{colour top phase fixed by multiplication},
\qquad
\text{weak top sign invisible to the even gauge module}.
\]

This reproduces the colour-oriented/weak-unoriented junction result inside the explicit five-mode CAR realization.

## 5. What extension is actually required

To compare the oscillator top line with the exceptional colour-times-weak volume, the programme must add one of:

1. the opposite-chirality spinor \(S_-\);
2. a charge-conjugation operator \(C:S_+\to S_-\) with fixed phase;
3. a determinant/Pfaffian line defined without treating the top state as matter;
4. a normalized pairing between the even vacuum and odd top sectors;
5. a domain-wall fermion measure whose orientation spans both chiralities.

Merely relabelling the existing sixteen matrix units cannot supply the missing state or sign.

## 6. Relation to physical charge conjugation

Full sign reversal of the five \(SO(10)\) weights exchanges the two chiral spinors. This was already distinguished from the internal Dirac face pairing, which stays within the completed sixteen.

The determinant-line problem therefore reinforces that distinction:

- internal Dirac pairing organizes the observed generation;
- full particle-hole/top-form comparison requires the conjugate ideal;
- using the first as though it supplied the second loses the phase needed for the ribbon selector.

## 7. Claim ledger

- **Exact:** the reference mode ordering factors the top line as colour top times weak top with positive block-exchange sign.
- **Exact:** the completed generation contains Fock degrees \(0,2,4\), not degree five.
- **Exact:** the top state lies in the opposite chiral spinor.
- **Exact:** common weak rephasing leaves all verified Cartan/root bilinears invariant while flipping the weak top sign at \(\theta=\pi/2\).
- **Exact obstruction:** the existing sixteen-state intertwiner cannot determine the ribbon sign.
- **Open:** conjugate-spinor or Pfaffian sewing with a source-fixed phase.
- **Not established:** a canonical common five-volume on the physical completed matter sector.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** extend the exact Furey/Fock intertwiner to \(S_+\oplus S_-\) and derive a phase-fixed charge-conjugation pairing whose top matrix element chooses the positive ribbon sign.

**Negative trigger:** the derived matrix element has negative sign, selecting the pair-of-pants branch.

**Parity falsifier:** the degree-five top state is treated as an element of the even sixteen.

**Gauge-data falsifier:** Cartan and root-action agreement is claimed to fix a common weak rephasing that leaves every bilinear unchanged.

**Convention falsifier:** the reference ordering \(1,2,3,4,5\) is called a physical orientation without a source rule fixing its determinant line.

## 9. Certificate

The [five-mode determinant-line certificate](scripts/verify_five_mode_top_form_lies_outside_even_furey_spinor_and_weak_rephasing_flips_its_sign.mjs) enumerates the parity sectors, locates the top state, verifies the \(3+2\) Koszul sign and exhibits the weak rephasing that preserves all bilinears while reversing the weak top form.

## Companion documents

- [Colour/weak relative-orientation no-go](472_octonions_orient_the_color_junction_but_the_weak_car_structure_leaves_exactly_the_ribbon_sign_unfixed.md)
- [Dirac face exchange versus full charge conjugation](414_dirac_doubling_is_an_internal_weyl_face_exchange_while_charge_conjugation_requires_the_opposite_spinor.md)
- [Furey/Fock non-Abelian root intertwiner](413_the_so10_fock_root_operators_close_exactly_on_the_completed_furey_matter_tro.md)
- [Furey/Fock Cartan–ternary intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [CAR real-structure phase ambiguity](422_a_specified_car_real_structure_reduces_the_weak_phase_to_a_sign_but_does_not_canonically_choose_that_real_structure.md)
