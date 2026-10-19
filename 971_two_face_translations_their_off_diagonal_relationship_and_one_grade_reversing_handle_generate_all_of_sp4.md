# Two Face Translations, Their Off-Diagonal Relationship, and One Grade-Reversing Handle Generate All of Sp(4,R)

**Date:** 18 October 2026  
**Branches:** Jordan triple recursion, physical generator closure, two faces, relational carrier, handle, TKK grading, and (Spin(2,3))  
**Claim status:** exact Lie-closure theorem; physical typing uses the coherent handle lift of document 972  
**Certificate:** [compute_the_physical_jordan_face_handle_lie_closure.mjs](scripts/compute_the_physical_jordan_face_handle_lie_closure.mjs)

## Executive result

On the canonical four-real-dimensional TKK carrier, let

\[
T(B)=\begin{pmatrix}0&B\\0&0\end{pmatrix},
\qquad B=B^T,
\]

be a Jordan translation, and let

\[
W=\begin{pmatrix}0&I\\-I&0\end{pmatrix}
\]

be the symplectic inversion/grade-reversing handle.

Choose the three symmetric two-port directions

\[
B_{11}=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\quad
B_{22}=\begin{pmatrix}0&0\\0&1\end{pmatrix},
\quad
B_{12}=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

They have the direct programme interpretation:

- (B_{11}): first/normal face;
- (B_{22}): second/tangent face;
- (B_{12}): the off-diagonal relationship (X) between them.

The iterative commutator closure is

\[
\boxed{
\operatorname{Lie}\langle T(B_{11}),T(B_{22}),T(B_{12}),W\rangle
=\mathfrak{sp}(4,\mathbb R),
}

with dimension ten.

Thus the minimal phrase

> two faces, their relationship, and one grade-reversing handle

is an exact generating theorem for (Spin(2,3)) at Lie-algebra level.

## 1. Ablation results

The closure dimensions are:

| Seed set | Dimension | Meaning |
|---|---:|---|
| all three translations only | 3 | abelian Jordan translation sector |
| isotropic translation plus (W) | 3 | one diagonal (mathfrak{sl}_2) |
| two diagonal faces plus (W) | 6 | two uncoupled (mathfrak{sl}_2) channels |
| two faces, relationship and (W) | 10 | full (mathfrak{sp}(4,mathbb R)) |

The off-diagonal relationship is therefore not decorative. It supplies exactly the directions that connect the two face algebras into the simple ten-dimensional closure.

Likewise the handle is essential. Without grade reversal, all translations commute and no Lorentz/structure or special-conformal directions are generated.

## 2. Relation to the original A X B intuition

The terminal Jordan carrier is

\[
H_2(\mathbb R)
=\operatorname{span}\{B_{11},B_{22},B_{12}\}.
\]

The two diagonal directions are the singular faces (A,B); the off-diagonal (B_{12}) is their relationship (X). Peirce–Schur recursion explains how such an (X) enters twice around an interior resolvent. The present theorem shows what happens when the resulting three-dimensional Jordan carrier is supplied with its grade-reversing duality: its Lie closure is exactly (Sp(4,\mathbb R)).

This is the most direct current mathematical realization of

\[
\text{singular faces}
+\text{relationship}
+\text{reciprocal handle}
\Longrightarrow
Spin(2,3).
\]

## 3. The remaining typing condition

The theorem uses the canonical TKK inversion \(W\). Primitive selector handle \(H\) cannot itself be conjugate to \(W\), because \(H^2=I\) while \(W^2=-I\). Document 972 supplies the exact repair. The response programme has independently produced:

- a sideband/chart-exchange operation;
- a saturated primitive selector handle;
- a two-chart Hopf transition;
- a graded quaternionic interface.

After lattice saturation and symplectic-form transport, give the primitive handle its commuting coherent complex structure \(Z\). The lift \(L=ZH\) is symplectic, squares to \(-I\), and is explicitly symplectically conjugate to \(-W\). The remaining condition is identification of \(Z\) with the independently derived Hopf/Pfaffian coherent structure—not an impossible direct identification of \(H\) and \(W\).

This condition is now finite and explicit; it is not a vague appeal to symmetry.

## 4. Stop-everything and falsification criteria

**Handle trigger:** the saturated selector handle receives the coherent lift \(L=ZH\), with \(Z\) physically identified, and the explicit symplectic transport of document 972 is used.

**Translation trigger:** the normal, tangent and mediator response directions map independently to (B_{11},B_{22},B_{12}).

**Closure trigger:** the same physical basis passes the ten-dimensional commutator certificate without inserting additional generators.

**Relationship falsifier:** the physical off-diagonal direction vanishes or is constrained to the diagonal span; closure remains six-dimensional.

**Typing falsifier:** the physical coherent structure cannot supply the opposite eigenspace orientations required for \(L=ZH\).

## 5. Verdict

| Question | Verdict |
|---|---|
| Do the three Jordan translations commute by themselves? | **yes** |
| Do two diagonal faces plus the handle generate all of (Sp(4))? | **no; dimension six** |
| Is the off-diagonal relationship necessary? | **yes** |
| Do the full four seeds generate dimension ten? | **yes** |
| Is the closure exactly (mathfrak{sp}(4,\mathbb R)\)? | **yes** |
| Is primitive \(H\) directly conjugate to \(W\)? | **no; their squares differ** |
| Does coherent \(L=ZH\) map to \(W\) up to sign? | **yes; physical identification of \(Z\) remains** |

## 6. Position in the corpus

- [Lorentz symmetric pair selected by \(\Gamma\)](970_the_graded_quaternionic_interface_selects_the_lorentz_subalgebra_inside_sp4_and_the_four_remaining_generators_form_a_minkowski_vector.md)
- [Peirce–Schur recursion](202_peirce_schur_triple_recursion_to_spin23.md)
- [relational-carrier Jordan composition](41_relational_carrier_jordan_triple_composition.md)
- [handle/chart-exchange boundary](952_the_realified_sideband_twist_is_rationally_conjugate_to_the_selector_handle_but_not_in_its_natural_symplectic_typing.md)
