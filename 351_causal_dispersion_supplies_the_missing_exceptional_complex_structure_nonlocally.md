# Causal Dispersion Supplies the Missing Exceptional Complex Structure Nonlocally

**Date:** 17 October 2026  
**Branches:** B02, B03, B04, B05, B06, B08 and B11  
**Claim status:** exact Hilbert-transform complex structure and Kramers–Kronig relation; identification of the exceptional complement fields with physical retarded responses remains open

## 1. The missing relation need not be algebraic at one frequency

The complexified exceptional coefficient uses

\[
\mathbf Z(\omega)
=\mathbf X(\omega)+i\mathbf Y(\omega).
\]

Predictivity requires a relation

\[
\mathbf Y=\mathfrak J\mathbf X.
\]

For a causal retarded response, such a relation already exists: the real and imaginary parts are Hilbert-transform partners.

## 2. Hilbert transform

For a sufficiently decaying real response component \(f(\omega)\), define

\[
(\mathcal Hf)(\omega)
=\frac1\pi
\operatorname{PV}
\int_{\mathbb R}
\frac{f(\omega')}{\omega-\omega'}\,d\omega'.
\]

In Fourier-conjugate time,

\[
\widehat{\mathcal Hf}(t)
=-i\,\operatorname{sgn}(t)\,\hat f(t).
\]

On the subspace with no zero-frequency constant mode,

\[
\boxed{\mathcal H^2=-I.}
\]

Thus \(\mathcal H\) is a genuine real complex structure on the response-function space.

## 3. Analytic signal

The combination

\[
f_{\rm an}
=f+i\mathcal Hf
\]

has one-sided Fourier support. It is the boundary value of an analytic function in the appropriate half-plane.

For matrix-valued responses, \(\mathcal H\) acts entrywise:

\[
\mathbf Z
=\mathbf X+i\mathcal H\mathbf X.
\]

Therefore a disciplined causal choice is

\[
\boxed{
\mathbf Y=\mathcal H\mathbf X.}
\]

No independent imaginary complement triple is introduced.

## 4. Kramers–Kronig interpretation

For a retarded response \(G(\omega+i0)\),

\[
G=X+iY,
\]

causality gives, up to sign conventions,

\[
X=\mathcal H Y,
\qquad
Y=-\mathcal H X.
\]

The dispersive and absorptive quadratures determine one another from the complete frequency dependence.

At one frequency, however, \(Y(\omega)\) is not determined by \(X(\omega)\) alone. It depends on the entire spectrum.

This explains why a local algebraic calculation could not fix \(\arg c\): the missing complex structure may be nonlocal in frequency.

## 5. Insert the causal relation into the exceptional cubic

With

\[
\mathbf Y=\mathcal H\mathbf X,
\]

the coefficient becomes

\[
\begin{aligned}
\operatorname{Re}c
={}&T(\mathbf X,\mathbf X,\mathbf X)
-3T(\mathbf X,\mathcal H\mathbf X,\mathcal H\mathbf X),\\
\operatorname{Im}c
={}&3T(\mathbf X,\mathbf X,\mathcal H\mathbf X)
-T(\mathcal H\mathbf X,\mathcal H\mathbf X,\mathcal H\mathbf X).
\end{aligned}
\]

Both quadratures are functionals of one real spectral response.

This is a concrete realization of

\[
\mathbf Y=\mathfrak J(\mathbf X)
\]

with

\[
\mathfrak J=\mathcal H.
\]

## 6. Passivity adds a further restriction

For a passive matrix-valued Herglotz response,

\[
\operatorname{Im}G(z)\succeq0
\qquad
(\operatorname{Im}z>0).
\]

On the real boundary, the absorptive spectral density is positive semidefinite where defined.

Therefore \(\mathbf Y\) is not an arbitrary Hilbert partner: its matrix spectral measure obeys positivity. This can constrain the available exceptional coefficients beyond complexification alone.

The earlier two-mode theorem remains relevant: one positive rank-one spectral direction cannot orient a three-port loop; at least two coherent spectral directions are required.

## 7. Why equal quadratures are not automatic

The Hilbert transform rotates phases by \(\pi/2\) in Fourier-conjugate space, but it does not imply

\[
|\operatorname{Re}c(\omega)|
=|\operatorname{Im}c(\omega)|
\]

at every physical frequency.

That equality would require a special spectral shape, resonance condition, self-duality or norm-shell constraint.

Thus causal dispersion solves the independence problem, not the phase-magnitude problem.

## 8. Relation to Furey’s complex structure

There are now two candidate complex structures:

\[
J_F
\]

acting internally on the Furey/operator module, and

\[
\mathcal H
\]

acting on frequency-dependent responses.

They may:

- coincide after the internal module is represented as a response channel;
- tensor together;
- commute and produce a grading;
- anticommute and generate a quaternionic extension;
- constrain different levels of the construction.

No identification should be made without an explicit intertwiner.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey complement response has a spectral measure whose Hilbert partner yields the exceptional \(c\) and matches a measured CP invariant.

**Two-mode trigger:** the minimal two-direction spectral response simultaneously produces the required loop phase and the exceptional cubic quadratures.

**Causality falsifier:** \(\mathbf X\) and \(\mathbf Y\) are chosen independently despite a claimed retarded analytic response.

**Locality falsifier:** \(Y(\omega)\) is claimed to follow from \(X(\omega)\) at one frequency without spectral information.

**Phase falsifier:** \(\mathcal H^2=-I\) is used to infer equal pointwise quadrature magnitudes.

**Passivity falsifier:** the proposed absorptive matrix violates spectral positivity.

## 10. Pinned dependency

The causal complex structure is explicit. The remaining tasks are:

1. identify the physical matrix-valued complement response;
2. derive its positive spectral measure;
3. insert it into the polarized exceptional cubic;
4. test whether its spectrum selects the equal-quadrature or norm-two phase.

## 11. Certificate

The [discrete Hilbert causal-complex-structure certificate](scripts/verify_discrete_hilbert_transform_as_causal_complex_structure.mjs) verifies \(\mathcal H^2=-I\) on a zero-mean sampled response space, real linearity and one-sided support of \(X+i\mathcal HX\).

## Companion documents

- [Complexified exceptional cubic](350_complexifying_the_real_exceptional_cubic_supplies_cp_quadratures_with_fixed_parity.md)
- [Minimal causal spectral orientation](332_two_spectral_modes_are_the_minimum_for_causal_three_port_orientation.md)
- [Lorentzian passivity and causal response](70_lorentzian_passivity_and_causal_response.md)
- [Spectral wedge and phase curvature](137_spectral_wedge_and_phase_curvature.md)
