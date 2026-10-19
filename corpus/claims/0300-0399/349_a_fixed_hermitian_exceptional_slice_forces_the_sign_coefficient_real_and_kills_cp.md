# A Fixed Hermitian Exceptional Slice Forces the Sign Coefficient Real and Kills CP

**Date:** 17 October 2026  
**Branches:** B03, B05, B06, B08, B09, B10, B11, B12 and B13  
**Claim status:** exact Hermitian determinant and coefficient-lattice no-go; the correct complexified Furey/exceptional complement space remains to be derived

## 1. Test the natural Hermitian restriction

The preceding benchmark allowed arbitrary

\[
Z_i\in M_3(\mathbb Z[i]).
\]

The exceptional Jordan algebra suggests a more restrictive possibility: each complement field lies in one fixed Hermitian slice,

\[
Z_i=Z_i^\dagger.
\]

For Gaussian entries, this means:

- diagonal entries lie in \(\mathbb Z\);
- off-diagonal entries lie in \(\mathbb Z[i]\);
- opposite off-diagonal entries are conjugate.

## 2. Hermitian determinants are real

For real sheet variables \(x_i\),

\[
X(x)=x_1Z_1+x_2Z_2+x_3Z_3
\]

is Hermitian. Therefore

\[
\det X(x)\in\mathbb R.
\]

Because the determinant polynomial has Gaussian-integer coefficients and is real for all real \(x\), every coefficient is in

\[
\mathbb Z[i]\cap\mathbb R=\mathbb Z.
\]

Thus

\[
F_Z(x)\in\mathbb Z[x_1,x_2,x_3].
\]

## 3. The sign coefficient is real

The normalized alternating projector uses only real rational coefficients:

\[
\mathcal A_{\rm sign}F_Z
=\frac16\sum_{\pi\in S_3}
\operatorname{sgn}(\pi)F_Z(\pi x).
\]

Hence

\[
\boxed{
c\in\frac16\mathbb Z.}
\]

In particular,

\[
\boxed{\operatorname{Im}c=0.}
\]

The exceptional CP area vanishes:

\[
\operatorname{Re}c\,\operatorname{Im}c=0.
\]

## 4. The real lattice bound is sharp

Use the Hermitian diagonal pencil

\[
\operatorname{diag}(x_1,x_1,qx_2),
\qquad
q\in\mathbb Z.
\]

Its determinant is

\[
q\,x_1^2x_2,
\]

and the sign projection gives

\[
c=-\frac q6.
\]

Every point of \(\frac16\mathbb Z\) is realized. Therefore the unrestricted Hermitian Gaussian coefficient lattice is exactly

\[
\boxed{
\Lambda_c^{\rm Herm}
=\frac16\mathbb Z.}
\]

The Hermitian constraint does not remove the CP-trivial axis shell. It removes every off-axis coefficient.

## 5. Exceptional-Jordan version

The same conclusion is more general than Gaussian matrices.

For a real cubic Jordan algebra such as

\[
H_3(\mathbb O),
\]

the cubic norm

\[
N:J\to\mathbb R
\]

is real valued. Its full polarization

\[
N(X,Y,Z)
\]

is a real trilinear form on the real Jordan algebra.

If all three sheet fields are genuine elements of that real algebra, every combination entering the sign coefficient is real. Therefore a complex \(c\) cannot arise from the real exceptional cubic norm alone.

## 6. Where the imaginary quadrature must enter

At least one extra structure is required:

1. complexification
   \[
   J\longrightarrow J_\mathbb C;
   \]
2. non-Hermitian operator-valued complement fields;
3. distinct sheet real structures whose comparison carries a phase;
4. a Furey complex structure acting after the real exceptional projection;
5. retarded or absorptive response phases;
6. a complex vacuum expectation value not contained in the original real Jordan algebra.

This identifies the division of labor:

\[
\boxed{
\text{real exceptional determinant}
\longrightarrow
\text{sheet-odd real amplitude},}
\]

\[
\boxed{
\text{Furey/response complex structure}
\longrightarrow
\text{second CP quadrature}.}
\]

## 7. Consequence for the existing \(c=1+i\) checkpoint

The earlier diagonal example used a coefficient

\[
q=-6-6i.
\]

Its third diagonal entry was complex and therefore not Hermitian. The example correctly proves the complexified determinant map can produce \(c=1+i\), but it does not lie in one fixed Hermitian Jordan slice.

This is not a flaw in the computation. It is evidence that complexification was doing essential work.

## 8. Interaction with the phase potential

The minimal potential for \(c=\alpha+i\beta\) assumes both quadratures exist as dynamical variables. A strictly real Hermitian exceptional coefficient has only

\[
\beta=0.
\]

No potential on that real line can spontaneously generate an imaginary component unless the field space itself is enlarged.

Therefore the correct sequence is:

\[
\text{derive complexified coefficient space}
\longrightarrow
\text{derive its reality operation}
\longrightarrow
\text{write the phase potential}.
\]

Writing the complex potential first does not establish that the real exceptional theory contains its field.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a source-derived Furey complex structure maps the real sign coefficient and one independent exceptional response into the two quadratures of one physical \(c\).

**Response trigger:** an absorptive/Herglotz phase supplies \(\operatorname{Im}c\) while preserving the real exceptional norm as the dispersive quadrature.

**Hermitian falsifier:** three fields in one fixed real Hermitian Jordan algebra are claimed to produce a complex value of its real cubic norm.

**Checkpoint falsifier:** the non-Hermitian \(c=1+i\) diagonal example is presented as a Hermitian exceptional-order configuration.

**Potential falsifier:** spontaneous CP is claimed from a field space constrained to \(\beta=0\).

## 10. Pinned dependency

The Hermitian arithmetic branch is closed negatively:

\[
\Lambda_c^{\rm Herm}=\frac16\mathbb Z
\]

in the Gaussian benchmark, and the real exceptional cubic is likewise real.

The productive branch is now the complexification map: determine exactly how Furey’s retained complex structure or causal response supplies the missing independent quadrature without making the coefficient arbitrary.

## 11. Certificate

The [Hermitian Gaussian sign-coefficient reality certificate](../../../verification/verify/verify_hermitian_gaussian_sign_coefficient_is_real.mjs) checks real determinants for nontrivial Hermitian Gaussian matrices, reality of the polarized sign coefficient, sharp realization of \(\frac16\mathbb Z\), and recovery of an imaginary coefficient only after leaving the Hermitian slice.

## Companion documents

- [Gaussian matrix-pencil coefficient lattice](348_the_gaussian_matrix_pencil_has_exact_sign_coefficient_lattice_one_sixth_z_i.md)
- [Polarized exceptional determinant](327_the_polarized_exceptional_determinant_projects_canonically_onto_the_triality_sign_cubic.md)
- [Minimal exceptional-coefficient potential](343_a_minimal_exceptional_coefficient_potential_fixes_equal_cp_quadratures_but_not_uniquely.md)
- [Furey and the \(Spin(2,3)\) middle rung](../0000-0099/69_furey_weak_jordan_ladder_spin23.md)
