# A Grading-Reversing Deck Symmetry Forces Zero Cover Index, So the Index-Three Parent Cannot Be the Same Operator

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact no-go theorem and programme correction; alternative Pin and conventional-vortex branches remain open but must be kept distinct

## 1. Stop-and-re-root result

The programme previously attempted to combine three statements:

1. the oriented selector double cover carries the conventional complex vortex index (3);
2. the nontrivial deck transformation is an exact symmetry of that same Fredholm operator;
3. the deck transformation reverses the chiral grading.

These statements are mutually inconsistent. Any invertible symmetry that
preserves the kernel and exchanges the two chiral subspaces forces their
dimensions to be equal.

## 2. Kernel-pairing theorem

Let (mathcal D) be Fredholm on a graded Hilbert space with

\[
\Gamma^2=1,\qquad \{\Gamma,\mathcal D\}=0.
\]

Write (K_\pm=\ker\mathcal D\cap\ker(\Gamma\mp1)). Suppose an invertible deck
lift obeys

\[
S\mathcal DS^{-1}=\eta\mathcal D,\quad \eta=\pm1,
\qquad S\Gamma S^{-1}=-\Gamma.
\]

For (psi\in K_+),

\[
\mathcal D(S\psi)=\eta S\mathcal D\psi=0,
\qquad \Gamma(S\psi)=-S\Gamma\psi=-S\psi.
\]

Thus (S:K_+\to K_-). Invertibility supplies the inverse, so

\[
\dim K_+=\dim K_-,\qquad
\boxed{\operatorname{Ind}_\Gamma\mathcal D=0.}
\]

This holds whether the lift commutes or anticommutes with (mathcal D).

## 3. The incompatible triangle

The following triangle cannot close:

\[
\boxed{
\begin{array}{c}
\text{conventional oriented cover index }3\\
\text{exact deck symmetry of the same operator}\\
\text{deck reverses the chiral grading}
\end{array}}
\]

Any two may be retained, but not all three:

- **index (3) + exact deck symmetry:** the deck cannot reverse the grading;
- **exact deck symmetry + grading reversal:** the cover index is zero;
- **index (3) + grading reversal:** the lift is not an exact deck symmetry of that index-three operator.

This is stronger than the earlier divisibility observation. Grading-preserving
ordinary descent requires an even pullback index. Exact grading-reversing
descent forces the ordinary complex index all the way to zero.

## 4. Why the one-momentum model missed it

The local family

\[
H(k,\varphi)=k\alpha+
\cos\frac\varphi2\beta_1+
\sin\frac\varphi2\beta_2
\]

is a valid Clifford sewing model, but not a complete two-dimensional vortex
Fredholm operator. Once a second kinetic generator is added, (S=\alpha_x)
flips the transverse frame. If that reflection becomes a true global deck
symmetry, the oriented double has paired opposite chiralities and zero complex
index, exactly as the theorem requires.

The local model remains an algebra certificate; it is not a construction of
an index-three quotient.

## 5. Geometric interpretation

An orientation-reversing deck transformation changes the sign of an oriented
two-dimensional vortex index. A defect and its deck image therefore contribute
opposite complex indices on the oriented double.

A Pin quotient may nevertheless carry a real mod-two invariant. If so, that
invariant is **not** obtained by reducing the ordinary complex index three of
the same oriented double:

\[
\text{Pin mod-two defect}
\not=\text{``index-three vortex divided by two.''}
\]

## 6. Repaired branch structure

### Branch A — conventional oriented vortex

Keep the full complex mass winding and index (3). Do not claim it is the
double cover of an exact grading-reversing primitive quotient. Its generation
count remains flavor input unless another mechanism derives it.

### Branch B — oriented internal quotient

Use (D_{\rm or}=I\otimes\sigma_y), which preserves the grading. Covering
multiplicativity then requires an even cover index. This is not the
conventional index-three parent.

### Branch C — Pin primitive defect

Use the frame-reflecting lift (D_{\rm Pin}=\alpha_x). The oriented double has
zero ordinary complex index, but the quotient may possess a real mod-two
kernel. Its parity must be calculated directly from the Pin domain.

### Branch D — non-symmetric interpolation

Retain an index-three full vortex and use the half-winding local family only as
an interpolation. The endpoint repair is not a symmetry of the full Fredholm
problem, so it does not define a physical primitive quotient.

These branches must no longer be merged in one index table.

## 7. Consequence for selector topology

The selector line may still have (w_1=1), motivating a Pin or Möbius carrier.
But neither

\[
w_1=1\Rightarrow\operatorname{Ind}_{\mathbb C}=3
\]

nor

\[
\operatorname{Ind}_{\mathbb C}=3\Rightarrow
\operatorname{Ind}_{\mathbb Z_2}=1
\]

holds without a theorem for the actual operator family.

## 8. Consequence for Furey integration

Furey conjugation cannot evade the kernel-pairing theorem. If a common-basis
Furey deck reverses (Gamma) and is an exact symmetry, its ordinary complex
cover index is zero.

The audit should now ask separately whether the neutral carrier supports:

1. a Pin real index with odd kernel parity; or
2. a conventional oriented complex vortex with index three, without claiming
   descent through the same grading-reversing deck.

This removes a false burden from the intertwiner search.

## 9. Stop-everything and falsification gates

**Stop-everything result obtained:** the proposed single-operator bridge from
an index-three oriented cover to a grading-reversing primitive quotient is
mathematically impossible.

**Kernel falsifier:** an exact invertible grading-reversing deck symmetry is
claimed together with a nonzero ordinary chiral index on the same Fredholm
operator.

**Geometry falsifier:** a Pin mod-two invariant is described as the parity of
an index-three oriented double even though the deck pairs opposite chiralities.

**Local-to-global falsifier:** the one-momentum Clifford family is treated as a
complete vortex index calculation.

**Repair criterion:** every future bridge must name which of Branches A--D it
uses and may not borrow the index from another branch.

## 10. Pinned dependency and continuation

Close the old merged branch. Continue two paths independently:

- compute the Pin mod-two kernel on an explicit reflected self-adjoint domain;
- retain the conventional index-three vortex as a separate oriented model and
  audit any independently derived relation to the Furey flavor carrier.

If the Pin kernel is odd, it is a new real invariant, not a quotient of complex
index three. If it is even, the primitive parity route closes without affecting
the exact Jordan--(Sp(4,\mathbb R)) theorem.

## 11. Certificate

The [grading-reversing deck index no-go certificate](../../../verification/verify/verify_grading_reversing_deck_forces_zero_cover_index.mjs)
checks the kernel-pairing theorem for both symmetry signs and rejects every
nonzero index count.

## Companion documents

- [Second kinetic direction and orientation fork](376_a_second_kinetic_direction_forces_a_choice_between_chiral_descent_and_orientation_reversal.md)
- [Finite-family parity audit](375_the_minimal_deck_model_loses_the_integer_grading_but_does_not_yet_prove_odd_fermion_parity.md)
- [Minimal local deck algebra](374_a_minimal_four_component_dirac_model_descends_the_hamiltonian_but_reverses_the_chiral_grading.md)
- [Odd ordinary-cover obstruction](372_the_odd_double_cover_index_proves_the_primitive_selector_operator_is_twisted_not_an_ordinary_quotient.md)
