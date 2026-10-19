# Both Positive Code Lifts Are Exact Scalar-Interval Boundary Hessians with Quadratic-Unit Rapidities

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B05, B06, B07, B08, B09, B10 and B12  
**Claim status:** exact boundary-action realization and arithmetic transfer data; Standard-Model identification remains open

## 1. Reopening the scalar response branch

The independently derived massive-scalar interval response is

\[
X_{m,L}=\frac{m}{\sinh(mL)}
\begin{pmatrix}
\cosh(mL)&-1\\
-1&\cosh(mL)
\end{pmatrix}.
\]

It is positive for \(m,L>0\) and satisfies

\[
\det X_{m,L}=m^2.
\]

Both positive integral lifts of the qutrit mutual gate occur exactly in this family.

## 2. Direct realization of \(K_-\)

Choose

\[
m_-=2\sqrt2,
\qquad
u_-=m_-L_-=2\log(1+\sqrt2).
\]

Then

\[
\cosh u_-=3,
\qquad
\sinh u_-=2\sqrt2,
\qquad
\frac{m_-}{\sinh u_-}=1.
\]

Therefore

\[
\boxed{
X_{m_-,L_-}=
\begin{pmatrix}3&-1\\-1&3\end{pmatrix}=K_-}
\]

with

\[
L_-=\frac{\log(1+\sqrt2)}{\sqrt2}.
\]

The scalar interval is exactly the minimum transformer-free network found previously.

## 3. Oriented realization of \(K_+\)

Let

\[
\varphi=\frac{1+\sqrt5}{2},
\qquad
m_+=\sqrt5,
\qquad
u_+=m_+L_+=2\log\varphi.
\]

Then

\[
\cosh u_+=\frac32,
\qquad
\sinh u_+=\frac{\sqrt5}{2},
\qquad
\frac{m_+}{\sinh u_+}=2.
\]

The unsigned interval response is

\[
X_{m_+,L_+}=
\begin{pmatrix}3&-2\\-2&3\end{pmatrix}.
\]

With the second port orientation reversed by \(D=\operatorname{diag}(1,-1)\),

\[
\boxed{
DX_{m_+,L_+}D=
\begin{pmatrix}3&2\\2&3\end{pmatrix}=K_+}
\]

and

\[
L_+=\frac{2\log\varphi}{\sqrt5}.
\]

## 4. Exact transfer matrices

The interval transfer matrix is

\[
T(m,u)=
\begin{pmatrix}
\cosh u&m^{-1}\sinh u\\
m\sinh u&\cosh u
\end{pmatrix},
\qquad
\det T=1.
\]

For the two lifts,

\[
T_-=\begin{pmatrix}3&1\\8&3\end{pmatrix},
\qquad
T_+=\begin{pmatrix}\frac32&\frac12\\[2pt]\frac52&\frac32\end{pmatrix}.
\]

Their expanding spectral values are

\[
e^{u_-}=3+2\sqrt2=(1+\sqrt2)^2,
\]

and

\[
e^{u_+}=\frac{3+\sqrt5}{2}=\varphi^2.
\]

Thus the integral response lifts carry exact quadratic-unit rapidities in \(\mathbb Q(\sqrt2)\) and \(\mathbb Q(\sqrt5)\).

This arithmetic statement follows from the response matrices; it is not evidence for Moonshine or exceptional unification by itself.

## 5. Jordan determinant becomes the bulk mass scale

The two Jordan norms satisfy

\[
\det K_-=8=m_-^2,
\qquad
\det K_+=5=m_+^2.
\]

The scale-free fork in the code lift therefore becomes a bulk spectral-mass fork in the interval realization. The common/differential gain ratios fix \(u=mL\), while the determinant fixes \(m\); together they determine \(L\).

No continuous fitting freedom remains once one of the exact integral lifts is selected.

## 6. Why this match is substantive but not yet physical

The scalar interval family can realize every exchange-symmetric positive two-port matrix after suitable scale and orientation choices. Existence in that family is therefore not a Standard-Model prediction.

What is nontrivial here is the complete compatibility of independently derived structures:

\[
\text{code transvection word}
\to
\text{integral }K_\pm
\to
\text{positive Jordan response}
\to
\text{exact boundary action}
\to
\text{unit-determinant transfer}.
\]

A physical bridge still requires the weak/Higgs sector to generate the corresponding bulk fluctuation operator or boundary kernel without tuning \(m\) and \(L\) by hand.

## 7. Claim ledger

- **Exact:** \(K_-\) is the DtN response at \(m=2\sqrt2\), \(L=\log(1+\sqrt2)/\sqrt2\).
- **Exact:** \(K_+\) is the one-port-reversed DtN response at \(m=\sqrt5\), \(L=2\log\varphi/\sqrt5\).
- **Exact:** the transfer matrices have determinant one and the displayed rational entries.
- **Exact:** their rapidities exponentiate to the displayed quadratic units.
- **Exact:** the Jordan determinant equals the scalar bulk mass squared.
- **Architecture match:** the finite, integral, Jordan and boundary-action layers now commute for both lifts.
- **Open:** source derivation of the interval mode, its length, mass and port orientation.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a Furey/Higgs fluctuation mode reduces to one of these interval operators and fixes the corresponding \((m,L)\) pair from source data.

**Transfer trigger:** repeated physical sewing measures the quadratic-unit rapidity predicted by the selected lift.

**Tuning falsifier:** availability of a scalar interval realization is presented as prediction without deriving \(m\) and \(L\).

**Arithmetic falsifier:** the quadratic units are promoted to a Moonshine or lattice connection without an explicit representation or partition function.

**Orientation falsifier:** the \(K_+\) realization omits the necessary port reversal.

## 9. Certificate

The [scalar-interval lift certificate](scripts/verify_scalar_interval_dtn_realizes_both_positive_integral_lifts.mjs) verifies the exact hyperbolic identities numerically to machine precision, reconstructs both Hessians and transfer matrices and checks their spectral units and determinant/mass relations.

## Companion documents

- [Scalar interval Dirichlet-to-Neumann response](64_scalar_interval_dirichlet_to_neumann_branch.md)
- [Jordan-norm response discriminator](488_the_two_positive_lifts_have_distinct_jordan_norms_and_predict_a_scale_free_common_difference_response.md)
- [Passive-network orientation fork](487_transformer_free_passivity_selects_the_other_positive_lift_and_exposes_a_level_three_orientation_fork.md)
- [Positive integral Jordan lift](486_the_three_transvection_word_has_a_positive_integral_jordan_lift_whose_level_three_self_terms_hide_modulo_three.md)
