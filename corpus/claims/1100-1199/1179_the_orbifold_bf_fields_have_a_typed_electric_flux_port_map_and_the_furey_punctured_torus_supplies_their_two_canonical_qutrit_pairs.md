# The Orbifold BF Fields Have a Typed Electric/Flux Port Map, and the Furey Punctured Torus Supplies Their Two Canonical Qutrit Pairs

> **Global-form and exactness qualification:** the ports below are the gauge-quotiented \(\mathbb Z_3\) fields of documents 1180–1181, not raw \(\mathbb Z_9\) fields. The two-qutrit factor requires zero localized twist (document 1182) and an absent or gapped charged defect spectrum (document 1183).

**Date:** 19 October 2026  
**Branches:** relational ports, BF canonical quantization, Furey ribbon graph, punctured torus, electric/flux typing  
**Claim status:** exact canonical and source-typing construction; coherent ribbon orientation and microscopic coupling remain open  
**Certificate:** [verify_bf_electric_flux_ports_on_the_furey_punctured_torus_form_two_canonical_qutrit_pairs.mjs](../../../verification/verify/verify_bf_electric_flux_ports_on_the_furey_punctured_torus_form_two_canonical_qutrit_pairs.mjs)

## Executive result

The four BF Wilson exponents now have a physically typed port interpretation.

After the orbifold projection of document 1178, the two surviving one-forms are:

\[
a_\mu,
\qquad
c_\mu=b_{\mu y}.
\]

They are not two arbitrary copies.

- \(a\) is the electric connection coupled to worldlines carrying the faithful residual \(\mathbb Z_3\) charge.
- \(b\) couples to vortex worldsheets of the charge-three Higgs field; contracting one leg with the orbifold normal gives \(c=\iota_{\partial_y}b\), which couples to their line intersections with the defect.

Thus \(a\) and \(c\) are a charge/flux pair.

The completed Furey linking graph already has two independent cycles. Document 470 proved that a coherent cyclic orientation at its two trivalent vertices thickens it into a once-punctured torus with handle cycles \(A,B\) satisfying

\[
A\cdot B=1.
\]

The four defect holonomies are therefore

\[
a_A=\oint_Aa,\quad a_B=\oint_Ba,\quad
c_A=\oint_Ac,\quad c_B=\oint_Bc.
\]

The BF action pairs them transversely:

\[
(a_A,c_B),
\qquad
(a_B,-c_A).
\]

After level-three quantization these are exactly two canonical qutrit pairs. Their exponent module is \(\mathbb F_3^4\), and its irreducible Heisenberg representation has dimension nine.

This supplies the strongest typed map so far:

\[
\boxed{
\begin{array}{c}
\text{family-charged particle lines}\longleftrightarrow a,\\
\text{charge-three Higgs vortex sheets}\longleftrightarrow b\longrightarrow c,\\
\text{Furey handle cycles}\longleftrightarrow A,B,\\
\text{transverse charge/flux holonomies}\longleftrightarrow\text{two qutrit canonical pairs}.
\end{array}}
\]

The remaining uncertainty is not the phase-space algebra. It is whether the Furey graph's coherent ribbon orientation and its coupling to these gauge defects are dynamically selected.

## 1. Canonical reduction on the torus

Take the three-dimensional action

\[
S=\frac3{2\pi}\int_{\mathbb R\times T^2}c\wedge da
\]

and use temporal gauge. Expand zero modes in a cycle-dual basis:

\[
a=a_A\alpha+a_B\beta,
\qquad
c=c_A\alpha+c_B\beta,
\]

with

\[
\int_{T^2}\alpha\wedge\beta=1.
\]

The reduced kinetic term is, up to an overall orientation convention,

\[
L_{\rm top}
=
\frac3{2\pi}
\left(c_A\dot a_B-c_B\dot a_A\right).
\]

Hence the two canonical pairs are crossed by the surface intersection form:

\[
[a_A,c_B]\sim-\frac{2\pi i}{3},
\qquad
[a_B,c_A]\sim+\frac{2\pi i}{3}.
\]

Exponentiation gives the two finite Weyl pairs.

## 2. Finite symplectic module

Order the loop exponents as

\[
(a_A,a_B,c_A,c_B).
\]

Their commutator form over \(\mathbb F_3\) is

\[
J_{\rm BF}=
\begin{pmatrix}
0&0&0&1\\
0&0&-1&0\\
0&1&0&0\\
-1&0&0&0
\end{pmatrix}.
\]

This form is antisymmetric and nondegenerate. Therefore:

\[
|\mathbb F_3^4|=81,
\qquad
\dim\mathcal H=\sqrt{81}=9.
\]

The two canonical pairs are not an arbitrary factorization of the nine states; they are selected by the electric/flux distinction and the oriented intersection form.

## 3. Why the Furey graph can supply the surface

The completed matter graph has

\[
V=5,\qquad E=6,\qquad b_1=2.
\]

Cycle rank two alone is insufficient because a graph has no intrinsic intersection form. The ribbon classification in document 470 supplied the missing datum:

- matching cyclic orientations at the two trivalent vertices give a once-punctured torus;
- opposite orientations give a pair of pants.

Only the punctured-torus branch has the nondegenerate handle intersection needed by BF quantization.

The graph can therefore be a spine of the defect's compact spatial surface. A literal geometric torus embedded in ordinary space is not required; a topological defect neighborhood with that ribbon thickening suffices.

## 4. Source typing from the Higgsed family symmetry

The compact \(U(1)_X\) gauge field is \(a\). After a charge-three scalar condenses:

- a unit-charged particle worldline inserts \(e^{i\oint a}\);
- a flavon vortex has phase winding \(2\pi/3\);
- its worldsheet inserts \(e^{i\int b}\);
- intersection of that sheet with the orbifold defect becomes a line coupled to \(c=\iota_n b\).

The BF linking phase

\[
\exp\!\left(\frac{2\pi i}{3}\operatorname{Link}(C,\Sigma)\right)
\]

therefore measures the response of a charged particle line to a flavon-vortex sheet. This is the physical content of the conjugate port relation.

## 5. Relation to Jordan/Peirce data

The family Peirce decomposition has:

- two neutral population blocks \(PJP,QJQ\);
- a charge-three cross relation \(PJQ\oplus QJP\).

The BF defect has:

- electric population charge measured by \(a\);
- relational vortex flux measured by \(c\);
- their mutual phase fixed by level three.

This suggests the typed correspondence

\[
\text{population phase}\longleftrightarrow a,
\qquad
\text{relational phase winding}\longleftrightarrow c.
\]

It is structurally better than mapping \(a,c\) to two arbitrary Jordan matrix entries. But it is not yet an operator equality. A microscopic coupling must show that the Peirce charge current sources \(a\) and that vortices of the cross-Peirce scalar source \(b\).

## 6. Orientation

Reversing the punctured-torus orientation sends

\[
A\cdot B=1\longmapsto-1
\]

and conjugates the finite phase:

\[
\omega^{ab}\longleftrightarrow\omega^{-ab}=\omega^{2ab}.
\]

Thus the two phase conventions recurring in the corpus are exactly the two defect orientations. Folding does not by itself choose one; the coherent ribbon orientation or wall normal must do so.

This reduces the orientation problem to one binary physical datum rather than an unexplained algebraic discrepancy.

## 7. Claim ledger

- **Exact:** the reduced BF kinetic term supplies two transverse canonical pairs.
- **Exact:** the four loop exponents form the displayed nondegenerate \(\mathbb F_3^4\) symplectic module.
- **Exact:** its irreducible Heisenberg representation has dimension nine.
- **Exact:** the Furey graph admits a punctured-torus thickening with \(A\cdot B=1\).
- **Exact conditional on the Higgsed \(U(1)_X\):** \(a\) couples to residual charged lines and \(c\) to defect intersections of flavon-vortex sheets.
- **Exact:** orientation reversal exchanges \(\omega^{ab}\) and \(\omega^{2ab}\).
- **Open:** dynamical selection of coherent rather than opposite ribbon orientations.
- **Open:** a local operator coupling the Peirce current and scalar vortex to the BF fields.
- **Open:** gap protection against additional defect modes.

## 8. Stop-everything and positive gates

**Cycle-rank stop:** do not infer a canonical pair from \(b_1=2\) without the ribbon intersection form.

**Port stop:** do not call \(a,c\) the Jordan faces without a source coupling; they are presently electric and vortex-flux ports.

**Orientation stop:** the sign of the mutual phase requires a wall normal or cyclic ribbon orientation.

**Gap stop:** a nine-dimensional topological factor requires all non-topological defect modes coupled to these holonomies to be gapped or factored.

**Positive coupling trigger:** derive terms

\[
\int a_\mu j_X^\mu
\qquad\text{and}\qquad
\int b_{\mu\nu}J_{\rm vortex}^{\mu\nu}
\]

from the same charge-three Jordan/Furey scalar sector.

**Positive topology trigger:** derive matching trivalent cyclic orders from the Furey multiplication or wall orientation.

## 9. Verdict

\[
\boxed{
\text{electric line}\times\text{vortex sheet}
\xrightarrow{\text{orbifold intersection}}
(a,c)\text{ defect ports}
\xrightarrow{A\cdot B=1}
\mathbb F_3^4
\xrightarrow{\text{quantization}}
\mathbb C^9.
}
\]

The finite carrier now has a complete conditional physical typing. The remaining branch is dynamical: derive the defect, its coherent ribbon orientation and its gap from the Standard-Model/Jordan system rather than declaring them as boundary data.

## Corpus position

- [orbifold projection to the isolated BF sector](1178_an_s1_over_z2_bf_orbifold_projects_out_the_extra_zero_mode_sector_and_retains_exactly_the_nine_state_level_three_interface.md)
- [Furey punctured-torus ribbon theorem](../0400-0499/470_a_coherent_ribbon_orientation_turns_the_two_cycle_furey_graph_into_a_punctured_torus_with_the_bf_canonical_pair.md)
- [level-three BF carrier](../0400-0499/465_level_three_bf_theory_realizes_the_hyperbolic_two_qutrit_carrier_and_its_missing_mutual_phase.md)
- [Jordan charge-three relation](1176_the_jordan_peirce_derivation_generates_the_charge_three_relation_but_quotients_out_the_residual_z3_so_a_fermionic_central_lift_is_essential.md)
