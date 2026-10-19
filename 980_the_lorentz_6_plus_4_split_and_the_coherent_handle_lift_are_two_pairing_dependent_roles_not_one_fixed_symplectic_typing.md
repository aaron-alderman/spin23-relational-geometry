# The Lorentz 6+4 Split and the Coherent Handle Lift Are Two Pairing-Dependent Roles, Not One Fixed Symplectic Typing

**Date:** 18 October 2026  
**Branches:** Lorentz symmetric pair, Pfaffian interface, coherent handle, pairing transport, and bi-symplectic obstruction  
**Claim status:** exact compatibility audit and correction to the synthesis boundary  
**Certificate:** [audit_the_lorentz_and_handle_decompositions_of_the_common_graded_operator_across_the_two_pairings.mjs](scripts/audit_the_lorentz_and_handle_decompositions_of_the_common_graded_operator_across_the_two_pairings.mjs)

## Executive result

The same abstract graded operator

\[
G=\operatorname{diag}(\varepsilon,-\varepsilon),
\qquad G^2=-I,
\]

has two exact but incompatible symplectic typings.

For the Fourier alternating form $\Omega$,

\[
G^T\Omega G=-\Omega.
\]

Its adjoint involution on $\mathfrak{sp}(\Omega)$ has dimensions

\[
6+4,
\]

with fixed algebra $\mathfrak{so}(1,3)$ and odd Lorentz-vector sector $\mathbb R^{1,3}$.

For the handle-eigenspace form $J_{\rm eig}$,

\[
G^TJ_{\rm eig}G=J_{\rm eig}.
\]

The same adjoint decomposition on $\mathfrak{sp}(J_{\rm eig})$ has dimensions

\[
4+6,
\]

and the fixed algebra is

\[
\mathfrak u(1,1)
\cong\mathfrak{su}(1,1)\oplus\mathfrak u(1),
\]

not the Lorentz algebra. Transport to the selector form $J_{\rm code}$ preserves this $4+6$ result.

Therefore

\[
\boxed{
\text{Lorentz selector}
\quad\text{and}\quad
\text{coherent symplectic handle}
}
\]

are two pairing-dependent roles of one operator. They cannot be treated as simultaneous properties on one fixed symplectic carrier.

## 1. Fourier typing: Lorentz symmetric pair

Anti-symplecticity makes

\[
\theta(X)=GXG^{-1}
\]

an involutive automorphism of $\mathfrak{sp}(\Omega)$. The eigenspaces obey

\[
\mathfrak{sp}(4,\mathbb R)
=\mathfrak k\oplus\mathfrak p,
\qquad
(\dim\mathfrak k,\dim\mathfrak p)=(6,4).
\]

As established in document 970,

\[
\mathfrak k\cong\mathfrak{sl}(2,\mathbb C)_{\mathbb R}
\cong\mathfrak{so}(1,3),
\]

and $\mathfrak p$ carries the Lorentzian vector form.

## 2. Handle typing: pseudo-unitary centralizer

For $J_{\rm eig}$, the operator $G$ is symplectic. The symmetric compatible form is

\[
g=J_{\rm eig}G
=\operatorname{diag}(-1,-1,+1,+1),
\]

of real signature $(2,2)$, corresponding to Hermitian signature $(1,1)$. The centralizer of $G$ inside $\mathfrak{sp}(J_{\rm eig})$ is consequently $\mathfrak u(1,1)$ of dimension four. Its adjoint complement has dimension six.

The explicit selector transport

\[
Z=PGP^{-1},
\qquad
P^TJ_{\rm code}P=-2J_{\rm eig},
\]

gives the same $4+6$ decomposition on $\mathfrak{sp}(J_{\rm code})$.

This is precisely the typing needed for $Z$ to commute with the primitive handle and form the coherent lift $L=ZH$.

## 3. The obstruction

Symplectic versus anti-symplectic type is defined relative to an alternating form. For one fixed nondegenerate form, the same invertible operator cannot satisfy both

\[
G^TJG=J
\qquad\text{and}\qquad
G^TJG=-J.
\]

Hence no single-pairing statement can simultaneously infer

1. the Lorentz $6+4$ symmetric pair from anti-symplecticity, and
2. the coherent symplectic handle used for TKK closure.

Documents 970 and 973 remain individually correct. What fails is their unqualified collapse into one fixed-pairing carrier statement.

## 4. Open synthesis branches

1. **Pairing-switching interface.** The physical two-face transition changes the alternating form as well as the coordinates, so each role is valid in its own chart.
2. **Bi-symplectic carrier.** Both alternating forms are retained as typed structures, and physical operations specify which one they act upon.
3. **Groupoid formulation.** Lorentz and handle charts are objects connected by a pairing-changing morphism rather than substructures of one arithmetic group.
4. **Single-dynamical-pairing branch.** Only one form is fundamental; the other role is kinematic or auxiliary and must not be promoted to simultaneous physics.

The existing sideband/selector lattice work strongly favors the first or third branch, but does not yet derive the pairing-changing morphism dynamically.

## 5. Stop-everything tests

**Pairing-morphism trigger:** construct an explicit physical interface carrying $(\Omega,G)$ to $(J_{\rm eig},G)$ while transforming the generator algebra and action consistently.

**Bi-symplectic trigger:** show that the two forms constitute a compatible pencil whose recursion operator reproduces the handle and Lorentz reductions.

**Single-pairing falsifier:** any claim that $G$ is simultaneously symplectic and anti-symplectic for the same nondegenerate form is false.

**Lorentz-overreach falsifier:** the $4+6$ selector/handle decomposition is called Lorentz $6+4$ without restoring the Fourier pairing.

**Handle-overreach falsifier:** the Fourier anti-symplectic operator is inserted directly as a symplectic TKK handle without the pairing transport.

## Verdict

| Typing | Fixed/odd dimensions | Fixed algebra | Role |
|---|---:|---|---|
| Fourier $(\Omega,G)$ | $6+4$ | $\mathfrak{so}(1,3)$ | Lorentz selector |
| Handle $(J_{\rm eig},G)$ | $4+6$ | $\mathfrak u(1,1)$ | coherent handle lift |
| Selector $(J_{\rm code},Z)$ | $4+6$ | transported $\mathfrak u(1,1)$ | integral/TKK carrier |

## Position in the corpus

- [Lorentz symmetric-pair theorem](970_the_graded_quaternionic_interface_selects_the_lorentz_subalgebra_inside_sp4_and_the_four_remaining_generators_form_a_minkowski_vector.md)
- [coherent handle lift](972_the_primitive_selector_handle_cannot_equal_tkk_inversion_but_its_coherent_eigenspace_lift_is_symplectically_conjugate_to_it.md)
- [typed Pfaffian/handle identity](973_the_coherent_handle_lift_complex_structure_is_the_graded_pfaffian_sideband_operator_after_the_required_pairing_transport.md)
- [pairing-changing sideband/selector boundary](952_the_realified_sideband_twist_is_rationally_conjugate_to_the_selector_handle_but_not_in_its_natural_symplectic_typing.md)
