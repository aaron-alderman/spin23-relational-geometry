# The Cross-Prime Phase Orthogonal Group Is Only \(C_2^3\) and Does Not Contain the Handle Dynamics

**Date:** 17 October 2026  
**Branches:** B04, B07, B09, B10, B12 and B14  
**Claim status:** exhaustive finite-group computation; representation-theoretic interpretation established, physical meaning open

## 1. Result

For the 36-element cross-prime quadratic module

\[
(A,q)=\bigl((\mathbb Z_2)^2,q_2\bigr)
\oplus
\bigl((\mathbb Z_3)^2,q_3\bigr),
\]

the exact quadratic-form automorphism group is

\[
\boxed{O(A,q)\cong C_2^3,\qquad |O(A,q)|=8.}
\]

This is much smaller than either the order-18 matched binary handle image or \(Sp(4,\mathbb F_3)\). The finite phase module therefore cannot be the carrier on which the complete handle dynamics acts faithfully.

## 2. Primary decomposition

Automorphisms preserve the canonical primary decomposition, so

\[
O(A,q)\cong O(q_2)\times O(q_3).
\]

The binary form has values \(3/4,3/4,1/2\) on its three nonzero vectors. Its only nontrivial automorphism exchanges the two \(3/4\) axes, giving

\[
O(q_2)\cong C_2.
\]

The qutrit form \(q_3(a,b)=2ab/3\) is a hyperbolic plane. Its orthogonal group consists of \(I,-I\), coordinate swap and negative swap:

\[
O(q_3)\cong C_2\times C_2.
\]

Their product is \(C_2^3\).

## 3. Explicit CRT generators

Writing \(A\cong(\mathbb Z_6)^2\), three commuting involutions generate the group:

\[
g_2=
\begin{pmatrix}4&3\\3&4\end{pmatrix},
\qquad
g_{3,-}=
\begin{pmatrix}5&0\\0&5\end{pmatrix},
\qquad
g_{3,s}=
\begin{pmatrix}3&4\\4&3\end{pmatrix}
\pmod6.
\]

They respectively implement binary swap with qutrit identity, qutrit \(-I\) with binary identity, and qutrit swap with binary identity.

Exhaustive enumeration of all 1,296 two-by-two matrices modulo six finds exactly eight invertible quadratic-form preservers. Every nonidentity element has order two and all commute.

## 4. What happens to the matched binary handle group

The equal-discriminant-five binary handle image has order 18:

\[
S_3\times_{\mathbb Z_2}S_3.
\]

It cannot embed in an order-eight group. More precisely, its normal order-nine subgroup \(A_3\times A_3\) is invisible to a two-primary phase module. The only quotient retained by the discriminant-form automorphisms is the common transposition/orientation parity.

This matches the earlier theta formula: the finite phase line remembers \(\eta\), not the full local \(S_3\) handle actions.

## 5. Why this does not contradict the qutrit \(Sp(4)\) result

The qutrit Clifford group acts symplectically on the four-dimensional Heisenberg exponent module

\[
H_1(\Sigma_2,\mathbb F_3)\cong\mathbb F_3^4.
\]

By contrast, \(O(q_3)\) acts on the two-dimensional basis-label/discriminant group \((\mathbb Z_3)^2\) while preserving one fixed quadratic phase. These are different representations and different questions.

Thus

\[
Sp(4,\mathbb F_3)\not\subset O(q_3)
\]

is not a failure. The former moves among polarizations and quadratic refinements; the latter stabilizes one selected refinement.

## 6. Consequence for the synthesis

The cross-prime discriminant module is best interpreted as a **phase boundary datum** or anomaly label. It is not the full relational carrier. The larger \(Sp(4)\) dynamics must act through a Weil representation, a bundle of quadratic refinements, or a metaplectic groupoid in which the selected \(q\) is one object rather than a globally fixed invariant.

This resolves an ambiguity in the programme:

\[
\boxed{
\text{phase-module stabilizer}\ne\text{full carrier symmetry}.}
\]

## 7. Stop and falsification criteria

- Any faithful embedding of the order-18 handle image into \(O(A,q)\) is impossible.
- Any identification of \(O(A,q)\) with \(Sp(4,\mathbb F_3)\) is dimensionally and numerically false.
- A successful extension must allow the carrier group to transport quadratic refinements, not require every element to fix one refinement.
- If a proposed physical phase line needs the order-nine handle rotations to act nontrivially within a single one-dimensional line, it must supply additional character data absent here.

## Certificate and companions

- [Finite orthogonal-group enumeration](../../../verification/compute/compute_orthogonal_group_of_cross_prime_phase_module.mjs)
- [Cross-prime discriminant lattice](506_the_cross_prime_phase_module_is_the_discriminant_form_of_a_rank_four_lorentzian_even_lattice.md)

