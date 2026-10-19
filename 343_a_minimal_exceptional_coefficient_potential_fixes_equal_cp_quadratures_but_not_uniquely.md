# A Minimal Exceptional-Coefficient Potential Fixes Equal CP Quadratures, but Not Uniquely

**Date:** 17 October 2026  
**Branches:** B03, B05, B06, B08, B09, B11 and B13  
**Claim status:** exact vacuum and Hessian analysis for the minimal symmetry-compatible potential; derivation of its restricted coefficients from the exceptional action remains open

## 1. Known transformation laws

The polarized exceptional determinant produces one complex coefficient

\[
c=\alpha+i\beta.
\]

Its established transformations are:

\[
c\mapsto-c
\]

under an odd sheet permutation, and

\[
c\mapsto\bar c
\]

under the exceptional antiunitary.

Thus the effective coefficient potential must be invariant under

\[
(\alpha,\beta)\mapsto(-\alpha,-\beta),
\qquad
(\alpha,\beta)\mapsto(\alpha,-\beta).
\]

## 2. Minimal phase-fixing potential

Consider

\[
\boxed{
V_{\rm min}(\alpha,\beta)
=\lambda(\alpha^2+\beta^2-v^2)^2
+\kappa(\alpha^2-\beta^2)^2,}
\]

with

\[
\lambda>0,
\qquad
\kappa>0.
\]

Both known transformations are exact symmetries.

The first term fixes the modulus. The second penalizes unequal quadratures.

## 3. Vacuum set

The global minima obey

\[
\alpha^2+\beta^2=v^2,
\qquad
\alpha^2-\beta^2=0.
\]

Therefore

\[
\boxed{
|\alpha|=|\beta|=\frac{v}{\sqrt2}.}
\]

Equivalently,

\[
\boxed{
\arg c=\frac\pi4+\frac{n\pi}{2},
\qquad
n=0,1,2,3.}
\]

The magnitude of the CP area is fixed:

\[
\boxed{
|\operatorname{Re}c\,\operatorname{Im}c|
=\frac{v^2}{2}.}
\]

The signs label four vacua related by sheet sign and CP.

## 4. Spontaneous CP breaking

CP sends

\[
(\alpha,\beta)\mapsto(\alpha,-\beta).
\]

No vacuum with \(\alpha\beta\ne0\) is individually fixed. Instead CP exchanges pairs of vacua. Choosing one minimum therefore breaks the antiunitary spontaneously.

The sheet-sign operation also permutes the vacua:

\[
(\alpha,\beta)\mapsto(-\alpha,-\beta).
\]

The potential does not explicitly break either discrete symmetry.

## 5. Hessian and scalar modes

At \(\alpha=\beta=v/\sqrt2\), use normalized directions

\[
e_r=\frac1{\sqrt2}(1,1),
\qquad
e_\theta=\frac1{\sqrt2}(1,-1).
\]

The Hessian eigenvalues are

\[
\boxed{
m_r^2=8\lambda v^2,
\qquad
m_\theta^2=8\kappa v^2.}
\]

The radial mode changes \(|c|\). The angular mode changes the relative quadrature and is the phase-locking excitation.

Both are stable when \(\lambda,\kappa>0\).

## 6. The general symmetry-allowed quartic is less predictive

For an elementary dimension-one complex field, the general renormalizable \(c\mapsto-c\), \(c\mapsto\bar c\) potential contains

\[
\begin{aligned}
V_{\rm gen}
={}&a|c|^2
+b(c^2+c^{*2})
+\lambda|c|^4\\
&+\kappa_1|c|^2(c^2+c^{*2})
+\eta(c^4+c^{*4}),
\end{aligned}
\]

with real coefficients.

Writing \(c=\rho e^{i\theta}\), a nontrivial phase extremum satisfies

\[
\boxed{
\cos2\theta
=-\frac{b+\kappa_1\rho^2}{4\eta\rho^2}}
\]

when the right-hand side lies in \([-1,1]\).

The phase therefore moves continuously with symmetry-allowed coefficients. The known discrete symmetries do not force

\[
\theta=\frac\pi4.
\]

The minimal potential is a viable mechanism, not a uniqueness theorem.

## 7. Composite-dimension obstruction

The coefficient \(c\) is cubic in the complement fields \(Z_i\). If each \(Z_i\) is a canonical dimension-one scalar, then

\[
[c]=3.
\]

Consequently:

\[
|c|^2
\]

is dimension six in the microscopic fields, and

\[
|c|^4
\]

is dimension twelve. The minimal potential is not a renormalizable fundamental \(Z_i\) potential.

It may still arise as:

- an effective potential below an exceptional-composite scale;
- an auxiliary-field description;
- a nonperturbative condensate potential;
- a response free energy rather than a microscopic Lagrangian.

This distinction must remain explicit.

## 8. Relation to the selected reality grading

The flavor operator is

\[
\Delta(c)=\alpha A+\beta B.
\]

The triality-selected grading gives

\[
A=(K\text{-even},W\text{-odd}),
\qquad
B=(K\text{-odd},W\text{-even}).
\]

The equal-quadrature vacuum excites both complementary breaking characters with equal magnitude:

\[
\Delta_\star
=\frac{v}{\sqrt2}(\pm A\pm B).
\]

This is the simplest dynamical completion of the two-real-structure CP picture.

## 9. What would make the phase predictive

One needs an additional principle eliminating or relating the general coefficients, for example:

- an enlarged continuous symmetry broken only by one exceptional anisotropy;
- supersymmetry or a holomorphic superpotential;
- an integral exceptional order allowing only discrete phases;
- a determinant norm identity fixing the quartic relation;
- radiative generation dominated by one sign-projected invariant;
- a microscopic auxiliary field with the minimal potential.

Absent such a principle, \(\beta/\alpha\) remains a fitted vacuum angle.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** the exceptional/Furey action derives the minimal coefficient relation and predicts a nonzero vacuum phase shared across fermion sectors.

**Arithmetic trigger:** an integral order restricts \(c/|c|\) to the equal-quadrature units.

**Symmetry falsifier:** \(\arg c=\pi/4\) is claimed from \(c\mapsto-c\) and \(c\mapsto\bar c\) alone.

**Renormalizability falsifier:** the quartic \(V(c)\) is called a renormalizable microscopic \(Z_i\) potential when \(c\) is cubic in dimension-one fields.

**Stability falsifier:** either Hessian eigenvalue is negative at the claimed vacuum.

**Predictivity falsifier:** the general phase-moving invariants are permitted but silently set to zero.

## 11. Pinned dependency

The phase-fixing mechanism exists, and it predicts maximal equal-quadrature CP on a restricted coefficient locus.

The branch is pinned at the microscopic reason that selects this locus over the general symmetry-allowed potential.

## 12. Certificate

The [exceptional-\(c\) phase-fixing potential certificate](scripts/verify_exceptional_c_phase_fixing_potential_and_nonuniqueness.mjs) checks the vacua, CP area, Hessian eigenvalues, discrete symmetries and a general-quartic checkpoint whose phase differs from \(\pi/4\).

## Companion documents

- [Polarized exceptional determinant](327_the_polarized_exceptional_determinant_projects_canonically_onto_the_triality_sign_cubic.md)
- [Triality-selected reality grading](338_triality_selects_a_unique_singlet_doublet_reality_grading_up_to_sign.md)
- [Exceptional phase in neutrino spectra](329_the_exceptional_cubic_phase_splits_dirac_completion_from_majorana_index_breaking.md)
- [General complex-Yukawa seesaw no-go](334_general_complex_yukawas_make_the_type_i_seesaw_congruence_surjective.md)
