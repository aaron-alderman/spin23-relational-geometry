# One integral three-transvection word is binary diagonal, qutrit mutual, and exactly the positive \(K_+\) lift

## Executive result

The binary and qutrit code branches do not require two unrelated sewing operations. One integral word already has the required prime shadows:

\[
\boxed{
T_{Z_1+Z_2}^{\,2}T_{Z_1}T_{Z_2}.}
\]

For the commuting pure-\(Z\) transvections used by the code, exponents add their rank-one shear matrices. In the \((X,Z)\) column convention this is a lower-block shear; its Fourier-dual description is upper-block. Hence

\[
2
\begin{pmatrix}1&1\\1&1\end{pmatrix}
+
\begin{pmatrix}1&0\\0&0\end{pmatrix}
+
\begin{pmatrix}0&0\\0&1\end{pmatrix}
=
\begin{pmatrix}3&2\\2&3\end{pmatrix}
=K_+.
\]

This single integer calculation is simultaneously:

- the native equal diagonal shear modulo two;
- the pure mutual shear modulo three;
- the positive arithmetic/Jordan lift modulo four and over the integers;
- a word supported on the already certified five-field Furey spanning tree.

This is the first exact object in the programme whose integral form and both code shadows meet at the same source-labelled support.

## 1. The integral word

Let \(Z_1,Z_2\) denote the two logical meridian axes. The upper transvection along a column \(v\in\mathbb Z^2\) contributes the symmetric shear \(vv^T\). Therefore

\[
T_{Z_1+Z_2}^{\,2}T_{Z_1}T_{Z_2}
\quad\longleftrightarrow\quad
2(1,1)^T(1,1)+(1,0)^T(1,0)+(0,1)^T(0,1).
\]

The result is

\[
K_+=\begin{pmatrix}3&2\\2&3\end{pmatrix},
\qquad
\det K_+=5,
\qquad
\operatorname{spec}(K_+)=\{5,1\}.
\]

Thus the lift is positive definite. Its eigenvectors are the relational and antisymmetric face combinations \((1,1)\) and \((1,-1)\). This is exactly the positive shear already isolated by the Jordan-response and arithmetic branches; it is not a newly fitted matrix.

## 2. Its prime and level shadows

### Modulo two

\[
K_+\equiv
\begin{pmatrix}1&0\\0&1\end{pmatrix}
\pmod2.
\]

The doubled sum-axis transvection vanishes at the binary symplectic level. What remains is precisely the simultaneous diagonal phase shear already supplied by the two-puncture binary Standard-Model code.

This is why adding an ordinary binary controlled-\(Z\) would be wrong: such a gate would introduce a nonzero off-diagonal coefficient modulo two, whereas the integral target has off-diagonal entry \(2\equiv0\pmod2\).

### Modulo three

\[
K_+\equiv
\begin{pmatrix}0&2\\2&0\end{pmatrix}
\pmod3.
\]

Now the diagonal coefficient three disappears and the doubled sum-axis term survives. The result is exactly the qutrit mutual shear derived from the three low-weight logical transvections.

### Modulo four

The full matrix survives:

\[
K_+\equiv
\begin{pmatrix}3&2\\2&3\end{pmatrix}
\pmod4.
\]

It lies on the allowed equal-discriminant-five theta branch. The binary code sees its mod-two diagonal skeleton, while the theta character and integral lift retain information invisible to that skeleton.

## 3. The physical axes and the Furey support

One integral choice of physical representatives is

\[
\begin{aligned}
z_1&=e_2+e_3-e_6,\\
z_2&=e_3-e_6+e_{13},\\
z_{12}&=-e_6-e_{10}.
\end{aligned}
\]

Their individual weights are \((3,3,2)\), and their union is

\[
\{2,3,6,10,13\}.
\]

Under the completed Furey/\(SO(10)\) field dictionary this is

\[
\boxed{\{u^c_1,d_1,e,\nu,d^c_1\},}
\]

the same five-field connected spanning tree previously found in the qutrit mutual-shear branch. The same signed integer representatives reduce to valid minimum logical axes at both \(p=2\) and \(p=3\).

## 4. Why binary-only Hamming minimization is not the selector

The punctured binary code has many minimum representatives:

- minimum weights \((3,3,2)\) for the three logical axes;
- candidate counts \((28,28,7)\);
- a minimum joint union of four coordinates, attained by 84 unions.

A four-field binary union is therefore possible. But it is not selected by the odd-prime code or by the source-labelled Furey incidence. The five-field representatives above have the stronger property of being simultaneously minimum at two and three and of lifting to one signed integral word.

This suggests a sharper selection rule:

\[
\boxed{
\text{minimize subject to integral and cross-prime compatibility, not Hamming union at one prime alone}.}
\]

The Furey tree is not the unique binary minimum. It is the minimum family that survives the arithmetic/source intersection.

## 5. What has and has not been established

### Established algebraically

- The three-transvection word has integral shear exactly \(K_+\).
- Its mod-two shadow is the equal diagonal binary shear.
- Its mod-three shadow is the pure mutual qutrit shear.
- Its physical representatives use the same five source-labelled Furey fields.
- The matrix is positive definite with determinant five.

### Not yet established physically

- The word is not yet a single local unitary circuit defined uniformly on Hilbert spaces of different prime dimension.
- A coefficient-two transvection that vanishes symplectically modulo two retains projective information: Cycle 421 identifies it with \(Z_1Z_2\) up to phase and proves the full finite phase match. A physical Pfaffian interpretation of the raw metaplectic phase remains open.
- The five-field graph is coarse representation-theoretic locality, not a derived spacetime interaction.
- No Hamiltonian, measurement protocol or stress-energy dynamics has yet forced this exact word.
- This does not by itself derive \(Spin_0(2,3)\) as the physical symmetry of the Standard Model.

## 6. Stop-everything significance

This result reaches the programme's stop-everything threshold in a limited but real algebraic sense: one integral circuit word now simultaneously matches

1. the binary Standard-Model code's native diagonal shadow;
2. the qutrit code's mutual shear;
3. the positive scalar/Jordan response \(K_+\);
4. the five-field Furey spanning tree;
5. the integral genus-two symplectic carrier underlying \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

The programme should therefore re-root the next search around **what dynamically or categorically forces this integral word**, rather than around inventing a binary controlled-sign gate.

## 7. Highest-value next tests

1. Compute the projective/metaplectic phase of the complete integral word on the selected theta line, not merely its symplectic reductions.
2. Derive the doubled sum-axis transvection from Furey weak-root transport or a Jordan-triple associator.
3. Determine whether a local measurement or surgery protocol realizes the word without introducing an unselected binary off-diagonal shear.
4. Search the stress-energy branch for a positive two-port response whose primitive integer normalization is exactly \(K_+\).
5. Test whether cross-prime/source compatibility uniquely selects the five-field representatives among all binary minima.

## Certificate and companions

- [Integral cross-prime word certificate](../../../verification/verify/verify_one_integral_three_transvection_word_gives_kplus_across_binary_and_qutrit_shadows.mjs)
- [Binary two-puncture phase analysis](503_the_two_puncture_binary_standard_model_code_reproduces_the_diagonal_theta_lift_but_not_the_mutual_shear.md)
- [Qutrit three-transvection word](../0400-0499/483_three_low_weight_code_transvections_realize_exactly_the_genus_two_mutual_seam_shear.md)
- [Furey spanning-tree support](../0400-0499/484_the_mutual_shear_support_is_the_furey_spanning_tree_and_the_two_punctures_are_its_cycle_closing_chords.md)
- [Positive integral Jordan lift](../0400-0499/486_the_three_transvection_word_has_a_positive_integral_jordan_lift_whose_level_three_self_terms_hide_modulo_three.md)
- [Full projective phase lift](505_the_integral_kplus_word_matches_the_full_binary_and_qutrit_projective_phases_but_not_a_canonical_global_phase.md)

