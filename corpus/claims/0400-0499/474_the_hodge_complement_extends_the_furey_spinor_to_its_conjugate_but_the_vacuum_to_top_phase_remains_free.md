# The Hodge Complement Extends the Furey Spinor to Its Conjugate, but the Vacuum-to-Top Phase Remains Free

**Date:** 17 October 2026  
**Branches:** B03, B04, B08, B09, B10, B11 and B14  
**Claim status:** exact conjugate-spinor extension and phase no-go

## 1. Exact odd-spinor extension

Let

\[
S_+=\Lambda^{\mathrm{even}}\mathbb C^5,
\qquad
S_-=\Lambda^{\mathrm{odd}}\mathbb C^5.
\]

Fix an ordered orthonormal basis and volume

\[
\Omega=e_1\wedge e_2\wedge e_3\wedge e_4\wedge e_5.
\]

The Hodge-complement map sends an occupation subset \(I\) to its complement \(I^c\), with the sign determined by

\[
e_I\wedge e_{I^c}=s(I)\Omega.
\]

Because five is odd, complement exchanges parity:

\[
C_\Omega:S_+\longrightarrow S_-.
\]

It gives an explicit 16-to-16 extension of the completed Furey/Fock labelling.

## 2. It is full charge conjugation on the five-bit weights

If an occupied mode carries sign \(-1\) and an empty mode sign \(+1\), then

\[
q(I^c)=-q(I)
\]

in all five coordinates. Thus the complement map sends the even \(SO(10)\) spinor weights to the opposite odd spinor weights.

This is the full sign-reversing charge-conjugation operation that the internal Dirac face exchange could not realize within one sixteen.

## 3. Square and vacuum-to-top map

The Hodge signs obey

\[
s(I)s(I^c)=(-1)^{|I|(5-|I|)}=+1
\]

for every degree in five dimensions. Hence

\[
C_\Omega^2=1.
\]

In particular,

\[
C_\Omega|0\rangle=|\mathrm{top}\rangle
\]

in the chosen oriented basis.

This constructs the missing map, but not a canonical phase for it.

## 4. Antiunitary rephasing leaves the physical algebra unchanged

For any \(\phi\), define

\[
C_{\Omega,\phi}=e^{i\phi}C_\Omega.
\]

Since \(C_\Omega\) is anti-linear,

\[
C_{\Omega,\phi}^2=C_\Omega^2=1.
\]

Its conjugation action on every linear CAR operator is also unchanged, but

\[
\langle\mathrm{top}|C_{\Omega,\phi}|0\rangle=e^{i\phi}.
\]

The phase needed for determinant-line sewing is therefore invisible to the square and induced particle-hole automorphism.

## 5. Reversing the volume reverses the candidate ribbon sign

Replacing

\[
\Omega\mapsto-\Omega
\]

reverses every Hodge-complement sign and sends

\[
C_\Omega\mapsto-C_\Omega.
\]

It leaves:

- the even and odd weight sets;
- all gauge representations;
- the complement permutation;
- the CAR adjoint action;
- the condition \(C^2=1\)

unchanged.

But it flips the vacuum-to-top amplitude. That amplitude is precisely the candidate comparison between the oscillator five-volume and the colour-times-weak volume.

Thus extending to the conjugate spinor is necessary but still insufficient: an orientation of the determinant line must be supplied independently.

## 6. Relation to the ribbon selector

The two possible real amplitudes

\[
\langle\mathrm{top}|C|0\rangle=\pm1
\]

can be used to transport the octonionic colour orientation to the weak junction. Under that proposed sewing,

- positive amplitude gives matching ribbon orientations and the punctured torus;
- negative amplitude gives opposite orientations and the pair of pants.

This identification is now explicit, but the amplitude sign remains a determinant-line choice unless a regulator, action or measure fixes it.

## 7. What can fix the phase

Potential source mechanisms are narrower than before:

1. a regulated fermion Pfaffian with a chosen anomaly-free orientation;
2. a domain-wall spectral-flow convention fixed relative to the bulk mass;
3. an exceptional cubic matrix element coupling vacuum and top sectors;
4. a Majorana mass whose sign is physical after all allowed rephasings;
5. a reflection-positive Euclidean measure selecting a determinant orientation.

Each proposal must be invariant under allowed basis changes and compatible with the faithful gauge quotient.

## 8. Claim ledger

- **Exact:** Hodge complement extends the even sixteen to the odd conjugate sixteen.
- **Exact:** it flips all five weights and maps vacuum to top.
- **Exact:** it squares to \(+1\) in five dimensions.
- **Exact:** antiunitary rephasing leaves its square and CAR conjugation unchanged.
- **Exact:** volume reversal flips the vacuum-to-top sign without changing representation data.
- **Open:** a source-derived orientation of the five-mode determinant line.
- **Not established:** positive rather than negative ribbon sign.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** an anomaly-free regulator computes the Pfaffian/determinant orientation relative to the octonion colour volume and fixes the positive amplitude.

**Negative trigger:** a regulator-independent calculation fixes the negative amplitude, selecting the pair-of-pants branch.

**Antiunitary falsifier:** \(C^2=1\) or the induced CAR automorphism is claimed to fix the phase of \(C\).

**Extension falsifier:** adding the odd spinor is claimed by itself to orient the determinant line.

**Basis falsifier:** the sign is changed by an allowed orientation-preserving basis transformation.

## 10. Certificate

The [Hodge-complement certificate](../../../verification/verify/verify_hodge_complement_extends_furey_spinor_but_retains_an_unfixed_vacuum_to_top_phase.mjs) enumerates both spinors, verifies charge reversal and \(C^2=1\), locates the vacuum-to-top map and proves its phase freedom under antiunitary rephasing and volume reversal.

## Companion documents

- [Five-mode top-form parity obstruction](473_the_five_mode_top_form_lies_in_the_conjugate_spinor_so_the_existing_furey_intertwiner_cannot_fix_the_ribbon_sign.md)
- [Colour/weak ribbon-sign no-go](472_octonions_orient_the_color_junction_but_the_weak_car_structure_leaves_exactly_the_ribbon_sign_unfixed.md)
- [Dirac face exchange versus full charge conjugation](414_dirac_doubling_is_an_internal_weyl_face_exchange_while_charge_conjugation_requires_the_opposite_spinor.md)
- [Furey conjugate-ideal extension](../0000-0099/63_furey_conjugate_ideal_extension.md)
- [Domain-wall anomaly gate](../0200-0299/228_one_standard_model_generation_passes_domain_wall_anomaly_gate.md)
