# The Polarized Golay Cubic Has Trivial Radical

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** exact finite-field theorem for the certified ternary Golay stabilizer and weighted doubling form; “polarized cubic” means the symmetric trilinear tensor retained from the integral cubic, not an ordinary diagonal cubic over \(\mathbb F_3\)  
**Certificate:** [search_compensated_golay_linking_rows.mjs](scripts/search_compensated_golay_linking_rows.mjs)

## Executive result

The uniqueness of the Standard-Model doubling linker is not merely the output of a (243)-case search. It follows from a five-dimensional injectivity theorem.

Let (S\subset\mathbb F_3^{11}) be the dimension-five shortened ternary Golay stabilizer used in the integral (P)-lattice, and let

\[
\tau_\mu(x,y,z)=\sum_{i=1}^{11}\mu_i x_i y_i z_i
\]

be the polarized weighted cubic, reduced modulo three. Define

\[
\Phi:S\longrightarrow\operatorname{Sym}^2(S^*),
\qquad
\Phi(s)(r,t)=\tau_\mu(s,r,t).
\]

In the certified Golay basis, the (15\times5) matrix of \(\Phi\) has rank five. Therefore

\[
\boxed{\ker\Phi=0.}
\]

Equivalently, the first-slot radical of the polarized cubic restricted to (S) is trivial.

Characteristic-three caveat: \(\tau_\mu(s,s,s)=0\) for every \(s\in S\), even though \(\tau_\mu\ne0\). The trilinear object is therefore not recoverable from an ordinary diagonal cubic on \(S\). See [The Golay sewing tensor is nonclassical in characteristic three](602_the_golay_sewing_tensor_is_nonclassical_in_characteristic_three.md).

This turns the previous exhaustive result into a structural proof:

\[
K_s=(0,\mathbf1+s,y)\text{ triorthogonal}
\quad\Longrightarrow\quad
s=0.
\]

## 1. The matrix certificate

Choose the five displayed generator rows (e_1,\ldots,e_5) of (S). Index the codomain coordinates by the fifteen symmetric pairs

\[
(1,1),(1,2),\ldots,(1,5),(2,2),\ldots,(5,5).
\]

The matrix whose row ((b,c)) and column (a) is

\[
M_{(b,c),a}=\tau_\mu(e_a,e_b,e_c)
\]

is

\[
M=
\begin{pmatrix}
0&2&0&2&2\\
2&2&0&1&2\\
0&0&0&1&2\\
2&1&1&0&1\\
2&2&2&1&2\\
2&0&0&2&0\\
0&0&0&1&0\\
1&2&1&0&1\\
2&0&0&1&0\\
0&0&0&2&2\\
1&1&2&0&1\\
2&0&2&1&2\\
0&0&0&0&0\\
1&1&1&0&2\\
2&0&2&2&0
\end{pmatrix}
\quad\text{over }\mathbb F_3.
\]

Exact row reduction gives

\[
\operatorname{rank}_{\mathbb F_3}M=5=\dim S.
\]

The certificate also enumerates the (3^5) domain vectors and finds the single kernel coordinate vector ((0,0,0,0,0)). The rank proof and kernel enumeration are redundant checks of the same theorem.

## 2. Why the matrix fixes the linker

Let

\[
P_r=(r,-r,0),\qquad r\in S
\]

be a paired Golay stabilizer row, and deform the linker to

\[
K_s=(0,\mathbf1+s,y),\qquad s\in S.
\]

For any (r,t\in S), the weighted cubic triple is

\[
\tau(K_s,P_r,P_t)
=\tau_\mu(\mathbf1+s,r,t).
\]

Because (S) is self-orthogonal for the weighted bilinear form,

\[
\tau_\mu(\mathbf1,r,t)
=\sum_i\mu_i r_i t_i
=0.
\]

Consequently

\[
\tau(K_s,P_r,P_t)=\tau_\mu(s,r,t)=\Phi(s)(r,t).
\]

Triorthogonality requires this to vanish for every (r,t\in S). Thus (s\in\ker\Phi), and the rank-five result forces (s=0).

No distance calculation, search through all cubic triples or symmetry assumption is needed for this implication.

## 3. Relation to the exhaustive theorem

The earlier computation checked all (243) affine classes and all (1331) ordered row triples. It found exactly the unshifted linker and verified that its logical distance is five.

The present calculation separates two logical roles:

1. the rank-five cubic certificate proves uniqueness of the linker;
2. the exhaustive code calculation verifies the remaining triorthogonality equations, ranks, distance and failed involution extensions for the unique survivor.

The results therefore cross-check rather than replace one another.

## 4. A genuine relational nondegeneracy

The map

\[
s\longmapsto\big((r,t)\mapsto\tau_\mu(s,r,t)\big)
\]

turns every nonzero local compensator into a detectable bilinear defect on a pair of stabilizer relations. There is no invisible direction in (S).

This is stronger than saying that one attempted compensator fails. It says:

\[
\boxed{
\text{every nonzero local relation changes at least one cubic sewing amplitude}.}
\]

That is the exact finite-field sense in which the relation carrier is faithful to the local Golay stabilizer.

## 5. Jordan-triple interpretation and boundary

The formal resemblance to a Jordan triple is now sharper. A middle datum is tested by its action on every pair of outer directions, and vanishing of all those pairings forces the datum itself to vanish.

However, this certificate does **not** prove that (S) is a Jordan triple system, that \(\tau_\mu\) obeys a Jordan triple identity, or that its derivation group is (Sp(4,\mathbb R)). It establishes only the nondegeneracy property that a proposed Jordan/TRO bridge must reproduce:

\[
\text{middle-element displacement}
\longmapsto
\text{bilinear change on the two faces}
\]

is injective.

This is a statement about the symmetric trilinear sewing tensor. In characteristic three it must not be silently identified with the polarization of its diagonal polynomial, which is zero on \(S\).

The next high-value comparison is therefore concrete: identify a Peirce-corner or TRO middle-element space whose induced bilinear action has the same zero-radical property, then test whether its derivation closure lands on the already certified (H_2(\mathbb R)\to Sp(4,\mathbb R)\cong Spin_0(2,3)) chain.

## 6. Stop-everything result

Within the certified Golay stabilizer, the cubic polarization map is injective. Therefore no nonzero Golay compensator can be hidden from all paired relations, and the uncompensated doubling linker is algebraically forced.

Any symmetry-restoring modification must change at least one of:

- the stabilizer space (S);
- the cubic form \(\tau_\mu\);
- the paired relation architecture;
- the seed contribution;
- the notion of symmetry beyond the tested coordinate-monomial action.

It cannot be achieved by choosing a different representative of the existing linker.

## 7. Reproduction

Run:

    node scripts\search_compensated_golay_linking_rows.mjs

The output must report:

    cubicPolarizationCertificate.rank: 5
    cubicPolarizationCertificate.domainDimension: 5
    cubicPolarizationCertificate.radicalCoordinates: [[0,0,0,0,0]]
    triorthogonalLinkers: 1

