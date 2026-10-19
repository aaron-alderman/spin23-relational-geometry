# The Polarized Exceptional Determinant Projects Canonically onto the Triality Sign Cubic

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08, B09, B11 and B13  
**Claim status:** exact algebraic projection and parity theorem; physical complement fields, normalization and cross-sector universality remain open

## 1. The missing map can be written explicitly

The preceding branch identified two cubic objects:

- the exceptional complement determinant \(D(Z)=\det Z\);
- the triality-sheet Vandermonde \(\Delta_{\rm tri}(x)\).

For one complement field they live on different spaces. With three triality-sheet complement fields

\[
Z_1,Z_2,Z_3\in M_3(\mathbb C),
\]

there is a canonical bridge.

Define

\[
F_Z(x_1,x_2,x_3)
=\det(x_1Z_1+x_2Z_2+x_3Z_3).
\]

This is a homogeneous cubic polynomial on the sheet permutation representation.

## 2. Apply the sign projector

The canonical \(S_3\)-sign projector is

\[
\mathcal A_{\rm sign}F_Z(x)
=\frac16
\sum_{\pi\in S_3}
\operatorname{sgn}(\pi)
F_Z(\pi x).
\]

Because the sign subspace of cubic sheet polynomials is one-dimensional,

\[
\boxed{
\mathcal A_{\rm sign}F_Z(x)
=c(Z_1,Z_2,Z_3)\,
\Delta_{\rm tri}(x).}
\]

No arbitrary basis choice enters this equation. The only overall sign is the orientation choice of the three triality sheets.

## 3. Explicit coefficient

Let

\[
D(A,B,C)
\]

be the symmetric polarization of the determinant, normalized by

\[
D(Z,Z,Z)=\det Z.
\]

Write \(D_{iij}=D(Z_i,Z_i,Z_j)\). Coefficient comparison gives

\[
\boxed{
c=\frac12
\left(
-D_{112}+D_{113}+D_{122}
-D_{133}-D_{223}+D_{233}
\right).}
\]

The fully mixed term \(D_{123}\) and the pure cubes \(D_{iii}\) lie outside the sign projection.

The coefficient is generically nonzero when the three sheets carry inequivalent complement data. It vanishes whenever two sheets coincide.

## 4. Exact transformation laws

Under a sheet transposition,

\[
(Z_1,Z_2,Z_3)\longmapsto(Z_2,Z_1,Z_3),
\]

one has

\[
\boxed{c\longmapsto-c.}
\]

Under the exceptional antiunitary conjugation,

\[
Z_i\longmapsto\bar Z_i,
\]

one has

\[
\boxed{c\longmapsto\bar c.}
\]

Thus one complex coefficient carries both required structures:

- sheet-sign parity through \(c\mapsto-c\);
- internal complex orientation through \(c\mapsto\bar c\).

This is the explicit parity intertwiner missing from the previous documents.

## 5. Map to the canonical odd flavor operator

Use the canonical operators

\[
A=|s\rangle\langle o|+\mathrm{h.c.},
\]

\[
B=i(|t\rangle\langle o|-\mathrm{h.c.}).
\]

There is now a natural real-linear map

\[
\boxed{
\Delta(c)
=\operatorname{Re}(c)\,A
+\operatorname{Im}(c)\,B.}
\]

Hence

\[
\alpha=\operatorname{Re}c,
\qquad
\beta=\operatorname{Im}c,
\]

and

\[
\boxed{
\operatorname{Im}(z_2\bar z_1)
=\operatorname{Re}c\,\operatorname{Im}c.}
\]

The two coefficients are no longer unrelated counterterms. They are the quadratures of one polarized exceptional cubic coefficient.

## 6. Explicit checkpoint

Take

\[
Z_1=\operatorname{diag}(1,1,0),
\]

\[
Z_2=\operatorname{diag}(0,0,-6-6i),
\qquad
Z_3=0.
\]

Then

\[
F_Z(x)=(-6-6i)x_1^2x_2
\]

and the normalized sign projection gives

\[
\boxed{c=1+i.}
\]

Therefore

\[
\Delta(c)=A+B,
\qquad
\operatorname{Im}(z_2\bar z_1)=1.
\]

This example is algebraic rather than phenomenological, but it proves that the exceptional determinant projection can simultaneously be sheet-odd and CP-oriented.

## 7. What has genuinely been achieved

The previous speculative chain

\[
\text{exceptional cubic}
\dashrightarrow
\text{triality sign cubic}
\dashrightarrow
\text{CP doublet}
\]

is now an exact algebraic chain:

\[
\boxed{
\{Z_1,Z_2,Z_3\}
\xrightarrow{\det+\mathcal A_{\rm sign}}
c\,\Delta_{\rm tri}
\xrightarrow{\operatorname{Re}/\operatorname{Im}}
\Delta(c).}
\]

It provides:

- a canonical sign projection;
- the correct sheet-transposition parity;
- the correct antiunitary conjugation law;
- a canonical complex direction in the odd flavor plane;
- a nonzero Jarlskog-capable area for generic complex \(c\).

## 8. What remains physical rather than algebraic

The construction does not yet establish:

- what the three \(Z_i\) are physically;
- whether they are bosonic, composite or response fields;
- whether their determinant is a permissible local Lorentz scalar;
- why their backgrounds make both \(\operatorname{Re}c\) and \(\operatorname{Im}c\) nonzero;
- the absolute normalization of \(c\);
- whether one common \(c\) controls quarks and leptons;
- whether radiative corrections preserve the projection;
- whether the three-sheet direct sum has a valid CAR/Fock realization.

If the \(Z_i\) are direct fermion fields, the earlier three-Weyl statistics obstruction still applies. The credible realizations remain bosonic complements, fermion bilinears or response composites.

## 9. Relation to \(\alpha/\beta\)

The ratio is now

\[
\boxed{
\frac{\beta}{\alpha}
=\tan(\arg c)}
\]

when \(\operatorname{Re}c\ne0\).

This is a source relation, not yet a numerical prediction: the phase of \(c\) depends on the complement backgrounds. A source-native exceptional vacuum or arithmetic condition must determine \(\arg c\) before the ratio is predicted.

Nevertheless, the problem has changed qualitatively. Instead of two independent real coefficients, one needs the phase and magnitude of one complex exceptional invariant.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey/composite complement construction produces three physical \(Z_i\) whose sign-projected determinant coefficient \(c\) is shared across fermion sectors and has a calculable nontrivial phase.

**Arithmetic trigger:** an integral exceptional order quantizes \(\arg c\) or forces a distinguished non-real orbit.

**Response trigger:** phase-resolved wall/Furey probes measure the same \(c\) through the population-normal carrier.

**Projection falsifier:** the unprojected sum \(\sum_i\det Z_i\) is claimed to be the sign cubic; it lies in the trivial sheet sector.

**Statistics falsifier:** \(Z_i\) are ordinary fermions and \(\det Z_i\) is treated as a local bosonic cubic.

**CP falsifier:** \(c\) is purely real or purely imaginary while nonzero \(\operatorname{Re}c\,\operatorname{Im}c\) is claimed.

**Predictivity falsifier:** independent unrelated \(c_f\) are fitted in every fermion sector with no common exceptional source.

## 11. Certificate

The [polarized exceptional determinant sign-projection certificate](../../../verification/verify/verify_polarized_exceptional_determinant_sign_projection.mjs) verifies the polarization coefficient, alternating projector, sheet and antiunitary parities, coincidence limit and the map from one complex \(c\) to a nonzero CP area.

## Companion documents

- [Flag/sign/complex-structure CP operator](326_the_flag_sign_gradient_and_complex_structure_build_a_canonical_cp_capable_odd_operator.md)
- [Unique triality sign cubic](325_the_triality_orbit_has_a_unique_sign_cubic_but_it_does_not_yet_fix_the_cp_doublet.md)
- [Oriented exceptional cubic odd invariant](../0100-0199/185_oriented_exceptional_flag_unique_cubic_odd_invariant.md)
- [Exceptional complement representation and statistics gate](../0100-0199/186_exceptional_complement_quark_partial_match_and_statistics_gate.md)
- [Neutrino completion and composite exceptional complement](../0100-0199/187_neutrino_completion_unlocks_composite_exceptional_complement.md)
