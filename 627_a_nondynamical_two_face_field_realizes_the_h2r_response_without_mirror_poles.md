# A Nondynamical Two-Face Field Realizes the (H_2(mathbb R)) Response Without Mirror Poles

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B05, B08 and B11  
**Claim status:** exact quadratic auxiliary-field construction; source, stability and interacting completion remain open  
**Certificate:** [verify_auxiliary_two_face_schur_response.mjs](scripts/verify_auxiliary_two_face_schur_response.mjs)

## Executive result

A two-face variable need not be a second propagating matter multiplet. Let \(h=(h_A,h_B)^T\) be an algebraic auxiliary variable with Euclidean quadratic action

\[
S_{\rm aux}=h^\dagger Mh-g(h^\dagger O+O^\dagger h),
\]

where \(O=(O_A,O_B)^T\) is a pair of composite or boundary sources and

\[
M=
\begin{pmatrix}
a&x-iy\\
x+iy&a
\end{pmatrix},
\qquad
\Delta=a^2-x^2-y^2>0.
\]

Because \(h\) has no derivative term and \(M\) is invertible, it is eliminated algebraically. The response kernel is

\[
g^2M^{-1}
=\frac{g^2}{\Delta}
\begin{pmatrix}
a&-x+iy\\
-x-iy&a
\end{pmatrix}
\in H_2(\mathbb R)_+.
\]

Thus one can realize the exact two-face Jordan response without adding a mirror pole. This is a constructive existence result, not yet the derived Furey/Standard-Model action.

## 1. Exact Schur-complement calculation

Completing the square gives

\[
S_{\rm aux}
=(h-gM^{-1}O)^\dagger M(h-gM^{-1}O)
-g^2O^\dagger M^{-1}O.
\]

The inverse satisfies

\[
M^{-1}=\frac1\Delta
\begin{pmatrix}
a&-x+iy\\
-x-iy&a
\end{pmatrix}.
\]

It has equal diagonal populations and determinant \(1/\Delta>0\). The population-normal real form is therefore closed under the ordinary inverse wherever the determinant is nonzero. In Jordan language this is the rank-two quadratic inverse.

The sign of the induced interaction is fixed by the chosen Euclidean convention. Positivity of the response matrix does not by itself prove that a complete interacting scalar potential is bounded below; the remaining terms in the action must be audited.

## 2. Why no mirror particle appears

There is no \(\partial h\partial h\) term. The Euler–Lagrange equation is simply

\[
Mh=gO.
\]

For invertible \(M\), this determines \(h\) pointwise. It introduces no independent wave equation and no new propagator pole. In Hamiltonian language its momenta are primary constraints and the invertible algebraic Hessian removes the auxiliary coordinates.

This supplies one credible physical typing for the two topology faces:

\[
\text{Furey correspondence labels}
\longrightarrow
\text{two composite-source channels}
\longrightarrow
\text{one auxiliary response doublet},
\]

rather than two copies of asymptotic chiral matter.

## 3. Exchange-symmetric coupling is essential

If the faces couple with strengths \(g_A,g_B\), the effective diagonal entries are

\[
K_{AA}=\frac{a|g_A|^2}{\Delta},
\qquad
K_{BB}=\frac{a|g_B|^2}{\Delta}.
\]

They are equal only when \(|g_A|=|g_B|\). The certificate exhibits \((g_A,g_B)=(2,3)\) as an explicit positive kernel that leaves the exchange-fixed subspace through unequal diagonal populations.

Therefore equal face coupling is not cosmetic. It is the action-level origin required for the spectral condition identified in [document 626](626_exchange_fixed_matrix_spectral_measures_preserve_the_h2r_carrier.md).

## 4. What this construction solves

It establishes that the following requirements are mutually compatible at quadratic level:

1. a two-face response variable;
2. the exact population-normal \(H_2(\mathbb R)\) carrier;
3. positive algebraic response;
4. exchange-symmetric coupling;
5. no additional propagating mirror pole.

It also turns “the second topology is auxiliary” from a verbal possibility into an explicit local Gaussian construction.

## 5. What it does not solve

An algebraic auxiliary field produces a contact response. The scale-dependent spectral kernels of [documents 625](625_mass_thresholds_make_the_universal_carrier_state_run_while_preserving_h2r.md) and [626](626_exchange_fixed_matrix_spectral_measures_preserve_the_h2r_carrier.md) must arise from correlators of existing dynamical composites, boundary reduction, or a derived nonlocal effective kernel.

Simply adding a kinetic term for \(h\) changes the theory: it generally creates new poles and reopens the mirror/ghost audit. Nor has the programme yet derived:

- the concrete Standard-Model composite operators \(O_A,O_B\);
- exchange-symmetric coupling from Furey's CAR/nested algebra;
- Lorentz and gauge quantum numbers of the sources;
- boundedness of the full induced interaction;
- causal continuation and renormalization;
- a non-generic observable.

## 6. Stop-everything criteria

This auxiliary route fails physically if:

1. no gauge-covariant composite source pair realizes the two Furey topologies;
2. exchange symmetry does not force equal coupling magnitudes;
3. the induced interaction destabilizes the action;
4. momentum dependence requires an independent kinetic mirror field rather than existing spectral states;
5. quantization turns the algebraic constraint into a ghost or anomaly.

## 7. Next executable gate

Classify gauge-singlet quadratic composite sources in the completed two-topology module and test whether the exchange map sends \(O_A\leftrightarrow O_B\) while the Hermitian response singles out the same lepton sector. The preferred source must be built from existing fields, have a positive spectral function and couple with one exchange-symmetric coefficient.

## Reproducibility

```powershell
node scripts\verify_auxiliary_two_face_schur_response.mjs
```
