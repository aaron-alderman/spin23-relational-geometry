# The Puncture Labels Select the Two Furey Seams, but Not the Meridian–Longitude Polarization

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12 and B14  
**Claim status:** exact label-incidence and symplectic-basis match; physical polarization and neutral-port interpretation remain open

## 1. The basis-identification problem

The punctured qutrit code has two logical evaluation coordinates labelled, in the paper’s natural order, by

\[
(\nu^c,e^c).
\]

The sewn Furey ribbon has two matter seams labelled

\[
(C,D),
\]

with

\[
C=(e,u),
\qquad
D=(\nu,d).
\]

An abstract equality of two-dimensional coordinate spaces would permit any element of \(GL(2,\mathbb F_3)\). The particle incidence data removes almost all of that ambiguity.

## 2. The unique label-preserving assignment

The charged-lepton puncture edge \(e^c\) occurs in the \(C\) matter cycle, while the sterile-neutrino edge \(\nu^c\) occurs in the \(D\) matter cycle. Therefore the unique label-preserving bijection is

\[
e^c\longmapsto C,
\qquad
\nu^c\longmapsto D.
\]

Relative to the two orderings above, this is the permutation

\[
P=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

On the full logical phase space it lifts to

\[
\widehat P=\operatorname{diag}(P,P),
\]

which preserves the canonical symplectic form. This is exactly the simultaneous logical-coordinate swap already found as the largest possible nontrivial holonomy of unordered Weyl puncture transport.

Thus the graph does supply a source-derived **coordinate incidence map**. It is not an arbitrary fit.

## 3. What the incidence map does not choose

The code evaluation quotient naturally labels one half of the logical CSS phase space. The sewn surface supplies both:

- meridian cycles \(a_C,a_D\) from the boundary seams;
- dual longitude cycles \(b_C,b_D\) from closing arcs.

Incidence alone does not decide whether the evaluation coordinates are represented by

\[
(a_C,a_D)
\]

or by

\[
(b_C,b_D).
\]

The two global choices are related by the genus-two Fourier transformation

\[
F:quad a_i\mapsto b_i,
\qquad
b_i\mapsto-a_i.
\]

Both preserve all commutators. The pointwise \(S_3\times S_2\) stabilizer acts trivially on the logical fiber, so it cannot select between them.

## 4. Exact Weyl-algebra match after choosing polarization

Once a polarization is declared, set for example

\[
\overline Z_C\leftrightarrow a_C,
\qquad
\overline Z_D\leftrightarrow a_D,
\qquad
\overline X_C\leftrightarrow b_C,
\qquad
\overline X_D\leftrightarrow b_D.
\]

Then

\[
a_i\cdot b_j=\delta_{ij}
\]

reproduces exactly

\[
\overline X_i\overline Z_j
=\omega^{\delta_{ij}}
\overline Z_j\overline X_i.
\]

The abstract logical Weyl algebra and the sewn-handle Weyl algebra are therefore explicitly intertwined. What remains unproved is that this chosen intertwiner is performed by a local or source-derived physical operation.

## 5. The physical second-port caveat remains

At \(p=3\), the integral hypercharge of \(e^c\) vanishes modulo three. This makes \((\nu^c,e^c)\) a natural qutrit-code puncture pair and selects the Standard-Model \(3+2\) flag. It does not make the positron continuously gauge neutral.

The seam interpretation helps: the second coordinate can be read as a relational \(C=(e,u)\) boundary channel rather than literally deleting the physical positron. But that interpretation is a candidate until a boundary/defect construction preserves the observed spectrum.

## 6. Revised bridge

The finite-to-ribbon map now has four layers:

\[
\begin{array}{ccl}
(\nu^c,e^c)&\xrightarrow{\text{incidence}}&(D,C),\\
\text{logical coordinate plane}&\xrightarrow{\widehat P}&\text{seam meridian plane},\\
\text{logical dual plane}&\xrightarrow{\widehat P}&\text{closing-arc longitude plane},\\
Sp(4,\mathbb F_3)&\xleftarrow{\text{Weil}}&\operatorname{MCG}(\Sigma_2)\to Sp(4,\mathbb Z).
\end{array}
\]

The first and fourth layers are now source-labelled and exact. The middle polarization assignment is exact once chosen, but not selected by the present source algebra.

## 7. Claim ledger

- **Exact:** \(e^c\) lies on the \(C\) matter branch and \(\nu^c\) lies on the \(D\) matter branch.
- **Exact:** this selects a unique bijection between the two puncture labels and two seam labels.
- **Exact:** relative to the established orderings the map is a simultaneous symplectic swap.
- **Exact after choosing polarization:** seam and code Weyl commutators agree.
- **Open:** meridian versus longitude selection.
- **Open:** a physical, gauge-compatible interpretation of the second port.
- **Not established:** that literal particle removal implements a topological seam.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a code-surgery or transfer construction maps the puncture evaluation observables to the seam meridians and their conjugate errors to closing-arc transports.

**Polarization trigger:** reflection positivity, Higgs polar transport or a determinant-line connection selects one of the two Fourier-related polarizations.

**Incidence falsifier:** the physical cyclic order places \(e^c\) and \(\nu^c\) on different composite branches from \(C\) and \(D\).

**Neutrality falsifier:** mod-three neutrality of \(e^c\) is promoted to continuous Standard-Model neutrality.

**Intertwiner falsifier:** equality of Weyl commutators is called a dynamical implementation without a boundary operation.

## 9. Certificate

The [puncture-to-seam incidence certificate](../../../verification/verify/verify_puncture_labels_map_to_furey_seam_meridians_but_not_their_polarization.mjs) checks the unique label-preserving bijection, its symplectic swap lift and the distinct Fourier-related polarization choices.

## Companion documents

- [Two-puncture Standard-Model flag](451_the_nu_c_e_c_two_puncture_stabilizer_selects_the_sm_3_plus_2_flag_but_acts_trivially_on_logical_phase_space.md)
- [Full nonlocal logical Clifford lift](452_the_two_puncture_qutrit_code_has_a_full_nonlocal_clifford_sp4_lift_but_no_source_derived_mixing_yet.md)
- [Flat Weyl puncture transport](454_weyl_puncture_motion_has_flat_ordered_logical_transport_and_at_most_a_swap_holonomy.md)
- [Sewn-meridian Clifford framing](480_the_sewn_furey_matter_pairs_select_a_lagrangian_plane_and_the_remaining_framing_is_exactly_the_clifford_phase_sector.md)
