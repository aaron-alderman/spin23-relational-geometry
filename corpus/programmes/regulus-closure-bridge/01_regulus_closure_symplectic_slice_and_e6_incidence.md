# Regulus closure, the symplectic slice and the finite \(E_6\) incidence layer

**Date:** 26 October 2026

**Status:** exact finite certificate with bounded exceptional comparison

**Programme:** [Regulus closure bridge](README.md)

**Evidence:** [machine record](../../../evidence/data/regulus-spin23-bridge-v1.json)

**Verifier:** [independent certificate](../../../verification/verify/verify_regulus_spin23_bridge.mjs)

## 1. Why a regulus matters

Three mutually skew lines in projective three-space determine a doubly ruled
quadric. The common transversals form one ruling; the original lines belong to
the opposite ruling. Each ruling is a projective line, and every member of one
meets every member of the other.

Equivalently, a smooth quadric surface is

\[
 Q^+(3)\cong\mathbb P^1\times\mathbb P^1.
\]

This gives a precise carrier grammar:

| Corpus term | Regulus realization |
|---|---|
| carrier | the hyperbolic quadric/grid |
| first face | one ruling |
| dual face | the opposite ruling |
| selector | incidence with three mutually skew lines |
| admitted set | their common-transversal ruling |
| detector | whether a fourth line preserves the complete transversal family |

The fourth-line test is a genuine closure detector. A generic fourth
constraint reduces the transversal conic to at most two members. A fourth
line in the same ruling preserves the entire opposite ruling.

## 2. The ambient-to-symplectic descent

Let \(V\) be four-dimensional. A projective line in \(\mathbb P(V)\) is a
decomposable bivector \([u\wedge v]\). All such lines form the Klein quadric

\[
 \operatorname{Gr}(2,4)
 =\{[p]\in\mathbb P(\Lambda^2V):p\wedge p=0\}.
\]

Over the reals, the wedge pairing on \(\Lambda^2V\) has signature \((3,3)\),
giving the accidental isomorphism

\[
 Spin_0(3,3)\cong SL(4,\mathbb R).
\]

Choose a nondegenerate symplectic form \(\Omega\). Requiring a line to be
isotropic is the linear Plücker condition

\[
 \Omega(u,v)=0.
\]

It cuts the six-dimensional wedge carrier to the primitive five-space
\(\Omega^\perp\). The restricted quadratic form has signature \((2,3)\), and

\[
 \operatorname{LGr}(2,4)
 =\operatorname{Gr}(2,4)\cap\mathbb P(\Omega^\perp),
 \qquad
 Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

Thus \(Spin(2,3)\) is not being inferred from the picture of a ruled surface.
It is the exact stabilizer geometry obtained by imposing symplectic
admissibility on the ambient \(Spin(3,3)\) line carrier.

## 3. The finite carrier

The certificate enumerates every two-plane in \(\mathbb F_3^4\):

\[
 130\text{ two-planes},\qquad40\text{ Lagrangian planes}.
\]

Their primitive Plücker images are exactly the 40 points of the parabolic
quadric \(Q(4,3)\). The polar-space lines are also enumerated:

\[
 40\text{ points},\qquad40\text{ lines},\qquad
 4\text{ points per line},\qquad4\text{ lines per point}.
\]

Every four-point line is verified to be a Lagrangian pencil: its four
Lagrangian two-planes share one projective vector in \(\mathbb F_3^4\).

There is no spread made only from these 40 polar lines: exhaustive exact-cover
search finds no ten pairwise disjoint lines partitioning all 40 points. This
blocks a tempting but false route to the cubic-surface degree-27 object.

## 4. Hyperplane sections and the \(36+40+45\) split

There are 121 projective hyperplanes in \(\mathbb P^4(\mathbb F_3)\). Their
intersections with \(Q(4,3)\) divide exactly into:

| Section size | Number | Geometric type |
|---:|---:|---|
| 10 | 36 | elliptic quadric \(Q^-(3,3)\) |
| 13 | 40 | tangent cone over a four-point conic |
| 16 | 45 | hyperbolic quadric \(Q^+(3,3)\) |

The counts \(36,40,45\) are also three classical permutation degrees of
\(PSp_4(3)\). In the cubic-surface/\(E_6\) geometry they correspond to the
degrees of double-sixes, polarization-type objects and tritangent planes.
The count alone would be weak; the incidence and group action below make both
the 36- and 45-object branches precise.

## 5. Forty-five exact regulus pairs

Every 16-point hyperbolic section contains eight polar lines. Their
disjointness graph has two connected components of four lines:

\[
 \mathcal R_+\sqcup\mathcal R_-,
 \qquad|\mathcal R_+|=|\mathcal R_-|=4.
\]

Each ruling partitions the 16 points. Each line of \(\mathcal R_+\) meets each
line of \(\mathcal R_-\) in exactly one point.

The calculation then tests every three-line subset of both rulings in all 45
sections. Among all 40 polar-space lines, its common transversals are exactly
the four members of the opposite ruling. Therefore

\[
 \boxed{
 \text{three same-ruling lines}
 \longmapsto
 \text{one complete opposite regulus}.}
\]

This is the finite relation-closure operation sought by the corpus.

## 6. The 45-section graph

Two hyperbolic sections meet in either four or seven Lagrangian points:

\[
 270\text{ pairs meet in }4,\qquad
 720\text{ pairs meet in }7.
\]

Join two sections when they meet in four points. Every vertex has degree 12;
adjacent and nonadjacent pairs both have three common neighbours. Hence the
graph is

\[
 \boxed{\operatorname{SRG}(45,12,3,3).}
\]

These parameters do not uniquely identify a graph—there are 78 isomorphism
classes with these parameters—so the certificate does not stop at a numerical
match.

## 7. The missing 27 are reconstructed internally

The section graph has exactly 27 maximal five-cliques. Moreover:

- every five-clique contains five of the 45 sections;
- every section belongs to exactly three five-cliques;
- every adjacent section pair belongs to exactly one five-clique.

Thus

\[
 27\cdot5=45\cdot3=135.
\]

Interpreting a section as a tritangent plane and a five-clique as the common
cubic line gives precisely the Schläfli incidence:

- 27 lines;
- 45 tritangent planes;
- five tritangent planes through each line;
- three lines in each tritangent plane.

The 27 are therefore not inserted because the number is famous. They are
reconstructed as maximal relation-closed subsets of the 45 regulus-pair
sections.

## 8. The 36 double-sixes are reconstructed internally

Fix one of the 36 elliptic ten-point sections. Its stabilizer in
\(PSp_4(3)\) has order 720 and splits the 27 reconstructed lines into two
orbits:

\[
 \boxed{27=12+15.}
\]

On the 12-line orbit, join two line candidates when they share one of the 45
tritangent candidates. The induced graph is bipartite with parts of size six,
and every vertex has degree five:

\[
 \boxed{K_{6,6}\setminus 6K_2.}
\]

This is exactly the incidence graph of a double-six: each line in one six
meets five lines in the other and misses its paired counterpart. Transporting
the 12-line selection across the 36 elliptic sections gives

\[
 36\cdot12=27\cdot16=432
\]

incidences. Thus every elliptic section selects one double-six and every
reconstructed line belongs to 16 double-sixes. The 36 are reconstructed by
their action and incidence, not identified from cardinality alone.

## 9. Group-action certificate

The script independently generates all

\[
 |Sp_4(3)|=51{,}840
\]

symplectic matrices and acts on the finite carrier. Its projective quotient
has order

\[
 |PSp_4(3)|=25{,}920.
\]

The action is transitive on:

| Orbit | Size | Projective stabilizer |
|---|---:|---:|
| hyperbolic/regulus-pair sections | 45 | 576 |
| reconstructed five-cliques | 27 | 960 |
| elliptic/double-six sections | 36 | 720 |

The subgroup lattice of \(PSp_4(3)\) has unique maximal-subgroup classes of
indices 27, 36 and 45 with precisely these orders. Consequently these are the
correct homogeneous \(PSp_4(3)\)-sets for comparison with cubic lines,
double-sixes and tritangent planes, up to a choice of basepoint and group
isomorphism.

The full cubic-surface incidence symmetry is

\[
 W(E_6)\cong PSp_4(3){:}2,
 \qquad |W(E_6)|=51{,}840.
\]

This also corrects a possible naming error:

\[
 Sp_4(3)\not\cong W(E_6).
\]

They have the same order, but \(Sp_4(3)\) has a central involution. Its
projective quotient \(PSp_4(3)\) is the even simple subgroup of \(W(E_6)\).

## 10. What moved

The earlier corpus knew:

\[
 40\text{ qutrit polarizations}
 \quad\text{and}\quad
 PSp_4(3)\cong W(E_6)^+.
\]

It did not contain the incidence mechanism joining that carrier to the
classical exceptional configuration. Regulus closure supplies it:

\[
 \boxed{
 40\text{-point Lagrangian carrier}
 \to\{27\text{ lines},36\text{ double-sixes},45\text{ regulus pairs}\}
 \to E_6\text{ cubic incidence}.}
\]

This does not repair the failed \(40\)-fold \(A_2\) cover of the \(E_8\) roots.
It instead realizes an alternative anticipated in the existing corpus: the
natural exceptional object may be an incidence configuration rather than an
individual root orbit.

## 11. Physical and mathematical boundaries

- **Exact:** all finite counts, ruling decompositions, transversal closures,
  graph parameters, five-clique reconstruction, double-six graphs and group
  orbits.
- **Classical identification:** the resulting \(27/36/45\) homogeneous
  incidence system is the finite Schläfli/\(E_6\) configuration.
- **Noncanonical:** no preferred labels identify a particular finite section
  with a particular line or tritangent plane on a chosen cubic surface.
- **Open:** lifting the finite relation-closure operation to the real
  \(Spin(2,3)\) carrier while retaining positivity and dynamics.
- **Not claimed:** \(E_8\), a particle spectrum, spacetime microstructure or a
  physical role for cubic surfaces.

## 12. Subsequent closure

All three next tests from the first pass have now been completed:

1. an anti-symplectic similitude supplies the outer involution and completes
   the action to the full order-51,840 \(W(E_6)\) symmetry;
2. the 40 Lagrangian points reconstruct the 40 Steiner triads, while the
   resulting 240 trihedra fail the phase-fiber orbit test and therefore do not
   reopen the failed \(E_8\)-root cover;
3. the real lift separates the Lagrangian boundary, positive Siegel interior,
   Riccati transport and experiment-dependent detector residual.

The same completion identifies the 432 incident double-six/line flags as
\(W(E_6)/S_5\), joining the regulus geometry to the corpus's existing
26-dimensional Hecke commutant. See [the full E₆ completion](02_full_e6_completion_hecke_carrier_and_240_boundary.md),
[the real lift](03_real_positive_domain_dynamics_and_detector_boundary.md)
and [the exhaustion ledger](04_regulus_exhaustion_ledger.md).

## Primary references

- P. J. Cameron, [*Projective and Polar Spaces: The Klein Quadric and Triality*](https://cameroncounts.wordpress.com/wp-content/uploads/2015/04/pps1.pdf),
  especially the regulus/conic correspondence.
- F. de Zeeuw, [*On the use of the Klein quadric for geometric incidence
  problems in two dimensions*](https://arxiv.org/abs/1412.2909).
- J. S. Frame, *A symmetric representation of the twenty-seven lines on a
  cubic surface by lines in a finite geometry* (1938), for the classical
  finite \(27/45\) representation.
- T. Connor and D. Leemans,
  [*The subgroup lattice of PSp₄(3)*](https://leemans.dimitri.web.ulb.be/atlaslat/psu42.pdf),
  for the index \(27,36,40,40,45\) maximal-subgroup classes.
- K. Coolsaet, J. Degraer and E. Spence,
  [*The strongly regular (45,12,3,3) graphs*](https://eprints.gla.ac.uk/12858/),
  for the nonuniqueness warning at the graph-parameter level.

## Corpus links

- [Forty qutrit null lines and Lagrangian polarizations](../../claims/0500-0599/512_the_forty_qutrit_null_lines_are_exactly_the_forty_genus_two_lagrangian_polarizations.md)
- [Even-E₆ inside the E₈ branch](../../claims/0500-0599/514_the_natural_binary_c3_quotient_matches_a2_times_even_e6_inside_e8_but_the_standard_embedding_is_not_transitive.md)
- [No invariant forty-A₂ cover](../../claims/0500-0599/516_the_standard_even_e6_subgroup_has_no_invariant_forty_a2_cover_of_the_e8_roots.md)
- [Grassmannian globalization of the kenotic channel](../frontier/wave-7/frontier_wave7_58_grassmannian_globalization_of_the_kenotic_channel.md)

