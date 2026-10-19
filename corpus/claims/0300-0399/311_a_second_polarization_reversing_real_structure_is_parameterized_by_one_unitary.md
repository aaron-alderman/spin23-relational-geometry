# A Second Polarization-Reversing Real Structure Is Parameterized by One Unitary

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08 and B11  
**Claim status:** exact common-carrier parameterization and kinetic sign classification; identification of the required unitary in Furey’s source algebra remains open

## 1. Solving the common-carrier equations abstractly

Work on one self-dual CAR carrier

\[
\mathcal K=K\oplus\bar K
\]

with standard Nambu involution

\[
\Gamma=\begin{pmatrix}0&I\\I&0\end{pmatrix}K_0.
\]

Consider a second antiunitary \(\Theta\) that also reverses the basis projection,

\[
\Theta P\Theta^{-1}=I-P,
\qquad \Theta^2=1.
\]

In a basis adapted to \(P\), every such operation has the form

\[
\boxed{
\Theta_W=
\begin{pmatrix}
0&W\\
W^T&0
\end{pmatrix}K_0,
\qquad W\in U(K).}
\]

The transpose in the lower block is forced by \(\Theta_W^2=1\).

## 2. The relative unitary contains all new information

The product of the two antiunitaries is linear:

\[
\boxed{
\Theta_W\Gamma
=\begin{pmatrix}W&0\\0&W^T\end{pmatrix}.}
\]

Thus the entire compatibility problem reduces to finding one unitary \(W\) on the 15-dimensional chiral particle space.

This is a major simplification. The missing 2016-to-2026 intertwiner no longer needs to be guessed as a general anti-linear map; it must determine the relative unitary between coefficient conjugation and the physical Furey conjugation.

## 3. Commuting and anticommuting branches in terms of \(W\)

If

\[
W^\dagger=W,
\qquad W^2=I,
\]

then

\[
[\Theta_W,\Gamma]=0,
\]

and \(\Theta_W\Gamma\) is an involutive grading.

If

\[
W^\dagger=-W,
\qquad W^2=-I,
\]

then

\[
\{\Theta_W,\Gamma\}=0,
\]

and \(\Theta_W\Gamma\) is a complex structure.

For a 15-dimensional complex particle space, an anti-Hermitian unitary certainly exists as \(W=iI\), but whether it has the required gauge, Lorentz, chirality and Furey action is a separate constraint.

## 4. Compatibility with the minimal kinetic operator

Let

\[
H_{\rm BdG}(h)=
\begin{pmatrix}h&0\\0&-\bar h\end{pmatrix}.
\]

Direct calculation gives

\[
\boxed{
\Theta_WH_{\rm BdG}(h)\Theta_W^{-1}
=-H_{\rm BdG}(WhW^\dagger).}
\]

There are therefore two important cases.

### Selector is a kinetic symmetry

If

\[
WhW^\dagger=-h,
\]

then

\[
\Theta_WH_{\rm BdG}\Theta_W^{-1}=H_{\rm BdG}.
\]

The relative unitary is a chiral symmetry of the particle kinetic operator.

### Selector is a second particle-hole symmetry

If

\[
WhW^\dagger=h,
\]

then

\[
\Theta_WH_{\rm BdG}\Theta_W^{-1}=-H_{\rm BdG}.
\]

Both antiunitaries reverse kinetic energy, and their product is a linear conserved symmetry.

## 5. Odd-dimension zero-mode theorem

Suppose \(\dim_{\mathbb C}K=N\) is odd and

\[
WhW^\dagger=-h.
\]

Taking determinants,

\[
\det h=\det(-h)=(-1)^N\det h=-\det h.
\]

Hence

\[
\boxed{\det h=0.}
\]

For the one-generation Furey particle space, \(N=15\). A polarization-reversing selector that is also an exact kinetic symmetry therefore forces at least one zero mode at every parameter point where the finite-dimensional equation applies.

This can be attractive for a protected massless channel, but it forbids a fully gapped one-generation particle Hamiltonian unless the symmetry is broken, momentum changes sign, or additional dimensions are included.

## 6. Momentum and locality caveat

For a field-theory kinetic operator, the symmetry may act as

\[
Wh(p)W^\dagger=-h(-p)
\]

rather than anticommute at fixed momentum. The determinant argument then forces a zero mode only at symmetry-invariant momenta such as \(p=0\).

This is the natural place to test Weyl cones, domain-wall modes and Floquet zero/\(\pi\) sectors. The finite-dimensional theorem remains exact; its physical application depends on the momentum action.

## 7. Furey interpretation

The unknown \(W\) must simultaneously encode:

- the difference between bare coefficient conjugation and \(C_F\);
- gauge representation conjugation;
- Lorentz chirality reversal;
- survivor exchange incidence;
- compatibility with the cyclic Higgs/Yukawa action;
- the grading or complex structure required for CP.

This is a much smaller and more falsifiable target than an unrestricted common intertwiner.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** Furey’s source algebra supplies a unique \(W\) satisfying the gauge/Lorentz intertwining equations and the desired kinetic sign, while its product with \(\Gamma\) matches the observed grading or complex structure.

**Zero-mode trigger:** the exact selector symmetry forces one protected chiral zero mode at a symmetry-invariant momentum and gives the correct Standard-Model interpretation.

**Gap falsifier:** an odd-dimensional fully gapped \(h\) is claimed together with an exact fixed-momentum anticommutation \(WhW^\dagger=-h\).

**Complex-structure falsifier:** the anticommuting branch is chosen with a \(W\) that fails gauge or Lorentz equivariance.

**Locality falsifier:** a momentum-dependent \(W(p)\) is introduced with no local real-space implementation.

## 9. Certificate

The [common-carrier second-antiunitary certificate](../../../verification/verify/verify_common_carrier_second_antiunitary_parameterization.mjs) verifies the \(W\)-parameterization, commuting/grading and anticommuting/complex branches, kinetic transformation law and odd-dimensional zero-mode theorem.

## Companion documents

- [Independent selector/Nambu factors overcount](310_tensoring_the_selector_pair_with_the_nambu_pair_overcounts_the_generation.md)
- [Two real structures generate grading or complex structure](308_two_real_structures_generate_either_a_grading_or_a_complex_structure.md)
- [Response selector versus CAR adjoint](307_the_response_selector_and_the_car_adjoint_are_two_distinct_antiunitaries.md)
- [Furey conjugation supplies the Nambu map](../0100-0199/166_furey_complex_conjugation_repairs_nambu_but_not_neutral_exchange.md)
