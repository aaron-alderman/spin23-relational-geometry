# Full E₆ completion, the 432-point Hecke carrier and the 240-object boundary

**Date:** 27 October 2026

**Status:** exact finite reconstruction and exact representation-level near miss

**Programme:** [Regulus closure bridge](README.md)

**Evidence:** [machine record](../../../evidence/data/regulus-spin23-bridge-v1.json)

**Verifier:** [independent certificate](../../../verification/verify/verify_regulus_spin23_bridge.mjs)

## 1. Result

The regulus construction now recovers substantially more than the initial
27-line/45-tritangent incidence. Starting only from the 40 Lagrangian points
and 40 pencil lines of \(Q(4,3)\), it reconstructs the classical finite
\(E_6\) hierarchy

\[
 \boxed{
 27\text{ cubic lines},\quad
 36\text{ double-sixes},\quad
 40\text{ Steiner triads},\quad
 45\text{ tritangent planes}.}
\]

It also reconstructs:

- 72 six-line rows;
- 120 Steiner trihedral pairs;
- 120 azygetic triads of double-sixes;
- 240 individual trihedra;
- 432 incident double-six/line flags.

These objects are generated internally by incidence and group action. They
are not imported as a list of famous cubic-surface numbers.

## 2. Completing the double-six relations

Each of the 36 elliptic sections selects 12 of the 27 line candidates. The
induced meeting graph is

\[
 K_{6,6}\setminus6K_2,
\]

so its two bipartition classes are six mutually skew lines. Across all
double-sixes these give exactly 72 distinct six-line rows.

Two double-sixes intersect in either four or six line candidates:

| Shared lines | Number of pairs | Degree per double-six | Classical type |
|---:|---:|---:|---|
| 4 | 270 | 15 | syzygetic |
| 6 | 360 | 20 | azygetic |

The 360 azygetic pairs close uniquely into 120 triples: every azygetic edge
belongs to exactly one three-clique. Thus the classical syzygetic/azygetic
relation and its ternary closure are recovered from the same incidence data.

## 3. The missing 40 are Steiner triads

Each tritangent candidate contains three reconstructed cubic lines. Among
triples of tritangents, the calculation finds 240 triples whose line supports
have size nine. They occur in pairs with the same nine-line support, giving

\[
 120\text{ Steiner trihedral pairs}.
\]

Each pair contains two trihedra of three tritangent planes. The 120 pairs then
close uniquely into 40 triples whose three nine-line supports partition all
27 cubic lines:

\[
 \boxed{40\text{ Steiner triads}.}
\]

This identifies the 40-object cubic configuration precisely. The stabilizer
of one tangent 13-point section acts on the 40 Steiner triads with orbit sizes

\[
 1+12+27,
\]

so it fixes a unique triad. Transport gives a \(PSp_4(3)\)-equivariant
bijection

\[
 \boxed{
 \{40\text{ Lagrangian points/tangent sections}\}
 \cong
 \{40\text{ Steiner triads}\}.}
\]

The other natural degree-40 carrier—the 40 polar-space lines—has stabilizer
orbits \(4+36\) and no fixed Steiner triad. The two index-40 actions must
therefore remain typed separately.

## 4. The outer involution is anti-symplectic

The earlier pass recovered only the even group

\[
 PSp_4(3)\cong W(E_6)^+,
 \qquad |PSp_4(3)|=25{,}920.
\]

On \(\mathbb F_3^4\), the matrix

\[
 A=\operatorname{diag}(1,1,-1,-1)
\]

has symplectic multiplier \(-1=2\pmod3\). It normalizes \(Sp_4(3)\), is not
projectively symplectic, squares projectively to the identity and preserves
the reconstructed cubic-line incidence. Adjoining it gives

\[
 \boxed{
 PCSp_4(3)=PSp_4(3){:}2,
 \qquad |PCSp_4(3)|=51{,}840.}
\]

Its action simultaneously preserves the reconstructed sets of sizes

\[
 27,\quad36,\quad40,\quad45.
\]

Using the classical identification of the full automorphism group of the
Schläfli configuration, this is the full \(W(E_6)\) action. This completes the
finite outer-involution gate without confusing \(Sp_4(3)\), which has a
central involution, with \(W(E_6)\).

## 5. The 432-point Hecke carrier is now the same carrier

Form the incident flags

\[
 \mathcal X
 =\{(D,\ell):D\text{ is a double-six and }\ell\subset D\}.
\]

The incidence counts give

\[
 |\mathcal X|=36\cdot12=27\cdot16=432.
\]

The full \(W(E_6)\) action is transitive on \(\mathcal X\). A flag stabilizer
has order 120 and acts faithfully as all 120 permutations of the five
tritangent planes through its selected cubic line. Therefore

\[
 \operatorname{Stab}_{W(E_6)}(D,\ell)\cong S_5
\]

and

\[
 \boxed{\mathcal X\cong W(E_6)/S_5.}
\]

The flag stabilizer has 26 orbits on \(\mathcal X\). Hence

\[
 \dim\operatorname{End}_{W(E_6)}(\mathbb Q^{\mathcal X})=26.
\]

This is exactly the carrier and dimension of the corpus's existing Hecke
algebra

\[
 H(S_5\backslash W(E_6)/S_5)
 \cong\operatorname{End}_{W(E_6)}(\mathbb Q^{432}).
\]

The earlier comparison had a common language but no common carrier. Regulus
closure now supplies the carrier: a Hecke state is an incident choice of one
double-six and one of its 12 lines. The known Wedderburn decomposition

\[
 \mathbb Q^5\oplus M_2(\mathbb Q)^3\oplus M_3(\mathbb Q)
\]

therefore acts on a geometrically reconstructed finite \(E_6\) flag space.
It is still not a Lie algebra or a physical Hamiltonian.

## 6. The tempting 240 identification fails equivariantly

The Steiner construction contains

\[
 40\text{ triads}\times3\text{ pairs}\times2\text{ trihedra}=240
\]

individual trihedra. This mirrors the corpus factorization

\[
 40\text{ Lagrangian polarizations}
 \times3\text{ binary decorations}
 \times2\text{ Plücker orientations}=240.
\]

The typing is exceptionally close:

| Phase-fiber role | Cubic-incidence role |
|---|---|
| Lagrangian polarization | Steiner triad |
| three binary decorations | three Steiner pairs in the triad |
| two Plücker orientations | two trihedra in each pair |

But the group action rejects the identification. \(PSp_4(3)\) is transitive
on the 240 trihedra, while it has three 80-element orbits on the phase fibers
because the binary decoration is retained by the qutrit factor. Thus

\[
 \boxed{
 40\times3\times2\text{ typing match}
 \ne
 PSp_4(3)\text{-set equivalence}.}
\]

This is a useful frontier marker. The trihedra provide a natural 240-object
\(E_6\) incidence carrier, but they are not the already-constructed 240 phase
fibers and do not rescue the \(E_8\)-root identification.

## 7. Consequences for the exceptional branch

The regulus route changes the exceptional story in three precise ways:

1. the 40 Lagrangian polarizations already carry a canonical exceptional
   interpretation as Steiner triads;
2. the finite configuration completes to the full \(W(E_6)\) action without
   entering \(E_8\);
3. the 432-point Hecke carrier is joined exactly, while the 240-point phase
   carrier is separated by its orbit structure.

The failed invariant forty-\(A_2\) cover remains failed. Regulus closure
supports an \(E_6\) incidence interpretation rather than an identification of
individual fibers with \(E_8\) roots.

## Sources and corpus links

- A. Cayley, [*A Memoir on Cubic Surfaces*](https://rcin.org.pl/Content/135206/PDF/WA35_165187_12807-6_Art412.pdf), for the classical 27/36/45 and trihedral-pair counts.
- J. W. P. Hirschfeld, [historical account of generalized quadrangles and cubic-surface configurations](https://era.ed.ac.uk/server/api/core/bitstreams/2caa8f64-766c-48bd-9f6b-237a29cbe023/content), for Steiner triads and their 40-fold organization.
- T. Connor and D. Leemans, [*The subgroup lattice of PSp₄(3)*](https://leemans.dimitri.web.ulb.be/atlaslat/psu42.pdf), for the index \(27,36,40,40,45\) classes.
- [Hecke, Claimipedia and Spin(2,3) meet at the corner](../frontier/wave-7/frontier_wave7_36_hecke_commutant_and_spin23_corner_bridge.md).
- [The 240 phase-fiber orbit](../../claims/0500-0599/510_the_handle_group_transports_a_240_fiber_family_of_cross_prime_phase_lattices_instead_of_preserving_one.md).
- [No invariant forty-A₂ cover](../../claims/0500-0599/516_the_standard_even_e6_subgroup_has_no_invariant_forty_a2_cover_of_the_e8_roots.md).

