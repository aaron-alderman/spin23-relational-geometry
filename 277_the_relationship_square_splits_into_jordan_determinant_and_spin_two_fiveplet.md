# The Relationship Square Splits into Jordan Determinant and a Spin-Two Fiveplet

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B05, B07, B08, B10 and B11  
**Claim status:** exact \(SL(2)/SU(2)\) representation theorem; physical identity with the custodial locking field or four-dimensional stress tensor remains open

## 1. The three-relationship carrier is spin one

Let

\[
V=\mathbb C^2
\]

be the fundamental spin-
\(\tfrac12\) representation and

\[
W=\operatorname{Sym}^2V.
\]

Then \(W\) has complex dimension three and is the spin-one representation. Its real split form is

\[
W_{\mathbb R}=\operatorname{Sym}^2(\mathbb R^2)
\cong H_2(\mathbb R).
\]

The next symmetric rung is

\[
\boxed{
\operatorname{Sym}^2W
\cong
\operatorname{Sym}^4V\oplus\mathbf1.}
\]

The dimensions are

\[
6=5+1.
\]

Under the compact real form this is

\[
\operatorname{Sym}^2(\text{spin }1)
=
\text{spin }2\oplus\text{spin }0.
\]

## 2. Weight proof

Measure weights so that the fundamental doublet has weights \(+1,-1\). Then the relationship triplet has weights

\[
2,0,-2.
\]

Its symmetric square has weights

\[
4,2,0,0,-2,-4.
\]

Five of these form the spin-two multiplet

\[
4,2,0,-2,-4,
\]

and the second zero is the invariant singlet.

This is the exact algebra behind a “next rung” above the three relationships.

## 3. The singlet is the Jordan determinant

Represent a relationship vector by the binary quadratic form or symmetric matrix

\[
Q=
\begin{pmatrix}
a&b\\b&c
\end{pmatrix}.
\]

For \(g\in SL(2)\),

\[
Q\mapsto gQg^T.
\]

The invariant quadratic is

\[
\boxed{\Delta(Q)=\det Q=ac-b^2.}
\]

Indeed,

\[
\det(gQg^T)=\det(g)^2\det Q=\det Q.
\]

This invariant spans the singlet in \(\operatorname{Sym}^2W^*\). The remaining five quadratic components are the traceless/spin-two part.

The Veronese conic is exactly

\[
\det Q=0,
\]

so the rank-one relationship rays form the null locus of the invariant singlet.

## 4. Compact and split readings

### Compact reading

For \(SU(2)\), the three-component relationship carrier is a spin-one triplet. Its symmetric square splits into a custodial-style fiveplet and singlet.

### Split reading

For \(SL(2,\mathbb R)\cong Spin_0(1,2)\), \(H_2(\mathbb R)\) is the three-vector representation with Lorentzian norm \(\det Q\). Its symmetric square splits into the metric trace and a five-dimensional traceless symmetric tensor.

The decomposition is the same complex representation with different reality conditions. This makes it a natural bridge between compact weak/custodial language and the split Jordan response carrier.

It does not make the two physical symmetry groups identical.

## 5. Comparison with the earlier custodial singlet/fiveplet

The full-lock scalar branch already produced custodial multiplets containing a singlet and fiveplet. The new result shows that this pattern is forced whenever the underlying object is a triplet and one takes its symmetric square.

This is a genuine representation-level match:

\[
\operatorname{Sym}^2\mathbf3=\mathbf5\oplus\mathbf1.
\]

But it is not yet a field identity. The earlier locking triplet carries specified electroweak quantum numbers, a potential and a vacuum alignment. The relationship carrier is presently a response/Jordan object. Identifying them requires matching:

- gauge representation and hypercharge;
- kinetic term and reality condition;
- vacuum expectation value or background response;
- masses and interactions;
- the determinant singlet with the scalar potential invariant.

Without these checks, the shared \(5+1\) decomposition is structural evidence, not unification.

## 6. Spinor-helicity ladder clarified

Let \(S\) denote one massless spinor face line, with unit helicity weight in the doubled convention. Then

\[
\begin{array}{c|c|c}
\text{object}&\text{line}&\text{weight magnitude}\\ \hline
\text{spinor face}&S&1\\
\text{fermion opposite-face relationship}&S^2&2\\
\text{spin-two face}&S^4&4\\
\text{stress opposite-face relationship}&S^8&8.
\end{array}
\]

The middle equalities use the duality of opposite-helicity face lines. Thus

\[
S^8=(S^2)^{\otimes4},
\]

which is the earlier fourth-power relationship theorem.

At the level of massless field strengths, \(S^2\) has the weight of a self-dual Maxwell spinor and \(S^4\) the weight of a self-dual Weyl-curvature spinor. This is a representation statement; it does not claim that a photon or graviton is a bound state of fundamental fermions.

## 7. Connection to “Goldstone modes on the next rung”

The decomposition identifies a precise next rung but does not automatically make its five components Goldstone modes. Goldstones require spontaneous breaking and a coset with five broken generators.

The correct research question is now:

> Does a dynamically selected relationship-triplet background break a symmetry so that the traceless fiveplet, the determinant singlet, or some subset has a protected Goldstone/pseudo-Goldstone interpretation?

The earlier locking-potential Hessian documents provide the machinery to answer this once a field-level identification is supplied.

## 8. Consequences for the cubic-norm branch

For \(H_2\), the determinant is quadratic and appears as the invariant singlet of the relationship square. For \(H_3\), the determinant is cubic and couples three edge relationships into one consistency scalar.

This suggests a hierarchy:

\[
\begin{array}{c|c|c}
\text{carrier}&\text{primitive invariant}&\text{interpretation}\\ \hline
H_2&\det_2&\text{two-face causal/Jordan norm}\\
H_3&\det_3&\text{three-edge sewing consistency}.
\end{array}
\]

The representation result therefore supports—but does not prove—the idea that the norm is the scalar consistency channel left after relationship multiplets are assembled.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the physical Furey/response triplet has a symmetric-square effective action whose unique singlet is exactly the Jordan determinant and whose fiveplet matches an independently required stress or custodial sector.

**Custodial trigger:** gauge quantum numbers and the full-lock potential identify the earlier scalar fiveplet with the relationship fiveplet without additional arbitrary fields.

**Stress trigger:** a Lorentz-covariant form factor realizes the \(S^4\) spin-two face and \(S^8\) relationship with the correct residues.

**Goldstone falsifier:** the fiveplet is called Goldstone without a derived broken group and flat directions.

**Representation falsifier:** the shared \(5+1\) decomposition is treated as field identity despite incompatible gauge or kinetic data.

## 10. Certificate

The [relationship-square singlet/fiveplet certificate](scripts/verify_relationship_square_singlet_fiveplet.mjs) verifies the weight decomposition, determinant invariance, Veronese null locus and the \(S,S^2,S^4,S^8\) helicity ladder.

## Companion documents

- [Symmetric-square Veronese carrier](276_symmetric_square_veronese_embedding_preserves_rotations_and_relationship_doubling.md)
- [Full-lock custodial Hessian and charge spectrum](94_full_lock_custodial_hessian_and_charge_spectrum.md)
- [Stress relationship fourth-power theorem](224_stress_relationship_is_fourth_tensor_power_of_fermion_relationship.md)
- [Three-port \(H_3\) cubic consistency](200_three_port_h3r_cubic_consistency_and_spin23_edge_reduction.md)
