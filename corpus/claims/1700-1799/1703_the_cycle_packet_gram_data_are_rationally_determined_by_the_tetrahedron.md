# The Cycle-Packet Gram Data Are Rationally Determined by the Tetrahedron

**Date:** 22 October 2026

**Status:** exact invariant-compression theorem; no independent degree of freedom or physical selector

**Depends on:** [the Lorentzian seven-point cycle](1700_the_tetrahedral_seven_point_sphere_extends_to_an_exact_spin23_conformal_cycle.md), [the rank-three vertex packet](1701_the_four_vertex_cycles_form_a_rank_three_spin12_packet_not_a_lorentz_tetrad.md), and [the centroid-cycle rank completion](1702_one_centroid_cycle_supplies_the_unique_missing_lorentz_direction_but_not_a_spacetime_coframe.md)

**Evidence:** [exact rational packet verifier](../../../verification/verify/verify_spin23_seven_point_cycle.mjs)

## Result

Every inner product, rank condition, projective cross-ratio and augmented-frame
determinant in the seven-point cycle packet is a rational function of the
original tetrahedral Gram matrix

\[
Q_{ij}=\beta(V_i,V_j).
\]

The conformal-cycle construction therefore creates no independent continuous
datum beyond the tetrahedron.  Its value is **invariant compression**: a
non-obvious collection of affine, inverse and polar constructions collapses to
a low-rank packet in the \((2,3)\) carrier, but that packet is reconstructible
from the source Gram data.

Consequently, the projective cycle Gram cross-ratio is a legitimate compact
descriptor and comparison observable, but it is not a new prediction unless a
separate theory restricts the allowed tetrahedral Gram matrices.

## 1. Face poles are rational Gram constructions

For the face opposite \(V_i\), let \(F_i\) be the matrix whose columns are the
three remaining vertices and let

\[
H_i=F_i^T\beta F_i
\]

be its \(3\times3\) face Gram matrix.  On the generic chart
\(\det H_i\ne0\), define

\[
n_i=F_iH_i^{-1}\mathbf1.
\]

Then

\[
F_i^T\beta n_i=\mathbf1,
\qquad
q(n_i)=\mathbf1^TH_i^{-1}\mathbf1.
\]

The normalized face centre/pole used by the seven-point construction is

\[
\boxed{
O'_i={F_iH_i^{-1}\mathbf1\over
\mathbf1^TH_i^{-1}\mathbf1}.
}
\]

Thus the coefficients of \(O'_i\) in the vertex span are rational functions
of the entries of the corresponding principal submatrix of \(Q\).

## 2. Cycle centres are rational Gram constructions

The centroid

\[
G={1\over4}\sum_{j=0}^3V_j
\]

has fixed vertex coefficients, and all of its pairings are linear combinations
of entries of \(Q\).  For each distinguished vertex, form the ordered basis
packet

\[
B_i=(G,O'_i,V_i)
\]

and its Gram matrix

\[
K_i=B_i^T\beta B_i.
\]

With the normalization \(\alpha=1\), the cycle centre \(c_i\) is determined by

\[
2B_i^T\beta c_i=
\begin{pmatrix}
4q(G)+1\\
4q(O'_i)+1\\
8\beta(G,V_i)-3
\end{pmatrix}
=r_i.
\]

Writing \(c_i=B_i a_i\) gives

\[
\boxed{
a_i={1\over2}K_i^{-1}r_i.
}
\]

Every entry of \(K_i\) and \(r_i\) is rational in \(Q\), so the same is true
of the coefficients of \(c_i\).

## 3. The conformal Gram matrix contains no new datum

The normalized cycle vectors are

\[
S_i=(2c_i,2,-4).
\]

Therefore

\[
\boxed{
\langle S_i,S_j\rangle
=4\beta(c_i,c_j)-16.
}
\]

The right-hand side is rational in \(Q\).  Hence so are:

- every minor and rank condition of the cycle Gram matrix;
- its projective cross-ratios;
- the unique normalized linear relation among the four vertex cycles;
- the Gram determinant after adjoining the centroid cycle;
- every scalar obtained by contracting the packet with the fixed reference
  cycle and common lifted points.

No cycle-packet scalar can vary while \(Q\) is held fixed on the generic chart.

## 4. What remains genuinely useful

"No new independent datum" does not mean "no result."  The packet reveals
three exact facts that are obscure in raw tetrahedral coordinates:

1. the Euclidean theorem continues to Lorentzian signature;
2. the four vertex cycles have a universal rank-three ceiling;
3. one centroid-centred orthogonal cycle supplies the missing Lorentz
   direction generically.

These are structural identities and can guide a broader incidence census.
What they cannot do by themselves is select one physical tetrahedral shape,
one cross-ratio, one coupling, or one vacuum.

## 5. Bounded branch verdict

The immediate seven-point-to-\(Spin(2,3)\) branch is now closed at four levels:

1. **exact bridge:** the theorem is signature-independent and lives on the
   \((2,3)\) conformal null cone;
2. **exact obstruction:** the four natural vertex cycles have rank three;
3. **minimal repair:** one centroid cycle restores the internal Lorentz rank;
4. **authority boundary:** all packet invariants are rational descendants of
   the original tetrahedral Gram matrix.

Further work becomes worthwhile only if it changes the input or the target:

- classify the null/degenerate compactification strata;
- run a larger special-point cycle census directly in \(H_2(\mathbb R)\);
- derive a spacetime field, soldering map or action selecting these packets;
- find an incidence construction with a held-out invariant not fixed by the
  seed Gram data;
- independently audit the Euclidean theorem's novelty and prior literature.

Without one of those additions, more algebraic repackaging of the same packet
does not advance a physical gate.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_seven_point_cycle.mjs
~~~
