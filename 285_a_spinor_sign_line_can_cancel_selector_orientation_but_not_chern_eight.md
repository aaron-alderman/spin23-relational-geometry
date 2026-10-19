# A Spinor Sign Line Can Cancel Selector Orientation but Not Chern Eight

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10 and B11  
**Claim status:** exact characteristic-class and holonomy accounting; physical identification of the selector loop with a spin-rotation loop remains open

## 1. Minimal sign compensation

Let \(L_{\rm sel}\to S^1\) be the Möbius selector eigenline with

\[
w_1(L_{\rm sel})=1.
\]

Let \(L_{\rm spin}\to S^1\) be another real sign line whose section changes sign after the same loop, as a spinor does under a lifted \(2\pi\) rotation:

\[
w_1(L_{\rm spin})=1.
\]

First Stiefel--Whitney classes add under tensor product:

\[
w_1(L\otimes M)=w_1(L)+w_1(M)\pmod2.
\]

Therefore

\[
\boxed{
w_1(L_{\rm sel}\otimes L_{\rm spin})=1+1=0.}
\]

At the holonomy level,

\[
(-1)_{\rm selector}(-1)_{\rm spinor}=+1.
\]

The tensor product admits a global orientation even though neither factor does.

## 2. Why a spinor is the natural root

The selector vector returns with a minus sign while its quadratic projector returns to itself. The same relationship holds between a spinor and its bilinear observables under a \(2\pi\) rotation.

This gives a mathematically exact common pattern:

\[
\text{root carrier has sign holonomy},
\qquad
\text{quadratic relationship is single-valued}.
\]

It supports the idea that an oriented Jordan time direction may require a spinorial square root rather than exist as a standalone vector choice.

## 3. The base-loop locking requirement

Two signs cancel only when they are transition functions over the **same** base loop. It is not enough that both holonomies happen to equal \(-1\).

A physical construction needs a map

\[
f:\Gamma_{\rm response}\longrightarrow SO(3,1)
\]

or into the relevant rotation/little-group space such that the spin lift of \(f(\Gamma_{\rm response})\) has the required minus sign.

Equivalently, it needs a bundle morphism

\[
L_{\rm sel}\otimes L_{\rm spin}
\longrightarrow
\underline{\mathbb R}
\]

that is nonzero and preserved by the dynamics. Without this locking, the tensor product is an available construction, not a derived physical cancellation.

## 4. A bosonic relationship cannot supply the missing sign

The projector \(P=nn^T\), stress Gram entries and other quadratic observables have trivial sign holonomy. Tensoring the selector line with an untwisted bosonic line leaves

\[
w_1=1.
\]

The compensator must live at an odd/root level. This distinguishes the oriented carrier from its relationship observables.

## 5. This does not cancel Chern eight

The selector obstruction is

\[
w_1\in H^1(S^1;\mathbb Z_2).
\]

The null stress relationship obstruction is

\[
c_1=8\in H^2(S^2;\mathbb Z).
\]

Although

\[
8\equiv0\pmod2,
\]

the Chern class is still nonzero. A flat real sign line can cancel a \(\mathbb Z_2\) orientation holonomy but cannot cancel an integral Chern-eight flux.

The complexification of a sign line over \(S^1\) has no compensating two-dimensional Chern class. Chern-eight cancellation still requires a genuine complex line of \(c_1=-8\), abandonment of the global real slice or appropriate defect patching.

## 6. Relationship to the fermion-two/stress-eight ladder

The two mechanisms fit without being identical:

- a **face spinor sign** can cancel the selector's \(w_1=1\);
- a **fermion relationship line** has \(c_1=2\);
- its fourth tensor power has \(c_1=8\), matching the stress relationship.

Thus the spinorial root participates at two levels:

\[
\begin{array}{c|c}
\text{one-dimensional loop}&\mathbb Z_2\text{ sign/orientation}\\
\text{two-dimensional sphere}&\mathbb Z\text{ Chern relationship winding}.
\end{array}
\]

A unified physical construction must reproduce both on their appropriate bases.

## 7. Possible physical realizations

### 7.1 Spin structure on response parameter space

If the response parameter domain has a natural tangent/spin structure, the selector line might be tied directly to its spin lift.

### 7.2 Fermion determinant or Pfaffian line

Integrating out fermions produces determinant/Pfaffian line bundles whose signs can cancel orientation anomalies. A concrete model would need its mod-two index calculated.

### 7.3 Domain-wall zero mode

The existing domain-wall branch supplies localized chiral spinors. Transport of a wall zero mode around the selector defect could produce the compensating sign, but the parameter dependence must be written explicitly.

### 7.4 Furey minimal ideal

A minimal spinorial ideal may provide the root line whose quadratic linking observable is the selector projector. This requires a Lorentz-completed Furey action, not the internal algebra alone.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a physical spinor/Pfaffian line over the selector parameter loop has \(w_1=1\) and a derived nonzero locking morphism trivializes the time-orientation product.

**Index trigger:** a mod-two index independently predicts the compensating sign.

**Base mismatch falsifier:** the selector and spinor signs live over unrelated loops with no physical pullback map.

**Chern falsifier:** cancellation of two \(\mathbb Z_2\) signs is cited as cancellation of the nonzero Chern-eight line.

**Bosonic falsifier:** a quadratic projector or Gram observable is used as an odd sign compensator.

## 9. Certificate

The [selector/spinor sign-compensation certificate](scripts/verify_selector_spinor_sign_compensation.mjs) checks Stiefel--Whitney addition, sign-holonomy cancellation and the strict separation from integral Chern-eight cancellation.

## Companion documents

- [One-twist selector eigenline](284_a_gapped_selector_projector_can_be_global_while_time_orientation_has_one_twist.md)
- [Projector/fermion/stress clutching ladder](274_projector_defect_clutches_to_the_fermion_two_and_stress_eight_ladder.md)
- [Domain-wall tensor lift](230_domain_wall_tensor_lift_has_exact_weyl_cone_and_passive_face_response.md)
- [Stress relationship fourth-power theorem](224_stress_relationship_is_fourth_tensor_power_of_fermion_relationship.md)
