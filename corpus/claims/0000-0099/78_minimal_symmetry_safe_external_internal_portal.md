# The Minimal Symmetry-Safe Portal Is Trace–Trace—and It Cannot Select the Real Form

**Date:** 17 October 2026  
**Branches:** B01, B03, B06 and B11  
**Claim status:** exact invariant-bilinear classification for independent connected automorphism actions; locked or higher-order portals remain open

## 1. The portal problem

The external carrier is

\[
J_{\rm ext}=H_2(\mathbb R)
\cong\mathbf1\oplus\mathbf2
\]

under its connected automorphism group \(SO(2)\): one trace coordinate and a two-dimensional traceless plane.

The internal weak observable block is

\[
J_{\rm int}=H_2(\mathbb C)
\cong\mathbf1\oplus\mathbf3
\]

under \(SU(2)\) conjugation, equivalently the \(SO(3)\) action on its traceless Pauli vector.

What bilinear coupling can preserve the two symmetry groups independently?

## 2. Complete invariant classification

Write a general bilinear portal as

\[
B(X,H)=x^T M h,
\]

where \(x\in\mathbb R^3\), \(h\in\mathbb R^4\), and \(M\) has twelve real coefficients.

Invariance under independent infinitesimal rotations requires

\[
E^T M=0,
\qquad
M J_i=0
\]

for the external \(SO(2)\) generator \(E\) and all three internal \(SO(3)\) generators \(J_i\).

The combined linear system has rank eleven. Its invariant space is one-dimensional:

\[
\boxed{
B(X,H)=\lambda\,\operatorname{tr}(X)\operatorname{tr}(H).
}
\]

No bilinear involving either traceless sector is invariant under the independent groups.

## 3. Why this portal is safe

The trace–trace portal:

- is basis-independent;
- preserves the full internal weak conjugation symmetry;
- does not impose a real basis on \(H_2(\mathbb C)\);
- leaves flavor/Yukawa complex phases untouched;
- is CP-even;
- couples one scalar response channel without identifying internal and external rotations.

It is the minimal portal compatible with the obstructions already found.

## 4. Why it is not explanatory enough

The same safety makes it weak. The portal:

- does not select \(H_2(\mathbb R)\) inside \(H_2(\mathbb C)\);
- does not remove mirrors;
- does not fix a hypercharge or Yukawa relation;
- contains an arbitrary coefficient \(\lambda\);
- probes only trace modes and ignores the relational traceless geometry.

It is a consistent effective interaction, not the desired unifying mechanism.

## 5. What a nontrivial locking portal requires

A traceless cross-coupling needs an intertwiner

\[
K:\mathbf2_{\rm ext}\to\mathbf3_{\rm int}
\]

or an internal vector selecting a two-plane. Such a \(K\) is precisely additional selector data. It breaks

\[
SO(2)_{\rm ext}\times SO(3)_{\rm int}
\]

to a locked subgroup.

This makes the programme’s central burden explicit: a shared \(Spin(2,3)\) interface cannot be obtained from independent symmetry alone. It needs a dynamically or algebraically selected locking tensor whose stress tensor, vacuum manifold and anomaly effects can be calculated.

## 6. Higher-order possibilities

Independent invariants can also be built from

\[
\operatorname{tr}X,\quad \det X,\quad
\operatorname{tr}H,\quad \det H.
\]

Products such as

\[
(\det X)(\det H)
\]

remain symmetry-safe and CP-even, but they likewise do not align traceless directions. Higher order does not by itself create locking.

## 7. Stop-everything and falsification tests

**Positive:** a unique locking tensor \(K\) emerges from boundary orientation, a Furey volume element or stress–energy data and predicts a nontrivial portal coefficient or response relation.

**Negative:** every nontrivial portal requires an arbitrary \(K\), while the only canonical interaction is trace–trace with a freely fitted coefficient.

**Current result:** the safe portal exists but has no selection power.

## 8. Certificate

The [portal-invariant certificate](../../../verification/verify/verify-independent-symmetry-portal.mjs) solves the twelve-coefficient infinitesimal invariance system, finds rank eleven and verifies that trace–trace spans the one-dimensional solution.

## Companion documents

- [Furey weak Jordan ladder](69_furey_weak_jordan_ladder_spin23.md)
- [Weak stabilizer obstruction](71_weak_real_form_stabilizer_obstruction.md)
- [Flavor CP obstruction](74_real_selector_cp_violation_obstruction.md)
- [External/internal interface](54_furey_external_internal_interface_branch.md)
- [Locking tensor orbit geometry](79_locking_tensor_orbits_and_selector_geometry.md)
- [Locking-field spectrum](80_locking_field_gauge_and_scalar_spectrum.md)
- [Locking stress tensor and portal backreaction](84_locking_stress_tensor_and_portal_backreaction.md)
