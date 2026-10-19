# The Shortest Fully Hyperbolic Coupled Word Has an Irreducible Quartic and a One-Plus-Two-Reciprocal-Pair Spin(2,3) Spectrum

## Claim

In the same positive generator alphabet \(\{R,P,H,U\}\), the shortest symplectic word containing the mutual shear whose reciprocal quartic is both irreducible and fully hyperbolic is

\[
N=(UPHR)^2.
\]

Its characteristic polynomial is

\[
\chi_N(x)=x^4-7x^3+13x^2-7x+1.
\]

It preserves no rational handle splitting and has four real positive reciprocal eigenvalues. On the five-dimensional primitive-two-form module, it induces one fixed eigenline and two reciprocal expanding/contracting pairs, giving an explicit fully hyperbolic integral \(SO(2,3)\) action.

## 1. Exact matrix and shortest-word result

The carrier matrix is

\[
N=
\begin{pmatrix}
1&0&-1&1\\
0&0&0&1\\
-1&0&2&-1\\
0&-1&-1&4
\end{pmatrix}.
\]

The breadth-first search enforces even anti-symplectic parity and tests every shorter distinct matrix reached by the declared positive generators. Partially hyperbolic irreducible coupling first occurs at length four; full hyperbolicity first occurs at length eight.

The qualification “in the declared positive alphabet” is essential. Adding inverse generators, changing the primitive mutual shear, or choosing another generating set can alter word length without changing the underlying group element or physics.

## 2. Irreducibility

For a factorization with constant terms \((1,1)\),

\[
(x^2+ax+1)(x^2+bx+1),
\]

coefficient matching requires

\[
a+b=-7,
\qquad
ab=11.
\]

The discriminant is \(49-44=5\), not an integer square, so no integer solution exists. Constants \((-1,-1)\) reverse the relative signs of the cubic and linear terms and also fail. Gauss's lemma then proves irreducibility over \(\mathbb Q\).

Thus the full four-dimensional rational carrier is dynamically coupled.

## 3. Full hyperbolicity

Set \(y=x+x^{-1}\). The reciprocal quartic reduces to

\[
y^2-7y+11=0,
\]

with roots

\[
y_\pm=\frac{7\pm\sqrt5}{2}.
\]

Both are greater than two. Each therefore produces a positive real reciprocal pair. The expanding carrier eigenvalues are approximately

\[
\lambda_1\approx4.39026,
\qquad
\lambda_2\approx1.83785.
\]

There is no elliptic center. The stable and unstable carrier planes are Lagrangian, as for any semisimple symplectic map with spectra separated inside and outside the unit circle.

## 4. Primitive-two-form and Spin(2,3) spectrum

For carrier eigenvalues

\[
\lambda_1,\lambda_2,\lambda_2^{-1},\lambda_1^{-1},
\]

the exterior-square eigenvalues are pairwise products. Removing the invariant symplectic-form line leaves the primitive five-dimensional spectrum

\[
\lambda_1\lambda_2,
\quad
\lambda_1/\lambda_2,
\quad
1,
\quad
\lambda_2/\lambda_1,
\quad
(\lambda_1\lambda_2)^{-1}.
\]

Numerically this is approximately

\[
8.06865,\quad2.38880,\quad1,\quad0.418621,\quad0.123937.
\]

This is exactly the reciprocal spectral pattern required of an \(SO(2,3)\) isometry: two noncompact boost rates and one fixed direction.

## 5. Interpretation

The calculation supplies an explicit noncompact endpoint for the relational-carrier programme:

\[
\text{finite-order oriented/face operations plus mutual shear}
\Longrightarrow
N\in Sp(4,\mathbb Z)
\Longrightarrow
\Lambda_0^2N\in SO(2,3;\mathbb Z).
\]

It does not derive \(N\) as physical time evolution. A passive causal response or sewn transfer construction must still explain why this word, its order or its parameters occur. Nor does fully hyperbolic irreducible homology alone prove a pseudo-Anosov mapping-class representative, although it removes the rational reducibility visible in document 772.

## 6. Research fork

- **Response branch:** construct positive-real or Herglotz boundary data whose transfer/monodromy equals or approximates \(N\).
- **Topology branch:** find an explicit mapping-class lift and determine its Nielsen–Thurston type rather than inferring it from homology.
- **Spin(2,3) branch:** compute the fixed primitive vector and the two invariant Lorentzian boost planes.
- **Physics branch:** identify whether the two expansion rates correspond to independently measurable response exponents or are only word-dependent arithmetic data.

## 7. Executable certificate

```powershell
node verification/find/find_shortest_fully_hyperbolic_irreducible_mutual_selector_word_and_induce_primitive_spectrum.mjs
```

The certificate performs the shortest-word search, proves irreducibility and full hyperbolicity, and derives the five primitive-two-form eigenvalues.

## Companion documents

- [The partially hyperbolic length-four coupled word](773_the_shortest_coupled_selector_word_uses_the_unique_qutrit_mutual_shear_and_has_an_irreducible_partially_hyperbolic_quartic.md)
- [Primitive two-forms give the genuine Spin(2,3) module](745_the_primitive_two_forms_of_a_symplectic_four_space_give_the_genuine_five_dimensional_spin23_module.md)
