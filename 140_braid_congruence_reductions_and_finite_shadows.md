# Congruence Reductions of the Braid Image

**Date:** 17 October 2026  
**Branches:** B09, B10 and B12  
**Claim status:** exact finite-group enumeration for \(p=2,3,5\); no Monster or Moonshine action derived

## 1. Starting representation

The established braid representation is

\[
\rho(\sigma_1)=
\begin{pmatrix}1&1\\0&1\end{pmatrix},
\qquad
\rho(\sigma_2)=
\begin{pmatrix}1&0\\-1&1\end{pmatrix}
\]

inside \(SL(2,\mathbb Z)\), followed by the Levi embedding into \(Sp(4,\mathbb Z)\).

Reducing entries modulo a prime \(p\) gives

\[
\rho_p:B_3\longrightarrow SL(2,\mathbb F_p).
\]

This is an explicit arithmetic operation, unlike a speculative direct map to a sporadic group.

## 2. Enumerated images

The two reduced elementary matrices generate the full groups:

\[
\begin{array}{c|c|c}
p&|\operatorname{im}\rho_p|&SL(2,\mathbb F_p)\\
\hline
2&6&SL(2,2)\\
3&24&SL(2,3)\\
5&120&SL(2,5)
\end{array}
\]

in agreement with

\[
|SL(2,\mathbb F_p)|=p(p^2-1).
\]

Thus the existing braid representation has concrete finite congruence shadows without changing its definition.

## 3. Fate of the central twist

The full twist

\[
z=(\sigma_1\sigma_2)^3
\]

continues to satisfy

\[
\rho_p(z)=-I.
\]

At \(p=2\),

\[
-I=I,
\]

so the hidden sign is erased.

At odd primes,

\[
-I\ne I,
\qquad
(-I)^2=I,
\]

and the sign survives as the nontrivial central element of \(SL(2,\mathbb F_p)\).

Arithmetic reduction therefore provides an exact switch:

- characteristic two forgets the spinorial sign;
- odd characteristic retains it.

## 4. Projective finite groups

Quotienting by the center gives

\[
PSL(2,2)\cong S_3,
\]

\[
PSL(2,3)\cong A_4,
\]

\[
PSL(2,5)\cong A_5.
\]

These are familiar finite modular groups. In particular, the \(p=5\) projective shadow is the icosahedral group \(A_5\), while \(SL(2,5)\) is its double cover in this arithmetic setting.

This is an exact finite-group ladder:

\[
B_3
\to SL(2,\mathbb Z)
\to SL(2,\mathbb F_p)
\to PSL(2,\mathbb F_p).
\]

## 5. What this contributes

The congruence reductions:

- give explicit finite quotients of the braid branch;
- track whether the central sign survives;
- supply test groups for discrete charge, defect or state sectors;
- offer finite approximations to modular actions;
- provide a legitimate location to compare finite subgroups appearing elsewhere.

They do not select one prime \(p\), one physical quotient or one representation on Standard-Model states.

## 6. What this does not imply

The occurrence of

\[
S_3,\quad A_4,\quad A_5
\]

does not derive:

- three generations;
- tetrahedral or icosahedral flavor mixing;
- a Conway action;
- the Monster;
- a Moonshine module;
- a modular partition function.

Many theories and arithmetic constructions contain these small finite groups. Physical content requires an explicit state space and action.

## 7. Relation to the connected/discrete separation theorem

Congruence reduction is one of the allowed bridges identified by the no-go:

\[
\text{connected real group}
\supset
\text{arithmetic subgroup}
\to
\text{finite quotient}.
\]

It does not contradict the fact that no connected group maps nontrivially and continuously into a finite group. The finite quotient is taken from the discrete subgroup \(SL(2,\mathbb Z)\), not from all of \(SL(2,\mathbb R)\).

## 8. Stop-everything criteria

**Advance:** a physical charge, braid or defect sector canonically selects a modulus \(p\) and realizes the corresponding finite quotient on observed states.

**Arithmetic selector:** the same modulus and finite action arise independently from an integral exceptional-Jordan flag.

**Moonshine advance:** a graded module or partition function extends one of these finite actions into a verified Monster/VOA structure.

**Demote:** the choice of \(p\) and state representation remains arbitrary and constrains no observable.

## 9. Certificate

The [braid congruence certificate](scripts/verify-braid_congruence_reductions.mjs) enumerates the generated matrix groups for \(p=2,3,5\), verifies their orders and determinants, tracks the full twist and computes the projective orders.

## Companion documents

- [Three-strand braid central twist](57_braid_central_twist_to_sp4z_branch.md)
- [Connected continuous/arithmetic separation](138_connected_continuous_vs_arithmetic_symmetry_separation.md)
- [Metaplectic loop interferometer](135_minimal_metaplectic_loop_interferometer.md)
- [Octonions and the Leech lattice branch](33_octonions_leech_lattice_jordan_branch.md)
