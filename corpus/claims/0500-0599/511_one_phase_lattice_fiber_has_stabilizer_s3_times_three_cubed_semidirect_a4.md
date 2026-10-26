# One Phase-Lattice Fiber Has Stabilizer \(S_3\times((C_3)^3\rtimes A_4)\)

**Date:** 17 October 2026  
**Branches:** B04, B07, B09, B10, B12, B13 and B14  
**Claim status:** exact finite-image enumeration and stabilizer structure; physical gauge or particle interpretation is not claimed

## 1. Result

The faithful primitive-wedge action on the ambient five-dimensional carrier has order

\[
466{,}560.
\]

Its setwise stabilizer of one fiber has exact structure

\[
\boxed{
\operatorname{Stab}(M)
\cong
S_3\times\bigl((C_3)^3\rtimes A_4\bigr),
\qquad
|\operatorname{Stab}(M)|=1{,}944.}
\]

In the full mod-six symplectic preimage, the central mod-three double cover restores a factor two:

\[
|\widetilde{\operatorname{Stab}}(M)|=3{,}888.
\]

There is an additional order-three kernel in the induced permutation action on the 240 fibers. Consequently the **faithful fiber-permutation group** and its point stabilizer have orders \(155{,}520\) and \(648\), respectively.

## 2. The two prime images

The core generators \(C_1(3),C_2(3),S_{K_+}\) have prime images:

\[
|G_2|=18,
\qquad
G_2\cong S_3\times_{\mathbb Z_2}S_3,
\]

and

\[
|G_3|=51{,}840,
\qquad
G_3=Sp(4,\mathbb F_3).
\]

The primitive wedge representation is faithful at two but kills the central element \(-I\) at three. Therefore

\[
|\rho_{\wedge^2}(G_2)|=18,
\qquad
|\rho_{\wedge^2}(G_3)|=25{,}920.
\]

The latter is the five-dimensional projective symplectic/orthogonal image.

## 3. Why the CRT image is the full product

The generator subgroup projects surjectively onto both prime images. By Goursat's lemma, a proper subdirect product would require a nontrivial common quotient.

The order-18 binary group is solvable. The group \(Sp(4,\mathbb F_3)\) is perfect, so every nontrivial quotient relevant here is perfect. A finite group that is both a quotient of the solvable binary group and a perfect quotient of the qutrit group must be trivial.

Hence the mod-six symplectic image is the full product:

\[
G_6\cong G_2\times G_3,
\qquad
|G_6|=18\cdot51{,}840=933{,}120.
\]

After quotienting the qutrit center in the wedge action:

\[
|\rho_{\wedge^2}(G_6)|
=18\cdot25{,}920
=466{,}560.
\]

## 4. Binary stabilizer

The binary covector orbit has three elements, so

\[
|\operatorname{Stab}_2|=\frac{18}{3}=6.
\]

Exact enumeration gives the element-order distribution

\[
1^1,\quad 2^3,\quad 3^2,
\]

and the group is nonabelian. Therefore

\[
\boxed{\operatorname{Stab}_2\cong S_3.}
\]

The full order-18 binary group acts on the three binary fiber decorations through an \(S_3\) quotient. Its global permutation kernel is an order-three anti-diagonal rotation: the two trace-three companions induce the same three-cycle, while their relative rotation fixes all three decorations.

## 5. Qutrit stabilizer

The faithful qutrit wedge group has order \(25{,}920\) and acts transitively on 80 nonzero isotropic vectors. Thus

\[
|\operatorname{Stab}_3|
=\frac{25{,}920}{80}
=324.
\]

The stabilizer acts on

\[
\lambda_3^\perp/\langle\lambda_3\rangle,
\]

a three-dimensional nondegenerate orthogonal quotient. Its image has order 12 and element-order distribution

\[
1^1,\quad2^3,\quad3^8,
\]

so it is

\[
\Omega_3(3)\cong A_4.
\]

The kernel has order 27. Every nonidentity kernel element has order three, and all kernel elements commute. Therefore

\[
\ker=(C_3)^3.
\]

Consequently

\[
\boxed{
\operatorname{Stab}_3
\cong
(C_3)^3\rtimes A_4.}
\]

The full stabilizer contains elements of order nine because the \(A_4\) action combines nontrivially with the elementary abelian unipotent radical.

## 6. Product stabilizer

Because the CRT image is the full product and a fiber is a pair of independently specified prime kernel covectors,

\[
\operatorname{Stab}(M)
\cong\operatorname{Stab}_2\times\operatorname{Stab}_3.
\]

Thus

\[
|\operatorname{Stab}(M)|
=6\cdot324
=1{,}944,
\]

and orbit-stabilizer gives

\[
\frac{466{,}560}{1{,}944}=240.
\]

The full symplectic preimage has order \(3{,}888\), with the extra central involution acting trivially on the primitive wedge carrier.

The order-three binary kernel belongs to every fiber stabilizer. Dividing it out gives

\[
G_{\mathcal F}\cong S_3\times PSp_4(3),
\qquad |G_{\mathcal F}|=155{,}520,
\]

and

\[
\operatorname{Stab}_{G_{\mathcal F}}(M)
\cong C_2\times\bigl((C_3)^3\rtimes A_4\bigr),
\qquad
|\operatorname{Stab}_{G_{\mathcal F}}(M)|=648.
\]

Thus \(3{,}888\), \(1{,}944\) and \(648\) are respectively the symplectic-preimage, ambient-wedge and faithful-permutation stabilizer orders.

## 7. What this group is not

The stabilizer is not the Standard-Model gauge group, a particle-family symmetry or a newly derived physical discrete symmetry. It is the arithmetic stabilizer of one congruence-defined phase-lattice fiber.

Any physical use must explain:

1. why one fiber is selected;
2. which stabilizer elements act on observables;
3. whether the unipotent \((C_3)^3\) is gauge, redundancy or transport;
4. whether the central symplectic double cover acts on fermion/Pfaffian data.

## 8. Stop-everything criteria

A source-derived action of this precise stabilizer on the five Furey support fields, the anomaly line or a genus-two theta bundle would be highly discriminating. Especially strong would be an independent occurrence of

\[
(C_3)^3\rtimes A_4
\]

as the stabilizer of a qutrit polarization or generation structure.

## 9. Falsification criteria

- The ambient faithful-wedge stabilizer has order \(1{,}944\), not \(3{,}888\).
- The order \(3{,}888\) belongs to its symplectic double-cover preimage.
- The faithful fiber-permutation stabilizer has order \(648\), after quotienting the global binary \(C_3\).
- The qutrit stabilizer is not all of \(Sp(4,3)\).
- The order-27 kernel is elementary abelian; treating it as a nonabelian Heisenberg group contradicts the enumeration.
- Group-order equality alone is insufficient to identify a physical symmetry.

## 10. Subsequent regulus boundary

The cubic-incidence construction contains a natural 240-object set of
trihedra, but its \(PSp_4(3)\) point stabilizer has projective order 108 because
the action is transitive. The qutrit factor here has stabilizer order 324 on
each 80-element oriented-null orbit. This stabilizer mismatch is an exact
obstruction to identifying the two 240-object actions despite their common
\(40\times3\times2\) factorization. See the [regulus exhaustion ledger](../../programmes/regulus-closure-bridge/04_regulus_exhaustion_ledger.md).

## Certificate and companions

- [Exact fiber-stabilizer enumeration](../../../verification/identify/identify_exact_stabilizer_of_one_cross_prime_phase_lattice_fiber.mjs)
- [The 240-fiber orbit](510_the_handle_group_transports_a_240_fiber_family_of_cross_prime_phase_lattices_instead_of_preserving_one.md)

