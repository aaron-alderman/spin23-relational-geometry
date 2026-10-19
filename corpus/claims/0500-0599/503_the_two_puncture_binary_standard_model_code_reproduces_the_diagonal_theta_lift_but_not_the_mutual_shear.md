# The Two-Puncture Binary Standard-Model Code Reproduces the Diagonal Theta Lift but Not the Mutual Shear

**Date:** 17 October 2026  
**Branches:** B03, B04, B07, B09, B10, B11, B12 and B14  
**Claim status:** exact binary-code and logical-phase calculation; identification of code phase with the analytic theta line is a demonstrated finite match, not yet an intertwiner of line bundles

## 1. Result

Puncturing the \(\nu^c\) and \(e^c\) coordinates of the binary Standard-Model generation code produces a two-logical-qubit CSS code. Its source-derived transversal \(T\) gate acts exactly as

\[
\boxed{
T^\dagger\otimes T^\dagger
}
\]

on the two logical qubits.

Squaring gives the simultaneous inverse phase Clifford. Its natural equal-diagonal mod-four shear lift is

\[
K_{\mathrm{code}}=3I_2\pmod4.
\]

For this lift,

\[
\chi=0,
\qquad
\eta=1,
\qquad
\varepsilon^2=(-1)^{\chi+\eta}=-1.
\]

Thus the native binary anomaly code reproduces the diagonal sector of the exact theta-character factorization.

It does not reproduce the mutual off-diagonal shear. The logical phase remains factorized, with zero mixed finite difference.

## 2. Reconstructing the binary generation code

The sixteen \(SO(10)\) spinor weights are the even-parity five-bit strings. On these sixteen coordinates, take:

- the all-one word;
- the five coordinate-bit words.

Their span has dimension five and is the first-order Reed–Muller code

\[
RM(1,4).
\]

Every word has weight divisible by eight:

\[
\operatorname{wt}(w)\equiv0\pmod8.
\]

This is the triply-even integral refinement needed for the binary transversal \(T\) gate.

## 3. Two punctures give two logical qubits

Remove the coordinates

\[
\nu^c=(0,0,0,0,0),
\qquad
e^c=(0,0,0,1,1).
\]

Evaluation at these two points has rank two. The words vanishing at both punctures form a three-dimensional \(X\)-stabilizer space:

\[
\dim S_X=3.
\]

The punctured full word space still has dimension five, so its orthogonal complement has

\[
\dim S_Z=14-5=9.
\]

Therefore

\[
k=14-3-9=2.
\]

The construction gives an exact binary

\[
[[14,2]]
\]

CSS code. Its distance is not needed for the phase calculation and is not asserted here.

## 4. Triply-evenness fixes the logical phase

Let \(a,b\in\mathbb F_2\) be the two puncture evaluations. Every full codeword in that logical coset has weight divisible by eight. Removing the two puncture bits changes its weight by \(a+b\), so every punctured representative obeys

\[
\operatorname{wt}_{14}(w)
\equiv-a-b\pmod8.
\]

Applying physical \(T\) to all fourteen retained qubits therefore gives the logical phase

\[
\exp\!\left[-\frac{\pi i}{4}(a+b)\right].
\]

It is independent of the stabilizer representative, hence

\[
\boxed{
T^{\otimes14}
\longmapsto
T^\dagger_{\nu^c}\otimes T^\dagger_{e^c}.}
\]

This is source-derived: it follows from the integral overlap divisibility of the Standard-Model generation code rather than generic encoded-Clifford synthesis.

## 5. The square selects the equal diagonal lift

Squaring the logical operation gives

\[
(T^\dagger)^2\otimes(T^\dagger)^2
=S^\dagger\otimes S^\dagger.
\]

Its binary symplectic action is the same inverse phase shear on both logical handles. A compatible mod-four lift is

\[
K_{\mathrm{code}}
=
\begin{pmatrix}3&0\\0&3\end{pmatrix}.
\]

The finite character formula gives

\[
\chi(S_K)
=\frac{\operatorname{tr}K}{2}+k
=3+1
=0\pmod2,
\]

while the common local handle parity is

\[
\eta=1.
\]

The theta-square theorem therefore predicts

\[
\varepsilon^2=(-1)^{0+1}=-1.
\]

The code phase on the doubly occupied logical state is

\[
\left(e^{-\pi i(1+1)/4}\right)^2
=(-i)^2
=-1,
\]

which matches that sign exactly.

This is a finite phase match. A full identification still requires an intertwiner between the logical code line and the analytic theta line.

## 6. The code excludes the simplest forbidden unequal lift

The arithmetic counterexample

\[
K_{\mathrm{forbidden}}
=
\begin{pmatrix}3&0\\0&1\end{pmatrix}
\]

has the same matched binary action but \(\chi=1\). It assigns different phase lifts to the two handles.

The physical transversal \(T\) acts uniformly on every retained coordinate. Triply-evenness consequently produces equal inverse phases on the two logical punctures, selecting \(3I_2\), not \(\operatorname{diag}(3,1)\).

Thus the source code supplies a genuine part of the mod-four selection principle:

\[
\boxed{\text{uniform physical transversal phase}
\Longrightarrow
\text{equal logical diagonal lifts}.}
\]

It does not yet prove uniqueness among all non-diagonal lifts.

## 7. Why the mutual shear is still missing

The logical phase exponent is

\[
f(a,b)=-a-b\pmod8.
\]

Its mixed finite difference is

\[
\Delta_a\Delta_b f
=f(1,1)-f(1,0)-f(0,1)+f(0,0)
=0.
\]

Therefore the native transversal phase has no relational term. It supplies only two equal local phases.

The positive arithmetic lift is

\[
K_+
=
\begin{pmatrix}3&2\\2&3\end{pmatrix}.
\]

The diagonal code lift \(3I_2\) and \(K_+\) have the same values of \(\chi\), \(\eta\) and \(\varepsilon^2\). The finite character is deliberately insensitive to the even off-diagonal entry.

Consequently:

\[
\boxed{
\text{matching the theta character is necessary but does not derive the cross gate}.}
\]

The native binary shadow cannot display the mutual coefficient because \(2\equiv0\pmod2\). The coefficient is nevertheless supplied by the integral word

\[
T_{Z_1+Z_2}^{\,2}T_{Z_1}T_{Z_2},
\]

whose shear is exactly \(K_+\). Thus no ordinary binary controlled-\(Z\) should be added: it would create the wrong nonzero off-diagonal mod-two action. The doubled sum-axis transvection is invisible symplectically at two but survives at three, four and over the integers.

## 8. Relation to the odd-handle refinements

Each logical qubit has a binary Pauli plane \(\mathbb F_2^2\). That plane has one unique odd quadratic refinement

\[
q_-(x,z)=xz+x+z,
\]

equal to one on all three nonzero Pauli directions. The two labelled puncture planes therefore admit the canonical sum

\[
q_* = q_-^{(\nu^c)}\oplus q_-^{(e^c)}.
\]

This is compatible with the even genus-two characteristic found in the arithmetic branch.

However, the transversal \(T\) phase alone does not prove that the physical code selects this quadratic refinement uniquely. That stronger statement requires the full logical Clifford/theta intertwiner.

## 9. What the paper contributes and what the programme adds

The Prakash–Ramya theorem supplies:

- the triply-even \(RM(1,4)\) generation code;
- the puncture interpretation;
- the transversal \(T\) phase inherited from anomaly data.

The programme adds:

- the two-puncture logical decomposition;
- the exact equal-diagonal mod-four lift;
- the match to \((\chi,\eta,\varepsilon^2)=(0,1,-1)\);
- the proof that this match does not supply the mutual shear.

The source paper does not claim the genus-two theta or \(Spin(2,3)\) interpretation.

## 10. The corrected integral sewing target

The target is not a binary logical controlled-sign. The exact cross-prime word is

\[
T_{Z_1+Z_2}^{\,2}T_{Z_1}T_{Z_2}
\quad\longmapsto\quad
2\begin{pmatrix}1&1\\1&1\end{pmatrix}
+\begin{pmatrix}1&0\\0&0\end{pmatrix}
+\begin{pmatrix}0&0\\0&1\end{pmatrix}
=K_+.
\]

Modulo two the coefficient-two sum-axis term vanishes and the native diagonal operation is already the correct shadow. Modulo three the diagonal threes vanish and the same word becomes the pure mutual shear. The highest-value next operation is therefore to derive the **integral doubled sum-axis word**, including its projective phase, from Furey/Jordan/stress-energy structure.

## 11. Stop-everything and falsification gates

### Stop-everything outcomes

1. One integral word reduces to the binary diagonal and qutrit mutual operations while lifting to \(K_+\). **This algebraic gate is now met.**
2. The Furey spanning tree supports the same signed integral representatives at two and three. **This support gate is now met.**
3. A physical local circuit, Hamiltonian or categorical construction forces the doubled sum-axis transvection and its projective phase.
4. The resulting logical line intertwines exactly with the genus-two theta line.

### Falsifiers

- The factorized transversal phase must not be claimed to contain a mutual term.
- Equality of \(\chi,\eta,\varepsilon^2\) does not distinguish \(3I_2\) from \(K_+\).
- The phase on \(|11\rangle\) is a finite match, not by itself an isomorphism of determinant or theta lines.
- The modular \(e^c\) puncture must not be confused with removing the physical positron from the continuous Standard Model.

## 12. Current judgement

The Standard-Model code now explains a genuine part of the exceptional binary lift:

\[
\boxed{
\text{triply-even anomaly code}
\Longrightarrow
T^\dagger\otimes T^\dagger
\Longrightarrow
K=3I_2
\Longrightarrow
(\chi,\eta,\varepsilon^2)=(0,1,-1).}
\]

The native binary phase alone does not reveal the mutual coefficient, but it is exactly the mod-two shadow of the positive arithmetic carrier. The missing information lives in the integral lift, where the doubled sum-axis transvection supplies the off-diagonal two. This replaces the earlier search for an ordinary binary controlled-sign with the sharper problem of deriving one integral cross-prime word physically.

## Certificate and companion documents

- [Binary two-puncture phase certificate](../../../verification/verify/verify_two_puncture_binary_sm_code_reproduces_diagonal_theta_lift_but_not_mutual_shear.mjs)
- [Exact theta-square generator theorem](502_the_theta_square_identity_is_exact_on_an_integral_subgroup_surjecting_onto_the_full_matched_mod_four_preimage.md)
- [Qutrit CSS polarization and factorized-phase obstruction](../0400-0499/482_the_css_asymmetry_selects_the_puncture_polarization_but_the_native_transversal_phase_cannot_supply_the_mutual_seam_shear.md)
- [Qutrit low-weight mutual-shear word](../0400-0499/483_three_low_weight_code_transvections_realize_exactly_the_genus_two_mutual_seam_shear.md)
- [Prakash–Ramya source audit](../0400-0499/410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md)
- [One integral cross-prime \(K_+\) word](504_one_integral_three_transvection_word_is_binary_diagonal_qutrit_mutual_and_exactly_the_positive_kplus_lift.md)
