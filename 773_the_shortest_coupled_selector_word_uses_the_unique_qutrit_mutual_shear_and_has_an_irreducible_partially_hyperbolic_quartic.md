# The Shortest Coupled Selector Word Uses the Unique Qutrit Mutual Shear and Has an Irreducible Partially Hyperbolic Quartic

## Claim

Add the primitive integral mutual shear

\[
U=\begin{pmatrix}I_2&0\\K&I_2\end{pmatrix},
\qquad
K=\begin{pmatrix}0&1\\1&0\end{pmatrix}
\]

to the carrier generators \(R,P,H\). An exhaustive breadth-first search in the positive-generator alphabet finds that the shortest symplectic word containing \(U\) with irreducible, non-cyclotomic reciprocal quartic is

\[
M=U^2HR.
\]

Its characteristic polynomial is

\[
\chi_M(x)=x^4+2x^3+x^2+2x+1.
\]

It is irreducible over \(\mathbb Q\), so \(M\) preserves no nonzero proper rational subspace and in particular no rational handle splitting. Modulo three, the mutual part \(U^2\) is exactly the unique nonzero two-qutrit cross shear previously derived from the sum-cycle twist.

## 1. Exact word and matrix

In the canonical order \((p_1,p_2,q_1,q_2)\),

\[
M=U^2HR=
\begin{pmatrix}
0&0&0&-1\\
1&0&0&0\\
2&1&0&-1\\
0&0&1&-2
\end{pmatrix}.
\]

The search includes the anti-symplectic generator \(P\) but retains only words of even anti-symplectic parity. All shorter qualifying candidates are either reducible or cyclotomic. A length-three word produces the order-five polynomial \(x^4+x^3+x^2+x+1\); it couples coordinates but remains finite. The second mutual shear is the first step that produces irreducible non-cyclotomic dynamics.

## 2. Exact mod-three convergence

The lower shear coefficients add under powers:

\[
U^2=\begin{pmatrix}I_2&0\\2K&I_2\end{pmatrix}.
\]

Reducing modulo three gives

\[
2K=\begin{pmatrix}0&2\\2&0\end{pmatrix},
\]

which is exactly the mutual shear obtained earlier from

\[
T_{(1,1)}T_{(1,0)}^{-1}T_{(0,1)}^{-1}
\]

and from the two-qutrit controlled phase. This is not merely the statement that some entangling gate works: the first infinite irreducible word selects the same cross coefficient already fixed by the ternary interface.

## 3. Irreducibility

By Gauss's lemma, a factorization of the monic integer quartic over \(\mathbb Q\) would factor it into monic integer quadratics. Constant terms must be either \((1,1)\) or \((-1,-1)\).

For constants \((1,1)\), write

\[
(x^2+ax+1)(x^2+bx+1).
\]

Matching coefficients requires

\[
a+b=2,\qquad ab=-1,
\]

which has no integer solution. Constants \((-1,-1)\) give opposite signs for the cubic and linear coefficients, whereas both are \(+2\). Hence the polynomial is irreducible.

The rational carrier is therefore a cyclic irreducible \(\mathbb Q[M]\)-module of dimension four. The earlier decomposition into two rational handles is destroyed.

## 4. Spectral type

For a reciprocal quartic, set \(y=x+x^{-1}\). Dividing by \(x^2\) gives

\[
y^2+2y-1=0,
\qquad
y=-1\pm\sqrt2.
\]

The root \(-1-\sqrt2<-2\) produces a negative real reciprocal eigenvalue pair, one expanding and one contracting. The root \(-1+\sqrt2\in(-2,2)\) produces a complex-conjugate pair on the unit circle.

Thus \(M\) is partially hyperbolic, not fully hyperbolic. Its spectral radius is approximately

\[
1.8832.
\]

This mixed real/elliptic spectrum is compatible with a carrier containing one bound/oscillatory mode alongside one free/unstable relational mode, but that physical reading remains conjectural until a causal response model produces the word.

## 5. Meaning for the relational-carrier narrative

The algebra now distinguishes the three roles cleanly:

1. \(R\) supplies an oriented one-handle three-cycle;
2. \(H\) relates the two handle faces and selects equal normalization; and
3. \(U^2\) supplies the irreducible mutual relationship.

Without the third operation, the first hyperbolic word factorizes. With it, no rational handle decomposition survives. This is the sharpest current mathematical version of “one carrier, two faces, three relationships.”

It remains essential not to overstate the topology. Irreducible homological action proves genuine rational coupling, but does not by itself prove that a mapping-class lift is pseudo-Anosov. Nor does the spectral radius become a physical prediction without a derived transfer process.

## 6. Next high-value tests

1. Determine whether a passive causal two-port or sewn Dirichlet-to-Neumann response can realize \(U^2HR\).
2. Classify shortest fully hyperbolic irreducible words and compare their mutual-shear exponents.
3. Test whether the elliptic pair is protected by a residual finite-order relation or removed by a physically allowed threshold perturbation.
4. Lift the word to the two-qutrit Clifford shadow and compare its support with the weight-\((3,3,2)\) mutual-shear construction.
5. Compute the induced action on primitive two-forms and identify its \(SO(2,3)\) spectral decomposition.

## 7. Executable certificate

```powershell
node scripts/find_shortest_mutual_shear_word_with_irreducible_noncyclotomic_reciprocal_quartic.mjs
```

The certificate performs the bounded breadth-first search, proves the selected polynomial is irreducible and non-cyclotomic, verifies the exact matrix, and classifies its spectrum.

## Companion documents

- [The sum-cycle twist gives the genus-two mutual qutrit shear](478_the_genus_two_a2_weil_representation_is_exactly_the_two_qutrit_clifford_carrier_and_derives_the_cross_gate_from_a_sum_cycle_twist.md)
- [The hyperbolic selector word factorizes by handle](772_the_hyperbolic_selector_word_is_a_reducible_pair_of_trace_three_handle_maps_with_golden_ratio_squared_stretch.md)
