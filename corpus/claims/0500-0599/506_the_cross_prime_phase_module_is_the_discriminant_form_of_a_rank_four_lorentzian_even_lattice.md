# The Cross-Prime Phase Module Is the Discriminant Form of a Rank-Four Lorentzian Even Lattice

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B12, B13 and B14  
**Claim status:** exact finite quadratic-module and even-lattice realization; physical spacetime, anomaly-line and \(Spin(2,3)\) identifications remain candidate bridges

## 1. Executive result

The binary and qutrit phase functions derived from the integral \(K_+\) word assemble canonically into a nondegenerate finite quadratic module

\[
(A,q),
\qquad
A=(\mathbb Z_2)^2\oplus(\mathbb Z_3)^2
\cong(\mathbb Z_6)^2,
\qquad |A|=36,
\]

whose values are twelfth roots of unity. Its normalized Gauss sum is

\[
\boxed{\gamma(A,q)=-i.}
\]

Moreover, this module is exactly the discriminant form of the even integral lattice

\[
\boxed{
L=\langle-2\rangle\oplus\langle-2\rangle\oplus U(-3),}
\]

with Gram matrix

\[
G=
\begin{pmatrix}
-2&0&0&0\\
0&-2&0&0\\
0&0&0&-3\\
0&0&-3&0
\end{pmatrix}.
\]

The lattice has determinant \(-36\), signature \((1,3)\), and signature difference \(-2\). Milgram's formula then gives

\[
e^{2\pi i\,\mathrm{sig}(L)/8}
=e^{-\pi i/2}
=-i,
\]

exactly the code-oriented lower theta multiplier found independently.

## 2. Why the common state object is not \(\mathbb Z_{12}^2\)

The two finite carriers have state groups

\[
A_2=(\mathbb Z_2)^2,
\qquad
A_3=(\mathbb Z_3)^2.
\]

Their Chinese-remainder product is

\[
A_2\oplus A_3\cong(\mathbb Z_6)^2,
\]

not \((\mathbb Z_{12})^2\). The number twelve enters the **value group** because the binary quadratic refinement uses fourth roots and the qutrit refinement uses third roots:

\[
\mu_4\times\mu_3\cong\mu_{12}.
\]

This corrects the provisional Cycle 421 phrasing. Confusing the state modulus with the phase modulus would quadruple the carrier and destroy the exact CRT interpretation.

## 3. The two primary quadratic forms

### Binary part

The binary phase of \(K_+\) is

\[
e^{2\pi iq_2(a,b)}=i^{3a+3b},
\]

so

\[
q_2(a,b)=\frac{3a^2+3b^2}{4}\pmod1.
\]

It is the orthogonal sum of two order-two forms with value \(3/4\) on their nonzero generator. Its unnormalized Gauss sum is

\[
(1-i)^2=-2i,
\]

and its normalized Weil index is \(-i\). Equivalently its Brown invariant is

\[
\operatorname{Br}(q_2)=6\pmod8.
\]

### Qutrit part

The qutrit phase is

\[
e^{2\pi iq_3(a,b)}=\omega^{2ab},
\]

hence

\[
q_3(a,b)=\frac{2ab}{3}\pmod1.
\]

This is a nondegenerate hyperbolic three-primary form. Its Gauss sum is \(3\), so its normalized Weil index is \(1\).

### Combined form

On \(A=A_2\oplus A_3\), define

\[
q(x_2,x_3)=q_2(x_2)+q_3(x_3).
\]

The associated bilinear pairing is nondegenerate. The full Gauss sum factorizes:

\[
\sum_{x\in A}e^{2\pi iq(x)}
=(-2i)(3)
=-6i.
\]

After division by \(\sqrt{|A|}=6\),

\[
\gamma(A,q)=-i.
\]

The twelfth-root phase has canonical primary projections: its ninth power isolates the \(\mu_4\) binary phase, and its fourth power isolates the \(\mu_3\) qutrit phase.

## 4. Exact lattice realization

For an even lattice with Gram matrix \(G\), the discriminant group and form are

\[
A_L=L^*/L,
\qquad
q_L([n])=\frac12n^TG^{-1}n\pmod1.
\]

For the two \(\langle-2\rangle\) summands, a dual generator has norm contribution

\[
-\frac14\equiv\frac34\pmod1,
\]

which reproduces each binary factor.

For \(U(-3)\),

\[
\begin{pmatrix}0&-3\\-3&0\end{pmatrix}^{-1}
=
\begin{pmatrix}0&-1/3\\-1/3&0\end{pmatrix},
\]

so

\[
q_L(a,b)=-\frac{ab}{3}
\equiv\frac{2ab}{3}\pmod1,
\]

exactly the qutrit mutual form.

Therefore

\[
(A_L,q_L)\cong(A,q)
\]

without choosing fitted coefficients after the fact.

## 5. The Lorentzian fact and its boundary

The eigenvalues of \(G\) are

\[
-2,-2,3,-3,
\]

so the lattice has one positive and three negative directions. This is an exact Lorentzian signature, but it does **not** establish that \(L\) is the spacetime lattice.

At present \(L\) is a discriminant/phase lattice. Its real orthogonal group is locally Lorentzian \(O(1,3)\), not \(Sp(4,\mathbb R)\cong Spin_0(2,3)\). A valid \(Spin(2,3)\) bridge would have to show how this rank-four boundary lattice sits inside, arises from, or is acted on by the five-dimensional quadratic carrier of the symplectic/Jordan construction.

The signature match with physical four-dimensional Lorentzian geometry is therefore a high-value clue and an equally high-risk coincidence.

## 6. Anomaly interpretation

Milgram's phase \(-i\) is intrinsic to the finite quadratic module once \(q\) is fixed. This supplies a canonical mathematical source for the same fourth root seen in the theta calculation:

\[
\text{binary Brown invariant }6
+\text{qutrit hyperbolic index }0
\Longrightarrow -i.
\]

Cycle 435 closes the binary half of this source question. The integral two-puncture charge-evaluation image is

\[
D_2=\{(a,b)\in\mathbb Z^2:a\equiv b\pmod2\},
\]

and the inverse logical phase selects

\[
-D_2\cong\langle-2\rangle^2.
\]

Its discriminant form is exactly \(q_2\). The binary lattice block is therefore carried by the Standard-Model puncture system.

The full CRT anomaly-line statement remains a candidate synthesis. The qutrit puncture construction supplies \(q_3\), but a comparably direct integral source derivation of the \(U(-3)\) block and the physical gluing intertwiner are still open.

## 7. Isotropy and why order \(36\) does not imply triviality

Although \(|A|=36=6^2\), the module is not metabolic. The binary two-primary part is anisotropic: none of its three nonzero vectors has quadratic value zero. The qutrit part has isotropic lines, but they cannot cancel the binary values \(3/4\) or \(1/2\).

Consequently there is no isotropic subgroup of order six. The nontrivial Weil index is not removable by choosing a full Lagrangian subgroup. This is the precise finite obstruction that a proposed anomaly cancellation, boundary completion or doubled theory would have to address.

## 8. Stop-everything criteria

The programme should re-root if any of the following is derived independently:

1. the Furey five-field tree has discriminant form isometric to \((A,q)\);
2. a Standard-Model determinant/Pfaffian line has Brown invariant six and qutrit-hyperbolic completion;
3. the rank-four lattice occurs canonically as a boundary, cusp or primitive sublattice of the \(Spin(2,3)\) arithmetic carrier;
4. its Weil representation reproduces the already derived genus-two theta line without an arbitrary polarization choice.

## 9. Falsification criteria

- The Lorentzian signature alone is not evidence that \(L\) is spacetime.
- The state group must have order \(36\), not \(144\).
- Any claimed lattice realization must reproduce both primary forms, not only the determinant.
- A metabolic completion that leaves the binary anisotropic form unchanged cannot exist on this 36-element module.
- Matching the Gauss phase does not identify physical anomaly lines without an intertwiner.

## 10. Next calculations

1. Compute \(O(A,q)\) and determine whether the matched handle group acts through it.
2. Classify primitive embeddings of \(L\) into natural signature-\((2,3)\) lattices associated with \(Sp(4)\).
3. Derive the \(U(-3)\) block from a direct integral qutrit source map.
4. Pull the weak two-bit quotient of the Furey support Smith defect into the binary discriminant module and test the quadratic refinement.

## Certificate and companions

- [CRT quadratic-module and Weil-index certificate](../../../verification/verify/verify_crt_quadratic_module_packages_binary_qutrit_and_has_weil_index_minus_i.mjs)
- [Projective integral-word phase](505_the_integral_kplus_word_matches_the_full_binary_and_qutrit_projective_phases_but_not_a_canonical_global_phase.md)
- [Integral cross-prime word](504_one_integral_three_transvection_word_is_binary_diagonal_qutrit_mutual_and_exactly_the_positive_kplus_lift.md)

