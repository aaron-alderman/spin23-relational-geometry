# Matrix Multiplicity Enlarges Only the Loop Sector while All Two-Step Cross-Edges Remain Junk

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact universal-calculus theorem for arbitrary nonzero matrix-valued blocks on the four-state path; additional physical edges and generalized fluctuations remain open

**Depends on:** [the scalar path junk theorem](1492_degree_two_junk_kills_the_induced_cross_edges_in_the_real_completed_null_mask_path.md) and [the real-even null-mask completion](../1100-1199/1121_the_orientable_null_mask_is_an_A2_triangle_and_one_spectator_real_edge_pair_repairs_both_duality_and_connectedness.md)

**Evidence:** [matrix-multiplicity ledger](../../../evidence/data/spin23-null-mask-matrix-path-junk.json) and [executable block-path verifier](../../../verification/verify/verify_spin23_null_mask_matrix_path_junk.mjs)

## Result

The positive degree-two junk result of claim 1492 is stable under arbitrary
finite internal multiplicity and noncommuting edge matrices.

Let

\[
\mathcal H=H_0\oplus H_1\oplus H_2\oplus H_3,
\]

represent \(\mathbb C^4\) by the four vertex projectors. Let the self-adjoint
finite Dirac operator have only path support,

\[
D_{01}=K_0,
\qquad
D_{12}=K_1,
\qquad
D_{23}=K_2,
\]

with reverse blocks given by adjoints. The \(K_i\) may be rectangular,
noncommuting and of arbitrary finite rank.

Then every distance-two product is exact degree-two junk:

\[
\boxed{
K_0K_1, K_1^*K_0^*, K_1K_2, K_2^*K_1^*
\quad\text{vanish in }\Omega_D^2.
}
\]

Matrix multiplicity can split the diagonal return loops at the two interior
vertices, enlarging the surviving degree-two population sector. It cannot
turn a two-step mixed relation into a physical degree-two form.

## 1. Direct junk identity

Let \(e_i\) be the vertex idempotents. If \(i\) and \(k\) are not adjacent, then

\[
\pi_D(e_i\,de_k)=e_i[D,e_k]=0.
\]

Thus

\[
e_i\,de_k\in\ker(\pi_D|_{\Omega^1}).
\]

Its differential is

\[
d(e_i\,de_k)=de_i\,de_k,
\]

whose representation is

\[
\pi_D(de_i\,de_k)=[D,e_i][D,e_k].
\]

For the distance-two pair \((0,2)\), the only nonzero block of this product is

\[
\bigl([D,e_0][D,e_2]\bigr)_{02}
=-K_0K_1.
\]

Therefore \(K_0K_1\) is junk independently of its entries, rank or
commutation properties. The other three orientations follow identically
from

\[
e_2de_0,\qquad e_1de_3,\qquad e_3de_1.
\]

This is not a numerical cancellation. It is a universal-differential
identity.

## 2. Complete degree-two structure

Assume every path block \(K_i\) is nonzero. The represented one-form space has
one scalar direction on each oriented edge:

\[
\dim\pi_D(\Omega^1)=6.
\]

The degree-one kernel consists of the six oriented nonedges. Two of those
join the endpoints ((0,3)) and have no length-two realization; their
differentials represent as zero. The four distance-two nonedges generate
the four-dimensional degree-two junk space.

After quotienting, only length-two returns remain. At the endpoints these
are

\[
K_0K_0^*,qquad K_2^*K_2,
\]

one direction each. At the two interior vertices there can be two
independent loop matrices:

\[
K_0^*K_0,\quad K_1K_1^*,
\]

and

\[
K_1^*K_1,\quad K_2K_2^*.
\]

Hence

\[
\boxed{
\dim\Omega_D^2
=2+r_1+r_2,
\qquad
1\le r_1,r_2\le2,
}
\]

where \(r_1\) and \(r_2\) are the dimensions of those two interior loop spans.

Therefore

\[
4\le\dim\Omega_D^2\le6.
\]

Scalar edge weights give the lower value. Generic matrix blocks give the
upper value. Every surviving direction is vertex diagonal.

## 3. Executable witnesses

The verifier constructs equal-multiplicity examples with internal dimensions
\(m=1,2,3\):

| Internal dimension | \(\dim\pi_D\Omega^1\) | \(\dim\pi_D\Omega^2\) before junk | junk rank | quotient rank |
|---:|---:|---:|---:|---:|
| 1 | 6 | 8 | 4 | 4 |
| 2 | 6 | 10 | 4 | 6 |
| 3 | 6 | 10 | 4 | 6 |

In all three witnesses, all four oriented distance-two block products lie in
the junk span.

## 4. What this says about the missing middle

The result narrows the ways in which the sector-dependent mask can fail.
Simple family or gauge multiplicity does not defeat it. Nor does replacing
scalar overlaps by noncommuting Yukawa-like matrices while retaining the
same four-vertex path support.

To regenerate a mixed cross-relation, a physical completion must change at
least one structural assumption:

1. represent an additional direct edge between distance-two vertices;
2. enlarge the coordinate algebra so the alleged nonedge one-form is no
   longer in the represented kernel;
3. use a generalized fluctuation not captured by the ordinary universal
   differential quotient;
4. introduce a symmetry-breaking or radiative operator with new support;
5. identify vertices or anchors so that the path/nonedge distinction is
   lost.

This is a meaningful convergence. The same incidence condition that forbids
the dangerous Dirac edge also supplies the kernel element whose differential
kills its first composite surrogate.

## 5. Spin(2,3) interpretation

The two local \(H_2(\mathbb R)\) response wheels are not automatically merged
by internal matrix coefficients. The first mixed binary product remains
zero in the physical degree-two quotient, although extra diagonal loop
directions can alter the population potential.

Thus multiplicity preserves the **relational separation** needed for local
(Spin(2,3)) structure, while warning that the scalar potential need not
retain the minimal four-population form.

The next decisive calculation is no longer a generic multiplicity test. It
is specific:

\[
\boxed{
\text{evaluate the generalized }A_{(2)}\text{ fluctuation and radiative
counterterm support on the distance-two blocks}.}
\]

The generalized-inner-fluctuation half of this gate is resolved in [claim 1494](1494_generalized_inner_fluctuations_preserve_the_central_family_null_mask_while_dressing_the_present_Pati_Salam_Majorana_defect.md): central family support zeros are invariant under \(A_{(1)}+\widetilde A_{(1)}+A_{(2)}\). The radiative-counterterm half remains open.

## 6. Boundaries

**Support boundary:** the theorem assumes the finite Dirac support is exactly
the four-state path.

**Ordinary-calculus boundary:** the proof uses the ordinary represented
universal differential calculus. Relaxing first order in the unreduced
Pati--Salam branch requires a separate \(A_{(1)}+A_{(2)}\) calculation.

**Loop boundary:** matrix multiplicity can add two independent diagonal
degree-two directions. These may affect the Jordan-copy potential and must
not be discarded.

**Radiative boundary:** a symmetry-allowed direct distance-two counterterm
would change the support graph and evade the theorem.

## Verdict

The matrix-valued fan strengthens rather than weakens the plausible middle:

\[
\boxed{
\text{path incidence}
\Longrightarrow
\text{all two-step cross-relations are exact junk for arbitrary internal
multiplicity}.}
\]

The surviving uncertainty has moved from multiplicity to generalized
fluctuation and counterterm support.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_null_mask_matrix_path_junk.mjs
~~~
