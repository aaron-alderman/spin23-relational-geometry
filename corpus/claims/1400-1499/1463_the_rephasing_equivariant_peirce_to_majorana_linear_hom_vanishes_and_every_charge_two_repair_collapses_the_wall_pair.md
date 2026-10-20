# The rephasing-equivariant Peirce-to-Majorana linear Hom vanishes, and every charge-two repair collapses the wall pair

**Date:** 20 October 2026

**Gates:** A2 and A5

**Status:** exact representation-theoretic no-go for the proposed linear transport; exact projective-collapse theorem for every charge-minus-two covariant

**Depends on:** [the neutral Peirce complex line](../0200-0299/251_neutrino_peirce_line_is_the_only_gauge_neutral_furey_complex_structure_candidate.md), [the sterile phase-reference exhaustion](../1300-1399/1395_no_declared_cp_boundary_z3_flavor_or_index_datum_fixes_the_a5_sterile_phase_reference.md), and [the conditional wall--Peirce selector](1461_the_wall_sign_and_native_peirce_real_structure_select_two_phase_rays_but_transport_to_the_sterile_line_is_the_terminal_a2_a5_gate.md)

**Evidence:** [machine-readable certificate](../../../evidence/data/spin23-a2-a5-rephasing-weight-hom-no-go.json) and [executable verifier](../../../verification/verify/verify_spin23_a2_a5_rephasing_weight_hom_no_go.mjs)

## Result

The terminal Hom-space proposed in document 1461 omitted the continuous sterile rephasing weight. Restoring it decides the test.

Let (V_\nu) be the realification of the one-arrow neutral Peirce line and let (L^{-2}) be the dual of the sterile-pair line. Their natural circle weights have unequal magnitude:

\[
 V_\nu:\quad z\mapsto e^{\pm i\alpha}z,
 \qquad
 L^{-2}:\quad R_2\mapsto e^{-2i\alpha}R_2.
\]

Therefore

\[
 \boxed{
 \operatorname{Hom}_{U(1)_N\times G_{\rm SM}\times Spin_\partial\times\mathbb Z_2}
 (V_\nu,L^{-2})=0 .
 }
\]

The one-real-dimensional map found after imposing only the complex and real structures is genuine but insufficient: it is the Hom-space after forgetting the circle representation's speed. It cannot be promoted to the physical charge-equivariant map.

The smallest charge-correct repair is quadratic, represented in compatible frames by

\[
 Q(z)=\bar z^2.
\]

It has the required transformation (Q(e^{i\alpha}z)=e^{-2i\alpha}Q(z)), but the two wall-selected rays are (z\) and (iz), so

\[
 Q(iz)=-Q(z).
\]

Since the Majorana phase is a real projective ray, (R_2\sim-R_2), both wall orientations land on the same target ray. This collapse holds for every charge-minus-two equivariant map, not only for the displayed monomial.

Thus the wall--Peirce construction still selects two internal rays, but it cannot transport their distinction into the sterile Majorana phase plane through any charge-correct map built only from that one Peirce line.

## 1. The restricted Hom-space really is one dimensional

Choose compatible real frames

\[
 J=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
 \qquad
 K=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
\]

A real-linear map (T) satisfying

\[
 TJ=JT,
 \qquad
 TK=KT
\]

must be

\[
 T=aI,
 \qquad a\in\mathbb R.
\]

Hence the restricted real Hom-space has dimension one. After metric normalization it leaves (T=\pm I), one projective map. This is exactly the conditional statement proved in document 1461.

But (J) records only the normalized complex structure. It does not record whether the circle acts with weight one, two, or any other integer. A complex-line isomorphism is not automatically an isomorphism of charged circle representations.

## 2. Restoring sterile rephasing kills the linear Hom

The Peirce coordinate is a one-arrow relation. Relative endpoint phase rotates it with primitive weight (q_\nu=\pm1). The sterile coefficient (R_2) multiplies (NN), so field rephasing (N\mapsto e^{i\alpha}N) gives it weight (-2).

For (q_\nu=+1), infinitesimal equivariance of a real-linear (T) requires

\[
 TJ=-2JT.
\]

Multiplying once more by (J) gives

\[
 -T=TJ^2=4J^2T=-4T,
\]

and therefore (T=0). The (q_\nu=-1) convention gives (TJ=2JT) and the same conclusion. More generally, two real circle representations of nonzero integer weights admit a nonzero real intertwiner only when the absolute weights agree.

If the Peirce and sterile rephasings are initially treated as independent circles, the obstruction is even stronger. Identifying them by a nonprimitive charge-doubling rule is new sewing data, not a consequence of Standard Model gauge neutrality, boundary Lorentz covariance, (Spin(2,3)), or the Peirce real structure.

## 3. Why the quadratic repair does not transmit the wall sign

The lowest-degree covariant with target weight (-2) is the conjugate square

\[
 Q(z)=\bar z^2.
\]

It also respects conjugation:

\[
 Q(\bar z)=\overline{Q(z)}.
\]

This corrects the charge type, but it changes the angular map from (phi\mapsto\phi) to (phi\mapsto-2\phi). The wall involution selects the two source rays

\[
 [1],\qquad[i].
\]

Their images are

\[
 Q(1)=1,
 \qquad
 Q(i)=-1.
\]

These are the same point of

\[
 \mathbb P_{\mathbb R}(L^{-2}_{\mathbb R})=S^1/\{\pm1\}.
\]

The result is representation-theoretic. Any equivariant map (F) of weight (-2) obeys

\[
 F(iz)=e^{-2i(\pi/2)}F(z)=-F(z),
\]

so the two wall-selected source rays always have the same projective image. Higher powers, radial functions and invariant dressings cannot change this conclusion while preserving the same charge law.

## 4. Higgs and Yukawa dressing do not repair the declared model

The declared one-(N) Yukawa vector transforms with sterile weight (-1). Its Hermitian norm (Y_\nu^\dagger Y_\nu) is neutral and cannot change the weight mismatch. A holomorphic quadratic in (Y_\nu) has the correct sterile weight, but it is not a flavor scalar without an independently supplied symmetric flavor tensor or equivalent sewing datum. Treating the Majorana coefficient itself as the dressing is circular because it is the (R_2) reference being derived.

Consequently the present Higgs/Yukawa inventory contains no nonzero, source-derived, flavor- and rephasing-equivariant linear transport. Any repair must add exactly the kind of charged datum isolated in document 1395.

## 5. Corrected gate verdict

The calculation separates the two gates:

\[
\boxed{
\begin{array}{ll}
\text{A2 internal wall--Peirce ray selection:}&\textbf{retained conditionally},\\
\text{A5 linear transport }V_\nu\to L^{-2}:&\textbf{ruled out},\\
\text{charge-correct one-line nonlinear transport:}&\textbf{projectively collapses the wall pair},\\
\text{charged-TRO lock:}&\textbf{still absent},\\
\text{physical admission:}&\textbf{false}.
\end{array}}
\]

The previous three-outcome Hom test has therefore resolved to dimension zero once the physically required (U(1)_N) representation is included.

## 6. Minimal reopen data

This no-go is evaded only by changing the input type. Minimal possibilities are:

1. an independently sourced nonzero (R_2\in L^{-2}), as already isolated in document 1395;
2. a primitive charge-minus-two Peirce or boundary field whose two wall sectors are distinct before projectivization;
3. a second phase-bearing source so that a relative invariant survives rather than factoring through one weight-one line;
4. a derived nontrivial flavor tensor that turns a quadratic Yukawa covariant into a flavor scalar and fixes its phase noncircularly.

Each option must still be locked locally to the exchange-odd charged Furey TRO and must survive the full-wall reformulation required by A4.

## 7. Path back to (Spin(2,3))

The neutral Peirce corner still gives

\[
 p_\nu M_3(\mathbb C)p_\nu
 \supset H_2(\mathbb R)
 \Longrightarrow
 Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

The obstruction identifies precisely what that carrier forgets: the integer speed of the external phase action. A normalized complex structure knows that a circle rotates a plane; it does not distinguish weight one from weight two. The missing A5 datum is therefore not another (Spin(2,3)) conjugacy relation. It is a graded, charge-sensitive sewing from the (Spin(2,3)) response carrier to the sterile determinant line.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_a2_a5_rephasing_weight_hom_no_go.mjs
~~~
