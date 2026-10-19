# Polarizing the Rank-Three Jordan Cubic Along the Discarded Face Gives the \(Spin(2,3)\) Rank-Two Determinant

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B09, B10, B11, B14 and the cubic-residue branch  
**Claim status:** exact determinant/polarization theorem for \(H_3(\mathbb C)\to H_2(\mathbb C)\to H_2(\mathbb R)\); exceptional and action-level lifts remain open  
**Certificate:** [verify_jordan_cubic_peirce_residue_descends_to_h2_determinant.mjs](scripts/verify_jordan_cubic_peirce_residue_descends_to_h2_determinant.mjs)

## Executive result

The rank-two determinant underlying the \(Spin(2,3)\) carrier is an exact polarized residue of the rank-three Jordan cubic.

Write

\[
X=
\begin{pmatrix}
A&w\\
w^\dagger&c
\end{pmatrix}
\in H_3(\mathbb C),
\qquad A\in H_2(\mathbb C).
\]

Then

\[
\boxed{
\det X
=c\det A-w^\dagger\operatorname{adj}(A)w.
}
\]

Let \(e_3=\operatorname{diag}(0,0,1)\) be the discarded rank-one face and embed \(A\) with zero third row and column. The directional derivative of the cubic norm is

\[
\boxed{
D_{e_3}\det(A)=\det A.
}
\]

Equivalently, if \(T\) is the symmetric trilinear polarization normalized by \(\det X=T(X,X,X)\), then

\[
3T(A,A,e_3)=\det A.
\]

This gives a direct algebraic descent:

\[
\text{rank-three cubic norm}
\xrightarrow{\text{polarize along discarded face}}
\text{rank-two Lorentz determinant}.
\]

After the real-form selector,

\[
H_2(\mathbb C)\to H_2(\mathbb R),
\]

the determinant has signature \((1,2)\), and its conformal group is

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

This is the sharpest exact cubic-to-\(Spin(2,3)\) bridge presently in the programme.

## 1. Exact block determinant

For a two-by-two matrix

\[
A=
\begin{pmatrix}
a&z\\\bar z&b
\end{pmatrix},
\]

the adjugate is

\[
\operatorname{adj}(A)=
\begin{pmatrix}
b&-z\\-\bar z&a
\end{pmatrix}.
\]

Direct determinant expansion gives

\[
\det
\begin{pmatrix}
A&w\\w^\dagger&c
\end{pmatrix}
=c\det A-w^\dagger\operatorname{adj}(A)w.
\]

This identity is polynomial and remains meaningful when \(A\) is singular; it does not require the inverse used in a Schur complement.

The first term couples the discarded diagonal face to the rank-two determinant. The second records the Peirce-half links joining that face to the retained corner.

## 2. Polarization lowers the norm degree

Set \(w=0\) and consider

\[
X(t)=A+t e_3.
\]

Because the embedded rank-two matrix has zero rank-three determinant,

\[
\det X(t)=t\det A.
\]

Therefore

\[
\left.\frac{d}{dt}\det(A+t e_3)\right|_{t=0}
=\det A.
\]

The quadratic norm is not imported from outside the rank-three Jordan algebra. It is the first normal derivative of its cubic norm at the rank-two boundary stratum.

This is a concrete mathematical interpretation of “the next rung down”: choosing a rank-one normal direction converts the cubic consistency law into the quadratic causal norm of the retained face.

## 3. Heavy-face asymptotics

Put \(c=\Delta\). Then

\[
\frac{\det X_\Delta}{\Delta}
=\det A
-\frac{w^\dagger\operatorname{adj}(A)w}{\Delta}.
\]

Hence

\[
\frac{\det X_\Delta}{\Delta}
\longrightarrow\det A
\]

with an exact inverse-gap correction.

This is the cubic-norm counterpart of the Feshbach result in document 685. The two corrections are related but not identical:

- Feshbach response uses \(ww^\dagger/(z-\Delta)\);
- cubic normalization uses \(w^\dagger\operatorname{adj}(A)w/\Delta\).

One is a spectral kernel correction; the other is a norm/determinant defect. Their common inverse-gap behavior does not erase their different types.

## 4. The real-slice step changes the determinant

For

\[
A=
\begin{pmatrix}
a&x+iy\\x-iy&b
\end{pmatrix},
\]

one has

\[
\det A=ab-x^2-y^2.
\]

The real-form selector sends \(y\to0\), so

\[
\det(A_{\mathbb R})=ab-x^2
=\det A+y^2.
\]

Thus the CP topology twirl does not preserve the determinant. It removes one spacelike coordinate and increases the quadratic norm by its square.

This is an exact defect formula:

\[
\boxed{
\det(\operatorname{Re}_{\rm slice}A)-\det A
=(\operatorname{Im}A_{12})^2.
}
\]

Any physical claim that the selector preserves the cubic or quadratic norm is therefore false unless the imaginary coordinate already vanishes.

## 5. Lorentz signatures and the \(Spin(2,3)\) step

Parameterize

\[
A=
\begin{pmatrix}
t+z&x+iy\\x-iy&t-z
\end{pmatrix}.
\]

Then

\[
\det A=t^2-x^2-y^2-z^2,
\]

the \((1,3)\) Lorentz quadratic on \(H_2(\mathbb C)\).

On the real slice \(y=0\),

\[
\det A_{\mathbb R}=t^2-x^2-z^2,
\]

with signature \((1,2)\). The conformal completion of this rank-two Jordan cone has group

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

The complete descent is therefore

\[
\boxed{
H_3(\mathbb C),\ \det_3
\xrightarrow{D_{e_3}}
H_2(\mathbb C),\ \det_{1,3}
\xrightarrow{y=0}
H_2(\mathbb R),\ \det_{1,2}
\xrightarrow{\operatorname{Conf}}
Spin_0(2,3).
}
\]

## 6. Comparison with the Prakash–Ramya punctured cubic

The anomaly-code residue and the Jordan residue must be distinguished.

In the code, the full cubic anomaly vanishes and puncturing one coordinate leaves

\[
\sum_{\ell\ne0}c_\ell w_\ell^3=-c_0a^3.
\]

The residue remains cubic in one logical coordinate.

In the Jordan descent, polarizing the cubic along a selected idempotent lowers degree and leaves the quadratic determinant \(\det A\).

Therefore:

| Construction | Operation | Residue |
|---|---|---|
| anomaly code | delete one coordinate from a vanishing diagonal cubic | logical cube \(-a^3\) |
| Jordan carrier | differentiate/polarize determinant along a rank-one face | quadratic \(\det A\) |

They are compatible examples of “discarded data leaves a residue,” but they are not the same polynomial map.

An explicit intertwiner would have to explain how a logical cubic phase produces or controls the normal direction whose polarization yields the rank-two quadratic.

## 7. Extension toward the exceptional Jordan algebra

After choosing a complex subalgebra \(\mathbb C\subset\mathbb O\), the same block form sits inside \(H_3(\mathbb O)\). Alternativity makes the rank-two corner and its determinant well defined, and the exceptional cubic norm has an analogous Peirce polarization.

However, the present certificate is only for associative \(H_3(\mathbb C)\). Extending every link term and normalization to the octonionic determinant requires a separate symbolic derivation that respects bracketing and the real part of the triple product.

No exceptional, Leech or Monster conclusion is inferred here.

## 8. Stop-everything and falsification criteria

Stop a proposed synthesis if:

1. it claims direct restriction of the rank-three determinant to the rank-two corner gives \(\det A\); the restriction is zero and polarization is essential;
2. it identifies the code's logical cube with the Jordan quadratic without an explicit degree-lowering map;
3. it claims the real-form selector preserves determinant despite the \(y^2\) defect;
4. it confuses the cubic inverse-gap defect with the spectral Feshbach self-energy;
5. it promotes the associative calculation to \(H_3(\mathbb O)\) without checking the exceptional determinant.

A stop-everything positive result would derive the selected idempotent \(e_3\) from the Furey/code dynamics and show that its polarized cubic residue is the same physical response norm whose conformal group is \(Spin_0(2,3)\).

## 9. Next gates

1. Repeat the polarization calculation in \(H_3(\mathbb O)\) with explicit bracketing.
2. Determine whether the Furey or code puncture canonically selects the normal idempotent \(e_3\).
3. Compute the interacting evolution of the determinant defect under the CP selector.
4. Search for a typed map from the logical cubic phase to the normal polarization coordinate.
5. Compare the polarized determinant with the existing Jordan-triple recursion coefficients.

## Reproducibility

    node scripts\verify_jordan_cubic_peirce_residue_descends_to_h2_determinant.mjs

## Companion documents

- [Heavy third-face Peirce descent](685_a_heavy_third_face_dynamically_selects_the_rank_two_peirce_corner_but_not_its_real_slice.md)
- [Combined completely positive selector](688_the_combined_peirce_exchange_superselection_selector_is_completely_positive_on_the_doubled_carrier.md)
- [Prakash–Ramya at the current frontier](689_prakash_ramya_at_the_current_frontier_two_doublings_one_cubic_residue_and_the_missing_intertwiner.md)
- [Type-I seesaw decoupling is not the topology twirl](699_type_i_seesaw_decoupling_selects_one_face_and_cannot_be_the_topology_twirl.md)
