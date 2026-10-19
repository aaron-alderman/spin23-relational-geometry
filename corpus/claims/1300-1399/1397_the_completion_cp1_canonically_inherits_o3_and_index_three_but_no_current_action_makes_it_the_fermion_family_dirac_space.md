# The completion \(\mathbb{CP}^1\) canonically inherits \(\mathcal O(3)\) and index three, but no current action makes it the fermion family-Dirac space

**Date:** 20 October 2026  
**Gate:** A6, bridge from programme “threes” to a three-generation index  
**Status:** exact bundle-level bridge; physical fermion coupling missing  
**Depends on:** [projector-orbit triple class 1188](../1100-1199/1188_the_cross_peirce_bundle_is_tcp2_its_canonical_class_is_three_and_the_faithful_central_lift_is_spinc_typed.md), [central-kernel correction 1189](../1100-1199/1189_the_z3_kernel_is_invisible_to_tcp2_and_its_spinc_determinant_but_faithful_on_the_universal_fundamental_module.md), [charge-three line twist 1194](../1100-1199/1194_the_unique_determinant_neutral_line_twist_supplies_the_independent_u1_connection_and_derives_charge_three_without_family_su2.md), [completion geometry 1212](../1200-1299/1212_the_four_target_moments_are_exactly_a_double_jordan_frame_and_the_missing_cp1_supplies_the_last_two_coordinates.md), and [index-three escape 1394](1394_no_finite_four_dimensional_operator_derives_three_selected_generations_but_an_o3_twisted_cp1_dirac_operator_is_the_minimal_index_three_escape.md)  
**Evidence:** [machine-readable bridge audit](../../../evidence/data/spin23-a6-programme-three-to-index-three-bridge.json) and [verifier](../../../verification/verify/verify_spin23_a6_programme_three_to_index_three_bridge.mjs)

## Result

The search does not end in a pure type mismatch. There is one canonical bundle-level bridge already latent in the corpus.

A selected rank-one projector \(P\) has complementary plane \(Q_P\). Its possible completion lines form

\[
\mathbb P(Q_P)\cong\mathbb{CP}^1.
\]

Every completion line is itself a rank-one line in \(\mathbb C^3\), so there is a canonical embedding

\[
j_P:\mathbb P(Q_P)\hookrightarrow\mathbb P(\mathbb C^3)=\mathbb{CP}^2.
\]

The projector orbit has anticanonical line

\[
K_{\mathbb{CP}^2}^{-1}=\mathcal O(3).
\]

Its pullback is exactly

\[
\boxed{
j_P^*K_{\mathbb{CP}^2}^{-1}
=\mathcal O_{\mathbb{CP}^1}(3).
}
\]

Twisting the spin Dirac operator on this completion \(\mathbb{CP}^1\) by the pulled-back line gives index three.

This is a real typed construction, not equality of unrelated integers.

It still does not derive three physical generations. In the current action the completion \(\mathbb{CP}^1\) is a vacuum/configuration space for a relational link. Fermions are not fields propagating along it, and no vertical family Dirac operator couples every SM multiplet to the pulled-back anticanonical connection.

The precise verdict is therefore

\[
\boxed{
\text{canonical degree-three bundle: yes}
\qquad
\text{physical family Dirac coupling: no}.
}
\]

## 1. An everyday model of the type check

Suppose a road loops three times around a hill. A label saying “three” on a nearby gearbox does not connect the gearbox to the road. A drive shaft would.

Here:

- a charge is how a field turns under a gauge phase;
- a BF level is a coefficient in a topological action;
- a Chern number counts curvature through a surface;
- a Dirac index counts chiral zero modes.

They can all equal three without being the same object. The required “drive shaft” is a bundle map and a fermion operator. This audit finds the bundle map. It does not find the fermion operator in the present action.

## 2. The ambient projector geometry

Let \(L\) be the universal tautological line over \(\mathbb{CP}^2\), and \(Q\) the universal rank-two quotient:

\[
0\longrightarrow L
\longrightarrow\underline{\mathbb C}^{\,3}
\longrightarrow Q
\longrightarrow0.
\]

With

\[
h=c_1(L^*)=c_1(\mathcal O(1)),
\]

the exact sequence gives

\[
c_1(L)=-h,\qquad c_1(Q)=h.
\]

The cross-Peirce relation bundle is the tangent bundle:

\[
T\mathbb{CP}^2
\cong\operatorname{Hom}(L,Q)
\cong L^*\otimes Q.
\]

Therefore

\[
c_1(T\mathbb{CP}^2)
=c_1(Q)+2c_1(L^*)
=3h,
\]

and

\[
\det T\mathbb{CP}^2
=K_{\mathbb{CP}^2}^{-1}
=\mathcal O(3).
\]

This is the established global version of the factor three in the projector-curvature identity.

## 3. The completion line is canonically embedded

Fix the first selected line \(P\mathbb C^3\). Its orthogonal complement is a fixed two-plane \(Q_P\mathbb C^3\). Completing the Jordan frame means choosing

\[
F_2\subset Q_P\mathbb C^3.
\]

The choices form

\[
\mathbb P(Q_P)\cong\mathbb{CP}^1.
\]

Because \(F_2\) is also a line in \(\mathbb C^3\), forgetting only the statement “orthogonal to \(P\)” gives the embedding

\[
j_P([F_2])=[F_2]\in\mathbb{CP}^2.
\]

This map is canonical once \(P\) is supplied. It is not an arbitrary identification between two spheres.

On this projective line,

\[
j_P^*L=\mathcal O(-1).
\]

The universal quotient splits as

\[
j_P^*Q
=\mathcal O\oplus\mathcal O(1).
\]

The trivial summand is the already selected fixed line \(P\mathbb C^3\); the \(\mathcal O(1)\) summand is the quotient of the fixed complementary two-plane by the varying completion line.

Hence

\[
\begin{aligned}
j_P^*T\mathbb{CP}^2
&=j_P^*(L^*\otimes Q)\\
&=\mathcal O(1)\otimes
\left(\mathcal O\oplus\mathcal O(1)\right)\\
&=\mathcal O(1)\oplus\mathcal O(2).
\end{aligned}
\]

Taking the determinant gives

\[
\boxed{
j_P^*\det T\mathbb{CP}^2
=\mathcal O(1)\otimes\mathcal O(2)
=\mathcal O(3).
}
\]

The \(\mathcal O(2)\) summand is the intrinsic tangent bundle of the projective line. The \(\mathcal O(1)\) summand is its normal bundle inside \(\mathbb{CP}^2\). Thus the degree three is geometrically

\[
3=2+1:
\quad
\text{intrinsic completion motion}
+
\text{normal motion in the full projector orbit}.
\]

## 4. Chern number and Dirac index

Normalize the hyperplane class so that

\[
\int_{\mathbb{CP}^1}j_P^*h=1.
\]

Then

\[
\int_{\mathbb{CP}^1}
c_1\!\left(j_P^*K_{\mathbb{CP}^2}^{-1}\right)
=3.
\]

The spin bundle of \(\mathbb{CP}^1\) has

\[
S^+=\mathcal O(-1).
\]

Twisting by the pulled-back anticanonical line gives

\[
S^+\otimes j_P^*K_{\mathbb{CP}^2}^{-1}
=\mathcal O(-1)\otimes\mathcal O(3)
=\mathcal O(2).
\]

Its holomorphic zero modes have basis

\[
1,\quad z,\quad z^2,
\]

while the opposite kernel vanishes:

\[
\dim H^0(\mathbb{CP}^1,\mathcal O(2))=3,
\qquad
\dim H^1(\mathbb{CP}^1,\mathcal O(2))=0.
\]

Therefore

\[
\boxed{
\operatorname{index}
D_{\mathbb{CP}^1,j_P^*K^{-1}_{\mathbb{CP}^2}}
=3.
}
\]

The rank-two tangent twist gives the same total:

\[
\operatorname{index}D_{\mathcal O(1)}
+\operatorname{index}D_{\mathcal O(2)}
=1+2=3.
\]

## 5. Projector curvature supplies the same class

For a varying rank-one projector \(\Pi\), define

\[
X_\Pi=I-3\Pi.
\]

The established identity is

\[
-i\operatorname{Tr}
\left(X_\Pi\,d\Pi\wedge d\Pi\right)
=3i\operatorname{Tr}
\left(\Pi\,d\Pi\wedge d\Pi\right).
\]

Along the completion line, the varying projector is

\[
\Pi=F_2,
\]

not the fixed first projector \(P\). Pulling the curvature back along \(j_P\) gives

\[
{1\over2\pi}
\int_{\mathbb{CP}^1}
j_P^*\!\left[
-i\operatorname{Tr}
\left(X_\Pi\,d\Pi\wedge d\Pi\right)
\right]
=3
\]

up to the already declared orientation convention.

This is the needed connection-level representative of the degree-three line.

However, if \(\Pi(x)\) is frozen to one constant vacuum in four-dimensional spacetime, its spacetime pullback has no such family index. Curvature on a parameter space becomes a fermion index only after the fermion kinetic problem is defined over that parameter space.

## 6. Audit of every other “three”

### 6.1 Charge-three flavon line

The independent compact line \(R\) satisfies

\[
c_1(R^3)=3c_1(R).
\]

This multiplies an existing class. It does not create one.

In the current action \(R\) is a line over spacetime. On a product

\[
M_4\times\mathbb{CP}^1
\]

its pullback from \(M_4\) restricts trivially to the \(\mathbb{CP}^1\) fiber:

\[
\deg\left(R|_{\mathbb{CP}^1}\right)=0,
\qquad
\deg\left(R^3|_{\mathbb{CP}^1}\right)=0.
\]

One could declare

\[
R|_{\mathbb{CP}^1}=\mathcal O(1),
\]

so that \(R^3=\mathcal O(3)\), but the degree-one flux would then be the new datum doing the work.

### 6.2 The charge-three Hopf quotient

A normalized nonzero cross-Peirce link is a point of \(S^3\subset\mathbb C^2\). Its projective direction is the Hopf quotient

\[
S^3\longrightarrow\mathbb{CP}^1.
\]

The physical \(U(1)_R\) acts on the link with weight three:

\[
S\mapsto e^{3it}S.
\]

This action is non-effective; its kernel is \(\mathbb Z_3\). If

\[
\phi=3t
\]

is the effective Hopf phase, a physical charge-\(q\) representation descends to an ordinary coarse-space line only when \(q\) is divisible by three. Its coarse degree is then

\[
{q\over3}.
\]

Thus the charge-three link descends to

\[
\mathcal O(1),
\]

not \(\mathcal O(3)\). Primitive charge-one matter does not descend to an ordinary line on the coarse \(\mathbb{CP}^1\); it retains the \(\mathbb Z_3\) gerbe/central data.

This is precisely why “the link has charge three” is not itself the desired index theorem.

### 6.3 Residual \(\mathbb Z_3\) and BF level

The residual \(\mathbb Z_3\) is finite holonomy data. On the completion sphere,

\[
H^1(\mathbb{CP}^1,\mathbb Z_3)=0,
\]

so there is no nontrivial flat principal \(\mathbb Z_3\) bundle to supply the index.

Also,

\[
H^2(\mathbb{CP}^1,\mathbb Z)\cong\mathbb Z
\]

has no torsion. A level-three BF coefficient controls the pairing of independent compact gauge fields; it is not automatically the flux

\[
\int_{\mathbb{CP}^1}{F\over2\pi}=3.
\]

The BF sector would need an explicit transgression or associated-bundle map into the completion geometry.

### 6.4 Canonical Spin\(^c\) determinant

This is the successful bundle source:

\[
K_{\mathbb{CP}^2}^{-1}=\mathcal O(3)
\quad\Longrightarrow\quad
j_P^*K_{\mathbb{CP}^2}^{-1}
=\mathcal O_{\mathbb{CP}^1}(3).
\]

But document 1189 supplies an essential correction. Under the central path

\[
\exp(it\,\operatorname{diag}(-2,1,1)),
\]

the tangent bundle has weight three and its determinant has weight six. At

\[
t={2\pi\over3},
\]

both are invariant. The Spin\(^c\) determinant is therefore blind to the faithful \(\mathbb Z_3\) action on matter.

It can produce the index-three line while still failing to specify how the physical fermion module sees the residual center.

### 6.5 Faithful fundamental module

The universal fundamental module remembers the center, but on the completion line it restricts as

\[
j_P^*(L\oplus Q)
=\mathcal O(-1)\oplus\mathcal O\oplus\mathcal O(1).
\]

Its component indices are

\[
-1,\quad0,\quad+1,
\]

and its total index is

\[
0.
\]

This exposes the exact division of labor:

\[
\boxed{
\begin{array}{ll}
\text{fundamental module:}&
\text{faithful center, zero total index},\\
\text{anticanonical determinant:}&
\text{index three, center blind}.
\end{array}
}
\]

No current construction unifies both properties on the physical fermions.

### 6.6 Family \(U(1)_X\)

The anomaly-free generator

\[
X=B-2Y-3L_i
\]

does not act uniformly on the SM15. In a left-handed basis, representative charges include

\[
X(Q)=0,\quad X(u^c)=1,\quad X(d^c)=-1,
\]

with different lepton charges for the selected and complementary families.

For a flux \(k\), a field of charge \(q\) obtains an index proportional to

\[
qk.
\]

Because the \(q\) are unequal and \(Q\) is neutral, one \(U(1)_X\) flux cannot yield three identical complete Standard-Model generations. The family \(U(1)_X\) remains important for the flavon and BF chain, but it is not the common family twist required by document 1394.

## 7. The exact typed bridge

The following sequence is now established:

\[
\boxed{
\begin{aligned}
\text{selected }P
&\longrightarrow
\mathbb P(Q_P)=\mathbb{CP}^1,\\
\mathbb P(Q_P)
&\xrightarrow{\,j_P\,}
\mathbb{CP}^2,\\
K_{\mathbb{CP}^2}^{-1}
&=\mathcal O(3),\\
j_P^*K_{\mathbb{CP}^2}^{-1}
&=\mathcal O_{\mathbb{CP}^1}(3),\\
\operatorname{index}D_{\mathbb{CP}^1,\mathcal O(3)}
&=3.
\end{aligned}
}
\]

This reduces the missing data identified in document 1394. The degree-three line need not be invented independently; it is canonically available after the selected projector and completion space exist.

What remains missing is the vertical arrow

\[
\text{bundle on completion space}
\longrightarrow
\text{physical fermion kinetic operator}.
\]

## 8. Minimal new coupling

The smallest explicit addition is a universal vertical family Dirac term

\[
\boxed{
D_{\rm total}
=D_4\otimes1
+\gamma_5\otimes
D_{\rm fam},
}
\]

where

\[
D_{\rm fam}
=D_{\mathbb{CP}^1,\,
j_P^*K_{\mathbb{CP}^2}^{-1}}.
\]

It must satisfy six conditions:

1. the completion \(\mathbb{CP}^1\) is an internal spectral or propagation coordinate, not only a set of possible vacua;
2. every SM15 multiplet and the sterile \(N\) is tensored with the same twisted zero-mode space;
3. the connection in \(D_{\rm fam}\) is the Hermitian pullback of the projector/anticanonical connection;
4. the conjugate \(\mathcal O(-3)\) sector is the Nambu/CAR adjoint, not an independent same-chirality mirror;
5. the higher-dimensional or spectral-triple anomaly and massive spectrum are healthy;
6. the response potential used to select or gap the link orientation does not destroy the index geometry.

Condition 6 is especially important. A sigma-model target and an extra compact propagation space are not automatically the same thing. If the response potential simply pins the link to one point of \(\mathbb{CP}^1\), there is no vertical Dirac spectrum left to count. A valid model must explain whether the geometry is:

- a genuine compact internal coordinate with a high excitation gap;
- a moduli-space quantum mechanics whose ground-state index is physical;
- a finite/noncommutative spectral replacement;
- or merely a classical vacuum target, in which case the index bridge is not physical.

## 9. What has genuinely improved

Before this audit, the \(\mathcal O(3)\) in document 1394 was a minimal illustrative extra bundle. Now:

- the exact completion \(\mathbb{CP}^1\) already exists in the programme;
- it embeds canonically into the projector orbit once \(P\) is selected;
- the ambient anticanonical triple class restricts to the required \(\mathcal O(3)\);
- the projector curvature provides a canonical connection representative;
- the Dirac index is exactly three.

So the remaining obstruction is narrower and more physical:

> Why do the Standard-Model fermions experience the completion geometry through this vertical Dirac operator?

No presently displayed action answers that question.

## 10. Verdict

\[
\boxed{
\begin{array}{l}
\text{mere integer coincidence: no},\\
\text{canonical bundle-level bridge: yes},\\
\text{physical fermion bridge: no},\\
\text{three generations derived: no},\\
A6\text{ status: blocked}.
\end{array}
}
\]

The programme has advanced from “invent a degree-three family bundle” to “derive one universal fermion coupling to a canonically available degree-three bundle.” That is a materially smaller missing middle, but it remains an additional dynamical/geometric postulate until the action contains it.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_a6_programme_three_to_index_three_bridge.mjs
~~~

The verifier computes the restricted universal-bundle splitting, the tangent and determinant degrees, the twisted Dirac kernels and index, the zero index of the faithful fundamental module, and the non-effective charge-three Hopf descent.
