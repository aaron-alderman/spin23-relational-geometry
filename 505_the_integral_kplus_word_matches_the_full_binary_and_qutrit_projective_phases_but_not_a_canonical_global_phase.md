# The Integral \(K_+\) Word Matches the Full Binary and Qutrit Projective Phases, but Not a Canonical Global Phase

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B07, B09, B10, B11, B12 and B14  
**Claim status:** exact finite quadratic-phase calculation and exact upper-theta multiplier; the lower raw phase uses the fixed Fourier normalization, while a physical Pfaffian identification remains open

## 1. Result

The integral word

\[
W=T_{Z_1+Z_2}^{\,2}T_{Z_1}T_{Z_2}
\]

does more than reproduce the correct symplectic matrices. With the standard finite quadratic refinements, it reproduces the complete logical phase functions:

\[
\boxed{
\begin{array}{ccl}
p=2 &:& W=S^\dagger\otimes S^\dagger,\\[2mm]
p=3 &:& W|a,b\rangle=\omega^{2ab}|a,b\rangle.
\end{array}}
\]

Thus the cross-prime bridge survives projective lifting. The remaining ambiguity is not the finite logical gate; it is the normalization-dependent global phase of the metaplectic/theta line and its possible physical interpretation.

## 2. One integral quadratic form

The shear of the word is

\[
K_+=2
\begin{pmatrix}1&1\\1&1\end{pmatrix}
+
\begin{pmatrix}1&0\\0&0\end{pmatrix}
+
\begin{pmatrix}0&0\\0&1\end{pmatrix}
=
\begin{pmatrix}3&2\\2&3\end{pmatrix}.
\]

For \(x=(a,b)^T\), its integral quadratic polynomial is

\[
Q(x)=x^TK_+x=3a^2+4ab+3b^2
=2(a+b)^2+a^2+b^2.
\]

Keeping this polynomial integral before reducing the prime is essential. Reducing the matrix first hides precisely the phase information that distinguishes a symplectic identity from a nontrivial Clifford lift.

## 3. Binary projective shadow

For qubits the diagonal Clifford associated with an integral symmetric matrix is

\[
U_K|x\rangle=i^{x^TKx}|x\rangle.
\]

On binary values \(a,b\in\{0,1\}\),

\[
Q(a,b)=3a+4ab+3b\equiv3a+3b\pmod4.
\]

Therefore

\[
U_{K_+}|a,b\rangle=(-i)^{a+b}|a,b\rangle,
\]

which is exactly \(S^\dagger\otimes S^\dagger\), the square of the transversal \(T^\dagger\otimes T^\dagger\) derived from the punctured Standard-Model code.

The coefficient-two sum-axis factor is not projectively trivial:

\[
i^{2(a+b)^2}=(-1)^{a\oplus b}.
\]

Hence

\[
T_{Z_1+Z_2}^{,2}\sim Z_1Z_2
\]

up to global phase. It is symplectically invisible but converts the local \(S\otimes S\) factors into \(S^\dagger\otimes S^\dagger\):

\[
(Z_1Z_2)(S\otimes S)=S^\dagger\otimes S^\dagger.
\]

The mixed phase difference is still zero modulo four. This is not a controlled-\(Z\); the apparent relational factor collapses to a product Pauli on binary inputs.

## 4. Qutrit projective shadow

For odd prime \(p\), the standard diagonal Weil lift is

\[
U_K|x\rangle
=\omega^{\frac12x^TKx}|x\rangle.
\]

At \(p=3\), \(1/2=2\), while

\[
Q(a,b)\equiv ab\pmod3.
\]

Consequently

\[
U_{K_+}|a,b\rangle=\omega^{2ab}|a,b\rangle.
\]

The diagonal self terms disappear and the same integral word becomes the genuine mutual qutrit Clifford phase. This verifies the full nine-state phase table, not merely its induced action on Pauli exponents.

## 5. The theta-line phase

For the selected characteristic \(m_*=(11;11)\), an upper shear \(T_B\) has exact multiplier

\[
\varepsilon(T_B)
=\exp\!\left[
\frac{\pi i}{4}(B_{11}+2B_{12}+B_{22})
\right]
\]

whenever the complete shear returns the selected characteristic.

For \(K_+\), the integer in parentheses is ten, so

\[
\varepsilon(T_{K_+})=i.
\]

The factorization makes the phase transparent:

- \(2(1,1)^T(1,1)\) contributes exponent eight and phase \(1\);
- \(E_{11}\) contributes \(e^{\pi i/4}\);
- \(E_{22}\) contributes \(e^{\pi i/4}\);
- the product is \(i\).

In the code-oriented lower-shear convention, Fourier conjugation gives

\[
\varepsilon(L_{K_+})=-i,
\qquad
\varepsilon(L_{K_+})^2=-1,
\]

matching the existing numerical theta evaluation and the exact squared-character theorem.

There is a useful intermediate-line warning. A single sum-axis twist sends \((11;11)\) to \((11;00)\); its second application returns to \((11;11)\). Thus the square has a scalar on the selected theta line, while one must not assign both individual factors scalars on that same fixed line without transporting the characteristic.

## 6. What is now unified

The same integral polynomial \(Q=3a^2+4ab+3b^2\) now accounts for:

1. the binary logical phase \((-i)^{a+b}\);
2. the qutrit mutual phase \(\omega^{2ab}\);
3. the positive Jordan shear \(K_+\);
4. the theta multiplier square \(-1\);
5. the signed five-field Furey support of the three axes.

This is stronger than a congruence-group coincidence. The finite logical phase functions themselves descend from one integer quadratic form.

## 7. Boundary of the result

The raw theta phase \(\pm i\) is not yet a physical observable:

- upper and lower polarizations give conjugate raw phases;
- metaplectic square-root normalization changes representatives;
- global code-unitary phases are convention-dependent;
- no physical Pfaffian or determinant line has yet been identified with the selected theta line.

The robust common datum is the integral quadratic form, its prime-specific projective gates, and the squared theta/orientation character. Claiming a canonical common global phase would exceed the evidence.

## 8. Stop-everything and falsification gates

### Stop-everything continuation

A source-derived Pfaffian or anomaly line whose holonomy equals the lower-shear \(-i\) phase would upgrade the arithmetic theta line to a physical phase line and should re-root the programme.

### Falsifiers

- If a proposed binary realization produces a mixed exponent \(2ab\pmod4\), it is controlled-\(Z\) and is not the binary shadow of \(K_+\).
- If a qutrit realization retains diagonal phases, it has not reduced the integral word correctly.
- A raw eighth-root phase must not be compared across polarizations without specifying the metaplectic lift.
- Equality of symplectic actions alone is insufficient; the finite phase tables must agree.

## 9. Next branch

The most valuable next question is whether Furey's weak-root transport or the Standard-Model anomaly code supplies the integer quadratic refinement \(Q\), rather than merely its reductions. The completed CRT continuation constructs a state group \((\mathbb Z_6)^2\) whose quadratic values lie in \(\mu_{12}\); it is not a \(\mathbb Z/12\mathbb Z\) state module. Its discriminant lattice and Weil index are developed in document 506.

## Certificate and companions

- [Projective cross-prime phase certificate](scripts/verify_projective_phase_of_integral_kplus_word_across_two_three_and_theta.mjs)
- [Integral cross-prime shear word](504_one_integral_three_transvection_word_is_binary_diagonal_qutrit_mutual_and_exactly_the_positive_kplus_lift.md)
- [Binary Standard-Model code phase](503_the_two_puncture_binary_standard_model_code_reproduces_the_diagonal_theta_lift_but_not_the_mutual_shear.md)
- [Theta multiplier and orientation twist](501_the_squared_genus_two_theta_multiplier_matches_the_mod_four_character_only_after_the_handle_orientation_twist.md)

