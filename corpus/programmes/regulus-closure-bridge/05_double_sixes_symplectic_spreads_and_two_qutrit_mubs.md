# Double-sixes, symplectic spreads and complete two-qutrit measurements

**Date:** 27 October 2026

**Status:** exact finite-geometric identification; standard quantum-information
interpretation; no new physical ontology inferred

**Programme:** [Regulus closure bridge](README.md)

**Evidence:** [machine record](../../../evidence/data/regulus-spin23-bridge-v1.json)

## 1. Result

The 36 elliptic ten-point sections already identified with the 36
double-sixes have a second exact meaning. Each section is an ovoid of
\(Q(4,3)\). Under the primitive Plücker dictionary, its ten points are ten
Lagrangian two-planes in \(\mathbb F_3^4\) such that:

- every plane contains eight nonzero vectors;
- every two distinct planes intersect only in zero;
- the ten planes partition all \(3^4-1=80\) nonzero vectors.

Therefore every elliptic section is a symplectic spread:

\[
 \boxed{
 \text{double-six}
 \longleftrightarrow
 \text{elliptic section/ovoid}
 \longleftrightarrow
 \text{ten-plane symplectic spread}.}
\]

This is not a count analogy. The executable certificate checks the
intersection and partition conditions for all 36 sections.

## 2. Why this is not the missing spread reported earlier

The word *spread* occurs on both sides of the point-line duality and can hide
a type error.

- The earlier exhaustive search found no set of ten **lines of \(Q(4,3)\)**
  partitioning its 40 points.
- The present construction finds 36 ten-point **ovoids of \(Q(4,3)\)**.
- Each point of \(Q(4,3)\) is itself a Lagrangian plane in the original
  symplectic space \(W(3,3)\).
- Hence an ovoid becomes a spread of ten Lagrangian planes in
  \(\mathbb F_3^4\).

Thus “no quadric-line spread” and “36 symplectic spreads” are compatible
statements about dual object types.

## 3. The two-qutrit Pauli reading

Modulo its scalar centre, the two-qutrit Pauli group is labelled by
\(\mathbb F_3^4\). Two Pauli labels commute exactly when their symplectic
pairing vanishes. Consequently:

\[
\begin{aligned}
\text{Lagrangian plane}
 &\longleftrightarrow
 \text{maximal commuting Pauli class},\\
\text{common eigenvectors}
 &\longleftrightarrow
 \text{one stabilizer basis},\\
\text{symplectic spread of ten planes}
 &\longleftrightarrow
 \text{ten pairwise mutually unbiased stabilizer bases}.
\end{aligned}
\]

Ten is the complete number \(d+1\) for \(d=3^2=9\). The regulus programme
therefore supplies the exact composite dictionary

\[
 \boxed{
 36\text{ double-sixes}
 \longleftrightarrow
 36\text{ labelled complete two-qutrit stabilizer-MUB packages}.}
\]

The construction of complete mutually unbiased bases from disjoint commuting
operator classes is standard; the finite-field construction is described
explicitly for two qutrits by Klimov, Sánchez-Soto and de Guise, and the
general symplectic-spread correspondence is developed by Abdukhalikov:

- [Multicomplementary operators via finite Fourier transform](https://doi.org/10.1088/0305-4470/38/12/015)
- [Symplectic spreads, planar functions and mutually unbiased bases](https://arxiv.org/abs/1306.3478)

## 4. What “36 packages” does and does not mean

The 36 spreads are distinct labelled subsets of the fixed 40-plane carrier,
and \(PSp_4(3)\) acts transitively on them. This does not assert 36
unitary-inequivalent MUB constructions. A symplectic transformation lifts
projectively to a Clifford unitary, so the same orbit normally describes
different placements of one stabilizer-MUB type inside the fixed Pauli
carrier.

The double-six is therefore a selector of a complete measurement frame, not
an extra quantum degree of freedom.

## 5. Pair relations survive the dictionary

The 630 unordered pairs of frames have only two overlap types:

| Shared stabilizer bases | Number of frame pairs | Degree per frame | Cubic-surface relation |
|---:|---:|---:|---|
| 4 | 270 | 15 | syzygetic; four shared cubic lines |
| 1 | 360 | 20 | azygetic; six shared cubic lines |

The correspondence is exact pair by pair, not only numerically. Thus the
syzygetic/azygetic relation can be read operationally as “four common
measurement contexts” versus “one common measurement context.” The unique
threefold closure of every azygetic pair consequently becomes a ternary
closure law on minimally overlapping complete measurement frames.

The four-basis-overlap graph is
\(\operatorname{SRG}(36,15,6,6)\); its one-basis-overlap complement is
\(\operatorname{SRG}(36,20,10,12)\). The 36 measurement frames therefore
carry a two-class association scheme rather than an unstructured menu of
basis choices.

## 6. Detector meaning

This branch gives the regulus detector language an exact finite quantum
reading. One double-six/ovoid selects:

1. ten complete commuting questions;
2. nine outcomes for each question;
3. pairwise unbiased transitions between different questions;
4. coverage of every nonidentity Pauli direction exactly once.

It is a natural tomography frame and an exact test of whether a proposed
two-qutrit implementation preserves the finite incidence carrier. A
laboratory detector would still require calibrated state preparation,
measurement and a physical identification of Pauli labels. The geometry
alone supplies none of those.

## 7. Corpus consequence

The previously separate cubic-surface and qutrit-code readings now meet at
the 36-object layer:

\[
\begin{array}{ccccc}
Q(4,3)\text{ ovoid}
&=&
\text{symplectic spread}
&\rightsquigarrow&
\text{complete stabilizer MUB},\\
\updownarrow&&&&\\[-6pt]
\text{cubic double-six}.&&&&
\end{array}
\]

This is a new exact join inside the existing carrier. It does not derive
quantum mechanics from cubic surfaces, identify the carrier with matter, or
select one of the 36 frames dynamically.

## 8. Reopening conditions

The branch requires new input only if the corpus seeks:

1. a source-derived rule selecting one spread/double-six;
2. a measured two-qutrit device implementing all ten bases;
3. a noise model whose failures follow the double-six intersection classes;
4. a physical dynamics transporting among the 36 frames.

Absent one of those inputs, the finite mathematical branch is exhausted.
