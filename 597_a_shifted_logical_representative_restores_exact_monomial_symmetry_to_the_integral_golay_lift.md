# A Shifted Logical Representative Restores Exact Monomial Symmetry to the Integral Golay Lift

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** explicit constructive theorem with independent integral-lattice and full-doubling certificates  
**Construction certificate:** [construct_shifted_monomial_symmetric_golay_lift.py](scripts/construct_shifted_monomial_symmetric_golay_lift.py)  
**Doubling certificate:** [verify_explicit_length37_nonunit_golay_doubling.mjs](scripts/verify_explicit_length37_nonunit_golay_doubling.mjs)

## Executive result

The earlier conclusion that every characteristic-zero nonunit Golay lift must break all noncentral finite symmetry was too strong. It was correct for pure coordinate permutations, but not for signed monomial transformations that preserve the logical coset while shifting its all-one representative.

For

\[
\mu=(2,2,2,2,2,2,-4,-4,-1,-1,-1),
\qquad
N=1,
\]

define the signed monomial involution \(h\) by

\[
p=(0\ 5)(2\ 3)(6\ 7)(8\ 9)
\]

in zero-based coordinate notation, together with source-coordinate signs

\[
d=(+,-,+,+,-,+,+,+,-,-,-).
\]

Thus

\[
(hx)_{p(j)}=d_jx_j.
\]

There exists an explicit integral rank-five \(P\)-lattice invariant under \(h\):

\[
\boxed{
G_{\rm sym}=
\begin{pmatrix}
1&0&1&1&0&1&1&1&0&0&0\\
1&0&-3&-3&0&1&-1&-1&-4&4&0\\
5&8&-13&13&0&-5&-9&9&0&0&16\\
32&-50&2&-2&30&-32&17&-17&-50&-50&60\\
-47&-46&-19&19&-62&47&-18&18&-46&-46&-124
\end{pmatrix}.}
\]

It satisfies exactly

\[
\boxed{
G_{\rm sym}\mu=0,\qquad
G_{\rm sym}\operatorname{diag}(\mu)G_{\rm sym}^T=0,\qquad
\operatorname{rank}_{\mathbb Q}G_{\rm sym}=5.}
\]

Its first two displayed rows are \(+1\) eigenvectors of \(h\), and its last three are \(-1\) eigenvectors. Hence

\[
\boxed{h\,\operatorname{rowspan}_{\mathbb Q}(G_{\rm sym})
=\operatorname{rowspan}_{\mathbb Q}(G_{\rm sym}).}
\]

Furthermore,

\[
\boxed{
d_{\mathbb Q}=5,\qquad
G_{\rm sym}\bmod3=C_{11}^{\perp},\qquad
d_3=5.}
\]

Doubling with the fifteen-coordinate Standard-Model seed again gives a verified weighted integral

\[
\boxed{[[37,1,5]]_3}
\]

construction.

## 1. Why the earlier representative-line obstruction was incomplete

The exact \(P\)-condition uses the weighted all-one functional:

\[
\langle x,\mathbf1\rangle_\mu=0.
\]

The involution does not preserve the all-one line. Instead,

\[
\langle h\mathbf1,\mathbf1\rangle_\mu=-1.
\]

Because both \(\mathbf1\) and \(h\mathbf1\) have norm \(N=1\), the projected displacement

\[
u=h\mathbf1+\mathbf1
\]

satisfies

\[
\langle u,\mathbf1\rangle_\mu=0,
\qquad
\langle u,u\rangle_\mu=1-(-1)^2=0.
\]

Thus the failure to preserve \(\mathbf1\) produces a null direction inside \(\mathbf1^\perp\), not a non-null extra constraint. An invariant maximal isotropic five-plane can contain this radical direction and remain possible.

The correct gate is therefore:

\[
\boxed{
\begin{array}{ll}
1-\langle h\mathbf1,\mathbf1\rangle_\mu^2\ne0
&\Longrightarrow\text{invariant isotropic rank at most four},\\
1-\langle h\mathbf1,\mathbf1\rangle_\mu^2=0
&\Longrightarrow\text{rank five may survive and must be tested}.
\end{array}}
\]

The generic coefficient stabilizer lies in the second case.

## 2. Exact eigenspace construction

Inside \(\mathbf1^\perp\), the \(+1\) eigenspace of \(h\) has dimension three and Gram matrix

\[
\begin{pmatrix}
8&-8&0\\
-8&8&0\\
0&0&-2
\end{pmatrix}.
\]

Its inertia is \((1,1,1)\): one positive, one negative and one radical direction. A maximal isotropic two-plane is generated in these coordinates by

\[
(1,1,0),
\qquad
(1,-1,4).
\]

The \(-1\) eigenspace inside \(\mathbf1^\perp\) has dimension six and split signature \((3,3)\). The certificate constructs an exact hyperbolic frame, expresses the three-dimensional \(-1\) Golay eigenspace in it modulo three and lifts the resulting skew graph over \(\mathbb Q\).

The orthogonal direct sum

\[
L=L_+\oplus L_-
\]

has dimensions \(2+3=5\), is totally isotropic, is \(h\)-invariant and reduces to the full ternary Golay dual.

## 3. Distance and full doubling

The certificate exhausts rational supports and finds no logical relation of size below five. Since the reduction is exactly the ternary Golay dual, its qutrit \(P\)-distance is also five.

With the Standard-Model seed,

\[
\lambda_T=-1,\qquad
\kappa=1,\qquad
N\kappa^3+\lambda_T=0.
\]

The independent doubling verifier constructs all thirty-seven columns and eleven rows, checks all \(11^3=1331\) ordered cubic row triples and searches all supports through weight five over \(\mathbb F_3\). Only the logical cube is nonzero, with value \(-1\), and the distance is five.

Run:

    node scripts/verify_explicit_length37_nonunit_golay_doubling.mjs --monomial-symmetric

## 4. What symmetry has actually survived

The coefficient placement's full finite monomial stabilizer has order four:

\[
\{\pm I,\pm h\}.
\]

The central \(-I\) acts trivially on the rational Grassmannian, while \(h\) acts nontrivially. The effective exact symmetry of the constructed row space is therefore

\[
\boxed{C_2.}
\]

This \(C_2\) was invisible to the earlier pure-permutation audit because its coordinate signs are essential. It also does not preserve \(\mathbf1\) as a vector; it preserves the lattice because the null displacement is absorbed into the invariant isotropic plane.

The previously displayed generic and Witt-block lattices have only the central order-two row-space stabilizer inside their full monomial coefficient stabilizers. Symmetry restoration required constructing a different rational polarization, not merely relabelling an old one.

## 5. Consequence for the symmetry-splitting narrative

The corrected hierarchy is:

\[
\begin{array}{c}
M_{11}\times C_2
\quad\text{finite signed Golay logical symmetry}\\
\downarrow\\
\{\pm I,\pm h\}
\quad\text{generic coefficient-partition stabilizer}\\
\downarrow\\
C_2
\quad\text{effective symmetry of a selected integral polarization}.
\end{array}
\]

Characteristic-zero lifting still breaks almost all finite symmetry, but not necessarily all of it. The surviving involution mixes coordinate permutation with signs and shifts the logical representative by a stabilizer direction.

This is more informative than the earlier blanket no-go: the surviving symmetry is exactly of “relation plus compensating internal shift” type.

## 6. Relation to Jordan triples and \(Spin(2,3)\)

No \(Spin(2,3)\) theorem was used in the construction. Nevertheless, the mechanism is directly relevant to the relational-carrier programme:

1. the logical object is a coset, not a preferred vector;
2. a chosen characteristic-zero representative supplies a polarization;
3. a symmetry can move that representative while preserving the relational subspace through a null compensator;
4. the invariant plane splits into two faces of dimensions two and three under an involution.

The first eigenspace contributes a two-dimensional isotropic face containing the null compensator; the second contributes a three-dimensional split Lagrangian. This is a concrete finite/arithmetic model of a carrier whose representative changes while its relation space remains invariant.

It is not yet the Jordan-triple recursion

\[
\text{Jordan triple}\Longrightarrow Sp(4,\mathbb R).
\]

To establish that bridge, the compensating null direction must be transported to a named Peirce arrow or logical Heisenberg generator, and the invariant \(C_2\) must act compatibly with the carrier's alternating form.

## 7. Stop-everything result and new tests

### Stop-everything result achieved

A nontrivial signed monomial symmetry can survive the characteristic-zero integral Golay lift while moving the distinguished logical representative. Therefore representative-line preservation is not a necessary condition for symmetry of the lifted \(P\)-lattice.

### New stop-everything tests

1. The null compensator \(u=h\mathbf1+\mathbf1\) maps canonically to the relationship arrow in the binary/Jordan carrier.
2. The surviving \(C_2\) pairs with the logical Pauli commutator to generate a nontrivial symplectic or dihedral action.
3. A similarly invariant lift exists in the Witt-block orbit. This existence test is now achieved, but its exact row-space stabilizer remains only an effective \(C_2\), not a larger group.
4. The coefficient weights \(2,-4,-1\) arise as eigenspace indices of the same involution.

### Falsifier

The proposed carrier interpretation fails if the null compensator has no invariant meaning under changes of Golay basis or cannot be transported through the Standard-Model doubling map.

## 8. Reproducible certificates

    C:\Users\aaron\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe scripts\construct_shifted_monomial_symmetric_golay_lift.py
    node scripts\verify_explicit_length37_nonunit_golay_doubling.mjs --monomial-symmetric

The first constructs the invariant integral lattice from eigenspaces. The second independently verifies its complete length-37 qutrit doubling.

## 9. Subsequent orbit comparison

The Witt-block orbit also admits a null-compensated monomial-invariant distance-five lift with the same \(2+3\) eigenspace pattern and effective \(C_2\). See [Both nonunit Golay orbits admit exact null-compensated \(C_2\) lifts](598_both_nonunit_golay_orbits_admit_exact_null_compensated_c2_lifts.md).
