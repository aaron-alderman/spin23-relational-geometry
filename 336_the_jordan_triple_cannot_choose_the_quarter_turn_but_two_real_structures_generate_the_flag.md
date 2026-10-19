# The Jordan Triple Cannot Choose the Quarter-Turn, but Two Real Structures Generate the Flag

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B08 and B11  
**Claim status:** exact Jordan-triple automorphism and antiunitary-product theorem; dynamical selection of the second real structure remains open

## 1. The two carriers are triple-isomorphic

On \(M_2(\mathbb C)\), use the Hermitian Jordan triple

\[
\{A,B,C\}
=\frac12(AB^\dagger C+CB^\dagger A).
\]

For every unitary \(U\), conjugation

\[
\Phi_U(A)=UAU^\dagger
\]

obeys

\[
\Phi_U\{A,B,C\}
=\{\Phi_U(A),\Phi_U(B),\Phi_U(C)\}.
\]

In particular, for

\[
Q=\operatorname{diag}(1,i),
\]

the map \(\Phi_Q\) sends

\[
H_2(\mathbb R)
\longrightarrow
QH_2(\mathbb R)Q^\dagger.
\]

It preserves rank, determinant, cone positivity and the full Jordan-triple law.

Therefore

\[
\boxed{
\text{the intrinsic Jordan triple cannot distinguish the original and quarter-turned real carriers}.}
\]

Any claim that the Jordan identity alone selects \(Q\) is false. A source, boundary condition, flag, CAR polarization or stress-derived order parameter must choose the relative real structure.

## 2. The real structures themselves retain more information

Let

\[
\kappa_0=K
\]

be ordinary componentwise conjugation on \(\mathbb C^2\). Its fixed vectors form \(\mathbb R^2\).

The real structure whose fixed plane is \(Q\mathbb R^2\) is

\[
\kappa_Q=QKQ^{-1}.
\]

Because \(KQ^{-1}=\overline{Q^{-1}}K\), this can be written

\[
\kappa_Q=(QQ^T)K.
\]

For the quarter-turn,

\[
QQ^T
=\begin{pmatrix}
1&0\\0&-1
\end{pmatrix}
=:\Gamma.
\]

## 3. Their product is the flag grading

The two antiunitary involutions commute, and

\[
\boxed{
\kappa_Q\kappa_0
=\kappa_0\kappa_Q
=\Gamma
=\operatorname{diag}(1,-1).}
\]

Thus the relative quarter-turn is remembered by the product of the two real structures as a unitary grading.

Under conjugation by \(\Gamma\),

\[
\Gamma
\begin{pmatrix}a&0\\0&d\end{pmatrix}
\Gamma
=
\begin{pmatrix}a&0\\0&d\end{pmatrix},
\]

while

\[
\Gamma
\begin{pmatrix}0&z\\\bar z&0\end{pmatrix}
\Gamma
=-
\begin{pmatrix}0&z\\\bar z&0\end{pmatrix}.
\]

The diagonal contrast is grading-even and the relationship between the two directions is grading-odd. This is exactly the singlet/contrast structure used in the triality flag construction.

## 4. What the Jordan triple gives and what it does not

The triple gives:

- exact equivalence of the two real cones;
- preservation of Peirce and Schur operations under the quarter-turn;
- a common \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) conformal geometry;
- a clean algebra for transporting responses between real structures.

It does not give:

- a preferred \(Q\);
- a potential whose vacuum selects \(Q\);
- a reason both real structures coexist physically;
- the magnitude of their odd coupling;
- the association of their grading with three observed generations.

The pair \((\kappa_0,\kappa_Q)\), rather than either Jordan cone alone, contains the flag data.

## 5. CAR interpretation

In a self-dual CAR description, real structures specify polarizations or reality conditions. Two commuting antiunitary involutions naturally produce a unitary grading. Here that grading is \(\Gamma\).

This suggests a disciplined bridge:

\[
\boxed{
\text{Jordan carrier}
+\text{second CAR-compatible real structure}
\longrightarrow
\text{flag grading}.}
\]

But compatibility with gauge representations remains a separate gate. Earlier work showed that unitary particle–antiparticle exchange is not gauge-equivariant on charged \(R\oplus\bar R\). The second real structure may therefore be available only on identical sheet copies or neutral sectors.

## 6. Consequence for CP

The original and rotated real carriers are indistinguishable as abstract triples, while their coexistence produces \(\Gamma\). An off-diagonal operator is odd under this grading and is precisely what fails to preserve both real forms simultaneously.

Combined with the preceding result,

\[
\mathcal I_\triangle\propto r\alpha\beta,
\]

the CP source requires:

1. two real structures;
2. their relative quarter-turn;
3. an odd coupling crossing the induced grading;
4. both quadratures of the exceptional vector.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** the CAR or stress-tensor sector supplies a unique second antiunitary whose product with the original reality condition is the observed triality flag grading.

**Intrinsic-selection falsifier:** \(Q\) is claimed to follow from Jordan identities invariant under all unitary triple automorphisms.

**CAR falsifier:** the proposed second real structure fails gauge covariance on the sector where it is used.

**Grading falsifier:** the two proposed antiunitaries do not square to one or their product fails to reproduce the required flag parity.

## 8. Pinned dependency

The algebra now reduces the selection problem to a concrete question: identify a gauge-compatible physical antiunitary \(\kappa_Q\), distinct from ordinary conjugation, on the neutral or identical-sheet carrier.

Until such an operator is derived from the Furey/CAR or stress-response construction, the relative quarter-turn is an exact available structure but not a dynamical prediction.

## 9. Certificate

The [quarter-turned real-structure grading certificate](scripts/verify_quarter_turned_real_structures_generate_flag_grading.mjs) verifies the Jordan-triple automorphism, the product \(\kappa_Q\kappa_0=\Gamma\), the even/odd flag decomposition and the carrier quarter-turn.

## Companion documents

- [Two incompatible \(H_2(\mathbb R)\) real forms](335_the_exceptional_cp_doublet_exposes_two_incompatible_h2r_real_forms.md)
- [Two real structures generate a grading or complex structure](308_two_real_structures_generate_either_a_grading_or_a_complex_structure.md)
- [Second polarization-reversing real structure](311_a_second_polarization_reversing_real_structure_is_parameterized_by_one_unitary.md)
- [Carrier quarter-turn as broken selector direction](315_the_carrier_quarter_turn_is_a_broken_selector_direction_not_the_surviving_u1.md)
- [Three-sheet CAR gauge gate](328_the_three_sheet_car_count_is_consistent_but_the_charged_nambu_swap_cannot_be_the_full_selector_lift.md)
