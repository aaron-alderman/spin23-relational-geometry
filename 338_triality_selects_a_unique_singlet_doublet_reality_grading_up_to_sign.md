# Triality Selects a Unique Singlet–Doublet Reality Grading up to Sign

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11 and B13  
**Claim status:** exact \(S_3\)-commutant selection theorem; choice of overall sign and dynamical breaking coefficients remain open

## 1. The selection problem after the gauge audit

The gauge commutant permits many family-space unitaries. Gauge covariance therefore establishes existence of a second antiunitary but does not select its relative unitary \(W\).

The three triality sheets carry the permutation representation

\[
\mathbb C^3=\mathbf1\oplus\mathbf2.
\]

This decomposition is multiplicity-free. That fact almost completely removes the ambiguity.

## 2. Canonical singlet and doublet

Let

\[
s=\frac1{\sqrt3}(1,1,1)^T
\]

be the normalized \(S_3\)-invariant vector. Define

\[
P_s=|s\rangle\langle s|,
\qquad
P_D=I-P_s.
\]

The plane \(D=P_D\mathbb C^3\) is the irreducible standard doublet. The nested flag and sign gradient later choose the orthonormal basis

\[
t=\frac1{\sqrt6}(1,1,-2)^T,
\qquad
o=\frac1{\sqrt2}(1,-1,0)^T
\]

inside \(D\).

## 3. The unique nontrivial equivariant involution

By Schur’s lemma, every \(S_3\)-equivariant Hermitian operator is

\[
X=aP_s+bP_D,
\qquad
a,b\in\mathbb R.
\]

The involution equation \(X^2=I\) forces

\[
a^2=b^2=1.
\]

The choices \(a=b\) give only \(\pm I\). The two nontrivial choices are opposite overall signs:

\[
\boxed{
W=P_s-P_D=2P_s-I,
\qquad
-W.}
\]

Therefore the nontrivial \(S_3\)-equivariant Hermitian involution is unique up to an overall sign.

Its eigenvectors are

\[
Ws=s,
\qquad
Wt=-t,
\qquad
Wo=-o.
\]

In the original sheet basis,

\[
W=
\frac13
\begin{pmatrix}
-1&2&2\\
2&-1&2\\
2&2&-1
\end{pmatrix}.
\]

## 4. What selects what

The ingredients now have distinct roles:

\[
\begin{array}{ccl}
S_3\text{ permutation carrier}
&\Longrightarrow&
\text{the unique grading }W:\mathbf1\oplus\mathbf2,\\
\text{unit element}
&\Longrightarrow&
s\in\mathbf1,\\
\text{nested flag}
&\Longrightarrow&
t\in\mathbf2,\\
\text{sign-cubic gradient}
&\Longrightarrow&
o\in\mathbf2,\\
\text{complex orientation}
&\Longrightarrow&
\text{relative quadrature of the }t\leftrightarrow o\text{ edge}.
\end{array}
\]

The exceptional sign gradient does not select \(W\) by itself. Full triality selects \(W\); the flag and sign gradient resolve a basis inside its negative doublet.

## 5. Gauge and CAR lift

Because \(W\) acts only on the three identical sheet copies, it commutes with every Standard-Model gauge representation acting identically on those sheets.

On the self-dual CAR carrier, define

\[
J_W=
\begin{pmatrix}
0&W\\
W^T&0
\end{pmatrix}K.
\]

Then \(J_W\) is gauge equivariant and

\[
J_WJ_0=
\begin{pmatrix}
W&0\\
0&W
\end{pmatrix}.
\]

This supplies the previously missing selected direction in the gauge multiplicity commutant without adding new matter.

## 6. The two CP quadratures have different grading characters

Recall

\[
A=|s\rangle\langle o|+|o\rangle\langle s|,
\]

\[
B=i(|t\rangle\langle o|-|o\rangle\langle t|).
\]

Ordinary conjugation gives

\[
\bar A=A,
\qquad
\bar B=-B.
\]

The selected triality grading gives

\[
WAW=-A,
\qquad
WBW=B.
\]

Thus the two quadratures occupy complementary character sectors:

\[
\boxed{
A=(K\text{-even},W\text{-odd}),
\qquad
B=(K\text{-odd},W\text{-even}).}
\]

For

\[
\Delta(c)=\operatorname{Re}c\,A+\operatorname{Im}c\,B,
\]

neither reality alone treats both quadratures identically. A genuinely complex \(c\) necessarily combines two distinct real-structure characters.

## 7. What has been selected and what has not

Selected exactly:

- the nontrivial family involution \(W\), up to overall sign;
- its \(1+2\) eigenspace decomposition;
- a gauge-compatible CAR lift;
- the parity characters of the two canonical CP operators.

Not selected:

- the physically irrelevant convention \(W\leftrightarrow-W\);
- the values of \(\operatorname{Re}c\) and \(\operatorname{Im}c\);
- the relative breaking strengths in quark and lepton sectors;
- the vacuum or response dynamics producing \(c\);
- the observed mass ordering inside the doublet.

## 8. Cross-branch consequence

The previous branch pinned selection of \(W\). Triality now resolves that pin at the representation level:

\[
\boxed{
\text{triality multiplicity carrier}
\Longrightarrow
W=2|s\rangle\langle s|-I
\quad(\text{up to sign}).}
\]

The remaining pin is dynamical rather than algebraic: why and how the interacting mass sector breaks this selected kinematic reality with the two coefficients encoded by \(c\).

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the same exceptional polarized determinant that produces \(c\) also generates a potential whose vacuum breaks the selected \(W\) with the observed cross-sector pattern.

**Uniqueness falsifier:** an additional nontrivial \(S_3\)-equivariant Hermitian involution exists on the multiplicity-free \(\mathbf1\oplus\mathbf2\) carrier and is not \(\pm W\).

**Gauge falsifier:** the sheet action ceases to be identical across a sector where \(W\) is claimed to commute with the gauge group.

**Character falsifier:** \(A\) or \(B\) fails the displayed \(K\) and \(W\) parity equations.

**Dynamics falsifier:** representation-theoretic uniqueness of \(W\) is presented as a prediction of the coefficients in \(\Delta(c)\).

## 10. Certificate

The [unique triality singlet–doublet involution certificate](scripts/verify_unique_s3_singlet_doublet_flag_involution.mjs) verifies \(S_3\) commutation, uniqueness up to sign, the \(+--\) spectrum and the complementary characters of \(A\) and \(B\).

## Companion documents

- [Gauge-commutant flag antiunitary](337_the_flag_antiunitary_lives_in_the_gauge_multiplicity_commutant_and_cp_breaks_it.md)
- [Canonical CP-capable odd operator](326_the_flag_sign_gradient_and_complex_structure_build_a_canonical_cp_capable_odd_operator.md)
- [Polarized exceptional determinant](327_the_polarized_exceptional_determinant_projects_canonically_onto_the_triality_sign_cubic.md)
- [Triality orbit and three flavor sheets](323_quantizing_the_triality_orbit_gives_three_flavor_sheets_but_exact_s3_or_s2_forbids_observed_mixing.md)
