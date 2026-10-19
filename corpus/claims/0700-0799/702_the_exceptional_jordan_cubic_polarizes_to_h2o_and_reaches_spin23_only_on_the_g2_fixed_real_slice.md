# The Exceptional Jordan Cubic Polarizes to \(H_2(\mathbb O)\) and Reaches \(Spin(2,3)\) Only on the \(G_2\)-Fixed Real Slice

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B09, B10, B11, B14 and the exceptional cubic-residue branch  
**Claim status:** exact octonionic norm/polarization theorem with executable multiplication checks; physical selection of the fixed slice remains open  
**Certificate:** [verify_exceptional_jordan_cubic_polarizes_to_h2o_determinant.mjs](../../../verification/verify/verify_exceptional_jordan_cubic_polarizes_to_h2o_determinant.mjs)

## Executive result

The cubic-to-quadratic polarization theorem extends exactly from \(H_3(\mathbb C)\) to the exceptional Jordan algebra \(H_3(\mathbb O)\).

With the standard Hermitian coordinate convention

\[
X=
\begin{pmatrix}
a&z&\bar y\\
\bar z&b&x\\
y&\bar x&c
\end{pmatrix},
\]

the exceptional norm is

\[
N(X)
=abc-a|x|^2-b|y|^2-c|z|^2
+2\operatorname{Re}((xy)z).
\]

Writing the upper-left Peirce corner as

\[
A=
\begin{pmatrix}
a&z\\\bar z&b
\end{pmatrix}
\in H_2(\mathbb O),
\]

one obtains

\[
\boxed{
N(X)
=c\det_{H_2(\mathbb O)}A
-Q_A(x,y),
}

where

\[
\det_{H_2(\mathbb O)}A=ab-|z|^2
\]

and

\[
Q_A(x,y)
=a|x|^2+b|y|^2
-2\operatorname{Re}((xy)z).
\]

Therefore

\[
\boxed{
D_{e_3}N(A)=\det_{H_2(\mathbb O)}A.
}

The exceptional cubic really does descend by polarization to a Lorentzian quadratic norm—but initially to signature \((1,9)\), not \((1,2)\).

The \(Spin(2,3)\) carrier appears only after the octonionic entry is restricted to the real fixed subalgebra:

\[
\operatorname{Fix}_{G_2}(\mathbb O)=\mathbb R,
\qquad
H_2(\mathbb O)^{G_2}=H_2(\mathbb R).
\]

Thus exceptional polarization and real-carrier selection are two separate operations.

## 1. Nonassociativity does not spoil the real cubic

The octonionic associator

\[
[x,y,z]=(xy)z-x(yz)
\]

can be nonzero. The certificate uses an explicit triple with nonzero associator.

However,

\[
\operatorname{Re}[x,y,z]=0.
\]

Therefore

\[
\operatorname{Re}((xy)z)
=\operatorname{Re}(x(yz))
\]

is independent of bracketing. It is also cyclically invariant. This is why the cubic norm is well defined despite nonassociativity.

The executable octonion algebra verifies:

- multiplicativity of the norm on a nontrivial pair;
- a genuinely nonzero associator;
- vanishing real associator;
- cyclic equality of the real triple product.

## 2. Exact block identity

Group the norm as

\[
N(X)
=c(ab-|z|^2)
-\left(
a|x|^2+b|y|^2
-2\operatorname{Re}((xy)z)
\right).
\]

This is the exceptional counterpart of

\[
\det
\begin{pmatrix}A&w\\w^\dagger&c\end{pmatrix}
=c\det A-w^\dagger\operatorname{adj}(A)w.
\]

There is no need to pretend that \(w^\dagger\operatorname{adj}(A)w\) is an ordinary associative matrix product over \(\mathbb O\). The real quadratic link form \(Q_A\) is the correctly typed replacement.

## 3. Polarized exceptional residue

Set the Peirce-half links \(x=y=0\) and vary the third idempotent:

\[
X(t)=A+t e_3.
\]

Then

\[
N(X(t))=t(ab-|z|^2).
\]

Consequently

\[
\left.\frac d{dt}N(A+t e_3)\right|_{t=0}
=ab-|z|^2.
\]

The rank-two determinant is again the first normal derivative of the rank-three cubic at its rank-two boundary.

This result is independent of a chosen associative subalgebra.

## 4. Heavy-face exceptional limit

For \(c=\Delta\),

\[
\frac{N(X_\Delta)}{\Delta}
=\det_{H_2(\mathbb O)}A
-\frac{Q_A(x,y)}{\Delta}.
\]

The certificate verifies the exact inverse-gap scaling for five gaps. Therefore the cubic norm approaches the rank-two octonionic determinant under the same kind of heavy-face normalization found in the complex corner.

The sign of \(Q_A\) is not universally positive for arbitrary \(A\); it is a link form controlled by the retained corner. Positivity claims require restricting \(A\) to the appropriate cone.

## 5. Associative restriction check

Choose one imaginary octonion unit \(u\) and the associative subalgebra

\[
\mathbb C_u=\operatorname{span}_{\mathbb R}\{1,u\}.
\]

If \(x,y,z\in\mathbb C_u\), the exceptional norm reduces exactly to the ordinary determinant of the corresponding complex Hermitian three-by-three matrix.

The certificate evaluates both formulas independently and verifies equality. Document 701 is therefore a genuine associative slice of the exceptional theorem, not a separate coincidence.

## 6. Why exceptional polarization does not select \(Spin(2,3)\)

Parameterize

\[
A=
\begin{pmatrix}
t+s&z\\\bar z&t-s
\end{pmatrix},
\qquad z\in\mathbb O.
\]

Then

\[
\det A=t^2-s^2-|z|^2,
\]

which has signature

\[
(1,9).
\]

The natural rank-two exceptional carrier is therefore ten-dimensional. Its conformal group belongs to the \(Spin(2,10)\) branch, not \(Spin(2,3)\).

This is a decisive selection boundary:

\[
H_3(\mathbb O)
\xrightarrow{D_{e_3}N}
H_2(\mathbb O)
\not\Rightarrow
H_2(\mathbb R).
\]

The exceptional algebra supplies the parent quadratic, but not the observed small carrier by polarization alone.

## 7. The \(G_2\)-fixed real slice

The elements of \(\mathbb O\) fixed by every octonion automorphism are exactly the real scalars:

\[
\operatorname{Fix}_{G_2}(\mathbb O)=\mathbb R.
\]

Applying \(G_2\) entrywise to the off-diagonal octonion gives

\[
H_2(\mathbb O)^{G_2}=H_2(\mathbb R).
\]

On this fixed slice,

\[
\det A=t^2-s^2-r^2,
\]

with signature \((1,2)\), and the conformal group is

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

This yields the exact exceptional chain

\[
\boxed{
H_3(\mathbb O),N
\xrightarrow{\text{Peirce polarization}}
H_2(\mathbb O),\det_{1,9}
\xrightarrow{G_2\text{-fixed observables}}
H_2(\mathbb R),\det_{1,2}
\xrightarrow{\operatorname{Conf}}
Spin_0(2,3).
}
\]

The mathematical chain is exact. Its physical premise—that external observables should be \(G_2\)-fixed while internal matter retains the broken complex/octonionic directions—still requires a factorized action.

## 8. Relation to Furey color selection

Furey's construction selects a complex direction in \(\mathbb O\), leaving an \(SU(3)\subset G_2\) stabilizer associated with color. The elements fixed by that \(SU(3)\) form the selected complex subalgebra, not merely \(\mathbb R\).

Accordingly there are two nested fixed structures:

\[
\mathbb O^{SU(3)}\cong\mathbb C,
\qquad
\mathbb O^{G_2}=\mathbb R.
\]

At rank two this gives

\[
H_2(\mathbb R)
\subset H_2(\mathbb C)
\subset H_2(\mathbb O).
\]

This matches the carrier ladder already found independently. It also states the tension sharply: the internal Standard Model needs the selected complex direction, while the external \(Spin(2,3)\) carrier must see only the fully invariant real direction.

Tensor-factor locality or a source/observable distinction remains essential.

## 9. Comparison with the anomaly-code cubic

The exceptional norm, its polarized quadratic and the Prakash–Ramya diagonal anomaly cubic are now three typed objects:

1. \(N_{H_3(\mathbb O)}\): a cubic norm on an exceptional Jordan carrier;
2. \(D_{e_3}N=\det_{H_2(\mathbb O)}\): its quadratic normal residue;
3. \(\tau_c\): a diagonal cubic form on a fermion charge lattice.

Their shared cubic language is meaningful, but no equality follows. A genuine bridge must map the charge lattice into a polarized subspace of the Jordan algebra and respect all three products.

## 10. Stop-everything and falsification criteria

Stop a synthesis if:

1. it claims exceptional polarization alone yields \(Spin(2,3)\) rather than \(Spin(2,10)\)-type rank-two geometry;
2. it writes associative matrix products for the octonionic link term without controlling bracketing;
3. it assumes the \(G_2\)-fixed slice while using the same factor for Furey's broken complex directions;
4. it identifies \(SU(3)\)-fixed \(\mathbb C\) with \(G_2\)-fixed \(\mathbb R\);
5. it equates the exceptional norm with the anomaly cubic without an intertwiner.

A stop-everything positive result would derive the source/observable factorization that lets internal matter retain the \(SU(3)\)-fixed complex direction while external responses are projected to the \(G_2\)-fixed real rank-two cone.

## 11. Next gates

1. Construct the factorized \(G_2\)-fixed response and \(SU(3)\)-stabilized matter action explicitly.
2. Test whether the Furey two-topology exchange commutes with entrywise \(G_2\) averaging.
3. Derive a positive or completely positive realization of the \(G_2\)-fixed projection on the doubled carrier.
4. Search for a charge-lattice embedding compatible with the exceptional polarization tensor.
5. Compare the \(Spin(2,10)\to Spin(2,3)\) broken directions with the programme's selector spectrum.

## Reproducibility

    node scripts\verify_exceptional_jordan_cubic_polarizes_to_h2o_determinant.mjs

## Companion documents

- [Associative cubic polarization and \(Spin(2,3)\)](701_polarizing_the_rank_three_jordan_cubic_along_the_discarded_face_gives_the_spin23_rank_two_determinant.md)
- [Octonions, Leech lattice and exceptional-Jordan branch](../0000-0099/33_octonions_leech_lattice_jordan_branch.md)
- [Furey technical algebraic guide](../0000-0099/03_furey_technical_algebraic_guide.md)
- [Jordan selection axioms](../0000-0099/44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
