# Degree ten also cannot isolate the three-family frame, so twelve is the first unexcluded order

## Main result

The degree-eight obstruction extends one rung further.

The invariant ring of two generic \(3\times3\) matrices has no primitive generator of word length five. Its mixed generators below length six occur at lengths two, three and four; the next primitive generator occurs at length six. This is the classical Teranishi generator theorem, in the explicit presentation of [Aslaksen, Drensky and Sadikova](https://arxiv.org/abs/math/0405389).

For the fixed-spectrum two-Hermitian orientation problem, this means that every potential through total Yukawa degree ten has the form

\[
\boxed{
V_{\le10}(y)=c_0+\sum_{i=1}^4c_i y_i
+\alpha y_1^2+\beta y_1y_2+\gamma y_1y_3,
}
\]

where

\[
y_1=\operatorname{Tr}(AB),\quad
y_2=\operatorname{Tr}(A^2B),\quad
y_3=\operatorname{Tr}(AB^2),\quad
y_4=\operatorname{Tr}(A^2B^2)
\]

are generic local coordinates on the four-dimensional relative-frame space.

The stationary Hessian is never positive definite. Indeed, if \(\beta\) or \(\gamma\) is nonzero it is indefinite; if both vanish it has rank at most one. Thus:

\[
\boxed{
\text{total Yukawa degree ten cannot produce a strict isolated generic three-family mixing minimum.}
}
\]

## 1. Why there is no word-length-five generator

For two generic \(3\times3\) matrices \(X,Y\), a minimal trace generating set may be taken as

\[
\begin{gathered}
\operatorname{Tr}X,\operatorname{Tr}Y,
\operatorname{Tr}X^2,\operatorname{Tr}XY,\operatorname{Tr}Y^2,\\
\operatorname{Tr}X^3,\operatorname{Tr}X^2Y,
\operatorname{Tr}XY^2,\operatorname{Tr}Y^3,\\
\operatorname{Tr}X^2Y^2,
\operatorname{Tr}X^2Y^2XY.
\end{gathered}
\]

Their word lengths are \(1,2,3,4,6\); none has length five. Consequently every length-five trace polynomial reduces to polynomials in lower generators. This is stronger than merely enumerating necklaces: it includes all trace identities and multi-trace reductions.

After fixing the spectra of \(A\) and \(B\), pure traces become coefficients. Assign the mixed-coordinate weights

\[
\deg y_1=2,
\qquad
\deg y_2=\deg y_3=3,
\qquad
\deg y_4=4.
\]

The only nonlinear mixed monomials of weight at most five are

\[
y_1^2,qquad y_1y_2,qquad y_1y_3.
\]

This proves the displayed normal form.

## 2. The Hessian obstruction

At a stationary point the Hessian in the local \(y\)-coordinates is

\[
H_{\le10}=
\begin{pmatrix}
2\alpha&\beta&\gamma&0\\
\beta&0&0&0\\
\gamma&0&0&0\\
0&0&0&0
\end{pmatrix}.
\]

There are two immediate obstructions.

First, the \(y_4\) direction is always flat. Therefore \(H_{\le10}\) cannot be positive definite.

Second, positive semidefiniteness already forces

\[
\det
\begin{pmatrix}2\alpha&\beta\\\beta&0\end{pmatrix}
=-\beta^2\ge0,
\qquad
\det
\begin{pmatrix}2\alpha&\gamma\\\gamma&0\end{pmatrix}
=-\gamma^2\ge0.
\]

Hence \(\beta=\gamma=0\). Any local minimum through degree ten falls back to the degree-eight rank-one Hessian and retains at least three flat directions.

## 3. Revised ladder

\[
\boxed{
\begin{array}{rcl}
\deg_Y\le6&:&\text{linear alignment or flats},\\
\deg_Y=8&:&\text{one nonlinear direction; no full isolation},\\
\deg_Y=10&:&\text{new cross terms are indefinite or vanish at a minimum},\\
\deg_Y=12&:&\text{first primitive length-six generator and first CP-odd invariant}.
\end{array}
}
\]

The important wording is **first unexcluded**, not solved. Degree twelve must now be tested for a full-rank stable stationary Hessian, boundedness and CP behavior. If microscopic CP is imposed, its primitive antisymmetric generator cannot enter linearly, so the CP-even minimal order may be higher.

## 4. Programme consequence

The two-Yukawa route has become sharply constrained rather than vaguely nonminimal:

- degrees six and below align;
- degree eight can deceive a one-angle slice but cannot close in four dimensions;
- degree ten adds saddle-producing cross curvature but still cannot close;
- degree twelve is the first place where a genuinely new primitive orientation invariant can change the rank count.

The next stop-everything test is therefore the Hermitian and CP decomposition of the length-six generator, followed by a complete degree-twelve stationary-Hessian calculation.

## Certificate

`scripts/verify_degree_ten_three_family_no_go.mjs` enumerates the allowed weighted monomials and verifies the principal-minor and rank obstruction.
