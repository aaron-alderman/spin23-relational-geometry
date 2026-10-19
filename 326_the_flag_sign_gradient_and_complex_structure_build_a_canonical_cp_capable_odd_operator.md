# The Flag, Sign Gradient and Complex Structure Build a Canonical CP-Capable Odd Operator

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08, B09, B11 and B13  
**Claim status:** exact canonical-basis and CP-operator construction up to two real scales; derivation and normalization of those scales from the exceptional/Furey action remain open

## 1. Resolving the odd-doublet basis ambiguity

The unique triality sign cubic supplies one odd sheet direction, but the required Hermitian flavor spurion has two complex components. Residual \(S_2\) symmetry alone leaves a two-dimensional intertwiner ambiguity.

The nested flag and the unit element supply a canonical basis for that ambiguity.

## 2. Three canonical sheet directions

Normalize the three sheet vectors:

\[
s=\frac1{\sqrt3}(1,1,1),
\]

\[
t=\frac1{\sqrt6}(1,1,-2),
\]

\[
o=\frac1{\sqrt2}(1,-1,0).
\]

They have distinct meanings:

- \(s\) is the \(S_3\)-invariant sheet singlet;
- \(t\) is the \(S_2\)-even contrast selected by the nested \(H_2\) flag;
- \(o\) is the \(S_2\)-odd direction selected by the transverse gradient of the triality Vandermonde.

Under the residual swap,

\[
Ps=s,\qquad Pt=t,\qquad Po=-o.
\]

Thus \(E_+=\operatorname{span}\{s,t\}\) and \(E_-=\operatorname{span}\{o\}\) are no longer abstract multiplicity spaces: their bases are fixed by the unit, flag and orientation.

## 3. Two canonical odd Hermitian maps

Define

\[
A=|s\rangle\langle o|+|o\rangle\langle s|,
\]

and

\[
B=i\left(
|t\rangle\langle o|-|o\rangle\langle t|
\right).
\]

Both are Hermitian and odd:

\[
PAP=-A,
\qquad
PBP=-B.
\]

The factor of \(i\) in \(B\) is not decorative. It uses the retained complex orientation that survives the Furey exchange pairing and turns the flag-contrast coupling into the quadrature conjugate of the singlet coupling.

The most general operator in the resulting canonical two-plane is

\[
\boxed{
\Delta_*=\alpha A+\beta B,
\qquad
\alpha,\beta\in\mathbb R.}
\]

## 4. The induced complex doublet

Its two odd couplings are

\[
z_1=\langle s|\Delta_*|o\rangle=\alpha,
\]

\[
z_2=\langle t|\Delta_*|o\rangle=i\beta.
\]

Therefore

\[
\boxed{
z=(\alpha,i\beta),
\qquad
\operatorname{Im}(z_2\bar z_1)=\alpha\beta.}
\]

Whenever both real scales are nonzero, the CP area is nonzero automatically.

This resolves the directional ambiguity: the flag fixes which two even directions are coupled, the sign cubic fixes the odd direction, and the complex structure fixes their relative quadrature. What remains unfixed is the magnitude ratio \(\beta/\alpha\).

## 5. Explicit flavor invariant

In the \((s,t,o)\) basis, take

\[
H_u=\operatorname{diag}(1,2,4)
\]

and

\[
H_d=
\begin{pmatrix}
10&1&\alpha\\
1&11&i\beta\\
\alpha&-i\beta&12
\end{pmatrix}.
\]

For \(\alpha=\beta=1\),

\[
\boxed{
\operatorname{Tr}[H_u,H_d]^3=36i.}
\]

Replacing \(i\beta\) by a real \(\beta\) makes the invariant vanish. The retained complex orientation is therefore doing essential physical work.

## 6. A new cross-branch chain

The construction gives an explicit synthesis:

\[
\begin{array}{rcl}
\text{rank-three triality orbit}
&\Longrightarrow& s\oplus(t,o),\\
\text{nested }H_2\text{ flag}
&\Longrightarrow& t\text{ even},\\
\text{unique sign cubic}
&\Longrightarrow& o\text{ odd},\\
\text{retained complex structure}
&\Longrightarrow& B=i(|t\rangle\langle o|-\mathrm{h.c.}),\\
\text{two real couplings}
&\Longrightarrow&\operatorname{Im}(z_2\bar z_1)=\alpha\beta.
\end{array}
\]

This is the first construction in the programme where the exceptional rank-three branch, nested flag, Furey complex structure and measured three-family CP target all enter one finite operator.

## 7. What remains arbitrary

Two real scales remain:

\[
\alpha,\qquad\beta.
\]

Symmetry fixes the operator directions but not:

- whether either coefficient is nonzero;
- their relative magnitude or sign;
- their values in the up, down, charged-lepton and neutrino sectors;
- the accompanying even-sector Yukawa matrices;
- their renormalization or dynamical vacuum expectation values.

If each fermion sector receives independent \(\alpha_f,\beta_f\), most flavor predictivity is lost. A source-derived invariant must relate them.

## 8. Candidate sources of the two scales

The present corpus suggests several concrete possibilities:

1. \(\alpha\) from the nested-flag anisotropy and \(\beta\) from the antiunitary-odd exceptional orientation;
2. the real and imaginary parts of a polarized exceptional determinant coefficient;
3. two arithmetic periods associated with the integral flag;
4. one modulus and one phase response extracted from the wall/Furey Herglotz carrier;
5. Dirac and Majorana neutrino-completion parameters tied by triality.

Each proposal is testable because it must land on \(A\) and \(B\), not on arbitrary flavor matrices.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the exceptional/Furey action produces \(\Delta_*=\alpha A+\beta B\) with a fixed nonzero ratio \(\beta/\alpha\) shared predictively across fermion sectors.

**Orientation trigger:** the antiunitary-odd exceptional cubic supplies precisely the coefficient of \(B\), while the flag anisotropy supplies \(A\).

**Relational trigger:** \(\alpha\beta\) equals a phase-resolved \(H_2(\mathbb R)\) response area measurable in the wall/Furey carrier.

**Reality falsifier:** the factor \(i\) is removed while nonzero CP is still claimed.

**Canonicity falsifier:** \(s,t,o\) are replaced by arbitrary sheet vectors without a unit, flag or sign-gradient derivation.

**Predictivity falsifier:** unrelated \(\alpha_f,\beta_f\) are fitted independently in every sector with no common source.

**Completeness falsifier:** this two-parameter odd operator is claimed to determine all masses and mixing without specifying the even flavor blocks.

## 10. Certificate

The [flag/sign-cubic/complex-structure CP-operator certificate](scripts/verify_flag_sign_cubic_complex_structure_cp_operator.mjs) checks the canonical orthonormal sheet basis, parities and Hermiticity of \(A,B\), the induced \(z=(\alpha,i\beta)\), its CP area and the nonzero cubic commutator invariant.

## Companion documents

- [Unique triality sign cubic](325_the_triality_orbit_has_a_unique_sign_cubic_but_it_does_not_yet_fix_the_cp_doublet.md)
- [Minimal complex \(S_2\)-odd CP doublet](324_a_single_complex_s2_odd_doublet_is_the_minimal_triality_breaking_source_for_three_family_cp.md)
- [Three-family CP survives exchange pairing](305_three_family_cp_survives_furey_exchange_pairing_as_a_complex_structure_graded_invariant.md)
- [Oriented exceptional cubic odd invariant](185_oriented_exceptional_flag_unique_cubic_odd_invariant.md)
- [Population-normal Furey carrier](303_furey_survivor_exchange_induces_the_charge_compatible_population_normal_real_form.md)
