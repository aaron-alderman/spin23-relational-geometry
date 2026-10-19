# The Oriented Exceptional Determinant Has the Right Character Only After a Projective-Ratio Embedding and Is Bicubic on the Hopf Root

**Date:** 18 October 2026  
**Branches:** oriented exceptional flag, Furey response root, Hopf half-phases, projective coordinates, and sixth-harmonic locking  
**Claim status:** exact character and degree audit; source-to-exceptional embedding remains open  
**Certificate:** [audit_the_oriented_exceptional_cubic_against_the_half_phase_hopf_root.mjs](scripts/audit_the_oriented_exceptional_cubic_against_the_half_phase_hopf_root.mjs)

## Executive result

The project already contains a serious candidate for the complex cubic required by document 1008. Document 185 proves that the oriented exceptional complement

\[
Z\in M_3(\mathbb C)
\]

has a unique holomorphic cubic invariant, up to scale:

\[
D(Z)=\det Z.
\]

It is invariant under the connected flag stabilizer and conjugated by the disconnected antiunitary component. Document 350 separately constructs the even and odd quadratures of a complexified real exceptional cubic.

However, this does **not** yet identify the exceptional determinant with the phase-locking cubic of document 1008. The reason is a half-phase mismatch.

The actual weighted Furey root is

\[
a(\phi)=\frac{e^{-i\phi/2}}{\sqrt2},
\qquad
b(\phi)=\frac{e^{i\phi/2}}{\sqrt2}.
\]

No holomorphic cubic polynomial in \(a,b\) has phase weight three. The available weights are

\[
\frac32,\quad\frac12,\quad-\frac12,\quad-\frac32.
\]

The weight-three coordinate is instead the cubic of the projective ratio

\[
z=\frac ba=e^{i\phi},
\qquad z^3=e^{i3\phi}.
\]

On the normalized frame this has the global polynomial representative

\[
\boxed{b^3\bar a^3=\frac18e^{i3\phi},}
\]

which is bicubic and total degree six in the fundamental frame coefficients. Its square is degree twelve and yields \(\cos6\phi\).

Thus the exceptional determinant is a credible target only if an equivariant map identifies its complex phase with the projective ratio \(b/a\), or if it is built from two cubic root sectors producing \(b^3\bar a^3\). That map has not yet been constructed.

## 1. What the earlier exceptional branch already established

For the oriented flag

\[
H_2(\mathbb C)\subset H_3(\mathbb C)\subset H_3(\mathbb O),
\]

the complement transforms as

\[
Z\longmapsto hZg^\dagger,
\qquad g,h\in SU(3).
\]

Therefore

\[
\det(hZg^\dagger)=\det Z.
\]

The determinant is the unique holomorphic cubic singlet for one complement field. Conjugation sends

\[
\det Z\longmapsto\overline{\det Z},
\]

so its real and imaginary parts are respectively antiunitary even and odd.

This is stronger than the generic complexification proposed in document 1008: the corpus already has an explicit representation and a uniqueness theorem.

## 2. The half-phase audit

A holomorphic cubic monomial has the form

\[
a^p b^{3-p}.
\]

Its phase is

\[
a^p b^{3-p}
\propto
e^{i(3-2p)\phi/2}.
\]

For \(p=0,1,2,3\), its weights are \(3/2,1/2,-1/2,-3/2\). None is three.

Therefore a statement of the form “the cubic in the Hopf-frame coefficients automatically gives \(e^{i3\phi}\)” is false.

The discrepancy comes from confusing the half-angle spinor frame with its projective coordinate. The ratio

\[
z=\frac ba
\]

has full phase weight one, but it is chart dependent. A nonsingular homogeneous representative is

\[
b\bar a=\frac12e^{i\phi}.
\]

Cubing it gives

\[
(b\bar a)^3=b^3\bar a^3=\frac18e^{i3\phi}.
\]

## 3. Character table of the bicubic

Define

\[
\mathcal D(\phi)=b^3\bar a^3.
\]

Then:

### Placement

\[
\mathcal D(\phi+2\pi/3)=\mathcal D(\phi).
\]

### Deck half-turn

Under \(\phi\mapsto\phi+\pi\),

\[
a\mapsto-ia,
\qquad
b\mapsto ib,
\]

and hence

\[
\mathcal D\mapsto-\mathcal D.
\]

### Real reflection

\[
\mathcal D(-\phi)=\overline{\mathcal D(\phi)}.
\]

Thus \(\mathcal D\) has exactly the target character from document 1008.

Its even square gives

\[
\mathcal D^2+\bar{\mathcal D}^{,2}
=\frac1{32}\cos6\phi.
\]

## 4. Two viable exceptional embeddings

The degree audit leaves two distinct constructions.

### A. Projective-ratio embedding

Construct an equivariant map

\[
\iota:\frac ba\longmapsto Z(z)
\]

such that

\[
\det Z(z)=c_0z^3.
\]

For example, the algebraic witness \(Z=zI_3\) has this determinant, but it is not yet a physical embedding: it may lie in the wrong exceptional orbit, carry the wrong norm, or ignore the Furey matter decomposition.

### B. Paired-cubic embedding

Construct two cubic amplitudes from the two faces,

\[
D_b\propto b^3,
\qquad
D_a\propto a^3,
\]

and pair them as

\[
D_b\overline{D_a}\propto b^3\bar a^3.
\]

This makes the orientation amplitude a relationship between two cubics rather than one primitive cubic. It fits the project’s relational-carrier language particularly well, but needs two typed complement sectors or two polarized determinant slots.

## 5. Gauge status

The exceptional determinant itself is invariant under the connected \(SU(3)\times SU(3)\) flag action and remains invariant after restriction to the Standard-Model stabilizer described in document 185. Its square is therefore gauge compatible at the representation-theory level.

The missing map is not merely gauge invariance of \(\det Z\). It is equivariance of the assignment from the neutral Peirce/lepton–colour response root to \(Z\). In particular, one must show that:

- the projective ratio is a legitimate neutral coordinate;
- the map is regular across both Hopf charts;
- conjugation agrees with the exceptional antiunitary component;
- the deck operation acts as determinant sign reversal;
- no additional field multiplicity produces independent cubic couplings.

## 6. Revised claim hierarchy

The branch now separates into four levels:

1. **Exact:** the oriented exceptional complement has a unique complex cubic determinant.
2. **Exact:** the Hopf projective ratio has a deck-odd cubic character, globally represented by \(b^3\bar a^3\).
3. **Open:** an equivariant map identifies these two cubic lines.
4. **Open:** dynamics generates the even square with nonzero coefficient and fixes its sign.

This is a substantial narrowing. The required complex cubic is no longer hypothetical, but its identification with the response phase remains unproved.

## 7. Stop-everything and falsification tests

**Equivariant-map trigger:** construct \(Z(a,b)\) satisfying the exceptional flag action and

\[
\det Z(a,b)=c_0b^3\bar a^3.
\]

**Two-cubic trigger:** construct separately typed determinant lines \(D_a,D_b\) whose relative pairing is the bicubic.

**Globality trigger:** show the construction is a global section of the appropriate projective line bundle, not a singular one-chart ratio.

**Degree falsifier:** insist that \(Z\) depend linearly and holomorphically on only \((a,b)\). Then its determinant is cubic with half-integer phase weights and cannot equal the target weight-three amplitude.

**Orbit falsifier:** every map with the correct determinant leaves the admissible exceptional orbit or violates the Furey gauge decomposition.

**Multiplicity warning:** several complement fields produce several polarized determinants and can destroy uniqueness.

## Verdict

| Question | Verdict |
|---|---|
| Does the corpus already contain a unique complex exceptional cubic? | **Yes** |
| Is it automatically the cubic of the current Hopf-frame coefficients? | **No** |
| What is the target cubic character on the root? | **\(b^3\bar a^3\), a bicubic** |
| Is it placement even, deck odd and Real conjugated? | **Yes** |
| Can its square generate \(\cos6\phi\)? | **Yes** |
| Is the Furey-root-to-exceptional-complement map known? | **No** |

## Position in the corpus

- [oriented exceptional flag and unique cubic](185_oriented_exceptional_flag_unique_cubic_odd_invariant.md)
- [complexified exceptional cubic quadratures](350_complexifying_the_real_exceptional_cubic_supplies_cp_quadratures_with_fixed_parity.md)
- [complex-cubic sixth-harmonic mechanism](1008_a_deck_odd_complex_jordan_cubic_generates_the_minimal_sixth_harmonic_but_the_real_determinant_alone_cannot.md)
- [complex weighted-root Real bundle](1005_a_complex_relative_phase_realizes_the_weighted_root_hopf_loop_at_fixed_positive_magnitudes_but_turns_the_antiunitary_into_a_real_bundle_involution.md)
- [neutral Peirce response root](1001_the_neutral_furey_peirce_line_times_the_lepton_color_doublet_is_the_minimal_four_real_response_root_and_its_gram_is_the_jordan_carrier.md)
