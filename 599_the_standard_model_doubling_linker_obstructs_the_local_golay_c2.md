# The Standard-Model Doubling Linker Obstructs the Local Golay \(C_2\)

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** exhaustive no-go inside the natural blockwise monomial extension family  
**Certificate:** [verify_explicit_length37_nonunit_golay_doubling.mjs](scripts/verify_explicit_length37_nonunit_golay_doubling.mjs)

## Executive result

The null-compensated signed involution is an exact symmetry of each eleven-coordinate integral Golay \(P\)-lattice, but it does not extend through the Prakash–Ramya doubling linker to a monomial symmetry of the full thirty-seven-coordinate code.

This failure persists for:

- both the generic and Witt-block symmetric lifts;
- acting by \(h\) independently on either Golay copy or on both;
- independent central signs on both Golay copies;
- swapping the two Golay blocks;
- all \(120\) oscillator permutations of the fifteen-coordinate \(SO(10)\) seed;
- global seed negation.

The certificate exhausts

\[
2_{\rm swap}\cdot
2_{h_1}\cdot2_{\pm1}\cdot
2_{h_2}\cdot2_{\pm1}\cdot
120_{S_5}\cdot2_{\pm1}
=7680
\]

blockwise monomial candidates for each coefficient orbit.

Exactly \(240\) preserve both the stabilizer space and the full code space. They are the \(120\) seed oscillator permutations and their common global negatives. None uses the Golay involution:

\[
\boxed{
\#\{\text{fully preserving candidates using }h\}=0.}
\]

The local \(C_2\) is therefore killed by the linker, not by the individual \(P\)-lattices.

## 1. The doubled row architecture

The doubled construction uses two Golay copies and the fifteen-coordinate Standard-Model seed:

\[
\begin{array}{c|ccc}
&S_1&S_2&T\\
\hline
L&-\mathbf1&+\mathbf1&y\\
\text{paired stabilizers}&s&-s&0\\
K&0&\mathbf1&y\\
\text{seed stabilizers}&0&0&t.
\end{array}
\]

The signed involution satisfies, modulo three,

\[
h\mathbf1=-\mathbf1+u,
\qquad
u\in S,
\]

where \(u\) is the reduction of the exact null compensator.

Within one \(P\)-lattice this is harmless: the logical representative has changed only by a stabilizer word, and the exact characteristic-zero row space was constructed to contain the corresponding null direction.

The doubled linker distinguishes the two copies. Its row

\[
K=(0,\mathbf1,y)
\]

contains the logical representative on only the second Golay block.

## 2. Why the compensator cannot be absorbed

Acting by \(h\) on the second block sends

\[
K\longmapsto(0,-\mathbf1+u,y).
\]

The available paired Golay stabilizers have the form

\[
(s,-s,0).
\]

They can move a stabilizer word between the two copies only with opposite entries. They do not contain the one-sided correction

\[
(0,u,0)
\]

needed to absorb the transformed linker.

Acting by \(h\) on both blocks does not help. It introduces correlated compensators into \(L\), \(K\) and the paired rows, but their block incidence still does not match the one-sided linker. Swapping the two copies merely exchanges which side carries the mismatch.

An oscillator permutation of the seed changes \(y\) only within the seed's logical coset. It cannot supply a vector supported on one Golay block. Hence the full \(S_5\times C_2\) seed automorphism group does not repair the obstruction.

## 3. Exhaustive finite audit

For every candidate, the certificate separately tests:

1. preservation of the ten-dimensional stabilizer row space over \(\mathbb F_3\);
2. preservation of the full eleven-dimensional logical-plus-stabilizer row space;
3. the induced scalar on the logical quotient.

For both coefficient orbits:

\[
\begin{array}{c|c}
\text{quantity} & \text{count}\\
\hline
\text{candidates tested} & 7680\\
\text{preserve stabilizers and full code} & 240\\
\text{preserving candidates using either Golay }h & 0\\
\text{logical scalar }+1 & 120\\
\text{logical scalar }-1 & 120
\end{array}
\]

Because the obstruction already occurs modulo three, no exact integral extension within this candidate family can exist.

## 4. What survives

The seed's \(S_5\) oscillator symmetry survives the doubling. Its global negative gives the central \(C_2\), so the natural blockwise audit recovers the paper's

\[
S_5\times C_2
\]

symmetry on the full fifteen-coordinate code contribution.

The extra \(C_2\) deliberately engineered inside the Golay \(P\)-lattice does not survive.

This distinguishes:

\[
\boxed{
\text{symmetry of an input object}
\ne
\text{symmetry of a relational composition}.}
\]

## 5. Relation to the Jordan-triple programme

This is the clearest arithmetic example yet of the programme's central claim that composition is not an unrestricted tensor product.

The two Golay blocks are individually symmetric. The relational carrier \(K\) selects one face and imposes a directed incidence. That incidence removes a symmetry which each face possesses separately.

In Jordan/TRO language, the null compensator lives in an individual face, while the linking row permits only the anti-diagonal relation

\[
s\longmapsto(s,-s).
\]

It lacks the one-sided Peirce arrow required to transport the compensation through composition.

This does not prove that code doubling is Jordan-triple recursion. It supplies a precise test any such identification must pass:

\[
\boxed{
\text{the triple/linking operation must explain which local symmetries
extend and which are obstructed.}}
\]

## 6. Pinned dependency

The local \(C_2\) could extend only by leaving the tested blockwise family. Credible possibilities are:

1. add a one-sided Golay stabilizer compatible with triorthogonality;
2. modify the linking row by a null compensator;
3. allow a non-monomial Clifford transformation mixing logical and stabilizer data;
4. use a larger seed whose stabilizers carry a matching Golay-supported relation;
5. construct a genuinely ternary operator-space composition rather than the present block doubling.

Each changes the composition law and must recheck cubic identities and distance. The current doubling theorem does not authorize these changes automatically.

## 7. Stop-everything and falsification tests

### Stop-everything

1. A compensated linker
   \[
   K_u=(0,\mathbf1+u,y)
   \]
   remains triorthogonal and distance five while restoring the involution.
2. A logical Clifford lift of \(h\) preserves the doubled stabilizer group even though no monomial lift does.
3. The missing one-sided compensator is identified with a named Furey/Jordan Peirce arrow.

### Falsifier

The null-compensator/Jordan analogy should be demoted if every symmetry-restoring linker either violates cubic triorthogonality or lowers distance below five.

## 8. Next executable branch

Enumerate compensated linking rows in the affine Golay stabilizer coset. For each candidate:

1. rebuild the complete doubled matrix;
2. test all cubic row triples;
3. test the signed involution;
4. compute qutrit distance;
5. distinguish row-basis changes from genuinely different compositions.

This search has now been completed. Triorthogonality uniquely selects \(s=0\) among all \(243\) gauge-inequivalent affine linkers. See [Triorthogonality uniquely selects the uncompensated doubling linker](600_triorthogonality_uniquely_selects_the_uncompensated_doubling_linker.md).

## Certificate

    node scripts\verify_explicit_length37_nonunit_golay_doubling.mjs --monomial-symmetric
    node scripts\verify_explicit_length37_nonunit_golay_doubling.mjs --witt-block --monomial-symmetric

Both commands exhaust the same \(7680\)-element extension family after verifying the underlying \([[37,1,5]]_3\) construction.
