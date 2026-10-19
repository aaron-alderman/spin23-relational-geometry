# Survivor Exchange Pairs Neutrino Corners but Needs Diagonal Gluing for \(H_2(\mathbb R)\)

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09 and B11  
**Claim status:** exact restriction of the completed-carrier exchange antiunitary; physical diagonal gluing/polarization remains open

## 1. Two completed survivors

Let the two cyclic Furey survivors be \(A\) and \(B\). Their neutral relational roles are

\[
(D_A,E_A)=(O_1,R),
\qquad
(D_B,E_B)=(R,O_1),
\]

up to the opposite initial convention. The absolute-label exchange maps

\[
D_A\mapsto D_B,
\qquad
E_A\mapsto E_B.
\]

Therefore it carries the neutrino Peirce corner of \(A\) to that of \(B\) while preserving the ordered relational roles.

## 2. Antiunitary restriction

Each neutral corner is

\[
H_2(\mathbb C)
=
\left\{
X(z)=
\begin{pmatrix}
a&z\\
\bar z&d
\end{pmatrix}
\right\}.
\]

On the pair of corners, the completed-carrier antiunitary acts as

\[
\boxed{
\Theta(X_A,X_B)
=
(\overline{X_B},\overline{X_A}).}
\]

It satisfies

\[
\Theta^2=1.
\]

On the off-diagonal real plane \(z=x+iy\), conjugation is

\[
K(x,y)=(x,-y),
\qquad K^2=1,
\]

and the complex orientation obeys

\[
KJ=-JK.
\]

Thus the survivor exchange really does restrict to conjugation **between the two Peirce fibers**. It is not an internal linear reflection within one selected survivor.

## 3. Exchange reality alone does not give \(H_2(\mathbb R)\)

The fixed-pair condition is

\[
X_B=\overline{X_A}.
\]

An arbitrary \(X_A\in H_2(\mathbb C)\) determines the pair, so the exchange-fixed space has real dimension four:

\[
\dim_{\mathbb R}\operatorname{Fix}\Theta=4.
\]

It is a real presentation of one full complex Hermitian corner. It does **not** force \(z\) to be real.

This corrects a tempting shortcut:

\[
\boxed{
\text{exchange antiunitarity alone}
\ \not\Rightarrow\
H_2(\mathbb R).}
\]

## 4. The additional diagonal gluing

If one also identifies the two relational corners,

\[
X_A=X_B,
\]

then the fixed-pair equation becomes

\[
X_A=\overline{X_A}.
\]

The intersection has real dimension three and is exactly

\[
\boxed{H_2(\mathbb R).}
\]

In other words:

\[
\operatorname{Fix}\Theta
\cap
\operatorname{Diag}(H_2(\mathbb C)\oplus H_2(\mathbb C))
\cong H_2(\mathbb R).
\]

The missing physical ingredient is therefore not conjugation; it is a justified diagonal gluing, polarization or identification of the two survivor fibers.

## 5. What could supply the gluing

Possible mechanisms are:

1. a boundary condition identifying the two completed carriers;
2. an exchange-symmetric locking term whose low-energy subspace is diagonal;
3. a quotient treating the two absolute neutral labelings as gauge-equivalent presentations;
4. a response compression that observes only the survivor-symmetric combination.

Each option must preserve the chiral matter interpretation and must not turn the pair into an independent mirror generation.

The native real division-algebra source does not supply the exchange automorphism, so the gluing cannot be claimed source-derived there.

## 6. Interaction with orientation

On the diagonal real slice, the complex structure \(J\) maps fixed vectors to exchange-anti-fixed vectors because

\[
\Theta J=-J\Theta.
\]

This is exactly the parent/slice geometry:

- \(\Theta\) selects the real \(H_2(\mathbb R)\) middle rung after diagonal gluing;
- \(J\) points into the imaginary off-diagonal complement;
- flux/cyclic orientation measures motion relative to the selected real axis.

The pair \((J,\Theta)\) is mathematically coherent, but the dynamics selecting the diagonal sector remains open.

## 7. Stop-everything and falsification gates

**Gluing trigger:** a source or boundary principle canonically identifies the two neutrino corners and leaves exactly one chiral generation with the real Jordan response.

**Locking trigger:** an exchange-symmetric positive interaction gaps the anti-diagonal corner while preserving the diagonal \(H_2(\mathbb R)\) cone and complex flavor CP.

**Mirror gate:** quantization of the exchange-fixed/diagonal theory contains one, not two, independent CAR generations.

**Falsifier:** exchange-fixed dimension four is misreported as the three-dimensional real Jordan algebra, or diagonal gluing is imposed without a physical quotient/locking mechanism.

## 8. Certificate

The [survivor-exchange neutrino-Peirce restriction certificate](scripts/verify_survivor_exchange_neutrino_peirce_restriction.mjs) constructs the eight-real-dimensional paired corner, verifies the exchange involution, computes a four-dimensional fixed space, obtains a three-dimensional intersection with diagonal gluing and checks conjugation anti-commutes with the complex orientation.

## Companion documents

- [Furey complex-structure candidate inventory](251_neutrino_peirce_line_is_the_only_gauge_neutral_furey_complex_structure_candidate.md)
- [Furey survivor-exchange antiunitary](162_furey_survivor_exchange_antiunitary_candidate.md)
- [Furey real-form obstruction](163_furey_real_form_obstruction_and_complex_carrier_escape.md)
- [Neutrino Peirce carrier](168_neutrino_peirce_corner_restores_gauge_neutral_h2r.md)
