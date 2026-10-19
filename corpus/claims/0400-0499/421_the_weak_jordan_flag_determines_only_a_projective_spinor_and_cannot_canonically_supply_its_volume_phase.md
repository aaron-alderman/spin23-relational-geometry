# The Weak Jordan Flag Determines Only a Projective Spinor and Cannot Canonically Supply Its Volume Phase

**Date:** 17 October 2026  
**Branches:** B03, B04, B10, B11 and B14  
**Claim status:** exact no-canonicity theorem for data intrinsic to the selected \(H_2(\mathbb C)\) Jordan algebra

## 1. Decision reached

The missing weak phase in the exceptional/oscillator \(3+2\) intertwiner cannot be recovered from the weak Jordan algebra alone.

The obstruction is not merely that no formula has yet been found. The passage

\[
v\in\mathbb C^2
\longmapsto
P_v=vv^\dagger\in H_2(\mathbb C)
\]

forgets the central \(U(1)\) action exactly. Therefore any construction depending only on the Jordan observable \(P_v\), its product, trace, determinant, positive cone or transition probabilities is insensitive to

\[
v\mapsto e^{i\theta}v.
\]

But a weak volume transforms as

\[
v_1\wedge v_2\mapsto e^{2i\theta}v_1\wedge v_2.
\]

So the observable Jordan data cannot choose its phase.

## 2. The quotient that causes the obstruction

Let \(W=\mathbb C^2\). The unitary group acts on its Hermitian Jordan algebra by

\[
\rho(U)(A)=UAU^\dagger.
\]

Every central phase \(e^{i\theta}I_2\) lies in the kernel:

\[
\rho(e^{i\theta}I_2)(A)=A.
\]

Thus the observable action factors through

\[
U(2)/U(1)_{\rm centre}\cong SO(3)
\]

on the traceless Bloch-vector part. The Jordan algebra determines rays and Bloch rotations, not a phased fundamental spinor.

This is the precise distinction between:

- the intrinsic Euclidean Jordan algebra \(H_2(\mathbb C)\cong\mathbb R\oplus\mathbb R^3\);
- a chosen complex two-dimensional Hilbert-space realization \(W\);
- a chosen nonzero alternating form \(\varepsilon\in\Lambda^2W^*\).

The first does not canonically determine the phase of the third.

## 3. Equivariant no-go theorem

Suppose a rule intrinsic to \(H_2(\mathbb C)\) assigned a nonzero weak volume \(\varepsilon\in\Lambda^2W^*\). Because every central phase induces the identity Jordan automorphism, naturality would require the assigned volume to be unchanged by every \(e^{i\theta}I_2\).

On \(\Lambda^2W^*\), however,

\[
(e^{i\theta}I_2)\cdot\varepsilon=e^{-2i\theta}\varepsilon.
\]

Hence naturality demands

\[
e^{-2i\theta}\varepsilon=\varepsilon
\qquad\text{for every }\theta.
\]

Choosing, for example, \(\theta=\pi/4\) gives \(-i\varepsilon=\varepsilon\), and therefore

\[
\boxed{\varepsilon=0.}
\]

There is no nonzero volume covector canonically determined by the Jordan algebra.

Equivalently, the determinant-line character of the invisible central phase has weight two, while all intrinsic Jordan observables have weight zero.

## 4. Why the Jordan determinant does not evade the theorem

For

\[
A=\begin{pmatrix}a&z\\ \bar z&b\end{pmatrix}\in H_2(\mathbb C),
\]

the Jordan determinant is

\[
\det A=ab-|z|^2.
\]

It is a real quadratic form on the observable space. It fixes the Lorentz/Bloch cone and the norm of rank-two data, but it contains \(|z|^2\), not a phase-sensitive complex alternating tensor on \(W\).

For a rank-one observable \(P_v=vv^\dagger\),

\[
\det P_v=0
\]

for every representative of the ray. Thus the Jordan determinant cannot distinguish or normalize the phase of \(v_1\wedge v_2\).

## 5. What the exceptional cubic can and cannot do

The exceptional cubic norm can constrain how the colour and weak blocks sit inside the full flag, and the resulting stabilizer is the linked group

\[
S(U(3)\times U(2)).
\]

This guarantees that the combined determinant character

\[
\Lambda^3\mathbb C^3\otimes\Lambda^2\mathbb C^2
\]

is trivial under the selected group. It does **not** by itself identify a normalized vector in that line with the oscillator Fock top state. A one-dimensional invariant line is not the same thing as a canonically phased nonzero vector in it.

The distinction matters:

1. **Group-level statement:** the combined top line carries the trivial representation.
2. **Carrier-level statement:** each construction has a one-dimensional top line.
3. **Missing sewing datum:** a specified nonzero isomorphism between those two lines.

Only the third statement imposes \(\alpha^3\beta^2=1\) on a comparison map.

## 6. Consequence for the sixfold remainder

Octonion multiplication already enforces

\[
\alpha^3=1.
\]

The present theorem proves that intrinsic weak Jordan data cannot additionally enforce \(\beta^2=1\). Therefore the unconditional product-compatible ambiguity remains

\[
\boxed{\mathbb Z_3\times U(1).}
\]

The reduction to

\[
\mathbb Z_3\times\mathbb Z_2\cong\mathbb Z_6
\]

requires extra phase-sensitive sewing data. It is not derivable from the \(H_2(\mathbb C)\) Jordan flag alone.

## 7. Where the missing datum may legitimately enter

The no-go theorem narrows the search to structures not contained in the bare weak observable algebra:

- a chosen CAR/Fock vacuum and its top state;
- a complex symplectic form on the weak spinor, including its phase;
- an orientation or Pfaffian line supplied by a fermionic functional integral;
- a Yukawa/Higgs pairing that couples weak spinors to a phased external carrier;
- a cross-branch anomaly, sewing or modular condition that compares determinant lines;
- a source-level exceptional construction that specifies more than the Jordan subalgebra and its stabilizer.

Any successful proposal must say which of these extra data it uses. Calling the weak volume “canonical” without doing so is ruled out.

## 8. Branch decision

- **Closed:** \(H_2(\mathbb C)\) determines the weak spinor only projectively.
- **Closed:** its determinant quadratic form cannot fix the phase of \(\Lambda^2\mathbb C^2\).
- **Closed:** no nonzero weak volume is natural under all Hilbert-space realizations inducing the same Jordan data.
- **Still open:** whether the full exceptional cubic plus a specified embedding supplies an additional determinant-line trivialization.
- **Still open:** whether the Furey CAR vacuum/top state supplies the matching trivialization and makes the comparison canonical modulo the faithful gauge kernel.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** exhibit a source-defined, phase-sensitive isomorphism from the exceptional combined top line to the Furey Fock top line and prove that changing allowed frames alters it only by the faithful \(\mathbb Z_6\) kernel.

**No-go falsifier:** produce an intrinsic Jordan expression that transforms with central \(U(1)\) weight two. An expression built only from Jordan products, trace, determinant and spectral projectors has weight zero and cannot qualify.

**Canonicity falsifier:** infer a distinguished vector merely from the existence of a one-dimensional invariant subspace.

**Scope warning:** this theorem excludes the bare \(H_2(\mathbb C)\) algebra as the phase source; it does not exclude additional data carried by the full exceptional embedding.

## 10. Certificate

The [weak Jordan determinant-line no-go certificate](../../../verification/verify/verify_weak_jordan_data_cannot_fix_spinor_volume_phase.mjs) verifies central-phase invisibility on all Hermitian observables, the nontrivial weight-two action on the weak determinant line, phase blindness of the Jordan determinant and the surviving \(\mathbb Z_3\times U(1)\) product ambiguity.

## Companion documents

- [Octonion and weak phase reduction](420_the_octonion_cross_product_fixes_the_colour_phase_but_the_weak_jordan_algebra_is_phase_blind.md)
- [Common \(3+2\) flag intertwiner](419_the_common_exceptional_and_oscillator_3plus2_flag_has_a_two_scalar_intertwiner_ambiguity.md)
- [Faithful global \(\mathbb Z_6\) quotient](418_the_faithful_global_group_of_the_puncture_neutral_ternary_stabilizer_has_the_standard_z6_quotient.md)
- [Furey weak Jordan ladder](../0000-0099/69_furey_weak_jordan_ladder_spin23.md)
