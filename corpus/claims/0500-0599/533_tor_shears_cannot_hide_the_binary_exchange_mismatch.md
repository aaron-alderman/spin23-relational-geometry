# Tor Shears Cannot Hide the Binary Exchange Mismatch

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B13 and B14  
**Claim status:** exact automorphism-group classification and no-go theorem; coordinate-exchange identification is pinned

## 1. Result

Let

\[
T=\langle\tau\rangle\oplus A_{-D_2}
\]

with

\[
q(t\tau+a\alpha+b\beta)=\frac{3a+3b}{4}\pmod1.
\]

The complete quadratic automorphism group is

\[
\boxed{
O(T,q)\cong(\mathbb F_2)^2\rtimes C_2,
\qquad |O(T,q)|=8.}
\]

Its map to the anisotropic quotient has image

\[
O(A_{-D_2},q)\cong C_2.
\]

The kernel consists of four Tor shears:

\[
\begin{pmatrix}
1&u&v\\
0&1&0\\
0&0&1
\end{pmatrix},
\qquad u,v\in\mathbb F_2.
\]

They may add the radical to either discriminant lift, but they act trivially on \(A_{-D_2}\).

The other four automorphisms lie over

\[
\alpha\leftrightarrow\beta.
\]

The support weak-class swap lies in this root-exchange coset, not in the Tor-shear kernel.

## 2. No hidden coordinate-exchange lift

One remaining possibility was that puncture-coordinate exchange, although trivial on \(A_{D_2}\), might lift nontrivially through the Tor extension and thereby reproduce the support swap.

Exhaustive enumeration rules this out:

\[
\boxed{
\#\{\text{quadratic intertwiners from the support swap to a Tor shear}\}=0.}
\]

The reason is structural. The radical is characteristic, so every isometry induces an automorphism of the quotient \(T/\langle\tau\rangle\). Conjugation cannot change whether that quotient action is identity or generator exchange.

Thus a non-split choice of representatives can change the upper extension data but cannot turn coordinate exchange into root exchange.

## 3. Consequence

The binary branch now has a hard fork:

1. **root-exchange lift:** matches the support quadratic action exactly;
2. **coordinate-exchange lift:** matches literal exchange of the two puncture evaluations but acts trivially on the discriminant phase.

Tor data do not unify them. A central metaplectic phase does not unify them. Integral conjugacy does not unify them.

Therefore the statement

\[
\text{support Weyl swap}=\text{puncture-coordinate exchange}
\]

must be pinned as false for the present integral phase module.

The credible remaining interpretations are:

- the physical code automorphism contains the required puncture sign reversal and is root exchange;
- the two operations are distinct symmetries that agree only away from two;
- the support defect must map to a different binary phase extension.

## 4. Stop-everything and falsification gates

### Stop-everything

1. Direct code analysis identifies the relevant monomial automorphism with the root-exchange coset.
2. Furey orientation supplies the required sign reversal.
3. A different source-derived binary extension carries both actions without contradicting their quotient images.

### Falsifiers

- No Tor shear covers nontrivial discriminant exchange.
- No quadratic basis change conjugates the two quotient actions.
- The coordinate-exchange identification cannot be rescued inside \(T\).

## 5. Next branches

1. Inspect the two-puncture monomial code automorphisms directly.
2. Follow the odd-prime branch, where the two actions are conjugate.
3. Test whether the order-four \(M/I\) extension carries root exchange rather than coordinate exchange.
4. Return to the full doubled Dirac carrier if the two-puncture restriction remains incompatible.

## Certificate and companions

- [Tor-shear classification certificate](../../../verification/classify/classify_tor_shears_and_rule_out_hidden_coordinate_exchange_lift.mjs)
- [Localization at two](532_coordinate_exchange_and_d2_root_exchange_are_conjugate_away_from_two_but_not_integrally.md)
- [Labelled phase-map obstruction](531_the_support_to_d2_phase_map_is_unique_when_labelled_but_not_puncture_exchange_equivariant.md)

