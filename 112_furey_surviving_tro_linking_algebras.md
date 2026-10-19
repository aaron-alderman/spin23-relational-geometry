# Linking Algebras of the Two Yukawa-Compatible Matter TROs

**Date:** 17 October 2026  
**Branches:** B03, B08 and B11  
**Claim status:** exact finite-dimensional linking-algebra classification; absolute neutral-face orientation remains pinned

## 1. The remaining pair

Cyclic Yukawa closure leaves two anomaly-free matter TROs. Write

\[
D=\text{target of }d^c,
\qquad
E=\text{target of }e^c=\text{source of }L.
\]

Then

\[
\{D,E\}=\{O_1,R\},
\qquad
D\ne E.
\]

The five matter arrows are

\[
H\to O_2,\quad
O_2\to C,\quad
O_2\to D,\quad
E\to H,\quad
C\to E.
\]

The two solutions differ only by

\[
(D,E)=(O_1,R)
\quad\longleftrightarrow\quad
(R,O_1).
\]

## 2. TRO linking construction

For either matter TRO \(M\), define

\[
A_L=\operatorname{span}(MM^\dagger),
\qquad
A_R=\operatorname{span}(M^\dagger M),
\]

and

\[
\mathcal L(M)=
\begin{pmatrix}
A_L&M\\
M^\dagger&A_R
\end{pmatrix}.
\]

The bipartite support graph has four connected components:

\[
\begin{array}{c|c|c|c}
\text{left targets}&\text{right sources}&(d_L,d_R)&\text{linking factor}\\ \hline
C\oplus D&O_2&(2,3)&M_5(\mathbb C)\\
O_2&H&(3,2)&M_5(\mathbb C)\\
H&E&(2,1)&M_3(\mathbb C)\\
E&C&(1,1)&M_2(\mathbb C).
\end{array}
\]

Therefore

\[
\boxed{
\mathcal L(M)
\cong
M_5(\mathbb C)\oplus M_5(\mathbb C)
\oplus M_3(\mathbb C)\oplus M_2(\mathbb C).
}
\]

Its complex dimension is

\[
25+25+9+4=63.
\]

The decomposition is consistent with

\[
\dim A_L=18,
\qquad
\dim A_R=15,
\qquad
\dim M=\dim M^\dagger=15,
\]

so

\[
18+15+15+15=63.
\]

The linking center has complex dimension four.

## 3. What the linking algebra distinguishes

The left algebra is

\[
A_L\cong
M_3(\mathbb C)\oplus M_2(\mathbb C)
\oplus M_2(\mathbb C)\oplus\mathbb C.
\]

On its seven-dimensional support, the right algebra is

\[
A_R\cong
M_3(\mathbb C)\oplus M_2(\mathbb C)
\oplus\mathbb C\oplus\mathbb C.
\]

The unused one-dimensional right-source block is exactly \(D\):

\[
Mp_D=0.
\]

By contrast,

\[
Mp_E\ne0,
\]

because \(E\) is the source of \(L\), and \(E\) is also the target of \(e^c\).

Thus the matter TRO canonically distinguishes two **relational roles**:

- \(D\): the down-type target and right annihilator;
- \(E\): the charged-lepton target and lepton-doublet source.

This is stronger than merely saying that two neutral singlets occur.

## 4. What it cannot distinguish

Conjugating every block by the permutation

\[
O_1\longleftrightarrow R
\]

maps the first matter TRO exactly to the second. It preserves:

- all gauge representations;
- the fifteen-dimensional matter module;
- every ternary product;
- every anomaly;
- all cyclic Yukawa incidences;
- \(A_L\), \(A_R\) and the full linking-factor decomposition;
- the dimensions of the center and commutants.

Consequently:

\[
\boxed{
\text{linking incidence fixes }D\text{ versus }E,
\quad
\text{but not }D=O_1\text{ versus }D=R.
}
\]

No invariant of the weighted support graph or abstract complex linking algebra can break this exchange.

## 5. Where an absolute orientation could enter

The labels are not identical in the original nested division-algebra construction:

- \(O_1\) is the color-singlet component associated with the octonionic split;
- \(R\) is the terminal real block.

That provenance may distinguish them, but it is information beyond the gauge representation and TRO incidence retained in the present model. A valid selector could come from:

1. a nested-volume element acting differently on \(O_1\) and \(R\);
2. a real structure inherited from their distinct division-algebra origins;
3. a boundary source/target orientation;
4. coupling to the external two-face response carrier;
5. a neutrino or Majorana interaction involving only one neutral block.

Each proposal must be written as an operator on the eight-dimensional carrier and checked against gauge covariance, the matter TRO and the Higgs cycles.

## 6. Relation to \(H_2(\mathbb R)\)

The four-dimensional center of the complex linking algebra does not automatically reduce to the three-dimensional Jordan algebra \(H_2(\mathbb R)\). Nor does the direct sum of matrix factors canonically select two faces and one relation.

A bridge to the external carrier requires an additional positive map or response functor

\[
\Pi:\mathcal L(M)_{\rm sa}\longrightarrow H_2(\mathbb R)
\]

that:

- identifies two physically meaningful boundary faces;
- sends positive operators to the positive cone;
- intertwines the relevant ternary compositions;
- is invariant under gauge transformations;
- either breaks or physically interprets the \(O_1\leftrightarrow R\) exchange.

Without such a map, the linking algebra and \(H_2(\mathbb R)\) share a relational language but are not the same carrier.

## 7. Branch decision

- **Established:** both surviving TROs have the same \(M_5\oplus M_5\oplus M_3\oplus M_2\) linking algebra.
- **Established:** the TRO intrinsically distinguishes the roles \(D\) and \(E\).
- **Falsified in scope:** abstract linking-algebra invariants select which role is \(O_1\) and which is \(R\).
- **Pinned:** an absolute orientation from nested-algebra provenance, boundary data or the external carrier.

**Stop-everything positive:** the same source operator that distinguishes \(O_1\) from \(R\) also fixes the Higgs diagonal embedding and defines a positive rank-two response map to \(H_2(\mathbb R)\).

**Negative:** every such operator either breaks the Standard-Model gauge action, destroys the anomaly-free TRO, or is merely a basis convention.

### Sixteen-state update

The unique canonical neutral arrow \(D\to E\) extends this matter TRO from dimension fifteen to sixteen while preserving ternary closure. It eliminates the right annihilator and changes the linking algebra to

\[
M_5(\mathbb C)\oplus M_5(\mathbb C)
\oplus M_3(\mathbb C)\oplus M_3(\mathbb C).
\]

Accordingly, the classification in this document remains exact for the minimal fifteen-state Standard-Model TRO, while the [right-handed-neutrino completion](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md) defines a distinct sixteen-state branch.

## 8. Certificate

The [linking-algebra certificate](scripts/verify-furey-surviving-tro-linking-algebras.mjs) constructs both weighted bipartite support graphs, computes all simple factors and dimensions, identifies the one-dimensional right annihilator and verifies exact conjugacy under \(O_1\leftrightarrow R\).

## Companion documents

- [Four anomaly-free one-generation TROs](110_furey_anomaly_free_one_generation_tros.md)
- [Cyclic Yukawa topology selection](111_furey_cyclic_yukawa_topology_selection.md)
- [Furey orientation as an exact ternary bimodule](108_furey_oriented_bimodule_ternary_closure.md)
- [Two-sided interface realization](61_two_sided_interface_three_relations_branch.md)
- [Center positive-compression obstruction](115_linking_center_positive_compression_obstruction.md)
- [Unique \(M_2(\mathbb C)\) real-Jordan factor](116_unique_m2_linking_factor_to_h2r_spin23.md)

