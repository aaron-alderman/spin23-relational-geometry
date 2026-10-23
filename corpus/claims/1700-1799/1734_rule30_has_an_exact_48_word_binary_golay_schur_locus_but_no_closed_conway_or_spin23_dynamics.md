# Rule 30 Has an Exact 48-Word Binary-Golay Schur Locus, but No Closed Conway or Spin(2,3) Dynamics

**Date:** 23 October 2026

**Status:** exact finite theorem with an intrinsic code/design proof and an exhaustive certificate; infinite-trace and physical interpretations ruled out at the tested level

**Depends on:** [the Leech pair-Gram bridge](../1200-1299/1217_leech_pair_gram_geometry_reaches_spin23_but_needs_an_orientation_twist_and_affine_theta_shift.md) and [the Golay metric obstruction](../0600-0699/603_the_golay_sewing_tensor_intrinsically_reconstructs_m11_but_not_spin5.md)

**Certificate:** [Rule 30 / binary-Golay verifier](../../../verification/verify/verify_rule30_binary_golay_schur_locus.mjs)

## Result

There is a genuine but sharply bounded Conway linkage for Rule 30.  In the
standard cyclic presentation of the punctured binary Golay code
$G_{23}\subset\mathbb F_2^{23}$, Rule 30 returns exactly 48 of the 4096
codewords to $G_{23}$.  They are

\[
0,\qquad 23\text{ independent Golay octads},\qquad
23\text{ complementary weight-15 words},\qquad \mathbf 1.
\]

The two nontrivial classes are single $C_{23}$-orbits.  Their transition
counts are

\[
0\to0,qquad 23(8\to16),\qquad23(15\to8),\qquad23\to0.
\]

This is not a closed Golay cellular automaton.  Only 25 words remain in the
code for two consecutive updates, and after three updates only $0$ and
\(\mathbf1\), with \(\mathbf1\to0\), survive.  The exact result is therefore a
finite incidence locus, not an invariant Rule 30 subsystem.

## Exact Schur-product reduction

Over \(\mathbb F_2\), the Rule 30 local function is

\[
f(a,b,c)=a+b+c+bc.
\]

Writing \(\sigma\) for cyclic shift and \(\odot\) for coordinatewise product,
the global update on 23 cyclic cells is

\[
F(x)=\sigma x+x+\sigma^{-1}x+x\odot\sigma^{-1}x.
\]

The cyclic Golay code is linear and shift invariant, so its first three terms
already lie in $G_{23}$.  Consequently

\[
F(x)\in G_{23}
\quad\Longleftrightarrow\quad
x\odot\sigma^{-1}x\in G_{23}.
\]

The compatibility question is thus exactly an adjacent Schur-product
question inside the Golay code.  This is the structural content of the
linkage; it does not depend on visual resemblance between cellular-automaton
patterns.

Complementation preserves this condition.  If $q(x)=x\odot\sigma^{-1}x$,
then

\[
q(\mathbf1+x)=\mathbf1+x+\sigma^{-1}x+q(x).
\]

All terms other than $q(x)$ already lie in $G_{23}$, so $x$ is compatible if
and only if its complement is compatible.  It is therefore enough to study
the codeword weights 0, 7, 8 and 11.

The even subcode of $G_{23}$ is its dual.  Hence, for a codeword $x$, the
adjacency count

\[
e(x)=\operatorname{wt}(x\odot\sigma^{-1}x)
\]

is even when $x$ has even weight and odd when $x$ has odd weight.  Moreover,
for every nonconstant word,

\[
\operatorname{wt}(x+\sigma^{-1}x)=2(\operatorname{wt}(x)-e(x))\ge7
\]

by the Golay minimum distance.

- At weight 7, this forces $e(x)$ to be 1 or 3.  The Schur term is nonzero
  but has weight below 7, so it cannot be a Golay word.
- At weight 8, it forces even $e(x)\le4$.  If the Schur term lies in the code,
  minimum distance forces it to be zero.  Compatibility is therefore exactly
  independence of the octad support in the 23-cycle.
- At weight 11, compatibility would force a weight-seven Schur term.  Since
  that term is supported inside $x$, their codeword sum would have weight
  four, contradicting minimum distance.

Thus only zero and the independent octads can occur below half weight; their
complements give all remaining solutions.

## Witt-design classification

For a binary word, the support of
$x\odot\sigma^{-1}x$ is the set of occupied directed edges between adjacent
coordinates.  The 23 compatible weight-eight words have no adjacent occupied
coordinates, so their nonlinear Rule 30 term vanishes.  A representative is

\[
\{0,3,5,8,10,14,16,18\},
\]

or, polynomially,

\[
g(X)(1+X+X^2+X^7),
\qquad
g(X)=X^{11}+X^9+X^7+X^6+X^5+X+1.
\]

The count 23 follows intrinsically from the Witt design.  The 506 residual
octads split into 22 free $C_{23}$-orbits.  In the Steiner system
$S(5,8,24)$, a coordinate pair lies in 77 octads, 21 of which also contain
the punctured point.  Therefore each of the 23 cycle edges lies in 56
residual octads and

\[
\sum_B e(B)=23\cdot56.
\]

For a pair of cycle edges, the residual-octad multiplicity is 16 when the
edges share a vertex and 4 when they are disjoint.  There are respectively
23 and 230 such edge pairs, so

\[
\sum_B {e(B)\choose2}=23\cdot16+230\cdot4=23\cdot56.
\]

Let $n_0,n_2,n_4$ count the cyclic octad orbits with the indicated adjacency
count.  Dividing the two moment identities by 23 gives

\[
n_0+n_2+n_4=22,qquad
2n_2+4n_4=56,qquad
n_2+6n_4=56.
\]

Hence

\[
(n_0,n_2,n_4)=(1,14,7).
\]

There is exactly one independent-octad orbit.  Its 23 cyclic shifts exhaust
the compatible octads.  For the complement of such an octad, the adjacent
Schur term is a weight-seven Golay word, a heptad of the punctured Witt
design.  This produces the complementary 23-orbit and proves the exact
$1+23+23+1$ decomposition without enumeration.

The exhaustive certificate also proves that no Golay words of weights 7, 11,
12 or 16 satisfy the adjacent Schur condition.

The octad orbit also reconstructs its residual symmetry intrinsically.  Two
of the 23 octads are disjoint exactly when their cyclic labels differ by
$\pm1$, so the block-intersection graph is an undirected 23-cycle.  The
coordinate-incidence signatures are all distinct, making the induced action
faithful.  Although the abstract cycle admits a reflection, that reflection
does not extend to the point-octad incidence structure.  Consequently the
full setwise coordinate stabilizer of these 23 octads is exactly $C_{23}$,
even before intersecting with $M_{23}$.  Rule 30 adjacency has therefore
selected the cyclic subgroup and broken its dihedral reflection as well as
the larger Mathieu symmetry.

## What “Conway linkage” means here

The typed chain is

\[
\text{Rule 30 Schur locus}
\longrightarrow G_{23}
\longrightarrow G_{24}
\longrightarrow \Lambda_{\rm Leech}
\longrightarrow Co_0.
\]

The first arrow is the new exact incidence.  Extending $G_{23}$ by a parity
coordinate gives the extended binary Golay code $G_{24}$; $G_{24}$ enters
a standard construction of the Leech lattice; and $Co_0$ is the Leech
lattice automorphism group.  The code-coordinate automorphism group at the
Golay stage is $M_{24}$, not $Co_0$.

Rule 30 commutes with the chosen cyclic $C_{23}$, but not with the full
$M_{24}$ action.  The directed adjacency relation selects a 23-cycle and
breaks the larger code symmetry.  The result therefore supplies a concrete
symmetry-breaking incidence beneath the Conway chain, not an action of a
Conway group on Rule 30 dynamics.

This binary Golay construction is also distinct from the corpus's existing
ternary $G_{11}$, $M_{11}$, and sewing-tensor branch.  Their names must not
be used as an implicit identification.

## Infinite center-column boundary

The Rule 30 Prize concerns the center trace on the infinite line from a single
occupied cell, not the update of Golay-code initial states on a 23-cell ring.
The single-cell seed is not in $G_{23}$, and periodic wraparound eventually
mixes the two light-cone fronts.

As a direct diagnostic, the certificate generated the first 200,000 bits of
the infinite-line center trace and tested every chronological 23-bit window.
There were 86 memberships in one cyclic Golay orientation and 103 in its
reciprocal orientation.  Uniform density predicts 97.65 in each orientation.
This finite test neither proves randomness nor independence, but it shows no
Golay enrichment capable of transferring the 48-word ring result directly to
the Prize sequence.

Thus the present calculation solves none of the three Rule 30 Prize problems:
nonperiodicity, equal limiting color frequency, or the linear lower bound for
computing the nth center bit.

## Path to Spin(2,3)

The only presently typed continuation is

\[
G_{24}\to\Lambda_{\rm Leech}
\to\text{ordered-pair Gram matrices}
\to H_2(\mathbb R)_+
\to Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

The Leech pair-Gram step is already exact in the corpus.  It does not transport
Rule 30 time evolution, the $C_{23}$ adjacency operator, or the 48-word locus
into a continuous symplectic action.  No Rule 30/Spin(2,3) intertwiner,
Hamiltonian, representation, observable, or physical scale has been found.

## Finite-branch exhaustion and reopening condition

The finite classification, orbit count, transition depths and stabilizer are
closed.  Further enumeration at length 23 has no unresolved structural job.

The Prize branch should reopen only if a family of such code constraints,
rather than the isolated length-23 incidence, controls arbitrarily long
windows of the infinite center trace.  The 200,000-bit diagnostic currently
provides no evidence for that stronger statement.

## Sources

- [Wolfram Rule 30 Prize problems](https://rule30prize.org/)
- [Stephen Wolfram, announcement and Rule 30 background](https://writings.stephenwolfram.com/2019/10/announcing-the-rule-30-prizes/)
- [Johan Kopra, rapidly left-expansive cellular automata containing Rule 30](https://arxiv.org/abs/2202.13809)
- [Standard binary Golay generator and extension](https://repository.hkust.edu.hk/ir/bitstream/1783.1-151280/1/1783.1-151280.pdf)
- [Theo Johnson-Freyd and David Treumann, Golay/Leech/Conway construction review](https://academic.oup.com/imrn/article/2020/21/7873/5113498)

## Reproduction

~~~powershell
node verification/verify/verify_rule30_binary_golay_schur_locus.mjs
~~~
