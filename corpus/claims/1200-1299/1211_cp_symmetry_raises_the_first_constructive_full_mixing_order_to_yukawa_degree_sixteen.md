# CP symmetry raises the first constructive full-mixing order to Yukawa degree sixteen

## Main result

The degree-twelve frontier splits according to whether microscopic CP is imposed.

For traceless Hermitian matrices \(x,y\), the primitive word-length-six generator may be chosen as

\[
w=\operatorname{Tr}(x^2y^2xy)-\operatorname{Tr}(y^2x^2yx),
\]

and it obeys

\[
\boxed{
\operatorname{Tr}([x,y]^3)=3w.
}
\]

It is purely imaginary and changes sign under CP. Thus a real potential uses \(iw\), which is CP odd. Degree twelve is therefore the first order **not excluded** if explicit CP orientation is allowed, but a CP-symmetric potential cannot contain this primitive generator linearly.

On the CP-even branch, the remaining invariant polynomials are built from the four local mixed coordinates

\[
y_1=\operatorname{Tr}(AB),\quad
y_2=\operatorname{Tr}(A^2B),\quad
y_3=\operatorname{Tr}(AB^2),\quad
y_4=\operatorname{Tr}(A^2B^2),
\]

of word weights \(2,3,3,4\). The first term giving the fourth coordinate its own positive quadratic curvature is

\[
y_4^2,
\]

of word length eight, or total Yukawa degree sixteen. Consequently:

\[
\boxed{
\begin{aligned}
&\text{CP-even two-Hermitian potentials through Yukawa degree fourteen}\
&\hspace{1cm}\text{cannot have a strict generic full-family minimum},\\
&\text{Yukawa degree sixteen is sufficient to construct one modulo CP conjugation.}
\end{aligned}
}
\]

## 1. Why the length-six primitive is CP odd

For Hermitian \(x,y\), the commutator \([x,y]\) is anti-Hermitian. Hence \(\operatorname{Tr}([x,y]^3)\) is purely imaginary, and

\[
J_{\rm alg}=i\operatorname{Tr}([x,y]^3)
\]

is real. Complex conjugation reverses its sign. This is the same CP-odd orientation datum isolated in document 1207.

The minimal two-matrix trace presentation of Aslaksen, Drensky and Sadikova writes the invariant ring as a polynomial part plus one antisymmetric length-six generator satisfying a quadratic relation. Their explicit generator and relation are given in [the primary paper](https://arxiv.org/abs/math/0405389).

Therefore the primitive generator can enter a real action linearly only through \(i w\), which explicitly selects a CP orientation. If CP is a microscopic symmetry, its coefficient must vanish.

## 2. Why degrees twelve and fourteen still fail on the CP-even branch

Assign weights

\[
\deg y_1=2,
\qquad
\deg y_2=\deg y_3=3,
\qquad
\deg y_4=4.
\]

At word length six, CP-even nonlinear terms include

\[
y_1^3,\quad y_1y_4,\quad y_2^2,\quad y_2y_3,\quad y_3^2.
\]

At word length seven, additional terms include

\[
y_1^2y_2,\quad y_1^2y_3,\quad y_2y_4,\quad y_3y_4.
\]

But through length seven the potential is at most linear in \(y_4\):

\[
V_{\le7}(y)=F(y_1,y_2,y_3)+y_4G(y_1,y_2,y_3).
\]

At an interior stationary point, \(G=0\). If any derivative of \(G\) is nonzero, the Hessian has a nonzero off-diagonal entry in a row whose \(y_4y_4\) entry is zero, producing a negative principal minor and a saddle. If all those derivatives vanish, the \(y_4\) direction is flat. Either way, no strict local minimum exists.

This argument covers CP-even total Yukawa degrees twelve and fourteen.

## 3. Degree sixteen gives a constructive sufficiency proof

At word length eight, \(y_4^2\) first appears. Choose any generic interior unistochastic target \(y^*=(y_1^*,\ldots,y_4^*)\) and positive coefficients \(\lambda_i\). Then

\[
\boxed{
V_{16}(y)=\sum_{i=1}^4\lambda_i(y_i-y_i^*)^2
}
\]

is a simultaneous-conjugation invariant of total Yukawa degree at most sixteen. Its Hessian is

\[
2\operatorname{diag}(\lambda_1,\lambda_2,\lambda_3,\lambda_4)>0.
\]

For nondegenerate spectra, the map from the four-dimensional doubly stochastic affine space to \(y\) is invertible. The potential therefore isolates the target unistochastic matrix \(P_{ij}=|U_{ij}|^2\).

It does not select the sign of CP orientation. Generically \(U\) and \(U^*\) give the same \(P\) and form a CP-conjugate pair of minima. Thus degree sixteen is sufficient for all three mixing angles and \(|J|\), not for a unique sign of \(J\).

## 4. Corrected hierarchy

| Maximum Yukawa degree | Result for a generic fixed-spectrum two-Hermitian potential |
|---:|---|
| \(6\) | linear alignment or flats |
| \(8\) | one nonlinear direction; slice mixing, no full isolation |
| \(10\) | cross curvature is indefinite or collapses back to rank one |
| \(12\) | first CP-odd primitive; explicit-CP branch first unexcluded |
| \(14\) | CP-even branch remains linear in \(y_4\), hence saddle or flat |
| \(16\) | CP-even full mixing stabilization is constructively possible, with a CP-conjugate pair |
| \(24\) | \(w^2\) first permits direct CP-even dependence on the primitive pseudoscalar itself |

The last row does not mean degree twenty-four is required for spontaneous CP violation: fixing a non-orthostochastic \(|U|^2\) at degree sixteen already fixes nonzero \(|J|\). It means that the square of the primitive CP-odd generator first enters at that higher order.

## 5. Consequence for reflexive closure

The first fully constructive two-Yukawa family selector is no longer an unspecified “nonminimal potential.” Under fixed nondegenerate spectra and microscopic CP it has a sharp minimal polynomial ceiling:

\[
\boxed{
V_{16}=\sum_i\lambda_i(y_i-y_i^*)^2.
}
\]

This proves existence but not naturalness. The target moments \(y_i^*\) remain coefficients inserted by hand. The next closure question is therefore whether the Jordan/Furey/response architecture derives those four target moments—or merely provides another language for specifying them.

## Certificate

`verification/verify/verify_cp_even_degree_sixteen_threshold.mjs` enumerates all weighted monomials through word length eight, verifies the absence of \(y_4^2\) through length seven, and verifies its first appearance at length eight.
