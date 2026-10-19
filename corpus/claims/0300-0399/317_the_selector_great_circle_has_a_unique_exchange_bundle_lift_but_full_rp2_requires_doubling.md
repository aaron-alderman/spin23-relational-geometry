# The Selector Great Circle Has a Unique Exchange Bundle Lift, but Full \(\mathbb{RP}^2\) Requires Doubling

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B07, B08 and B11  
**Claim status:** exact finite-dimensional lift classification for the minimal mass representations; physical identification with the Furey/CAR action and a protected mod-two index remain open

## 1. The bundle question

The selector is a director \([n]\in\mathbb{RP}^2\), so the double cover identifies

\[
n\sim-n.
\]

The selector-angle zero-mode model used a mass linear in the lifted vector:

\[
M(-n)=-M(n).
\]

For this to define a fermion operator over the director space, the fermion fiber must also be glued. Write the quotient as

\[
(n,\psi)\sim(-n,g\psi),
\qquad g^2=I.
\]

The mass descends exactly when

\[
\boxed{gM(n)g^{-1}=M(-n)=-M(n).}
\]

This document classifies the smallest possible \(g\).

## 2. Great-circle selector dynamics

The wall-to-Furey path and its half-turn completion lie in the \(yz\) great circle. The corresponding two-component mass is

\[
M(n)=m(n_y\sigma_y+n_z\sigma_z).
\]

A unitary deck lift must anticommute with both \(\sigma_y\) and \(\sigma_z\). Expand an arbitrary matrix as

\[
g=aI+b_x\sigma_x+b_y\sigma_y+b_z\sigma_z.
\]

The equations

\[
\{g,\sigma_y\}=0,
\qquad
\{g,\sigma_z\}=0
\]

force

\[
a=b_y=b_z=0.
\]

Unitarity and \(g^2=I\) then give

\[
\boxed{g=\pm\sigma_x.}
\]

Thus the minimal ordinary bundle lift along the relevant selector circle is unique up to its overall sign.

## 3. The exact Furey-shaped coincidence

The same matrix \(\sigma_x\) is the unitary exchange factor in the Furey survivor antiunitary

\[
\Theta_{\rm ex}=\sigma_xK.
\]

It also appeared in the wall-to-Furey carrier rotation

\[
U_x=\exp(-i\pi\sigma_x/4).
\]

So one generator now performs three related algebraic roles:

\[
\begin{array}{ccl}
\sigma_x&:&\text{exchange of the two survivor faces},\\
i\sigma_x&:&\text{generator of the selector quarter-turn},\\
\pm\sigma_x&:&\text{deck lift that flips the great-circle Dirac mass}.
\end{array}
\]

This is substantially tighter than a dimension match. The same explicitly constructed operator controls exchange, selector transport and the one-twist bundle gluing.

## 4. But the antiunitary is not the unitary deck lift

The equality of the matrix factor does not identify the operations. For

\[
M(n)=n_y\sigma_y+n_z\sigma_z,
\]

unitary conjugation gives

\[
\sigma_xM(n)\sigma_x=-M(n).
\]

The antiunitary action instead gives

\[
\sigma_x\overline{M(n)}\sigma_x
=n_y\sigma_y-n_z\sigma_z,
\]

which is not \(-M(n)\) for a generic point on the circle.

Therefore

\[
\boxed{\sigma_xK\ \text{does not by itself supply the required deck transition}.}
\]

The programme must explain why the unitary exchange factor is separately available, or modify the mass representation so that the full antiunitary has the desired equivariance.

This repeats an important discipline already encountered in the CAR branch: a response selector and a fermionic adjoint may share matrices without being the same operation.

## 5. Topological classification of the available twists

The fundamental group is

\[
\pi_1(\mathbb{RP}^2)=\mathbb Z_2.
\]

Flat unitary bundles are specified by an involutive holonomy \(g\). Scalar choices \(g=\pm I\) give the trivial and sign flat lines, but scalar conjugation cannot flip a matrix-valued mass.

The exchange lift \(g=\sigma_x\) has eigenvalues \(+1\) and \(-1\). Its rank-two bundle decomposes into a trivial eigenline plus the nontrivial torsion line. In cohomological language,

\[
H^1(\mathbb{RP}^2;\mathbb Z_2)\cong\mathbb Z_2,
\qquad
H^2(\mathbb{RP}^2;\mathbb Z)\cong\mathbb Z_2.
\]

The first group classifies the real sign twist; the second records its complex torsion-line counterpart.

These topology groups classify possible bundles, not the spectral index of the physical operator. A protected mod-two zero still requires the symmetry class, domain and boundary conditions to be specified.

## 6. Full-selector no-go in two components

If the mass uses the full selector sphere,

\[
M(n)=m(n_x\sigma_x+n_y\sigma_y+n_z\sigma_z),
\]

then the deck lift would have to anticommute with all three Pauli matrices. No nonzero \(2\times2\) matrix does:

\[
\{g,\sigma_x\}=\{g,\sigma_y\}=\{g,\sigma_z\}=0
\quad\Longrightarrow\quad
g=0.
\]

Hence a two-component fermion supports the exchange lift only after the selector dynamics is restricted to a great circle.

This restriction needs a physical source—anisotropy, charge conservation, boundary conditions or gauge fixing. It cannot be hidden as a coordinate choice.

## 7. Minimal full-\(\mathbb{RP}^2\) completion

A doubled carrier removes the obstruction. Let

\[
M_4(n)=\tau_z\otimes(n\cdot\sigma),
\qquad
G=\tau_x\otimes I_2.
\]

Then

\[
G^2=I_4,
\qquad
\{G,M_4(n)\}=0
\]

for every \(n\in S^2\). Thus

\[
(n,\Psi)\sim(-n,G\Psi)
\]

defines a full-selector bundle lift.

But the extra \(\tau\) factor must not be introduced as an independent doubling if the theory already contains Nambu/CAR doubling. The credible route is to identify \(G\) with an existing self-dual-CAR polarization exchange. Otherwise the construction risks recreating the 60-state overcount already excluded.

## 8. Consequences for the neutrino branch

The combined target is now very specific. On the unmatched neutrino sector, one needs either:

1. a dynamically selected great circle with unitary transition \(g=\sigma_x\); or
2. a full-selector doubled lift \(G=\tau_x\otimes I\) identified with existing CAR, rather than new, degrees of freedom.

In both cases the transition must commute appropriately with Standard-Model gauge transformations and preserve the kinetic Clifford action. Only then is it meaningful to ask whether the internal \(8+7\) kernel and selector-loop zero represent the same protected state.

## 9. Open branches

- determine whether the unitary part of Furey exchange acts independently on the physical survivor module;
- test the full antiunitary on alternative mass conventions;
- embed \(g=\sigma_x\) or \(G=\tau_x\otimes I\) into the common 30-dimensional self-dual CAR carrier;
- calculate the symmetry-class and mod-two index of the resulting one-dimensional defect operator;
- derive a physical anisotropy that confines selector motion to the \(yz\) great circle;
- audit gauge equivariance of the deck transition on the complete 15-state generation.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** the existing Furey/CAR carrier supplies \(G\) without new doubling, and the resulting twisted defect index equals the unmatched neutrino count.

**Exchange trigger:** source multiplication exposes the unitary \(\sigma_x\) transition independently of coefficient conjugation.

**Full-selector trigger:** the Nambu polarization factor is exactly the \(\tau\) factor needed for the four-component lift.

**Antiunitary falsifier:** \(\sigma_xK\) is substituted for \(\sigma_x\) in the displayed mass representation; their actions are different.

**Full-sphere falsifier:** a two-component matrix is claimed to anticommute with all three Pauli masses.

**Overcounting falsifier:** the doubled completion is tensored with the already doubled CAR carrier instead of being identified inside it.

**Index falsifier:** the existence of a nontrivial flat bundle is presented as proof of a protected zero without specifying the operator’s symmetry class and domain.

## 11. Certificate

The [selector fermion-bundle lift certificate](../../../verification/verify/verify_selector_fermion_bundle_lifts.mjs) checks uniqueness of the great-circle lift, inequivalence of unitary and antiunitary exchange, the two-component full-sphere no-go and the minimal doubled completion.

## Companion documents

- [The quarter-turn subgap state and \(\mathbb{RP}^2\) half-turn zero](316_the_quarter_turn_binds_a_subgap_state_while_the_rp2_half_turn_can_bind_a_zero.md)
- [Response selector versus CAR adjoint](307_the_response_selector_and_the_car_adjoint_are_two_distinct_antiunitaries.md)
- [Common carrier instead of independent tensor factors](310_tensoring_the_selector_pair_with_the_nambu_pair_overcounts_the_generation.md)
- [Second real structure parameterized by one unitary](311_a_second_polarization_reversing_real_structure_is_parameterized_by_one_unitary.md)
- [Furey survivor exchange and population-normal real form](303_furey_survivor_exchange_induces_the_charge_compatible_population_normal_real_form.md)
