# Octonions Orient the Colour Junction, but the Weak CAR Structure Leaves Exactly the Ribbon Sign Unfixed

**Date:** 17 October 2026  
**Branches:** B03, B04, B08, B09, B10, B11 and B14  
**Claim status:** exact asymmetric-orientation theorem and sign no-go

## 1. Colour-side orientation is available

The octonionic presentation

\[
\mathbb O\cong\mathbb C\oplus\mathbb C^3
\]

contains the complex cross product and hence the \(SU(3)\)-invariant colour volume

\[
\Omega_C\in\Lambda^3(\mathbb C^3)^*.
\]

Product compatibility restricts a colour scalar to \(\alpha^3=1\). Therefore all allowed colour frame changes preserve \(\Omega_C\). The colour trivalent junction has a genuine source-level cyclic orientation, up to the already understood \(\mathbb Z_3\) frame redundancy.

This closes the first half of the ribbon selector test.

## 2. The weak alternating line exists but is not signed

For the weak fundamental \(W\cong\mathbb C^2\), the space

\[
\Lambda^2W^*
\]

is one-dimensional. \(SU(2)\) preserves a nonzero alternating form

\[
\varepsilon_W=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}
\]

up to scalar. A Hermitian metric fixes its magnitude, but not its phase.

The bare weak Jordan algebra sees only rank-one projectors and remains invariant under

\[
v\mapsto e^{i\theta}v,
\qquad
\varepsilon_W\mapsto e^{2i\theta}\varepsilon_W.
\]

It therefore cannot orient the neutral/weak trivalent junction.

## 3. CAR reality reduces phase but not sign

Choose and phase-match a CAR real structure. It restricts the weak determinant form to be real. After normalization, the possibilities are

\[
\varepsilon_W
\quad\text{and}\quad
-\varepsilon_W.
\]

Both are:

- real under the same conjugation;
- \(SU(2)\)-invariant;
- equally normalized;
- compatible with the same Jordan observables;
- compatible with the same CAR adjoint action.

Moreover, the CAR-compatible scalar comparisons \(\beta=\pm1\) act on the determinant line by \(\beta^2=1\), so neither distinguishes the two signs.

Thus

\[
\boxed{
\text{matched CAR reality makes the weak orientation real but does not orient it.}
}
\]

## 4. Identification with the ribbon ambiguity

The colour junction now carries \(\Omega_C\), while the weak/neutral junction carries a real normalized alternating tensor only up to sign. Comparing them through the completed linking graph gives

\[
\sigma=\frac{\varepsilon_E}{\varepsilon_O}\in\{+1,-1\}.
\]

This is precisely the relative ribbon sign:

\[
\sigma=+1
\Longrightarrow
\text{punctured torus},
\qquad
\sigma=-1
\Longrightarrow
\text{pair of pants}.
\]

The previously separate weak determinant-line ambiguity and ribbon genus ambiguity therefore meet at the same unresolved sign. This is a real unification of dependencies, not yet a solution.

## 5. What would choose the sign

A tensor coupling the two determinant lines can fix the product

\[
\Omega_C\otimes\varepsilon_W
\in
\Lambda^5(\mathbb C^3\oplus\mathbb C^2)^*.
\]

Credible selectors are:

1. the oscillator five-mode top form with a fixed phase;
2. an exceptional cubic/Pfaffian sewing amplitude;
3. a normalized vacuum-to-top CAR matrix element;
4. a fermion-measure orientation on the defect;
5. an oriented domain-wall determinant line;
6. a Higgs/Majorana coupling with an independently fixed real sign.

Any of these must be computed, not chosen to obtain genus one.

## 6. Consequence for the grand chain

The best current conditional chain is

\[
\begin{aligned}
\text{octonion colour volume}
&\Longrightarrow \varepsilon_O,\\
\text{weak }SU(2)+\text{matched CAR}
&\Longrightarrow \varepsilon_E\text{ up to }\pm,\\
\text{common oriented five-volume}
&\Longrightarrow \sigma,\\
\sigma=+1
&\Longrightarrow \text{punctured torus}\Longrightarrow\text{BF canonical pair}.
\end{aligned}
\]

The missing object is now one signed determinant-line sewing map.

## 7. Claim ledger

- **Exact:** octonion multiplication supplies a colour complex volume preserved by the residual \(\mathbb Z_3\).
- **Exact:** the weak invariant alternating line is one-dimensional.
- **Exact:** weak Jordan data leave its full phase invisible.
- **Exact:** matched CAR reality reduces the ambiguity to two real signs.
- **Exact no-go:** the CAR-compatible scalars \(\pm1\) act identically on the weak determinant line and cannot select the sign.
- **Exact dependency merger:** the remaining weak sign is the relative ribbon-genus sign.
- **Open:** a source-derived common five-volume, Pfaffian or determinant-line orientation.
- **Not established:** selection of the punctured-torus branch.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a normalized exceptional-to-CAR top-form comparison fixes \(\Omega_C\otimes\varepsilon_W\) and gives the positive relative sign.

**Negative trigger:** the derived comparison gives the negative sign, forcing the pair-of-pants topology and terminating the present BF-handle route.

**CAR falsifier:** a real structure alone is claimed to distinguish \(\varepsilon_W\) from \(-\varepsilon_W\).

**Phase falsifier:** \(\beta=\pm1\) is claimed to flip the two-dimensional determinant form despite \(\beta^2=1\).

**Circularity falsifier:** the weak sign is chosen by demanding genus one.

## 9. Certificate

The [colour/weak relative-orientation certificate](scripts/verify_octonion_orients_color_but_weak_car_structure_leaves_ribbon_sign_unfixed.mjs) verifies preservation of colour volume by cube-root frames, the two normalized real weak alternating forms, the determinant-weight-two action and the inability of CAR-compatible scalar signs to select between them.

## Companion documents

- [TRO ribbon-sign no-go](471_the_tro_product_does_not_select_the_furey_ribbon_genus_one_relative_orientation_sign_is_missing.md)
- [Furey ribbon topology selector](470_a_coherent_ribbon_orientation_turns_the_two_cycle_furey_graph_into_a_punctured_torus_with_the_bf_canonical_pair.md)
- [Octonion colour versus weak phase](420_the_octonion_cross_product_fixes_the_colour_phase_but_the_weak_jordan_algebra_is_phase_blind.md)
- [CAR real-structure phase ambiguity](422_a_specified_car_real_structure_reduces_the_weak_phase_to_a_sign_but_does_not_canonically_choose_that_real_structure.md)
- [Weak determinant-line no-go](421_the_weak_jordan_flag_determines_only_a_projective_spinor_and_cannot_canonically_supply_its_volume_phase.md)
